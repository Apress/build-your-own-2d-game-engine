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

function Level_1_2(aHero) {
    LevelScene.call(this, aHero);
    this.kHandout = "assets/Word/handout.png";
    if (ROUND === 1) {

        this.maxDia = 4;
    } else {
        this.maxDia = 3;

    }
    this.levelName = "1-2-";
}

gEngine.Core.inheritPrototype(Level_1_2, LevelScene);

Level_1_2.prototype.loadScene = function () {
    LevelScene.prototype.loadScene.call(this);
    gEngine.Textures.loadTexture(this.kHandout);

};
Level_1_2.prototype.unloadScene = function () {
    LevelScene.prototype.unloadScene.call(this);
    gEngine.Textures.unloadTexture(this.kHandout);

};

Level_1_2.prototype.initialize = function () {
    LevelScene.prototype.initialize.call(this);

    // this.mHandout=new TextureRenderable(this.kHandout);
    // this.mHandout.getXform().setPosition(100, 50);
    // this.mHandout.getXform().setSize(20, 20);
    this.mHandout = new TextBlock(this.kHandout, 135, 5,80,10);

    this.mBoss = new Cat(this.kNPC, this.kBullet, vec2.fromValues(180, 70));
    this.mBoss.setTarget(this.mHero);
    if (ROUND === 1) {

        this.mNPCs.push(this.mBoss);

    } else {
        this.mFriends.push(this.mBoss);
    }

    this.addTopWall();
    // this.addGround();

    var i, j, k, rx, ry, obj, dx, dy;

    dx = 8;
    dy = 8;

    rx = 0;
    for (i = 0; i < 2; i++) {
        obj = new Platform(this.kPlatformTexture, rx, 5);
        this.mAllPlatforms.addToSet(obj);

        rx += 6 * dx;
    }

    rx = 0;
    ry = 5 + 7 * dy;
    for (i = 0; i < 4; i++) {
        obj = new Platform(this.kPlatformTexture, rx, ry);
        this.mAllPlatforms.addToSet(obj);
        rx += dx;
    }

    rx = 8 * dx;
    ry = 5 + 13 * dy;
    for (i = 0; i < 8; i++) {

        obj = new Platform(this.kPlatformTexture, rx, ry);
        this.mAllPlatforms.addToSet(obj);
        rx += 2 * dx;

    }
    rx = 23 * dx;
    ry = 5;
    for (i = 0; i < 3; i++) {

        obj = new Platform(this.kPlatformTexture, rx, ry);
        this.mAllPlatforms.addToSet(obj);
        rx += dx;

    }
    // rx = 10 * dx;
    // ry = 5 + 7 * dy;
    // for (i = 0; i < 8; i++) {
    //     obj = new Platform(this.kPlatformTexture, rx, ry);
    //     this.mAllPlatforms.addToSet(obj);
    //
    //     rx += dx;
    // }


    // rx = 5;
    // ry = 5;
    //
    // rx = [15, 20, 25,
    //     60,
    //     90, 90, 90, 90, 90, 90, 90,
    //     135,
    //     195];
    // ry = [40, 40, 40,
    //     70,
    //     50, 55, 60, 65, 70, 75, 80,
    //     60,
    //     60];
    // for (i = 0; i < 20; i++) {
    //     obj = new Platform(this.kPlatformTexture, rx[i], ry[i]);
    //     this.mAllPlatforms.addToSet(obj);
    // }

};


Level_1_2.prototype.draw = function () {
    LevelScene.prototype.draw.call(this, this.mCamera);

};

Level_1_2.prototype.update = function () {
    LevelScene.prototype.update.call(this);

    if (this.mHandout.getBBox().intersectsBound(this.mHero.getBBox())) {
        // this.showHandout = true;
        this.mAllPlatforms.addToSet(this.mHandout);

    }

    if (!this.inDia &&ROUND===2) {
        HERO_HEALTH = 10;
    }
};