/* 
 * File: Camera.js
 * Encapsulates the user define WC and Viewport functionality
 */

/*jslint node: true, vars: true, bitwise: true */
/*global gEngine, SimpleShader, Renderable, mat4, vec2, vec3, BoundingBox, CameraState */
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict";

// wcCenter: is a vec2
// wcWidth: is the width of the user defined WC
//      Height of the user defined WC is implicitly defined by the viewport aspect ratio
//      Please refer to the following
// viewportRect: an array of 4 elements
//      [0] [1]: (x,y) position of lower left corner on the canvas (in pixel)
//      [2]: width of viewport
//      [3]: height of viewport
//      
//  wcHeight = wcWidth * viewport[3]/viewport[2]
//
function Camera(wcCenter, wcWidth, viewportArray, bound) {
    // WC and viewport position and size
    this.mCameraState = new CameraState(wcCenter, wcWidth);
    this.mCameraShake = null;

    this.mViewport = [];  // [x, y, width, height]
    this.mViewportBound = 0;
    if (bound !== undefined) {
        this.mViewportBound = bound;
    }
    this.mScissorBound = [];  // use for bounds
    this.setViewport(viewportArray, this.mViewportBound);
    this.mNearPlane = 0;
    this.mFarPlane = 1000;

    // transformation matrices
    this.mViewMatrix = mat4.create();
    this.mProjMatrix = mat4.create();
    this.mVPMatrix = mat4.create();

    // background color
    this.mBgColor = [0.8, 0.8, 0.8, 1]; // RGB and Alpha
}

Camera.eViewport = Object.freeze({
    eOrgX: 0,
    eOrgY: 1,
    eWidth: 2,
    eHeight: 3
});

// <editor-fold desc="Public Methods">
// <editor-fold desc="Getter/Setter">
// <editor-fold desc="setter/getter of WC and viewport">
Camera.prototype.setWCCenter = function (xPos, yPos) {
    var p = vec2.fromValues(xPos, yPos);
    this.mCameraState.setCenter(p);
};
Camera.prototype.getWCCenter = function () { return this.mCameraState.getCenter(); };
Camera.prototype.setWCWidth = function (width) { this.mCameraState.setWidth(width); };
Camera.prototype.getWCWidth = function () { return this.mCameraState.getWidth(); };
Camera.prototype.getWCHeight = function () { return this.mCameraState.getWidth() * this.mViewport[Camera.eViewport.eHeight] / this.mViewport[Camera.eViewport.eWidth]; };
                                                                                                        // viewportH/viewportW

Camera.prototype.setViewport = function (viewportArray, bound) {
    if (bound === undefined) {
        bound = this.mViewportBound;
    }
    // [x, y, width, height]
    this.mViewport[0] = viewportArray[0] + bound;
    this.mViewport[1] = viewportArray[1] + bound;
    this.mViewport[2] = viewportArray[2] - (2 * bound);
    this.mViewport[3] = viewportArray[3] - (2 * bound);
    this.mScissorBound[0] = viewportArray[0];
    this.mScissorBound[1] = viewportArray[1];
    this.mScissorBound[2] = viewportArray[2];
    this.mScissorBound[3] = viewportArray[3];
};

Camera.prototype.getViewport = function () {
    var out = [];
    out[0] = this.mScissorBound[0];
    out[1] = this.mScissorBound[1];
    out[2] = this.mScissorBound[2];
    out[3] = this.mScissorBound[3];
    return out; 
};
//</editor-fold>

//<editor-fold desc="setter/getter of wc background color">
Camera.prototype.setBackgroundColor = function (newColor) { this.mBgColor = newColor; };
Camera.prototype.getBackgroundColor = function () { return this.mBgColor; };

// Getter for the View-Projection transform operator
Camera.prototype.getVPMatrix = function () {
    return this.mVPMatrix;
};
// </editor-fold>
// </editor-fold>

// Initializes the camera to begin drawing
Camera.prototype.setupViewProjection = function () {
    var gl = gEngine.Core.getGL();
    //<editor-fold desc="Step A: Set up and clear the Viewport">
    // Step A1: Set up the viewport: area on canvas to be drawn
    gl.viewport(this.mViewport[0],  // x position of bottom-left corner of the area to be drawn
                this.mViewport[1],  // y position of bottom-left corner of the area to be drawn
                this.mViewport[2],  // width of the area to be drawn
                this.mViewport[3]); // height of the area to be drawn
    // Step A2: set up the corresponding scissor area to limit the clear area
    gl.scissor(this.mScissorBound[0], // x position of bottom-left corner of the area to be drawn
               this.mScissorBound[1], // y position of bottom-left corner of the area to be drawn
               this.mScissorBound[2], // width of the area to be drawn
               this.mScissorBound[3]);// height of the area to be drawn
    // Step A3: set the color to be clear
    gl.clearColor(this.mBgColor[0], this.mBgColor[1], this.mBgColor[2], this.mBgColor[3]);  // set the color to be cleared
    // Step A4: enable the scissor area, clear, and then disable the scissor area
    gl.enable(gl.SCISSOR_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.disable(gl.SCISSOR_TEST);
    //</editor-fold>

    //<editor-fold desc="Step  B: Set up the View-Projection transform operator"> 
    // Step B1: define the view matrix
    var center = [];
    if (this.mCameraShake !== null) {
        center = this.mCameraShake.getCenter();
    } else {
        center = this.getWCCenter();
    }

    mat4.lookAt(this.mViewMatrix,
        [center[0], center[1], 10],   // WC center
        [center[0], center[1], 0],    // 
        [0, 1, 0]);     // orientation

    // Step B2: define the projection matrix
    var halfWCWidth = 0.5 * this.getWCWidth();
    var halfWCHeight = 0.5 * this.getWCHeight(); // 
    mat4.ortho(this.mProjMatrix,
        -halfWCWidth,   // distance to left of WC
         halfWCWidth,   // distance to right of WC
        -halfWCHeight,  // distance to bottom of WC
         halfWCHeight,  // distance to top of WC
         this.mNearPlane,   // z-distance to near plane 
         this.mFarPlane  // z-distance to far plane 
        );

    // Step B3: concatenate view and project matrices
    mat4.multiply(this.mVPMatrix, this.mProjMatrix, this.mViewMatrix);
    //</editor-fold>
};

Camera.prototype.collideWCBound = function (aXform, zone) {
    var bbox = new BoundingBox(aXform.getPosition(), aXform.getWidth(), aXform.getHeight());
    var w = zone * this.getWCWidth();
    var h = zone * this.getWCHeight();
    var cameraBound = new BoundingBox(this.getWCCenter(), w, h);
    return cameraBound.boundCollideStatus(bbox);
};

// prevents the xform from moving outside of the WC boundary.
// by clamping the aXfrom at the boundary of WC, 
Camera.prototype.clampAtBoundary = function (aXform, zone) {
    var status = this.collideWCBound(aXform, zone);
    if (status !== BoundingBox.eboundCollideStatus.eInside) {
        var pos = aXform.getPosition();
        if ((status & BoundingBox.eboundCollideStatus.eCollideTop) !== 0) {
            pos[1] = (this.getWCCenter())[1] + (zone * this.getWCHeight() / 2) - (aXform.getHeight() / 2);
        }
        if ((status & BoundingBox.eboundCollideStatus.eCollideBottom) !== 0) {
            pos[1] = (this.getWCCenter())[1] - (zone * this.getWCHeight() / 2) + (aXform.getHeight() / 2);
        }
        if ((status & BoundingBox.eboundCollideStatus.eCollideRight) !== 0) {
            pos[0] = (this.getWCCenter())[0] + (zone * this.getWCWidth() / 2) - (aXform.getWidth() / 2);
        }
        if ((status & BoundingBox.eboundCollideStatus.eCollideLeft) !== 0) {
            pos[0] = (this.getWCCenter())[0] - (zone * this.getWCWidth() / 2) + (aXform.getWidth() / 2);
        }
    }
    return status;
};
//</editor-fold>