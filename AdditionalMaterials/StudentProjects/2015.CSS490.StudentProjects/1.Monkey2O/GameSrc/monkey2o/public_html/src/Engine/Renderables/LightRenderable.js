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
    this.mLights = [];
}
gEngine.Core.inheritPrototype(LightRenderable, SpriteAnimateRenderable);

//<editor-fold desc="Public Methods">
//**-----------------------------------------
// Public methods
//**-----------------------------------------
LightRenderable.prototype.draw = function (aCamera) {
    this.mShader.setLights(this.mLights);
    SpriteAnimateRenderable.prototype.draw.call(this, aCamera);
};

LightRenderable.prototype.drawAsChild = function (aCamera, parentXform) {
    this.mShader.setLights(this.mLights);
    SpriteAnimateRenderable.prototype.drawAsChild.call(this, aCamera, parentXform);
};

LightRenderable.prototype.numLights = function () {
    return this.mLights.length;
};

LightRenderable.prototype.getLightAt = function (index) {
    return this.mLights[index];
};
LightRenderable.prototype.addLight = function (l) {
    this.mLights.push(l);
};

LightRenderable.prototype.removeLight = function(light) {
    var index = this.mLights.indexOf(light);
    
    if(index > -1) {
      this.mLights.splice(index, 1); 
    }
};

LightRenderable.prototype.clearLights = function() {
  this.mLights = [];
};
//--- end of Public Methods

//</editor-fold>