/*
 * File: TextureRenderable.js
 *  
 * Renderable objects with textures
 */
/*jslint node: true, vars: true */
/*global gEngine: false, Renderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

// Constructor and object definition
"use strict";  // Operate in Strict mode such that variables must be declared before used!

/**
 * Constructor of TextureRenderable object.
 * @class TextureRenderable
 * @param {Texture} myTexture - Texture to be associated by object.
 * @returns {UIRenderable} - Instance of TextureRenderable object.
 */
function UIRenderable(myTexture) {
    Renderable.call(this);
    Renderable.prototype._setShader.call(this, gEngine.DefaultResources.getUISimpleShader());
    this.getXform().setZPos(3);
}
gEngine.Core.inheritPrototype(UIRenderable, Renderable);
