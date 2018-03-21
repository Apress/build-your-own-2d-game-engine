/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */


/* DEBUGGING HOTKEYS <TOP SECRET DEVELOPER CHEAT CODES>
 * 1 zoom in
 * 2 zoom out
 * arrows keys, manip cam
 * h wall hit effect
 * 0 toggle camera follow (Set to true by default)
 * x to die
 * g (God Mode) can't die
 * f I believe I can fly
 * v automatically win level
 * n+m automatically win game
 * z shake camera
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame(level, lives, score, music=true)
{
    this.Level= level;
    this.Lives=lives;
    this.Score=score;
    
    // textures
    this.kHeroSprite = "assets/penguino/penguino_walking_01.png";
    this.kMinionSprite = "assets/penguino/seal.png";
    this.kPlatformTexture = "assets/platform.png";
    this.kWallTexture = "assets/penguino/wall.png";
    this.kTargetTexture = "assets/target.png";
    this.kParticle = "assets/particle.png";
    this.kBgGround = "assets/background_02.png";
    this.kBgGroundNM = "assets/background_02_nm.png";
    this.kBgCave = "assets/Cave.png";
    this.kBgCaveNM = "assets/Cave_NM.png";
    this.kPelicanSprite = "assets/pelican.png";
    this.kSardine = "assets/sardine.png";
    this.kFlag = "assets/flag_01.png";
    
    //sounds
    this.lvl1Music = "assets/sounds/level1.mp3";
    this.jump = "assets/sounds/jump.mp3";
    this.break = "assets/sounds/break.mp3";
    this.pengslide = "assets/sounds/pengslide.mp3";
    this.coin = "assets/sounds/coin.mp3";
    
  this.mHero = null;
  this.mFloor = null;
  this.mCamera = null;
  this.mCameraShake = null;
  this.mObjects = new GameObjectSet();
  this.mNonWalls = new GameObjectSet();

  //STATS VARIABLES
  
  this.TimeLeft=null;
  this.LevelTime=null;
  this.MaxLives=null;
  
  this.mLowestObject = 0;
  
  this.mBg = null;
  this.mMiniBg = null;
  
  //Light Sources
  this.spotlight=null;
  
  this.musicOn=music;
  
  this.mMessages=null;
  
}
//gEngine.Core.inheritPrototype(MyGame, Scene);


MyGame.prototype.loadScene = function () {
    
    //loading textures
    gEngine.Textures.loadTexture(this.kHeroSprite);
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kPlatformTexture);
    gEngine.Textures.loadTexture(this.kWallTexture);
    gEngine.Textures.loadTexture(this.kTargetTexture);
    gEngine.Textures.loadTexture(this.kParticle);
    gEngine.Textures.loadTexture(this.kPelicanSprite);
    gEngine.Textures.loadTexture(this.kSardine);
    gEngine.Textures.loadTexture(this.kFlag);
    
    //loading sounds
    gEngine.AudioClips.loadAudio(this.lvl1Music);
    gEngine.AudioClips.loadAudio(this.jump);
    gEngine.AudioClips.loadAudio(this.break);
    gEngine.AudioClips.loadAudio(this.pengslide);
    gEngine.AudioClips.loadAudio(this.coin);
    
    // loading backgrounds
    gEngine.Textures.loadTexture(this.kBgGround);
    gEngine.Textures.loadTexture(this.kBgGroundNM);
    gEngine.Textures.loadTexture(this.kBgCave);
    gEngine.Textures.loadTexture(this.kBgCaveNM); 
};

MyGame.prototype.unloadScene = function () {
    //unload textures
    gEngine.Textures.unloadTexture(this.kHeroSprite);
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kPlatformTexture);
    gEngine.Textures.unloadTexture(this.kWallTexture);
    gEngine.Textures.unloadTexture(this.kTargetTexture);
    gEngine.Textures.unloadTexture(this.kParticle);
    gEngine.Textures.unloadTexture(this.kBgGround);
    gEngine.Textures.unloadTexture(this.kBgGroundNM);
    gEngine.Textures.unloadTexture(this.kBgCave);
    gEngine.Textures.unloadTexture(this.kBgCaveNM);
    gEngine.Textures.unloadTexture(this.kPelicanSprite);
    gEngine.Textures.unloadTexture(this.kSardine);
    gEngine.Textures.unloadTexture(this.kFlag);
    
    
    //unload sounds
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.lvl1Music);
    gEngine.AudioClips.unloadAudio(this.jump);
    gEngine.AudioClips.unloadAudio(this.break);
    gEngine.AudioClips.unloadAudio(this.pengslide);
    gEngine.AudioClips.unloadAudio(this.coin);
    
    if(this.Level==0){
        this.Score=0;
        this.Lives=3;
    }
    
    if(this.win){
        var GW = new GameWin(this.Level, this.Score, this.musicOn);
        gEngine.Core.startScene(GW);  
    }
    else if(this.levelwin){
        var LC = new LevelComplete(this.Level, this.Lives, this.Score, this.musicOn);
        gEngine.Core.startScene(LC);
    }
    else{
    var DS = new DeathScreen(this.Level, this.Lives, this.Score, this.musicOn);
        gEngine.Core.startScene(DS);
    }
};
   
MyGame.prototype.initialize = function ()
{
  // Step 0: adjust the gravity
    gEngine.Physics.setSystemAcceleration(0, -80); // double default gravity
  // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 37.5), // position of the camera
        150,                     // width of camera
        [300, 0, 800, 600]       // viewport (orgX, orgY, width, height)
    );
      
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray
            
     // Step B: set up the minimap camera
    this.mMini = new Camera(
        vec2.fromValues(50, 37.5), // position of the camera
        250,                     // width of camera
        [0, 0, 300, 300]       // viewport (orgX, orgY, width, height)
    );
    
    this.mMini.setBackgroundColor([0.7, 0.7, 0.7, 1]);
            // sets the background to gray
            
     // Step C: set up the Score stats Camera
    this.mScore = new Camera(
        vec2.fromValues(-50, 37.5), // position of the camera
        100,                     // width of camera
        [0, 300, 300, 300]       // viewport (orgX, orgY, width, height)
    );
    
    this.mScore.setBackgroundColor([0.6, 0.6, 0.6, 1]);
            // sets the background to gray
    
    
    
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
      
      //INIT STATS VARIABLES

      this.LevelTime=180;      // default time, should be overwritten by loadLevel
      this.TimeLeft=this.LevelTime;
      
      //INIT MESSAGES
    this.mMsg = new FontRenderable("Status Message TEST");
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(5, 7);
    this.mMsg.setTextHeight(3);
       
    
    this.mShapeMsg = new FontRenderable("Level "+this.Level);
    this.mShapeMsg.setColor([0, 0, 0, 1]);
    this.mShapeMsg.getXform().setPosition(5, 73);
    this.mShapeMsg.setTextHeight(2.5);
    
    this.mScoreMsg = new FontRenderable("Lives: ");
    this.mScoreMsg.setColor([.8, 0, 0, 1]);
    this.mScoreMsg.getXform().setPosition(-95, 73);
    this.mScoreMsg.setTextHeight(10);
    
    this.mScoreMsg2 = new FontRenderable("Time: ");
    this.mScoreMsg2.setColor([.8, 0, 0, 1]);
    this.mScoreMsg2.getXform().setPosition(-95, 60);
    this.mScoreMsg2.setTextHeight(10);
    
    this.mScoreMsg3 = new FontRenderable("Score: ");
    this.mScoreMsg3.setColor([.8, 0, 0, 1]);
    this.mScoreMsg3.getXform().setPosition(-95, 47);
    this.mScoreMsg3.setTextHeight(10);
    

  this.mHero = new Penguin(this, this.kHeroSprite, 50, 47.5);

  this.mHero.initialize();
  this.setCameraFollowTarget(this.mHero);

  var sets = [this.mObjects,this.mNonWalls];
  
  
  for(var i=0; i<sets.length; i++)
  {
    sets[i].addToSet(this.mHero);
  }
  
  if(this.Level==0){
    this.LoadDemoLevel();
  }
    
  else if(this.Level==1){
    this.LoadLevel1();   
  }
  else if(this.Level==2){
    this.LoadLevel2();   
  }
    else if(this.Level==3){
    this.LoadLevel3();   
  }
    else if(this.Level==4){
    this.LoadLevel4();   
  }
      else if(this.Level==5){
    this.LoadLevel5();   
  }
    
  console.log(this.mObjects);
  console.log(this.mNonWalls);
  
  // calculate lowest object
  for(var i=0; i<this.mObjects.size(); i++)
  {
      if(this.mObjects.getObjectAt(i).getXform().getPosition()[1] < this.mLowestObject)
      {
          this.mLowestObject = this.mObjects.getObjectAt(i).getXform().getPosition()[1];
      }
  }
  
  //start music
  if(this.musicOn){
    gEngine.AudioClips.playBackgroundAudio(this.lvl1Music);
  }
  };

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.

MyGame.prototype.draw = function ()
{
  gEngine.Core.clearCanvas([1,1,1,1]);
  
    
    //MAIN CAMERA-----------------
    this.mCamera.setupViewProjection();
    this.mBg.draw(this.mCamera);
    
    this.mObjects.draw(this.mCamera);
  
    if(this.mMessages!=null){
       this.mMessages.draw(this.mCamera);
    }
  //this.mHero.mRigidBody.draw(this.mCamera);
  //this.mMsg.draw(this.mCamera);   // only draw status in the main camera
  //this.mShapeMsg.draw(this.mCamera);
  
  //this.mEnemy.draw(this.mCamera); 
   
   //MINI MAP CAM----------------------------------
   
    this.mMini.setupViewProjection();
    this.mBg.draw(this.mMini);
    //this.mHero.mRigidBody.draw(this.mMini);
    //this.mEnemy.draw(this.mMini); 
    this.mObjects.draw(this.mMini);
    
    
    // STATS CAM-------------------------
    this.mScore.setupViewProjection();
    this.drawStats(this.mScore);
     
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function ()
{
  this.mObjects.update();
  // delete enemies that have been terminated
  var sets = [this.mObjects,this.mNonWalls];
  
  for(var j=0; j<sets.length; j++)
  {
    for(var i=0; i<sets[j].size(); i++)
    {
      var a = sets[j].getObjectAt(i);
      if(a.terminate)
      {
        if(a.iscoin){
           gEngine.AudioClips.playACue(this.coin);
        }else{
            gEngine.AudioClips.playACue(this.break);
        }
        sets[j].removeFromSet(a);
         i--;
      }
    }
  }

  // check if the penguin has a platform he's standing on      

  var ci = new CollisionInfo;
  var fullNormal = [0,0];
  var currentNormal = 2; // we're looking for the lowest one (steepest ramp), so start with one 
                         // impossibly high
  this.mHero.resetPhysics();

  //console.log("begin check");
  for(var i=0; i<this.mObjects.size(); i++)
  {
    var a = this.mObjects.getObjectAt(i);
    if (a.getRigidBody() !== null) {
        if(a.mSolid && 
           this.mHero.getRigidBody().collisionTest(a.getRigidBody(),ci) &&
           Math.abs(ci.getNormal()[1]) > Math.cos(this.mHero.mMaxSlideableAngle * Math.PI/180) &&
           ci.getNormal()[1] > 0)
        {
          //console.log(Math.atan2(ci.getNormal()[1],ci.getNormal()[0]) * 180/Math.PI);
          if(currentNormal > Math.abs(ci.getNormal()[1]))
          {
            // if the current one is greater than the one we just found, update it
            currentNormal = Math.abs(ci.getNormal()[1]);
            fullNormal = [ci.getNormal()[0], ci.getNormal()[1]];
            //console.log("adding ",fullNormal);
          }
        }
    }
  }
  //console.log("end check");

  // currentNormal is at this point the normal for our steepest standable/slidable platform
  // if it's valid (we actually found a platform) and it's standable, stand on it
  if(currentNormal <= 1)
  {
    //console.log("landing ",Math.atan2(fullNormal[1],fullNormal[0]) * 180/Math.PI);
    if(currentNormal > Math.cos(this.mHero.mMaxStandableAngle * Math.PI / 180))
        this.mHero.land(fullNormal);
    else
        this.mHero.setFloorNormal(fullNormal);
  }
  // if it's not standable, just do nothing, physics will take care of sliding for us
  
  // check collisions manually
  for(var i=0; i<this.mNonWalls.size(); i++)
  {
    for(var j=0; j<this.mObjects.size(); j++)
    {
      var a = this.mNonWalls.getObjectAt(i);
      var b = this.mObjects.getObjectAt(j);
      if(a !== b && a.getRigidBody() !== null && b.getRigidBody() !== null &&
         a.getRigidBody().collisionTest(b.getRigidBody(),ci))
      {
        if(typeof a.collision === "function") a.collision(b,ci);
        if(typeof b.collision === "function")
        {
          b.getRigidBody().collisionTest(a.getRigidBody(),ci);
          b.collision(a,ci);
        }
      }
    }
  }

  //gEngine.Physics.processCollisionPair(this.mObjects,this.mNonWalls,null);
  gEngine.Physics.processCollision(this.mObjects,null);
    //

    
    //UpdateTimer
    this.TimeLeft=this.TimeLeft-1/60;
    
    //debugging message
    //this.mMsg = new FontRenderable("Status Message WALL HIT: "+this.wall1.Hit);
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(5, 7);
    this.mMsg.setTextHeight(3);
    
    
    //update cameras
    this.updateCamera();
    this.updateStatsCamera();
    this.updateMiniCam();
    
    //update lightsources
    
    if(this.spotlight!=null){
        
        this.spotlight.setXPos(this.mHero.getXform().getXPos());
        this.spotlight.setYPos(this.mHero.getXform().getYPos());
        
    }

    
    //Cheat CODES
      if(gEngine.Input.isKeyClicked(gEngine.Input.keys.V))
    {
      this.winLevel();
    }
   
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.N) && gEngine.Input.isKeyPressed(gEngine.Input.keys.M))
    {
      this.winGame();
    }
    
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.Z))
    {
      this.shakeCamera();
    }
  
    if(this.TimeLeft<=0){
        this.mHero.die();
    }
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.M))
    {
    this.toggleMusic();
    }
    
    
};

MyGame.prototype.shakeCamera = function()
{
    this.mCamera.shake(-5, -5, 30, 40);
};

MyGame.prototype.addScore = function(s)
{
  this.Score += s;  
};

MyGame.prototype.winLevel = function()
{
  this.levelwin=true;

    this.talleyScore();
    
    if(this.Level===5){
        this.Score+=100*this.Lives //extra points for lives remaining
        this.winGame();
        return;
    }
    
 gEngine.GameLoop.stop();   
}

MyGame.prototype.winGame = function()
{
  this.win=true;

 gEngine.GameLoop.stop();   
}

MyGame.prototype.talleyScore=function(){
  this.addScore(this.TimeLeft*3);
};

MyGame.prototype.toggleMusic = function()
{
   if(this.musicOn){
       this.musicOn=false;
       gEngine.AudioClips.stopBackgroundAudio();     
   }
   else{
       this.musicOn=true;
       gEngine.AudioClips.playBackgroundAudio(this.lvl1Music);
   }
};