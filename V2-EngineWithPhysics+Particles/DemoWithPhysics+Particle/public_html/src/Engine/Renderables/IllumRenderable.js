/*
 * File: IllumRenderable.js
 *  
 * LightRenderable with light illumination
 */

/*jslint node: true, vars: true */
/*global gEngine, Renderable, LightRenderable, Material */
/* find out more about jslint: http://www.jslint.com/help.html */

// Constructor and object definition
"use strict";  // Operate in Strict mode such that variables must be declared before used!

/**
 * Default Constructor<p>
 * LightRenderable with light illumination
 * @param {Texture} myTexture Texture to be associated by object.
 * @param {type} myNormalMap normal map resource id
 * @returns {IllumRenderable} new instance of IllumRenderable
 * @class IllumRenderable
 */
function IllumRenderable(myTexture, myNormalMap) {
    LightRenderable.call(this, myTexture);
    Renderable.prototype._setShader.call(this, gEngine.DefaultResources.getIllumShader());

    // here is the normal map resource id
    this.mNormalMap = myNormalMap;

    // Normal map texture coordinate will reproduce the corresponding sprite sheet
    // This means, the normal map MUST be based on the sprite sheet

    // Material for this Renderable
    this.mMaterial = new Material();
}
gEngine.Core.inheritPrototype(IllumRenderable, LightRenderable);

//<editor-fold desc="Public Methods">
//**-----------------------------------------
// Public methods
//**-----------------------------------------
/**
 * Draw function called by GameLoop
 * @param {Camera} aCamera camera to draw to
 * @returns {void}
 * @memberOf IllumRenderable
 */
IllumRenderable.prototype.draw = function (aCamera) {
    gEngine.Textures.activateNormalMap(this.mNormalMap);
            // Here thenormal map texture coordinate is copied from those of 
            // the corresponding sprite sheet
    this.mShader.setMaterialAndCameraPos(this.mMaterial, aCamera.getPosInPixelSpace());
    LightRenderable.prototype.draw.call(this, aCamera);
};

/**
 * Return the Renderable material
 * @returns {Material} IllumRenderable material
 * @memberOf IllumRenderable
 */
IllumRenderable.prototype.getMaterial = function () { return this.mMaterial; };
//--- end of Public Methods

//</editor-fold>