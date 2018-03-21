/*
 * File: FishingAdventure.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/* find out more about jslint: http://www.jslint.com/help.html */

/* global Scene, gEngine, vec2 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function FishingAdventure() {
    // The camera to view the scene
    this.mCamera = null;
    this.mMsg = null;
}
gEngine.Core.inheritPrototype(FishingAdventure, Scene);


FishingAdventure.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 50), // position of the camera
        100,                        // width of camera
        [0, 0, 1280, 960],         // viewport (orgX, orgY, width, height)
        2
    );
    
    this.mCamera.setBackgroundColor([0.9, 0.9, 0.9, 1]);

    this.mMsg = new FontRenderable("This is splash screen");
    this.mMsg.setColor([1, 0, 0, 1]);
    this.mMsg.getXform().setPosition(10, 50);
    this.mMsg.setTextHeight(5);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
FishingAdventure.prototype.draw = function () {
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
FishingAdventure.prototype.update = function () {
    // select which character to work with
    //if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){
    gEngine.GameLoop.stop();
    
};


FishingAdventure.prototype.unloadScene = function() {
    var nextLevel = new StartScreen("StartScreen");  // next level to be loaded
    gEngine.Core.startScene(nextLevel);
};