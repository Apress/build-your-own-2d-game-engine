/* File: 		IntroScreen.js
 * Author:      	Ryu Muthui
 * Last Date Modified: 	12/15/2015
 * Description:		Creates and initializes the Intro(Story) Screen */
"use strict";

function IntroScreen() {
    // The camera to view the scene
    this.mCamera = null;
    this.mMsg = null;
    this.mBG = null;
    this.kIntroScreen = "assets/Screens/INTRO_SCREEN.png";
    this.kIntroScreenBGM = "assets/Audio/Music/IntroScreen_BGM.mp3";
}
gEngine.Core.inheritPrototype(IntroScreen, Scene);

IntroScreen.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kIntroScreen);
    gEngine.AudioClips.loadAudio(this.kIntroScreenBGM);
};

IntroScreen.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kIntroScreen);
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.kIntroScreenBGM);
    var nextScreen = new ControlScreen("ControlScreen");
    gEngine.Core.startScene(nextScreen);
};

IntroScreen.prototype.initialize = function () {
    this.mCamera = new Camera(          // Set up the camera
        vec2.fromValues(500, 300),      // position of the camera
        1000,                           // width of camera
        [0, 0, 1000, 600]               // viewport (orgX, orgY, width, height)
    );   
    this.mCamera.setBackgroundColor([0.1, 0.1, 0.1, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(4); 

    var bgR = new SpriteRenderable(this.kIntroScreen);
    bgR.setElementPixelPositions(0, 1024, 0, 1024);
    bgR.getXform().setSize(1000, 600);
    bgR.getXform().setPosition(500, 300);
    this.mBG = new GameObject(bgR);

    this.mMsg = new FontRenderable("Intro Screen Message");
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.getXform().setPosition(600, 550);
    this.mMsg.setTextHeight(30);
    
    gEngine.AudioClips.playBackgroundAudio(this.kIntroScreenBGM);
};

IntroScreen.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.0, 0.0, 0.0, 1.0]); // clear to black
    this.mCamera.setupViewProjection();
    this.mBG.draw(this.mCamera);
    this.mMsg.setText("[Enter] to Continue");
    this.mMsg.draw(this.mCamera);
};

IntroScreen.prototype.update = function () {
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter)){ gEngine.GameLoop.stop();}
};