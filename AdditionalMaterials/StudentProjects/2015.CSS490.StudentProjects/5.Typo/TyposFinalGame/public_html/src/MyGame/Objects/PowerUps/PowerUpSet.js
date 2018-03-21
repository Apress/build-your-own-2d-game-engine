/* File: 		PowerUpSet.js
 * Author:      	Ryu Muthui
 * Last Date Modified: 	12/15/2015
 * Description:		Logic for housing porjectiles. */
"use strict"; 

function PowerUpSet(owner) {
    this.kPowerUpPickUpSFX = "assets/Audio/SFX/PowerUp_PickUp04.wav";
    GameObjectSet.call(this);
    this.mOwner = owner;
}
gEngine.Core.inheritPrototype(PowerUpSet, GameObjectSet);

PowerUpSet.prototype.update = function(starFighter) {
    // remove the expired power-ups
    var i, obj;
    for (i = 0; i < this.size(); i++) {
        obj = this.getObjectAt(i);
        if (obj.hasExpired())
            this.removeFromSet(obj);
    }
    
    // update all objects
    for (i = 0; i < this.size(); i++) {
        obj = this.getObjectAt(i);
        obj.update();
    }
    
    if (starFighter !== undefined) {
        for (i = 0; i < this.size(); i++) {
            obj = this.getObjectAt(i);
            if (starFighter.intersectsBoundObjectObject(obj)) {
                if (obj instanceof PowerUp_HealthFull) {
                    starFighter.setHealth(100);
                    obj.setExpired();
                }
                if (obj instanceof PowerUp_WeaponTriple) {
                    starFighter.addPowerUp(obj);
                    this.removeFromSet(obj);
                    obj.setStarted();
                }
                if (obj instanceof PowerUp_ShieldAdd) {
                    starFighter.addShield();
                    obj.setExpired();
                }
                score += 100;
                gEngine.AudioClips.playACue(this.kPowerUpPickUpSFX);
            }
        }
    }
};

PowerUpSet.prototype.add = function(powerUp) {
    this.addToSet(powerUp);
};

PowerUpSet.prototype.draw = function (aCamera) {
    var i;
    for (i = 0; i < this.mSet.length; i++) {
        this.mSet[i].draw(aCamera);
    }
};

PowerUpSet.prototype.hasWeaponTriple = function() {
    var i;
    for (i = 0; i < this.mSet.length; i++) {
        if (this.mSet[i] instanceof PowerUp_WeaponTriple)
	    return true;
    }
    return false;
};

PowerUpSet.prototype.getLength = function() { return this.mSet.length; };
PowerUpSet.prototype.getObjectAt = function(i) { return this.mSet[i]; };