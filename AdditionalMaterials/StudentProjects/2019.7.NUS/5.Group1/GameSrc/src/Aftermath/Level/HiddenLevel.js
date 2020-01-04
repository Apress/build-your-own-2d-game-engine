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

function HiddenLevel(aHero) {
    LevelScene.call(this, aHero);
    if (ROUND === 1) {

        this.maxDia = 3;
    } else {
        this.maxDia = 5;

    }
    this.levelName = "hidden-";

    this.kBg = "assets/Background/hidden-bg.png";
    this.mBarrageSet = [];

    this.lastChange = 0;
    this.lastFire = 0;
    this.patternType = 0;

    this.mBook = null;
    this.Win = false;


}


gEngine.Core.inheritPrototype(HiddenLevel, LevelScene);

HiddenLevel.prototype.loadScene = function () {
    LevelScene.prototype.loadScene.call(this);
    for (let i = 1; i <= this.maxDia; i++) {

        gEngine.Textures.loadTexture(this.kText + this.levelName + i + ".png");
    }

};


HiddenLevel.prototype.unloadScene = function () {
    // if (this.Win) {
    //     gEngine.Core.startScene(new HomePage());
    //     return;
    // }
    LevelScene.prototype.unloadScene.call(this);

    // for (let i = 1; i <= this.maxDia; i++) {
    //     gEngine.Textures.unloadTexture(this.kText + this.levelName + i + ".png");
    // }

};


HiddenLevel.prototype.initialize = function () {
    LevelScene.prototype.initialize.call(this);
    if (ROUND === 2) {
        this.mBoss = new Boss3(this.kCharacters, this.kBullet, vec2.fromValues(130, 70));
        this.mBoss.setTarget(this.mHero);
        this.mNPCs.push(this.mBoss);

    } else {
        this.mHero.health = 1;
    }
    this.bg = new TextureRenderable(this.kBg);
    this.bg.getXform().setSize(200, 112.5);
    this.bg.getXform().setPosition(100, 56.25);

    this.mBook = new Book(this.kGadgets, 96, 105);

    this.addTopWall();
    var i, rx, ry, obj, dx, dy;
    dx = 8;
    dy = 8;

    this.mHero.mDye.getXform().getPosition()[0] = 12 * dx;


    // rx = 0;
    // for (i = 0; i < 4; i++) {
    //     obj = new Platform(this.kPlatformTexture, rx, 5);
    //     this.mAllPlatforms.addToSet(obj);
    //
    //
    //     rx += dx;
    // }
    //
    // rx = 19 * dx;
    // for (i = 0; i < 4; i++) {
    //     obj = new Platform(this.kPlatformTexture, rx, 5);
    //     this.mAllPlatforms.addToSet(obj);
    //
    //
    //     rx += dx;
    // }


    rx = 9 * dx;
    ry = 5;
    for (i = 0; i < 8; i++) {
        obj = new Platform(this.kPlatformTexture, rx, ry);
        this.mAllPlatforms.addToSet(obj);

        rx += dx;
    }

    rx = 0;
    ry = 5 + 5 * dy;
    for (i = 0; i < 5; i++) {
        obj = new Platform(this.kPlatformTexture, rx, ry);
        this.mAllPlatforms.addToSet(obj);

        rx += dx;
    }

    rx = 21 * dx;
    ry = 5 + 5 * dy;
    for (i = 0; i < 5; i++) {
        obj = new Platform(this.kPlatformTexture, rx, ry);
        this.mAllPlatforms.addToSet(obj);

        rx += dx;
    }

    rx = 12 * dx;
    ry = 5 + 12 * dy;
    obj = new Platform(this.kPlatformTexture, rx, ry);
    this.mAllPlatforms.addToSet(obj);
    rx = 7 * dx;
    ry = 5 + 8 * dy;
    obj = new Platform(this.kPlatformTexture, rx, ry);
    this.mAllPlatforms.addToSet(obj);
    rx = 18 * dx;
    ry = 5 + 8 * dy;
    obj = new Platform(this.kPlatformTexture, rx, ry);
    this.mAllPlatforms.addToSet(obj);


};

HiddenLevel.prototype.draw = function () {
    LevelScene.prototype.draw.call(this, this.mCamera);
    for (let i = 0; i < this.mBarrageSet.length; i++) {
        this.mBarrageSet[i].draw(this.mCamera);
    }
    if (ROUND === 1) {
        this.mBook.draw(this.mCamera);
    }
};

HiddenLevel.prototype.update = function () {
    LevelScene.prototype.update.call(this);

    // if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
    //     this.pattern5();
    // }
    if (!this.inDia) {
        if (ROUND === 1) {
            for (let i = 0; i < this.mBarrageSet.length; i++) {
                this.mBarrageSet[i].update(this.mCamera);
            }

            if (Date.now() - this.lastChange > 6000) {
                this.patternType = Math.min(this.patternType + 1, 6);
                this.lastChange = Date.now();
            }
            if ((Date.now() - this.lastChange > 4000 || this.patternType === 1) && (Date.now() - this.lastFire > 100)) {
                this.lastFire = Date.now();
                switch (this.patternType) {
                    case 1:
                        this.pattern1();
                        break;
                    case 2:
                        this.pattern2();
                        break;
                    case 3:
                        this.pattern3();
                        break;
                    case 4:
                        this.pattern4();
                        break;
                    case 5:
                        this.pattern5();
                        break;
                    case 6:
                        this.pattern6();
                        break;


                }

            }
            if (this.mBook.getBBox().intersectsBound(this.mHero.getBBox())) {
                ROUND = 2;
                // this.goBack();
                this.goWin();
            }
        }


    }



};

HiddenLevel.prototype.goWin = function () {
    this.Win = true;
    gEngine.GameLoop.stop();


};
HiddenLevel.prototype.pattern1 = function () {
    var angle = 0;
    this.currentBarrageType = 1;
    this.mBoss = this.mNPCs[0];

    var b = new Barrage(this.kBullet, vec2.fromValues(10, 80), 0.8, this.currentBarrageType, 25, angle);
    b.setTarget(this.mHero);
    this.mBarrageSet.push(b);

    angle = -Math.PI / 2;

    b = new Barrage(this.kBullet, vec2.fromValues(190, 80), 0.8, this.currentBarrageType, 25, angle);
    b.setTarget(this.mHero);
    this.mBarrageSet.push(b);


};

HiddenLevel.prototype.pattern2 = function () {
    var angle = Math.PI / 4;
    this.currentBarrageType = 1;
    var b = new Barrage(this.kBullet, vec2.fromValues(10, 10), 0.8, this.currentBarrageType, 25, angle);
    b.setTarget(this.mHero);
    this.mBarrageSet.push(b);

    angle = Math.PI / 5;
    b = new Barrage(this.kBullet, vec2.fromValues(10, 40), 0.8, this.currentBarrageType, 25, angle);
    b.setTarget(this.mHero);
    this.mBarrageSet.push(b);

    angle = -Math.PI / 1.5;
    b = new Barrage(this.kBullet, vec2.fromValues(190, 10), 0.8, this.currentBarrageType, 25, angle);
    b.setTarget(this.mHero);
    this.mBarrageSet.push(b);

    angle = -Math.PI / 1.8;
    b = new Barrage(this.kBullet, vec2.fromValues(190, 40), 0.8, this.currentBarrageType, 25, angle);
    b.setTarget(this.mHero);
    this.mBarrageSet.push(b);

    angle = Math.PI / 4;
    b = new Barrage(this.kBullet, vec2.fromValues(80, 80), 0.8, this.currentBarrageType, 25, angle);
    b.setTarget(this.mHero);
    this.mBarrageSet.push(b);

    angle = Math.PI / 5;
    b = new Barrage(this.kBullet, vec2.fromValues(80, 100), 0.8, this.currentBarrageType, 25, angle);
    b.setTarget(this.mHero);
    this.mBarrageSet.push(b);

    angle = -Math.PI / 1.5;
    b = new Barrage(this.kBullet, vec2.fromValues(120, 80), 0.8, this.currentBarrageType, 25, angle);
    b.setTarget(this.mHero);
    this.mBarrageSet.push(b);

    angle = -Math.PI / 1.8;
    b = new Barrage(this.kBullet, vec2.fromValues(120, 100), 0.8, this.currentBarrageType, 25, angle);
    b.setTarget(this.mHero);
    this.mBarrageSet.push(b);


};

HiddenLevel.prototype.pattern3 = function () {
    var angle = Math.PI / 4;
    this.currentBarrageType = 1;
    var b = new Barrage(this.kBullet, vec2.fromValues(40, 50), 0.8, this.currentBarrageType, 25, angle);
    b.setTarget(this.mHero);
    this.mBarrageSet.push(b);

    angle = Math.PI / 5;
    b = new Barrage(this.kBullet, vec2.fromValues(40, 70), 0.8, this.currentBarrageType, 25, angle);
    b.setTarget(this.mHero);
    this.mBarrageSet.push(b);

    angle = -Math.PI / 1.5;
    b = new Barrage(this.kBullet, vec2.fromValues(160, 50), 0.8, this.currentBarrageType, 25, angle);
    b.setTarget(this.mHero);
    this.mBarrageSet.push(b);

    angle = -Math.PI / 1.8;
    b = new Barrage(this.kBullet, vec2.fromValues(160, 70), 0.8, this.currentBarrageType, 25, angle);
    b.setTarget(this.mHero);
    this.mBarrageSet.push(b);

    angle = Math.PI / 4;
    b = new Barrage(this.kBullet, vec2.fromValues(80, 80), 0.8, this.currentBarrageType, 25, angle);
    b.setTarget(this.mHero);
    this.mBarrageSet.push(b);

    angle = Math.PI / 5;
    b = new Barrage(this.kBullet, vec2.fromValues(80, 100), 0.8, this.currentBarrageType, 25, angle);
    b.setTarget(this.mHero);
    this.mBarrageSet.push(b);

    angle = -Math.PI / 1.5;
    b = new Barrage(this.kBullet, vec2.fromValues(120, 80), 0.8, this.currentBarrageType, 25, angle);
    b.setTarget(this.mHero);
    this.mBarrageSet.push(b);

    angle = -Math.PI / 1.8;
    b = new Barrage(this.kBullet, vec2.fromValues(120, 100), 0.8, this.currentBarrageType, 25, angle);
    b.setTarget(this.mHero);
    this.mBarrageSet.push(b);

};

HiddenLevel.prototype.pattern4 = function () {
    var angle = Math.PI / 4;
    this.currentBarrageType = 1;
    var b = new Barrage(this.kBullet, vec2.fromValues(10, 10), 0.8, this.currentBarrageType, 25, angle);
    b.setTarget(this.mHero);
    this.mBarrageSet.push(b);

    angle = Math.PI / 5;
    b = new Barrage(this.kBullet, vec2.fromValues(10, 40), 0.8, this.currentBarrageType, 25, angle);
    b.setTarget(this.mHero);
    this.mBarrageSet.push(b);

    angle = -Math.PI / 1.5;
    b = new Barrage(this.kBullet, vec2.fromValues(190, 10), 0.8, this.currentBarrageType, 25, angle);
    b.setTarget(this.mHero);
    this.mBarrageSet.push(b);

    angle = -Math.PI / 1.8;
    b = new Barrage(this.kBullet, vec2.fromValues(190, 40), 0.8, this.currentBarrageType, 25, angle);
    b.setTarget(this.mHero);
    this.mBarrageSet.push(b);

    angle = Math.PI / 4;
    b = new Barrage(this.kBullet, vec2.fromValues(80, 80), 0.8, this.currentBarrageType, 25, angle);
    b.setTarget(this.mHero);
    this.mBarrageSet.push(b);

    angle = Math.PI / 5;
    b = new Barrage(this.kBullet, vec2.fromValues(80, 100), 0.8, this.currentBarrageType, 25, angle);
    b.setTarget(this.mHero);
    this.mBarrageSet.push(b);

    angle = -Math.PI / 1.5;
    b = new Barrage(this.kBullet, vec2.fromValues(120, 80), 0.8, this.currentBarrageType, 25, angle);
    b.setTarget(this.mHero);
    this.mBarrageSet.push(b);

    angle = -Math.PI / 1.8;
    b = new Barrage(this.kBullet, vec2.fromValues(120, 100), 0.8, this.currentBarrageType, 25, angle);
    b.setTarget(this.mHero);
    this.mBarrageSet.push(b);


};

HiddenLevel.prototype.pattern5 = function () {
    var angle = Math.PI / 4;
    this.currentBarrageType = 1;
    var b = new Barrage(this.kBullet, vec2.fromValues(10, 10), 0.8, this.currentBarrageType, 25, angle);
    b.setTarget(this.mHero);
    this.mBarrageSet.push(b);

    angle = Math.PI / 5;
    b = new Barrage(this.kBullet, vec2.fromValues(10, 40), 0.8, this.currentBarrageType, 25, angle);
    b.setTarget(this.mHero);
    this.mBarrageSet.push(b);

    angle = -Math.PI / 1.5;
    b = new Barrage(this.kBullet, vec2.fromValues(190, 10), 0.8, this.currentBarrageType, 25, angle);
    b.setTarget(this.mHero);
    this.mBarrageSet.push(b);

    angle = -Math.PI / 1.8;
    b = new Barrage(this.kBullet, vec2.fromValues(190, 40), 0.8, this.currentBarrageType, 25, angle);
    b.setTarget(this.mHero);
    this.mBarrageSet.push(b);

    angle = Math.PI / 4;
    b = new Barrage(this.kBullet, vec2.fromValues(80, 50), 0.8, this.currentBarrageType, 25, angle);
    b.setTarget(this.mHero);
    this.mBarrageSet.push(b);

    angle = Math.PI / 5;
    b = new Barrage(this.kBullet, vec2.fromValues(80, 80), 0.8, this.currentBarrageType, 25, angle);
    b.setTarget(this.mHero);
    this.mBarrageSet.push(b);

    angle = -Math.PI / 1.5;
    b = new Barrage(this.kBullet, vec2.fromValues(120, 50), 0.8, this.currentBarrageType, 25, angle);
    b.setTarget(this.mHero);
    this.mBarrageSet.push(b);

    angle = -Math.PI / 1.8;
    b = new Barrage(this.kBullet, vec2.fromValues(120, 80), 0.8, this.currentBarrageType, 25, angle);
    b.setTarget(this.mHero);
    this.mBarrageSet.push(b);


};
HiddenLevel.prototype.pattern6 = function () {
    var angle = 0;
    this.currentBarrageType = BARRAGE_TYPE.CIRCLE;
    this.mBoss = this.mNPCs[0];
    var b = new Barrage(this.kBullet, vec2.fromValues(10, 10), 0.8, this.currentBarrageType, 25, angle);
    b.setTarget(this.mHero);
    this.mBarrageSet.push(b);
    b = new Barrage(this.kBullet, vec2.fromValues(10, 80), 0.8, this.currentBarrageType, 25, angle);
    b.setTarget(this.mHero);
    this.mBarrageSet.push(b);

    angle = -Math.PI / 2;
    b = new Barrage(this.kBullet, vec2.fromValues(190, 10), 0.8, this.currentBarrageType, 25, angle);
    b.setTarget(this.mHero);
    this.mBarrageSet.push(b);
    b = new Barrage(this.kBullet, vec2.fromValues(190, 80), 0.8, this.currentBarrageType, 25, angle);
    b.setTarget(this.mHero);
    this.mBarrageSet.push(b);


};