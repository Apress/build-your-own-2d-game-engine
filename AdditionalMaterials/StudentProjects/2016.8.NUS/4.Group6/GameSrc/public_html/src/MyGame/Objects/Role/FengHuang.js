/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2 ,SpriteAnimateRenderable: false, GameObjectSet:false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var count_F = 0;

function FengHuang(spriteTexture, atX, atY) {
    this.kDelta = 0.5;

    this.mFengHuang = new SpriteRenderable(spriteTexture);
    this.mFengHuang.setColor([1, 1, 1, 0]);
    this.mFengHuang.getXform().setPosition(atX, atY);
    this.mFengHuang.getXform().setSize(20, 20);
    this.mFengHuang.setElementPixelPositions(418, 689, 62, 323);

    GameObject.call(this, this.mFengHuang);

    // Projectiles that the hero can shoot
    this.mProjectiles = new ProjectileSet();
    this.mWeaType = 5;
    // Weapon info in default
    this.mWeaSpeed = 5;
    this.mWeaPower = 1;

    // Hero`s info in default
    this.mHP = 10;
    this.mSpeed = 1;

    this.near = 10;
    this.far = 150;
    this.lower = 25;
    this.upper = 80;
    
    this.mDead = -1;

}

gEngine.Core.inheritPrototype(FengHuang, GameObject);

FengHuang.prototype.setWeaponType = function (WeaType, WeaSpeed, WeaPower, WeaDir) {
    this.mWeaType = WeaType;
    this.mWeaSpeed = WeaSpeed;
    this.mWeaPower = WeaPower;
    this.mWeaDir = WeaDir;
};

FengHuang.prototype.setHeroInfo = function (HP, Speed) {
    this.mHP = HP;
    this.mSpeed = Speed;
};

FengHuang.prototype.getProjecttle = function () {
    return this.mProjectiles;
};
//---------------------------------------------------------------
FengHuang.prototype.getHP = function () {
    return this.mHP;
};

FengHuang.prototype.decHP = function (t) {
    this.mHP -= t;
};
///-----------------------------------
FengHuang.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mProjectiles.draw(aCamera);
};


FengHuang.prototype.update = function (hero, isQueenDied, Audio) {
    var xf = this.getXform();
    if (!isQueenDied) {
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

FengHuang.prototype.Shoot = function (hero) {
    count_F++;
    if ((count_F % 100 === 1 || count_F % 100 === 5 || count_F % 100 === 10 || count_F % 100 === 15 || count_F % 100 === 20 || count_F % 100 === 25 || count_F % 100 === 30) && this.mHP > 0) {
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
        if (obj.getXform().getXPos() < 0||this.mHP<=0)
            this.mProjectiles.removeFromSet(obj);
    }
};

FengHuang.prototype.Move = function (xf) {
    if (xf.getXPos() >= this.near) {
        //console.log(xf.getXPos());
        xf.incXPosBy(-this.kDelta * this.mSpeed * Math.random());

    } else {
        //console.log(xf.getXPos());
        xf.incXPosBy(this.kDelta * this.mSpeed * Math.random());
        this.near = this.far;
    }
    if (xf.getXPos() >= this.far) {
        this.near = 10;
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
        this.upper = 80;
    }
};
FengHuang.prototype.isDead = function () {
    if(this.mHP <= 0){
        if(this.mDead === -1){
            this.mDead = 1;
        }
        return true;
    }else{
        return false;
    }
};