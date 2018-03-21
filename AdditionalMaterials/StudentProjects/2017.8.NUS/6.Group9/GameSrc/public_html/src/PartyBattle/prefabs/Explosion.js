/* 
 * File: Explosion.js
 * Created by phreeze Tang 27/7/2017
 * Defined the Explosion object.
 * 
 * change log:
 * 27/7/2017 create the file
 */

/* global GameObject, gEngine */

"use strict";  

//function Explosion (explosionTexture, posX, posY, r, type, damagePerHit) { // type === 0 normal , 1 player1 die , 2 etc. 
//    this.sIsProcessedP1 = false;
//    this.sIsProcessedP2 = false;
//    this.sType = type;
//    this.sLifeTimeTick = 20;
//    this.sDamagePerHit = damagePerHit;
//    
//    this.mExplosionEffect = new SpriteRenderable(explosionTexture);
//    this.mExplosionEffect.setColor([0.5, 0.5, 1.0, 0.5]);
//    this.mExplosionEffect.getXform().setPosition(posX, posY);
//    this.mExplosionEffect.getXform().setSize(2 * r, 2 * r);
//    this.mExplosionEffect.setElementPixelPositions(0, 512, 0, 512);
//    GameObject.call(this, this.mExplosionEffect);
//}
//gEngine.Core.inheritPrototype(Explosion, GameObject);
//
//Explosion.prototype.update = function () {
//     GameObject.prototype.update.call(this);
//     this.sLifeTimeTick--;
//};

function Explosion (explosionTexture, posX, posY, r, type, damagePerHit) { // type === 0 normal , 1 player1 die , 2 etc. 
    this.sIsProcessedP1 = false;
    this.sIsProcessedP2 = false;
    this.sType = type;
    this.sLifeTimeTick = 13;
    this.sDamagePerHit = damagePerHit;
    
    if (this.sType === 0) {
        this.mExplosionEffect = new SpriteAnimateRenderable(explosionTexture);
        this.mExplosionEffect.setSpriteSequence(128, 0, 100, 100, 7, 0);
        this.mExplosionEffect.setAnimationSpeed(2);
        //this.mExplosionEffect.setAnimationType(this.mExplosionEffect.eAnimationType.eAnimateLeft);
        this.mExplosionEffect.setColor([0.5, 0.5, 1.0, 0.0]);
        this.mExplosionEffect.getXform().setPosition(posX, posY);
        this.mExplosionEffect.getXform().setSize(2 * r, 2 * r);
    }
    else {
        this.mExplosionEffect = new SpriteAnimateRenderable(explosionTexture);
        this.sLifeTimeTick = 28;
        this.mExplosionEffect.setSpriteSequence(128, 0, 128, 128, 4, 0);
        this.mExplosionEffect.setAnimationSpeed(7);
        //this.mExplosionEffect.setAnimationType(this.mExplosionEffect.eAnimationType.eAnimateLeft);
        this.mExplosionEffect.setColor([0.5, 0.5, 1.0, 0.0]);
        this.mExplosionEffect.getXform().setPosition(posX, posY + r);
        this.mExplosionEffect.getXform().setSize(2 * r, 2 * r);
    }

    //this.mExplosionEffect.setElementPixelPositions(0, 512, 0, 512);
    GameObject.call(this, this.mExplosionEffect);
}
gEngine.Core.inheritPrototype(Explosion, GameObject);

Explosion.prototype.update = function () {
     GameObject.prototype.update.call(this);
     this.mExplosionEffect.updateAnimation();
     this.sLifeTimeTick--;
};