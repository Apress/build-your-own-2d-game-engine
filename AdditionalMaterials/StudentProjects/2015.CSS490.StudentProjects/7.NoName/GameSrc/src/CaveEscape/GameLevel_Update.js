/*
 * File: GameLevel_Update.js 
 * This is the update logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, Hero, Camera, SceneFileParser, FontRenderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
GameLevel.prototype.update = function () {
    
    // Check to see if the game is over
    this._checkEndStates();
    
    // Base updates
    this.mCamera.update();  // to ensure proper interpolated movement effects
    this.mMiniCamera.update();
    
    this._findNearestPowerup();
    if (this.mFocusPowerUp !== null && this.mFocusPowerUp !== undefined) {
        this.mMiniCamera.panTo(this.mFocusPowerUp.getXform().getXPos(), this.mFocusPowerUp.getXform().getYPos());
    } else {
        this.mMiniCamera.panTo(-50, -50);
    }
    gEngine.LayerManager.updateAllLayers(this.mCamera);

    // Get the current camera position
    var curPos = this.mCamera.getWCCenter();
    
    // Handle processing
    this._processInput();
    this._processMovement(curPos);
    this._updateDifficulty();  // Difficulty is based on the player's progress

    // Handle updates
    this.mTerrainSetBottom.update(this.mCamera);
    this.mTerrainSetTop.update(this.mCamera);
    this.mTurretSet.update(this.mState, this.mDistance, this.mEndDistance);    
    this.mPowerUpSet.update(this.mCamera, this.mTerrainSetTop, this.mTerrainSetBottom);
    this.mEnemyProjectileSet.update();
    this.mFriendlyProjectileSet.update();
    this.mExplosionSet.update();
    this.mAllParticles.update();
    if(this.mGameMessage.isActive() === true) { this.mGameMessage.update(this.mCamera); }

    // Update the status text
    this._updateStatus(curPos);

    //
    // COLLISION DETECTION
    //

    // Check to see if the player has gotten close enough to any powerups to pick them up
    this.mPowerUpSet.checkShipCollision(this.mIllumHero);

    // Check to see if the ship has collided with the terrain
    this.mTerrainSetTop.checkShipCollision(this.mIllumHero);
    this.mTerrainSetBottom.checkShipCollision(this.mIllumHero);

    // Check to see if any projectiles have hit the ship
    this.mEnemyProjectileSet.checkShipCollision(this.mIllumHero);
    
    // Check to see if the ship has ran into any turrets
    this.mTurretSet.checkShipCollision(this.mIllumHero);
    
    // Check to see if any of the powerups have been destroyed
    this.mFriendlyProjectileSet.checkPowerUpCollision(this.mPowerUpSet);

    // Check to see if any turrets have been destroyed
    this.mFriendlyProjectileSet.checkTurretCollision(this.mIllumHero, this.mTurretSet);

    // Check to see if any projectiles have collided with the terrain
    this.mFriendlyProjectileSet.checkTerrainCollision(this.mTerrainSetTop);
    this.mFriendlyProjectileSet.checkTerrainCollision(this.mTerrainSetBottom);
    this.mEnemyProjectileSet.checkTerrainCollision(this.mTerrainSetTop);
    this.mEnemyProjectileSet.checkTerrainCollision(this.mTerrainSetBottom);
};

GameLevel.prototype._updateStatus = function(curPos) {
    
    this.mMsg.getXform().setPosition(curPos[0] - this.mCamera.getWCWidth() / 2 + 1, curPos[1] + this.mCamera.getWCHeight() / 2 - this.mMsg.getXform().getHeight());
    //this.mMsg.setText("SpawnRate:" + this.mTurretSet.getSpawnRate() + " Hull:" + this.mIllumHero.getHullIntegrity() + " Energy:" + this.mIllumHero.getShields() + " Distance:" + this.mDistance.toFixed() + " Score:" + this.mIllumHero.getScore().toFixed());    
    
    this.mMsg.setText("Score:" + this.mIllumHero.getScore().toFixed() + " Distance:" + this.mDistance.toFixed());    

    
    if (this.mFocusPowerUp !== null && this.mFocusPowerUp !== undefined) {
        this.hideMinimap = 0;
        var cameraWidth = this.mMiniCamera.getWCWidth();
        var cameraHeight = this.mMiniCamera.getWCHeight();
        this.mMsg2.getXform().setPosition(this.mFocusPowerUp.getXform().getXPos() - this.mMsg2.getXform().getWidth() / 2, 
                                          this.mFocusPowerUp.getXform().getYPos() - cameraHeight / 2 + this.mMsg2.getXform().getHeight());
        this.mMsg2.setText(this.mFocusPowerUp.getPowerUpName());
    } else {
        this.mMsg2.setText("");
        this.hideMinimap = 1;
    }
    
};

GameLevel.prototype._processMovement = function(curPos) {

    // Update the camera position (moves automatically from left to right at a set speed)
    this.mCamera.setWCCenterNow(curPos[0] + this.mCameraSpeed, 8);
    this.mMiniCamera.setWCCenterNow(curPos[0] + this.mCameraSpeed, 8);
    
    // Update the distance counter
    this.mDistance += this.mCameraSpeed / 10;

    // Get the hero's transform
    var xf = this.mIllumHero.getXform();

    // Generate new particles fdor the hero's smoke trail 
    var p = this._createParticle(xf.getXPos() - 1.8, xf.getYPos());
    this.mAllParticles.addToSet(p);    
    
    this.mHealthBar.getXform().setPosition(this.mIllumHero.getXform().getXPos(), this.mIllumHero.getXform().getYPos() + this.mIllumHero.getXform().getHeight());
    this.mHealthBar.getXform().setWidth(this.mIllumHero.getHullIntegrity() / 6);
    
    this.mEnergyBar.getXform().setPosition(this.mIllumHero.getXform().getXPos(), this.mIllumHero.getXform().getYPos() + this.mIllumHero.getXform().getHeight() - this.mEnergyBar.getXform().getHeight());
    this.mEnergyBar.getXform().setWidth(this.mIllumHero.getShields() / 6);
    // Update the position of the hero's light
    var pos = vec2.clone(xf.getPosition());
    globalLightSet.getLightAt(this.mLgtIndex).set2DPosition(pos);
    
    // Keep the hero within the bounds of the camera
    this.mCamera.clampAtBoundary(xf, 0.98);
};

GameLevel.prototype._processInput = function() {
    
    // Show/Hide the mini-map
    /*if (gEngine.Input.isKeyClicked(gEngine.Input.keys.M)) {
        if (this.hideMinimap === 0) {
            this.hideMinimap = 1;
        } else {
            this.hideMinimap = 0;
        }
    }*/
};

GameLevel.prototype._checkEndStates = function() {
    
    // Is the player dead?
    if (this.mIllumHero.getState() === 1) {
        this.mRestart = true;
        this.mNextLevel = new LostScene();
        gEngine.DefaultResources.setDistance(this.mDistance.toFixed());
        gEngine.DefaultResources.setScore(this.mIllumHero.getScore().toFixed());
        gEngine.GameLoop.stop();
        return;
    }
    
    // Did the player win?
    if(this.mDistance >= this.mEndDistance) {
        this.mRestart = true;
        this.mNextLevel = new WonScene();
        gEngine.DefaultResources.setDistance(this.mDistance.toFixed());
        gEngine.DefaultResources.setScore(this.mIllumHero.getScore().toFixed());
        gEngine.GameLoop.stop();
        return;
    }    
};

GameLevel.prototype._updateDifficulty = function() {
    
    var progress = this.mDistance / this.mEndDistance;
    
    if(progress < 0.25) { 
        this._setState(GameLevel.eState.eStage1);
    }
    else if(progress < 0.5) { 
        this._setState(GameLevel.eState.eStage2);
    }
    else if(progress < 0.9) { 
        this._setState(GameLevel.eState.eStage3);
    }
    else { 
        this._setState(GameLevel.eState.eEndStage);
    }
};

GameLevel.prototype._findNearestPowerup = function () {
    var i;
    var closestPowerup = this.mPowerUpSet.getObjectAt(0);
    for (i = 0; i < this.mPowerUpSet.size(); i++) {
        var powerup = this.mPowerUpSet.getObjectAt(i);
        var xform = powerup.getXform();
        
        var difference = Math.abs(this.mIllumHero.getXform().getXPos() - xform.getXPos());
        var difference2 = Math.abs(this.mIllumHero.getXform().getXPos() - closestPowerup.getXform().getXPos());
        if (difference < difference2) {
            closestPowerup = powerup;
        }
    }
    
    this.mFocusPowerUp = closestPowerup;
};

GameLevel.prototype._createParticle = function(atX, atY) {
    var life = 10 + Math.random() * 30;
    var p = new ParticleGameObject(this.kParticleTexture, atX, atY, life, 0.1);
    p.getRenderable().setColor([0.2, 0.2, 0.2, 1]);
    
    // size of the particle
    var r = 0.75 + Math.random() * 0.5;
    p.getXform().setSize(r, r);
    
    // final color
    var fr = 3.5 + Math.random();
    var fg = 3.4 + Math.random();
    var fb = 3.3 + Math.random();
    p.setFinalColor([fr, fg, fb, 0.6]);
    
    // velocity on the particle
    var fx = 10 * Math.random();
    var fy = 10 - 20 * Math.random();
    p.getPhysicsComponent().setVelocity([fx, fy]);
    
    // size delta
    p.setSizeDelta(0.98);
    
    return p;
};