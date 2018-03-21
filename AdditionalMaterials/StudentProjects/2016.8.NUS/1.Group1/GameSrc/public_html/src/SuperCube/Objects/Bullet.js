/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, IllumRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Bullet(cx, cy, width, height, png, left, right, delta, type) {
    
    this.kDelta = delta;
    this.kBullet = png;
    
    this.mWidth = width;
    this.mHeight = height;
    this.mType = type;
    this.mLeft = left;
    this.mRight = right;
    this.mBullet = new TextureRenderable(this.kBullet);
    this.mBullet.setColor([0, 0.8, 0, 0]);
    this.mBullet.getXform().setPosition(cx, cy);
    this.mBullet.getXform().setSize(this.mWidth, this.mHeight);
    
    GameObject.call(this, this.mBullet);
}
gEngine.Core.inheritPrototype(Bullet, GameObject);

Bullet.prototype.update = function () {

    // move towards the left and wraps
    var xform = this.getXform();
    if(this.mType === 1){
        if (xform.getXPos() > this.mRight)  {
            xform.setXPos(this.mLeft);
            xform.setSize(this.mWidth, this.mHeight);
        }
    
        xform.incXPosBy(this.kDelta);
        xform.incWidthBy(0.08);
        xform.incHeightBy(0.08);
    }
    if(this.mType === 2){
        if (xform.getXPos() < this.mLeft)  {
            xform.setXPos(this.mRight);
            
        }
    
        xform.incXPosBy(-this.kDelta);
    }
};