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

function BreakableWall(spriteTexture) {
    this.mIsDead = false;
    this.mIsBreakable = true;
    this.mBreakableWall = new LightRenderable(spriteTexture);
    this.mBreakableWall.setColor([1, 1, 1, 0]);
    this.mBreakableWall.setElementPixelPositions(120, 300, 0, 180);
    GameObject.call(this, this.mBreakableWall);
    
    var r = new RigidRectangle(this.mBreakableWall.getXform(), 10, 10);  
    this.setRigidBody(r);
    
    
    //this.toggleDrawRenderable();
   // this.toggleDrawRigidShape();
}
gEngine.Core.inheritPrototype(BreakableWall, GameObject);

BreakableWall.prototype.update = function () {
    GameObject.prototype.update.call(this);
    
};

BreakableWall.prototype.IsDead = function () {
  return this.mIsDead;  
};

BreakableWall.prototype.MarkDead = function (){
    this.mIsDead = true;
};

BreakableWall.prototype.IsBreakable = function (){
    return this.mIsBreakable;
};