/*
 * File: AboutUs.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
 Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
 GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


function AboutUs() {
    this.kBackGround = "assets/background.jpg";
    this.kLrcMat = "assets/Material.png";

    this.AuBackGround = "assets/Music/When.mp3";
    this.kMinionSprite = "assets/new.png";

    this.timer = 0;

    this.mCamera = null;
    this.mBackGround = null;

    this.toNext = null;
    this.mGround = [];

    this.mLyric = null;

    this.mHero = null;

    this.mGongNv1 = null;
    this.mGongNv2 = null;
    this.mGongNv3 = null;
    this.mTaijian1 = null;
    this.mTaijian2 = null;
    this.mMomo = null;
    this.mQueen = null;
    this.mHuangshang = null;
}

gEngine.Core.inheritPrototype(AboutUs, Scene);

AboutUs.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBackGround);
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.AudioClips.loadAudio(this.AuBackGround);
    gEngine.Textures.loadTexture(this.kLrcMat);

};

AboutUs.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kBackGround);
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.AudioClips.unloadAudio(this.AuBackGround);
    gEngine.Textures.unloadTexture(this.kLrcMat);


    var nextLevel = new Welcome();
    gEngine.Core.startScene(nextLevel);
};

AboutUs.prototype.initialize = function () {
    this.mCamera = new Camera(
            vec2.fromValues(80, 45), // position of the camera
            160, // width of camera
            [0, 0, 1080, 607.5], // viewport (orgX, orgY, width, height)
            2
            );
    gEngine.DefaultResources.setGlobalAmbientIntensity(3.6);
    this.mCamera.setBackgroundColor([1, 1, 1, 0]);

    this.mBackGround = new BackGround(80, 45, 160, 90);
    this.mBackGround.setSpriteTexture(this.kBackGround, 1025, 2040, 663, 1239);

    this.mLyric = new BackGround(80, -80, 90, 190);
    this.mLyric.setSpriteTexture(this.kLrcMat, 1081, 2048, 0, 2048);

    for (var i = 0; i < 20; i++) {
        this.mGround[i] = new SpriteRenderable(this.kMinionSprite);
        this.mGround[i].setColor([1, 1, 1, 0]);
        this.mGround[i].getXform().setSize(9, 16);
        this.mGround[i].setElementPixelPositions(324, 384, 184, 220);
        this.mGround[i].getXform().setPosition(9 * i, 5);
    }

    this.mHero = new Bye(this.kMinionSprite, 40, 18, 2);
    this.mHero.setAnimInfo(512, 857, 42, 99);

    this.mGongNv1 = new Bye(this.kMinionSprite, 170, 18, 1);
    this.mGongNv1.setAnimInfo(512, 141, 47, 102);
    this.mGongNv2 = new Bye(this.kMinionSprite, 170, 18, 2);
    this.mGongNv2.setAnimInfo(512, 141, 47, 102);
    this.mGongNv3 = new Bye(this.kMinionSprite, 170, 18, 1.5);
    this.mGongNv3.setAnimInfo(512, 141, 47, 102);

    this.mTaijian1 = new Bye(this.kMinionSprite, 170, 18, 3);
    this.mTaijian1.setAnimInfo(512, 608, 39, 101);
    this.mTaijian2 = new Bye(this.kMinionSprite, 170, 18, 1);
    this.mTaijian2.setAnimInfo(512, 608, 39, 101);

    this.mMomo = new Bye(this.kMinionSprite, 170, 18, 2);
    this.mMomo.setAnimInfo(512, 296, 48, 102);

    this.mQueen = new Bye(this.kMinionSprite, 170, 18, 2);
    this.mQueen.setAnimInfo(512, 463, 41, 102);

    gEngine.AudioClips.playBackgroundAudio(this.AuBackGround);
};

AboutUs.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    this.mCamera.setupViewProjection();

    this.mBackGround.draw(this.mCamera);
    this.mLyric.draw(this.mCamera);
    for (var i = 0; i < this.mGround.length; i++) {
        this.mGround[i].draw(this.mCamera);
    }

    this.mGongNv1.draw(this.mCamera);
    this.mGongNv2.draw(this.mCamera);
    this.mGongNv3.draw(this.mCamera);
    this.mTaijian1.draw(this.mCamera);
    this.mTaijian2.draw(this.mCamera);
    this.mMomo.draw(this.mCamera);
    this.mQueen.draw(this.mCamera);

    this.mHero.draw(this.mCamera);

};

AboutUs.prototype.update = function () {
    this.timer++;

    this.MapLoad();
    this.mLyric.lrcUpdate();

    this.mHero.updateStay();
    this.mGongNv1.updateMove(this.timer, 540+360, -1);
    this.mGongNv2.updateMove(this.timer, 540+120, -1);
    this.mGongNv3.updateMove(this.timer, 540+180, -1);
    this.mTaijian1.updateMove(this.timer, 540+540, -1);
    this.mTaijian2.updateMove(this.timer, 540+720, -1);
    this.mMomo.updateMove(this.timer, 540+600, -1);
    this.mQueen.updateMove(this.timer, 540+840, -1);
     if (gEngine.Input.isKeyPressed(gEngine.Input.keys.P)) {
         gEngine.GameLoop.stop();
     }
};

AboutUs.prototype.MapLoad = function () {
    var deltaX = 1;
    var sform = [];
    for (var i = 0; i < this.mGround.length; i++) {
        sform[i] = this.mGround[i].getXform();
    }
    for (var i = 0; i < this.mGround.length; i++) {
        if (sform[i].getXPos() > -9) {
            sform[i].incXPosBy(-0.5 * deltaX);

        } else {
            sform[i].setXPos(170.0);
        }
    }
};