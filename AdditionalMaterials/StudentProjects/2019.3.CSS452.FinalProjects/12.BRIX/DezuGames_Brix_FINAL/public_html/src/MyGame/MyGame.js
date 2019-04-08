/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var MenuSelection = {
        StartLevel: 0,
        SelectLevel: 1,
        ViewInstructions:2
    };
    
function MyGame() {
    this.kUIButton = "assets/UI/button.png";
    this.kLevelOneSceneFile = "assets/levels/one.xml";
    this.kLevelOneBgClip = "assets/sounds/BgMusic.mp3";
    this.kCue = "assets/sounds/BlueLevel_cue.wav";
    this.kBgImage = "assets/title_bg.png";
    
    this.mBg = null;
    // The camera to view the scene
    this.mCamera = null;
    this.mStartButton = null;
    this.mMsg = null;
    this.mInstructionButton = null;
    this.mChoice = 0;
}
gEngine.Core.inheritPrototype(MyGame, Scene);


MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kUIButton);
    gEngine.Textures.loadTexture(this.kBgImage);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kUIButton);
    gEngine.Textures.unloadTexture(this.kBgImage);
    var nextLevel= null;
    
    switch(this.mChoice) {
        case MenuSelection.StartLevel:
            nextLevel= new Level(this.kLevelOneSceneFile, this.kLevelOneBgClip,this.kCue);
            break;
        case MenuSelection.SelectLevel:
            nextLevel = new LevelSelector();
            break;
        case MenuSelection.ViewInstructions:
        default:
            nextLevel = new Instructions();
    }
    
    gEngine.Core.startScene(nextLevel);
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 37.5), // position of the camera
        100,                     // width of camera
        [0, 0, 1000, 750]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.5, 0.5, 1, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);

    this.mMsg = new UIText("Brix",[500,650],20,1,0,[1,1,1,1]);
    this.mStartButton = new UIButton(this.kUIButton,this.startLevel,this,[500,350],[300,100],"Start",8,[1,1,1,1],[0,0,0,1]);
    this.mSelectLevelButton = new UIButton(this.kUIButton,this.selectLevel,this,[500,250],[475,100],"Select Level",6,[1,1,1,1],[0,0,0,1]);
    this.mInstructionButton = new UIButton(this.kUIButton,this.viewInstructions,this,[500,150],[475,100],"Instructions",6,[1,1,1,1],[0,0,0,1]);
    
    this.mBg = new TextureRenderable(this.kBgImage);
     this.mBg.getXform().setSize(100, 100);
    this.mBg.getXform().setPosition(50, 40);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    this.mBg.draw(this.mCamera);
    this.mStartButton.draw(this.mCamera);
    this.mSelectLevelButton.draw(this.mCamera);
    this.mInstructionButton.draw(this.mCamera);
    this.mMsg.draw(this.mCamera);
};

MyGame.prototype.update = function () {
    this.mStartButton.update();
    this.mInstructionButton.update();
    this.mSelectLevelButton.update();
};

MyGame.prototype.startLevel = function(){
    this.mChoice = MenuSelection.StartLevel;
    gEngine.GameLoop.stop();
};

MyGame.prototype.selectLevel = function(){
    this.mChoice = MenuSelection.SelectLevel;
    gEngine.GameLoop.stop();
};

MyGame.prototype.viewInstructions = function(){
    this.mChoice = MenuSelection.ViewInstructions;
    gEngine.GameLoop.stop();
};