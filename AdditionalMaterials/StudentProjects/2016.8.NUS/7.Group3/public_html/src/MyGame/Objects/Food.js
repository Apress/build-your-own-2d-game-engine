/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
Food.eFoodType = Object.freeze({
    eRed: 0,
    eGreen: 1,
    eYello: 2,
    eBlue: 3
});
function Food(spriteTexture, normalMap, type, atX, atY) {
    this.aRotateAngle = 10;
    this.aScaleSize = 1.2;
    this.aDeltaAngle = 0.5;
    this.aDeltaSize = 0.01;
    this.mRotateDir = true;
    this.mScaleDir = true;
    
  
    this.mFoodType = type;
    this.mEaten = false;
    if (normalMap !== null) {
        this.mDye = new IllumRenderable(spriteTexture, normalMap);
    } else {
        this.mDye = new LightRenderable(spriteTexture);
    }
    
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(atX, atY);
    this.mDye.getXform().setSize(5, 5);
    this.mDye.getXform().setRotationInDegree(-10);
    this.mDye.setElementPixelPositions(0, 64, 0, 64);
    GameObject.call(this, this.mDye);
    
    this.size = this.getXform().getSize()[0];
};
gEngine.Core.inheritPrototype(Food, GameObject);

Food.prototype.getType = function(){ return this.mFoodType; };
Food.prototype.update = function () {
    if(this.mRotateDir){
        this.getXform().incRotationByDegree(this.aDeltaAngle);
        if(this.getXform().getRotationInDegree() > this.aRotateAngle)
            this.mRotateDir = false;
    }
    else {
        this.getXform().incRotationByDegree(-this.aDeltaAngle);
        if(this.getXform().getRotationInDegree() < -this.aRotateAngle)
            this.mRotateDir = true;
    }
    
    if(this.mScaleDir){
        this.getXform().incSizeBy(this.aDeltaSize);
        if(this.getXform().getSize()[0] > this.size * this.aScaleSize)
            this.mScaleDir = false;
    }
    else {
        this.getXform().incSizeBy(-this.aDeltaSize);
        if(this.getXform().getSize()[0] < this.size)
            this.mScaleDir = true;
    }
    
};