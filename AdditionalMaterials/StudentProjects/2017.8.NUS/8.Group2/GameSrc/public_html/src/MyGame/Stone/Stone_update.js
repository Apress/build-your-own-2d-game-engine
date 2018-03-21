/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2, Stone */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
Stone.prototype.update = function () {
    //check whether out of camera
    var xform = this.mStone.getXform();
    if (xform.getXPos() < 0||xform.getXPos()>100||xform.getYPos()<0) {
        this.mExpired = true;
    }

    // move 
  //  xform.incXPosBy(this.kDelta*Math.cos(this.angle / 180 * Math.PI));
 //   xform.incYPosBy(-this.kDelta*Math.cos(this.angle / 180 * Math.PI));
    xform.incYPosBy(-this.kDelta);
    // if fly off to the left, re-appear at the right

};
