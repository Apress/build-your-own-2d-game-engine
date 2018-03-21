/**
 * Background.js 
 *
 * Defines facade over level physical geometry. This is STATIC geometry only.
 * 
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";


/**
 * 
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
 * @param textureNormal
 * @param unlit
 */
function Background(x, y, w, h, lowerLeftX, lowerLeftY, upperRightX, upperRightY, textureList) {
    
    this.backPos = [lowerLeftX, lowerLeftY];
    this.backSize = [upperRightX - lowerLeftX, upperRightY - lowerLeftY];
    
    this.rearMovementProportion = 1.5;
    this.layerProportion = 0.5;
    this.textureList = textureList;
    
    this.renderables = [];
    for (var texture in this.textureList) {
        this.renderables.push(this.makeRenderable(this.textureList[texture], x, y, w, h));
    }
    
    GameObject.call(this, new Renderable());
    this.setDrawRenderable(false);
}
gEngine.Core.inheritPrototype(Background, GameObject);


Background.prototype.makeRenderable = function(texture, x, y, w, h) {
    
    var renderable = new SpriteAnimateRenderable(texture);
    renderable.getTransform().setPosition(x, y);
    renderable.getTransform().setSize(w, h);
    renderable.setWrapEnabled(true);
    renderable.setLightingEnabled(false);
    return renderable;
};


/**
 * Constructs a new instance using the properties object.
 * 
 * @param properties  The properties object to be used for construction.
 * @returns A new instance.
 */
Background.fromProperties = function (properties) {

    return new Background(
            properties["position"][0], 
            properties["position"][1], 
            properties["size"][0], 
            properties["size"][1], 
            properties["lowerLeft"][0], 
            properties["lowerLeft"][1], 
            properties["upperRight"][0], 
            properties["upperRight"][1],
            properties["textureList"]);
};


/**
 * @param camera
 */
Background.prototype.draw = function (camera) { 
    if (camera.getName() === "main") {
        
        //Fix to the camera position
        var camPos = camera.getWCCenter();

        for (var rid in this.renderables) {
            
            this.renderables[rid].getTransform().setPosition(camPos[0], camPos[1]); 
            this.renderables[rid].draw(camera);
        }
    }
};

Background.prototype.update = function (camera) {
    
    var camPos = camera.getWCCenter();
    
    //Vary the texture coordinates to animate
    var renderable = null;
    var offsetProportion = this.rearMovementProportion;
    var offset = 0;
    for (var rid in this.renderables) {
        
        renderable = this.renderables[rid];
        offset = camPos[0] / offsetProportion;
        offsetProportion *= this.layerProportion;
        renderable.setSpriteProperties([this.backPos[0] + offset, this.backPos[1]], this.backSize, 1, 0);
    }
};

