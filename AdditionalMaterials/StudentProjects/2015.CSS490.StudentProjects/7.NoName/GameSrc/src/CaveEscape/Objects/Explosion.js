/* File: Explosion.js 
 *
 * Creates and initializes an Explosion
 * overrides the update funciton of GameObject to define
 * simple explosion behavior
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Explosion(particleTexture, atX, atY, duration, size, particleSet) {
    
    this.Texture = particleTexture;
    this.mX = atX;
    this.mY = atY;
    this.mDuration = duration;
    this.mSize = size;
    this.mParticleSet = particleSet;
    this.mExpired = false;
}
gEngine.Core.inheritPrototype(Explosion, GameObject);

Explosion.prototype.update = function (aCamera) {

    // Keep generating particles until the duration is completed
    if(this.mDuration > 0) {
        var p = this._createExplosionParticle();
        this.mParticleSet.addToSet(p);    
        this.mDuration--;
    }
    else {
        this.mExpired = true;
    }        
};

Explosion.prototype._createExplosionParticle = function() {
    
    var life = 5 + Math.random() * 20;
    var x = this.mX + (Math.random() * this.mSize - this.mSize / 2);
    var y = this.mY + (Math.random() * this.mSize - this.mSize / 2);
    
    var p = new ParticleGameObject(this.Texture, x, y, life, 0.1);
    p.getRenderable().setColor([1, 0, 0, 1]);
    
    // size of the particle
    var r = this.mSize + Math.random() * 0.5;
    p.getXform().setSize(r, r);
    
    // final color
    var fr = 3 + Math.random();
    var fg = 0.5 + Math.random();
    var fb = 0.5 + Math.random();
    p.setFinalColor([fr, fg, fb, 0.6]);
    
    // size delta
    p.setSizeDelta(0.98);
    
    return p;
};

Explosion.prototype.setExpired = function() {
    this.mExpired = true;
};

Explosion.prototype.hasExpired = function() {
    return this.mExpired;
};