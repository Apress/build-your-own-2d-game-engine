/*
 * File: LoseScene.js 
 * This is the logic of our game. 
 */
/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, MyGame: false, SceneFileParser, vec2: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function LoseScene() {
    this.kBackground = "assets/Textures/GameOver.png";
    this.kBGAudio = "assets/audio/loseScene.mp3";
    this.mCamera = null;
}
gEngine.Core.inheritPrototype(LoseScene, Scene);

LoseScene.prototype.loadScene = function () {
   gEngine.Textures.loadTexture(this.kBackground); 
   gEngine.AudioClips.loadAudio(this.kBGAudio);
};

LoseScene.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kBackground);
    gEngine.AudioClips.unloadAudio(this.kBGAudio);
    var nextLevel = new MyGame();  // load the next level
    gEngine.Core.startScene(nextLevel);
};

LoseScene.prototype.initialize = function () {
    this.mCamera = new Camera(
        vec2.fromValues(0, 0),  // position of the camera
        100,                      // width of camera
        [0, 0, 1600, 800],        // viewport (orgX, orgY, width, height)
         0
    );
    this.mBackground = new Background(this.kBackground);
    this.mBackground.getXform().setSize(100, 50);
    gEngine.AudioClips.playBackgroundAudio(this.kBGAudio);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
LoseScene.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();
    this.mBackground.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
LoseScene.prototype.update = function () {

    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Space))
    {
        gEngine.GameLoop.stop();
    }
    
};