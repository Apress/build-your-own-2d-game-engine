/* File: 		PowerUp_HealthFull.js
 * Author:      	Chad Dugie
 * Last Date Modified: 	12/15/2015
 * Description:		Creates and initializes power up for health objects. */
"use strict";

function PowerUp_ShieldAdd(spriteTexture, x, y) {
    this.mPowerUp_ShieldAdd = new SpriteAnimateRenderable(spriteTexture);
    this.mPowerUp_ShieldAdd.setColor([0.0, 0.0, 1.0, 0.4]);
    PowerUp.call(this, this.mPowerUp_ShieldAdd, x, y);
    this.setSpeed(0.5);
}
gEngine.Core.inheritPrototype(PowerUp_ShieldAdd, PowerUp);

PowerUp_ShieldAdd.prototype.update = function() { PowerUp.prototype.update.call(this); };