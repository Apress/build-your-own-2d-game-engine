/* File: Platform.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2, RigidShape, RigidRectangle, Terrain */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

function Platform(spriteTexture, normalMap, x, y, w, h) {
    this.platform = new IllumRenderable(spriteTexture, normalMap);
    var xform = this.platform.getXform();
    xform.setSize(w, h);
    xform.setPosition(x, y);
    GameObject.call(this, this.platform);
    var r = new RigidRectangle(xform, w*.9, h*.7);
    r.setMass(0);
    this.setRigidBody(r);
    
}
gEngine.Core.inheritPrototype(Platform, Terrain);

Platform.prototype.update = function () {
};

Platform.prototype.userCollisionHandling = function(obj){

    return false;
};