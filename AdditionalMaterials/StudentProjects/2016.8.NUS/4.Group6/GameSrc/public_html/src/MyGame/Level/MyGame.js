/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
 Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
 GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light ,Projectile*/
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
var number_beatEnemy = 0;
function MyGame() {
    this.kMinionSprite = "assets/new.png";

    this.kBackGround = "assets/background.jpg";
    this.kStatus = "Status: ";

    this.AuBackGround = "assets/Music/AGirl.mp3";
    this.VolMomo = "assets/Voice/MomoState.mp3";
    this.kParticleTexture = "assets/particle.png";
    this.mAllParticles = new ParticleGameObjectSet();
    // The camera to view the scene
    this.mCamera = null;

    // Timer
    this.timer = 0;

    //  Objects of Scenes
    this.mGround = [];
    this.mBackGround = null;

    // Chacters
    this.mHero = null;

    this.mGongNv1 = null;
    this.mGongNv2 = null;
    this.mTaijian = null;
    this.mCike = null;
    this.mMomo = null;
    this.flat = 0;
    this.t = 0;
    this.mEnemySet = [];
    this.mSkill = 1;

    // Projectile.js has already been read in ...
    Projectile.kTexture = this.kMinionSprite;
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMinionSprite);
    // gEngine.Textures.loadTexture(this.kProjectileTexture);
    gEngine.Textures.loadTexture(this.kBackGround);

    gEngine.AudioClips.loadAudio(this.AuBackGround);
    gEngine.AudioClips.loadAudio(this.VolMomo);
    gEngine.Textures.loadTexture(this.kParticleTexture);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    //  gEngine.Textures.unloadTexture(this.kProjectileTexture);
    gEngine.Textures.unloadTexture(this.kBackGround);

    gEngine.AudioClips.unloadAudio(this.AuBackGround);
    gEngine.AudioClips.unloadAudio(this.VolMomo);
    gEngine.Textures.unloadTexture(this.kParticleTexture);
    var nextLevel = new Mov2();
    var nextLevel1 = new GameOver(1);
    if (this.t === 0) {
        gEngine.Core.startScene(nextLevel1);
    } else {
        gEngine.Core.startScene(nextLevel);

    }
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
            vec2.fromValues(80, 45), // position of the camera
            160, // width of camera
            [0, 0, 1080, 607.5], // viewport (orgX, orgY, width, height)
            2
            );
    this.mCamera.setBackgroundColor([1, 1, 1, 0]);
    // sets the background to gray
    this.mSmallCamera = new Camera(
            vec2.fromValues(5, 10), // position of the camera
            20, // width of camera
            [0, 0, 1080, 20], // viewport (orgX, orgY, width, height)
            2
            );
    this.mSmallCamera.setBackgroundColor([189.0 / 255.0, 183 / 255.0, 107 / 255.0, 0]);
    this.mTinyCamera = new Camera(
            vec2.fromValues(5, 10), // position of the camera
            20, // width of camera
            [0, 0, 0, 20], // viewport (orgX, orgY, width, height)
            2
            );
    this.mTinyCamera.setBackgroundColor([165.0 / 255.0, 41 / 255.0, 5 / 255.0, 0]);
    this.mBloodCamera = new Camera(
            vec2.fromValues(5, 10), // position of the camera
            20, // width of camera
            [0, 580, 1080, 20], // viewport (orgX, orgY, width, height)
            2
            );
    this.mBloodCamera.setBackgroundColor([0, 1, 0, 0.5]);

    gEngine.DefaultResources.setGlobalAmbientIntensity(3.6);

//    this.mMsg = new FontRenderable(this.kStatus);
//    this.mMsg.setColor([0, 0, 0, 1]);
//    this.mMsg.getXform().setPosition(2, 2);
//    this.mMsg.setTextHeight(3);

    // Add Hero and Weapon Info here.
    this.mHero = new Hero(this.kMinionSprite, 20, 25);
    this.mHero.setHeroInfo(30, 2);
    this.mHero.setWeaponType(1, 0.8, 3, 1);

    this.mGongNv1 = new GongNv(this.kMinionSprite, 170, 25);
    this.mGongNv1.setHeroInfo(9, 1);
    this.mGongNv1.setWeaponType(3, 0.8, 1, -1);
    this.mEnemySet.push(this.mGongNv1);

    this.mGongNv2 = new GongNv(this.kMinionSprite, 170, 25);
    this.mGongNv2.setHeroInfo(9, 1);
    this.mGongNv2.setWeaponType(3, 0.8, 1, -1);
    this.mEnemySet.push(this.mGongNv2);

    this.mTaijian = new Taijian(this.kMinionSprite, 170, 25);
    this.mTaijian.setHeroInfo(9, 2);
    this.mTaijian.setWeaponType(6, 1, 1, -1);
    this.mEnemySet.push(this.mTaijian);

    this.mCike = new Cike(this.kMinionSprite, 170, 70);
    this.mCike.setHeroInfo(9, 4);
    this.mCike.setWeaponType(6, 0.5, 1, -1);
    this.mEnemySet.push(this.mCike);

    this.mMomo = new Momo(this.kMinionSprite, 170, 25);
    this.mMomo.setHeroInfo(30, 1);
    this.mMomo.setWeaponType(3, 0.5, 2, -1);
    this.mEnemySet.push(this.mMomo);

    // Add map
    this.mBackGround = new BackGround(100, 45, 200, 80);
    this.mBackGround.setSpriteTexture(this.kBackGround, 0, 1024, 1536, 2048);

    for (var i = 0; i < 20; i++) {
        this.mGround[i] = new SpriteRenderable(this.kMinionSprite);
        this.mGround[i].setColor([1, 1, 1, 0]);
        this.mGround[i].getXform().setSize(9, 20);
        this.mGround[i].setElementPixelPositions(50, 108, 130, 267);
        this.mGround[i].getXform().setPosition(9 * i, 10);
    }
    this.mDyePackSet = new DyePackSet(this.kMinionSprite);
    var d = new DyePack(this.kMinionSprite, 50, 35);
    this.mDyePackSet.addToSet(d);

    gEngine.AudioClips.playBackgroundAudio(this.AuBackGround);
};

MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    this.mCamera.setupViewProjection();

    this.mBackGround.draw(this.mCamera);

    for (var i = 0; i < this.mGround.length; i++) {
        this.mGround[i].draw(this.mCamera);
    }

    if (this.mHero.getHP() > 0) {
        this.mHero.draw(this.mCamera);
    }
    if (this.mGongNv1.getHP() > 0) {
        this.mGongNv1.draw(this.mCamera);
    } else if (this.mGongNv1.isDead() && this.mGongNv1.mDead) {
        number_beatEnemy++;
        this.mGongNv1.mDead = 0;
    }

    if (this.mGongNv2.getHP() > 0) {
        this.mGongNv2.draw(this.mCamera);
    } else if (this.mGongNv2.isDead() && this.mGongNv2.mDead) {
        number_beatEnemy++;
        this.mGongNv2.mDead = 0;
    }

    if (this.mTaijian.getHP() > 0) {
        this.mTaijian.draw(this.mCamera);
    } else if (this.mTaijian.isDead() && this.mTaijian.mDead) {
        number_beatEnemy++;
        this.mTaijian.mDead = 0;

    }
    if (this.mCike.getHP() > 0) {
        this.mCike.draw(this.mCamera);
    } else if (this.mCike.isDead() && this.mCike.mDead) {
        number_beatEnemy++;
        this.mCike.mDead = 0;

    }

    if (this.mMomo.getHP() > 0) {
        this.mMomo.draw(this.mCamera);
    } else if (this.mMomo.isDead() && this.mMomo.mDead) {
        number_beatEnemy++;
        this.mMomo.mDead = 0;

    }
    this.mAllParticles.draw(this.mCamera);
    this.mBloodCamera.setupViewProjection();
    this.mSmallCamera.setupViewProjection();
    this.mTinyCamera.setupViewProjection();
};

MyGame.prototype.update = function () {
    this.timer++;
    //this.mCamera.update();  // to ensure proper interpolated movement effects

    this.mHero.update(this.mEnemySet, this.mCamera);
    this.mTinyCamera.setViewport([0, 0, 45 * number_beatEnemy, 20], 2);
    this.mBloodCamera.setViewport([0, 580, 36 * this.mHero.getHP(), 20], 2);
    this.mGongNv1.update(this.mHero, this.timer, 180, null);
    this.mGongNv2.update(this.mHero, this.timer, 360, null);
    this.mTaijian.update(this.mHero, this.timer, 480, null);
    this.mCike.update(this.mHero, this.timer, 600, null);
    this.mMomo.update(this.mHero, this.timer, 720, this.VolMomo);

    this.mBackGround.update();

    this.MapLoad();
    var i;
    this.flat = 0;
    for (i = 0; i < this.mEnemySet.length; i++) {
        if (this.mEnemySet[i].getHP() <= 0) {
            this.flat++;
        }
    }

    if (this.flat === 5) {
        this.t = 1;
        gEngine.GameLoop.stop();
    }

    if (this.mHero.getHP() <= 0)
    {
        this.t = 0;
        gEngine.GameLoop.stop();
    }

    this.mAllParticles.update();
    // create particles when Z key is pressed
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Down)) {
        if (this.mSkill-- === 1) {
            var p = this._createParticle(this.mHero.getXform().getXPos(),
                    this.mHero.getXform().getYPos());
            this.mAllParticles.addToSet(p);
        }
    }

};

MyGame.prototype.MapLoad = function () {
    var deltaX = 1;
    var sform = [];
    for (var i = 0; i < this.mGround.length; i++) {
        sform[i] = this.mGround[i].getXform();
    }
    for (var i = 0; i < this.mGround.length; i++) {
        if (sform[i].getXPos() > -9) {
            sform[i].incXPosBy(-deltaX);

        } else {
            sform[i].setXPos(170.0);
        }
    }
};

MyGame.prototype._createParticle = function (atX, atY) {
    var life = 120;
    var p = new ParticleGameObject(this.kParticleTexture, atX, atY, life);
    p.getRenderable().setColor([1, 0, 0, 1]);

    // size of the particle
    var r = 10.5;
    p.getXform().setSize(r, r);

    // final color
    var fr = 3.5 + Math.random();
    var fg = 0.4 + Math.random();
    var fb = 0.3 + Math.random();
    p.setFinalColor([fr, fg, fb, 0.6]);

    // velocity on the particle
    var fx = 10 - 20 * Math.random();
    var fy = 10* Math.random();
    p.getPhysicsComponent().setVelocity([fx, fy]);

    // size delta
    p.setSizeDelta(1.07);
    this.mHero.skill = 30;

    return p;
};
