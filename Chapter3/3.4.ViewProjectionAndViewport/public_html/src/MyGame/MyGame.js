/*
 * File: MyGame.js 
 * This is the logic of our game. For now, this is very simple.
 */
/*jslint node: true, vars: true */
/*global gEngine: false, SimpleShader: false, Renderable: false, mat4: false, vec3: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame(htmlCanvasID) {
    // variables of the shader for drawing: one shader to be shared by two renderables
    this.mConstColorShader = null;

    // variables for the squares
    this.mBlueSq = null;        // these are the Renderable objects
    this.mRedSq = null;

    // Step A: Initialize the webGL Context
    gEngine.Core.initializeWebGL(htmlCanvasID);
    var gl = gEngine.Core.getGL();

    // Step B: Create the shader
    this.mConstColorShader = new SimpleShader(
        "src/GLSLShaders/SimpleVS.glsl",      // Path to the VertexShader 
        "src/GLSLShaders/SimpleFS.glsl");    // Path to the simple FragmentShader

    // Step C: Create the Renderable objects:
    this.mBlueSq = new Renderable(this.mConstColorShader);
    this.mBlueSq.setColor([0.25, 0.25, 0.95, 1]);
    this.mRedSq = new Renderable(this.mConstColorShader);
    this.mRedSq.setColor([1, 0.25, 0.25, 1]);
    this.mTLSq = new Renderable(this.mConstColorShader);
    this.mTLSq.setColor([0.9, 0.1, 0.1, 1]);
    this.mTRSq = new Renderable(this.mConstColorShader);
    this.mTRSq.setColor([0.1, 0.9, 0.1, 1]);
    this.mBRSq = new Renderable(this.mConstColorShader);
    this.mBRSq.setColor([0.1, 0.1, 0.9, 1]);
    this.mBLSq = new Renderable(this.mConstColorShader);
    this.mBLSq.setColor([0.1, 0.1, 0.1, 1]);

    // Step D: Clear the entire canvas first
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1]);   // Clear the canvas

    //<editor-fold desc="Step E: Setting up Viewport">
    // Step E1: Set up the viewport: area on canvas to be drawn
    gl.viewport(
        20,     // x position of bottom-left corner of the area to be drawn
        40,     // y position of bottom-left corner of the area to be drawn
        600,    // width of the area to be drawn
        300);     // height of the area to be drawn

    // Step E2: set up the corresponding scissor area to limit clear area
    gl.scissor(
        20,     // x position of bottom-left corner of the area to be drawn
        40,     // y position of bottom-left corner of the area to be drawn
        600,    // width of the area to be drawn
        300);    // height of the area to be drawn

    // Step E3: enable the scissor area, clear, and then disable the scissor area
    gl.enable(gl.SCISSOR_TEST);
    gEngine.Core.clearCanvas([0.8, 0.8, 0.8, 1.0]);  // clear the scissor area
    gl.disable(gl.SCISSOR_TEST);
    //</editor-fold>

    //<editor-fold desc="Step F: Set up View and Projection matrices">
    var viewMatrix = mat4.create();
    var projMatrix = mat4.create();
    // Step F1: define the view matrix
    mat4.lookAt(viewMatrix,
        [20, 60, 10],   // camera position
        [20, 60, 0],    // look at position
        [0, 1, 0]);     // orientation 
    // Step F2: define the projection matrix
    mat4.ortho(projMatrix,
        -10,     // distance to left of WC
         10,     // distance to right of WC
        -5,      // distance to bottom of WC
         5,      // distance to top of WC
         0,      // distance to near plane 
         1000);  // distance to far plane 

    // Step F3: concatenate to form the View-Projection operator
    var vpMatrix = mat4.create();
    mat4.multiply(vpMatrix, projMatrix, viewMatrix);
    // </editor-fold>

    // Step G: Draw the blue square
    // Centre Blue, slightly rotated square
    this.mBlueSq.getXform().setPosition(20, 60);
    this.mBlueSq.getXform().setRotationInRad(0.2); // In Radians
    this.mBlueSq.getXform().setSize(5, 5);
    this.mBlueSq.draw(vpMatrix);

    // Step H: Draw the center and the corner squares
    // centre red square
    this.mRedSq.getXform().setPosition(20, 60);
    this.mRedSq.getXform().setSize(2, 2);
    this.mRedSq.draw(vpMatrix);

    // top left
    this.mTLSq.getXform().setPosition(10, 65);
    this.mTLSq.draw(vpMatrix);

    // top right
    this.mTRSq.getXform().setPosition(30, 65);
    this.mTRSq.draw(vpMatrix);

    // bottom right
    this.mBRSq.getXform().setPosition(30, 55);
    this.mBRSq.draw(vpMatrix);

    // bottom left
    this.mBLSq.getXform().setPosition(10, 55);
    this.mBLSq.draw(vpMatrix);
}