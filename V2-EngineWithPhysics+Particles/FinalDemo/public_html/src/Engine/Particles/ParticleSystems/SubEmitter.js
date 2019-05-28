//File: SubEmitter.js
/*jslint node: true, vars: true */
/*global gEngine, vec2, ParticleGameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

/**
 * Default Constructor
 * @param (png)   MainParticleTexture texture for main emitter particles
 * @param (png)   SubParticleTexture texture for sub emitter particles
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
 * @param (color) startColor Starting color of main emitter particles
 * @param (color) finalColor Final color of main emitter particles
 * @param (color) subStartColor Starting color of sub emitter particles
 * @param (color) subFinalColor Final color of sub emitter particles
 * @param (bool)  physInherit Bool indicating whether or not subparticles inherit velocity/acceleration
 * @param (float) subParticleLife Life value in frames for subparticles
 * * @param (float) subParticleSizeDelta sizeDelta value to be applied to subparticles
 * @returns {SubEmitter} New instance of SubEmitter object
 * @type SubEmitter
 * @class SubEmitter
 */
function SubEmitter(MainParticleTexture, SubParticleTexture, xPos, yPos, width, yAcceleration, life, xVelocity, yVelocity, flicker, intensity, xAcceleration, size, yOffset, startColor, finalColor, subStartColor, subFinalColor, physInherit, subParticleLife, subParticleSizeDelta){
    ParticleSystem.call(this, MainParticleTexture, xPos, yPos, width, yAcceleration, life, xVelocity, yVelocity, flicker, intensity, xAcceleration, size, yOffset, startColor, finalColor, 1);
    this.mSubParticles = new ParticleGameObjectSet();
    this.SubParticleTexture = SubParticleTexture;
    this.subStartColor = subStartColor;
    this.subFinalColor = subFinalColor;
    this.physInherit = physInherit;
    this.subParticleLife = subParticleLife;
    this.subParticleSizeDelta = subParticleSizeDelta;
    this.mTimer = 60;
    
};
gEngine.Core.inheritPrototype(SubEmitter,ParticleSystem);

/*
 * Parameter Struct
 */
SubEmitterParams = function(){
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

SubEmitter.prototype.update = function(){
    this.mTimer--;
    if(this.mTimer < this.intensity ){
    //for(var i=0; i<this.intensity; i++){
    var p = this.createParticle(this.xPos, this.yPos);
    this.mAllParticles.addToSet(p);
    this.mTimer = 60;
    }
    gEngine.ParticleSystem.update(this.mAllParticles);
    gEngine.ParticleSystem.update(this.mSubParticles);
    this.handleSubEmissions();
};

/**
 * Draws the particles on the camera passed in the argument
 * @param {Camera} aCamera the camera to be viewed on
 * @memberOf ParticleSystem
 */
SubEmitter.prototype.draw = function(aCamera){
    this.mAllParticles.draw(aCamera);
    this.mSubParticles.draw(aCamera);
};

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
        
//    var p = new ParticleGameObject("assets/ParticleSystem/shock2.png", atX, atY, 10);
//    p.getRenderable().setColor([1, 1, 1, 1]);    
//    // size of the particle
//    var r = 1;
//    p.getXform().setSize(r, r);    
//    p.getParticle().setVelocity([0, 0]);
//    p.getParticle().setAcceleration([0,0]);
//    // size delta
//    p.setSizeDelta(.99);
//    this.mSubParticles.addToSet(p);
};