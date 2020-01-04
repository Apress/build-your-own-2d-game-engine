/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global GameObject, gEngine, WASDObj */

"use strict";

function Stab(t, atX, atY, w, h, rotate) {
    this.kTouchTex = "assets/SceneObjects2.png";
    
    SpriteObj.call(this, t, atX, atY, w, h, [0, 39, 25, 64]);
    this.mCanTouch = false;
    
    this.getXform().incRotationByDegree(rotate);
}
gEngine.Core.inheritPrototype(Stab, SpriteObj);

Stab.prototype.setInvisible = function () {
    this.setVisibility(false);
};

Stab.prototype.setTouchable = function () {
    this.mCanTouch = true;
    this.mObj.setTexture(this.kTouchTex);
    this.mObj.setElementPixelPositions(0, 39, 217, 256);
}

Stab.prototype.draw = function (aCamera) {
    SpriteObj.prototype.draw.call(this, aCamera);
};

Stab.prototype.update = function () {
    SpriteObj.prototype.update.call(this);
};

