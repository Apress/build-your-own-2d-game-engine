/* 
 * David Watson
 * CSS 490C
 * 2D Game Engine Design
 * File: CameraShake.js 
 * 
 * This file that encapsulates our camera shaking functionality
 */


function CameraShake(state, xDelta, yDelta, shakeFrequency, shakeDuration) {
    this.mOrgCenter = vec2.clone(state.getCenter());
    this.mShakeCenter = vec2.clone(this.mOrgCenter);
    this.mShake = new ShakePosition(xDelta, yDelta, shakeFrequency,
            shakeDuration);
}

CameraShake.prototype.updateShakeState = function () {
    var s = this.mShake.getShakeResults();
    vec2.add(this.mShakeCenter, this.mOrgCenter, s);
};

CameraShake.prototype.shakeDone = function () {
    return this.mShake.shakeDone();
};

CameraShake.prototype.getCenter = function () { return this.mShakeCenter; };
CameraShake.prototype.setRefCenter = function (c) {
    this.mOrgCenter[0] = c[0];
    this.mOrgCenter[1] = c[1];
};