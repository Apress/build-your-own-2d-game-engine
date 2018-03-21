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

function LoseScene() {
    var canvas = document.getElementById('GLCanvas');
    this.kCanvasWidth = canvas.width;
    this.kCanvasHeight = canvas.height;

    this.kStarsBG = "assets/bg_blend.jpg";

    this.kInsult0 = "assets/insult0.png";
    this.kInsult1 = "assets/insult1.png";
    this.kInsult2 = "assets/insult2.png";
    this.kInsult3 = "assets/insult3.png";
    this.kInsult4 = "assets/insult4.png";
    this.kInsult5 = "assets/insult5.png";
    this.mInsult = null;

    this.kYouDied = "assets/youdied.png";

    this.mCamera = null;
    this.mWaitTime = 420;
    this.mWaitCount = 0;

}
gEngine.Core.inheritPrototype(LoseScene, Scene);

LoseScene.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kStarsBG);
    gEngine.Textures.loadTexture(this.kYouDied);

    gEngine.Textures.loadTexture(this.kInsult0);
    gEngine.Textures.loadTexture(this.kInsult1);
    gEngine.Textures.loadTexture(this.kInsult2);
    gEngine.Textures.loadTexture(this.kInsult3);
    gEngine.Textures.loadTexture(this.kInsult4);
    gEngine.Textures.loadTexture(this.kInsult5);
    this.mFinalScore = gEngine.ResourceMap.retrieveAsset(gGameScore);

};

LoseScene.prototype.unloadScene = function () {

    gEngine.Textures.unloadTexture(this.kStarsBG);
    gEngine.Textures.unloadTexture(this.kYouDied);

    gEngine.Textures.unloadTexture(this.kInsult0);
    gEngine.Textures.unloadTexture(this.kInsult1);
    gEngine.Textures.unloadTexture(this.kInsult2);
    gEngine.Textures.unloadTexture(this.kInsult3);
    gEngine.Textures.unloadTexture(this.kInsult4);
    gEngine.Textures.unloadTexture(this.kInsult5);

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
            break
    }
    gEngine.Core.startScene(nextLevel);
};

LoseScene.prototype.initialize = function () {
    // Step A: Read in the camera
    this.mCamera = new Camera(
            vec2.fromValues(20, 60),   // position of the camera
            100,                        // width of camera
            [0, 0, this.kCanvasWidth, this.kCanvasHeight]
            );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1.0]);

    this.mBackground = new Background(this.kStarsBG, this.mCamera);

    this.mYouDiedRender = new TextureRenderable(this.kYouDied);
    this.mYouDied = new GameObject(this.mYouDiedRender);
    this.mYouDied.getXform().setSize(50,20);
    this.mYouDied.getXform().setPosition(20,80);

    this.selectRandomInsult();
    this.mInsultRender = new TextureRenderable(this.kInsult);
    this.mInsult = new GameObject(this.mInsultRender);
    this.mInsult.getXform().setSize(85,30);
    this.mInsult.getXform().setPosition(20, 53);
    
    this.mScoreMsg = new FontRenderable("Score: " + (this.mFinalScore*10).toString());
    this.mScoreMsg.setColor([1, 1, 1, 1]);
    this.mScoreMsg.getXform().setPosition(-20, 35);
    this.mScoreMsg.setTextHeight(5);


};


LoseScene.prototype.draw = function () {
    // Clear the entire canvas to light gray.
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);

    // Draw on all camera.
    this.drawCamera(this.mCamera);

};

LoseScene.prototype.drawCamera = function (camera) {
    camera.setupViewProjection();

    this.mBackground.draw(camera);
    this.mYouDied.draw(camera);
    this.mInsult.draw(camera);
    this.mScoreMsg.draw(camera);
};

LoseScene.prototype.update = function () {


    this.mBackground.update(this.mCamera);


    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.L)) {
        this.mNextScene = LOSE_SCENE;
        gEngine.GameLoop.stop();
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
        this.mNextScene = GAMEOVER_SCENE;
        gEngine.GameLoop.stop();
    }

    if (this.mWaitCount > this.mWaitTime)
    {
        this.mNextScene = GAMEOVER_SCENE;
        gEngine.GameLoop.stop();
    }
    this.mWaitCount++;



};

LoseScene.prototype.selectRandomInsult = function () {
    var random = getRandomIntInclusive(0,5);
    switch(random) {
        case 0:
            this.kInsult = this.kInsult0;
            break;
        case 1:
            this.kInsult = this.kInsult1;
            break;
        case 2:
            this.kInsult = this.kInsult2;
            break;
        case 3:
            this.kInsult = this.kInsult3;
            break;
        case 4:
            this.kInsult = this.kInsult4;
            break;
        case 5:
            this.kInsult = this.kInsult5;
            break;
    }
}

// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}