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

function BulletH(spriteTexture,xPox, yPos, flag) {
    this.kDelta = 1;
    this.mFlag = flag;
    this.mBulletH = new TextureRenderable(spriteTexture);
    this.mBulletH.setColor([1, 0, 0, 0.4]);
    this.mBulletH.getXform().setPosition(xPox, yPos+7);
    this.mBulletH.getXform().setSize(2, 2);
    GameObject.call(this, this.mBulletH);
}
gEngine.Core.inheritPrototype(BulletH, GameObject);

BulletH.prototype.update = function () {
    var xform = this.mBulletH.getXform();
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