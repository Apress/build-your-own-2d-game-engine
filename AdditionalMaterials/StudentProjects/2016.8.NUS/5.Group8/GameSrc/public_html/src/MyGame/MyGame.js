/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
  GameObject, TiledGameObject, ParallaxGameObject, Hero1, Minion, Dye, Light */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
var BulletTextureType1="assets/Bullet1.png";
var BulletTextureType2="assets/Bullet2.png";
var BulletTextureType3="assets/Bullet3.png";
var BulletTextureSoldier="assets/SoldierBullet.png";
var BulletTextureArcher="assets/DoubleArrow.png";
var BulletTextureArrow="assets/TraceArrow.png";
var FireBall="assets/FireBall.png";
var shotSound="assets/shotSound.wav";
var manSound="assets/man.wav";
var jumpSound="assets/jump.wav";
var womanSound="assets/woman.wav";
var boxSound="assets/box.wav";
var ArrowSound="assets/RainArrow.wav";
var SpeedUpSound="assets/SpeedUp.mp3";
var kShot = "assets/shotresource.png";
var Hero3_animation = "assets/hero3_animation.png";
var player1=1;
var player2=2;

function MyGame() {
    this.heroTexture1 = "assets/Hero1.1.png";
    this.heroTexture2 = "assets/Hero2.1.png";
    this.kBulletTexture = "assets/Bullet1.png";
    this.kPlatform = "assets/platform.png";
    this.kBoxTexture="assets/Box.png";
    this.backGroundTexture="assets/background.jpg";
    this.kStatus = "Status: ";
    this.kBgMusic = "assets/bgsound.mp3";
    this.mPlatformSet=null;
    // The camera to view the scene
    this.mCamera = null;
    this.mMsg1 = null;
    this.mMsg2 = null;
    this.mMsg3=null;
    this.mMsg4=null;
    this.mPlatformSet=null;
    this.mHero1 = null;
    this.mHero2 = null;
    this.mPath = null;
    this.backGround=null;
    this.hero1Life=3;
    this.hero2Life=3;
    this.keyBoard1=1;
    this.keyBoard2=2;
 
    this.mBox=null; //随机盒子
    this.boxShowTime=400;//箱子出现的时间
    this.timeTick=0; //计时器
    
    // Bullet.js has already been read in ...
    Bullet.kTexture = this.kBulletTexture;
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    gEngine.AudioClips.loadAudio(this.kBgMusic);
    gEngine.AudioClips.loadAudio(shotSound);
    gEngine.AudioClips.loadAudio(manSound);
    gEngine.AudioClips.loadAudio(womanSound);
    gEngine.AudioClips.loadAudio(jumpSound);
    gEngine.AudioClips.loadAudio(boxSound);
    gEngine.AudioClips.loadAudio(ArrowSound);
    gEngine.AudioClips.loadAudio(AimSound);
    gEngine.AudioClips.loadAudio(ShotSound);
    gEngine.AudioClips.loadAudio(SpeedUpSound);
    gEngine.Textures.loadTexture(this.heroTexture1);
    gEngine.Textures.loadTexture(this.heroTexture2);
    gEngine.Textures.loadTexture(this.kBulletTexture);
    gEngine.Textures.loadTexture(this.kPlatform);
    gEngine.Textures.loadTexture(this.kBoxTexture);
    gEngine.Textures.loadTexture(this.backGroundTexture);
    gEngine.Textures.loadTexture(kShot);
    gEngine.Textures.loadTexture(BulletTextureType1);
    gEngine.Textures.loadTexture(BulletTextureType2);
    gEngine.Textures.loadTexture(BulletTextureType3);
    gEngine.Textures.loadTexture(FireBall);
    gEngine.Textures.loadTexture(BulletTextureSoldier);
    gEngine.Textures.loadTexture(BulletTextureArcher);
    gEngine.Textures.loadTexture(BulletTextureArrow);

   

    gEngine.Textures.loadTexture(Hero1_animation);
    gEngine.Textures.loadTexture(Hero2_animation);
    gEngine.Textures.loadTexture(Hero3_animation);
};

MyGame.prototype.unloadScene = function () {    
    gEngine.LayerManager.cleanUp();
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(shotSound);
    gEngine.AudioClips.unloadAudio(manSound);
    gEngine.AudioClips.unloadAudio(womanSound);
    gEngine.AudioClips.unloadAudio(jumpSound);
    gEngine.AudioClips.unloadAudio(boxSound);
    gEngine.AudioClips.unloadAudio(ArrowSound);
    gEngine.AudioClips.unloadAudio(AimSound);
    gEngine.AudioClips.unloadAudio(ShotSound);
    gEngine.AudioClips.unloadAudio(SpeedUpSound);
    gEngine.Textures.unloadTexture(this.heroTexture1);
    gEngine.Textures.unloadTexture(this.heroTexture2);
    gEngine.Textures.unloadTexture(this.kBulletTexture);
    gEngine.Textures.unloadTexture(this.kPlatform);
    gEngine.Textures.unloadTexture(this.kBoxTexture);
    gEngine.Textures.unloadTexture(this.backGroundTexture);;
    gEngine.Textures.unloadTexture(BulletTextureType1);
    gEngine.Textures.unloadTexture(BulletTextureType2);
    gEngine.Textures.unloadTexture(BulletTextureType3);
    gEngine.Textures.unloadTexture(FireBall);
    gEngine.Textures.unloadTexture(BulletTextureSoldier);
    gEngine.Textures.unloadTexture(BulletTextureArcher);
    gEngine.Textures.unloadTexture(BulletTextureArrow);
    gEngine.Textures.unloadTexture(kShot);

    gEngine.Textures.unloadTexture(Hero1_animation);
    gEngine.Textures.unloadTexture(Hero2_animation);
    gEngine.Textures.unloadTexture(Hero3_animation);
    var over=null;
    if(this.hero1Life===0){
     over = new Statistics("Player 2 Win !");
    }else{
     over = new Statistics("Player 1 Win !");
    }
    gEngine.Core.startScene(over);

};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(80, 45),  // position of the camera
        160,                      // width of camera
        [0, 0, 1280, 720],        // viewport (orgX, orgY, width, height)
        2
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray
     
     gEngine.DefaultResources.setGlobalAmbientIntensity(3.6);
     gEngine.AudioClips.playBackgroundAudio(this.kBgMusic);
    //新建文本1，此为英雄1的血量
    this.mMsg1 = new FontRenderable(this.kStatus);
    this.mMsg1.setColor([0, 0, 0, 1]);
    this.mMsg1.getXform().setPosition(10, 80);
    this.mMsg1.setTextHeight(3);
    
    //新建文本2，此为英雄2的血量
    this.mMsg2 = new FontRenderable(this.kStatus);
    this.mMsg2.setColor([0, 0, 0, 1]);
    this.mMsg2.getXform().setPosition(125, 80);
    this.mMsg2.setTextHeight(3);
    
   //新建文本3，此为英雄1的生命
    this.mMsg3 = new FontRenderable(this.kStatus);
    this.mMsg3.setColor([0, 0, 0, 1]);
    this.mMsg3.getXform().setPosition(6, 85);
    this.mMsg3.setTextHeight(3);
    
   //新建文本4，此为英雄2的生命
    this.mMsg4 = new FontRenderable(this.kStatus);
    this.mMsg4.setColor([0, 0, 0, 1]);
    this.mMsg4.getXform().setPosition(121, 85);
    this.mMsg4.setTextHeight(3);
    
    
    //新建英雄，盒子和平台
    switch(player1)
    {
        case 1:this.mHero1 = new Hero1(30, 100,this.keyBoard1);
            break;
        case 2:this.mHero1 = new Hero2(30, 100,this.keyBoard1);
            break;
        case 3:this.mHero1 = new Hero3(30, 100,this.keyBoard1);
            break;       
    }
    
    switch(player2)
    {
        case 1 :  this.mHero2 = new Hero1(130, 100,this.keyBoard2);
            break;
        case 2 :  this.mHero2 = new Hero2(130,100,this.keyBoard2);
            break;
        case 3 :  this.mHero2 = new Hero3(130,100,this.keyBoard2);
            break;
    }
    
    
    
    this.mBox=new Box(this.kBoxTexture,0,0,0);
    this.mPlatformSet=new PlatformSet();
    
    this.mPlatformSet.newAt(this.kPlatform, 80, 10, 100, 2);
    this.mPlatformSet.newAt(this.kPlatform, 30, 25, 40, 2);
    this.mPlatformSet.newAt(this.kPlatform, 130, 25, 40, 2);
    this.mPlatformSet.newAt(this.kPlatform, 80, 40, 60, 2);
    this.mPlatformSet.newAt(this.kPlatform, 30, 55, 40, 2);
    this.mPlatformSet.newAt(this.kPlatform, 130, 55, 40, 2);
    this.mPlatformSet.newAt(this.kPlatform, 80, 70, 60, 2);
//    this.mDyePackSet = new DyePackSet(this.heroTexture1);
//    var d = new DyePack(this.heroTexture1, 50, 35);
//    this.mDyePackSet.addToSet(d);
   
     //载入背景
    this.backGround = new TextureRenderable(this.backGroundTexture);
    this.backGround.getXform().setPosition(80, 45);
    this.backGround.getXform().setSize(160, 90);
    

    
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    this.backGround.draw(this.mCamera);
    this.mMsg1.draw(this.mCamera);
    this.mMsg2.draw(this.mCamera);
    this.mMsg3.draw(this.mCamera);
    this.mMsg4.draw(this.mCamera);
    
//    this.mDyePackSet.draw(this.mCamera);
    
    this.mHero1.draw(this.mCamera);
    this.mHero2.draw(this.mCamera);
    this.mPlatformSet.draw(this.mCamera);
    this.mBox.draw(this.mCamera);
        
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    this.mCamera.update();  // to ensure proper interpolated movement effects
    
    var x = 10+Math.random()*140;
    var y = (parseInt(Math.random()*3)+1)*30;
    var type = parseInt(Math.random()*4)+1;
    
    this.timeTick++;
    if(this.timeTick>this.boxShowTime){
        
        this.mBox=new Box(this.kBoxTexture,x,y,type);
        this.mBox.setDroped();
        this.timeTick-=this.boxShowTime;
        
    }

    this.mHero1.update(this.mHero2,this.mBox, this.mCamera,this.mPlatformSet);
    this.mHero2.update(this.mHero1,this.mBox, this.mCamera,this.mPlatformSet);
    
    //HP为0时，判断输赢
    if(this.mHero1.HP<=0){
        this.hero1Life--;
    switch(player1)
    {
        case 1:this.mHero1 = new Hero1(30, 100,this.keyBoard1);
            break;
        case 2:this.mHero1 = new Hero2(30, 100,this.keyBoard1);
            break;
        case 3:this.mHero1 = new Hero3(30, 100,this.keyBoard1);
            break;       
    }
    }
    if(this.mHero2.HP<=0){
        this.hero2Life--;
    switch(player2)
    {
        case 1:this.mHero2 = new Hero1(130, 100,this.keyBoard2);
            break;
        case 2:this.mHero2 = new Hero2(130, 100,this.keyBoard2);
            break;
        case 3:this.mHero2 = new Hero3(130, 100,this.keyBoard2);
            break;       
    }
    }
    if(this.hero1Life===0||this.hero2Life===0){
        gEngine.GameLoop.stop();
    }
    
    
    this.mBox.update();
    this._physicsSimulation();
   
 
    //输出英雄血量
    this.mMsg1.setText(this.mHero1.getStatus());
    this.mMsg2.setText(this.mHero2.getStatus());
    this.mMsg3.setText("Player1 Life : X "+this.hero1Life);
    this.mMsg4.setText("Player2 Life : X "+this.hero2Life);

};
