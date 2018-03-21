/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2, Stone, vec2, PropMissle, PropShield, PropSupply, gCue, gCue2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
var gSupplyPathCount = 0;
var randomX = (Math.random())*(Math.random())/2;
var randomY = -PropSupply.kDelta;
PropSupply.prototype.update = function (Hero1,Hero2) {
    //check whether out of camera
    var xform = this.mPropSupply.getXform();
    var XPos = xform.getXPos();
    var YPos = xform.getYPos();
    if (xform.getXPos() < 0||xform.getXPos()>100||xform.getYPos()<0||xform.getYPos()>120) {
        this.mExpired = true;
    }
    
    var Hero1XPos = Hero1.getXform().getXPos();
    var Hero1YPos = Hero1.getXform().getYPos();
    
    var Hero2XPos = Hero2.getXform().getXPos();
    var Hero2YPos = Hero2.getXform().getYPos();
    
    if (Math.abs(Hero1XPos - XPos) < 5 && Math.abs(Hero1YPos - YPos) < 10) {
        gEngine.AudioClips.playACue(gCue2);
        Hero1.increaseHP(3);
        this.setExpired();
    }
    if (Math.abs(Hero2XPos - XPos) < 5 && Math.abs(Hero2YPos - YPos) < 10) {
        gEngine.AudioClips.playACue(gCue2);
        Hero2.increaseHP(3);
        this.setExpired();
    }
    // move 
    
    if(gSupplyPathCount===50){
        randomX = (Math.random()-0.5)*2;
        randomY = (Math.random()-0.3)*2;
    }
    gSupplyPathCount ++;
   // xform.incXPosBy(randomX);
 //   xform.incYPosBy(-this.kDelta*Math.cos(this.angle / 180 * Math.PI));
    xform.incYPosBy(-this.kDelta);
    // if fly off to the left, re-appear at the right

};
