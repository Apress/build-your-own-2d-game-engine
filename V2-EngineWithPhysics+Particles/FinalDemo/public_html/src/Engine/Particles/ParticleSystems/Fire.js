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
 * @param {float} emberSelection Percentage of particles to apply ember effect to
 * @param {float} taperSelection Percentage of particles to apply taper effect to
 * @returns {Fire} New instance of Fire object
 * @type Fire
 * @class Fire
 */
function Fire(xPos, yPos, width, yAcceleration, life, xVelocity, yVelocity, flicker, intensity, xAcceleration, size, yOffset, emberSelection, taperSelection){
    ParticleSystem.call(this, "assets/ParticleSystem/flameparticle.png", xPos, yPos, width, yAcceleration, life, xVelocity, yVelocity, flicker, intensity, xAcceleration, size, yOffset, [1,0,0,1], [3.5,.4,.3,.6], 1);
    this.setSizeBase(3.5);
    this.xPos=xPos;
    this.yPos=yPos;
    this.width=width;
    this.yAcceleration=yAcceleration;
    this.life=life;
    this.xVelocity=xVelocity;
    this.yVelocity=yVelocity;
    this.flicker=flicker;
    this.intensity=intensity;
    this.xAcceleration=xAcceleration;
    this.size=size;
    this.yOffset=yOffset;   
    this.emberSelection = emberSelection;
    this.taperSelection = taperSelection;
}
gEngine.Core.inheritPrototype(Fire,ParticleSystem);

/*
 * Parameter Struct
 */
FireParams = function(){
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
    this.emberSelection = 25;
    this.taperSelection = 25;
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