/* 
 * File: SimpleShader.js
 * Subclass from UnlitShader
 * Implements a SimpleShader object.
 * 
 */

/*jslint node: true, vars: true */
/*global gEngine: false, alert: false, XMLHttpRequest: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

//<editor-fold desc="constructor">
/**
 * constructor of SimpleShader object.
 * @class SimpleShader
 * @param {string} vertexShaderPath filepath of the Vertex Shader.
 * @param {string} fragmentShaderPath filepath of the Fragment Shader.
 * @returns {SimpleShader} An intsnace of SimpleShader.
 */
function SimpleShader(vertexShaderPath, fragmentShaderPath) {
    // Call super class constructor
    UnlitShader.call(this, vertexShaderPath, fragmentShaderPath);  // call UnlitShader constructor
    
    this.mGlobalAmbientColor = null; // refrence to the globalAmbientColor uniform in the fragment shader.
    this.mGlobalAmbientIntensity = null; // refrence to the globalAmbientIntensity uniform in the fragment shader.

    var gl = gEngine.Core.getGL();

    this.mGlobalAmbientColor = gl.getUniformLocation(this.mCompiledShader, "uGlobalAmbientColor");
    this.mGlobalAmbientIntensity = gl.getUniformLocation(this.mCompiledShader, "uGlobalAmbientIntensity");
}

// get all the prototype functions from UnlitShader
gEngine.Core.inheritPrototype(SimpleShader, UnlitShader);

//</editor-fold>

// <editor-fold desc="Public Methods">

/**
 * Activate the shader for rendering.
 * @memberOf SimpleShader
 * @param {float[]} pixelColor [R, G, B, A] Sets the shader pixel color.
 * @param {Camera} aCamera Camera to draw to
 * @returns {void}
 */
SimpleShader.prototype.activateShader = function (pixelColor, aCamera) {
    UnlitShader.prototype.activateShader.call(this, pixelColor, aCamera);
    
    var gl = gEngine.Core.getGL();
    gl.uniform4fv(this.mGlobalAmbientColor, gEngine.DefaultResources.getGlobalAmbientColor());
    gl.uniform1f(this.mGlobalAmbientIntensity, gEngine.DefaultResources.getGlobalAmbientIntensity())
};

//-- end of public methods
//</editor-fold>