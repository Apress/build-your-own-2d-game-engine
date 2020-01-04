/*
 * File: LevelScene.js
 * This is the logic of our game.
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Level_1_1(aHero) {
    LevelScene.call(this, aHero);
    if (ROUND === 1) {

        this.maxDia = 9;
    } else {
        this.maxDia = 4;

    }
    this.levelName = "1-1-";
}


gEngine.Core.inheritPrototype(Level_1_1, LevelScene);

Level_1_1.prototype.loadScene = function () {
    LevelScene.prototype.loadScene.call(this);


};


Level_1_1.prototype.unloadScene = function () {
    LevelScene.prototype.unloadScene.call(this);


};


Level_1_1.prototype.initialize = function () {
    LevelScene.prototype.initialize.call(this);
    this.mBoss = new Cat(this.kNPC, this.kBullet, vec2.fromValues(130, 70));
    this.mBoss.setTarget(this.mHero);
    if (ROUND === 1) {

        this.mNPCs.push(this.mBoss);

    } else {
        this.mFriends.push(this.mBoss);
    }

    this.addTopWall();
    var i, rx, ry, obj, dx, dy;
    dx = 8;
    dy = 8;

    rx = 0;
    for (i = 0; i < 9; i++) {
        obj = new Platform(this.kPlatformTexture, rx, 5);
        this.mAllPlatforms.addToSet(obj);


        rx += dx;
    }

    rx = 19 * dx;
    for (i = 0; i < 9; i++) {
        obj = new Platform(this.kPlatformTexture, rx, 5);
        this.mAllPlatforms.addToSet(obj);


        rx += dx;
    }


    rx = 10 * dx;
    ry = 5 + 7 * dy;
    for (i = 0; i < 8; i++) {
        obj = new Platform(this.kPlatformTexture, rx, ry);
        this.mAllPlatforms.addToSet(obj);

        rx += dx;
    }


};

Level_1_1.prototype.draw = function () {
    LevelScene.prototype.draw.call(this, this.mCamera);

};

Level_1_1.prototype.update = function () {
    LevelScene.prototype.update.call(this);

};