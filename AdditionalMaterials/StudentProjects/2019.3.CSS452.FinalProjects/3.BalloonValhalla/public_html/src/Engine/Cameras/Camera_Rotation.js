/* 
 * File: Camera_Rotation.js
 * Defines the functions that supports camera rotation
 */

/*jslint node: true, vars: true, bitwise: true */
/*global Camera, vec3*/
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict";

/**
 * Sets Camera rotation around the z-axis
 * @memberOf Camera
 * @param {radians} Rotation angle in radians
 */
Camera.prototype.setRotation = function (radians) {
    this.mRotation = radians;
    this.mUpVector[0] = -Math.sin(radians);
    this.mUpVector[1] = Math.cos(radians);
    this.mUpVector[2] = 0.0;
};

/**
 * Returns Camera rotation around the z-axis
 * @memberOf Camera
 * @returns Rotation angle in radians
 */
Camera.prototype.getRotation = function () {
    return this.mRotation;
};

/**
 * Returns Camera rotation around the z-axis
 * @memberOf Camera
 * @returns Rotation angle in radians
 */
Camera.prototype.getUpVector = function () {
    return this.mUpVector;
};