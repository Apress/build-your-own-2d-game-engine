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
"use strict";

/*
var WIN_SCENE = 0;
var LOSE_SCENE = 1;
var START_SCENE = 2;
var GAME_SCENE = 3;
*/
function WinScene() {
    var canvas = document.getElementById('GLCanvas');
    this.kCanvasWidth = canvas.width;
    this.kCanvasHeight = canvas.height;

    this.kYouWinLogo = "assets/youwin.png";
    this.kStarsBG = "assets/bg_blend.jpg";
    this.kStarsCelebrate = "assets/starSprite.png";
    this.kPressQ = "assets/PressQToPlayAgain.png";
    this.kChampionLogo = "assets/championyellow.png";

    this.mCamera = null;
    this.mGameOverMsg = null;
    this.mNextSceneCounter = 300;
}
gEngine.Core.inheritPrototype(WinScene, Scene);

WinScene.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kYouWinLogo);
    gEngine.Textures.loadTexture(this.kStarsBG);
    gEngine.Textures.loadTexture(this.kStarsCelebrate);
    gEngine.Textures.loadTexture(this.kPressQ);
    gEngine.Textures.loadTexture(this.kChampionLogo);
    this.mFinalScore = gEngine.ResourceMap.retrieveAsset(gGameScore);
};

WinScene.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kYouWinLogo);
    gEngine.Textures.unloadTexture(this.kStarsBG);
    gEngine.Textures.unloadTexture(this.kStarsCelebrate);
    gEngine.Textures.unloadTexture(this.kPressQ);
    gEngine.Textures.unloadTexture(this.kChampionLogo);

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
        case COPYRIGHT_SCENE:
            var nextLevel = new Copyright();
            break;
    }
    gEngine.Core.startScene(nextLevel);
};

WinScene.prototype.initialize = function () {
    // Step A: Read in the camera
    this.mCamera = new Camera(
        vec2.fromValues(20, 60),   // position of the camera
        100,                        // width of camera
        [0, 0, this.kCanvasWidth, this.kCanvasHeight]
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1.0]);

    this.mBackground = new Background(this.kStarsBG, this.mCamera);

    this.mYouWinLogoRender = new TextureRenderable(this.kChampionLogo);
   // this.mYouWinLogoRender = new TextureRenderable(this.kYouWinLogo);
    this.mYouWinLogo = new GameObject(this.mYouWinLogoRender);
    this.mYouWinLogo.getXform().setSize(80,45);
    this.mYouWinLogo.getXform().setPosition(20,73);

    this.mPressQLogoRender = new TextureRenderable(this.kPressQ);
    this.mPressQLogo = new GameObject(this.mPressQLogoRender);
    this.mPressQLogo.getXform().setSize(20,7);
    this.mPressQLogo.getXform().setPosition(57, 33);

    this.mYayStarRender = new SpriteAnimateRenderable(this.kStarsCelebrate);
    this.mYayStarRender.setSpriteSequence(420, 5, 430, 396, 19, 0);
    this.mYayStarRender.setAnimationSpeed(14);
    this.mYayStarRender.setAnimationType(0);
    this.mYayStar = new GameObject(this.mYayStarRender);
    this.mYayStar.getXform().setSize(20,20);
    this.mYayStar.getXform().setPosition(20,45);
    
    this.mScoreMsg = new FontRenderable("Score: " + (this.mFinalScore*10).toString());
    this.mScoreMsg.setColor([1, 1, 1, 1]);
    this.mScoreMsg.getXform().setPosition(-20, 45);
    this.mScoreMsg.setTextHeight(5);
};

WinScene.prototype.draw = function () {
    // Clear the entire canvas to light gray.
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);

    // Draw on all camera.
    this.drawCamera(this.mCamera);
};

WinScene.prototype.drawCamera = function (camera) {
    camera.setupViewProjection();

    this.mBackground.draw(camera);
    this.mYayStar.draw(camera);
    this.mYouWinLogo.draw(camera);
    this.mPressQLogo.draw(camera);
    this.mScoreMsg.draw(camera);
};

WinScene.prototype.update = function () {
    this.mPressQLogo.update(this.mCamera);
    this.mBackground.update(this.mCamera);
    this.mYayStar.mRenderComponent.updateAnimation();
    this.mNextSceneCounter --;

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
        this.mNextScene = START_SCENE;
        gEngine.GameLoop.stop();
    }

    
    if(this.mNextSceneCounter === 0){
        this.mNextScene = COPYRIGHT_SCENE;
        gEngine.GameLoop.stop();
    }


};
