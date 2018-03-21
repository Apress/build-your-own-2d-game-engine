/* 
 * File: GameObjectState.js
 * Defines the state of a camera to faciliate the manipulation of this state
 */

/*jslint node: true, vars: true, bitwise: true */
/*global gEngine, Interpolate, InterpolateVec2, vec2:false */
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict";

//
function GameObjectState(center, width) {
    this.kCycles = 300;  // number of cycles to complete the transition
    this.kRate = 0.05;  // rate of change for each cycle
    this.mCenter = new InterpolateVec2(center, this.kCycles, this.kRate);
    this.mWidth = new Interpolate(width, this.kCycles, this.kRate);
    this.mFinal = null;
}

// <editor-fold desc="Public Methods">
GameObjectState.prototype.getCenter = function () {
    return this.mCenter.getValue();
};
GameObjectState.prototype.getWidth = function () {
    return this.mWidth.getValue();
};

GameObjectState.prototype.setCenter = function (c) {
    this.mFinal = c;
    this.mCenter.setFinalValue(c);
};
GameObjectState.prototype.setWidth = function (w) {
    this.mWidth.setFinalValue(w);
};

GameObjectState.prototype.updateGameObjectState = function () {
    this.mCenter.updateInterpolation();
    this.mWidth.updateInterpolation();
};

GameObjectState.prototype.configInterpolation = function (stiffness, duration) {
    this.mCenter.configInterpolation(stiffness, duration);
    this.mWidth.configInterpolation(stiffness, duration);
};
// </editor-fold>