//File: Snow.js
/*jslint node: true, vars: true */
/*global gEngine, vec2, ParticleGameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

/**
 * Default Constructor
 * @param {SnowParams} SnowParams with xPos, yPos, width, yAcceleration, life, xVelocity, yVelocity, flicker, intensity, xAcceleration, size, yOffset
 * @returns {Snow} New instance of Snow object
 * @type Snow
 * @class Snow
 */
function Snow(SnowParams){
    this.xPos=SnowParams.xPos;
    this.yPos=SnowParams.yPos;
    this.width=SnowParams.width;
    this.yAcceleration=SnowParams.yAcceleration;
    this.life=SnowParams.life;
    this.xVelocity=SnowParams.xVelocity;
    this.yVelocity=SnowParams.yVelocity;
    this.flicker=SnowParams.flicker;
    this.intensity=SnowParams.intensity;
    this.xAcceleration=SnowParams.xAcceleration;
    this.size=SnowParams.size;
    this.yOffset=SnowParams.yOffset;   
    ParticleSystem.call(this, "assets/ParticleSystem/snowparticle.png", this.xPos, this.yPos, this.width, this.yAcceleration, this.life, this.xVelocity, this.yVelocity, this.flicker, this.intensity, this.xAcceleration, this.size, this.yOffset, [.6,.6,.6,1], [.6,.6,.6,1], -1);    
}

gEngine.Core.inheritPrototype(Snow,ParticleSystem);

/**
 * Parameter Struct
 * @param {float} xPos The x position for the snow
 * @param {float} yPos The y position for the snow
 * @param {float} width The maximum horizontal offset for the snow particles
 * @param {float} yAcceleration The vertical acceleration for the snow paritcles
 * @param {float} life The life for the snow particles
 * @param {float} xVelocity The initial horizontal boost for the snow particles
 * @param {float} yVelocity The initial vertical boost for the snow particles
 * @param {float} flicker How quickly particles shrink
 * @param {float} intensity The # of snow particles created per update cycle
 * @param {float} xAcceleration The horizontal acceleration for the snow particles
 * @param {float} size The size for the snow paritcles
 * @param {float} yOffset The maximum vertical offset for the snow particles
 * @returns {SnowParams} New instance of snow parameters struct, with defaults for non-specified values
 * @type struct
 */
SnowParams = function(xPos, yPos, width, yAcceleration, life, xVelocity, yVelocity, flicker, intensity, xAcceleration, size, yOffset){
    this.xPos=xPos||50;
    this.yPos=yPos||80;
    this.width=width||50;
    this.yAcceleration=yAcceleration||5;
    this.life=life||140;
    this.xVelocity=xVelocity||0;
    this.yVelocity=yVelocity||0;
    this.flicker=flicker||0;
    this.intensity=intensity||3;
    this.xAcceleration=xAcceleration||0;
    this.size=size||-0.5;
    this.yOffset=yOffset||0;
};

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
    if(dist % (Math.floor(Math.random()*5)) < 0.1){
        var test = Math.floor(Math.random()*2);
        if(test)
            p.mDriftDir = !p.mDriftDir;
    }
    if(p.mDriftDir){        
        p.setAcceleration([pAccel[0]+.025,pAccel[1]]);
    }
    else{        
        p.setAcceleration([pAccel[0]-.025,pAccel[1]]);
    }
    if(p.mParallaxDir === 0){
        pGO.setSizeDelta(1.0005);
        p.setAcceleration([p.getAcceleration()[0],pAccel[1]-0.01]);
        pGO.getXform().setZPos(5);
    }
    if(p.mParrallaxDir === 2){
        pGO.setSizeDelta(.999);
        p.setAcceleration([p.getAcceleration()[0],pAccel[1]+.01]);
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
