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

function Mov1() {
    this.kMaterial = "assets/MovieShot/MovieShot1.jpg";
    this.kGuide = "assets/Material.png";

    this.kAudio1 = "assets/Music/Movie1.mp3";

    this.timer = 0;

    this.mCamera = null;
    this.mPic0 = null;
    this.mPic1 = null;
    this.mPic2 = null;
    this.mPic3 = null;
    this.mPic4 = null;
    this.mPic5 = null;
    this.mPic6 = null;
    this.mPic7 = null;
    this.mPic8 = null;
    this.mPic9 = null;
    this.mPic10 = null;
    this.mPic11 = null;
    this.mPic12 = null;


}
gEngine.Core.inheritPrototype(Mov1, Scene);

Mov1.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMaterial);

    gEngine.Textures.loadTexture(this.kGuide);
    gEngine.AudioClips.loadAudio(this.kAudio1);
};


Mov1.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kMaterial);
    gEngine.Textures.unloadTexture(this.kGuide);
    gEngine.AudioClips.unloadAudio(this.kAudio1);

    gEngine.AudioClips.stopBackgroundAudio();

    var nextLevel = new MyGame();
    gEngine.Core.startScene(nextLevel);
};

Mov1.prototype.initialize = function () {
    this.mCamera = new Camera(
            vec2.fromValues(80, 45), // position of the camera
            160, // width of camera
            [0, 0, 1080, 607.5], // viewport (orgX, orgY, width, height)
            2
            );
    gEngine.DefaultResources.setGlobalAmbientIntensity(3.6);
    this.mCamera.setBackgroundColor([0, 0, 0, 1]);

    this.mPic0 = new BackGround(80, 45, 160, 90);
    this.mPic0.setSpriteTexture(this.kGuide, 0, 1080, 833, 1442);
    this.mPic0.setVisibility(false);

    this.mPic1 = new BackGround(80, 45, 120, 90);
    this.mPic1.setSpriteTexture(this.kMaterial, 0, 665, 1537, 2048);
    this.mPic1.setVisibility(false);

    this.mPic2 = new BackGround(80, 45, 120, 90);
    this.mPic2.setSpriteTexture(this.kMaterial, 0, 662, 1037, 1537);
    this.mPic2.setVisibility(false);

    this.mPic3 = new BackGround(80, 45, 120, 90);
    this.mPic3.setSpriteTexture(this.kMaterial, 0, 662, 528, 1028);
    this.mPic3.setVisibility(false);

    this.mPic4 = new BackGround(80, 45, 120, 90);
    this.mPic4.setSpriteTexture(this.kMaterial, 0, 662, 5, 528);
    this.mPic4.setVisibility(false);

    this.mPic5 = new BackGround(80, 45, 120, 90);
    this.mPic5.setSpriteTexture(this.kMaterial, 666, 1328, 1539, 2048);
    this.mPic5.setVisibility(false);

    this.mPic6 = new BackGround(80, 45, 120, 90);
    this.mPic6.setSpriteTexture(this.kMaterial, 668, 1329, 1039, 1539);
    this.mPic6.setVisibility(false);

    this.mPic7 = new BackGround(80, 45, 120, 90);
    this.mPic7.setSpriteTexture(this.kMaterial, 667, 1328, 522, 1030);
    this.mPic7.setVisibility(false);

    this.mPic8 = new BackGround(80, 45, 120, 90);
    this.mPic8.setSpriteTexture(this.kMaterial, 668, 1333, 15, 517);
    this.mPic8.setVisibility(false);

    this.mPic9 = new BackGround(80, 45, 120, 90);
    this.mPic9.setSpriteTexture(this.kMaterial, 1335, 1996, 1540, 2045);
    this.mPic9.setVisibility(false);

    this.mPic10 = new BackGround(80, 45, 120, 90);
    this.mPic10.setSpriteTexture(this.kMaterial, 1336, 1996, 1026, 1533);
    this.mPic10.setVisibility(false);

    this.mPic11 = new BackGround(80, 45, 120, 90);
    this.mPic11.setSpriteTexture(this.kMaterial, 1336, 1997, 515, 1022);
    this.mPic11.setVisibility(false);

    this.mPic12 = new BackGround(80, 45, 120, 90);
    this.mPic12.setSpriteTexture(this.kMaterial, 1336, 1996, 0, 510);
    this.mPic12.setVisibility(false);
    gEngine.AudioClips.playBackgroundAudio(this.kAudio1);
};

Mov1.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    this.mCamera.setupViewProjection();

    this.mPic0.draw(this.mCamera);
    this.mPic0.setVisibility(false);
    this.mPic1.draw(this.mCamera);
    this.mPic1.setVisibility(false);
    this.mPic2.draw(this.mCamera);
    this.mPic2.setVisibility(false);
    this.mPic3.draw(this.mCamera);
    this.mPic3.setVisibility(false);
    this.mPic4.draw(this.mCamera);
    this.mPic4.setVisibility(false);
    this.mPic5.draw(this.mCamera);
    this.mPic5.setVisibility(false);
    this.mPic6.draw(this.mCamera);
    this.mPic6.setVisibility(false);
    this.mPic7.draw(this.mCamera);
    this.mPic7.setVisibility(false);
    this.mPic8.draw(this.mCamera);
    this.mPic8.setVisibility(false);
    this.mPic9.draw(this.mCamera);
    this.mPic9.setVisibility(false);
    this.mPic10.draw(this.mCamera);
    this.mPic10.setVisibility(false);
    this.mPic11.draw(this.mCamera);
    this.mPic11.setVisibility(false);
    this.mPic12.draw(this.mCamera);
    this.mPic12.setVisibility(false);
};

Mov1.prototype.update = function () {
    this.timer++;
    if (this.timer > 1 && this.timer < 390) {
        this.mPic0.setVisibility(true);
    }
    if (this.timer >= 390 && this.timer < 720) {
        this.mPic1.setVisibility(true);
    }
    if (this.timer >= 720 && this.timer < 1020) {
        this.mPic2.setVisibility(true);
    }
    if (this.timer >= 1020 && this.timer < 1200) {
        this.mPic3.setVisibility(true);
    }
    if (this.timer >= 1200 && this.timer < 1380) {
        this.mPic4.setVisibility(true);
    }
    if (this.timer >= 1380 && this.timer < 1560) {
        this.mPic5.setVisibility(true);
    }
    if (this.timer >= 1560 && this.timer < 1860) {
        this.mPic6.setVisibility(true);
    }
    if (this.timer >= 1860 && this.timer < 2340) {
        this.mPic7.setVisibility(true);
    }
    if (this.timer >= 2340 && this.timer < 2460) {
        this.mPic8.setVisibility(true);
    }
    if (this.timer >= 2460 && this.timer < 2700) {
        this.mPic9.setVisibility(true);
    }
    if (this.timer >= 2700 && this.timer < 2820) {
        this.mPic10.setVisibility(true);
    }
    if (this.timer >= 2820 && this.timer < 3000) {
        this.mPic11.setVisibility(true);
    }
    if (this.timer >= 3000 && this.timer < 3180) {
        this.mPic12.setVisibility(true);
    }
    if (this.timer > 3200) {
        gEngine.AudioClips.stopBackgroundAudio();
        gEngine.GameLoop.stop();
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.P)) {
        gEngine.GameLoop.stop();
    }
};