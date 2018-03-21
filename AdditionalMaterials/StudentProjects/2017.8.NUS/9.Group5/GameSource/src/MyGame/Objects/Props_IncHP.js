

/* File: Props_IncHP.js 
 *
 *碰到可回血10
 *不碰，一段时间后消失
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function PropsIncHP(hero) {
    this.endtime = 2000;
    this.kPropsIncHP= "assets/wine.png";
    this.exist = true;
    this.touch = [];
    this.hero= hero;
    
    this.type =0;
            
    var xPos =90*Math.random()-40;
    var yPos = 40*Math.random()-18;
    
    
    this.mPropsIncHP = new LightRenderable(this.kPropsIncHP);
    this.mPropsIncHP.setColor([0.2, 0, 0, 0.5]);
    this.mPropsIncHP.getXform().setPosition(xPos, yPos);
    this.mPropsIncHP.getXform().setSize(4, 4);
    GameObject.call(this, this.mPropsIncHP);
}
gEngine.Core.inheritPrototype(PropsIncHP, GameObject);

PropsIncHP.prototype.update = function () {
//自动消失,要在mygame里写
this.endtime -=1;
if(this.endtime === 0){
    this.exist = false;
}
};
PropsIncHP.prototype.setExist = function (n) {
   this.exist = n;
};
PropsIncHP.prototype.getExist = function () {
    return this.exist;
};
 PropsIncHP.prototype.getType = function () {
    return this.type;
};