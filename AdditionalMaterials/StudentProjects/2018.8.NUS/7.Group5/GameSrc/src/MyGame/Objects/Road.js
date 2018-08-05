/* File: Hero.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Road(spriteTexture, atX, atY, size1,size2) {
        
    
    this.mRoad = new TextureRenderable(spriteTexture);
    this.mRoad.setColor([1, 1, 1, 0]);
    this.mRoad.getXform().setPosition(atX, atY);
    this.mRoad.getXform().setSize(size1, size2);

    GameObject.call(this, this.mRoad);
    
   var r;

    r = new RigidRectangle(this.getXform(), size1, size2);
    r.setMass(0);
    this.setRigidBody(r);
    r.setRestitution(0);
    r.setFriction(0);
    //this.toggleDrawRenderable();
    this.toggleDrawRigidShape();
    
}

gEngine.Core.inheritPrototype(Road, GameObject);


Road.prototype.update = function () {
    
    GameObject.prototype.update.call(this);
};
