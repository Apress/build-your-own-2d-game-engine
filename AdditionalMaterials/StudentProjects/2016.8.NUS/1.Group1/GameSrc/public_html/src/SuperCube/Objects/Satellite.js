/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, IllumRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Satellite(cx, cy, width, height, png) {
    this.kDir = 0;
    this.kDelta = 2.5;
    this.kStone = png;

    this.mDegree = 90;
    this.mSatellite = new TextureRenderable(this.kStone);
    this.mSatellite.setColor([0, 0, 0, 0]);
    this.mSatellite.getXform().setPosition(cx, cy);
    this.mSatellite.getXform().setSize(width, height);

    GameObject.call(this, this.mSatellite);
    
}
gEngine.Core.inheritPrototype(Satellite, GameObject);

Satellite.prototype.update = function () {
    
    // move towards the left and wraps
    var xform = this.getXform();
    this.mDegree += this.kDelta;
    if(this.mDegree > 360)
        this.mDegree = this.mDegree - 360;
    xform.setPosition(147+19.5*Math.cos(this.mDegree*Math.PI/180),195+19.5*Math.sin(this.mDegree*Math.PI/180));
    xform.incRotationByDegree(3);    
    
};

Satellite.prototype.setDelta = function (delta) { this.kDelta = delta; };
Satellite.prototype.setDegree = function (degree) { this.mDegree = degree; };