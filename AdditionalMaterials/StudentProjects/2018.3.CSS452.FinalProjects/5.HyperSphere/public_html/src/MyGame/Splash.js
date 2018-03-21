/*
* Splash.js
* 
*/

"use strict";

function Splash() {

	this.mStartButton = null;

	this.mTitle = null;

	this.mColorSelect = null;

	this.mLevelBackground = null;

	this.kBackground = "assets/SkyGrass.png";
	this.kStartButton = "assets/Button.png";

	this.mCamera = null;

	// Coordinate Systems (Copied from MyGame for simplicity, can change this)
    this.kWCWidth = 200;
    this.kViewportWidth = 1200;
    this.kViewportHeight = 600;
    this.kWCHeight = this.kViewportHeight * (this.kWCWidth / this.kViewportWidth);

    // Animate Ball roll onto screen

    // display ColorSelect after initial BallRoll

}
gEngine.Core.inheritPrototype(Splash, Scene);

Splash.prototype.loadScene = function(sceneParams) {
	// load the scene file
	// need to create this.kSceneFile; choose JSON or XML
	// gEngine.TextFileLoader.LoadTextFile(this.kScene, gEngine.TextFileLoader.eTextFileType.eTextFile); // if JSON
	// use XMLFile for XML

	// load Textures
	gEngine.Textures.loadTexture(this.kBackground); 
	gEngine.Textures.loadTexture(this.kStartButton);


};

Splash.prototype.unloadScene = function() {
	// unload the Scene File
	// same this.kSceneFile as in loadScene

	// unload Textures
	gEngine.Textures.unloadTexture(this.kBackground);
	gEngine.Textures.unloadTexture(this.kStartButton);
		// textures for each car color

	var nextLevel = new MyGame(this.mCarColor); // pass CarColor selection to MyGame
	gEngine.Core.startScene(nextLevel);
};

Splash.prototype.initialize = function() {
	this.mStartButton = new StartButton(this.kStartButton);

	this.mColorSelect = new ColorSelect();

	this.mLevelBackground = new LevelBackground(this.kBackground); // with parameter for the background Texture

	this.mCamera = new Camera( // camera setup copied from MyGame.js for simplicity, can change this
		[0, 0],		// position of the camera
		this.kWCWidth,		// width of camera
		[0, 0, this.kViewportWidth, this.kViewportHeight] 	// viewport (orgX, orgY, width, height)
	);

	this.mTitle = new FontRenderable("HyperSpheres");
	this.mTitle.setColor([0, 0, 0, 1]);
	this.mTitle.getXform().setPosition(-30, 30);
	this.mTitle.setTextHeight(8);

	gEngine.DefaultResources.setGlobalAmbientIntensity(3);

};

Splash.prototype.update = function() {

	if (gEngine.Input.isKeyPressed(gEngine.Input.keys.N)) { 
		// test code for scene switching
		gEngine.GameLoop.stop();
	}

	var mousePos = [this.mCamera.mouseWCX(), this.mCamera.mouseWCY()];

	this.mStartButton.update(mousePos);
};

Splash.prototype.draw = function() {

	gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

	this.mCamera.setupViewProjection(); // activate drawing camera

	// draw all SplashScreen GameObjects

	// draw LevelBackground
	this.mLevelBackground.draw(this.mCamera);

	this.mStartButton.draw(this.mCamera);

	this.mTitle.draw(this.mCamera);
};