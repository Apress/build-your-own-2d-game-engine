/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectSet, TextureObject, Camera, vec2,
  FontRenderable, DyePack, Hero, Minion, Brain,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kMinionCollector = "assets/minion_collector.png";
    this.kMinionPortal = "assets/minion_portal.png";
    // The camera to view the scene
    this.mCamera = null;

    this.mMsg = null;

    this.mCollector = null;
    this.mPortal = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kMinionCollector);
    gEngine.Textures.loadTexture(this.kMinionPortal);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kMinionCollector);
    gEngine.Textures.unloadTexture(this.kMinionPortal);
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 37.5), // position of the camera
        100,                       // width of camera
        [0, 0, 640, 480]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray

    this.mDyePack = new DyePack(this.kMinionSprite);
    this.mDyePack.setVisibility(false);

    this.mCollector = new TextureObject(this.kMinionCollector, 50, 30, 30, 30);
    this.mPortal = new TextureObject(this.kMinionPortal, 70, 30, 10, 10);

    this.mMsg = new FontRenderable("Status Message");
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(1, 2);
    this.mMsg.setTextHeight(3);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();

    // Step  C: Draw everything
    this.mCollector.draw(this.mCamera);
    this.mPortal.draw(this.mCamera);
    this.mDyePack.draw(this.mCamera);
    this.mMsg.draw(this.mCamera);
};

// The update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    var msg = "No Collision";

    this.mCollector.update(gEngine.Input.keys.W, gEngine.Input.keys.S,
        gEngine.Input.keys.A, gEngine.Input.keys.D);
    this.mPortal.update(gEngine.Input.keys.Up, gEngine.Input.keys.Down,
        gEngine.Input.keys.Left, gEngine.Input.keys.Right);

    var h = [];

    // Portal's resolution is 1/16 x 1/16 that of Collector!
    // if (this.mCollector.pixelTouches(this.mPortal, h)) {  // <-- VERY EXPENSIVE!!
    if (this.mPortal.pixelTouches(this.mCollector, h)) {
        msg = "Collided!: (" + h[0].toPrecision(4) + " " + h[1].toPrecision(4) + ")";
        this.mDyePack.setVisibility(true);
        this.mDyePack.getXform().setXPos(h[0]);
        this.mDyePack.getXform().setYPos(h[1]);
    } else {
        this.mDyePack.setVisibility(false);
    }
    this.mMsg.setText(msg);
};