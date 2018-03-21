/* File: Projectile.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, Renderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

Projectile.kSpeed = 100 / (0.8 * 60);
// across the entire screen in 0.5 seconds
Projectile.kTexture = null;
//                   子弹种类(string)，子弹位置（x,y）,速度，威力
function Projectile(proKind, x, y, speed, powerWeight, dir) {
    this.projectileKind = proKind;
    this.kRefWidth = 4;
    this.kRefHeight = 4;
    this.kSpeed = speed;//////////////子弹的速度
    this.kPower = powerWeight;////子弹的威力
    this.kDetectThreshold = 10;
    this.kChaseThreshold = 2 * this.kDetectThreshold;

    var r = new SpriteAnimateRenderable(Projectile.kTexture);
    r.setColor([0.8, 1, 0.8, 0.1]);
    r.getXform().setPosition(x, y);
    r.getXform().setSize(this.kRefWidth, this.kRefHeight);
    //根据不同种类取不同的子弹的位置

    switch (this.projectileKind) {
        case 1 :
            r.getXform().setSize(this.kRefWidth, this.kRefHeight);
            r.setElementPixelPositions(62, 88, 70, 98);
            break;
        case 2:
            r.getXform().setSize(4, 0.8);
            r.setElementPixelPositions(147, 176, 82, 90);
            break;
        case 3:
            r.getXform().setSize(4, 0.8);
            r.setElementPixelPositions(202, 232, 82, 91);
            break;

        case 4:
            r.getXform().setSize(this.kRefWidth, this.kRefHeight);
            r.setElementPixelPositions(255, 272, 81, 100);
            break;
        case 5:
            r.getXform().setSize(this.kRefWidth, this.kRefHeight);
            r.setElementPixelPositions(288, 306, 77, 96);
            break;

        case 6:
            r.getXform().setSize(2.5, 2.5);
            r.setElementPixelPositions(323, 340, 79, 96);
            break;

        case 7:
            r.getXform().setSize(10, 10);
            r.setElementPixelPositions(396, 428, 74, 102);
            break;

    }
            GameObject.call(this, r);

            this.setCurrentFrontDir([dir, 0]);
            this.setSpeed(this.kSpeed);

            // Expired to remove
            this.mExpired = false;
    }
    gEngine.Core.inheritPrototype(Projectile, GameObject);

    Projectile.prototype.setExpired = function () {
        this.mExpired = true;
    };
    Projectile.prototype.hasExpired = function () {
        return this.mExpired;
    };

    Projectile.prototype.getProSpeed = function () {
        return this.kSpeed;
    };

    Projectile.prototype.getProPower = function () {
        return this.kPower;
    };
    Projectile.prototype.setProSpeed = function (speed) {
        this.kSpeed = speed;
    };

    Projectile.prototype.setProPower = function (power) {
        this.kPower = power;
    };


    Projectile.prototype.update = function (dyes, aCamera) {
        GameObject.prototype.update.call(this);
        var hit = false;

        if (aCamera.collideWCBound(this.getXform(), 1.1) !==
                BoundingBox.eboundCollideStatus.eInside)
            this.setExpired();

        var i, obj;
        var p = vec2.fromValues(0, 0);
        for (i = 0; i < dyes.size(); i++) {
            obj = dyes.getObjectAt(i);
            if (this.pixelTouches(obj, p)) {
                this.setExpired();
                obj.setExpired();
                hit = true;
            }
        }

        return hit;
};