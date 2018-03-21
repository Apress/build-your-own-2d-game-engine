/* 
 * File: RigidShape_Physics.js
 * Support physical attributes for RigidShape
 */

/*jslint node: true, vars:true, white: true*/
/*global gEngine, vec2, RigidShape */
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict";

RigidShape.prototype.update = function () {
    var dt = gEngine.GameLoop.getUpdateIntervalInSeconds();
    
    // Symplectic Euler
    //    v += (1/m * a) * dt
    //    x += v * dt
    var v = this.getVelocity();
    vec2.scaleAndAdd(v, v, this.mAcceleration, (this.getInvMass() * dt ));
    
    var pos = this.getPosition();
    vec2.scaleAndAdd(pos, pos, v, dt);
};
RigidShape.prototype.getInvMass = function () { return this.mInvMass; };
RigidShape.prototype.setMass = function (m) {
    if(m > 0) {
        this.mInvMass = 1/m;
    } else {
        this.mInvMass = 0;
    }
};
RigidShape.prototype.getVelocity = function () { return this.mVelocity; };
RigidShape.prototype.setVelocity = function (v) { this.mVelocity = v; };
RigidShape.prototype.getRestitution = function () { return this.mRestitution; };
RigidShape.prototype.setRestitution = function (r) { this.mRestitution = r; };
RigidShape.prototype.getFriction = function () { return this.mFriction; };
RigidShape.prototype.setFriction = function (f) { this.mFriction = f; };
RigidShape.prototype.getAcceleration = function () { return this.mAcceleration; };
RigidShape.prototype.setAcceleration = function (g) { this.mAcceleration = g; };