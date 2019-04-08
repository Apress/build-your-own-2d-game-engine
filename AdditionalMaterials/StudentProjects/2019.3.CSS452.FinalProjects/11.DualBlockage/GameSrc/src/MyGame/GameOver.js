/*
 * File: GameOver.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
 FontRenderable, SpriteRenderable, LineRenderable,
 GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function GameOver(s) {
    this.kUIButton = "assets/UI/button.png";
    

    // The camera to view the scene
    //this.puzzleBgColor = puzzleBgColor;
    this.mCamera = null;
    this.ParticleButton = null;
    this.PhysicsButton = null;
    this.UIButton = null;
    this.UIText = null;
    this.LevelSelect = null;
    
    this.mMsg = null;
    this.scoreText = null;
    this.score = s;
}
gEngine.Core.inheritPrototype(GameOver, Scene);

GameOver.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kUIButton);
};

GameOver.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kUIButton);
    if (this.LevelSelect === "Puzzle") {
        gEngine.Core.startScene(new MyGame());
    }
};

GameOver.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
            vec2.fromValues(50, 40), // position of the camera
            100, // width of camera
            [0, 0, 1500, 900]         // viewport (orgX, orgY, width, height)
            );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    this.mMsg = new FontRenderable("Game Over");
    this.mMsg.setColor([1, 0, 0, 1]);
    this.mMsg.setTextHeight(7);
    this.mMsg.getXform().setPosition(50 - (this.mMsg.getWidth()/2), 60);
    
    this.scoreText = new FontRenderable("Score: " + this.score);
    this.scoreText.setColor([1, 1, 1, 1]);
    this.scoreText.setTextHeight(4);
    this.scoreText.getXform().setPosition(50 - (this.scoreText.getWidth()/2), 50);


    this.ParticleButton = new UIButton(this.kUIButton, this.particleSelect, this, [750, 450], [600, 100], "Play Again", 4, [1, 1, 1, 1], [0, 0, 0, 1]);
    //this.PhysicsButton = new UIButton(this.kUIButton,this.physicsSelect,this,[400,300],[500,100],"Physics Demo",8,[1,1,1,1],[0,0,0,1]);
    //this.UIButton =  new UIButton(this.kUIButton,this.uiSelect,this,[400,200],[320,100],"UI Demo",8,[1,1,1,1],[0,0,0,1]);
    //this.UIText = new UIText("Game Engine Tech Demo",[400,600],8,1,0,[0,0,0,1]);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
GameOver.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    this.ParticleButton.draw(this.mCamera);
    
    this.mMsg.draw(this.mCamera);
    this.scoreText.draw(this.mCamera);
};

GameOver.prototype.update = function () {
    this.ParticleButton.update();
};

GameOver.prototype.particleSelect = function () {
    this.LevelSelect = "Puzzle";
    gEngine.GameLoop.stop();
};

GameOver.prototype.physicsSelect = function () {
    this.LevelSelect = "Physics";
    gEngine.GameLoop.stop();
};

GameOver.prototype.uiSelect = function () {
    this.LevelSelect = "UI";
    gEngine.GameLoop.stop();
};