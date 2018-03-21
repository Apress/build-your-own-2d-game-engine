/*
 * @auth: Caleb Larson
 * @file: Fish_Manipulation.js
 * @date: 11-27-15
 * @brief: This class will change the fish behaviour when they interact with other objects
 */

/*jslint node: true, vars: true */
/*global gEngine, Fish, vec2, Shark, BoundingBox*/

"use strict";

Fish.prototype.statusCheck = function(theBG, theHook, theBoatSet){

    var result = vec2.create();
    var fishXform = null;
    var hookCenter = null;
    
    // to prevent us from calling pixel collision if the fish is already hooked,
    // we check the fish's status first
    if(this.getStatus() === Fish.eStatus.eHooked || 
            (this.getBBox().boundCollideStatus(theHook.getBBox()) !== BoundingBox.eboundCollideStatus.eOutside)){
        
        if(this.getStatus() !== Fish.eStatus.eHooked &&
               (this.getBBox().boundCollideStatus(theHook.getBBox()) !== BoundingBox.eboundCollideStatus.eOutside)){
           theHook.adjustSpeed(this.getScore());
           theBoatSet.adjustSpeed(this.getScore());
        }
               
        this.updateStatus(Fish.eStatus.eHooked);
        fishXform = this.getXform();
        hookCenter = theHook.getXform().getPosition();
        this._orientHook(hookCenter);
        fishXform.setPosition(hookCenter[0], hookCenter[1]);
        if(hookCenter[1] > -0.5){
            this.updateStatus(Fish.eStatus.eDespawn);
            theHook.resetSpeed();
            theBoatSet.resetSpeed();
        }
    }
    this.bounce(theBG);
};

Fish.prototype._orientHook = function(hookCenter) {
    var rate = 1;
    this.rotateObjPointTo(hookCenter, rate);
};

Fish.prototype.chase = function(theBG, hook){
    var hookPos = hook.getXform().getPosition();
    var result = vec2.create();
    var xform = this.mFish.getXform();
    this.mFish.updateAnimation();

    var dir = vec2.create();
    vec2.subtract(dir, hookPos, this.getXform().getPosition());
    var len = vec2.length(dir);
    if(len > this.mChaseDist){
        this.resetStatus();
        if(this.mInPursuit){
            this.updateStatus(Fish.eStatus.eDespawn);
            this.mFish.setAnimationSpeed(5);
        }else{
            this.bounce(theBG);
        }
        
        return; //Too far, don't care
    }else if(hook.pixelTouches(this, result)){
        this.updateStatus(Fish.eStatus.eHooked);
        return;
    }else{ // chase the hook
        if(hookPos[1] < - 1.5){
            this.mInPursuit = true;
            this.updateStatus(Shark.eStatus.eChase);
            this.rotateObjPointTo(hookPos, this.mRotateRate);
            var pos = this.getXform().getPosition();
            vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), Math.abs(this.getSpeed()));
            
            if(this.mSpeed < 0){
                if(xform.getXPos() < hookPos[0] && this.getCurrentFrontDir()[0] > 0){
                    xform.setHeight(- Math.abs(xform.getHeight()));
                }else if(xform.getXPos() > hookPos[0] && this.getCurrentFrontDir()[0] < 0){
                    xform.setHeight(Math.abs(xform.getHeight()));
                }
            }else if(this.mSpeed > 0){
                if(xform.getXPos() < hookPos[0] && this.getCurrentFrontDir()[0] < 0){
                    xform.setHeight(Math.abs(xform.getHeight()));
                }else if(xform.getXPos() > hookPos[0] && this.getCurrentFrontDir()[0] > 0){
                    xform.setHeight(- Math.abs(xform.getHeight()));
                }
            }
            
        }else if(!(this.mStatus === 0)){
            this.resetStatus();
            this.updateStatus(Fish.eStatus.eDespawn);
            this.animSpeedSix();
        }else{
            this.bounce(theBG);
        }
    }
};

Fish.prototype.despawn = function (theBG){
    
    this.mFish.updateAnimation();
    this.getXform().setRotationInRad(0);
    this.getXform().setHeight(Math.abs(this.getXform().getHeight()));
    
    this.mRenderComponent.getXform().incXPosBy(this.mSpeed*2);
    var fishBB = this.getBBox();
    var BGBB = theBG.getBBox();
    if(fishBB.boundCollideStatus(BGBB) === BoundingBox.eboundCollideStatus.eOutside){
        return true;
    }
    return false; //not out of sight yet
};

Fish.prototype.bounce = function(theBG){
    var fishBB = this.getBBox();
    var BGBB = theBG.getBBox();
    this.mFish.updateAnimation();
    
    if(fishBB.boundCollideStatus(BGBB) === 13){
        this.updateStatus(Fish.eStatus.eCollideRight);
        var front = vec2.fromValues(-1, 0);
        this.mBounces++;
    
        this.setCurrentFrontDir(front);
    }
    if(fishBB.boundCollideStatus(BGBB) === 14){
        this.updateStatus(Fish.eStatus.eCollideLeft);
        var front = vec2.fromValues(1, 0);
        this.mBounces++;
    
        this.setCurrentFrontDir(front);
    }
    
    this.update();
};


