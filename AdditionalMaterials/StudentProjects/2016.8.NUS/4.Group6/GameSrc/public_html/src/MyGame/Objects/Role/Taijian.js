/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2 ,SpriteAnimateRenderable: false, GameObjectSet:false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var count = 0;

function Taijian(spriteTexture, atX, atY) {
    this.kDelta = 0.5;

    this.mTiajian = new SpriteAnimateRenderable(spriteTexture);
    this.mTiajian.setColor([1, 1, 1, 0]);
    this.mTiajian.getXform().setPosition(atX, atY);
    this.mTiajian.getXform().setSize(9, 18);
    //this.mTiajian.setElementPixelPositions(577, 617, 398, 494);
    this.mTiajian.setSpriteSequence(512, 608, // first element pixel position: top-left 512 is top of image, 0 is left of image
            39, 101, // widthxheight in pixels
            3, // number of elements in this sequence
            0);         // horizontal padding in between
    this.mTiajian.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mTiajian.setAnimationSpeed(5);
    GameObject.call(this, this.mTiajian);

    // Projectiles that the hero can shoot
    this.mProjectiles = new ProjectileSet();
    this.mWeaType = null;
    // Weapon info in default
    this.mWeaSpeed = 5;
    this.mWeaPower = 1;

    // Hero`s info in default
    this.mHP = 10;
    this.mSpeed = 1;

    this.near = 80;
    this.far = 150;
    this.lower = 25;
    this.upper = 60;
    this.mDead = -1;

}

gEngine.Core.inheritPrototype(Taijian, GameObject);

Taijian.prototype.setWeaponType = function (WeaType, WeaSpeed, WeaPower, WeaDir) {
    this.mWeaType = WeaType;
    this.mWeaSpeed = WeaSpeed;
    this.mWeaPower = WeaPower;
    this.mWeaDir = WeaDir;
};

Taijian.prototype.setHeroInfo = function (HP, Speed) {
    this.mHP = HP;
    this.mSpeed = Speed;
};

Taijian.prototype.getProjecttle = function () {
    return this.mProjectiles;
};
//---------------------------------------------------------------
Taijian.prototype.getHP = function () {
    return this.mHP;
};

Taijian.prototype.decHP = function (t) {
    this.mHP -= t;
};
///-----------------------------------
Taijian.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mProjectiles.draw(aCamera);
};


Taijian.prototype.update = function (hero, timer, stateTime, Audio) {
    var xf = this.getXform();
    var mStateTime = stateTime;
    var mTimer = timer;
    if (mTimer > mStateTime) {
        if (xf.getXPos() > 150) {
            xf.incXPosBy(-this.kDelta);
        } else {
            this.Shoot(hero);
            this.Move(xf);
        }
    }
    this.mTiajian.updateAnimation();
}
;

Taijian.prototype.Shoot = function (hero) {
    count++;
    if ((count % 100 === 1 || count % 100 === 10) && this.mHP > 0) {
        this.mProjectiles.newAt(this.mWeaType, this.getXform().getPosition(), this.mWeaSpeed, this.mWeaPower, this.mWeaDir);
    }
    var i, obj;
    var heroBox = hero.getBBox();
    for (i = 0; i < this.mProjectiles.size(); i++) {
        obj = this.mProjectiles.getObjectAt(i);
        var proBBox = obj.getBBox();
        if (!proBBox.intersectsBound(heroBox)) {
            GameObject.prototype.update.call(obj);
            if (obj.getXform().getXPos() > hero.getXform().getXPos()) {
                obj.rotateObjPointTo(hero.getXform().getPosition(), 0.02);
            }// the default GameObject: only move forward
        } else if (proBBox.intersectsBound(heroBox) && hero.getHP() > 0) {
            hero.decHP(this.mWeaPower);
            this.mProjectiles.removeFromSet(obj);
        } else
            GameObject.prototype.update.call(obj);
        if (obj.getXform().getXPos() < 0||this.mHP<=0)
            this.mProjectiles.removeFromSet(obj);
    }
}
;

Taijian.prototype.Move = function (xf) {
    if (xf.getXPos() >= this.near) {
        //console.log(xf.getXPos());
        xf.incXPosBy(-this.kDelta * this.mSpeed * Math.random());

    } else {
        //console.log(xf.getXPos());
        xf.incXPosBy(this.kDelta * this.mSpeed * Math.random());
        this.near = this.far;
    }
    if (xf.getXPos() >= this.far) {
        this.near = 80;
    }

    if (xf.getYPos() <= this.upper) {
        //console.log(xf.getYPos());
        xf.incYPosBy(2 * this.kDelta * Math.random());

    } else {
        //console.log(xf.getYPos());
        xf.incYPosBy(-2 * this.kDelta * Math.random());
        this.upper = this.lower;
    }
    if (xf.getYPos() <= this.lower) {
        this.upper = 60;
    }
};
Taijian.prototype.isDead = function () {
    if(this.mHP <= 0){
        if(this.mDead === -1){
            this.mDead = 1;
        }
        return true;
    }else{
        return false;
    }
};