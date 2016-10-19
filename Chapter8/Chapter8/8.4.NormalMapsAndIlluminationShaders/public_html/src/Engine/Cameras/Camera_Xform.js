/* 
 * File: Camera_Xform.js
 * Defines the functions that supports camera to pixel space transforms (mainly for illumination support)
 */

/*jslint node: true, vars: true, bitwise: true */
/*global Camera, vec3*/
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict";

Camera.prototype.fakeZInPixelSpace = function (z) {
    return z * this.mRenderCache.mWCToPixelRatio;
};

Camera.prototype.wcPosToPixel = function (p) {  // p is a vec3, fake Z
    // Convert the position to pixel space
    var x = this.mViewport[Camera.eViewport.eOrgX] + ((p[0] - this.mRenderCache.mCameraOrgX) * this.mRenderCache.mWCToPixelRatio) + 0.5;
    var y = this.mViewport[Camera.eViewport.eOrgY] + ((p[1] - this.mRenderCache.mCameraOrgY) * this.mRenderCache.mWCToPixelRatio) + 0.5;
    var z = this.fakeZInPixelSpace(p[2]);
    return vec3.fromValues(x, y, z);
};

Camera.prototype.wcSizeToPixel = function (s) {  // 
    return (s * this.mRenderCache.mWCToPixelRatio) + 0.5;
};
