/* 
 * File: RigidShape_Physics.js
 * Support physical attributes for RigidShape
 */

/*jslint node: true, vars:true, white: true*/
/*global gEngine, vec2, RigidShape */
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict";

/**
 * Update Function called by GameLoop
 * @returns {void}
 * @memberOf RigidShape
 */
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

/**
 * 
 * @returns {Number}
 * @memberOf RigidShape
 */
RigidShape.prototype.getInvMass = function () { return this.mInvMass; };

/**
 * Set the mass of the object
 * @param {Number} m new Mass
 * @returns {void}
 * @memberOf RigidShape
 */
RigidShape.prototype.setMass = function (m) {
    if(m > 0) {
        this.mInvMass = 1/m;
    } else {
        this.mInvMass = 0;
    }
};

/**
 * Get the Velocity of the object
 * @returns {vec2} current Velocity [X, Y]
 * @memberOf RigidShape
 */
RigidShape.prototype.getVelocity = function () { return this.mVelocity; };

/**
 * Set the Velocity of the object
 * @param {vec2} v new Velocity [X, Y]
 * @returns {void}
 * @memberOf RigidShape
 */
RigidShape.prototype.setVelocity = function (v) { this.mVelocity = v; };

/**
 * Return the Restitution
 * @returns {Number} current Restitution value
 * @memberOf RigidShape
 */
RigidShape.prototype.getRestitution = function () { return this.mRestitution; };

/**
 * Set the Restitution
 * @param {Number} r new Restitution value
 * @returns {void}
 * @memberOf RigidShape
 */
RigidShape.prototype.setRestitution = function (r) { this.mRestitution = r; };

/**
 * Return the Friction
 * @returns {Number} current Friction value
 * @memberOf RigidShape
 */
RigidShape.prototype.getFriction = function () { return this.mFriction; };

/**
 * Set the Friction
 * @param {Number} f new Friction value
 * @returns {void}
 * @memberOf RigidShape
 */
RigidShape.prototype.setFriction = function (f) { this.mFriction = f; };

/**
 * Get the Acceleration
 * @returns {Float[]} current Acceleration [X, Y]
 * @memberOf RigidShape
 */
RigidShape.prototype.getAcceleration = function () { return this.mAcceleration; };

/**
 * Set the Acceleration
 * @param {Float[]} g new Acceleration [X, Y]
 * @returns {void}
 * @memberOf RigidShape
 */
RigidShape.prototype.setAcceleration = function (g) { this.mAcceleration = g; };