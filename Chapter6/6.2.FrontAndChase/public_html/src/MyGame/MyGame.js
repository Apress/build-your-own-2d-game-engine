/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, GameObjectSet: false, Camera: false, vec2: false,
  FontRenderable: false, DyePack: false, Hero: false, Minion: false, Brain: false,
  GameObject: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
    this.kMinionSprite = "assets/minion_sprite.png";
    // The camera to view the scene
    this.mCamera = null;

    // For echo message
    this.mMsg = null;

    // the hero and the support objects
    this.mHero = null;
    this.mBrain = null;

    // mode of running: 
    //   H: Player drive brain
    //   J: Dye drive brain, immediate orientation change
    //   K: Dye drive brain, gradual orientation change
    this.mMode = 'H';
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMinionSprite);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kMinionSprite);
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 37.5),   // position of the camera
        100,                       // width of camera
        [0, 0, 640, 480]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray

    // Create the brain  
    this.mBrain = new Brain(this.kMinionSprite);

    //  Create the hero object 
    this.mHero = new Hero(this.kMinionSprite);

    // For echoing
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
    this.mHero.draw(this.mCamera);
    this.mBrain.draw(this.mCamera);
    this.mMsg.draw(this.mCamera);
};

// The update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    var msg = "Brain modes [H:keys, J:immediate, K:gradual]: ";
    var rate = 1;

    this.mHero.update();

    switch (this.mMode) {
    case 'H':
        this.mBrain.update();  // player steers with arrow keys
        break;
    case 'K':
        rate = 0.02;    // graduate rate
        // When "K" is typed, the following should also be executed.
    case 'J':
        this.mBrain.rotateObjPointTo(this.mHero.getXform().getPosition(), rate);
        GameObject.prototype.update.call(this.mBrain);  // the default GameObject: only move forward
        break;
    }

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.H)) {
        this.mMode = 'H';
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.J)) {
        this.mMode = 'J';
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.K)) {
        this.mMode = 'K';
    }
    this.mMsg.setText(msg + this.mMode);
};