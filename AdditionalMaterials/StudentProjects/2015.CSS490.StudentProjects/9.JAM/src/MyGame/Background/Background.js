/**
 * Created by Alanx on 11/29/15.
 */
/* File: Background.js
 *
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteAnimateRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Background(kTexture, aCamera) {
    this.mBackground = new LightRenderable(kTexture);
    GameObject.call(this, this.mBackground);

    // scale size to camera
    var wcHeight = aCamera.getWCHeight();       //float is giving an off height
    this.mWCWidth = aCamera.getWCWidth() * 2;       // looks slightly compressed widthwise use a slightly wider canvas
    this.getXform().setSize(this.mWCWidth, wcHeight);

    //set position relative to camera
    var c = aCamera.getWCCenter();
    // start position
    this.getXform().setXPos(c[0] + this.mWCWidth/2 - aCamera.getWCWidth()/2);
    this.getXform().setYPos(c[1]);
}
gEngine.Core.inheritPrototype(Background, GameObject);

Background.prototype.update = function (aCamera) {
    var camCenter = aCamera.getWCCenter();
    var camWidth = aCamera.getWCWidth();
    // if reaches end of texture set start to current camera position
    if (camCenter[0] > this.getXform().getXPos() + this.mWCWidth/2 - camWidth/2) {
        //this.mXPos =
        this.getXform().setXPos(camCenter[0] + this.mWCWidth/2 - camWidth/2);
    }
};