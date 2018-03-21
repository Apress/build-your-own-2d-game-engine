/* 
 * David Watson
 * CSS 490C
 * 2D Game Engine Design
 * File: InterpolateVec2.js 
 * 
 * This contains interpolation functions for vec2 data
 */


function InterpolateVec2(value, cycle, rate) {
    Interpolate.call(this, value, cycle, rate);
}

gEngine.Core.inheritPrototype(InterpolateVec2, Interpolate);

InterpolateVec2.prototype._interpolateValue = function () {
    vec2.lerp(this.mCurrentValue, this.mCurrentValue, this.mFinalValue,
            this.mRate);
};
