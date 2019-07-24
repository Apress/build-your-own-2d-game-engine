/*
 * File: Engine_Stencil.js
 * -for drawing objects through a stencil
 * -uses any object that has a draw function
 *      (have tested with regular, texture, and sprite renderables and their 
 *      UI counterparts)
 *      
 *  Usage:
 *       drawing to stencil buffer: clear/begin/end drawing to stencil buffer
 *       Stencil cull testing: begin/end stencil culling
 *  E.g.,
 *     
 *     update() {  // Your game's update function
 *        ...
 *        beginDrawingToStencilBuffer(); 
 *            clearStencilBuffer();     // clears the buffer
 *            renderable1.draw(yourCamera);
 *        endDrawingToStencilBuffer();
 *        // At this point shape of renderable1 is in the stencil buffer, we 
 *           can choose to enable stencil testing    
 *        
 *        renderable2.draw(yourCamera);      // <-- not stencil culled
 *        
 *        beginStencilCulling();             // from this point on, anything 
 *                                              drawn will be into renderable1's 
 *                                              shape/area
 *            renderable3.draw(yourCamera);  // can only draw into renderable1's 
 *                                              shape area in the frame buffer
 *        endStencilCulling();
 *        
 *        renderable4.draw(yourCamera);      // <-- not stencil culled
 *        
  *        beginDrawingToStencilBuffer();     // enable stencil drawing again to
 *                                              add more area to  draw areas
 *            renderableA.draw(yourCamera);
 *        endDrawingToStencilBuffer();
 *        
 *        beginStencilCulling();             // from this point on, anything 
 *                                              drawn will be into renderable's 
 *                                              and renderableA's shape/area
 *            renderableB.draw(yourCamera);  // can only draw into renderable1's 
 *                                              and renderableA's shape area in 
 *                                              the frame buffer
 *        endStencilCulling();
 *        
 */
//references used:
    // https://learnopengl.com/Advanced-OpenGL/Blending
    // https://stackoverflow.com/questions/39622439/how-to-write-a-only-alpha-0-to-the-stencil-buffer
    // https://stackoverflow.com/questions/46806063/how-stencil-buffer-and-masking-work
    // https://en.wikipedia.org/wiki/Stencil_buffer


"use strict";  // Operate in Strict mode such that variables must be declared 
               //before used!

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
     * Begins drawing to the stencil buffer. Assumes depth and frame buffer are 
     * both write enabled.
     * NOTE: Until the call to endDrawingToStencilBuffer(), everything drawn 
     * will go into the stencilBuffer
     *       MUST call endDrawingToStencilBuffer() when done.
     * @returns {void}
     */
    var beginDrawToStencilBuffer  = function() {
        var gl = gEngine.Core.getGL();
        gl.enable(gl.STENCIL_TEST);     // Enable stenciling
        // first clear stencil, just in case
        gl.stencilMask(0xFF);    // Mask of 0xFF, all 8 buffers can be written to
        
        // Stencil ref of 1, so the ref=1, and Mask=0xff, are actually not used
        gl.stencilFunc(gl.ALWAYS, 1, 0xFF);  
        // Three actions for: StencilFail, DepthFail, and DepthPass 
        gl.stencilOp(gl.REPLACE, gl.REPLACE, gl.REPLACE); 
        
        // Switch off the writing to: depth buffer and color/frame buffer 
        gl.depthMask(false);
        gl.colorMask(false, false, false, true);
    };
    
    /**
     * Clears the stencil buffer.
     * @returns {void}
     */
    var clearStencilBuffer  = function() {
        var gl = gEngine.Core.getGL();
        // first clear stencil, just in case
        gl.clearStencil(0);      // Value to clear to
        gl.clear(gl.STENCIL_BUFFER_BIT);
    };
    
    
    /**
     * Stops drawing to stencil buffer, from this point on renderable drawing 
     * will change colors in the framebuffer as usual.
     * NOTE: this function should only be called after beingDrawToStencilBuffer();
     * @returns {void}
     */
    var endDrawToStencilBuffer = function() {
        var gl = gEngine.Core.getGL();
        gl.disable(gl.STENCIL_TEST);     // Enable stenciling
        gl.stencilMask(0x00);
        gl.stencilFunc(gl.NEVER, 0, 0x00);
        
        // Switch on the writing to: depth buffer and color/frame buffer 
        gl.depthMask(true);
        gl.colorMask(true, true, true, true);
    };
    
    /**
     * Begins stencil culling test. The stencil buffer should have already been 
     * drawn to with beginDrawToStencilBuffer() and endDrawToStencilBuffer(). 
     * The previously drawn renderables form the "stencil" where the 
     * renderable(s) will be drawn into between beginStencilCulling() and 
     * endStencilCulling()
     * @returns {void}
     */
    var beginStencilCulling = function() {
        var gl = gEngine.Core.getGL();
        gl.enable(gl.STENCIL_TEST);     // Enable stenciling
        gl.stencilMask(0xFF);
        gl.stencilFunc(gl.EQUAL, 1, 0xFF); 
        // Three actions for: StencilFail, DepthFail, and DepthPass 
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP); 
    };
    
    /**
     * Ends stencil culling tes. It is assumed beginStencilCulling test has been 
     * called and this function terminates stencil culling.
     * @returns {void}
     */
    var endStencilCulling = function() {
        var gl = gEngine.Core.getGL();        
        gl.disable(gl.STENCIL_TEST);
    };
    
    
    // Public interface for this object. Anything not in here will
    // not be accessable.
    var mPublic = {
        beginDrawToStencilBuffer: beginDrawToStencilBuffer,
        endDrawToStencilBuffer: endDrawToStencilBuffer,
        clearStencilBuffer: clearStencilBuffer,
        beginStencilCulling: beginStencilCulling,
        endStencilCulling: endStencilCulling
    };
    return mPublic;
}());