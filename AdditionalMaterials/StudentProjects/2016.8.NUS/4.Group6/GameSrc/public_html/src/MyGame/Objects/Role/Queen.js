/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, SpriteAnimateRenderable,vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var count_q = 0;
function Queen(spriteTexture, atX, atY) {
    this.kDelta = 0.5;

    this.mQueen = new SpriteAnimateRenderable(spriteTexture);
    this.mQueen.setColor([1, 1, 1, 0]);
    this.mQueen.getXform().setPosition(atX, atY);
    this.mQueen.getXform().setSize(9, 18);
    this.mQueen.setSpriteSequence(512, 463, // first element pixel position: top-left 512 is top of image, 0 is left of image
            41, 102, // widthxheight in pixels
            3, // number of elements in this sequence
            0);         // horizontal padding in between
    this.mQueen.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mQueen.setAnimationSpeed(5);
    GameObject.call(this, this.mQueen);

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

gEngine.Core.inheritPrototype(Queen, GameObject);

Queen.prototype.setWeaponType = function (WeaType, WeaSpeed, WeaPower, WeaDir) {
    this.mWeaType = WeaType;
    this.mWeaSpeed = WeaSpeed;
    this.mWeaPower = WeaPower;
    this.mWeaDir = WeaDir;
};

Queen.prototype.setHeroInfo = function (HP, Speed) {
    this.mHP = HP;
    this.mSpeed = Speed;
};
Queen.prototype.getProjecttle = function () {
    return this.mProjectiles;
};
//---------------------------------------------------------------
Queen.prototype.getHP = function () {
    return this.mHP;
};

Queen.prototype.decHP = function (t) {
    this.mHP -= t;
};

Queen.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mProjectiles.draw(aCamera);
};

Queen.prototype.update = function (hero, timer, stateTime, Audio) {
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
    this.mQueen.updateAnimation();
};

Queen.prototype.Shoot = function (hero) {
    count_q++;
    if ((count_q % 100 === 1 || count_q % 100 === 10|| count_q % 100 === 30|| count_q % 100 === 50|| count_q % 100 === 10) && this.mHP > 0) {
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
        if (obj.getXform().getXPos() < 0||this.mHP<=0 )
            this.mProjectiles.removeFromSet(obj);
    }
};
Queen.prototype.isDead = function () {
    if(this.mHP <= 0){
        if(this.mDead === -1){
            this.mDead = 1;
        }
        return true;
    }else{
        return false;
    }
};