/*
 * Team 7-Alpha
 * CSS 490C
 * 2D Game Engine Design
 * File: ExplosivePower.js 
 * 
 * This file handles the explosion powerup
 * 
 */

function ExplosivePower(atX, atY) {
    this.kRefWidth = 100;
    this.kRefHeight = 180;
    this.kExplosiveRocket = "assets/explosiveRocket.png";
    this.kExplosiveNormal = "assets/explosiveNormal.png";
    
    var size = 5;
    this.mExplosivePower = new IllumRenderable(this.kExplosiveRocket, this.kExplosiveNormal);
    this.mExplosivePower.getXform().setPosition(atX, atY);
    this.mExplosivePower.getXform().setSize(size, size);
    this.mExplosivePower.setElementPixelPositions(4, 62, 0, 64);
    this.mExplosivePower.getXform().setZPos(2);
    

    GameObject.call(this, this.mExplosivePower);
}
gEngine.Core.inheritPrototype(ExplosivePower, GameObject);

ExplosivePower.prototype.setCollided = function (boolean) {
    this.hasCollided = boolean;
};

ExplosivePower.prototype.getCollisionStatus = function () {
    return this.hasCollided;
};