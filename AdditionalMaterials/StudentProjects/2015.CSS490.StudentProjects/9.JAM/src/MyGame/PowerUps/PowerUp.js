/*jslint node: true, vars: true */
/*global gEngine, GameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


function PowerUp() {
    this.mExpired = false;
    this.mPowerUp = null;
    this.mCurrentLife = 240;
    this.mDeltaX = 0.1 + 0.3 * Math.random();
    this.mDeltaY = 0.1 + 0.3 * Math.random();
    if (Math.random() > 0.5)
        this.mDeltaX = -this.mDeltaX;
    if (Math.random() > 0.5)
        this.mDeltaY = -this.mDeltaY;
}
gEngine.Core.inheritPrototype(PowerUp, GameObject);

// remove from game
PowerUp.prototype.setExpired = function() {
    this.mExpired = true;
};
PowerUp.prototype.hasExpired = function() {
    return this.mExpired;
};

// get type of power up
PowerUp.prototype.getPowerUp = function() {
    return this.mPowerUp;
};
// set type of power up
PowerUp.prototype.setPowerUp = function(powerUp) {
    this.mPowerUp = powerUp;
};

// movement for powerup
PowerUp.prototype.update = function (aCamera) {
    // time limit for life
    this.mCurrentLife--;
    if (this.mCurrentLife === 0)
        this.setExpired();

    // fade out
    var color = this.getColor();
    if (this.mCurrentLife < 75) {
        color[3] = color[3] + 0.01;
    }

    // bounce around
    var pos = this.getXform().getPosition();
    if (this.mDeltaY > 0 && aCamera.collideWCBound(this.getXform(), 1) === BoundingBox.eboundCollideStatus.eCollideTop)
        this.mDeltaY = -this.mDeltaY;
    if (this.mDeltaY < 0 && aCamera.collideWCBound(this.getXform(), 1) === BoundingBox.eboundCollideStatus.eCollideBottom)
        this.mDeltaY = -this.mDeltaY;
    if (this.mDeltaX < 0 && aCamera.collideWCBound(this.getXform(), 1) === BoundingBox.eboundCollideStatus.eCollideLeft)
        this.mDeltaX = -this.mDeltaX;
    if (this.mDeltaX > 0 && aCamera.collideWCBound(this.getXform(), 1) === BoundingBox.eboundCollideStatus.eCollideRight)
        this.mDeltaX = -this.mDeltaX;

    this.getXform().setXPos(pos[0] + aCamera.getSpeed() + this.mDeltaX);
    this.getXform().setYPos(pos[1] + this.mDeltaY);
};
