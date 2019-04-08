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

function MyGame() {
    this.kUIButton = "assets/UI/button.png";
    

    // The camera to view the scene
    //this.puzzleBgColor = null;
    this.mCamera = null;
    this.easyButton = null;
    this.mediumButton = null;
    this.difficultButton = null;
    this.creditsButton = null;
    this.leftBlockInstructions = null;
    this.PhysicsButton = null;
    this.UIButton = null;
    this.UIText = null;
    this.LevelSelect = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kUIButton);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kUIButton);
    if (this.LevelSelect === "Puzzle") {
        gEngine.Core.startScene(new Puzzle);
    }
    else if(this.LevelSelect === "Credits"){
        
        gEngine.Core.startScene(new Credits);
        
    }
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
            vec2.fromValues(50, 40), // position of the camera
            100, // width of camera
            [0, 0, 1500, 900]         // viewport (orgX, orgY, width, height)
            );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);

    //function UIButton(buttonSprite, callback, context, position, size, text, textSize, textColor, clickTextColor) {
    this.easyButton = new UIButton(this.kUIButton, this.easySelect, this, [750, 650], [600, 100], "Easy", 4, [1, 1, 1, 1], [0, 0, 0, 1]);
    this.mediumButton = new UIButton(this.kUIButton, this.mediumSelect, this, [750, 550], [600, 100], "Medium", 4, [1, 1, 1, 1], [0, 0, 0, 1]);
    this.difficultButton = new UIButton(this.kUIButton, this.difficultSelect, this, [750, 450], [600, 100], "Difficult", 4, [1, 1, 1, 1], [0, 0, 0, 1]);
    this.creditsButton = new UIButton(this.kUIButton, this.creditsSelect, this, [750, 350], [600, 100], "Credits", 4, [1, 1, 1, 1], [0, 0, 0, 1]);

};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    this.easyButton.draw(this.mCamera);
    this.mediumButton.draw(this.mCamera);
    this.difficultButton.draw(this.mCamera);
    this.creditsButton.draw(this.mCamera);
    //this.leftBlockInstructions.draw(this.mCamera);

    
};

MyGame.prototype.update = function () {
    this.easyButton.update();
    this.mediumButton.update();
    this.difficultButton.update();
    this.creditsButton.update();
    //this.leftBlockInstructions.update();
};

MyGame.prototype.easySelect = function () {
    this.LevelSelect = "Puzzle";
    //this.puzzleBgColor = [0.5, 0.5, 0.4, 1];
    gEngine.GameLoop.updateSpeed(1.5);
    gEngine.GameLoop.stop();
};

MyGame.prototype.mediumSelect = function () {
    this.LevelSelect = "Puzzle";
    //this.puzzleBgColor = [0.7, 0.7, 0.4, 1];
    gEngine.GameLoop.updateSpeed(1);
    gEngine.GameLoop.stop();
};

MyGame.prototype.difficultSelect = function () {
    this.LevelSelect = "Puzzle";
    //this.puzzleBgColor = [0.9, 0.9, 0.6, 1];
    gEngine.GameLoop.updateSpeed(0.5);
    gEngine.GameLoop.stop();
};

MyGame.prototype.physicsSelect = function () {
    this.LevelSelect = "Physics";
    gEngine.GameLoop.stop();
};

MyGame.prototype.creditsSelect = function(){
    
   this.LevelSelect = "Credits";
   gEngine.GameLoop.stop();
    
};

MyGame.prototype.uiSelect = function () {
    this.LevelSelect = "UI";
    gEngine.GameLoop.stop();
};