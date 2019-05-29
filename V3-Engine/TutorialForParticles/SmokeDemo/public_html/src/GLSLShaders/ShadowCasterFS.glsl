// Set the precision for float operations, such as sampler operations.
// Without this set, those operations may not function.
precision mediump float;

// The object that fetches data from texture.
// Must be set outside the shader.
uniform sampler2D uSampler;
uniform vec4 uPixelColor;

#define kMaxShadowOpacity 0.7  // max of shadow opacity
#define kLightStrengthCutOff 0.05 // any less will not cause chadow

// the types of light that can cast shadow
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
uniform Light uLights[1];  // Exactly one light source, the one that is casting the shadow

// The "varying" keyword is for signifying that the texture coordinate will be
// interpolated and thus varies. 
varying vec2 vTexCoord;

float AngularDropOff(vec3 lgtDir, vec3 L) {
    float atten = 0.0;
    float cosL = dot(lgtDir, L);
    float num = cosL - uLights[0].CosOuter;
    if (num > 0.0) {
        if (cosL > uLights[0].CosInner) 
            atten = 1.0;
        else {
            float denom = uLights[0].CosInner - uLights[0].CosOuter;
            atten = smoothstep(0.0, 1.0, pow(num/denom, uLights[0].DropOff));
        }
    }
    return atten;
}

float DistanceDropOff(float dist) {
    float atten = 0.0;
    if (dist <= uLights[0].Far) {
        if (dist <= uLights[0].Near)
            atten = 1.0;  //  no attenuation
        else {
            // simple quadratic drop off
            float n = dist - uLights[0].Near;
            float d = uLights[0].Far - uLights[0].Near;
            atten = smoothstep(0.0, 1.0, 1.0-(n*n)/(d*d)); // blended attenuation
        }   
    }
    return atten;
}

float LightStrength() {
    float aAtten = 1.0, dAtten = 1.0;
    vec3 lgtDir = -normalize(uLights[0].Direction.xyz);
    vec3 L; // light vector
    float dist; // distance to light
    if (uLights[0].LightType == eDirectionalLight) {
        L = lgtDir;
    } else {
        L = uLights[0].Position.xyz - gl_FragCoord.xyz;
        dist = length(L);
        L = L / dist;
    }
    if (uLights[0].LightType == eSpotLight) {
        // spotlight: do angle dropoff
        aAtten = AngularDropOff(lgtDir, L);
    }
    if (uLights[0].LightType != eDirectionalLight) {
        // both spot and point light has distance dropoff
        dAtten = DistanceDropOff(dist);
    }
    float result = aAtten * dAtten;
    return result;
}

void main(void)
{
    vec4 texFragColor = texture2D(uSampler, vTexCoord);
    float lgtStrength = LightStrength();
    if (lgtStrength < kLightStrengthCutOff)
        discard;
    vec3 shadowColor = lgtStrength * uPixelColor.rgb;
    shadowColor *= uPixelColor.a * texFragColor.a;
    gl_FragColor = vec4(shadowColor,  kMaxShadowOpacity * lgtStrength * texFragColor.a);
}