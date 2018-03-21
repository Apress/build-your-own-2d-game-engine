/* 
 * File: Player.js
 * Created by phreeze Tang 30/7/2017
 * Defined ultra attacks.
 * 
 * change log:
 * 30/7/2017 create file
 */

/* global GameObject, gEngine */

"use strict";

function Ultra(explosionPool, grenadePool) {
    this.kRocketTexture = "assets/Rocket.png";
    this.kPlaneTexture = "";
    //this.kFireTexture = "";
    this.kUltraExplodeTexture = "assets/UltraExplode.png";
    
    this.kUltraExplodeClip = "assets/audio/UltraExplode.mp3";
    this.kUltraStartClip = "assets/audio/UltraStart.mp3";
    
    this.sType = null;
    this.sTimetick = 0;
    this.sUltraState = 0;
    
    this.mRenderable = null;
    this.mExplosionPool = explosionPool;
    this.mGreandePool = grenadePool;
};

Ultra.prototype.startUltra = function (type, owner, target) {
    this.sType = type;
    this.mOwner = owner;
    this.mTarget = target;
    
    if (this.sType === 1) { // "Scatter" Missile attack
        var pos = this.mOwner.getXform().getPosition();
        this.mRenderable = new SpriteRenderable(this.kRocketTexture);
        this.mRenderable.setColor([1.0, 1.0, 1.0, 0.0]);
        this.mRenderable.setElementPixelPositions(0, 187, 0, 490); // 
        this.mRenderable.getXform().setPosition(pos[0], pos[1] - 1.5); // should be changed
        this.mRenderable.getXform().setSize(5, 13.16);
        this.sTimetick = 270;
        this.sUltraState = 0;
    }
};

Ultra.prototype.update = function () {
    if (this.sTimetick <= 0) return;
    
    this.sTimetick--;
    if (this.sType === 1) { // "Scatter" Missile attack
        var deltaY = 0.2;
        if (this.sUltraState === 0) {
            if (this.sTimetick % 2 === 0) {
                if ((this.sTimetick / 2) % 2 === 0) this.mRenderable.getXform().incXPosBy(0.2);
                else this.mRenderable.getXform().incXPosBy(-0.2);    
            }
            if (this.sTimetick <= 240) {
                this.sUltraState = 1;
                gEngine.AudioClips.playACue(this.kUltraStartClip);
            }
        }
        if (this.sUltraState === 1) {
            this.mRenderable.getXform().incYPosBy(deltaY);
            if (this.sTimetick <= 120) {
                this.sUltraState = 2;
            }
        }
        if (this.sUltraState === 2) {
            if (this.sTimetick <= 90) {
                this.sUltraState = 3;
                gEngine.AudioClips.playACue(this.kUltraExplodeClip);
            }
        }
        if (this.sUltraState === 3) {
            if (this.sTimetick <= 30) {
                this.sUltraState = 4;
                this.mRenderable.getXform().setXPos(this.mTarget.getXform().getXPos());
                this.mRenderable.getXform().setSize(5, -13.16);
            }
        }
        if (this.sUltraState === 4) {
            this.mRenderable.getXform().incYPosBy(-4 * deltaY);
            if (this.sTimetick <= 0) this.sUltraState = 5;
        }
        if (this.sUltraState === 5) {
            var pos = this.mRenderable.getXform().getPosition();
            var tempExplode = new Explosion(this.kUltraExplodeTexture, pos[0], pos[1], 10, this.mTarget.sPlayerIndex, 0);
            this.mExplosionPool.addToSet(tempExplode);
        }
    }
};

Ultra.prototype.draw = function (aCamera) {
    if (this.sTimetick > 0) this.mRenderable.draw(aCamera);
};
