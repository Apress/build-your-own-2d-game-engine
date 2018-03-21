/*
 * @auth: Caleb Larson
 * @file: Fish.js
 * @date: 11-27-15
 * @brief: Hook class
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject, vec2: false */

"use strict";

function Hook(texture) {
    this.mHook = new LightRenderable(texture);
    this.mHook.setColor([1,1,1,0]);
    this.mHook.getXform().setPosition(-12, 0);
    this.mHook.getXform().setSize(2, 2);
    this.mHook.setElementPixelPositions(0, 32, 0, 32);
    GameObject.call(this, this.mHook);
    this.mLength = 90;
    this.mStatus = 0;
    this.mSpeed = 0.15;
}
gEngine.Core.inheritPrototype(Hook, GameObject);

Hook.prototype.update = function (){
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.W) || this.mStatus === 1){
        if(this.getXform().getYPos() < 0){
            this.getXform().incYPosBy(this.mSpeed);
            this.mStatus = 1;
        }else{
            this.mStatus = 0;
        }
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.S) || this.mStatus === 2){
        if(this.getXform().getYPos() > (this.mLength * (-1))){
            this.getXform().incYPosBy(-this.mSpeed);
            this.mStatus = 2;
        }else{
            this.mStatus = 0;
        }
    }
};

Hook.prototype.setLineLength = function (length) {
    if(length > 300) return;
    this.mLength = length;
};

Hook.prototype.getLineLength = function () {
    return this.mLength;
};

Hook.prototype.adjustSpeed = function(weight){
    var reduce = this.mSpeed * (weight/(weight*3))/(weight/5);
    this.mSpeed -= reduce;
    if(this.mSpeed < 0.06){
        this.mSpeed = 0.06;
    }
};

Hook.prototype.resetSpeed = function(){
    this.mSpeed = 0.15;
};

Hook.prototype.getStatus = function () {
    return this.mStatus;
};

Hook.prototype.setStatus = function (status) {
    this.mStatus = status;
};

