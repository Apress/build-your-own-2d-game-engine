/* 
 * File: CameraState.js
 * Defines the state of a camera to faciliate the manipulation of this state
 */

/*jslint node: true, vars: true, bitwise: true */
/*global gEngine, Interpolate, InterpolateVec2 */
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict";

/**
 * Default Constructor
 * @class CameraState
 * @param {Float[]} center final value of the center Interpolation
 * @param {Float[]} width final value of the width Interpolation
 * @returns {CameraState} new instance of CameraState
 */
function CameraState(center, width) {
    this.kCycles = 300;  // number of cycles to complete the transition
    this.kRate = 0.1;  // rate of change for each cycle
    this.mCenter = new InterpolateVec2(center, this.kCycles, this.kRate);
    this.mWidth = new Interpolate(width, this.kCycles, this.kRate);
}

// <editor-fold desc="Public Methods">
/**
 * Return the CameraState center
 * @memberOf CameraState
 * @returns {Float[]} current value of the center Interpolation
 */
CameraState.prototype.getCenter = function () { return this.mCenter.getValue(); };

/**
 * Return the CameraState width
 * @memberOf CameraState
 * @returns {Float[]} current value of the width Interpolation
 */
CameraState.prototype.getWidth = function () { return this.mWidth.getValue(); };

/**
 * Set the CameraState Center
 * @memberOf CameraState
 * @param {Float[]} c final value of the center Interpolation
 * @returns {void}
 */
CameraState.prototype.setCenter = function (c) { this.mCenter.setFinalValue(c); };

/**
 * Set the CameraState Width
 * @memberOf CameraState
 * @param {Float[]} w final value of the width Interpolation
 * @returns {void}
 */
CameraState.prototype.setWidth = function (w) { this.mWidth.setFinalValue(w); };

/**
 * Update the CameraState interpolation values
 * @memberOf CameraState
 * @returns {void}
 */
CameraState.prototype.updateCameraState = function () {
    this.mCenter.updateInterpolation();
    this.mWidth.updateInterpolation();
};

/**
 * 
 * Confiqure interpolation of camera
 * @memberOf CameraState
 * @param {Number} stiffness stiffness value of interpolate, stiffness of 1 switches off interpolation
 * @param {Number} duration duration value of interpolate
 * @returns {void}
 */
CameraState.prototype.configInterpolation = function (stiffness, duration) {
    this.mCenter.configInterpolation(stiffness, duration);
    this.mWidth.configInterpolation(stiffness, duration);
};
// </editor-fold>