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
    vec2.scaleAndAdd(this.mVelocity, this.mVelocity, this.mAcceleration, dt);
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
