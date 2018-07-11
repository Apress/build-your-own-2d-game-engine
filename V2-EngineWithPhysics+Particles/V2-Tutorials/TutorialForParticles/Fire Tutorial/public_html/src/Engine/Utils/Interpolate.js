/* 
 * File: Interpolate.js
 * Encapsulates linear interpolation
 */

/*jslint node: true, vars: true */
/*global gEngine: false, vec2: false, Math: false, mat4: false, vec3: false */
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict";

/**
 * Default Constructor
 * @memberOf Interpolate
 * @param {Float[]} value target for interpolation
 * @param {Integer} cycles how many cycle it should take for a value to change to final
 * @param {Number} rate the rate at which the value should change at each cycle
 * @returns {Interpolate} New Instance of Interpolate
 */
function Interpolate(value, cycles, rate) {
    this.mCurrentValue = value;    // begin value of interpolation
    this.mFinalValue = value;      // final value of interpolation
    this.mCycles = cycles;
    this.mRate = rate;

    // if there is a new value to interpolate to, number of cycles left for interpolation
    this.mCyclesLeft = 0;
}

// <editor-fold desc="Public Methods">
/**
 * Return the current value of the Interpolation
 * @memberOf Interpolate
 * @returns {Float[]} current value
 */
Interpolate.prototype.getValue = function () { return this.mCurrentValue; };

/**
 * Set the final value of the Interpolation
 * @memberOf Interpolate
 * @param {Float[]} v final value
 * @returns {void}
 */
Interpolate.prototype.setFinalValue = function (v) {
    this.mFinalValue = v;
    this.mCyclesLeft = this.mCycles;     // will trigger interpolation
};

/**
 * Update the Interpolation
 * @memberOf Interpolate
 * @returns {void}
 */
Interpolate.prototype.updateInterpolation = function () {
    if (this.mCyclesLeft <= 0) {
        return;
    }

    this.mCyclesLeft--;
    if (this.mCyclesLeft === 0) {
        this.mCurrentValue = this.mFinalValue;
    } else {
        this._interpolateValue();
    }
};

// 
/**
 * Set stiffness and duration
 * @memberOf Interpolate
 * @param {Number} stiffness new stiffness value of interpolate, stiffness of 1 switches off interpolation
 * @param {Number} duration new duration value of interpolate
 * @returns {void}
 */
Interpolate.prototype.configInterpolation = function (stiffness, duration) {
    this.mRate = stiffness;
    this.mCycles = duration;
};
// </editor-fold>

// 
/**
 * Interpolate values
 * subclass should override this function for non-scalar values
 * @memberOf Interpolate
 * @returns {void}
 */
Interpolate.prototype._interpolateValue = function () {
    this.mCurrentValue = this.mCurrentValue + this.mRate * (this.mFinalValue - this.mCurrentValue);
};