//File: Fire.js
/*jslint node: true, vars: true */
/*global gEngine, vec2, ParticleGameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

/**
 * Default Constructor
 * @param {struct} FireParams with xPos, yPos, width, yAcceleration, life, xVelocity, yVelocity, flicker, intensity, xAcceleration, size, yOffset, emberSelection, taperSelection FireParams struct holding specified parameter values
 * @returns {Fire} New instance of Fire object
 * @type Fire
 * @class Fire
 */
function Fire(FireParams){    
    this.xPos=FireParams.xPos;
    this.yPos=FireParams.yPos;
    this.width=FireParams.width;
    this.yAcceleration=FireParams.yAcceleration;
    this.life=FireParams.life;
    this.xVelocity=FireParams.xVelocity;
    this.yVelocity=FireParams.yVelocity;
    this.flicker=FireParams.flicker;
    this.intensity=FireParams.intensity;
    this.xAcceleration=FireParams.xAcceleration;
    this.size=FireParams.size;
    this.yOffset=FireParams.yOffset;   
    this.emberSelection = FireParams.emberSelection;
    this.taperSelection = FireParams.taperSelection;
    ParticleSystem.call(this, "assets/ParticleSystem/flameparticle.png", this.xPos, this.yPos, this.width, this.yAcceleration, this.life, this.xVelocity, this.yVelocity, this.flicker, this.intensity, this.xAcceleration, this.size, this.yOffset, [1,0,0,1], [3.5,.4,.3,.6], 1);
}
gEngine.Core.inheritPrototype(Fire,ParticleSystem);

/**
 * Parameter Struct
 * @param {float} xPos The x position for the fire
 * @param {float} yPos The y position for the fire
 * @param {float} width The maximum horizontal offset for the fire particles
 * @param {float} yAcceleration The vertical acceleration for the fire paritcles
 * @param {float} life The life for the fire particles
 * @param {float} xVelocity The initial horizontal boost for the fire particles
 * @param {float} yVelocity The initial vertical boost for the fire particles
 * @param {float} flicker How quickly particles shrink
 * @param {float} intensity The # of fire particles created per update cycle
 * @param {float} xAcceleration The horizontal acceleration for the fire particles
 * @param {float} size The size for the fire paritcles
 * @param {float} yOffset The maximum vertical offset for the fire particles
 * @param {float} emberSelection Percentage of particles to apply ember effect to
 * @param {float} taperSelection Percentage of particles to apply taper effect to
 * @returns {FireParams} New instance of FireParams struct, with defaults for non-specified values
 * @type struct
 */
FireParams = function(xPos, yPos, width, yAcceleration, life, xVelocity, yVelocity, flicker, intensity, xAcceleration, size, yOffset, emberSelection, taperSelection){
    this.xPos=xPos || 50;
    this.yPos=yPos || 10;
    this.width=width || 3;
    this.yAcceleration=yAcceleration || 2;
    this.life=life || 20;
    this.xVelocity=xVelocity || 0;
    this.yVelocity=yVelocity || 20;
    this.flicker=flicker || 3;
    this.intensity=intensity || 6;
    this.xAcceleration= xAcceleration || 0;
    this.size=size || 3.5;
    this.yOffset=yOffset || 0;
    this.emberSelection = emberSelection || 10;
    this.taperSelection = taperSelection || 0;
};

Fire.prototype.update = function(){
    for(var i=0; i<this.intensity; i++){
    var p = this.createParticle(this.xPos, this.yPos);
    this.mAllParticles.addToSet(p);
    }
    gEngine.ParticleSystem.update(this.mAllParticles);
    this.applyEmbers();
    this.applyTaper();
};

/**
 * Applies ember effect to selected particles 
 * @memberOf Fire
 */
Fire.prototype.applyEmbers = function(){
    var pSet = this.getSet().mSet;
    var setLength = pSet.length;    
    for (var i = 0; i < setLength; i++){
        var p = pSet[i].getParticle();
        if(p.mRotationVal < this.emberSelection){            
            pSet[i].setSizeDelta(.9);
            var pAccel = p.getAcceleration();
            if(Math.floor(Math.random()*2) === 0){
                p.setAcceleration([100,pAccel[1]]);        
            }
            else{        
                p.setAcceleration([-100,pAccel[1]]);
            }
        }
    }
};

/**
 * Applies taper effect to selected particles 
 * @memberOf Fire
 */
Fire.prototype.applyTaper = function(){
    var pSet = this.getSet().mSet;
    var setLength = pSet.length;    
    for (var i = 0; i < setLength; i++){
        var p = pSet[i].getParticle();
        if(p.mRotationVal >= (100 - this.taperSelection) && p.mRotationVal >= this.emberSelection){        
            var pAccel = p.getAcceleration();
            if(Math.floor(Math.random()*2) === 0){
                pSet[i].setSizeDelta(1.01);        
                p.setAcceleration([pAccel[0],pAccel[1]*.9]);
            }
            else{
                pSet[i].setSizeDelta(.99);
                var v2c = new vec2.fromValues((this.xPos-p.getXPos())*50,pAccel[1]);        
                p.setAcceleration(v2c);
            }
        }    
    }
};


/**
 * Adjust the percentage of particles with ember effect
 * @param {float} val inc how much to increment by
 * @memberOf Fire
 */
Fire.prototype.incEmberSelection = function(val){
    this.emberSelection += val;
    if(this.emberSelection < 0){
        this.emberSelection = 0;
    }
    if(this.emberSelection > 100){
        this.emberSelection = 100;
    }
};

/**
 * Adjust the percentage of particles with ember effect
 * @param {float} val inc how much to increment by
 * @memberOf Fire
 */
Fire.prototype.incTaperSelection = function(val){
    this.taperSelection += val;
    if(this.taperSelection < 0){
        this.taperSelection = 0;
    }
    if(this.taperSelection > 100){
        this.taperSelection = 100;
    }
};

/**
 * Get the percentage of particles with taper effect
 * @returns {float} this.emberSelection
 * @memberOf Fire
 */
Fire.prototype.getTaperSelection = function(){
    return this.taperSelection;
};
/**
 * Get the percentage of particles with taper effect
 * @returns {float} this.emberSelection
 * @memberOf Fire
 */
Fire.prototype.getEmberSelection = function(){
    return this.emberSelection;
};