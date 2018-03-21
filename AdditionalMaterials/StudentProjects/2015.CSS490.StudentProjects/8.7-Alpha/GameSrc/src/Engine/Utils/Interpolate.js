/* 
 * David Watson
 * CSS 490C
 * 2D Game Engine Design
 * File: Interpolate.js 
 * 
 * This  contains interpolation functions
 */


function Interpolate(value, cycles, rate) {
    this.mCurrentValue = value;    // begin value of interpolation
    this.mFinalValue = value;      // final value of interpolation
    this.mCycles = cycles;
    this.mRate = rate;
    // if there is a new value to interpolate to, 
    // number of cycles left for interpolation
    this.mCyclesLeft = 0;
}

Interpolate.prototype._interpolateValue = function () {
    this.mCurrentValue = this.mCurrentValue +
            this.mRate * (this.mFinalValue - this.mCurrentValue);
};

Interpolate.prototype.getValue = function () { return this.mCurrentValue; };
Interpolate.prototype.configInterpolation = function (stiffness, duration) {
    this.mRate = stiffness;
    this.mCycles = duration;
};

Interpolate.prototype.setFinalValue = function (v) {
    this.mFinalValue = v;
    this.mCyclesLeft = this.mCycles;     // will trigger interpolation
};

Interpolate.prototype.updateInterpolation = function () {
    if (this.mCyclesLeft <= 0)
        return;
    this.mCyclesLeft--;
    if (this.mCyclesLeft === 0)
        this.mCurrentValue = this.mFinalValue;
    else
        this._interpolateValue();
};