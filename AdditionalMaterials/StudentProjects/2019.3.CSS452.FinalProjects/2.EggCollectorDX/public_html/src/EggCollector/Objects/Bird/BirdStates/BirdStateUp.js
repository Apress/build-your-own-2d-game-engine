"use strict";

function BirdStateUp(bird) {
    BirdState.call(this, bird);
}
gEngine.Core.inheritPrototype(BirdStateUp, BirdState);

BirdStateUp.prototype.update = function() {
    if (this._checkFlyingStateChange())
        return;
    
    if (this.mBird.mNextFlap < Date.now()) {
        this.mBird.mNextFlap = Date.now() + this.mBird.mFlapFrequency;
        this.mV[1] = this.mWP[1] + Math.abs(this.mV[0]) * 0.1;
    }
    this.mV[0] /= (1 + this.mBird.mDraft);
    BirdState.prototype.update.call(this);
};

BirdStateUp.prototype.initialize = function() {
    this.mSprite.setSpriteSequence(2048, 0, 512, 512, 8, 0);
    this.mSprite.getXform().setSize(20, 20);
    this.mSprite.getXform().setRotationInDegree(0);
    this.mRigidBody.setSize(4, 10);
    
    if (this.mBird.mNextFlap > Date.now()) {
        this.mSprite.setCurrentElement((1 - ((this.mBird.mNextFlap - Date.now()) / this.mBird.mFlapFrequency)) * 8);
    }
};