/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global Light, gEngine */

function MyLight(target){
    
    this.mLight = new Light();
    this.mLight.setColor([0.8,0.6,0.0,1.0]);
    this.mLight.setXPos(0);
    this.mLight.setYPos(0);
    this.mLight.setZPos(0);
    this.mLight.setNear(14);
    this.mLight.setFar(20);
    this.mLight.setDirection([0,0,-1]);
    this.mLight.setIntensity(15);
    
    this.mTarget = target;
    this.mLinarRate = 10;
};

gEngine.Core.inheritPrototype(MyLight,Light);

MyLight.prototype.getLight = function(){
    return this.mLight;
};

MyLight.prototype.draw = function(aCamera){
    
};

MyLight.prototype.update = function(){
    
    var current = this.mLight.getPosition();
    var target = this.mTarget.getXform().getPosition();
    var deltaX = target[0] - current[0] - 12;
    var deltaY = target[1] - current[1] + 4;

    if(Math.abs(deltaX) > 0.1 || Math.abs(deltaY) > 0.1){
        this.mLight.set2DPosition([current[0] + deltaX / this.mLinarRate,current[1] + deltaY / this.mLinarRate]);
    }
};