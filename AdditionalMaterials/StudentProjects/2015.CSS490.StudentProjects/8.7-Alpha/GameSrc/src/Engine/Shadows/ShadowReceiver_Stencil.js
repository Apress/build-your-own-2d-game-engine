/* 
 * David Watson
 * CSS 490C
 * 2D Game Engine Design
 * File: ShadowReceiver_Stencil.js 
 * 
 * This file defines an object to act as a shadow receiver stencil
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

/* 
* GL Stencil settings to support rendering to and checking of 
* the stencil buffer
*/
ShadowReceiver.prototype._shadowRecieverStencilOn = function () {
        var gl = gEngine.Core.getGL();
        gl.clear(gl.STENCIL_BUFFER_BIT);
        gl.enable(gl.STENCIL_TEST);
        gl.colorMask(false, false, false, false);
        gl.depthMask(false);
        gl.stencilFunc(gl.NEVER, this.kShadowStencilBit, this.kShadowStencilMask);
        gl.stencilOp(gl.REPLACE,gl.KEEP, gl.KEEP);
        gl.stencilMask(this.kShadowStencilMask);
    };
    
ShadowReceiver.prototype._shadowRecieverStencilOff = function () {
    var gl = gEngine.Core.getGL();
    gl.depthMask(gl.TRUE);
    gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
    gl.stencilFunc(gl.EQUAL, this.kShadowStencilBit, this.kShadowStencilMask);
    gl.colorMask( true, true, true, true );
};
    
ShadowReceiver.prototype._shadowRecieverStencilDisable = function () {
    var gl = gEngine.Core.getGL();
    gl.disable(gl.STENCIL_TEST); 
};