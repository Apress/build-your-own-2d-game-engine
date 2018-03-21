/* 
 * File: Camera_Input.js
 * Defines the functions that supports mouse input coordinate transforms
 */

/*jslint node: true, vars: true, bitwise: true */
/*global gEngine, Camera, BoundingBox, vec2, CameraShake */
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict";


Camera.prototype.mouseDCX = function () {
    return gEngine.Input.getMousePosX() - this.mViewport[Camera.eViewport.eOrgX];
};
Camera.prototype.mouseDCY = function () {
    return gEngine.Input.getMousePosY() - this.mViewport[Camera.eViewport.eOrgY];
};

Camera.prototype.isMouseInViewport = function () {
    var dcX = this.mouseDCX();
    var dcY = this.mouseDCY();
    return ((dcX >= 0) && (dcX < this.mViewport[Camera.eViewport.eWidth]) &&
            (dcY >= 0) && (dcY < this.mViewport[Camera.eViewport.eHeight]));
};

Camera.prototype.mouseWCX = function () {
    var minWCX = this.getWCCenter()[0] - this.getWCWidth() / 2;
    return minWCX + (this.mouseDCX() * (this.getWCWidth() / this.mViewport[Camera.eViewport.eWidth]));
};

Camera.prototype.mouseWCY = function () {
    var minWCY = this.getWCCenter()[1] - this.getWCHeight() / 2;
    return minWCY + (this.mouseDCY() * (this.getWCHeight() / this.mViewport[Camera.eViewport.eHeight]));
};