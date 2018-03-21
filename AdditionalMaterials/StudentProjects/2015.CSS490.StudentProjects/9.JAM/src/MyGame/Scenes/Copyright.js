

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

function Copyright() {
    var canvas = document.getElementById('GLCanvas');
    this.kCanvasWidth = canvas.width;
    this.kCanvasHeight = canvas.height;

    this.mCamera = null;
    this.kCredits = "assets/CREDITS.png";
    this.kcpOne = "assets/Credit1.png";
    this.kcpTwo = "assets/Credit2.png";
    this.kcpThree = "assets/Credit3.png";
}
gEngine.Core.inheritPrototype(Copyright, Scene);

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */

Copyright.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kcpOne);
    gEngine.Textures.loadTexture(this.kcpTwo);
    gEngine.Textures.loadTexture(this.kcpThree);
    gEngine.Textures.loadTexture(this.kCredits);



};

Copyright.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kcpOne);
    gEngine.Textures.unloadTexture(this.kcpTwo);
    gEngine.Textures.unloadTexture(this.kcpThree);
    gEngine.Textures.unloadTexture(this.kCredits);

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

Copyright.prototype.initialize = function () {
    // Step A: Read in the camera
    this.mCamera = new Camera(
        vec2.fromValues(20, 110),   // position of the camera
        100,                        // width of camera
        [0, 0, this.kCanvasWidth, this.kCanvasHeight]
    );
    this.mCamera.setBackgroundColor([0.0, 0.0, 0.0, 1.0]);
    
    this.mCredits = new TextureRenderable(this.kCredits);
    this.mCredits = new GameObject(this.mCredits);
    this.mCredits.getXform().setSize(100, 50);
    this.mCredits.getXform().setPosition(20, 110);
    
    this.mCpOne = new TextureRenderable(this.kcpOne);
    this.mCpOne = new GameObject(this.mCpOne);
    this.mCpOne.getXform().setSize(93, 50);
    this.mCpOne.getXform().setPosition(20, 60);

    this.mCpTwo = new TextureRenderable(this.kcpTwo);
    this.mCpTwo = new GameObject(this.mCpTwo);
    this.mCpTwo.getXform().setSize(93, 50);
    this.mCpTwo.getXform().setPosition(20, 10);
    
    this.mCpThree = new TextureRenderable(this.kcpThree);
    this.mCpThree = new GameObject(this.mCpThree);
    this.mCpThree.getXform().setSize(100, 50);
    this.mCpThree.getXform().setPosition(20, -40);

    
};


Copyright.prototype.draw = function () {
    // Clear the entire canvas to light gray.
    gEngine.Core.clearCanvas([0.0, 0.0, 0.0, 1.0]);

    // Draw on all camera.
    this.drawCamera(this.mCamera);
};

Copyright.prototype.drawCamera = function (camera) {
    camera.setupViewProjection();

    this.mCpOne.draw(camera);
    this.mCpTwo.draw(camera);
    this.mCpThree.draw(camera);
    this.mCredits.draw(camera);
    
};

Copyright.prototype.update = function () {
    var delta = 0.1;
    
    
    var pos = this.mCamera.getWCCenter();
    
    if (pos[1] > -43 ){
        pos[1] = pos[1] - delta;
        this.mCamera.setWCCenter(pos[0], pos[1]);
    }
    
    

    

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        this.mNextScene = START_SCENE;
        gEngine.GameLoop.stop();
    }
};
