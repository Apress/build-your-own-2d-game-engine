"use strict";

function BirdStateGroundX(bird, u_x) {
    BirdState.call(this, bird);
    this.mXNormal = u_x;
}
gEngine.Core.inheritPrototype(BirdStateGroundX, BirdState);

BirdStateGroundX._normalToInput = function(u_x) {
    if (u_x === -1)
        return Bird._input.LEFT;
    return Bird._input.RIGHT;
};

BirdStateGroundX.prototype.update = function() {
    if ((this.mBird.mInput & Bird._input.UP) || !this._isGrounded()) {
        this.mBird.mState = this.mBird.mStates[this.mBird.mInput];
        this.mBird.mState.initialize();
        this.mBird.mState.update();
        return;
    }
    
    if (this.mBird.mInput & BirdStateGroundX._normalToInput(this.mXNormal * -1)) {
        this.mBird.mState = this.mBird.mStates[16 + BirdStateGroundX._normalToInput(this.mXNormal * -1)];
        this.mBird.mState.initialize();
        this.mBird.mState.update();
        return;
    }
    if (!(this.mBird.mInput & BirdStateGroundX._normalToInput(this.mXNormal))) {
        this.mBird.mState = this.mBird.mStates[16];
        this.mBird.mState.initialize();
        this.mBird.mState.update();
        return;
    }
    this.mV[0] = this.mXNormal * this.mWP[0];
    this.mV[1] *= 0.9;
    BirdState.prototype.update.call(this);
};

BirdStateGroundX.prototype.initialize = function() {
    this.mSprite.setSpriteSequence(1024, 2520, 512, 512, 3, 0);
    this.mSprite.getXform().setSize(this.mXNormal * 20, 20);
    this.mSprite.getXform().setRotationInDegree(0);
    this.mRigidBody.setSize(4, 10);
    this.mV[1] = 0;
    this.mV[0] = this.mXNormal * this.mWP[0];
};