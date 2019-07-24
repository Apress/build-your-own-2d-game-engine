/*
 * File: Barrage.js
 * a set of Dyepacks
 */

/*jslint node: true, vars:true , white: true*/
/*global gEngine, vec2, GameObjectSet, ParticleEmitter */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

/**
 * Default Contsructor<p>
 * a set of Dyepacks
 * @returns {Barrage} New instance of Barrage
 * @class Barrage
 */
function Barrage(spriteTexture, spawnPos, speed, type, num, rotate) {
    GameObjectSet.call(this);
    var i = 0;

    this.barrageNum = num ? num : 100;
    var unit = 1;
    var theta = 0;
    this.target = null;

    switch (type) {
        case BARRAGE_TYPE.CIRCLE:
            unit = 2 * Math.PI / this.barrageNum;
            for (i = 0; i < this.barrageNum; i++) {
                theta = rotate + i * unit;
                this.addToSet(new Bullet(this, spriteTexture, spawnPos, speed, vec2.fromValues(Math.cos(theta), Math.sin(theta))));
            }
            break;
        case BARRAGE_TYPE.SECTOR:
            unit = 0.8*Math.PI /   this.barrageNum;
            for (i = 0; i < this.barrageNum/4; i++) {
                theta = rotate + (i - this.barrageNum / 2) * unit;
                this.addToSet(new Bullet(this, spriteTexture, spawnPos, speed, vec2.fromValues(Math.cos(theta), Math.sin(theta))));
            }
            break;
        case BARRAGE_TYPE.D_SECTOR:
            unit = 0.8*Math.PI /   this.barrageNum;
            for (i = 0; i < this.barrageNum/4; i++) {
                theta = rotate + (i - this.barrageNum / 2) * unit;
                this.addToSet(new Bullet(this, spriteTexture, spawnPos, speed, vec2.fromValues(Math.cos(theta), Math.sin(theta))));
                this.addToSet(new Bullet(this, spriteTexture, spawnPos, speed, vec2.fromValues(-Math.cos(theta), -Math.sin(theta))));
            }
            break;
        case BARRAGE_TYPE.LINE:
            theta += rotate;
            this.addToSet(new Bullet(this, spriteTexture, spawnPos, speed, vec2.fromValues(Math.cos(theta), Math.sin(theta))));

            break;
        case BARRAGE_TYPE.CROSS:
            theta += rotate;
            this.addToSet(new Bullet(this, spriteTexture, spawnPos, speed, vec2.fromValues(Math.cos(theta), Math.sin(theta))));
            theta += Math.PI/2;
            this.addToSet(new Bullet(this, spriteTexture, spawnPos, speed, vec2.fromValues(Math.cos(theta), Math.sin(theta))));
            theta += Math.PI/2;
            this.addToSet(new Bullet(this, spriteTexture, spawnPos, speed, vec2.fromValues(Math.cos(theta), Math.sin(theta))));
            theta += Math.PI/2;
            this.addToSet(new Bullet(this, spriteTexture, spawnPos, speed, vec2.fromValues(Math.cos(theta), Math.sin(theta))));

            break;


    }

}

var BARRAGE_TYPE = {
    CIRCLE: 0,
    SECTOR: 1,
    D_SECTOR: 2,
    LINE: 3,
    CROSS: 4,
};

gEngine.Core.inheritPrototype(Barrage, GameObjectSet);

/**
 * the function to call to generate particles
 * @param {vec2} p Position of Emitter in WC space
 * @param {Number} n Number of particles to be emitted
 * @param {function} func Creater Function
 * @returns {void}
 * @memberOf Barrage
 */
Barrage.prototype.addEmitterAt = function (p, n, func) {
    var e = new ParticleEmitter(p, n, func);
    this.mEmitterSet.push(e);
};

/**
 * Draw function called by GameLoop
 * @param {Camera} aCamera Camera to draw too
 * @returns {void}
 * @memberOf Barrage
 */
Barrage.prototype.draw = function (aCamera) {
    GameObjectSet.prototype.draw.call(this, aCamera);
};

Barrage.prototype.setTarget = function (target) {
    this.target = target;
};


/**
 * Update Function called by GameLoop
 * @returns {void}
 * @memberOf Barrage
 */
Barrage.prototype.update = function (aCamera) {
    var i;
    for (i = 0; i < this.mSet.length; i++) {
        this.mSet[i].update(aCamera);

    }

    if (this.target !== null) {
        if (!this.target.isInvincible()) {
            for (i = 0; i < this.mSet.length; i++) {
                var h = [];
                // if (this.mSet[i].pixelTouches(wing,h)) {
                if (this.mSet[i].getBBox().intersectsBound(this.target.getBBox())) {
                    this.target.decreaseHealth();
                    // wing.hitTime += 1;
                }

            }
        }
    }


};
