/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


"use strict";  // Operate in Strict mode such that variables must be declared before used!

function ItemPoint(posX, posY) {

    this.item = new Renderable();
    this.item.setColor([1, 1, 1, 1]);
    this.item.getXform().setPosition(posX, posY);
    this.item.getXform().setRotationInRad(0.78); // In Radians
    this.item.getXform().setSize(0, 0);
    this.isFound = false;
    //this.mDye.setElementPixelPositions(0, 120, 0, 180);
}
//gEngine.Core.inheritPrototype(Item, GameObject);

Item.prototype.update = function () {
    
};