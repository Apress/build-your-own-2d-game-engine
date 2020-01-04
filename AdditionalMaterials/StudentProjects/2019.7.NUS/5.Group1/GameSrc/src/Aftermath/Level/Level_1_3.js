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

function Level_1_3(aHero) {
    LevelScene.call(this, aHero);
    this.Bar = new UIBar([600, 10], [1000, 20]);
    this.Bar.setMidElemColor([0.6, 0, 0, 1]);

    this.mBoss = null;
    if (ROUND === 1) {

        this.maxDia = 3;
    } else {
        this.maxDia = 3;

    }
    this.levelName = "1-3-";
}


gEngine.Core.inheritPrototype(Level_1_3, LevelScene);

Level_1_3.prototype.initialize = function () {
    LevelScene.prototype.initialize.call(this);


    this.mBoss = new Boss(this.kBoss, this.kBullet);
    this.mBoss.setTarget(this.mHero);
    // this.mNPCs.push(this.mBoss);
    if (ROUND === 1) {

        this.mNPCs.push(this.mBoss);

    } else {
        this.mFriends.push(this.mBoss);
    }

    this.Bar.setMaxValue(this.mBoss.health);


    this.addTopWall();
    this.addGround();

    var i, j, k, rx, ry, obj, dx, dy;
    dx = 8;
    dy = 8;

    rx = -0;
    for (i = 0; i < 5; i++) {
        obj = new Platform(this.kPlatformTexture, rx, 40);
        this.mAllPlatforms.addToSet(obj);

        // obj = new Platform(this.kPlatformTexture, rx, 112);
        // this.mAllPlatforms.addToSet(obj);
        rx += 5;
    }
    rx = 200;
    for (i = 0; i < 5; i++) {
        obj = new Platform(this.kPlatformTexture, rx, 40);
        this.mAllPlatforms.addToSet(obj);

        // obj = new Platform(this.kPlatformTexture, rx, 112);
        // this.mAllPlatforms.addToSet(obj);
        rx -= 5;
    }

    rx = 50;
    for (i = 0; i < 20; i++) {
        obj = new Platform(this.kPlatformTexture, rx, 80);
        this.mAllPlatforms.addToSet(obj);

        // obj = new Platform(this.kPlatformTexture, rx, 112);
        // this.mAllPlatforms.addToSet(obj);
        rx += 5;
    }


    rx = 10;
    for (i = 0; i < this.mHero.health; i++) {
        this.hearts[i] = new Heart(this.kHeart, rx);
        rx += 7;
    }

};

Level_1_3.prototype.draw = function () {
    LevelScene.prototype.draw.call(this, this.mCamera);
    this.Bar.draw(this.mCamera);

};

Level_1_3.prototype.update = function () {
    LevelScene.prototype.update.call(this);
    this.Bar.setCurrentValue(this.mBoss.health);
    // this.Bar.setCurrentValue(-3);
    this.Bar.update();

    if (!this.inDia &&ROUND===2) {
        BULLET_SIZE = 250;
    }
};