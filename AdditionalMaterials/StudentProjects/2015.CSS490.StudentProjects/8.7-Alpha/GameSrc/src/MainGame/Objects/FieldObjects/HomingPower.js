/*
 * Team 7-Alpha
 * CSS 490C
 * 2D Game Engine Design
 * File: ExplosivePower.js 
 * 
 * This file handles the explosion powerup
 * 
 */

function HomingPower(atX, atY) {
    this.kRefWidth = 100;
    this.kRefHeight = 180;
    this.kHomingRocket = "assets/homingRocket.png";
    this.kHomingNormal = "assets/homingNormal.png";
    
    var size = 5;
    this.mHomingPower = new IllumRenderable(this.kHomingRocket, this.kHomingNormal);
    this.mHomingPower.getXform().setPosition(atX, atY);
    this.mHomingPower.getXform().setSize(size, size);
    this.mHomingPower.setElementPixelPositions(4, 62, 0, 64);
    this.mHomingPower.getXform().setZPos(2);

    GameObject.call(this, this.mHomingPower);
}
gEngine.Core.inheritPrototype(HomingPower, GameObject);

HomingPower.prototype.setCollided = function (boolean) {
    this.hasCollided = boolean;
};

HomingPower.prototype.getCollisionStatus = function () {
    return this.hasCollided;
};