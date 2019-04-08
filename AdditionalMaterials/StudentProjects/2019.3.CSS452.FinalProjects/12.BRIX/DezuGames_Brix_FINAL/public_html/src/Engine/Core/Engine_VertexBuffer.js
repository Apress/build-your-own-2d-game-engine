/*
 * File: EngineCore_VertexBuffer.js
 *  
 * defines the object that supports the loading and using of the buffer that 
 * contains vertex positions of a square onto the gGL context
 * 
 * Notice, this is a singleton object.
 */

/*jslint node: true, vars: true */
/*global Float32Array */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var gEngine = gEngine || { };

// The VertexBuffer object
gEngine.VertexBuffer = (function () {
    // reference to the vertex positions for the different buffers
    var mShapeVertexBuffer = null;
    
    // reference to the texture positions for the square vertices in the gl context
    var mLineVertexBuffer = null;
    
    // reference to the texture positions for the square vertices in the gl context
    var mTextureCoordBuffer = null;

    var verticesOfTriangle = [
        0.0, 1.0, 0.0,
        -0.5, 0.0, 0.0,
        0.5, 0.0, 0.0
    ];
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
    
     // this is to support the debugging of physics engine
    var verticesOfLine = [
        0.5, 0.5, 0.0,
        -0.5, -0.5, 0.0
    ];
    
    // define enum for different shape types
    var kShapeType = {
         Square: 1,
        Triangle: 2
    };
    var vertices = [verticesOfSquare, verticesOfTriangle];
    
    // returns the starting index to use when drawing a specific shape
    var getShapeBufferStart = function (shape) {
        switch(shape) {
            case kShapeType.Square: // first shape in buffer
            default:
                return 0;
                break;
            case kShapeType.Triangle: // second shape in buffer
                return getShapeVerticesCount(kShapeType.Square);
                break;
        }
    };
    
    // returns the amount of vertices used for this shape
    var getShapeVerticesCount = function (shape) {
        switch(shape) {
            case kShapeType.Triangle:
                return 3;
            case kShapeType.Square:
                default:
                return 4;
        }   
    };    

    var initialize = function () {
        var gl = gEngine.Core.getGL();

        // <editor-fold desc="Step A: Allocate and store vertex positions into the webGL context">
        // Create a buffer on the gGL context for our vertex positions
        mShapeVertexBuffer = gl.createBuffer();

        // Activate vertexBuffer
        gl.bindBuffer(gl.ARRAY_BUFFER, mShapeVertexBuffer);

        // Loads verticesOfSquare into the vertexBuffer
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([].concat.apply([], 
            vertices)), gl.STATIC_DRAW);
        //<editor-fold>

        // <editor-fold desc="Step  B: Allocate and store texture coordinates">
        // Create a buffer on the gGL context for our vertex positions
        mTextureCoordBuffer = gl.createBuffer();

        // Activate vertexBuffer
        gl.bindBuffer(gl.ARRAY_BUFFER, mTextureCoordBuffer);

        // Loads verticesOfSquare into the vertexBuffer
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
        // </editor-fold>
        
        // <editor-fold desc="Step A: Allocate and store vertex positions into the webGL context">
        // Create a buffer on the gGL context for our vertex positions
        mLineVertexBuffer = gl.createBuffer();

        // Connect the vertexBuffer to the ARRAY_BUFFER global gl binding point.
        gl.bindBuffer(gl.ARRAY_BUFFER, mLineVertexBuffer);

        // Put the verticesOfSquare into the vertexBuffer, as non-changing drawing data (STATIC_DRAW)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfLine), gl.STATIC_DRAW);
        //<editor-fold>
    };

    /**
     * Return reference to the vertex positions for the square in the gl context
     * @memberOf gEngine.VertexBuffer
     * @returns {VertexBuffer}
     */
    var getGLShapeVertexRef = function () { return mShapeVertexBuffer; };
    
    /**
     * Return reference to the texture positions for the square vertices in the gl context
     * @memberOf gEngine.VertexBuffer
     * @returns {CoordinateBuffer}
     */
    var getGLTexCoordRef = function () { return mTextureCoordBuffer; };
    
    /**
     * Return reference to the texture positions for the square vertices in the gl context
     * @memberOf gEngine.VertexBuffer
     * @returns {VertexBuffer}
     */
    var getGLLineVertexRef = function () { return mLineVertexBuffer; };

    var cleanUp = function () {
        var gl = gEngine.Core.getGL();
        gl.deleteBuffer(mShapeVertexBuffer);
        gl.deleteBuffer(mTextureCoordBuffer);
    };

    var mPublic = {
        initialize: initialize,
        getGLVertexRef: getGLShapeVertexRef,
        getGLLineVertexRef: getGLLineVertexRef,
        getGLTexCoordRef: getGLTexCoordRef,
        getShapeBufferStart: getShapeBufferStart,
        getShapeVerticesCount: getShapeVerticesCount,
        shapeType: kShapeType,
        cleanUp: cleanUp
    };

    return mPublic;
}());