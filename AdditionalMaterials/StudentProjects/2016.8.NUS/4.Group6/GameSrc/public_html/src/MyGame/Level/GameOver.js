/*
 * File: GameOVer.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
 Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
 GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light number_beatEnemy */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


function GameOver(overLevel) {
    this.kBackGround = "assets/Material.png";
    this.level = overLevel;///////////////////////////////////////////////
    this.mCamera = null;
    this.mBackGround = null;
    this.flat = 0;
    this.toNext = null;

}

gEngine.Core.inheritPrototype(GameOver, Scene);

GameOver.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBackGround);
};

GameOver.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kBackGround);

    var nextLevel1 = new MyGame();
    var nextLevel2 = new Garden();
    var nextLevel3 = new Palace();
    var welcome = new Welcome();
    if (this.flat === 1) {
        if (this.level === 1) {
            number_beatEnemy = 0;
            gEngine.Core.startScene(nextLevel1);
        }
        if (this.level === 2) {
            gEngine.Core.startScene(nextLevel2);
            number_beatEnemy = 5;
        }
        if (this.level === 3) {
            gEngine.Core.startScene(nextLevel3);
            number_beatEnemy = 14;
        }
    }
    if (this.flat === 0)
    {
        gEngine.Core.startScene(welcome);
        number_beatEnemy = 0;
    }
};

GameOver.prototype.initialize = function () {
    this.mCamera = new Camera(
            vec2.fromValues(80, 45), // position of the camera
            160, // width of camera
            [0, 0, 1080, 607.5], // viewport (orgX, orgY, width, height)
            2
            );
    gEngine.DefaultResources.setGlobalAmbientIntensity(3.6);

    this.mCamera.setBackgroundColor([1, 1, 1, 1]);
    this.mBackGround = new BackGround(80, 45, 160, 90);
    this.mBackGround.setSpriteTexture(this.kBackGround, 0, 1080, 222, 826);
};

GameOver.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    this.mCamera.setupViewProjection();

    this.mBackGround.draw(this.mCamera);
};

GameOver.prototype.update = function () {

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {

        this.flat = 1;
        gEngine.GameLoop.stop();
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.BackSpace)) {
        number_beatEnemy = 0;
        this.flat = 0;
        gEngine.GameLoop.stop();
    }
};