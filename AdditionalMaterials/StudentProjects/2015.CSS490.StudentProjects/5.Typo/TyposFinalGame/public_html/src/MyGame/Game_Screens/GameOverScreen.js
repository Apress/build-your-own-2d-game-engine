/* File: 		CreditsScreen.js
 * Author:      	Ryu Muthui
 * Last Date Modified: 	12/15/2015
 * Description:		Creates and initializes the GameOver Screen */
"use strict";

function GameOverScreen(currentScene) {
    // The camera to view the scene
    this.mCamera = null;
    this.mMsg = null;
    this.mBG = null;
    this.kGameOverScreen = "assets/Screens/GAMEOVER_SCREEN.png";
    this.kGameOverSFX = "assets/Audio/SFX/SFX_GameOver.mp3";
    this.kGameOverBGM = "";
    this.mNextScreen = new currentScene;
}
gEngine.Core.inheritPrototype(GameOverScreen, Scene);

GameOverScreen.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kGameOverScreen);
    gEngine.AudioClips.loadAudio(this.kGameOverSFX);
};

GameOverScreen.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kGameOverScreen);
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.kGameOverSFX);
    gEngine.AudioClips.unloadAudio(this.kGameOverBGM);
    gEngine.Core.startScene(this.mNextScreen);
};

GameOverScreen.prototype.initialize = function () {
    this.mCamera = new Camera(          // Set up the camera
        vec2.fromValues(400, 300),      // position of the camera
        800,                            // width of camera
        [0, 0, 1000, 600]               // viewport (orgX, orgY, width, height)
    );   
    this.mCamera.setBackgroundColor([0.5, 0.5, 0.9, 1]);
    
    gEngine.DefaultResources.setGlobalAmbientIntensity(4); 
    
    var bgR = new SpriteRenderable(this.kGameOverScreen);
    bgR.setElementPixelPositions(0, 512, 0, 512);
    bgR.getXform().setSize(1000, 600);
    bgR.getXform().setPosition(500, 300);
    this.mBG = new GameObject(bgR);

    this.mMsg = new FontRenderable("GameOver Screen Message");
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(128, 128);
    this.mMsg.setTextHeight(30);
    
    // play game over clip
    gEngine.AudioClips.playACue(this.kGameOverSFX);
    
    if(this.mNextScreen instanceof MyGame){
        score = 0;
    }
    
};

GameOverScreen.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.0, 0.0, 0.0, 1.0]); // clear to black
    this.mCamera.setupViewProjection();
    this.mBG.draw(this.mCamera);
    this.mMsg.setText("[Enter] to Continue");
    this.mMsg.getXform().setPosition(128, 128);
    this.mMsg.draw(this.mCamera);
    
    this.mMsg.setText("[Esc] to Exit");
    this.mMsg.getXform().setPosition(128, 100);
    this.mMsg.draw(this.mCamera);
};

GameOverScreen.prototype.update = function () {
    // if Enter is pressed transition to game level
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter)){ 
        gEngine.GameLoop.stop();
    } else if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Escape)) {
        this.mNextScreen = new TitleScreen("TitleScreen");
        gEngine.GameLoop.stop();
    }
};
