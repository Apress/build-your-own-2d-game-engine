/*
* WinLoss.js
* 
*/

"use strict";

function WinLoss(heroScore, enemyScore, hero, enemy) {

	this.kHeroScore = heroScore;
	this.kEnemyScore = enemyScore;

	this.mLevelBackground = null;

	this.kBackground = "assets/SkyGrass.png";
	this.kPlayAgain = "assets/ButtonRedPurp.png";
	this.kPodium = "assets/Podium.png";

	this.mPodium = null;

	this.mWinnerCar;
	this.mLoserCar;

	if (heroScore > enemyScore) {
		this.mWinnerCar = hero;
		this.mLoserCar = enemy;
	} else {
		this.mWinnerCar = enemy;
		this.mLoserCar = hero;
	}

	this.kWinnerTexture = this.mWinnerCar.getTexture();
	this.kLoserTexture = this.mLoserCar.getTexture();

	this.mConfetti = null; // particle system optional

	this.mResultText = null; // display winner, loser depending on results

	this.mScoreText = null; // display final score, and total time the match ran for

	this.mPlayAgain = null; // playAgain button

	this.mSpectators = null; // use the same SpriteAnimation from the cheering spectators in the stands, just zoomed more

	this.mCamera = null;

	// Coordinate Systems (Copied from MyGame for simplicity, can change this)
    this.kWCWidth = 200;
    this.kViewportWidth = 1200;
    this.kViewportHeight = 600;
    this.kWCHeight = this.kViewportHeight * (this.kWCWidth / this.kViewportWidth);

    // Play credits as a FontRenderable that moves from the top to bottom of the screen

}
gEngine.Core.inheritPrototype(WinLoss, Scene);

WinLoss.prototype.loadScene = function(sceneParams) {
	// load the Scene file

	// need to create the this.kSceneFile; choose between JSON and XML
	// gEngine.TextFileLoader.LoadTextFile(this.kSceneFile, gEngine.TextFileLoader.eTextFileType.eTextFile); // if XML

	// load Textures
	gEngine.Textures.loadTexture(this.kBackground);
	gEngine.Textures.loadTexture(this.kPlayAgain);
	gEngine.Textures.loadTexture(this.kPodium);
	gEngine.Textures.loadTexture(this.kWinnerTexture);
	gEngine.Textures.loadTexture(this.kLoserTexture);

};

WinLoss.prototype.unloadScene = function() {
	// unload the Scene file
	// same this.kSceneFile as in loadScene

	// unload Textures
	gEngine.Textures.unloadTexture(this.kBackground);
	gEngine.Textures.unloadTexture(this.kPlayAgain);
	gEngine.Textures.unloadTexture(this.kPodium);
	gEngine.Textures.unloadTexture(this.kWinnerTexture);
	gEngine.Textures.unloadTexture(this.kLoserTexture);

	var nextLevel = new Splash(); // load NextLevel, could pass HighScore as a param for this session
	gEngine.Core.startScene(nextLevel);

};

WinLoss.prototype.initialize = function() {
	this.mLevelBackground = new LevelBackground(this.kBackground);

	this.mCamera = new Camera( // camera setup copied from MyGame.js for simplicity, can change this
		[0, 0],		// position of the camera
		this.kWCWidth,		// width of camera
		[0, 0, this.kViewportWidth, this.kViewportHeight] 	// viewport (orgX, orgY, width, height)
	);

	this.mPlayAgain = new PlayAgain(this.kPlayAgain);

	if (this.kHeroScore > this.kEnemyScore) {
		this.mResultText = new FontRenderable("You Won!");
		// confetti?
	} else {
		this.mResultText = new FontRenderable("You Lose ...");
	}

	// set position of winner car
	this.mWinnerCar.getRenderable().getXform().setPosition(-40, 10);
	this.mWinnerCar.getRenderable().getXform().setSize(20, 20);
	this.mWinnerCar.getRenderable().getXform().setRotationInDegree(0);
	this.mWinnerCar.toggleDrawRigidShape();

	// set position of loser car
	this.mLoserCar.getRenderable().getXform().setPosition(-17, -12);
	this.mLoserCar.getRenderable().getXform().setSize(20, 20);
	this.mLoserCar.getRenderable().getXform().setRotationInDegree(0);
	this.mLoserCar.toggleDrawRigidShape();

	this.mResultText.setColor([0, 0, 0, 1]);
	this.mResultText.getXform().setPosition(-40, 40);
	this.mResultText.setTextHeight(7);

	// display Final Score Text
	this.mScoreText = new FontRenderable("Final Score: You (" + this.kHeroScore + ") vs. Opponent (" + this.kEnemyScore + ")");
	this.mScoreText.setColor([0, 0, 0, 1]);
	this.mScoreText.getXform().setPosition(-70, 30);
	this.mScoreText.setTextHeight(7);

	this.mPodium = new TextureRenderable(this.kPodium);
	this.mPodium.setColor([1, 1, 1, 0]);
	this.mPodium.getXform().setPosition(-20, -10);
	this.mPodium.getXform().setSize(160, 80);

};

WinLoss.prototype.update = function() {

	if (gEngine.Input.isKeyPressed(gEngine.Input.keys.N)) {
		// test code for switching scenes
		gEngine.GameLoop.stop();
	}

	var mousePos = [this.mCamera.mouseWCX(), this.mCamera.mouseWCY()];

	this.mPlayAgain.update(mousePos);
};

WinLoss.prototype.draw = function() {

	this.mCamera.setupViewProjection(); // activate drawing camera

	this.mLevelBackground.draw(this.mCamera);

	this.mPlayAgain.draw(this.mCamera);

	this.mScoreText.draw(this.mCamera);

	this.mResultText.draw(this.mCamera);

	this.mPodium.draw(this.mCamera);

	this.mWinnerCar.draw(this.mCamera);

	this.mLoserCar.draw(this.mCamera);
};