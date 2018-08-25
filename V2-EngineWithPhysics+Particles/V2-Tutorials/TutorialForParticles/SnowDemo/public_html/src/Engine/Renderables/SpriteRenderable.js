/*
 * File: SpriteRenderable.js
 *  
 * Texture objects where texture coordinate can change
 */
/*jslint node: true, vars: true */
/*global gEngine: false, Renderable: false, TextureRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

// Constructor and object definition
"use strict";  // Operate in Strict mode such that variables must be declared before used!

/**
 * Constructor of SpriteRenderable object.
 * @class SpriteRenderable
 * @param {Texture} myTexture Texture to be associated by object.
 * @returns {SpriteRenderable} Instance of this SpriteRenderable object
 */
function SpriteRenderable(myTexture) {
    TextureRenderable.call(this, myTexture);
    Renderable.prototype._setShader.call(this, gEngine.DefaultResources.getSpriteShader());
    this.mTexLeft = 0.0;   // bounds of texture coordinate (0 is left, 1 is right)
    this.mTexRight = 1.0;  // 
    this.mTexTop = 1.0;    //   1 is top and 0 is bottom of image
    this.mTexBottom = 0.0; // 

    // 
    this._setTexInfo();
}
gEngine.Core.inheritPrototype(SpriteRenderable, TextureRenderable);

//<editor-fold desc="Public Methods">

// Convention: eName is an enumerated data type
/**
 * the expected texture cooridnate array is an array of 8 floats where elements:<p>
 * [0] [1]: is u/v coordinate of Top-Right<p>
 * [2] [3]: is u/v coordinate of Top-Left<p>
 * [4] [5]: is u/v coordinate of Bottom-Right<p>
 * [6] [7]: is u/v coordinate of Bottom-Left
 * @memberOf SpriteRenderable
 * @type {float[]|enum}
 */
SpriteRenderable.eTexCoordArray = Object.freeze({
    eLeft: 2,
    eRight: 0,
    eTop: 1,
    eBottom: 5
});

//**-----------------------------------------
// Public methods
//**-----------------------------------------

/**
 * specify element region by texture coordinate (between 0 to 1)
 * @memberOf SpriteRenderable
 * @param {float} left - Sets the Left UV Coordinate.
 * @param {float} right - Sets the Right UV Coordinate.
 * @param {float} bottom - Sets the Bottom UV Coordinate.
 * @param {float} top - Sets the Top UV Coordinate.
 * @returns {void}
 */
SpriteRenderable.prototype.setElementUVCoordinate = function (left, right, bottom, top) {
    this.mTexLeft = left;
    this.mTexRight = right;
    this.mTexBottom = bottom;
    this.mTexTop = top;
    this._setTexInfo();
};

/**
 * specify element region by pixel positions (between 0 to image resolutions)
 * @memberOf SpriteRenderable
 * @param {float} left - Sets the Left pixel position.
 * @param {float} right - Sets the Right pixel position.
 * @param {float} bottom - Sets the Bottom pixel position.
 * @param {float} top - Sets the Top pixel position.
 * @returns {void}
 */
SpriteRenderable.prototype.setElementPixelPositions = function (left, right, bottom, top) {
    var imageW = this.mTextureInfo.mWidth;
    var imageH = this.mTextureInfo.mHeight;

    this.mTexLeft = left / imageW;
    this.mTexRight = right / imageW;
    this.mTexBottom = bottom / imageH;
    this.mTexTop = top / imageH;
    this._setTexInfo();
};

/**
 * Returns a UV Coordinate Array.
 * @memberOf SpriteRenderable
 * @returns {float[]} UV Voordinate Array
 */
SpriteRenderable.prototype.getElementUVCoordinateArray = function () {
    return [
        this.mTexRight,  this.mTexTop,          // x,y of top-right
        this.mTexLeft,   this.mTexTop,
        this.mTexRight,  this.mTexBottom,
        this.mTexLeft,   this.mTexBottom
    ];
};

/**
 * Draws the SpriteRenderable to the screen in the aCamera viewport.
 * @memberOf SpriteRenderable
 * @param {Camera} aCamera - drawing Camera of the SpriteRenderable.
 * @returns {void}
 */
SpriteRenderable.prototype.draw = function (aCamera) {
    // set the current texture coordinate
    // 
    // activate the texture
    this.mShader.setTextureCoordinate(this.getElementUVCoordinateArray());
    TextureRenderable.prototype.draw.call(this, aCamera);
};

//--- end of Public Methods
//
//</editor-fold>