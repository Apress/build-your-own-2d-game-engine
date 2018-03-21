/* File: EnemyStateChase.js  */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, RigidCircle, RigidRectangle, Enemy */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

// sets the enemy state to pace around an initial position
Enemy.prototype.setChaseState = function(initPos, range) {
                                                        // turn off mass so flying object does not fall
    
    this.getXform().setPosition(initPos[0], initPos[1]);                        // set the GameObject position to the initPos
    
    this.mEnemy.getXform().setSize(-10, 5);
    this.mState = null;                                                         // null the mState, this is just percautionary
    this.mSpeedVel = 0.15;                                                      // speed of the enemy when moving
    
    this._updateState(this.updateChase);                                        // set the update state to this state
    this.mInitialPosition = vec2.create(initPos[0]);
    this.mRange = 45;
    
    this.mEnemy.getXform().setSize(20, 10);
    this.mEnemy.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateLeft);
    this.mEnemy.setAnimationSpeed(20); 
    this.mEnemy.setSpriteSequence(128, 0, 88, 47, 2, 0);
    
    this.mCenter = new InterpolateVec2(initPos, 300, 0.01);
    this.mFound = false;
    this.mLost = false;
    this.mStartPosition = initPos;
    this.mCount = 0;
};

Enemy.prototype.updateChase = function () {
    
    var distFromHero = vec2.distance(this.getXform().getPosition(), this.mHero.getXform().getPosition());
    if(this.mLost) {
        this.mCenter.updateInterpolation();
        var v = this.mCenter.getValue();
        this.getXform().setPosition(v[0], v[1]);
    }
    else if(distFromHero < this.mRange && !(this.mFound)) {
        this.mFound = true;
        this.mCenter.setFinalValue(this.mHero.getXform().getPosition());
        this.mCount = 298;
    }
    else if(this.mFound && (distFromHero > this.mRange)) {
        this.lostHero();
    }
    else if(this.mFound) {
        this.mCenter.updateInterpolation();
        var newPos = this.mCenter.getValue();
        this.getXform().setPosition(newPos[0], newPos[1]);
        if(this.mCount-- <= 0) { 
            this.lostHero();
        }
    }
    
    // get width sign (-1, 1)
    var w = 0;
    if(this.getXform().getWidth() > 0) { w = 1;}
    else {w = -1;}
    
    // get direction to hero
    var hdx = this.getXform().getXPos() - this.mHero.getXform().getXPos();
    var hd;
    if(hdx > 0) { hd = 1;}
    else {hd = -1;}
    
    var sum = hd + w;
    if(sum === 0) { // art not in sync with direction
        this.getXform().setWidth(this.getXform().getWidth() * -1);
    }
    
    this.mEnemy.updateAnimation();
};

Enemy.prototype.lostHero = function() {
    this.mFound = false;
    this.mEnemy.setSpriteSequence(128, 176, 88, 47, 1, 0);
    this.mLost = true;
    this.mCenter = new InterpolateVec2(this.getXform().getPosition(), 300, 0.01);
    var v = [this.mStartPosition[0], this.mStartPosition[1] - 200];
    this.mCenter.setFinalValue(v);
    this.getXform().setHeight(this.getXform().getHeight() * -1);
};