/* 
 * File: Particle.js
 * Defines a particle
 */

/*jslint node: true, vars:true , white: true*/
/*global gEngine, vec2, LineRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

function Particle(pos) {
    this.kPadding = 0.5;   // for drawing particle bounds
    
    this.mPosition = pos;  // this is likely to be a reference to xform.mPosition
    this.mVelocity = vec2.fromValues(0, 0);
    this.mAcceleration = gEngine.Particle.getSystemtAcceleration();
    this.mDrag = 0.95; 
    
    this.mPositionMark = new LineRenderable();
    this.mDrawBounds = false;
}

Particle.prototype.draw = function (aCamera) {
    if (!this.mDrawBounds) {
        return;
    }
    alert("Draw particle");
    //calculation for the X at the particle position
    var x = this.mPosition[0];
    var y = this.mPosition[1];

    this.mPositionMark.setFirstVertex(x - this.kPadding, y + this.kPadding);  //TOP LEFT
    this.mPositionMark.setSecondVertex(x + this.kPadding, y - this.kPadding); //BOTTOM RIGHT
    this.mPositionMark.draw(aCamera);

    this.mPositionMark.setFirstVertex(x + this.kPadding, y + this.kPadding);  //TOP RIGHT
    this.mPositionMark.setSecondVertex(x - this.kPadding, y - this.kPadding); //BOTTOM LEFT
    this.mPositionMark.draw(aCamera);
};

Particle.prototype.update = function () {
    var dt = gEngine.GameLoop.getUpdateIntervalInSeconds();
    
    // Symplectic Euler
    //    v += a * dt
    //    x += v * dt
    var p = this.getPosition();
    //vec2.scaleAndAdd(this.mVelocity, this.mVelocity, this.mAcceleration, dt);
    vec2.scale(this.mVelocity, this.mVelocity, this.mDrag);
    vec2.scaleAndAdd(p, p, this.mVelocity, dt);
};

Particle.prototype.setColor = function (color) {
    this.mPositionMark.setColor(color);
};
Particle.prototype.getColor = function () { return this.mPositionMark.getColor(); };
Particle.prototype.setDrawBounds = function(d) { this.mDrawBounds = d; };
Particle.prototype.getDrawBounds = function() { return this.mDrawBounds; };

Particle.prototype.setPosition = function (xPos, yPos) { this.setXPos(xPos); this.setYPos(yPos); };
Particle.prototype.getPosition = function () { return this.mPosition; };
Particle.prototype.getXPos = function () { return this.mPosition[0]; };
Particle.prototype.setXPos = function (xPos) { this.mPosition[0] = xPos; };
Particle.prototype.getYPos = function () { return this.mPosition[1]; };
Particle.prototype.setYPos = function (yPos) { this.mPosition[1] = yPos; };
Particle.prototype.setVelocity = function (f) { this.mVelocity = f; };
Particle.prototype.getVelocity = function () { return this.mVelocity; };
Particle.prototype.setAcceleration = function (g) { this.mAcceleration = g; };
Particle.prototype.getAcceleration = function () { return this.mAcceleration; };
Particle.prototype.setDrag = function (d) { this.mDrag = d; };
Particle.prototype.getDrag = function () { return this.mDrag; };

var createParticleProjectile = function(atX, atY, owner) {
    var life = 10 + Math.random() * 100;
    var p = new ParticleGameObject("assets/particle.png", atX, atY, life);
    p.getRenderable().setColor([1, 0, 0, 1]);
    
    // size of the particle
    var r = 75 + Math.random() * 25;
    p.getXform().setSize(r, r);
    
    // final color
    //alert(obj instanceof Projectile);
    if (owner instanceof StarFighter) {
        var fr = 3.5 + Math.random();
        var fg = 0.4 + 0.1 * Math.random();
        var fb = 0.3 + 0.1 * Math.random();
    }
    if (owner instanceof Enemy_Turret) {
        var fr = 0.4 + 0.1 * Math.random();
        var fg = 3.5 + Math.random();
        var fb = 0.3 + 0.1 * Math.random();
    }
    if (owner instanceof Boss) {
        var fr = 0.4 + 0.1 * Math.random();
        var fg = 0.3 + 0.1 * Math.random();
        var fb = 3.5 + Math.random();
    }
    p.setFinalColor([fr, fg, fb, 0.6]);
    // velocity on the particle
    var fx = 200 * Math.random() - 200 * Math.random();
    var fy = 200 * Math.random() - 200 * Math.random();
    p.getPhysicsComponent().setVelocity([fx, fy]);
    
    // size delta
    p.setSizeDelta(0.98);
    
    return p;
};

var createParticleBoss = function(atX, atY) {
    var life = 100 + Math.random() * 500;
    var p = new ParticleGameObject("assets/particle.png", atX, atY, life);
    p.getRenderable().setColor([1, 0, 0, 1]);
    
    // size of the particle
    var r = 100 + Math.random() * 40;
    p.getXform().setSize(r, r);
    
    // final color
    var fr = 3.5 + Math.random();
    var fg = 0.4 + 0.1 * Math.random();
    var fb = 0.3 + 0.1 * Math.random();
    p.setFinalColor([fr, fg, fb, 0.6]);
    // velocity on the particle
    var fx = 2000 * Math.random() - 2000 * Math.random();
    var fy = 2000 * Math.random() - 2000 * Math.random();
    p.getPhysicsComponent().setVelocity([fx, fy]);
    
    // size delta
    p.setSizeDelta(0.98);
    
    return p;
};

var createParticleWithVelocity = function(atX, atY, obj) {
    var life = 30 + Math.random() * 200;
    var p = new ParticleGameObject("assets/particle.png", atX, atY, life);
    p.getRenderable().setColor([1, 0, 0, 1]);
    
    // size of the particle
    var r = 75 + Math.random() * 25;
    p.getXform().setSize(r, r);
    
    // final color
    var fr = 3.5 + Math.random();
    var fg = 0.4 + 0.1 * Math.random();
    var fb = 0.3 + 0.1 * Math.random();
    p.setFinalColor([fr, fg, fb, 0.6]);
    // velocity on the particle
    var fx = 200 * Math.random() - 200 * Math.random() + obj.getCurrentFrontDir()[0] * 400;
    var fy = 200 * Math.random() - 200 * Math.random() + obj.getCurrentFrontDir()[1] * 400;
    p.getPhysicsComponent().setVelocity([fx, fy]);
    
    // size delta
    p.setSizeDelta(0.98);
    
    return p;
};