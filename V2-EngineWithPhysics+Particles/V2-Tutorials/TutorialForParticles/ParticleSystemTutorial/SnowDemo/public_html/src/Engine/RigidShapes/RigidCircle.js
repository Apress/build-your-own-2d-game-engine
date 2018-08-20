/* 
 * File:RigidCircle.js
 *      define a circle
 *     
 */
/*jslint node: true, vars: true, evil: true, bitwise: true */
"use strict";
/* global RigidShape, gEngine, vec2 */

/**
 * Default Constructor for Rigid Circle
 * @param {Transform} xf The transform to map the Rigid Circle to
 * @param {float} radius The radius for the Rigid Circle
 * @returns {RigidCircle}
 * @class RigidCircle
 * @type RigidCircle
 */
var RigidCircle = function (xf, radius) {
    RigidShape.call(this, xf);
    this.mType = "RigidCircle";
    this.mRadius = radius;
    this.mBoundRadius = radius;
    
    this.updateInertia();
};
gEngine.Core.inheritPrototype(RigidCircle, RigidShape);

/**
 * Update the inertia
 * @memberOf RigidCircle
 */
RigidCircle.prototype.updateInertia = function () {
    if (this.mInvMass === 0) {
        this.mInertia = 0;
    } else {
        // this.mInvMass is inverted!!
        // Inertia=mass * radius^2
        // 12 is a constant value that can be changed
        this.mInertia = (1 / this.mInvMass) * (this.mRadius * this.mRadius) / 12;
    }
};

/**
 * Increase the radius by the passed amount
 * @memberOf RigidCircle
 * @param {float} dt The amount to increase the radius by
 */
RigidCircle.prototype.incShapeSizeBy= function (dt) {
    this.mRadius += dt;
};

/**
 * Draws the Rigid Circle
 * @memberOf RigidCircle
 * @param {Camera} aCamera The camera to draw it on
 */
RigidCircle.prototype.draw = function (aCamera) {
    RigidShape.prototype.draw.call(this, aCamera);
    
    // kNumSides forms the circle.
    this.mLine.setColor([0, 0, 0, 1]);
    this.drawCircle(aCamera, this.mRadius);
    
    var p = this.mXform.getPosition();
    var u = [p[0], p[1]+this.mBoundRadius];
    // angular motion
    vec2.rotateWRT(u, u, this.mXform.getRotationInRad(), p);
    this.mLine.setColor([1, 1, 1, 1]);
    this.mLine.setFirstVertex(p[0], p[1]);
    this.mLine.setSecondVertex(u[0], u[1]);
    this.mLine.draw(aCamera);
    
    if (this.mDrawBounds)
        this.drawCircle(aCamera, this.mBoundRadius);
};

/**
 * Updates the RigidCircle
 * @memberOf RigidCircle
 */
RigidCircle.prototype.update = function () {
    RigidShape.prototype.update.call(this);
};

/**
 * Get the radius of the Rigid Circle
 * @memberOf RigidCircle
 * @returns {float}
 */
RigidCircle.prototype.getRadius = function () { return this.mRadius; };
/**
 * Sets the Rigid Circle to a new transform
 * @memberOf RigidCircle
 * @param {Transform} xf Which transform to set the RigidCircle to
 */
RigidCircle.prototype.setTransform = function (xf) {
    RigidShape.prototype.setTransform.call(this, xf);
    this.mRadius = xf.getWidth();  // assume width and height are the same
};