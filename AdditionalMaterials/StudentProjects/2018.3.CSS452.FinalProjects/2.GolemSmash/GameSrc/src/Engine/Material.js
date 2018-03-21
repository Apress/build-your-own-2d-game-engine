/*
 * File: Material.js
 * Simple Phong illumination model material: Ka, Kd, KS, and Shininess.
 */

/*jslint node: true, vars: true */
/*global gEngine, vec4 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

/**
 * Default Constructor
 * @memberOf Material
 * @returns {Material} new instance of Material
 */
function Material() {
    this.mKa = vec4.fromValues(0.0, 0.0, 0.0, 0);
    this.mKs = vec4.fromValues(0.2, 0.2, 0.2, 1);
    this.mKd = vec4.fromValues(1.0, 1.0, 1.0, 1);
    this.mShininess = 20;
}

//<editor-fold desc="Public Methods">
//**-----------------------------------------
// Public methods
//**-----------------------------------------
/**
 * Set the ambient value of the material.
 * @memberOf Material
 * @param {vec4} a new abient value of material
 * @returns {void}
 */
Material.prototype.setAmbient = function (a) { this.mKa = vec4.clone(a); };

/**
 * Return the ambient value of the material
 * @memberOf Material
 * @returns {vec4} ambient value of the material
 */
Material.prototype.getAmbient = function () { return this.mKa; };

/**
 * Set the diffuse value of the material
 * @memberOf Material
 * @param {vec4} d new diffuse value of material
 * @returns {void}
 */
Material.prototype.setDiffuse = function (d) { this.mKd = vec4.clone(d); };

/**
 * Return the diffuse value of the material
 * @memberOf Material
 * @returns {vec4} diffuse value of the material
 */
Material.prototype.getDiffuse = function () { return this.mKd; };

/**
 * Set the specular value of the material
 * @memberOf Material
 * @param {vec4} s new specular value of material
 * @returns {void}
 */
Material.prototype.setSpecular = function (s) { this.mKs = vec4.clone(s); };

/**
 * Return the specular value of the material
 * @memberOf Material
 * @returns {vec4} specular value of material
 */
Material.prototype.getSpecular = function () { return this.mKs; };

/**
 * Set the shininess value of the material
 * @memberOf Material
 * @param {Number} s new shininess value of material
 * @returns {Number}
 */
Material.prototype.setShininess = function (s) { this.mShininess = s; };

/**
 * Return shininess value of the material
 * @memberOf Material
 * @returns {Number} shininess value of material
 */
Material.prototype.getShininess = function () { return this.mShininess; };
//--- end of Public Methods

//</editor-fold>