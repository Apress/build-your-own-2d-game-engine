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

function Ballon(spriteTexture, atX, atY, size1,size2) {
        
    
    this.mBallon = new LightRenderable(spriteTexture);
    this.mBallon.setColor([1, 1, 1, 0]);
    this.mBallon.getXform().setPosition(atX, atY);
    this.mBallon.getXform().setSize(size1, size2);
    this.mBallon.setElementUVCoordinate(0, 1, 0, 1);
    GameObject.call(this, this.mBallon);
    this.setSpeed(0);
    /*var r;

    r = new RigidRectangle(this.getXform(), size1, size2);
    this.setRigidBody(r);
    r.setMass(0);
    //this.toggleDrawRenderable();
    this.toggleDrawRigidShape();*/
}

gEngine.Core.inheritPrototype(Ballon, GameObject);


Ballon.prototype.update = function () {
    
GameObject.prototype.update.call(this);
};