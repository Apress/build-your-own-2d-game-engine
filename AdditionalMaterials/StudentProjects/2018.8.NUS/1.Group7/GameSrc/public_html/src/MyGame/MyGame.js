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
    
    this.kSprite = "assets/animation.png";
    this.kHole = "assets/Hole.png";
    this.kRubbish="assets/2D_GAME_rubbish.png";
    this.kStar = "assets/yellow.png";
    this.kbg="assets/bgtest1.png";
    this.kCue="assets/Star.wav";
    this.kBGM = "assets/Lopu.mp3";
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
    this.died=0;
    this.back=0;
    
    this.starcount = 0;
    this.totalcount = 14;
    
    this.restart = true;
    this.skip=false;
    this.mKeyNBar= null;
    this.time= 0;
    this.LastKeyNTime=0;
    this.KeyNCount=0;
    
    this.a=0;
    this.b=0;
    this.flag2=0;//0 for not begin
}

gEngine.Core.inheritPrototype(MyGame, Scene);


MyGame.prototype.loadScene = function () {
     
    gEngine.Textures.loadTexture(this.kSprite);
    gEngine.Textures.loadTexture(this.kHole);
    gEngine.Textures.loadTexture(this.kRubbish);
    gEngine.Textures.loadTexture(this.kStar);
     gEngine.Textures.loadTexture(this.kbg);
     gEngine.AudioClips.loadAudio(this.kCue);
  //  gEngine.AudioClips.playBackgroundAudio(this.kBGM);
    gEngine.Textures.loadTexture(this.kback);
    gEngine.Textures.loadTexture(this.krestart);


};

MyGame.prototype.unloadScene = function () {
    
    gEngine.Textures.unloadTexture(this.kSprite);
    gEngine.Textures.unloadTexture(this.kHole);
    gEngine.Textures.unloadTexture(this.kRubbish);
    gEngine.Textures.unloadTexture(this.kStar);
    gEngine.Textures.unloadTexture(this.kbg);
    gEngine.AudioClips.unloadAudio(this.kCue);
   // gEngine.AudioClips.stopBackgroundAudio();
    gEngine.Textures.unloadTexture(this.krestart);
     gEngine.Textures.unloadTexture(this.kback);


    
    if(this.skip)
      {    
          gEngine.ResourceMap.loadstar("star",this.starcount);
          var nextLevel =new BalanceLevel();
          gEngine.Core.startScene(nextLevel);
      }
      else{
          if(this.restart){
               var nextLevel =new MyGame();
               gEngine.Core.startScene(nextLevel);
           }
           else if(this.back){
               gEngine.ResourceMap.loadstar("level2",this.starcount);
               var nextLevel =new PassScene(2,this.starcount);
               
               gEngine.Core.startScene(nextLevel);
           }
           else{
               gEngine.ResourceMap.loadstar("star",this.starcount);
               var nextLevel =new BalanceLevel();
               gEngine.Core.startScene(nextLevel);
           }
      }
    //gEngine.ResourceMap.asyncLoadRequested()("Cui",this.mCui);
   
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(400, 300), // position of the camera
        800,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
        //small camera
    this.mCamera2=new Camera(
        vec2.fromValues(440,300), // position of the camera
        904,                     // width of camera
        [668, 510, 132, 90]         // viewport (orgX, orgY, width, height)
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
    

            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    this.mbg = new TextureRenderable(this.kbg);
    this.mbg.getXform().setPosition(1000,300);
    this.mbg.getXform().setSize(2000,600);
    
    this.mPlatformset = new GameObjectSet(); 
    this.mRubbishset = new GameObjectSet(); 
    this.mStarset = new GameObjectSet(); 
    this.mAllObjs= new GameObjectSet(); 
    
    
    this.mHero = new Hero(this.kSprite, 60,135,50,50,1024);
    this.mFirstObject = this.mPlatformset.size();
    this.mCurrentObj = this.mFirstObject;
    this.mPlatformset.addToSet(this.mHero);
    
    //this.mHero.setBoundRadius(30);
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


    this.platform1=new MapObject(100,100,0,200,16,null);
    this.mPlatformset.addToSet(this.platform1);
  
    this.platform2=new MapObject(192,225,0,16,250,null);
    this.mPlatformset.addToSet(this.platform2);
    
    this.platform3=new MapObject(250,342,0,100,16,null);
    this.mPlatformset.addToSet(this.platform3);
    
    this.platform4=new MapObject(505,285,0,150,16,null);
    this.mPlatformset.addToSet(this.platform4);
    
    this.platform5=new MapObject(165,168,0,40,16,null);
    this.mPlatformset.addToSet(this.platform5);
    
    this.platform6=new MapObject(780,300,0,16,600,null);
    this.mPlatformset.addToSet(this.platform6);
    this.platform7=new MapObject(880,300,0,16,600,null);// right wall
    this.mPlatformset.addToSet(this.platform7);
  
    var angle1 = Math.atan(140.0/50.0)*180*1.0/ 3.1415926;
    var len1= Math.sqrt(Math.pow(50,2)+Math.pow(300,2));
   
    this.platform9=new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.platform9.setColor([0.447,0.286,0.219,1]);
    this.platform9.getXform().setPosition(830,450);
    this.platform9.getXform().setRotationInDegree(angle1);
    this.platform9.getXform().setSize(len1,16);
    
    this.platform8=new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.platform8.setColor([0.447,0.286,0.219,1]);
    this.platform8.getXform().setPosition(830,150);
    this.platform8.getXform().setRotationInDegree(angle1);
    this.platform8.getXform().setSize(len1,16);
    
    this.platform10=new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.platform10.setColor([0.447,0.286,0.219,1]);
    this.platform10.getXform().setPosition(830,450);
    this.platform10.getXform().setRotationInDegree(180-angle1);
    this.platform10.getXform().setSize(len1,16);
    
    this.platform11=new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.platform11.setColor([0.447,0.286,0.219,1]);
    this.platform11.getXform().setPosition(830,150);
    this.platform11.getXform().setRotationInDegree(180-angle1);
    this.platform11.getXform().setSize(len1,16);
    
    this.platform12=new MapObject(830,300,0,100,16,null);
    this.mPlatformset.addToSet(this.platform12);

    this.platform13=new MapObject(-8,300,0,16,600,null);//left wall
    this.mPlatformset.addToSet(this.platform13);
    this.platform14=new MapObject(440,608,0,896,16,null);//top wall
    this.mPlatformset.addToSet(this.platform14);

    this.mHole=new Item(695,450,0,80,80,this.kHole);
    //this.mHole.setBoundRadius(40);
    //this.mItemset.addToSet(this.mHole);
    
    this.mRubbish=new Item(450,650,0,60,60,this.kRubbish);
    this.mRubbishset.addToSet(this.mRubbish);
    
    this.mRubbish3 = new Item(520,-30,0,60,60,this.kRubbish);
    this.mRubbishset.addToSet(this.mRubbish3);
    //this.createBounds();
    this.mRubbish2=new Item(250,430,0,50,50,this.kRubbish);
    this.mRubbishset.addToSet(this.mRubbish2);
    
    this.mStar = new Star(this.kSprite,500,320,40,40);
    this.mStarset.addToSet(this.mStar);
    
    this.mStar2 = new Star(this.kSprite, 50, 220,40,40);
    this.mStarset.addToSet(this.mStar2);
    this.initializeKeyN();
    this.initializeCameraDead();
  
};


MyGame.prototype.initializeCameraDead = function(){
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

MyGame.prototype.initializeKeyN= function(){
    
    this.mKeyNTip = new FontRenderable("Hold [N] to skip to Level2.2");
    this.mKeyNTip.setColor([0.447,0.286,0.219, 1]);
    this.mKeyNTip.getXform().setPosition(70,50);
    this.mKeyNTip.setTextHeight(14);
    this.mAllObjs.addToSet(this.mKeyNTip);
    
    this.mKeyNBar =new Renderable();
    this.mKeyNBar.setColor([0.447,0.286,0.219, 1]);
    this.mKeyNBar.getXform().setPosition(185,30);
    this.mKeyNBar.getXform().setSize(200,3);
    this.mAllObjs.addToSet(this.mKeyNBar);
};
// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    this.mbg.draw(this.mCamera);
    this.mRubbishset.draw(this.mCamera);
    this.mStarset.draw(this.mCamera);
    this.mPlatformset.draw(this.mCamera);
    this.mHole.draw(this.mCamera);
    this.mAllObjs.draw(this.mCamera); 
    this.platform8.draw(this.mCamera);
    this.platform9.draw(this.mCamera);
    this.platform10.draw(this.mCamera);
    this.platform11.draw(this.mCamera);
    
    this.mCamera2.setupViewProjection();
    this.mbg.draw(this.mCamera2);
    this.mPlatformset.draw(this.mCamera2);
    this.mRubbishset.draw(this.mCamera2);
    this.mStarset.draw(this.mCamera2);
    this.mHole.draw(this.mCamera2);
    this.platform8.draw(this.mCamera2);
    this.platform9.draw(this.mCamera2);
    this.platform10.draw(this.mCamera2);
    this.platform11.draw(this.mCamera2);
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
    this.mHole.draw(this.mCdead);
    this.mAllObjs.draw(this.mCdead); 
    this.platform8.draw(this.mCdead);
    this.platform9.draw(this.mCdead);
    this.platform10.draw(this.mCdead);
    this.platform11.draw(this.mCdead);
        this.mDeadset.draw(this.mCdead);
        //console.log(this.mCdead.getWCCenter()[0],this.mCdead.getWCCenter()[1]);
    }

    
};

MyGame.prototype.updatemCui= function(){
    var newcenterx =this.mCamera.mCameraState.getCenter()[0]-370 ;
    var newcentery=this.mCamera.mCameraState.getCenter()[1]+270;

    this.mCui.setWCCenter(newcenterx,newcentery);  

    this.mMsg2.getXform().setPosition(this.mCui.getWCCenter()[0]-20,this.mCui.getWCCenter()[1]+20);

    this.mMsg3.getXform().setPosition(this.mCui.getWCCenter()[0]-23,this.mCui.getWCCenter()[1]-8);

    this.mMsg4.getXform().setPosition(this.mCui.getWCCenter()[0]-23,this.mCui.getWCCenter()[1]-20);
  
    this.mMsg.getXform().setPosition(this.mCui.getWCCenter()[0]-22,this.mCui.getWCCenter()[1]+3);
    
    //this.mCui.mCameraState.updateCameraState();
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    if(this.mHero.getXform().getXPos()>=400){
        this.mCamera.setWCCenter(this.mHero.getXform().getXPos(),300);
    }
    if(this.mHero.getXform().getXPos()>480){
        this.mCamera.setWCCenter(480,300);
    }
    this.mCamera.update();
      
    this.updatemCui();
    this.mCui.update();
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
        var newwidth =200 -5*this.KeyNCount;
        this.mKeyNBar.getXform().setSize(newwidth,3);
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
        this.mKeyNBar.getXform().setSize(200,3);
        this.KeyNCount=0;
    }
    this.mAllObjs.update(this.mCamera); 
    
    
    this.mHole.getXform().incRotationByDegree(-0.5);
    //this.platform4.getXform().incRotationByDegree(1);

    var obj = this.mPlatformset.getObjectAt(this.mCurrentObj);
    if(this.died===0){
    obj.keyControl(this.mPlatformset,null,300);
    }
    obj.getRigidBody().userSetsState();
    
    this.mPlatformset.update(this.mCamera);
    this.mRubbishset.update(this.mCamera);
    this.mStarset.update(this.mCamera);
   
    
    this.mPlatformset.update(this.mCamera2);
    this.mRubbishset.update(this.mCamera2);
    this.mStarset.update(this.mCamera2);
    this.updateCameradead();
    
    this.a=this.a+0.01;

    if(this.mHero.getXform().getPosition()[0]>=420){
        this.flag2=1;
    }
    if(this.flag2===1){
        this.mRubbish.getXform().incYPosBy(-this.a);
        this.mRubbish3.getXform().incYPosBy(this.a);
    }

//change the rubbish2 's size
    if(this.size===0){
        this.flag=1;
    }
    else if(this.size===75){
        this.flag=0;
    }
    if(this.flag===1){
        this.size=this.size+1;
    }
    else{
        this.size=this.size-1;
    }
    this.mRubbish2.getXform().setSize(50+this.size,50+this.size);
    this.mRubbish2.setBoundRadius((50+this.size)/2);
    
    gEngine.Physics.processCollision(this.mPlatformset, this.mCollisionInfos);
    

    if(this.mHero.getXform().getYPos()<0)
    {
        //this.restart = true;
            //gEngine.GameLoop.stop();
            this.died=1;
    }

    if(this.mHero.boundTest(this.mHole))
    {
        this.restart = false;
        gEngine.GameLoop.stop();
    }
    
    var h = [];
    var i;
    for(i=0;i<this.mRubbishset.size();i++){
        if(this.mHero.boundTest(this.mRubbishset.getObjectAt(i))){
            //this.restart = true;
            //gEngine.GameLoop.stop();
            this.died=1;
        }
    }
    
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
};

MyGame.prototype.updateCameradead = function () {
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
                this.back=true;
                gEngine.GameLoop.stop();
            }
        }
        else{
            this.backtbutton.getXform().setPosition(this.mCdead.getWCCenter()[0],this.mCdead.getWCCenter()[1]-100);
        }
    }
    
};
