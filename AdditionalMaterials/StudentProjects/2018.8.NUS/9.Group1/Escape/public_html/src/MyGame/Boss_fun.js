/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global Boss */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
Boss.prototype.bulletmove = function(){
    if(this.mbulletflag === 0){
        this.mbulletdirection = this.mdirection;
        var xHero = this.mHero.mRenderComponent.mXform.mPosition[0];
        var yHero = this.mHero.mRenderComponent.mXform.mPosition[1];
        this.mbullet.mXform.mPosition[0] = xHero;
        this.mbullet.mXform.mPosition[1] = yHero;
        this.mbulletflag = 1;
    }
};

Boss.prototype.bulletjudge = function(){
    if(this.mgunstate === true)
    {
        if(this.mbulletmovespeedflag!==0)
        {
            this.mbulletmovespeedflag++;
            if(this.mbulletmovespeedflag === 3)
            {
                this.mbulletmovespeedflag=0;
            }
        }
        else if(this.mbulletflag === 1)
        {
            if(this.mbulletdirection === 1){
                this.mbullet.mXform.mPosition[0] += 15;
                this.mbulletmovespeedflag++;
            }
            else if(this.mbulletdirection === -1){
                this.mbullet.mXform.mPosition[0] -= 15;
                this.mbulletmovespeedflag++;
            }
        }
    this.BulletCrashInto(); 
    }
    if(this.mgunstate === false){
        this.mGun1.mXform.mPosition[0] = -518;
        this.mGun1.mXform.mPosition[1] = -518;
    }
};

Boss.prototype.BulletCrashInto = function(){
    var xbullet = this.mbullet.mXform.mPosition[0];
var ybullet = this.mbullet.mXform.mPosition[1];
if((xbullet - 400) >= -40 &&(xbullet - 400) <= 40
        &&(ybullet - -65) >= -20
        &&(ybullet - -65) <= 40){
    this.mgunstate = false;
    console.log(xbullet);
    this.mbullet.mXform.mPosition[1] = -518;
    this.mbullet.mXform.mPosition[0] = 518;
    this.mlive--;
    this.BloodDecrease(this.mlive);
    if(this.mlive === 0){
        gEngine.GameLoop.stop();
    }
    this.mbulletflag = 0;
    return true;
}
if(xbullet>518||xbullet<-518){
    this.mgunstate = false;
    this.mbullet.mXform.mPosition[1] = -518;
    this.mbullet.mXform.mPosition[0] = 518;
    this.mbulletflag = 0;
}
};

Boss.prototype.BloodDecrease = function(live){
    for(var i = live; i < 8; i++){
        this.mblood[i].mXform.mPosition[0] = -518;
        this.mblood[i].mXform.mPosition[1] = -518;
    }
};

Boss.prototype.LaserintoHero = function () {
    var xhero = this.mHero.getXform().getXPos();
    var yhero = this.mHero.getXform().getYPos();
    var xLaser = this.mLaser.getXform().getXPos();
    var yLaser= this.mLaser.getXform().getYPos();


   if ((xLaser-xhero)<=62.5&&(xLaser-xhero)>=-10 && (yLaser - yhero) >=-38 && (yLaser - yhero) <= 38){
       this.mLaser.getXform().setXPos(-600);
       this.mRestart = true;
        gEngine.GameLoop.stop();
   }
};

Boss.prototype.TrapintoHero = function () {
    var xhero = this.mHero.getXform().getXPos();
    var yhero = this.mHero.getXform().getYPos();
    var xTrap = this.mTrap.getXform().getXPos();
    var yTrap = this.mTrap.getXform().getYPos();


    if ((xTrap-xhero)<=62.5&&(xTrap-xhero)>=-40 && (yTrap - yhero) >= -38&& (yTrap - yhero) <= 38){
        this.mTrap.getXform().setXPos(-600);
       this.mRestart = true;
        gEngine.GameLoop.stop();
    }
};
Boss.prototype.JudgeHeroState = function(){
    if(this.mHero.getXform().getYPos() === -146){
        this.mHero.isatland = 1;
        this.isAirFlag = 0;
    }
    else if(this.mHero.getXform().getYPos() === -56){
        this.mHero.isatland = 2;
        this.isAirFlag = 0;
    }
    else{
        this.mHero.isatland = 0;
    }
};