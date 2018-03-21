/* 
 * File: Interpolate.js
 * Encapsulates linear interpolation
 */

/*jslint node: true, vars: true */
/*global gEngine: false, vec2: false, Math: false, mat4: false, vec3: false */
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict";


// value: target for interpolation
// cycles: integer, how many cycle it should take for a value to change to final
// rate: the rate at which the value should change at each cycle
function Interpolate(value, cycles, rate) {
    this.mCurrentValue = value;    // begin value of interpolation
    this.mFinalValue = value;      // final value of interpolation
    this.mCycles = cycles;
    this.mRate = rate;

    // if there is a new value to interpolate to, number of cycles left for interpolation
    this.mCyclesLeft = 0;
}

// <editor-fold desc="Public Methods">
Interpolate.prototype.getValue = function () { return this.mCurrentValue; };
Interpolate.prototype.setFinalValue = function (v) {
    this.mFinalValue = v;
    this.mCyclesLeft = this.mCycles;     // will trigger interpolation
};

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

// stiffness of 1 switches off interpolation
Interpolate.prototype.configInterpolation = function (stiffness, duration) {
    this.mRate = stiffness;
    this.mCycles = duration;
};
// </editor-fold>

// subclass should override this function for non-scalar values
Interpolate.prototype._interpolateValue = function () {
    this.mCurrentValue = this.mCurrentValue + this.mRate * (this.mFinalValue - this.mCurrentValue);
};