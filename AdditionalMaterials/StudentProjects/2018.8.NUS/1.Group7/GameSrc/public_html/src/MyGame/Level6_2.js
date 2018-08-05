/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
"use strict";  

function Level6_2(){
    this.kSprite="assets/animation.png";
    this.kStar="assets/yellow.png";
    this.kBlackHole="assets/BlackHole.png";
    this.kRubbish = "assets/2D_GAME_rubbish.png";
    this.kTooth="assets/tooth.png";
    this.kDoor="assets/2D_GAME_door.png";
    this.kShooting="assets/2D_GAME_star_2.png";
    this.kBackground="assets/bg6_2.png";
    this.kTutorial1="assets/tutorial_level6_2_1.png";
    this.kTutorial2="assets/tutorial_level6_2_2.png";
    this.kTutorial3="assets/tutorial_level6_2_3.png";
    this.kTutorial4="assets/tutorial_level6_2_4.png";
    this.kback="assets/back.png";
    this.krestart="assets/restart.png";

    
    this.mCamera=null;
    this.mCamera2=null;
    this.mCui=null;
    this.mCdead=null;
    
    this.mPlatformSet=null;
    this.mStarSet=null;
    this.mChaserSet = null;
    this.mRubbishSet=null;
    this.mToothSet1=null;
    this.mToothSet2=null;
    this.mToothSet3=null;
    this.mShootingSet=null;
    this.mTutorialSet=null;
    
    this.flag=0;//0 for not be hit
    this.restart=0;
    this.HoleFlag=0;//0 for not appear
    this.next=0;
    this.re6=0;
    //this.isLeft=0;//0 for star shoot right;
    this.isShake=0;//0 for still
    this.flagTutorial=0;
    
    this.starcount=30;
    this.timeLaunch=100;
    this.timeLaunch2=0;
    this.time=0;
    this.time2=0;
    this.time3=0;
    
    this.skip=false;
    this.mKeyNBar= null;
    this.timeKey= 0;
    this.LastKeyNTime=0;
    this.KeyNCount=0;
   
    this.died=0;
    this.notenough=0;
}

gEngine.Core.inheritPrototype(Level6_2, Scene);

Level6_2.prototype.loadScene=function(){
    gEngine.Textures.loadTexture(this.kSprite);
    gEngine.Textures.loadTexture(this.kStar);
    gEngine.Textures.loadTexture(this.kBlackHole);
    gEngine.Textures.loadTexture(this.kRubbish);
    gEngine.Textures.loadTexture(this.kTooth);
    gEngine.Textures.loadTexture(this.kDoor);
    gEngine.Textures.loadTexture(this.kShooting);
    gEngine.Textures.loadTexture(this.kBackground);
    gEngine.Textures.loadTexture(this.kTutorial1);
    gEngine.Textures.loadTexture(this.kTutorial2);
    gEngine.Textures.loadTexture(this.kTutorial3);
    gEngine.Textures.loadTexture(this.kTutorial4);
    gEngine.Textures.loadTexture(this.kback);
    gEngine.Textures.loadTexture(this.krestart);

    if(gEngine.ResourceMap.isAssetLoaded("star6")){
        this.starcount = gEngine.ResourceMap.retrieveAsset("star6");
    }
    
};
Level6_2.prototype.unloadScene=function(){
    gEngine.Textures.unloadTexture(this.kSprite);
    gEngine.Textures.unloadTexture(this.kStar);
    gEngine.Textures.unloadTexture(this.kBlackHole);
    gEngine.Textures.unloadTexture(this.kRubbish);
    gEngine.Textures.unloadTexture(this.kTooth);
    gEngine.Textures.unloadTexture(this.kDoor);
    gEngine.Textures.unloadTexture(this.kShooting);
    gEngine.Textures.unloadTexture(this.kBackground);
    gEngine.Textures.unloadTexture(this.kTutorial1);
    gEngine.Textures.unloadTexture(this.kTutorial2);
    gEngine.Textures.unloadTexture(this.kTutorial3);
    gEngine.Textures.unloadTexture(this.kTutorial4);
    gEngine.Textures.unloadTexture(this. krestart);
     gEngine.Textures.unloadTexture(this.kback);



    gEngine.Physics.setSystemtAcceleration(400);
    this.mHero.setWASDDelta(2);
    
    if(this.skip)
      {   
         var nextLevel =new EndScene();
         //var nextLevel =new PassScene(4,this.starcount);
         gEngine.ResourceMap.loadstar("level6",this.starcount);
         gEngine.Core.startScene(nextLevel);
      }
      else{
          if(this.restart){
            var new_level=new Level6_2();
            gEngine.Core.startScene(new_level);
        }
        else{
        if(this.next===1){
            gEngine.ResourceMap.loadstar("level6",this.starcount);
            var new_level=new EndScene();
            gEngine.Core.startScene(new_level);
        }
        else if(this.re6){
            gEngine.ResourceMap.loadstar("level6",this.starcount);
            var new_level=new Level6();
            gEngine.Core.startScene(new_level);
        }
        else{
            gEngine.ResourceMap.loadstar("level6",this.starcount);
            var new_level=new AllLevel(6);
            gEngine.Core.startScene(new_level);
        }
    }
   }
      
    
    
};
Level6_2.prototype.initialize=function(){
    gEngine.Physics.setSystemtAcceleration(200);
    this.initialize_Camera();
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    this.mPlatformSet=new GameObjectSet();
    this.mStarSet= new GameObjectSet();
    this.mChaserSet = new GameObjectSet(); 
    this.mRubbishSet=new GameObjectSet();
    this.mToothSet1=new GameObjectSet();
    this.mToothSet2=new GameObjectSet();
    this.mToothSet3=new GameObjectSet();
    this.mShootingSet=new GameObjectSet();
    this.mTutorialSet=new GameObjectSet();
    this.mAllObjs=new GameObjectSet();
    this.mHero=new Hero(this.kSprite,25,900,40,40,1024);
    this.mHero.setWASDDelta(3);
    this.mFirstObject = this.mPlatformSet.size();
    this.mCurrentObj = this.mFirstObject;
    this.mPlatformSet.addToSet(this.mHero);
    
    this.initialize_Platform();
    this.initialize_Words();
    
    this.mRubbish = new Item(620,650,0,100,100,this.kRubbish);
    this.mRubbishSet.addToSet(this.mRubbish);
    this.mRubbish = new Item(1400,1150,0,100,100,this.kRubbish);
    this.mRubbishSet.addToSet(this.mRubbish);
    
    this.mBlackHole = new Item(400,280,0,100,100,this.kBlackHole);
    this.mDoor = new Item(1975,40,0,50,50,this.kDoor);
    this.mBackground= new Item(1000,600,0,2300,2300,this.kBackground);
    this.initializeKeyN();
    this.initialize_Tutorial();
    this.initializeCameraDead();
};
Level6_2.prototype.initializeKeyN= function(){
    this.mKeyNTip = new FontRenderable("Hold [N] to skip to the end");
    this.mKeyNTip.setColor([0.6,0.6,0.6, 1]);
    this.mKeyNTip.getXform().setPosition(30,1000);
    this.mKeyNTip.setTextHeight(15);
    this.mAllObjs.addToSet(this.mKeyNTip);
    
    this.mKeyNBar =new Renderable();
    this.mKeyNBar.setColor([0.6,0.6,0.6,1]);
    this.mKeyNBar.getXform().setPosition(140,980);
    this.mKeyNBar.getXform().setSize(200,3);
    this.mAllObjs.addToSet(this.mKeyNBar);
};
Level6_2.prototype.initialize_Tutorial=function(){
    this.mTuto=new Item(400,900,0,256,256,this.kTutorial1);
    this.mTutorialSet.addToSet(this.mTuto);
    this.mTuto=new Item(400,900,0,256,256,this.kTutorial2);
    this.mTutorialSet.addToSet(this.mTuto);
    this.mTuto=new Item(400,900,0,256,256,this.kTutorial3);
    this.mTutorialSet.addToSet(this.mTuto);
    this.mTuto=new Item(400,900,0,256,256,this.kTutorial4);
    this.mTutorialSet.addToSet(this.mTuto);
};
Level6_2.prototype.initialize_Words=function(){
    this.mMsg2 = new FontRenderable("Level6");
    this.mMsg2.setColor([222/255, 212/255, 173/255, 1]);
    this.mMsg2.getXform().setPosition(10,50);
    this.mMsg2.setTextHeight(12);
    
    this.mMsg3 = new FontRenderable("Target:5");
    this.mMsg3.setColor([0.8,0.8,0.8, 1]);
    this.mMsg3.getXform().setPosition(7,22);
    this.mMsg3.setTextHeight(10);
    
    this.mMsg = new FontRenderable("Now   :0");
    this.mMsg.setColor([0.8,0.8,0.8, 1]);
    this.mMsg.getXform().setPosition(8,33);
    this.mMsg.setTextHeight(10);
};
Level6_2.prototype.initialize_Camera=function(){
    this.mCamera=new Camera(
        vec2.fromValues(400,900),
        800,
        [0,0,800,600]
        );
    this.mCamera.setBackgroundColor([0.8,0.8,0.8,1]);
  
    this.mCui = new Camera(
            vec2.fromValues(this.mCamera.mCameraState.getCenter()[0]-370, this.mCamera.mCameraState.getCenter()[1]+270),
            70,
            [0,510,90,90]);
            
            this.mCdead = new Camera(
            this.mCamera.mCameraState.getCenter(),
            400,
            [200,150,400,300]);
    this.mCdead.setBackgroundColor([0.705, 0.443, 0.341, 0.5 ]);

};
Level6_2.prototype.initializeCameraDead = function(){
    this.mDeadset=new GameObjectSet();
    
    
//    this.mbg = new TextureRenderable(this.kbg);
//    this.mbg.getXform().setPosition(1000,300);
//    this.mbg.getXform().setSize(2000,600);
    //this.mDeadset.addToSet(this.mBackground);
    
    this.mMsgDead = new FontRenderable("Ooops, you died :(");
    this.mMsgDead.setColor([1,1,1, 1]);
    this.mMsgDead.getXform().setPosition(this.mCdead.getWCCenter()[0]-140,this.mCdead.getWCCenter[1]+80);
    this.mMsgDead.setTextHeight(30);   
    this.mDeadset.addToSet(this.mMsgDead);
    
    this.restartbutton = new TextureRenderable(this.krestart);
    this.restartbutton.setColor([1,1,1,0]);
    this.restartbutton.getXform().setPosition(this.mCdead.getWCCenter()[0],this.mCdead.getWCCenter[1]-20);
    this.restartbutton.getXform().setSize(128,64);
    this.mDeadset.addToSet(this.restartbutton);
    
    this.backtbutton = new TextureRenderable(this.kback);
    this.backtbutton.setColor([1,1,1,0]);
    this.backtbutton.getXform().setPosition(this.mCdead.getWCCenter()[0],this.mCdead.getWCCenter[1]-100);
    this.backtbutton.getXform().setSize(128,64);
    this.mDeadset.addToSet(this.backtbutton);
    
};


Level6_2.prototype.initialize_Platform=function(){
     this.mPlatform=new MapObject(1250,1208,0,2500,16,null);//up bound 1
    this.mPlatform.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform);
    this.mPlatform=new MapObject(-8,600,0,16,1200,null);//left bound 2
    this.mPlatform.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform);
    this.mPlatform=new MapObject(2008,600,0,16,1200,null);//right bound 3
    this.mPlatform.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform);
    this.mPlatform=new MapObject(1350,8,0,400,16,null);//down bound(right) 4
    this.mPlatform.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform);
    this.mPlatform=new MapObject(1965,8,0,70,16,null);//down bound(left) 5
    this.mPlatform.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform);
    this.mPlatform=new MapObject(60,850,0,120,16,null);//6
    this.mPlatform.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform);
    this.mPlatform=new MapObject(260,700,0,100,16,null);//7
    this.mPlatform.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform);
    this.mPlatform=new MapObject(360,450,0,100,16,null);//8
    this.mPlatform.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform);
    this.mPlatform=new MapObject(575,130,0,450,16,null);//with 2 spikeds   9
    this.mPlatform.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform);
    this.mPlatform=new MapObject(400,280,0,100,16,null);//move with black hole     10
    this.mPlatform.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform);
    this.mPlatform=new MapObject(940,230,0,120,16,null);//11
    this.mPlatform.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform);
    this.mPlatform=new MapObject(1150,50,0,150,16,null);//12
    this.mPlatform.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform);
    this.mPlatform=new MapObject(1100,120,0,50,16,null);//bunker13
    this.mPlatform.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform);
    this.mPlatform=new MapObject(1200,120,0,50,16,null);//bunker14
    this.mPlatform.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform);
    this.mPlatform=new MapObject(1083,90,0,16,70,null);//15
    this.mPlatform.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform);
    this.mPlatform=new MapObject(1350,280,0,100,16,null);//16
    this.mPlatform.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform);
    this.mPlatform=new MapObject(1200,500,0,16,280,null);//shu17
    this.mPlatform.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform);
    this.mPlatform=new MapObject(1392,350,0,16,130,null);//18
    this.mPlatform.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform);
    this.mPlatform=new MapObject(1370,340,0,50,16,null);//bunker2   19
    this.mPlatform.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform);
    this.mPlatform=new MapObject(1225,500,0,50,16,null);//20
    this.mPlatform.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform);
    this.mPlatform=new MapObject(1100,632,0,200,16,null);//21
    this.mPlatform.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform);
    this.mPlatform=new MapObject(995,685,0,100,16,null);//22
    this.mPlatform.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform);
    this.mPlatform=new MapObject(953,735,0,16,100,null);//23
    this.mPlatform.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform);
    this.mPlatform=new MapObject(1037,705,0,16,50,null);//24
    this.mPlatform.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform);
    this.mPlatform=new MapObject(1190,830,0,300,16,null);//25
    this.mPlatform.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform);
    this.mPlatform=new MapObject(1275,890,0,100,16,null);//26
    this.mPlatform.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform);
    this.mPlatform=new MapObject(1450,630,0,16,400,null);//27
    this.mPlatform.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform);
    this.mPlatform=new MapObject(1500,650,0,100,16,null);//28
    this.mPlatform.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform);
    this.mPlatform=new MapObject(1470,720,0,50,16,null);//bunker   29
    this.mPlatform.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform);
    this.mPlatform=new MapObject(1600,920,0,100,16,null);//move up & down  30
    this.mPlatform.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform);
    this.mPlatform=new MapObject(1750,600,0,200,16,null);//move up & down  31
    this.mPlatform.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform);
    this.mPlatform=new MapObject(1890,200,0,80,16,null);//move up & down  32
    this.mPlatform.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform);
    this.mPlatform=new MapObject(1965,646,0,70,1108,null);//door ceiling  33
    this.mPlatform.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform);
    this.mPlatform=new MapObject(160,600,0,100,16,null);//disappear  34
    this.mPlatform.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform);
    this.mPlatform=new MapObject(240,400,0,100,16,null);//disappear   35
    this.mPlatform.mySetcolor();
    this.mPlatformSet.addToSet(this.mPlatform);
};
Level6_2.prototype.draw=function(){
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);
    this.mCamera.setupViewProjection();
    this.mBackground.draw(this.mCamera);
    this.mStarSet.draw(this.mCamera);
    this.mPlatformSet.draw(this.mCamera);
    this.mChaserSet.draw(this.mCamera);
    this.mRubbishSet.draw(this.mCamera);
    this.mToothSet1.draw(this.mCamera);
    this.mToothSet2.draw(this.mCamera);
    this.mToothSet3.draw(this.mCamera);
    this.mAllObjs.draw(this.mCamera);
    if(this.HoleFlag===1){
        this.mBlackHole.draw(this.mCamera);
    }
    this.mDoor.draw(this.mCamera);
    this.mShootingSet.draw((this.mCamera));
    
    var i;
    for(i=0;i<4;i++){
        if(this.flagTutorial===i){
            this.mTutorialSet.getObjectAt(i).draw(this.mCamera);
        }
    }
   
    this.mCui.setupViewProjection();
    this.mBackground.draw(this.mCui);
    this.mMsg.draw(this.mCui); 
    this.mMsg2.draw(this.mCui); 
    this.mMsg3.draw(this.mCui);
    
    if(this.died===1)
    {
        
        this.mCdead.setupViewProjection();
        this.mBackground.draw(this.mCdead);
    this.mStarSet.draw(this.mCdead);
    this.mPlatformSet.draw(this.mCdead);
    this.mChaserSet.draw(this.mCdead);
    this.mRubbishSet.draw(this.mCdead);
    this.mToothSet1.draw(this.mCdead);
    this.mToothSet2.draw(this.mCdead);
    this.mToothSet3.draw(this.mCdead);
    this.mAllObjs.draw(this.mCdead);
    if(this.HoleFlag===1){
        this.mBlackHole.draw(this.mCdead);
    }
    this.mDoor.draw(this.mCdead);
    this.mShootingSet.draw((this.mCdead));
    
        this.mDeadset.draw(this.mCdead);
        //console.log(this.mCdead.getWCCenter()[0],this.mCdead.getWCCenter()[1]);
    }

       
};
Level6_2.prototype.update=function(){
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.B)){
        this.flagTutorial++;
    }
    if(this.flagTutorial>=4&&this.died===0){
        var obj = this.mPlatformSet.getObjectAt(this.mCurrentObj);
        
    if(this.mHero.getXform().getXPos()>=1570&&this.mHero.getXform().getXPos()<=1630){
        obj.keyControl(this.mPlatformSet,null,80);
    }
    else if(this.mHero.getXform().getXPos()>1630&&this.mHero.getXform().getXPos()<=1830){
        obj.keyControl(this.mPlatformSet,null,0);
    }
    else if(this.mHero.getXform().getXPos()>1830&&this.mHero.getXform().getXPos()<=1930){
        obj.keyControl(this.mPlatformSet,null,400);
    }
    else{
        obj.keyControl(this.mPlatformSet,null,250);
    }
        
//        this.updateCameradead();
    this.updateKey(); 
    obj.getRigidBody().userSetsState();
    gEngine.Physics.processCollision(this.mPlatformSet, this.mCollisionInfos);
    
    this.updateCamera();
    this.updatePlatform();
    this.flag=this.mHero.updateChaser(this.mChaserSet,0);
    if(this.flag===1){
        this.starcount=this.starcount-2;
        this.isShake=1;
    }
    this.updateChaser();
    this.updateTooth();
    if(this.mHero.boundTest(this.mBlackHole)){
        this.HoleFlag=1;
        this.starcount=this.starcount-2;
        this.isShake=1;
        this.mHero.getXform().setPosition(this.mHero.getXform().getXPos(),158);
        this.mHero.getRigidBody().setVelocity(0,0);
    }
    
    var msg = "Now   :"+this.starcount;
    this.mMsg.setText(msg);
    
    this.updatemCui();
    this.mCui.update();
    if(this.mHero.boundTest(this.mDoor)&&this.starcount>=5){
        this.next=1;
        gEngine.GameLoop.stop();
    }
    else if(this.mHero.boundTest(this.mDoor)&&this.starcount<5){
//        this.re6=1;
//        gEngine.GameLoop.stop();
            this.died=1;
            this.notenough=1;
    }
    if(this.mHero.getXform().getYPos()<0){
//        this.restart=1;
//        gEngine.GameLoop.stop();
        this.died=1;
    }
    if(this.starcount<=0){
//        this.restart=1;
//        gEngine.GameLoop.stop();
        this.died=1;
        this.notenough=1;
    }
     this.updateShooting();
    }
     this.updateCameradead();
    
};
Level6_2.prototype.updatemCui= function(){
    var newcenterx =this.mCamera.mCameraState.getCenter()[0]-370 ;
    var newcentery=this.mCamera.mCameraState.getCenter()[1]+270;
   
     
    this.mCui.setWCCenter(newcenterx,newcentery);  

    this.mMsg2.getXform().setPosition(this.mCui.getWCCenter()[0]-20,this.mCui.getWCCenter()[1]+20);

    this.mMsg3.getXform().setPosition(this.mCui.getWCCenter()[0]-23,this.mCui.getWCCenter()[1]-8);
  
    this.mMsg.getXform().setPosition(this.mCui.getWCCenter()[0]-22,this.mCui.getWCCenter()[1]+3);
    
    //this.mCui.mCameraState.updateCameraState();
};
Level6_2.prototype.updateShooting=function(){
   this.mStarSet.update();
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.E)||gEngine.Input.isKeyClicked(gEngine.Input.keys.C)){ 
        this.starcount--;
        var c= new Item(this.mHero.getXform().getXPos(),this.mHero.getXform().getYPos(),0,30,30,this.kShooting);
        this.mShootingSet.addToSet(c);
    }
    
    //move
    var i,j;
    
    for(i=0;i<this.mShootingSet.size();i++){
        this.mShootingSet.getObjectAt(i).getXform().incYPosBy(12);
        this.mShootingSet.getObjectAt(i).getXform().incRotationByDegree(- 5);
        if(this.mShootingSet.size()>0){
        for(j=0;j<this.mChaserSet.size();j++){
            if(this.mShootingSet.getObjectAt(i).boundTest(this.mChaserSet.getObjectAt(j))){
                this.mShootingSet.getObjectAt(i).setVisibility(false);
                this.mShootingSet.removeFromSet(this.mShootingSet.getObjectAt(i));
                this.mChaserSet.getObjectAt(j).setVisibility(false);
                this.mChaserSet.removeFromSet(this.mChaserSet.getObjectAt(j));
            }
        }
    }
        if(this.mShootingSet.size()>0){
            if(this.mShootingSet.getObjectAt(i).getXform().getXPos()>2000||this.mShootingSet.getObjectAt(i).getXform().getXPos()<0
                    ||this.mShootingSet.getObjectAt(i).getXform().getYPos()>1200||this.mShootingSet.getObjectAt(i).getXform().getYPos()<0){
                this.mShootingSet.getObjectAt(i).setVisibility(false);
                this.mShootingSet.removeFromSet(this.mShootingSet.getObjectAt(i));
            }
        }

    }
    
};
Level6_2.prototype.updateTooth=function(){
  this.mToothSet1.update();
  this.mToothSet2.update();
  this.mToothSet3.update();
  if(this.mHero.getXform().getXPos()>=1400){
      this.time++;
      this.time2++;
      this.time3++;
      if(this.time===180){
          var c = new Item(1600,1200,-90,40,40,this.kTooth);
          this.mToothSet1.addToSet(c);
          this.time=0;
      }
      if(this.time2===120){
          var c= new Item(1700,1200,-90,40,40,this.kTooth);
          this.mToothSet2.addToSet(c);
          c= new Item(1750,1200,-90,40,40,this.kTooth);
          this.mToothSet2.addToSet(c);
          c= new Item(1800,1200,-90,40,40,this.kTooth);
          this.mToothSet2.addToSet(c);
          this.time2=0;
      }
    if(this.time3===240){
        var c= new Item(1900,150,180,40,40,this.kTooth);
        this.mToothSet3.addToSet(c);
        this.time3=0;
    }
  }
  
  var i;
  for(i=0;i<this.mToothSet1.size();i++){
        if(this.mHero.boundTest(this.mToothSet1.getObjectAt(i))){
            this.starcount=this.starcount-2;
            this.isShake=1;
            this.mToothSet1.getObjectAt(i).setVisibility(false);
            this.mToothSet1.removeFromSet(this.mToothSet1.getObjectAt(i));
        }
        else if(this.mToothSet1.getObjectAt(i).getXform().getYPos()<0){
            this.mToothSet1.getObjectAt(i).setVisibility(false);
            this.mToothSet1.removeFromSet(this.mToothSet1.getObjectAt(i));
        }
        else if(this.mToothSet1.getObjectAt(i).getXform().getYPos()>=0){
            this.mToothSet1.getObjectAt(i).getXform().incYPosBy(-3);
        }
  }
    for(i=0;i<this.mToothSet2.size();i++){
        if(this.mHero.boundTest(this.mToothSet2.getObjectAt(i))){
            this.starcount=this.starcount-2;
            this.isShake=1;
            this.mToothSet2.getObjectAt(i).setVisibility(false);
            this.mToothSet2.removeFromSet(this.mToothSet2.getObjectAt(i));
        }
        else if(this.mToothSet2.getObjectAt(i).getXform().getYPos()<0){
            this.mToothSet2.getObjectAt(i).setVisibility(false);
            this.mToothSet2.removeFromSet(this.mToothSet2.getObjectAt(i));
        }
        else if(this.mToothSet2.getObjectAt(i).getXform().getYPos()>=0){
            this.mToothSet2.getObjectAt(i).getXform().incYPosBy(-5);
        }
  }
    for(i=0;i<this.mToothSet3.size();i++){
        if(this.mHero.boundTest(this.mToothSet3.getObjectAt(i))){
            this.starcount=this.starcount-2;
            this.isShake=1;
            this.mToothSet3.getObjectAt(i).setVisibility(false);
            this.mToothSet3.removeFromSet(this.mToothSet3.getObjectAt(i));
        }
        else if(this.mToothSet3.getObjectAt(i).getXform().getXPos()<=1550){
            this.mToothSet3.getObjectAt(i).setVisibility(false);
            this.mToothSet3.removeFromSet(this.mToothSet3.getObjectAt(i));
        }
        else if(this.mToothSet3.getObjectAt(i).getXform().getXPos()>1550){
            this.mToothSet3.getObjectAt(i).getXform().incXPosBy(-14);
        }
  }

};
Level6_2.prototype.updateChaser=function(){
    this.mChaserSet.update();
    if(this.mHero.getXform().getXPos()<900&&this.mHero.getXform().getXPos()>600){
        this.timeLaunch++;
        if(this.timeLaunch === 120){
            var c = new Chaser(this.kRubbish,this.mRubbishSet.getObjectAt(0).getXform().getXPos(),this.mRubbishSet.getObjectAt(0).getXform().getYPos(),30,30,3,1000);
            c.setBoundRadius(15);
            this.mChaserSet.addToSet(c);
            this.timeLaunch=0;
        }
    }
    else{
        this.timeLaunch=100;
    }
    if(this.mHero.getXform().getXPos()>800&&this.mHero.getXform().getXPos()<1550){
        this.timeLaunch2++;    
        if(this.timeLaunch2 === 60){
            var c = new Chaser(this.kRubbish,this.mRubbishSet.getObjectAt(1).getXform().getXPos(),this.mRubbishSet.getObjectAt(1).getXform().getYPos(),30,30,3.1,1000);
            c.setBoundRadius(15);
            this.mChaserSet.addToSet(c);
            this.timeLaunch2=0;
        }
    }
    else{
        this.timeLaunch2=40;
    }

    // Cleanup DyePacks
    var i, j, obj, platformobj,r1,r2;
    for (i=0; i<this.mChaserSet.size(); i++) {
        obj = this.mChaserSet.getObjectAt(i);
        r1 = obj.getRigidBody();
        
        for (j=1; j<this.mPlatformSet.size(); j++){
            platformobj = this.mPlatformSet.getObjectAt(j);
            r2 = platformobj.getRigidBody();
            var h=new CollisionInfo();
            
            if (obj.hasExpired()) {
                this.mChaserSet.removeFromSet(obj);
            }
            else if(r1.collideRectRect(r1,r2,h)){
                this.mChaserSet.removeFromSet(obj);
            }
            
        }
    }
} ;
Level6_2.prototype.updateCamera=function(){
    this.mCamera.update();
    if(this.mHero.getXform().getXPos()>=400&&this.mHero.getXform().getXPos()<=1600){
        if(this.mHero.getXform().getYPos()>=300&&this.mHero.getXform().getYPos()<=900){
            this.mCamera.setWCCenter(this.mHero.getXform().getXPos(),this.mHero.getXform().getYPos());
        }
        else if(this.mHero.getXform().getYPos()<300){
            this.mCamera.setWCCenter(this.mHero.getXform().getXPos(),300);
        }
        else{
             this.mCamera.setWCCenter(this.mHero.getXform().getXPos(),900);
        }
    }
    else if(this.mHero.getXform().getXPos()<400){
        if(this.mHero.getXform().getYPos()>=300&&this.mHero.getXform().getYPos()<=900){
            this.mCamera.setWCCenter(400,this.mHero.getXform().getYPos());
        }
        else if(this.mHero.getXform().getYPos()<300){
            this.mCamera.setWCCenter(400,300);
        }
        else{
            this.mCamera.setWCCenter(400,900);
        }
    }
    else{
        if(this.mHero.getXform().getYPos()>=300&&this.mHero.getXform().getYPos()<=900){
             this.mCamera.setWCCenter(1600,this.mHero.getXform().getYPos());
        }
        else if(this.mHero.getXform().getYPos()<300){
            this.mCamera.setWCCenter(1600,300);
        }
        else{
            this.mCamera.setWCCenter(1600,900);
        }
    }
    
    if(this.isShake===1){
        this.mCamera.shake(6,6,20,30);
        this.isShake=0;
    }
    
};
var flag=0;//0 for 10 right
var flag2=0;// 0 for 30 up
var flag3= 0;//0 for 31 up
var flag4=0;// 0 for 32 up
Level6_2.prototype.updatePlatform=function(){
    this.mPlatformSet.update();
    //platform move
   // this.movePlatform(12,2,0,flag,750,400);///this failed
    if(this.mPlatformSet.getObjectAt(10).getXform().getXPos()>=750){
        flag=1;
    }
    else if(this.mPlatformSet.getObjectAt(10).getXform().getXPos()<=400){
        flag=0;
    }
    if(flag===0){
        this.mPlatformSet.getObjectAt(10).getXform().incXPosBy(2);
        this.mBlackHole.getXform().incXPosBy(2);
        this.mHero.CheckUpdate_Platform(this.mPlatformSet.getObjectAt(10),0,2);
    }
    else{
        this.mPlatformSet.getObjectAt(10).getXform().incXPosBy(-2);
        this.mBlackHole.getXform().incXPosBy(-2);
        this.mHero.CheckUpdate_Platform(this.mPlatformSet.getObjectAt(10),0,-2);
    }
    // for 32
    if(this.mPlatformSet.getObjectAt(30).getXform().getYPos()>=1000){
        flag2=1;
    }
    else if(this.mPlatformSet.getObjectAt(30).getXform().getYPos()<=300){
        flag2=0;
    }
    if(flag2===0){
        this.mPlatformSet.getObjectAt(30).getXform().incYPosBy(2);
        
    }
    else{
        this.mPlatformSet.getObjectAt(30).getXform().incYPosBy(-2);
    }
    //for 33
    if(this.mPlatformSet.getObjectAt(31).getXform().getYPos()>=1050){
        flag3=1;
    }
    else if(this.mPlatformSet.getObjectAt(31).getXform().getYPos()<=200){
        flag3=0;
    }
    if(flag3===0){
        this.mPlatformSet.getObjectAt(31).getXform().incYPosBy(4);
    }
    else{
        this.mPlatformSet.getObjectAt(31).getXform().incYPosBy(-4);
    }
    //for 34
    if(this.mPlatformSet.getObjectAt(32).getXform().getYPos()>=900){
        flag4=1;
    }
    else if (this.mPlatformSet.getObjectAt(32).getXform().getYPos()<=8){
        flag4=0;
    }
    if(flag4===0){
        this.mPlatformSet.getObjectAt(32).getXform().incYPosBy(5);
    }
    else{
        this.mPlatformSet.getObjectAt(32).getXform().incYPosBy(-5);
    }
    
    //dissapear
    if(this.mPlatformSet.size()>=35){
        if(this.mHero.CheckUpdate_Collision(this.mPlatformSet.getObjectAt(34))){
            this.mPlatformSet.getObjectAt(34).setVisibility(false);
            this.mPlatformSet.removeFromSet(this.mPlatformSet.getObjectAt(34));
        }
        if(this.mPlatformSet.size()>=36){
            if(this.mHero.CheckUpdate_Collision(this.mPlatformSet.getObjectAt(35))){
                this.mPlatformSet.getObjectAt(35).setVisibility(false);
                this.mPlatformSet.removeFromSet(this.mPlatformSet.getObjectAt(35));
            }
        }
    }
    

};

Level6_2.prototype.movePlatform=function(num,v,dir,Flag,bound1,bound2){
    if(dir===1){
        if(this.mPlatformSet.getObjectAt(num).getXform().getYPos()>=bound2){
            Flag=1;
        }
        else if (this.mPlatformSet.getObjectAt(num).getXform().getYPos()<=bound1){
            Flag=0;
        }
        if(Flag===0){
            this.mPlatformSet.getObjectAt(num).getXform().incYPosBy(v);
        }
        else{
            this.mPlatformSet.getObjectAt(num).getXform().incYPosBy(-v);
        }
    }
    else{
        if(this.mPlatformSet.getObjectAt(num).getXform().getXPos()>=bound2){
            Flag=1;
        }
        else if (this.mPlatformSet.getObjectAt(num).getXform().getXPos()<=bound1){
            Flag=0;
        }
        if(Flag===0){
            this.mPlatformSet.getObjectAt(num).getXform().incXPosBy(v);
            this.mHero.CheckUpdate_Platform(this.mPlatformSet.getObjectAt(num),0,v);
        }
        else{
            this.mPlatformSet.getObjectAt(num).getXform().incXPosBy(-v);
            this.mHero.CheckUpdate_Platform(this.mPlatformSet.getObjectAt(num),0,-v);
        }
    }

};


Level6_2.prototype.updateKey=function(){
    this.timeKey++;
    var flag =0;
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.N)) 
    {
        if(this.LastKeyNTime=== this.timeKey-1){
            this.KeyNCount++;
        }
        else{
            this.KeyNCount=1;
        }
        var newwidth =200 -10*this.KeyNCount;
        this.mKeyNBar.getXform().setSize(newwidth,3);
        if(newwidth<=0)
        {
            this.skip=true;
            gEngine.GameLoop.stop();
        }
        this.LastKeyNTime=this.timeKey;
        flag =1;  // accept space 
    }
    if(flag===0)
    {
        this.mKeyNBar.getXform().setSize(200,3);
        this.KeyNCount=0;
    }
    this.mAllObjs.update(this.mCamera);
};

Level6_2.prototype.updateCameradead = function () {
    this.mDeadset.update();
    this.mCdead.setWCCenter(this.mCamera.getWCCenter()[0],this.mCamera.getWCCenter()[1]);
    this.mMsgDead.getXform().setPosition(this.mCdead.getWCCenter()[0]-140,this.mCdead.getWCCenter()[1]+80);
    //console.log(this.mMsgDead.getXform().getPosition());
    this.restartbutton.getXform().setPosition(this.mCdead.getWCCenter()[0],this.mCdead.getWCCenter()[1]-20);
    this.backtbutton.getXform().setPosition(this.mCdead.getWCCenter()[0],this.mCdead.getWCCenter()[1]-100);
   
    var mx,my,rxf,bxf;
   
    mx=gEngine.Input.getMousePosX();
    my=gEngine.Input.getMousePosY();
    rxf=this.restartbutton.getXform();
    bxf=this.backtbutton.getXform();
   
   if(this.notenough===1){
                    this.mMsgDead.setText("You don't have enough stars");
                    this.mMsgDead.getXform().incXPosBy(-20);
                    this.mMsgDead.setTextHeight(20);
                }
    if(this.died===1)
    {
        //console.log(this.notenough);
         if(mx<464&&mx>336
                &&my<312&&my>248)
        {
            this.restartbutton.getXform().setPosition(this.mCdead.getWCCenter()[0],this.mCdead.getWCCenter()[1]-25);
            if(gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left))
            {   
                if(this.notenough===1){
                    
                    this.re6=true;
                }
                else{
                    this.restart=true; 
                }
                console.log(this.restart);
                gEngine.GameLoop.stop();
            }
        }
        else{
            this.restartbutton.getXform().setPosition(this.mCdead.getWCCenter()[0],this.mCdead.getWCCenter()[1]-20);
        }
       if(mx<464&&mx>336
                &&my<232&&my>168)
        {
            this.backtbutton.getXform().setPosition(this.mCdead.getWCCenter()[0],this.mCdead.getWCCenter()[1]-105);
            if(gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left))
            {   
                
                this.restart=false; 
                this.re6=false;
                gEngine.GameLoop.stop();
            }
        }
        else{
            this.backtbutton.getXform().setPosition(this.mCdead.getWCCenter()[0],this.mCdead.getWCCenter()[1]-100);
        }
    }
    
};
