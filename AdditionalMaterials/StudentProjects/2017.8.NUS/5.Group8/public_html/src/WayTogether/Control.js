/*
 * File: GameOver.js 
 * The game over screen
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, Camera: false, vec2: false, FontRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Control() {
    this.mCamera = null;
    this.mMsg0 = null;
    this.mMsg1 = null;
    this.mMsg2 = null;
    this.mMsg3 = null;
    //this.mStatus = 0;   // how often to advance
}
gEngine.Core.inheritPrototype(Control, Scene);

Control.prototype.unloadScene = function () {
    var nextLevel = new GameStart();  // load the next level
    gEngine.Core.startScene(nextLevel);
};

Control.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(215, 42),   // position of the camera
        500,                       // width of camera
        [0, 0, 1280, 720]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([1, 1, 1, 1]);
            // sets the background to gray

    //<editor-fold desc="Create the fonts!">
    // this.mText = new FontRenderable("This is green text");
    this.mMsg0 = new FontRenderable("Use WAD to control the left hero and arrow key to control the right hero.");
    this.mMsg0.setColor([0, 0, 0, 1]);
    this.mMsg0.getXform().setPosition(0, 72);
    this.mMsg0.setTextHeight(10);
    this.mMsg1 = new FontRenderable("Level 1 : Jump up together!");
    this.mMsg1.setColor([0, 0, 0, 1]);
    this.mMsg1.getXform().setPosition(0, 60);
    this.mMsg1.setTextHeight(10);
    this.mMsg2 = new FontRenderable("Level 2 : Jump up and beware the fire come towards you !");
    this.mMsg2.setColor([0, 0, 0, 1]);
    this.mMsg2.getXform().setPosition(0, 48);
    this.mMsg2.setTextHeight(10);
    this.mMsg3 = new FontRenderable("Level 3 : Try to reach the traffic light so that you can win the game finally.");
    this.mMsg3.setColor([0, 0, 0, 1]);
    this.mMsg3.getXform().setPosition(0, 36);
    this.mMsg3.setTextHeight(10);
    
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
Control.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();
    this.mMsg0.draw(this.mCamera);
    this.mMsg1.draw(this.mCamera);
    this.mMsg2.draw(this.mCamera);
    this.mMsg3.draw(this.mCamera);
};

// The update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
Control.prototype.update = function () {
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){
           gEngine.GameLoop.stop();
        }
};