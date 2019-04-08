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
    if(uvPos !== null)
        this.mSprite.setElementUVCoordinate(uvPos[0], uvPos[1], uvPos[2], uvPos[3]);
    UIElement.call(this, this.mSprite, position, size);
}
gEngine.Core.inheritPrototype(UISprite, UIElement);

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