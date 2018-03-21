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

LightRenderable.prototype.numLights = function () {
    return this.mLights.length;
};

LightRenderable.prototype.getLightAt = function (index) {
    return this.mLights[index];
};
LightRenderable.prototype.addLight = function (l) {
    this.mLights.push(l);
};

LightRenderable.prototype.incColor = function(r, g, b, a) {
    if(this.mColor[0] + r > 1 && this.mColor[0] + r < 0 ||
       this.mColor[1] + g > 1 && this.mColor[0] + g < 0 ||
       this.mColor[2] + b > 1 && this.mColor[0] + b < 0 || 
       this.mColor[3] + a > 1 && this.mColor[0] + a < 0) {
    }
    else {
        this.mColor[0] += r;
        this.mColor[1] += g;
        this.mColor[2] += b;
        this.mColor[3] += a;
    }
};
//--- end of Public Methods

//</editor-fold>