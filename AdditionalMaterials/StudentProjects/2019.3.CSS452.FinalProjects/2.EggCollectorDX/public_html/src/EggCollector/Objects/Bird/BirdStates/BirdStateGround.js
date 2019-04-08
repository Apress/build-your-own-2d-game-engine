"use strict";

function BirdStateGround(bird) {
    BirdState.call(this, bird);
}
gEngine.Core.inheritPrototype(BirdStateGround, BirdState);

BirdStateGround.prototype.update = function() {
    if ((this.mBird.mInput & Bird._input.UP) || !this._isGrounded()) {
        this.mBird.mState = this.mBird.mStates[this.mBird.mInput];
        this.mBird.mState.initialize();
        //this.mBird.mState.update();
        return;
    }
    
    if (this.mBird.mInput & Bird._input.LEFT) {
        this.mBird.mState = this.mBird.mStates[16 + Bird._input.LEFT];
        this.mBird.mState.initialize();
        //this.mBird.mState.update();
        return;
    }
    if (this.mBird.mInput & Bird._input.RIGHT) {
        this.mBird.mState = this.mBird.mStates[16 + Bird._input.RIGHT];
        this.mBird.mState.initialize();
        //this.mBird.mState.update();
        return;
    }
    this.mV[0] = 0;
    this.mV[1] *= 0.9;
    BirdState.prototype.update.call(this);
};

BirdStateGround.prototype.initialize = function() {
    this.mSprite.setSpriteSequence(1024, 2048, 512, 512, 1, 0);
    this.mSprite.getXform().setSize(20, 20);
    this.mSprite.getXform().setRotationInDegree(0);
    this.mV[1] = 0;
    this.mV[0] = 0;
    this.mRigidBody.setSize(4, 10);
};