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


function Welcome() {
    this.kBackGround = "assets/Material.png";

    this.mCamera = null;
    this.mBackGround = null;

    this.toNext = null;
    this.flat = 0;
}

gEngine.Core.inheritPrototype(Welcome, Scene);

Welcome.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBackGround);
};

Welcome.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kBackGround);
    var nextLevel = new Mov1();
    var nextLevel1 = new AboutUs();
    if (this.flat === 0) {
        gEngine.Core.startScene(nextLevel1);
    } else
        gEngine.Core.startScene(nextLevel);

};

Welcome.prototype.initialize = function () {
    this.mCamera = new Camera(
            vec2.fromValues(80, 45), // position of the camera
            160, // width of camera
            [0, 0, 1080, 607.5], // viewport (orgX, orgY, width, height)
            2
            );
    gEngine.DefaultResources.setGlobalAmbientIntensity(3.6);

    this.mCamera.setBackgroundColor([1, 1, 1, 1]);
    this.mBackGround = new BackGround(80, 45, 160, 90);
    this.mBackGround.setSpriteTexture(this.kBackGround, 0, 1080, 1441, 2048);
};

Welcome.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    this.mCamera.setupViewProjection();

    this.mBackGround.draw(this.mCamera);
};

Welcome.prototype.update = function () {
    var mx, my;
    mx = this.mCamera.mouseDCX();
    my = this.mCamera.mouseDCY();
    if (gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)) {
        // To Mov1
        if (mx > 430 && mx < 640 && my > 222 && my < 272) {
            this.flat = 1;
            gEngine.GameLoop.stop();
        }

        // To About Us
        if (mx > 430 && mx < 660 && my > 162 && my < 209) {
            this.flat = 0;
            gEngine.GameLoop.stop();
        }




    }

};