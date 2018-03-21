/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false, vec2: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function UFO(cx,cy,width,height,png) {
    
    
    this.mUFO = new TextureRenderable(png);
    this.mUFO.setColor([0, 0, 0, 0]);
    this.mUFO.getXform().setPosition(cx, cy);
    this.mUFO.getXform().setSize(width, height);
    
    GameObject.call(this, this.mUFO);

    this.setSpeed(0.2);

   
}
gEngine.Core.inheritPrototype(UFO, GameObject);

UFO.prototype.update = function (p){
    var dir = [];
    vec2.sub(dir, p, this.getXform().getPosition());
    var len = vec2.length(dir);
    if (len < 4.5*this.getXform().getHeight()){
        GameObject.prototype.update.call(this);
    }
    //GameObject.prototype.update.call(this);
};

UFO.prototype.setSpeed = function (speed) {
    this.mSpeed = speed;
};
