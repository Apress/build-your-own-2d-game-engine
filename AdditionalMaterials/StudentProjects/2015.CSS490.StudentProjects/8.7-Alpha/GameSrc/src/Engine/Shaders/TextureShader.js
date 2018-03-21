/* 
 * David Watson
 * CSS 490C
 * 2D Game Engine Design
 * File: TextureShader.js 
 * 
 * This is the file that handles the compiling of the texture shaders
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var gEngine = gEngine || {};

// constructor
function TextureShader(vertexShaderPath, fragmentShaderPath) {
    // Call super class constructor
    SimpleShader.call(this, vertexShaderPath, fragmentShaderPath);
    
    // reference to aTextureCoordinate within the shader
    this.mShaderTextureCoordAttribute = null;
    this.mSamplerRef = null;
    
    // get the reference of aTextureCoordinate from the shader
    var gl = gEngine.Core.getGL();
    this.mSamplerRef = gl.getUniformLocation(this.mCompiledShader, "uSampler");
    this.mShaderTextureCoordAttribute =
            gl.getAttribLocation(this.mCompiledShader, "aTextureCoordinate");
}
// get all the prototype functions from SimpleShader
gEngine.Core.inheritPrototype(TextureShader, SimpleShader);

// Overriding the Activation of the shader for rendering
TextureShader.prototype.activateShader = function (pixelColor, aCamera) {
    // first call the super class's activate
    SimpleShader.prototype.activateShader.call(this, pixelColor, aCamera);

    // now our own functionality: enable texture coordinate array
    var gl = gEngine.Core.getGL();
    gl.bindBuffer(gl.ARRAY_BUFFER, gEngine.VertexBuffer.getGLTexCoordRef());
    gl.enableVertexAttribArray(this.mShaderTextureCoordAttribute);
    gl.vertexAttribPointer(this.mShaderTextureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
    gl.uniform1i(this.mSamplerRef, 0);
};