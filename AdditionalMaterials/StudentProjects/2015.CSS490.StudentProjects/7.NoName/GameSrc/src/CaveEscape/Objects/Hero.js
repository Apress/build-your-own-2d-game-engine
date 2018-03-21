/* File: Hero.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update funciton of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Hero(spriteTexture, normalMap, atX, atY, lgtSet, projSet, expSet, camera, audioCue) {
    
    this.mCamera = camera;
    
    this.kDelta = 0.15;
    this.kWidth = 2;
    this.kHeight = 8 / 3;
    this.kBaseSpeed = 0.04;
    this.kLightMaximumIntensity = 2;
    this.lgtSet = lgtSet;
    
    this.STATE_ALIVE = 0;
    this.STATE_DEAD = 1;
    this.STATE_EXPLODING = 2;  // set this state when the ship has exploded but before the game is over
    
    this.mState = 0;
    this.mCyclesElapsed = 0;
    this.mFireRate = 25;
    
    this.mScore = 0;
    
    this.mShields = 20;
    this.mShieldsMax = 20;
    
    this.mHullIntegrity = 20;
    this.mHullIntegrityMax = 20;

    this.mProjectileSet = projSet;  // reference to a set that the game also has a copy of
    this.mExplosionSet = expSet;

    if (normalMap !== null) {
        this.mShip = new IllumRenderable(spriteTexture, normalMap);
    } else {
        this.mShip = new LightRenderable(spriteTexture);
    }

    this.mShip.setColor([1, 1, 1, 0]);
    this.mShip.getXform().setPosition(atX, atY);
    this.mShip.getXform().setZPos(1);
    this.mShip.getXform().setSize(this.kWidth, this.kHeight);
    this.mShip.setSpriteSequence(128, 0, 256, 109, 1, 0);
    this.mShip.getXform().setSize(4, 2);
    this.mShip.addLight(lgtSet.getLightAt(2));

    this._createFrontLight();

    var transform = new Transform();
    transform.setPosition(this.mShip.getXform().getXPos(), this.mShip.getXform().getYPos() - this.kHeight / 2);
    GameObject.call(this, this.mShip);

    this.setCurrentFrontDir(vec2.fromValues(1, 0));    
    this.setSpeed(this.kBaseSpeed);
    
    this.mWeapon = new Weapon(projSet, lgtSet, 1, 0.4, 25, audioCue);  // Create the hero's weapon and set base damage, projectileSpeed, fireRate
}
gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.prototype.getStatusText2 = function() {
    return this.mWeapon.getStatusText();
};

Hero.prototype.getScore = function () { return this.mScore; };
Hero.prototype.incScore = function (delta) { this.mScore += delta; };

Hero.prototype.getShields = function () { return this.mShields; };
Hero.prototype.incShields = function (delta) { 
    this.mShields += delta; 
    if(this.mShields < 0) { this.mShields = 0; }
    else if(this.mShields > this.mShieldsMax) { this.mShields = this.mShieldsMax; }
};
Hero.prototype.boostShields = function (percent) { 
    this.mShields += (this.mShieldsMax * percent);
    if(this.mShields < 0) { this.mShields = 0; }
    else if(this.mShields > this.mShieldsMax) { this.mShields = this.mShieldsMax; }
};

Hero.prototype.getHullIntegrity = function () { return this.mHullIntegrity; };
Hero.prototype.incHullIntegrity = function (delta) { 
    this.mHullIntegrity += delta; 
    if(this.mHullIntegrity < 0) { this.mHullIntegrity = 0; }
    else if(this.mHullIntegrity > this.mHullIntegrityMax) { this.mHullIntegrity = this.mHullIntegrityMax; }
};
Hero.prototype.boostHullIntegrity = function (percent) { 
    this.mHullIntegrity += (this.mHullIntegrityMax * percent);
    if(this.mHullIntegrity < 0) { this.mHullIntegrity = 0; }
    else if(this.mHullIntegrity > this.mHullIntegrityMax) { this.mHullIntegrity = this.mHullIntegrityMax; }
};

Hero.prototype.setState = function(state) {
    
    switch(state) {
        
        case 1:  
            if(this.mState === 2) { this.mState = state; }  // can only set the ship to dead if the current state is exploding
            break;
        
        case 2:
            if(this.mState === 0) { this.mState = state; }  // can only set the ship to exploding if the current state is normal
            break;
        
        default:
            this.mState = state;
            break;
    }
};

Hero.prototype.getState = function() {
    return this.mState;
};

Hero.prototype.update = function (aCamera) {

    this.mCyclesElapsed++;
    
    // This code allows the ship to explode before we end the game
    if(this.mState === 2) {
        
        if(this.mCyclesElapsed > 60) {
            this.setState(1);  // end the game after the explosion is finished
        }
        
        // Don't allow any other updates if the ship is in the process of being destroyed
        return;
    }
    
    GameObject.prototype.update.call(this);
    
    if (this.mHullIntegrity <= 0) {
        this.mHullIntegrity = 0;
        this.destroyed();
    }
    
    if (this.mShields < 0) {
        this.mShields = 0;
    }
    // control by WASD
    var xform = this.getXform();

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
        xform.incYPosBy(this.kDelta);
    }
    else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
        xform.incYPosBy(-this.kDelta);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        xform.incXPosBy(-this.kDelta);
    }
    else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        xform.incXPosBy(this.kDelta);
    }

    // Allow the user to fire projectiles
    var pos = this.getXform().getPosition();
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        this.mWeapon.fire(pos[0], pos[1], this.getCurrentFrontDir());
    }
    else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)) {
        this.mWeapon.fire(pos[0], pos[1], [0, 1]);
    }
    else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
        this.mWeapon.fire(pos[0], pos[1], [0, -1]);
    }

    this.mWeapon.update();
    
    this.mFrontLight.setXPos(this.mShip.getXform().getXPos());
    this.mFrontLight.setYPos(this.mShip.getXform().getYPos());
    this.updateLightIntensity(); // keep light intensity at propery level based on energy
    
    this.mShip.updateAnimation();
    this.mIsMoving = false;
    this.mCanJump = false;
};

Hero.prototype.getWeapon = function () { return this.mWeapon; };

Hero.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
};

Hero.prototype.projectileHit = function (projectile) {

    // Generate an explosion
    this.processDamage(projectile.getDamage());

    // Shake the camera when the hero is hit
    this.mCamera.shake(0.25, 0.25, 5, 10);    
};

Hero.prototype.processDamage = function (damage) {
  
    // Process the damage
    if(this.mShields > 0) {
        this.mShields -= damage;
        this.updateLightIntensity();
    }
    else {
        this.mHullIntegrity -= damage;
    }
    
    // Was the hero destroyed?
    if(this.mHullIntegrity <= 0) {
        this.destroyed();
    }
    else {
        var curPos = this.getXform().getPosition();
        this.mExplosionSet.newExplosion(curPos[0], curPos[1], ExplosionSet.eExplosionType.eMedium);
    }
};

Hero.prototype.destroyed = function () {
    
    if(this.getState() === 2) { return; }
    
    this.setState(2);  // set the state to "exploding"
    this.mCyclesElapsed = 0;

    var curPos = this.getXform().getPosition();
    this.mExplosionSet.newExplosion(curPos[0], curPos[1], ExplosionSet.eExplosionType.eVeryLarge);
    
    // Shake the camera when the hero is destroyed
    this.mCamera.shake(1, 1, 5, 60);    
};

Hero.prototype.updateLightIntensity = function () {
    var light = this.getRenderable().getLightAt(0);
    light.setIntensity(this.mShields / this.mShieldsMax * this.kLightMaximumIntensity);
    this.mFrontLight.setIntensity(this.mShields / this.mShieldsMax * this.kLightMaximumIntensity);
};

Hero.prototype._createFrontLight = function () {
    this.mFrontLight = new Light();
    this.mFrontLight.setLightType(2);                // spotlight
    this.mFrontLight.setColor([1, 1, 1, 1]);         // default white light
    this.mFrontLight.setXPos(this.mShip.getXform().getXPos());
    this.mFrontLight.setYPos(this.mShip.getXform().getYPos());
    this.mFrontLight.setZPos(0.2);                   // slightly above the game world
    this.mFrontLight.setNear(0);
    this.mFrontLight.setFar(30);
    this.mFrontLight.setDirection([1, 0, 0]);
    this.mFrontLight.setIntensity(this.kLightMaximumIntensity);
    this.mFrontLight.setDropOff(1);
    this.mFrontLight.setOuter(0.5);
    this.mFrontLight.setInner(this.mFrontLight.getOuter());       // sharp-edged spotlight
    this.mFrontLight.setLightCastShadowTo(false);
    
    this.lgtSet.addToSet(this.mFrontLight);
    gEngine.LayerManager.addLightToAllLayers(this.mFrontLight);
};