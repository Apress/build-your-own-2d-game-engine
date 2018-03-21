/* 
 * David Watson
 * CSS 490C
 * 2D Game Engine Design
 * File: ShaderMaterial.js 
 * 
 * This defines the shader for implementing materials
 */

function ShaderMaterial(aIllumShader) {
    // reference to the normal map sampler
    var gl = gEngine.Core.getGL();
    this.mKaRef = gl.getUniformLocation(aIllumShader, "uMaterial.Ka");
    this.mKdRef = gl.getUniformLocation(aIllumShader, "uMaterial.Kd");
    this.mKsRef = gl.getUniformLocation(aIllumShader, "uMaterial.Ks");
    this.mShineRef = gl.getUniformLocation(aIllumShader, "uMaterial.Shininess");
}

ShaderMaterial.prototype.loadToShader = function (aMaterial) {
    var gl = gEngine.Core.getGL();
    gl.uniform4fv(this.mKaRef, aMaterial.getAmbient());
    gl.uniform4fv(this.mKdRef, aMaterial.getDiffuse());
    gl.uniform4fv(this.mKsRef, aMaterial.getSpecular());
    gl.uniform1f(this.mShineRef, aMaterial.getShininess());
};