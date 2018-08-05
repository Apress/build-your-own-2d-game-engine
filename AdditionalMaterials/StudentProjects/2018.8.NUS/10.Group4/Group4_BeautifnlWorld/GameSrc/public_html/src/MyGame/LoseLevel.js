/*
 * File: LoseLevel.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var offset = new Array();
var id = 0;
offset = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var nextL = 0;

function LoseLevel(num) {
    
    this.kBg = "assets/gameover-01.png";
    
    // The camera to view the scene
    this.mCamera = null;

    this.mMsg = null;
    
    this.nextL = num;
    
}

gEngine.Core.inheritPrototype(LoseLevel, Scene);


LoseLevel.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBg);
};

LoseLevel.prototype.unloadScene = function () {
    
    gEngine.Textures.unloadTexture(this.kBg);
    
    
    if(this.nextL === 2) {
        var nextLevel = new Level2();  // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    }else if(this.nextL === 3) {
        var nextLevel = new Level3();  // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    }else if(this.nextL === 0) {
        var nextLevel = new Level0();  // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    }else if(this.nextL === 4) {
        var nextLevel = new Level4();  // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    }
};

LoseLevel.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        100,                     // width of camera
        [0, 0, 720, 720]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    var bgR = new IllumRenderable(this.kBg,this.kBg);
        bgR.getXform().setSize(100, 100);
        bgR.getXform().setPosition(50, 40);
        bgR.getXform().setZPos(-1);
        
    this.mBg = new GameObject(bgR);
    
    //Message Information
    this.mMsg = new FontRenderable("Press L to start again");
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(50, 40);
    this.mMsg.setTextHeight(3);
//    this.mMsg.setText("Press L to start again");
//    this.mMsg.setColor([1, 0, 0, 1]);
//    this.mMsg.getXform().setPosition(50, 37);
//    this.mMsg.setTextHeight(3);
    
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
LoseLevel.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    
    this.mBg.draw(this.mCamera);
    
    
//    this.mMsg.draw(this.mCamera);   // only draw status in the main camera
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
LoseLevel.prototype.update = function () {

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.L)) {
        gEngine.GameLoop.stop();
    }
    
};