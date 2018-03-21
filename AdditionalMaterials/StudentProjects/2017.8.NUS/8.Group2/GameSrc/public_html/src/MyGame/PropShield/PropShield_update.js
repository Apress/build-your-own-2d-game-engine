/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2, Stone, vec2, PropMissle, PropShield, gCue */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
PropShield.prototype.update = function (Hero1,Hero2) {
    //check whether out of camera
    var xform = this.mPropShield.getXform();
    var XPos = xform.getXPos();
    var YPos = xform.getYPos();
    if (xform.getXPos() < 0||xform.getXPos()>100||xform.getYPos()<0||xform.getYPos()>120) {
        this.mExpired = true;
    }
    
    var Hero1XPos = Hero1.getXform().getXPos();
    var Hero1YPos = Hero1.getXform().getYPos();
    
    var Hero2XPos = Hero2.getXform().getXPos();
    var Hero2YPos = Hero2.getXform().getYPos();
    
//    var p = vec2.fromValues(0, 0);
//
//    if (this.pixelTouches(Hero1, p)) {
//            Hero1.increaseMissleNum();
//            this.setExpired();
//    }
//    if (this.pixelTouches(Hero2, p)) {
//            Hero2.increaseMissleNum();
//            this.setExpired();
//    }

    
    if (Math.abs(Hero1XPos - XPos) < 5 && Math.abs(Hero1YPos - YPos) < 10) {
        gEngine.AudioClips.playACue(gCue);
        Hero1.increaseShieldNum();
        this.setExpired();
    }
    if (Math.abs(Hero2XPos - XPos) < 5 && Math.abs(Hero2YPos - YPos) < 10) {
        gEngine.AudioClips.playACue(gCue);
        Hero2.increaseShieldNum();
        this.setExpired();
    }
    // move 
  //  xform.incXPosBy(this.kDelta*Math.cos(this.angle / 180 * Math.PI));
 //   xform.incYPosBy(-this.kDelta*Math.cos(this.angle / 180 * Math.PI));
    xform.incYPosBy(-this.kDelta);
    // if fly off to the left, re-appear at the right

};
