/* 
 * David Watson
 * CSS 490C
 * 2D Game Engine Design
 * File: Engine_VertexBuffer.js 
 * 
 * The file that contains the definition of our vertex buffer
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var gEngine = gEngine || { };

// The VertexBuffer object
gEngine.VertexBuffer = (function () {
    // reference to the vertex positions for the square in the gl context
    var mSquareVertexBuffer = null;

    // reference to the texture positions for the square vertices in the gl context
    var mTextureCoordBuffer = null;
    
    // First: define the vertices for a square
    var verticesOfSquare = [
        0.5, 0.5, 0.0,
        -0.5, 0.5, 0.0,
        0.5, -0.5, 0.0,
        -0.5, -0.5, 0.0
    ];
    
    // Second: define the corresponding texture coordinates
    var textureCoordinates = [
        1.0, 1.0,
        0.0, 1.0,
        1.0, 0.0,
        0.0, 0.0
    ];
    
    var verticesOfLine = [
        0.5, 0.5, 0.0,
        -0.5, -0.5, 0.0
    ];
    // reference to the texture positions for the square vertices in the gl context
    
    var mLineVertexBuffer = null;

    var initialize = function () {
        var gl = gEngine.Core.getGL();

        // Step A: Create a buffer on the gGL context for our vertex positions
        mSquareVertexBuffer = gl.createBuffer();

        // Activate vertexBuffer
        gl.bindBuffer(gl.ARRAY_BUFFER, mSquareVertexBuffer);

        // Loads verticesOfSquare into the vertexBuffer
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfSquare), gl.STATIC_DRAW);
        
        // Step B: Allocate and store texture coordinates
        // Create a buffer on the gGL context for our vertex positions 
        mTextureCoordBuffer = gl.createBuffer();
         
        // Activate vertexBuffer
        gl.bindBuffer(gl.ARRAY_BUFFER, mTextureCoordBuffer);
        
        // Loads verticesOfSquare into the vertexBuffer
        gl.bufferData(gl.ARRAY_BUFFER,
            new Float32Array(textureCoordinates), gl.STATIC_DRAW);
            
        // Step C: Create a buffer on the gGL context for our vertex positions
        mLineVertexBuffer = gl.createBuffer();

        // Connect the vertexBuffer to the ARRAY_BUFFER global gl binding point.
        gl.bindBuffer(gl.ARRAY_BUFFER, mLineVertexBuffer);

        // Put the verticesOfLine into the vertexBuffer, as non-changing drawing data (STATIC_DRAW)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfLine), gl.STATIC_DRAW);
    };

    var getGLVertexRef = function () { return mSquareVertexBuffer; };
    var getGLTexCoordRef = function() { return mTextureCoordBuffer; };
    var getGLLineVertexRef = function () { return mLineVertexBuffer; };
    
    var cleanUp = function () {
        var gl = gEngine.Core.getGL();
        gl.deleteBuffer(mSquareVertexBuffer);
        gl.deleteBuffer(mTextureCoordBuffer);
    };
    
    var mPublic = {
        initialize: initialize,
        getGLVertexRef: getGLVertexRef, 
        getGLTexCoordRef: getGLTexCoordRef,
        getGLLineVertexRef: getGLLineVertexRef,
        cleanUp: cleanUp
    };

    return mPublic;
}());