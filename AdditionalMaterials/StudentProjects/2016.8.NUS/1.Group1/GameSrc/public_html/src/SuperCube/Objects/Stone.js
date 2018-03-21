/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, IllumRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Stone(cx, cy, width, height, png) {
    this.kDir = 0;
    this.kDelta = 0.2;
    this.kStone = png;
    
    this.mDegree = 90;
    this.mStone = new TextureRenderable(this.kStone);
    this.mStone.setColor([0, 0, 0, 0]);
    this.mStone.getXform().setPosition(cx, cy);
    this.mStone.getXform().setSize(width, height);

    GameObject.call(this, this.mStone);
    var r = new RigidRectangle(this.getXform(),width, height);
    r.setMass(0);  // less dense than Minions
    r.setRestitution(0.3);
    r.setColor([0, 1, 0, 1]);
    r.setDrawBounds(false);
    r.setAcceleration([0, -50]);
    this.setPhysicsComponent(r);
}
gEngine.Core.inheritPrototype(Stone, GameObject);

Stone.prototype.update = function () {
    
    // move towards the left and wraps
    var xform = this.getXform();
    
    if(!(this.kDir)){
       xform.incYPosBy(-this.kDelta);
       
    }
    else{
       xform.incYPosBy(this.kDelta); 
       
    }
    
    // if fly off to the left, re-appear at the right
    if (xform.getYPos() < 125 ) {
        this.kDir = 1;
    }
    if (xform.getYPos() > 145)  {
        this.kDir = 0;
    }
    
    
    
};

Stone.prototype.setDelta = function (delta) { this.kDelta = delta; };


