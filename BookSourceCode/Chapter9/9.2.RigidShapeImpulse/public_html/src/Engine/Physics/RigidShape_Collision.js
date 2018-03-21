/* 
 * File: RigidShape_Collision.js
 * Detects RigidPoint collisions
 */

/*jslint node: true, vars:true , white: true*/
/*global RigidShape, vec2, LineRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict";


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