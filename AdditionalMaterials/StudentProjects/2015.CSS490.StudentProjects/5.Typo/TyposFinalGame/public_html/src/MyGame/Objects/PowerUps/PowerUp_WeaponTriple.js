/* File: 		PowerUp_WeaponTriple.js
 * Author:      	Chad Dugie
 * Last Date Modified: 	12/15/2015
 * Description:		Creates and initializes power up for weapons, 3 shot*/
"use strict";

function PowerUp_WeaponTriple(spriteTexture, x, y) {
    this.mPowerUp_WeaponTriple = new SpriteAnimateRenderable(spriteTexture);
    this.mPowerUp_WeaponTriple.setColor([0.0, 1.0, 0.0, 0.4]);
    PowerUp.call(this, this.mPowerUp_WeaponTriple, x, y);
    this.setSpeed(0.5);
    
    this.mDuration = 15;
    this.mDurationCounter = 0;
    this.mStarted = false;
}
gEngine.Core.inheritPrototype(PowerUp_WeaponTriple, PowerUp);

PowerUp_WeaponTriple.prototype.update = function(){
    PowerUp.prototype.update.call(this);
    if (this.mStarted) {
	if (this.mDurationCounter >= this.mDuration * 60) {
	    this.setExpired();
	}
	this.mDurationCounter++;
    }
};

PowerUp_WeaponTriple.prototype.setStarted = function() { this.mStarted = true; };
PowerUp_WeaponTriple.prototype.hasStarted = function() { return this.mStarted; };