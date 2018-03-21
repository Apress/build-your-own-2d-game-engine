/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectSet, TextureObject, Camera, vec2,
  FontRenderable,
  GameObject, Hero, Minion, Dye, Platform, */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kPlatformTexture = "assets/platform.png";
    
    this.kCollideColor = [1, 0, 0, 1];
    this.kNormalColor = [0, 1, 0, 1];

    // The camera to view the scene
    this.mCamera = null;

    this.mMsg = null;

    // the hero and the support objects
    this.mHero = null;
    this.mMinion = null;
    this.mPlatform = null;
    
    this.mSelectedObj = null;
    this.mCollidedObj = null;
    this.mAllObjects = new GameObjectSet();
    
    this.kPrompt = "[H:hero M:minion P:platform]: ";
    this.mEcho = "Hero";
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kPlatformTexture);
};

MyGame.prototype.unloadScene = function () {    
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kPlatformTexture);
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(100, 56.25), // position of the camera
        200,                         // width of camera
        [0, 0, 1280, 720]            // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray
    
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    // create a few objects ...
    var i, rx, ry, obj; 
    ry = Math.random() * 5 + 20;
    for (i = 0; i<4; i++) {
        rx = 20 + Math.random() * 80;
        obj = new Hero(this.kMinionSprite, rx, ry);
        this.mAllObjects.addToSet(obj);
        
        rx = rx + 20 + Math.random() * 80;
        obj = new Minion(this.kMinionSprite, rx, ry);
        this.mAllObjects.addToSet(obj);
        
        rx = 20 + Math.random() * 160;
        obj = new Platform(this.kPlatformTexture, rx, ry);
        this.mAllObjects.addToSet(obj);
        
        ry = ry + 20 + Math.random() * 10;
    }
    
    // 
    // the important objects
    this.mHero = new Hero(this.kMinionSprite, 20, 30);
    this.mAllObjects.addToSet(this.mHero);
    
    this.mMinion = new Minion(this.kMinionSprite, 50, 50);
    this.mAllObjects.addToSet(this.mMinion);
    
    this.mPlatform = new Platform(this.kPlatformTexture, 20, 30);
    this.mAllObjects.addToSet(this.mPlatform);
    
    
    this.mSelectedObj = this.mHero;
    this.mSelectedObj.setVisibility(false);
    
    this.mMsg = new FontRenderable(this.kPrompt);
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(1, 2);
    this.mMsg.setTextHeight(3);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    
    this.mAllObjects.draw(this.mCamera);
    this.mMsg.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    
    this.mCamera.update();  // to ensure proper interpolated movement effects
    this.mAllObjects.update();  // updates everything
 
    if (this.mCamera.isMouseInViewport()) {
        if (gEngine.Input.isButtonPressed(gEngine.Input.mouseButton.Left)) {
            var x = this.mCamera.mouseWCX();
            var y = this.mCamera.mouseWCY();
            this.mSelectedObj.getXform().setPosition(x, y);
        }
    }
    
    this._selectCharacter();
    this._detectCollision();
    
    this.mMsg.setText(this.kPrompt + this.mEcho);
};

MyGame.prototype._selectCharacter = function () {
    // select which character to work with
    this.mSelectedObj.setVisibility(true);
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.H)) {
        this.mSelectedObj = this.mHero;
        this.mEcho = "Hero";
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.M)) {
        this.mSelectedObj = this.mMinion;
        this.mEcho = "Minion";
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.P)) {
        this.mSelectedObj = this.mPlatform;
        this.mEcho = "Platform";
    }
    this.mSelectedObj.setVisibility(false);
};

MyGame.prototype._detectCollision = function () {
    
    var i, obj;
    this.mCollidedObj = null;
    var selectedRigidShape = this.mSelectedObj.getPhysicsComponent();
    for (i = 0; i<this.mAllObjects.size(); i++) {
        obj = this.mAllObjects.getObjectAt(i);
        if (obj !== this.mSelectedObj) {
            if (selectedRigidShape.collided(obj.getPhysicsComponent())) {
                this.mCollidedObj = obj;
                this.mCollidedObj.getPhysicsComponent().setColor(this.kCollideColor);
            } else {
                obj.getPhysicsComponent().setColor(this.kNormalColor);
            }
        }
    }
};