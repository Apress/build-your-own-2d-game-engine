/* File: 		TitleScreen.js
 * Author:      	Ryu Muthui
 * Last Date Modified: 	12/15/2015
 * Description:		Creates and initializes the Title Screen */
"use strict";

function TitleScreen() {
    // The camera to view the scene
    this.mCamera = null;
    this.mMsg = null;
    this.mBG = null;
    this.kTitleScreen = "assets/Screens/TITLE_SCREEN.png";
    this.kTitleScreenBGM = "assets/Audio/Music/TitleScreen_BGM.mp3";
    this.mNextScreen = null;
}
gEngine.Core.inheritPrototype(TitleScreen, Scene);

TitleScreen.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kTitleScreen);
    gEngine.AudioClips.loadAudio(this.kTitleScreenBGM);
};

TitleScreen.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kTitleScreen);
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.kTitleScreenBGM);
    gEngine.Core.startScene(this.mNextScreen);
};

TitleScreen.prototype.initialize = function () {
    
    this.mCamera = new Camera(          // Set up the camera
        vec2.fromValues(400, 300),      // position of the camera
        800,                            // width of camera
        [0, 0, 1000, 600]               // viewport (orgX, orgY, width, height)
    );
 
    this.mCamera.setBackgroundColor([1.0, 1.0, 1.0, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(4); 
    
    var bgR = new SpriteRenderable(this.kTitleScreen);
    bgR.setElementPixelPositions(0, 1024, 0, 1024);
    bgR.getXform().setSize(800, 600);
    bgR.getXform().setPosition(400, 300);
    this.mBG = new GameObject(bgR);

    this.mMsg = new FontRenderable("Start Screen Message");
    this.mMsg.setColor([0, 0, 1, 1]);
    this.mMsg.getXform().setPosition(128, 128);
    this.mMsg.setTextHeight(25);
    
    gEngine.AudioClips.playBackgroundAudio(this.kTitleScreenBGM);
};

TitleScreen.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.0, 0.0, 0.0, 1.0]);
    this.mCamera.setupViewProjection();
    this.mBG.draw(this.mCamera);
    this.mMsg.setText("[Enter] to Start Game");
    this.mMsg.getXform().setPosition(128, 120);
    this.mMsg.draw(this.mCamera);
    
    this.mMsg.setText("[C] for Credits");
    this.mMsg.getXform().setPosition(128, 95);
    this.mMsg.draw(this.mCamera);
};

TitleScreen.prototype.update = function () {
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter)){
        this.mNextScreen = new IntroScreen("IntroScreen");
        gEngine.GameLoop.stop();
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.C)){
        this.mNextScreen = new CreditsScreen("CreditsScreen");
        gEngine.GameLoop.stop();
    }
};