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

RigidShape.prototype.collidedRectCirc = function(rect1Shape, circ2Shape) {
    var rect1Pos = rect1Shape.getPosition();
    var circ2Pos = circ2Shape.getPosition();
    
    if (rect1Shape.containsPos(circ2Pos) || (circ2Shape.containsPos(rect1Pos))) {
        return true;
    }
        
    var vFrom1to2 = [0, 0];
    vec2.subtract(vFrom1to2, circ2Pos, rect1Pos);
    var vec = vec2.clone(vFrom1to2);

    var alongX = rect1Shape.getWidth() / 2;
    var alongY = rect1Shape.getHeight() / 2;

    vec[0] = this.clamp(vec[0], -alongX, alongX);
    vec[1] = this.clamp(vec[1], -alongY, alongY);
    
    var normal = [0, 0];
    vec2.subtract(normal, vFrom1to2, vec);

    var distSqr = vec2.squaredLength(normal);
    var rSqr = circ2Shape.getRadius() * circ2Shape.getRadius();

    return (distSqr < rSqr);
};