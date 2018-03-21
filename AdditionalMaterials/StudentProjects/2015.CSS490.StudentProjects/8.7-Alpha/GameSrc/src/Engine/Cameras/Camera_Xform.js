/* 
 * David Watson
 * CSS 490C
 * 2D Game Engine Design
 * File: Camera_Xform.js 
 * 
 * This file contains Camera methods for utilizing the render cache
 */


Camera.prototype.fakeZInPixelSpace = function (z) {
    return z * this.mRenderCache.mWCToPixelRatio;
};

Camera.prototype.wcPosToPixel = function (p) {  // p is a vec3, fake Z
    // Convert the position to pixel space
    var x = this.mViewport[Camera.eViewport.eOrgX] +
            ((p[0] - this.mRenderCache.mCameraOrgX) *
                    this.mRenderCache.mWCToPixelRatio) + 0.5;
    var y = this.mViewport[Camera.eViewport.eOrgY] +
            ((p[1] - this.mRenderCache.mCameraOrgY) *
                    this.mRenderCache.mWCToPixelRatio) + 0.5;
    var z = this.fakeZInPixelSpace(p[2]);
    return vec3.fromValues(x, y, z);
};

Camera.prototype.wcSizeToPixel = function (s) {
    return (s * this.mRenderCache.mWCToPixelRatio) + 0.5;
};

Camera.prototype.wcDirToPixel = function (d) {  // d is a vec3 direction in WC
    // Convert the position to pixel space
    var x = d[0] * this.mRenderCache.mWCToPixelRatio;
    var y = d[1] * this.mRenderCache.mWCToPixelRatio;
    var z = d[2];
    return vec3.fromValues(x, y, z);
};