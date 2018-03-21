/* 
 * File: ShakePosition.js
 * traces the locus of a pseudo-damped simple harmonic motion
 */

/*jslint node: true, vars: true, bitwise: true */
/*global gEngine, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict";

/**
 * Default Constructor<p>
 * damped simple harmonic shake motion
 * @memberOf ShakePosition
 * @param {Number} xDelta  how large a shake
 * @param {Number} yDelta  how large a shake
 * @param {Number} shakeFrequency how much movement
 * @param {Number} shakeDuration for how long in number of cycles
 * @returns {ShakePosition} New instance of ShakePosition
 */
function ShakePosition(xDelta, yDelta, shakeFrequency, shakeDuration, enableRandom) {
    this.mXMag = xDelta;
    this.mYMag = yDelta;

    this.mCycles = shakeDuration; // number of cycles to complete the transition
    this.mOmega = shakeFrequency * 2 * Math.PI; // Converts frequency to radians 

    this.mNumCyclesLeft = shakeDuration;
    this.mNumCyclesCounted = 0;
    
    this.enableRandom = true;
    if (typeof enableRandom !== 'undefined' && !enableRandom)
        this.enableRandom = false;
}

/**
 * Return the shake status
 * @memberOf ShakePosition
 * @returns {Boolean} true if shake is done
 */
ShakePosition.prototype.shakeDone = function () {
    return (this.mNumCyclesLeft <= 0);
};

/**
 * Return the shake coordinate results
 * @memberOf ShakePosition
 * @returns {Array} X and Y value of the shake position
 */
ShakePosition.prototype.getShakeResults = function () {
    this.mNumCyclesLeft--;
    this.mNumCyclesCounted++;
    var c = [];
    var fx = 0;
    var fy = 0;
    if (!this.shakeDone()) {
        var v = this._nextDampedHarmonic();
        if (this.enableRandom) {
            fx = (Math.random() > 0.5) ? -v : v;
            fy = (Math.random() > 0.5) ? -v : v;
        }
        else {
            fx = v;
            fy = v;
        }
    }
    c[0] = this.mXMag * fx;
    c[1] = this.mYMag * fy;
    return c;
};

ShakePosition.prototype.setRemainingCycles = function (remaining) {
    
    this.mNumCyclesLeft = remaining;
    if (this.mNumCyclesLeft < 0)
        this.mNumCyclesLeft = 0;
    if (this.mNumCyclesLeft > this.mCycles)
        this.mNumCyclesLeft = this.mCycles;
};
ShakePosition.prototype.addRemainingCycles = function (remaining) {
    
    this.mNumCyclesLeft += remaining;
    if (this.mNumCyclesLeft < 0)
        this.mNumCyclesLeft = 0;
    if (this.mNumCyclesLeft > this.mCycles)
        this.mNumCyclesLeft = this.mCycles;
};

/**
 * 
 * @memberOf ShakePosition
 * @returns {@param;ShakePosition|@param;ShakePosition:shakeDuration|Number}
 */
ShakePosition.prototype._nextDampedHarmonic = function () {
    // computes (Cycles) * cos(  Omega * t )
    var position = (this.mCycles - this.mNumCyclesCounted) / this.mCycles;
    var frac = this.mNumCyclesLeft / this.mCycles;
    return frac * frac * Math.cos((1 - position) * this.mOmega);
};