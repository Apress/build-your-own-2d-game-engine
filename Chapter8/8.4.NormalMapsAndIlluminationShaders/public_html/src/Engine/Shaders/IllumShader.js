/* 
 * File: NaormalMapShader.js
 * Subclass from LightShader (to take advantage of light sources)
 */
/*jslint node: true, vars: true */
/*global gEngine, SpriteShader, LightShader, ShaderLightAtIndex, vec4 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

//<editor-fold desc="constructor">
// constructor 
function IllumShader(vertexShaderPath, fragmentShaderPath) {
    // Call super class constructor
    LightShader.call(this, vertexShaderPath, fragmentShaderPath);  // call super class constructor

    // reference to the normal map sampler
    var gl = gEngine.Core.getGL();
    this.mNormalSamplerRef = gl.getUniformLocation(this.mCompiledShader, "uNormalSampler");
}
gEngine.Core.inheritPrototype(IllumShader, LightShader);
//</editor-fold>

// <editor-fold desc="Public Methods">

// Overriding the Activation of the shader for rendering
IllumShader.prototype.activateShader = function(pixelColor, aCamera) {
    // first call the super class's activate
    LightShader.prototype.activateShader.call(this, pixelColor, aCamera);
    var gl = gEngine.Core.getGL();
    gl.uniform1i(this.mNormalSamplerRef, 1); // binds to texture unit 1
    // do not need to set up texture coordinate buffer
    // as we are going to use the ones from the sprite texture 
    // in the fragment shader
};

//</editor-fold>