/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,Projectile, Missle,
  Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
  GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light, Shield, heroCharacter1, heroCharacter2, SpriteAnimateRenderable, SuperSkill, gPlayer_2_type, gPlayer_1_type */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
var gCamera = null;
var backspeed = 1;
var gCue = null;
var gCue2 = null;
var gCue3 = null;
var gCue4 = null;
var gBgString = [
    "assets/sounds/BGClip.mp3",
    "assets/sounds/BGClip2.mp3",
    "assets/sounds/BGClip3.mp3",
    "assets/sounds/BGClip4.mp3",
    "assets/sounds/BGClip5.mp3"
];
function MyGame() {
    var BgID = Math.floor(Math.random()*5);
    this.kStoneSprite = "assets/stone_sprite.png";
    //this.kHero1Sprite = "assets/hero1_sprite.png";
    this.kHero1Sprite = heroCharacter1;
    //this.kHero2Sprite = "assets/hero2_sprite.png";
    this.kHero2Sprite = heroCharacter2;
    this.kHeroBoundPoint = "assets/particle.png";
    
    
    this.kProjectileTexture = "assets/bullet_0.png";
    this.kProjectileTexture1 = "assets/bullet_1.png";
    this.kProjectileTexture2 = "assets/bullet_2.png";
    this.kProjectileTexture3 = "assets/bullet_3.png";
    
    
    this.kMissleSprite = "assets/missle2.png";
    this.kPropMissleSprite = "assets/prop_missle.png";
    this.kPointSprite = "assets/Point.png";
    this.kLifeSprite = "assets/Life.png";
    this.kPropSupplySprite = "assets/propLife.png";
    this.kPropShieldSprite = "assets/shield.png";
    this.kBackground = "assets/center.jpg";
    this.kSuperSkillSprite = "assets/SuperSkill1.png";
    this.kSuperSkillShow = "assets/SuperSkillShow.png";
    this.kBackground = "assets/background.jpg";
    this.kBackground2 = "assets/background.jpg";
    this.krebirthSprite = "assets/rebirth.png";
    // The camera to view the scene
    this.mCamera = null;
    this.player_1_chance = 3;
    this.player_2_chance = 3;
    this.mHero_1 = null;
    this.mHero1Bound = null;
    this.mHero_2 = null;
    this.mHero2Bound = null;
    this.mPath_1 = null;
    this.mPath_2 = null;
    this.mBack = null;
    this.mStoneSet = null;
    this.mPropMissleSet = null;
    this.mPointSet = null;
    this.mMissleSet = null;
    this.mPropMissleNum = 0;
    this.mHeartSet = null;
    this.mMissleShowSet = null;
    this.mShieldShowSet = null;
    this.mSuperSkillShowSet = null;
    this.mPropShieldSet = null;
    this.mPropSupplySet = null;
    // Projectile.js has already been read in ...
    Projectile.kTexture = this.kProjectileTexture;
    Projectile.kTexture1 = this.kProjectileTexture1;
    Projectile.kTexture2 = this.kProjectileTexture2;
    Projectile.kTexture3 = this.kProjectileTexture3;
    Missle.kTexture = this.kMissleSprite;
    Shield.kTexture = this.kPropShieldSprite;
    SuperSkill.kTexture = this.kSuperSkillSprite;
    rebirth.kTexture = this.krebirthSprite;
    this.kBgClip = gBgString[BgID];
    this.kCue = "assets/sounds/MyGame_cue.wav";
    this.kBoom = "assets/sounds/boom.mp3";
    this.kCue1 = "assets/sounds/pickup.wav";
    this.kCue2 = "assets/sounds/pickup2.wav";
    this.kCue3 = "assets/sounds/big1_1.wav";
    this.kCue4 = "assets/sounds/big2.wav";
    this.mAllParticles = new ParticleGameObjectSet();
    
    this.mBack = null;
    this.mBack2 = null;
    
    this.rebirthAni = new rebirthSet();
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kSuperSkillShow);
    gEngine.Textures.loadTexture(this.kStoneSprite);
    gEngine.Textures.loadTexture(this.kHero1Sprite);
    gEngine.Textures.loadTexture(this.kHero2Sprite);
    
    
    gEngine.Textures.loadTexture(this.kProjectileTexture);
    gEngine.Textures.loadTexture(this.kProjectileTexture1);
    gEngine.Textures.loadTexture(this.kProjectileTexture2);
    gEngine.Textures.loadTexture(this.kProjectileTexture3);
    
    
    gEngine.Textures.loadTexture(this.kHeroBoundPoint);
    gEngine.Textures.loadTexture(this.kMissleSprite);
    gEngine.Textures.loadTexture(this.kPropMissleSprite);
    gEngine.Textures.loadTexture(this.kPointSprite);
    gEngine.Textures.loadTexture(this.kLifeSprite);
    
    gEngine.Textures.loadTexture(this.kPropShieldSprite);
    gEngine.Textures.loadTexture(this.kPropSupplySprite);
    gEngine.Textures.loadTexture(this.kSuperSkillSprite);
    
    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.AudioClips.loadAudio(this.kCue);
    gEngine.AudioClips.loadAudio(this.kCue1);
    gEngine.AudioClips.loadAudio(this.kCue2);
    gEngine.AudioClips.loadAudio(this.kCue3);
    gEngine.AudioClips.loadAudio(this.kCue4);
    gEngine.AudioClips.loadAudio(this.kBoom);
    gEngine.Textures.loadTexture(this.kBackground);
    gEngine.Textures.loadTexture(this.kBackground2);
    gEngine.Textures.loadTexture(this.krebirthSprite);
};

MyGame.prototype.unloadScene = function () {    
    gEngine.Textures.unloadTexture(this.kSuperSkillShow);
    gEngine.Textures.unloadTexture(this.kStoneSprite);
    gEngine.Textures.unloadTexture(this.kHero1Sprite);
    gEngine.Textures.unloadTexture(this.kHero2Sprite);
    
    
    gEngine.Textures.unloadTexture(this.kProjectileTexture);
    gEngine.Textures.unloadTexture(this.kProjectileTexture1);
    gEngine.Textures.unloadTexture(this.kProjectileTexture2);
    gEngine.Textures.unloadTexture(this.kProjectileTexture3);
    
    
    gEngine.Textures.unloadTexture(this.kHeroBoundPoint);
    gEngine.Textures.unloadTexture(this.kMissleSprite);
    gEngine.Textures.unloadTexture(this.kPropMissleSprite);
    gEngine.Textures.unloadTexture(this.kPointSprite);
    gEngine.Textures.unloadTexture(this.kLifeSprite);
    
    gEngine.Textures.unloadTexture(this.kPropShieldSprite);
    gEngine.Textures.unloadTexture(this.kPropSupplySprite);
    gEngine.Textures.unloadTexture(this.kSuperSkillSprite);
    
    gEngine.Textures.unloadTexture(this.kBackground);
    gEngine.Textures.unloadTexture(this.kBackground2);
    gEngine.Textures.unloadTexture(this.krebirthSprite);
    
    gEngine.AudioClips.unloadAudio(this.kBgClip);
    gEngine.AudioClips.unloadAudio(this.kCue);
    gEngine.AudioClips.unloadAudio(this.kCue1);
    gEngine.AudioClips.unloadAudio(this.kCue2);
    gEngine.AudioClips.unloadAudio(this.kCue3);
    gEngine.AudioClips.unloadAudio(this.kCue4);
    gEngine.AudioClips.unloadAudio(this.kBoom);
    
    gEngine.AudioClips.stopBackgroundAudio(this.kBgClip);
    var nextLevel =  null;
    if(this.player_1_chance <= 0)
     nextLevel = new GameOver2(); 
 
     if(this.player_2_chance<= 0)
     nextLevel = new GameOver1(); 
     gEngine.Core.startScene(nextLevel);
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras

    this.mCamera = new Camera(
        vec2.fromValues(50, 60),  // position of the camera
        100,                      // width of camera
        [400, 0, 600, 720],        // viewport (orgX, orgY, width, height)
        2
    );
    this.mCamera.setBackgroundColor([0, 0.8, 0.8, 1]);
            // sets the background to gray
    gCamera = this.mCamera;
    gEngine.DefaultResources.setGlobalAmbientIntensity(3.6);
    
    

    this.mPath_1 = new LineSet();
    this.mHero_1 = new Hero(this.kHero1Sprite, 10, 30, gPlayer_1_type);
    this.mHero1Bound = new HeroBound(this.kHeroBoundPoint, 10, 30);
    if(gPlayer_1_type===0)
        this.mHero_1.setType1();
    else if(gPlayer_1_type===1)
        this.mHero_1.setType2();
    else if(gPlayer_1_type===2)
        this.mHero_1.setType3();
    else if(gPlayer_1_type===3)
        this.mHero_1.setType4();
    this.mHero_1.setPlayer1Keys();
    
    
    
    this.mPath_2 = new LineSet();
    this.mHero_2 = new Hero(this.kHero2Sprite, 90, 30, gPlayer_2_type);
    this.mHero2Bound = new HeroBound(this.kHeroBoundPoint, 90, 30);
    if(gPlayer_2_type===0)
        this.mHero_2.setType1();
    else if(gPlayer_2_type===1)
        this.mHero_2.setType2();
    else if(gPlayer_2_type===2)
        this.mHero_2.setType3();
    else if(gPlayer_2_type===3)
        this.mHero_2.setType4();
    
    this.mHero_2.setPlayer2Keys();
   
    
    
    
    this.mStoneSet = new StoneSet(this.kStoneSprite);
    var d = new Stone(this.kStoneSprite, 50, 100);
    this.mStoneSet.addToSet(d);
    this.mPropMissleSet = new PropMissleSet(this.kPropMissleSprite);
    this.mPointSet = new PointSet(this.kPointSprite);
    this.mHeartSet = new ShowSet(this.kLifeSprite);
    this.mMissleShowSet = new ShowSet(this.kPropMissleSprite);
    this.mShieldShowSet = new ShowSet(this.kPropShieldSprite);
    this.mSuperSkillShowSet = new ShowSet(this.kSuperSkillShow)
    this.mPropShieldSet = new PropShieldSet(this.kPropShieldSprite);
    this.mPropSupplySet = new PropSupplySet(this.kPropSupplySprite);
    
    gEngine.AudioClips.playBackgroundAudio(this.kBgClip);
    Projectile.kCue = this.kBoom;
    Hero.kCue = this.kCue;
    gCue = this.kCue1;
    gCue2 = this.kCue2;
    gCue3 = this.kCue3;
    gCue4 = this.kCue4;
    
    this.mBack = new TextureRenderable(this.kBackground);
    this.mBack.setColor([1, 1, 1, 0]);
    this.mBack.getXform().setPosition(50,120);
    this.mBack.getXform().setSize(100,260);
    
    this.mBack2 = new TextureRenderable(this.kBackground);
    this.mBack2.setColor([1, 1, 1, 0]);
    this.mBack2.getXform().setPosition(50,360);
    this.mBack2.getXform().setSize(100,260);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0, 0, 0, 1]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    
    this.mBack.draw(this.mCamera);
    this.mBack2.draw(this.mCamera);
    
    this.mHero_1.draw(this.mCamera);
    this.mHero1Bound.draw(this.mCamera);
    this.mHero_2.draw(this.mCamera);  
    this.mHero2Bound.draw(this.mCamera);
    this.mPath_1.draw(this.mCamera);
    this.mPath_2.draw(this.mCamera);
    this.mStoneSet.draw(this.mCamera);
    this.mPropMissleSet.draw(this.mCamera);
    this.mPointSet.draw(this.mCamera);
    this.mHeartSet.draw(this.mCamera);
    this.mMissleShowSet.draw(this.mCamera);
    this.mShieldShowSet.draw(this.mCamera);
    this.mSuperSkillShowSet.draw(this.mCamera);
    this.mPropShieldSet.draw(this.mCamera);
    this.mPropSupplySet.draw(this.mCamera);
    this.mAllParticles.draw(this.mCamera);
    this.rebirthAni.draw(this.mCamera);
    
    
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    this.mCamera.update();  // to ensure proper interpolated movement effects
    
    this.mBack.getXform().setPosition(50,this.mBack.getXform().getYPos()-backspeed);
    this.mBack2.getXform().setPosition(50,this.mBack2.getXform().getYPos()-backspeed);
    if(this.mBack.getXform().getYPos()< -120)
        this.mBack.getXform().setPosition(50,360);
    if(this.mBack2.getXform().getYPos()< -120)
        this.mBack2.getXform().setPosition(50,360);
    
    if(this.mHero_1.mHP <= 0){
        //freezeTime = 10;
        this.mHero_1 = new Hero(this.kHero1Sprite, 20, 30, 1);
        this.mHero1Bound = new HeroBound(this.kHeroBoundPoint, 20, 30);
        if(gPlayer_1_type===0)
            this.mHero_1.setType1();
        else if(gPlayer_1_type===1)
            this.mHero_1.setType2();
        else if(gPlayer_1_type===2)
            this.mHero_1.setType3();
        else if(gPlayer_1_type===3)
            this.mHero_1.setType4();
        
        this.mHero_1.setPlayer1Keys();
        this.rebirthAni.newAt(20,40);
        this.player_1_chance -= 1;
    }
    
    if(this.mHero_2.mHP <= 0){
        //freezeTime = 10;
        this.mHero_2 = new Hero(this.kHero2Sprite, 80, 30, 2);
        this.mHero2Bound = new HeroBound(this.kHeroBoundPoint, 80, 30);
        
        if(gPlayer_2_type===0)
            this.mHero_2.setType1();
        else if(gPlayer_2_type===1)
            this.mHero_2.setType2();
        else if(gPlayer_2_type===2)
            this.mHero_2.setType3();
        else if(gPlayer_2_type===3)
            this.mHero_2.setType4();
        
        this.mHero_2.setPlayer2Keys();
        this.rebirthAni.newAt(80,40);
        this.player_2_chance -= 1;
    }
    this.rebirthAni.update();
    
    if(this.player_1_chance <= 0||this.player_2_chance <= 0){
        gEngine.GameLoop.stop();
    }
    
    this.mPath_1.update(this.mCamera);
    this.mPath_2.update(this.mCamera);

    this.mHero_1.update(this.mHero_2, this.mStoneSet, this.mAllParticles, this.createParticle, this.mCamera);
    this.mHero_2.update(this.mHero_1, this.mStoneSet, this.mAllParticles, this.createParticle, this.mCamera);
    this.mAllParticles.update();
    this.mHero1Bound.update(this.mHero_1, this.mStoneSet, this.mAllParticles, this.createParticle);
    this.mHero2Bound.update(this.mHero_2, this.mStoneSet, this.mAllParticles, this.createParticle);
    this.mStoneSet.update(this.mHero_1, this.mHero_2,this.mCamera);
    this.mPropMissleSet.update(this.mHero_1, this.mHero_2);
    this.mPointSet.update(this.mHero_1, this.mHero_2);
    this.mHeartSet.update(this.mHero_1.getHP(), this.mHero_2.getHP(), 2.5);
    this.mPropShieldSet.update(this.mHero_1, this.mHero_2);
    this.mPropSupplySet.update(this.mHero_1, this.mHero_2);
    this.mMissleShowSet.update(this.mHero_1.getMissleNum(), this.mHero_2.getMissleNum(), 5);
    this.mShieldShowSet.update(this.mHero_1.getShieldNum(), this.mHero_2.getShieldNum(), 7.5);
    this.mSuperSkillShowSet.update(this.mHero_1.getSuperSkillNum(), this.mHero_2.getSuperSkillNum(), 10);
//    this.mMsg.setText(this.mHero.getStatus());
};

MyGame.prototype.createParticle = function(atX, atY) {
    var life = 30 + Math.random() * 200;
    var p = new ParticleGameObject("assets/particle.png", atX, atY, life);
    p.getRenderable().setColor([1, 0, 0, 1]);
    
    // size of the particle
    var r = 3.5 + Math.random() * 2.5;
    p.getXform().setSize(r, r);
    
    // final color
    var fr = 3.5 + Math.random();
    var fg = 0.4 + 0.1 * Math.random();
    var fb = 0.3 + 0.1 * Math.random();
    p.setFinalColor([fr, fg, fb, 0.6]);
    
    // velocity on the particle
    var fx = 10 * Math.random() - 20 * Math.random();
    var fy = 10 * Math.random();
    p.getPhysicsComponent().setVelocity([fx, fy]);
    
    // size delta
    p.setSizeDelta(0.98);
    
    return p;
};