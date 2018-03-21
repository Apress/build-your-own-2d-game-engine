/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global MyCamera, gEngine, Camera */


/*
 * 
 * 
 * 
 * 
 * 
 * 
 * By 龚楚涵 (Dino) in Singapore
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
function CameraChase(wcCenter, wcWidth, viewportArray, bound){
    Camera.call(this,wcCenter, wcWidth, viewportArray, bound);
    this.mTarget = null;
};

gEngine.Core.inheritPrototype(CameraChase,Camera);

CameraChase.prototype.setTarget = function(target){
    this.mTarget = target;
};

CameraChase.prototype.update = function(){
    if(this.mTarget){
        Camera.prototype.setWCCenter.call(this,this.mTarget.getXform().getXPos(),this.mTarget.getXform().getYPos());
    }
    
    Camera.prototype.update.call(this);
};
