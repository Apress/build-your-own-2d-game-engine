/**
 * TerrainBlock.js
 * 
 * This defines one (normally invisible) terrain block, which is a solid 
 * rectangle of infinite inertia (non-moving solid). These are used to construct
 * the level terrain. 
 * 
 * @author  Erik W. Greif
 * @since   2018-02-22
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject, MyGame */
/*find out more about jslint: http://www.jslint.com/help.html */

"use strict";


/**
 * Constructs a new terrain block. This object is intended to be added to the 
 * list of physics-enabled objects, as it contains a rigid body. 
 * 
 * @param x  X position
 * @param y  Y position
 * @param w  Width
 * @param h  Height
 * @param angle  Angle in radians
 * @returns {TerrainBlock}
 */
function TerrainBlock(x, y, w, h, angle) {
    
    var p = new Renderable();
    GameObject.call(this, p);
    var tf = p.getTransform();
    
    //Rigid body will reference the transform
    var r = new RigidRectangle(tf, w, h);
    this.setRigidBody(r);
    this.setDrawRenderable(false);
    this.setDrawRigidShape(false);
    
    r.setMass(0);
    tf.setSize(w, h);
    tf.setPosition(x, y);
    tf.setRotationInRad(angle);
}
gEngine.Core.inheritPrototype(TerrainBlock, GameObject);


/**
 * Constructs a new instance using the properties object.
 * 
 * @param properties  The properties object to be used for construction.
 * @returns A new instance.
 */
TerrainBlock.fromProperties = function (properties) {
    
    return new TerrainBlock(
            properties["position"][0], 
            properties["position"][1], 
            properties["size"][0], 
            properties["size"][1], 
            properties["angle"]);
};


/**
 * Generates a properties entry for this object. 
 */
TerrainBlock.prototype.toProperties = function () {
    
    var transform = this.getTransform();
    
    var properties = {
        "__hasPhysics": true,
        "position": [transform.getXPos(), transform.getYPos()],
        "size":     [transform.getWidth(), transform.getHeight()],
        "angle":    transform.getRotationInRad()
    };
    
    return properties;
};


/**
 * Fallthrough to parent draw.
 * 
 * @param camera  The camera to draw onto, already set up for drawing
 */
TerrainBlock.prototype.draw = function (camera) {
    
    GameObject.prototype.draw.call(this, camera);
};


/**
 * Fallthrough to parent update.
 */
TerrainBlock.prototype.update = function () {
    
    //For terrain, we can sync the rigid body with the transform
    this.getRigidBody().setSize(this.getTransform().getSize());
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.One))  
        this.toggleDrawRigidShape();
    
    GameObject.prototype.update.call(this);
};
