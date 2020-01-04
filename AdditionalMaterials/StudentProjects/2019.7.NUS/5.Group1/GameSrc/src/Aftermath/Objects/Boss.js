/* File: Boss.js
 *
 * Creates and initializes the Boss (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Boss(spriteTexture, bullet) {
    this.kDelta = 0.3;
    this.kYDelta = 130;
    this.kYMDelta = 180;

    this.width = 10;
    this.height = 10;
    this.kRwidth = 6;
    this.kRheight = 8;

    this.mBarrageSet = [];
    this.target = null;

    this.mBoss = new SpriteAnimateRenderable(spriteTexture);
    this.mBoss.setColor([1, 1, 1, 0]);
    this.mBoss.getXform().setPosition(150, 45);
    this.mBoss.getXform().setSize(this.width, this.height);
    // this.mBoss.setElementPixelPositions(0, 120, 0, 180);
    this.mBoss.setElementPixelPositions(0, 64, 0, 64);

    // this.mBoss.setSpriteSequence(512, 0,     // first element pixel position: top-left 512 is top of image, 0 is left of image
    //     566, 512,   // widthxheight in pixels
    //     3,          // number of elements in this sequence
    //     0);         // horizontal padding in between
    // this.mBoss.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    // this.mBoss.setAnimationSpeed(15);

    // this.mRDye = new SpriteAnimateRenderable(spriteTexture);
    // this.mRDye.setColor([1, 1, 1, 0]);
    // this.mRDye.getXform().setPosition(35, 50);
    // this.mRDye.getXform().setSize(this.width, this.height);
    // // this.mBoss.setElementPixelPositions(0, 120, 0, 180);
    // // this.mRDye.setElementPixelPositions(120, 0, 0, 180);
    // this.mRDye.setSpriteSequence(1024, 0,     // first element pixel position: top-left 512 is top of image, 0 is left of image
    //     566, 512,   // widthxheight in pixels
    //     3,          // number of elements in this sequence
    //     0);         // horizontal padding in between
    // this.mRDye.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    // this.mRDye.setAnimationSpeed(15);
    //
    //
    // this.mRDye.mXform = this.mBoss.getXform();
    // this.mRDye.mColor = this.mBoss.getColor();

    // this.mPackSet = new GameObjectSet();
    this.kMinionSprite = spriteTexture;
    this.kBullet = bullet;

    this.kLastFireTime = 0;
    //Rate in per second
    this.kfireRate = 5;

    this.health = 1;
    this.death = false;

    GameObject.call(this, this.mBoss);

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

var BOSS_BEHAVIOR = {
    GO_AROUND: 0,
    STAY_MM: 1,
    STAY_TM: 2,
    STAY_BM: 3,
    WALK: 4,
};


gEngine.Core.inheritPrototype(Boss, GameObject);

Boss.prototype.setTarget = function (target) {
    this.target = target;
};

Boss.prototype.draw = function (aCamera) {
    // this.mPackSet.draw(aCamera);
    GameObject.prototype.draw.call(this, aCamera);  // the default GameObject: only move forward

    for (let i = 0; i < this.mBarrageSet.length; i++) {
        this.mBarrageSet[i].draw(aCamera);
    }

};

Boss.prototype.decreaseHealth = function () {
    // this.mBoss.setColor([1, 0, 0, 0.5]);
    // this.mBoss.getColor()[1] = [1];
    // this.mBoss.getColor()[3] = [0.5];
    this.health -= 1;
    if (this.health <= 0) {
        this.death = true;
    }
//    TODO decrease

//    TODO Boss get red

};
Boss.prototype.isInvincible = function () {
    return this.invincible;
};

Boss.prototype.update = function (aCamera) {
    GameObject.prototype.update.call(this);
    // control by WASD

    // for (let i = 0; i < this.mBarrageSet.length; i++) {
    //     this.mBarrageSet[i].update(aCamera, aHero);
    //     // FIXME debug thing
    // }

    if (this.reach) {
        this.stay -= 1;

        if (this.stay % 60 === 0) {
            if (Math.random() < 0.2) {
                this.currentBarrageType = BARRAGE_TYPE.CIRCLE;
            }
            this.currentBarrageType = Math.floor(Math.random() * 4) + 1;
        }

        if (this.stay <= 200) {
            if (this.currentBarrageType === BARRAGE_TYPE.LINE) {
                if (this.stay % 5 === 0) {
                    var bossPos = this.mBoss.getXform().getPosition();
                    var heroPos = this.target.getXform().getPosition();
                    this.mBarrageSet.push(new Barrage(this.kBullet, this.mBoss.getXform().getPosition(), 0.8, BARRAGE_TYPE.LINE, 30, Math.atan2((heroPos[1] - bossPos[1]), (heroPos[0] - bossPos[0]))));

                }
            } else {

                if (this.stay % 20 === 0) {
                    this.mBarrageSet.push(new Barrage(this.kBullet, this.mBoss.getXform().getPosition(), 0.8, this.currentBarrageType, 26, Math.random() * Math.PI / 2));
                }
            }
        }

        if (this.stay <= 0) {
            this.reach = false;
            this.setSpeed(1.3);

        }
    } else {
        if (Date.now() % 20 === 0) {
            this.mBarrageSet.push(new Barrage(this.kBullet, this.mBoss.getXform().getPosition(), 0.8, this.currentBarrageType, 25, Math.random() * Math.PI / 2));

        }
    }

    if (vec2.distance(this.nextPos, this.getXform().getPosition()) < 4) {
        this.reach = true;
        this.stay = 120;
        var x = (Math.floor(Math.random() * 3)) * 60 + 40;
        var y = (Math.floor(Math.random() * 3)) * 40 + 10;

        this.nextPos = vec2.fromValues(x, y);
        this.setSpeed(0);
    }
    this.rotateObjPointTo(this.nextPos, .5);

    for (let i = 0; i < this.mBarrageSet.length; i++) {
        this.mBarrageSet[i].setTarget(this.target);
        this.mBarrageSet[i].update(aCamera);

    }

    // if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
    //     this.mBarrageSet.push(new Barrage(this.kBullet, this.mBoss.getXform().getPosition(), 0.8, BARRAGE_TYPE.CIRCLE, 25,  Math.random()*Math.PI/2));
    //     this.mBarrageSet.push(new Barrage(this.kBullet, this.mBoss.getXform().getPosition(), 0.8, BARRAGE_TYPE.CROSS, 30, Math.random()*Math.PI/2));
    //
    //     this.mBarrageSet.push(new Barrage(this.kBullet, this.mBoss.getXform().getPosition(), 0.8, BARRAGE_TYPE.D_SECTOR, 10, Math.random() > 0.5 ? 0 : Math.PI / 2));
    //
    //     var bossPos = this.mBoss.getXform().getPosition();
    //     var heroPos = aHero.getXform().getPosition();
    //     this.mBarrageSet.push(new Barrage(this.kBullet, this.mBoss.getXform().getPosition(), 0.8, BARRAGE_TYPE.LINE, 30, Math.atan2((heroPos[1] - bossPos[1]), (heroPos[0] - bossPos[0]))));
    // }

    // var v = this.getRigidBody().getVelocity();
    // if (reset === true) {
    //     this.jump = true;
    // }
    //
    // if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)) {
    //     if (this.jump === true) {
    //
    //         // v[1] += this.kYDelta;
    //         v[1] = Math.min(this.kYDelta + v[1], 1.1 * this.kYDelta);
    //         this.jump = false;
    //     }
    //
    //     // this.setSpeed(1);
    //
    // }
    //
    // if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Down)) {
    //     v[1] -= this.kYMDelta;
    // }
    // if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
    //     // v[0] -= this.kXDelta;
    //     this.mBoss.getXform().getPosition()[0] -= 1;
    //     // this.mRDye.getXform().getPosition()[0] -= 1;
    //
    //     // this.mRenderComponent = this.mRDye;
    // }
    // if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
    //     // v[0] += this.kXDelta;
    //     this.mBoss.getXform().getPosition()[0] += 1;
    //     // this.mRDye.getXform().getPosition()[0] += 1;
    //     // this.mRenderComponent = this.mBoss;
    // }

    // this.mRenderComponent.updateAnimation();
    //
    // if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
    //     this.mBoss.getXform().getPosition()[0] -= 1;
    //     this.mRDye.getXform().getPosition()[0] -= 1;
    //     this.mRenderComponent = this.mRDye;
    //
    //
    // }
    // if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
    //     this.mBoss.getXform().getPosition()[0] += 1;
    //     this.mRDye.getXform().getPosition()[0] += 1;
    //     this.mRenderComponent = this.mBoss;
    //
    // }
    // if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)) {
    //     this.mBoss.getXform().getPosition()[1] += 1;
    //     this.mRDye.getXform().getPosition()[1] += 1;
    //
    // }
    // if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
    //     this.mBoss.getXform().getPosition()[1] -= 1;
    //     this.mRDye.getXform().getPosition()[1] -= 1;
    //
    // }

    // control by WASD

    // // // TODO hitbox with Trap
    // if (this.getBBox().intersectsBound(trap.getBBox())) {
    //     this.decreaseHealth();
    // }
    //
    //
    // // // TODO hitbox with SavePoint
    // if (this.getBBox().intersectsBound(savePoint.getBBox())) {
    //     savePoint.save();
    // }

};