/*
 * File: Engine_Stencil.js
 * -for drawing objects through a stencil
 * -uses any object that has a draw function
 *      (have tested with regular renderables and UI renderables)
 * -uses the alpha of the stencil's image
 * -only works with alpha values of 0 or 1 (does not take into accound partial transparency)
 * -any draw call between startStenciling and stopStenciling will be stenciled
 */
//references used:
    // https://learnopengl.com/Advanced-OpenGL/Blending
    // https://stackoverflow.com/questions/39622439/how-to-write-a-only-alpha-0-to-the-stencil-buffer
    // https://stackoverflow.com/questions/46806063/how-stencil-buffer-and-masking-work
    // https://en.wikipedia.org/wiki/Stencil_buffer


"use strict";  // Operate in Strict mode such that variables must be declared before used!

/**
 * Static refrence to gEngine
 * @type gEngine
 */
var gEngine = gEngine || { };

/**
 * 
 * @class gEngine.Stencil
 */
gEngine.Stencil = (function () {
    /**
     * Sets up stenciling with a renderable to use as a stencil
     * NOTE: MUST CALL STOPSTENCILING() TO NO LONGER USE THE STENCIL WHEN DRAWING
     * @param {Renderable} stencilRenderable The renderable to use as a stencil
     * @param {Camera} aCamera The camera to draw to
     * @returns {void}
     */
    var startStenciling = function(stencilRenderable, aCamera) {
        var gl = gEngine.Core.getGL();
        gl.enable(gl.STENCIL_TEST);
        // first clear stencil, just in case
        gl.stencilMask(0xFF);
        gl.clearStencil(0);
        // set up how the stencil will work
        gl.stencilFunc(gl.ALWAYS,1,0xFF);
        gl.stencilOp(gl.REPLACE, gl.REPLACE, gl.REPLACE);
        gl.clear(gl.STENCIL_BUFFER_BIT);
        
        // read only the alpha to the stencil
        gl.depthMask(false);
        gl.colorMask(false, false, false, true);
        
        // draw to the stencil
        stencilRenderable.draw(aCamera);
        
        gl.stencilFunc(gl.EQUAL,1,0xFF);
        gl.stencilMask(0x00);
        gl.depthMask(true);
        gl.colorMask(true, true, true, true);
    };
    
    /**
     * Stops stenciling when drawing
     * @returns {void}
     */
    var stopStenciling = function() {
        var gl = gEngine.Core.getGL();
        // clear stencil
        gl.stencilMask(0xFF);
        gl.clearStencil(0);
        
        gl.disable(gl.STENCIL_TEST);
    };
    
    // Public interface for this object. Anything not in here will
    // not be accessable.
    var mPublic = {
        startStenciling: startStenciling,
        stopStenciling: stopStenciling
    };
    return mPublic;
}());