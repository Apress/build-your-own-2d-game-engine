"use strict";  // Operate in Strict mode such that variables must be declared before used!

function IceCreamArrow(spriteTexture,xform) {
    this.kTag = "Arrow";
    
    this.mArrow = new SpriteRenderable(spriteTexture);
    this.mArrow.setColor([1,1,1, 0]);
    this.mArrow.getXform().setPosition(xform[0],xform[1]);
    this.mArrow.getXform().setSize(xform[2],xform[3]);
    this.mArrow.setElementPixelPositions(512, 640, 896, 1024);
    GameObject.call(this, this.mArrow);
}
gEngine.Core.inheritPrototype(IceCreamArrow, GameObject);

IceCreamArrow.prototype.update = function (originalX) {
    this.mArrow.getXform().setXPos(originalX);
};/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


