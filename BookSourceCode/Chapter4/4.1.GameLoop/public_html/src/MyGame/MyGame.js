/*
 * File: MyGame.js 
 * This is the logic of our game. For now, this is very simple.
 */
/*jslint node: true, vars: true */
/*global gEngine: false, SimpleShader: false, Renderable: false, Camera: false, mat4: false, vec3: false, vec2: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame(htmlCanvasID) {
    // variables of the constant color shader
    this.mConstColorShader = null;

    // variables for the squares
    this.mWhiteSq = null;        // these are the Renderable objects
    this.mRedSq = null;

    // The camera to view the scene
    this.mCamera = null;

    // Initialize the webGL Context
    gEngine.Core.initializeWebGL(htmlCanvasID);

    // Initialize the game
    this.initialize();
}

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(20, 60),   // position of the camera
        20,                        // width of camera
        [20, 40, 600, 300]);       // viewport (orgX, orgY, width, height)

    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to dark gray

    // Step  B: create the shader
    this.mConstColorShader = new SimpleShader(
        "src/GLSLShaders/SimpleVS.glsl",      // Path to the VertexShader 
        "src/GLSLShaders/SimpleFS.glsl");    // Path to the Simple FragmentShader    

    // Step  C: Create the Renderable objects:
    this.mWhiteSq = new Renderable(this.mConstColorShader);
    this.mWhiteSq.setColor([1, 1, 1, 1]);
    this.mRedSq = new Renderable(this.mConstColorShader);
    this.mRedSq.setColor([1, 0, 0, 1]);

    // Step  D: Initialize the white Renderable object: centered, 5x5, rotated
    this.mWhiteSq.getXform().setPosition(20, 60);
    this.mWhiteSq.getXform().setRotationInRad(0.2); // In Radians
    this.mWhiteSq.getXform().setSize(5, 5);

    // Step  E: Initialize the red Renderable object: centered 2x2
    this.mRedSq.getXform().setPosition(20, 60);
    this.mRedSq.getXform().setSize(2, 2);

    // Step F: Start the game loop running
    gEngine.GameLoop.start(this);
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

    // Step A: move the white square
    var whiteXform = this.mWhiteSq.getXform();
    var deltaX = 0.05;
    if (whiteXform.getXPos() > 30) // this is the right-bound of the window
        whiteXform.setPosition(10, 60);
    whiteXform.incXPosBy(deltaX);
    whiteXform.incRotationByDegree(1);

    // Step B: pulse the red square
    var redXform = this.mRedSq.getXform();
    if (redXform.getWidth() > 5)
        redXform.setSize(2, 2);
    redXform.incSizeBy(0.05);
};