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

var isFinish = false;
var motionstop = 0;

var offset = new Array();
var offset1 = new Array();
var offset2 = new Array();
var offset3 = new Array();
var offset4 = new Array();
var offset5 = new Array();
var id;
offset = [0,0,0,0,0,0,0,0,0,0,0];
offset1 = [0,0,0,0,0,0,0,0,0,0,1];
offset2 = [0,0,0,0,0,0,0,0,0,0,2];
offset3 = [0,0,0,0,0,0,0,0,0,0,3];
offset4 = [0,0,0,0,0,0,0,0,0,0,4];
offset5 = [0,0,0,0,0,0,0,0,0,0,5];
var Pipepos = 800;
var isLevel1Win = true;
var hc = 0;

function Level1() {
    this.kMinionSprite = "assets/Herofinal.png";
    this.kHerineSprite = "assets/girl-01.png";
    this.kPlatformTexture = "assets/texture2.png";
    this.kWallTexture = "assets/wall.png";
    this.kTargetTexture = "assets/target.png";
    this.kParticleTexture = "assets/particle.png";
    this.kBlockTexture   = "assets/blueblock.png";
    this.kBg = "assets/computer1.png";
    this.kNbg = "assets/NormalMap.png";
    this.kAll = "assets/alldata.png";
    this.kInput = "assets/waterinput.png";
    this.kWater = "assets/water02.png";
    this.kRain = "assets/rainy.png";   
    
    //this.krainmusic = "assets/rain.mp3";
    this.kpipemusic = "assets/pipe.mp3";
    
    this.mCamera = null;

    this.mMsg = null;
    this.mShapeMsg = null;
    
    this.mAllObjs = null;
    this.mAllParticles = null;
    this.mBounds = null;
    this.mCollisionInfos = [];
    this.mHero = null;
    this.mHerine = null;
    //this.mtrigger=null;
    this.mCurrentObj = 0;
    this.mTarget = null;
    this.mRain = null;
}
gEngine.Core.inheritPrototype(Level1, Scene);


Level1.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kPlatformTexture);
    gEngine.Textures.loadTexture(this.kWallTexture);
    gEngine.Textures.loadTexture(this.kTargetTexture);
    gEngine.Textures.loadTexture(this.kParticleTexture);
    gEngine.Textures.loadTexture(this.kBlockTexture);
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kNbg);
    gEngine.Textures.loadTexture(this.kAll);
    gEngine.Textures.loadTexture(this.kHerineSprite);
    gEngine.Textures.loadTexture(this.kInput);
    gEngine.Textures.loadTexture(this.kWater);
    gEngine.Textures.loadTexture(this.kRain);
    gEngine.AudioClips.loadAudio(this.kpipemusic);
   // gEngine.AudioClips.loadAudio(this.krainmusic);
};

Level1.prototype.unloadScene = function () {
    gEngine.LayerManager.cleanUp();
    
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kPlatformTexture);
    gEngine.Textures.unloadTexture(this.kWallTexture);
    gEngine.Textures.unloadTexture(this.kTargetTexture);
    gEngine.Textures.unloadTexture(this.kParticleTexture);
    gEngine.Textures.unloadTexture(this.kBlockTexture);
    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kNbg);
    gEngine.Textures.unloadTexture(this.kAll);
    gEngine.Textures.unloadTexture(this.kHerineSprite);
    gEngine.Textures.unloadTexture(this.kInput);
    gEngine.Textures.unloadTexture(this.kWater);
    gEngine.Textures.unloadTexture(this.kRain);
    gEngine.AudioClips.unloadAudio(this.kpipemusic);
    //gEngine.AudioClips.unloadAudio(this.krainmusic);
    if(isLevel1Win === true) {
        var nextLevel = new Level2();  // load the next level
        gEngine.Core.startScene(nextLevel);
    }else if(isLevel1Win === false) {
        var nextLevel = new Level1();  // load the next level
        gEngine.Core.startScene(nextLevel);
    }
};

Level1.prototype.initialize = function () {
    // Step A: set up the cameras
    this.upperCamera = new Camera(
        vec2.fromValues(50, 65), // position of the camera
        100,                     // width of camera
        [0, 360, 720, 360]         // viewport (orgX, orgY, width, height)
    );
    this.upperCamera.setBackgroundColor([1, 1, 1, 1]);
    
    this.lowerCamera = new Camera(
        vec2.fromValues(50, 15), // position of the camera
        100,                     // width of camera
        [0, 0, 720, 360]         // viewport (orgX, orgY, width, height)
    );
    this.lowerCamera.setBackgroundColor([0, 0, 0, 1]);
    
     this.Pipecamera = new Camera(
        vec2.fromValues(50, 35), // position of the camera
        100,                     // width of camera
       // [120, 240, 480,360 ]         // viewport (orgX, orgY, width, height)
        [Pipepos, 240, 480, 360]
    );
    this.Pipecamera.setBackgroundColor([1, 1, 1, 1]);

     this.waterCamera = new Camera(
        vec2.fromValues(50, 117), // position of the camera
        90,                     // width of camera
       // [120, 240, 480,360 ]         // viewport (orgX, orgY, width, height)
        [145, 360, 430, 140]
    );
    this.waterCamera.setBackgroundColor([1, 1, 1, 1]);
    
            // sets the background to gray
    
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    var bgR = new IllumRenderable(this.kBg,this.kNbg);
        bgR.getXform().setSize(100, 100);
        bgR.getXform().setPosition(50, 40);
        bgR.getXform().setZPos(-1);
        
    this.mBg = new GameObject(bgR);
    
   /* var waterR = new IllumRenderable(this.kWater,this.kNbg);
        waterR.getXform().setSize(100, 100);
        waterR.getXform().setPosition(50, 104);
        waterR.getXform().setZPos(-1);*/
        
    this.mWater = new Water(this.kWater);
    
    var rainR = new IllumRenderable(this.kRain,this.kRain);
        rainR.getXform().setSize(100, 100);
        rainR.getXform().setPosition(50, 40);
        rainR.getXform().setZPos(-1);
        
    this.mRain = new GameObject(rainR);
    
    this.mHero = new Hero(this.kMinionSprite);
    //this.mHerine = new Herine(this.kHerineSprite)//Hero is a rectangle
    this.mAllObjs = new GameObjectSet();
    this.mAllParticles = new ParticleGameObjectSet();
    this.mBlocks=new GameObjectSet();
    this.mHBlocks = new GameObjectSet();
    this.createBounds();
    this.mFirstObject = this.mAllObjs.size();
    this.mCurrentObj = this.mFirstObject;
    this.PipeControl();
    
    //Hero and the five moving objects
    this.mBlocks.addToSet(this.mHero);
    //this.mHBlocks.addToSet(this.mHerine);
    
    //Message Information
    this.mMsg = new FontRenderable("");
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.getXform().setPosition(24, 33);
    this.mMsg.setTextHeight(3);
    
    this.mMsg1 = new FontRenderable("");
    this.mMsg1.setColor([1, 1, 1, 1]);
    this.mMsg1.getXform().setPosition(24, 27);
    this.mMsg1.setTextHeight(3);
    
    this.mMsg2 = new FontRenderable("");
    this.mMsg2.setColor([1, 1, 1, 1]);
    this.mMsg2.getXform().setPosition(24, 22);
    this.mMsg2.setTextHeight(3);
    
    this.mMsg3 = new FontRenderable("");
    this.mMsg3.setColor([1, 1, 1, 1]);
    this.mMsg3.getXform().setPosition(24, 21);
    this.mMsg3.setTextHeight(2.3);
    
    this.mMsg4 = new FontRenderable("");
    this.mMsg4.setColor([1, 1, 1, 1]);
    this.mMsg4.getXform().setPosition(24.3, 17);
    this.mMsg4.setTextHeight(2.2);
    
    this.mMsg5 = new FontRenderable("");
    this.mMsg5.setColor([1, 1, 1, 1]);
    this.mMsg5.getXform().setPosition(24.6, 13);
    this.mMsg5.setTextHeight(2.1);
    
    this.mInfo = new FontRenderable("");
    this.mInfo.setColor([0, 1, 0, 1]);
    this.mInfo.getXform().setPosition(24, 28);
    this.mInfo.setTextHeight(2.3);
    
    this.mInfo2 = new FontRenderable("");
    this.mInfo2.setColor([0, 1, 0, 1]);
    this.mInfo2.getXform().setPosition(24, 20);
    this.mInfo2.setTextHeight(2.3);
    
    this.mInfoe = new FontRenderable("Next: Press H");
    this.mInfoe.setColor([0, 1, 0, 1]);
    this.mInfoe.getXform().setPosition(50, 10);
    this.mInfoe.setTextHeight(3);
    
    gEngine.Physics.toggleHasGrav();
    
};

Level1.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.upperCamera.setupViewProjection();
    this.mBg.draw(this.upperCamera);
    this.mBlocks.draw(this.upperCamera);
    this.mWater.draw(this.upperCamera);
    //this.mAllObjs.draw(this.upperCamera);
    this.mCollisionInfos = []; 
    this.mBlocks.getObjectAt(0).setVisibility(false);
    this.mBlocks.getObjectAt(1).setVisibility(false);
    this.mBlocks.getObjectAt(2).setVisibility(false);
    this.mBlocks.getObjectAt(6).setVisibility(false);    
    this.mBlocks.getObjectAt(5).setVisibility(false);
    this.mBlocks.getObjectAt(6).setVisibility(false);
    
    this.mTarget.draw(this.upperCamera);
    this.mAllParticles.draw(this.upperCamera);

    this.lowerCamera.setupViewProjection();

    this.mBg.draw(this.lowerCamera);
    
    this.mRain.draw(this.lowerCamera);
    this.mRain.setVisibility(false);
    
    this.mHBlocks.draw(this.lowerCamera);
    this.mAllParticles.draw(this.lowerCamera);
    this.mMsg.draw(this.lowerCamera);
    this.mMsg1.draw(this.lowerCamera);
    this.mMsg2.draw(this.lowerCamera);
    this.mMsg3.draw(this.lowerCamera);
    this.mMsg4.draw(this.lowerCamera);
    this.mMsg5.draw(this.lowerCamera);
    this.mInfo.draw(this.lowerCamera);
    this.mInfo2.draw(this.lowerCamera);
    this.mInfoe.draw(this.lowerCamera);
    
   // this.waterCamera.setupViewProjection();
   // this.mWater.draw(this.waterCamera);     
    
    this.Pipecamera.setupViewProjection();
    this.mAllObjs.draw(this.Pipecamera);

    

};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
Level1.kBoundDelta = 0.1;
Level1.prototype.update = function () { 
    //this.mInfoe.setText("Next: Press H");
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.C)) {
        if (this.mCamera.isMouseInViewport()) {
            var p = this.createParticle(this.mCamera.mouseWCX(), this.mCamera.mouseWCY());
            this.mAllParticles.addToSet(p);
        }
    }
    
    gEngine.ParticleSystem.update(this.mAllParticles);
    if (hc===1) {
        
        Pipepos = 120;
        isFinish === true;
        this.Pipecamera = new Camera(
        vec2.fromValues(50, 35), // position of the camera
        100,                     // width of camera
       // [120, 240, 480,360 ]         // viewport (orgX, orgY, width, height)
        [Pipepos, 240, 480, 360]
         );
         this.mInfoe.getXform().setPosition(25,10)
         this.mInfoe.setText("Use Mouse to operate the Pipe");
    }
    var obj = this.mAllObjs.getObjectAt(this.mCurrentObj);
    //story input
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.H) && Pipepos ===800) {hc+=1;}
       
    this.mBlocks.update(this.upperCamera);
    this.mAllObjs.update(this.Pipecamera);
    this.mWater.update(this.upperCamera);
    //this.mHBlocks.update(this.lowerCamera);
    this.mMsg.update(this.lowerCamera);
    this.mRain.update(this.lowerCamera);
 
    if(this.mHero.getXform().getPosition()[1] < 10) {
        isLevel1Win = false;
        gEngine.GameLoop.stop();
    }else if(this.mHero.getXform().getPosition()[0] > 90 && this.mHero.getXform().getPosition()[1] > 40) {
        isLevel1Win = true;
        gEngine.GameLoop.stop();
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.L)){
        gEngine.GameLoop.stop();
    }
    
    obj.keyControl();
    obj.getRigidBody().userSetsState();
    
    gEngine.Physics.processCollision(this.mAllObjs, this.mCollisionInfos);
    gEngine.ParticleSystem.collideWithRigidSet(this.mAllObjs, this.mAllParticles);
    gEngine.Physics.processCollision(this.mBlocks);
   // gEngine.ParticleSystem.collideWithRigidSet(this.mBlocks, this.mAllParticles);
    if(Pipepos===120){this.PipeMouse();}
    if((offset4[6]%4 ===2)&&(offset4[5]%2 ===1)&&(offset4[4]%4 ===3)
       &&(offset3[4]%4 ===0)&&(offset3[3]%2 ===1)&&(offset3[2]%2 ===0)&&(offset3[1]%4===0)
       &&(offset2[1]%2 ===1)
       &&(offset1[1]%4 ===1)&&(offset1[2]%2 ===1)&&(offset1[3]%2 ===0)&&(offset1[4]%4 ===2))
       {
          // gEngine.AudioClips.playACue(this.krainmusic);   
           Pipepos = 800;
           if(hc===1){hc=2;}
           
        this.Pipecamera = new Camera(
        vec2.fromValues(50, 35), // position of the camera
        100,                     // width of camera
       // [120, 240, 480,360 ]         // viewport (orgX, orgY, width, height)
        [Pipepos, 240, 0, 0]
         );
 
       this.waterCamera = new Camera(
        vec2.fromValues(50, 117), // position of the camera
        90,                     // width of camera
       // [120, 240, 480,360 ]         // viewport (orgX, orgY, width, height)
        [145, 360, 430, 80]
         );
         
        this.mRain.setVisibility(true);   
        this.mWater.getXform().incYPosBy(-0.05);
        this.mBlocks.getObjectAt(0).setVisibility(true);
        this.mBlocks.getObjectAt(1).setVisibility(true);
        this.mBlocks.getObjectAt(2).setVisibility(true);
        this.mBlocks.getObjectAt(5).getXform().setPosition(0,0);
        this.mBlocks.getObjectAt(6).getXform().setPosition(0,0);
        //gEngine.AudioClips.playACue(this.krainmusic);
        this.mInfoe.setText("Press AD and W to move");
    }    
    switch(hc)
    {
        case 0:    
            this.mMsg.setText("People used to love the game.");
            this.mMsg1.setText("But then I was abandoned.");
            this.mMsg2.setText("The crowded road was flooded." );
            break;
    }
};

Level1.prototype.createParticle = function(atX, atY) {
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