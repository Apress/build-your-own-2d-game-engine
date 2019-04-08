/* 
 * File: Camera_Manipulation.js
 * Defines the functions that supports camera manipulations
 */

/*jslint node: true, vars: true, bitwise: true */
/*global gEngine, Camera, BoundingBox, vec2, CameraShake */
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict";

/**
 * update function to be called from EngineCore.GameLoop.
 * @memberOf Camera
 * @returns {void}
 */
Camera.prototype.update = function () {
    if (this.mCameraShake !== null) {
        if (this.mCameraShake.shakeDone()) {
            this.mCameraShake = null;
        } else {
            this.mCameraShake.setRefCenter(this.getWCCenter());
            this.mCameraShake.updateShakeState();
        }
    }
    this.mCameraState.updateCameraState();
};

/**
 * Pan the Camera by dx and dy
 * @memberOf Camera
 * @param {Number} dx X value to pan the camera
 * @param {Number} dy Y value to pan the camera
 * @returns {void}
 */
Camera.prototype.panBy = function (dx, dy) {
    var newC = vec2.clone(this.getWCCenter());
    this.mWCCenter[0] += dx;
    this.mWCCenter[1] += dy;
    this.mCameraState.setCenter(newC);
};

/**
 * pan the camera to ensure aXform is within camera bounds<p>
 * this is complementary to the ClampAtBound: instead of clamping aXform, now, move the camera.
 * @memberOf Camera
 * @param {Transform} aXform Transform to clamp the Camera to
 * @param {Number} zone distance from the camera border to collide with
 * @returns {void}
 */
Camera.prototype.panWith = function (aXform, zone) {
    var status = this.collideWCBound(aXform, zone);
    if (status !== BoundingBox.eboundCollideStatus.eInside) {
        var pos = aXform.getPosition();
        var newC = vec2.clone(this.getWCCenter());
        if ((status & BoundingBox.eboundCollideStatus.eCollideTop) !== 0) {
            newC[1] = pos[1] + (aXform.getHeight() / 2) - (zone * this.getWCHeight() / 2);
        }
        if ((status & BoundingBox.eboundCollideStatus.eCollideBottom) !== 0) {
            newC[1] = pos[1] - (aXform.getHeight() / 2) + (zone * this.getWCHeight() / 2);
        }
        if ((status & BoundingBox.eboundCollideStatus.eCollideRight) !== 0) {
            newC[0] = pos[0] + (aXform.getWidth() / 2) - (zone * this.getWCWidth() / 2);
        }
        if ((status & BoundingBox.eboundCollideStatus.eCollideLeft) !== 0) {
            newC[0] = pos[0] - (aXform.getWidth() / 2) + (zone * this.getWCWidth() / 2);
        }
        this.mCameraState.setCenter(newC);
    }
};

/**
 * Pan Camera to cx, cy position
 * @memberOf Camera
 * @param {Number} cx X position to pan the camera to
 * @param {Number} cy Y position to pan the camera to
 * @returns {void}
 */
Camera.prototype.panTo = function (cx, cy) {
    this.setWCCenter(cx, cy);
};

/**
 * zoom with respect to the center<p>
 * zoom > 1 ==> zooming out, see more of the world<p>
 * zoom < 1 ==> zooming in, see less of the world, more detailed<p>
 * zoom < 0 is ignored
 * @memberOf Camera
 * @param {Number} zoom to scale the camera width
 * @returns {void}
 */
Camera.prototype.zoomBy = function (zoom) {
    if (zoom > 0) {
        this.setWCWidth(this.getWCWidth() * zoom);
    }
};

/**
 * zoom towards (pX, pY) by zoom:<p>
 * zoom > 1 ==> zooming out, see more of the world<p>
 * zoom < 1 ==> zooming in, see less of the world, more detailed<p>
 * zoom < 0 is ignored
 * @memberOf Camera
 * @param {vec2} pos Point to scale the camera with respect to
 * @param {Number} zoom to scale the camera width
 * @returns {void}
 */
Camera.prototype.zoomTowards = function (pos, zoom) {
    var delta = [];
    var newC = [];
    vec2.sub(delta, pos, this.getWCCenter());
    vec2.scale(delta, delta, zoom - 1);
    vec2.sub(newC, this.getWCCenter(), delta);
    this.zoomBy(zoom);
    this.mCameraState.setCenter(newC);
};

/**
 * Confiqure interpolation of camera
 * @memberOf Camera
 * @param {Number} stiffness stiffness value of interpolate, stiffness of 1 switches off interpolation
 * @param {Number} duration duration value of interpolate
 * @returns {void}
 */
Camera.prototype.configInterpolation = function (stiffness, duration) {
    this.mCameraState.configInterpolation(stiffness, duration);
};

/**
 * Initiates a camera shake
 * @memberOf Camera
 * @param {Number} xDelta how large a shake
 * @param {Number} yDelta how large a shake
 * @param {Number} shakeFrequency how much movement
 * @param {Number} duration for how long in number of cycles
 * @returns {void}
 */
Camera.prototype.shake = function (xDelta, yDelta, shakeFrequency, duration) {
    this.mCameraShake = new CameraShake(this.mCameraState, xDelta, yDelta, shakeFrequency, duration);
};