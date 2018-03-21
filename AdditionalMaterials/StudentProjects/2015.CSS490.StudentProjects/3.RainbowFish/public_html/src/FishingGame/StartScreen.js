/*
 * @auth: Joey Guinasso
 * @file: StartScreen.js
 * @date: 11-27-15
 * @brief: Scene for when the player loads up the game
 */

/* global Scene, gEngine, vec2 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function StartScreen() {
    this.kBG = "assets/Titlescreen.png";
    this.kLoadMessage = "assets/Loading.png";
    this.mShowLoadMessage = false;
    
    // The camera to view the scene
    this.mCamera = null;
    this.mMsg = null;
    this.mBG = null;
    this.mLoadMessage = null;
}
gEngine.Core.inheritPrototype(StartScreen, Scene);

StartScreen.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBG);
    gEngine.Textures.loadTexture(this.kLoadMessage);
};

StartScreen.prototype.initialize = function () {
    gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1.0]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(1);
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        1024,                        // width of camera
        [0, 0, 960, 720],         // viewport (orgX, orgY, width, height)
        0
    );
    
    this.mCamera.setBackgroundColor([0.9, 0.9, 0.9, 1]);
    this.mBG = new TextureObject(this.kBG, 0, 0, 1024, 1024);
    this.mLoadMessage = new TextureObject(this.kLoadMessage, 0, -250, 512, 512);
    this.mCamera.setBackground(this.mBG);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
StartScreen.prototype.draw = function () {
    gEngine.Core.clearCanvas([1, 1, 1, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    this.mBG.draw(this.mCamera);
    if(!this.mShowLoadMessage) return;
    this.mLoadMessage.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
StartScreen.prototype.update = function () {
    // select which character to work with
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){
        this.mShowLoadMessage = true;
        this.draw();
        gEngine.GameLoop.stop();
    }
};

StartScreen.prototype.unloadScene = function() {
    var nextLevel = new FishingLevel("FishingLevel");  // next level to be loaded
    gEngine.Core.startScene(nextLevel);
};
