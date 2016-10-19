/* 
 * File: CameraState.js
 * Defines the state of a camera to faciliate the manipulation of this state
 */

/*jslint node: true, vars: true, bitwise: true */
/*global gEngine, Interpolate, InterpolateVec2 */
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict";

//
function CameraState(center, width) {
    this.kCycles = 300;  // number of cycles to complete the transition
    this.kRate = 0.1;    // rate of change for each cycle
    this.mCenter = new InterpolateVec2(center, this.kCycles, this.kRate);
    this.mWidth = new Interpolate(width, this.kCycles, this.kRate);
}

// <editor-fold desc="Public Methods">
CameraState.prototype.getCenter = function () { return this.mCenter.getValue(); };
CameraState.prototype.getWidth = function () { return this.mWidth.getValue(); };

CameraState.prototype.setCenter = function (c) { this.mCenter.setFinalValue(c); };
CameraState.prototype.setWidth = function (w) { this.mWidth.setFinalValue(w); };

CameraState.prototype.updateCameraState = function () {
    this.mCenter.updateInterpolation();
    this.mWidth.updateInterpolation();
};

CameraState.prototype.configInterpolation = function (stiffness, duration) {
    this.mCenter.configInterpolation(stiffness, duration);
    this.mWidth.configInterpolation(stiffness, duration);
};
// </editor-fold>