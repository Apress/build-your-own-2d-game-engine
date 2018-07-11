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
    this.kIce = "assets/Ice.png";
    this.kWood = "assets/Wood.png";
    this.kDirt = "assets/Dirt.png";
    this.kMud = "assets/Mud.png";
    this.kRock = "assets/Rock.png";
    this.kBouncy = "assets/Ball.png";
    this.kBall = "assets/SoccerBall.png";
    this.kWoodBall = "assets/WoodBall.png";
    this.kParticleTexture = "assets/DirtParticle.png";
    this.kBowlingBall = "assets/BowlingBall.png";
    
    // The camera to view the scene
    this.mCamera = null;

    this.mMsg = null;
    this.mShapeMsg = null;
    this.mIce = null;
    this.mWood = null;
    this.mDirt = null;
    this.mMud = null;

    this.mAllObjs = null;
    this.mAllParticles = null;
    this.mBounds = null;
    this.mCollisionInfos = [];
    this.mHero = null;
    
    this.arena1 = null;
    this.arena2 = null;
    this.arena3 = null;
    this.arena4 = null;
    this.world = null;
    
    this.mCurrentObj = 0;
    this.mTarget = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);


MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kPlatformTexture);
    gEngine.Textures.loadTexture(this.kWallTexture);
    gEngine.Textures.loadTexture(this.kTargetTexture);
    gEngine.Textures.loadTexture(this.kWood);
    gEngine.Textures.loadTexture(this.kDirt);
    gEngine.Textures.loadTexture(this.kIce);
    gEngine.Textures.loadTexture(this.kMud);
    gEngine.Textures.loadTexture(this.kRock);
    gEngine.Textures.loadTexture(this.kBouncy);
    gEngine.Textures.loadTexture(this.kBall);
    gEngine.Textures.loadTexture(this.kWoodBall);
    gEngine.Textures.loadTexture(this.kParticleTexture);
    gEngine.Textures.loadTexture(this.kBowlingBall);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kPlatformTexture);
    gEngine.Textures.unloadTexture(this.kWallTexture);
    gEngine.Textures.unloadTexture(this.kTargetTexture);
    gEngine.Textures.unloadTexture(this.kWood);
    gEngine.Textures.unloadTexture(this.kDirt);
    gEngine.Textures.unloadTexture(this.kIce);
    gEngine.Textures.unloadTexture(this.kMud);
    gEngine.Textures.unloadTexture(this.kRock);
    gEngine.Textures.unloadTexture(this.kBouncy);
    gEngine.Textures.unloadTexture(this.kBall);
    gEngine.Textures.unloadTexture(this.kWoodBall);
    gEngine.Textures.unloadTexture(this.kBowlingBall);
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
    this.arena1 = new Arena(-1.5,0,47,47*.75,.6,.01,1,2,this.kIce,false); 
    this.arena2 = new Arena(48.5,38.5,47,47*.75,.01,.1,0,5,this.kMud,true); 
    this.arena3 = new Arena(-1.5,38.5,47,47*.75,.8,.5,0,2,this.kWood,false); 
    this.arena4 = new Arena(48.5,0,47,47*.75,.3,.7,3,4,this.kDirt,false); 
    this.world = new GameObjectSet();
    this.world.addToSet(this.arena1);
    this.world.addToSet(this.arena4);
    this.world.addToSet(this.arena3);
    this.world.addToSet(this.arena2);
    this.mAllObjs = new GameObjectSet();
    
    this.createBounds();
    this.mFirstObject = 0;
    this.mCurrentObj = this.mFirstObject;
    
    this.mIce = new FontRenderable("Ice");
    this.mIce.setColor([1, 1, 1, 1]);
    this.mIce.getXform().setPosition(20, 39);
    this.mIce.setTextHeight(2.5);
    
    this.mWood = new FontRenderable("Wood");
    this.mWood.setColor([1, 1, 1, 1]);
    this.mWood.getXform().setPosition(20, 77);
    this.mWood.setTextHeight(2.5);
    
    this.mDirt = new FontRenderable("Dirt");
    this.mDirt.setColor([1, 1, 1, 1]);
    this.mDirt.getXform().setPosition(70, 39);
    this.mDirt.setTextHeight(2.5);
    
    this.mMud = new FontRenderable("Mud");
    this.mMud.setColor([1, 1, 1, 1]);
    this.mMud.getXform().setPosition(70, 77);
    this.mMud.setTextHeight(2.5);
    
    
    this.mMsg = new FontRenderable("Status Message");
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(5, 7);
    this.mMsg.setTextHeight(3);
    
    this.mShapeMsg = new FontRenderable("Shape");
    this.mShapeMsg.setColor([0, 0, 0, 1]);
    this.mShapeMsg.getXform().setPosition(5, 42);
    this.mShapeMsg.setTextHeight(2.5);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    
    //this.mAllObjs.draw(this.mCamera);
    
    // for now draw these ...
    /*for (var i = 0; i<this.mCollisionInfos.length; i++) 
        this.mCollisionInfos[i].draw(this.mCamera); */
    this.mCollisionInfos = []; 
    
    this.world.draw(this.mCamera);
    this.mTarget.draw(this.mCamera);
    this.mMsg.draw(this.mCamera);   // only draw status in the main camera
    this.mShapeMsg.draw(this.mCamera);
    this.mIce.draw(this.mCamera);
    this.mWood.draw(this.mCamera);
    this.mDirt.draw(this.mCamera);
    this.mMud.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.kBoundDelta = 0.1;
MyGame.prototype.update = function () {
    var msg = "";   
    var area = this.world.getObjectAt(this.mCurrentObj);
    var pos = area.getPos();
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Left)) {
        area.cycleFoward();
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Right)) {
        area.cycleBackward();
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.C)) {
        area.incRestitution(-.01);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.V)) {
        area.incRestitution(.01);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.B)) {
        area.incFriction(-.01);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.N)) {
        area.incFriction(.01);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.H)) {
        area.radomizeVelocity();
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.U)) {
        area.createBouncy(pos[0]+15,pos[1]+20,2);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.J)) {
        area.createBall(pos[0]+15,pos[1]+20,4);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.I)) {
        area.createRock(pos[0]+15,pos[1]+20,5);
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.K)) {
        area.createWood(pos[0]+15,pos[1]+20,4);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.O)) {
        area.createIce(pos[0]+15,pos[1]+20,5);
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.L)) {
        area.createBowlingBall(pos[0]+15,pos[1]+20,3);
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Z)) {
        area.lightOff();
        this.mCurrentObj -= 1;
        if (this.mCurrentObj < this.mFirstObject)
            this.mCurrentObj = this.world.size() - 1;
    }            
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.X)) {
        area.lightOff();
        this.mCurrentObj += 1;
        if (this.mCurrentObj >= this.world.size())
            this.mCurrentObj = this.mFirstObject;
    }
    this.world.getObjectAt(this.mCurrentObj).lightOn();
    this.world.update();
    var obj = area.getObject();
    area.physicsReport();
    
    
//    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.G)) {
//        var x = 20 + Math.random() * 60;
//        var y = 75;
//        var t = Math.random() > 0.5;
//        var m = new Minion(this.kMinionSprite, x, y, t,.2,.8);
//        this.mAllObjs.addToSet(m);
//    }
        
    obj.keyControl();

    var p = obj.getXform().getPosition();
    this.mTarget.getXform().setPosition(p[0], p[1]);
    this.mMsg.setText(msg);
    
    this.mShapeMsg.setText(area.getCurrentState());
};