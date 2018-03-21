/*
 * File: MyGameScene.js 
 * This is the logic of our game. 
 */

"use strict"; 

function MyGameScene() {
    this.mCamera = null;
    this.mRenderable = null;
    this.mGameObject = null;
	
	this.kTexture =  "assets/minion_portal.png";
	this.kGameBGSong = "assets/BGClip.mp3";
	this.kGameCueSound = "assets/BlueLevel_cue.wav";
}
gEngine.Core.inheritPrototype(MyGameScene, Scene);

MyGameScene.prototype.loadScene = function () {
	gEngine.Textures.loadTexture(this.kTexture);
	gEngine.AudioClips.loadAudio(this.kGameBGSong);
	gEngine.AudioClips.loadAudio(this.kGameCueSound);
};


MyGameScene.prototype.unloadScene = function () {
	// need to stop the audio in case it is playing
	gEngine.AudioClips.stopBackgroundAudio();
	
	gEngine.Textures.unloadTexture(this.kTexture);
	gEngine.AudioClips.unloadAudio(this.kGameBGSong);
	gEngine.AudioClips.unloadAudio(this.kGameCueSound);
};

MyGameScene.prototype.initialize  = function () {
    this.mCamera = new Camera(
        vec2.fromValues(50, 40),		// position of the camera
        100,                       // width of camera
        [0, 0, 500, 400]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);    // sets the background to gray
    
    // create a new "texture" renderable object
	this.mRenderable = new TextureRenderable(this.kTexture);
	
    this.mGameObject = new GameObject(this.mRenderable);
    this.mGameObject.getXform().setSize(16, 16);
    this.mGameObject.getXform().setPosition(30, 50);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGameScene.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
	
    this.mCamera.setupViewProjection();
    
    this.mGameObject.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGameScene.prototype.update = function () {
	if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
		this.mGameObject.getXform().incXPosBy(-0.5);
	}
        
	if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
		this.mGameObject.getXform().incXPosBy(0.5);
	}
     
	if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
		gEngine.GameLoop.stop();
	}
	
	if (gEngine.Input.isKeyClicked(gEngine.Input.keys.P)) {
		if(!gEngine.AudioClips.isBackgroundAudioPlaying())
			gEngine.AudioClips.playBackgroundAudio(this.kGameBGSong);
		else
			gEngine.AudioClips.stopBackgroundAudio();
	}
    
    if (gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)) {
		gEngine.AudioClips.playACue(this.kGameCueSound);
    }
};
