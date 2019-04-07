"use strict";

function BirdStateNormal(bird) {
    BirdState.call(this, bird);
}
gEngine.Core.inheritPrototype(BirdStateNormal, BirdState);

BirdStateNormal.prototype.update = function() {
    if (this._checkFlyingStateChange())
        return;
    if (this._checkGrounded())
        return;
    
    if (this.mBird.mNextSmallFlap < Date.now() && this.mV[1] < -1) {
        this.mBird.mNextSmallFlap = Date.now() + this.mBird.mFlapFrequency;
        this.mV[1] = this.mWP[1] * 0.10;
        this.mSprite.setSpriteSequence(2048, 0, 512, 512, 8, 0);
    }
    this.mV[0] /= (1 + this.mBird.mDraft);
    BirdState.prototype.update.call(this);
};

BirdStateNormal.prototype.initialize = function() {
    this.mSprite.setSpriteSequence(2048, 0, 512, 512, 8, 0);
    this.mSprite.getXform().setSize(20, 20);
    this.mSprite.getXform().setRotationInDegree(0);
    this.mRigidBody.setSize(4, 10);
       if (this.mBird.mNextFlap > Date.now()) {
            this.mSprite.setCurrentElement((1 - ((this.mBird.mNextFlap - Date.now()) / this.mBird.mFlapFrequency)) * 8);
        }
        else if (this.mBird.mNextSmallFlap > Date.now()) {
            this.mSprite.setCurrentElement((1 - ((this.mBird.mNextSmallFlap - Date.now()) / this.mBird.mFlapFrequency)) * 8);
        }
    };