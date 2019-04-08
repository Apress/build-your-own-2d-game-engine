/*
 * File: ShadowReceiver.js
 * Shadow support
 * 
 * Instance variables:
 *     mReceiver: Reference to any GameObject
 *                Treats this target for shadow receiver
 *     mCasters: Reference to an array of Renderables that are at least LightRenderable
 *     
 * Draws the mReceiver, and the shadows of mCasters on this mReceiver
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Renderable, SpriteRenderable, ShadowCaster, Transform */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

/**
 * Default Constructor<p>
 * Draws the mReceiver, and the shadows of mCasters on this mReceiver
 * @param {ShadowReceiver} theReceiverObject
 * @returns {ShadowReceiver} new Instance of ShadowReceiver
 * @class ShadowReceiver
 */
function ShadowReceiver (theReceiverObject) {
    this.kShadowStencilBit = 0x01;              // The stencil bit to switch on/off for shadow
    this.kShadowStencilMask = 0xFF;             // The stencil mask 
    this.mReceiverShader = gEngine.DefaultResources.getShadowReceiverShader();
    
    this.mReceiver = theReceiverObject;
    
    // To support shadow drawing
    this.mShadowCaster = [];                    // array of ShadowCasters
}
    
// <editor-fold desc="support for setting and removing casters ">
/**
 * Associate a ShadowCaster with a LightRenderable
 * @param {LightRenderable} lgtRenderable to associate 
 * @returns {void}
 * @memberOf ShadowReceiver
 */
ShadowReceiver.prototype.addShadowCaster = function (lgtRenderable) {
    var c = new ShadowCaster(lgtRenderable, this.mReceiver);
    this.mShadowCaster.push(c);
};
// for now, cannot remove shadow casters
// </editor-fold>

// <editor-fold  desc="shadow drawing support">
/**
 * Draw function called by GameLoop
 * @param {Camera} aCamera Camera to draw too
 * @returns {void}
 * @memberOf ShadowReceiver
 */
ShadowReceiver.prototype.draw = function (aCamera) {
    var c;
    
    // draw receiver as a regular renderable
    this.mReceiver.draw(aCamera);
    
    this._shadowRecieverStencilOn();
    var s = this.mReceiver.getRenderable().swapShader(this.mReceiverShader);
    this.mReceiver.draw(aCamera);
    this.mReceiver.getRenderable().swapShader(s);
    this._shadowRecieverStencilOff();
    
    // now draw shadow color to the pixels in the stencil that are switched on
    for (c = 0; c < this.mShadowCaster.length; c++) {
        this.mShadowCaster[c].draw(aCamera);
    }
    
    // switch off stencil checking
    this._shadowRecieverStencilDisable();
};

/**
 * Update Function called by GameLoop
 * @returns {void}
 * @memberOf ShadowReceiver
 */
ShadowReceiver.prototype.update = function () {
    this.mReceiver.update();
};
// </editor-fold>