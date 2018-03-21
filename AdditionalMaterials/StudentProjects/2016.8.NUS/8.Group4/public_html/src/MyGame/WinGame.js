/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, DyePack, Hero, Minion, Brain,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function WinGame() {
    this.kBg = "assets/bg.png";

    // The camera to view the scene
    this.mCamera = null;
    this.mBg = null;

    this.mMsg = null;
    this.mTitle = null;
}
gEngine.Core.inheritPrototype(WinGame, Scene);

WinGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBg);
};

WinGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kBg);
};

WinGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 37.5),   // position of the camera
        100,                       // width of camera
        [0, 0, 640, 480]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

    var bgR = new SpriteRenderable(this.kBg);
    bgR.setElementPixelPositions(0, 512, 0, 512);
    bgR.getXform().setSize(150, 150);
    bgR.getXform().setPosition(50, 35);
    this.mBg = new GameObject(bgR);

    this.mMsg = new FontRenderable("Press K to Restart");
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.getXform().setPosition(35, 4);
    this.mMsg.setTextHeight(3);
    
    this.mTitle = new FontRenderable("You Win!");
    this.mTitle.setColor([1, 1, 1, 1]);
    this.mTitle.getXform().setPosition(35, 45);
    this.mTitle.setTextHeight(8);   
};

WinGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0, 1, 0, 1.0]); // clear to bright green

    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();

    // Step  C: Draw everything
    this.mBg.draw(this.mCamera);
    this.mMsg.draw(this.mCamera);
    this.mTitle.draw(this.mCamera);
};


WinGame.prototype.update = function () {
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.K)) {
        var nextLevel = new MyGame();  // load the next level
        gEngine.Core.startScene(nextLevel);
    }   
};