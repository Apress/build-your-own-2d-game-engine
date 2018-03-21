/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2 ,SpriteAnimateRenderable: false, GameObjectSet:false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var count_h = 0;
function HuangShang(spriteTexture, atX, atY) {
    this.kDelta = 0.5;

    this.mHuangshang = new SpriteRenderable(spriteTexture);
    this.mHuangshang.setColor([1, 1, 1, 0]);
    this.mHuangshang.getXform().setPosition(atX, atY);
    this.mHuangshang.getXform().setSize(9, 18);
    this.mHuangshang.setElementPixelPositions(756, 796, 413, 512);

    GameObject.call(this, this.mHuangshang);

    // Projectiles that the hero can shoot
    this.mProjectiles = new ProjectileSet();
    this.mWeaType = null;
    // Weapon info in default
    this.mWeaSpeed = 5;
    this.mWeaPower = 1;

    // Hero`s info in default
    this.mHP = 10;
    this.mSpeed = 1;
    this.mDead = -1;


}

gEngine.Core.inheritPrototype(HuangShang, GameObject);

HuangShang.prototype.setWeaponType = function (WeaType, WeaSpeed, WeaPower, WeaDir) {
    this.mWeaType = WeaType;
    this.mWeaSpeed = WeaSpeed;
    this.mWeaPower = WeaPower;
    this.mWeaDir = WeaDir;
};

HuangShang.prototype.setHeroInfo = function (HP, Speed) {
    this.mHP = HP;
    this.mSpeed = Speed;
};

HuangShang.prototype.getProjecttle = function () {
    return this.mProjectiles;
};
//---------------------------------------------------------------
HuangShang.prototype.getHP = function () {
    return this.mHP;
};

HuangShang.prototype.decHP = function (t) {
    this.mHP -= t;
};
///-----------------------------------
HuangShang.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mProjectiles.draw(aCamera);
};

HuangShang.prototype.update = function (hero, timer, stateTime, Audio) {
    var xf = this.getXform();
    var mStateTime = stateTime;
    var mTimer = timer;
    if (mTimer === mStateTime)
        gEngine.AudioClips.playBackgroundAudio(Audio);
    if (mTimer > mStateTime) {
        if (xf.getXPos() > 150) {
            xf.incXPosBy(-this.kDelta);
        } else {
            this.Shoot(hero);
        }
    }

};
HuangShang.prototype.Shoot = function (hero) {
    var heroBox = hero.getBBox();
    count_h++;
    if ((count_h % 100 === 1 || count_h % 100 === 10) && this.mHP > 0) {
        this.mProjectiles.newAt(this.mWeaType, this.getXform().getPosition(), this.mWeaSpeed, this.mWeaPower, this.mWeaDir);
    }
    var i, obj;

    for (i = 0; i < this.mProjectiles.size(); i++) {
        obj = this.mProjectiles.getObjectAt(i);
        var proBBox = obj.getBBox();
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
        if (obj.getXform().getXPos() < 0||this.mHP<=0 )
            this.mProjectiles.removeFromSet(obj);
    }
};

HuangShang.prototype.isDead = function () {
    if(this.mHP <= 0){
        if(this.mDead === -1){
            this.mDead = 1;
        }
        return true;
    }else{
        return false;
    }
};