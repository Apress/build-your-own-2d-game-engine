/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

DyePack.kReferencePosition = [ [10, 60], // top-left
                               [90, 60], // top-right
                               [10, 10], // bottom-left
                               [90, 10]  // bottom-right
                              ];
DyePack.eDyePackState = Object.freeze({
    eTopLeftRegion: 0,
    eTopRightRegion: 1,
    eBottomLeftRegion: 2,
    eBottomRightRegion: 3,
    eExcitedCWRotate: 10,
    eExcitedCCWRotate: 11,
    eChaseState: 12,
    eCoolDownEnlarge: 13,
    eCoolDownShrink: 14
});

function DyePack(spriteTexture, x, y) {
    this.kRefWidth = 2;
    this.kRefHeight = 3.25;
    this.kReferenceSpeed = 50 / (5 * 60);
            // cover 100 units in 5 seconds
            
    this.kDetectThreshold = 10;
    this.kChaseThreshold = 2 * this.kDetectThreshold;
    
    this.mDyePack = new SpriteRenderable(spriteTexture);
    this.mDyePack.setColor([1, 1, 1, 0.1]);
    this.mDyePack.getXform().setPosition(x, y);
    this.mDyePack.getXform().setSize(this.kRefWidth, this.kRefHeight);
    this.mDyePack.setElementPixelPositions(510, 595, 23, 153);
    GameObject.call(this, this.mDyePack);
    
    this._computeNextState();
    
    // to support the chasing states
    this.kScaleTime = 0.5 * 60 * (0.8 + 0.2 * Math.random());
    this.kScaleRate = 0.05;
    
    this.kRotateTime = 0.5 * 60 * (0.8 + 0.2 * Math.random());
    this.kRotateRate = 0.1;
    
    // state is goverened by time
    this.mStateTimeTick = 0;  // this is the time
    this.mChaseColor = [1, 0, 0, 0.5];
    
    // Expired to remove
    this.mExpired = false;
}
gEngine.Core.inheritPrototype(DyePack, GameObject);

DyePack.prototype.setExpired = function() {
    this.mExpired = true;
};
DyePack.prototype.hasExpired = function() {
    return this.mExpired;
};


DyePack.prototype._computeNextState = function() {
    this.mCurrentState = this._getRandomState();
        
    var nextState = this._getRandomState();
    this.mTargetPosition = this._getRandomizedPosition(nextState);
    this._computeSpeed();
};
    
DyePack.prototype._computeSpeed = function() {
    // var toNextPos = [];
    // vec2.subtract(toNextPos, this.mTargetPosition, this.getXform().getPosition());
    // DO NOT set this now! Move there gradually
    //      this.setCurrentFrontDir(toNextPos);
    // 
    this.setSpeed((0.8 + 0.4 * Math.random()) * this.kReferenceSpeed);
        // +-20% variation from covering 100 units in 5 seconds
};

DyePack.prototype._getRandomizedPosition = function(region) {
    var p = DyePack.kReferencePosition[region];
    var x = p[0] + ((Math.random() - 0.5) * 15);
    var y = p[1] + ((Math.random() - 0.5) * 10);
    return vec2.fromValues(x, y);
};

DyePack.prototype._getRandomState = function() {
    var r = Math.random();
    var s;
    if (r < 0.25)
        s = DyePack.eDyePackState.eTopLeftRegion;
    else if (r < 0.5)
        s = DyePack.eDyePackState.eTopRightRegion;
    else if (r < 0.75)
        s = DyePack.eDyePackState.eBottomLeftRegion;
    else 
        s = DyePack.eDyePackState.eBottomRightRegion;
    return s;
};