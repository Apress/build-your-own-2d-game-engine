/*
 * File: Engine_Stencil.js
 * -for drawing objects through a stencil
 * -uses any object that has a draw function
 *      (have tested with regular renderables and UI renderables)
 * -uses the alpha of the stencil's image
 * -only works with alpha values of 0 or 1 (does not take into accound partial transparency)
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
     * Stencils and draws given Renderable
     * @param {Renderable} renderable The renderable to be stenciled
     * @param {Renderable} stencilRenderable The renderable to use as a stencil
     * @param {Camera} aCamera The camera to draw to
     */
    var drawWithStencil = function (renderable, stencilRenderable, aCamera)
    {
        var gl = gEngine.Core.getGL();
        gl.enable(gl.STENCIL_TEST);
        // first clear stencil
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
        // draw the renderable based on the stencil
        renderable.draw(aCamera);
        gl.disable(gl.STENCIL_TEST);
    };
    
    /**
     * Stencils multiple Renderables
     * @param {Renderable} renderables The renderables to be stenciled
     * @param {Renderable} stencilRenderable The renderable to use as a stencil
     * @param {Camera} aCamera
     */
    var drawMultiWithStencil = function (renderables, stencilRenderable, aCamera)
    {
        
        for(var i = 0; i < renderables.length; i++)
        {
            gEngine.Stencil.drawWithStencil(renderables[i], stencilRenderable, aCamera);
        }
    };
    
    // Public interface for this object. Anything not in here will
    // not be accessable.
    var mPublic = {
        drawWithStencil: drawWithStencil,
        drawMultiWithStencil: drawMultiWithStencil
    };
    return mPublic;
}());