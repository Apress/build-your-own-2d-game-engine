//File: Fire.js
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
 * @returns {Fire} New instance of Fire object
 * @type Fire
 * @class Fire
 */
function Fire(xPos, yPos, width, yAcceleration, life, xVelocity, yVelocity, flicker, intensity, xAcceleration, size, yOffset){
    ParticleSystem.call(this, "assets/ParticleSystem/flameparticle.png", xPos, yPos, width, yAcceleration, life, xVelocity, yVelocity, flicker, intensity, xAcceleration, size, yOffset, [1,0,0,1], [3.5,.4,.3,.6], 1);
    this.setSizeBase(3.5);
}

gEngine.Core.inheritPrototype(Fire,ParticleSystem);

/**
 * Parameter Struct
 */
Fire.FireParams = function(){
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

Fire.prototype.update = function(){
    for(var i=0; i<this.intensity; i++){
    var p = this.createParticle(this.xPos, this.yPos);
    this.mAllParticles.addToSet(p);
    }
    gEngine.ParticleSystem.update(this.mAllParticles);
    this.applyEmbers();
};

Fire.prototype.applyEmbers = function(){
    var pSet = this.getSet().mSet;
    var setLength = pSet.length;    
    for (var i = 0; i < setLength; i++){
        if(pSet[i].getParticle().mParallaxDir && pSet[i].getParticle().mDriftDir){
            this.applyDrift(pSet[i]);
        }else{
        //if(pSet[i].getParticle().mParallaxDir && !pSet[i].getParticle().mDriftDir){
            this.applySizeDelta(pSet[i]);
        }
    }
};
Fire.prototype.applyDrift = function(pGO){
    var p = pGO.getParticle();
    //var pPos = p.getPosition();
    //var xform = pGO.getXform();    
    pGO.setSizeDelta(.95);
    var pAccel = p.getAcceleration();
    if(Math.floor(Math.random()*2) === 0){
        //pPos[0] += .5;        
        p.setAcceleration([100,pAccel[1]]);
    }
    else{
        //pPos[0] -= .5;
        p.setAcceleration([-100,pAccel[1]]);
    }
};

Fire.prototype.applySizeDelta = function(pGO){
    var p = pGO.getParticle();
    var pAccel = p.getAcceleration();
    if(Math.floor(Math.random()*2) === 0){
        pGO.setSizeDelta(1.01);        
        p.setAcceleration([pAccel[0],pAccel[1]*.9]);
    }
    else{
        pGO.setSizeDelta(.99);
        var v2c = new vec2.fromValues((this.xPos-p.getXPos())*50,pAccel[1]);        
        p.setAcceleration(v2c);       
    }    
};