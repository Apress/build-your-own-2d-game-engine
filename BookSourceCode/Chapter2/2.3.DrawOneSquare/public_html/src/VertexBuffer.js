/*
 * File: VertexBuffer.js
 *  
 * Support the loading of the buffer that contains vertex positions of a square 
 * onto the gGL context
 */

/*jslint node: true, vars: true */
/*global gGL: false, alert: false, loadAndCompileShader: false,
    document: false, Float32Array: false */
 /* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var gSquareVertexBuffer = null;
    // gGL reference to the vertex positions for the square

function initSquareBuffer() {
    // First: define the vertices for a square
    var verticesOfSquare = [
        0.5, 0.5, 0.0,
        -0.5, 0.5, 0.0,
        0.5, -0.5, 0.0,
        -0.5, -0.5, 0.0
    ];

    // Step A: Create a buffer on the gGL context for our vertex positions
    gSquareVertexBuffer = gGL.createBuffer();

    // Step B: Activate vertexBuffer
    gGL.bindBuffer(gGL.ARRAY_BUFFER, gSquareVertexBuffer);

    // Step C: Loads verticesOfSquare into the vertexBuffer
    gGL.bufferData(gGL.ARRAY_BUFFER, new Float32Array(verticesOfSquare), gGL.STATIC_DRAW);
}