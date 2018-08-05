/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


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

function Level6() {
    
    
    this.kPlatformTexture = "assets/platform.png";
    this.kWallTexture = "assets/wall.png";
    this.kTargetTexture = "assets/target.png";
    this.kSquare="assets/rock.png";
    this.kCloud="assets/cloud.png";
    this.kCloud1="assets/cloud1.png";
    this.kBallon="assets/ballon.png";
    this.kStair="assets/stair.png";
    this.kStone="assets/stone.png";
    this.kSign="assets/gznm.png";
    this.kRoad="assets/Road.png";
    this.kCloud_t="assets/cloud_t.png";
    this.kSquare_t="assets/paper.png";
    this.kHeroSprite="assets/hero_sprite.png";
    this.kBg="assets/background.png";
    this.kPlayagain="assets/tips.png";
    this.klevel1pic="assets/level2pic.png";
    
    this.boxstate=0;
    this.boxstate1=0;
    
    this.mSquare=null;
    this.mCloud=null;
    this.mCloud1=null;
    this.mBallon=null;
    this.mRoad1=null;
    this.mRoad2=null;
    this.mStone=null;
    this.mStair=null;
    this.mSign=null;
    this.mHero = null;
    this.mBg=null;
    this.mCloudt=null;
    this.mSquaret=null;
    this.mPlayagain=null;
    this.mlevel1pic=null;
    
    
    this.mAllObjs = null;
    this.mNonRigid=null;
    
    
    this.mCamera = null;

    this.mMsg = null;
    this.mMsg2 = null;
    this.mLevelMsg = null;
    this.mHelpMsg = null;
    
    this.mFocusObj = null;
    
    this.isdead=0;
    this.time1=0;
    this.time2=201;
    this.time= new Date();
    this.wait2s = 0;
    
    this.ischange = 0;
    
}
gEngine.Core.inheritPrototype(Level6, Scene);


Level6.prototype.loadScene = function () {
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
    gEngine.Textures.loadTexture(this.kPlayagain);
    gEngine.Textures.loadTexture(this.klevel1pic);
};

Level6.prototype.unloadScene = function () {
    
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
    gEngine.Textures.unloadTexture(this.kPlayagain);
    gEngine.Textures.unloadTexture(this.klevel1pic);
    
    var nextlevel=null;
    if(this.mHero.sta===1) {
        nextlevel=new Level2();
    }
    if(this.mHero.sta===2) {
        nextlevel=new Level6();
    }
    if(this.mHero.sta===3)
        {nextlevel=new ChooseLevel();}    
    gEngine.Core.startScene(nextlevel);
    
    
};

Level6.prototype.initialize = function () {
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
    
    
    this.mCloud=new Cloud(this.kCloud,65,54.5,16,9.14);
    this.mCloud1=new Cloud_1(this.kCloud1,35,44,10,6.25);
    this.mSquare=new Squaret(this.kSquare_t,45,37,5,5);
    this.mSquare1=new Squaret(this.kSquare,55,47,5,5);
    this.mBallon=new Ballon(this.kBallon,10,35,5,10);
    this.mSign=new Sign(this.kSign,15,55,24,8);
    this.mStair=new Stair(this.kStair,94,33,10,13);
    this.mStone=new Stone(this.kStone,72,34,17,17);

    this.mCloudt=new Cloud_t(this.kCloud_t,65,54.5,18,10.2);
    this.mSquaret=new Squaret(this.kSquare_t,45,37,4.8,4.8);  
    this.mSquaret1 = new Squaret(this.kSquare_t,55,47,4.8,4.8);
    this.mPlayagain = new Playagain(this.kPlayagain,50,40,40,20);
    this.mlevel1pic = new Playagain(this.klevel1pic,50,40,40,20);
    
    this.mHero=new Hero2(this.kHeroSprite);
    


    
    this.mRoad1=new Road(this.kRoad,15,-19,30,92);
    this.mRoad2=new Road(this.kRoad,70,14,60,26);
    this.mRoad3=new Road(this.kRoad,100,-20,140,20);
    this.mRoad4=new Road(this.kRoad,120,0,5,5);
    this.mRoad5=new Road(this.kRoad,110,-7,5,5);
    this.mRoad6=new Road(this.kRoad,110,10,5,5);
    this.mRoad7=new Road(this.kRoad,105,18,5,5);
    
    
    
    this.mCloudt.setVisibility(0);
    this.mSquaret.setVisibility(0);
    this.mSquaret1.setVisibility(0);
    this.mPlayagain.setVisibility(0);

    this.mAllObjs.addToSet(this.mStone);
    this.mAllObjs.addToSet(this.mSquare);
    this.mAllObjs.addToSet(this.mSquare1);
    this.mAllObjs.addToSet(this.mSquaret);
    this.mAllObjs.addToSet(this.mSquaret1);
    this.mAllObjs.addToSet(this.mRoad1);
    this.mAllObjs.addToSet(this.mRoad2);
    this.mAllObjs.addToSet(this.mHero);
    
    
    
    this.mAllObjs.addToSet(this.mRoad3);
    this.mAllObjs.addToSet(this.mRoad4);
    this.mAllObjs.addToSet(this.mRoad5);
    this.mAllObjs.addToSet(this.mRoad6);
    this.mAllObjs.addToSet(this.mRoad7);

    
    
    this.mNonRigid.addToSet(this.mSign);
    this.mNonRigid.addToSet(this.mCloud1);
    this.mNonRigid.addToSet(this.mCloud);
    this.mNonRigid.addToSet(this.mBallon);
    this.mNonRigid.addToSet(this.mStair);
    this.mNonRigid.addToSet(this.mCloudt);
    
           
    
    
    this.mMsg = new FontRenderable("Heavy");
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(70, 35);
    this.mMsg.setTextHeight(2);
    
    this.mLevelMsg = new FontRenderable("Level 2");
    this.mLevelMsg.setColor([0, 0, 0, 1]);
    this.mLevelMsg.getXform().setPosition(94, 58);
    this.mLevelMsg.setTextHeight(1.5);
    
    this.mHelpMsg = new FontRenderable("stand on the upper block and follow it");
    this.mHelpMsg.setColor([0, 0, 0, 1]);
    this.mHelpMsg.getXform().setPosition(50, -26);
    this.mHelpMsg.setTextHeight(2);

};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
Level6.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    

    this.mCollisionInfos = []; 
    
    this.mNonRigid.draw(this.mCamera);
    this.mAllObjs.draw(this.mCamera);
    this.mPlayagain.draw(this.mCamera);
    this.mlevel1pic.draw(this.mCamera);
    
    this.mMsg.draw(this.mCamera);
    this.mLevelMsg.draw(this.mCamera);
    this.mHelpMsg.draw(this.mCamera);

};


Level6.prototype.update = function () {
    if(this.wait2s < 60)
        this.wait2s +=1;
    else
        this.mlevel1pic.setVisibility(0);
    
    
    this.mCamera.update();  

     
    // if(this.time2-this.time1===20)
    // {
    //     gEngine.GameLoop.stop();
    // }

    
     this.mBallon.rotateObjPointTo(this.mHero.getXform().getPosition(), 1,5);


    this.mCamera.update();
    
    var ypos=this.mHero.getXform().getYPos();

    
    this.mAllObjs.update(this.mCamera);    
    gEngine.Physics.processCollision(this.mAllObjs, []);
    this.mNonRigid.update(this.mCamera);   
    
    this.xsize = 20;
    this.ysize = 20;
    
    //this.mCamera.update();
    
    var xform = this.mHero.getXform();
    var xpos = xform.getXPos();
    var ypos = xform.getYPos();
    
    

    if(ypos<=21 && !this.isdead) 
        { 
            this.mHero.mode=10;
            this.isdead=1;
            this.mHero.sta=2;       
            this.time1=this.time.getMilliseconds();
            this.time2=this.time1;   
         }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.H)) {
        this.mHelpMsg.getXform().setYPos(25); 
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.C)) {
        this.mHero.sta=3;
        gEngine.GameLoop.stop();
    }
    if(xpos<=73 && xpos>=57 && ypos>51 && ypos<60 && !this.isdead) {
        this.flag=true;
        this.mHero.mode=10;
        this.mHero.sta=2;
        this.isdead=1;
        this.mCloudt.setVisibility(1);
        this.time1=this.time.getMilliseconds();
        this.time2=this.time1;       
        
    }
    
    
    var xsquare=this.mSquare.getXform().getXPos();
    var xsquare1 = this.mSquare1.getXform().getXPos();
    
    if(xpos>xsquare-2 && xpos<xsquare+2 && ypos===31.25)
    {
        this.boxstate=1;
        this.mSquare.setVisibility(0);
        this.mSquare.getXform().setYPos(-100);
        this.mSquaret.setVisibility(1);
        this.mSquaret.isfinal = 2;
        
    }
    if(xpos>xsquare1-2 && xpos<xsquare1+2 && ypos === 41.25 ){
        this.boxstate1 = 1;
        this.mSquare1.setVisibility(!this.boxstate1);
        this.mSquare1.getXform().setYPos(-100);
        this.mSquaret1.setVisibility(this.boxstate1);
        this.mSquaret1.isfinal = 3;
        
    }

    if(ypos > 52.64 && xpos <1.2){
        this.mHero.getXform().setXPos(98);
    }
    
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