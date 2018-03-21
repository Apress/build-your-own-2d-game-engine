/**
 * Created by MetaBlue on 11/29/15.
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

HeroGroup.eHeroGroupState = Object.freeze({
    eNormal: 0,
    eInvincible: 1,
    eBarrier: 5
});

HeroGroup.eHeroShotType = Object.freeze({
    eNormal: 0,
    eShotGun: 1,
    eBigShot: 2
});

function HeroGroup(heroTexture, healthBarTexture, atX, atY, lightOne, lightThree, normalShotSound, shotgunSound, bigshotSound) {
    this.mShip = new LightRenderable(heroTexture);
    this.mShip.getXform().setPosition(atX, atY);
    this.mShip.getXform().setSize(15, 15);
    GameObject.call(this, this.mShip);
    this.mShip.addLight(gLights.getLightAt(4));

    //Hero.call(this, heroTexture, atX, atY);
    this.kDelta = 0.6;
    this.kStartHealth = 5;
    this.mHealthBar = new HealthBar(healthBarTexture);

    this.mHit = 0;
    this.mNumDestroy = 0;

    // Projectiles that the hero can shoot
    this.mProjectiles = new ProjectileSet(lightOne, normalShotSound, shotgunSound, bigshotSound);
    this.mShotType = HeroGroup.eHeroShotType.eNormal;

    // toggle barrier effect
    this.mBarrier = lightThree;

    // interpolating hero movement
    this.mCurrentState = HeroGroup.eHeroGroupState.eNormal;
    this.mCurrentTick = 0;
    this.mWeaponTick = 0;
    this.mBarrierTick = 0;

    this.mHeroGroupState = new HeroGroupState(this.getXform().getXPos(), this.getXform().getYPos());
    this.setHealth(this.kStartHealth);
}
gEngine.Core.inheritPrototype(HeroGroup, GameObject);

HeroGroup.prototype.draw = function(aCamera) {
    this.mProjectiles.draw(aCamera);
    GameObject.prototype.draw.call(this, aCamera);
    this.mHealthBar.draw(aCamera);
};

// hero hit once by enemy/projectile
HeroGroup.prototype.hitOnce = function () {
    if(this.mCurrentState !== HeroGroup.eHeroGroupState.eBarrier){
        if (this.mCurrentState !== HeroGroup.eHeroGroupState.eInvincible) {
            this.mCurrentState = HeroGroup.eHeroGroupState.eInvincible;
            this.setHealth(this.getHealth() - 1);
            this.mCurrentTick = 0;
        }
    }
};

HeroGroup.prototype.getShotType = function(){
    return this.mShotType;
};

HeroGroup.prototype.setPowerUp = function(powerUp) {
    //alert(powerUp);
    if(powerUp === HeroGroup.eHeroGroupState.eBarrier){
        this.mBarrierTick = 0;
        this.mCurrentState = HeroGroup.eHeroGroupState.eBarrier;
    }else{
        this.mWeaponTick = 0;
        this.mShotType = powerUp;
    }
};

HeroGroup.prototype.getHealthRatio = function () { return this.getHealth()/this.kStartHealth; };

HeroGroup.prototype.getX = function () { return this.mHeroGroupState.getX(); };
HeroGroup.prototype.setX = function (xPos) { this.mHeroGroupState.setX(xPos); };
HeroGroup.prototype.getY = function () { return this.mHeroGroupState.getY(); };
HeroGroup.prototype.setY = function (yPos) { this.mHeroGroupState.setY(yPos); };
HeroGroup.prototype.shiftX = function ( shift ) { this.mHeroGroupState.shiftX( shift ); };
HeroGroup.prototype.shiftY = function ( shift ) { this.mHeroGroupState.shiftY( shift ); };

HeroGroup.prototype._moveByKeys = function() {
    if (gEngine.Input.isKeyPressed( gEngine.Input.keys.W ))
        this.shiftY( this.kDelta );
    if (gEngine.Input.isKeyPressed( gEngine.Input.keys.A ))
        this.shiftX( -this.kDelta );
    if (gEngine.Input.isKeyPressed( gEngine.Input.keys.S ))
        this.shiftY( -this.kDelta );
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        this.shiftX( this.kDelta );
    }
};