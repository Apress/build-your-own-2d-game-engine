/* 
 * File: RigidRectangle_Collision.js
 * Detects RigidRectangle collisions
 */

/*jslint node: true, vars:true , white: true*/
/*global RigidShape, RigidRectangle, vec2, LineRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict";

RigidRectangle.prototype.containsPos = function (pos) {
    var rPos = this.getPosition();
    var rMinX = rPos[0] - this.getWidth() / 2;
    var rMaxX = rPos[0] + this.getWidth() / 2;
    var rMinY = rPos[1] - this.getHeight() / 2;
    var rMaxY = rPos[1] + this.getHeight() / 2;

    return ((rMinX < pos[0]) && (rMaxX > pos[0]) && 
            (rMinY < pos[1] && rMaxY > pos[1]));
};

RigidRectangle.prototype.collidedRectRect = function(r1, r2) {
    var r1Pos = r1.getPosition();
    var r1MinX = r1Pos[0] - r1.getWidth() / 2;
    var r1MaxX = r1Pos[0] + r1.getWidth() / 2;
    var r1MinY = r1Pos[1] - r1.getHeight() / 2;
    var r1MaxY = r1Pos[1] + r1.getHeight() / 2;

    var r2Pos = r2.getPosition();
    var r2MinX = r2Pos[0] - r2.getWidth() / 2;
    var r2MaxX = r2Pos[0] + r2.getWidth() / 2;
    var r2MinY = r2Pos[1] - r2.getHeight() / 2;
    var r2MaxY = r2Pos[1] + r2.getHeight() / 2;

    return ((r1MaxX > r2MinX) && (r1MinX < r2MaxX) &&
            (r1MaxY > r2MinY) && (r1MinY < r2MaxY));
};


RigidRectangle.prototype.collided = function(otherShape) {
    var status = false;
    switch (otherShape.rigidType()) {
        case RigidShape.eRigidType.eRigidCircle:
            status = this.collidedRectCirc(this, otherShape);
            break;
        case RigidShape.eRigidType.eRigidRectangle:
            status = this.collidedRectRect(otherShape, this);
            break;
    }
    return status;
};