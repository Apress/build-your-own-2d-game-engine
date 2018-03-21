/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Balloon(spriteTexture, normalMap, atX, atY) {
    
    this.kRotate = 50;
    this.kPower = 0.01;
    this.kForce = 0.01;
    this.kRes = 0.005;
    this.kGra = 0.03;
    
    this.kFallSpeed = 0.001;
    this.maxUpSpeed = 0.3;
    this.maxDownSpeed = 0.3;
    this.maxFrontSpeed = 0.3;
    
    
    this.mHit = false;
    this.mHasEnergy = true;
    this.mEnergy = 100;
    this.kDeltaEnergy = 0.2;
    this.mSpeedX = 0;
    this.mSpeedY = 0;
    
    if (normalMap !== null) {
        this.mDye = new IllumRenderable(spriteTexture, normalMap);
    } else {
        this.mDye = new LightRenderable(spriteTexture);
    }
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(atX, atY);
    this.mDye.getXform().setSize(10, 10);
    this.mDye.setElementPixelPositions(0, 128, 0, 128);
    GameObject.call(this, this.mDye);
}
gEngine.Core.inheritPrototype(Balloon, GameObject);

Balloon.prototype.update = function () {
     
    this.mEnergy -= this.kDeltaEnergy * 0.1;
    if(this.mEnergy <= 0){
        this.mEnergy = 0;
        this.mHasEnergy = false;
    }else{
        this.mHasEnergy = true;
    }

    // control by WASD
    var xf = this.getXform();
    if(this.mHit){
        this.mSpeedY -= this.kGra;
        xf.incYPosBy(this.mSpeedY);
        
    } else {
        this.mSpeedY -= this.kPower/5;
        if(this.mHasEnergy){
            if(gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
                this.mSpeedY += this.kPower;
                this.mEnergy -= this.kDeltaEnergy;
                //console.log(this.mSpeedY);
            }  
            if(gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
                this.mSpeedY -= this.kPower/2 ;
                //console.log(this.mSpeedY);
            }
            // if(!gEngine.Input.isKeyPressed(gEngine.Input.keys.W && 
            //         !gEngine.Input.isKeyPressed(gEngine.Input.keys.S)))
            //     //if(this.mSpeedY < -this.kFallSpeed)
            //         this.mSpeedY -= this.kFallSpeed ;
                
        }
        //else if(this.mSpeedY < -this.kFallSpeed)
          //   this.mSpeedY = -this.kFallSpeed;
    
    if(this.mSpeedY > this.maxUpSpeed)
        this.mSpeedY = this.maxUpSpeed;
    if(this.mSpeedY < -this.maxDownSpeed)
        this.mSpeedY = -this.maxDownSpeed;
//    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
//        this.mSpeedY -= this.kPower;
//        if(this.mSpeedY < -this.maxDownSpeed)
//            this.mSpeedY = -this.maxDownSpeed;
//        
//    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        this.mSpeedX -= this.kForce;
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        this.mSpeedX += this.kForce;
    }
    
        if(this.mSpeedX <= -this.maxFrontSpeed)
            this.mSpeedX = -this.maxFrontSpeed;
        if(this.mSpeedX >= this.maxFrontSpeed)
            this.mSpeedX = this.maxFrontSpeed;
    if( !gEngine.Input.isKeyPressed(gEngine.Input.keys.A) && 
            !gEngine.Input.isKeyPressed(gEngine.Input.keys.D))
    if(this.mSpeedX>0){
        this.mSpeedX -= this.kRes;
        if(this.mSpeedX<0) this.mSpeedX = 0;
    }
    else if(this.mSpeedX<0){
        this.mSpeedX += this.kRes;
        if(this.mSpeedX>0) this.mSpeedX = 0;
    }
    xf.incYPosBy(this.mSpeedY);
    xf.incXPosBy(this.mSpeedX);
    xf.setRotationInDegree(this.mSpeedX * this.kRotate);
    
    }
};

Balloon.prototype.getNeedType = function() { return this.mNeedType; };