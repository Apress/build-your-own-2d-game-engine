/* File: SavePoint.js
 *
 * Creates and initializes a simple SavePoint object
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false, vec2: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function SavePoint(spriteTexture) {

    //TODO get another texture
    this.mSavePoint = new SpriteRenderable(spriteTexture);
    //TODO set to red
    this.mSavePoint.setColor([1, 0, 0, 1]);
    this.mSavePoint.getXform().setPosition(20, 20);
    this.mSavePoint.getXform().setSize(7.5, 7.5);
    this.mSavePoint.setElementPixelPositions(0, 64, 0, 64);

    // this.mSavePoint.setElementPixelPositions(130, 310, 0, 180);

    GameObject.call(this, this.mSavePoint);


}

gEngine.Core.inheritPrototype(SavePoint, GameObject);

SavePoint.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);  // default moving forward

};


SavePoint.prototype.save = function () {
    //TODO change from red to green
    this.mSavePoint.setColor([0, 1, 0, 1]);


};
SavePoint.prototype.update = function (aCamera) {
    // GameObject.prototype.update.call(this);  // default moving forward


};