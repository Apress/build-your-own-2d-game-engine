/* 
 * File: InterpolateVec2.js
 * Encapsulates linear interpolation of vec2, calls gl-matrixjs::lerp
 */

/*jslint node: true, vars: true */
/*global gEngine: false, vec2: false, Interpolate: false */
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict";

/**
 * Default Constructor
 * vec2 interpolation support
 * @memberOf InterpolateVec2
 * @param {type} value target for interpolation
 * @param {Integer} cycle how many cycle it should take for a value to change to final
 * @param {Number} rate the rate at which the value should change at each cycle
 * @returns {InterpolateVec2} New Instance of InterpolateVec2
 */
function InterpolateVec2(value, cycle, rate) {
    Interpolate.call(this, value, cycle, rate);
}
gEngine.Core.inheritPrototype(InterpolateVec2, Interpolate);

/**
 * Interpolate values
 * @memberOf InterpolateVec2
 * @returns {void}
 */
InterpolateVec2.prototype._interpolateValue = function () {
    vec2.lerp(this.mCurrentValue, this.mCurrentValue, this.mFinalValue, this.mRate);
};