/*
 * File: GameOver.js 
 * The game over screen
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, Camera: false, vec2: false, FontRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function AboutUs() {
    this.mCamera = null;
    this.mMsg = null;
    this.mMsg1 = null;
    this.mMsg2 = null;
}
gEngine.Core.inheritPrototype(AboutUs, Scene);

AboutUs.prototype.unloadScene = function () {
     var nextLevel = new GameStart();  // next level to be loaded
    gEngine.Core.startScene(nextLevel);
};

AboutUs.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 33),   // position of the camera
        100,                       // width of camera
        [0, 0, 1280, 720]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([1, 1, 1, 1]);
            // sets the background to gray

    //<editor-fold desc="Create the fonts!">
    // this.mText = new FontRenderable("This is green text");
    this.mMsg = new FontRenderable("Group 8!Group name is Talk To Code");
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(8, 48);
    this.mMsg.setTextHeight(3);
    this.mMsg1 = new FontRenderable("Group members: Jiang Ruizhe Sun Shiyu  Hu Wenting.");
    this.mMsg1.setColor([0, 0, 0, 1]);
    this.mMsg1.getXform().setPosition(8, 38);
    this.mMsg1.setTextHeight(3);
    this.mMsg2 = new FontRenderable("Hope you like our game! Have fun!");
    this.mMsg2.setColor([0, 0, 0, 1]);
    this.mMsg2.getXform().setPosition(8, 28);
    this.mMsg2.setTextHeight(3);
    
    //</editor-fold>
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
AboutUs.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();
    this.mMsg.draw(this.mCamera);
    this.mMsg1.draw(this.mCamera);
    this.mMsg2.draw(this.mCamera);
};

// The update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
AboutUs.prototype.update = function () {
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){
          /// var nextLevel = new GameStart();  // next level to be loaded
           gEngine.GameLoop.stop();
          // gEngine.Core.startScene(nextLevel);
        }
};