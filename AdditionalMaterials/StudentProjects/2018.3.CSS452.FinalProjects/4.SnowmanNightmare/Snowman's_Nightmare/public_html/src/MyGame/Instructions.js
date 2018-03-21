/*
 * File: StartScreen.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
  GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light, BlockManager, HelperFunctions */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Instructions() {
    this.kBG = "assets/instructions.png";
    this.BGWidth = 1024;
    this.initialLightLevel = 3.5;
    this.CameraCanvasWidth = HelperFunctions.Core.getCameraWidth();
    this.CameraCenter = HelperFunctions.Core.getCameraCenter();
    this.CanvasWidth = HelperFunctions.Core.getCanvasWidth();
    this.CanvasHeight = HelperFunctions.Core.getCanvasHeight();
    
    // The camera to view the scene
    this.mCamera = null;
    this.mStatusMsg = null;
  
    this.kStartAudio = "assets/sounds/start.wav";

    this.kStartScreneAudio = "assets/sounds/Magical_Winter_MP3.mp3";
    
    this.nextLevel = null;
}
gEngine.Core.inheritPrototype(Instructions, Scene);
  
Instructions.prototype.loadScene = function () {
    
    gEngine.AudioClips.loadAudio(this.kStartScreneAudio);
    gEngine.AudioClips.loadAudio(this.kStartAudio);
        gEngine.Textures.loadTexture(this.kBG);
};

Instructions.prototype.unloadScene = function () {
    gEngine.AudioClips.unloadAudio(this.kStartAudio);
    gEngine.AudioClips.stopBackgroundAudio();

    gEngine.LayerManager.cleanUp();
    gEngine.Textures.unloadTexture(this.kBG);
    
    var nextLevel = new MyGame();  // load the next level
    gEngine.Core.startScene(nextLevel);
};

Instructions.prototype.initialize = function () {
    this.mCamera = new Camera(
        vec2.fromValues(this.CameraCenter, this.CameraCenter),  // position of the camera
        this.CameraCanvasWidth,                                 // width of camera
        [0, 0, this.CanvasWidth, this.CanvasWidth]              // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.5, 1, 1, 1]);
    
    //intialize background
    var bgR = new LightRenderable(this.kBG);
    bgR.setElementPixelPositions(0, 1024, 0, 512);
    bgR.getXform().setSize(1300, 640);
    bgR.getXform().setPosition(635, 320);
    this.mBG = new GameObject(bgR);
    
    this.mStatusMsg = new FontRenderable("");
    this.mStatusMsg.setColor([0.9, 0.2, 0.3, 1]);
    this.mStatusMsg.getXform().setPosition(this.CanvasWidth / 2 - 90, 40);
    this.mStatusMsg.setTextHeight(24);
    this.mStatusMsg.setText("E: Easy       M: Medium       H: Hard");
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mStatusMsg);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eBackground, this.mBG);
    gEngine.DefaultResources.setGlobalAmbientIntensity(this.initialLightLevel);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
Instructions.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([1, 1, 1, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    gEngine.LayerManager.drawAllLayers(this.mCamera);
};

// The update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
Instructions.prototype.update = function () {
if (gEngine.Input.isKeyClicked(gEngine.Input.keys.E)) {
      
        HelperFunctions.Core.setDifficulty("easy");
        gEngine.AudioClips.playACue(this.kStartAudio);
        this.nextLevel = new MyGame(60);
        gEngine.GameLoop.stop();
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.M)) {
      
        HelperFunctions.Core.setDifficulty("medium");
        gEngine.AudioClips.playACue(this.kStartAudio);
        this.nextLevel = new MyGame(45);
        gEngine.GameLoop.stop();
    }
  
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.H)) {
      
        HelperFunctions.Core.setDifficulty("hard");
        gEngine.AudioClips.playACue(this.kStartAudio);
        this.nextLevel = new MyGame(30);
        gEngine.GameLoop.stop();
    }
};