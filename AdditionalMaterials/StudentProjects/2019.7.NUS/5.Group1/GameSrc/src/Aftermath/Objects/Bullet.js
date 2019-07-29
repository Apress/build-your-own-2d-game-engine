/* File: Bullet.js 
 *
 * Creates and initializes a simple Bullet
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Bullet(bulletSet, spriteTexture, spawnPos, speed, dir, size) {
    if (size === undefined) {
        this.kRefWidth = 130;

    } else {

        this.kRefWidth = size;
    }
    this.kRefHeight =this.kRefWidth *15/13;

    this.mBullet = new SpriteRenderable(spriteTexture);
    this.mBullet.setColor([1, 1, 1, 0.1]);
    this.mBullet.getXform().setPosition(spawnPos[0], spawnPos[1]);
    this.mBullet.getXform().setSize(this.kRefWidth / 50, this.kRefHeight / 50);
    // this.mBullet.setElementPixelPositions(510, 595, 23, 153);
    this.mBullet.setElementPixelPositions(0,64,0,64);

    this.mbulletSet = bulletSet;

    GameObject.call(this, this.mBullet);

    this.setSpeed(speed);
    this.setCurrentFrontDir(dir);

    this.kDemage = 0;


    this.spawnTime = Date.now();
}

gEngine.Core.inheritPrototype(Bullet, GameObject);


Bullet.prototype.update = function (aCamera) {
    GameObject.prototype.update.call(this);  // default moving forward


    var status = aCamera.collideWCBound(this.getXform(), 1);
    if (status === 0) {
        this.mbulletSet.removeFromSet(this);
    }


};