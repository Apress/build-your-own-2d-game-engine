/*
 * Team 7-Alpha
 * CSS 490C
 * 2D Game Engine Design
 * File: LeftArrow.js 
 * 
 * This object is for a graphic on the welcome screen
 * 
 */

"use strict";

function LeftArrow(texture, xPos, yPos) {
    
    this.mLeftArrow = new TextureRenderable(texture);
    
    this.mLeftArrow.setColor([1,1,1,1]);
    this.mLeftArrow.getXform().setPosition(xPos, yPos);
    this.mLeftArrow.getXform().setZPos(5);
    this.mLeftArrow.getXform().setSize(5, 5);
    GameObject.call(this, this.mLeftArrow);
}

gEngine.Core.inheritPrototype(LeftArrow, GameObject);

LeftArrow.prototype.update = function() {
    
    
    
};