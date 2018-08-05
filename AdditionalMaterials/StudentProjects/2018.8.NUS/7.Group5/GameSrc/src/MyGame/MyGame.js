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
       
    this.kPlatformTexture = "assets/platform.png";
    this.kWallTexture = "assets/wall.png";
    this.kTargetTexture = "assets/target.png";
    this.kSquare="assets/box.png";
    this.kCloud="assets/cloud.png";
    this.kCloud1="assets/cloud1.png";
    this.kBallon="assets/ballon.png";
    this.kStair="assets/stair.png";
    this.kStone="assets/stone.png";
    this.kSign="assets/sign.png";
    this.kRoad="assets/Road.png";
    this.kCloud_t="assets/cloud_t.png";
    this.kSquare_t="assets/square_t.png";
    this.kHeroSprite="assets/hero_sprite.png";
    this.kBg="assets/background.png";
    this.kSquare_h="assets/square_h.png";
    this.kPlayagain="assets/tips.png";
    
    this.kBgClip = "assets/sounds/BGClip.mp3";
    
    this.mState=2;
    this.isdead=0;
    this.time1=0;
    this.time2=201;
    this.time= new Date();
    this.flag=false;

    
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
    this.mPlayagain = null;
      
    this.mAllObjs = null;
    this.mNonRigid=null;
    
    
    this.mCamera = null;
    
    this.mMsg = null;
    
    this.mMsg2 = null;
    this.mMsg3 = null;
    this.mMsg4 = null;
    this.mMsg5 = null;
    this.mMsg6 = null;
    
    


   
    
}
gEngine.Core.inheritPrototype(MyGame, Scene);


MyGame.prototype.loadScene = function () {
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
    gEngine.Textures.loadTexture(this.kSquare_h);
    gEngine.Textures.loadTexture(this.kPlayagain);
            
};

MyGame.prototype.unloadScene = function () {
    
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
    gEngine.Textures.unloadTexture(this.kSquare_h);
    gEngine.Textures.unloadTexture(this.kPlayagain);
    
    
    var nextlevel=null;
    if(this.mHero.sta===1)
        {nextlevel=new ChooseLevel();}
    if(this.mHero.sta===2)
        {nextlevel=new MyGame();}
        
    gEngine.Core.startScene(nextlevel);
    
    
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        100,                     // width of camera
        [0, 0, 1500, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    gEngine.AudioClips.playBackgroundAudio(this.kBgClip);
      
    this.mAllObjs = new GameObjectSet();
    this.mNonRigid = new GameObjectSet();
    
    
    //this.createBounds();    
    
    this.mCloud=new Cloud(this.kCloud,65,54.5,16,9.14);
    this.mCloud1=new Cloud_1(this.kCloud1,35,44,10,6.25);
    this.mSquare=new Square(this.kSquare,45,37,5,5);
    this.mSquare1=new Square(this.kSquare,55,47,5,5);
    this.mBallon=new Ballon(this.kBallon,10,35,5,10);
    this.mSign=new Sign(this.kSign,15,55,24,8);
    this.mStair=new Stair(this.kStair,94,33,10,13);
    this.mStone=new Stone(this.kStone,72,35,17,17);
    this.mHero=new Hero(this.kHeroSprite);
    this.mRoad1=new Road(this.kRoad,12,14,28,26);
    this.mRoad2=new Road(this.kRoad,70,14,65,26);
    this.mCloudt=new Cloud_t(this.kCloud_t,65,55.5,18,10.2);
    this.mSquaret=new Squaret(this.kSquare_h,45,37,4.8,4.8);
    this.mPlayagain = new Playagain(this.kPlayagain,50,40,40,20);
    
   
    
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
    

    
    this.mNonRigid.addToSet(this.mSign);
    this.mNonRigid.addToSet(this.mCloud1);
    this.mNonRigid.addToSet(this.mCloudt);
    this.mNonRigid.addToSet(this.mCloud);
    this.mNonRigid.addToSet(this.mBallon);
    this.mNonRigid.addToSet(this.mStair);
           
    
    
    this.mMsg = new FontRenderable("Heavy");
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(70, 35);
    this.mMsg.setTextHeight(2);
    
    this.mMsg2 = new FontRenderable("use WAD to move");
    this.mMsg2.setColor([0, 0, 0.5, 1]);
    this.mMsg2.getXform().setPosition(50, 26);
    this.mMsg2.setTextHeight(2);
    
    this.mMsg3 = new FontRenderable("I want to find the treasure...");
    this.mMsg3.setColor([0, 0, 0, 1]);
    this.mMsg3.getXform().setPosition(3, 25);
    this.mMsg3.setTextHeight(2);
    
    this.mMsg4 = new FontRenderable("H for hint, yet try not to use that");
    this.mMsg4.setColor([0, 0, 0.5, 1]);
    this.mMsg4.getXform().setPosition(50, 22);
    this.mMsg4.setTextHeight(2);
    
    this.mMsg5 = new FontRenderable("MouseLeft pressed to move objects");
    this.mMsg5.setColor([0, 0, 0.5, 1]);
    this.mMsg5.getXform().setPosition(50, 24);
    this.mMsg5.setTextHeight(2);
    
    this.mMsg6 = new FontRenderable("");
    this.mMsg6.setColor([0, 0, 0, 1]);
    this.mMsg6.getXform().setPosition(94, 58);
    this.mMsg6.setTextHeight(1.5);
    
    gEngine.AudioClips.playBackgroundAudio(this.kBgClip);

};


MyGame.prototype.draw = function () {
    // Step A: clear the canvas

    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    
    this.mNonRigid.draw(this.mCamera);
    this.mAllObjs.draw(this.mCamera);
    this.mPlayagain.draw(this.mCamera);
    
    this.mMsg.draw(this.mCamera);
    
    this.mMsg.draw(this.mCamera);  
    
    this.mMsg2.draw(this.mCamera);
    this.mMsg3.draw(this.mCamera);
    this.mMsg4.draw(this.mCamera);
    this.mMsg5.draw(this.mCamera);
    this.mMsg6.draw(this.mCamera);
    
};


MyGame.prototype.update = function () {
     
     //console.log(this.time1,this.time2);
    this.mAllObjs.update(this.mCamera);    
    gEngine.Physics.processCollision(this.mAllObjs, []);
    this.mNonRigid.update(this.mCamera);   
    
    var xform = this.mHero.getXform();
    var xpos = xform.getXPos();
    var ypos = xform.getYPos();
    
    if(xpos>20) {
        this.mMsg3.setText("But the balloon is annoying...");
        //this.mMsg4.getXform().setYPos(25);
    }
    
    if(xpos>40) {
        this.mMsg3.setText("Please don't follow...");
    }
    
    if(xpos>50) {
        this.mMsg3.getXform().setYPos(-25);
    }

  this.mBallon.rotateObjPointTo(this.mHero.getXform().getPosition(), 1,5);
  

    var xsquare=this.mSquare.getXform().getXPos();
    if(xpos>xsquare-2 && xpos<xsquare+2 && ypos===31.25)
    {
        this.mSquare.setVisibility(0);
        this.mSquaret.setVisibility(1);
        
    }
        
    if(ypos<=20 && !this.isdead) { 
        this.mHero.mode=10;
        this.isdead=1;
        this.mHero.sta=2;       
        this.time1=this.time.getMilliseconds();
        this.time2=this.time1;   
    }
    
    if(this.isdead)
    {
        this.mHero.mode=10;
        this.mHero.getRigidBody().setMass(0);
        this.mPlayagain.setVisibility(1);
        if(gEngine.Input.isKeyClicked(gEngine.Input.keys.S)){
            gEngine.GameLoop.stop();
            this.mHero.sta=2;
        }
    }
        
    
    //console.log("ok"+this.isdead);
    
};