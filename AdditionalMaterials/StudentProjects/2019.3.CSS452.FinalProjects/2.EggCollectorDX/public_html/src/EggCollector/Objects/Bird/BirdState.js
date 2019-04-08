function BirdState(bird) {
    this.mBird = bird;
    this.mV = this.mBird.mVelocity;
    this.mSprite = this.mBird.mSprite;
    this.mRigidBody = this.mBird.mRigidBody;
    this.mWP = this.mBird.mWingPower;
}

BirdState.prototype.update = function() {
    if (this.mBird.mItem !== null) {
        this.mBird.mItem.getXform().setXPos(this.mBird.getXform().getXPos());
        this.mBird.mItem.getXform().setYPos(this.mBird.getXform().getYPos());
    }
};

BirdState.prototype.initialize = function() {
    
};

BirdState.prototype.getBBox = function() {
    var xform = this.mSprite.getXform();
    return new BoundingBox(xform.getPosition(), Math.abs(xform.getWidth() * 0.35), xform.getHeight() * 0.5);
};

BirdState.prototype._checkFlyingStateChange = function() {
    if (this.mBird.mStates[this.mBird.mInput] !== this) {
        this.mBird.mState = this.mBird.mStates[this.mBird.mInput];
        this.mBird.mState.initialize();
        this.mBird.mState.update();
        return true;
    }
    return false;
};

BirdState.prototype._checkGrounded = function() {
    if (this._isGrounded()) {
        this.mBird.mState = this.mBird.mStates[16];
        this.mBird.mState.initialize();
        this.mBird.mState.update();
        return true;
    }
    return false;
};

BirdState.prototype._isGrounded = function() {
    for (var i = 0; i < this.mBird.mPlatforms.size(); i++)
        if (this.mBird.getBBox().boundCollideStatus(this.mBird.mPlatforms.getObjectAt(i).getBBox())
                & BoundingBox.eboundCollideStatus.eCollideBottom)
            return true;
    return false;
};