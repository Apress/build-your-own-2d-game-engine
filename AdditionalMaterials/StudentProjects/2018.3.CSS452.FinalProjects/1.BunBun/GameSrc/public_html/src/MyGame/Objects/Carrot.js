/**
 * Carrot.js 
 *
 * Defines the game carrot behavior. Rolling carrot enemies.
 * 
 * @author  Erik W. Greif
 * @since   2018-02-22
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteAnimateRenderable: false */
/*find out more about jslint: http://www.jslint.com/help.html */

"use strict"; 


/**
 * Constructs a new terrain block. This object is intended to be added to the 
 * list of physics-enabled objects, as it contains a rigid body. 
 * 
 * @param x  X position
 * @param y  Y position
 */
function Carrot(x, y) {
    
    this.idealSize = 8;
    this.currentSize = .01;
    
    this.renderable = new LightRenderable("assets/textures/carrotSlice.png");
    this.renderable.getTransform().setPosition(x, y);
    this.renderable.getTransform().setSize(this.currentSize, this.currentSize);
    this.renderable.setSpriteProperties([0, 0], [379, 379], 1, 0);
    this.renderable.attachLightSet(gEngine.GameLoop.getScene().getGlobalLights());

    GameObject.call(this, this.renderable);
    
    //Rigid body
    var r = new RigidCircle(this.getTransform(), this.currentSize / 2); 
    
    //Some random size and position logic
    var vx = (Math.random() - 0.5);
    var vy = (Math.random() - 0.5);
    var speed = 20;
    r.setVelocity(-speed, 0);
    this.setRigidBody(r);
    r.setMass(20);
    
    //Visibility toggled on for now
    this.setDrawRenderable(true);
    this.setDrawRigidShape(false);
    
    //Map indicator
    this.mapRenderable = new TextureRenderable("assets/textures/indicator.png");
    this.mapRenderable.setColor([1, .37, 0, 1]);
    this.mapRenderable.getTransform().setSize(7, 7);
}
gEngine.Core.inheritPrototype(Carrot, GameObject);

/**
 * Constructs a new instance using the properties object.
 * 
 * @param properties  The properties object to be used for construction.
 * @returns A new instance.
 */
Carrot.fromProperties = function (properties) {
    
    return new Carrot(
            properties["position"][0], 
            properties["position"][1]);
};


/**
 * Update logic
 */
Carrot.prototype.update = function () {

    GameObject.prototype.update.call(this);
    
    //Enlarge!
    this.currentSize += .2 * (this.idealSize - this.currentSize);
    this.renderable.getTransform().setSize(this.currentSize, this.currentSize);
    this.getRigidBody().setShapeSize(this.currentSize / 2);
};


/**
 * Draw the carrot or its status indicator
 */
Carrot.prototype.draw = function (camera) {
    
    if (camera.getName() === "minimap") {

        var myPos = this.renderable.getTransform().getPosition();
        this.mapRenderable.getTransform().setPosition(myPos[0], myPos[1]);
        this.mapRenderable.draw(camera);
    }
    else
        GameObject.prototype.draw.call(this, camera);
};
