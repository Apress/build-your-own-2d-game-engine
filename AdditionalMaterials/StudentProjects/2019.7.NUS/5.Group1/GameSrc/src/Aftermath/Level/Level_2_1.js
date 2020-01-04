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

function Level_2_1(aHero) {
    LevelScene.call(this, aHero);
    if (ROUND === 1) {

        this.maxDia = 2;
    } else {
        this.maxDia = 2;

    }
    this.levelName = "2-1-";
}


gEngine.Core.inheritPrototype(Level_2_1, LevelScene);

Level_2_1.prototype.initialize = function () {
    LevelScene.prototype.initialize.call(this);

    this.mBoss = new Cat(this.kNPC, this.kBullet, vec2.fromValues(95, 78));
    this.mBoss.setTarget(this.mHero);
    // this.mNPCs.push(this.mBoss);
    if (ROUND === 1) {

        this.mNPCs.push(this.mBoss);

    } else {
        this.mFriends.push(this.mBoss);
    }

    this.addTopWall();
    // this.addGround();
    var i, j, k, rx, ry, obj, dx, dy, plt;
    dx = 8;
    dy = 8;

    rx = 0;
    ry = 5;
    for (i = 0; i < 9; i++) {
        obj = new Platform(this.kPlatformTexture, rx, ry);
        this.mAllPlatforms.addToSet(obj);
        if (i > 3 && i < 7) {
            plt = new Trap(this.kGadgets, vec2.fromValues(rx - 4, ry + 4));
            this.mTrapSet.push(plt);
        }

        rx += dx;
    }

    rx = 19 * dx;
    for (i = 0; i < 9; i++) {
        obj = new Platform(this.kPlatformTexture, rx, 5);
        this.mAllPlatforms.addToSet(obj);


        rx += dx;
    }

    rx = 0;
    ry = 4 * dy;
    for (j = 0; j < 11; j++) {
        obj = new Platform(this.kPlatformTexture, rx, ry);
        this.mAllPlatforms.addToSet(obj);
        if (j < 4) {
            plt = new TrapWall(this.kGadgets, vec2.fromValues(rx + 5, ry), true);
            this.mTrapSet.push(plt);

        }
        ry += dy;

    }


    rx = 5;
    ry = 5;


    rx += 2 * dx;
    for (j = 0; j < 12; j++) {
        obj = new Platform(this.kPlatformTexture, rx, ry);
        this.mAllPlatforms.addToSet(obj);
        if (j > 8) {
            plt = new TrapWall(this.kGadgets, vec2.fromValues(rx - 5, ry), false);
            this.mTrapSet.push(plt);

        }
        ry += dy;

    }

    ry = 5 + 3 * dy;
    rx += 4 * dx;
    for (j = 0; j < 14; j++) {
        obj = new Platform(this.kPlatformTexture, rx, ry);
        this.mAllPlatforms.addToSet(obj);
        ry += dy;
    }

    rx -= dx;
    ry = 5 + 3 * dy;
    for (i = 0; i < 3; i++) {
        obj = new Platform(this.kPlatformTexture, rx, ry);
        this.mAllPlatforms.addToSet(obj);

        plt = new Trap(this.kGadgets, vec2.fromValues(rx, ry + 4));
        this.mTrapSet.push(plt);
        ry += 3 * dy;
        rx += Math.pow(-1, i + 1) * 2 * dx;

    }

    rx += 7 * dx;
    ry = 5 + 4 * dy;

    for (i = 0; i < 5; i++) {
        obj = new Platform(this.kPlatformTexture, rx, ry);
        this.mAllPlatforms.addToSet(obj);

        plt = new Trap(this.kGadgets, vec2.fromValues(rx, ry + 4));
        this.mTrapSet.push(plt);
        rx += 1.6 * dx;

    }

    rx = 7 * dx;
    ry = 5 + 8 * dy;

    for (i = 0; i < 10; i++) {
        obj = new Platform(this.kPlatformTexture, rx, ry);
        this.mAllPlatforms.addToSet(obj);
        rx += dx;
        // if (i > 3 && i < 7) {
        plt = new Trap(this.kGadgets, vec2.fromValues(rx, ry - 4), false);
        this.mTrapSet.push(plt);
        // }

    }
    for (i = 0; i < 6; i++) {
        obj = new Platform(this.kPlatformTexture, rx, ry);
        this.mAllPlatforms.addToSet(obj);
        if ( i < 3) {

            plt = new TrapWall(this.kGadgets, vec2.fromValues(rx + 5, ry), true);

            this.mTrapSet.push(plt);
        }
        ry += dy;

    }

    rx = 22 * dx;
    ry = 5 + dy;

    for (i = 0; i < 11; i++) {
        obj = new Platform(this.kPlatformTexture, rx, ry);
        this.mAllPlatforms.addToSet(obj);
        ry += dy;

    }

    rx = 24.5 * dx;
    ry = 5 + 2 * dy;
    for (i = 0; i < 12; i++) {
        obj = new Platform(this.kPlatformTexture, rx, ry);
        this.mAllPlatforms.addToSet(obj);
        ry += dy;

    }

    // this.mTrapSet.push(new Trap(this.kGadgets, vec2.fromValues(10, 10)));
    // this.mTrapSet.push(new TrapWall(this.kGadgets, vec2.fromValues(16, 10), true));

};
Level_2_1.prototype.draw = function () {
    LevelScene.prototype.draw.call(this, this.mCamera);

    for (let i = 0; i < this.mTrapSet.length; i++) {
        this.mTrapSet[i].draw(this.mCamera);
    }
};

Level_2_1.prototype.update = function () {
    LevelScene.prototype.update.call(this);
    for (let i = 0; i < this.mTrapSet.length; i++) {
        if (this.mTrapSet[i].getBBox().intersectsBound(this.mHero.getBBox())) {
            this.goLose();
        }

    }
    if (!this.inDia && ROUND===2) {
        this.mTrapSet = [];
    }

};