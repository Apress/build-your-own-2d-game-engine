/*
 * File: Palace.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
 Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
 GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light ,Projectile, number_beatEnemy*/
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Palace() {
    this.kMinionSprite = "assets/new.png";

    this.kBackGround = "assets/background.jpg";
    this.kStatus = "Status: ";

    this.AuBackGround = "assets/Music/AGirl.mp3";
    this.VolHuangshang = "assets/Voice/HuangshangState.mp3";
    this.VolDragon = "assets/Voice/Dragon.mp3";
    this.kParticleTexture = "assets/particle.png";
    this.mAllParticles = new ParticleGameObjectSet();
    this.mAllParticlesD = new ParticleGameObjectSet();
    // The camera to view the scene
    this.mCamera = null;

    // Timer
    this.timer = 0;

    //  Objects of Scenes
    this.mGround = [];
    this.mBackGround = null;
    this.flat = 0;
    this.t = 0;
    // Chacters
    this.mHero = null;

    this.mGongNv1 = null;
    this.mGongNv2 = null;
    this.mGongNv3 = null;
    this.mTaijian1 = null;
    this.mTaijian2 = null;
    this.mTaijian3 = null;
    this.mMomo1 = null;
    this.mMomo2 = null;
    this.mHuanshang = null;
    this.mDragon = null;


    this.mEnemySet = [];
    this.mSkill = 1;

    // Projectile.js has already been read in ...
    Projectile.kTexture = this.kMinionSprite;
}
gEngine.Core.inheritPrototype(Palace, Scene);

Palace.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kBackGround);

    gEngine.AudioClips.loadAudio(this.AuBackGround);
    gEngine.AudioClips.loadAudio(this.VolHuangshang);
    gEngine.AudioClips.loadAudio(this.VolDragon);
    gEngine.Textures.loadTexture(this.kParticleTexture);
};

Palace.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kBackGround);

    gEngine.AudioClips.unloadAudio(this.AuBackGround);
    gEngine.AudioClips.unloadAudio(this.VolHuangshang);
    gEngine.AudioClips.unloadAudio(this.VolDragon);
    gEngine.Textures.unloadTexture(this.kParticleTexture);
      var nextLevel = new AboutUs();
    var nextLevel1 = new GameOver(3);
    if (this.t === 0) {
        gEngine.Core.startScene(nextLevel1);
    } else {
        gEngine.Core.startScene(nextLevel);

    }
};

Palace.prototype.initialize = function () {
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
    this.mHero.setHeroInfo(70, 3);
    this.mHero.setWeaponType(1, 0.5, 2, 1);

    this.mGongNv1 = new GongNv(this.kMinionSprite, 170, 25);
    this.mGongNv1.setHeroInfo(9, 1);
    this.mGongNv1.setWeaponType(3, 1, 1, -1);
    this.mEnemySet.push(this.mGongNv1);

    this.mGongNv2 = new GongNv(this.kMinionSprite, 170, 25);
    this.mGongNv2.setHeroInfo(9, 1);
    this.mGongNv2.setWeaponType(3, 1, 1, -1);
    this.mEnemySet.push(this.mGongNv2);

    this.mGongNv3 = new GongNv(this.kMinionSprite, 170, 25);
    this.mGongNv3.setHeroInfo(9, 1);
    this.mGongNv3.setWeaponType(3, 1, 1, -1);
    this.mEnemySet.push(this.mGongNv3);

    this.mTaijian1 = new Taijian(this.kMinionSprite, 170, 25);
    this.mTaijian1.setHeroInfo(9, 2);
    this.mTaijian1.setWeaponType(6, 1, 1, -1);
    this.mEnemySet.push(this.mTaijian1);

    this.mTaijian2 = new Taijian(this.kMinionSprite, 170, 25);
    this.mTaijian2.setHeroInfo(9, 2);
    this.mTaijian2.setWeaponType(6, 1, 1, -1);
    this.mEnemySet.push(this.mTaijian2);

    this.mTaijian3 = new Taijian(this.kMinionSprite, 170, 25);
    this.mTaijian3.setHeroInfo(9, 2);
    this.mTaijian3.setWeaponType(6, 1, 1, -1);
    this.mEnemySet.push(this.mTaijian3);

    this.mMomo1 = new Momo(this.kMinionSprite, 170, 25);
    this.mMomo1.setHeroInfo(20, 1);
    this.mMomo1.setWeaponType(3, 0.5, 3, -1);
    this.mEnemySet.push(this.mMomo1);

    this.mMomo2 = new Momo(this.kMinionSprite, 170, 25);
    this.mMomo2.setHeroInfo(20, 1);
    this.mMomo2.setWeaponType(2, 0.5, 3, -1);
    this.mEnemySet.push(this.mMomo2);

    this.mHuanshang = new HuangShang(this.kMinionSprite, 170, 25);
    this.mHuanshang.setHeroInfo(30, 1);
    this.mHuanshang.setWeaponType(3, 0.5, 3, -1);
    this.mEnemySet.push(this.mHuanshang);

    this.mDragon = new Dragon(this.kMinionSprite, 200, 25);
    this.mDragon.setHeroInfo(50, 5);
    this.mDragon.setWeaponType(7, 0.5, 1, -1);
    this.mEnemySet.push(this.mDragon);

    // Add map
    this.mBackGround = new BackGround(100, 50, 200, 80);
    this.mBackGround.setSpriteTexture(this.kBackGround, 1024, 2048, 1338, 2048);

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

Palace.prototype.draw = function () {
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
    if (this.mGongNv3.getHP() > 0) {
        this.mGongNv3.draw(this.mCamera);
    } else if (this.mGongNv3.isDead() && this.mGongNv3.mDead) {
        number_beatEnemy++;
        this.mGongNv3.mDead = 0;
    }
    if (this.mTaijian1.getHP() > 0) {
        this.mTaijian1.draw(this.mCamera);
    } else if (this.mTaijian1.isDead() && this.mTaijian1.mDead) {
        number_beatEnemy++;
        this.mTaijian1.mDead = 0;
    }
    if (this.mTaijian2.getHP() > 0) {
        this.mTaijian2.draw(this.mCamera);
    } else if (this.mTaijian2.isDead() && this.mTaijian2.mDead) {
        number_beatEnemy++;
        this.mTaijian2.mDead = 0;
    }
    if (this.mTaijian3.getHP() > 0) {
        this.mTaijian3.draw(this.mCamera);
    } else if (this.mTaijian3.isDead() && this.mTaijian3.mDead) {
        number_beatEnemy++;
        this.mTaijian3.mDead = 0;
    }
    if (this.mMomo1.getHP() > 0) {
        this.mMomo1.draw(this.mCamera);
    } else if (this.mMomo1.isDead() && this.mMomo1.mDead) {
        number_beatEnemy++;
        this.mMomo1.mDead = 0;

    }
    if (this.mMomo2.getHP() > 0) {
        this.mMomo2.draw(this.mCamera);
    } else if (this.mMomo2.isDead() && this.mMomo2.mDead) {
        number_beatEnemy++;
        this.mMomo2.mDead = 0;

    }
    if (this.mHuanshang.getHP() > 0) {
        this.mHuanshang.draw(this.mCamera);
    } else if (this.mHuanshang.isDead() && this.mHuanshang.mDead) {
        number_beatEnemy++;
        this.mHuanshang.mDead = 0;

    }
    if (this.mDragon.getHP() > 0) {
        this.mDragon.draw(this.mCamera);

    } else if (this.mDragon.isDead() && this.mDragon.mDead) {
        number_beatEnemy++;
        this.mDragon.mDead = 0;

    }
    this.mAllParticles.draw(this.mCamera);
    this.mAllParticlesD.draw(this.mCamera);
    this.mBloodCamera.setupViewProjection();
    this.mSmallCamera.setupViewProjection();
    this.mTinyCamera.setupViewProjection();
};

Palace.prototype.update = function () {
    this.timer++;
    //this.mCamera.update();  // to ensure proper interpolated movement effects

    this.mHero.update(this.mEnemySet, this.mCamera);
    this.mTinyCamera.setViewport([0, 0, 45 * number_beatEnemy, 20], 2);
    this.mBloodCamera.setViewport([0, 580, 21.6 * this.mHero.getHP(), 20], 2);
    this.mGongNv1.update(this.mHero, this.timer, 180, null);
    this.mGongNv2.update(this.mHero, this.timer, 240, null);
    this.mGongNv3.update(this.mHero, this.timer, 360, null);
    this.mTaijian1.update(this.mHero, this.timer, 150, null);
    this.mTaijian2.update(this.mHero, this.timer, 480, null);
    this.mTaijian3.update(this.mHero, this.timer, 540, null);
    this.mMomo1.update(this.mHero, this.timer, 720, null);
    this.mMomo2.update(this.mHero, this.timer, 840, null);
    this.mHuanshang.update(this.mHero, this.timer, 1080, this.VolHuangshang);
    this.mDragon.update(this.mHero, this.mHuanshang.isDead(), this.VolDragon);



    this.mBackGround.update();

    this.MapLoad();

    var i;
    this.flat = 0;
    for (i = 0; i < this.mEnemySet.length; i++) {
        if (this.mEnemySet[i].getHP() <= 0) {
            this.flat++;
        }

    }
    if (this.flat === this.mEnemySet.length) {
        this.t = 1;
        gEngine.GameLoop.stop();
    }

    if (this.mHero.getHP() <= 0)
    {
        this.t = 0;
        gEngine.GameLoop.stop();
    }
    this.mAllParticles.update();
    // create particles when Down key is pressed
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
        if(this.mSkill-- === 1){
            var p = this._createParticle(this.mHero.getXform().getXPos(),
            this.mHero.getXform().getYPos());
            this.mAllParticles.addToSet(p);
        }

    }
    
    this.mAllParticlesD.update();
    if (this.mDragon.getHP() < 20) {
        var d_particle = this._createParticled(this.mDragon.getXform().getXPos(),
                this.mDragon.getXform().getYPos());
        this.mAllParticlesD.addToSet(d_particle);
    }
};

Palace.prototype.MapLoad = function () {
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
Palace.prototype._createParticle = function (atX, atY) {
    var life = 120;
    var p = new ParticleGameObject(this.kParticleTexture, atX, atY, life);
    p.getRenderable().setColor([1, 0, 0, 1]);

    // size of the particle
    var r = 10.5;
    p.getXform().setSize(r, r);

    // final color
    var fr = 3.5 + Math.random();
    var fg = 0.4 + 0.1 * Math.random();
    var fb = 0.3 + 0.1 * Math.random();
    p.setFinalColor([fr, fg, fb, 0.6]);

    // velocity on the particle
    var fx = 10 - 20 * Math.random();
    var fy = 10 * Math.random();
    p.getPhysicsComponent().setVelocity([fx, fy]);

    // size delta
    p.setSizeDelta(1.07);
    this.mHero.skill = 30;
    
    return p;
};
Palace.prototype._createParticled = function (atX, atY) {
    var life = 20000;
    var p = new ParticleGameObject(this.kParticleTexture, atX, atY, life);
    p.getRenderable().setColor([0, 120.0/255.0, 1, 1]);

    // size of the particle
    var r = 30.5;
    p.getXform().setSize(r, r);

    // final color
    var fr = 3.5 + Math.random();
    var fg = 0.4 + 0.1 * Math.random();
    var fb = 0.3 + 0.1 * Math.random();
    p.setFinalColor([fr, fg, fb, 0.6]);

    // velocity on the particle
    var fx = 10 - 20 * Math.random();
    var fy = 10 * Math.random();
    p.getPhysicsComponent().setVelocity([fx, fy]);
    
    p.setSizeDelta(0.95);

    return p;
};