/* 
 * File: RigidRectangle_Collision.js
 * Detects RigidRectangle collisions
 */

/*jslint node: true, vars:true , white: true*/
/*global RigidShape, RigidRectangle, vec2, LineRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict";

/**
 * Check if RigidShape contains position
 * @param {vec2} pos Position to check
 * @returns {Boolean} true if position is in RigidShape
 * @memberOf RigidRectangle
 */
RigidRectangle.prototype.containsPos = function (pos) {
    var rPos = this.getPosition();
    var rMinX = rPos[0] - this.getWidth() / 2;
    var rMaxX = rPos[0] + this.getWidth() / 2;
    var rMinY = rPos[1] - this.getHeight() / 2;
    var rMaxY = rPos[1] + this.getHeight() / 2;

    return ((rMinX < pos[0]) && (rMaxX > pos[0]) && 
            (rMinY < pos[1] && rMaxY > pos[1]));
};

/**
 * Check for collision between RigidRectangle and RigidRectangle
 * @param {RigidRectangle} r1 Rectangle object to check for collision status
 * @param {RigidRectangle} r2 Rectangle object to check for collision status against
 * @param {CollisionInfo} collisionInfo Collision info of collision
 * @returns {Boolean} true if collision occurs
 * @memberOf RigidRectangle
 */
RigidRectangle.prototype.collidedRectRect = function(r1, r2, collisionInfo) {
    var vFrom1to2 = vec2.fromValues(0, 0);
    vec2.sub(vFrom1to2, r2.getPosition(), r1.getPosition());
    var xDepth = (r1.getWidth() / 2) + (r2.getWidth() / 2) - Math.abs(vFrom1to2[0]);
    if (xDepth > 0) {
        var yDepth = (r1.getHeight() / 2) + (r2.getHeight() / 2) - Math.abs(vFrom1to2[1]);
        if (yDepth > 0)  {
            //axis of least penetration
            if (xDepth < yDepth) {
                if (vFrom1to2[0] < 0) {
                    collisionInfo.setNormal([-1, 0]);
                } else {
                    collisionInfo.setNormal([1, 0]);
                }
                collisionInfo.setDepth(xDepth);
            } else {
                if (vFrom1to2[1] < 0) {
                    collisionInfo.setNormal([0, -1]);
                } else {
                    collisionInfo.setNormal([0, 1]);
                }
                collisionInfo.setDepth(yDepth);
            }
            return true;
        }
    }
    return false;
};

/**
 * Check for collision between this and RigidShape
 * @param {RigidShape} otherShape RigidShape object to check for collision status against
 * @param {CollisionInfo} collisionInfo Collision info of collision
 * @returns {Boolean} true if collision occurs
 * @memberOf RigidRectangle
 */
RigidRectangle.prototype.collided = function(otherShape, collisionInfo) {
    var status = false;
    collisionInfo.setDepth(0);
    switch (otherShape.rigidType()) {
        case RigidShape.eRigidType.eRigidCircle:
            status = this.collidedRectCirc(this, otherShape, collisionInfo);
            break;
        case RigidShape.eRigidType.eRigidRectangle:
            status = this.collidedRectRect(this, otherShape, collisionInfo);
            break;
    }
    return status;
};