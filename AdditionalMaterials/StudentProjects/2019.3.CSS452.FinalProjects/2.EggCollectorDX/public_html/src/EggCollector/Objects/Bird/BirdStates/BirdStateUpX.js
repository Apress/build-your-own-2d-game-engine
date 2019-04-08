"use strict";

function BirdStateUpX(bird, u_x) {
    BirdState.call(this, bird);
    this.mXNormal = u_x;
    this.mSpeedCheck = null;
}
gEngine.Core.inheritPrototype(BirdStateUpX, BirdState);

BirdStateUpX.prototype.update = function() {
    if (this._checkFlyingStateChange())
        return;
    
    if (this.mBird.mNextFlap < Date.now()) {
        this.mBird.mNextFlap = Date.now() + this.mBird.mFlapFrequency;
        this.mV[1] = this.mWP[1] + Math.abs(this.mV[0]) * 0.1;
    }
    if (this.mXNormal * this.mV[0] < this.mWP[0]) {
        this.mV[0] += this.mXNormal * this.mWP[0] / 30;
    }
    
    this.mSpeedCheck();
    BirdState.prototype.update.call(this);
};

BirdStateUpX.prototype.initialize = function() {
    if (this.mXNormal * this.mV[0] < 0) {
        this.mV[0] = 0;
    }
    this._soarCheck();
    if (this._vertCheck() && this.mBird.mNextFlap > Date.now()) {
        this.mSprite.setCurrentElement((1 - ((this.mBird.mNextFlap - Date.now()) / this.mBird.mFlapFrequency)) * 8);
    }
};

BirdStateUpX.prototype._soarCheck = function() {
    this.mSprite.getXform().setRotationInDegree(-10 * this.mV[0] / this.mWP[0]);
    if (this.mXNormal * this.mV[0] >= 10) {
        this.mSpeedCheck = this._vertCheck;
        this.mSprite.setSpriteSequence(1536, 0, 512, 512, 8, 0);
        this.mSprite.getXform().setSize(this.mXNormal * 20, 20);
        this.mSprite.getXform().setRotationInDegree(this.mXNormal * 5);
        this.mRigidBody.setSize(10, 4);
        return true;
    }
    return false;
};

BirdStateUpX.prototype._vertCheck = function() {
    if (this.mXNormal * this.mV[0] < 10) {
        this.mSpeedCheck = this._soarCheck;
        this.mSprite.setSpriteSequence(2048, 0, 512, 512, 8, 0);
        this.mSprite.getXform().setRotationInDegree(this.mXNormal * -10);
        this.mSprite.getXform().setSize(20, 20);
        this.mRigidBody.setSize(4, 10);
        return true;
    }
    return false;
};

BirdStateUpX.prototype.getBBox = function() {
    if (this.mSoar) {
        var xform = this.mSprite.getXform();
        return new BoundingBox(xform.getPosition(), Math.abs(xform.getWidth() * 0.5), xform.getHeight() * 0.2);
    } else {
        return BirdState.prototype.getBBox.call(this);
    }
};