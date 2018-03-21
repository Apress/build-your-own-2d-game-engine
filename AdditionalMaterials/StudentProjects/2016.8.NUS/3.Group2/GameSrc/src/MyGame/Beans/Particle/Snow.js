/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global GameObject, gEngine */


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
function Snow(renderable){
    GameObject.call(this,renderable);
    this.mSpeed = [0,0];
    this.mRotation = 0;
}
gEngine.Core.inheritPrototype(Snow,GameObject);

Snow.prototype.setspeed = function(speed){
    this.mSpeed = speed;
};
Snow.prototype.getspeed = function(){
    return this.mSpeed;
};

Snow.prototype.setrotation = function(rotation){
    this.mRotation = rotation;
};
Snow.prototype.getrotation = function(){
    return this.mRotation;
};

Snow.prototype.getXform = function(){
    return GameObject.prototype.getXform.call(this);
};

Snow.prototype.update = function(){
    GameObject.prototype.update.call(this);
    
};

Snow.prototype.draw = function(aCamera){
    GameObject.prototype.draw.call(this,aCamera);
};

