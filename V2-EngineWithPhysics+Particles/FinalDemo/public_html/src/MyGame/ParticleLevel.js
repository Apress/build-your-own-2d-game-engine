/*
 * File: ParticleLevel.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function ParticleLevel() {
    this.kUIButton = "assets/UI/button.png";
    
    // The camera to view the scene
    this.mCamera = null;
    this.LevelSelect = null;
    this.FireButton = null;
    this.SmokeButton = null;
    this.SnowButton = null;
    this.BackButton = null;
    this.UIText = null;
}
gEngine.Core.inheritPrototype(ParticleLevel, Scene);


ParticleLevel.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kUIButton);
};

ParticleLevel.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kUIButton);
    if(this.LevelSelect==="Fire"){
        gEngine.Core.startScene(new FireDemo());
    }
    else if(this.LevelSelect==="Smoke"){
        gEngine.Core.startScene(new SmokeDemo());
    }
    else if(this.LevelSelect==="Snow"){
        gEngine.Core.startScene(new SnowDemo());
    }
    else if(this.LevelSelect==="Back"){
        gEngine.Core.startScene(new MyGame());
    }
};

ParticleLevel.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        100,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    this.FireButton = new UIButton(this.kUIButton,this.fireSelect,this,[400,400],[450,100],"Fire Demo",8,[1,1,1,1],[0,0,0,1]);
    this.SmokeButton = new UIButton(this.kUIButton,this.smokeSelect,this,[400,300],[450,100],"Smoke Demo",8,[1,1,1,1],[0,0,0,1]);
    this.SnowButton = new UIButton(this.kUIButton,this.snowSelect,this,[400,200],[450,100],"Snow Demo",8,[1,1,1,1],[0,0,0,1]);
    this.BackButton = new UIButton(this.kUIButton,this.backSelect,this,[400,100],[450,100],"Go Back",8,[1,1,1,1],[0,0,0,1]);
    this.UIText = new UIText("Select Particle Demo",[400,600],8,1,0,[0,0,0,1]);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
ParticleLevel.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    
    this.mCamera.setupViewProjection();
    this.FireButton.draw(this.mCamera);
    this.SmokeButton.draw(this.mCamera);
    this.SnowButton.draw(this.mCamera);
    this.BackButton.draw(this.mCamera);
    this.UIText.draw(this.mCamera);
};

ParticleLevel.prototype.update = function () {
    this.FireButton.update();
    this.SmokeButton.update();
    this.SnowButton.update();
    this.BackButton.update();
};

ParticleLevel.prototype.fireSelect = function(){
    this.LevelSelect="Fire";
    gEngine.GameLoop.stop();
};

ParticleLevel.prototype.smokeSelect = function(){
    this.LevelSelect="Smoke";
    gEngine.GameLoop.stop();
};

ParticleLevel.prototype.snowSelect = function(){
    this.LevelSelect="Snow";
    gEngine.GameLoop.stop();
};

ParticleLevel.prototype.backSelect = function(){
    this.LevelSelect="Back";
    gEngine.GameLoop.stop();
};