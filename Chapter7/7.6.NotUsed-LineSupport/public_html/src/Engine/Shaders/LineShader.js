/* 
 * File: LineShader.js
 *          for debugging physics engine
 */
/*jslint node: true, vars: true */
/*global gEngine, SimpleShader */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

//<editor-fold desc="constructor">
// constructor of LineShader object
function LineShader(vertexShaderPath, fragmentShaderPath) {
    // Call sper class constructor
    SimpleShader.call(this, vertexShaderPath, fragmentShaderPath);  // call SimpleShader constructor

    this.mPointSizeRef = null;            // reference to the PointSize uniform
    var gl = gEngine.Core.getGL();

    // point size uniform
    this.mPointSizeRef = gl.getUniformLocation(this.mCompiledShader, "uPointSize");

    this.mPointSize = 1;
}
gEngine.Core.inheritPrototype(LineShader, SimpleShader);
//</editor-fold>

// <editor-fold desc="Public Methods">

// Activate the shader for rendering
LineShader.prototype.activateShader = function (pixelColor, aCamera) {
    // first call the super class's activate
    SimpleShader.prototype.activateShader.call(this, pixelColor, aCamera);

    // now our own functionality: enable texture coordinate array
    var gl = gEngine.Core.getGL();
    gl.uniform1f(this.mPointSizeRef, this.mPointSize);
    gl.bindBuffer(gl.ARRAY_BUFFER, gEngine.VertexBuffer.getGLLineVertexRef());
    gl.vertexAttribPointer(this.mShaderVertexPositionAttribute,
        3,              // each element is a 3-float (x,y.z)
        gl.FLOAT,       // data type is FLOAT
        false,          // if the content is normalized vectors
        0,              // number of bytes to skip in between elements
        0);

    gl.enableVertexAttribArray(this.mShaderVertexPositionAttribute);
};
LineShader.prototype.setPointSize = function (w) { this.mPointSize = w; };

//-- end of public methods
// </editor-fold>