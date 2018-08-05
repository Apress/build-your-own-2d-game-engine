/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*jslint node: true, vars: true */
/*global WASDObj, gEngine: false, GameObject: false, SpriteAnimateRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */


"use strict"; 
function Lever(spriteTexture, atX, atY, w, h) {
    
    this.mLever = new SpriteAnimateRenderable(spriteTexture);
    this.mLever.setColor([1, 1, 1, 0]);
    this.mLever.getXform().setPosition(atX, atY);
    this.mLever.getXform().setSize(w, h);

    GameObject.call(this, this.mLever);
    var r;
    r = new RigidRectangle(this.getXform(), w, h);
    r.setInertia(0);
    r.setRestitution(0);
    r.setMass(0);
    this.setRigidBody(r);
    //this.toggleDrawRenderable();

}

gEngine.Core.inheritPrototype(Lever, GameObject);

Lever.prototype.update = function () {
    GameObject.prototype.update.call(this);
    //this.mMonster.updateAnimation();
   //this.getRigidBody().setTransform(this.mLever.getXform());

};
