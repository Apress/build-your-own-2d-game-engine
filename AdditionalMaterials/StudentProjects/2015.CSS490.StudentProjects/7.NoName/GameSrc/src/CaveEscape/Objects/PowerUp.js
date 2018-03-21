/* File: Projectile.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, Renderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

PowerUp.kTexture = null;

PowerUp.eState = Object.freeze({
    BobbingUp: 0,
    BobbingDown: 1
});

PowerUp.ePowerUpRarity = Object.freeze({
    VeryCommon: 0,
    Common: 1,
    UnCommon: 2,
    Rare: 3
});

PowerUp.ePowerUpType = Object.freeze({
    MultiShot: 0,
    DoubleShot: 1,
    SplitShot: 2,
    FireRateSpeedBoost: 3,
    FireRateSpeedBoost2: 4,
    FireRateSpeedDecrease: 5,
    ProjectileSpeedBoost: 6,
    ProjectileSpeedBoost2: 7,
    ProjectileSpeedDecrease: 8,
    DamageBoost: 9,
    DamageBoost2: 10,
    DamageDecrease: 11,
    ShieldBoost: 12,
    ShieldBoost2: 13,
    ShieldBoost3: 14,
    HullBoost: 15,
    HullBoost2: 16,
    HullBoost3: 17,
    MultiBoostA: 18,
    MultiBoostB: 19,
    MultiBoostC: 20,
    MultiBoostX: 21
});

function PowerUp(x, y, type, pointValue, lgtSet, audioCue) {
    
    this.mAudioCue = audioCue;
    this.kBobbingDelta = 0.7;
    this.kCycles = 50;  // number of cycles to complete the transition
    this.kRate = 0.05;  // rate of change for each cycle
    
    this.mPointValue = pointValue;  // get these points if you pickup the powerup, lose these points if destroyed
    this.mState = PowerUp.eState.BobbingUp;
    this.mPos = new InterpolateVec2(vec2.fromValues(x, y), this.kCycles, this.kRate);  // use interpolation to make the powerup bob up/down
    this.mPos.setFinalValue(vec2.fromValues(x, y + (this.kBobbingDelta / 2)));
    
    this.mType = type;

    var r = new LightRenderable(PowerUp.kTexture);
    r.setColor([0.8, 1, 0.8, 0.1]);
    r.getXform().setPosition(x, y);
    r.getXform().setSize(1, 1);    
    r.addLight(lgtSet.getLightAt(0));  

    // Set the sprite animation and other parameters based on the type of powerup (the powerup type values are in the same order as in the spritesheet)
    var h = 38;
    var w = 23;
    var padding = 1;
    var rowCount = 10;
    var yOff = Math.round( (Math.round( ((this.mType / rowCount) - 0.5) ) * (h + padding)) );
    var xOff = Math.round(Math.round(this.mType % rowCount) * (w + padding));
    r.setSpriteSequence(256 - yOff, 0 + xOff, w, h, 1, 0);
            
    GameObject.call(this, r);
    this.mExpired = false;
}
gEngine.Core.inheritPrototype(PowerUp, GameObject);

PowerUp.prototype.collect = function(ship) {
    
    var duration = 900;  // number of cycles that the effect will persist
    ship.incScore(this.mPointValue);  // add points to the ship
    
    // Process the powerup effects
    switch(this.mType) {
        
        case PowerUp.ePowerUpType.MultiShot:
            ship.getWeapon().setProjectile(Weapon.eProjectileType.eMultiShot, duration);
            break;
        
        case PowerUp.ePowerUpType.DoubleShot:
            ship.getWeapon().setProjectile(Weapon.eProjectileType.eDoubleShot, duration);
            break;
        
        case PowerUp.ePowerUpType.SplitShot:
            ship.getWeapon().setProjectile(Weapon.eProjectileType.eSplitShot, duration);
            break;
        
        case PowerUp.ePowerUpType.FireRateSpeedBoost:
            ship.getWeapon().setFireRate(2, duration);  // double the fire rate
            break;
        
        case PowerUp.ePowerUpType.FireRateSpeedBoost2:
            ship.getWeapon().setFireRate(3, duration);  // triple the fire rate
            break;
        
        case PowerUp.ePowerUpType.FireRateSpeedDecrease:
            ship.getWeapon().setFireRate(0.5, duration);  // halve the fire rate
            break;
        
        case PowerUp.ePowerUpType.ProjectileSpeedBoost:
            ship.getWeapon().setProjectileSpeed(2, duration);  // double the projectile speed
            break;
        
        case PowerUp.ePowerUpType.ProjectileSpeedBoost2:
            ship.getWeapon().setProjectileSpeed(3, duration);  // triple the projectile speed
            break;
        
        case PowerUp.ePowerUpType.ProjectileSpeedDecrease:
            ship.getWeapon().setProjectileSpeed(0.5, duration);  // halve the projectile speed
            break;
        
        case PowerUp.ePowerUpType.ShieldBoost:
            ship.boostShields(0.1);  // boost shields by 10% of their max value
            break;
        
        case PowerUp.ePowerUpType.ShieldBoost2:
            ship.boostShields(0.25);  // boost shields by 25% of their max value
            break;
        
        case PowerUp.ePowerUpType.ShieldBoost3:
            ship.boostShields(0.5);  // boost shields by 50% of their max value
            break;
        
        case PowerUp.ePowerUpType.HullBoost:
            ship.boostHullIntegrity(0.1);  // boost hull integrity by 10% of max value
            break;
        
        case PowerUp.ePowerUpType.HullBoost2:
            ship.boostHullIntegrity(0.25);  // boost hull integrity by 25% of max value
            break;
        
        case PowerUp.ePowerUpType.HullBoost3:
            ship.boostHullIntegrity(0.5);  // boost hull integrity by 50% of max value
            break;
        
        case PowerUp.ePowerUpType.DamageBoost:
            ship.getWeapon().setDamage(2, duration);  // double the damage
            break;
        
        case PowerUp.ePowerUpType.DamageBoost2:
            ship.getWeapon().setDamage(3, duration);  // triple the damage
            break;
        
        case PowerUp.ePowerUpType.DamageDecrease:
            ship.getWeapon().setDamage(0.5, duration);  // half the damage
            break;
        
        case PowerUp.ePowerUpType.MultiBoostA:
            ship.getWeapon().setProjectile(Weapon.eProjectileType.eMultiShot, duration);
            ship.getWeapon().setFireRate(2, duration);  // double the fire rate
            ship.getWeapon().setProjectileSpeed(2, duration);  // double the projectile speed
            break;
        
        case PowerUp.ePowerUpType.MultiBoostB:
            ship.getWeapon().setProjectile(Weapon.eProjectileType.eDoubleShot, duration);
            ship.getWeapon().setFireRate(2, duration);  // double the fire rate
            ship.getWeapon().setProjectileSpeed(2, duration);  // double the projectile speed
            break;
        
        case PowerUp.ePowerUpType.MultiBoostC:
            ship.getWeapon().setProjectile(Weapon.eProjectileType.eSplitShot, duration);
            ship.getWeapon().setFireRate(2, duration);  // double the fire rate
            ship.getWeapon().setProjectileSpeed(2, duration);  // double the projectile speed
            break;
        
        default:  // MultiBoostX
            ship.getWeapon().reset();
            ship.getWeapon().setFireRate(0.5, duration);  // half the fire rate
            ship.getWeapon().setProjectileSpeed(0.5, duration);  // half the projectile speed
            break;
    }    
    
    // Once the powerup has been collected set it to expired so that it will be removed on the next update
    this.setExpired();
    
    // Play the audio
    gEngine.AudioClips.playACue(this.mAudioCue);
};

PowerUp.prototype.setExpired = function() {
    this.mExpired = true;
};
PowerUp.prototype.hasExpired = function() {
    return this.mExpired;
};

PowerUp.prototype.update = function(aCamera) {
   
   if(this.mExpired) { return; }
    GameObject.prototype.update.call(this);
    
    var pos = this.mPos.getValue();
    
    if (aCamera.objectOutOfScope(this.getXform())) {
        this.setExpired();
    }
    
    // Update our interpolated movement
    this.mPos.updateInterpolation();
    
    // Update the bobbing behavior
    if(this.mPos.isFinished()) {
        switch(this.mState) {
            case PowerUp.eState.BobbingUp:
                this.mPos.setFinalValue(vec2.fromValues(pos[0], pos[1] - this.kBobbingDelta));
                this.mState = PowerUp.eState.BobbingDown;
                break
                
            default: // BobbingDown
                this.mPos.setFinalValue(vec2.fromValues(pos[0], pos[1] + this.kBobbingDelta));
                this.mState = PowerUp.eState.BobbingUp;
                break;
        }
    }
    
    // Update the position of the powerup
    this.getXform().setPosition(pos[0], pos[1]);
};

PowerUp.prototype.projectileHit = function (projectile, explosionSet) {
    
    // Generate an explosion
    var curPos = projectile.getXform().getPosition();
    explosionSet.newExplosion(curPos[0], curPos[1], ExplosionSet.eExplosionType.eSmall);

    this.setExpired();  // expire the powerup
};

PowerUp.prototype.getPowerUpName = function() {
    var string = "";
    switch (this.mType) {
        case 0: string = "Multishot"; break;
        case 1: string = "Doubleshot"; break;
        case 2: string = "Splitshot"; break;
        case 3: string = "Fire Rate Increase I"; break;
        case 4: string = "Fire Rate Increase II"; break;
        case 5: string = "Fire Rate Decrease"; break;
        case 6: string = "Bullet Speed Increase I"; break;
        case 7: string = "Bullet Speed Increase II"; break;
        case 8: string = "Bullet Speed Decrease"; break;
        case 9: string = "Damage Boost I"; break;
        case 10: string = "Damage Boost II"; break;
        case 11: string = "Damage Decrease"; break;
        case 12: string = "Shield Boost I"; break;
        case 13: string = "Shield Boost II"; break;
        case 14: string = "Shield Boost III"; break;
        case 15: string = "Hull Boost I"; break;
        case 16: string = "Hull Boost II"; break;
        case 17: string = "Hull Boost III"; break;
        case 18: string = "Multi Boost A"; break;
        case 19: string = "Multi Boost B"; break;
        case 20: string = "Multi Boost C"; break;
        case 21: string = "Multi Decrease"; break;
        default: string = "";
    };
    
    return string;
};