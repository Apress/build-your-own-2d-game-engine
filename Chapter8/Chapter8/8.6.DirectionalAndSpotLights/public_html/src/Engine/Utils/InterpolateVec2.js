/* 
 * File: InterpolateVec2.js
 * Encapsulates linear interpolation of vec2, calls gl-matrixjs::lerp
 */

/*jslint node: true, vars: true */
/*global gEngine: false, vec2: false, Interpolate: false */
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict";


// vec2 interpolation support
function InterpolateVec2(value, cycle, rate) {
    Interpolate.call(this, value, cycle, rate);
}
gEngine.Core.inheritPrototype(InterpolateVec2, Interpolate);

InterpolateVec2.prototype._interpolateValue = function () {
    vec2.lerp(this.mCurrentValue, this.mCurrentValue, this.mFinalValue, this.mRate);
};