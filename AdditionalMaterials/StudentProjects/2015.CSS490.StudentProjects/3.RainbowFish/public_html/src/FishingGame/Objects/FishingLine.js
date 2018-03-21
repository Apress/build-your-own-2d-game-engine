/*
 * @auth: Herbert Traut
 * @file: Fisherman.js
 * @date: 11-27-15
 * @brief: The fisherman controlled by the player character
 */

/* global GameObject, gEngine */

'use strict';

function FishingLine(texture) {
    this.mFishingLine = new LightRenderable(texture);
    this.mFishingLine.setColor([1,1,1,0]);
    this.mFishingLine.getXform().setPosition(-12, 3.5);
    this.mFishingLine.getXform().setSize(0.1, 4.9);
    this.mFishingLine.setElementPixelPositions(0, 8, 0, 256);
    GameObject.call(this, this.mFishingLine);
}
gEngine.Core.inheritPrototype(FishingLine, GameObject);

FishingLine.prototype.update = function(boatXform, hookXform){
    var lineXform = this.mFishingLine.getXform();
    
    var boatTopLeftY = boatXform.getYPos() + boatXform.getHeight()/2;
    
    var topY =  boatTopLeftY + hookXform.getYPos();
    
    lineXform.setXPos(hookXform.getXPos());
    lineXform.setYPos(topY / 2 + 0.45);
    
    var newHeight = boatTopLeftY - hookXform.getYPos();
    newHeight = Math.abs(newHeight);
    lineXform.setHeight(newHeight - 1);
};