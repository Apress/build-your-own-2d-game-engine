/*
 * File: Renderable.js
 *  
 * Encapsulate the Shader and VertexBuffer into the same object (and will include
 * other attributes later) to represent a Renderable object on the game screen.
 */
/*jslint node: true, vars: true */
/*global gEngine: false, Transform: false */
/* find out more about jslint: http://www.jslint.com/help.html */

// Constructor and object definition
"use strict";  // Operate in Strict mode such that variables must be declared before used!

/**
 * Default Constructor.<p>
 * Default Constructor creates an instance of Renderable.<p>
 * Encapsulate the Shader and VertexBuffer into the same object (and will include<p>
 * other attributes later) to represent a Renderable object on the game screen.<p>
 * @class Renderable
 * @returns {Renderable} a new instance of Renderable.
 */
function Renderable() {
    this.mShader = gEngine.DefaultResources.getConstColorShader();  // this is the default
    this.mXform = new Transform(); // transform that moves this object around
    this.mColor = [1, 1, 1, 1];    // color of pixel
}

//<editor-fold desc="Public Methods">
//**-----------------------------------------
// Public methods
//**-----------------------------------------

/**
 * Draws the Renderable to the screen in the aCamera viewport.
 * @memberOf Renderable
 * @param {Camera} aCamera Camera object to draw to.
 * @returns {void}
 */
Renderable.prototype.draw = function (aCamera) {
    var gl = gEngine.Core.getGL();
    this.mShader.activateShader(this.mColor, aCamera);  // always activate the shader first!
    this.mShader.loadObjectTransform(this.mXform.getXform());
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

/**
 * Update function called on Gameloop
 * @memberOf Renderable
 * @returns {void}
 */
Renderable.prototype.update = function () {};

/**
 * Returns the Renderable's Transform.
 * @memberOf Renderable
 * @returns {Transform} the Transform of the Renderable.
 */
Renderable.prototype.getXform = function () { return this.mXform; };

/**
 * Sets the Color of the Renderable.
 * @memberOf Renderable
 * @param {float[]} color The desired Color of the Renderable.
 * @returns {void}
 */
Renderable.prototype.setColor = function (color) { this.mColor = color; };

/**
 * Gets the Color of the Renderable.
 * @memberOf Renderable
 * @returns {float[]} The color of the Renderable.
 */
Renderable.prototype.getColor = function () { return this.mColor; };
//--- end of Public Methods
//</editor-fold>

/**
 * Swap the Renderable's Shader.<p>
 * Sets the Renderable's shader and returns the previous shader.
 * @memberOf Renderable
 * @param {Shader} s Shader to set for the Renderable.
 * @returns {SimpleShader} The Renderable's current Shader.
 */
Renderable.prototype.swapShader = function (s) {
    var out = this.mShader;
    this.mShader = s;
    return out;
};

/**
 * Sets the Renderable's Shader
 * @memberOf Renderable
 * @param {SimpleShader} s Shader to set for the Renderable
 * @returns {void}
 */
Renderable.prototype._setShader = function (s) { this.mShader = s; };
