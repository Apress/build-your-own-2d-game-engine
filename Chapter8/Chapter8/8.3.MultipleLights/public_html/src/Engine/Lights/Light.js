/* 
 * File: Light.js
 * Defines a simple light source
 */

/*jslint node: true, vars: true, bitwise: true */
/*global vec3, vec4 */
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict";

// Constructor
function Light() {
    this.mColor = vec4.fromValues(0.1, 0.1, 0.1, 1);  // light color
    this.mPosition = vec3.fromValues(0, 0, 5); // light position in WC
    this.mNear = 5;  // effective distance in WC
    this.mFar = 10;  // within near is full on, outside far is off
    this.mIntensity = 1;
    this.mIsOn = true;
}

//<editor-fold desc="public functions">
// simple setters and getters
Light.prototype.setColor = function (c) { this.mColor = vec4.clone(c); };
Light.prototype.getColor = function () { return this.mColor; };

Light.prototype.set2DPosition = function (p) { this.mPosition = vec3.fromValues(p[0], p[1], this.mPosition[2]); };
Light.prototype.setXPos = function (x) { this.mPosition[0] = x; };
Light.prototype.setYPos = function (y) { this.mPosition[1] = y; };
Light.prototype.setZPos = function (z) { this.mPosition[2] = z; };
Light.prototype.getPosition = function () { return this.mPosition; };

Light.prototype.setNear = function (r) { this.mNear = r; };
Light.prototype.getNear = function () { return this.mNear; };

Light.prototype.setFar = function (r) { this.mFar = r; };
Light.prototype.getFar = function () { return this.mFar; };

Light.prototype.setIntensity = function (i) { this.mIntensity = i; };
Light.prototype.getIntensity = function () { return this.mIntensity; };

Light.prototype.setLightTo = function (on) { this.mIsOn = on; };
Light.prototype.isLightOn = function () { return this.mIsOn; };

//</editor-fold>