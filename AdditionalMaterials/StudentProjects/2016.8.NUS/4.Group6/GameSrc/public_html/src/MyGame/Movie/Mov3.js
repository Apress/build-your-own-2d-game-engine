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

function Mov3() {
    this.kMaterial = "assets/MovieShot/MovieShot3.jpg";

    this.kAudio1 = "assets/Music/Movie3.mp3";

    this.timer = 0;

    this.mCamera = null;
    this.mPic1 = null;
    this.mPic2 = null;
    this.mPic3 = null;
    this.mPic4 = null;
    this.mPic5 = null;
    this.mPic6 = null;
}
gEngine.Core.inheritPrototype(Mov3, Scene);

Mov3.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMaterial);
    gEngine.AudioClips.loadAudio(this.kAudio1);
};


Mov3.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kMaterial);
    gEngine.AudioClips.unloadAudio(this.kAudio1);

    gEngine.AudioClips.stopBackgroundAudio();

    var nextLevel = new Palace();
    gEngine.Core.startScene(nextLevel);
};

Mov3.prototype.initialize = function () {
    this.mCamera = new Camera(
            vec2.fromValues(80, 45), // position of the camera
            160, // width of camera
            [0, 0, 1080, 607.5], // viewport (orgX, orgY, width, height)
            2
            );
    gEngine.DefaultResources.setGlobalAmbientIntensity(3.6);
    this.mCamera.setBackgroundColor([0, 0, 0, 1]);

    this.mPic1 = new BackGround(80, 45, 120, 90);
    this.mPic1.setSpriteTexture(this.kMaterial, 0, 662, 1534, 2048);
    this.mPic1.setVisibility(false);

    this.mPic2 = new BackGround(80, 45, 120, 90);
    this.mPic2.setSpriteTexture(this.kMaterial, 0, 662, 1015, 1534);
    this.mPic2.setVisibility(false);

    this.mPic3 = new BackGround(80, 45, 120, 90);
    this.mPic3.setSpriteTexture(this.kMaterial, 0, 664, 515, 1029);
    this.mPic3.setVisibility(false);

    this.mPic4 = new BackGround(80, 45, 120, 90);
    this.mPic4.setSpriteTexture(this.kMaterial, 0, 664, 0, 504);
    this.mPic4.setVisibility(false);

    this.mPic5 = new BackGround(80, 45, 120, 90);
    this.mPic5.setSpriteTexture(this.kMaterial, 663, 1328, 1531, 2048);
    this.mPic5.setVisibility(false);

    this.mPic6 = new BackGround(80, 45, 120, 90);
    this.mPic6.setSpriteTexture(this.kMaterial, 661, 1329, 1019, 1533);
    this.mPic6.setVisibility(false);

    gEngine.AudioClips.playBackgroundAudio(this.kAudio1);
};

Mov3.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    this.mCamera.setupViewProjection();

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
};

Mov3.prototype.update = function () {
    this.timer++;
    if (this.timer > 30 && this.timer < 120) {
        this.mPic1.setVisibility(true);
    }
    if (this.timer >= 120 && this.timer < 240) {
        this.mPic2.setVisibility(true);
    }
    if (this.timer >= 240 && this.timer < 420) {
        this.mPic3.setVisibility(true);
    }
    if (this.timer >= 420 && this.timer < 480) {
        this.mPic4.setVisibility(true);
    }
    if (this.timer >= 480 && this.timer < 660) {
        this.mPic5.setVisibility(true);
    }
    if (this.timer >= 660 && this.timer < 840) {
        this.mPic6.setVisibility(true);
    }
    if (this.timer >= 840) {
        gEngine.AudioClips.stopBackgroundAudio();
        gEngine.GameLoop.stop();
    }
     if (gEngine.Input.isKeyClicked(gEngine.Input.keys.P)) {
        gEngine.GameLoop.stop();
    }
};