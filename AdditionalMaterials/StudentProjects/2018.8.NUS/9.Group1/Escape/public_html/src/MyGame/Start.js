/*
 * File: Start.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
  GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Start() {
    // The camera to view the scene
    this.kBack = "assets/start.png";
    this.kBGM = "assets/sounds/startscene.mp3";
    this.mCamera = null;
    this.mMsg = null;
    this.mBack = null;
    this.mRestart = false;
    this.mChoice = 0;
}
gEngine.Core.inheritPrototype(Start, Scene);

Start.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        1024,                        // width of camera
        [0, 0, 1024, 484],         // viewport (orgX, orgY, width, height)
        0
    );
    
    this.Light = createALight(
        0,          //type
        [-5,10,0],  //position
        [0,0,0],    //direction
        [1,1,1,0.5],  //color
        1500,         //far
        1500,          //near
        5,          //inner
        30,          //outer
        1,          //intensity
        0.5,
    );
    gEngine.AudioClips.playBackgroundAudio(this.kBGM);
    
    this.mBack = new LightRenderable(this.kBack);
    this.mBack.setColor([1, 1, 1, 0]);  // No tinting
    this.mBack.getXform().setPosition(0, 0);
    this.mBack.getXform().setSize(1024, 484);
    this.mBack.addLight(this.Light);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
Start.prototype.draw = function () {
    // Step A: clear the canvas
    //gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    this.mBack.draw(this.mCamera);
    
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
Start.prototype.update = function () {
    // select which character to work with
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){
        gEngine.GameLoop.stop();
    }


};

Start.prototype.unloadScene = function() {
    gEngine.Textures.unloadTexture(this.kBack);
        var mygame = new Help();
        gEngine.Core.startScene(mygame,true);
  
};

Start.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBack);
    gEngine.AudioClips.loadAudio(this.kBGM);
};
