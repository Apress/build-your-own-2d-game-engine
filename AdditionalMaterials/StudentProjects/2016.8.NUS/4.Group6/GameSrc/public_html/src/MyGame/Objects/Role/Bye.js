/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2 ,SpriteAnimateRenderable: false, GameObjectSet:false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


function Bye(spriteTexture, atX, atY, speed) {
    this.kDelta = 0.5;

    this.mBye = new SpriteAnimateRenderable(spriteTexture);
    this.mBye.setColor([1, 1, 1, 0]);
    this.mBye.getXform().setPosition(atX, atY);
    this.mBye.getXform().setSize(6, 12);

    this.Speed = speed;
    this.mBye.setAnimationSpeed(10);
     GameObject.call(this, this.mBye);
}
gEngine.Core.inheritPrototype(Bye, GameObject);


Bye.prototype.setAnimInfo = function (top, left, wid, hei) {
    this.topPix = top;
    this.leftPix = left;
    this.elmWidthInPixel = wid;
    this.elmHeightInPixel = hei;

    this.mBye.setSpriteSequence(this.topPix, this.leftPix, this.elmWidthInPixel, this.elmHeightInPixel, 3, 0);
    this.mBye.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
};

Bye.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
};

Bye.prototype.updateStay = function () {
    this.mBye.updateAnimation();
};

Bye.prototype.updateMove = function (timer, stateTime, dir) {
    var xf = this.getXform();
    var mStateTime = stateTime;
    var mTimer = timer;

    if (mTimer > mStateTime) {
        if (dir === -1) {
            if (xf.getXPos() > -5) {
                xf.incXPosBy(-0.3*this.kDelta * this.Speed);
            }
            if (xf.getXPos() < -3) {
                xf.setXPos(170);
            }
        }
        if (dir === 1) {
            if (xf.getXPos() < 170) {
                xf.incXPosBy(0.3*this.kDelta * this.Speed);
            }
            if (xf.getXPos() > 160) {
                xf.setXPos(-5);
            }
        }
    }
    this.mBye.updateAnimation();
};