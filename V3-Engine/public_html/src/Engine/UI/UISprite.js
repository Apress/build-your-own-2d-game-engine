/* File: UISprite.js
 *      Sprite class for the UI
 */
"use strict";
/**
 * A sprite for UI
 * @param {texture} sprite The sprite sheet to map the UISprite to
 * @param {Array[]} position The base location for the UISprite
 * @param {Array[]} size The size of the UISprite
 * @param {Array[]} uvPos The UV location for the texture
 * @class UISprite
 * @returns {UISprite}
 */
function UISprite(sprite, position, size, uvPos) {
    this.mSprite = new SpriteRenderable(sprite);
    this.mSprite._setShader(gEngine.DefaultResources.getUnlitSpriteShader());
    if(uvPos !== null)
        this.mSprite.setElementUVCoordinate(uvPos[0], uvPos[1], uvPos[2], uvPos[3]);
    
    this.mSprite.getXform().setZPos(3);
    UIRenderable.call(this, [1, 1, 1, 0], position, size);
}
gEngine.Core.inheritPrototype(UISprite, UIRenderable);

/**
 * Sets the PixelPosition that the UISprite grabs from the Sprite Sheet
 * @param {float} left The left position
 * @param {float} right The right Position
 * @param {float} bottom The bottom position
 * @param {float} top The top position
 * @memberOf UISprite
 */
UISprite.prototype.setElementPixelPositions = function(left, right, bottom, top) {
  this.mSprite.setElementPixelPositions(left, right, bottom, top);  
};

/**
 * Sets the UVCoordinates that the UISprite grabs from the Sprite Sheet
 * @param {float} left The left position
 * @param {float} right The right Position
 * @param {float} bottom The bottom position
 * @param {float} top The top position
 * @memberOf UISprite
 */
UISprite.prototype.setElementUVCoordinate = function(left, right, bottom, top) {
  this.mSprite.setElementUVCoordinate(left, right, bottom, top);  
};

/**
 * Sets the Texture to be used by the UISprite
 * @param {String} tex The location of the Texture to be used
 * @memberOf UISprite
 */
UISprite.prototype.setTexture = function(tex) {
    this.mSprite.setTexture(tex);
};

/**
 * Sets the Color of the UISprite
 * @param {float[]} c The desired color to tint the Sprite
 * @memberOf UISprite
 */
UISprite.prototype.setColor = function(c) {
    this.mSprite.setColor(c);
};

/**
 * Draws the Sprite to the given Camera
 * @param {Camera} aCamera The camera to which the Sprite is drawn
 * @memberOf UISprite
 */
UISprite.prototype.draw = function (aCamera) {
    this._applyUIXform(this.mSprite, aCamera);
    this.mSprite.draw(aCamera);
};