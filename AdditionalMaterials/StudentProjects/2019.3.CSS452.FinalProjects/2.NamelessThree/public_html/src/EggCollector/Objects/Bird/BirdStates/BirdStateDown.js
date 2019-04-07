"use strict";

function BirdStateDown(bird) {
    BirdState.call(this, bird);
}
gEngine.Core.inheritPrototype(BirdStateDown, BirdState);

BirdStateDown.prototype.update = function() {
    if (this._checkFlyingStateChange())
        return;
    if (this._checkGrounded())
        return;
    
    this.mV[0] /= (1 + this.mBird.mDraft);
    this.mV[1] += this.mV[1] * 0.02;
    BirdState.prototype.update.call(this);
};

BirdStateDown.prototype.initialize = function() {
    if (this.mV[1] > -this.mWP[1]) {
        this.mV[1] = -this.mWP[1];
    }
    this.mSprite.setSpriteSequence(1024, 0, 512, 512, 1, 0);
    this.mSprite.getXform().setSize(20, 20);
    this.mSprite.getXform().setRotationInDegree(0);
    this.mRigidBody.setSize(4, 10);
};