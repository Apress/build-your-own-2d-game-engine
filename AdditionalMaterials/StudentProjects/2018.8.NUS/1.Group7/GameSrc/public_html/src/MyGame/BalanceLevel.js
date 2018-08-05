/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, MyGame,  vec2 ,Math*/
"use strict"; 
function BalanceLevel() {
    // all squares
    // The camera to view the scene
    this.mCamera = null;
    this.mCui = null;
    this.mCdead=null;
    this.kHero= "assets/animation.png";
    this.kMud= "assets/Mud.png";
    this.mHero = null;
    this.kBall= "assets/Ball.png";
    this.kWall= "assets/wall.png";
    this.kStar = "assets/yellow.png";
    this.kHole="assets/Hole.png";
    this.starcount = 0;
    this.totalcount = 14;
    this.kBlackHole= "assets/BlackHole.png";
    this.restart = true;
    this.skip=false;
    this.kTooth="assets/tooth.png";
    this.kkeyDown="assets/keyDown.png";
    this.kkeyUp="assets/keyUp.png";
    this.kkeyS="assets/keyS.png";
    this.kkeyW="assets/keyW.png";
    this.kbg="assets/background.png";    
    this.kCue="assets/Star.wav";
    this.kBGM = "assets/Lopu.mp3";
    this.kback="assets/back.png";
    this.krestart="assets/restart.png";
    this.back=0;


    this.mKeyNBar= null;
    this.time= 0;
    this.LastKeyNTime=0;
    this.KeyNCount=0;
    this.died=0;
}
gEngine.Core.inheritPrototype(BalanceLevel, Scene);

BalanceLevel.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kHero);
    gEngine.Textures.loadTexture(this.kMud);
    gEngine.Textures.loadTexture(this.kWall);
    gEngine.Textures.loadTexture(this.kBall);
    gEngine.Textures.loadTexture(this.kStar);
    gEngine.Textures.loadTexture(this.kHole);
    gEngine.Textures.loadTexture(this.kBlackHole);
    gEngine.Textures.loadTexture(this.kTooth);
    gEngine.Textures.loadTexture(this.kkeyDown);
    gEngine.Textures.loadTexture(this.kkeyUp);
    gEngine.Textures.loadTexture(this.kkeyS);
    gEngine.Textures.loadTexture(this.kkeyW);
    gEngine.Textures.loadTexture(this.kbg);
    gEngine.AudioClips.loadAudio(this.kCue);
    gEngine.Textures.loadTexture(this.kback);
    gEngine.Textures.loadTexture(this.krestart);


    
    //gEngine.AudioClips.playBackgroundAudio(this.kBGM);
    
    if(gEngine.ResourceMap.isAssetLoaded("star")){
        //this.mCui = gEngine.ResourceMap.retrieveAsset("Cui");
        this.starcount = gEngine.ResourceMap.retrieveAsset("star");
    }
};

BalanceLevel.prototype.unloadScene = function () {
     gEngine.Textures.unloadTexture(this.kHero);
     gEngine.Textures.unloadTexture(this.kMud);
     gEngine.Textures.unloadTexture(this.kBall);
     gEngine.Textures.unloadTexture(this.kWall);
     gEngine.Textures.unloadTexture(this.kStar);
     gEngine.Textures.unloadTexture(this.kHole);
     gEngine.Textures.unloadTexture(this.kBlackHole);
     gEngine.Textures.unloadTexture(this.kTooth);
     gEngine.Textures.unloadTexture(this.kkeyDown);
     gEngine.Textures.unloadTexture(this.kkeyUp);
     gEngine.Textures.unloadTexture(this.kkeyS);
     gEngine.Textures.unloadTexture(this.kkeyW);
     gEngine.Textures.unloadTexture(this.kbg);
     gEngine.AudioClips.unloadAudio(this.kCue);
   //  gEngine.AudioClips.stopBackgroundAudio();
     gEngine.Textures.unloadTexture(this.krestart);
     gEngine.Textures.unloadTexture(this.kback);



	  if(this.skip)
	     {
                gEngine.ResourceMap.loadstar("star",this.starcount);
	        var nextLevel =new Level2_3();
	        gEngine.Core.startScene(nextLevel);
	     }
	     else{
	        if(this.restart){
	            var nextLevel =new BalanceLevel();
	            gEngine.Core.startScene(nextLevel);
	        }
                else if(this.back){
               gEngine.ResourceMap.loadstar("level2",this.starcount);
               var nextLevel =new PassScene(2,this.starcount);
               
               gEngine.Core.startScene(nextLevel);
                }
	        else{
	            gEngine.ResourceMap.loadstar("star",this.starcount);
	            var nextLevel =new Level2_3();
	            gEngine.Core.startScene(nextLevel);
	        } 
	     }
};

BalanceLevel.prototype.initialize= function(){
    this.mCamera = new Camera(
        vec2.fromValues(400, 150), // position of the camera
       400,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
     this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
     
     this.mCamera2= new Camera(
        vec2.fromValues(400, 300), // position of the camera
        320,                     // width of camera
        [722, 480, 64, 120]         // viewport (orgX, orgY, width, height)
    );
      this.mCamera2.setBackgroundColor([0.9, 0.9, 0.9, 1]);
     gEngine.DefaultResources.setGlobalAmbientIntensity(3);
      
     this.mCui = new Camera(
            vec2.fromValues(this.mCamera.mCameraState.getCenter()[0]-370, this.mCamera.mCameraState.getCenter()[1]+270),
            60,
            [0,510,90,90]);

     this.mCdead = new Camera(
            this.mCamera.mCameraState.getCenter(),
            200,
            [200,150,400,300]);
    this.mCdead.setBackgroundColor([0.705, 0.443, 0.341, 0.5 ]);
    

    this.mbg = new TextureRenderable(this.kbg);
    this.mbg.getXform().setPosition(400,300);
    this.mbg.getXform().setSize(800,600);
        this.mMsg2 = new FontRenderable("Level 2");
    this.mMsg2.setColor([222/255, 212/255, 173/255, 1]);
    this.mMsg2.getXform().setPosition(10,50);
    this.mMsg2.setTextHeight(12);
    
    this.mMsg3 = new FontRenderable("Target:8");
    this.mMsg3.setColor([0.2, 0.2, 0.2, 1]);
    this.mMsg3.getXform().setPosition(7,22);
    this.mMsg3.setTextHeight(10);
    this.mMsg4 = new FontRenderable("Total :14");
    this.mMsg4.setColor([0.2, 0.2, 0.2, 1]);
    this.mMsg4.getXform().setPosition(7,10);
    this.mMsg4.setTextHeight(10);
    
    this.mMsg = new FontRenderable("Now   :0");
    this.mMsg.setColor([0.2, 0.2, 0.2, 1]);
    this.mMsg.getXform().setPosition(8,33);
    this.mMsg.setTextHeight(10);


    this.mAllObjs = new GameObjectSet();  
    this.mFirstObject = this.mAllObjs.size();
    this.mCurrentObj = this.mFirstObject;
     

    this.mHole=new Item(280,560,0,40,40,this.kHole);
    this.mAllObjs.addToSet(this.mHole);
    
    this.initializeLever();
    
    var Xsum =this.RightPoint.getXform().getXPos()+this.LeftPoint.getXform().getXPos();
    var Ysum =this.RightPoint.getXform().getYPos()+this.LeftPoint.getXform().getYPos();
    this.heroheight =40;
    this.herowidth =40;
    this.mHero = new Hero(this.kHero, Xsum*1.0/2, Ysum*1.0/2+this.lever.getXform().getHeight()+ this.heroheight/2,this.herowidth,this.heroheight,1024);
    this.mHero.getRigidBody().setMass(0);
    this.mAllObjs.addToSet(this.mHero);
  
    this.initializeStar();
    this.initializeBlackHole();
    this.initializeTooth();
    this.initializeGuideobj();
    this.initializeKeyN();
    this.initializeCameraDead();
};


BalanceLevel.prototype.initializeCameraDead = function(){
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


BalanceLevel.prototype.initializeLever= function(){
    this.mOtherObjs= new GameObjectSet(); 
     
    this.LeftPoint = new LeverEndPoint(this.kBall,240,0,12, 12);  
    this.mOtherObjs.addToSet(this.LeftPoint);
    this.RightPoint = new LeverEndPoint(this.kBall,560,0,12, 12);  
    this.mOtherObjs.addToSet(this.RightPoint);
    this.LeftBorder = new LeverBorder(this.kWall,240,300,4,600);  
    this.mOtherObjs.addToSet(this.LeftBorder);
    this.RightBorder = new LeverBorder(this.kWall,560,300,4,600);  
    this.mOtherObjs.addToSet(this.RightBorder);
    var Xdiff= this.RightPoint.getXform().getXPos()-this.LeftPoint.getXform().getXPos();
    var Ydiff =this.RightPoint.getXform().getYPos()-this.LeftPoint.getXform().getYPos();
    var Xsum =this.RightPoint.getXform().getXPos()+this.LeftPoint.getXform().getXPos();
    var Ysum =this.RightPoint.getXform().getYPos()+this.LeftPoint.getXform().getYPos();
    var length= Math.sqrt(Math.pow(Xdiff,2)+Math.pow(Ydiff,2));
    this.lever = new Lever(this.kMud, Xsum*1.0/2, Ysum*1.0/2,length,4);
    this.mOtherObjs.addToSet(this.lever);
 
    
};
BalanceLevel.prototype.initializeStar= function(){
    this.mStarset = new GameObjectSet(); 
    
    this.mStar = new Star(this.kHero,  470, 40,35,35);
    this.mStarset.addToSet(this.mStar);
    this.mStar2 = new Star(this.kHero, 270, 78,30,30);
    this.mStarset.addToSet(this.mStar2);
    this.mStar3 = new Star(this.kHero, 400, 489,28,28);
    this.mStarset.addToSet(this.mStar3);
    this.mStar4 = new Star(this.kHero, 290,220,20,20);
    this.mStarset.addToSet(this.mStar4);
    this.mStar5 = new Star(this.kHero,320, 358,15,15);
    this.mStarset.addToSet(this.mStar5);
    this.mStar6 = new Star(this.kHero,440,135,36,36);
    this.mStarset.addToSet(this.mStar6);
    this.mStar7 = new Star(this.kHero,520, 290 ,20,20);
    this.mStarset.addToSet(this.mStar7);
    this.mStar8 = new Star(this.kHero,321, 310 ,30,30);
    this.mStarset.addToSet(this.mStar8);
    this.mStar9 = new Star(this.kHero,490, 560,30,30);
    this.mStarset.addToSet(this.mStar9);
    this.mStar10 = new Star(this.kHero,397, 421 ,16,16);
    this.mStarset.addToSet(this.mStar10);  
};
BalanceLevel.prototype.initializeBlackHole= function(){
    this.mBlackHoleset = new GameObjectSet(); 
    
    this.mBH=new Item(340,70,4,19,19,this.kBlackHole);
    this.mBlackHoleset.addToSet(this.mBH);
    this.mBH1=new Item(390,123,12,25,25,this.kBlackHole);
    this.mBlackHoleset.addToSet(this.mBH1);
    this.mBH2=new Item(523,170,9,24,24,this.kBlackHole);
    this.mBlackHoleset.addToSet(this.mBH2);
    this.mBH3=new Item(400,300,12,19,19,this.kBlackHole);
    this.mBlackHoleset.addToSet(this.mBH3);
    this.mBH4=new Item(496,392,4,50,50,this.kBlackHole);
    this.mBlackHoleset.addToSet(this.mBH4);
    this.mBH5=new Item(398,520,7,24,24,this.kBlackHole);
    this.mBlackHoleset.addToSet(this.mBH5);
    this.mBH6=new Item(430,456,12,36,36,this.kBlackHole);
    this.mBlackHoleset.addToSet(this.mBH6);
    this.mBH7=new Item(395,588,18,23,23,this.kBlackHole);
    this.mBlackHoleset.addToSet(this.mBH7);
    this.mBH8=new Item(321,278,1,26,26,this.kBlackHole);
    this.mBlackHoleset.addToSet(this.mBH8);
    this.mBH9=new Item(521,312,3,35,35,this.kBlackHole);
    this.mBlackHoleset.addToSet(this.mBH9);
    this.mBH10=new Item(321,410,10,36,36,this.kBlackHole);
    this.mBlackHoleset.addToSet(this.mBH10);
    this.mBH11=new Item(489,221,14,45,45,this.kBlackHole);
    this.mBlackHoleset.addToSet(this.mBH11);    
};
BalanceLevel.prototype.initializeTooth= function(){
  this.mToothset = new GameObjectSet(); 
    
    this.mTooth=new Item(247.5,100,0,15,15,this.kTooth);
    this.mToothset.addToSet(this.mTooth);
    this.mTooth1=new Item(247.5,115,0,15,15,this.kTooth);
    this.mToothset.addToSet(this.mTooth1);
    this.mTooth2=new Item(247.5,130,0,15,15,this.kTooth);
    this.mToothset.addToSet(this.mTooth2);
    this.mTooth3=new Item(247.5,145,0,15,15,this.kTooth);
    this.mToothset.addToSet(this.mTooth3);
    this.mTooth4=new Item(247.5,70,0,15,15,this.kTooth);
    this.mToothset.addToSet(this.mTooth4);
    this.mTooth5=new Item(247.5,85,0,15,15,this.kTooth);
    this.mToothset.addToSet(this.mTooth5);    
    
    this.mTooth6=new Item(247.5,200,0,15,15,this.kTooth);
    this.mToothset.addToSet(this.mTooth6);
    this.mTooth7=new Item(247.5,215,0,15,15,this.kTooth);
    this.mToothset.addToSet(this.mTooth7);
    this.mTooth8=new Item(247.5,230,0,15,15,this.kTooth);
    this.mToothset.addToSet(this.mTooth8);
    this.mTooth18=new Item(247.5,245,0,15,15,this.kTooth);
    this.mToothset.addToSet(this.mTooth18);    
    this.mTooth19=new Item(247.5,260,0,15,15,this.kTooth);
    this.mToothset.addToSet(this.mTooth19);   
     
    this.mTooth9=new Item(247.5,400,0,15,15,this.kTooth);
    this.mToothset.addToSet(this.mTooth9);
    this.mTooth10=new Item(247.5,415,0,15,15,this.kTooth);
    this.mToothset.addToSet(this.mTooth10);
    this.mTooth11=new Item(247.5,430,0,15,15,this.kTooth);
    this.mToothset.addToSet(this.mTooth11);    
    this.mTooth20=new Item(247.5,445,0,15,15,this.kTooth);
    this.mToothset.addToSet(this.mTooth20);
    this.mTooth21=new Item(247.5,460,0,15,15,this.kTooth);
    this.mToothset.addToSet(this.mTooth21);
    this.mTooth22=new Item(247.5,475,0,15,15,this.kTooth);
    this.mToothset.addToSet(this.mTooth22);
    this.mTooth30=new Item(247.5,385,0,15,15,this.kTooth);
    this.mToothset.addToSet(this.mTooth30);
    this.mTooth31=new Item(247.5,370,0,15,15,this.kTooth);
    this.mToothset.addToSet(this.mTooth31);
    this.mTooth32=new Item(247.5,355,0,15,15,this.kTooth);
    this.mToothset.addToSet(this.mTooth32);  
    
    
    this.mTooth12=new Item(552.5,370,180,15,15,this.kTooth);
    this.mToothset.addToSet(this.mTooth12);
    this.mTooth13=new Item(552.5,385,180,15,15,this.kTooth);
    this.mToothset.addToSet(this.mTooth13);
    this.mTooth14=new Item(552.5,400,180,15,15,this.kTooth);
    this.mToothset.addToSet(this.mTooth14);
    this.mTooth15=new Item(552.5,415,180,15,15,this.kTooth);
    this.mToothset.addToSet(this.mTooth15);
    this.mTooth16=new Item(552.5,430,180,15,15,this.kTooth);
    this.mToothset.addToSet(this.mTooth16);
    this.mTooth17=new Item(552.5,445,180,15,15,this.kTooth);
    this.mToothset.addToSet(this.mTooth17);    
    
    
    
    this.mTooth23=new Item(552.5,60,180,15,15,this.kTooth);
    this.mToothset.addToSet(this.mTooth23);
    this.mTooth24=new Item(552.5,75,180,15,15,this.kTooth);
    this.mToothset.addToSet(this.mTooth24);
    this.mTooth25=new Item(552.5,90,180,15,15,this.kTooth);
    this.mToothset.addToSet(this.mTooth25);    
    this.mTooth26=new Item(552.5,105,180,15,15,this.kTooth);
    this.mToothset.addToSet(this.mTooth26);
    this.mTooth27=new Item(552.5,120,180,15,15,this.kTooth);
    this.mToothset.addToSet(this.mTooth27);
    this.mTooth28=new Item(552.5,30,180,15,15,this.kTooth);
    this.mToothset.addToSet(this.mTooth28);    
    this.mTooth29=new Item(552.5,45,180,15,15,this.kTooth);
    this.mToothset.addToSet(this.mTooth29);    
};
BalanceLevel.prototype.initializeGuideobj= function(){
    this.mguideset =new GameObjectSet(); 
   
    this.mguidekeyS = new TextureRenderable(this.kkeyS);
    this.mguidekeyS.getXform().setPosition(225,10);
    this.mguidekeyS.getXform().setSize(16,8);
    this.mguideset.addToSet(this.mguidekeyS);
     
    this.mguidekeyW = new TextureRenderable(this.kkeyW);
    this.mguidekeyW.getXform().setPosition(225,20);
    this.mguidekeyW.getXform().setSize(16,8);
    this.mguideset.addToSet(this.mguidekeyW);
    
        
    this.mguidekeyUp = new TextureRenderable(this.kkeyUp);
    this.mguidekeyUp.getXform().setPosition(575,20);
    this.mguidekeyUp.getXform().setSize(16,8);
    this.mguideset.addToSet(this.mguidekeyUp);
     
    this.mguidekeyDown= new TextureRenderable(this.kkeyDown);
    this.mguidekeyDown.getXform().setPosition(575,10);
    this.mguidekeyDown.getXform().setSize(16,8);
    this.mguideset.addToSet(this.mguidekeyDown);
};

BalanceLevel.prototype.initializeKeyN= function(){
    this.mKeyNTip = new FontRenderable("Hold [N] to skip to Level2.3");
    this.mKeyNTip.setColor([0.447,0.286,0.219, 1]);
    this.mKeyNTip.getXform().setPosition(250,20);
    this.mKeyNTip.setTextHeight(7);
    this.mAllObjs.addToSet(this.mKeyNTip);
    
    this.mKeyNBar =new Renderable();
    this.mKeyNBar.setColor([0.447,0.286,0.219,1]);
    this.mKeyNBar.getXform().setPosition(310,10);
    this.mKeyNBar.getXform().setSize(100,1.5);
    this.mAllObjs.addToSet(this.mKeyNBar);
};
BalanceLevel.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.7, 0.7, 0.7, 1.0]); // clear to deep gray

    // Step  B: Activate the drawing Camera
   this.mCamera.setupViewProjection();
   this.mbg.draw(this.mCamera);
   this.mStarset.draw(this.mCamera);
    this.mBlackHoleset.draw(this.mCamera);
    this.mToothset.draw(this.mCamera);
    this.mguideset.draw(this.mCamera);
    this.mAllObjs.draw(this.mCamera);
    this.mOtherObjs.draw(this.mCamera);
    
    this.mCamera2.setupViewProjection();
    this.mbg.draw(this.mCamera2);
    this.mStarset.draw(this.mCamera2);
    this.mBlackHoleset.draw(this.mCamera2);
    this.mToothset.draw(this.mCamera2);
    this.mAllObjs.draw(this.mCamera2);
    this.mOtherObjs.draw(this.mCamera2);
    
      // this.mCollisionInfos = []; 
    this.mCui.setupViewProjection();
    this.mbg.draw(this.mCui);
    this.mMsg.draw(this.mCui); 
    this.mMsg2.draw(this.mCui);
    this.mMsg3.draw(this.mCui);
    this.mMsg4.draw(this.mCui);
    
    
    if(this.died===1)
    {
        this.mCdead.setupViewProjection();
        this.mbg.draw(this.mCdead);
        this.mStarset.draw(this.mCdead);
        this.mBlackHoleset.draw(this.mCdead);
        this.mToothset.draw(this.mCdead);
        this.mAllObjs.draw(this.mCdead);
        this.mOtherObjs.draw(this.mCdead);
        this.mguideset.draw(this.mCdead);
        this.mDeadset.draw(this.mCdead);
    }
};

BalanceLevel.prototype.updatemCui= function(){
    var newcenterx =this.mCamera.getWCCenter()[0]-370 ;
    var newcentery=this.mCamera.getWCCenter()[1]+120;
    
    //console.log(this.mCamera.mCameraState.getCenter()[0]-370);
   // console.log(this.mCamera.mCameraState.getCenter()[1]+120);
     
    this.mCui.setWCCenter(newcenterx,newcentery);  
    //console.log(this.mCui.mCameraState.getCenter());
    this.mMsg2.getXform().setPosition(this.mCui.getWCCenter()[0]-20,this.mCui.getWCCenter()[1]+20);

    this.mMsg3.getXform().setPosition(this.mCui.getWCCenter()[0]-23,this.mCui.getWCCenter()[1]-8);

    this.mMsg4.getXform().setPosition(this.mCui.getWCCenter()[0]-23,this.mCui.getWCCenter()[1]-20);
  
    this.mMsg.getXform().setPosition(this.mCui.getWCCenter()[0]-22,this.mCui.getWCCenter()[1]+3);
    
    //this.mCui.mCameraState.updateCameraState();
};


BalanceLevel.prototype.update = function () {
    var deltaY = 1;
    var xformLeft = this.LeftPoint.getXform();
    var xformRight = this.RightPoint.getXform();

//camera movement
    this.mCamera.update();
    if(this.mHero.getXform().getYPos()>=150){
        this.mCamera.setWCCenter(400,this.mHero.getXform().getYPos());
    }
    if(this.mHero.getXform().getYPos()>=450){
        this.mCamera.setWCCenter(400,450);
    }
    
   this.mCamera.update();
    this.updatemCui();
    this.mCui.update();
     this.mHole.getXform().incRotationByDegree(1);
    this.updateCameradead();
    
    if(this.died===0){
    // Support hero movements
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
        if(xformLeft.getYPos()<570)
        {    xformLeft.incYPosBy(deltaY);
        }  
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
        if(xformLeft.getYPos()>0)
        {
            xformLeft.incYPosBy(-deltaY);
        }
    }
    
     if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)) {
        if(xformRight.getYPos()<570)
        {   xformRight.incYPosBy(deltaY);
        }  
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
        if(xformRight.getYPos()>0)
        {   xformRight.incYPosBy(-deltaY);
        }
    }
    }
    var Ydiff =this.RightPoint.getXform().getYPos()-this.LeftPoint.getXform().getYPos();
    var Xdiff =this.RightPoint.getXform().getXPos()-this.LeftPoint.getXform().getXPos();
    var Ysum =this.RightPoint.getXform().getYPos()+this.LeftPoint.getXform().getYPos();
    var Xsum =this.RightPoint.getXform().getXPos()+this.LeftPoint.getXform().getXPos();
    var length= Math.sqrt(Math.pow(Xdiff,2)+Math.pow(Ydiff,2));
    var angle = Math.atan(Ydiff *1.0/Xdiff);

    this.lever.getXform().setSize(length,4);
    this.lever.getXform().setPosition(Xsum*1.0/2, Ysum*1.0/2);
    this.lever.getXform().setRotationInRad(angle);
    
    this.lever.getRigidBody().setTransform(this.lever.getXform());
    this.lever.getRigidBody().mWidth=length;
    
    var heronewY= (this.mHero.getXform().getXPos()-this.LeftPoint.getXform().getXPos())*Ydiff/Xdiff+
            (this.LeftPoint.getXform().getYPos()+ this.lever.getXform().getHeight()+this.mHero.getXform().getHeight()/2+ 2)  - 9* Math.cos(angle);
    var heronewX= this.mHero.getXform().getXPos()- 9* Math.sin(angle);
    if( heronewY >600) heronewY= 600 ;
    if( heronewY <0) heronewY= 0 ;
    if( heronewX >560-this.herowidth/2) heronewX= 560-this.herowidth/2 ;
    if( heronewX <240+this.herowidth/2) heronewX= 240+this.herowidth/2 ;
    this.mHero.getXform().setPosition(heronewX,heronewY);
    this.mHero.getXform().setRotationInRad(angle); 
    
    this.time++;
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
    this.mAllObjs.update(this.mCamera);
    this.mOtherObjs.update(this.mCamera);
    this.mStarset.update(this.mCamera);
    this.mStarset.update(this.mCamera2);
    this.mBlackHoleset.update(this.mCamera);
    this.mBlackHoleset.update(this.mCamera2);
    this.mToothset.update(this.mCamera);
    this.mToothset.update(this.mCamera2);
    this.mDeadset.update();
      
    var h = [];
    var i;
    for(i=0;i<this.mStarset.size();i++){
        if(this.mHero.boundTest(this.mStarset.getObjectAt(i))){
            this.starcount++;
            this.mStarset.getObjectAt(i).setVisibility(false);
            this.mStarset.removeFromSet(this.mStarset.getObjectAt(i));
            gEngine.AudioClips.playACue(this.kCue);
        }
    }
    
    var msg ="Now   :"+this.starcount;
    this.mMsg.setText(msg);
    
    var h=[];
    if(this.mHero.boundTest(this.mHole)){
        this.restart=false;
        gEngine.GameLoop.stop();
    }
    var h = [];
    var i;
    for(i=0;i<this.mBlackHoleset.size();i++){
        if(this.mHero.boundTest(this.mBlackHoleset.getObjectAt(i))){
            //this.restart = true;
            //gEngine.GameLoop.stop();
            this.died=1;
        }
    }
    
    var h = [];
    var i;
    for(i=0;i<this.mToothset.size();i++){
        if(this.mHero.boundTest(this.mToothset.getObjectAt(i),h)){
           //this.restart = true;
            //gEngine.GameLoop.stop();
            this.died=1;
        }
    }
    
    
    
};

BalanceLevel.prototype.updateCameradead = function () {
    this.mDeadset.update();
    this.mCdead.setWCCenter(this.mCamera.getWCCenter()[0],this.mCamera.getWCCenter()[1]);
    this.mMsgDead.getXform().setPosition(this.mCdead.getWCCenter()[0]-70,this.mCdead.getWCCenter()[1]+40);
    //console.log(this.mMsgDead.getXform().getPosition());
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
