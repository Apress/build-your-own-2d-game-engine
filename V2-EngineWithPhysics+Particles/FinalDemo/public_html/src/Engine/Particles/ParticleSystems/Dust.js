//File: Dust.js
/*jslint node: true, vars: true */
/*global gEngine, vec2, ParticleGameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

/**
 * Default Constructor
 * @param {float} xPos The x position for the fire
 * @param {float} yPos The y position for the fire
 * @param {float} width The maximum horizontal offset for the fire particles
 * @param {float} yAcceleration The vertical acceleration for the fire paritcles
 * @param {float} life The life for the fire particles
 * @param {float} xVelocity The initial horizontal boost for the fire particles
 * @param {float} yVelocity The initial vertical boost for the fire particles
 * @param {float} flicker How quickly particles shrink
 * @param {float} intensity The # of fire particles created per update cycle
 * @param {float} xAcceleration The horizontal acceleration for the fire paritcles
 * @param {float} size The size for the fire paritcles
 * @param {float} yOffset The maximum vertical offset for the fire paritcles
 * @returns {Dust} New instance of Dust object
 * @type Dust
 * @class Dust
 */
function Dust(xPos, yPos, width, yAcceleration, life, xVelocity, yVelocity, flicker, intensity, xAcceleration, size, yOffset){
    ParticleSystem.call(this, "assets/ParticleSystem/particle.png", xPos, yPos, width, yAcceleration, life, xVelocity, yVelocity, flicker, intensity, xAcceleration, size, yOffset, [0,0,0,1], [.5,.5,.5,1], 1);    
}

gEngine.Core.inheritPrototype(Dust,ParticleSystem);

/**
 * Parameter Struct
 */
DustParams = function(){
    this.xPos=50;
    this.yPos=50;
    this.width=5;
    this.yAcceleration=1;
    this.life=140;
    this.xVelocity=0;
    this.yVelocity=0;
    this.flicker=0;
    this.intensity=1;
    this.xAcceleration=0;
    this.size=1;
    this.yOffset=0;
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

/**
 * Applies drifting floating effect to particles
 * @param {Particle Game Object} pGO Particle object to apply effect to
 * @memberOf Dust
 */
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

/**
 * Applies size delta effect to particles
 * @param {Particle Game Object} pGO Particle object to apply effect to
 * @memberOf Dust
 */
Dust.prototype.applySizeDelta = function(pGO){
    if(Math.floor(Math.random()*2) === 0){
        pGO.setSizeDelta(1.01);
    }
    else{
        pGO.setSizeDelta(.99);
    }
};