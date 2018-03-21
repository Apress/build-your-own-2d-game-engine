/* File: UISprite.js
 *      Sprite class for the UI
 */
"use strict";

function UISprite(sprite, position, size, uvPos) {
    this.mSprite = new LightRenderable(sprite);
    if(uvPos !== null)
        this.mSprite.setElementUVCoordinate(uvPos[0], uvPos[1], uvPos[2], uvPos[3]);
    UIElement.call(this, this.mSprite, position, size);
}
gEngine.Core.inheritPrototype(UISprite, UIElement);

UISprite.prototype.setElementPixelPositions = function(left, right, bottom, top) {
  this.mSprite.setElementPixelPositions(left, right, bottom, top);  
};