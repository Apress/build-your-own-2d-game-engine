/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

DyePack3.kReferencePosition = [ [-15, 80], // top-left
                               [120, 80], // top-right
                               [-15, -15], // bottom-left
                               [120, -15]  // bottom-right
                              ];
DyePack3.eDyePackState = Object.freeze({
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

function DyePack3(spriteTexture, x, y) {
    this.kRefWidth = 29.4;
    this.kRefHeight = 24;
    this.kReferenceSpeed = 50 / (5 * 60);
    this.li = 10;
            // cover 100 units in 5 seconds     
            
            
    this.mDyePack = new SpriteRenderable(spriteTexture);
    this.mDyePack.setColor([0.2, 0.2, 0.5, 0.1]);
    this.mDyePack.getXform().setPosition(x, y);
    this.mDyePack.getXform().setSize(this.kRefWidth, this.kRefHeight);
    this.mDyePack.setElementPixelPositions(635, 910, 17, 245);
    GameObject.call(this, this.mDyePack);
    
    this._computeNextState();
    // to support the chasing states
    
    
    // state is goverened by time
    this.mStateTimeTick = 0;  // this is the time
    
    // Expired to remove
    this.mExpired = false;
}
gEngine.Core.inheritPrototype(DyePack3, GameObject);

DyePack3.prototype.setExpired = function() {
    this.li--;
};
DyePack3.prototype.hasExpired = function() {
    return this.li;
};

DyePack3.prototype._computeNextState = function() {
    this.mCurrentState = this._getRandomState();
        
    var nextState = this._getRandomState();
    this.mTargetPosition = this._getRandomizedPosition(nextState);
    this._computeSpeed();
};
    
DyePack3.prototype._computeSpeed = function() {
     //var toNextPos = [];
     //vec2.subtract(toNextPos, this.mTargetPosition, this.getXform().getPosition());
    // DO NOT set this now! Move there gradually
          this.setCurrentFrontDir(vec2.fromValues(0, -1));
    // 
    this.setSpeed((1.2 + 0.4 * Math.random()) * this.kReferenceSpeed);
        // +-20% variation from covering 100 units in 5 seconds
};

DyePack3.prototype._getRandomizedPosition = function(region) {
    var p = DyePack3.kReferencePosition[region];
    var x = p[0] + ((Math.random() - 0.5) * 15);
    var y = p[1] + ((Math.random() - 0.5) * 10);
    return vec2.fromValues(x, y);
};

DyePack3.prototype._getRandomState = function() {
    var r = Math.random();
    var s;
    if (r < 0.25)
        s = DyePack3.eDyePackState.eTopLeftRegion;
    else if (r < 0.5)
        s = DyePack3.eDyePackState.eTopRightRegion;
    else if (r < 0.75)
        s = DyePack3.eDyePackState.eBottomLeftRegion;
    else 
        s = DyePack3.eDyePackState.eBottomRightRegion;
    return s;
};
this.x=null;
this.y=null;
