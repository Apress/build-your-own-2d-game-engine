/* 
 * File: GameObjectShake.js
 * Defines a damped simple harmonic motion to simulate camera shakie
 */

/*jslint node: true, vars: true, bitwise: true */
/*global gEngine, vec2, ShakePosition */
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict";

//
////
// damped simple harmonic shake motion
//
// state is the GameObjectState to be shaked.
function GameObjectShake(state, xDelta, yDelta, shakeFrequency, shakeDuration) {
    this.mOrgCenter = vec2.clone(state.getCenter());
    this.mShakeCenter = vec2.clone(this.mOrgCenter);
    this.mShake = new ShakePosition(xDelta, yDelta, shakeFrequency, shakeDuration);
}

GameObjectShake.prototype.updateShakeState = function () {
    var s = this.mShake.getShakeResults();
    vec2.add(this.mShakeCenter, this.mOrgCenter, s);
};

GameObjectShake.prototype.shakeDone = function () {
    return this.mShake.shakeDone();
};

GameObjectShake.prototype.getCenter = function () { return this.mShakeCenter; };
GameObjectShake.prototype.setRefCenter = function (c) {
    this.mOrgCenter[0] = c[0];
    this.mOrgCenter[1] = c[1];
};