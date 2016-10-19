/* 
 * File: ShadowCasterShader.js
 * Subclass from SpriteShader
 *      a little similar to LightShader, except, only defines
 *      one light: the one that casts the shadow
 */
/*jslint node: true, vars: true */
/*global gEngine, SpriteShader, ShaderLightAtIndex, vec4 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

//<editor-fold desc="constructor">
// constructor 
function ShadowCasterShader(vertexShaderPath, fragmentShaderPath) {
    // Call super class constructor
    SpriteShader.call(this, vertexShaderPath, fragmentShaderPath);  // call SimpleShader constructor

    this.mLight = null;  // The light that casts the shadow

    // **** The GLSL Shader must define uLights[1] <-- as the only light source!!
    this.mShaderLight = new ShaderLightAtIndex(this.mCompiledShader, 0);
}
gEngine.Core.inheritPrototype(ShadowCasterShader, SpriteShader);
//</editor-fold>

// <editor-fold desc="Public Methods">

// Overriding the Activation of the shader for rendering
ShadowCasterShader.prototype.activateShader = function (pixelColor, aCamera) {
    // first call the super class's activate
    SpriteShader.prototype.activateShader.call(this, pixelColor, aCamera);
    this.mShaderLight.loadToShader(aCamera, this.mLight);
};

ShadowCasterShader.prototype.setLight = function (l) {
    this.mLight = l;
};
//</editor-fold>