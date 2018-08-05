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

function Stair(spriteTexture, atX, atY, size1,size2) {
        
    
   this.mStair = new SpriteRenderable(spriteTexture);
    this.mStair.setColor([1, 1, 1, 0]);
    this.mStair.getXform().setPosition(atX, atY);
    this.mStair.getXform().setSize(size1, size2);
    this.mStair.setElementUVCoordinate(0.25, 0.6, 0.45, 0.85);

    GameObject.call(this, this.mStair);
    
    /*var r;

    r = new RigidRectangle(this.getXform(), size1, size2);
    this.setRigidBody(r);
    r.setMass(0);
    //this.toggleDrawRenderable();
    this.toggleDrawRigidShape();*/
}

gEngine.Core.inheritPrototype(Stair, GameObject);



Stair.prototype.update = function () {
    
GameObject.prototype.update.call(this);
};
