/* File: Weapon.js 
 *
 * Creates and initializes the Weapon
 */

Weapon.eProjectileType = Object.freeze({
    eNormal: 0,
    eMultiShot: 1,
    eDoubleShot: 2,
    eSplitShot: 3
});

Weapon.eBulletType = Object.freeze({
    eBullet: 0,
    eMissile: 1
});

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Weapon (projSet, lgtSet, damage, speed, fireRate, audioCue, bulletType, homingRate) {
    
    this.mSoundCue = audioCue;
    this.mLightSet = lgtSet;
    this.mProjectileSet = projSet;
    this.mBaseProjectile = Weapon.eProjectileType.eNormal;
    this.mBaseDamage = damage;
    this.mBaseProjectileSpeed = speed;
    this.mBaseFireRate = fireRate;
    this.mBulletType = bulletType;
    this.mProjectileHomingRate = homingRate || 0.01; // default to 0.01 homing
    
    this.reset();  // set the current values to the base values
    
    this.mCyclesElapsed = Math.random() * 60;  // randomize this slighly so that the turrets don't all fire at the same time
    
    // Track duration for any temporary effects
    this.mProjectileCyclesRemaining = 0;
    this.mDamageCyclesRemaining = 0;
    this.mProjectileSpeedCyclesRemaining = 0;
    this.mFireRateCyclesRemaining = 0;
}

Weapon.prototype.getStatusText = function() {

    var text = "";
    
    text += "Projectile:";
    
    switch(this.mCurrentProjectile) {
        case Weapon.eProjectileType.eMultiShot:
            text += "MultiShot (" + this.mProjectileCyclesRemaining + ") ";
            break;
        
        case Weapon.eProjectileType.eDoubleShot:
            text += "DoubleShot " + this.mProjectileCyclesRemaining + ") ";
            break;
        
        case Weapon.eProjectileType.eSplitShot:
            text += "SplitShot " + this.mProjectileCyclesRemaining + ") ";
            break;
        
        default:  // normal
            text += "Normal ";
            break;
    }
    
    text += "ProjectileSpeed:" + this.mCurrentProjectileSpeed.toFixed(1);
    if(this.mProjectileSpeedCyclesRemaining > 0) { text += " (" + this.mProjectileSpeedCyclesRemaining + ")"; }
    
    text += " FireRate:" + this.mCurrentFireRate.toFixed(1);
    if(this.mFireRateCyclesRemaining > 0) { text += " (" + this.mFireRateCyclesRemaining + ")"; }
    
    text += " Damage:" + this.mCurrentDamage.toFixed(1);
    if(this.mDamageCyclesRemaining > 0) { text += " (" + this.mDamageCyclesRemaining + ")"; }
    
    return text;    
};

Weapon.prototype.fire = function(x, y, dir, target) {

    // Just return if it's too soon to allow another shot to be fired
    if(this.mCyclesElapsed < this.mCurrentFireRate) { return; }

    var shot1, shot2, origin, displace;

    // Logic for the firing depends on the type of projectile the weapon is currently firing
    switch(this.mCurrentProjectile) {
        
        case Weapon.eProjectileType.eMultiShot:  // ship only (fires in 3 directions at once)
            this.mProjectileSet.newAt(x, y, [1, 0], this.mCurrentDamage, this.mLightSet, this.mCurrentProjectileSpeed, this.mBulletType, target, this.mProjectileHomingRate);
            this.mProjectileSet.newAt(x, y, [0, 1], this.mCurrentDamage, this.mLightSet, this.mCurrentProjectileSpeed, this.mBulletType, target, this.mProjectileHomingRate);
            this.mProjectileSet.newAt(x, y, [0, -1], this.mCurrentDamage, this.mLightSet, this.mCurrentProjectileSpeed, this.mBulletType, target, this.mProjectileHomingRate);
            break;
            
        case Weapon.eProjectileType.eDoubleShot:  
            
            // These vectors will be the new origins for each shot
            shot1 = vec2.create();
            shot2 = vec2.create();
            
            // Take the perpindicular vector to the direction and use it to displace each shot so that we end up
            // with 2 projectiles slightly offset from each other
            origin = vec2.fromValues(x, y);
            displace = vec2.fromValues(dir[1], dir[0]);
            vec2.normalize(displace, displace);
            vec2.scale(displace, displace, 0.5);
            vec2.add(shot1, origin, displace);
            vec2.subtract(shot2, origin, displace);
                        
            this.mProjectileSet.newAt(shot1[0], shot1[1], dir, this.mCurrentDamage, this.mLightSet, this.mCurrentProjectileSpeed, this.mBulletType, target, this.mProjectileHomingRate);
            this.mProjectileSet.newAt(shot2[0], shot2[1], dir, this.mCurrentDamage, this.mLightSet, this.mCurrentProjectileSpeed, this.mBulletType, target, this.mProjectileHomingRate);
            break;    
        
        case Weapon.eProjectileType.eSplitShot:  
            
            // These vectors will be the new origins for each shot
            shot1 = vec2.create();
            shot2 = vec2.create();
            
            var rotation = 30 * Math.PI / 180;
            vec2.rotate(shot1, dir, rotation);
            vec2.rotate(shot2, dir, -rotation);
            
            this.mProjectileSet.newAt(x, y, dir, this.mCurrentDamage, this.mLightSet, this.mCurrentProjectileSpeed, this.mBulletType, target, this.mProjectileHomingRate);
            this.mProjectileSet.newAt(x, y, shot1, this.mCurrentDamage, this.mLightSet, this.mCurrentProjectileSpeed, this.mBulletType, target, this.mProjectileHomingRate);
            this.mProjectileSet.newAt(x, y, shot2, this.mCurrentDamage, this.mLightSet, this.mCurrentProjectileSpeed, this.mBulletType, target, this.mProjectileHomingRate);
            break;
        
        default: // Normal
            this.mProjectileSet.newAt(x, y, dir, this.mCurrentDamage, this.mLightSet, this.mCurrentProjectileSpeed, this.mBulletType, target, this.mProjectileHomingRate);
            break;
    }
    
    // Reset the counter
    this.mCyclesElapsed = 0;
    
    // Play the audio
    gEngine.AudioClips.playACue(this.mSoundCue);
};

Weapon.prototype.setProjectile = function(type, duration) {

    // If params are invalid then don't do anything
    if(duration < 0) { return; }
    
    // Setup the effect
    this.mProjectileCyclesRemaining = duration;
    this.mCurrentProjectile = type;
};

Weapon.prototype.setBaseProjectile = function(type) {
    this.mBaseProjectile = type;
    this.mCurrentProjectile = type;
};

Weapon.prototype.setDamage = function(modifier, duration) {
    
    // If params are invalid then don't do anything
    if(duration < 0 || modifier < 0) { return; }
    
    // Setup the effect
    this.mDamageCyclesRemaining = duration;
    this.mCurrentDamage = this.mBaseDamage * modifier;
};

Weapon.prototype.getBaseDamage = function() { return this.mBaseDamage; };

Weapon.prototype.setProjectileSpeed = function(modifier, duration) {

    // If params are invalid then don't do anything
    if(duration < 0 || modifier < 0) { return; }
    
    // Setup the effect
    this.mProjectileSpeedCyclesRemaining = duration;
    this.mCurrentProjectileSpeed = this.mBaseProjectileSpeed * modifier;
};

Weapon.prototype.setFireRate = function(modifier, duration) {

    // If params are invalid then don't do anything
    if(duration < 0 || modifier < 0) { return; }
    
    // Setup the effect
    this.mFireRateCyclesRemaining = duration;
    this.mCurrentFireRate = this.mBaseFireRate * (1 / modifier);
};

Weapon.prototype.reset = function() {
    this.mCurrentProjectile = this.mBaseProjectile;
    this.mCurrentDamage = this.mBaseDamage;
    this.mCurrentProjectileSpeed = this.mBaseProjectileSpeed;
    this.mCurrentFireRate = this.mBaseFireRate;
};

Weapon.prototype.update = function() {
    
    this.mCyclesElapsed++;
    
    // Update the temp projectile effect
    if(this.mProjectileCyclesRemaining > 0) {
        this.mProjectileCyclesRemaining--;
        
        // If finished, reset the projectile back to the base
        if(this.mProjectileCyclesRemaining === 0) {
            this.mCurrentProjectile = this.mBaseProjectile;
        }
    }
    
    // Update the temp projectile effect
    if(this.mDamageCyclesRemaining > 0) {
        this.mDamageCyclesRemaining--;
        
        // If finished, reset the projectile back to the base
        if(this.mDamageCyclesRemaining === 0) {
            this.mCurrentDamage = this.mBaseDamage;
        }
    }
    
    // Update the temp projectile effect
    if(this.mProjectileSpeedCyclesRemaining > 0) {
        this.mProjectileSpeedCyclesRemaining--;
        
        // If finished, reset the projectile back to the base
        if(this.mProjectileSpeedCyclesRemaining === 0) {
            this.mCurrentProjectileSpeed = this.mBaseProjectileSpeed;
        }
    }    
    
    // Update the temp projectile effect
    if(this.mFireRateCyclesRemaining > 0) {
        this.mFireRateCyclesRemaining--;
        
        // If finished, reset the projectile back to the base
        if(this.mFireRateCyclesRemaining === 0) {
            this.mCurrentFireRate = this.mBaseFireRate;
        }
    }
};
    