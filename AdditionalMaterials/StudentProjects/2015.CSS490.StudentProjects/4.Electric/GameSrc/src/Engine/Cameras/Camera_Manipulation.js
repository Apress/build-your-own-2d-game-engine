/* 
 * File: Camera_Manipulation.js
 * Defines the functions that supports camera manipulations
 */

/*jslint node: true, vars: true, bitwise: true */
/*global gEngine, Camera, BoundingBox, vec2, CameraShake */
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict";

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


Camera.prototype.clamp = function(xmin,xmax,ymin,ymax){
    
    var WCcenter = this.getWCCenter();
    //console.log(xmin);
//    if(WCcenter[0] < xmin){
//        WCcenter[0] = xmin;
//    }
//    if(WCcenter[0] > xmax){
//        WCcenter[0] = xmax;
//    }
    if(WCcenter[1] < ymin){
        WCcenter[1] = ymin;
    }
    if(WCcenter[1] > ymax){
        WCcenter[1] = ymax;
    }
};

Camera.prototype.clampToBackGround = function(bg){
    var bgXform = bg.getXform();
    //console.log(xmin);
    var bgTop = bgXform.getYPos() + bgXform.getHeight()/2;
    var bgLeft = bgXform.getXPos() - bgXform.getWidth()/2;
    var bgBot = bgXform.getYPos() - bgXform.getHeight()/2;
    var bgRight = bgXform.getXPos() + bgXform.getWidth()/2;
    
    var clampTop = bgTop - this.getWCHeight()/2;
    var clampLeft = bgLeft + this.getWCWidth()/2;
    var clampBot = bgBot + this.getWCHeight()/2;
    var clampRight = bgRight - this.getWCWidth()/2;

    this.clamp(clampLeft,clampRight,clampBot,clampTop);
};

Camera.prototype.panBy = function (dx, dy) {
    var newC = vec2.clone(this.getWCCenter());
    this.mWCCenter[0] += dx;
    this.mWCCenter[1] += dy;
    this.mCameraState.setCenter(newC);
};

// pan the camera to ensure aXform is within camera bounds
// this is complementary to the ClampAtBound: instead of clamping aXform, now, move the camera
Camera.prototype.panWith = function (aXform, zone) {
    var status = this.collideWCBound(aXform, zone);
    if (status !== BoundingBox.eboundCollideStatus.eInside) {
        var pos = aXform.getPosition();
        var newC = vec2.clone(this.getWCCenter());
//        if ((status & BoundingBox.eboundCollideStatus.eCollideTop) !== 0) {
//            newC[1] = pos[1] + (aXform.getHeight() / 2) - (zone * this.getWCHeight() / 2);
//        }
//        if ((status & BoundingBox.eboundCollideStatus.eCollideBottom) !== 0) {
//            newC[1] = pos[1] - (aXform.getHeight() / 2) + (zone * this.getWCHeight() / 2);
//        }
        if ((status & BoundingBox.eboundCollideStatus.eCollideRight) !== 0) {
            newC[0] = pos[0] + (aXform.getWidth() / 2) - (zone * this.getWCWidth() / 2);
        }
        if ((status & BoundingBox.eboundCollideStatus.eCollideLeft) !== 0) {
            newC[0] = pos[0] - (aXform.getWidth() / 2) + (zone * this.getWCWidth() / 2);
        }
        this.mCameraState.setCenter(newC);
    }
};


Camera.prototype.panTo = function (cx, cy) {
    this.setWCCenter(cx, cy);
};

// zoom with respect to the center
// zoom > 1 ==> zooming out, see more of the world
// zoom < 1 ==> zooming in, see less of the world, more detailed
// zoom < 0 is ignored
Camera.prototype.zoomBy = function (zoom) {
    if (zoom > 0) {
        this.setWCWidth(this.getWCWidth() * zoom);
    }
};

// zoom towards (pX, pY) by zoom: 
// zoom > 1 ==> zooming out, see more of the world
// zoom < 1 ==> zooming in, see less of the world, more detailed
// zoom < 0 is ignored
Camera.prototype.zoomTowards = function (pos, zoom) {
    var delta = [];
    var newC = [];
    vec2.sub(delta, pos, this.getWCCenter());
    vec2.scale(delta, delta, zoom - 1);
    vec2.sub(newC, this.getWCCenter(), delta);
    this.zoomBy(zoom);
    this.mCameraState.setCenter(newC);
};

Camera.prototype.configInterpolation = function (stiffness, duration) {
    this.mCameraState.configInterpolation(stiffness, duration);
};

Camera.prototype.shake = function (xDelta, yDelta, shakeFrequency, duration) {
    this.mCameraShake = new CameraShake(this.mCameraState, xDelta, yDelta, shakeFrequency, duration);
};