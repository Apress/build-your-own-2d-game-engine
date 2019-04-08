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


function LightRenderable(myTexture) {
    SpriteAnimateRenderable.call(this, myTexture);
    Renderable.prototype._setShader.call(this, gEngine.DefaultResources.getLightShader());

    // here is the light source
    this.mLight = null;
}
gEngine.Core.inheritPrototype(LightRenderable, SpriteAnimateRenderable);

//<editor-fold desc="Public Methods">
//**-----------------------------------------
// Public methods
//**-----------------------------------------
LightRenderable.prototype.draw = function (aCamera) {
    this.mShader.setLight(this.mLight);
    SpriteAnimateRenderable.prototype.draw.call(this, aCamera);
};

LightRenderable.prototype.getLight = function () {
    return this.mLight;
};

LightRenderable.prototype.addLight = function (l) {
    this.mLight = l;
};
//--- end of Public Methods
//</editor-fold>