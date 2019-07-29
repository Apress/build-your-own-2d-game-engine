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

function Level_2_2(aHero) {
    LevelScene.call(this, aHero);
    if (ROUND === 1) {

        this.maxDia = 2;
    } else {
        this.maxDia = 3;

    }
    this.levelName = "2-2-";
}


gEngine.Core.inheritPrototype(Level_2_2, LevelScene);


Level_2_2.prototype.initialize = function () {
    LevelScene.prototype.initialize.call(this);
    this.mBoss = new Cat(this.kNPC, this.kBullet, vec2.fromValues(90, 78));
    this.mBoss.setTarget(this.mHero);
    // this.mNPCs.push(this.mBoss);
    if (ROUND === 1) {

        this.mNPCs.push(this.mBoss);

    } else {
        this.mFriends.push(this.mBoss);
    }
    this.mBoss = new Cat(this.kNPC, this.kBullet, vec2.fromValues(120, 78));
    this.mBoss.setTarget(this.mHero);
    // this.mNPCs.push(this.mBoss);
    if (ROUND === 1) {

        this.mNPCs.push(this.mBoss);

    } else {
        this.mFriends.push(this.mBoss);
    }
    this.mBoss = new Cat(this.kNPC, this.kBullet, vec2.fromValues(150, 78));
    this.mBoss.setTarget(this.mHero);
    // this.mNPCs.push(this.mBoss);
    if (ROUND === 1) {

        this.mNPCs.push(this.mBoss);

    } else {
        this.mFriends.push(this.mBoss);
    }

    var i, j, k, rx, ry, obj, dx, dy;
    dx = 8;
    dy = 8;

    rx = 0;
    for (i = 0; i < 3; i++) {
        obj = new Platform(this.kPlatformTexture, rx, 5);
        this.mAllPlatforms.addToSet(obj);


        rx += dx;
    }
    rx = 6 * dx;
    ry = 120;
    for (i = 0; i < 13; i++) {
        obj = new Platform(this.kPlatformTexture, rx, ry);
        this.mAllPlatforms.addToSet(obj);

        // obj = new Platform(this.kPlatformTexture, rx, 112);
        // this.mAllPlatforms.addToSet(obj);
        rx += dx;
    }

    rx = 5;
    ry = 5;

    rx += 2 * dx;
    for (j = 0; j < 8; j++) {
        obj = new Platform(this.kPlatformTexture, rx, ry);
        this.mAllPlatforms.addToSet(obj);
        ry += dy;
    }
    ry = 5 + 3 * dy;
    rx += 3 * dx;
    for (j = 0; j < 14; j++) {
        obj = new Platform(this.kPlatformTexture, rx, ry);
        this.mAllPlatforms.addToSet(obj);
        ry += dy;
    }

    ry = 5 + 2 * dy;
    rx += 19 * dx;
    for (j = 0; j < 13; j++) {
        obj = new Platform(this.kPlatformTexture, rx, ry);
        this.mAllPlatforms.addToSet(obj);
        ry += dy;
    }

    ry = 5;
    rx = 22 * dx;
    for (j = 0; j < 4; j++) {
        obj = new Platform(this.kPlatformTexture, rx, ry);
        this.mAllPlatforms.addToSet(obj);
        rx += dx;
    }

    ry = 5 + 3 * dy;
    rx = 11 * dx;
    for (j = 0; j < 4; j++) {
        obj = new Platform(this.kPlatformTexture, rx, ry);
        this.mAllPlatforms.addToSet(obj);
        rx += dx;
    }

    // ry = 5 + 6 * dy;
    // rx = 18 * dx;
    // for (j = 0; j < 7; j++) {
    //     obj = new Platform(this.kPlatformTexture, rx, ry);
    //     this.mAllPlatforms.addToSet(obj);
    //     rx += dx;
    // }
    ry = 5 + 8 * dy;
    rx = 8 * dx;
    for (j = 0; j < 21; j++) {
        obj = new Platform(this.kPlatformTexture, rx, ry);
        this.mAllPlatforms.addToSet(obj);
        rx += dx;
    }

    ry = 5 + 3 * dy;
    rx = 4 * dx - 3;
    obj = new Platform(this.kPlatformTexture, rx, ry);
    this.mAllPlatforms.addToSet(obj);
    // this.mT = new Trap(this.kGadgets, vec2.fromValues(rx, ry));
    this.mEli = obj;

    rx += dx;
    obj = new Platform(this.kPlatformTexture, rx, ry);
    this.mAllPlatforms.addToSet(obj);
    this.mEli2 = obj;

    // this.mT2 = new Trap(this.kGadgets, vec2.fromValues(rx, ry));
};

Level_2_2.prototype.draw = function () {
    LevelScene.prototype.draw.call(this, this.mCamera);
    // this.mT.draw(this.mCamera);
    // this.mT2.draw(this.mCamera);
};

Level_2_2.prototype.update = function () {
    LevelScene.prototype.update.call(this);

    this.mEli.mPlatform.getXform().getPosition()[1] += this.mEli.move;
    this.mEli2.mPlatform.getXform().getPosition()[1] += this.mEli2.move;

    var state = this.mCamera.collideWCBound(this.mEli.mPlatform.getXform(), 1);
    if ((state === 4) ) {
        this.mEli.mPlatform.getXform().getPosition()[1] = 0;
        this.mEli2.mPlatform.getXform().getPosition()[1] = 0;
        // this.mEli.move = -this.mEli.move;
        // this.mEli2.move = -this.mEli2.move;
    }
    // this.mT.mTrap.mXform.getPosition()[1] = this.mEli.mPlatform.getXform().getPosition()[1] + 5;
    // this.mT2.mTrap.mXform.getPosition()[1] = this.mEli.mPlatform.getXform().getPosition()[1] + 5;


};