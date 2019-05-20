//File: Snow.js
/*jslint node: true, vars: true */
/*global gEngine, vec2, ParticleGameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

/**
 * Default Constructor
 * @param {float} xPos The x position for the snow
 * @param {float} yPos The y position for the snow
 * @param {float} width The maximum horizontal offset for the snow particles
 * @param {float} yAcceleration The vertical acceleration for the snow paritcles
 * @param {float} life The life for the snow particles
 * @param {float} xVelocity The initial horizontal boost for the snow particles
 * @param {float} yVelocity The initial vertical boost for the snow particles
 * @param {float} flicker How quickly particles shrink
 * @param {float} intensity The # of snow particles created per update cycle
 * @param {float} xAcceleration The horizontal acceleration for the snow paritcles
 * @param {float} size The size for the snow paritcles
 * @param {float} yOffset The maximum vertical offset for the snow paritcles
 * @returns {Snow} New instance of Snow object
 * @type Snow
 * @class Snow
 */
function Snow(xPos, yPos, width, yAcceleration, life, xVelocity, yVelocity, flicker, intensity, xAcceleration, size, yOffset){
    ParticleSystem.call(this, "assets/ParticleSystem/snowparticle.png", xPos, yPos, width, yAcceleration, life, xVelocity, yVelocity, flicker, intensity, xAcceleration, size, yOffset, [.6,.6,.6,1], [.6,.6,.6,1], -1);
    this.setSizeBase(1);
}

gEngine.Core.inheritPrototype(Snow,ParticleSystem);

Snow.SnowParams = function(){
    //this.mAllParticles = new ParticleGameObjectSet();
    //this.texture="assets/ParticleSystem/snowparticle.png";
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

Snow.prototype.update = function(){
    for(var i=0; i<this.intensity; i++){
    var p = this.createParticle(this.xPos, this.yPos);
    this.mAllParticles.addToSet(p);
    p.xf.setZPos(3);
    }
    gEngine.ParticleSystem.update(this.mAllParticles);
    this.wrapParticles();
};

Snow.prototype.wrapParticles = function(){    
    var pSet = this.getSet().mSet;
    var setLength = pSet.length;    
    for (var i = 0; i < setLength; i++){        
        this.applyDrift(pSet[i]);
    }
};

Snow.prototype.applyDrift = function(pGO){    
    var p = pGO.getParticle();    
    var pPos = p.getPosition();
    var pAccel = p.getAcceleration();
    if(pPos[1] < 6){
        p.setAcceleration([0,0]);
        p.setVelocity([0,0]);
        p.mRotationVal = 0;
    }
    if(pPos[1] < 0){
        pGO.mCyclesToLive = 0;
    }
    var pOPos = p.getOriginalPosition();
    var dist = Math.abs(pPos[0] - pOPos[0]);
    var ydist = Math.abs(pPos[1] - pOPos[1]);
    if(dist % (Math.floor(Math.random()*5)) < 0.1){
        var test = Math.floor(Math.random()*2);
        if(test)
            p.mDriftDir = !p.mDriftDir;
    }
    if(p.mDriftDir){        
        p.setAcceleration([pAccel[0]+.1,pAccel[1]]);
    }
    else{        
        p.setAcceleration([pAccel[0]-.1,pAccel[1]]);
    }
    if(p.mParallaxDir){
        pGO.setSizeDelta(1.0005);
        pGO.getXform().incYPosBy(-.01);
        pGO.getXform().setZPos(5);
    }
    else{
        pGO.setSizeDelta(.999);
        pGO.getXform().incYPosBy(.01);
        pGO.getXform().setZPos(1);
    }    
    if (pPos[0] > 100){
        pPos[0] = 0;
    }
    if (pPos[0] < 0){
        pPos[0] = 100;
    }    
    pGO.getXform().incRotationByDegree(p.mRotationVal*.05);
};
