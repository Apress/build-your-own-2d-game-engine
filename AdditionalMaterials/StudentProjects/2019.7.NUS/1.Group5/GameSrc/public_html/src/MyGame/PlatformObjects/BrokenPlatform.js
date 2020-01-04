/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global GameObject, gEngine */

"use strict";

function BrokenPlatform(t, atX, atY, w, h) {
    //this.kBreakSound = "assets/Sound/break.mp3";
    
    SpriteObj.call(this, t, atX, atY, w, h, [0, 40, 1024 - h, 1024]);
}
gEngine.Core.inheritPrototype(BrokenPlatform, SpriteObj);

BrokenPlatform.prototype.beingHit = function () {
    this.setVisibility(false);
    //gEngine.AudioClips.playACue(this.kBreakSound, 40);
};

BrokenPlatform.prototype.draw = function (aCamera) {
    SpriteObj.prototype.draw.call(this, aCamera);
};




