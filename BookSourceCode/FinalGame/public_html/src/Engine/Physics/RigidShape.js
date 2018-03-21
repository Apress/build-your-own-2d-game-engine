/* 
 * File: RigidShape.js
 * Defines a simple rigid shape
 */

/*jslint node: true, vars:true , white: true*/
/*global gEngine, vec2, LineRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict";

/**
 * Rigid type enum
 * @type {enum|eRigidType}
 * @memberOf RigidShape
 */
RigidShape.eRigidType = Object.freeze({
    eRigidAbstract: 0,
    eRigidCircle: 1,
    eRigidRectangle: 2
});

/**
 * Default Constructor<p>
 * Defines a simple rigid shape
 * @param {Transform} xform Transform object
 * @returns {RigidShape} New instance of RigidShape
 * @class RigidShape
 */
function RigidShape(xform) {
    this.mXform = xform; // this is typically from gameObject
    this.kPadding = 0.25; // size of the position mark
    
    this.mPositionMark = new LineRenderable();
    
    this.mDrawBounds = false;
    
    // physical properties
    this.mInvMass = 1;
    this.mRestitution = 0.8;
    this.mVelocity = vec2.fromValues(0, 0);
    this.mFriction = 0.3;
    this.mAcceleration = gEngine.Physics.getSystemtAcceleration();
}

/**
 * Return the type of Rigidshape
 * @returns {enum|eRigidType}
 * @memberOf RigidShape
 */
RigidShape.prototype.rigidType = function () {
    return RigidShape.eRigidType.eRigidAbstract;
};

/**
 * Draw function called by GameLoop
 * @param {Camera} aCamera Camera to draw too
 * @returns {void}
 * @memberOf RigidShape
 */
RigidShape.prototype.draw = function (aCamera) {
    if (!this.mDrawBounds) {
        return;
    }
    
    //calculation for the X at the center of the shape
    var x = this.mXform.getXPos();
    var y = this.mXform.getYPos();
    
    this.mPositionMark.setFirstVertex(x - this.kPadding, y + this.kPadding);  //TOP LEFT
    this.mPositionMark.setSecondVertex(x + this.kPadding, y - this.kPadding); //BOTTOM RIGHT
    this.mPositionMark.draw(aCamera);
    
    this.mPositionMark.setFirstVertex(x + this.kPadding, y + this.kPadding);  //TOP RIGHT
    this.mPositionMark.setSecondVertex(x - this.kPadding, y - this.kPadding); //BOTTOM LEFT   
    this.mPositionMark.draw(aCamera);
    
};

/**
 * Return the position of object
 * @returns {vec2} position of object [X, Y]
 * @memberOf RigidShape
 */
RigidShape.prototype.getPosition = function() { 
    return this.mXform.getPosition(); 
};

/**
 * Set the position of object
 * @param {Number} x new X position
 * @param {Number} ynew Y position
 * @returns {void}
 * @memberOf RigidShape
 */
RigidShape.prototype.setPosition = function(x, y ) { 
    this.mXform.setPosition(x, y); 
};

/**
 * Return the objects Transform
 * @returns {Transform} this Transform
 * @memberOf RigidShape
 */
RigidShape.prototype.getXform = function () { return this.mXform; };

/**
 * Set the Transform to this object
 * @param {Transform} xform new Transform
 * @returns {void}
 * @memberOf RigidShape
 */
RigidShape.prototype.setXform = function (xform) { this.mXform = xform; };

/**
 * Set the Color of the position marker
 * @param {Float[]} color new color of marker [R, G, B, A]
 * @returns {void}
 * @memberOf RigidShape
 */
RigidShape.prototype.setColor = function (color) {
    this.mPositionMark.setColor(color);
};

/**
 * Return the Color of the position marker
 * @returns {Float[]} color of marker [R, G, B, A]
 * @memberOf RigidShape
 */
RigidShape.prototype.getColor = function () { return this.mPositionMark.getColor(); };

/**
 * Set if bound drawing is active
 * @param {Boolean} d true if bounds should be drawn
 * @returns {void}
 * @memberOf RigidShape
 */
RigidShape.prototype.setDrawBounds = function(d) { this.mDrawBounds = d; };

/**
 * Returns if bound drawing is active
 * @returns {Boolean} true if bounds are drawing
 * @memberOf RigidShape
 */
RigidShape.prototype.getDrawBounds = function() { return this.mDrawBounds; };