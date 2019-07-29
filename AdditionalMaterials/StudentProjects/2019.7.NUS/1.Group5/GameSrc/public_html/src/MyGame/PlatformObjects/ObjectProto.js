/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global GameObject */

"use strict";

function ObjectProto(aRenderable) {
    GameObject.call(this, aRenderable);

    this.mVP = new VProcessor(this.getXform(), 0);
    this.mDestination = vec2.fromValues(0, 0);
    this.mToDes = false;
}
gEngine.Core.inheritPrototype(ObjectProto, GameObject);

ObjectProto.prototype.update = function () {
    GameObject.prototype.update.call(this);

    this.mVP.update();
    if (this.mToDes) {
        var pos = this.getXform().getPosition();
        var lastPos = vec2.fromValues(pos[0] - this.mVP.mLastFrameV[0], pos[1] - this.mVP.mLastFrameV[1]);

        if ((pos[0] - this.mDestination[0]) * (lastPos[0] - this.mDestination[0]) <= 0 &&
                (pos[1] - this.mDestination[1]) * (lastPos[1] - this.mDestination[1]) <= 0) {
            pos[0] = this.mDestination[0];
            pos[1] = this.mDestination[1];
            this.mToDes = false;
            this.mVP.setV(0, 0);
        }
    }
};

ObjectProto.prototype.moveTo = function (toX, toY, V) {
    var disX = toX - this.getXform().getPosition()[0];
    var disY = toY - this.getXform().getPosition()[1];
    var disH = Math.sqrt(disX * disX + disY * disY);
    if (disH <= 1e-6)
        return;

    this.mDestination = vec2.fromValues(toX, toY);
    this.mToDes = true;
    this.mVP.setV(V * disX / disH, V * disY / disH);
}

ObjectProto.prototype.moveUp = function (V) {
    var pos = this.getXform().getPosition();
    this.moveTo(pos[0], 675, V);
}

ObjectProto.prototype.moveDown = function (V) {
    var pos = this.getXform().getPosition();
    this.moveTo(pos[0], -675, V);
}

ObjectProto.prototype.moveLeft = function (V, des) {
    var pos = this.getXform().getPosition();
    if (des) {
        this.moveTo(des, pos[1], V);
    } else {
        this.moveTo(-1200, pos[1], V);
    }
}

ObjectProto.prototype.moveRight = function (V) {
    var pos = this.getXform().getPosition();
    this.moveTo(1200, pos[1], V);
}

