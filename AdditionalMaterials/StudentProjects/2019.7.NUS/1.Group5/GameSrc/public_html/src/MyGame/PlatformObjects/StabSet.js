/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global GameObject, gEngine, WASDObj */

"use strict";

//llX -> lower left X
function StabSet(t, n, llX, llY, isVertical, isReverse) {
    GameObjectSet.call(this);
    
    this.kW = 46;
    this.kH = 46;
    
    if (isVertical) {
        this.stX = llX + this.kH / 2 * (isReverse ? -1 : 1);
        this.stY = llY + this.kW / 2;
    }
    else {
        this.stX = llX + this.kW / 2;
        this.stY = llY + this.kH / 2 * (isReverse ? -1 : 1);
    }
    
    this.mRot = 0;
    if (isVertical) this.mRot -= 90;
    if (isReverse) this.mRot -= 180;
    
    if (isVertical) {
        for (var i = 0; i < n; i++) {
            var nowY = this.stY + i * this.kW;
            this.addToSet( new Stab(t, this.stX, nowY, this.kW, this.kH, this.mRot) );
        }
    }
    else {
        for (var i = 0; i < n; i++) {
            var nowX = this.stX + i * this.kW;
            this.addToSet( new Stab(t, nowX, this.stY, this.kW, this.kH, this.mRot) );
        }
    }
}

gEngine.Core.inheritPrototype(StabSet, GameObjectSet);

StabSet.prototype.setVisibility = function(visible){
    var num = this.size();
    var i;
    for(i=0;i<num;i++){
        this.getObjectAt(i).setVisibility(visible);
    }
};

StabSet.prototype.setTouchable = function () {
    for (var i = 0; i < this.size(); i++) {
        this.getObjectAt(i).setTouchable();
    }
}

StabSet.prototype.moveTo = function(toX,toY,V){
    var num = this.size();
    var i;
    for(i=0;i<num;i++){
        this.getObjectAt(i).moveTo(toX,toY,V);
        //-700,-270
    }
};

StabSet.prototype.moveLeft = function(V, des){
    var num = this.size();
    var i;
    for(i=0;i<num;i++){
        this.getObjectAt(i).moveLeft(V, des);
        //-700,-270
    }
};

StabSet.prototype.moveRight = function(V){
    var num = this.size();
    var i;
    for(i=0;i<num;i++){
        this.getObjectAt(i).moveRight(V);
        //-700,-270
    }
};

StabSet.prototype.moveUp = function(V){
    var num = this.size();
    var i;
    for(i=0;i<num;i++){
        this.getObjectAt(i).moveUp(V);
        //-700,-270
    }
};

StabSet.prototype.moveDown = function(V){
    var num = this.size();
    var i;
    for(i=0;i<num;i++){
        this.getObjectAt(i).moveDown(V);
        //-700,-270
    }
};
