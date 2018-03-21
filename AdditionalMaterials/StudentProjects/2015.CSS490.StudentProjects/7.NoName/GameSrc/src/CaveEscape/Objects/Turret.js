/* Turret.js
 * This file contains the behavior for the basic enemy in cave escape:
 * the turret. The turret's behavior is based on a finite state machine
 * with clearly defined states, behaviors, and transitions.
 */
"use strict";

Turret.eTextureType = Object.freeze({
    eNormal: 0,
    eStrong: 1,
    eElite: 2
});

Turret.eType = Object.freeze({
    eWeak: 0,
    eNormal: 1,
    eStrong: 2,
    eVeryStrong: 3,
    eElite: 4,
    eSuperElite: 5,
    eEliteMissile: 6,
    eSuperEliteMissile: 7            
});

Turret.eState = Object.freeze({
    ePatrol:    0,
    eAim:       1,
    eLockedOn:  2
});

Turret.ePatrolDir = Object.freeze({
   eCW:     -1,
   eCCW:    1
});

function Turret (x, y, type, initialDirection, projSet, lgtSet, audioCue) {
    
    this.mTextureType = Turret.eTextureType.eNormal;
    
    this.kTextureArray = [
        "assets/turret1.png",
        "assets/turret2.png",
        "assets/turret3.png"
    ];
    this.kTextureNormalArray = [
        "assets/turret1_normal.png",
        "assets/turret2_normal.png",
        "assets/turret3_normal.png"
    ];
    
    this.kStateTinting = 0.075;                             // strength of color tinting of turret state indications
    this.mLgtSet = lgtSet;
    
    this.kAttackPeriod = 2;                                 // Attack period for the turret in seconds
    this.kPatrolSpeed = 30 / 60 * Math.PI / 180;            // angular rotation in radians per game update
    this.kMaxLockOnAngle = 5 * Math.PI / 180;               // maximum angle that is considered a lock-on (radians)
    this.kMaxPatrolAngle = 90 * Math.PI / 180;              // maximum patrol angle before switching directions (radians)
    this.kInitialDirection = initialDirection;              // initial direction of turret to define max rotation constraints
    this.kAimSpeed = 60 / 60 * Math.PI / 180;               // angular rotation (radians/s) when attempting to establish a target lock
    this.kLockOnSpeed = this.kAimSpeed * 10;                // follow the target very quickly once locked on
    this.mHomingRate = 0.01;                                // if the turret shoots missiles

    this._setTurretProperties(type, projSet, lgtSet, audioCue); // determine the strength and weapon of the turret

    this.mBasePointValue = 100;       // How many points does the player get when this turret is destroyed?
    this.mPointValue = (this.mBasePointValue * this.mMaxHP / 2) + (this.mBasePointValue * this.mWeapon.getBaseDamage() / 2);  // The points awarded when this turret is destoryed depends on the turret's HP and damage
    
    this.mState = Turret.eState.ePatrol; // patrol as default behavior
    this.mTick = 0;                      // state control variable for firing weapon
    this.mTargetAngle;                   // angle from center of spotlight to center of target
    this.mTarget = null;                 // target for turret to shoot at
    this.mPatrolDirection = Math.random() < 0.5 ? Turret.ePatrolDir.eCW : Turret.ePatrolDir.eCCW; // random starting patrol direction

    this.mTurret = new IllumRenderable(this.kTextureArray[this.mTextureType], this.kTextureNormalArray[this.mTextureType]);
    this.mTurret.getXform().setPosition(x, y);
    this.mTurret.getXform().setSize(3, 3);
    this.mTurret.setSpriteSequence(128, 0, 128, 128, 1, 0);

    // create the turret's spotlight and base its detection on the light's cone angle
    var i;
    this.mLight = this._createSpotLight(x, y);
    this.mTurret.addLight(this.mLight);
    this.kDetectionAngle = Math.abs(this.mLight.getOuter() / 2); // angle from center of spotlight to outer edge (radians)
    for (i = 0; i < lgtSet.numLights(); i++)
        this.mTurret.addLight(lgtSet.getLightAt(i));
    GameObject.call(this, this.mTurret);
    
    this.setCurrentFrontDir(this.kInitialDirection); // turret starts facing towards the center
}
gEngine.Core.inheritPrototype(Turret, GameObject);

Turret.prototype._createSpotLight = function (atX, atY) {
    var lgt = new Light();
    lgt.setLightType(2);                // spotlight
    lgt.setColor([1, 1, 1, 1]);         // default white light
    lgt.setXPos(atX);
    lgt.setYPos(atY);
    lgt.setZPos(0.2);                   // slightly above the game world
    lgt.setNear(0);
    lgt.setFar(10);
    lgt.setDirection([this.kInitialDirection[0], this.kInitialDirection[1], 0]);
    lgt.setIntensity(2.5);
    lgt.setDropOff(1);
    lgt.setOuter(0.5);
    lgt.setInner(lgt.getOuter());       // sharp-edged spotlight
    lgt.setLightCastShadowTo(false);
    
    this.mLgtSet.addToSet(lgt);                         // add turret's light to list of lights in the scene
    gEngine.LayerManager.addLightToAllLayers(lgt); // turret's light will affect rest of scene
    return lgt;
};

Turret.prototype._setTurretProperties = function (type, projSet, lgtSet, audioCue) {
     // Turret's properties depend on the type of turret being generated
    var maxHealth, damage = 1, projectile, projSpeed = 0.2, fireRateMod, baseFireRate = 120, bulletType = Weapon.eBulletType.eBullet;
    switch(type) {
        
        case Turret.eType.eNormal:
            this.mTextureType = Turret.eTextureType.eNormal;
            projectile = Weapon.eProjectileType.eNormal;
            maxHealth = 2;
            fireRateMod = 1.5;
            break;
        
        case Turret.eType.eStrong:
            this.mTextureType = Turret.eTextureType.eStrong;
            projectile = Weapon.eProjectileType.eNormal;
            maxHealth = 3;
            fireRateMod = 2;
            break;
        
        case Turret.eType.eVeryStrong:
            this.mTextureType = Turret.eTextureType.eStrong;
            projectile = Weapon.eProjectileType.eNormal;
            maxHealth = 4;
            fireRateMod = 3;
            break;
        
        case Turret.eType.eElite:
            this.mTextureType = Turret.eTextureType.eElite;
            projectile = Weapon.eProjectileType.eDoubleShot;
            maxHealth = 4;
            fireRateMod = 1;
            break;
        
        case Turret.eType.eSuperElite:
            this.mTextureType = Turret.eTextureType.eElite;
            projectile = Weapon.eProjectileType.eDoubleShot;
            maxHealth = 5;
            fireRateMod = 2;
            break;
        
        case Turret.eType.eEliteMissile:
            this.mTextureType = Turret.eTextureType.eElite;
            projectile = Weapon.eProjectileType.eNormal;
            bulletType = Weapon.eBulletType.eMissile;
            damage = 2;
            maxHealth = 4;
            fireRateMod = 1;
            break;
        
        case Turret.eType.eSuperEliteMissile:
            this.mTextureType = Turret.eTextureType.eElite;
            projectile = Weapon.eProjectileType.eNormal;
            bulletType = Weapon.eBulletType.eMissile;
            damage = 2;
            maxHealth = 5;
            fireRateMod = 2;
            break;        
        
        default:  // Weak
            this.mTextureType = Turret.eTextureType.eNormal;
            projectile = Weapon.eProjectileType.eNormal;
            maxHealth = 1;
            fireRateMod = 1;
            break;
    }   
    
    // Create the turret's weapon and set base damage, projectileSpeed, fireRate
    this.mWeapon = new Weapon(projSet, lgtSet, damage, projSpeed, (baseFireRate * (1/fireRateMod)), audioCue, bulletType, this.mHomingRate);
    this.mWeapon.setBaseProjectile(projectile);
    
    this.mMaxHP = maxHealth;          // How much damage the turret can take before being destroyed
    if(this.mMaxHP < 1) { this.mMaxHP = 1; }
    this.mCurrentHP = this.mMaxHP;    // The turret starts out with the maximum strength value
};

Turret.prototype.projectileHit = function (ship, projectile, explosionSet) {
    
    // Process the damage to the turret
    this.mCurrentHP -= projectile.getDamage();

    // Get the current position
    var curPos = this.getXform().getPosition();
    
    // Was the turret destroyed?
    if(this.mCurrentHP <= 0) {
        
        // Generate a large explosion
        explosionSet.newExplosion(curPos[0], curPos[1], ExplosionSet.eExplosionType.eLarge);

        // Destroy the turret and increment the player's score
        this.setExpired();
        ship.incScore(this.mPointValue);          
    }
    
    // Otherwise this was just a hit
    else {
        explosionSet.newExplosion(curPos[0], curPos[1], ExplosionSet.eExplosionType.eSmall);
    }
};

Turret.prototype.shipHit = function (ship, explosionSet) {
    
    // Process the damage to the turret
    this.mCurrentHP -= 2;

    // Get the current position
    var curPos = this.getXform().getPosition();
    
    // Was the turret destroyed?
    if(this.mCurrentHP <= 0) {
        
        // Generate a large explosion
        explosionSet.newExplosion(curPos[0], curPos[1], ExplosionSet.eExplosionType.eLarge);

        // Destroy the turret and increment the player's score
        this.setExpired();
        ship.incScore(this.mPointValue);          
    }
    
    // Otherwise this was just a hit
    else {
        explosionSet.newExplosion(curPos[0], curPos[1], ExplosionSet.eExplosionType.eSmall);
    }
};

Turret.prototype.getTarget = function () { return this.mTarget; };
Turret.prototype.setTarget = function (target) { this.mTarget = target; };

Turret.prototype.setExpired = function() {
    this.mExpired = true;
};
Turret.prototype.hasExpired = function() {
    return this.mExpired;
};

// for cleanup in the turretset when the turret expires, its light must also
// be removed
Turret.prototype.getLight = function () { return this.mLight; };

Turret.prototype._getTargetVector = function () {
    var targetVector = vec2.fromValues(0, 0);
    vec2.sub(targetVector, this.getTarget().getXform().getPosition(), this.getXform().getPosition());
    return vec2.normalize(targetVector, targetVector);
};

Turret.prototype.update = function (aCamera) {
    
//    GameObject.update.call(this);
    switch(this.mState) {
        case Turret.eState.ePatrol:
            this.servicePatrol();
            break;
        case Turret.eState.eAim:
            this.serviceAim();
            break;
        case Turret.eState.eLockedOn:
            this.serviceLockedOn();
            break;
    }
    
    // Update the weapon (used for temp effects)
    this.mWeapon.update();

    // Expire any turrets that are out of scope
    if (this.getXform().getXPos() < aCamera.getWCCenter()[0] - aCamera.getWCWidth() / 2 - 1) {
       this.setExpired();
   }
};

Turret.prototype.servicePatrol = function () {
    var patrolAngle = Math.acos(vec2.dot(this.getCurrentFrontDir(), this.kInitialDirection));   // angle between current direction and initial direction
    this.mTargetAngle = Math.acos(vec2.dot(this._getTargetVector(), this.getCurrentFrontDir())); // angle between target and current direction 
        // ensure all vectors being worked with are normalized
    if (Math.abs(this.mTargetAngle) <= Math.abs(this.kDetectionAngle)) { // check if target is within detection angle of turret
        this.mState = Turret.eState.eAim;
    } else {
        this.mTurret.setColor([0, 1, 0, 1.0 * this.kStateTinting]);
        if (patrolAngle > this.kMaxPatrolAngle)
            this.mPatrolDirection *= -1; // flip the patrol direction
        vec2.rotate(this.getCurrentFrontDir(), this.getCurrentFrontDir(), this.kPatrolSpeed * this.mPatrolDirection);
        this._updateLight();
        this.getXform().incRotationByRad(this.kPatrolSpeed * this.mPatrolDirection);
    }
};

Turret.prototype.serviceAim = function () {
    this.mTargetAngle = Math.acos(vec2.dot(this._getTargetVector(), this.getCurrentFrontDir())); // angle between target and current direction 
    if (this.mTargetAngle < this.kMaxLockOnAngle) {  // turret is pointing at target and can lock on
        this.mState = Turret.eState.eLockedOn;
        this.mTick = this.kAttackPeriod * 60 * (3/4);    // fire soon after locking on
    } else {
        this.mTurret.setColor([1, 1, 0, 2.0 * this.kStateTinting]);
        this.rotateObjPointTo(this.getTarget().getXform().getPosition(), this.kAimSpeed); // rotate toward target until target lock is established
        this._updateLight();
    }
};

Turret.prototype.serviceLockedOn = function () {
    this.mTurret.setColor([1, 0, 0, 1.0 * this.kStateTinting]);
    this.rotateObjPointTo(this.getTarget().getXform().getPosition(), this.kLockOnSpeed);
    this._updateLight();
    this.mTick++;
    var pos = this.getXform().getPosition();
    this.mWeapon.fire(pos[0], pos[1], this.getCurrentFrontDir(), this.mTarget);
};

Turret.prototype._updateLight = function () {
    var lightDir = vec3.fromValues(this.getCurrentFrontDir()[0], this.getCurrentFrontDir()[1], 0)
    this.mLight.setDirection(lightDir);
};