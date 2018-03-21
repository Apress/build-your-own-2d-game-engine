/* File: Hero.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function NightBullet(spriteTexture,xPox, yPos, flag) {
    this.kDelta = 0.6;
    //this.kbullet = "assets/shell.png";
    this.mFlag = flag;
    this.mBullet = new LightRenderable(spriteTexture);
    this.mBullet.setColor([0.1, 0.1, 0.1, 0.1]);
    this.mBullet.getXform().setPosition(xPox, yPos+7);
    this.mBullet.getXform().setSize(2, 2);
    GameObject.call(this, this.mBullet);
}
gEngine.Core.inheritPrototype(NightBullet, GameObject);

NightBullet.prototype.update = function () {
    var xform = this.mBullet.getXform();
    if(this.mFlag === 0){
        xform.incXPosBy(this.kDelta);
    }else if(this.mFlag === 1){
        xform.incXPosBy(-this.kDelta);
    }else if(this.mFlag === 2){
        xform.incYPosBy(this.kDelta);
    }else if(this.mFlag === 3){
        xform.incYPosBy(-this.kDelta);
    }
};