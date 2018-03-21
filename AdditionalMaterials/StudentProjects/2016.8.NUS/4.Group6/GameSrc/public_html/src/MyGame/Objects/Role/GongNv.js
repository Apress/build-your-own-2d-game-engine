/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2 ,SpriteAnimateRenderable*/
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var count = 0;

function GongNv(spriteTexture, atX, atY) {
    this.kDelta = 0.5;

    this.mGongNv = new SpriteAnimateRenderable(spriteTexture);
    this.mGongNv.setColor([1, 1, 1, 0]);
    this.mGongNv.getXform().setPosition(atX, atY);
    this.mGongNv.getXform().setSize(9, 18);
    //改加--------------------------------
    this.mGongNv.setSpriteSequence(512, 141, // first element pixel position: top-left 512 is top of image, 0 is left of image
            47, 102, // widthxheight in pixels
            3, // number of elements in this sequence
            0);         // horizontal padding in between
    this.mGongNv.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mGongNv.setAnimationSpeed(5);
    /////----------------------------------
    GameObject.call(this, this.mGongNv);

    // Projectiles that the hero can shoot
    this.mProjectiles = new ProjectileSet();
    this.mWeaType = null;
    // Weapon info in default
    this.mWeaSpeed = 5;
    this.mWeaPower = 1;

    // Hero`s info in default
    this.mHP = 10;
    this.mSpeed = 1;

    this.near = 40;
    this.far = 150;
    
    this.mDead = -1;
}

gEngine.Core.inheritPrototype(GongNv, GameObject);

GongNv.prototype.setWeaponType = function (WeaType, WeaSpeed, WeaPower, WeaDir) {
    this.mWeaType = WeaType;
    this.mWeaSpeed = WeaSpeed;
    this.mWeaPower = WeaPower;
    this.mWeaDir = WeaDir;
};


GongNv.prototype.setHeroInfo = function (HP, Speed) {
    this.mHP = HP;
    this.mSpeed = Speed;
};

GongNv.prototype.getProjecttle = function () {
    return this.mProjectiles;
};
//---------------------------------------------------------------
GongNv.prototype.getHP = function () {
    return this.mHP;
};
GongNv.prototype.decHP = function (t) {
    this.mHP -= t;
};

GongNv.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mProjectiles.draw(aCamera);
};

GongNv.prototype.update = function (hero, timer, stateTime, Audio) {//
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
    this.mGongNv.updateAnimation();
};

GongNv.prototype.Shoot = function (hero) {
    var heroBox = hero.getBBox();
    count++;
    if ((count % 100 === 1 || count % 100 === 10) && this.mHP > 0) {
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
        if (obj.getXform().getXPos() < 0 ||this.mHP<=0)
            this.mProjectiles.removeFromSet(obj);
    }
};

GongNv.prototype.Move = function (xf) {
    if (xf.getXPos() >= this.near) {
        //console.log(xf.getXPos());
        xf.incXPosBy(-this.kDelta * this.mSpeed * Math.random());

    } else {
        //console.log(xf.getXPos());
        xf.incXPosBy(this.kDelta * this.mSpeed * Math.random());
        this.near = this.far;
    }
    if (xf.getXPos() >= this.far) {
        this.near = 40;
    }
};
GongNv.prototype.isDead = function () {
    if(this.mHP <= 0){
        if(this.mDead === -1){
            this.mDead = 1;
        }
        return true;
    }else{
        return false;
    }
};