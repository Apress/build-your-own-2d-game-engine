/* File: Wing.js *
 * Creates and initializes a Wing object
 * overrides the update function of GameObject to define
 * simple sprite animation behavior behavior
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteAnimateRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Wing(spriteTexture, atX, atY, speed) {
    this.kDelta = 0.2;
    this.mMinion = new SpriteAnimateRenderable(spriteTexture);
    this.mMinion.setColor([1, 1, 1, 0]);
    this.mMinion.getXform().setPosition(atX, atY);
    this.mMinion.getXform().setSize(10, 8);
    this.mMinion.setSpriteSequence(1024, 0,      // first element pixel position: top-left 512 is top of image, 0 is left of image
        566, 566,   // widthxheight in pixels
        3,          // number of elements in this sequence
        0);         // horizontal padding in between
    this.mMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mMinion.setAnimationSpeed(15);
    // show each element for mAnimSpeed updates

    GameObject.call(this, this.mMinion);
    this.setSpeed(speed);

    this.hitTime = 0;
    this.invincible = false;

}

gEngine.Core.inheritPrototype(Wing, GameObject);

Wing.prototype.draw = function (aCamera, boxActivity) {
    GameObject.prototype.draw.call(this, aCamera);  // default moving forward
    if (boxActivity) {
        GameObject.prototype.drawBBox.call(this, aCamera);  // default moving forward
    }

};

Wing.prototype.hit = function () {
    this.hitTime -= 1;
    this.mMinion.getColor()[3] += 0.2;
    this.invincible = true;
};
Wing.prototype.isInvincible=function () {
    return this.invincible
};

Wing.prototype.update = function () {
    // remember to update this.mMinion's animation
    this.mMinion.updateAnimation();

    GameObject.prototype.update.call(this);  // default moving forward

    if (this.hitTime > 0) {
        this.hit();
    }

};