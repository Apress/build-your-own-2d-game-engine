/* 
 * File: HealthBar.js
 * Created by phreeze Tang 27/7/2017
 * Defined the CooldownBar.
 * 
 * change log: 
 * 27/7/2017 create the file
 */

"use strict";

/* global GameObject, gEngine */

function CooldownBar (cooldownImgTexture, textfont, posX, posY) {
    this.sWidth = 1.5;
    this.sHeight = 1.5;
    this.sPosX = posX;
    this.sPosY = posY;
    this.sIsCooldown = false;
    
//    this.mCoolDownBg = new Renderable();
//    this.mCoolDownBg.setColor([1.0, 1.0, 1.0, 1.0]);
//    this.mCoolDownBg.getXform().setPosition(this.sPosX, this.sPosY);
//    this.mCoolDownBg.getXform().setSize(this.sWidth, this.sHeight);
    
    this.mCoolDownImg = new SpriteRenderable(cooldownImgTexture);
    this.mCoolDownImg.setColor([0.4, 0.4, 0.4, 0.5]);
    this.mCoolDownImg.getXform().setPosition(this.sPosX, this.sPosY);
    this.mCoolDownImg.getXform().setSize(this.sWidth, this.sHeight);
    //this.mCoolDownBg.setElementPixelPositions(0, 32, 0 ,32);
    GameObject.call(this, this.mCoolDownImg);
    
    this.mCoolDownCover = new Renderable();
    this.mCoolDownCover.setColor([0.0, 0.0, 1.0, 0.3]);
    //this.mCoolDownCover.getXform().setPosition(0, 4);
    //this.mCoolDownCover.getXform().setSize(this.sWidth, this.sHeight);
    
    this.mCoolDownText = new FontRenderable("N/A");
    this.mCoolDownText.setFont(textfont);
    this.mCoolDownText.setColor([0.0, 0.0, 0.0, 1.0]);
    this.mCoolDownText.getXform().setPosition(this.sPosX - 0.4, this.sPosY + 0.1);
    this.mCoolDownText.setTextHeight(this.sHeight / 2);
}
gEngine.Core.inheritPrototype(CooldownBar, GameObject);


CooldownBar.prototype.draw = function (aCamera) {
    //this.mCoolDownBg.draw(aCamera);
    GameObject.prototype.draw.call(this, aCamera);
    if (this.sIsCooldown) {
        this.mCoolDownCover.draw(aCamera);
        this.mCoolDownText.draw(aCamera);   
    }
};


CooldownBar.prototype.update = function (cooldownTick, maxCooldown) {
    GameObject.prototype.update.call(this);
    var t = cooldownTick / 60;
    var k = cooldownTick / maxCooldown;
    if (cooldownTick <= 0) {
        this.sIsCooldown = false;
        this.mCoolDownImg.setColor([0.4, 0.4, 0.4, 0.0]);
    }
    else {
        this.sIsCooldown = true;
        this.mCoolDownCover.getXform().setPosition(this.sPosX, this.sPosY - k * this.sHeight / 2);
        this.mCoolDownCover.getXform().setSize(this.sWidth, this.sHeight * (1 - k));
        this.mCoolDownCover.setColor([0.0, 0.0, 1.0, 0.3]);
        this.mCoolDownImg.setColor([0.4, 0.4, 0.4, 0.5]);
        this.mCoolDownText.setText(t.toFixed(1));
    }
};


