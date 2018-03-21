/* 
 * David Watson
 * CSS 490C
 * 2D Game Engine Design
 * File: ShadowCasterShader.js 
 * 
 * This file handlges the shadow caster shader
 */


function ShadowCasterShader(vertexShaderPath, fragmentShaderPath) {
    // Call super class constructor
    SpriteShader.call(this, vertexShaderPath, fragmentShaderPath);
    this.mLight = null;  // The light that casts the shadow
    // **** The GLSL Shader must define uLights[1] <-- as the only light source!!
    this.mShaderLight = new ShaderLightAtIndex(this.mCompiledShader, 0);
}
gEngine.Core.inheritPrototype(ShadowCasterShader, SpriteShader);

// Overriding the Activation of the shader for rendering
ShadowCasterShader.prototype.activateShader = function (pixelColor, aCamera) {
    // first call the super class's activate
    SpriteShader.prototype.activateShader.call(this, pixelColor, aCamera);
    this.mShaderLight.loadToShader(aCamera, this.mLight);
};

ShadowCasterShader.prototype.setLight = function (l) {
    this.mLight = l;
};