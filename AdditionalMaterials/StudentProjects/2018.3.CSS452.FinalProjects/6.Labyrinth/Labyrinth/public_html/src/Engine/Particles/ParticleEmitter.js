/* 
 * File: ParticleEmitter.js
 * 
 */

/*jslint node: true, vars:true , white: true*/
/*global gEngine, vec2, ParticleGameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

/**
 * Default Constructor<p>
 * 
 * @param {vec2} pos Position of Emitter
 * @param {Number} num Number of particles to be emitted
 * @param {function} createrFunc Creater Function
 * @returns {ParticleEmitter} New instance of ParticleEmitter
 * @class ParticleEmitter
 */
function ParticleEmitter(pos, num, createrFunc) {
    // Smallest number of particle emitted per cycle
    this.kMinToEmit = 5;

    // Emitter position
    this.mEmitPosition = pos;   // this can be a reference to a xform.mPosition

    // Number of particles left to be emitted
    this.mNumRemains = num;
    
    this.mParticleCreator = createrFunc;
}
ParticleEmitter.prototype.expired = function () { return (this.mNumRemains <= 0); };

ParticleEmitter.prototype.emitParticles = function (pSet) {
    var numToEmit = 0;
    if (this.mNumRemains < this.kMinToEmit) {
        // If only a few are left, emits all of them
        numToEmit = this.mNumRemains;
    } else  {
        // Otherwise, emits about 20% of what's left
        numToEmit = Math.random() * 0.2 * this.mNumRemains;
    }
    // Left for future emitting.                            
    this.mNumRemains -= numToEmit;
    var i, p;
    for (i = 0; i < numToEmit; i++) {
        p = this.createParticle(this.mEmitPosition[0], this.mEmitPosition[1]);
        pSet.addToSet(p);
    }
};

ParticleEmitter.prototype.createParticle = function(atX, atY) {
    //var life = 30 + Math.random() * 200; //original
    var life = 30 + Math.random() * 10;//new
    var p = new ParticleGameObject("assets/particle.png", atX, atY, life);
    p.getRenderable().setColor([1, 0, 0, 1]);
    //p.getRenderable().setColor([1, 0, 1, .1]);
    
    // size of the particle
    var r = 3.5 + Math.random() * 2.5;
    p.getXform().setSize(r, r);
    
    // final color
    var fr = 3.5 + Math.random();
    var fg = 0.4 + 0.1 * Math.random();
    var fb = 0.3 + 0.1 * Math.random();
    p.setFinalColor([fr, fg, fb, 0.6]);
    //p.setFinalColor([1, 1, 1 ,1]);
    
    //velocity on the particle
    //var fx = 10 * Math.random() - 20 * Math.random();
    //var fy = 10 * Math.random();
    //p.getPhysicsComponent().setVelocity([fx, fy]);
    
    // size delta
    p.setSizeDelta(0.98);
    
    return p;
};