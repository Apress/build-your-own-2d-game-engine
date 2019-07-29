/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global GameObject, gEngine */

"use strict";

function NormalPlatform(t, atX, atY, w, h, atBottom) {
    if (atBottom) 
        SpriteObj.call(this, t, atX, atY, w, h, [0, w, 0, h]);
    else
        SpriteObj.call(this, t, atX, atY, w, h, [0, w, 1024 - h, 1024]);
}
gEngine.Core.inheritPrototype(NormalPlatform, SpriteObj);

NormalPlatform.prototype.disappear = function () {
    this.setVisibility(false);
    //console.log("disappear");
};

NormalPlatform.prototype.draw = function (aCamera) {
    SpriteObj.prototype.draw.call(this, aCamera);
};

NormalPlatform.prototype.update = function () {
    SpriteObj.prototype.update.call(this);
};




