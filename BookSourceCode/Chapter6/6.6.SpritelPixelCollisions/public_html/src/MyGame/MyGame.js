/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, DyePack, Hero, Minion, Brain,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kMinionPortal = "assets/minion_portal.png";

    // The camera to view the scene
    this.mCamera = null;

    this.mMsg = null;

    // the hero and the support objects
    this.mHero = null;
    this.mBrain = null;
    this.mPortalHit = null;
    this.mHeroHit = null;

    this.mPortal = null;
    this.mLMinion = null;
    this.mRMinion = null;

    this.mCollide = null;
    this.mChoice = 'H';
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kMinionPortal);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kMinionSprite);
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

    this.mBrain = new Brain(this.kMinionSprite);

    // Step D: Create the hero object with texture from the lower-left corner 
    this.mHero = new Hero(this.kMinionSprite);

    this.mPortalHit = new DyePack(this.kMinionSprite);
    this.mPortalHit.setVisibility(false);
    this.mHeroHit = new DyePack(this.kMinionSprite);
    this.mHeroHit.setVisibility(false);

    this.mPortal = new TextureObject(this.kMinionPortal, 50, 30, 10, 10);

    this.mLMinion = new Minion(this.kMinionSprite, 30, 30);
    this.mRMinion = new Minion(this.kMinionSprite, 70, 30);

    this.mMsg = new FontRenderable("Status Message");
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(1, 2);
    this.mMsg.setTextHeight(3);

    this.mCollide = this.mHero;
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
    this.mPortal.draw(this.mCamera);
    this.mLMinion.draw(this.mCamera);
    this.mRMinion.draw(this.mCamera);
    this.mPortalHit.draw(this.mCamera);
    this.mHeroHit.draw(this.mCamera);
    this.mMsg.draw(this.mCamera);
};

// The update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    var msg = "L/R: Left or Right Minion; H: Dye; B: Brain]: ";

    this.mLMinion.update();
    this.mRMinion.update();

    this.mHero.update();

    this.mPortal.update(gEngine.Input.keys.Up, gEngine.Input.keys.Down,
        gEngine.Input.keys.Left, gEngine.Input.keys.Right, gEngine.Input.keys.P);

    var h = [];

    // Portal intersects with which ever is selected
    if (this.mPortal.pixelTouches(this.mCollide, h)) {
        this.mPortalHit.setVisibility(true);
        this.mPortalHit.getXform().setXPos(h[0]);
        this.mPortalHit.getXform().setYPos(h[1]);
    } else {
        this.mPortalHit.setVisibility(false);
    }

    // hero always collide with Brain (Brain chases hero)
    if (!this.mHero.pixelTouches(this.mBrain, h)) {
        this.mBrain.rotateObjPointTo(this.mHero.getXform().getPosition(), 0.05);
        GameObject.prototype.update.call(this.mBrain);
        this.mHeroHit.setVisibility(false);
    } else {
        this.mHeroHit.setVisibility(true);
        this.mHeroHit.getXform().setPosition(h[0], h[1]);
    }

    // decide which to collide
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.L)) {
        this.mCollide = this.mLMinion;
        this.mChoice = 'L';
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
        this.mCollide = this.mRMinion;
        this.mChoice = 'R';
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.B)) {
        this.mCollide = this.mBrain;
        this.mChoice = 'B';
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.H)) {
        this.mCollide = this.mHero;
        this.mChoice = 'H';
    }

    this.mMsg.setText(msg + this.mChoice);
};