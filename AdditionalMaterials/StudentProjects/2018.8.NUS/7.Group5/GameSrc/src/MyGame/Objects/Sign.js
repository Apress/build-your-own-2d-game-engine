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

function Sign(spriteTexture, atX, atY, size1,size2) {
        
    
    this.mSign = new SpriteRenderable(spriteTexture);
    this.mSign.setColor([1, 1, 1, 0]);
    this.mSign.getXform().setPosition(atX, atY);
    this.mSign.getXform().setSize(size1, size2);
    this.mSign.setElementUVCoordinate(0.29, 0.74,0.45,0.665);

    GameObject.call(this, this.mSign);
    
    /*var r;

    r = new RigidRectangle(this.getXform(), size1, size2);
    this.setRigidBody(r);
    r.setMass(0);
    //this.toggleDrawRenderable();
    this.toggleDrawRigidShape();*/
}

gEngine.Core.inheritPrototype(Sign, GameObject);


Sign.prototype.update = function () {
    
GameObject.prototype.update.call(this);
};
