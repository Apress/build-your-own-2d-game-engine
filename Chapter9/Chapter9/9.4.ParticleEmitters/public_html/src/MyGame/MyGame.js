/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectSet, TextureObject, Camera, vec2,
  FontRenderable, ParticleGameObjectSet, ParticleEmitter
  GameObject, Hero, Minion, Dye, Platform, Wall, DyePack, Particle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kPlatformTexture = "assets/platform.png";
    this.kWallTexture = "assets/wall.png";
    this.kDyePackTexture = "assets/dye_pack.png";
    this.kParticleTexture = "assets/particle.png";
    this.kPrompt = "RigidBody Physics!";

    // The camera to view the scene
    this.mCamera = null;

    this.mMsg = null;

    // the hero and the support objects
    this.mHero = null;
    
    this.mCollidedObj = null;
    this.mAllPlatforms = new GameObjectSet();
    this.mAllMinions = new GameObjectSet();
    this.mAllDyePacks = new GameObjectSet();
    this.mAllParticles = new ParticleGameObjectSet();
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kPlatformTexture);
    gEngine.Textures.loadTexture(this.kWallTexture);
    gEngine.Textures.loadTexture(this.kDyePackTexture);
    gEngine.Textures.loadTexture(this.kParticleTexture);
};

MyGame.prototype.unloadScene = function () {    
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kPlatformTexture);
    gEngine.Textures.unloadTexture(this.kWallTexture);
    gEngine.Textures.unloadTexture(this.kDyePackTexture);
    gEngine.Textures.unloadTexture(this.kParticleTexture);
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(100, 56.25), // position of the camera
        200,                         // width of camera
        [0, 0, 1280, 720]            // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.7, 0.7, 0.7, 1]);
            // sets the background to gray
    
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    // create a few objects ...
    var i, j, rx, ry, obj, dy, dx;
    dx = 80;
    ry = Math.random() * 5 + 20;
    for (i = 0; i<4; i++) {
        rx = 20 + Math.random() * 160;
        obj = new Minion(this.kMinionSprite, rx, ry);
        this.mAllMinions.addToSet(obj);
        
        for (j=0; j<2; j++) {
            rx = 20 + (j*dx) + Math.random() * dx;
            dy = 10 * Math.random() - 5;
            obj = new Platform(this.kPlatformTexture, rx, ry+dy);
            this.mAllPlatforms.addToSet(obj);
        }
        
        ry = ry + 20 + Math.random() * 10;
    }
    
    // the floor and ceiling
    rx = -15;
    for (i = 0; i<9; i++) {
        obj = new Platform(this.kPlatformTexture, rx, 2);
        this.mAllPlatforms.addToSet(obj);
        
        obj = new Platform(this.kPlatformTexture, rx, 112);
        this.mAllPlatforms.addToSet(obj);
        rx += 30;
    }
    
    // the left and right walls
    ry = 12;
    for (i = 0; i<8; i++) {
        obj = new Wall(this.kWallTexture, 5, ry);
        this.mAllPlatforms.addToSet(obj);
        
        obj = new Wall(this.kWallTexture, 195, ry);
        this.mAllPlatforms.addToSet(obj);
        ry += 16;
    }
    
    // 
    // the important objects
    this.mHero = new Hero(this.kMinionSprite, 20, 30);   
    
    this.mMsg = new FontRenderable(this.kPrompt);
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(10, 110);
    this.mMsg.setTextHeight(3);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    
    this.mAllPlatforms.draw(this.mCamera);
    this.mAllMinions.draw(this.mCamera);
    this.mAllDyePacks.draw(this.mCamera);
    this.mHero.draw(this.mCamera);
    this.mAllParticles.draw(this.mCamera);
    this.mMsg.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    
    var func = function(x, y) { this.createParticle.call(this, x, y); };
    
    this.mCamera.update();  // to ensure proper interpolated movement effects
    
    this.mAllPlatforms.update();
    this.mAllMinions.update();
    this.mHero.update(this.mAllDyePacks, this.mAllParticles, this.createParticle);
    this.mAllDyePacks.update();
    this.mAllParticles.update();
    
    // create dye pack and remove the expired ones ...
    if (gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)) {
        if (this.mCamera.isMouseInViewport()) {
            var d = new DyePack(this.kDyePackTexture, this.mCamera.mouseWCX(), this.mCamera.mouseWCY());
            this.mAllDyePacks.addToSet(d);
        }
    }
    
    // create particles
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Z)) {
        if (this.mCamera.isMouseInViewport()) {
            var p = this.createParticle(this.mCamera.mouseWCX(), this.mCamera.mouseWCY());
            this.mAllParticles.addToSet(p);
        }
    }
    
    // Cleanup DyePacks
    var i, obj;
    for (i=0; i<this.mAllDyePacks.size(); i++) {
        obj = this.mAllDyePacks.getObjectAt(i);
        if (obj.hasExpired()) {
            this.mAllDyePacks.removeFromSet(obj);
        }
    }
    
    // physics simulation
    this._physicsSimulation();
    
    this.mMsg.setText(this.kPrompt + ": DyePack=" + this.mAllDyePacks.size() +
            " Particles=" + this.mAllParticles.size());
};

MyGame.prototype.createParticle = function(atX, atY) {
    var life = 30 + Math.random() * 200;
    var p = new ParticleGameObject("assets/particle.png", atX, atY, life);
    p.getRenderable().setColor([1, 0, 0, 1]);
    
    // size of the particle
    var r = 3.5 + Math.random() * 2.5;
    p.getXform().setSize(r, r);
    
    // final color
    var fr = 3.5 + Math.random();
    var fg = 0.4 + 0.1 * Math.random();
    var fb = 0.3 + 0.1 * Math.random();
    p.setFinalColor([fr, fg, fb, 0.6]);
    
    // velocity on the particle
    var fx = 10 * Math.random() - 20 * Math.random();
    var fy = 10 * Math.random();
    p.getPhysicsComponent().setVelocity([fx, fy]);
    
    // size delta
    p.setSizeDelta(0.98);
    
    return p;
};