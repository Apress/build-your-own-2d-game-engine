/* 
 * David Watson
 * CSS 490C
 * 2D Game Engine Design
 * File: CollisionInfo.js 
 * 
 * This file encapsulates velocity, mass, restitution, friction 
 * and acceleration
 *
 */


function CollisionInfo() {
    this.mDepth = 0;
    this.mNormal = vec2.fromValues(0, 0);
}

CollisionInfo.prototype.setDepth = function (s) { this.mDepth = s; };
CollisionInfo.prototype.setNormal = function (s) { this.mNormal = s; };
CollisionInfo.prototype.getDepth = function () { return this.mDepth; };
CollisionInfo.prototype.getNormal = function () { return this.mNormal; };