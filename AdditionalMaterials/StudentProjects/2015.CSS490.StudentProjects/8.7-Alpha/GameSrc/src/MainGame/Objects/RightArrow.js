/*
 * Team 7-Alpha
 * CSS 490C
 * 2D Game Engine Design
 * File: RightArrow.js 
 * 
 * This object is for a graphic on the welcome screen
 * 
 */

"use strict";


function RightArrow(texture, xPos, yPos) {
    
    
    this.mRightArrow = new TextureRenderable(texture);
    
    this.mRightArrow.setColor([1,1,1,1]);
    this.mRightArrow.getXform().setPosition(xPos, yPos);
    this.mRightArrow.getXform().setZPos(5);
    this.mRightArrow.getXform().setSize(5, 5);
    GameObject.call(this, this.mRightArrow);
}

gEngine.Core.inheritPrototype(RightArrow, GameObject);