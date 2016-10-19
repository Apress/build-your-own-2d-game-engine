/* 
 * File: RigidCircle_Collision.js
 * Detects RigidCircle collisions
 */

/*jslint node: true, vars:true , white: true*/
/*global RigidShape, RigidCircle, vec2, LineRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict";

RigidCircle.prototype.containsPos = function(pos) {
    var dist = vec2.distance(this.getPosition(), pos);
    return (dist < this.getRadius());
};

RigidCircle.prototype.collidedCircCirc = function(c1, c2) {
    var vecToCenter = [0, 0];
    vec2.sub(vecToCenter, c1.getPosition(), c2.getPosition());
    var rSum = c1.getRadius() + c2.getRadius();
    return (vec2.squaredLength(vecToCenter) < (rSum * rSum));    
};


RigidCircle.prototype.collided = function(otherShape) { 
    var status = false;
    switch (otherShape.rigidType()) {
        case RigidShape.eRigidType.eRigidCircle:
            status = this.collidedCircCirc(this, otherShape);
            break;
        case RigidShape.eRigidType.eRigidRectangle:
            status = this.collidedRectCirc(otherShape, this);
            break;
    }
    return status;
};