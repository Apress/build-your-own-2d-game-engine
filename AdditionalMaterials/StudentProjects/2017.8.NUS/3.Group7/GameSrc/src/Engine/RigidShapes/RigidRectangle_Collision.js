/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*jslint node: true, vars: true, evil: true, bitwise: true */
"use strict";
/*global RigidRectangle, Vec2 */

RigidRectangle.prototype.collisionTest = function (otherShape, collisionInfo) {
    var status = false;
    if (otherShape.mType === "RigidCircle") {
        status = this.collideRectCirc(otherShape, collisionInfo);
    } else {
        status = this.collideRectRect(this, otherShape, collisionInfo);
    }
    return status;
};

var SupportStruct = function () {
    this.mSupportPoint = null;
    this.mSupportPointDist = 0;
};
var tmpSupport = new SupportStruct();
RigidRectangle.prototype.findSupportPoint = function (dir, ptOnEdge) {
    //the longest project length
    var vToEdge = [0, 0];
    var projection;

    tmpSupport.mSupportPointDist = -Number.MAX_VALUE;
    tmpSupport.mSupportPoint = null;
    //check each vector of other object
    for (var i = 0; i < this.mVertex.length; i++) {
        vec2.subtract(vToEdge, this.mVertex[i], ptOnEdge);
        projection = vec2.dot(vToEdge, dir);
        
        //find the longest distance with certain edge
        //dir is -n direction, so the distance should be positive       
        if ((projection > 0) && (projection > tmpSupport.mSupportPointDist)) {
            tmpSupport.mSupportPoint = this.mVertex[i];
            tmpSupport.mSupportPointDist = projection;
        }
    }
};

/**
 * Find the shortest axis that overlapping
 * @memberOf RigidRectangle
 * @param {RigidRectangle} otherRect  another rectangle that being tested
 * @param {CollisionInfo} collisionInfo  record the collision information
 * @returns {Boolean} true if has overlap part in all four directions.
 * the code is convert from http://gamedevelopment.tutsplus.com/tutorials/how-to-create-a-custom-2d-physics-engine-oriented-rigid-bodies--gamedev-8032
 */
RigidRectangle.prototype.findAxisLeastPenetration = function (otherRect, collisionInfo) {

    var n;
    var supportPoint;

    var bestDistance = Number.MAX_VALUE;
    var bestIndex = null;

    var hasSupport = true;
    var i = 0;

    var dir = [0, 0];
    while ((hasSupport) && (i < this.mFaceNormal.length)) {
        // Retrieve a face normal from A
        n = this.mFaceNormal[i];

        // use -n as direction and the vectex on edge i as point on edge    
        vec2.scale(dir, n, -1);
        var ptOnEdge = this.mVertex[i];
        // find the support on B
        // the point has longest distance with edge i 
        otherRect.findSupportPoint(dir, ptOnEdge);
        hasSupport = (tmpSupport.mSupportPoint !== null);
        
        //get the shortest support point depth
        if ((hasSupport) && (tmpSupport.mSupportPointDist < bestDistance)) {
            bestDistance = tmpSupport.mSupportPointDist;
            bestIndex = i;
            supportPoint = tmpSupport.mSupportPoint;
        }
        i = i + 1;
    }
    if (hasSupport) {
        //all four directions have support point
        var bestVec = [0, 0];
        vec2.scale(bestVec, this.mFaceNormal[bestIndex], bestDistance);
        var atPos = [0, 0];
        vec2.add(atPos, supportPoint, bestVec);
        collisionInfo.setInfo(bestDistance, this.mFaceNormal[bestIndex], atPos);
    }
    return hasSupport;
};
/**
 * Check for collision between RigidRectangle and RigidRectangle
 * @param {RigidRectangle} r1 RigidRectangle object to check for collision status
 * @param {RigidRectangle} r2 RigidRectangle object to check for collision status against
 * @param {CollisionInfo} collisionInfo Collision info of collision
 * @returns {Boolean} true if collision occurs
 * @memberOf RigidRectangle
 */    
var collisionInfoR1 = new CollisionInfo();
var collisionInfoR2 = new CollisionInfo();
RigidRectangle.prototype.collideRectRect = function (r1, r2, collisionInfo) {
    var status1 = false;
    var status2 = false;

    //find Axis of Separation for both rectangle
    status1 = r1.findAxisLeastPenetration(r2, collisionInfoR1);

    if (status1) {
        status2 = r2.findAxisLeastPenetration(r1, collisionInfoR2);
        if (status2) {
            var depthVec = [0, 0];
            //if both of rectangles are overlapping, choose the shorter normal as the normal       
            if (collisionInfoR1.getDepth() < collisionInfoR2.getDepth()) {
                vec2.scale(depthVec, collisionInfoR1.getNormal(), collisionInfoR1.getDepth());
                var pos = [0, 0];
                vec2.subtract(pos, collisionInfoR1.mStart, depthVec);
                collisionInfo.setInfo(collisionInfoR1.getDepth(), collisionInfoR1.getNormal(), pos);
            } else {
                vec2.scale(depthVec, collisionInfoR2.getNormal(), -1);
                collisionInfo.setInfo(collisionInfoR2.getDepth(), depthVec, collisionInfoR2.mStart);
            }
        } 
    }
    return status1 && status2;
};