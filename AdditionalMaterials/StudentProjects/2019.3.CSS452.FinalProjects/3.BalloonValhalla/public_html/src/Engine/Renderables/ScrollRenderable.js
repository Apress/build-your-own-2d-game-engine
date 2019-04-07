/*
 * File: ScrollRenderable.js
 *  
 * Texture objects where texture coordinate can change
 */
/*jslint node: true, vars: true */
/*global gEngine: false, Renderable: false, TextureRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

// Constructor and object definition
"use strict";  // Operate in Strict mode such that variables must be declared before used!

/**
 * Constructor of ScrollRenderable object.
 * @class ScrollRenderable
 * @param {Texture} myTexture Texture to be associated by object.
 * @param {float} rate Number of times to scroll through the texter, per second
 * @returns {ScrollRenderable} Instance of this ScrollRenderable object
 */
function ScrollRenderable(myTexture, rate) {
    SpriteRenderable.call(this, myTexture);
    this.mRate = rate;
}
gEngine.Core.inheritPrototype(ScrollRenderable, SpriteRenderable);

//<editor-fold desc="Public Methods">

//**-----------------------------------------
// Public methods
//**-----------------------------------------

ScrollRenderable.prototype.update = function() {
    SpriteRenderable.prototype.update.call(this);
    var time = (Date.now() / 1000 * this.mRate) % 1.0;
    this.setElementUVCoordinate(time, time + 1.0, 0.0, 1.0);
};

ScrollRenderable.prototype.draw = function (aCamera) {
    var gl = gEngine.Core.getGL();
    this.mShader.setTextureCoordinate(this.getElementUVCoordinateArray());
    gEngine.Textures.activateTexture(this.mTexture);
    
    // Enable texture wrappings
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    
    Renderable.prototype.draw.call(this, aCamera);
};

//--- end of Public Methods
//
//</editor-fold>