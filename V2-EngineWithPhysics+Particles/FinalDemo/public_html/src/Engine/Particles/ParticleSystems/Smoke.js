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
 * @param {float} rVal red color value for smoke particle system
 * @param {float} gVal green color value for smoke particle system
 * @param {float} bVal blue color value for smoke particle system
 * @param {float} aVal alpha color value for smoke particle system
 * @param {float} colorShift value applied to RGB values for multi-colorizing effect
 * @returns {Smoke} New instance of Smoke object
 * @type Smoke
 * @class Smoke
 */
function Smoke(xPos, yPos, width, yAcceleration, life, xVelocity, yVelocity, flicker, intensity, xAcceleration, size, yOffset, rVal, gVal, bVal, aVal, colorShift){
    ParticleSystem.call(this, "assets/ParticleSystem/smokeparticle.png", xPos, yPos, width, yAcceleration, life, xVelocity, yVelocity, flicker, intensity, xAcceleration, size, yOffset, [0,0,0,1], [1,1,1,1], 1);
    this.setSizeBase(3.5);
    this.rVal = rVal;
    this.gVal = gVal;
    this.bVal = bVal;
    this.aVal = aVal;
    this.colorShift = colorShift;
};

gEngine.Core.inheritPrototype(Smoke,ParticleSystem);


SmokeParams = function(){
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

Smoke.prototype.update = function(){
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
        this.applyColor(pSet[i]);
    }
};

/**
 * Applies drift effect to particles
 * @param {Particle Game Object} pGO Particle object to apply drift effect to
 * @memberOf Smoke
 */
Smoke.prototype.applyDrift = function(pGO){
    var p = pGO.getParticle();
    var pAccel = p.getAcceleration();
    if(Math.floor(Math.random()*2) === 0){
        p.setAcceleration([pAccel[0]+.1,pAccel[1]]);
    }
    else{
        p.setAcceleration([pAccel[0]-.1,pAccel[1]]);
    }
};

/**
 * Applies new size delta to particles
 * @param {Particle Game Object} pGO Particle object to apply size delta effect to
 * @memberOf Smoke
 */
Smoke.prototype.applySizeDelta = function(pGO){
    var p = pGO.getParticle();
    if(p.mSpin1 || p.mSpin2){
        if(Math.floor(Math.random()*2) === 0){
            pGO.setSizeDelta(1.0125);
            pGO.getXform().incRotationByDegree(p.mRotationVal*.05);
        }
        else{
            pGO.setSizeDelta(.99);
            pGO.getXform().incRotationByDegree(p.mRotationVal*-.05);
        }    
    }
};

/**
 * Colorizes particles
 * @param {Particle Game Object} pGO Particle object to apply color effect to
 * @memberOf Smoke
 */
Smoke.prototype.applyColor = function(pGO){
    var p = pGO.getParticle();
    if(p.mSpin1)
        pGO.setFinalColor([this.rVal+this.colorShift,this.gVal+this.colorShift,this.bVal+this.colorShift,this.aVal]);
    if(p.mSpin2)
        pGO.setFinalColor([this.rVal+this.colorShift,this.gVal+this.colorShift,this.bVal-this.colorShift,this.aVal]);
    if(!p.mSpin1)
        pGO.setFinalColor([this.rVal+this.colorShift,this.gVal-this.colorShift,this.bVal-this.colorShift,this.aVal]);
    if(!p.mSpin2)
        pGO.setFinalColor([this.rVal-this.colorShift,this.gVal-this.colorShift,this.bVal-this.colorShift,this.aVal]);
};

/**
 * Adjust the red value of the system particles
 * @param {float} val inc how much to increment by
 * @memberOf Smoke
 */
Smoke.prototype.incRVal = function(val){
    this.rVal += (val);    
    if(this.rVal < 0){
        this.rVal = 0;
    }
    if(this.rVal > 1){
        this.rVal = 1;
    }
};

/**
 * Adjust the green value of the system particles
 * @param {float} val inc how much to increment by
 * @memberOf Smoke
 */
Smoke.prototype.incGVal = function(val){
    this.gVal += (val);    
    if(this.gVal < 0){
        this.gVal = 0;
    }
    if(this.gVal > 1){
        this.gVal = 1;
    }
};

/**
 * Adjust the blue value of the system particles
 * @param {float} val inc how much to increment by
 * @memberOf Smoke
 */
Smoke.prototype.incBVal = function(val){
    this.bVal += (val);    
    if(this.bVal < 0){
        this.bVal = 0;
    }
    if(this.bVal > 1){
        this.bVal = 1;
    }
};

/**
 * Adjust the alpha value of the system particles
 * @param {float} val inc how much to increment by
 * @memberOf Smoke
 */
Smoke.prototype.incAVal = function(val){
    this.aVal += (val);    
    if(this.aVal < 0){
        this.aVal = 0;
    }
    if(this.aVal > 1){
        this.aVal = 1;
    }
};

/**
 * Adjust the color shift value of the system
 * @param {float} val inc how much to increment by
 * @memberOf Smoke
 */
Smoke.prototype.incColorShift = function(val){
    this.colorShift += (val);    
    if(this.colorShift < 0){
        this.colorShift = 0;
    }
    if(this.colorShift > 1){
        this.colorShift = 1;
    }
};

/**
 * Get the R value of Particle Color
 * @returns {float} this.rVal
 * @memberOf Smoke
 */
Smoke.prototype.getRVal = function(){
  return this.rVal.toFixed(2);  
};
/**
 * Get the G value of Particle Color
 * @returns {float} this.gVal
 * @memberOf Smoke
 */
Smoke.prototype.getGVal = function(){
  return this.gVal.toFixed(2);  
};
/**
 * Get the B value of Particle Color
 * @returns {float} this.bVal
 * @memberOf Smoke
 */
Smoke.prototype.getBVal = function(){
  return this.bVal.toFixed(2);  
};
/**
 * Get the A value of Particle Color
 * @returns {float} this.aVal
 * @memberOf Smoke
 */
Smoke.prototype.getAVal = function(){
  return this.aVal.toFixed(2);  
};
/**
 * Get the color shifting value of the system
 * @returns {float} this.colorShift
 * @memberOf Smoke
 */
Smoke.prototype.getColorShift = function(){
  return this.colorShift.toFixed(2);  
};