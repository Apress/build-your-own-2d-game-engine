/* File: 		Shield.js
 * Author:      	Ryu Muthui
 * Last Date Modified: 	12/15/2015
 * Description:		Creates and initializes the Shield around the
 *                      (Player), and its necessary logic. */
"use strict";

function Shield(spriteTexture) {
    this.kRefWidth = 32;
    this.kRefHeight = 4;
    this.kRotateDelta = (2 * Math.PI) / 100; // Added the rotation rate of the Shield Effects
    

    this.mShield = new TextureRenderable(spriteTexture);
    this.mShield.getXform().setSize(this.kRefWidth, this.kRefHeight);
    //this.mShield.getXform().setPosition(starfighter.getXform().getXPos(), starfighter.getXform().getYPos() + 100);
    
    this.mExpired = false;
    
    GameObject.call(this, this.mShield);
}
gEngine.Core.inheritPrototype(Shield, GameObject);

Shield.prototype.setExpired = function() { this.mExpired = true; };
Shield.prototype.hasExpired = function() { return this.mExpired; };

// Added rotate function in update to make Shield Effect rotate
Shield.prototype.update = function(starfighter){
    this.getXform().incRotationByRad(this.kRotateDelta);
    //var toSF = [];
    //vec2.subtract(toSF, this.getXform().getPosition(), starfighter.getXform().getPosition());
    vec2.rotate(this.getCurrentFrontDir(), this.getCurrentFrontDir(), this.kRotateDelta);
    var newPos = [];
    vec2.multiply(newPos, this.getCurrentFrontDir(), [50, 50]);
    vec2.add(newPos, newPos, starfighter.getXform().getPosition());
    this.getXform().setPosition(newPos[0], newPos[1]);
};