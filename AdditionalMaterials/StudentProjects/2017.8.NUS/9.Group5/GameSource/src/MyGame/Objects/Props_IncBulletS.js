/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
function PropsIncBulletS(hero) {
    this.endtime = 2000;
    this.kPropsIncBulltes= "assets/bullet2.png";//pixel有点大，改图：朗姆酒
    this.exist = true;
    this.touch = [];
    this.hero= hero;
    
    this.type = 2;
            
    var xPos =90*Math.random()-40;
    var yPos = 40*Math.random()-18;
    
    
    this.mPropsIncBulletS = new LightRenderable(this.kPropsIncBulltes);
    this.mPropsIncBulletS.setColor([1.0,1.0 , 1.0, 0.0]);
    this.mPropsIncBulletS.getXform().setPosition(xPos, yPos);
    this.mPropsIncBulletS.getXform().setSize(4, 4);
    GameObject.call(this, this.mPropsIncBulletS);
}
gEngine.Core.inheritPrototype(PropsIncBulletS, GameObject);

PropsIncBulletS.prototype.update = function () {
this.endtime -=1;
if(this.endtime === 0){
    this.exist = false;
}
};
PropsIncBulletS.prototype.setExist = function (n) {
   this.exist = n;
};
PropsIncBulletS.prototype.getExist = function () {
    return this.exist;
};
PropsIncBulletS.prototype.getType = function () {
    return this.type;
};