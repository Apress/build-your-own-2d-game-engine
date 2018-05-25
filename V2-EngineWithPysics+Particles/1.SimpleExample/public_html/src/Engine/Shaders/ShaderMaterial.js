/* 
 * File: ShaderMaterial.js
 * Knows how to load aMaterial into the IllumShader
 * Rederences point to uMaterial.
 */

/*jslint node: true, vars: true */
/*global gEngine, vec4 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

//<editor-fold desc="constructor">
/**
 * Default Constructor<p>
 * Knows how to load aMaterial into the IllumShader<p>
 * Rederences point to uMaterial.
 * @param {IllumShader} aIllumShader shader to load material into
 * @returns {ShaderMaterial} new instance of ShaderMaterial
 * @class ShaderMaterial
 */
function ShaderMaterial(aIllumShader) {
    // reference to the normal map sampler
    var gl = gEngine.Core.getGL();
    this.mKaRef = gl.getUniformLocation(aIllumShader, "uMaterial.Ka");
    this.mKdRef = gl.getUniformLocation(aIllumShader, "uMaterial.Kd");
    this.mKsRef = gl.getUniformLocation(aIllumShader, "uMaterial.Ks");
    this.mShineRef = gl.getUniformLocation(aIllumShader, "uMaterial.Shininess");
}
//</editor-fold>

// <editor-fold desc="Public Methods">
/**
 * Loads material onto the shader
 * @param {Material} aMaterial Material to load into shader
 * @returns {void}
 * @memberOf ShaderMaterial
 */
ShaderMaterial.prototype.loadToShader = function (aMaterial) {
    var gl = gEngine.Core.getGL();
    gl.uniform4fv(this.mKaRef, aMaterial.getAmbient());
    gl.uniform4fv(this.mKdRef, aMaterial.getDiffuse());
    gl.uniform4fv(this.mKsRef, aMaterial.getSpecular());
    gl.uniform1f(this.mShineRef, aMaterial.getShininess());
};
//</editor-fold>