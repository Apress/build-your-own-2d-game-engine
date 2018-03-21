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

function MyGame() {
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kMinionPortal = "assets/minion_portal.png";
    this.kBg = "assets/bg.png";

    // The camera to view the scene
    this.mCamera = null;
    this.mHeroCam = null;
    this.mBrainCam = null;
    this.mBg = null;

    this.mMsg = null;

    // the hero and the support objects
    this.mHero = null;
    this.mBrain = null;
    this.mPortal = null;
    this.mLMinion = null;
    this.mRMinion = null;
    this.mFocusObj = null;

    this.mChoice = 'D';
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kMinionPortal);
    gEngine.Textures.loadTexture(this.kBg);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kMinionPortal);
    gEngine.Textures.unloadTexture(this.kBg);
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 36), // position of the camera
        100,                       // width of camera
        [0, 0, 640, 480]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray

    this.mHeroCam = new Camera(
        vec2.fromValues(50, 30),    // will be updated at each cycle to point to hero
        20,
        [490, 330, 150, 150],
        2                           // viewport bounds
    );
    this.mHeroCam.setBackgroundColor([0.5, 0.5, 0.5, 1]);
    this.mBrainCam = new Camera(
        vec2.fromValues(50, 30),    // will be updated at each cycle to point to the brain
        10,
        [0, 330, 150, 150],
        2                           // viewport bounds
    );
    this.mBrainCam.setBackgroundColor([1, 1, 1, 1]);
    this.mBrainCam.configInterpolation(0.7, 10);
    // Large background image
    var bgR = new SpriteRenderable(this.kBg);
    bgR.setElementPixelPositions(0, 1024, 0, 1024);
    bgR.getXform().setSize(150, 150);
    bgR.getXform().setPosition(50, 35);
    this.mBg = new GameObject(bgR);

    // Objects in the scene
    this.mBrain = new Brain(this.kMinionSprite);
    this.mHero = new Hero(this.kMinionSprite);
    this.mPortal = new TextureObject(this.kMinionPortal, 50, 30, 10, 10);
    this.mLMinion = new Minion(this.kMinionSprite, 30, 30);
    this.mRMinion = new Minion(this.kMinionSprite, 70, 30);
    this.mFocusObj = this.mHero;

    this.mMsg = new FontRenderable("Status Message");
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.getXform().setPosition(1, 2);
    this.mMsg.setTextHeight(3);
};


MyGame.prototype.drawCamera = function (camera) {
    camera.setupViewProjection();
    this.mBg.draw(camera);
    this.mHero.draw(camera);
    this.mBrain.draw(camera);
    this.mPortal.draw(camera);
    this.mLMinion.draw(camera);
    this.mRMinion.draw(camera);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Draw with all three cameras
    this.drawCamera(this.mCamera);
    this.mMsg.draw(this.mCamera);   // only draw status in the main camera
    this.drawCamera(this.mHeroCam);
    this.drawCamera(this.mBrainCam);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    var zoomDelta = 0.05;
    var msg = "L/R: Left or Right Minion; H: Dye; P: Portal]: ";

    this.mCamera.update();  // for smoother camera movements
    this.mHeroCam.update();
    this.mBrainCam.update();

    this.mLMinion.update();  // for sprite animation
    this.mRMinion.update();

    this.mHero.update();     // for WASD movement
    this.mPortal.update(     // for arrow movement
        gEngine.Input.keys.Up,
        gEngine.Input.keys.Down,
        gEngine.Input.keys.Left,
        gEngine.Input.keys.Right
    );

    // Brain chasing the hero
    var h = [];
    if (!this.mHero.pixelTouches(this.mBrain, h)) {
        this.mBrain.rotateObjPointTo(this.mHero.getXform().getPosition(), 0.01);
        GameObject.prototype.update.call(this.mBrain);
    }

    // Pan camera to object
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.L)) {
        this.mFocusObj = this.mLMinion;
        this.mChoice = 'L';
        this.mCamera.panTo(this.mLMinion.getXform().getXPos(), this.mLMinion.getXform().getYPos());
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
        this.mFocusObj = this.mRMinion;
        this.mChoice = 'R';
        this.mCamera.panTo(this.mRMinion.getXform().getXPos(), this.mRMinion.getXform().getYPos());
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.P)) {
        this.mFocusObj = this.mPortal;
        this.mChoice = 'P';
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.H)) {
        this.mFocusObj = this.mHero;
        this.mChoice = 'H';
    }

    // zoom
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.N)) {
        this.mCamera.zoomBy(1 - zoomDelta);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.M)) {
        this.mCamera.zoomBy(1 + zoomDelta);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.J)) {
        this.mCamera.zoomTowards(this.mFocusObj.getXform().getPosition(), 1 - zoomDelta);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.K)) {
        this.mCamera.zoomTowards(this.mFocusObj.getXform().getPosition(), 1 + zoomDelta);
    }

    // interaction with the WC bound
    this.mCamera.clampAtBoundary(this.mBrain.getXform(), 0.9);
    this.mCamera.clampAtBoundary(this.mPortal.getXform(), 0.8);
    this.mCamera.panWith(this.mHero.getXform(), 0.9);

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
        this.mCamera.shake(-2, -2, 20, 30);
    }

    // set the hero and brain cams    
    this.mHeroCam.panTo(this.mHero.getXform().getXPos(), this.mHero.getXform().getYPos());
    this.mBrainCam.panTo(this.mBrain.getXform().getXPos(), this.mBrain.getXform().getYPos());

    // Move the hero cam viewport just to show it is possible
    var v = this.mHeroCam.getViewport();
    v[0] += 1;
    if (v[0] > 500) {
        v[0] = 0;
    }
    this.mHeroCam.setViewport(v);

    this.mMsg.setText(msg + this.mChoice);
};