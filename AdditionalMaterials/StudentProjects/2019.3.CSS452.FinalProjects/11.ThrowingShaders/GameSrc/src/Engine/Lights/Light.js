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
    this.mRadius = 10;  // effective radius in WC
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

Light.prototype.setRadius = function (r) { this.mRadius = r; };
Light.prototype.getRadius = function () { return this.mRadius; };

Light.prototype.setLightTo = function (isOn) { this.mIsOn = isOn; };
Light.prototype.isLightOn = function () { return this.mIsOn; };

//</editor-fold>