/*
 * File: WebGL.js 
 * Javascript source code for our project.
 */

/* The following two lines of comment are directions for jsLint 
 *      jslint: defines jsLint checking options, 
 *              e.g., "node: true" says "use strict" will be applied to the entire file.
 *      global: tells jsLint which are the defined global variables
 *              e.g., "document: false" says "document" is a defined global variable
 */
/*jslint node: true, vars: true, evil: true */
/*global initSquareBuffer: false, initSimpleShader: false, document: false,
    gSimpleShader: false, gShaderVertexPositionAttribute: false*/
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var gGL = null;
    // The GL context upon which we will access web-GL functionality
    // Convention: global variable names: gName


// Initialize the webGL by binding the functionality to the gGL variable
function initializeGL() {
    // the "GLCanvas" defined in the index.html file
    var canvas = document.getElementById("GLCanvas");

    // Get standard webgl, or experimental
    // binds webgl to the Canvas area on the web-page to the global variable "gGL"
    gGL = canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");

    if (gGL !== null) {
        gGL.clearColor(0.0, 0.8, 0.0, 1.0);  // set the color to be cleared

        // 1. initialize the buffer with the vertex positions for the unit square
        initSquareBuffer(); // This function is defined in the VertexBuffer.js file

        // 2. now load and compile the vertex and fragment shaders
        initSimpleShader("VertexShader", "FragmentShader");
                // the two shaders are defined in the index.html file
                // InitSimpleShader() function is defined in ShaderSupport.js file

    } else {
        document.write("<br><b>WebGL is not supported!</b>");
    }
}


// Clears the draw area and draws one square
function drawSquare() {
    gGL.clear(gGL.COLOR_BUFFER_BIT);      // clear to the color previously set

    // Step A: Enable the shader to use
    gGL.useProgram(gSimpleShader);

    // Step B. Enables the vertex position attribute
    gGL.enableVertexAttribArray(gShaderVertexPositionAttribute);

    // Step C. draw with the above settings
    gGL.drawArrays(gGL.TRIANGLE_STRIP, 0, 4);
}

// this is the function that will cause the WebGL drawing
function doGLDraw() {
    initializeGL();     // Binds gGL context to WebGL functionality
    drawSquare();       // Clears the GL area and draws one square
}