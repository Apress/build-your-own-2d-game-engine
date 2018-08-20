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
/**
 * Light type enum
 * @type {enum|eLightType}
 * @memberOf Light
 */
Light.eLightType = Object.freeze({
    ePointLight: 0,
    eDirectionalLight: 1,
    eSpotLight: 2
});

// Constructor
/**
 * Default Constructor<p>
 * Defines a simple light source
 * @returns {Light} New instance of Light
 * @class Light
 */
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
    this.mCastShadow = false;
}

//<editor-fold desc="public functions">
// simple setters and getters
/**
 * Set the light color
 * @param {Float[]} c color of light [R, G, B, A]
 * @returns {void}
 * @memberOf Light
 */
Light.prototype.setColor = function (c) { this.mColor = vec4.clone(c); };

/**
 * Return the color of light
 * @returns {Float[]} color of light [R, G, B, A]
 * @memberOf Light
 */
Light.prototype.getColor = function () { return this.mColor; };

/**
 * Set the 2D position of the light in World Coordinate
 * @param {Float[]} p 2D position {X, Y]
 * @returns {void}
 * @memberOf Light
 */
Light.prototype.set2DPosition = function (p) { this.mPosition = vec3.fromValues(p[0], p[1], this.mPosition[2]); };

/**
 * Set the X position of the light
 * @param {Float} x position of light
 * @returns {void}
 * @memberOf Light
 */
Light.prototype.setXPos = function (x) { this.mPosition[0] = x; };

/**
 * Set the Y position of the light
 * @param {Float} y position of light
 * @returns {void}
 * @memberOf Light
 */
Light.prototype.setYPos = function (y) { this.mPosition[1] = y; };

/**
 * Set the Z position of the light
 * @param {Float} z position of light
 * @returns {void}
 * @memberOf Light
 */
Light.prototype.setZPos = function (z) { this.mPosition[2] = z; };

/**
 * Return the position of the light
 * @returns {vec3} position of light [X, Y, Z]
 * @memberOf Light
 */
Light.prototype.getPosition = function () { return this.mPosition; };

/**
 * Set the direction of the light
 * @param {vec3} d direction vector [X, Y, Z]
 * @returns {void}
 * @memberOf Light
 */
Light.prototype.setDirection = function (d) { this.mDirection = vec3.clone(d); };

/**
 * Get the direction of the light
 * @returns {vec3} direction vector of light [X, Y, Z]
 * @memberOf Light
 */
Light.prototype.getDirection = function () { return this.mDirection; };

/**
 * Set near distance. Anything less than this distance is illuminated
 * @param {Number} n new Near distance
 * @returns {void}
 * @memberOf Light
 */
Light.prototype.setNear = function (n) { this.mNear = n; };

/**
 * Return near distance
 * @returns {Number} Current near distance
 * @memberOf Light
 */
Light.prototype.getNear = function () { return this.mNear; };

/**
 * Set far distance. Anything farther than distance will not be illuminated by this light
 * @param {Number} f new far distance
 * @returns {void}
 * @memberOf Light
 */
Light.prototype.setFar = function (f) { this.mFar = f; };

/**
 * Return far distance
 * @returns {Number} Current far distance
 * @memberOf Light
 */
Light.prototype.getFar = function () { return this.mFar; };

/**
 * Set the inner cone angle of the spot light. less than inner angle is illuminated
 * @param {Number} r new inner angle
 * @returns {void}
 * @memberOf Light
 */
Light.prototype.setInner = function (r) { this.mInner = r; };

/**
 * Return Inner cone angle of spotlight
 * @returns {Number} Current inner spotlight cone angle
 * @memberOf Light
 */
Light.prototype.getInner = function () { return this.mInner; };

/**
 * Set the outer cone angle of the spot light. greater than outter angle is not illuminated
 * @param {Number} r new outer angle
 * @returns {void}
 * @memberOf Light
 */
Light.prototype.setOuter = function (r) { this.mOuter = r; };

/**
 * Return outer cone angle of spotlight
 * @returns {Number} Current outer spotlight cone angle
 * @memberOf Light
 */
Light.prototype.getOuter = function () { return this.mOuter; };

/**
 * Set the Intensity of the light.
 * @param {Number} i new Intensity value
 * @returns {void}
 * @memberOf Light
 */
Light.prototype.setIntensity = function (i) { this.mIntensity = i; };

/**
 * Return the Intensity of the light
 * @returns {Number} Current Intensity value
 * @memberOf Light
 */
Light.prototype.getIntensity = function () { return this.mIntensity; };

/**
 * Set how quickly does light intensity drops off between inner/outer, Near/Far, 
 * a larger Drop off number results in “softer/smoother” transition 
 * from full illumination to no illumination
 * @param {Number} d new DropOff value
 * @returns {void}
 * @memberOf Light
 */
Light.prototype.setDropOff = function (d) { this.mDropOff = d; };

/**
 * Return dropoff value
 * @returns {Number} Current DropOff value
 * @memberOf Light
 */
Light.prototype.getDropOff = function () { return this.mDropOff; };

/**
 * Set the Light type
 * @param {enum|eLightType} t light type
 * @returns {void}
 * @memberOf Light
 */
Light.prototype.setLightType = function (t) { this.mLightType = t; };

/**
 * Return the current light type
 * @returns {enum|eLightType} current Light Type
 * @memberOf Light
 */
Light.prototype.getLightType = function () { return this.mLightType; };

/**
 * Return the Light on state
 * @returns {Boolean} true if light is on
 * @memberOf Light
 */
Light.prototype.isLightOn = function () { return this.mIsOn; };

/**
 * Set the light on state
 * @param {Boolean} on state to set light on
 * @returns {void}
 * @memberOf Light
 */
Light.prototype.setLightTo = function (on) { this.mIsOn = on; };

/**
 * Return the current state of light casting shadow
 * @returns {Boolean} true if light is casting shadow
 * @memberOf Light
 */
Light.prototype.isLightCastShadow = function () { return this.mCastShadow; };

/**
 * Set the light to cast shadows
 * @param {Boolean} on state to set casting of shadows
 * @returns {void}
 * @memberOf Light
 */
Light.prototype.setLightCastShadowTo = function (on) { this.mCastShadow = on; };

//</editor-fold>