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
    this.mCamera = null;
    this.ParticleButton = null;
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
    if(this.LevelSelect==="Particle"){
        gEngine.Core.startScene(new ParticleLevel());
    }
    else if(this.LevelSelect==="Physics"){
        gEngine.Core.startScene(new RigidShapeDemo());
    }
    else if(this.LevelSelect==="UI"){
        gEngine.Core.startScene(new UIDemo());
    }
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        100,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    this.ParticleButton = new UIButton(this.kUIButton,this.particleSelect,this,[400,400],[600,100],"Particle Demos",8,[1,1,1,1],[0,0,0,1]);
    this.PhysicsButton = new UIButton(this.kUIButton,this.physicsSelect,this,[400,300],[500,100],"Physics Demo",8,[1,1,1,1],[0,0,0,1]);
    this.UIButton =  new UIButton(this.kUIButton,this.uiSelect,this,[400,200],[320,100],"UI Demo",8,[1,1,1,1],[0,0,0,1]);
    this.UIText = new UIText("Game Engine Tech Demo",[400,600],8,1,0,[0,0,0,1]);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    
    this.mCamera.setupViewProjection();
    this.ParticleButton.draw(this.mCamera);
    this.PhysicsButton.draw(this.mCamera);
    this.UIButton.draw(this.mCamera);
    this.UIText.draw(this.mCamera);
};

MyGame.prototype.update = function () {
    this.ParticleButton.update();
    this.PhysicsButton.update();
    this.UIButton.update();
};

MyGame.prototype.particleSelect = function(){
    this.LevelSelect="Particle";
    gEngine.GameLoop.stop();
};

MyGame.prototype.physicsSelect = function(){
    this.LevelSelect="Physics";
    gEngine.GameLoop.stop();
};

MyGame.prototype.uiSelect= function(){
    this.LevelSelect="UI";
    gEngine.GameLoop.stop();
};