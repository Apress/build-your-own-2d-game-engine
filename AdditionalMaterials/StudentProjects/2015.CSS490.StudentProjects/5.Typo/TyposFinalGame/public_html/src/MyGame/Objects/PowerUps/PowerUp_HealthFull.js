/* File: 		PowerUp_HealthFull.js
 * Author:      	Chad Dugie
 * Last Date Modified: 	12/15/2015
 * Description:		Creates and initializes power up for health objects. */
"use strict";

function PowerUp_HealthFull(spriteTexture, x, y) {
    this.mPowerUp_HealthFull = new SpriteAnimateRenderable(spriteTexture);
    this.mPowerUp_HealthFull.setColor([1.0, 0.0, 0.0, 0.4]);
    PowerUp.call(this, this.mPowerUp_HealthFull, x, y);
    this.setSpeed(0.5);
}
gEngine.Core.inheritPrototype(PowerUp_HealthFull, PowerUp);

PowerUp_HealthFull.prototype.update = function(){ PowerUp.prototype.update.call(this);};