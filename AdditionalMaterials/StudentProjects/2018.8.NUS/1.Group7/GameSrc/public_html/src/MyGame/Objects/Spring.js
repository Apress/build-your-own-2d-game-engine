/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*jslint node: true, vars: true */
/*global WASDObj, gEngine: false, GameObject: false, SpriteAnimateRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict"; 

function Spring(spriteTexture, atX, atY, w, h,top,left) {
    
    this.mSpring = new SpriteAnimateRenderable(spriteTexture);
    this.mSpring.setColor([1, 1, 1, 0]);
    this.mSpring.getXform().setPosition(atX, atY);
    this.mSpring.getXform().setSize(w, h);
    this.mSpring.setSpriteSequence(top,left,150,150,6,0);
    this.mSpring.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.mSpring.setAnimationSpeed(1);
    this.setBoundRadius(w/2);
    this.mWidth=w;
    this.mHeight=h;
    
    GameObject.call(this, this.mSpring);
    
    var r = new RigidRectangle(this.getXform(), w, h);
    r.setMass(0);
    this.setRigidBody(r);
    //this.toggleDrawRigidShape();
}

gEngine.Core.inheritPrototype(Spring, GameObject);

Spring.prototype.update = function () {
    GameObject.prototype.update.call(this);
    this.mSpring.updateAnimation();
    //console.log(this.mSpring.mCurrentElm);
};




