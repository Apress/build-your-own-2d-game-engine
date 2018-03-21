/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */
/*jslint node: true, vars: true */
/*global gEngine: false, SimpleShader: false, Renderable: false, Camera: false, mat4: false, vec3: false, vec2: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
    // variables for the squares
    this.mWhiteSq = null;        // these are the Renderable objects
    this.mRedSq = null;

    // The camera to view the scene
    this.mCamera = null;
}

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(20, 60),   // position of the camera
        20,                        // width of camera
        [20, 40, 600, 300]         // viewport (orgX, orgY, width, height)
        );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray

    // Step  C: Create the Renderable objects:
    var constColorShader = gEngine.DefaultResources.getConstColorShader();
    this.mWhiteSq = new Renderable(constColorShader);
    this.mWhiteSq.setColor([1, 1, 1, 1]);
    this.mRedSq = new Renderable(constColorShader);
    this.mRedSq.setColor([1, 0, 0, 1]);

    // Step  D: Initialize the white Renderable object: centered, 5x5, rotated
    this.mWhiteSq.getXform().setPosition(20, 60);
    this.mWhiteSq.getXform().setRotationInRad(0.2); // In Radians
    this.mWhiteSq.getXform().setSize(5, 5);

    // Step  E: Initialize the red Renderable object: centered 2x2
    this.mRedSq.getXform().setPosition(20, 60);
    this.mRedSq.getXform().setSize(2, 2);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();

    // Step  C: Activate the white shader to draw
    this.mWhiteSq.draw(this.mCamera.getVPMatrix());

    // Step  D: Activate the red shader to draw
    this.mRedSq.draw(this.mCamera.getVPMatrix());
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    // For this very simple game, let's move the white square and pulse the red

    var whiteXform = this.mWhiteSq.getXform();
    var deltaX = 0.05;

    // Step A: test for white square movement
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        if (whiteXform.getXPos() > 30) { // this is the right-bound of the window
            whiteXform.setPosition(10, 60);
        }
        whiteXform.incXPosBy(deltaX);
    }

    // Step  B: test for white square rotation
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)) {
        whiteXform.incRotationByDegree(1);
    }

    var redXform = this.mRedSq.getXform();
    // Step  C: test for pulsing the red square
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
        if (redXform.getWidth() > 5) {
            redXform.setSize(2, 2);
        }
        redXform.incSizeBy(0.05);
    }
};