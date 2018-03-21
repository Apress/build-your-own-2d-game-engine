/*
 * @auth: Caleb Larson
 * @file: Fish.js
 * @date: 11-27-15
 * @brief: Base fish class which will be inherited from
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject, vec2, vec3, SpriteAnimateRenderable: false */

"use strict";

function Fish(texture0, texture1, texture2, texture3, normal) {
    
    if(texture1 === undefined){
        this.mFish = new IllumRenderable(texture0, normal); 
    }else{
        var rand = Math.random() * 4;
        if(rand < 1)
            this.mFish = new IllumRenderable(texture0, normal);
        else if(rand < 2)
            this.mFish = new IllumRenderable(texture1, normal);
        else if(rand < 3)
            this.mFish = new IllumRenderable(texture2, normal);
        else
            this.mFish = new IllumRenderable(texture3, normal);
        
        //do animate things here
        this.mFish.setSpriteSequence(256, 0, 512, 256, 4, 0);
        this.mFish.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
        this.mFish.setAnimationSpeed(20);
    }
    this.mFish.setColor([1,1,1,0]);
    
    GameObject.call(this, this.mFish);
    this.mStatus = 0;
    this.mScore = 1;
    this.mBounces = 0;
    
    var front = vec2.fromValues(1, 0);
    
    this.setCurrentFrontDir(front);
    this.mFish.getXform().setRotationInRad(0);
}
gEngine.Core.inheritPrototype(Fish, GameObject);

Fish.eStatus = Object.freeze({
    eHooked: 1,
    eCollideRight: 2,
    eCollideLeft: 4,
    eDespawn: 6
});

Fish.prototype.update = function () {
    var xform = this.mFish.getXform();
    if(this.mStatus === Fish.eStatus.eCollideRight){
        this.mSpeed *= -1;
        xform.setSize(-xform.getWidth(), xform.getHeight());
        this.mStatus = 0;
    }else if(this.mStatus === Fish.eStatus.eCollideLeft){
        this.mSpeed *= -1;
        xform.setSize(-xform.getWidth(), xform.getHeight());
        this.mStatus = 0;
    }
    
    if(Fish.eStatus.eHooked !== this.mStatus){
        this.mRenderComponent.getXform().incXPosBy(this.mSpeed);
    }
};

Fish.prototype.rotateObjPointTo = function (p, rate){
    
    // Step A: determine if reach the destination position p
    var dir = [];
    vec2.sub(dir, p, this.getXform().getPosition());
    var len = vec2.length(dir);
    if (len < Number.MIN_VALUE) {
        return; // we are there.
    }
    vec2.scale(dir, dir, 1 / len);

    // Step B: compute the angle to rotate
    var fdir = this.getCurrentFrontDir();
    var cosTheta = vec2.dot(dir, fdir);

    if (cosTheta > 0.999999) { // almost exactly the same direction
        return;
    }

    // Step C: clamp the cosTheda to -1 to 1 
    // in a perfect world, this would never happen! BUT ...
    if (cosTheta > 1) {
        cosTheta = 1;
    } else {
        if (cosTheta < -1) {
            cosTheta = -1;
        }
    }

    // Step D: compute whether to rotate clockwise, or counterclockwise
    var dir3d = vec3.fromValues(dir[0], dir[1], 0);
    var f3d = vec3.fromValues(fdir[0], fdir[1], 0);
    var r3d = [];
    vec3.cross(r3d, f3d, dir3d);

    var rad = Math.acos(cosTheta);  // radian to roate
    if (r3d[2] < 0) {
        rad = -rad;
    }

    // Step E: rotate the facing direction with the angle and rate
    rad *= rate;  // actual angle need to rotate from Obj's front
    vec2.rotate(this.getCurrentFrontDir(), this.getCurrentFrontDir(), rad);
    this.getXform().incRotationByRad(rad);
};

Fish.prototype.getStatus = function () {
    return this.mStatus;
};

Fish.prototype.updateStatus = function (status){
    this.mStatus |= status;
};

Fish.prototype.setScore = function (value){
    this.mScore = value;
};

Fish.prototype.getScore = function (){
    return this.mScore;
};

Fish.prototype.resetStatus = function(){
    this.mStatus = 0;
};

Fish.prototype.getBounces = function (){
    return this.mBounces;
};