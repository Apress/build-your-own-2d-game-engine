/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global GameObject, gEngine */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function SuperBulletH(spriteTexture,xPox, yPos, flag, se) {
    this.kDelta = 1;
    //this.kbulletH= "assets/shell.png";
    this.mFlag = flag;
    this.mSuperBulletH = new LightRenderable(spriteTexture);
    this.mSuperBulletH.setColor([1,1, 1, 0.0]);
    this.mSuperBulletH.getXform().setPosition(xPox, yPos+7);
    this.mSuperBulletH.getXform().setSize(5, 5);
    this.firese = se;
    GameObject.call(this, this.mSuperBulletH);
}
gEngine.Core.inheritPrototype(SuperBulletH, GameObject);

SuperBulletH.prototype.update = function () {
    var xform = this.mSuperBulletH.getXform();
    if(this.mFlag === 0){
        if(this.firese === 0){
        xform.incXPosBy(this.kDelta);}
        if(this.firese === 1){
        xform.incXPosBy(this.kDelta);
        xform.incYPosBy(0.2*this.kDelta);}
        if(this.firese === 2){
        xform.incXPosBy(this.kDelta);
        xform.incYPosBy(0.2*(-this.kDelta));}
    }else if(this.mFlag === 1){
        if(this.firese === 0){
        xform.incXPosBy(-this.kDelta);}
        if(this.firese === 1){
        xform.incXPosBy(-this.kDelta);
        xform.incYPosBy(0.2*this.kDelta);}
        if(this.firese === 2){
        xform.incXPosBy(-this.kDelta);
        xform.incYPosBy(0.2*(-this.kDelta));}
    }else if(this.mFlag === 2){
        if(this.firese === 0){
        xform.incXPosBy(this.kDelta);}
        if(this.firese === 1){
        xform.incXPosBy(this.kDelta);
        xform.incYPosBy(0.2*this.kDelta);}
        if(this.firese === 2){
        xform.incXPosBy(this.kDelta);
        xform.incYPosBy(0.2*(-this.kDelta));}
    }else if(this.mFlag === 3){
        if(this.firese === 0){
        xform.incXPosBy(this.kDelta);}
        if(this.firese === 1){
        xform.incXPosBy(this.kDelta);
        xform.incYPosBy(0.2*this.kDelta);}
        if(this.firese === 2){
        xform.incXPosBy(this.kDelta);
        xform.incYPosBy(0.2*(-this.kDelta));}
    }
    
    /*if(this.getXform().getXPos() > 48 || this.getXform().getXPos() < -48)
        this = null;*/
};