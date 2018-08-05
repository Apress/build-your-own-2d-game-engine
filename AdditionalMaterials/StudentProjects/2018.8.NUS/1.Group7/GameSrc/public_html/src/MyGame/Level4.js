/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict";  // Operate in Strict mode such that variables must be declared before used!
const HeroDirection= {
    Up: 0,
    Right: 1,
    Down: 2,
    Left: 3
};

function Level4() {
    
    this.kSprite = "assets/animation.png";
    this.kHole = "assets/BlackHole.png";
    this.kRubbish="assets/2D_GAME_rubbish.png";
    this.kStar = "assets/yellow.png";
    this.kHero="assets/2D_GAME_boy_Level4.png";
    this.kTooth= "assets/tooth.png";
    this.kDoor= "assets/2D_GAME_door.png";
    this.kkeySpace="assets/keySpace2.png";
    this.kbg="assets/background.png";
    this.kCue="assets/Star.wav";
   // this.kBGM = "assets/Lopu.mp3";
    this.kback="assets/back.png";
    this.krestart="assets/restart.png";


    // The camera to view the scene
    this.mCamera = null;
    this.mCamera2=null;
    this.mCdead=null;
    
    this.mPlatformset = null;
    this.mRubbishset = null;
    this.mStarset = null;
    this.mAllObjs=  null;
    this.mCollisionInfos = [];
  
    this.mCurrentObj = 0;
    this.mHero = null;
    
    this.mCui = null;
    this.mStaritem = null;
    this.mMsg = null;
    
    this.size=0;
    this.flag=0;
    
    this.starcount = 0;
    this.totalcount = 8;
    
    this.restart = true;
    this.skip=false;
    this.mKeyNBar= null;
    this.time= 0;
    this.LastKeyNTime=0;
    this.KeyNCount=0;
    
    this.a=0;
    this.b=0;
    this.flag2=0;//0 for not begin
    
    this.isMoving= false;
    this.mHeroTargetPosX=0;
    this.mHeroTargetPosY=0;
    this.Movingtimetillnow=0;
    this.Movingdelta=15;
    this.Movingdirection=0;
    this.mHerofakewidth=0;
    this.mHerofakeheight=0;
    
    this.Hole1count=0;
    this.Hole1autodelta =4;
    this.Hole2count=0;
    this.Hole2autodelta =3;
    this.Hole3count=0;
    this.Hole3autodelta =-3;
    this.Hole4count=0;
    this.Hole4autodelta =-4;
    this.Hole5count=0;
    this.Hole5autodelta =6;
    this.Hole6count=0;
    this.Hole6autodelta =3;
     this.previousstarcount=0;
    this.died=0;
}

gEngine.Core.inheritPrototype(Level4, Scene);


Level4.prototype.loadScene = function () {
     
    gEngine.Textures.loadTexture(this.kSprite);
    gEngine.Textures.loadTexture(this.kHole);
    gEngine.Textures.loadTexture(this.kRubbish);
    gEngine.Textures.loadTexture(this.kStar);
    gEngine.Textures.loadTexture(this.kHero);
    gEngine.Textures.loadTexture(this.kTooth);
    gEngine.Textures.loadTexture(this.kDoor);
    gEngine.Textures.loadTexture(this.kkeySpace);
    gEngine.Textures.loadTexture(this.kbg);
    gEngine.AudioClips.loadAudio(this.kCue);
   // gEngine.AudioClips.playBackgroundAudio(this.kBGM);
    gEngine.Textures.loadTexture(this.kback);
    gEngine.Textures.loadTexture(this.krestart);
if(gEngine.ResourceMap.isAssetLoaded("level4")){
        this.previousstarcount = gEngine.ResourceMap.retrieveAsset("level4");
    }


};

Level4.prototype.unloadScene = function () {
    
    gEngine.Textures.unloadTexture(this.kSprite);
    gEngine.Textures.unloadTexture(this.kHole);
    gEngine.Textures.unloadTexture(this.kRubbish);
    gEngine.Textures.unloadTexture(this.kStar);
    gEngine.Textures.unloadTexture(this.kHero);
    gEngine.Textures.unloadTexture(this.kTooth);
    gEngine.Textures.unloadTexture(this.kDoor);
     gEngine.Textures.unloadTexture(this.kkeySpace);
     gEngine.Textures.unloadTexture(this.kbg);
     gEngine.AudioClips.unloadAudio(this.kCue);
     gEngine.Textures.unloadTexture(this. krestart);
     gEngine.Textures.unloadTexture(this.kback);


   //  gEngine.AudioClips.stopBackgroundAudio();
    
    if(this.skip)
      {   
         var nextLevel =new Level5();
         //var nextLevel =new PassScene(4,this.starcount);
         gEngine.ResourceMap.loadstar("level4",8);
         gEngine.Core.startScene(nextLevel);
      }
      else{
          if(this.restart){
               var nextLevel =new Level4();
               gEngine.Core.startScene(nextLevel);
           }
           else{
                var nextLevel =new PassScene(4,this.starcount);
                if(this.starcount>this.previousstarcount){
                    gEngine.ResourceMap.loadstar("level4",this.starcount);
                }
                gEngine.Core.startScene(nextLevel);
           }
      }
    //gEngine.ResourceMap.asyncLoadRequested()("Cui",this.mCui);
   
};


Level4.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(400, 150), // position of the camera
       400,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
     this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
     
     this.mCamera2= new Camera(
        vec2.fromValues(400, 300), // position of the camera
        320,                     // width of camera
        [728, 480, 64, 120]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera2.setBackgroundColor([0.9, 0.9, 0.9, 0.1]); 
        
    this.mCui = new Camera(
            vec2.fromValues(this.mCamera.mCameraState.getCenter()[0]-370, this.mCamera.mCameraState.getCenter()[1]+270),
            60,
            [0,510,90,90]);
  
    this.mCdead = new Camera(
            this.mCamera.mCameraState.getCenter(),
            200,
            [200,150,400,300]);
    this.mCdead.setBackgroundColor([0.705, 0.443, 0.341, 0.5 ]);
    

            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    this.mbg = new TextureRenderable(this.kbg);
    this.mbg.getXform().setPosition(400,300);
    this.mbg.getXform().setSize(800,600);
    this.mMsg2 = new FontRenderable("Level 4");
    this.mMsg2.setColor([222/255, 212/255, 173/255, 1]);
    this.mMsg2.getXform().setPosition(10,50);
    this.mMsg2.setTextHeight(12);
    
    this.mMsg3 = new FontRenderable("Target:6");
    this.mMsg3.setColor([0.2, 0.2, 0.2, 1]);
    this.mMsg3.getXform().setPosition(7,22);
    this.mMsg3.setTextHeight(10);
    this.mMsg4 = new FontRenderable("Total :8");
    this.mMsg4.setColor([0.2, 0.2, 0.2, 1]);
    this.mMsg4.getXform().setPosition(7,10);
    this.mMsg4.setTextHeight(10);
    
    this.mMsg = new FontRenderable("Now   :0");
    this.mMsg.setColor([0.2, 0.2, 0.2, 1]);
    this.mMsg.getXform().setPosition(8,33);
    this.mMsg.setTextHeight(10);
    
    
    
    
    this.mPlatformset = new GameObjectSet(); 
    this.mRubbishset = new GameObjectSet(); 
    this.mStarset = new GameObjectSet(); 
    
    this.mAllObjs= new GameObjectSet();
    
    this.mHero=new  Level4Hero(this.kHero, 420,50,  25, 25,0);
    this.mHerofakewidth=25;
    this.mHerofakeheight=25;
    this.mHeroTargetPosX=this.mHero.getXform().getXPos();
    this.mHeroTargetPosY=this.mHero.getXform().getYPos();
    //this.mHero.setBoundRadius(30);
    this.initializePlatformset();
    var heroXform= this.mHero.getXform();
    this.mRay=new Ray(heroXform,4,400,0,this.mPlatformset,null);//400,20,25,25 hero
   
   
   // this.mRubbish=new Item(450,650,0,60,60,this.kRubbish);
    //this.mRubbishset.addToSet(this.mRubbish);
    
    this.mDoor=new Item(300,550,0,40,40,this.kDoor);
    this.initializeToothset();
    this.initializeHoleset();
    this.initializeGuideobj();
    
    this.mStar1 = new Star(this.kSprite,320,80,20,20);
    this.mStarset.addToSet(this.mStar1);
    this.mStar2 = new Star(this.kSprite,420,120,20,20);
    this.mStarset.addToSet(this.mStar2);
    this.mStar2 = new Star(this.kSprite,480,200,20,20);
    this.mStarset.addToSet(this.mStar2);
    
    this.mStar2 = new Star(this.kSprite,310,260,20,20);
    this.mStarset.addToSet(this.mStar2);
    this.mStar2 = new Star(this.kSprite,410,390,20,20);
    this.mStarset.addToSet(this.mStar2);
    this.mStar2 = new Star(this.kSprite,320,400,20,20);
    this.mStarset.addToSet(this.mStar2);
    this.mStar2 = new Star(this.kSprite,490,430,20,20);
    this.mStarset.addToSet(this.mStar2);
    this.mStar2 = new Star(this.kSprite,400,530,24,24);
    this.mStarset.addToSet(this.mStar2);
    this.initializeKeyN();
    this.initializeCameraDead();
  
};


Level4.prototype.initializeCameraDead = function(){
    this.mDeadset=new GameObjectSet();
    
    
//    this.mbg = new TextureRenderable(this.kbg);
//    this.mbg.getXform().setPosition(1000,300);
//    this.mbg.getXform().setSize(2000,600);
    //this.mDeadset.addToSet(this.mbg);
    this.mMsgDead = new FontRenderable("Ooops, you died :(");
    this.mMsgDead.setColor([1,1,1, 1]);
    this.mMsgDead.getXform().setPosition(this.mCdead.getWCCenter()[0]-70,this.mCdead.getWCCenter[1]+40);
    this.mMsgDead.setTextHeight(15);   
    this.mDeadset.addToSet(this.mMsgDead);
    
    this.restartbutton = new TextureRenderable(this.krestart);
    this.restartbutton.setColor([1,1,1,0]);
    this.restartbutton.getXform().setPosition(this.mCdead.getWCCenter()[0],this.mCdead.getWCCenter[1]-10);
    this.restartbutton.getXform().setSize(64,32);
    this.mDeadset.addToSet(this.restartbutton);
    
    this.backtbutton = new TextureRenderable(this.kback);
    this.backtbutton.setColor([1,1,1,0]);
    this.backtbutton.getXform().setPosition(this.mCdead.getWCCenter()[0],this.mCdead.getWCCenter[1]-50);
    this.backtbutton.getXform().setSize(64,32);
    this.mDeadset.addToSet(this.backtbutton);
    

    
};

Level4.prototype.initializeGuideobj= function(){
     
    this.mguideset =new GameObjectSet(); 
        
    this.mguidekeySpace = new TextureRenderable(this.kkeySpace);
    this.mguidekeySpace.getXform().setPosition(420,25);
    this.mguidekeySpace.getXform().setSize(32,16);
    this.mguideset.addToSet(this.mguidekeySpace);

};

Level4.prototype.initializePlatformset= function(){
    
    this.platform1=new MapObject(240,300,0,8,600,null); //left
    this.mPlatformset.addToSet(this.platform1);
    this.platform2=new MapObject(560,300,0,8,600,null); //right WALL
    this.mPlatformset.addToSet(this.platform2);
    this.platform3=new MapObject(400,4,0,320,8,null); //bottom WALL
    this.mPlatformset.addToSet(this.platform3);
     this.platform8=new MapObject(400,596,0,320,8,null); //top WALL
    this.mPlatformset.addToSet(this.platform8);
    
    this.platform5=new MapObject(500,300,0,120,8,null);
    this.mPlatformset.addToSet(this.platform5);
    this.platform6=new MapObject(285,280,0,90,8,null);
    this.mPlatformset.addToSet(this.platform6);
    
    this.platform7=new MapObject(410,250,0,8,60,null);
    this.mPlatformset.addToSet(this.platform7);
    this.platform8=new MapObject(295,150,0,8,40,null);
    this.mPlatformset.addToSet(this.platform8);
    this.platform8=new MapObject(500,170,0,8,60,null);
    this.mPlatformset.addToSet(this.platform8);
    this.platform8=new MapObject(400,60,0,8,70,null);
    this.mPlatformset.addToSet(this.platform8);
    this.platform8=new MapObject(320,50,0,40,8,null);
    this.mPlatformset.addToSet(this.platform8);
    this.platform8=new MapObject(480,60,0,60,8,null);
    this.mPlatformset.addToSet(this.platform8);
    this.platform8=new MapObject(400,160,0,80,8,null);
    this.mPlatformset.addToSet(this.platform8);
    this.platform8=new MapObject(400,370,0,60,8,null);
    this.mPlatformset.addToSet(this.platform8);
    this.platform8=new MapObject(500,350,0,60,8,null);
    this.mPlatformset.addToSet(this.platform8);
    this.platform8=new MapObject(300,370,0,8,90,null);
    this.mPlatformset.addToSet(this.platform8);
    this.platform8=new MapObject(410,440,0,8,60,null);
    this.mPlatformset.addToSet(this.platform8);
    this.platform8=new MapObject(300,480,0,80,8,null);
    this.mPlatformset.addToSet(this.platform8);
    this.platform8=new MapObject(480,450,0,70,8,null);
    this.mPlatformset.addToSet(this.platform8);
     this.platform8=new MapObject(520,410,0,8,40,null);
    this.mPlatformset.addToSet(this.platform8);
    this.platform8=new MapObject(450,550,0,60,8,null);
    this.mPlatformset.addToSet(this.platform8);
    
    
};

Level4.prototype.initializeHoleset= function(){
    this.mHoleset = new GameObjectSet(); 
     
    this.mHole1=new Item(280,115,0,20,20,this.kHole);
  // this.mHole1.setBoundRadius(40);
    this.mHoleset.addToSet(this.mHole1);
    this.mHole2= new Item(430,240,0,20,20,this.kHole);
    this.mHoleset.addToSet(this.mHole2);
    this.mHole3= new Item(370,240,0,24,24,this.kHole);
    this.mHoleset.addToSet(this.mHole3);
    this.mHole4= new Item(500,320,0,30,30,this.kHole);
    this.mHoleset.addToSet(this.mHole4);
    this.mHole5= new Item(360,400,0,26,26,this.kHole);
    this.mHoleset.addToSet(this.mHole5);
    
     this.mHole6= new Item(450,350,0,20,20,this.kHole);
    this.mHoleset.addToSet(this.mHole6);
    
};



Level4.prototype.initializeToothset= function(){
    this.mToothset= new GameObjectSet(); 
     var i;
    for(i=0;i< 59 ;i++)
    {
         this.mTooth= new Item(248,15 + i*10,0,10,10,this.kTooth);
         this.mTooth.setBoundRadius(10);
         this.mToothset.addToSet(this.mTooth);
    }
    for(i=0;i< 59 ;i++)
    {
         this.mTooth= new Item(552,15 + i*10,180,10,10,this.kTooth);
         this.mTooth.setBoundRadius(10);
         this.mToothset.addToSet(this.mTooth);
    }
    for(i=0;i< 31 ;i++)
    {
         this.mTooth= new Item(240+ 5+i*10,12,90,10,10,this.kTooth);
         this.mTooth.setBoundRadius(10);
         this.mToothset.addToSet(this.mTooth);
    }
    for(i=0;i< 31 ;i++)
    {
         this.mTooth= new Item(240+ 5+i*10,588,270,10,10,this.kTooth);
         this.mTooth.setBoundRadius(10);
         this.mToothset.addToSet(this.mTooth);
    }
};
Level4.prototype.initializeKeyN= function(){
    this.mKeyNTip = new FontRenderable("Hold [N] to skip to Level5 ");
    this.mKeyNTip.setColor([0.447,0.286,0.219, 1]);
    this.mKeyNTip.getXform().setPosition(270,35);
    this.mKeyNTip.setTextHeight(7);
    this.mAllObjs.addToSet(this.mKeyNTip);
    
    this.mKeyNBar =new Renderable();
    this.mKeyNBar.setColor([0.447,0.286,0.219,1]);
    this.mKeyNBar.getXform().setPosition(322,25);
    this.mKeyNBar.getXform().setSize(100,1.5);
    this.mAllObjs.addToSet(this.mKeyNBar);
};
// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
Level4.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    this.mbg.draw(this.mCamera);
    this.mRubbishset.draw(this.mCamera);
    this.mStarset.draw(this.mCamera);
    this.mPlatformset.draw(this.mCamera);
    this.mAllObjs.draw(this.mCamera); 
    this.mToothset.draw(this.mCamera);
    this.mRay.draw(this.mCamera);
    this.mHoleset.draw(this.mCamera);
    this.mDoor.draw(this.mCamera);
    this.mguideset.draw(this.mCamera);
    this.mHero.draw(this.mCamera);

    
    this.mCamera2.setupViewProjection();
    this.mbg.draw(this.mCamera2);
    this.mPlatformset.draw(this.mCamera2);
    this.mRubbishset.draw(this.mCamera2);
    this.mStarset.draw(this.mCamera2);
    this.mToothset.draw(this.mCamera2);
    this.mRay.draw(this.mCamera2);
    this.mHoleset.draw(this.mCamera2);
    this.mDoor.draw(this.mCamera2);
    this.mguideset.draw(this.mCamera2);
    this.mHero.draw(this.mCamera2);
    
    this.mCui.setupViewProjection();
    this.mbg.draw(this.mCui);
    this.mMsg.draw(this.mCui); 
    this.mMsg2.draw(this.mCui);
    this.mMsg3.draw(this.mCui);
    this.mMsg4.draw(this.mCui);
    
    this.mCollisionInfos = []; 
    
     
    if(this.died===1)
    {
        this.mCdead.setupViewProjection();
       this.mbg.draw(this.mCdead);
    this.mRubbishset.draw(this.mCdead);
    this.mStarset.draw(this.mCdead);
    this.mPlatformset.draw(this.mCdead);
    this.mAllObjs.draw(this.mCdead); 
    this.mToothset.draw(this.mCdead);
    this.mRay.draw(this.mCdead);
    this.mHoleset.draw(this.mCdead);
    this.mDoor.draw(this.mCdead);
    this.mguideset.draw(this.mCdead);
    this.mHero.draw(this.mCdead);
        this.mDeadset.draw(this.mCdead);
    }
};


// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
Level4.prototype.updatemCui= function(){
    var newcenterx =this.mCamera.getWCCenter()[0]-370 ;
    var newcentery=this.mCamera.getWCCenter()[1]+120;

     
    this.mCui.setWCCenter(newcenterx,newcentery);  


    this.mMsg2.getXform().setPosition(this.mCui.getWCCenter()[0]-20,this.mCui.getWCCenter()[1]+20);

    this.mMsg3.getXform().setPosition(this.mCui.getWCCenter()[0]-23,this.mCui.getWCCenter()[1]-8);

    this.mMsg4.getXform().setPosition(this.mCui.getWCCenter()[0]-23,this.mCui.getWCCenter()[1]-20);
  
    this.mMsg.getXform().setPosition(this.mCui.getWCCenter()[0]-22,this.mCui.getWCCenter()[1]+3);
    
    //this.mCui.mCameraState.updateCameraState();
};

Level4.prototype.update = function () {
    this.updateMyCamera();
    this.updateCameradead();
    
	this.updatemCui();
    this.mCui.update();
    this.time++;
    this.updateMyKeyN();
    
    this.mAllObjs.update(this.mCamera); 
    if(this.died===0)
    {
        this.updateMyHeroAndRay();
    }
    
     this.updateMyHoleset();



    this.mRubbishset.update(this.mCamera);
    this.mStarset.update(this.mCamera);
    this.mHero.update(this.mCamera);
    this.mDeadset.update();

    
    this.mRubbishset.update(this.mCamera2);
    this.mStarset.update(this.mCamera2);
    this.mHero.update(this.mCamera2);
 
    

    var i;
    for(i=0;i<this.mToothset.size();i++){
        if(this.mHero.boundTest(this.mToothset.getObjectAt(i))){
           //this.restart = true;
            //gEngine.GameLoop.stop();
            this.died=1;

        }
    }

    var i;
    for(i=0;i<this.mHoleset.size();i++){
        if(this.mHero.boundTest(this.mHoleset.getObjectAt(i))){
            //this.restart = true;
            //gEngine.GameLoop.stop();
            this.died=1;

        }
    }
    
    for(i=0;i<this.mStarset.size();i++){
        if(this.mHero.boundTest(this.mStarset.getObjectAt(i))){
            this.starcount++;
            this.mStarset.getObjectAt(i).setVisibility(false);
            this.mStarset.removeFromSet(this.mStarset.getObjectAt(i));
            gEngine.AudioClips.playACue(this.kCue);
        }
    }
    
   /* 
    

    var i;
    for(i=0;i<this.mRubbishset.size();i++){
        if(this.mHero.boundTest(this.mRubbishset.getObjectAt(i))){
            this.restart = true;
            gEngine.GameLoop.stop();
        }
    }
    
    */
     var msg ="Now   :"+this.starcount;
    this.mMsg.setText(msg);
    
    if(this.mHero.boundTest(this.mDoor)){
        if(this.died===0){
        this.restart=false;
        gEngine.GameLoop.stop();
    }
    }
  
};

Level4.prototype.updateMyHoleset=function(){
    
   // this.mHole1.getXform().incRotationByDegree(-0.5);
   //1//
    if(this.Hole1count<=60){
        this.mHole1.getXform().incXPosBy(this.Hole1autodelta);  
        this.Hole1count=this.Hole1count+1;
    }
    else{
        this.Hole1count =0;
        this.Hole1autodelta= -this.Hole1autodelta;
    }
    //2//
    if(this.Hole2count<=30){
        this.mHole2.getXform().incXPosBy(this.Hole2autodelta);  
        this.Hole2count=this.Hole2count+1;
    }
    else{
        this.Hole2count =0;
        this.Hole2autodelta= -this.Hole2autodelta;
    }
    //3//
     if(this.Hole3count<=30){
        this.mHole3.getXform().incXPosBy(this.Hole3autodelta);  
        this.Hole3count=this.Hole3count+1;
    }
    else{
        this.Hole3count =0;
        this.Hole3autodelta= -this.Hole3autodelta;
    }
    //4//
    if(this.Hole4count<=45){
        this.mHole4.getXform().incXPosBy(this.Hole4autodelta);  
        this.Hole4count=this.Hole4count+1;
    }
    else{
        this.Hole4count =0;
        this.Hole4autodelta= -this.Hole4autodelta;
    }
        //5//
    if(this.Hole5count<=30){
        this.mHole5.getXform().incYPosBy(this.Hole5autodelta);  
        this.Hole5count=this.Hole5count+1;
    }
    else{
        this.Hole5count =0;
        this.Hole5autodelta= -this.Hole5autodelta;
    }
    //5//
    if(this.Hole6count<=30){
        this.mHole6.getXform().incYPosBy(this.Hole6autodelta);  
        this.Hole6count=this.Hole6count+1;
    }
    else{
        this.Hole6count =0;
        this.Hole6autodelta= -this.Hole6autodelta;
    }
};
Level4.prototype.updateMyHeroAndRay=function(){
    var heroNowPosX=this.mHero.getXform().getXPos();
    var heroNowPosY=this.mHero.getXform().getYPos();
    
    if(this.isMoving===false){

        this.mRay.myupdate(this.mHero.getXform());
       if(this.died===0){
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
                this.Movingdirection= this.mRay.mState;
                if(this.Movingdirection ===HeroDirection.Up&&this.mRay.uplength >0)
                {
                    this.Movingdelta=15;
                    this.isMoving=true;
                    this.mHeroTargetPosX= this.mRay.getXform().getXPos();
                   // this.mHeroTargetPosY= this.mRay.getXform().getYPos()+ this.mRay.getXform().getHeight()*1.0/2 - this.mHero.getXform().getHeight()*1.0/2; 
                    this.mHeroTargetPosY= this.mRay.getXform().getYPos()+ this.mRay.getXform().getHeight()*1.0/2 - this.mHerofakeheight*1.0/2;  
                    if(this.mHeroTargetPosY <=  heroNowPosY )   this.mHeroTargetPosY =heroNowPosY ;
                    if( this.mHeroTargetPosX > 543.5 )this.mHeroTargetPosX=543.5;
                    if( this.mHeroTargetPosX < 256.5 )this.mHeroTargetPosX=256.5;
                    if( this.mHeroTargetPosY> 579.5 )this.mHeroTargetPosY=579.5;
                    if( this.mHeroTargetPosY < 20.5)this.mHeroTargetPosY=20.5;
               }else if(this.Movingdirection ===HeroDirection.Down&&this.mRay.downlength >0)
                {
                    this.Movingdelta=15;
                    this.isMoving=true;
                 
                    this.mHeroTargetPosX= this.mRay.getXform().getXPos();
                    this.mHeroTargetPosY= this.mRay.getXform().getYPos()- this.mRay.getXform().getHeight()*1.0/2  + this.mHerofakeheight*1.0/2;  
                   // this.mHeroTargetPosY= this.mRay.getXform().getYPos()- this.mRay.getXform().getHeight()*1.0/2  + this.mHero.getXform().getHeight()*1.0/2;  
                     if(this.mHeroTargetPosY >=  heroNowPosY )   this.mHeroTargetPosY =heroNowPosY ;
                    if( this.mHeroTargetPosX > 543.5 )this.mHeroTargetPosX=543.5;
                    if( this.mHeroTargetPosX < 256.5 )this.mHeroTargetPosX=256.5;
                    if( this.mHeroTargetPosY> 579.5 )this.mHeroTargetPosY=579.5;
                    if( this.mHeroTargetPosY < 20.5)this.mHeroTargetPosY=20.5;
                } else if(this.Movingdirection ===HeroDirection.Left&&this.mRay.leftlength >0)
                {
                    this.Movingdelta=15;
                    this.isMoving=true;
                    this.mHeroTargetPosY= this.mRay.getXform().getYPos();
               //     this.mHeroTargetPosX= this.mRay.getXform().getXPos()-  this.mRay.getXform().getWidth()*1.0/2 + this.mHero.getXform().getWidth()*1.0/2;    
                    this.mHeroTargetPosX = this.mRay.getXform().getXPos()-  this.mRay.getXform().getWidth()*1.0/2 + this.mHerofakewidth*1.0/2;
        
                   if(this.mHeroTargetPosX >=  heroNowPosX )   this.mHeroTargetPosX =heroNowPosX ;
                    
                    if( this.mHeroTargetPosX > 543.5 )this.mHeroTargetPosX=543.5;
                    if( this.mHeroTargetPosX < 256.5 )this.mHeroTargetPosX=256.5;
                    if( this.mHeroTargetPosY> 579.5 )this.mHeroTargetPosY=579.5;
                    if( this.mHeroTargetPosY < 20.5)this.mHeroTargetPosY=20.5;
                } else if(this.Movingdirection ===HeroDirection.Right&&this.mRay.rightlength >0)
                {   this.Movingdelta=15;
                    this.isMoving=true;
 
                    this.mHeroTargetPosY= this.mRay.getXform().getYPos();
                    this.mHeroTargetPosX= this.mRay.getXform().getXPos()+ this.mRay.getXform().getWidth()*1.0/2 - this.mHerofakewidth*1.0/2;    
                    // this.mHeroTargetPosX= this.mRay.getXform().getXPos()+ this.mRay.getXform().getWidth()*1.0/2 - this.mHero.getXform().getWidth()*1.0/2;    
                     if(this.mHeroTargetPosX <=  heroNowPosX )   this.mHeroTargetPosX =heroNowPosX ;
                    if( this.mHeroTargetPosX > 543.5 )this.mHeroTargetPosX=543.5;
                    if( this.mHeroTargetPosX < 256.5 )this.mHeroTargetPosX=256.5;
                    if( this.mHeroTargetPosY> 579.5 )this.mHeroTargetPosY=579.5;
                    if( this.mHeroTargetPosY < 20.5)this.mHeroTargetPosY=20.5;               
                }     
        }
    }
    }

    if(this.isMoving)
    {
        if(this.Movingdelta>2)   this.Movingdelta--;
        
        if(this.Movingdirection ===HeroDirection.Up){
            //console.log("HeroDirection.Up");
            if(this.mHeroTargetPosY - heroNowPosY >= this.Movingdelta)
            {
             //   console.log(this.mHeroTargetPosY );
            //    console.log(heroNowPosY  );
                this.mHero.getXform().setYPos(heroNowPosY+  this.Movingdelta);
            }
            else if( (this.mHeroTargetPosY - heroNowPosY < this.Movingdelta )&& (this.mHeroTargetPosY - heroNowPosY >0)) 
            {
                this.mHero.getXform().setYPos(this.mHeroTargetPosY );
            }
            else if(this.mHeroTargetPosY <= heroNowPosY  )
            {
                
                this.mHero.getXform().setYPos(this.mHeroTargetPosY );
                this.isMoving=false;
                this.mRay.AllDicFirstCal();
            }
            this.mRay.getXform().incYPosBy( this.Movingdelta*1.0/2 );
            if( this.mRay.getXform().getHeight() - this.Movingdelta  <=0 ) { this.mRay.getXform().setHeight(0);  }
                else     {this.mRay.getXform().setHeight(this.mRay.getXform().getHeight() - this.Movingdelta );  }
        }
        else if(this.Movingdirection ===HeroDirection.Down){
            if(heroNowPosY- this.mHeroTargetPosY  >= this.Movingdelta)
            {  // console.log(this.mHeroTargetPosY );
               // console.log(heroNowPosY  );
                this.mHero.getXform().setYPos(heroNowPosY - this.Movingdelta);
            }
            else if( (heroNowPosY- this.mHeroTargetPosY < this.Movingdelta )&& (heroNowPosY -this.mHeroTargetPosY >0)) 
            {
                this.mHero.getXform().setYPos(this.mHeroTargetPosY);
            }
            else if(this.mHeroTargetPosY >= heroNowPosY  )
            {
              
                this.mHero.getXform().setYPos(this.mHeroTargetPosY);
                this.isMoving=false;
                this.mRay.AllDicFirstCal();
            }
            this.mRay.getXform().incYPosBy( - this.Movingdelta*1.0/2 );
            if(this.mRay.getXform().getHeight() -this.Movingdelta  <=0)
            {
                this.mRay.getXform().setHeight(0);  
            }else   { this.mRay.getXform().setHeight(this.mRay.getXform().getHeight() -this.Movingdelta );  }
            
        }
        else if(this.Movingdirection ===HeroDirection.Left){
            if(heroNowPosX- this.mHeroTargetPosX  >= this.Movingdelta)
            { // console.log(this.mHeroTargetPosX );
               // console.log(heroNowPosX  );
                this.mHero.getXform().setXPos(heroNowPosX - this.Movingdelta);
            }
            else if( (heroNowPosX- this.mHeroTargetPosX < this.Movingdelta )&& (heroNowPosX -this.mHeroTargetPosX >0)) 
            {
                this.mHero.getXform().setXPos(this.mHeroTargetPosX);
            }
            else if(this.mHeroTargetPosX >=  heroNowPosX  )
            {
               
                this.mHero.getXform().setXPos(this.mHeroTargetPosX);
                this.isMoving=false;
                this.mRay.AllDicFirstCal();
            }
            this.mRay.getXform().incXPosBy( - this.Movingdelta*1.0/2 );
            if(this.mRay.getXform().getWidth() -this.Movingdelta  <=0)
            {
                this.mRay.getXform().setWidth(0);  
            }else { this.mRay.getXform().setWidth(this.mRay.getXform().getWidth() -this.Movingdelta );  }
            
        }else if(this.Movingdirection ===HeroDirection.Right){
            if( this.mHeroTargetPosX-heroNowPosX  >= this.Movingdelta)
            {
                this.mHero.getXform().setXPos(heroNowPosX + this.Movingdelta);
            }
            else if( (this.mHeroTargetPosX- heroNowPosX < this.Movingdelta )&& (this.mHeroTargetPosX-heroNowPosX >0)) 
            {
                this.mHero.getXform().setXPos(this.mHeroTargetPosX);
            }
            else if(this.mHeroTargetPosX <= heroNowPosX  )
            {
              
                this.mHero.getXform().setXPos(this.mHeroTargetPosX);
                this.isMoving=false;
                this.mRay.AllDicFirstCal();
            }
            
            this.mRay.getXform().incXPosBy(  this.Movingdelta*1.0/2 );
            if(this.mRay.getXform().getWidth() -this.Movingdelta  <=0)
            {
                this.mRay.getXform().setWidth(0);  
            }else { this.mRay.getXform().setWidth(this.mRay.getXform().getWidth() -this.Movingdelta );  }
            
        }
        
        if( this.mHero.getXform().getXPos() > 543.5 )this.mHero.getXform().setXPos(543.5);
        if( this.mHero.getXform().getXPos() < 256.5 )this.mHero.getXform().setXPos(256.5);
        if( this.mHero.getXform().getYPos() > 579.5 )this.mHero.getXform().setYPos(579.5);
        if( this.mHero.getXform().getYPos() < 20.5)this.mHero.getXform().setYPos(20.5);
    }
    
    
};

Level4.prototype.updateMyCamera= function(){
     this.mCamera.update();
    if(this.mHero.getXform().getYPos()>=150){
        this.mCamera.setWCCenter(400,this.mHero.getXform().getYPos());
    }
    if(this.mHero.getXform().getYPos()>=450){
        this.mCamera.setWCCenter(400,450);
    }
};

Level4.prototype.updateMyKeyN= function(){
     var flag =0;
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.N)) 
    {
        if(this.LastKeyNTime=== this.time-1){
            this.KeyNCount++;
        }
        else{
            this.KeyNCount=1;
        }
        var newwidth =100 -2.5*this.KeyNCount;
        this.mKeyNBar.getXform().setSize(newwidth,1.5);
        if(newwidth<=0)
        {
              this.skip=true;
            gEngine.GameLoop.stop();
        }
        this.LastKeyNTime=this.time;
        flag =1;  // accept space 
    }
    if(flag===0)
    {
        this.mKeyNBar.getXform().setSize(100,1.5);
        this.KeyNCount=0;
    }
};

Level4.prototype.updateCameradead = function () {
    this.mDeadset.update();
    this.mCdead.setWCCenter(this.mCamera.getWCCenter()[0],this.mCamera.getWCCenter()[1]);
    this.mMsgDead.getXform().setPosition(this.mCdead.getWCCenter()[0]-70,this.mCdead.getWCCenter()[1]+40);
   
    this.restartbutton.getXform().setPosition(this.mCdead.getWCCenter()[0],this.mCdead.getWCCenter()[1]-10);
    this.backtbutton.getXform().setPosition(this.mCdead.getWCCenter()[0],this.mCdead.getWCCenter()[1]-50);
   
    var mx,my,rxf,bxf;
   
    mx=gEngine.Input.getMousePosX();
    my=gEngine.Input.getMousePosY();
    rxf=this.restartbutton.getXform();
    bxf=this.backtbutton.getXform();
   
    if(this.died===1)
    {
        if(mx<464&&mx>336
                &&my<312&&my>248)
        {
            this.restartbutton.getXform().setPosition(this.mCdead.getWCCenter()[0],this.mCdead.getWCCenter()[1]-13);
            if(gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left))
            {   
                this.restart=true;            
                gEngine.GameLoop.stop();
            }
        }
        else{
            this.restartbutton.getXform().setPosition(this.mCdead.getWCCenter()[0],this.mCdead.getWCCenter()[1]-10);
        }
        if(mx<464&&mx>336
                &&my<232&&my>168)
        {
            this.backtbutton.getXform().setPosition(this.mCdead.getWCCenter()[0],this.mCdead.getWCCenter()[1]-53);
            if(gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left))
            {   
                this.restart=false;    
                this.back=true;
                gEngine.GameLoop.stop();
            }
        }
        else{
            this.backtbutton.getXform().setPosition(this.mCdead.getWCCenter()[0],this.mCdead.getWCCenter()[1]-50);
        }
    }
    
};
