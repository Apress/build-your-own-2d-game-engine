/* File: Heart.js
 *
 * Creates and initializes a simple Heart object
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false, vec2: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Heart(spriteTexture,atX) {

    //TODO get another texture
    this.mHeart = new SpriteRenderable(spriteTexture);
    this.mHeart.setColor([1, 1, 1, 0]);
    this.mHeart.getXform().setPosition(atX, 105);
    this.mHeart.getXform().setSize(5, 5);
    // this.mHeart.setElementPixelPositions(130, 310, 0, 180);
    this.mHeart.setElementPixelPositions(0, 64, 0, 64);
    // this.mHeart.setElementPixelPositions(0, 120, 0, 180);


    GameObject.call(this, this.mHeart);


}

gEngine.Core.inheritPrototype(Heart, GameObject);

Heart.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);  // default moving forward

};

Heart.prototype.update = function () {
    // GameObject.prototype.update.call(this);  // default moving forward


};