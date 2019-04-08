"use strict";

function BirdStateDownX(bird, u_x) {
    BirdState.call(this, bird);
    this.mXNormal = u_x;
}
gEngine.Core.inheritPrototype(BirdStateDownX, BirdState);

BirdStateDownX.prototype.update = function() {
    if (this._checkFlyingStateChange())
        return;
    if (this._checkGrounded())
        return;
    
    this.mV[1] += this.mV[1] * 0.02; // made up this number

    if (this.mXNormal * this.mV[0] < this.mWP[0]) {
        this.mV[0] += this.mXNormal * this.mWP[0] / 30;
        this.mSprite.getXform().setRotationInDegree(10 * this.mV[0] / this.mWP[0]);
    }
    BirdState.prototype.update.call(this);
};

BirdStateDownX.prototype.initialize = function() {
    if (this.mV[1] > -this.mWP[1]) {
        this.mV[1] = -this.mWP[1];
    }
    if (this.mXNormal * this.mV[0] < 0) {
        this.mV[0] = 0;
    }
    this.mSprite.setSpriteSequence(1024, 0, 512, 512, 1, 0);
    this.mSprite.getXform().setRotationInDegree(this.mXNormal * 10);
    this.mSprite.getXform().setSize(20, 20);
    this.mRigidBody.setSize(4, 10);
};