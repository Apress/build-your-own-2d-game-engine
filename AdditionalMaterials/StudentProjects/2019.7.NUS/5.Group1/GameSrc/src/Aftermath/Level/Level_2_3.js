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

function Level_2_3(aHero) {
    LevelScene.call(this, aHero);
    this.Bar = new UIBar([600, 10], [1000, 20]);
    this.Bar.setMidElemColor([0.6, 0, 0, 1]);

    this.mBoss = null;

    this.kFake = "assets/Word/1/2-3-3.png";

    this.mFakeText = null;

    if (ROUND === 1) {

        this.maxDia = 2;
    } else {
        this.maxDia = 2;

    }
    this.levelName = "2-3-";

}


gEngine.Core.inheritPrototype(Level_2_3, LevelScene);

Level_2_3.prototype.loadScene = function () {
    LevelScene.prototype.loadScene.call(this);
    gEngine.Textures.loadTexture(this.kFake);

};
Level_2_3.prototype.unloadScene = function () {
    LevelScene.prototype.unloadScene.call(this);
    gEngine.Textures.unloadTexture(this.kFake);

};


Level_2_3.prototype.initialize = function () {
    LevelScene.prototype.initialize.call(this);


    this.mBoss = new Boss2(this.kCharacters, this.kBullet);
    this.mBoss.setTarget(this.mHero);
    this.mNPCs.push(this.mBoss);

    this.Bar.setMaxValue(this.mBoss.health);


    this.addTopWall();
    // this.addGround();

    var i, j, k, rx, ry, obj, dx, dy;
    dx = 8;
    dy = 8;

    rx = -0;
    ry = 5;
    for (i = 0; i < 15; i++) {
        obj = new Platform(this.kPlatformTexture, rx, ry);
        this.mAllPlatforms.addToSet(obj);

        // obj = new Platform(this.kPlatformTexture, rx, 112);
        // this.mAllPlatforms.addToSet(obj);
        rx += 3 * dx;
    }
    rx = dx;
    ry = 5;
    for (i = 0; i < 15; i++) {
        obj = new Platform(this.kPlatformTexture, rx, ry);
        this.mAllPlatforms.addToSet(obj);

        // obj = new Platform(this.kPlatformTexture, rx, 112);
        // this.mAllPlatforms.addToSet(obj);
        rx += 3 * dx;
    }

    rx = 2 * dx;
    for (i = 0; i < 10; i++) {
        obj = new Platform(this.kPlatformTexture, rx, 40);
        this.mAllPlatforms.addToSet(obj);

        // obj = new Platform(this.kPlatformTexture, rx, 112);
        // this.mAllPlatforms.addToSet(obj);
        rx += 3 * dx;
    }

    // rx = 200;
    // for (i = 0; i < 5; i++) {
    //     obj = new Platform(this.kPlatformTexture, rx, 40);
    //     this.mAllPlatforms.addToSet(obj);
    //
    //     // obj = new Platform(this.kPlatformTexture, rx, 112);
    //     // this.mAllPlatforms.addToSet(obj);
    //     rx -= 5;
    // }

    rx = 60;
    for (i = 0; i < 15; i++) {
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

Level_2_3.prototype.draw = function () {
    LevelScene.prototype.draw.call(this, this.mCamera);
    this.Bar.draw(this.mCamera);

    if (this.mFakeText !== null) {
        this.mFakeText.draw(this.mCamera);
    }
};

Level_2_3.prototype.update = function () {
    LevelScene.prototype.update.call(this);
    this.Bar.setCurrentValue(this.mBoss.health);
    // this.Bar.setCurrentValue(-3);
    this.Bar.update();

    if (this.levelClear && this.mFakeText === null) {
        this.mFakeText = new TextBlock(this.kFake, 40, 60, 40, 20);
        this.mFakeText.getRigidBody().setMass(.5);

    }

    if (this.mFakeText !== null) {
        this.mFakeText.update(this.mCamera);
        this.reset = gEngine.Physics.processObjSet(this.mFakeText, this.mAllPlatforms);

    }

    if (this.levelClear && (this.mCamera.collideWCBound(this.mHero.getXform(), 1) === 2)
    ) {
        CURRENT_LEVEL = SELECT.HIDDEN;
        gEngine.GameLoop.stop();
    }
};