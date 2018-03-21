/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, IllumRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Meteor(cx, cy,size, png, top, down, delta1,delta2) {
    
    this.kDelta1 = delta1;
    this.kDelta2 = delta2;
    switch(png)
   {
        case 0:
            this.kMeteor = "assets/Level4/meteorBrown1.png" ; 
            break;
        case 1:
            this.kMeteor = "assets/Level4/meteorBrown2.png" ; 
            break;
        case 2:
            this.kMeteor = "assets/Level4/meteorBrown3.png" ; 
            break;
        case 3:
            this.kMeteor = "assets/Level4/meteorBrown4.png" ; 
            break;    
        case 4:
            this.kMeteor = "assets/Level4/meteorGrey1.png" ; 
            break;
        case 5:
            this.kMeteor = "assets/Level4/meteorGrey2.png" ; 
            break;
        case 6:
            this.kMeteor = "assets/Level4/meteorGrey3.png" ; 
            break;
        case 7:
            this.kMeteor = "assets/Level4/meteorGrey4.png" ; 
            break;     
    }
    
    
    this.mDeltaT = 0.2;
    
    this.mWidth = size;
    this.mHeight = size;
    
    this.mTop = top;
    this.mDown = down;
    this.mMeteor = new TextureRenderable(this.kMeteor);
    this.mMeteor.setColor([0, 0, 0, 0]);
    this.mMeteor.getXform().setPosition(cx, cy);
    this.mMeteor.getXform().setSize(this.mWidth, this.mHeight);
    
    GameObject.call(this, this.mMeteor);
}

gEngine.Core.inheritPrototype(Meteor, GameObject);

Meteor.prototype.update = function () {
    var size;
    // move towards the left and wraps
    var xform = this.getXform();
    xform.incXPosBy(this.kDelta2);
    xform.incYPosBy(-(this.kDelta1+0.1*this.mDeltaT));
    
    if (xform.getYPos() < this.mDown + this.mHeight/2)  {
        
        xform.setYPos(this.mTop);
        xform.setXPos(27+53*Math.random());
        size = 3+8*Math.random();
        xform.setWidth(size);
        xform.setHeight(size);
        this.kDelta1 = 0.3+0.5*Math.random();
        this.kDelta2 = 0.15+0.22*Math.random();
        
    }
    
    if (xform.getXPos() > 160 - this.mWidth)  {
        
        xform.setYPos(this.mTop);
        xform.setXPos(27+53*Math.random());
        size = 3+8*Math.random();
        xform.setWidth(size);
        xform.setHeight(size);
        this.kDelta1 = 0.3+0.5*Math.random();
        this.kDelta2 = 0.15+0.22*Math.random();
        
    }
    
};


