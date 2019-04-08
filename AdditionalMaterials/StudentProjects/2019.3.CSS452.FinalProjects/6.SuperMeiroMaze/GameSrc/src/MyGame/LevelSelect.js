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
function LevelSelect() {
    this.kUIButton = "assets/UI/button.png";
    this.kBG = "assets/DyeAssets/bg.png";
    // The camera to view the scene
    this.mCamera = null;
    this.World1Button = null;
    this.World2Button = null;
    this.GoBackButton = null;
}
gEngine.Core.inheritPrototype(LevelSelect, Scene);


LevelSelect.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kUIButton);
    gEngine.Textures.loadTexture(this.kBG);
};

LevelSelect.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kUIButton);
    gEngine.Textures.unloadTexture(this.kBG);
    if(this.LevelSelect==="Level1"){
        gEngine.Core.startScene(new Level1());
    }
    else if(this.LevelSelect==="Level2"){
        gEngine.Core.startScene(new Level2());
    }
    else if(this.LevelSelect==="GoBack"){
        gEngine.Core.startScene(new MyGame());
    }
};

LevelSelect.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        200,                     // width of camera
        [0, 0, mScreenX, mScreenY]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    this.World1Button = new UIButton(this.kUIButton,this.World1Select,this,[650,450],[600,100],"World One",8,[1,1,1,1],[0,0,0,1]);
    this.World2Button = new UIButton(this.kUIButton,this.World2Select,this,[650,350],[750,100],"World Two",8,[1,1,1,1],[0,0,0,1]);
    this.GoBackButton = new UIButton(this.kUIButton,this.GoBackSelect,this,[650,250],[750,100],"Go Back",8,[1,1,1,1],[0,0,0,1]);
    this.mBg = new TextureRenderable(this.kBG);
    this.mBg.getXform().setSize(200,180);
    this.mBg.getXform().setPosition(50,20);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
LevelSelect.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    
    this.mCamera.setupViewProjection();
    this.World1Button.draw(this.mCamera);
    this.World2Button.draw(this.mCamera);
    this.GoBackButton.draw(this.mCamera);
    this.mBg.draw(this.mCamera);
};

LevelSelect.prototype.update = function () {
    this.World1Button.update();
    this.World2Button.update();
    this.GoBackButton.update();
};

LevelSelect.prototype.World1Select = function(){
    this.LevelSelect="Level1";
    gEngine.GameLoop.stop();
};

LevelSelect.prototype.World2Select = function(){
    this.LevelSelect="Level2";
    gEngine.GameLoop.stop();
};

LevelSelect.prototype.GoBackSelect= function(){
    this.LevelSelect="GoBack";
    gEngine.GameLoop.stop();
};