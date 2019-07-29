/*
 * File: RigidShape.js
 * Defines a simple rigid shape
 */

/*jslint node: true, vars:true , white: true*/
/*global gEngine, vec2, LineRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict";

RigidShape.eRigidType = Object.freeze({
    eRigidAbstract: 0,
    eRigidCircle: 1,
    eRigidRectangle: 2
});


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

RigidShape.prototype.rigidType = function () {
    return RigidShape.eRigidType.eRigidAbstract;
};

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

RigidShape.prototype.getPosition = function() {
    return this.mXform.getPosition();
};
RigidShape.prototype.setPosition = function(x, y ) {
    this.mXform.setPosition(x, y);
};
RigidShape.prototype.getXform = function () { return this.mXform; };
RigidShape.prototype.setXform = function (xform) { this.mXform = xform; };
RigidShape.prototype.setColor = function (color) {
    this.mPositionMark.setColor(color);
};
RigidShape.prototype.getColor = function () { return this.mPositionMark.getColor(); };
RigidShape.prototype.setDrawBounds = function(d) { this.mDrawBounds = d; };
RigidShape.prototype.getDrawBounds = function() { return this.mDrawBounds; };


RigidShape.prototype.update = function () {
    var dt = gEngine.GameLoop.getUpdateIntervalInSeconds();

    // Symplectic Euler
    //    v += (1/m * F) * dt
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


RigidShape.prototype.clamp = function (value, min, max) {
    return Math.min(Math.max(value, min), max);
};

RigidShape.prototype.collidedRectCirc = function(rect1Shape, circ2Shape, collisionInfo) {
    var rect1Pos = rect1Shape.getXform().getPosition();
    var circ2Pos = circ2Shape.getXform().getPosition();
    var vFrom1to2 = [0, 0];
    vec2.subtract(vFrom1to2, circ2Pos, rect1Pos);

    var vec = vec2.clone(vFrom1to2);

    var alongX = rect1Shape.getWidth() / 2;
    var alongY = rect1Shape.getHeight() / 2;

    vec[0] = this.clamp(vec[0], -alongX, alongX);
    vec[1] = this.clamp(vec[1], -alongY, alongY);

    var isInside = false;
    if (rect1Shape.containsPos(circ2Pos))  {
        isInside = true;
        // Find closest axis
        if (Math.abs(vFrom1to2[0] - alongX) < Math.abs(vFrom1to2[1] - alongY)) {
            // Clamp to closest side
            if (vec[0] > 0) {
                vec[0] = alongX;
            } else {
                vec[0] = -alongX;
            }
        } else { // y axis is shorter
            // Clamp to closest side
            if (vec[1] > 0) {
                vec[1] = alongY;
            } else {
                vec[1] = -alongY;
            }
        }
    }

    var normal = [0, 0];
    vec2.subtract(normal, vFrom1to2, vec);

    var distSqr = vec2.squaredLength(normal);
    var rSqr = circ2Shape.getRadius() * circ2Shape.getRadius();

    if (distSqr > rSqr && !isInside) {
        return false; //no collision exit before costly square root
    }

    var len = Math.sqrt(distSqr);
    var depth;

    vec2.scale(normal, normal, 1/len); // normalize normal
    if (isInside) { //flip normal if inside the rect
        vec2.scale(normal, normal, -1);
        depth = circ2Shape.getRadius() + len;
    } else {
        depth = circ2Shape.getRadius() - len;
    }

    collisionInfo.setNormal(normal);
    collisionInfo.setDepth(depth);
    return true;
};