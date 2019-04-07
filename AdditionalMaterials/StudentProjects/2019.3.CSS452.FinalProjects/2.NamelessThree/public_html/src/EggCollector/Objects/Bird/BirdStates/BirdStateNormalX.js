"use strict";

function BirdStateNormalX(bird, u_x) {
    BirdState.call(this, bird);
    this.mXNormal = u_x;
    this.mSoar = false;
    this.mSpeedCheck = null;
}
gEngine.Core.inheritPrototype(BirdStateNormalX, BirdState);

BirdStateNormalX.prototype.update = function(platforms) {
    if (this._checkFlyingStateChange())
        return;
    if (this._checkGrounded())
        return;
    
    if (this.mXNormal * this.mV[0] < this.mWP[0]) {
        this.mV[0] += this.mXNormal * this.mWP[0] / 30;
    }
    if (this.mV[1] < 0) {
        this.mV[1] *= this.mBird.mLift;
        if (this.mV[1] < -2) {
            this.mV[0] -= this.mXNormal * this.mV[1] * 0.05;
        }
    }
    
    this.mSpeedCheck();
    BirdState.prototype.update.call(this);
};

BirdStateNormalX.prototype.initialize = function() {
    if (this.mXNormal * this.mV[0] < 0) {
        this.mV[0] = 0;
    }
    this._soarCheck();
    if (this._vertCheck()) {
        if (this.mBird.mNextFlap > Date.now()) {
            this.mSprite.setCurrentElement((1 - ((this.mBird.mNextFlap - Date.now()) / this.mBird.mFlapFrequency)) * 8);
        }
        else {
            this.mSprite.setCurrentElement((1 - ((this.mBird.mNextSmallFlap - Date.now()) / this.mBird.mFlapFrequency)) * 8);
        }
    }
};

BirdStateNormalX.prototype._soarCheck = function() {
    this.mSprite.getXform().setRotationInDegree(-10 * this.mV[0] / this.mWP[0]);
    if (this.mXNormal * this.mV[0] >= 10) {
        this.mSpeedCheck = this._vertCheck;
        this.mSprite.setSpriteSequence(1536, 1024, 512, 512, 1, 0);
        this.mSprite.getXform().setSize(this.mXNormal * 20, 20);
        this.mSprite.getXform().setRotationInDegree(0);
        this.mRigidBody.setSize(10, 4);
        this.mSoar = true;
        return true;
    }
    return false;
};

BirdStateNormalX.prototype._vertCheck = function() {
    if (this.mXNormal * this.mV[0] < 10) {
        this.mSpeedCheck = this._soarCheck;
        this.mSprite.setSpriteSequence(2048, 0, 512, 512, 8, 0);
        this.mSprite.getXform().setRotationInDegree(this.mXNormal * -10);
        this.mSprite.getXform().setSize(20, 20);
        this.mRigidBody.setSize(4, 10);
        this.mSoar = false;
        return true;
    }
    return false;
};

BirdStateNormalX.prototype.getBBox = function() {
    if (this.mSoar) {
        var xform = this.mSprite.getXform();
        return new BoundingBox(xform.getPosition(), Math.abs(xform.getWidth() * 0.5), xform.getHeight() * 0.2);
    } else {
        return BirdState.prototype.getBBox.call(this);
    }
};