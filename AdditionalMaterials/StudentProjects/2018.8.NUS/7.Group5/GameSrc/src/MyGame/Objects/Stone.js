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

function Stone(spriteTexture, atX, atY, size1,size2) {
        
    this.xsize = size1;
    this.ysize = size2;
    this.mStone = new SpriteRenderable(spriteTexture);
    this.mStone.setColor([1, 1, 1, 0]);
    this.mStone.getXform().setPosition(atX, atY);
    this.mStone.getXform().setSize(size1, size2);
    this.mStone.setElementUVCoordinate(0.22, 0.76,0.28,0.71);

    GameObject.call(this, this.mStone);
    
    var r;

    r = new RigidRectangle(this.getXform(), size1, size2);
    this.setRigidBody(r);
    r.setRestitution(0);
    r.setMass(0);
    r.setFriction(0.1);
    r.setInertia(0);
    //this.toggleDrawRenderable();
    //this.toggleDrawRigidShape();
    
}

gEngine.Core.inheritPrototype(Stone, WASDObj);


Stone.prototype.update = function (mCamera) {
    GameObject.prototype.update.call(this);
};
