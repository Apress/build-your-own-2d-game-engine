/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Gear(cx, cy, width, height, delta) {
    this.mDelta = -delta;
    this.kGear = "assets/Level1/gear2.png" ;

    this.mGear = new LightRenderable(this.kGear);
    this.mGear.setColor([0, 0, 0, 0]);
    this.mGear.getXform().setPosition(cx, cy);
    this.mGear.getXform().setSize(width, height);
    GameObject.call(this, this.mGear);
}
gEngine.Core.inheritPrototype(Gear, GameObject);

Gear.prototype.update = function () {
    var xform = this.getXform();
    xform.incRotationByDegree(this.mDelta);
   // this.mr.setXform(xform);
    
};
