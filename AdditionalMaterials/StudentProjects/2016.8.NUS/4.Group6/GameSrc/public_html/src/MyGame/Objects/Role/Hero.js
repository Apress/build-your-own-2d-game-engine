/* File: Hero.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2, SpriteAnimateRenderable: false, */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Hero(spriteTexture, atX, atY) {
    this.kDelta = 2;

    this.mDye = new SpriteAnimateRenderable(spriteTexture);
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(atX, atY);
    //this.mDye.getXform().setZPos(5);
    this.mDye.getXform().setSize(9, 18);
    // this.mDye.setElementPixelPositions(48, 94, 392, 492);
    this.mDye.setSpriteSequence(512, 0, // first element pixel position: top-left 512 is top of image, 0 is left of image
            48, 102, // widthxheight in pixels
            3, // number of elements in this sequence
            0);         // horizontal padding in between
    this.mDye.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mDye.setAnimationSpeed(5);
    GameObject.call(this, this.mDye);


    // Cover line segment in x-seconds
    this.mCoverInSeconds = 2;
    this.mHit = 0;
    this.mNumDestroy = 0;

    // Projectiles that the hero can shoot
    this.mProjectiles = new ProjectileSet();
    this.mWeaType = null;
    // Weapon info in default
    this.mWeaSpeed = 5;
    this.mWeaPower = 1;

    // Hero`s info in default
    this.mHP = 10;
    this.mSpeed = 1;
    this.delta = 1;
    this.skill = 0;//大招
    this.skillNum=1;
}
gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.prototype.setWeaponType = function (WeaType, WeaSpeed, WeaPower, WeaDir) {
    this.mWeaType = WeaType;
    this.mWeaSpeed = WeaSpeed;
    this.mWeaPower = WeaPower;
    this.mWeaDir = WeaDir;
};

Hero.prototype.setHeroInfo = function (HP, Speed) {
    this.mHP = HP;
    this.mSpeed = Speed;
};

//加------------------------------------------
Hero.prototype.getHP = function () {
    return this.mHP;
};
Hero.prototype.decHP = function (t) {
    this.mHP -= t;
};

Hero.prototype.getPower = function () {
    return this.mWeaPower;
};

Hero.prototype.update = function (Enemy, aCamera) {//////////////////////修改updata
    this._moveByKeys(); // for now
    var num = 0;
    if ((this.skill--) === 1&&this.skillNum===1) {
        for (num = 0; num < Enemy.length; num++) {
            if ((Enemy[num].getXform().getXPos() < 160) && (Enemy[num].getHP() > 0)) {
            
                Enemy[num].decHP(20);
            }
        }
        this.skill=0;
        this.skillNum=0;
    }
    if(this.skill < 0){
        this.skill = 0;
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        this.mProjectiles.newAt(this.mWeaType, this.getXform().getPosition(), this.mWeaSpeed, this.mWeaPower, this.mWeaDir);
    }

    // update Projectile
    var i, obj, j;
    for (j = 0; j < Enemy.length; j++) {
        var eneBox = Enemy[j].getBBox();
        for (i = 0; i < this.mProjectiles.size(); i++) {
            obj = this.mProjectiles.getObjectAt(i);
            var proBox = obj.getBBox();
            if (!eneBox.intersectsBound(proBox)) {  // stop the brain when it touches hero bound

                GameObject.prototype.update.call(obj);  // the default GameObject: only move forward
            } else if (eneBox.intersectsBound(proBox) && Enemy[j].getHP() > 0) {
                Enemy[j].decHP(this.mWeaPower);
                this.mProjectiles.removeFromSet(obj);
            } else {
                GameObject.prototype.update.call(obj);
            }
            if (aCamera.collideWCBound(obj.getXform(), 1.0) !==
                    BoundingBox.eboundCollideStatus.eInside) {
                this.mProjectiles.removeFromSet(obj);

            }
            //}
        }
    }
    this.mDye.updateAnimation();
};


Hero.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mProjectiles.draw(aCamera);
};


Hero.prototype.hitOnce = function () {
    this.mHit++;
};

Hero.prototype.getStatus = function () {
    return  "Hero Hit: " + this.mHit +
            "  Num Destroy: " + this.mNumDestroy +
            "  Projectile: " + this.mProjectiles.size();
};

Hero.prototype._moveByKeys = function () {
    //GameObject.prototype.update.call(this);
    if (this.mWeaDir === 1) {
        var xf = this.getXform();
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left))
            xf.incXPosBy(-this.kDelta * 0.3 * this.mSpeed);
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right))
            xf.incXPosBy(this.kDelta * 0.3 * this.mSpeed);
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)) {
            xf.incYPosBy(0.5 * 2 * this.kDelta);
        }
        
        if (xf.getYPos() > 25) {
            xf.incYPosBy(-0.6 * this.kDelta);
        }
        if (xf.getYPos() > 70) {
            xf.setYPos(70);
        }
        if (xf.getXPos() < 10) {
            xf.setXPos(10);
        }
        if (xf.getXPos() > 120) {
            xf.setXPos(120);
        }
    }
};

