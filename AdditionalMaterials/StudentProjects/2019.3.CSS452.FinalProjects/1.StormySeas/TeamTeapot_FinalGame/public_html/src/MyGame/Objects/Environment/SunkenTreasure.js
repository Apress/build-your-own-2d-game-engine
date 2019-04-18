/*
 * File:        SunkenTreasure.js
 * Programmers: Kyla            March 2, 2019
 *              
 *
 */

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function SunkenTreasure(texture, miniMapTexture, position, lifeSpan)
{
    var xPos = position[0];
    var yPos = position[1];
    
    ParticleSystem.call(this,
        texture,
        xPos,
        yPos,
        2.25,               // width (maximum horizontal offset)
        0,                  // yAcceleration
        10,                 // life
        0,                  // OVERRIDDEN
        0,                  // OVERRIDDEN
        1,                  // flicker (how quickly particles shrink)
        0,                  // OVERRIDDEN
        0,                  // xAcceleration
        4,                  // size
        2.25,               // yOffset (maximum vertical offset)
        [1, 1, 0, 1],       // startColor
        [1, 0, 0, 1],       // finalColor
        2);                 // yMultiplier
        
    this.setSizeBase(0.1);
    this.mLifeSpan = lifeSpan;
    this.mLifeTimer = 0;
    
    // So can spawn less than 1 particle per update:
    // mSpawnRate is how many updates between particle creation
    // (e.g. mSpawnElapse of 10 is 1 particle per 10 updates)
    this.mSpawnRate = 10;
    this.mUpdatesElapsed = 0;
    
    this.mMapRenderable = new UISpriteRenderable(miniMapTexture);
    this.mMapRenderable.setColor([1, 1, 0, 1.0]);
    this.mMapRenderable.getXform().setSize(9, 9);
    this.mMapRenderable.getXform().setPosition(xPos, yPos);
}
gEngine.Core.inheritPrototype(SunkenTreasure, ParticleSystem);

SunkenTreasure.prototype.update = function(){
    if(this.mUpdatesElapsed > this.mSpawnRate){
    var p = this.createParticle(this.xPos, this.yPos);
    this.mAllParticles.addToSet(p);
    this.mUpdatesElapsed = 0;
    }
    this.mUpdatesElapsed++;
    this.mLifeTimer++;
    gEngine.ParticleSystem.update(this.mAllParticles);
};

SunkenTreasure.prototype.getBBox = function()
{
    var b = new BoundingBox(this.getPos(), 10, 10);
    return b;
};

SunkenTreasure.prototype.createParticle = function(atX,atY) {
    var life = this.life + Math.random() * (this.life*10);
    var width = -this.width + 
                  this.width*2 *
                  Math.random();
    var yOffset = this.yMultiplier *
                  this.yOffset *
                  Math.random();
    
    var p = new ParticleGameObject(this.texture, atX+width, atY+yOffset, life);
    var sTemp = Array.from(this.startColor);
    p.getRenderable().setColor(sTemp);
    
    // size of the particle
    var r = this.sizeBase + Math.random() * this.size;
    p.getXform().setSize(r, r);
    
    // final color
    var fTemp = Array.from(this.finalColor);
    p.setFinalColor(fTemp);
    
    p.getParticle().setVelocity([0, 0]);
    // size delta
    p.setSizeDelta(1-(this.flicker*.005));
    p.getParticle().setAcceleration([this.xAcceleration*5, this.yMultiplier*this.yAcceleration*5]);
    return p;
};

SunkenTreasure.prototype.drawForMap = function (aCamera)
{
    this.mMapRenderable.draw(aCamera);
};

SunkenTreasure.prototype.isDead = function()
{
    return this.mLifeTimer >= this.mLifeSpan;
};
