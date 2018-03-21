/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectSet, TextureObject, Camera, vec2,
  FontRenderable, ParticleGameObjectSet, ParticleEmitter
  GameObject, Hero, Minion, Dye, Platform, Wall, DyePack, Particle, coins, score, life, x, deltaX */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Loading() {
    this.kBg = "assets/loading.png";
    // The camera to view the scene
    this.mCamera = null;
}
gEngine.Core.inheritPrototype(Loading, Scene);

Loading.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBg);
};

Loading.prototype.unloadScene = function () {    
    gEngine.Textures.unloadTexture(this.kBg);
    if(choice===0)
    {
    var nextLevel = new MyGame(); 
    choice=1;
    }
    else if(choice===1)
    var nextLevel = new level();  // next level to be loaded
    else if(choice===2){
    var nextLevel = new level2(); 
    y=60;}
    else if(choice===3)
    var nextLevel = new level3();
    gEngine.Core.startScene(nextLevel);
};
var choice=1;//select

Loading.prototype.draw = function () {
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.kCue);
};


Loading.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 60), // position of the camera
        200,                         // width of camera
        [0, 0, 1280, 720]            // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.7, 0.7, 0.7, 1]);
    // sets the background to gray

    gEngine.DefaultResources.setGlobalAmbientIntensity(1);
    var bgR = new SpriteRenderable(this.kBg);
    bgR.setElementPixelPositions(0, 1024, 0, 512);
    bgR.getXform().setSize(220, 120);
    bgR.getXform().setPosition(50,60);
    this.mBg = new GameObject(bgR);
};


// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
Loading.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    
    this.mBg.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
Loading.prototype.update = function () {
     gEngine.GameLoop.stop();
};
