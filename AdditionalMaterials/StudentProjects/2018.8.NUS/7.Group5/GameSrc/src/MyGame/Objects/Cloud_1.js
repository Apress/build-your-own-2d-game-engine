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

function Cloud_1(spriteTexture, atX, atY, size1,size2) {
        
    
    this.mCloud = new SpriteRenderable(spriteTexture);
    this.mCloud.setColor([1, 1, 1, 0]);
    this.mCloud.getXform().setPosition(atX, atY);
    this.mCloud.getXform().setSize(size1, size2);
    this.mCloud.setElementUVCoordinate(0.24, 0.74, 0.24, 0.505);

    GameObject.call(this, this.mCloud);
    
   /*var r;

    r = new RigidRectangle(this.getXform(), size1, size2);
    this.setRigidBody(r);
    r.setMass(0);
    //this.toggleDrawRenderable();
    this.toggleDrawRigidShape();*/
}

gEngine.Core.inheritPrototype(Cloud_1, GameObject);


Cloud_1.prototype.update = function () {
    
GameObject.prototype.update.call(this);
};
