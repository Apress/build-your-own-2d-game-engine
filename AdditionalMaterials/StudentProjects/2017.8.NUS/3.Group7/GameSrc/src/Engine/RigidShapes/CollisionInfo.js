/* 
 * File: CollisionInfo.js
 *      normal: vector upon which collision interpenetrates
 *      depth: how much penetration
 */

/*jslint node: true, vars: true, evil: true, bitwise: true */
"use strict";

/**
 * Default Constructor
 * @memberOf CollisionInfo
 * @returns {CollisionInfo} New instance of CollisionInfo
 */
function CollisionInfo() {
    this.mDepth = 0;
    this.mNormal = vec2.fromValues(0, 0);
    this.mStart = vec2.fromValues(0, 0);
    this.mEnd = vec2.fromValues(0, 0);
    
    this.mLine = new LineRenderable();
    this.mLine.setColor([1, 0, 1, 1]);
    this.mLine.setDrawVertices(true);
    this.mLine.setPointSize(5);
}

/**
 * Set the depth of the CollisionInfo
 * @memberOf CollisionInfo
 * @param {Number} s how much penetration
 * @returns {void}
 */
CollisionInfo.prototype.setDepth = function (s) {
    this.mDepth = s;
};

/**
 * Set the normal of the CollisionInfo
 * @memberOf CollisionInfo
 * @param {vec2} s vector upon which collision interpenetrates
 * @returns {void}
 */
CollisionInfo.prototype.setNormal = function (s) {
    this.mNormal = s;
};

/**
 * Return the depth of the CollisionInfo
 * @memberOf CollisionInfo
 * @returns {Number} how much penetration
 */
CollisionInfo.prototype.getDepth = function () {
    return this.mDepth;
};

/**
 * Return the depth of the CollisionInfo
 * @memberOf CollisionInfo
 * @returns {vec2} vector upon which collision interpenetrates
 */
CollisionInfo.prototype.getNormal = function () {
    return this.mNormal;
};
CollisionInfo.prototype.getStart = function () {
    return this.mStart;
};
CollisionInfo.prototype.getEnd = function () {
    return this.mEnd;
};

/**
 * Set the all value of the CollisionInfo
 * @memberOf CollisionInfo
 * @param {Number} d the depth of the CollisionInfo 
 * @param {Vec2} n the normal of the CollisionInfo
 * @param {Vec2} s the startpoint of the CollisionInfo
 * @returns {void}
 */
CollisionInfo.prototype.setInfo = function (d, n, s) {
    this.mDepth = d;
    this.mNormal[0] = n[0];
    this.mNormal[1] = n[1];
    this.mStart[0] = s[0];
    this.mStart[1] = s[1];
    vec2.scaleAndAdd(this.mEnd, s, n, d);
};

/**
 * change the direction of normal
 * @memberOf CollisionInfo
 * @returns {void}
 */
CollisionInfo.prototype.changeDir = function () {
    vec2.scale(this.mNormal, this.mNormal, -1);
    var n = this.mStart;
    this.mStart = this.mEnd;
    this.mEnd = n;
};

CollisionInfo.prototype.draw = function(aCamera) {
    this.mLine.setFirstVertex(this.mStart[0], this.mStart[1]);
    this.mLine.setSecondVertex(this.mEnd[0], this.mEnd[1]);
    this.mLine.draw(aCamera);
};