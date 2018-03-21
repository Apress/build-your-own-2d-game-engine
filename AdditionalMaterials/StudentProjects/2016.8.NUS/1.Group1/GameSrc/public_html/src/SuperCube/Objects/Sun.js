/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Sun(cx,cy,width,height,pic) {
    this.kSun = pic;

    this.mSun = new TextureRenderable(this.kSun);
    this.mSun.setColor([0, 0, 0, 0]);
    this.mSun.getXform().setPosition(cx,cy );
    this.mSun.getXform().setSize(width, height);
    GameObject.call(this, this.mSun);
    
}
gEngine.Core.inheritPrototype(Sun, GameObject);

