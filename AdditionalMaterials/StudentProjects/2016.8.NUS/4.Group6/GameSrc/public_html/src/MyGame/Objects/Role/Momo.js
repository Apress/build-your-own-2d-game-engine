/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable,SpriteAnimateRenderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var count_m = 0;
function Momo(spriteTexture, atX, atY) {
    this.kDelta = 0.5;

    this.mMomo = new SpriteAnimateRenderable(spriteTexture);
    this.mMomo.setColor([1, 1, 1, 0]);
    this.mMomo.getXform().setPosition(atX, atY);
    this.mMomo.getXform().setSize(9, 18);
    this.mMomo.setSpriteSequence(512, 296, // first element pixel position: top-left 512 is top of image, 0 is left of image
            48, 102, // widthxheight in pixels
            3, // number of elements in this sequence
            0);         // horizontal padding in between
    this.mMomo.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mMomo.setAnimationSpeed(5);
    GameObject.call(this, this.mMomo);

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
    this.upper = 40;
    
    this.mDead = -1;
}

gEngine.Core.inheritPrototype(Momo, GameObject);

Momo.prototype.setWeaponType = function (WeaType, WeaSpeed, WeaPower, WeaDir) {
    this.mWeaType = WeaType;
    this.mWeaSpeed = WeaSpeed;
    this.mWeaPower = WeaPower;
    this.mWeaDir = WeaDir;
};

Momo.prototype.setHeroInfo = function (HP, Speed) {
    this.mHP = HP;
    this.mSpeed = Speed;
};
Momo.prototype.getProjecttle = function () {
    return this.mProjectiles;
};
//---------------------------------------------------------------
Momo.prototype.getHP = function () {
    return this.mHP;
};

Momo.prototype.decHP = function (t) {
    this.mHP -= t;
};

Momo.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mProjectiles.draw(aCamera);
};

Momo.prototype.update = function (hero, timer, stateTime, Audio) {
    var xf = this.getXform();
    var mStateTime = stateTime;
    var mTimer = timer;
    if (mTimer === mStateTime && Audio !== null)
        gEngine.AudioClips.playBackgroundAudio(Audio);
    if (mTimer > mStateTime) {
        if (xf.getXPos() > 150) {
            xf.incXPosBy(-this.kDelta);
        } else {
            this.Shoot(hero);
            this.Move(xf);
        }
    }
    this.mMomo.updateAnimation();

};
Momo.prototype.Shoot = function (hero) {
    count_m++;
    if ((count_m % 100 === 1 || count_m % 100 === 10 || count_m % 100 === 20 || count_m % 100 === 30) && this.mHP > 0) {
        this.mProjectiles.newAt(this.mWeaType, this.getXform().getPosition(), this.mWeaSpeed, this.mWeaPower, this.mWeaDir);
    }
    var i, obj;
    var heroBox = hero.getBBox();
    for (i = 0; i < this.mProjectiles.size(); i++) {
        obj = this.mProjectiles.getObjectAt(i);
        var proBBox = obj.getBBox();
        // if (!proBBox.intersectsBound(heroBox) && obj.getXform().getXPos() > 20) {  // stop the brain when it touches hero bound
        if (!proBBox.intersectsBound(heroBox)) {
            GameObject.prototype.update.call(obj);
            if (obj.getXform().getXPos() > hero.getXform().getXPos()) {
                obj.rotateObjPointTo(hero.getXform().getPosition(), 0.02);
            }// the default GameObject: only move forward
        } else if (proBBox.intersectsBound(heroBox) && hero.getHP() > 0) {
            //加--------------------------------------------
            hero.decHP(this.mWeaPower);

            this.mProjectiles.removeFromSet(obj);
        } else
            GameObject.prototype.update.call(obj);
        if (obj.getXform().getXPos() < 0 ||this.mHP<=0)
            this.mProjectiles.removeFromSet(obj);
    }
};

Momo.prototype.Move = function (xf) {
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
        this.upper = 40;
    }
};
Momo.prototype.isDead = function () {
    if(this.mHP <= 0){
        if(this.mDead === -1){
            this.mDead = 1;
        }
        return true;
    }else{
        return false;
    }
};