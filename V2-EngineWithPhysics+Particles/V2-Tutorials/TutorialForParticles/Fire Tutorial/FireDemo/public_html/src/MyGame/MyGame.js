/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kPlatformTexture = "assets/platform.png";
    this.kWallTexture = "assets/wall.png";
    this.kTargetTexture = "assets/target.png";
    this.kParticleTexture = "assets/ParticleSystem/particle.png";
    this.kTorch = "assets/torch3.png";
    this.kBush = "assets/bush.png";
    this.kPillar = "assets/pillar.png";
    this.kForest = "assets/forest.png";
    
    // The camera to view the scene
    this.mCamera = null;

    this.mMsg = null;
    this.mShapeMsg = null;

    this.mAllObjs = null;
    this.mAllFire = null;
    this.mBounds = null;
    this.mCollisionInfos = [];
    this.mHero = null;
    this.mAllParticles = new ParticleGameObjectSet();
    
    this.mCurrentObj = 0;
    this.mTarget = null;
    this.fire = null;
    this.mTorch = null;
    this.mBush = null;
    this.mBush2 = null;
    this.mBush3 = null;
    this.mBush4 = null;
    this.mBush5 = null;
    this.mPillar = null;
    this.mForest = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);


MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kPlatformTexture);
    gEngine.Textures.loadTexture(this.kWallTexture);
    gEngine.Textures.loadTexture(this.kTargetTexture);
    gEngine.Textures.loadTexture(this.kParticleTexture);
    gEngine.Textures.loadTexture(this.kTorch);
    gEngine.Textures.loadTexture(this.kBush);
    gEngine.Textures.loadTexture(this.kPillar);
    gEngine.Textures.loadTexture(this.kForest);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kPlatformTexture);
    gEngine.Textures.unloadTexture(this.kWallTexture);
    gEngine.Textures.unloadTexture(this.kTargetTexture);
    gEngine.Textures.unloadTexture(this.kParticleTexture);
    gEngine.Textures.unloadTexture(this.kTorch);
    gEngine.Textures.unloadTexture(this.kBush);
    gEngine.Textures.unloadTexture(this.kPillar);
    gEngine.Textures.unloadTexture(this.kForest);
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        100,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    this.mAllObjs = new GameObjectSet();
    this.mAllFire = new GameObjectSet();
    
    this.createBounds();
    this.mFirstObject = 0;
    this.mCurrentObj = this.mFirstObject;
    var m;
    m=new Fire(20,14,0,0,20,0,20,32,1,0,2.5,0);
    this.mAllFire.addToSet(m);
    m=new Fire(35,13,3,36,8,0,0,2,15,0,2.5,1);
    this.mAllFire.addToSet(m);
    m=new Fire(68,7,23,11,20,0,12,4,23,8,3.5,0);
    this.mAllFire.addToSet(m);
    m=new Fire(10,7,3,2,20,0,20,4,1,0,2.5,0);
    this.mAllFire.addToSet(m);
    var r = new TextureRenderable(this.kTargetTexture);
    this.mTarget = new GameObject(r);
    var xf = r.getXform();
    xf.setSize(3, 3);
    this.mTorch = new TextureRenderable(this.kTorch);
    this.mTorch.getXform().setPosition(20,10);
    this.mTorch.setColor([0, 0, 0, 0]);  // No tinting
    this.mTorch.getXform().setSize(4,8);
    this.mBush = new TextureRenderable(this.kBush);
    this.mBush.getXform().setPosition(10,8);
    this.mBush.setColor([0, 0, 0, 0]);  // No tinting
    this.mBush.getXform().setSize(6,6);
    this.mPillar = new TextureRenderable(this.kPillar);
    this.mPillar.getXform().setPosition(35,8);
    this.mPillar.setColor([0, 0, 0, 0]);  // No tinting
    this.mPillar.getXform().setSize(7,7);
    this.mForest = new TextureRenderable(this.kForest);
    this.mForest.getXform().setPosition(70,9);
    this.mForest.setColor([0, 0, 0, 0]);  // No tinting
    this.mForest.getXform().setSize(48,12);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    
    // for now draw these ...
    /*for (var i = 0; i<this.mCollisionInfos.length; i++) 
        this.mCollisionInfos[i].draw(this.mCamera); */
    this.mCollisionInfos = []; 
    
    this.mTorch.draw(this.mCamera);
    this.mBush.draw(this.mCamera);
    this.mPillar.draw(this.mCamera);
    this.mForest.draw(this.mCamera);
    this.mTarget.draw(this.mCamera);
    this.mAllFire.draw(this.mCamera);
    this.mAllObjs.draw(this.mCamera);
};

MyGame.prototype.increasShapeSize = function(obj, delta) {
    var s = obj.getRigidBody();
    var r = s.incShapeSizeBy(delta);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.kBoundDelta = 0.1;
MyGame.prototype.update = function () {
    gEngine.ParticleSystem.update(this.mAllFire);
    
    // create particles
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Left)) {
        this.mCurrentObj -= 1;
        if (this.mCurrentObj < this.mFirstObject)
            this.mCurrentObj = this.mAllFire.size() - 1;
    }            
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Right)) {
        this.mCurrentObj += 1;
        if (this.mCurrentObj >= this.mAllFire.size())
            this.mCurrentObj = this.mFirstObject;
    }

    var obj = this.mAllFire.getObjectAt(this.mCurrentObj);
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
        obj.incWidth(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.W)) {
        obj.incWidth(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.A)) {
        obj.incyAcceleration(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.S)) {
        obj.incyAcceleration(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Z)) {
        obj.incLife(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.X)) {
        obj.incLife(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.E)) {
        obj.incxVelocity(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
        obj.incxVelocity(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.D)) {
        obj.incyVelocity(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.F)) {
        obj.incyVelocity(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.C)) {
        obj.incFlicker(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.V)) {
        obj.incFlicker(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.T)) {
        obj.incIntensity(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Y)) {
        obj.incIntensity(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.G)) {
        obj.incxAcceleration(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.H)) {
        obj.incxAcceleration(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.B)) {
        obj.incParticleSize(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.N)) {
        obj.incParticleSize(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.U)) {
        obj.incyOffset(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.I)) {
        obj.incyOffset(-1);
    }
    
    gEngine.Physics.processCollision(this.mAllObjs, this.mCollisionInfos);
    gEngine.ParticleSystem.collideWithRigidSet(this.mAllObjs, this.mAllParticles);

    var p = obj.getPos();
    this.mTarget.getXform().setPosition(p[0], p[1]);
    this.updateValue(obj);
    //this.mShapeMsg.setText(obj.getRigidBody().getCurrentState());
};

MyGame.prototype.updateValue = function(obj){
    document.getElementById("value1").innerHTML = obj.getWidth();
    document.getElementById("value2").innerHTML = obj.getyAcceleration();
    document.getElementById("value3").innerHTML = obj.getLife();
    document.getElementById("value4").innerHTML = obj.getxVelocity();
    document.getElementById("value5").innerHTML = obj.getyVelocity();
    document.getElementById("value6").innerHTML = obj.getFlicker();
    document.getElementById("value7").innerHTML = obj.getIntensity();
    document.getElementById("value8").innerHTML = obj.getxAcceleration();
    document.getElementById("value9").innerHTML = obj.getParticleSize();
    document.getElementById("value10").innerHTML = obj.getyOffset();
};
