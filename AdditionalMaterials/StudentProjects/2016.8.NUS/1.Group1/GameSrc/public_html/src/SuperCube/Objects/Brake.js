/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, IllumRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Brake(cx, width, height, top, down, delta1, delta2) {
    this.kBrake = "assets/Level1/gear4.png" ;
    
    this.kDir = 0;
    this.mWidth = width;
    this.mHeight = height;
    this.mTop = top;
    this.mDown = down;
    this.mDelta1 = delta1;
    this.mDelta2 = delta2;
    this.mCenterY = this.mDown + Math.random()*(this.mTop-this.mDown);
    this.mBrake = new TextureRenderable(this.kBrake);
    this.mBrake.setColor([0, 0, 0, 0]);
    this.mBrake.getXform().setPosition(cx, this.mCenterY);
    this.mBrake.getXform().setSize(this.mWidth,this.mHeight);
    GameObject.call(this, this.mBrake);
    
}
gEngine.Core.inheritPrototype(Brake, GameObject);

Brake.prototype.update = function () {

    // move towards the left and wraps

    var xform = this.getXform();
    if(!(this.kDir)){
       xform.incYPosBy(-this.mDelta1);
       
    }
    else{
       xform.incYPosBy(this.mDelta1); 
       
    }
    
    xform.incRotationByDegree(this.mDelta2);

    // if fly off to the left, re-appear at the right
    if (xform.getYPos() < this.mDown + this.mHeight/2 ) {
        this.kDir = 1;
    }
    if (xform.getYPos() > (this.mTop - this.mHeight/2))  {
        this.kDir = 0;
    }
    
};

