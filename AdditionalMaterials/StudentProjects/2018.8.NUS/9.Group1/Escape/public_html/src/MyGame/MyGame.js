/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObj, Mygameect, Mygame */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame(dialog) {

    this.kMinionSprite = "assets/minion_sprite.png";
    this.kPlatformTexture = "assets/platform.png";
    this.kWallTexture = "assets/wall.png";
    this.kTargetTexture = "assets/target.png";
    this.kParticleTexture = "assets/particle.png";
    this.kBackGround = "assets/back.png";
    this.kDoor = "assets/door.png";
    this.kladder = "assets/ladder.png";
    this.kKey = "assets/key.png";
    this.kPaper = "assets/tips.png";
    this.kMinion = "assets/shadow01.png";
    this.kNet = "assets/net.png";
    this.kGun = "assets/gun.png";
    this.kGun1 = "assets/Gun1.png";
    this.kbullet = "assets/bullet.png";
    this.kNetTrack = "assets/track.png";
    this.kRip = "assets/rip.png";
    this.kelevator = "assets/elevator.png";
    this.kSide = "assets/side.png";
    this.kChest = "assets/chest.png";
    this.kLargeSight = "assets/LargeSight.png";
    this.kTrap = "assets/trap.png";
    this.kRedTip = "assets/redtip.png";
    this.kHeroface = "assets/general_head.png";
    this.kWitchface = "assets/Witch_head.png";
    this.kWitchsprite = "assets/Witch_sprite.png";
    //restart and pass
    this.mRestart = false;

    //light
    this.kLight = null;

    //music
    this.kBgClip = "assets/sounds/BGClip.mp3";
    this.kfindzombie = "assets/sounds/findzombie.wav";
    this.kPistol = "assets/sounds/pistol.wav";
    
    // The camera to view the scene
    this.mCamera = null;
    this.mCamerasmall = null;

    //map
    this.mAllObjs = null;   //非常复杂，必须精简
    this.mElevator = [];
    this.mAllParticles = null;
    this.mBounds = null;
    this.mCollisionInfos = [];

    this.mBack = null;
    this.mDoor = null;
    this.mDoor1 = null;
    this.mchest = null;
    this.mchest1 = null;
    this.mchest3 = null;
    this.mRedTip = null;

    //map items
    this.mHero = null;
    this.mWitch =null;
    this.mMonster = [];
    this.mtrap = [];

    this.mLargeSight = null;
    this.mNet = null;
    this.mGun = null;
    this.mGun1 = null;
    this.mgunstate = false;
    this.mbullet = null;
    this.mbulletmovespeedflag = 0;
    this.mbulletflag = 0;
    this.mbulletdirection = 0;
    this.mNetTrack = null;
    this.ripNum = 0;
    this.ripSet = [];
    this.mTheLight = null;
    this.mMsg = null; 
    this.mpaper = null;
    this.mkey = null;
    this.mCurrentObj = 0;
    this.mTarget = null;
    
    //游戏状态的检测
    this.isMoving = true;
    this.iskey = false;
    this.isChest0 = false;
    this.isChest1 = false;
    this.isChest3 = false;
    this.isNet = 0;
    this.isGun = 0;
    this.isNetTrackSet = false;
    this.mdirection = 0;
    this.isOnElevator = false;
    //对每一个elevator进行判断
    this.iselevatorcrash1 = false;
    this.iselevatorcrash2 = false;
    this.iselevatorcrash3 = false;
    this.iselevatorcrash4 = false;
    this.istop1 = false;
    this.istop2 = false;
    this.istop3 = false;
    this.istop4 = false;
    //陷阱的移动判定
    this.isUp = true;
    this.isDialog = false;

    //初始化随机位置
    this.keyrandom = Math.floor(Math.random()*3);
    this.chestrandom = Math.floor(Math.random()*3);
    this.chest3random = Math.floor(Math.random()*3);
    this.keyPosition = [[135, 25],[20, 45],[100, 45]];
    this.chestPosition = [[-30, 25],[-30,45],[135,45]];
    this.chest3Position = [[40, 25],[60,45],[110,45]];
    
    //陷阱高度的常量
    this.mheight = 4;
    this.mheightorginal = 4;
    this.mtrapflag = 0;
    this.mtrapflag1 = 0;
    this.mTrapPauseSpeed = 100;
    
    this.talk1i = dialog;
    this.talkli2 = 0;
    this.talk1 = ["Where am I?","...The last thing I remember","was I lost the war","The honest General,"," how ironic this title is",
        "I lost the war","disappointed the old king"];
    this.talk2 = ["I can see your past","you're a general","but now,you're no one","the new king has claimed","you're a dead man",
        "It's a trap","the new king......","wants you dead"];
    
}
gEngine.Core.inheritPrototype(MyGame, Scene);


MyGame.prototype.loadScene = function () {
    //素材加载
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kPlatformTexture);
    gEngine.Textures.loadTexture(this.kWallTexture);
    gEngine.Textures.loadTexture(this.kTargetTexture);
    gEngine.Textures.loadTexture(this.kParticleTexture);
    gEngine.Textures.loadTexture(this.kBackGround);
    gEngine.Textures.loadTexture(this.kDoor);
    gEngine.Textures.loadTexture(this.kKey);
    gEngine.Textures.loadTexture(this.kPaper);
    gEngine.Textures.loadTexture(this.kMinion);
    gEngine.Textures.loadTexture(this.kChest);
    gEngine.Textures.loadTexture(this.kNet);
    gEngine.Textures.loadTexture(this.kGun);
    gEngine.Textures.loadTexture(this.kGun1);
    gEngine.Textures.loadTexture(this.kbullet);
    gEngine.Textures.loadTexture(this.kNetTrack);
    gEngine.Textures.loadTexture(this.kRip);
    gEngine.Textures.loadTexture(this.kelevator);
    gEngine.Textures.loadTexture(this.kSide);  
    gEngine.Textures.loadTexture(this.kLargeSight); 
    gEngine.Textures.loadTexture(this.kTrap);
    gEngine.Textures.loadTexture(this.kRedTip);
    gEngine.Textures.loadTexture(this.kHeroface);
    gEngine.Textures.loadTexture(this.kWitchface);
    gEngine.Textures.loadTexture(this.kWitchsprite);
    //音乐加载
    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.AudioClips.loadAudio(this.kfindzombie);
    gEngine.AudioClips.loadAudio(this.kPistol);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kPlatformTexture);
    gEngine.Textures.unloadTexture(this.kWallTexture);
    gEngine.Textures.unloadTexture(this.kTargetTexture);
    gEngine.Textures.unloadTexture(this.kParticleTexture);
    gEngine.Textures.unloadTexture(this.kBackGround);
    gEngine.Textures.unloadTexture(this.kDoor);
    gEngine.Textures.unloadTexture(this.kKey);
    gEngine.Textures.unloadTexture(this.kPaper);
    gEngine.Textures.unloadTexture(this.kMinion);
    gEngine.Textures.unloadTexture(this.kChest);
    gEngine.Textures.unloadTexture(this.kNet);
    gEngine.Textures.unloadTexture(this.kGun);
    gEngine.Textures.unloadTexture(this.kGun1);
    gEngine.Textures.unloadTexture(this.kbullet);
    gEngine.Textures.unloadTexture(this.kNetTrack);
    gEngine.Textures.unloadTexture(this.kRip);
    gEngine.Textures.unloadTexture(this.kelevator);
    gEngine.Textures.unloadTexture(this.kSide);    
    gEngine.Textures.unloadTexture(this.kLargeSight);  
    gEngine.Textures.unloadTexture(this.kTrap);
    gEngine.Textures.unloadTexture(this.kRedTip);  
    gEngine.Textures.unloadTexture(this.kHeroface);
    gEngine.Textures.unloadTexture(this.kWitchface);
    gEngine.Textures.unloadTexture(this.kWitchsprite);
    
    gEngine.AudioClips.unloadAudio(this.kBgClip);
    gEngine.AudioClips.unloadAudio(this.kfindzombie);
    gEngine.AudioClips.unloadAudio(this.kPistol);    
   if(this.mRestart){
       var mygame = new Revive(1);
       gEngine.Core.startScene(mygame,true);
   }else{
       var mygame = new MyGame2();
       gEngine.Core.startScene(mygame,true);
   }
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(-5, 10), // position of t                                                                                                       ``                                                                                                                                                                                                                                                                                                                                          he camera
        100,                     // width of camera
        [0, 0, 1024, 484]         // viewport (orgX, orgY, width, height)
    );
   
    
    this.mCamerasmall = new Camera(
        vec2.fromValues(-5, 10), // position of t                                                                                                       ``                                                                                                                                                                                                                                                                                                                                          he camera
        200,                     // width of camera
        [0, 390, 204, 96]         // viewport (orgX, orgY, width, height)
        );
    //to set the lights in the game world
    this.kLight = this._createALight(
        0,          //type
        [-5,10,0],  //position
        [0,0,0],    //direction
        [1,1,1,0.5],  //color
        30,         //far
        5,          //near
        5,          //inner
        30,          //outer
        1,          //intensity
        0.5,
    );
    this.kLight.mFar = 20;
    this.kLight.mNear = 10;

    // sets the background to gray
    gEngine.AudioClips.playBackgroundAudio(this.kBgClip);
    gEngine.DefaultResources.setGlobalAmbientIntensity(0);
    
    //back initial
    this._initialAll();
    this._initialTrap();
    this.mWitch = this._initialWitch(this.kWitchsprite,this.kLight);  //changes
    this.mHero = new Hero(this.kMinionSprite, this.kLight, -30, 10, 5, 8);

    this.mAllObjs = new GameObjectSet();
    this.mAllParticles = new ParticleGameObjectSet();

    this.createBounds2();
    this.createElevator();
    this.mFirstObject = this.mAllObjs.size();
    this.mCurrentObj = this.mFirstObject;
    this.mAllObjs.addToSet(this.mHero);

    this.mMsg = new FontRenderable("           ");
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(-10, -40);
    this.mMsg.setTextHeight(4);
    
    this._initialMinion();
    this.createSide();

     //rips
     var tempCount = 0;
     for(;tempCount<this.mMonster.length;tempCount++){
         var m = this._initialItem( this.kRip, 30, -50, 5, 5, this.kLight);
         this.ripSet.push(m);
     }
};

MyGame.prototype.draw = function () {
    // Step A: clear the canvas

    this.mCamera.setupViewProjection();
    //where is the item
    this.mBack.draw(this.mCamera);
    this.mchest.draw(this.mCamera);
    this.mchest1.draw(this.mCamera); 
    this.mchest3.draw(this.mCamera);
    this.mRedTip.draw(this.mCamera);
    this.mbullet.draw(this.mCamera);
    this.mNetTrack.draw(this.mCamera);
    this.mDoor.draw(this.mCamera);
    this.mDoor1.draw(this.mCamera);
    this.mAllObjs.draw(this.mCamera);
    this.mCollisionInfos = []; 
    this.mAllParticles.draw(this.mCamera);    
    this.mkey.draw(this.mCamera);
    this.mNet.draw(this.mCamera);
    this.mGun.draw(this.mCamera);
    this.mGun1.draw(this.mCamera);
    this.mLargeSight.draw(this.mCamera);
    this.mCollisionInfos = []; 
    this.mWitch.draw(this.mCamera);
    
    var tempCount = 0;
    for(;tempCount<this.mMonster.length;tempCount++){
        this.ripSet[tempCount].draw(this.mCamera);
    }
    
     for(var i = 0;i < this.mtrap.length; i++){
        this.mtrap[i].draw(this.mCamera);
    }
    this.mpaper.draw(this.mCamera);
    this.mMsg.draw(this.mCamera); 
    
};

MyGame.prototype.increasShapeSize = function(obj, delta) {
    var s = obj.getRigidBody();
    var r = s.incShapeSizeBy(delta);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.kBoundDelta = 0.1;

MyGame.prototype.updateState = function(){
    var xHero = this.mHero.mRenderComponent.mXform.mPosition[0];
    var yHero = this.mHero.mRenderComponent.mXform.mPosition[1];

    //the light and camera with hero
    this.kLight.mPosition[0] = xHero;
    this.kLight.mPosition[1] = yHero;  
    this.mCamera.mCameraState.mCenter.mCurrentValue[0] = xHero;
    this.mCamera.mCameraState.mCenter.mCurrentValue[1] = yHero;
    if(!this.isMoving){
        this.mpaper.mXform.mPosition[0] = xHero;
        this.mMsg.mXform.mPosition[0] = xHero-12;
        this.mpaper.mXform.mPosition[1] = yHero;
        this.mMsg.mXform.mPosition[1] = yHero;
    }else{
        this.mpaper.mXform.mPosition[1] = -100;
        this.mMsg.mXform.mPosition[1] = -100;
    }
    //update the item's position
    if(this.iskey){
        this.mkey.mXform.mPosition[0] = xHero - 9;
        this.mkey.mXform.mPosition[1] = yHero + 12;
    }
    if(this.isChest0){       
        this.mNet.mXform.mPosition[0] = xHero + 3;
        this.mNet.mXform.mPosition[1] = yHero + 12;
    }
    if(this.isGun){
        this.mGun.mXform.mPosition[0] = xHero + 9;
        this.mGun.mXform.mPosition[1] = yHero + 12;
        if(this.mgunstate === true && this.mbulletflag === 1){
            this.mGun1.mXform.mPosition[0] = xHero + 9;
            this.mGun1.mXform.mPosition[1] = yHero + 12;               
        }
    }
    if(this.isChest3){
        this.mLargeSight.mXform.mPosition[0] = xHero - 3;
        this.mLargeSight.mXform.mPosition[1] = yHero + 12;
    }
    
};

MyGame.prototype.update = function () {
    var msg = "";   
    var that = this;
    var moveStep = 0.3;
    
    //detect the netTrack
    if(this.isNetTrackSet){
        var kill = this.NetTrack();
        if(kill) this.isNetTrackSet = false;
    }
   
//moving th elevator
    [this.istop1,this.iselevatorcrash1]= this.elevatoraction(this.mElevator[0],2,22,this.istop1,this.iselevatorcrash1);
    [this.istop2,this.iselevatorcrash2]= this.elevatoraction(this.mElevator[1],22,42,this.istop2,this.iselevatorcrash2);
    [this.istop3,this.iselevatorcrash3]= this.elevatoraction(this.mElevator[2],22,42,this.istop3,this.iselevatorcrash3);
    [this.istop4,this.iselevatorcrash4]= this.elevatoraction(this.mElevator[3],42,62,this.istop4,this.iselevatorcrash4);

    if(this.talk1i !== 8) this.talk1fun(xHero,yHero);

    // 
    this.updateState();
    this.showChest();
    this.CrashIntoMonster();
    this.CrashIntoTrap();
    this.MoveTrap();
    this.chase();
    this.bulletjudge();
    this.mWitch.updateAnimation();
    // operate
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
        if(this.isMoving){
            this.mHero.mRenderComponent.mXform.incYPosBy(0.2);
        }
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.K)) {
        if(this.isNet){
            var xHero = this.mHero.mRenderComponent.mXform.mPosition[0];
            var yHero = this.mHero.mRenderComponent.mXform.mPosition[1];
            this.mNetTrack.mXform.mPosition[0] = xHero;
            this.mNetTrack.mXform.mPosition[1] = yHero;
            this.isNet -= 1;
            if(this.isNet===0){
                this.mNet.mXform.mPosition[0] = -40;
                this.mNet.mXform.mPosition[1] = -40;
                this.isChest0 = false;
            }   
            this.isNetTrackSet = true;
        }
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.L)) {
        if(this.isGun){
            if(this.mgunstate === false){
            gEngine.AudioClips.playACue(this.kPistol);
            this.bulletmove();              
            this.isGun -= 1;
            if(this.isGun===0){
                this.mGun.mXform.mPosition[0] = -40;
                this.mGun.mXform.mPosition[1] = -40;
                this.isChest1 = true;
            }  
            }
        }
        this.mgunstate = true;
    }


   
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        if(this.isMoving){
            this.mHero.mRenderComponent.mXform.mPosition[0]-=moveStep;
            this.mdirection = -1;
        }
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        if(this.isMoving){
           this.mHero.mRenderComponent.mXform.mPosition[0]+=moveStep; 
           this.mdirection = 1;
        }
        
    }
    // to interact with the item
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space) && this.isDialog === false) {
        var hero = this.mHero;
        var floor = hero.floor;
        var xNow = hero.mRenderComponent.mXform.mPosition[0];

        switch (floor) {
            case 0:
                if (this.isMoving) {
                    if ((xNow > -10) && (xNow < 0) && this.isChest0 === false) {
                        var xHero = this.mHero.mRenderComponent.mXform.mPosition[0];
                        var yHero = this.mHero.mRenderComponent.mXform.mPosition[1];
                        this.mNet.mXform.mPosition[0] = xHero + 20;
                        this.mNet.mXform.mPosition[1] = yHero + 20;
                        this.mNet.mXform.mScale[0] = 4;
                        this.mNet.mXform.mScale[1] = 4;
                        this.mMsg.mText = "You have got the chest";
                        this.isMoving = !this.isMoving;
                        this.isChest0 = true;
                        this.isNet = 8;
                    }
                }
                else {
                    this.isMoving = !this.isMoving;
                }
                break;
            case 1:
                if (this.isMoving) {
                    if ((xNow > this.keyPosition[0][0] - 5) && (xNow < this.keyPosition[0][0] + 5) && this.iskey === false && this.keyrandom === 0) {
                        var xHero = this.mHero.mRenderComponent.mXform.mPosition[0];
                        var yHero = this.mHero.mRenderComponent.mXform.mPosition[1];
                        this.mkey.mXform.mPosition[0] = xHero + 20;
                        this.mkey.mXform.mPosition[1] = yHero + 20;
                        this.mkey.mXform.mScale[0] = 2.5;
                        this.mkey.mXform.mScale[1] = 3;
                        this.mMsg.mText = "    You got the key!    ";
                        this.isMoving = false;
                        this.iskey = true;
                    }
                    ;
                    if ((xNow > this.chestPosition[0][0] - 5) && (xNow < this.chestPosition[0][0] + 5) && this.isChest1 === false && this.chestrandom === 0) {
                        var xHero = this.mHero.mRenderComponent.mXform.mPosition[0];
                        var yHero = this.mHero.mRenderComponent.mXform.mPosition[1];
                        this.mGun.mXform.mPosition[0] = xHero + 20;
                        this.mGun.mXform.mPosition[1] = yHero + 20;
                        this.mGun.mXform.mScale[0] = 4;
                        this.mGun.mXform.mScale[1] = 4;
                        this.mMsg.mText = "You have got the pistol";
                        this.isMoving = false;
                        this.isChest1 = true;
                        this.isGun = 3;
                    }
                    ;
                    if ((xNow > this.chest3Position[0][0] - 5) && (xNow < this.chest3Position[0][0] + 5) && this.isChest3 === false && (this.chest3random === 0)) {
                        var xHero = this.mHero.mRenderComponent.mXform.mPosition[0];
                        var yHero = this.mHero.mRenderComponent.mXform.mPosition[1];
                        this.mLargeSight.mXform.mScale[0] = 4;
                        this.mLargeSight.mXform.mScale[1] = 4;
                        this.mMsg.mText = "You have got a new skill";
                        this.isMoving = false;
                        this.isChest3 = true;
                        this.kLight.mFar = 40;

                    }

                } else {
                    this.isMoving = true;
                }
                ;
                break;
            case 2:
                if (this.isMoving) {
                    if ((xNow > this.keyPosition[2][0] - 5) && (xNow < this.keyPosition[2][0] + 5) && this.iskey === false && this.keyrandom === 2) {
                        var xHero = this.mHero.mRenderComponent.mXform.mPosition[0];
                        var yHero = this.mHero.mRenderComponent.mXform.mPosition[1];
                        this.mkey.mXform.mPosition[0] = xHero + 20;
                        this.mkey.mXform.mPosition[1] = yHero + 20;
                        this.mkey.mXform.mScale[0] = 2.5;
                        this.mkey.mXform.mScale[1] = 3;
                        this.mMsg.mText = "   You got the key! ";
                        this.isMoving = false;
                        this.iskey = true;
                    } else if ((xNow > this.keyPosition[1][0] - 5) && (xNow < this.keyPosition[1][0] + 5) && this.iskey === false && this.keyrandom === 1) {
                        var xHero = this.mHero.mRenderComponent.mXform.mPosition[0];
                        var yHero = this.mHero.mRenderComponent.mXform.mPosition[1];
                        this.mkey.mXform.mPosition[0] = xHero + 20;
                        this.mkey.mXform.mPosition[1] = yHero + 20;
                        this.mkey.mXform.mScale[0] = 2.5;
                        this.mkey.mXform.mScale[1] = 3;
                        this.mMsg.mText = "   You got the key! ";
                        this.isMoving = false;
                        this.iskey = true;
                    }
                    ;
                    if ((xNow > this.chestPosition[1][0] - 5) && (xNow < this.chestPosition[1][0] + 5) && this.isChest1 === false && this.chestrandom === 1) {
                        var xHero = this.mHero.mRenderComponent.mXform.mPosition[0];
                        var yHero = this.mHero.mRenderComponent.mXform.mPosition[1];
                        this.mGun.mXform.mPosition[0] = xHero + 20;
                        this.mGun.mXform.mPosition[1] = yHero + 20;
                        this.mGun.mXform.mScale[0] = 4;
                        this.mGun.mXform.mScale[1] = 4;
                        this.mMsg.mText = "You have got the pistol";
                        this.isMoving = !this.isMoving;
                        this.isChest1 = true;
                        this.isGun = 3;
                    } else if ((xNow > this.chestPosition[2][0] - 5) && (xNow < this.chestPosition[2][0] + 5) && this.isChest1 === false && this.chestrandom === 2) {
                        var xHero = this.mHero.mRenderComponent.mXform.mPosition[0];
                        var yHero = this.mHero.mRenderComponent.mXform.mPosition[1];
                        this.mGun.mXform.mPosition[0] = xHero + 20;
                        this.mGun.mXform.mPosition[1] = yHero + 20;
                        this.mGun.mXform.mScale[0] = 4;
                        this.mGun.mXform.mScale[1] = 4;
                        this.mMsg.mText = "You have got the pistol";
                        this.isMoving = !this.isMoving;
                        this.isChest1 = true;
                        this.isGun = 3;
                    }
                    ;
                    if ((xNow > this.chest3Position[1][0] - 5) && (xNow < this.chest3Position[1][0] + 5) && this.isChest3 === false && (this.chest3random === 1)) {
                        var xHero = this.mHero.mRenderComponent.mXform.mPosition[0];
                        var yHero = this.mHero.mRenderComponent.mXform.mPosition[1];
                        this.mLargeSight.mXform.mScale[0] = 4;
                        this.mLargeSight.mXform.mScale[1] = 4;
                        this.mMsg.mText = "You have got a new skill";
                        this.isMoving = false;
                        this.isChest3 = true;
                        this.kLight.mFar = 40;

                    } else if ((xNow > this.chest3Position[2][0] - 5) && (xNow < this.chest3Position[2][0] + 5) && this.isChest3 === false && (this.chest3random === 2)) {
                        var xHero = this.mHero.mRenderComponent.mXform.mPosition[0];
                        var yHero = this.mHero.mRenderComponent.mXform.mPosition[1];
                        this.mLargeSight.mXform.mScale[0] = 4;
                        this.mLargeSight.mXform.mScale[1] = 4;
                        this.mMsg.mText = "You have got a new skill";
                        this.isMoving = false;
                        this.isChest3 = true;
                        this.kLight.mFar = 40;

                    }
                } else {
                    this.isMoving = true;
                }
                break;

            case 3:
                if (this.isMoving) {
                    if (this.iskey === true) {
                        if ((xNow > -34) && (xNow < -26)) {
                            this.mMsg.mText = "You passed this part!!";
                            gEngine.AudioClips.stopBackgroundAudio(this.kBgClip);
                            gEngine.GameLoop.stop();
                        }
                    } else if (this.iskey === false) {
                        if ((xNow < -34) && (xNow > -26)) {
                            var xHero = this.mHero.mRenderComponent.mXform.mPosition[0];
                            var yHero = this.mHero.mRenderComponent.mXform.mPosition[1];

                            this.mpaper.mXform.mPosition[0] = xHero;
                            this.mMsg.mXform.mPosition[0] = xHero - 12;
                            this.mpaper.mXform.mPosition[1] = yHero;
                            this.mMsg.mXform.mPosition[1] = yHero;
                            this.mMsg.mText = "You need to find the key!!";

                            this.isMoving = false;
                        }

                    }
                    if ((xNow > -15) && (xNow < -5)) {
                        if (this.talkli2 === 0) {
                            this.mMsg.mText = this.talk2[this.talkli2];
                            this.isMoving = false;
                            this.talkli2++;
                        }
                    }
                } else {
                    if (this.talkli2 < 8) {
                        this.mMsg.mText = this.talk2[this.talkli2];
                        this.talkli2++;
                    }
                    else {
                        this.isMoving = true;


                        this.mpaper.mXform.mPosition[0] = -50;
                        this.mMsg.mXform.mPosition[0] = -50;
                        this.mpaper.mXform.mPosition[1] = yHero;
                        this.mMsg.mXform.mPosition[1] = yHero;
                    }

                }
                break;
        }
    }
    var obj = this.mAllObjs.getObjectAt(this.mCurrentObj);

    obj.getRigidBody().userSetsState();
    this.mAllObjs.update(this.mCamera);
    
    gEngine.Physics.processCollision(this.mAllObjs, this.mCollisionInfos);
    gEngine.ParticleSystem.collideWithRigidSet(this.mAllObjs, this.mAllParticles);

};

