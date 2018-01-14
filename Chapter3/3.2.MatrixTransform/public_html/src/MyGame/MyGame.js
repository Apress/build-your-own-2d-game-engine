/*
 * File: MyGame.js 
 * This is the logic of our game. For now, this is very simple.
 */
/*jslint node: true, vars: true */
/*global gEngine: false, SimpleShader: false, Renderable: false, mat4: false, vec3: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame(htmlCanvasID) {
    // Step A: Initialize the webGL Context
    gEngine.Core.initializeWebGL(htmlCanvasID);

    // Step B: Create the shader
    this.mConstColorShader = new SimpleShader(
        "src/GLSLShaders/SimpleVS.glsl",      // Path to the VertexShader 
        "src/GLSLShaders/SimpleFS.glsl");     // Path to the Simple FragmentShader

    // Step C: Create the Renderable objects:
    this.mWhiteSq = new Renderable(this.mConstColorShader);
    this.mWhiteSq.setColor([1, 1, 1, 1]);
    this.mRedSq = new Renderable(this.mConstColorShader);
    this.mRedSq.setColor([1, 0, 0, 1]);

    // Step D: Draw!
    gEngine.Core.clearCanvas([0, 0.8, 0, 1]);  // 1. Clear the canvas

    // create a new identity transform operator
    var xform = mat4.create();

    // Step E: compute the white square transform 
    mat4.translate(xform, xform, vec3.fromValues(-0.25, 0.25, 0.0));
    mat4.rotateZ(xform, xform, 0.2); // rotation is in radian
    mat4.scale(xform, xform, vec3.fromValues(1.2, 1.2, 1.0));
    // Step F: draw the white square with the computed transform
    this.mWhiteSq.draw(xform);

    // Step G: compute the red square transform
    mat4.identity(xform); // restart
    mat4.translate(xform, xform, vec3.fromValues(0.25, -0.25, 0.0));
    mat4.rotateZ(xform, xform, -0.785); // rotation is in radian (about -45-degree)
    mat4.scale(xform, xform, vec3.fromValues(0.4, 0.4, 1.0));
    // Step H: draw the red square with the computed transform
    this.mRedSq.draw(xform);
}