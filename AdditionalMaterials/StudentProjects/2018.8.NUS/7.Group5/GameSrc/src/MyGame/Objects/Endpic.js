/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* File: startpic.js 
 *
 * Creates and initializes the startpicture (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Endpic(spriteTexture, atX, atY, size1,size2) {
        
    
    this.mEndpic = new SpriteRenderable(spriteTexture);
    this.mEndpic.setColor([1, 1, 1, 0]);
    this.mEndpic.getXform().setPosition(atX, atY);
    this.mEndpic.getXform().setSize(size1, size2);
    this.mEndpic.setElementUVCoordinate(0, 1, 0, 1);
    GameObject.call(this, this.mEndpic);
    this.setSpeed(0);
    /*var r;

    r = new RigidRectangle(this.getXform(), size1, size2);
    this.setRigidBody(r);
    r.setMass(0);
    //this.toggleDrawRenderable();
    this.toggleDrawRigidShape();*/
}

gEngine.Core.inheritPrototype(Endpic, GameObject);


Endpic.prototype.update = function () {
    
    GameObject.prototype.update.call(this);
};