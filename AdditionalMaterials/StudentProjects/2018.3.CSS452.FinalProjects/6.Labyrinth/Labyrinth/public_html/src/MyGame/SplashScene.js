/*
 * File: LoseScene.js 
 * This is the logic of our game. 
 */
/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, MyGame: false, SceneFileParser, vec2: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function SplashScene() {
    this.kBackground = "assets/Textures/Splash.png";
    this.kBGAudio = "assets/audio/bgMusic.mp3";
    this.mCamera = null;
    this.mFade = null;
    this.mFadeLerp = null;
    this.mTimer = null;
}
gEngine.Core.inheritPrototype(SplashScene, Scene);

SplashScene.prototype.loadScene = function () {
   gEngine.Textures.loadTexture(this.kBackground);
   gEngine.AudioClips.loadAudio(this.kBGAudio);
};

SplashScene.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kBackground);
    gEngine.AudioClips.unloadAudio(this.kBGAudio);
    var nextLevel = new MyGame();  // load the next level
    gEngine.Core.startScene(nextLevel);
};

SplashScene.prototype.initialize = function () {
    this.mCamera = new Camera(
        vec2.fromValues(0, 0),  // position of the camera
        100,                      // width of camera
        [0, 0, 1600, 800],        // viewport (orgX, orgY, width, height)
         0
    );
    this.mBackground = new Background(this.kBackground);
    this.mBackground.getXform().setSize(100, 50);
    gEngine.AudioClips.playBackgroundAudio(this.kBGAudio);
    this.mFade = new Renderable();
    this.mFade.getXform().setPosition(0,0);
    this.mFade.getXform().setSize(100, 50);
    this.mFade.setColor([0,0,0,1]);
    
    this.mFadeLerp = new Interpolate(1, 120, .08);
    this.mFadeLerp.setFinalValue(0);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
SplashScene.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();
    this.mBackground.draw(this.mCamera);
    this.mFade.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
SplashScene.prototype.update = function () {

    this.mFadeLerp.updateInterpolation();
    var a = this.mFadeLerp.getValue();
    this.mFade.setColor([0,0,0,a]);
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Space))
    {
        this.mFadeLerp.setFinalValue(1);
    }
    if(a === 1)
    {
        gEngine.GameLoop.stop();
    }
};