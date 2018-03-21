/* File: Terrain.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2, RigidShape, RigidRectangle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

function Terrain(spriteTexture, x, y, w, h) {
    this.terrain = new SpriteRenderable(spriteTexture);
    var xform = this.terrain.getXform();
    xform.setSize(w, h);
    xform.setPosition(x, y);
    GameObject.call(this, this.terrain);
    
    var r = new RigidRectangle(xform, w, h);
    r.setMass(0);
    this.setRigidBody(r);
    
}
gEngine.Core.inheritPrototype(Terrain, GameObject);

Terrain.prototype.update = function () {
};

Terrain.prototype.userCollisionHandling = function(obj){
    return false;
};