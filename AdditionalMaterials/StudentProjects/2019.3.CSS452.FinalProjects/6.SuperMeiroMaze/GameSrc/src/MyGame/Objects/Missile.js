/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable, vec2: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

const MISSILE_WIDTH = 2;
const MISSILE_HEIGHT = 2;

function Missile(spriteTexture, pos, target, fireset) {
    this.mFireSet = fireset;
    this.mTarget = target;
    this.mMissile = new SpriteRenderable(spriteTexture);
    this.mMissile.setColor([1, 1, 1, 0]);
    this.mMissile.getXform().setPosition(pos[0], pos[1]-5);
    this.mMissile.getXform().setSize(MISSILE_WIDTH, MISSILE_HEIGHT);
    //this.mMissile.getXform().incRotationByDegree(180);
    
    this.mMissile.setElementPixelPositions(10, 35, 0, 40);
    this.mFire = null;

    GameObject.call(this, this.mMissile);
    
    this.mTimer = 0;
    this.mMoveSpeed = 1;
    this.mX = MISSILE_WIDTH;           //Width
    this.mY = MISSILE_HEIGHT;          //Height
    this.mInterp = null;
}
gEngine.Core.inheritPrototype(Missile, GameObject);

Missile.prototype.update = function () {
    this.mTimer += 1;
    //console.log(this.getCurrentFrontDir());

    //Start chasing target
    if (this.mTimer > 40){
        var pos = this.mMissile.getXform().getPosition();
        vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.mTimer/20);
        this.rotateObjPointTo(this.mTarget, this.mTimer/125);
    }
    //Move Forward after 15 miliseconds of hang time
    else if(this.mTimer > 15)
    {
        if (this.mFire === null){
            this.mFire = new Fire(-20,-20,0,0,20,60,0,32,1,1,2.5,0);
                this.mFireSet.addToSet(this.mFire);
        }
        //Insert Sprite or particles of FIRE!
        this.mMissile.getXform().incXPosBy(this.mTimer / 20);
    }
    else{
        this.mMissile.getXform().incYPosBy(-this.mMoveSpeed/3);
    }
    
    
    //Fire
    var xform = this.mMissile.getXform();
    if (this.mFire !== null)
        this.mFire.setPos(xform.getXPos(), xform.getYPos());
};

//Missile.prototype.setDirection = function (mousePos){
 //   if(this.mInterp === null){
 //       this.mInterp = new InterpolateVec2(this.getXform().getPosition(), 120, .02);
//        this.mInterp.setFinalValue(mousePos);
 //   }
//};

Missile.prototype.markDead = function (){
  this.mFireSet.removeFromSet(this.mFire);  
};