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

function StartScreen() {
    this.kBG = "assets/SplashScreen.png";
    this.BGWidth = 1024;
    this.initialLightLevel = 3.5;
    this.CameraCanvasWidth = HelperFunctions.Core.getCameraWidth();
    this.CameraCenter = HelperFunctions.Core.getCameraCenter();
    this.CanvasWidth = HelperFunctions.Core.getCanvasWidth();
    this.CanvasHeight = HelperFunctions.Core.getCanvasHeight();

    // The camera to view the scene
    this.mCamera = null;
    this.mInstructionsMsg = null;
    this.showInstructions = false;
    
    this.nextLevel = null;
  
    this.kStartAudio = "assets/sounds/start.wav";

    this.kStartScreneAudio = "assets/sounds/Magical_Winter_MP3.mp3";

}
gEngine.Core.inheritPrototype(StartScreen, Scene);

StartScreen.prototype.loadScene = function () {
  
    gEngine.AudioClips.loadAudio(this.kStartScreneAudio);
    gEngine.AudioClips.loadAudio(this.kStartAudio);

    gEngine.Textures.loadTexture(this.kBG);
  
};

StartScreen.prototype.unloadScene = function () {
  
    gEngine.AudioClips.unloadAudio(this.kStartAudio);
    gEngine.AudioClips.stopBackgroundAudio();
  
    gEngine.LayerManager.cleanUp();
    gEngine.Textures.unloadTexture(this.kBG);

    gEngine.Core.startScene(this.nextLevel);
};

StartScreen.prototype.initialize = function () {
  
    gEngine.AudioClips.playBackgroundAudio(this.kStartScreneAudio);

    this.mCamera = new Camera(
            vec2.fromValues(this.CameraCenter, this.CameraCenter), // position of the camera
            this.CameraCanvasWidth, // width of camera
            [0, 0, this.CanvasWidth, this.CanvasWidth]              // viewport (orgX, orgY, width, height)
            );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

    //intialize background
    var bgR = new LightRenderable(this.kBG);
    bgR.setElementPixelPositions(0, this.CameraCanvasWidth, 0, this.CameraCanvasWidth - 200);
    bgR.getXform().setSize(this.BGWidth, this.BGWidth);
    bgR.getXform().setPosition(this.CameraCenter, this.CameraCenter);
    this.mBG = new GameObject(bgR);

    this.mInstructionsMsg = new FontRenderable("");
    this.mInstructionsMsg.setColor([1, 1, 1, 1]);
    this.mInstructionsMsg.getXform().setPosition(250, 600);
    this.mInstructionsMsg.setTextHeight(32);
    this.mInstructionsMsg.setText("Press 'I' for Instructions");
    
    this.mStartMsg = new FontRenderable("Press one of the keys below to start");
    this.mStartMsg.setColor([1, 1, 1, 1]);
    this.mStartMsg.getXform().setPosition(120, 60);
    this.mStartMsg.setTextHeight(32);
    
    this.mDifficultyMsg = new FontRenderable("'E': Easy     'M': Medium     'H': Hard");
    this.mDifficultyMsg.setColor([1, 1, 1, 1]);
    this.mDifficultyMsg.getXform().setPosition(120, 30);
    this.mDifficultyMsg.setTextHeight(32);
    
    
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mInstructionsMsg);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mStartMsg);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mDifficultyMsg);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eBackground, this.mBG);
    
    gEngine.DefaultResources.setGlobalAmbientIntensity(this.initialLightLevel);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
StartScreen.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([1, 1, 1, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    gEngine.LayerManager.drawAllLayers(this.mCamera);
};

// The update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
StartScreen.prototype.update = function () {
  
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.E)) {
      
        HelperFunctions.Core.setDifficulty("easy");
        gEngine.AudioClips.playACue(this.kStartAudio);
        this.nextLevel = new MyGame();
        gEngine.GameLoop.stop();
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.M)) {
      
        HelperFunctions.Core.setDifficulty("medium");
        gEngine.AudioClips.playACue(this.kStartAudio);
        this.nextLevel = new MyGame();
        gEngine.GameLoop.stop();
    }
  
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.H)) {
      
        HelperFunctions.Core.setDifficulty("hard");
        gEngine.AudioClips.playACue(this.kStartAudio);
        this.nextLevel = new MyGame();
        gEngine.GameLoop.stop();
    }

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.I)) {
        this.nextLevel = new Instructions();
        gEngine.GameLoop.stop();
    }
};