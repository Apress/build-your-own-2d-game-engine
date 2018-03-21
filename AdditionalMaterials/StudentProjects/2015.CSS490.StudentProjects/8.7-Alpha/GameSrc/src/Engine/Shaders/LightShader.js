/* 
 * David Watson
 * CSS 490C
 * 2D Game Engine Design
 * File: LightShader.js 
 * 
 * This defines the shader for implementing a light source
 */


"use strict";
function LightShader(vertexShaderPath, fragmentShaderPath) {
    // Call super class constructor
    SpriteShader.call(this, vertexShaderPath, fragmentShaderPath);
    
    this.mLights = null;  // lights from the renderable
    
    this.kGLSLuLightArraySize = 6; // <-- make sure this is
    // the same as LightFS.glsl
    
    this.mShaderLights = [];
    for (var i = 0; i < this.kGLSLuLightArraySize; i++) {
        var ls = new ShaderLightAtIndex(this.mCompiledShader, i);
        this.mShaderLights.push(ls);
    }
}
gEngine.Core.inheritPrototype(LightShader, SpriteShader);

LightShader.prototype.setLights = function (l) {
    this.mLights = l;
};

// Overriding the Activation of the shader for rendering
LightShader.prototype.activateShader = function (pixelColor, aCamera) {
    // first call the super class's activate
    SpriteShader.prototype.activateShader.call(this, pixelColor, aCamera);
    
    // now push the light information to the shader
    var numLight = 0;
    if (this.mLights !== null) {
        while (numLight < this.mLights.length) {
            this.mShaderLights[numLight].loadToShader(
                    aCamera, this.mLights[numLight]);
            numLight++;
        }
    }
    
    // switch off the left over ones.
    while (numLight < this.kGLSLuLightArraySize) {
        this.mShaderLights[numLight].switchOffLight(); // switch off unused lights
        numLight++;
    }
};

