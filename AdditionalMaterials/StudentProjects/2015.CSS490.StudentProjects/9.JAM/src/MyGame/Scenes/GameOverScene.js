/*
 * File: BlueLevel.js
 * This is the logic of our game.
 * Yixuan Jin
 * CSS490C
 * MP3
 */
/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, MyGame: false, SceneFileParser: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function GameOverScene() {
    var canvas = document.getElementById('GLCanvas');
    this.kCanvasWidth = canvas.width;
    this.kCanvasHeight = canvas.height;

    this.kStarsBG = "assets/bg_blend.jpg";

    this.mCamera = null;

    this.kPressSpaceToContinue = "assets/PressSpaceToContinue.png";
    this.kYouLostLogo = "assets/gameoverlogo.png";
    this.kContinue = "assets/continue.png";
}
gEngine.Core.inheritPrototype(GameOverScene, Scene);

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

GameOverScene.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kYouLostLogo);
    gEngine.Textures.loadTexture(this.kStarsBG);
    gEngine.Textures.loadTexture(this.kPressSpaceToContinue);
    gEngine.Textures.loadTexture(this.kContinue);
};

GameOverScene.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kYouLostLogo);
    gEngine.Textures.unloadTexture(this.kStarsBG);
    gEngine.Textures.unloadTexture(this.kPressSpaceToContinue);
    gEngine.Textures.unloadTexture(this.kContinue);

    switch (this.mNextScene) {
        case GAME_SCENE:
            var nextLevel = new MyGame();
            break;
        case LOSE_SCENE:
            var nextLevel = new LoseScene();
            break;
        case WIN_SCENE:
            var nextLevel = new WinScene();
            break;
        case START_SCENE:
            var nextLevel = new StartScene();
            break;
        case GAMEOVER_SCENE:
            var nextLevel = new GameOverScene();
            break;
    }
    gEngine.Core.startScene(nextLevel);
};

GameOverScene.prototype.initialize = function () {
    // Step A: Read in the camera
    this.mCamera = new Camera(
        vec2.fromValues(20, 60),   // position of the camera
        100,                        // width of camera
        [0, 0, this.kCanvasWidth, this.kCanvasHeight]
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1.0]);

    this.mBackground = new Background(this.kStarsBG, this.mCamera);

    /*
    this.kGameOverMsg = "Game over!";
    this.mGameOverMsg = new FontRenderable(this.kGameOverMsg);
    this.mGameOverMsg.setColor([1, 1, 1, 1]);
    this.mGameOverMsg.getXform().setPosition(-5, 40);
    this.mGameOverMsg.setTextHeight(10);
*/

    this.mYouLostLogoRender = new TextureRenderable(this.kYouLostLogo);
    this.mYouLostLogo = new GameObject(this.mYouLostLogoRender);
    this.mYouLostLogo.getXform().setSize(70, 30);
    this.mYouLostLogo.getXform().setPosition(20, 63);
    this.mYouLostLogo.setVisibility(false);

    this.mContinueRender = new TextureRenderable(this.kContinue);
    this.mContinue = new GameObject(this.mContinueRender);
    this.mContinue.getXform().setSize(70, 30);
    this.mContinue.getXform().setPosition(20, 80);

    this.mTimerCountMsg = new FontRenderable("20");
    this.mTimerCountMsg.setColor([1, 1, 1, 1]);
    this.mTimerCountMsg.getXform().setPosition(20, 60);
    this.mTimerCountMsg.setTextHeight(10);
    this.mTimerCountMsg.frameSkip = 0;
    this.mTimerCountMsg.countdownTimeLeft = 20;

    this.mPressSpaceToContinueRender = new TextureRenderable(this.kPressSpaceToContinue);
    this.mPressSpaceToContinue = new GameObject(this.mPressSpaceToContinueRender);
    this.mPressSpaceToContinue.getXform().setSize(60, 10);
    this.mPressSpaceToContinue.getXform().setPosition(20, 40);
    this.mPressSpaceToContinue.visibilityCount = 0;
};


GameOverScene.prototype.draw = function () {
    // Clear the entire canvas to light gray.
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);

    // Draw on all camera.
    this.drawCamera(this.mCamera);
};

GameOverScene.prototype.drawCamera = function (camera) {
    camera.setupViewProjection();

    this.mBackground.draw(camera);
    this.mYouLostLogo.draw(camera);

    if (this.mTimerCountMsg.countdownTimeLeft > 0) {
        this.mTimerCountMsg.draw(camera);
    }

    this.mPressSpaceToContinue.draw(camera);
    this.mContinue.draw(camera);
};

GameOverScene.prototype.update = function () {

    this.mBackground.update(this.mCamera);

    if(this.mTimerCountMsg.frameSkip > 60)
    {
        this.mTimerCountMsg.frameSkip = 0;
        this.mTimerCountMsg.countdownTimeLeft--;
        this.mTimerCountMsg.mText = this.mTimerCountMsg.countdownTimeLeft.toString();
    }
    this.mTimerCountMsg.frameSkip++;

    // If countdown is 0, player gives up. Start the Start Scene.
    if (this.mTimerCountMsg.countdownTimeLeft <= 0) {
        this.mContinue.setVisibility(false);
        this.mPressSpaceToContinue.setVisibility(false);
     //   this.mTimerCountMsg.setVisibility(false);
        this.mYouLostLogo.setVisibility(true);
    }

    if(this.mTimerCountMsg.countdownTimeLeft > 0) {
        this.mPressSpaceToContinue.visibilityCount = (this.mPressSpaceToContinue.visibilityCount + 1) % 100;
        if (this.mPressSpaceToContinue.visibilityCount < 80) {
            this.mPressSpaceToContinue.setVisibility(true);
        }
        else
        {
            this.mPressSpaceToContinue.setVisibility(false);
        }
    }


    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {

        this.mNextScene = START_SCENE;
        gEngine.GameLoop.stop();
    }
};
