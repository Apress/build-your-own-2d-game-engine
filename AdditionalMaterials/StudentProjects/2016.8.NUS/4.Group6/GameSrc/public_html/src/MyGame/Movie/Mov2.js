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

function Mov2() {
    this.kMaterial = "assets/MovieShot/MovieShot2.jpg";

    this.kAudio1 = "assets/Music/Movie2.mp3";

    this.timer = 0;

    this.mCamera = null;
    this.mPic1 = null;
    this.mPic2 = null;
    this.mPic3 = null;
    this.mPic4 = null;
    this.mPic5 = null;
}
gEngine.Core.inheritPrototype(Mov2, Scene);

Mov2.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMaterial);
    gEngine.AudioClips.loadAudio(this.kAudio1);
};


Mov2.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kMaterial);
    gEngine.AudioClips.unloadAudio(this.kAudio1);

    gEngine.AudioClips.stopBackgroundAudio();

    var nextLevel = new Garden();
    gEngine.Core.startScene(nextLevel);
};

Mov2.prototype.initialize = function () {
    this.mCamera = new Camera(
            vec2.fromValues(80, 45), // position of the camera
            160, // width of camera
            [0, 0, 1080, 607.5], // viewport (orgX, orgY, width, height)
            2
            );
    gEngine.DefaultResources.setGlobalAmbientIntensity(3.6);
    this.mCamera.setBackgroundColor([0, 0, 0, 1]);

    this.mPic1 = new BackGround(80, 45, 120, 90);
    this.mPic1.setSpriteTexture(this.kMaterial, 0, 664, 0, 501);
    this.mPic1.setVisibility(false);

    this.mPic2 = new BackGround(80, 45, 120, 90);
    this.mPic2.setSpriteTexture(this.kMaterial, 663, 1326, 1532, 2048);
    this.mPic2.setVisibility(false);

    this.mPic3 = new BackGround(80, 45, 120, 90);
    this.mPic3.setSpriteTexture(this.kMaterial, 663, 1326, 1023, 1523);
    this.mPic3.setVisibility(false);

    this.mPic4 = new BackGround(80, 45, 120, 90);
    this.mPic4.setSpriteTexture(this.kMaterial, 665, 1327, 503, 1024);
    this.mPic4.setVisibility(false);

    this.mPic5 = new BackGround(80, 45, 120, 90);
    this.mPic5.setSpriteTexture(this.kMaterial, 663, 1327, 0, 502);
    this.mPic5.setVisibility(false);

    gEngine.AudioClips.playBackgroundAudio(this.kAudio1);
};

Mov2.prototype.draw = function () {
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
};

Mov2.prototype.update = function () {
    this.timer++;
    if (this.timer > 90 && this.timer < 360) {
        this.mPic1.setVisibility(true);
    }
    if (this.timer >= 320 && this.timer < 420) {
        this.mPic2.setVisibility(true);
    }
    if (this.timer >= 420 && this.timer < 600) {
        this.mPic3.setVisibility(true);
    }
    if (this.timer >= 600 && this.timer < 720) {
        this.mPic4.setVisibility(true);
    }
    if (this.timer >= 720 && this.timer < 900) {
        this.mPic5.setVisibility(true);
    }    
    if(this.timer>=900){
        gEngine.AudioClips.stopBackgroundAudio();
        gEngine.GameLoop.stop();
    }
     if (gEngine.Input.isKeyClicked(gEngine.Input.keys.P)) {
        gEngine.GameLoop.stop();
    }
};