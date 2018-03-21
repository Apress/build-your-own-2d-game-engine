

/* File: Props_IncHP.js 
 *
 *碰到可回血10
 *不碰，一段时间后消失
 */
/* File: Props_IncHP.js 
 *
 *碰到可回血10
 *不碰，一段时间后消失
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function PropsIncHeroS(hero) {
    this.endtime = 2000;
    this.kPropsIncHP= "assets/hat.png";//pixel有点大，改图：朗姆酒
    this.exist = true;
    this.touch = [];
    this.hero= hero;
    
    this.type = 1;
            
    var xPos =90*Math.random()-40;
    var yPos = 40*Math.random()-18;
    
    
    this.mPropsIncHeroS = new LightRenderable(this.kPropsIncHP);
    this.mPropsIncHeroS.setColor([0.1,0.1 , 0.1, 0.8]);
    this.mPropsIncHeroS.getXform().setPosition(xPos, yPos);
    this.mPropsIncHeroS.getXform().setSize(4, 4);
    GameObject.call(this, this.mPropsIncHeroS);
}
gEngine.Core.inheritPrototype(PropsIncHeroS, GameObject);

PropsIncHeroS.prototype.update = function () {
this.endtime -=1;
if(this.endtime === 0){
    this.exist = false;
}
};
PropsIncHeroS.prototype.setExist = function (n) {
   this.exist = n;
};
PropsIncHeroS.prototype.getExist = function () {
    return this.exist;
};
PropsIncHeroS.prototype.getType = function () {
    return this.type;
};