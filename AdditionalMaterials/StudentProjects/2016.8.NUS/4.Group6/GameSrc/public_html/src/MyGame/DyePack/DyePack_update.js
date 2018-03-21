/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2, DyePack */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

DyePack.prototype.update = function(hero) {
    switch (this.mCurrentState) {
        case DyePack.eDyePackState.eTopLeftRegion: 
        case DyePack.eDyePackState.eTopRightRegion: 
        case DyePack.eDyePackState.eBottomLeftRegion: 
        case DyePack.eDyePackState.eBottomRightRegion: 
            this._servicePatrolStates(hero);
            break;        
        case DyePack.eDyePackState.eExcitedCWRotate: 
            this._serviceCWRotate();
            break;
        case DyePack.eDyePackState.eExcitedCCWRotate: 
            this._serviceCCWRotate();
            break;
        case DyePack.eDyePackState.eChaseState: 
            this._serviceChase(hero);
            break;
        case DyePack.eDyePackState.eCoolDownEnlarge: 
            this._serviceEnlarge();
            break;
        case DyePack.eDyePackState.eCoolDownShrink:
            this._serviceShrink();
            break;
    }
};

DyePack.prototype._distToHero = function(hero) {
    var toHero = [];
    vec2.subtract(toHero, hero.getXform().getPosition(), this.getXform().getPosition());
    return vec2.length(toHero);
};

DyePack.prototype._servicePatrolStates = function(hero) {
    if (this._distToHero(hero) < this.kDetectThreshold) {
        // transition to chase!
        this.mCurrentState = DyePack.eDyePackState.eExcitedCWRotate;
        this.mStateTimeClick = 0;
        this.mTargetPosition = hero.getXform().getPosition();
    } else {
       // Continue patrolling!
       GameObject.prototype.update.call(this);
       var toTarget = [];
       vec2.subtract(toTarget, this.mTargetPosition, this.getXform().getPosition());
       var d = vec2.length(toTarget);
       if (d > 10) { 
           this.rotateObjPointTo(this.mTargetPosition, 0.05); // rotate rather quickly
       } else {
           this._computeNextState();
       }
   }
};

DyePack.prototype._serviceEnlarge = function() {
    // 1. check for state transition
    if (this.mStateTimeTick > this.kScaleTime) {
        // done with current state, transition to next
        // make sure state variables are properly initialized
        this.mStateTimeTick = 0;
        this.mCurrentState = DyePack.eDyePackState.eCoolDownShrink;
    } else {
        // continue ...
        this.mStateTimeTick++;
        var xf = this.getXform();
        xf.incSizeBy(this.kScaleRate);
    }
};

DyePack.prototype._serviceShrink = function() {
    // 1. check for state transition
    if (this.mStateTimeTick > this.kScaleTime) {
        // done with current state, transition to next
        // make sure state variables are properly initialized
        this.mStateTimeTick = 0;
        this._computeNextState();  // transition back into patrol
    } else {
        // continue ...
        this.mStateTimeTick++;
        var xf = this.getXform();
        xf.incSizeBy(-this.kScaleRate);
    }
};

DyePack.prototype._serviceCWRotate = function() {
    // 1. check for state transition
    if (this.mStateTimeTick > this.kRotateTime) {
        // done with current state, transition to next
        // make sure state variables are properly initialized
        this.mStateTimeTick = 0;
        this.mCurrentState = DyePack.eDyePackState.eExcitedCCWRotate;
    } else {
        // continue ...
        this.mStateTimeTick++;
        var xf = this.getXform();
        xf.incRotationByRad(this.kRotateRate);
    }
};

DyePack.prototype._serviceCCWRotate = function() {
    // 1. check for state transition
    if (this.mStateTimeTick > this.kRotateTime) {
        // done with current state, transition to next
        // make sure state variables are properly initialized
        this.mStateTimeTick = 0;
        this.mDyePack.setColor(this.mChaseColor);
        this.mCurrentState = DyePack.eDyePackState.eChaseState;
    } else {
        // continue ...
        this.mStateTimeTick++;
        var xf = this.getXform();
        xf.incRotationByRad(-this.kRotateRate);
    }
};

DyePack.prototype._serviceChase = function(hero) {
    if (this._distToHero(hero) > this.kChaseThreshold) {
        // Transition to cool down
        this.mCurrentState = DyePack.eDyePackState.eCoolDownEnlarge;
        this.mDyePack.setColor([1, 1, 1, 0.1]);
        this.mStateTimeClick = 0;
    } else {
        var p = vec2.fromValues(0, 0);
        if (this.pixelTouches(hero, p)) {
           hero.hitOnce();
           this.setExpired();
        } else {
            // Give chase!
            this.mTargetPosition = hero.getXform().getPosition();
            this.rotateObjPointTo(this.mTargetPosition, 0.05); // rotate rather quickly
            GameObject.prototype.update.call(this);
        }
   }
};