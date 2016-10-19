/* 
 * File: Light.js
 * Defines a simple light source
 */


/*jslint node: true, vars: true, bitwise: true */
/*global vec3, vec4 */
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict";

// **** WARNING: The following enumerate values must be identical to 
// the values of
// 
//   ePointLight, eDirectionalLight, eSpotLight
//   
// defined in LightFS.glsl and IllumFS.glsl
Light.eLightType = Object.freeze({
    ePointLight: 0,
    eDirectionalLight: 1,
    eSpotLight: 2
});

// Constructor
function Light() {
    this.mColor = vec4.fromValues(1, 1, 1, 1);  // light color
    this.mPosition = vec3.fromValues(0, 0, 5); // light position in WC
    this.mDirection = vec3.fromValues(0, 0, -1); // in WC
    this.mNear = 5;  // effective radius in WC
    this.mFar = 10;
    this.mInner = 0.1;  // in radian
    this.mOuter = 0.3;
    this.mIntensity = 1;
    this.mDropOff = 1;  // 
    this.mLightType = Light.eLightType.ePointLight;
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

Light.prototype.setDirection = function (d) { this.mDirection = vec3.clone(d); };
Light.prototype.getDirection = function () { return this.mDirection; };

Light.prototype.setNear = function (n) { this.mNear = n; };
Light.prototype.getNear = function () { return this.mNear; };

Light.prototype.setFar = function (f) { this.mFar = f; };
Light.prototype.getFar = function () { return this.mFar; };

Light.prototype.setInner = function (r) { this.mInner = r; };
Light.prototype.getInner = function () { return this.mInner; };

Light.prototype.setOuter = function (r) { this.mOuter = r; };
Light.prototype.getOuter = function () { return this.mOuter; };

Light.prototype.setIntensity = function (i) { this.mIntensity = i; };
Light.prototype.getIntensity = function () { return this.mIntensity; };

Light.prototype.setDropOff = function (d) { this.mDropOff = d; };
Light.prototype.getDropOff = function () { return this.mDropOff; };

Light.prototype.setLightType = function (t) { this.mLightType = t; };
Light.prototype.getLightType = function () { return this.mLightType; };

Light.prototype.isLightOn = function () { return this.mIsOn; };
Light.prototype.setLightTo = function (on) { this.mIsOn = on; };

//</editor-fold>