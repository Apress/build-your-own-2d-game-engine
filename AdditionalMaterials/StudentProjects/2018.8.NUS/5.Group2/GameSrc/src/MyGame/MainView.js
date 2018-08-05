/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MainView(camera) {
    // this.mCam = new Camera(
    //     vec2.fromValues(0, 0),  // position of the camera
    //     100,                      // width of camera
    //     [0, 0, 1200, 800],        // viewport (orgX, orgY, width, height)
    //     0
    // );
    // this.mCam.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    // this.mCam.configInterpolation(0.05, 120);
    this.mCam = camera;
}

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MainView.prototype.setup = function () {
    this.mCam.setupViewProjection();
};


// anything from this function!
MainView.prototype.update = function (targetObj) {
    var pos = targetObj.getXform().getPosition();
    this.mCam.setWCCenter(pos[0], pos[1]);
    this.mCam.update();
};

MainView.prototype.getCam = function () {
    return this.mCam;
};