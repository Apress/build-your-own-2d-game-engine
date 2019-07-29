/* 
 * File: UnlitTextureShader.js
 * Subclass from UnlitShader
 * Implements a Textured ShaderProgram object.
 */

/*jslint node: true, vars: true */
/*global gEngine: false, UnlitShader: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

//<editor-fold desc="constructor">
/**
 * Default Constructor<p>
 * Implements an Unlit Textured ShaderProgram object.
 * @param {string} vertexShaderPath filepath of the Vertex Shader.
 * @param {string} fragmentShaderPath filepath of the Fragment Shader.
 * @returns {UnlitTextureShader} An intsnace of UnlitTextureShader.
 * @class TextureShader
 */
function UnlitTextureShader(vertexShaderPath, fragmentShaderPath) {
    // Call super class constructor
    UnlitShader.call(this, vertexShaderPath, fragmentShaderPath);  // call SimpleShader constructor

    // reference to aTextureCoordinate within the shader
    this.mShaderTextureCoordAttribute = null;

    // get the reference of uSampler and aTextureCoordinate within the shader
    var gl = gEngine.Core.getGL();
    this.mSamplerRef = gl.getUniformLocation(this.mCompiledShader, "uSampler");
    this.mShaderTextureCoordAttribute = gl.getAttribLocation(this.mCompiledShader, "aTextureCoordinate");
}

// get all the prototype functions from UnlitShader
gEngine.Core.inheritPrototype(UnlitTextureShader, UnlitShader);


//</editor-fold>

// <editor-fold desc="Public Methods">

/**
 * Activate the shader for rendering.
 * @param {float[]} pixelColor [R, G, B, A] Sets the shader pixel color.
 * @param {Camera} aCamera Camera to draw to
 * @returns {void}
 * @memberOf TextureShader
 */
UnlitTextureShader.prototype.activateShader = function (pixelColor, aCamera) {
    // first call the super class's activate
    UnlitShader.prototype.activateShader.call(this, pixelColor, aCamera);

    // now our own functionality: enable texture coordinate array
    var gl = gEngine.Core.getGL();
    gl.bindBuffer(gl.ARRAY_BUFFER, gEngine.VertexBuffer.getGLTexCoordRef());
    gl.enableVertexAttribArray(this.mShaderTextureCoordAttribute);
    gl.vertexAttribPointer(this.mShaderTextureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
};
//</editor-fold>