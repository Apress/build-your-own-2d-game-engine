// this is the fragment (or pixel) shader

precision mediump float; 
    // sets the precision for floating point computation

// The object that fetches data from texture.
// Must be set outside the shader.
uniform sampler2D uSampler;
uniform sampler2D uNormalSampler;

// Color of pixel
uniform vec4 uPixelColor;  
uniform vec4 uGlobalAmbientColor; // this is shared globally
uniform float uGlobalAmbientIntensity; 

// for supporting a simple Phong-like illumination model
uniform vec3 uCameraPosition; // for computing the V-vector
// material properties
struct Material {
    vec4 Ka;    // simple boosting of color
    vec4 Kd;    // Diffuse 
    vec4 Ks;    // Specular
    float Shininess; // this is the "n"
};
uniform Material uMaterial;

#define kGLSLuLightArraySize 4
    // GLSL Fragment shader requires loop control
    // variable to be a constant number. This number 4
    // says, this fragment shader will _ALWAYS_ process
    // all 4 light sources. 
    // ***********WARNING***********************
    // This number must correspond to the constant with
    // the same name defined in LightShader.js file.
    // ***********WARNING**************************
    // To change this number MAKE SURE: to update the 
    //     kGLSLuLightArraySize
    // defined in LightShader.js file.


#define ePointLight       0
#define eDirectionalLight 1
#define eSpotLight        2
    // ******** WARNING ******
    // The above enumerated values must be identical to 
    // Light.eLightType values defined in Light.js
    // ******** WARNING ******

struct Light  {
    vec3 Position;  // in pixel space!
    vec3 Direction; // Light direction
    vec4 Color;
    float Near;
    float Far;
    float CosInner;    // Cosine of inner cone angle for spotlight
    float CosOuter;    // Cosine of outer cone angle for spotlight
    float Intensity;
    float DropOff;  // for spotlight
    bool  IsOn;
    int LightType;   // One of ePointLight, eDirectionalLight, eSpotLight
};
uniform Light uLights[kGLSLuLightArraySize];  // Maximum array of lights this shader supports

// The "varying" keyword is for signifying that the texture coordinate will be
// interpolated and thus varies. 
varying vec2 vTexCoord;

float AngularDropOff(Light lgt, vec3 lgtDir, vec3 L) {
    float atten = 0.0;
    float cosL = dot(lgtDir, L);
    float num = cosL - lgt.CosOuter;
    if (num > 0.0) {
        if (cosL > lgt.CosInner) 
            atten = 1.0;
        else {
            float denom = lgt.CosInner - lgt.CosOuter;
            atten = smoothstep(0.0, 1.0, pow(num/denom, lgt.DropOff));
        }
    }
    return atten;
}

float DistanceDropOff(Light lgt, float dist) {
    float atten = 0.0;
    if (dist <= lgt.Far) {
        if (dist <= lgt.Near)
            atten = 1.0;  //  no attenuation
        else {
            // simple quadratic drop off
            float n = dist - lgt.Near;
            float d = lgt.Far - lgt.Near;
            atten = smoothstep(0.0, 1.0, 1.0-(n*n)/(d*d)); // blended attenuation
        }   
    }
    return atten;
}

vec4 SpecularResult(vec3 N, vec3 L) {
    vec3 V = normalize(uCameraPosition - gl_FragCoord.xyz);
    vec3 H = (L + V) * 0.5;
    return uMaterial.Ks * pow(max(0.0, dot(N, H)), uMaterial.Shininess);
}

vec4 DiffuseResult(vec3 N, vec3 L, vec4 textureMapColor) {
    return uMaterial.Kd * max(0.0, dot(N, L)) * textureMapColor;
}

vec4 ShadedResult(Light lgt, vec3 N, vec4 textureMapColor) {
    float aAtten = 1.0, dAtten = 1.0;
    vec3 lgtDir = -normalize(lgt.Direction.xyz);
    vec3 L; // light vector
    float dist; // distance to light
    if (lgt.LightType == eDirectionalLight) {
        L = lgtDir;
    } else {
        L = lgt.Position.xyz - gl_FragCoord.xyz;
        dist = length(L);
        L = L / dist;
    }
    if (lgt.LightType == eSpotLight) {
        // spotlight: do angle dropoff
        aAtten = AngularDropOff(lgt, lgtDir, L);
    }
    if (lgt.LightType != eDirectionalLight) {
        // both spot and point light has distance dropoff
        dAtten = DistanceDropOff(lgt, dist);
    }
    vec4  diffuse = DiffuseResult(N, L, textureMapColor);
    vec4  specular = SpecularResult(N, L);
    vec4 result = aAtten * dAtten * lgt.Intensity * lgt.Color * (diffuse + specular);
    return result;
}

void main(void)  {
    // simple tint based on uPixelColor setting
    vec4 textureMapColor = texture2D(uSampler, vTexCoord);
    vec4 normal = texture2D(uNormalSampler, vTexCoord);
    vec4 normalMap = (2.0 * normal) - 1.0;
    
    //
    // normalMap.y = -normalMap.y;  // flip Y
    //    depending on the normal map you work with, this may or may not be flipped
    // 
    vec3 N = normalize(normalMap.xyz);
   
    vec4 shadedResult = uMaterial.Ka + (textureMapColor  * uGlobalAmbientColor * uGlobalAmbientIntensity);

    // now decide if we should illuminate by the light
    if (textureMapColor.a > 0.0) {
        for (int i=0; i<kGLSLuLightArraySize; i++) { 
            if (uLights[i].IsOn) { 
                shadedResult += ShadedResult(uLights[i], N, textureMapColor);
            }
        }
    }

    // tint the textured area, and leave transparent area as defined by the texture
    vec3 tintResult = vec3(shadedResult) * (1.0-uPixelColor.a) + vec3(uPixelColor) * uPixelColor.a;
    vec4 result = vec4(tintResult, textureMapColor.a);

    gl_FragColor = result;
}
        