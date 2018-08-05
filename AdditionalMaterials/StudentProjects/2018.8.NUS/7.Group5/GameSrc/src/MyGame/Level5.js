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

function Level5() {
       
    this.kPlatformTexture = "assets/platform.png";
    this.kWallTexture = "assets/wall.png";
    this.kTargetTexture = "assets/target.png";
    this.kSquare="assets/box.png";
    this.kCloud="assets/cloud.png";
    this.kCloud1="assets/cloud1.png";
    this.kBallon="assets/ballon.png";
    this.kStair="assets/stair.png";
    this.kStone="assets/stone.png";
    this.kSign="assets/lthy.png";
    this.kRoad="assets/Road.png";
    this.kCloud_t="assets/cloud_t.png";
    this.kSquare_t="assets/square_t.png";
    this.kHeroSprite="assets/hero_sprite.png";
    this.kBg="assets/background.png";
    this.kEnemy="assets/enemy_sprite.png";
    this.kPlayagain="assets/tips.png";
    this.klevel1pic="assets/level6pic.png";
    
    this.mState=0;
    this.once=0;
    this.heightstate=0;
    this.count=3;
    
    this.mPlatform=null;
    this.mPlatform1=null;
    this.mPlatform2=null;
    this.mPlatform3=null;
    this.mPlatform4=null;
    this.mPlatform5=null;
    this.mPlatform6=null;
    this.mPlatform7=null;
    this.mPlatform8=null;
    this.mPlatform9=null;
    this.mPlatform10=null;
    
    this.mEnemy=null;
    this.mEnemy1=null;
    this.mEnemy2=null;
    this.mEnemy3=null;
    this.mEnemy4=null;
    
    this.mSquare=null;
    this.mCloud=null;
    this.mCloud1=null;
    this.mBallon=null;
    this.mRoad1=null;
    this.mRoad2=null;
    this.mStone=null;
    this.mStair=null;
    this.mSign=null;
    this.mHero= null;
    this.mBg=null;
    this.mCloudt=null;
    this.mSquaret=null;
    this.mPlayagain=null;
    this.mlevel1pic=null;
    
    
    this.mAllObjs = null;
    this.mNonRigid=null;
    
    
    this.mCamera = null;

    this.mMsg = null;
    this.mLevelMsg = null;
    
    this.mHelpMsg = null;
    
    this.isdead=0;
    this.time1=0;
    this.time2=201;
    this.time= new Date();
    this.waitforkey = 0;
    this.wait2s = 0;

   
    
}
gEngine.Core.inheritPrototype(Level5, Scene);


Level5.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kPlatformTexture);
    gEngine.Textures.loadTexture(this.kWallTexture);
    gEngine.Textures.loadTexture(this.kTargetTexture);
    gEngine.Textures.loadTexture(this.kSquare);
    gEngine.Textures.loadTexture(this.kCloud);
    gEngine.Textures.loadTexture(this.kCloud1);
    gEngine.Textures.loadTexture(this.kBallon);
    gEngine.Textures.loadTexture(this.kStair);
    gEngine.Textures.loadTexture(this.kStone);
    gEngine.Textures.loadTexture(this.kSign);
    gEngine.Textures.loadTexture(this.kHeroSprite);
    gEngine.Textures.loadTexture(this.kRoad);
    gEngine.Textures.loadTexture(this.kCloud_t);
    gEngine.Textures.loadTexture(this.kSquare_t);
    gEngine.Textures.loadTexture(this.kEnemy);
    gEngine.Textures.loadTexture(this.kPlayagain);
    gEngine.Textures.loadTexture(this.klevel1pic);
};

Level5.prototype.unloadScene = function () {
    
    gEngine.Textures.unloadTexture(this.kPlatformTexture);
    gEngine.Textures.unloadTexture(this.kWallTexture);
    gEngine.Textures.unloadTexture(this.kTargetTexture);
    gEngine.Textures.unloadTexture(this.kSquare);
    gEngine.Textures.unloadTexture(this.kCloud);
    gEngine.Textures.unloadTexture(this.kCloud1);
    gEngine.Textures.unloadTexture(this.kBallon);
    gEngine.Textures.unloadTexture(this.kStair);
    gEngine.Textures.unloadTexture(this.kStone);
    gEngine.Textures.unloadTexture(this.kSign);
    gEngine.Textures.unloadTexture(this.kHeroSprite);
    gEngine.Textures.unloadTexture(this.kRoad);
    gEngine.Textures.unloadTexture(this.kCloud_t);
    gEngine.Textures.unloadTexture(this.kSquare_t);
    gEngine.Textures.unloadTexture(this.kEnemy);
    gEngine.Textures.unloadTexture(this.kPlayagain);
    gEngine.Textures.unloadTexture(this.klevel1pic);
    
    var nextlevel=null;
    if(this.mHero.sta===1)
        {nextlevel=new Level4();}
    if(this.mHero.sta===2)
        {nextlevel=new Level5();}
    if(this.mHero.sta===3)
        {nextlevel=new ChooseLevel();}    
    gEngine.Core.startScene(nextlevel);
    
    
};

Level5.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        100,                     // width of camera
        [0, 0, 1500, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
      
    this.mAllObjs = new GameObjectSet();
    this.mNonRigid = new GameObjectSet();
    
    
    //this.createBounds();    
    this.mPlatform=new Platform(this.kPlatformTexture,32,62,12,1.5);
    this.mPlatform1=new Platform(this.kPlatformTexture,32-10,62+10,12,1.5);
    this.mPlatform2=new Platform(this.kPlatformTexture,32-10*2,62+10*2,12,1.5);
    this.mPlatform3=new Platform(this.kPlatformTexture,32,62+10*3,12,1.5);
    this.mPlatform4=new Platform(this.kPlatformTexture,32,62+10*4,12,1.5);
    this.mPlatform5=new Platform(this.kPlatformTexture,32,62+10*5,12,1.5);
    
    this.mPlatform6=new Platform(this.kPlatformTexture,32+20,62+10*5,12,1.5);
    this.mPlatform7=new Platform(this.kPlatformTexture,32+35,62+10*4,12,1.5);
    this.mPlatform8=new Platform(this.kPlatformTexture,32+35,62+10*6,12,1.5);
    this.mPlatform9=new Platform(this.kPlatformTexture,32+50,62+10*5,12,1.5);
    this.mPlatform10=new Platform(this.kPlatformTexture,70,92,50,1.5);
    
    this.mPlatform7.getXform().setRotationInDegree(90);
    this.mPlatform8.getXform().setRotationInDegree(90);
    
    this.mEnemy=new Enemy(this.kEnemy,32,65,5,5);
    this.mEnemy1=new Enemy(this.kEnemy,35,65+30,5,5);
    this.mEnemy2=new Enemy(this.kEnemy,35,65+40,5,5);
    this.mEnemy3=new Enemy(this.kEnemy,50,95,5,5);
    this.mEnemy4=new Enemy(this.kEnemy,90,95,5,5);
    
    this.mEnemy3.setSpeed(0.2);
    this.mEnemy4.setSpeed(-0.2);
    
    
    
    this.mCloud=new Cloud(this.kCloud,65,54.5,16,9.14);
    this.mCloud1=new Cloud_1(this.kCloud1,35,44,10,6.25);
    this.mSquare=new Square(this.kSquare,45,37,5,5);
    this.mSquare1=new Square(this.kSquare,55,48,5,5);
    this.mBallon=new Ballon(this.kBallon,10,35,5,10);
    this.mSign=new Sign(this.kSign,15,55,24,8);
    this.mStair=new Stair(this.kStair,94,33,10,13);
    this.mStone=new Stone(this.kStone,72,35,17,17);
    this.mHero=new Hero1(this.kHeroSprite);
    
    this.mRoad1=new Road(this.kRoad,12,14,28,26);
    this.mRoad2=new Road(this.kRoad,70,14,65,26);
    this.mCloudt=new Cloud_t(this.kCloud_t,65,54.5,18,10.2);
    this.mSquaret=new Squaret(this.kSquare_t,45,37,4.8,4.8);
    this.mSquaret.getRenderable().setElementUVCoordinate(0.15, 0.85,0.1,0.9);
    this.mPlayagain = new Playagain(this.kPlayagain, 50,40,40,20);
    this.mlevel1pic = new Playagain(this.klevel1pic,50,40,40,20);
    
    this.mCloudt.setVisibility(0);
    this.mSquaret.setVisibility(0);  
    this.mPlayagain.setVisibility(0);
    

    this.mAllObjs.addToSet(this.mStone);
    this.mAllObjs.addToSet(this.mSquare);
    this.mAllObjs.addToSet(this.mSquare1);
    this.mAllObjs.addToSet(this.mSquaret);
    this.mAllObjs.addToSet(this.mRoad1);
    this.mAllObjs.addToSet(this.mRoad2);
    this.mAllObjs.addToSet(this.mHero);
    this.mAllObjs.addToSet(this.mPlatform);
    this.mAllObjs.addToSet(this.mPlatform1);
    this.mAllObjs.addToSet(this.mPlatform2);
    this.mAllObjs.addToSet(this.mPlatform3);
    this.mAllObjs.addToSet(this.mPlatform4);
    this.mAllObjs.addToSet(this.mPlatform5);
    this.mAllObjs.addToSet(this.mPlatform6);
    this.mAllObjs.addToSet(this.mPlatform7);
    this.mAllObjs.addToSet(this.mPlatform8);
    this.mAllObjs.addToSet(this.mPlatform9);
    this.mAllObjs.addToSet(this.mPlatform10);
    
    
    this.mNonRigid.addToSet(this.mSign);
    this.mNonRigid.addToSet(this.mCloud1);
    this.mNonRigid.addToSet(this.mCloud);
    this.mNonRigid.addToSet(this.mBallon);
    this.mNonRigid.addToSet(this.mStair);
    this.mNonRigid.addToSet(this.mCloudt);
    this.mNonRigid.addToSet(this.mEnemy);
    this.mNonRigid.addToSet(this.mEnemy1);
    this.mNonRigid.addToSet(this.mEnemy2);
    this.mNonRigid.addToSet(this.mEnemy3);
    this.mNonRigid.addToSet(this.mEnemy4);
    
    
    this.mMsg = new FontRenderable("Heavy");
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(70, 35);
    this.mMsg.setTextHeight(2);
    
    this.mLevelMsg = new FontRenderable("Level 6");
    this.mLevelMsg.setColor([0, 0, 0, 1]);
    this.mLevelMsg.getXform().setPosition(90, 58);
    this.mLevelMsg.setTextHeight(1.5);
    
    this.mHelpMsg = new FontRenderable("UP!UP!UP!");
    this.mHelpMsg.setColor([0, 0, 0, 1]);
    this.mHelpMsg.getXform().setPosition(50, -26);
    this.mHelpMsg.setTextHeight(2);

};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
Level5.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
       

    
    // for now draw these ...
    /*for (var i = 0; i<this.mCollisionInfos.length; i++) 
        this.mCollisionInfos[i].draw(this.mCamera); */
    this.mCollisionInfos = []; 

    this.mNonRigid.draw(this.mCamera);
    this.mAllObjs.draw(this.mCamera);
    this.mPlayagain.draw(this.mCamera);
    this.mlevel1pic.draw(this.mCamera);
    
    this.mMsg.draw(this.mCamera);
    this.mLevelMsg.draw(this.mCamera);
    this.mHelpMsg.draw(this.mCamera);
    
};



// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!



Level5.prototype.patrol=function(aPlatform)
{
    aPlatform.setCurrentFrontDir(vec2.fromValues(1,0));
    var xpos=aPlatform.getXform().getXPos();
    var ypos=aPlatform.getXform().getYPos();
    if(xpos<50) 
        aPlatform.setSpeed(0.2);
    if(xpos>90) 
        aPlatform.setSpeed(-0.2);       
};

Level5.prototype.die=function(aEnemy)
{
    
    var xform = this.mHero.getXform();
    var xposh = xform.getXPos();
    var yposh = xform.getYPos();
    
    var xxform = aEnemy.getXform();
    var xpose = xxform.getXPos();
    var ypose = xxform.getYPos();
    var height = xxform.getHeight();
    var width = xxform.getWidth();
    
    
    if(
        (xposh>=xpose-width/2)
        && (xposh<=xpose+width/2)
        && (yposh>=ypose-height/2)
        && (yposh<=ypose+height/2)
        && !this.once
      )
    {
        this.mHero.sta=2;
        this.mHero.mode=10;
        this.isdead=1;
        this.time1=this.time.getMilliseconds();
        this.time2=this.time1; 
        this.once=1;
             
    }    
};


Level5.prototype.update = function () {
    if(this.wait2s < 60)
        this.wait2s +=1;
    else
        this.mlevel1pic.setVisibility(0);
    
   console.log("lbld"+this.mHero.mode);
     
     
    this.patrol(this.mEnemy3);
    this.patrol(this.mEnemy4);
     
     
     
    this.mCamera.update(); 
    /* 
    if(this.time2-this.time1===30)
     {
         gEngine.GameLoop.stop();
     }
     */
     
    this.mPlatform6.getXform().incRotationByDegree(-0.8);
    this.mPlatform7.getXform().incRotationByDegree(-0.8);
    this.mPlatform8.getXform().incRotationByDegree(-0.8);
    this.mPlatform9.getXform().incRotationByDegree(-0.8);
    
    
    this.mBallon.rotateObjPointTo(this.mHero.getXform().getPosition(), 1,5);
    var xform = this.mHero.getXform();
    var xpos = xform.getXPos();
    var ypos = xform.getYPos();
    console.log(xpos,ypos);
    
    
    if(xpos<1)
        this.mHero.getXform().setXPos(1);
    
    /*if(ypos>70)
    {
        this.mPlatform.getRigidBody().setFriction(0.1);
        this.mPlatform1.getRigidBody().setFriction(0.1);
        this.mPlatform2.getRigidBody().setFriction(0.1);
        this.mPlatform3.getRigidBody().setFriction(0.1);
        this.mPlatform4.getRigidBody().setFriction(0.1);
        this.mPlatform5.getRigidBody().setFriction(0.1);
        this.mPlatform6.getRigidBody().setFriction(0);
        this.mPlatform7.getRigidBody().setFriction(0);
        this.mPlatform8.getRigidBody().setFriction(0);
        this.mPlatform9.getRigidBody().setFriction(0);
        this.mPlatform10.getRigidBody().setFriction(0.1);
        this.mHero.getRigidBody().setFriction(0.1);
    }*/
    
    this.die(this.mEnemy);
    this.die(this.mEnemy1);
    this.die(this.mEnemy2);
    this.die(this.mEnemy3);
    this.die(this.mEnemy4);
    
    if(ypos>65.7)
        this.count+=1;
    if(this.count>=3)
        this.heightstate=1;
    
    if(xpos<=73 && xpos>=57 && ypos>51 && ypos<60 && !this.isdead) {
        this.mHero.sta=2;
        this.mCloudt.setVisibility(1);
        this.mHero.mode=10;
        this.isdead=1;
        this.time1=this.time.getMilliseconds();
        this.time2=this.time1;         
    }
       
    this.mAllObjs.update(this.mCamera);    
    gEngine.Physics.processCollision(this.mAllObjs, []);
    this.mNonRigid.update(this.mCamera);   
    
    var xsquare=this.mSquare.getXform().getXPos();
    
    if(xpos>xsquare-2 && xpos<xsquare+2 && ypos===31.25 && !this.isdead)
    {
        this.mHero.sta=2;
        this.mHero.mode=10;
        this.isdead=1;
        this.mHero.getRigidBody().setMass(0);
        this.mSquare.setVisibility(0);
        this.mSquaret.setVisibility(1);        
        this.time1=this.time.getMilliseconds();
        this.time2=this.time1;        
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.H)) {
        this.mHelpMsg.getXform().setYPos(26);   
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.C)) {
        this.mHero.sta=3;
        gEngine.GameLoop.stop();
    }
    if(this.heightstate)
        this.mCamera.panWith(this.mHero.getXform(), 0.9);
        
    this.mCamera.update();    
    
    if(ypos<=20 && !this.isdead) { 
        this.mHero.mode=10;
        this.isdead=1;
        this.mHero.sta=2;       
        this.time1=this.time.getMilliseconds();
        this.time2=this.time1;   
    }
    
    var cameraxpos = this.mCamera.getWCCenter();
    this.mPlayagain.getXform().setPosition(cameraxpos[0], cameraxpos[1]);
    
  if(this.isdead)
    {
        this.time2=this.time2+1;
        this.mHero.mode=10;
        this.mHero.getRigidBody().setMass(0);
        this.mPlayagain.setVisibility(1);
        if(gEngine.Input.isKeyClicked(gEngine.Input.keys.S)){
            gEngine.GameLoop.stop();
            this.mHero.sta=2;
        }
    }
    
};