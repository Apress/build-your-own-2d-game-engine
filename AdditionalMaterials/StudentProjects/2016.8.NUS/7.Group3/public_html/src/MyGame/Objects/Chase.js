/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global GameObject, gEngine */

"use strict"; 


function Chase(spriteTexture, normalMap, atX, atY) {
    this.kDeltaDegree = 1;
    this.kDeltaRad = Math.PI * this.kDeltaDegree / 180;
    this.kDeltaSpeed = 0.01;
    
    if(normalMap !== null) {
        this.mDye = new IllumRenderable(spriteTexture, normalMap);
    } else {
        this.mDye = new LightRenderable(spriteTexture);
    }
    
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(atX, atY);
    this.mDye.getXform().setSize(6, 6);
    //this.mDye.setElementPixelPositions(0, 64, 0, 32);
    
    this.rate = 0.1;    /// graduate rate
    GameObject.call(this, this.mDye);
    
    this.setCurrentFrontDir([-1, 1]);

    this.setSpeed(0.05);
}
gEngine.Core.inheritPrototype(Chase, GameObject);


Chase.prototype.update = function (balloon) {
    
    this.rotateObjPointTo(balloon.getXform().getPosition(), this.rate);
    GameObject.prototype.update.call(this);  
};

        // When "K" is typed, the following should also be executed.
   
      
