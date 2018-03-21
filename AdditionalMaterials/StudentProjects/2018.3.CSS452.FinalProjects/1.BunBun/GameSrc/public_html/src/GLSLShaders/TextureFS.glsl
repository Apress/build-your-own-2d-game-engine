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

// The "varying" keyword is for signifying that the texture coordinate will be
// interpolated and thus varies. 
varying vec2 vTexCoord;

void main(void)  {
    // texel color look up based on interpolated UV value in vTexCoord
    vec4 c = texture2D(uSampler, vec2(vTexCoord.s, vTexCoord.t));
    
    //c = c * uGlobalAmbientIntensity * uGlobalAmbientColor;

    // or: tint the textured area, and leave transparent area as defined by the texture
    //vec3 r = vec3(c) * (1.0-uPixelColor.a) + vec3(uPixelColor) * uPixelColor.a;
    //vec4 result = vec4(r, c.a);

    //gl_FragColor = result;

    //Erik's fix for environment changing alpha channel
    vec3 rgbColor = vec3(c * uGlobalAmbientColor) * uGlobalAmbientIntensity;
    rgbColor = (rgbColor * (1.0 - uPixelColor.a)) + (vec3(uPixelColor) * uPixelColor.a);

    //rgbColor = (uPixelColor.a * rgbColorTinted) + ((1.0 - uPixelColor.a) * rgbColor);

    gl_FragColor = vec4(rgbColor, c.a);
}

    