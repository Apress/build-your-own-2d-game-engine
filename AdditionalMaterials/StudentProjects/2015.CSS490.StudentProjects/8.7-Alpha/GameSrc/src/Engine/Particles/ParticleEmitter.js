/* 
 * David Watson
 * CSS 490C
 * 2D Game Engine Design
 * File: ParticleEmitter.js 
 * 
 * This file defines an object that represents a particle
 * emitter for emitting particles over time
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
    } else {
        // Otherwise, emits about 20% of what's left
        numToEmit = Math.random() * 0.2 * this.mNumRemains;
    }
    // Left for future emitting.
    this.mNumRemains -= numToEmit;
    var i, p;
    for (i = 0; i < numToEmit; i++) {
        p = this.mParticleCreator(this.mEmitPosition[0], this.mEmitPosition[1]);
        pSet.addToSet(p);
    }
};