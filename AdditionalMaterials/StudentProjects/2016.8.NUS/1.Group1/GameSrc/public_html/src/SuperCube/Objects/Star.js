/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, IllumRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Star(cx, cy) {
    
    this.mTrue = 1;
    
    this.kStar = "assets/Level4/star.png" ;
    this.mStar = new TextureRenderable(this.kStar);
    this.mStar.setColor([0, 0, 0, 0]);
    this.mStar.getXform().setPosition(cx, cy);
    this.mStar.getXform().setSize(2, 2);
    GameObject.call(this, this.mStar);
    
}
gEngine.Core.inheritPrototype(Star, GameObject);

Star.prototype.getTrue = function () { return this.mTrue ; };
Star.prototype.setTrue = function (a) { this.mTrue = a; };


