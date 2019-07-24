//File: Dust.js
/*jslint node: true, vars: true */
/*global gEngine, vec2, ParticleGameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

/**
 * Default Constructor
 * @param {DustParams} DustParams struct with xPos, yPos, width, yAcceleration, life, xVelocity, yVelocity, flicker, intensity, xAcceleration, size, yOffset
 * @returns {Dust} New instance of Dust object
 * @type Dust
 * @class Dust
 */
function Dust(DustParams){//xPos, yPos, width, yAcceleration, life, xVelocity, yVelocity, flicker, intensity, xAcceleration, size, yOffset){
    this.xPos=DustParams.xPos;
    this.yPos=DustParams.yPos;
    this.width=DustParams.width;
    this.yAcceleration=DustParams.yAcceleration;
    this.life=DustParams.life;
    this.xVelocity=DustParams.xVelocity;
    this.yVelocity=DustParams.yVelocity;
    this.flicker=DustParams.flicker;
    this.intensity=DustParams.intensity;
    this.xAcceleration=DustParams.xAcceleration;
    this.size=DustParams.size;
    this.yOffset=DustParams.yOffset;   
    ParticleSystem.call(this, "assets/ParticleSystem/particle.png", this.xPos, this.yPos, this.width, this.yAcceleration, this.life, this.xVelocity, this.yVelocity, this.flicker, this.intensity, this.xAcceleration, this.size, this.yOffset, [0,0,0,1], [.5,.5,.5,1], 1);    
}

gEngine.Core.inheritPrototype(Dust,ParticleSystem);

/**
 * Parameter Struct
 * @param {float} xPos The x position for the dust
 * @param {float} yPos The y position for the dust
 * @param {float} width The maximum horizontal offset for the dust particles
 * @param {float} yAcceleration The vertical acceleration for the dust paritcles
 * @param {float} life The life for the dust particles
 * @param {float} xVelocity The initial horizontal boost for the dust particles
 * @param {float} yVelocity The initial vertical boost for the dust particles
 * @param {float} flicker How quickly particles shrink
 * @param {float} intensity The # of dust particles created per update cycle
 * @param {float} xAcceleration The horizontal acceleration for the dust particles
 * @param {float} size The size for the dust paritcles
 * @param {float} yOffset The maximum vertical offset for the dust particles
 * @returns {DustParams} New instance of DustParams struct, with defaults for non-specified values
 * @type struct
 */
DustParams = function(xPos, yPos, width, yAcceleration, life, xVelocity, yVelocity, flicker, intensity, xAcceleration, size, yOffset){
    this.xPos=xPos||50;
    this.yPos=yPos||50;
    this.width=width||50;
    this.yAcceleration=yAcceleration||1;
    this.life=life||140;
    this.xVelocity=xVelocity||0;
    this.yVelocity=yVelocity||0;
    this.flicker=flicker||0;
    this.intensity=intensity||1;
    this.xAcceleration=xAcceleration||0;
    this.size=size||1;
    this.yOffset=yOffset||0;
};

Dust.prototype.update = function(){
    for(var i=0; i<this.intensity; i++){
    var p = this.createParticle(this.xPos, this.yPos);
    this.mAllParticles.addToSet(p);
    }
    gEngine.ParticleSystem.update(this.mAllParticles);
    var pSet = this.getSet().mSet;
    var setLength = pSet.length;    
    for (var i = 0; i < setLength; i++){
        this.applyDrift(pSet[i]);
        this.applySizeDelta(pSet[i]);
    }
};

Dust.prototype.applyDrift = function(pGO){
    var p = pGO.getParticle();
    var pAccel = p.getAcceleration();
    if(Math.floor(Math.random()*2) === 0){
        p.setAcceleration([pAccel[0]+(Math.random()-.5),pAccel[1]+(Math.random()-.5)]);
    }
    else{
        p.setAcceleration([pAccel[0]+(Math.random()-.5),pAccel[1]+(Math.random()-.5)]);
    }
};

Dust.prototype.applySizeDelta = function(pGO){
    if(Math.floor(Math.random()*2) === 0){
        pGO.setSizeDelta(1.01);
    }
    else{
        pGO.setSizeDelta(.99);
    }
};