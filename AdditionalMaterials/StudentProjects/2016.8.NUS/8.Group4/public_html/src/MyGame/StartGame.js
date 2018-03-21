/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, DyePack, Hero, Minion, Brain,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function StartGame() {
    this.kBg = "assets/bg.png";
    this.kGameBGSong = "assets/start.mp3";
    // The camera to view the scene
    this.mCamera = null;
    this.mBg = null;

    this.mMsg = null;
    this.mStart = null;
    this.mTitle = null;
    this.mGroup = null;
    this.mLine = null;

}
gEngine.Core.inheritPrototype(StartGame, Scene);

StartGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.loadAudio(this.kGameBGSong);
};

StartGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.AudioClips.unloadAudio(this.kGameBGSong);
};

StartGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 37.5),   // position of the camera
        100,                       // width of camera
        [0, 0, 640, 480]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

    var bgR = new SpriteRenderable(this.kBg);
    bgR.setElementPixelPositions(0, 512, 0, 512);
    bgR.getXform().setSize(150, 150);
    bgR.getXform().setPosition(50, 35);
    this.mBg = new GameObject(bgR);

    this.mMsg = new FontRenderable("Press C to View Control Information");
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.getXform().setPosition(20,20);
    this.mMsg.setTextHeight(3);
    
    this.mLine = new FontRenderable("-----------------------------------");
    this.mLine.setColor([1, 1, 1, 1]);
    this.mLine.getXform().setPosition(20,17.5);
    this.mLine.setTextHeight(3);    
    
    this.mStart = new FontRenderable("Press K to Start");
    this.mStart.setColor([1, 1, 1, 1]);
    this.mStart.getXform().setPosition(35, 15);
    this.mStart.setTextHeight(3);
    
    this.mTitle = new FontRenderable("First Blood");
    this.mTitle.setColor([1, 1, 1, 1]);
    this.mTitle.getXform().setPosition(25, 45);
    this.mTitle.setTextHeight(8);
    
    
    gEngine.AudioClips.playBackgroundAudio(this.kGameBGSong);
};

StartGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0, 1, 0, 1.0]); // clear to bright green

    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();

    // Step  C: Draw everything
    this.mBg.draw(this.mCamera);
    this.mMsg.draw(this.mCamera);
    this.mLine.draw(this.mCamera);
    this.mStart.draw(this.mCamera);
    this.mTitle.draw(this.mCamera);
    
};


StartGame.prototype.update = function () {
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.K)) {
        var nextLevel = new MyGame();  // load the next level
        gEngine.Core.startScene(nextLevel);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.C)) {
        var nextLevel = new ControlGame();  // load the next level
        gEngine.Core.startScene(nextLevel);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Z)) {
		if(gEngine.AudioClips.isBackgroundAudioPlaying())
			gEngine.AudioClips.stopBackgroundAudio();
		else
                        gEngine.AudioClips.playBackgroundAudio(this.kGameBGSong);
    }
     
};