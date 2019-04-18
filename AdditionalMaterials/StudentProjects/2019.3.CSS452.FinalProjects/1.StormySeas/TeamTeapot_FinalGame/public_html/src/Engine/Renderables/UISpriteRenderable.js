/*
 * File: SpriteAnimateRenderable.js
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Renderable: false, TextureRenderable: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

// Constructor and object definition
"use strict";  // Operate in Strict mode such that variables must be declared before used!

/**
 * Constructor of SpriteAnimateRenderable object.
 * @param {Texture} myTexture Texture to be associated by object.
 * @returns {UISpriteRenderable} Instance of this SpriteAnimateRenderable object
 * @class SpriteAnimateRenderable
 */
function UISpriteRenderable(myTexture) {
    SpriteRenderable.call(this, myTexture);
    Renderable.prototype._setShader.call(this, gEngine.DefaultResources.getUISpriteShader());
    this.getXform().setZPos(3);
}
gEngine.Core.inheritPrototype(UISpriteRenderable, SpriteRenderable);
