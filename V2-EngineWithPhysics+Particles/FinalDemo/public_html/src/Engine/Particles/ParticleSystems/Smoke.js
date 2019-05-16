//File: Smoke.js
/*jslint node: true, vars: true */
/*global gEngine, vec2, ParticleGameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

/**
 * Default Constructor
 * @param {float} xPos The x position for the smoke
 * @param {float} yPos The y position for the smoke
 * @param {float} width The maximum horizontal offset for the smoke particles
 * @param {float} yAcceleration The vertical acceleration for the smoke paritcles
 * @param {float} life The life for the smoke particles
 * @param {float} xVelocity The initial horizontal boost for the smoke particles
 * @param {float} yVelocity The initial vertical boost for the smoke particles
 * @param {float} flicker How quickly particles shrink
 * @param {float} intensity The # of smoke particles created per update cycle
 * @param {float} xAcceleration The horizontal acceleration for the smoke paritcles
 * @param {float} size The size for the smoke paritcles
 * @param {float} yOffset The maximum vertical offset for the smoke paritcles
 * @returns {Smoke} New instance of Smoke object
 * @type Smoke
 * @class Smoke
 */
function Smoke(xPos, yPos, width, yAcceleration, life, xVelocity, yVelocity, flicker, intensity, xAcceleration, size, yOffset){
    ParticleSystem.call(this, "assets/ParticleSystem/smokeparticle.png", xPos, yPos, width, yAcceleration, life, xVelocity, yVelocity, flicker, intensity, xAcceleration, size, yOffset, [.1,.1,.1,1], [.1,.1,.1,1], 1);
    this.setSizeBase(3.5);
}

gEngine.Core.inheritPrototype(Smoke,ParticleSystem)


Smoke.SmokeParams = function(){
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

Smoke.prototype.update = function(){
    for(var i=0; i<this.intensity; i++){
    var p = this.createParticle(this.xPos, this.yPos);
    this.mAllParticles.addToSet(p);
    }
    gEngine.ParticleSystem.update(this.mAllParticles);
    this.applyEmbers();
}

Smoke.prototype.applyEmbers = function(){    
    var pSet = this.getSet().mSet;
    var setLength = pSet.length;
    for (var i = 0; i < setLength; i++){    
        if(pSet[i].getParticle().mParallaxDir && pSet[i].getParticle().mDriftDir){
            this.applyDrift(pSet[i]);            
        }
        if(pSet[i].getParticle().mParallaxDir && !pSet[i].getParticle().mDriftDir){
            this.applyColor(pSet[i]);
        }
        if(!pSet[i].getParticle().mParallaxDir && !pSet[i].getParticle().mDriftDir){
            this.applySizeDelta(pSet[i]);
            this.applyColor(pSet[i]);
        }
    }
};

Smoke.prototype.applyDrift = function(pGO){
    var p = pGO.getParticle();
    var pPos = p.getPosition();
    //var xform = pGO.getXform();    
    pGO.setSizeDelta(.95);
    if(Math.floor(Math.random()*2) === 0){
        pPos[0] += 1;
    }
    else{
        pPos[0] -= 1;
    }
};

Smoke.prototype.applySizeDelta = function(pGO){
    if(Math.floor(Math.random()*2) === 0){
        pGO.setSizeDelta(1.0125);        
    }
    else{
        pGO.setSizeDelta(.99); 
    }    
};

Smoke.prototype.applyColor = function(pGO){
    var p = pGO.getParticle();
    if(Math.floor(Math.random()*2) === 0){
        pGO.setFinalColor([0,0,0,1]);
        p.setVelocity([-3.5,p.getVelocity()[1]+.1]);
    }
    else{
        pGO.setFinalColor([.1,.1,.1,1]);
        p.setVelocity([3.5,p.getVelocity()[1]+.1]);
    }       
};