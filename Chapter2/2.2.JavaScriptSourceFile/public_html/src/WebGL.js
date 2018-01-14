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
/*global document: false */
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
        gGL.clearColor(0.9, 0.9, 0.9, 1.0);  // set the color to be cleared    
    } else {
        document.write("<br><b>WebGL is not supported!</b>");
    }
}

// Clears the gGL area to the defined color
function clearCanvas() {
    gGL.clear(gGL.COLOR_BUFFER_BIT);      // clear to the color previously set
}

// this is the function that will cause the WebGL drawing
function doGLDraw() {
    initializeGL();   // Binds gGL context to WebGL functionality
    clearCanvas();    // Clears the GL area
}