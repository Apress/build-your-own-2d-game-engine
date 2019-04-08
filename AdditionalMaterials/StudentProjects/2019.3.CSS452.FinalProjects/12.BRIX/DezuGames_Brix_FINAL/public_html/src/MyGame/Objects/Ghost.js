/* global GameObject, gEngine, vec2 */

"use strict";

function Ghost(){
    this.mGhost = new Renderable();
    this.mGhost.setColor([0.5,0.5,0.5,1]);
    this.mGhost.getXform().setSize(5,5);
    this.mGhost.getXform().setPosition(3,60);
    this.mSpeed = .3;
    this.mBurstTime = Date.now();
    this.mIsBurst = false;
    this.mCurrentFrontDir = vec2.fromValues(0,1);
    
    this.mSmoke = new Smoke(0,0,3,-40,2,-40,0,0,20,0,1,5);
    GameObject.call(this,this.mGhost);
}
gEngine.Core.inheritPrototype(Ghost,GameObject);
Ghost.prototype.setSpeed = function (s) { this.mSpeed = s; };
Ghost.prototype.getSpeed = function () { return this.mSpeed; };
Ghost.prototype.incSpeedBy = function (delta) { this.mSpeed += delta; };

Ghost.prototype.setCurrentFrontDir = function (f) { vec2.normalize(this.mCurrentFrontDir, f); };
Ghost.prototype.getCurrentFrontDir = function () { return this.mCurrentFrontDir; };

Ghost.prototype.rotateObjPointTo = function (p, rate) {
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

Ghost.prototype.update = function () {
    // simple default behavior
//    if(this.mIsBurst){
//        if((Date.now()-this.mBurstTime)>=1000){
//            this.mIsBurst = false;
//            this.mBurstTime = Date.now();
//        }
//        this.mSpeed = 0.6;
//    }else{
//        if((Date.now()-this.mBurstTime)>=1500){
//            this.mIsBurst = true;
//            this.mBurstTime = Date.now();
//        }
//        this.mSpeed = 0.05;
//    }
    var pos = this.getXform().getPosition();
    vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.getSpeed());
    gEngine.ParticleSystem.update(this.mSmoke);
    this.mSmoke.setPos(pos[0],pos[1]);
};

Ghost.prototype.draw = function(aCamera){
    this.mGhost.draw(aCamera);
    this.mSmoke.draw(aCamera);
};