/**
 * Facade.js 
 *
 * Defines facade over level physical geometry. This is STATIC geometry only.
 * 
 * @author  Erik W. Greif
 * @since   2018-02-22
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, WASDObj */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";


/**
 * Creates a new player based on its location in the world.
 * Note: LOWER LEFT corner is position origin. This is easier to work with.
 * 
 * @param x  The x position
 * @param y  The Y position
 * @param w  The width in WC
 * @param h  The height in WX
 * @param lowerLeftX  The lower left X of the texture crop box
 * @param lowerLeftY  The lower left Y of the texture crop box
 * @param upperRightX  The upper right X of the texture crop box
 * @param upperRightY  The upper right Y of the texture crop box
 * @param textureAsset  The asset ID of the overlay texture
 */
function Facade(x, y, w, h, lowerLeftX, lowerLeftY, upperRightX, upperRightY,
        textureAsset, textureNormal, unlit) {
    
    this.renderable = null;
    if (typeof unlit !== 'undefined' && unlit) {
        this.renderable = new SpriteAnimateRenderable(textureAsset);
        this.renderable.setLightingEnabled(false);
    } else {
        if (typeof textureNormal !== 'undefined')
            this.renderable = new IllumRenderable(textureAsset, textureNormal);
        else
            this.renderable = new LightRenderable(textureAsset);
        this.renderable.attachLightSet(gEngine.GameLoop.getScene().getGlobalLights());
    }
    this.renderable.getTransform().setPosition(x + (w / 2), y + (h / 2));
    this.renderable.getTransform().setSize(w, h);
    this.renderable.setSpriteProperties([lowerLeftX, lowerLeftY], [upperRightX - lowerLeftX, upperRightY - lowerLeftY], 1, 0);
    
    GameObject.call(this, this.renderable);
    
    this.setDrawRenderable(true);
}
gEngine.Core.inheritPrototype(Facade, GameObject);


/**
 * Constructs a new instance using the properties object.
 * 
 * @param properties  The properties object to be used for construction.
 * @returns A new instance.
 */
Facade.fromProperties = function (properties) {

    return new Facade(
            properties["position"][0], 
            properties["position"][1], 
            properties["size"][0], 
            properties["size"][1], 
            properties["lowerLeft"][0], 
            properties["lowerLeft"][1], 
            properties["upperRight"][0], 
            properties["upperRight"][1],
            properties["textureId"],
            properties["normalId"],
            properties["unlit"]);
};


/**
 * Draws facade objects. If on the mini camera, will overlay in white.
 */
Facade.prototype.draw = function (camera) {
    
    if (camera.getName() === "minimap")
        this.renderable.setColor([.5, .5, .5, 1]);
    else
        this.renderable.setColor([0, 0, 0, 0]);
    
    GameObject.prototype.draw.call(this, camera);
};