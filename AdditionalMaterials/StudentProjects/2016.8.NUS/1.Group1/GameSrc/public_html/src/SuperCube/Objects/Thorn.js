/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, IllumRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Thorn(cx, cy, width, height, delta1, delta2) {
    this.kThorn = "assets/Level1/gear3.png" ;
    
    this.kDir = 0;
    this.mDelta1 = delta1;
    this.mDelta2 = delta2;
    this.mCenterX = cx;
    this.mWidth = width;
    this.mThorn = new TextureRenderable(this.kThorn);
    this.mThorn.setColor([0, 0, 0, 0]);
    this.mThorn.getXform().setPosition(this.mCenterX-this.mWidth/2+Math.random()*this.mWidth, cy);
    this.mThorn.getXform().setSize(this.mWidth, height);
    GameObject.call(this, this.mThorn);
    //var r = new RigidRectangle(this.getXform(),  this.mWidth, height);
    //r.setMass(0);  // less dense than Minions
    //r.setRestitution(0.3);
    //r.setColor([0, 1, 0, 1]);
    //r.setDrawBounds(false);
    //r.setAcceleration([0, -50]);
    //this.setPhysicsComponent(r);
}
gEngine.Core.inheritPrototype(Thorn, GameObject);

Thorn.prototype.update = function () {

    // move towards the left and wraps

    var xform = this.getXform();
    if(!(this.kDir)){
       xform.incXPosBy(-this.mDelta1);
    }
    else{
       xform.incXPosBy(this.mDelta1); 
    }
    
    

    // if fly off to the left, re-appear at the right
    if (xform.getXPos() < this.mCenterX - this.mWidth) {
        this.kDir = 1;
    }
    if (xform.getXPos() > this.mCenterX + this.mWidth) {
        this.kDir = 0;
    }
    
    xform.incRotationByDegree(this.mDelta2);
};
