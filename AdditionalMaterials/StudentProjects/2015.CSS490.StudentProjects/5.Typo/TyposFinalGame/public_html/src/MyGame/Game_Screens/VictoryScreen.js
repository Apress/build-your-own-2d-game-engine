/* File: 		VictoryScreen.js
 * Author:      	Ryu Muthui
 * Last Date Modified: 	12/15/2015
 * Description:		Creates and initializes the Victory Screen */
"use strict";

function VictoryScreen() {
    // The camera to view the scene
    this.mCamera = null;
    this.mMsg = null;
    this.mBG = null;
    this.mScore = null;
    this.kVictoryScreen = "assets/Screens/VICTORY_SCREEN.png";
    this.kVictoryScreenBGM = "assets/Audio/Music/VictoryScreen_BGM.mp3";
}
gEngine.Core.inheritPrototype(VictoryScreen, Scene);

VictoryScreen.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kVictoryScreen);
    gEngine.AudioClips.loadAudio(this.kVictoryScreenBGM);
};

VictoryScreen.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kVictoryScreen);
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.kVictoryScreenBGM);
    var nextScreen = new TitleScreen("TitleScreen");
    gEngine.Core.startScene(nextScreen);
};

VictoryScreen.prototype.initialize = function () {
    this.mCamera = new Camera(          // Set up the camera
        vec2.fromValues(500, 300),      // position of the camera
        1000,                           // width of camera
        [0, 0, 1000, 600]               // viewport (orgX, orgY, width, height)
    );   
    this.mCamera.setBackgroundColor([0.5, 0.5, 0.9, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(4); 

    var bgR = new SpriteRenderable(this.kVictoryScreen);
    bgR.setElementPixelPositions(0, 1024, 0, 1024);
    bgR.getXform().setSize(1000, 600);
    bgR.getXform().setPosition(500, 300);
    this.mBG = new GameObject(bgR);

    this.mMsg = new FontRenderable("Victory Screen Message");
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.getXform().setPosition(725, 40);
    this.mMsg.setTextHeight(30);
    
    this.mScore = new FontRenderable("Score: " + score);
    this.mScore.setColor([1.0, 1.0, 1.0, 1.0]);
    this.mScore.setTextHeight(60);
    this.mScore.getXform().setPosition(500, 300);
    score = 0;
    gEngine.AudioClips.playBackgroundAudio(this.kVictoryScreenBGM);
};

VictoryScreen.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.0, 0.0, 0.0, 1.0]);
    this.mCamera.setupViewProjection();
    this.mBG.draw(this.mCamera);
    this.mMsg.setText("[Enter] to Exit");
    this.mMsg.draw(this.mCamera);
    this.mScore.draw(this.mCamera);
};

VictoryScreen.prototype.update = function () {
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter)){ gEngine.GameLoop.stop();}
};