/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2 ,SpriteAnimateRenderable: false, GameObjectSet:false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var count_c = 0;

function Cike(spriteTexture, atX, atY) {
    this.kDelta = 0.5;

    this.mcike = new SpriteAnimateRenderable(spriteTexture);
    this.mcike.setColor([1, 1, 1, 0]);
    this.mcike.getXform().setPosition(atX, atY);
    this.mcike.getXform().setSize(18, 9);
    this.mcike.setElementPixelPositions(806, 846, 433, 463);

    GameObject.call(this, this.mcike);

    // Projectiles that the hero can shoot
    this.mProjectiles = new ProjectileSet();
    this.mWeaType = null;
    // Weapon info in default
    this.mWeaSpeed = 5;
    this.mWeaPower = 1;

    // Hero`s info in default
    this.mHP = 10;
    this.mSpeed = 0.3;
    this.near = -10;
    this.mDead = -1;

}

gEngine.Core.inheritPrototype(Cike, GameObject);

Cike.prototype.setWeaponType = function (WeaType, WeaSpeed, WeaPower, WeaDir) {
    this.mWeaType = WeaType;
    this.mWeaSpeed = WeaSpeed;
    this.mWeaPower = WeaPower;
    this.mWeaDir = WeaDir;
};

Cike.prototype.setHeroInfo = function (HP, Speed) {
    this.mHP = HP;
    this.mSpeed = Speed;
};

Cike.prototype.getProjecttle = function () {
    return this.mProjectiles;
};
//---------------------------------------------------------------
Cike.prototype.getHP = function () {
    return this.mHP;
};

Cike.prototype.decHP = function (t) {
    this.mHP -= t;
};
///-----------------------------------
Cike.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mProjectiles.draw(aCamera);
};


Cike.prototype.update = function (hero, timer, stateTime, Audio) {
    var xf = this.getXform();
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
    if(this.getXform().getXPos()<0)
        this.getXform().setXPos(150);
};

Cike.prototype.Shoot = function (hero) {
    count_c++;
    if ((count_c % 100 === 1 || count_c % 100 === 5 || count_c % 100 === 10 || count_c % 100 === 15 || count_c % 100 === 20) && this.mHP > 0) {
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
};

Cike.prototype.Move = function (xf) {


    if (xf.getXPos() >= this.near) {
        xf.incXPosBy(-this.kDelta * this.mSpeed);
    }
};
Cike.prototype.isDead = function () {
    if(this.mHP <= 0){
        if(this.mDead === -1){
            this.mDead = 1;
        }
        return true;
    }else{
        return false;
    }
};