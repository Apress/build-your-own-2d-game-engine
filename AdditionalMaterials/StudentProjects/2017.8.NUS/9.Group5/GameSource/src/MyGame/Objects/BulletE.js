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

function BulletE(spriteTexture,xPox, yPos, flag) {
    this.kDelta = 0.7;
    //this.kbulletE = "assets/shell.png";
    this.mFlag = flag;
    this.mBulletE = new TextureRenderable(spriteTexture);
    this.mBulletE.setColor([0, 0, 1, 0.4]);
    this.mBulletE.getXform().setPosition(xPox, yPos+7);
    this.mBulletE.getXform().setSize(2, 2);
    GameObject.call(this, this.mBulletE);
}
gEngine.Core.inheritPrototype(BulletE, GameObject);

BulletE.prototype.update = function () {
    var xform = this.mBulletE.getXform();
    if(this.mFlag === 0){
        xform.incXPosBy(this.kDelta);
    }else if(this.mFlag === 1){
        xform.incXPosBy(-this.kDelta);
    }else if(this.mFlag === 2){
        xform.incYPosBy(this.kDelta);
    }else if(this.mFlag === 3){
        xform.incYPosBy(-this.kDelta);
    }
    
    /*if(this.getXform().getXPos() > 48 || this.getXform().getXPos() < -48)
        this = null;*/
};