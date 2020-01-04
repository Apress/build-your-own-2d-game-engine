/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global GameObject */

"use strict";

function Platform(t, atX, atY, w, h) {
    this.mPlatform = new TextureRenderable(t);
    this.mPlatform.setColor([1, 1, 1, 0]);
    this.mPlatform.getXform().setPosition(atX, atY);
    this.mPlatform.getXform().setSize(w, h);
    ObjectProto.call(this, this.mPlatform);
    this.mVP = new VProcessor(this.getXform(), 0);
    this.mDestination = vec2.fromValues(0, 0);
    this.mToDes = false;
}
gEngine.Core.inheritPrototype(Platform, ObjectProto);

Platform.prototype.update = function () {
    ObjectProto.prototype.update.call(this);
};

