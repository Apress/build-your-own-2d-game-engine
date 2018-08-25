/*
 * File: ParticleRenderable.js
 *  
 * ParticleRenderable specifically for particles (additive blending)
 */
/*jslint node: true, vars: true, white: true */
/*global gEngine, TextureRenderable, Renderable */
/* find out more about jslint: http://www.jslint.com/help.html */

// Constructor and object definition
"use strict";  // Operate in Strict mode such that variables must be declared before used!

/**
 * ParticleRenderable specifically for particles (additive blending)
 * @param {Texture} myTexture Texture to be associated by object.
 * @returns {ParticleRenderable} new instance of ParticleRenderable
 * @class ParticleRenderable
 */
function ParticleRenderable(myTexture) {
    TextureRenderable.call(this, myTexture);
    Renderable.prototype._setShader.call(this, gEngine.DefaultResources.getParticleShader());
}
gEngine.Core.inheritPrototype(ParticleRenderable, TextureRenderable);