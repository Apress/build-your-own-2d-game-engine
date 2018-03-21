/* 
 * File: SpriteShader.js
 * Subclass from TextureShader
 * Implements a Textured ShaderProgram object where texture coordinate can be changed
 * at run time.
 */

/*jslint node: true, vars: true */
/*global gEngine: false, SimpleShader: false, TextureShader: false, Float32Array: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

//<editor-fold desc="constructor">
// constructor 
function SpriteShader(vertexShaderPath, fragmentShaderPath) {
    // Call super class constructor
    TextureShader.call(this, vertexShaderPath, fragmentShaderPath);  // call SimpleShader constructor

    this.mTexCoordBuffer = null; // this is the reference to gl buffer that contains the actual texture coordinate

    var initTexCoord = [
        1.0, 1.0,
        0.0, 1.0,
        1.0, 0.0,
        0.0, 0.0
    ];

    var gl = gEngine.Core.getGL();
    this.mTexCoordBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, this.mTexCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(initTexCoord), gl.DYNAMIC_DRAW);
            // DYNAMIC_DRAW: says buffer content may change!
}

// get all the prototype functions from SimpleShader
gEngine.Core.inheritPrototype(SpriteShader, TextureShader);

//</editor-fold>

// <editor-fold desc="Public Methods">

// Overriding the Activation of the shader for rendering
SpriteShader.prototype.activateShader = function (pixelColor, aCamera) {
    // first call the super class's activate
    SimpleShader.prototype.activateShader.call(this, pixelColor, aCamera);

    // now binds the proper texture coordinate buffer
    var gl = gEngine.Core.getGL();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.mTexCoordBuffer);
    gl.vertexAttribPointer(this.mShaderTextureCoordAttribute,
            2,
            gl.FLOAT,
            false,
            0,
            0);
    gl.enableVertexAttribArray(this.mShaderTextureCoordAttribute);
};

SpriteShader.prototype.setTextureCoordinate = function (texCoord) {
    var gl = gEngine.Core.getGL();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.mTexCoordBuffer);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(texCoord));
};

SpriteShader.prototype.cleanUp = function () {
    var gl = gEngine.Core.getGL();
    gl.deleteBuffer(this.mTexCoordBuffer);
    // now call super class's clean up ...
    SimpleShader.prototype.cleanUp.call(this);
};

// make sure these functions are defined, such that
// this shader can support LightRenderable and IllumRenderable

// will be override by LightShader
SpriteShader.prototype.setLights = function (l) { };

// will be override by IllumShader
SpriteShader.prototype.setMaterialAndCameraPos = function(m, p) { };

//</editor-fold>