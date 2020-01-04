/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global GameObject, gEngine */

"use strict";

function MovePlatform(t, atX, atY, w, h, s, e) {
    SpriteObj.call(this, t, atX, atY, w, h, [0, w, 0, 32])
    
    this.mVP.setXV(150);
    this.mstart = s;
    this.mend = e;
}
gEngine.Core.inheritPrototype(MovePlatform, SpriteObj);

MovePlatform.prototype.draw = function (aCamera) {
    SpriteObj.prototype.draw.call(this, aCamera);
};

MovePlatform.prototype.update = function () {
    SpriteObj.prototype.update.call(this);
    
    var xf = this.getXform();
    if (xf.getXPos() <= this.mstart) {
        this.mVP.setXV(- this.mVP.mV[0])
    }
    if (xf.getXPos() >= this.mend) {
        this.mVP.setXV(- this.mVP.mV[0])
    }
};

