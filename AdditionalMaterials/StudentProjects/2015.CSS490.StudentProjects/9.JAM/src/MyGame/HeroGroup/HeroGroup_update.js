HeroGroup.prototype.update = function(enemySet, enemySet2, enemySet3, particleSet, func, aCamera, normalShot, upgradeSet) {
    this._updatePosition(aCamera);
    this._updateProjectile(enemySet, enemySet2, enemySet3, particleSet, func, aCamera, upgradeSet);
    switch (this.mCurrentState) {
        case HeroGroup.eHeroGroupState.eNormal:
            this._serviceNormal();
            this._serviceShot();
            break;
        case HeroGroup.eHeroGroupState.eInvincible:
            this._serviceInvulnerable();
            // cannot fire while hit
            break;
        case HeroGroup.eHeroGroupState.eBarrier:            
            this._serviceWithBarrier();
            this._serviceShot();
            break;
    }
    switch (this.mShotType) {
        case HeroGroup.eHeroShotType.eNormal:
            break;
        case HeroGroup.eHeroShotType.eBigShot:
        case HeroGroup.eHeroShotType.eShotGun:
            this._serviceUpgrade();
            break;
    }
};

HeroGroup.prototype._serviceUpgrade = function () {
    this.mWeaponTick++;
    if (this.mWeaponTick === 300) {
        this.mWeaponTick = 0;
        this.mShotType = HeroGroup.eHeroShotType.eNormal;
    }
};


// allows hero to fire projectiles
HeroGroup.prototype._serviceNormal = function () {
    // one projectile at a time
    this.mBarrier.setLightTo(false);
};

HeroGroup.prototype._serviceShot = function () {
    if (this.mProjectiles.size() < 1 && gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        if (this.mShotType === HeroGroup.eHeroShotType.eNormal)
            this.mProjectiles.generateChanceAt(this.getXform().getPosition());
        else if (this.mShotType === HeroGroup.eHeroShotType.eShotGun) {
            this.mProjectiles.newShootGunAt(this.getXform().getPosition());
        }
        else if (this.mShotType === HeroGroup.eHeroShotType.eBigShot) {
            this.mProjectiles.newBigShotAt(this.getXform().getPosition());
        }
    }
};


// updates projectile with enemy
HeroGroup.prototype._updateProjectile = function (enemySet, enemySet2, enemySet3, particleSet, func, aCamera, upgradeSet) {
    var num = this.mProjectiles.update(enemySet, enemySet2, enemySet3, particleSet, func, aCamera, upgradeSet);
    this.mNumDestroy += num;
};

// sets hero to invulnerable state
// hero cannot fire
HeroGroup.prototype._serviceInvulnerable = function () {
    this.mCurrentTick++;
    //turn light on
    //gEngine.AudioClips.playACue(music);
    this.mBarrier.setLightTo(true);
    var c = this.getColor();
    if (this.mCurrentTick < 15) c[3] += 0.1;
    if (this.mCurrentTick < 30 && this.mCurrentTick >= 15) c[3] -= 0.1;
    if (this.mCurrentTick < 45 && this.mCurrentTick >= 30) c[3] += 0.1;
    if (this.mCurrentTick > 60) {
        this.mCurrentState = HeroGroup.eHeroGroupState.eNormal;
        this.getColor()[3] = 0;
    }
};

HeroGroup.prototype._serviceWithBarrier = function (music) {
    this.mBarrierTick++;
    this.getColor()[3] = 0;
    this.mBarrier.setLightTo(true);
    this.mBarrier.setColor([0.1, 0.8, 0.1, 1]);

    var i = this.mBarrier.getIntensity();
    
    if (this.mBarrierTick < 510 && this.mBarrierTick >= 480){
        i -= 0.16;
        this.mBarrier.setIntensity(i);
    }
    if (this.mBarrierTick < 540 && this.mBarrierTick >= 510){
        i += 0.16;
        this.mBarrier.setIntensity(i);
    }
    if (this.mBarrierTick < 570 && this.mBarrierTick >= 540){
        i -= 0.16;
        this.mBarrier.setIntensity(i);
    }
    if (this.mBarrierTick < 600 && this.mBarrierTick >= 570){
        i += 0.16;
        this.mBarrier.setIntensity(i);
    }
    
    if (this.mBarrierTick >= 600) {
        this.mBarrierTick = 0;
        this.mCurrentState = HeroGroup.eHeroGroupState.eNormal;
        this.mBarrier.setColor([0.5, 0.5, 0.5, 1]);
    }
};

// update hero path
HeroGroup.prototype._updatePosition = function (aCamera) {
    this._moveByKeys();
    // Adjust for camera movement
    this.shiftX(aCamera.getSpeed());
    // Manual movement
    this.mHeroGroupState.update();
    this.getXform().setXPos(this.getX());
    this.getXform().setYPos(this.getY());
    this.mHealthBar.update(this);
};