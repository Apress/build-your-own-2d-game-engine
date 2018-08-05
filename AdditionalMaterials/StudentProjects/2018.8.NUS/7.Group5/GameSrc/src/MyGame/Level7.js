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

function Level7() {
       
    this.kPlatformTexture = "assets/platform.png";
    this.kSquare="assets/box.png";
    this.kCloud="assets/cloud.png";
    this.kCloud1="assets/cloud1.png";
    this.kBallon="assets/ballon.png";
    this.kStair="assets/stair.png";
    this.kStone="assets/stone.png";
    this.kSign="assets/xlys.png";
    this.kRoad="assets/Road.png";
    this.kCloud_t="assets/cloud_t.png";
    this.kSquare_t="assets/square_t.png";
    this.kHeroSprite="assets/hero_sprite.png";
    this.kBg="assets/background.png";
    this.kSquare_h="assets/square_h.png";
    this.kPlayagain="assets/tips.png";
    this.klevel1pic = "assets/level8pic.png";
    this.kEnemy="assets/enemy_sprite.png";
    this.kArrow="assets/arrow.png";
   
    this.mState=2;
    this.boxstate=0;
    this.showsquare=0;
    this.isdead=0;
    this.time1=0;
    this.time2=201;
    this.time= new Date();
    this.flag=false;
    this.wait2s = 0;
    
    this.mSquare=null;
    this.mStair1=null;
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
    //this.mSquaret=null;
    this.mPlayagain = null;
    this.mlevel1pic = null;
    this.mEnemy1=null;
    this.mEnemy2=null;
    
    this.mAllObjs = null;
    this.mNonRigid=null;
    
    
    this.mCamera = null;
    
    this.mPlatform=null;
    this.mPlatform1=null;
    this.mPlatform2=null;
    this.mPlatform3=null;
    this.mPlatform4=null;
    this.mPlatform5=null;
    this.mPlatform6=null;
    
    this.mMsg = null;
    this.mMsg1 = null;
    this.mMsg2 = null;
    this.mMsg3 = null;
    this.mMsg4 = null;
    this.mMsg5 = null;
    this.mMsg6 = null;
    
    this.mHelpMsg = null;


   
    
}
gEngine.Core.inheritPrototype(Level7, Scene);


Level7.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kPlatformTexture);
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
    gEngine.Textures.loadTexture(this.klevel1pic); 
    gEngine.Textures.loadTexture(this.kEnemy);
    gEngine.Textures.loadTexture(this.kArrow);
};

Level7.prototype.unloadScene = function () {
    
    gEngine.Textures.unloadTexture(this.kPlatformTexture);
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
    gEngine.Textures.unloadTexture(this.klevel1pic);
    gEngine.Textures.unloadTexture(this.kEnemy);
    gEngine.Textures.unloadTexture(this.kArrow);
    
    var nextlevel=null;
    if(this.mHero.sta===1)
        {nextlevel=new End();}
    if(this.mHero.sta===2)
        {nextlevel=new Level7();}
    if(this.mHero.sta===3)
        {nextlevel=new ChooseLevel();}    
    gEngine.Core.startScene(nextlevel);
    
    
};

Level7.prototype.initialize = function () {
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
    this.mSquare=new Square(this.kSquare,45,37,5,5);
    this.mSquare1=new Square(this.kSquare,55,47,5,5);
    this.mBallon=new Ballon(this.kBallon,10,35,5,10);
    this.mSign=new Sign(this.kSign,15,55,24,8);
    this.mStair=new Stair(this.kStair,94,33,10,13);
    this.mStair1= new Stair(this.kStair,-50,104,10,13);
    this.mStone=new Stone(this.kStone,72,35,17,17);
    this.mHero=new Hero2(this.kHeroSprite);
    this.mRoad1=new Road(this.kRoad,-18,14,88,26);
    this.mRoad2=new Road(this.kRoad,80,14,85,26);
    this.mCloudt=new Cloud_t(this.kCloud_t,65,54.5,18,10.2);
    //this.mSquaret=new Squaret(this.kSquare_h,45,37,4.8,4.8);
    this.mPlayagain = new Playagain(this.kPlayagain,50,40,40,20);
    this.mlevel1pic = new Playagain(this.klevel1pic,50,40,40,20);
    this.mSquare2=new Square(this.kArrow,86.63,-37.5,5,5);
    
    this.mPlatform=new Platform(this.kPlatformTexture,-15,38,20,1.5);
    this.mPlatform1=new Platform(this.kPlatformTexture,-25,48,20,1.5);
    
    this.mPlatform2=new Platform(this.kPlatformTexture,-42,58,12,1.5);
    this.mPlatform3=new Platform(this.kPlatformTexture,-36,68,12,1.5);
    this.mPlatform4=new Platform(this.kPlatformTexture,-48,78,10,1.5);
    this.mPlatform5=new Platform(this.kPlatformTexture,-60,88,18,1.5);
    this.mPlatform6=new Platform(this.kPlatformTexture,-50,98,12,1.5);
    
    
    this.mPlatform2.setSpeed(0.1);
    this.mPlatform3.setSpeed(-0.1);
    this.mPlatform4.setSpeed(0.1);
    this.mPlatform5.setSpeed(-0.1);
    this.mPlatform6.setSpeed(0.1);
    
    this.mEnemy1=new Enemy(this.kEnemy,-60,91,5,5);
    

    this.mEnemy1.setCurrentFrontDir([1,0]);
    this.mEnemy1.setSpeed(0.15);
    
    this.mSquare2.setSpeed(0);
    this.mSquare2.isfake=1;
    this.mHero.isfake=1;
    
    this.mCloudt.setVisibility(0);
    //this.mSquaret.setVisibility(0);
    this.mPlayagain.setVisibility(0);
    
    

    this.mAllObjs.addToSet(this.mStone);
    this.mAllObjs.addToSet(this.mSquare);
    this.mAllObjs.addToSet(this.mSquare1);
    this.mAllObjs.addToSet(this.mSquare2);
    //this.mAllObjs.addToSet(this.mSquaret);
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


    

    
    this.mNonRigid.addToSet(this.mSign);
    this.mNonRigid.addToSet(this.mCloud1);
    this.mNonRigid.addToSet(this.mCloudt);
    this.mNonRigid.addToSet(this.mCloud);
    this.mNonRigid.addToSet(this.mBallon);
    this.mNonRigid.addToSet(this.mStair);
    this.mNonRigid.addToSet(this.mStair1);
    this.mNonRigid.addToSet(this.mEnemy1);
           
    
    
    this.mMsg = new FontRenderable("Heavy");
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(70, 35);
    this.mMsg.setTextHeight(2);
    
    this.mLevelMsg = new FontRenderable("Level 8");
    this.mLevelMsg.setColor([0, 0, 0, 1]);
    this.mLevelMsg.getXform().setPosition(94, 58);
    this.mLevelMsg.setTextHeight(1.5);
  
    this.mHelpMsg = new FontRenderable("Go right till the end,then go back");
    this.mHelpMsg.setColor([0, 0, 0, 1]);
    this.mHelpMsg.getXform().setPosition(50, -26);
    this.mHelpMsg.setTextHeight(2);
    

};



Level7.prototype.moveplatform=function(){
    
    if(this.mPlatform2.getXform().getXPos()>-32)
        this.mPlatform2.setSpeed(-0.1);
    if(this.mPlatform2.getXform().getXPos()<-52)
        this.mPlatform2.setSpeed(0.1);
    
    if(this.mPlatform3.getXform().getXPos()>-40)
        this.mPlatform3.setSpeed(-0.1);
    if(this.mPlatform3.getXform().getXPos()<-62)
        this.mPlatform3.setSpeed(0.1);
    
    if(this.mPlatform4.getXform().getXPos()>-25)
        this.mPlatform4.setSpeed(-0.1);
    if(this.mPlatform4.getXform().getXPos()<-48)
        this.mPlatform4.setSpeed(0.1);
    
    if(this.mPlatform5.getXform().getXPos()>-28)
        this.mPlatform5.setSpeed(-0.1);
    if(this.mPlatform5.getXform().getXPos()<-65)
        this.mPlatform5.setSpeed(0.1);    
    
    if(this.mPlatform6.getXform().getXPos()>-32)
        this.mPlatform6.setSpeed(-0.1);
    if(this.mPlatform6.getXform().getXPos()<-52)
        this.mPlatform6.setSpeed(0.1);
    
    var x5=this.mPlatform5.getXform().getXPos();
     
    if(this.mEnemy1.getXform().getXPos()>x5+8)
        this.mEnemy1.setSpeed(-0.15);
    if(this.mEnemy1.getXform().getXPos()<x5-8)
        this.mEnemy1.setSpeed(0.15);
        
};



Level7.prototype.draw = function () {
    // Step A: clear the canvas

    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    
    
    
    this.mNonRigid.draw(this.mCamera);
    this.mAllObjs.draw(this.mCamera);
    
    this.mMsg.draw(this.mCamera);  
    this.mLevelMsg.draw(this.mCamera);  
    this.mHelpMsg.draw(this.mCamera);
    
    this.mPlayagain.draw(this.mCamera);
    this.mlevel1pic.draw(this.mCamera);
};


Level7.prototype.update = function () {
    
    this.moveplatform();
    this.mStair1.getXform().setXPos(this.mPlatform6.getXform().getXPos());
    this.mStair1.getXform().setYPos(this.mPlatform6.getXform().getYPos()+6);
       
    
    if(this.wait2s < 60)
        this.wait2s +=1;
    else
        this.mlevel1pic.setVisibility(0);
     
     this.mCamera.update();
     console.log(this.time1,this.time2);
    this.mAllObjs.update(this.mCamera);    
    gEngine.Physics.processCollision(this.mAllObjs, []);
    this.mNonRigid.update(this.mCamera);   
    
    var xform = this.mHero.getXform();
    var xpos = xform.getXPos();
    var ypos = xform.getYPos();
    
    if(
            xpos>this.mPlatform6.getXform().getXPos()-3 && 
            xpos<this.mPlatform6.getXform().getXPos()+3 &&
            ypos>101.5 &&
            ypos<102.5
      )
    {
        this.mHero.sta=1;
        gEngine.GameLoop.stop();
    }
    
    if(
            xpos>this.mEnemy1.getXform().getXPos()-1 && 
            xpos<this.mEnemy1.getXform().getXPos()+1 &&
            ypos>91.5 &&
            ypos<92.5
      )
      
    {
        this.mHero.sta=2;
        this.isdead=1;
    }
    console.log(xpos,ypos);
    
    
    
    
    
    
    var v=this.mHero.getRigidBody().getVelocity();
    
    
    
    if(xpos>92)
    {
        this.mSquare2.getXform().setXPos(86.63);
        this.mSquare2.getXform().setYPos(37);
        this.boxstate=1;
        this.mHero.istemple=1;
    }
    
    

    if(xpos>=99)
        this.mHero.getXform().setXPos(99);

    
    if(this.boxstate)
        this.mCamera.panWith(this.mHero.getXform(), 0.8);
        
    this.mCamera.update();  
    

    this.mBallon.rotateObjPointTo(this.mHero.getXform().getPosition(), 1,5);
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.H)) {
        this.mHelpMsg.getXform().setYPos(26);
        
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.C)) {
        this.mHero.sta=3;
        gEngine.GameLoop.stop();
    }
    var xsquare=this.mSquare.getXform().getXPos();
    //if(xpos>xsquare-2 && xpos<xsquare+2 && ypos===31.25)
    //{
        //this.mSquare.setVisibility(0);
        //this.mSquaret.setYPos(-100);
        //this.mSquaret.setVisibility(1);
        
    //}
        
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