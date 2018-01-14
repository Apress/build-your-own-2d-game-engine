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

// Light information
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

struct Light  {
    vec3 Position;   // in pixel space!
    vec4 Color;
    float Near;     // distance in pixel space
    float Far;     // distance in pixel space
    float Intensity;
    bool  IsOn;
};
uniform Light uLights[kGLSLuLightArraySize];  // Maximum array of lights this shader supports

// The "varying" keyword is for signifying that the texture coordinate will be
// interpolated and thus varies. 
varying vec2 vTexCoord;

// Computes the L-vector, and returns attenuation
float LightAttenuation(Light lgt, float dist) {
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
    vec3 L = lgt.Position.xyz - gl_FragCoord.xyz; 
    float dist = length(L);
    L = L / dist;
    float atten = LightAttenuation(lgt, dist);
    vec4  diffuse = DiffuseResult(N, L, textureMapColor);
    vec4  specular = SpecularResult(N, L);
    vec4 result = atten * lgt.Intensity * lgt.Color * (diffuse + specular);
    return result;
}

void main(void)  {
    // simple tint based on uPixelColor setting
    vec4 textureMapColor = texture2D(uSampler, vTexCoord);
    vec4 normal = texture2D(uNormalSampler, vTexCoord);  // using the same coordinate as the sprite texture!
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
        