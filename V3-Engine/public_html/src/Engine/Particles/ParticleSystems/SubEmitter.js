//File: SubEmitter.js
/*jslint node: true, vars: true */
/*global gEngine, vec2, ParticleGameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

/**
 * Default Constructor
 * @param {SubEmitterParams} SubEmitterParams struct
 * @returns {SubEmitter} New instance of SubEmitter object
 * @type SubEmitter
 * @class SubEmitter
 */
function SubEmitter(SubEmitterParams){
    this.MainParticleTexture = SubEmitterParams.MainParticleTexture;
    this.SubParticleTexture = SubEmitterParams.SubParticleTexture;
    this.xPos=SubEmitterParams.xPos;
    this.yPos=SubEmitterParams.yPos;
    this.width=SubEmitterParams.width;
    this.yAcceleration=SubEmitterParams.yAcceleration;
    this.life=SubEmitterParams.life;
    this.xVelocity=SubEmitterParams.xVelocity;
    this.yVelocity=SubEmitterParams.yVelocity;
    this.flicker=SubEmitterParams.flicker;
    this.intensity=SubEmitterParams.intensity;
    this.xAcceleration=SubEmitterParams.xAcceleration;
    this.size=SubEmitterParams.size;
    this.yOffset=SubEmitterParams.yOffset;
    this.startColor=SubEmitterParams.startColor;
    this.finalColor=SubEmitterParams.finalColor;
    this.subStartColor=SubEmitterParams.subStartColor;
    this.subFinalColor=SubEmitterParams.subFinalColor;
    this.physInherit=SubEmitterParams.physInherit;
    this.subParticleLife=SubEmitterParams.subParticleLife;
    this.subParticleSizeDelta=SubEmitterParams.subParticleSizeDelta;
    ParticleSystem.call(this, this.MainParticleTexture, this.xPos, this.yPos, this.width, this.yAcceleration, this.life, this.xVelocity, this.yVelocity, this.flicker, this.intensity, this.xAcceleration, this.size, this.yOffset, this.startColor, this.finalColor, 1);
    this.mSubParticles = new ParticleGameObjectSet();    
    this.mTimer = 60;
    
};
gEngine.Core.inheritPrototype(SubEmitter,ParticleSystem);

/**
 * Parameter Struct
 * @param {png}   MainParticleTexture texture for main emitter particles
 * @param {png}   SubParticleTexture texture for sub emitter particles
 * @param {float} xPos The x position for the main emitter
 * @param {float} yPos The y position for the main emitter
 * @param {float} width The maximum horizontal offset for the main emitter particles
 * @param {float} yAcceleration The vertical acceleration for the main emitter paritcles
 * @param {float} life The life for the main emitter particles
 * @param {float} xVelocity The initial horizontal boost for the main emitter particles
 * @param {float} yVelocity The initial vertical boost for the main emitter particles
 * @param {float} flicker How quickly particles shrink
 * @param {float} intensity The # of main emitter particles created per update cycle
 * @param {float} xAcceleration The horizontal acceleration for the main emitter paritcles
 * @param {float} size The size for the main emitter paritcles
 * @param {float} yOffset The maximum vertical offset for the main emitter paritcles
 * @param {color} startColor Starting color of main emitter particles
 * @param {color} finalColor Final color of main emitter particles
 * @param {color} subStartColor Starting color of sub emitter particles
 * @param {color} subFinalColor Final color of sub emitter particles
 * @param {bool}  physInherit Bool indicating whether or not subparticles inherit velocity/acceleration
 * @param {float} subParticleLife Life value in frames for subparticles
 * @param {float} subParticleSizeDelta sizeDelta value to be applied to subparticles
 * @returns {SubEmitterParams} New instance of SubEmitter struct object
 */
SubEmitterParams = function(MainParticleTexture, SubParticleTexture, xPos, yPos, width, yAcceleration, life, xVelocity, yVelocity, flicker, intensity, xAcceleration, size, yOffset, startColor, finalColor, subStartColor, subFinalColor, physInherit, subParticleLife, subParticleSizeDelta){
    this.MainParticleTexture = MainParticleTexture||"assets/Smoke/target.png";
    this.SubParticleTexture = SubParticleTexture||"assets/ParticleSystem/shock2.png";
    this.xPos=xPos||50;
    this.yPos=yPos||5;
    this.width=width||0;
    this.yAcceleration=yAcceleration||1;
    this.life=life||100;
    this.xVelocity=xVelocity||0;
    this.yVelocity=yVelocity||0;
    this.flicker=flicker||0;
    this.intensity=intensity||60;
    this.xAcceleration=xAcceleration||0;
    this.size=size||1;
    this.yOffset=yOffset||0;
    this.startColor=startColor||[1,1,1,1];
    this.finalColor=finalColor||[1,1,1,1];
    this.subStartColor=subStartColor||[1,1,1,1];
    this.subFinalColor=subFinalColor||[1,1,1,1];
    this.physInherit=physInherit||false;
    this.subParticleLife=subParticleLife||100;
    this.subParticleSizeDelta=subParticleSizeDelta||1.01;
};

SubEmitter.prototype.update = function(){
    this.mTimer--;
    if(this.mTimer < this.intensity ){
    var p = this.createParticle(this.xPos, this.yPos);
    this.mAllParticles.addToSet(p);
    this.mTimer = 60;
    }
    gEngine.ParticleSystem.update(this.mAllParticles);
    gEngine.ParticleSystem.update(this.mSubParticles);
    this.handleSubEmissions();
};

/**
 * Draws the particles on the camera passed in the argument for both main and sub particles
 * @param {Camera} aCamera the camera to be viewed on
 * @memberOf ParticleSystem
 */
SubEmitter.prototype.draw = function(aCamera){
    this.mAllParticles.draw(aCamera);
    this.mSubParticles.draw(aCamera);
};

/**
 * Checks for main particle death condition 
 * @memberOf SubEmitter
 */
SubEmitter.prototype.handleSubEmissions = function(){
    var pSet = this.getSet().mSet;
    var setLength = pSet.length;
    for (var i = 0; i < setLength; i++){        
        if (pSet[i].mCyclesToLive < 1)
            var p = pSet[i].getParticle();
            if (p !== undefined){
                this.createSubParticle(p.mPosition[0],p.mPosition[1],p);
        }
    }
};

/**
 * Instantiates subparticles
 * @param {float} atX X position of particle to be created
 * @param {float} atY Y position of particle to be created
 * @param (particle) mP main particle reference to inherit physics from
 * @memberOf ParticleSystem
 */
SubEmitter.prototype.createSubParticle = function(atX, atY, mP){
    var p = new ParticleGameObject(this.SubParticleTexture, atX, atY, this.subParticleLife);
    p.mDeltaColor = this.subStartColor;
    p.setFinalColor(this.subFinalColor);
    
    // size of the particle
    var r = 1;
    p.getXform().setSize(r, r);
    p.getXform().incRotationByDegree(Math.random()*360);        
    p.getParticle().setVelocity([0, 0]);
    p.getParticle().setAcceleration([0,0]);
    if(this.physInherit){
        var inheritedVel = mP.getVelocity();
        var inheritedAcc = mP.getAcceleration();
        p.getParticle().setVelocity(inheritedVel);
        p.getParticle().setAcceleration(inheritedAcc);
    }
    // size delta
    p.setSizeDelta(this.subParticleSizeDelta);    
    this.mSubParticles.addToSet(p);        
};

/**
 * Adjust whether subparticle inherits main particle's physics
 * @memberOf SubEmitter
 */
SubEmitter.prototype.setPhysInherit = function(){
    this.physInherit = !this.physInherit;
};

/**
 * Adjust subparticle life value
 * @param {float} val inc how much to increment by
 * @memberOf SubEmitter
 */
SubEmitter.prototype.setSubParticleLife = function(val){
    this.subParticleLife += val;
};

/**
 * Adjust subparticle sizeDelta value
 * @param {float} val inc how much to increment by
 * @memberOf SubEmitter
 */
SubEmitter.prototype.setSubParticleSizeDelta = function(val){
    this.subParticleSizeDelta += val;
};

/**
 * Get the state of subparticle physical inheritance
 * @returns {bool} this.physInherit
 * @memberOf SubEmitter
 */
SubEmitter.prototype.getPhysInherit = function(){
    return this.physInherit;
};

/**
 * Get the subparticle life value
 * @returns {float} this.subParticleLife
 * @memberOf SubEmitter
 */
SubEmitter.prototype.getSubParticleLife = function(){
    return this.subParticleLife;
};

/**
 * Get the subparticle size delta value
 * @returns {float} this.subParticleSizeDelta
 * @memberOf SubEmitter
 */
SubEmitter.prototype.getSubParticleSizeDelta = function(){
    return this.subParticleSizeDelta.toFixed(2);
};