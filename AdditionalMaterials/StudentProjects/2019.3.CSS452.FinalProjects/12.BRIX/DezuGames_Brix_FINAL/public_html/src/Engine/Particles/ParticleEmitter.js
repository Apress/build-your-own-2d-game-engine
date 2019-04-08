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
 * @type ParticleEmitter
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
/**
 * Checks to see if the emitter has spawnned all of the 
 * @returns {Boolean} Whether all the particles has ben emitted
 * @memberOf ParticleEmitter
 */
ParticleEmitter.prototype.expired = function () { return (this.mNumRemains <= 0); };
/**
 * Emits particles and adds them to the particle set being passed
 * @param {ParticleGameObjectSet} pSet The ParticleGameObjectSet to add the particles to
 * @memberOf ParticleEmitter
 */
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
        p = this.mParticleCreator(this.mEmitPosition[0], this.mEmitPosition[1]);
        pSet.addToSet(p);
    }
};
