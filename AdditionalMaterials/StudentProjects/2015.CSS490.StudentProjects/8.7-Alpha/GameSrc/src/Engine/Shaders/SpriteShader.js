/* 
 * David Watson
 * CSS 490C
 * 2D Game Engine Design
 * File: SpriteShader.js 
 * 
 * This is the file that handles the compiling of the sprite shaders
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var gEngine = gEngine || {};

function SpriteShader(vertexShaderPath, fragmentShaderPath) {
    // Call super class constructor
    TextureShader.call(this, vertexShaderPath, fragmentShaderPath);
    
    this.mTexCoordBuffer = null; // gl buffer containing texture coordinate
    var initTexCoord = [
        1.0, 1.0,
        0.0, 1.0,
        1.0, 0.0,
        0.0, 0.0
    ];

    var gl = gEngine.Core.getGL();
    this.mTexCoordBuffer = gl.createBuffer();
    
    gl.bindBuffer(gl.ARRAY_BUFFER, this.mTexCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(initTexCoord),
            gl.DYNAMIC_DRAW);
}

// get all the prototype functions from SimpleShader
gEngine.Core.inheritPrototype(SpriteShader, TextureShader);

SpriteShader.prototype.setTextureCoordinate = function (texCoord) {
    var gl = gEngine.Core.getGL();
    
    gl.bindBuffer(gl.ARRAY_BUFFER, this.mTexCoordBuffer);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(texCoord));
};

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

SpriteShader.prototype.cleanUp = function () {
    var gl = gEngine.Core.getGL();
    gl.deleteBuffer(this.mTexCoordBuffer);
    
    // now call super class's clean up ...
    SimpleShader.prototype.cleanUp.call(this);
};

// will be override by LightShader
SpriteShader.prototype.setLights = function (l) { };

// will be override by IllumShader
SpriteShader.prototype.setMaterialAndCameraPos = function(m, p) { };

