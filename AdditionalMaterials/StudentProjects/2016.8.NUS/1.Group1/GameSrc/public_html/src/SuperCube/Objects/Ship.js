/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, IllumRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Ship(cx, cy, width, height, png, left, right, type) {
    this.kDir = 0;
    this.kDelta = 0.2;
    this.kShip = png;
    
    this.mType = type;
    this.mLeft = left;
    this.mRight = right;
    this.mShip = new TextureRenderable(this.kShip);
    this.mShip.setColor([0, 0, 0, 0]);
    this.mShip.getXform().setPosition(cx, cy);
    this.mShip.getXform().setSize(width, height);
    
    GameObject.call(this, this.mShip);
    var r = new RigidRectangle(this.getXform(),width, height);
    r.setMass(0);  // less dense than Minions
    r.setRestitution(0.3);
    r.setColor([0, 1, 0, 1]);
    r.setDrawBounds(false);
    r.setAcceleration([0, -50]);
    this.setPhysicsComponent(r);
}
gEngine.Core.inheritPrototype(Ship, GameObject);

Ship.prototype.update = function () {

    // move towards the left and wraps
    var xform = this.getXform();
    if(this.mType === 1){
    if(!(this.kDir)){
       xform.incXPosBy(this.kDelta);
       
    }
    else{
       xform.incXPosBy(-this.kDelta); 
       
    }
    
    // if fly off to the left, re-appear at the right
    if (xform.getXPos() < this.mLeft ) {
        this.kDir = 0;
        xform.setRotationInDegree(360);
    }
    if (xform.getXPos() > this.mRight)  {
        this.kDir = 1;
        xform.setRotationInDegree(180);
    }
    }
    
    if(this.mType === 2){
    if(!(this.kDir)){
       xform.incYPosBy(this.kDelta);
       xform.incXPosBy(this.kDelta);
    }
    else{
       xform.incYPosBy(-this.kDelta); 
       xform.incXPosBy(-this.kDelta);
    }
    
    // if fly off to the left, re-appear at the right
    if (xform.getYPos() < this.mLeft ) {
        this.kDir = 0;
        xform.setRotationInDegree(360);
    }
    if (xform.getYPos() > this.mRight)  {
        this.kDir = 1;
        xform.setRotationInDegree(180);
    }
    }
    
    if(this.mType === 3){
    if(!(this.kDir)){
       xform.incYPosBy(this.kDelta);
       
    }
    else{
       xform.incYPosBy(-this.kDelta); 
       
    }
    
    // if fly off to the left, re-appear at the right
    if (xform.getYPos() < this.mLeft ) {
        this.kDir = 0;
        xform.setRotationInDegree(360);
    }
    if (xform.getYPos() > this.mRight)  {
        this.kDir = 1;
        xform.setRotationInDegree(180);
    }
    }
};

Ship.prototype.setDelta = function (delta) { this.kDelta = delta; };

