/* File: Hero.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, Hero, SpriteRenderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

Hero.prototype._updatePath = function() {
    // update hero path
    if (this.mPath.setSize() === 0) {
        this._stopMovement();
        return;
    }
    
    if (this.mCurrentStartPos === null) {
        this._moveToNextPath();
    }
    
    var l = this.mPath.getLineAt(this.mPathIndex);
    var nextPath = false;
    
    if (l === this.mPath.currentLine()) {
        // check only if we are on the currently editing path
        nextPath = this._updateVelocity();
    }  else {
        var dist = this._computeCurrentDist();
        nextPath = (dist > this.mCurrentPathLength);
    }
    if (nextPath)
        this._moveToNextPath();
    
    // move the Hero
    GameObject.prototype.update.call(this);
};

Hero.prototype._computeCurrentDist = function() {
    var p = this.getXform().getPosition();
    var dir = [];
    vec2.sub(dir, p, this.mCurrentStartPos);
    return vec2.length(dir);
};

Hero.prototype._updateVelocity = function() {
    var l = this.mPath.getLineAt(this.mPathIndex);
    var p = this.getXform().getPosition();
    var target = l.getSecondVertex();
    
    var toTarget = [];
    vec2.sub(toTarget, target, p);
    var distToTarget = vec2.length(toTarget);
    if (distToTarget < 1)
        return true; // there!
    
    var thePath = [];
    vec2.sub(thePath, target, l.getFirstVertex());
    var pathLength = vec2.length(thePath);
    if (pathLength < 0.1)
        return true; // path is very short 
    
    if (distToTarget > pathLength)
        return true; // covered
    
    this.setCurrentFrontDir(toTarget);
    
    // set speed according to porportion left
    var portionLeft = distToTarget / pathLength;
    var timeLeft = portionLeft * this.mCoverInSeconds;
    this.setSpeed(distToTarget / (timeLeft * 60));         
    return false;
};

Hero.prototype._moveToNextPath = function() {
    this.mPathIndex++;
    if (this.mPathIndex >= this.mPath.setSize())
        this.mPathIndex = 0;
    
    var dir = [];
    var l = this.mPath.getLineAt(this.mPathIndex);

    vec2.sub(dir, l.getSecondVertex(), l.getFirstVertex());
    this.mCurrentPathLength = vec2.length(dir);
    if (this.mCurrentPathLength < 0.1) {
        this.mCurrentPathLength = 0.1;
    }
    this.mCurrentStartPos = l.getFirstVertex();
    this.setCurrentFrontDir(dir);
    this.setSpeed(this.mCurrentPathLength / (this.mCoverInSeconds * 60));

    this.getXform().setPosition(this.mCurrentStartPos[0], this.mCurrentStartPos[1]);
};

Hero.prototype._stopMovement = function() {
    this.mPathIndex = -1;
    this.mCurrentPathLength = 0;
    this.mCurrentStartPos = null;
};
