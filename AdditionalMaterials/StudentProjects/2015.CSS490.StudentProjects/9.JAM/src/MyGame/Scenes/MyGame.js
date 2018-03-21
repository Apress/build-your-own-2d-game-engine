/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
 Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
 GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
var gGameScore = "gGameFinalScore";
var gLights = null;
function MyGame() {
    this.kBgClip = "assets/sounds/bgMusic.mp3";
    this.kNormalShot = "assets/sounds/laser.wav";
    this.kShotGun = "assets/sounds/shotgun.wav";
    this.kBigShot = "assets/sounds/BigShot.wav";
    this.mDebugModeOn = false;

    var canvas = document.getElementById('GLCanvas');
    this.kCanvasWidth = canvas.width;
    this.kCanvasHeight = canvas.height;
    this.kMiniMapHeight = 70;
    // power_ups textures
    this.kShotGunTexture = "assets/power_ups/ShotGun.png";
    this.kBigShotTexture = "assets/power_ups/BFG.png";
    // hero textures
    this.kHeroSprite = "assets/Hero.png";
    this.kHealthBarTexture = "assets/HealthBar.png"; // need to make a sprite sheet
    this.kProjectileTexture = "assets/Projectile.png";
    // enemy textures
    this.kChaseTexture = "assets/Chase.png";
    this.kGhostTexture = "assets/Ghost.png";
    this.kGhostDeadTexture = "assets/Ghost_Dead.png";
    this.kGrenade = "assets/Granade.png";

    this.kAstroidTexture = "assets/Astroid.png";
    this.kAstroidNormalMap = "assets/NormalMap.png";

    this.kGoalStar = "assets/GoalStar.png";

    this.kStarsBG = "assets/bg_blend.jpg";

    this.kParticleTexture = "assets/particle.png";
    this.kBarrierBubble = "assets/PowerUpBarrier.png";

    this.kStatus = "Status: ";
    // The camera to view the scene
    this.mCamera = null;
    this.mMiniCamera = null;
    this.mNextScene = 0;

    // Alternating background images in a set
    this.mBackground = null;

    this.mGhostSet = null;
    this.mChasePackSet = null;
    this.mGrenadeSet = [];

    this.mAllParticles = new ParticleGameObjectSet();

    // ambient lighting tick
    this.mAmbientTick = 0;
    this.mRed = true;

    // Score
    this.mScore = null;

    this.mAstroid = null;
    // Projectile.js has already been read in ...
    Projectile.kTexture = this.kProjectileTexture;
    PowerUpSet.kShotGunTexture = this.kShotGunTexture;
    PowerUpSet.kBigShotTexture = this.kBigShotTexture;
    PowerUpSet.kBubbleTexture = this.kBarrierBubble;

    this.mWeaponUI = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    // audio
    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.AudioClips.loadAudio(this.kNormalShot);
    gEngine.AudioClips.loadAudio(this.kShotGun);
    gEngine.AudioClips.loadAudio(this.kBigShot);
    // objects
    gEngine.Textures.loadTexture(this.kAstroidTexture);
    gEngine.Textures.loadTexture(this.kAstroidNormalMap);
    gEngine.Textures.loadTexture(this.kGoalStar);
    gEngine.Textures.loadTexture(this.kStarsBG);
    // power up
    gEngine.Textures.loadTexture(this.kBigShotTexture);
    gEngine.Textures.loadTexture(this.kShotGunTexture);
    gEngine.Textures.loadTexture(this.kBarrierBubble);
    // enemy
    gEngine.Textures.loadTexture(this.kChaseTexture);
    gEngine.Textures.loadTexture(this.kGrenade);
    gEngine.Textures.loadTexture(this.kGhostTexture);
    gEngine.Textures.loadTexture(this.kGhostDeadTexture);
    // hero
    gEngine.Textures.loadTexture(this.kHeroSprite);
    gEngine.Textures.loadTexture(this.kHealthBarTexture);
    gEngine.Textures.loadTexture(this.kProjectileTexture);
    gEngine.Textures.loadTexture(this.kParticleTexture);
};

MyGame.prototype.unloadScene = function () {
    gEngine.AudioClips.stopBackgroundAudio();
    //audio
    gEngine.AudioClips.unloadAudio(this.kBgClip);
    gEngine.AudioClips.unloadAudio(this.kNormalShot);
    gEngine.AudioClips.unloadAudio(this.kShotGun);
    gEngine.AudioClips.unloadAudio(this.kBigShot);
    // objects
    gEngine.Textures.unloadTexture(this.kAstroidTexture);
    gEngine.Textures.unloadTexture(this.kAstroidNormalMap);
    gEngine.Textures.unloadTexture(this.kGoalStar);
    gEngine.Textures.unloadTexture(this.kStarsBG);
    gEngine.Textures.unloadTexture(this.kParticleTexture);
    // power up
    gEngine.Textures.unloadTexture(this.kBigShotTexture);
    gEngine.Textures.unloadTexture(this.kShotGunTexture);
    gEngine.Textures.unloadTexture(this.kBarrierBubble);
    // enemy
    gEngine.Textures.unloadTexture(this.kChaseTexture);
    gEngine.Textures.unloadTexture(this.kGhostTexture);
    gEngine.Textures.unloadTexture(this.kGhostDeadTexture);
    gEngine.Textures.unloadTexture(this.kGrenade);
    // pirate hero
    gEngine.Textures.unloadTexture(this.kHeroSprite);
    gEngine.Textures.unloadTexture(this.kHealthBarTexture);
    gEngine.Textures.unloadTexture(this.kProjectileTexture);
    
    gEngine.ResourceMap.storeAsset(gGameScore, this.mHeroGroup.mNumDestroy);
    // load next scene
    switch (this.mNextScene) {
        case GAME_SCENE:
            var nextLevel = new MyGame();
            break;
        case LOSE_SCENE:
            var nextLevel = new LoseScene();
            break;
        case WIN_SCENE:
            var nextLevel = new WinScene();
            break;
        case START_SCENE:
            var nextLevel = new StartScene();
            break;
        case GAMEOVER_SCENE:
            var nextLevel = new GameOverScene();
            break;
        case COPYRIGHT_SCENE:
            var nextLevel = new Copyright();
            break;
    }
    gEngine.Core.startScene(nextLevel);
};

MyGame.prototype.initialize = function () {
    // set up lighting
    this._initializeLights();   // defined in MyGame_Lights.js
    gLights = this.mGlobalLightSet;

    // set up camera
    this.mCamera = new Camera(
        vec2.fromValues(50, 35),  // position of the camera
        100,                      // width of camera
        [0, this.kMiniMapHeight, this.kCanvasWidth, this.kCanvasHeight - this.kMiniMapHeight]        // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);    // sets the background to gray
    this.mCamera.setSpeed(0.1);                             // move camera to right steadily

    // create minimap
    this.mMiniCamera = new Camera(
        vec2.fromValues(500, 35),  // position of the camera
        1000,                      // width of camera
        [0, 0, this.kCanvasWidth, this.kMiniMapHeight]       // viewport (orgX, orgY, width, height)
    );
    this.mMiniCamera.setBackgroundColor([0.0, 0.0, 0.0, 1]);

    // this needs an object
    var Star = new TextureRenderable(this.kGoalStar);
    Star.setColor([1, 1, 1, 0]);
    Star.getXform().setPosition(950, 35);
    Star.getXform().setSize(10, 10);
    this.mStar = new GameObject(Star);
    var lightZero = this.mGlobalLightSet.getLightAt(0);
    lightZero.setXPos(this.mStar.getXform().getXPos());
    lightZero.setYPos(this.mStar.getXform().getYPos());

    // create enemy sets
    this.mGhostSet = new GhostSet(this.kGhostTexture, this.kGhostDeadTexture);
    this.mChasePackSet = new ChasePackSet(this.kChaseTexture);
    var i;
    for(i=0; i<10; i++){
        this.mGrenadeSet[i] = new GrenadeSet(this.kGrenade, 100 + 900 * Math.random(), 20 + 40 * Math.random());
    }

    // set up hero
    var lightOne = this.mGlobalLightSet.getLightAt(1);      // these could be passed through particleSetUpdate
    var lightThree = this.mGlobalLightSet.getLightAt(3);
    this.mHeroGroup = new HeroGroup(this.kHeroSprite, this.kHealthBarTexture, 50, 35, lightOne, lightThree, this.kNormalShot, this.kShotGun, this.kBigShot);

    // Create background set
    this.mBackground = new Background(this.kStarsBG, this.mCamera);

    // create asteroid
    this.mAstroid = new Astroid(this.kAstroidTexture, this.kAstroidNormalMap, 50, 35);
    this.mAstroid.getRenderable().addLight(this.mGlobalLightSet.getLightAt(2));    // add spot light to asteroid

    // add all light source to background
    var i;
    for (i = 0; i < 5; i++) {
        if (i != 2) {
            this.mBackground.getRenderable().addLight(this.mGlobalLightSet.getLightAt(i));
        }
    }

    // create power ups
    this.mPowerUpSet = new PowerUpSet();        // could update this before the enemy set, pass enemySet internally
    // start audio
    gEngine.AudioClips.playBackgroundAudio(this.kBgClip);

    this.mAstroid.getRenderable().addLight(this.mGlobalLightSet.getLightAt(2));

    // Score System
    this.mScoreMsg = new FontRenderable("0");
    this.mScoreMsg.setColor([1, 1, 1, 1]);
    this.mScoreMsg.getXform().setPosition(20, 60);
    this.mScoreMsg.setTextHeight(20);

    this.mWeaponUI = new WeaponUI(this.kProjectileTexture, this.kShotGunTexture, this.kBigShotTexture);
};

// draw objects
MyGame.prototype.draw = function () {
    // set up main camera
    this.mCamera.setupViewProjection();
    gEngine.Core.clearCanvas([0.8, 0.8, 0.8, 1]); // clear to light gray


    if (!this.mDebugModeOn) {
        this.mBackground.draw(this.mCamera);
    }
    this.mWeaponUI.draw(this.mCamera);


    // main map
    this.mGhostSet.draw(this.mCamera);
    this.mChasePackSet.draw(this.mCamera);
    this.mStar.draw(this.mCamera);
    for(var i=0; i<10; i++){
        this.mGrenadeSet[i].draw(this.mCamera);
    }
    //this.mBubble.draw(this.mCamera);
    this.mHeroGroup.draw(this.mCamera);
    this.mAllParticles.draw(this.mCamera);
    this.mScoreMsg.draw(this.mCamera);
    this.mPowerUpSet.draw(this.mCamera);   // MOVE SOMEWHERE ELSE LATER
    this.mAstroid.draw(this.mCamera);

    // minimap
    this.mMiniCamera.setupViewProjection();
    this.mGhostSet.draw(this.mMiniCamera);
    this.mHeroGroup.draw(this.mMiniCamera);
    this.mChasePackSet.draw(this.mMiniCamera);
    this.mStar.draw(this.mMiniCamera);
    for(var i=0; i<10; i++){
        this.mGrenadeSet[i].draw(this.mMiniCamera);
    }
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    this.mWeaponUI.update(this.mCamera, this.mHeroGroup);
    this.mAstroid.update(this.mCamera);
    this.mBackground.update(this.mCamera);
    this.mAllParticles.update();
    // maybe have a class to update these
    var i;
    for(i = 0; i < 10; i++){
        this.mGrenadeSet[i].update(this.mHeroGroup, this.mCamera);
    }
    this.mChasePackSet.update(this.mHeroGroup, this.mCamera, this.mAllParticles);
    this.mGhostSet.update(this.mHeroGroup, this.mCamera);

    this.mHeroGroup.update(
                this.mGhostSet, this.mChasePackSet, this.mGrenadeSet,   // enemy
                this.mAllParticles, this.createParticle,                // particle
                this.mCamera, this.kNormalShot, this.mPowerUpSet        // sound
    );
    this._updateLight(); // after hero to maintain light state
    this.mPowerUpSet.update(this.mCamera, this.mHeroGroup);

    this.mCamera.clampHeroAtBoundary(this.mHeroGroup, 1);
    this.mCamera.update();  // to ensure proper interpolated movement effects
    this.mMiniCamera.update();
    
    if(this.mCamera.getWCCenter()[0] >= 950){
        this.mCamera.setSpeed(0);
    }

    // DELETE on release
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.L)) {
        this.mNextScene = LOSE_SCENE;
        gEngine.GameLoop.stop();
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
        this.mNextScene = GAMEOVER_SCENE;
        gEngine.GameLoop.stop();
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.P)) {
        this.mNextScene = WIN_SCENE;
        gEngine.GameLoop.stop();
    }


    var WCWidth = this.mCamera.getWCWidth();
    var fontXPos = this.mCamera.getWCCenter()[0] - this.mCamera.getWCWidth()/2 + 3;
    var fontYPos = this.mCamera.getWCCenter()[1] + this.mCamera.getWCHeight()/2 - 3;
    this.mScoreMsg.setTextHeight(WCWidth*0.020);
    this.mScoreMsg.getXform().setPosition(fontXPos,fontYPos);
    this.mScoreMsg.mText = "Score: " + (this.mHeroGroup.mNumDestroy*10).toString();

    // DELETE on release
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.G)) {
        this.mHeroGroup.mShotType = HeroGroup.eHeroShotType.eBigShot;
    }

};


MyGame.prototype.createParticle = function(atX, atY) {
    gEngine.Particle.setSystemtAcceleration([0, 0]);
    var life = 30 + Math.random() * 50;
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
    //var fx = 10 * Math.random()- 20 * Math.random();
    var vy = 60;
    var fy =  vy * (0.5 - Math.random());
    var fx =  -vy/2 * Math.random();
    p.getPhysicsComponent().setVelocity([fx, fy]);
    
    // size delta
    p.setSizeDelta(0.95);
    
    return p;
};

