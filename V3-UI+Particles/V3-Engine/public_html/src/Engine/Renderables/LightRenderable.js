/*
 * File: LightRenderable.js
 *  
 * SpriteAnimatedRenderable with light illumination
 */

/*jslint node: true, vars: true */
/*global gEngine, Renderable, SpriteAnimateRenderable*/
/* find out more about jslint: http://www.jslint.com/help.html */

// Constructor and object definition
"use strict";  // Operate in Strict mode such that variables must be declared before used!

/**
 * Default Contructior<p>
 * SpriteAnimatedRenderable with light illumination
 * @param {Texture} myTexture to associate this this Renderable
 * @returns {LightRenderable} New instance of LightRenderable
 * @class LightRenderable
 */
function LightRenderable(myTexture) {
    SpriteAnimateRenderable.call(this, myTexture);
    Renderable.prototype._setShader.call(this, gEngine.DefaultResources.getLightShader());

    // here is the light source
    this.mLights = [];
}
gEngine.Core.inheritPrototype(LightRenderable, SpriteAnimateRenderable);

//<editor-fold desc="Public Methods">
//**-----------------------------------------
// Public methods
//**-----------------------------------------
/**
 * Draw function called by GameLoop
 * @param {Camera} aCamera Camera to draw to
 * @returns {void}
 * @memberOf LightRenderable
 */
LightRenderable.prototype.draw = function (aCamera) {
    this.mShader.setLights(this.mLights);
    SpriteAnimateRenderable.prototype.draw.call(this, aCamera);
};

/**
 * Returns the number of Lights on this LightRenderable
 * @returns {Number} number of lights
 * @memberOf LightRenderable
 */
LightRenderable.prototype.numLights = function () {
    return this.mLights.length;
};

/**
 * Return Light at index
 * @param {type} index of Light to return
 * @returns {Light} light to return
 * @memberOf LightRenderable
 */
LightRenderable.prototype.getLightAt = function (index) {
    return this.mLights[index];
};

/**
 * Add light to LightRenderable
 * @param {type} l Light to add
 * @returns {void}
 * @memberOf LightRenderable
 */
LightRenderable.prototype.addLight = function (l) {
    this.mLights.push(l);
};
//--- end of Public Methods

//</editor-fold>