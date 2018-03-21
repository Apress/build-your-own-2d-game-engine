/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";


function BackGround(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.wid = w;
    this.hei = h;
}
gEngine.Core.inheritPrototype(BackGround, GameObject);

BackGround.prototype.setSpriteTexture = function (spriteTexture, TexLeft, TexRight, TexBottom, TexTop) {
    this.mBackGround = new SpriteRenderable(spriteTexture);
    this.mBackGround.setColor([1, 1, 1, 0]);
    this.mBackGround.getXform().setPosition(this.x, this.y);
    this.mBackGround.getXform().setSize(this.wid, this.hei);
    this.mBackGround.setElementPixelPositions(TexLeft, TexRight, TexBottom, TexTop);
    GameObject.call(this, this.mBackGround);
};

BackGround.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
};

BackGround.prototype.update = function () {
    var xf = this.getXform();
    var delta = 0.01;
    if (xf.getXPos() > 60) {
        xf.incXPosBy(-delta);
    }
};

BackGround.prototype.lrcUpdate = function () {
    var xf = this.getXform();
    var delta = 0.5;
    if (xf.getYPos() < 140) {
        xf.incYPosBy(0.10 * delta);
    }
}

