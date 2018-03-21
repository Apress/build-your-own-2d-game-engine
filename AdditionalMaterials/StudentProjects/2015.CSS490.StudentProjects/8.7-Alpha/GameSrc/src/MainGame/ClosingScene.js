/*
 * Team 7-Alpha
 * CSS 490C
 * 2D Game Engine Design
 * File: ClosingScene.js 
 * 
 * This is the logic of our game. 
 * 
 */

/* global gEngine, vec2, Scene */

"use strict";

function ClosingScene(score, highScoreList) {
    this.kBg = "assets/stars.png";
    this.kInterfaceGraphics = "assets/interfaceGraphics1.png";
    
    this.kTopScores = 5;
    
    this.mPassedList = highScoreList || [0];
    this.mHighScoreList = [0, 0, 0, 0, 0];
    this.mGameScore = score;
    // The camera to view the scene
    this.mCamera = null;
    this.mMsg = null;
    this.mMsgTryAgain = null;
    this.mMsgScoreList = null;
    this.mHighScoreBackground = null;
    
    this.mGlobalLightSet = null;
    
    this.mBg = null;
    
    this.mDevs = null;
    
    this.kKeith = "Dev/sound: Keith McAfee";
    this.kJesse = "Art: Jesse Mauk";
    this.kKevin = "Art: Kevin Shively";
    this.kRaymond = "Art: Raymond Tien";
    this.kDavid = "Dev: David Watson";
    this.kGeorge = "Dev: George Urick";
    
    
}
gEngine.Core.inheritPrototype(ClosingScene, Scene);

ClosingScene.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kInterfaceGraphics);
};

ClosingScene.prototype.unloadScene = function () {
    gEngine.LayerManager.cleanUp();
    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kInterfaceGraphics);
    
    
    var nextLevel = new GameScene(this.mHighScoreList);  // the next level
    gEngine.Core.startScene(nextLevel);
};

ClosingScene.prototype.initialize = function () {
    
    this.mCamera = new Camera(
        vec2.fromValues(50, 50),    // position of the camera
        100,                        // width of camera
        [0, 0, 1280, 720]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0, 0, 0, 1]);
    
    if (this.mHighScoreList[0] < this.mPassedList[0]) {
        this.mHighScoreList = this.mPassedList;
    }
    this.mHighScoreList.push(this.mGameScore);
    //working comparator.
    function compareNumbers(a, b) {
        return (a - b);
    }
    
    
    this.mHighScoreList.sort(compareNumbers);
    this.mHighScoreList.reverse();
    this.mMsgScoreList = new GameObjectSet();
    
    this.mScoreBackground = new SpriteRenderable(this.kInterfaceGraphics);
    this.mScoreBackground.setElementPixelPositions(1368, 1676, (1024 - 600), (1024 - 0));
    this.mScoreBackground.getXform().setPosition(70, 45);
    this.mScoreBackground.getXform().setSize(20, 40);
    
    var i;
    var topScores = null;
    var gameObject = null;
    for (i = 0; i < this.kTopScores; i++) {
        topScores = new FontRenderable("Place "+ (i+1) + ": " + this.mHighScoreList[i]);
        topScores.setColor([1, 1, 1, 1]);
        topScores.getXform().setPosition(64, (53 - (i * 3)));
        topScores.setTextHeight(2);
        gameObject = new GameObject(topScores);
        this.mMsgScoreList.addToSet(gameObject);
    }
    this.mMsg = new FontRenderable("Final score: " + this.mGameScore);
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.getXform().setPosition(30, 70);
    this.mMsg.setTextHeight(2);
    
    this.mMsgTryAgain = new FontRenderable("Press 'Q' to try again!");
    this.mMsgTryAgain.setColor([1, 1, 1, 1]);
    this.mMsgTryAgain.getXform().setPosition(25, 65);
    this.mMsgTryAgain.setTextHeight(2);
    
    var developers = [this.kDavid, this.kGeorge, this.kKeith, this.kJesse, 
    this.kKevin, this.kRaymond];

    this.mDevs = new FontSet(developers,
                                2, 
                                [1,1,1,1], 
                                [2, 40]);
    
    
    // Step B: the lights
    //this._initializeLights();
    gEngine.DefaultResources.setGlobalAmbientIntensity(4);
    
    // Step C: the far Background
    var bgR = new LightRenderable(this.kBg);
    bgR.setElementPixelPositions(0, 1024, 0, 1024);
    bgR.getXform().setSize(30, 30);
    bgR.getXform().setPosition(0, 0);
    bgR.getXform().setZPos(-10);
    this.mBg = new ParallaxGameObject(bgR, 5, this.mCamera);
    this.mBg.setCurrentFrontDir([0, -1, 0]);
    this.mBg.setSpeed(0.1);
    
    // add to layer managers ...
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eBackground, this.mBg);
};

ClosingScene.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    this.mScoreBackground.draw(this.mCamera);
    gEngine.LayerManager.drawAllLayers(this.mCamera);
    this.mMsg.draw(this.mCamera);
    this.mMsgTryAgain.draw(this.mCamera);
    this.mMsgScoreList.draw(this.mCamera);
    this.mDevs.draw(this.mCamera);
    
};

ClosingScene.prototype.update = function () {
    this.mCamera.update();
    this.mBg.update();
    
    if (gEngine.Input.isKeyReleased(gEngine.Input.keys.Q)) {
        gEngine.GameLoop.stop();
    }
};