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
Dust.DustParams = function(){
    //this.mAllParticles = new ParticleGameObjectSet();
    //this.texture="assets/ParticleSystem/flameparticle.png";
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
    //this.startColor=[1,0,0,1];
    //this.finalColor=[0,0,0,1];
    //this.yMultiplier=1;
    //this.sizeBase=1;
}

Dust.prototype.update = function(){
    for(var i=0; i<this.intensity; i++){
    var p = this.createParticle(this.xPos, this.yPos);
    this.mAllParticles.addToSet(p);
    }
    gEngine.ParticleSystem.update(this.mAllParticles);
    
    this.applyEmbers();
};

Dust.prototype.applyEmbers = function(){
    var pSet = this.getSet().mSet;
    var setLength = pSet.length;    
    for (var i = 0; i < setLength; i++){
        var p = pSet[i].getParticle();                
        if(p.mParallaxDir && p.mDriftDir){
            this.applyDrift(pSet[i]);
        }else{        
            this.applySizeDelta(pSet[i]);
        }
        var pPos = p.getPosition();
        if(pPos[0] > 100 || pPos[0] < 0){
            pSet[i].mCyclesToLive = 0;
        }
        if(pPos[1] > 80 || pPos[1] < 0){
            pSet[i].mCyclesToLive = 0;
        }
    }
};
Dust.prototype.applyDrift = function(pGO){
    var p = pGO.getParticle();
    //var pPos = p.getPosition();
    //var xform = pGO.getXform();    
    pGO.setSizeDelta(.95);
    var pAccel = p.getAcceleration();
    if(Math.floor(Math.random()*2) === 0){     
        p.setAcceleration([pAccel[0]+(Math.random()-.5),pAccel[1]+(Math.random()-.5)]);
    }
    else{
        p.setAcceleration([pAccel[0],pAccel[1]]);
    }
};

Dust.prototype.applySizeDelta = function(pGO){
    var p = pGO.getParticle();
    var pAccel = p.getAcceleration();
    if(Math.floor(Math.random()*2) === 0){
        pGO.setSizeDelta(1.01);        
        p.setAcceleration([pAccel[0]+(Math.random()-.5),pAccel[1]+(Math.random()-.5)]);
    }
    else{
        pGO.setSizeDelta(.99);
        //var v2c = new vec2.fromValues((this.xPos-p.getXPos())*50,pAccel[1]);        
        p.setAcceleration([pAccel[0]+(Math.random()-.5),pAccel[1]+(Math.random()-.5)]);
    }    
};