/**
 * BunAnimation.js 
 *
 * Defines a Bun animation
 * 
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteAnimateRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


/**
 * Creates a new player based on its location in the world.
 * 
 * @param x  The x position
 * @param y  The Y position
 * @param w  The width in WC
 * @param h  The height in WX
 * @param {Number} topPixel Top of the sprite row in pixel
 * @param {Number} leftPixel left most pixel of the first animation frame in pixel
 * @param {Number} elmWidthInPixel width of the animation in pixel
 * @param {Number} elmHeightInPixel height of the animation in pixel
 * @param {Number} numElements number of animation frames
 * @param {Number} wPaddingInPixel pixel padding between animation frames
 * @param speed animation speed
 * @param textureAsset  The asset ID of the overlay texture
 */
function BunAnimation(x, y) {
    
    this.renderable = new LightRenderable("assets/textures/BunSprite1.png");
    this.renderable.getTransform().setPosition(x, y);
    this.renderable.getTransform().setSize(4, 4);
    this.renderable.setSpriteProperties([0, 0], [64, 64], 1, 0);
    this.renderable.attachLightSet(gEngine.GameLoop.getScene().getGlobalLights());
    GameObject.call(this, this.renderable);
    
    //Add a light attached to BunBun
    this.halo = new Light();
    this.halo.setColor([0.75, 0.75, 0.75, 0]);
    this.halo.setFar(35);
    this.halo.setLightType(Light.eLightType.ePointLight);
    this.halo.setDropOff(.1);
    this.renderable.addLight(this.halo);
    
    //Add directional daylight
    this.daylight = new Light();
    this.daylight.setColor([.35, .35, .35, 1]);
    this.daylight.setZPos(-5);
    this.daylight.setDirection([0, -.25, -1]);
    this.daylight.setLightType(Light.eLightType.eDirectionalLight);
    this.renderable.addLight(this.daylight);
    
    GameObject.call(this, this.renderable);
    
    this.setDrawRenderable(true);
    
    //Configurable
    this.acceleration = -.05;
    this.jumpInterval = 120;
    this.jumpVelocity = 1.1;
    
    //State
    this.velocity = 0;
    this.floor = y;
    this.jumpTimer = 30;
}
gEngine.Core.inheritPrototype(BunAnimation, GameObject);


/**
 * Constructs a new instance using the properties object.
 * 
 * @param properties  The properties object to be used for construction.
 * @returns A new instance.
 */
BunAnimation.fromProperties = function (properties) {
    
    return new BunAnimation(
            properties["position"][0], 
            properties["position"][1]);
};

BunAnimation.prototype.update = function () {
    
    var transform = this.renderable.getTransform();
    
    this.velocity += this.acceleration;
    transform.incYPosBy(this.velocity);
    
    //If we landed, can't fall further
    if (transform.getYPos() < this.floor)
        transform.setYPos(this.floor);
    
    //Jump!
    this.jumpTimer -= 1;
    if (this.jumpTimer <= 0) {
        this.jumpTimer = this.jumpInterval;
        this.velocity = this.jumpVelocity;
    }
    
    this.halo.set2DPosition(this.renderable.getTransform().getPosition());
};
