/**
 * BunBUn.js 
 *
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, SpriteAnimateRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


/**
 * Creates a new player based on its location in the world.
 * 
 * @param x  The x position
 * @param y  The Y position
 * @param w width
 * @param h height
 * @param textureAsset
 */
function BunBunAnimated(x, y, w, h, textureAsset) {
    this.renderable = new SpriteAnimateRenderable(textureAsset);
    this.renderable.getTransform().setPosition(x, y);
    this.renderable.getTransform().setSize(w, h);
    this.renderable.setSpriteProperties([0, 0], [100, 100], 10, 0);
    this.renderable.setAnimationSpeed(10);
    GameObject.call(this, this.renderable);
};
gEngine.Core.inheritPrototype(BunBunAnimated, GameObject);

BunBunAnimated.fromProperties = function (properties) {    
    return new BunBunAnimated(
            properties["position"][0], 
            properties["position"][1],
            properties["size"][0],
            properties["size"][1],
            properties["textureId"]);
};

BunBunAnimated.prototype.draw = function (camera) {
    this.renderable.draw(camera);
};

BunBunAnimated.prototype.update = function () {
    this.renderable.updateAnimation();
};

