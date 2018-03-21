/* 
 * File: Particle.js
 * Defines a particle
 */

/*jslint node: true, vars:true , white: true*/
/*global gEngine, vec2, LineRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

/**
 * Default Constructor<p>
 * Defines a particle
 * @param {vec2} pos Position of particle
 * @returns {Particle} New instance of Particle
 * @class Particle
 */
function Particle(pos) {
    this.kPadding = 0.5;   // for drawing particle bounds
    
    this.mPosition = pos;  // this is likely to be a reference to xform.mPosition
    this.mVelocity = vec2.fromValues(0, 0);
    this.mAcceleration = gEngine.Particle.getSystemtAcceleration();
    this.mDrag = 0.95; 
    
    this.mPositionMark = new LineRenderable();
    this.mDrawBounds = false;
}

/**
 * Draw function called by GameLoop
 * @param {Camera} aCamera Camera to draw too
 * @returns {void}
 * @memberOf Particle
 */
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

/**
/**
 * Update Function called by GameLoop
 * @returns {void}
 * @memberOf Particle
 */
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

/**
 * Set the particle Color
 * @param {Float[]} color new color of particle [R, G, B, A]
 * @returns {void}
 * @memberOf Particle
 */
Particle.prototype.setColor = function (color) {
    this.mPositionMark.setColor(color);
};

/**
 * Return the current color of the particle
 * @returns {Float[]} current color [R, G, B, A]
 * @memberOf Particle
 */
Particle.prototype.getColor = function () { return this.mPositionMark.getColor(); };

/**
 * Set the bound drawing state
 * @param {Boolean} d true if bounds are to be drawn
 * @returns {void}
 * @memberOf Particle
 */
Particle.prototype.setDrawBounds = function(d) { this.mDrawBounds = d; };

/**
 * Returns the bound drawing state
 * @returns {Boolean} true of bounds are drawn
 * @memberOf Particle
 */
Particle.prototype.getDrawBounds = function() { return this.mDrawBounds; };

/**
 * Set new position
 * @param {Number} xPos New X position
 * @param {Number} yPos New Y position
 * @returns {void}
 * @memberOf Particle
 */
Particle.prototype.setPosition = function (xPos, yPos) { this.setXPos(xPos); this.setYPos(yPos); };

/**
 * Return current position
 * @returns {vec2} current position of particle [X, Y]
 * @memberOf Particle
 */
Particle.prototype.getPosition = function () { return this.mPosition; };

/**
 * Return the X position
 * @returns {Number} current X position
 * @memberOf Particle
 */
Particle.prototype.getXPos = function () { return this.mPosition[0]; };

/**
 * Set the X position
 * @param {Number} xPos new X position
 * @returns {void}
 * @memberOf Particle
 */
Particle.prototype.setXPos = function (xPos) { this.mPosition[0] = xPos; };

/**
 * Return the Y position
 * @returns {Number} current Y position
 * @memberOf Particle
 */
Particle.prototype.getYPos = function () { return this.mPosition[1]; };

/**
 * Set the Y position
 * @param {Number} yPos new Y position
 * @returns {void}
 * @memberOf Particle
 */
Particle.prototype.setYPos = function (yPos) { this.mPosition[1] = yPos; };

/**
 * Set Velocity
 * @param {vec2} f new Velocity [X, Y]
 * @returns {void}
 * @memberOf Particle
 */
Particle.prototype.setVelocity = function (f) { this.mVelocity = f; };

/**
 * Return Velocity
 * @returns {vec2} current Velocity [X, Y]
 * @memberOf Particle
 */
Particle.prototype.getVelocity = function () { return this.mVelocity; };

/**
 * Set Acceleration
 * @param {Float[]} g new Acceleration [X, Y]
 * @returns {undefined}
 * @memberOf Particle
 */
Particle.prototype.setAcceleration = function (g) { this.mAcceleration = g; };

/**
 * Return Acceleration
 * @returns {Float[]} current Acceleration [X, Y]
 * @memberOf Particle
 */
Particle.prototype.getAcceleration = function () { return this.mAcceleration; };

/**
 * Set Drag
 * @param {Number} d new Drag value
 * @returns {void}
 * @memberOf Particle
 */
Particle.prototype.setDrag = function (d) { this.mDrag = d; };

/**
 * Return Drag
 * @returns {Number} current drag value
 * @memberOf Particle
 */
Particle.prototype.getDrag = function () { return this.mDrag; };
