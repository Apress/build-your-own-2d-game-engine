/* File: Cat.js
 *
 * Creates and initializes the Cat (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Cat(spriteTexture, bullet, position) {
    this.kDelta = 0.3;
    this.kYDelta = 130;
    this.kYMDelta = 180;

    this.width = 10;
    this.height = 10;
    this.kRwidth = 6;
    this.kRheight = 8;

    this.mBarrageSet = [];
    this.target = null;

    this.mCat = new SpriteAnimateRenderable(spriteTexture);
    this.mCat.setColor([1, 1, 1, 0]);
    if (position !== undefined) {
        this.mCat.getXform().setPosition(position[0], position[1]);

    } else {

        this.mCat.getXform().setPosition(150, 45);
    }
    this.mCat.getXform().setSize(this.width, this.height);
    // this.mCat.setElementPixelPositions(0, 120, 0, 180);
    this.mCat.setElementPixelPositions(0, 256, 768, 1024);

    // this.mCat.setSpriteSequence(512, 0,     // first element pixel position: top-left 512 is top of image, 0 is left of image
    //     566, 512,   // widthxheight in pixels
    //     3,          // number of elements in this sequence
    //     0);         // horizontal padding in between
    // this.mCat.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    // this.mCat.setAnimationSpeed(15);

    // this.mRDye = new SpriteAnimateRenderable(spriteTexture);
    // this.mRDye.setColor([1, 1, 1, 0]);
    // this.mRDye.getXform().setPosition(35, 50);
    // this.mRDye.getXform().setSize(this.width, this.height);
    // // this.mCat.setElementPixelPositions(0, 120, 0, 180);
    // // this.mRDye.setElementPixelPositions(120, 0, 0, 180);
    // this.mRDye.setSpriteSequence(1024, 0,     // first element pixel position: top-left 512 is top of image, 0 is left of image
    //     566, 512,   // widthxheight in pixels
    //     3,          // number of elements in this sequence
    //     0);         // horizontal padding in between
    // this.mRDye.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    // this.mRDye.setAnimationSpeed(15);
    //
    //
    // this.mRDye.mXform = this.mCat.getXform();
    // this.mRDye.mColor = this.mCat.getColor();

    // this.mPackSet = new GameObjectSet();
    this.kMinionSprite = spriteTexture;
    this.kBullet = bullet;

    this.kLastFireTime = 0;
    //Rate in per second
    this.kfireRate = 5;

    this.health = 5;
    this.death = false;

    GameObject.call(this, this.mCat);

    // var r = new RigidRectangle(this.getXform(), this.kRwidth, this.kRheight);
    // // r.setMass(.18);  // less dense than Minions
    // // r.setMass(0.16);  // less dense than Minions
    // r.setMass(0);  // less dense than Minions
    // r.setRestitution(0);
    // // r.toggleDrawBound();
    // this.toggleDrawRigidShape();
    // // r.setColor([0, 1, 0, 1]);
    // // r.setDrawBounds(true);
    // this.setRigidBody(r);

    this.setCurrentFrontDir(vec2.fromValues(0, 1));
    this.setSpeed(0);

    this.jump = false;
    this.invincible = false;

    this.reach = true;
    this.stay = 0;
    this.nextPos = this.getXform().getPosition();

    this.currentBarrageType = BARRAGE_TYPE.CIRCLE;

}

var Cat_BEHAVIOR = {
    GO_AROUND: 0,
    STAY_MM: 1,
    STAY_TM: 2,
    STAY_BM: 3,
    WALK: 4,
};


gEngine.Core.inheritPrototype(Cat, GameObject);

Cat.prototype.setTarget = function (target) {
    this.target = target;
};

Cat.prototype.draw = function (aCamera) {
    // this.mPackSet.draw(aCamera);
    GameObject.prototype.draw.call(this, aCamera);  // the default GameObject: only move forward

    for (let i = 0; i < this.mBarrageSet.length; i++) {
        this.mBarrageSet[i].draw(aCamera);
    }

};

Cat.prototype.decreaseHealth = function () {
    // this.mCat.setColor([1, 0, 0, 0.5]);
    // this.mCat.getColor()[1] = [1];
    // this.mCat.getColor()[3] = [0.5];
    this.health -= 1;
    if (this.health <= 0) {
        this.death = true;
    }
//    TODO decrease

//    TODO Cat get red

};
Cat.prototype.isInvincible = function () {
    return this.invincible;
};

Cat.prototype.update = function (aCamera) {
    GameObject.prototype.update.call(this);
    // control by WASD

    // for (let i = 0; i < this.mBarrageSet.length; i++) {
    //     this.mBarrageSet[i].update(aCamera, aHero);
    //     // FIXME debug thing
    // }

    // if (this.reach) {
    //     this.stay -= 1;
    //
    //     if (this.stay % 60 === 0) {
    //         if (Math.random() < 0.2) {
    //             this.currentBarrageType = BARRAGE_TYPE.CIRCLE;
    //         }
    //         this.currentBarrageType = Math.floor(Math.random() * 4) + 1;
    //     }
    //
    //     if (this.stay <= 200) {
    //         if (this.currentBarrageType === BARRAGE_TYPE.LINE) {
    //             if (this.stay % 5 === 0) {
    //                 var CatPos = this.mCat.getXform().getPosition();
    //                 var heroPos = this.target.getXform().getPosition();
    //                 this.mBarrageSet.push(new Barrage(this.kBullet, this.mCat.getXform().getPosition(), 0.8, BARRAGE_TYPE.LINE, 30, Math.atan2((heroPos[1] - CatPos[1]), (heroPos[0] - CatPos[0]))));
    //
    //             }
    //         } else {
    //
    //             if (this.stay % 20 === 0) {
    //                 this.mBarrageSet.push(new Barrage(this.kBullet, this.mCat.getXform().getPosition(), 0.8, this.currentBarrageType, 26, Math.random() * Math.PI / 2));
    //             }
    //         }
    //     }
    //
    //     if (this.stay <= 0) {
    //         this.reach = false;
    //         this.setSpeed(1.3);
    //
    //     }
    // } else {
    if ( Date.now()-this.kLastFireTime > 1500){
        this.currentBarrageType = Math.floor(Math.random() * 5);

        this.mBarrageSet.push(new Barrage(this.kBullet, this.mCat.getXform().getPosition(), 0.8, this.currentBarrageType, 25, Math.random() * Math.PI / 2));
        this.kLastFireTime = Date.now();

    }
    // }
    //
    // if (vec2.distance(this.nextPos, this.getXform().getPosition()) < 4) {
    //     this.reach = true;
    //     this.stay = 120;
    //     var x = (Math.floor(Math.random() * 3)) * 60 + 40;
    //     var y = (Math.floor(Math.random() * 3)) * 40 + 10;
    //
    //     this.nextPos = vec2.fromValues(x, y);
    //     this.setSpeed(0);
    // }
    // this.rotateObjPointTo(this.nextPos, .5);

    for (let i = 0; i < this.mBarrageSet.length; i++) {
        this.mBarrageSet[i].setTarget(this.target);
        this.mBarrageSet[i].update(aCamera);

    }


};