/* 
 * File: ShakePosition.js
 * traces the locus of a pseudo-damped simple harmonic motion
 */

/*jslint node: true, vars: true, bitwise: true */
/*global gEngine, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict";

//
//
// damped simple harmonic shake motion
// xDelta, yDelta: how large a shake
// shakeFrequency: how much movement
// shakeDuration: for how long in number of cycles
//
function ShakePosition(xDelta, yDelta, shakeFrequency, shakeDuration) {
    this.mXMag = xDelta;
    this.mYMag = yDelta;

    this.mCycles = shakeDuration; // number of cycles to complete the transition
    this.mOmega = shakeFrequency * 2 * Math.PI; // Converts frequency to radians 

    this.mNumCyclesLeft = shakeDuration;
}

ShakePosition.prototype.shakeDone = function () {
    return (this.mNumCyclesLeft <= 0);
};

ShakePosition.prototype.getShakeResults = function () {
    this.mNumCyclesLeft--;
    var c = [];
    var fx = 0;
    var fy = 0;
    if (!this.shakeDone()) {
        var v = this._nextDampedHarmonic();
        fx = (Math.random() > 0.5) ? -v : v;
        fy = (Math.random() > 0.5) ? -v : v;
    }
    c[0] = this.mXMag * fx;
    c[1] = this.mYMag * fy;
    return c;
};

ShakePosition.prototype._nextDampedHarmonic = function () {
    // computes (Cycles) * cos(  Omega * t )
    var frac = this.mNumCyclesLeft / this.mCycles;
    return frac * frac * Math.cos((1 - frac) * this.mOmega);
};