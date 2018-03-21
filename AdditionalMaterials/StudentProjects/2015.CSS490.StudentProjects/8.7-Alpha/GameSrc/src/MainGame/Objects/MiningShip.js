/*
 * Team 7-Alpha
 * CSS 490C
 * 2D Game Engine Design
 * File: MiningShip.js 
 * 
 * This object represents our mining ship 
 * 
 */

function MiningShip(atX, atY) {
    this.kShieldStartAmount = 10;
    this.kEnergyStartAmount = 100;
    this.kFuelStartAmount = 100;
    this.kOreValue = 20;
    this.kExplosiveClipSize = 4;
    this.kHomingClipSize = 10;
    
    // holds current status numbers
    this.mShields = this.kShieldStartAmount;
    this.mEnergy = this.kEnergyStartAmount;
    this.mOreCollected = 0;
    
    // power ups: 'N' === None
    //            'H' === Homing rocket
    //            'X' === Explosive rocket
    this.mPowerUpStatus = 'N';
    this.mCurrentAmmo = 0;
    this.kDelta = 0.8;
    this.kMinionSprite = "assets/ship.png";
    this.kMinionSpriteNormal = "assets/shipNormal.png";
    this.kPowerUpSound = "assets/sounds/powerup.wav";
    this.kShipHurt = "assets/sounds/shipHurt.wav";
    this.kCollectOre = "assets/sounds/collectOre.wav";
    
    
    this.mShip = new IllumRenderable(this.kMinionSprite, this.kMinionSpriteNormal);
    
    this.mShip.setColor([1, 1, 1, 0]);
    this.mShip.getXform().setPosition(atX, atY);
    this.mShip.getXform().setZPos(5);
    this.mShip.getXform().setSize(9, 12);
    this.mShip.addLight(gGameLights.getDirectionalLight());
    GameObject.call(this, this.mShip);
}
gEngine.Core.inheritPrototype(MiningShip, GameObject);

MiningShip.prototype.update = function (scanModeBoolean) {
    // control by Left and Right
    var xform = this.getXform();
    if (scanModeBoolean === false) {
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
            xform.incXPosBy(-this.kDelta);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
            xform.incXPosBy(this.kDelta);
        }
    }
    
    if (this.mCurrentAmmo === 0) {
        this.mPowerUpStatus = 'N';
    }
};

MiningShip.prototype.getCurrentAmmo = function () {
    return this.mCurrentAmmo;
};

MiningShip.prototype.addToCurrentAmmo = function (clip) {
    this.mCurrentAmmo += clip;
};

MiningShip.prototype.useAmmo = function () {
    if (this.mCurrentAmmo > 0) {
        this.mCurrentAmmo--;
    } 
};

MiningShip.prototype.getStartingShieldValue = function () {
  return this.kShieldStartAmount;  
};

MiningShip.prototype.getStartingEnergyValue = function () {
    return this.kEnergyStartAmount;
};

MiningShip.prototype.getCurrentShields = function () {
    return this.mShields;
};

MiningShip.prototype.getCurrentEnergy = function () {
    return this.mEnergy;
};

MiningShip.prototype.getCurrentPowerStatus = function () {
    return this.mPowerUpStatus;
};

MiningShip.prototype.setCurrentPowerStatus = function (power) {
this.mPowerUpStatus = power;
};

MiningShip.prototype.drainEnergy = function (energyLostPerCall) {
    if (this.mEnergy > 0) {
        this.mEnergy -= energyLostPerCall;
    }
    if (this.mEnergy < 0) {
        this.mEnergy = 0;
    }
};

MiningShip.prototype.gainEnergy = function (energyGainedPerCall) {
    if (this.mEnergy <= this.kEnergyStartAmount) {
        this.mEnergy += energyGainedPerCall;
    }
    if (this.mEnergy > this.kEnergyStartAmount) {
        this.mEnergy = this.kEnergyStartAmount;
    }
};

MiningShip.prototype.getOreCollected = function () {
    return this.mOreCollected;
};

MiningShip.prototype.checkFieldObjectCollision = function (fieldObjectList) {
    var i;
    
    for (i = 0; i < fieldObjectList.getLength(); i++) {
        var touchPosition = [];
        
        if (!fieldObjectList.getObjectAt(i).getToRemove()) {
            if (GameObject.prototype.pixelTouches.call(this, 
            fieldObjectList.getObjectAt(i).getSubObject(), touchPosition)) {
                fieldObjectList.getObjectAt(i).getSubObject().setCollided(true);
                if (fieldObjectList.getObjectAt(i).getObjectType() === 'P') {
                    this.mOreCollected += this.kOreValue;
                    gEngine.AudioClips.playACue(this.kCollectOre);
                }
                if (fieldObjectList.getObjectAt(i).getObjectType() === 'A') {
                    this.mShields--;
                    gEngine.AudioClips.playACue(this.kShipHurt);
                }
                
                if (fieldObjectList.getObjectAt(i).getObjectType() === 'X') {
                    this.mPowerUpStatus = 'X';
                    this.mCurrentAmmo = this.kExplosiveClipSize;
                    gEngine.AudioClips.playACue(this.kPowerUpSound);
                }
                if (fieldObjectList.getObjectAt(i).getObjectType() === 'H') {
                    this.mPowerUpStatus = 'H';
                    this.mCurrentAmmo = this.kHomingClipSize;
                    gEngine.AudioClips.playACue(this.kPowerUpSound);
                }
                
            }
        }
        
    }
};