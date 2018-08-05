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

var isWin;
var bomb;
var heroY = 0;
var hc;
var gamestart;

function Level2() {

    hc = 0;
    isWin=true;
    gamestart = false;
    bomb = 5;
    
    this.kMinionSprite = "assets/hero.png";
    this.kPlatformTexture = "assets/platform.png";
    this.kWallTexture = "assets/wall.png";
    this.kTargetTexture = "assets/target.png";
    this.kParticleTexture = "assets/particle.png";
    this.kBlockTexture   = "assets/block.png";
    this.kBg = "assets/bg_2.png";
    this.kNbg = "assets/NormalMap.png";
    this.kHerineSprite = "assets/girl-01.png";
    this.kAirman = "assets/airman2.png";
    this.kLaserBeam = "assets/laser.png";
    this.kLaserMusic = "assets/laser.wav";
    
    this.mHerine = null;    
    // The camera to view the scene
    this.mCamera = null;

    this.mMsg = null;
    this.mShapeMsg = null;

    this.mAllObjs = null;
    this.mAllBlocks = null;
    this.mAllParticles = null;
    this.mBounds = null;
    this.mCollisionInfos = [];
    this.mHero = null;
    this.mLaser = null;
    
    this.mCurrentObj = 0;
    this.mTarget = null;
}
gEngine.Core.inheritPrototype(Level2, Scene);


Level2.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kPlatformTexture);
    gEngine.Textures.loadTexture(this.kWallTexture);
    gEngine.Textures.loadTexture(this.kTargetTexture);
    gEngine.Textures.loadTexture(this.kParticleTexture);
    gEngine.Textures.loadTexture(this.kBlockTexture);
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kNbg);
    gEngine.Textures.loadTexture(this.kHerineSprite);
    gEngine.Textures.loadTexture(this.kAirman);
    gEngine.Textures.loadTexture(this.kLaserBeam);
    gEngine.AudioClips.loadAudio(this.kLaserMusic);
};

Level2.prototype.unloadScene = function () {
    gEngine.LayerManager.cleanUp();
    
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kPlatformTexture);
    gEngine.Textures.unloadTexture(this.kWallTexture);
    gEngine.Textures.unloadTexture(this.kTargetTexture);
    gEngine.Textures.unloadTexture(this.kParticleTexture);
    gEngine.Textures.unloadTexture(this.kBlockTexture);
    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kNbg);
    gEngine.Textures.unloadTexture(this.kHerineSprite);
    gEngine.Textures.unloadTexture(this.kAirman);
    gEngine.Textures.unloadTexture(this.kLaserBeam);
    gEngine.AudioClips.unloadAudio(this.kLaserMusic);
    
    if(isWin === true) {
        var nextLevel = new Level7();  // load the next level
        gEngine.Core.startScene(nextLevel);
    }else if(isWin === false) {
        var nextLevel = new LoseLevel(2);  // load the next level
        gEngine.Core.startScene(nextLevel);
    }
};

Level2.prototype.initialize = function () {
    // Step A: set up the cameras
    this.upperCamera = new Camera(
        vec2.fromValues(50, 65), // position of the camera
        100,                     // width of camera
        [0, 360, 720, 360]         // viewport (orgX, orgY, width, height)
    );
    this.upperCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    this.lowerCamera = new Camera(
        vec2.fromValues(50, 15), // position of the camera
        100,                     // width of camera
        [0, 0, 720, 360]         // viewport (orgX, orgY, width, height)
    );
    this.lowerCamera.setBackgroundColor([1, 1, 1, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    var bgR = new IllumRenderable(this.kBg,this.kNbg);
        bgR.getXform().setSize(100, 100);
        bgR.getXform().setPosition(50, 40);
        bgR.getXform().setZPos(-1);
        
    this.mBg = new GameObject(bgR);
    
    this.mHero = new Airman(this.kAirman); //Hero is a rectangle
    this.mHero.getXform().setPosition(6.2,500);
    
    this.mAllObjs = new GameObjectSet();
    this.mAllBlocks = new GameObjectSet();
    this.mAllParticles = new ParticleGameObjectSet();
    this.mLaser = new LaserBeam(this.kLaserBeam,-10,-10,5,30);
    
    this.createBounds();
    this.mFirstObject = this.mAllObjs.size();
    this.mCurrentObj = this.mFirstObject;
    
    //Hero and the five moving objects
    this.mAllObjs.addToSet(this.mHero);
    
    //Message Information
    this.mMshape = new FontRenderable("Left:");
    this.mMshape.setColor([1, 1, 1, 1]);
    this.mMshape.getXform().setPosition(5, 87);
    this.mMshape.setTextHeight(3);
    
    //Message Information
    this.mMsg = new FontRenderable("");
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.getXform().setPosition(24, 33);
    this.mMsg.setTextHeight(2.3);
    
    this.mMsg1 = new FontRenderable("");
    this.mMsg1.setColor([1, 1, 1, 1]);
    this.mMsg1.getXform().setPosition(24, 26);
    this.mMsg1.setTextHeight(2.3);
    
    this.mMsg2 = new FontRenderable("");
    this.mMsg2.setColor([1, 1, 1, 1]);
    this.mMsg2.getXform().setPosition(24, 18);
    this.mMsg2.setTextHeight(2.3);
    
    this.mMsg3 = new FontRenderable("");
    this.mMsg3.setColor([1, 1, 1, 1]);
    this.mMsg3.getXform().setPosition(24, 18);
    this.mMsg3.setTextHeight(2.3);
    
    this.mMsg4 = new FontRenderable("");
    this.mMsg4.setColor([1, 1, 1, 1]);
    this.mMsg4.getXform().setPosition(24.3, 14);
    this.mMsg4.setTextHeight(2.2);
    
    this.mMsg5 = new FontRenderable("");
    this.mMsg5.setColor([1, 1, 1, 1]);
    this.mMsg5.getXform().setPosition(24.6, 10);
    this.mMsg5.setTextHeight(2.1);
    
    this.mInfo = new FontRenderable("");
    this.mInfo.setColor([1, 1, 1, 1]);
    this.mInfo.getXform().setPosition(24, 28);
    this.mInfo.setTextHeight(2.3);
    
    this.mInfo2 = new FontRenderable("");
    this.mInfo2.setColor([1, 1, 1, 1]);
    this.mInfo2.getXform().setPosition(24, 20);
    this.mInfo2.setTextHeight(2.3);
    
    this.mInfoe = new FontRenderable("Next: Press H");
    this.mInfoe.setColor([0, 1, 0, 1]);
    this.mInfoe.getXform().setPosition(30, 10);
    this.mInfoe.setTextHeight(3);
    
    gEngine.Physics.toggleNoGrav();
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
Level2.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.upperCamera.setupViewProjection();
    this.mBg.draw(this.upperCamera);
    
    this.mAllObjs.draw(this.upperCamera);
    this.mAllBlocks.draw(this.upperCamera);
    this.mLaser.draw(this.upperCamera);
    
    this.mCollisionInfos = []; 
    
    //Target.draw(this.mCamera);
    this.mMshape.draw(this.upperCamera);   // only draw status in the main camera
    //this.mAllParticles.draw(this.mCamera);
    
    this.lowerCamera.setupViewProjection();
    this.mBg.draw(this.lowerCamera);
    this.mMsg.draw(this.lowerCamera);
    this.mMsg1.draw(this.lowerCamera);
    this.mMsg2.draw(this.lowerCamera);
    this.mMsg3.draw(this.lowerCamera);
    this.mMsg4.draw(this.lowerCamera);
    this.mMsg5.draw(this.lowerCamera);
    this.mInfo.draw(this.lowerCamera);
    this.mInfo2.draw(this.lowerCamera);
    this.mInfoe.draw(this.lowerCamera);
};

Level2.kBoundDelta = 0.1;

Level2.prototype.update = function () {   
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.L)) {
        gEngine.GameLoop.stop();
    }
    
    heroY = this.mHero.getXform().getYPos();
    
    gEngine.ParticleSystem.update(this.mAllParticles);

    var obj = this.mAllObjs.getObjectAt(this.mCurrentObj);
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.H)&&hc===0){hc+=1;}
   
    this.mLaser.update();
    this.mAllObjs.update(this.upperCamera);
    this.lowerCamera.update();
    
    //this.mHBlocks.update(this.mCamera); 
     if (gEngine.Input.isKeyPressed(gEngine.Input.keys.N) && hc===1){
         hc=2;
         this.mHero.getXform().setPosition(6.2,72.5);
         this.mInfoe.setText("Press K to throw bombs");
         
     }
     
    var hTop = 0;
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.K) && bomb > 0 && hc === 2) {
        gEngine.AudioClips.playACue(this.kLaserMusic);
        bomb-=1;
        this.lowerCamera.shake(2, 4, 20, 30);
        this.mInfo.setTextHeight(0);
        this.mMsg4.setTextHeight(2.3);
        //this.mMsg4.setText("Wait, my room is shaking! Oh!");
        
        this.mLaser.getXform().setPosition(this.mHero.getXform().getXPos() - 2,this.mHero.getXform().getYPos() - 6.5);
        
        var max = [];
        for(var i = 0; i < this.mAllObjs.size(); i+=1) {
            if((this.mAllObjs.getObjectAt(i).getXform().getXPos()+2.5>this.mHero.getXform().getXPos()) && (this.mAllObjs.getObjectAt(i).getXform().getXPos()-2.5<this.mHero.getXform().getXPos()) 
                    && i !== this.mCurrentObj
                    && this.mAllObjs.getObjectAt(i).isVisible() === true) {
                var cNum = max.push(i);
            }
        }
        hTop = max[max.length - 1];
        
        console.log(this.mHero.getXform().getYPos() + "   "+this.mAllObjs.getObjectAt(hTop).getXform().getYPos());
        this.mLaser.getXform().setSize(5,this.mHero.getXform().getYPos() - this.mAllObjs.getObjectAt(hTop).getXform().getYPos());
        this.mAllObjs.getObjectAt(hTop).setVisibility(false);
        this.mAllObjs.getObjectAt(hTop).getXform().setPosition(0,1);
        
    }
    
    
//    //Judge whether lose
    for(var i = 0; i < this.mAllObjs.size(); i+=1) {
        if((this.mAllObjs.getObjectAt(i).getXform().getXPos()+4>this.mHero.getXform().getXPos()) && (this.mAllObjs.getObjectAt(i).getXform().getXPos()-4<this.mHero.getXform().getXPos()) 
                &&(this.mAllObjs.getObjectAt(i).getXform().getYPos()+4>this.mHero.getXform().getYPos()) && (this.mAllObjs.getObjectAt(i).getXform().getYPos()-4<this.mHero.getXform().getYPos())
                && this.mAllObjs.getObjectAt(i).isVisible() === true
                && i !== this.mCurrentObj) {
                isWin = false;
                gEngine.GameLoop.stop();
        }
    }
    
//    console.log(this.mAllObjs.size());
    
    if(this.mHero.getXform().getXPos() === 91.40016174316406 && this.mHero.getXform().getYPos() === 45.5 && hc === 2) {
        hc=3;
         gEngine.GameLoop.stop();
        /*this.mInfo.setTextHeight(0);
        this.mMsg.setTextHeight(2.3);
        this.mMsg4.setTextHeight(0);
        this.mMsg.setText("Ok, I can pass this area now.");
        this.mMsg1.setTextHeight(2.3);
        this.mMsg1.setText("Are you still there?");
        this.mInfoe.setText("Next: Press H");*/
    }
    
    obj.keyControl();
    obj.getRigidBody().userSetsState();
    
    gEngine.Physics.processCollision(this.mAllObjs, this.mCollisionInfos);
    gEngine.ParticleSystem.collideWithRigidSet(this.mAllObjs, this.mAllParticles);
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {}
    var p = obj.getXform().getPosition();

    this.mMshape.setText("Left: "+bomb);
    //this.mInfo2.setText(""+hc);
    
    switch(hc)
    {
        case 0:
            this.mMsg.setText("Noisy buildings were built by players");
            this.mMsg1.setText("in my street at liberty.");
            this.mMsg2.setText("I want to destroy them.");
            break;         
        case 1:
            this.mInfoe.setText("Press N to give him a plane");
            break;
//        case 2:
//            this.mMsg1.setTextHeight(0);
//            //this.mMsg4.setTextHeight(0);
//            this.mInfoe.getXform().setPosition(40,10);
//            this.mInfoe.setText("Press N to give him a plane");
//            break;
//        case 4:
//            this.mMsg2.setColor([1,1,1,1]);
//            this.mMsg2.setText("I am fine...");
//            this.mMsg3.setText("(I should not let him worry about me)");
//            this.mMsg4.setText("(He deserve a wonderful last moment)");
    }
};

Level2.prototype.createParticle = function(atX, atY) {
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
    p.getParticle().setVelocity([fx, fy]);
    
    // size delta
    p.setSizeDelta(0.98);
    
    return p;
};