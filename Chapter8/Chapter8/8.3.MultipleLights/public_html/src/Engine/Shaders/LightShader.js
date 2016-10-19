/* 
 * File: LightShader.js
 * Subclass from SpriteShader
 *          Supports light illumination
 */
/*jslint node: true, vars: true */
/*global gEngine, SpriteShader, ShaderLightAtIndex, vec4 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

//<editor-fold desc="constructor">
// constructor 
function LightShader(vertexShaderPath, fragmentShaderPath) {
    // Call super class constructor
    SpriteShader.call(this, vertexShaderPath, fragmentShaderPath);  // call SimpleShader constructor

    this.mLights = null;  // lights from the Renderable

    //*******WARNING***************
    // this number MUST correspond to the GLSL uLight[] array size (for LightFS.glsl)
    //*******WARNING********************
    this.kGLSLuLightArraySize = 4;  // <-- make sure this is the same as LightFS.glsl
    this.mShaderLights = [];
    var i, ls;
    for (i = 0; i < this.kGLSLuLightArraySize; i++) {
        ls = new ShaderLightAtIndex(this.mCompiledShader, i);
        this.mShaderLights.push(ls);
    }
}
gEngine.Core.inheritPrototype(LightShader, SpriteShader);
//</editor-fold>

// <editor-fold desc="Public Methods">

// Overriding the Activation of the shader for rendering
LightShader.prototype.activateShader = function (pixelColor, aCamera) {
    // first call the super class's activate
    SpriteShader.prototype.activateShader.call(this, pixelColor, aCamera);

    // now push the light information to the shader
    var numLight = 0;
    if (this.mLights !== null) {
        while (numLight < this.mLights.length) {
            this.mShaderLights[numLight].loadToShader(aCamera, this.mLights[numLight]);
            numLight++;
        }
    }
    // switch off the left over ones.
    while (numLight < this.kGLSLuLightArraySize) {
        this.mShaderLights[numLight].switchOffLight(); // switch off unused lights
        numLight++;
    }
};

LightShader.prototype.setLights = function (l) {
    this.mLights = l;
};
//</editor-fold>