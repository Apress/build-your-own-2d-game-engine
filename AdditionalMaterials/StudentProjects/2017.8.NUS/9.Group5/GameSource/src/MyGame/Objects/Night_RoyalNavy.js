/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*File:GameObject.js
 * 
 * @param {type} spriteTexture
 * @param {type} XPos
 * @param {type} YPos
 * @returns {RoyalNavy}
 */
/* global GameObject, gEngine, vec2 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function NightRoyalNavy(spriteTexture, XPos, YPos, hero) {
     this.kBullet = "assets/prop_bomb.png";
    this.mRoyalNavy = new LightRenderable(spriteTexture);
    this.mRoyalNavy.setColor([1, 1, 1, 0]);
    this.mRoyalNavy.getXform().setPosition(XPos, YPos);
    this.mRoyalNavy.getXform().setSize(10, 10);
    this.mRoyalNavy.setElementPixelPositions(0, 64, 0, 64);
    
    //define the state to decide which side should royal ship face to
    this.mRnState = NightRoyalNavy.eRnState.eFaceLeft;
    this.mPreviousRnState = NightRoyalNavy.eRnState.eFaceLeft;
    
    GameObject.call(this, this.mRoyalNavy);
    
    this.HP = 7;

    this.setSpeed(0.15);
}
gEngine.Core.inheritPrototype(NightRoyalNavy, GameObject);

NightRoyalNavy.eRnState = Object.freeze({
    eFaceRight: 0,
    eFaceLeft: 1,
    eTouchLeft: 2,
    eTouchRight:3
});

NightRoyalNavy.prototype.update = function (Hero,Timer,mBullet,thelight ) {
    
//if(this.mRoyalNavy.getXform().getDistance(HeroPosition) < 625){*/
    //GameObject.prototype.update.call(this);  // default moving forward
    
    if(this.mRoyalNavy.getXform().getXPos() < Hero.getXform().getXPos()){
        this.mPreviousRnState = this.mRnState;
        this.mRnState = NightRoyalNavy.eRnState.eFaceRight;
    }
    if(this.mRoyalNavy.getXform().getXPos() > Hero.getXform().getXPos()){
        this.mPreviousRnState = this.mRnState;
        this.mRnState = NightRoyalNavy.eRnState.eFaceLeft;
    }
    
    this.changeAnimation();
 
        Timer--;  
        //alert(Timer);
        if(Timer <= 0){
        Timer = 80;
        this.fire(mBullet,thelight);
    
        }  
        //this.fire(mBullet);
        return Timer;
};

NightRoyalNavy.prototype.changeAnimation = function () {
    if(this.mRnState !== this.mPreviousRnState){
        switch (this.mRnState){
            case NightRoyalNavy.eRnState.eFaceLeft:
                this.mRoyalNavy.setElementPixelPositions(0, 64, 0, 64);
                this.mRoyalNavy.getXform().setSize(10, 10);
                break;
            case NightRoyalNavy.eRnState.eFaceRight:
                this.mRoyalNavy.setElementPixelPositions(64, 128, 0, 64);
                this.mRoyalNavy.getXform().setSize(10, 10);
                break;
        }
    }
};

NightRoyalNavy.prototype.getFaceDir = function () {
    return this.mRnState;
};

NightRoyalNavy.prototype.fire = function (mBullet,thelight) {
            var rnBullet = new NightBullet(this.kBullet, this.mRoyalNavy.getXform().getXPos(), this.mRoyalNavy.getXform().getYPos() - 5, this.mRnState);
            rnBullet.getRenderable().addLight(thelight);
            mBullet.push(rnBullet);
           // alert(1);
           
};

NightRoyalNavy.prototype.decHP = function(deltaHp){
    this.HP -= deltaHp;
};

NightRoyalNavy.prototype.getHP = function () {
    return this.HP;
};