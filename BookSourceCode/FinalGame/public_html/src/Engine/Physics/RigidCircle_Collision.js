/* 
 * File: RigidCircle_Collision.js
 * Detects RigidCircle collisions
 */

/*jslint node: true, vars:true , white: true*/
/*global RigidShape, RigidCircle, vec2, LineRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict";

/**
 * Check if RigidShape contains position
 * @param {vec2} pos Position to check
 * @returns {Boolean} true if position is in RigidShape
 * @memberOf RigidCircle
 */
RigidCircle.prototype.containsPos = function(pos) {
    var dist = vec2.distance(this.getPosition(), pos);
    return (dist < this.getRadius());
};

/**
 * 
 * @param {RigidCircle} c1 Circle object to check for collision status
 * @param {RigidCircle} c2 Circle object to check for collision status against
 * @param {CollisionInfo} collisionInfo Collision info of collision
 * @returns {Boolean} true if collision occurs
 * @memberOf RigidCircle
 */
RigidCircle.prototype.collidedCircCirc = function(c1, c2, collisionInfo) {
    var vFrom1to2 = [0, 0];
    vec2.sub(vFrom1to2, c2.getPosition(), c1.getPosition());
    var rSum = c1.getRadius() + c2.getRadius();
    var sqLen = vec2.squaredLength(vFrom1to2);
    if (sqLen > (rSum * rSum)) {
        return false;
    }
    var dist = Math.sqrt(sqLen);

    if (dist !== 0) { // overlapping
        vec2.scale(vFrom1to2, vFrom1to2, 1/dist);
        collisionInfo.setNormal(vFrom1to2);
        collisionInfo.setDepth(rSum - dist);
    }
    else //same position
    {
        collisionInfo.setDepth(rSum / 10);
        collisionInfo.setNormal([0, 1]);
    }

    return true;
};

/**
 * Check for collision between this and RigidShape
 * @param {RigidShape} otherShape RigidShape object to check for collision status against
 * @param {CollisionInfo} collisionInfo Collision info of collision
 * @returns {Boolean} true if collision occurs
 * @memberOf RigidCircle
 */
RigidCircle.prototype.collided = function(otherShape, collisionInfo) { 
    var status = false;
    var n;
    collisionInfo.setDepth(0);
    switch (otherShape.rigidType()) {
        case RigidShape.eRigidType.eRigidCircle:
            status = this.collidedCircCirc(this, otherShape, collisionInfo);
            break;
        case RigidShape.eRigidType.eRigidRectangle:
            status = this.collidedRectCirc(otherShape, this, collisionInfo);
            n = collisionInfo.getNormal();
            n[0] = -n[0];
            n[1] = -n[1];
            break;
    }
    return status;
};