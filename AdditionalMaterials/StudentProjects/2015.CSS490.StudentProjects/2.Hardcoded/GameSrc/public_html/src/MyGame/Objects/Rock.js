/* 
 * Author: Tyler Green, Steven Roberts
 * File: Rock.js
 * Purpose: This file contains the Rock object and update logic.
 */

function Rock(sprite, atX, atY, target, normalMap) {
    if (normalMap === null) {
        this.mRock = new LightRenderable(sprite);
    } else {
        this.mRock = new IllumRenderable(sprite, normalMap);
    }
    
    this.mRock.setColor([1, 1, 0, 0]);
    this.mRock.getXform().setSize(7, 7);
    this.mRock.getXform().setPosition(atX, atY);
    
    this.mRock.setElementPixelPositions(0, 75, 56, 128);
    
    GameObject.call(this, this.mRock); 
    
    this.mSpeed = 0.03;
    this.mRate = 0.015;  //the rate at which speed increases.
    this.mTurnSpeed = 360; //turn speed in degrees per second
    this.mTarget = target;
    this.kDamage = 1;
}
gEngine.Core.inheritPrototype(Rock, GameObject);

/*
 * The rock falls from top to bottom at an increasing rate.
 */
Rock.prototype.update = function() {
    
    //Spin while falling
    this.getXform().incRotationByDegree(this.mTurnSpeed / 60);
    
    //Check for hero hit
    //Does BBox get wierd for rotating objects? Rocks spin quickly so it 
    //might not be noticable, but maybe still could be a concern
    if (this.mTarget !== null){
        if(this.getBBox().boundCollideStatus(this.mTarget.getBBox()) > 0) {
            this.mTarget.damage(1);
            this.setVisibility = false;
        }
    }
    
    //Default moving behavior - just move left
    this.mRock.getXform().incYPosBy(-this.mSpeed);
    
    //Gradually increase falling speed
    this.mSpeed += this.mRate;
};

Rock.prototype.setRate = function (rate) {this.mRate = rate; };
