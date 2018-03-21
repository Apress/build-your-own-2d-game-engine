/* 
 * File: HealthBar.js
 * Created by phreeze Tang 25/7/2017
 * Defined the HealthBar.
 * 
 * change log: 
 * 25/7/2017 create the file
 * 27/7/2017 reconfiguration
 */

"use strict";

/* global GameObject, gEngine */

function HealthBar (healthBarBgTexture, healthBarLTexture, healthBarRTexture, initMaxHealth) {
    //this.sPlayer1Health = 100;
    //this.sPlayer1Health = null;
    this.sInitWidth = 25;
    this.sInitMaxHealth = initMaxHealth;
    this.sWidth =  this.sInitWidth;
    this.sHeight = 0.65;
    this.sPosY = 7.5;
    
    this.mHealthBarBg = new SpriteRenderable(healthBarBgTexture);
    this.mHealthBarBg.setColor([0.0, 0.0, 0.0, 1.0]);
    this.mHealthBarBg.getXform().setPosition(0, this.sPosY);
    this.mHealthBarBg.getXform().setSize(this.sWidth, this.sHeight);
    this.mHealthBarBg.setElementPixelPositions(0, 32, 0 ,32);
    GameObject.call(this, this.mHealthBarBg);
    
    this.mHealthBarL = new SpriteRenderable(healthBarLTexture);
    this.mHealthBarL.setColor([1.0, 0.0, 0.0, 1.0]);
    //this.mHealthBarL.getXform().setPosition((-100 + this.sPlayer1Health / 2) / 200 * this.sWidth, 4);
    //this.mHealthBarL.getXform().setSize(this.sPlayer1Health / 200 * this.sWidth, this.sHeight);
    this.mHealthBarL.setElementPixelPositions(0, 32, 0 ,32);
    
    this.mHealthBarR = new SpriteRenderable(healthBarRTexture);
    this.mHealthBarR.setColor([0.0, 0.0, 1.0, 1.0]);
    //this.mHealthBarR.getXform().setPosition(this.sPlayer1Health / 400 * this.sWidth, 4);
    //this.mHealthBarR.getXform().setSize((200 - this.sPlayer1Health) / 200 * this.sWidth, this.sHeight);
    this.mHealthBarR.setElementPixelPositions(0, 32, 0 ,32);
}
gEngine.Core.inheritPrototype(HealthBar, GameObject);


HealthBar.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mHealthBarL.draw(aCamera);
    this.mHealthBarR.draw(aCamera);
};


HealthBar.prototype.update = function (player1Health, curMaxHealth) {
    GameObject.prototype.update.call(this);
//    this.sPlayer1Health = player1Health;
//    this.mHealthBarL.getXform().setPosition((-100 + this.sPlayer1Health / 2) / 200 * this.sWidth, 4);
//    this.mHealthBarL.getXform().setSize(this.sPlayer1Health / 200 * this.sWidth, this.sHeight);
//    this.mHealthBarR.getXform().setPosition(this.sPlayer1Health / 400 * this.sWidth, 4);
//    this.mHealthBarR.getXform().setSize((200 - this.sPlayer1Health) / 200 * this.sWidth, this.sHeight);
    
    this.sWidth = this.sInitWidth * curMaxHealth / this.sInitMaxHealth;
    this.mHealthBarL.getXform().setPosition((-curMaxHealth / 2 + player1Health / 2) / curMaxHealth * this.sWidth, this.sPosY);
    this.mHealthBarL.getXform().setSize(player1Health / curMaxHealth * this.sWidth, this.sHeight);
    this.mHealthBarR.getXform().setPosition(player1Health / curMaxHealth / 2 * this.sWidth, this.sPosY);
    this.mHealthBarR.getXform().setSize((curMaxHealth - player1Health) / curMaxHealth * this.sWidth, this.sHeight);
};
