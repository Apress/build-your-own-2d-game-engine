/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global GameObject */

"use strict";

function SpriteObj(t, atX, atY, w, h, pixelPos) {
    this.mObj = new SpriteRenderable(t);
    this.mObj.setColor([1, 1, 1, 0]);
    this.mObj.getXform().setPosition(atX, atY);
    this.mObj.getXform().setSize(w, h);
    this.mObj.setElementPixelPositions(pixelPos[0], pixelPos[1], pixelPos[2], pixelPos[3]);
    ObjectProto.call(this, this.mObj);

    this.mVP = new VProcessor(this.getXform(), 0);
    this.mDestination = vec2.fromValues(0, 0);
    this.mToDes = false;
}
gEngine.Core.inheritPrototype(SpriteObj, ObjectProto);

SpriteObj.prototype.update = function () {
    ObjectProto.prototype.update.call(this);
};

