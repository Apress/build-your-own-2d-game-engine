/*
 * File: TextureRenderable.js
 *  
 * Renderable objects with textures
 */
/*jslint node: true, vars: true */
/*global gEngine: false, Renderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

// Constructor and object definition
"use strict";  // Operate in Strict mode such that variables must be declared before used!

/**
 * Constructor of TextureRenderable object.
 * @class TextureRenderable
 * @param {Texture} myTexture - Texture to be associated by object.
 * @returns {TextureRenderable} - Instance of TextureRenderable object.
 */
function TextureRenderable(myTexture) {
    Renderable.call(this);
    Renderable.prototype.setColor.call(this, [1, 1, 1, 0]); // Alpha of 0: switch off tinting of texture
    Renderable.prototype._setShader.call(this, gEngine.DefaultResources.getTextureShader());

    this.mTexture = null;
    // these two instance variables are to cache texture information
    // for supporting per-pixel accurate collision
    this.mTextureInfo = null;
    this.mColorArray = null;
    // defined for subclass to override
    this.mTexWidth = 0;
    this.mTexHeight = 0;
    this.mTexLeftIndex = 0;
    this.mTexBottomIndex = 0;

    this.setTexture(myTexture);     // texture for this object, cannot be a "null"
}
gEngine.Core.inheritPrototype(TextureRenderable, Renderable);

//<editor-fold desc="Public Methods">
//**-----------------------------------------
// Public methods
//**-----------------------------------------
/**
 * Draws the TextureRenderable to the screen in the aCamera viewport.
 * @memberOf TextureRenderable
 * @param {Camera} aCamera - drawing Camera of the TextureRenderable.
 * @returns {void}
 */
TextureRenderable.prototype.draw = function (aCamera) {
    // activate the texture
    gEngine.Textures.activateTexture(this.mTexture);
    Renderable.prototype.draw.call(this, aCamera);
};

/**
 * Returns a refrence to Texture
 * @memberOf TextureRenderable
 * @returns {Texture} - Refrence to Texture.
 */
TextureRenderable.prototype.getTexture = function () { return this.mTexture; };

/**
 * Set Renderable Texture.
 * @memberOf TextureRenderable
 * @param {Texture} newTexture - Texture to set to TextureRenderable.
 * @returns {void}
 */
TextureRenderable.prototype.setTexture = function (newTexture) {
    this.mTexture = newTexture;
    // these two instance variables are to cache texture information
    // for supporting per-pixel accurate collision
    this.mTextureInfo = gEngine.Textures.getTextureInfo(newTexture);
    this.mColorArray = null;
    // defined for subclass to override
    this.mTexWidth = this.mTextureInfo.mWidth;
    this.mTexHeight = this.mTextureInfo.mHeight;
    this.mTexLeftIndex = 0;
    this.mTexBottomIndex = 0;
};
//--- end of Public Methods
//</editor-fold>