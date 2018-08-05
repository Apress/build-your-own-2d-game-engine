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

function Level3(){
    this.kDoor="assets/2D_GAME_door.png";
    this.kSprite = "assets/animation.png";
    this.kStar = "assets/yellow.png";
    this.kHole="assets/Hole.png";
    this.kBlackHole="assets/BlackHole.png";
    this.kRubbish = "assets/2D_GAME_rubbish.png";
    this.kbg="assets/bgtest1.png";
    this.kCue="assets/Star.wav";
    this.kBGM = "assets/Lopu.mp3";
    this.kback="assets/back.png";
    this.krestart="assets/restart.png";


    this.mCamera=null;
    this.mCamera2=null;
    this.mCdead=null;
    
    this.mPlatformSet = null;
    this.mRubbishSet = null;
    this.mStarSet = null;
    this.mChaserSet = null;
    this.mSpringSet=null;
    
    this.mHero = null;
    this.mRubbish=null;
    this.mDoor=null;
    this.mHole=null;
    this.mUP=null;
    this.mMsg=null;
    
    this.mCui = null;
    this.mStaritem = null;
    
    this.timeLaunch = 80;
    this.timeKey=0;
    
    this.starcount = 0;
    this.totalcount = 5;
    
    this.restart=true;//false for restart the level3(itself)
    this.skip=false;//false to skip the level3;
    this.springcount = 0;
    this.springflag = 0;
    this.springfirst = 0;
    
    this.mKeyNBar=null;
    this.previousstarcount=0;
    this.died=0;
  
}
gEngine.Core.inheritPrototype(Level3, Scene);

Level3.prototype.loadScene=function(){
    gEngine.Textures.loadTexture(this.kDoor);
    gEngine.Textures.loadTexture(this.kSprite);
    gEngine.Textures.loadTexture(this.kStar);
    gEngine.Textures.loadTexture(this.kHole);
    gEngine.Textures.loadTexture(this.kBlackHole);
    gEngine.Textures.loadTexture(this.kRubbish);
    gEngine.Textures.loadTexture(this.kbg);
    gEngine.AudioClips.loadAudio(this.kCue);
  //  gEngine.AudioClips.playBackgroundAudio(this.kBGM);
    gEngine.Textures.loadTexture(this.kback);
    gEngine.Textures.loadTexture(this.krestart);
 if(gEngine.ResourceMap.isAssetLoaded("level3")){
        this.previousstarcount = gEngine.ResourceMap.retrieveAsset("level3");
    }


};

Level3.prototype.unloadScene=function(){
    gEngine.Textures.unloadTexture(this.kDoor);
    gEngine.Textures.unloadTexture(this.kSprite);
    gEngine.Textures.unloadTexture(this.kStar);
    gEngine.Textures.unloadTexture(this.kHole);
    gEngine.Textures.unloadTexture(this.kBlackHole);
    gEngine.Textures.unloadTexture(this.kRubbish); 
    gEngine.Textures.unloadTexture(this.kbg);
    gEngine.AudioClips.unloadAudio(this.kCue);
    gEngine.AudioClips.unloadAudio(this.kCue);
    gEngine.Textures.unloadTexture(this.krestart);
     gEngine.Textures.unloadTexture(this.kback);


    //gEngine.ResourceMap.loadstar("star",this.starcount);
    
    if(this.skip){
       var nextLevel =new Level4();
        
        gEngine.ResourceMap.loadstar("level3",5);
        //var nextLevel=new PassScene(3,this.starcount);                       
        gEngine.Core.startScene(nextLevel);
    }
    else{
        if(this.restart){
        var new_level=new Level3();
        gEngine.Core.startScene(new_level);
        }
        else{
                if(this.starcount>this.previousstarcount){
                    gEngine.ResourceMap.loadstar("level3",this.starcount);
            }
			 var new_level=new PassScene(3,this.starcount);
                gEngine.Core.startScene(new_level);
            
        }  
    }
    
};

Level3.prototype.initialize=function(){
    this.InitializeCamera();
    
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    this.mPlatformSet=new GameObjectSet();
    this.mRubbishSet=new GameObjectSet();
    this.mStarSet = new GameObjectSet(); 
    this.mChaserSet = new GameObjectSet(); 
    this.mSpringSet=new GameObjectSet();
    
     this.mMsg2 = new FontRenderable("Level 3");
    this.mMsg2.setColor([222/255, 212/255, 173/255, 1]);
    this.mMsg2.getXform().setPosition(10,50);
    this.mMsg2.setTextHeight(12);
    
    this.mMsg3 = new FontRenderable("Target:3");
    this.mMsg3.setColor([0.2, 0.2, 0.2, 1]);
    this.mMsg3.getXform().setPosition(7,22);
    this.mMsg3.setTextHeight(10);
    this.mMsg4 = new FontRenderable("Total :5");
    this.mMsg4.setColor([0.2, 0.2, 0.2, 1]);
    this.mMsg4.getXform().setPosition(7,10);
    this.mMsg4.setTextHeight(10);
    
    this.mMsg = new FontRenderable("Now   :0");
    this.mMsg.setColor([0.2, 0.2, 0.2, 1]);
    this.mMsg.getXform().setPosition(8,33);
    this.mMsg.setTextHeight(10);
    //this.mHero = new Hero(this.kSprite,590,150,50,50);
    this.mHero = new Hero(this.kSprite,1560,300,50,50,422);
    this.mFirstObject = this.mPlatformSet.size();
    this.mCurrentObj = this.mFirstObject;
    this.mPlatformSet.addToSet(this.mHero);
    
    this.mbg = new TextureRenderable(this.kbg);
    this.mbg.getXform().setPosition(1000,300);
    this.mbg.getXform().setSize(2000,600);
    
    this.InitializePlatform();
    this.InitializeRubbish();
    this.InitializeStar();
    this.initializeKeyN();
    this.initializeCameraDead();

    this.mUP = new Spring(this.kSprite,1400,35,50,50,574,0);
    this.mSpringSet.addToSet(this.mUP);
    
    this.mHole=new Item(1560,300,0,60,60,this.kHole);
    this.mDoor=new Item(40,280,0,60,60,this.kDoor);
    
   
  
     
};


Level3.prototype.initializeCameraDead = function(){
    this.mDeadset=new GameObjectSet();
    
    
//    this.mbg = new TextureRenderable(this.kbg);
//    this.mbg.getXform().setPosition(1000,300);
//    this.mbg.getXform().setSize(2000,600);
    //this.mDeadset.addToSet(this.mbg);
    
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

Level3.prototype.InitializeCamera=function(){
    this.mCamera = new Camera(
        vec2.fromValues(1200, 300), // position of the camera
        800,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
        //small camera
    this.mCamera2=new Camera(
        vec2.fromValues(800,300), // position of the camera
        1616,                     // width of camera
        [640, 540, 160, 60]         // viewport (orgX, orgY, width, height)
    );
     this.mCamera2.setBackgroundColor([0.9, 0.9, 0.9, 0.1]); 
     this.mCui = new Camera(
            vec2.fromValues(this.mCamera.mCameraState.getCenter()[0]-370, this.mCamera.mCameraState.getCenter()[1]+270),
            60,
            [0,510,90,90]);
     this.mCdead = new Camera(
            this.mCamera.mCameraState.getCenter(),
            400,
            [200,150,400,300]);
    this.mCdead.setBackgroundColor([0.705, 0.443, 0.341, 0.5 ]);
    

};
Level3.prototype.InitializePlatform=function(){
    this.mPlatform1=new MapObject(75,250,0,150,15,null);
    this.mPlatformSet.addToSet(this.mPlatform1);  
    this.mPlatform2 = new MapObject(400,500,0,100,15,null);
    this.mPlatformSet.addToSet(this.mPlatform2);
    //this.mPlatform3 = new MapObject(442.5,407.5,0,15,175,null);
    //this.mPlatformSet.addToSet(this.mPlatform3);
    this.mPlatform4 = new MapObject(500,327.5,0,100,15,null);
    this.mPlatformSet.addToSet(this.mPlatform4);
    //this.mPlatform5 = new MapObject(542.5,225,0,15,200,null);
    //this.mPlatformSet.addToSet(this.mPlatform5);
    this.mPlatform6 = new MapObject(590,132.5,0,80,15,null);
    this.mPlatformSet.addToSet(this.mPlatform6);
    this.mPlatform7 = new MapObject(800,50,0,105,15,null);//left & right )(down)
    this.mPlatformSet.addToSet(this.mPlatform7);
    this.mPlatform8 = new MapObject(800,250,0,105,15,null);//left & right &triangle(up)
    this.mPlatformSet.addToSet(this.mPlatform8);
    this.mPlatform9 = new MapObject(1250,500,0,95,15,null);//up & down
    this.mPlatformSet.addToSet(this.mPlatform9);
    this.mPlatform10 = new MapObject(1550,160,0,100,15,null);
    this.mPlatformSet.addToSet(this.mPlatform10);

    this.mPlatform11= new MapObject(-8,300,0,15,600,null); //leftwall
    this.mPlatformSet.addToSet(this.mPlatform11);
//    this.mPlatform12 = new MapObject(800,608,0,1616,15,null);//upwall
  //  this.mPlatformSet.addToSet(this.mPlatform12);
    this.mPlatform13 = new MapObject(1608,300,0,15,600,null);//rightwall
    this.mPlatformSet.addToSet(this.mPlatform13);

};

Level3.prototype.InitializeStar=function(){
    this.mStar1 = new Star(this.kSprite,1250,550,40,40);
    this.mStarSet.addToSet(this.mStar1);
    
    this.mStar2 = new Star(this.kSprite,850,200,40,40);
    this.mStarSet.addToSet(this.mStar2);
    
    this.mStar3 = new Star(this.kSprite,1100,300,40,40);
    this.mStarSet.addToSet(this.mStar3);
    
    this.mStar4 = new Star(this.kSprite,1250,160,40,40);
    this.mStarSet.addToSet(this.mStar4);
    this.mStar5 = new Star(this.kSprite,610,550,40,40);
    this.mStarSet.addToSet(this.mStar5);
};
Level3.prototype.InitializeRubbish=function(){
    this.mBlackHole = new Item(1250,280,0,80,80,this.kBlackHole);
    this.mRubbishSet.addToSet(this.mBlackHole);
    this.mRubbish = new Item(220,150,0,100,100,this.kRubbish);
    this.mRubbishSet.addToSet(this.mRubbish);
};
Level3.prototype.initializeKeyN = function(){
    
    this.mKeyNset=new GameObjectSet(); 
    this.mKeyNTip = new FontRenderable("Hold [N] to skip to Level4");
    this.mKeyNTip.setColor([0.447,0.286,0.219, 1]);
    this.mKeyNTip.getXform().setPosition(890,450);
    this.mKeyNTip.setTextHeight(14);
    this.mKeyNset.addToSet(this.mKeyNTip);
    
    this.mKeyNBar =new Renderable();
    this.mKeyNBar.setColor([0.447,0.286,0.219,1]);
    this.mKeyNBar.getXform().setPosition(995,430);
    this.mKeyNBar.getXform().setSize(200,3);
    this.mKeyNset.addToSet(this.mKeyNBar);
};
Level3.prototype.draw=function(){
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);
      
    this.mCamera.setupViewProjection();
    this.mbg.draw(this.mCamera);
    this.mDoor.draw(this.mCamera);
    this.mHole.draw(this.mCamera);
    this.mUP.draw(this.mCamera);
    this.mPlatformSet.draw(this.mCamera);
    this.mChaserSet.draw(this.mCamera);
    this.mRubbishSet.draw(this.mCamera);
    this.mStarSet.draw(this.mCamera);
    this.mKeyNset.draw(this.mCamera);
   
    
    this.mCamera2.setupViewProjection();
    this.mbg.draw(this.mCamera2);
    this.mDoor.draw(this.mCamera2);
    this.mHole.draw(this.mCamera2);
    this.mUP.draw(this.mCamera2);
    this.mChaserSet.draw(this.mCamera2);
    this.mPlatformSet.draw(this.mCamera2);
    this.mRubbishSet.draw(this.mCamera2);
    this.mStarSet.draw(this.mCamera2);
       
    
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
        this.mDoor.draw(this.mCdead);
        this.mHole.draw(this.mCdead);
        this.mUP.draw(this.mCdead);
        this.mChaserSet.draw(this.mCdead);
        this.mPlatformSet.draw(this.mCdead);
        this.mRubbishSet.draw(this.mCdead);
        this.mStarSet.draw(this.mCdead);
        this.mKeyNset.draw(this.mCdead);
        this.mDeadset.draw(this.mCdead);
    }
};



Level3.prototype.updatemCui= function(){
    var newcenterx =this.mCamera.mCameraState.getCenter()[0]-370 ;
    var newcentery=this.mCamera.mCameraState.getCenter()[1]+270;
    
  
     
    this.mCui.setWCCenter(newcenterx,newcentery);  
   
    this.mMsg2.getXform().setPosition(this.mCui.getWCCenter()[0]-20,this.mCui.getWCCenter()[1]+20);

    this.mMsg3.getXform().setPosition(this.mCui.getWCCenter()[0]-23,this.mCui.getWCCenter()[1]-8);

    this.mMsg4.getXform().setPosition(this.mCui.getWCCenter()[0]-23,this.mCui.getWCCenter()[1]-20);
  
    this.mMsg.getXform().setPosition(this.mCui.getWCCenter()[0]-22,this.mCui.getWCCenter()[1]+3);
    
    //this.mCui.mCameraState.updateCameraState();
};

Level3.prototype.update=function(){
       
    var obj = this.mPlatformSet.getObjectAt(this.mCurrentObj);
  if(this.died===0){
    obj.keyControl(this.mPlatformSet,this.mSpringSet,300);
  }
    obj.getRigidBody().userSetsState();
    
    this.mPlatformSet.update();
    this.mRubbishSet.update();
    this.mStarSet.update();
    this.mChaserSet.update();
    this.mCamera.update();
    this.updatePlatform();
    this.updateSpring();
    this.updateKey();
    this.mDeadset.update();
    this.updateCameradead();
    
    this.updatemCui();
    this.mCui.update();
    
    if((this.mHero.updateChaser(this.mChaserSet,1))===1)
    {
        this.died=1;
    }

    gEngine.Physics.processCollision(this.mPlatformSet, this.mCollisionInfos);

   if(this.mHero.getXform().getXPos()<=1200&&this.mHero.getXform().getXPos()>=400){
        this.mCamera.setWCCenter(this.mHero.getXform().getXPos(),300);
    }
    
    else if(this.mHero.getXform().getXPos()>=400&&this.mHero.getXform().getXPos()<=1200){
        this.mCamera.setWCCenter(this.mHero.getXform().getXPos(),300);
    }
  
    if(this.mHero.getXform().getXPos()<700){
        this.timeLaunch++;    
        if(this.timeLaunch === 100){
            var c = new Chaser(this.kRubbish,this.mRubbish.getXform().getXPos(),this.mRubbish.getXform().getYPos(),30,30,2,1000);
            c.setBoundRadius(15);
            this.mChaserSet.addToSet(c);
            this.timeLaunch=0;
        }
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
    
    var i;
    for(i=0;i<this.mStarSet.size();i++){
        if(this.mHero.boundTest(this.mStarSet.getObjectAt(i))){
            this.starcount++;
            this.mStarSet.getObjectAt(i).setVisibility(false);
            this.mStarSet.removeFromSet(this.mStarSet.getObjectAt(i));
            gEngine.AudioClips.playACue(this.kCue);
        }
    }
    
    for(i=0;i<this.mRubbishSet.size();i++){
        if(this.mHero.boundTest(this.mRubbishSet.getObjectAt(i))){
            //this.restart = true;
            //gEngine.GameLoop.stop();
            this.died=1;
        }
    }
    if(this.mHero.getXform().getYPos()<0){
        //this.restart = true;
            //gEngine.GameLoop.stop();
            this.died=1;
    }
    if(this.mHero.boundTest(this.mDoor)){
        this.restart=false;
        gEngine.GameLoop.stop();
    }
    
    
    var msg ="Now   :"+this.starcount;
    this.mMsg.setText(msg);
};

Level3.prototype.updateSpring=function(){
        if(this.mHero.boundTest(this.mUP)){
        
        if(this.springflag === 0){
            this.x=this.mHero.getXform().getXPos();
            this.y=this.mHero.getXform().getYPos();
            this.springflag=1;
        }
        
        //this.springcount++;
        
        if(this.springfirst===0){
            if(this.springcount<5)
            {
                this.mUP.update();
                this.mHero.getXform().setPosition(this.x,this.y);
                this.springcount++;
            }
            else{
                this.mHero.getXform().setPosition(this.x,this.y);
                this.mHero.getRigidBody().setVelocity(0,570);
                this.springcount=0;
                this.springflag=0;
                this.springfirst=1;
            }           
        }
        else{
            if(this.springcount<6)
            {
                this.mUP.update();
                this.mHero.getXform().setPosition(this.x,this.y);
                this.springcount++;
            }
            else{
                this.mHero.getXform().setPosition(this.x,this.y);
                this.mHero.getRigidBody().setVelocity(0,570);
                this.springcount=0;
                this.springflag=0;
                this.springfirst=1;
            }            
        }
    } 
};

Level3.prototype.updateKey=function(){
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
        var newwidth =200 -5*this.KeyNCount;
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
    this.mKeyNset.update(this.mCamera);
};
Level3.prototype.updatePlatform=function(){
        /*
    ////////platform9 up & down ///////////////
    if(this.mPlatformSet.getObjectAt(9).getXform().getYPos()>=550){
         this.flag9=0;//0 for platform9 down
    }
    else if(this.mPlatformSet.getObjectAt(9).getXform().getYPos()<=100){
        this.flag9=1;
    }
    if(this.flag9===0){
        this.mPlatformSet.getObjectAt(9).getXform().incYPosBy(-4);
    }
    else{
        this.mPlatformSet.getObjectAt(9).getXform().incYPosBy(4);
    }
    */
    ////////platform7(down) left & right////////
    if(this.mPlatformSet.getObjectAt(5).getXform().getXPos()<=800){
        this.flag7=0;//0 for right
    }
    else if(this.mPlatformSet.getObjectAt(5).getXform().getXPos()>=1200){
        this.flag7=1;
    }
    if(this.flag7===0){
        this.mPlatformSet.getObjectAt(5).getXform().incXPosBy(2);
        this.mHero.CheckUpdate_Platform(this.mPlatformSet.getObjectAt(5),0,2);
    }
    else{
       this.mPlatformSet.getObjectAt(5).getXform().incXPosBy(-2); 
       this.mHero.CheckUpdate_Platform(this.mPlatformSet.getObjectAt(5),0,-2);
    }
    
    ////////platform8(up) left &  right///////

    if(this.mPlatformSet.getObjectAt(6).getXform().getXPos()<=800){
        this.flag8=0;//0 for right
    }
    else if(this.mPlatformSet.getObjectAt(6).getXform().getXPos()>=1100){
        this.flag8=1;
    }
    if(this.flag8===0){       
        this.mPlatformSet.getObjectAt(6).getXform().incXPosBy(1);
        this.mHero.CheckUpdate_Platform(this.mPlatformSet.getObjectAt(6),0,1);
    }
    else{
        this.mPlatformSet.getObjectAt(6).getXform().incXPosBy(-1);
        this.mHero.CheckUpdate_Platform(this.mPlatformSet.getObjectAt(6),0,-1);
    }
};

Level3.prototype.updateCameradead = function () {
    this.mDeadset.update();
    this.mCdead.setWCCenter(this.mCamera.getWCCenter()[0]-800,this.mCamera.getWCCenter()[1]);
    this.mMsgDead.getXform().setPosition(this.mCdead.getWCCenter()[0]-140,this.mCdead.getWCCenter()[1]+80);
    //console.log(this.mMsgDead.getXform().getPosition());
    this.restartbutton.getXform().setPosition(this.mCdead.getWCCenter()[0],this.mCdead.getWCCenter()[1]-20);
    this.backtbutton.getXform().setPosition(this.mCdead.getWCCenter()[0],this.mCdead.getWCCenter()[1]-100);
   
    var mx,my,rxf,bxf;
   
    mx=gEngine.Input.getMousePosX();
    my=gEngine.Input.getMousePosY();
    rxf=this.restartbutton.getXform();
    bxf=this.backtbutton.getXform();
   
    if(this.died===1)
    {
        if(mx<400+rxf.getWidth()/2&&mx>400-rxf.getWidth()/2
                &&my<rxf.getYPos()+rxf.getHeight()/2&&my>rxf.getYPos()-rxf.getHeight()/2)
        {
            this.restartbutton.getXform().setPosition(this.mCdead.getWCCenter()[0],this.mCdead.getWCCenter()[1]-25);
            if(gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left))
            {   
                this.restart=true;            
                gEngine.GameLoop.stop();
            }
        }
        else{
            this.restartbutton.getXform().setPosition(this.mCdead.getWCCenter()[0],this.mCdead.getWCCenter()[1]-20);
        }
        if(mx<400+bxf.getWidth()/2&&mx>400-bxf.getWidth()/2
                &&my<bxf.getYPos()+bxf.getHeight()/2&&my>bxf.getYPos()-bxf.getHeight()/2)
        {
            this.backtbutton.getXform().setPosition(this.mCdead.getWCCenter()[0],this.mCdead.getWCCenter()[1]-105);
            if(gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left))
            {   
                this.restart=false;            
                gEngine.GameLoop.stop();
            }
        }
        else{
            this.backtbutton.getXform().setPosition(this.mCdead.getWCCenter()[0],this.mCdead.getWCCenter()[1]-100);
        }
    }
    
};

