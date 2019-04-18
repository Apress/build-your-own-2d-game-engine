/* 
 * File: TextureShader.js
 * Subclass from SimpleShader
 * Implements a Textured ShaderProgram object.
 */

/*jslint node: true, vars: true */
/*global gEngine: false, UISimpleShader: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

//<editor-fold desc="constructor">
// constructor
function UITextureShader(vertexShaderPath, fragmentShaderPath) {
    // Call super class constructor
    UISimpleShader.call(this, vertexShaderPath, fragmentShaderPath);  // call SimpleShader constructor

    // reference to aTextureCoordinate within the shader
    this.mShaderTextureCoordAttribute = null;

    // get the reference of aTextureCoordinate within the shader
    var gl = gEngine.Core.getGL();
    this.mShaderTextureCoordAttribute = gl.getAttribLocation(this.mCompiledShader, "aTextureCoordinate");
}

// get all the prototype functions from SimpleShader
gEngine.Core.inheritPrototype(UITextureShader, UISimpleShader);


//</editor-fold>

// <editor-fold desc="Public Methods">

// Overriding the Activation of the shader for rendering
UITextureShader.prototype.activateShader = function (pixelColor, aCamera) {
    // first call the super class's activate
    UISimpleShader.prototype.activateShader.call(this, pixelColor, aCamera);

    // now our own functionality: enable texture coordinate array
    var gl = gEngine.Core.getGL();
    gl.bindBuffer(gl.ARRAY_BUFFER, gEngine.VertexBuffer.getGLTexCoordRef());
    gl.enableVertexAttribArray(this.mShaderTextureCoordAttribute);
    gl.vertexAttribPointer(this.mShaderTextureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
};
//</editor-fold>