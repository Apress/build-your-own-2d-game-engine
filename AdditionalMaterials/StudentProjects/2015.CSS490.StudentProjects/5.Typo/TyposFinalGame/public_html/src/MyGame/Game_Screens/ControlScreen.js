/* File: 		ControlScreen.js
 * Author:      	Ryu Muthui
 * Last Date Modified: 	12/15/2015
 * Description:		Creates and initializes the Control Screen */
"use strict";

function ControlScreen() {
    // The camera to view the scene
    this.mCamera = null;
    this.mMsg = null;
    this.mBG = null;
    this.kControlScreen = "assets/Screens/CONTROL_SCREEN.png";
    this.kControlScreenBGM = "assets/Audio/Music/ControlScreen_BGM.mp3";
}
gEngine.Core.inheritPrototype(ControlScreen, Scene);

ControlScreen.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kControlScreen);
    gEngine.AudioClips.loadAudio(this.kControlScreenBGM);
};

ControlScreen.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kControlScreen);
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.kControlScreenBGM);
    var nextScreen = new MyGame("MyGame");  // next screen to be loaded
    gEngine.Core.startScene(nextScreen);
};

ControlScreen.prototype.initialize = function () {
    this.mCamera = new Camera(          // Set up the camera
        vec2.fromValues(500, 300),      // position of the camera
        1000,                           // width of camera
        [0, 0, 1000, 600]               // viewport (orgX, orgY, width, height)
    );   
    this.mCamera.setBackgroundColor([0.1, 0.1, 0.1, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(4); 

    var bgR = new SpriteRenderable(this.kControlScreen);
    bgR.setElementPixelPositions(0, 1024, 0, 1024);
    bgR.getXform().setSize(1000, 600);
    bgR.getXform().setPosition(500, 300);
    this.mBG = new GameObject(bgR);

    this.mMsg = new FontRenderable("Intro Screen Message");
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.getXform().setPosition(600, 550);
    this.mMsg.setTextHeight(30);
    
    // play intro screen bgm
    gEngine.AudioClips.playBackgroundAudio(this.kControlScreenBGM);
};

ControlScreen.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.0, 0.0, 0.0, 1.0]); // clear to black
    this.mCamera.setupViewProjection();
    this.mBG.draw(this.mCamera);
    this.mMsg.setText("[Enter] to Start Game");
    this.mMsg.draw(this.mCamera);
};

ControlScreen.prototype.update = function () {
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter)){ gEngine.GameLoop.stop();}
};