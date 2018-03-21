/*
 * Team 7-Alpha
 * CSS 490C
 * 2D Game Engine Design
 * File: Ore.js 
 * 
 * This file handles the ore objects
 * 
 */

function Ore(atX, atY) {
    this.kRefWidth = 100;
    this.kRefHeight = 180;
    this.kOre = "assets/ore.png";
    this.kOreNormal = "assets/oreNormal.png";
    
    var size = 3;
    this.mOre = new IllumRenderable(this.kOre, this.kOreNormal);
    this.mOre.getXform().setPosition(atX, atY);
    this.mOre.getXform().setSize(size, size);
    this.mOre.setSpriteSequence((128 - 29), 24,
                                80, 80,
                                5,
                                0);
    this.mOre.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.mOre.setAnimationSpeed(15);
    
    this.mOre.getXform().setZPos(2);

    GameObject.call(this, this.mOre);
}
gEngine.Core.inheritPrototype(Ore, GameObject);

Ore.prototype.setCollided = function (boolean) {
    this.hasCollided = boolean;
};

Ore.prototype.update = function () {
    this.mOre.updateAnimation();
};

Ore.prototype.getCollisionStatus = function () {
    return this.hasCollided;
};