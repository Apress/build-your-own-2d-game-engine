/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global GameObject, gEngine, WASDObj */

"use strict";

function Button(t, atX, atY, w, h) {
    this.kButtonSound = "assets/Sound/button.mp3";
    SpriteObj.call(this, t, atX, atY, w, h, [41, 80, 25, 64]);

    this.mPushed = false;
}
gEngine.Core.inheritPrototype(Button, SpriteObj);

Button.prototype.push = function () {
    if (!this.mPushed) {
        gEngine.AudioClips.playACue(this.kButtonSound, 30);
        this.mObj.setElementPixelPositions(81, 120, 25, 64);
        this.mPushed = true;
    }
}

Button.prototype.draw = function (aCamera) {
    SpriteObj.prototype.draw.call(this, aCamera);
};

Button.prototype.update = function () {
    SpriteObj.prototype.update.call(this);
};

