/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";   // Operate in Strict mode such that variables must be declared before used!
var TrapSetSpeed = 0.1;
MyGame.prototype.MoveTrap = function (){
    //set the movement
    if(this.isUp === true && this.mtrapflag1 === this.mTrapPauseSpeed){
        for(var i = 0; i < this.mtrap.length; i++){
            this.mheight -= TrapSetSpeed;
            this.mtrap[i].mXform.mScale[1] = this.mheight;
            this.mtrap[i].mXform.mPosition[1] -= TrapSetSpeed;
        }
    }
    else if(this.isUp === false && this.mtrapflag === this.mTrapPauseSpeed){
        for(var i = 0; i < this.mtrap.length; i++){
            this.mheight += TrapSetSpeed;
            this.mtrap[i].mXform.mScale[1] = this.mheight;
            this.mtrap[i].mXform.mPosition[1] += TrapSetSpeed;
        }
    }
    else if(this.isUp === false && this.mtrapflag !== this.mTrapPauseSpeed){
        this.mtrapflag += 1;
    }
    else if(this.isUp === true && this.mtrapflag1 !== this.mTrapPauseSpeed){
        this.mtrapflag1 += 1;
    }
    
    //judge this.isUp
    if(this.mheight >= this.mheightorginal){
        this.isUp = true;
        this.mtrapflag = 0;
    }
    else if(this.mheight <= 0){
        this.isUp = false;
        this.mtrapflag1 = 0;
    }
};

MyGame2.prototype.MoveTrap = function (){
    //set the movement
    if(this.isUp === true && this.mtrapflag1 === this.mTrapPauseSpeed){
        for(var i = 0; i < this.mtrap.length; i++){
            this.mheight -= TrapSetSpeed;
            this.mtrap[i].mXform.mScale[1] = this.mheight;
            this.mtrap[i].mXform.mPosition[1] -= TrapSetSpeed;
        }
    }
    else if(this.isUp === false && this.mtrapflag === this.mTrapPauseSpeed){
        for(var i = 0; i < this.mtrap.length; i++){
            this.mheight += TrapSetSpeed;
            this.mtrap[i].mXform.mScale[1] = this.mheight;
            this.mtrap[i].mXform.mPosition[1] += TrapSetSpeed;
        }
    }
    else if(this.isUp === false && this.mtrapflag !== this.mTrapPauseSpeed){
        this.mtrapflag += 1;
    }
    else if(this.isUp === true && this.mtrapflag1 !== this.mTrapPauseSpeed){
        this.mtrapflag1 += 1;
    }
    
    //judge this.isUp
    if(this.mheight >= this.mheightorginal){
        this.isUp = true;
        this.mtrapflag = 0;
    }
    else if(this.mheight <= 0){
        this.isUp = false;
        this.mtrapflag1 = 0;
    }
};
