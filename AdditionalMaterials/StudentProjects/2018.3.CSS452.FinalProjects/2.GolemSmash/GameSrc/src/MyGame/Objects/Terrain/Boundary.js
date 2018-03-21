/* File: Boundary.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2, RigidShape, RigidRectangle, Terrain */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

function Boundary(x, y, w, h) {
    this.boundary = new Renderable();
    var xform = this.boundary.getXform();
    xform.setSize(w, h);
    xform.setPosition(x, y);
    this.boundary.setColor([1,1,1,0]);
    
    GameObject.call(this, this.boundary);
    
    var r = new RigidRectangle(xform, w, h);
    r.setMass(0);
    this.setRigidBody(r);
    
}
gEngine.Core.inheritPrototype(Boundary, Terrain);

Boundary.prototype.update = function () {
};

Boundary.prototype.userCollisionHandling = function(obj){
    if (obj instanceof Arrow){
        return true;
    }
    return false;
};