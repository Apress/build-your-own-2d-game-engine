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
    UITexture.call(this, sprite, position, size);
    this.mRenderable = new SpriteRenderable(sprite);
    this.mRenderable._setShader(gEngine.DefaultResources.getUnlitSpriteShader());
    if(uvPos !== null) {
        this.mRenderable.setElementUVCoordinate(uvPos[0], uvPos[1], uvPos[2], uvPos[3]);
    }
    this.mRenderable.getXform().setZPos(3);
}
gEngine.Core.inheritPrototype(UISprite, UITexture);

/**
 * Sets the PixelPosition that the UISprite grabs from the Sprite Sheet
 * @param {float} left The left position
 * @param {float} right The right Position
 * @param {float} bottom The bottom position
 * @param {float} top The top position
 * @memberOf UISprite
 */
UISprite.prototype.setElementPixelPositions = function(left, right, bottom, top) {
  this.mRenderable.setElementPixelPositions(left, right, bottom, top);  
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
  this.mRenderable.setElementUVCoordinate(left, right, bottom, top);  
};
