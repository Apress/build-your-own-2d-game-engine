// this is the fragment (or pixel) shader

precision mediump float; 
    // sets the precision for floating point computation

// The object that fetches data from texture.
// Must be set outside the shader.
uniform sampler2D uSampler;

// Color of pixel
uniform vec4 uPixelColor;  
uniform vec4 uGlobalAmbientColor; // this is shared globally
uniform float uGlobalAmbientIntensity;

#define kGLSLuLightArraySize 25
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
    vec3 Position;      // in pixel space!
    vec3 Direction;     // Light direction
    vec4 Color;
    float Near;         // distance in pixel space
    float Far;
    float CosInner;     // cosine of inner cone angle for spotlight
    float CosOuter;     // cosine of outer cone angle for spotlight
    float Intensity;
    float DropOff;      // for spotlight only
    bool  IsOn;
    int   LightType;    // one of ePointLight, eDirectionalLight, eSpotLight
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

// Directional lights: without normal information
//    directional light is the same as an ambient light!
vec4 LightEffect(Light lgt) {    
    float aAtten = 1.0, dAtten = 1.0;

    if (lgt.LightType != eDirectionalLight) {
        vec3 lgtDir = -normalize(lgt.Direction.xyz);
        vec3 L = lgt.Position.xyz - gl_FragCoord.xyz;
        float dist = length(L); // distance to light
        L = L / dist;  // same as calling normalize(), only faster
    
        // find out what kind of light ...
        if (lgt.LightType == eSpotLight) {
            // spotlight: do angle dropoff
            aAtten = AngularDropOff(lgt, lgtDir, L);
        } 
        dAtten = DistanceDropOff(lgt, dist);
    }
    return dAtten * aAtten * lgt.Intensity * lgt.Color;
}

void main(void)  {
    // simple tint based on uPixelColor setting
    vec4 textureMapColor = texture2D(uSampler, vec2(vTexCoord.s, vTexCoord.t));
    vec4 lgtResults = uGlobalAmbientIntensity * uGlobalAmbientColor;

    // now decide if we should illuminate by the light
    if (textureMapColor.a > 0.0) {
        for (int i=0; i<kGLSLuLightArraySize; i++) { 
            if (uLights[i].IsOn) { 
                lgtResults +=  LightEffect(uLights[i]);
            }
        }
    }
    lgtResults *= textureMapColor;

    // tint the textured area, and leave transparent area as defined by the texture
    vec3 r = vec3(lgtResults) * (1.0-uPixelColor.a) + vec3(uPixelColor) * uPixelColor.a;
    vec4 result = vec4(r, textureMapColor.a);

    gl_FragColor = result;
}