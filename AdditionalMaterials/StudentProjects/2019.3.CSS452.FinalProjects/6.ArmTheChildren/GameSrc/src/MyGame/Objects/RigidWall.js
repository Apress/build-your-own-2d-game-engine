/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable, vec2: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

//const TARGET_WIDTH = 4;
//const TARGET_HEIGHT = 4;

function RigidWall(spriteTexture) {
    this.mIsDead = false;
    this.mIsBreakable = false;
    this.mRigidWall = new LightRenderable(spriteTexture);
    this.mRigidWall.setColor([1, 1, 1, 0]);
    this.mRigidWall.setElementPixelPositions(120, 300, 0, 180);
    GameObject.call(this, this.mRigidWall);
    
    var r = new RigidRectangle(this.mRigidWall.getXform(), 10, 10);  
    this.setRigidBody(r);
    r.setMass(0);
    //this.toggleDrawRenderable();
   // this.toggleDrawRigidShape();
}
gEngine.Core.inheritPrototype(RigidWall, GameObject);

RigidWall.prototype.update = function () {
    GameObject.prototype.update.call(this);
    
};

RigidWall.prototype.IsDead = function () {
  return this.mIsDead;  
};

RigidWall.prototype.MarkDead = function (){
    this.mIsDead = true;
};

RigidWall.prototype.IsBreakable = function (){
    return this.mIsBreakable;
};
