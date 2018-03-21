/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2 ,SpriteAnimateRenderable: false, GameObjectSet:false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var count_l = 0;

function Dragon(spriteTexture, atX, atY) {
    this.kDelta = 0.5;

    this.mDragon = new SpriteRenderable(spriteTexture);
    this.mDragon.setColor([1, 1, 1, 0]);
    this.mDragon.getXform().setPosition(atX, atY);
    this.mDragon.getXform().setSize(25, 25);
    this.mDragon.setElementPixelPositions(762, 988, 92, 320);

    GameObject.call(this, this.mDragon);

    // Projectiles that the hero can shoot
    this.mProjectiles = new ProjectileSet();
    this.mWeaType = 5;
    // Weapon info in default
    this.mWeaSpeed = 5;
    this.mWeaPower = 1;

    // Hero`s info in default
    this.mHP = 10;
    this.mSpeed = 1;

    this.lower = 25;
    this.upper = 60;
    this.mDead = -1;

}

gEngine.Core.inheritPrototype(Dragon, GameObject);

Dragon.prototype.setWeaponType = function (WeaType, WeaSpeed, WeaPower, WeaDir) {
    this.mWeaType = WeaType;
    this.mWeaSpeed = WeaSpeed;
    this.mWeaPower = WeaPower;
    this.mWeaDir = WeaDir;
};

Dragon.prototype.setHeroInfo = function (HP, Speed) {
    this.mHP = HP;
    this.mSpeed = Speed;
};

Dragon.prototype.getProjecttle = function () {
    return this.mProjectiles;
};
//---------------------------------------------------------------
Dragon.prototype.getHP = function () {
    return this.mHP;
};

Dragon.prototype.decHP = function (t) {
    this.mHP -= t;
};
///-----------------------------------
Dragon.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mProjectiles.draw(aCamera);
};


Dragon.prototype.update = function (hero, isHuangshangDied, Audio) {
    var xf = this.getXform();
    if (!isHuangshangDied) {
        xf.setPosition(200, 25);
    } else {
        this.setVisibility(true);
        this.Move(xf);
        this.Shoot(hero);
    }
    if (xf.getXPos() > 157 && xf.getXPos() < 170) {
        gEngine.AudioClips.playACue(Audio);
    }

};

Dragon.prototype.Shoot = function (hero) {
    count_l++;
    if ((count_l % 100 === 1 || count_l % 100 === 5 || count_l % 100 === 10 || count_l % 100 === 15 || count_l % 100 === 20 || count_l % 100 === 25 || count_l % 100 === 30 || count_l % 100 === 35 || count_l % 100 === 40 || count_l % 100 === 45) && this.mHP > 0) {
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
            hero.decHP(this.mWeaPower);

            this.mProjectiles.removeFromSet(obj);
        } else
            GameObject.prototype.update.call(obj);
        if (obj.getXform().getXPos() < 0 ||this.mHP<=0)
            this.mProjectiles.removeFromSet(obj);
    }
};
Dragon.prototype.Move = function (xf) {
    if (xf.getXPos() > 140) {
        xf.incXPosBy(-this.kDelta);
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
Dragon.prototype.isDead = function () {
    if(this.mHP <= 0){
        if(this.mDead === -1){
            this.mDead = 1;
        }
        return true;
    }else{
        return false;
    }
};