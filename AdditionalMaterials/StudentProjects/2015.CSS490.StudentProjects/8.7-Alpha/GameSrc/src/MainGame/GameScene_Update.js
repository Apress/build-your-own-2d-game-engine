/*
 * Team 7-Alpha
 * CSS 490C
 * 2D Game Engine Design
 * File: GameScene_Update.js 
 * 
 * This file contains the update functionality for the game 
 * 
 */

GameScene.prototype.updateInProgress = function () {
    // increment tick count 60 times/second
    this.mTick++;
    if (this.mCooldownTick > 0) {
        this.mCooldownTick--;
    }

    this.mCamera.update();
    this.mBg.update();
    this.mAsteroidList.update(this.mScanModeActivated);
    this.mRocketList.update(this.mScanModeActivated);
    this.mCamera.clampAtBoundary(this.mShip.getXform(), 0.95);
    this.mShip.update(this.mScanModeActivated);
    this.mShieldBar.update();
    this.mEnergyBar.update();
    this.mPowerUpStatus.update();
    gAllParticles.update();
    this.mOreScore = this.mShip.getOreCollected();

    // operate on each condition once per second
    if (this.mTick >= this.kTicksPerSecond) {
        this.mTick = 0;
        this.mTimeScore += 1;

        if (this.mScanModeActivated === true) {
            if (this.mShip.getCurrentEnergy() === 0) {
                this.mScanModeActivated = false;
            }
            this.mShip.drainEnergy(this.kEnergyLostPerSecondInScanMode);
            gEngine.AudioClips.playACue(this.kScanMode);
        } else {
            this.mShip.gainEnergy(this.kEnergyRegen);
        }
    }
    // total score is sum of ore and time scores
    this.mGameScore = this.mOreScore + this.mTimeScore;

    // Increase difficulty based on score
    if (this.mGameScore > 500 && this.mGameScore < 750)
        this.mDifficultyState = GameScene.eGameDifficultyStates.eGameLevel1;
    if (this.mGameScore > 750 && this.mGameScore < 1000)
        this.mDifficultyState = GameScene.eGameDifficultyStates.eGameLevel2;
    if (this.mGameScore > 1000 && this.mGameScore < 2500)
        this.mDifficultyState = GameScene.eGameDifficultyStates.eGameLevel3;

    this.mAsteroidList.setDifficulty(this.mDifficultyState);

    // Add rockets
    if (this.mScanModeActivated === false && this.mCooldownTick === 0) {
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Space)) {
            this.mRocketList.launchRocket(this.mShip.getXform().getXPos());
            this.mCooldownTick = this.kAttackCooldown;
        }
    }

    // Update status of ammo
    var ammo = null;
    if (this.mShip.getCurrentAmmo() === 0) {
        ammo = "infinite";
    } else {
        ammo = this.mShip.getCurrentAmmo();
    }
    this.mMsg.setText("Ammo: " + ammo);

    // Handle lighting affect of the ammo status when the ammo level
    // is below 2 shots left.  Green or red point lights.
    gGameLights.lightAtIndex(2).setColor(vec4.fromValues(1, 1, 1, 1));
    gGameLights.lightAtIndex(2).setZPos(0);

    if (ammo < 11 && ammo > 2) {
        gGameLights.lightAtIndex(2).setColor(vec4.fromValues(0, 1, 0, 1));
        gGameLights.lightAtIndex(2).setZPos(0);
        this.mLightTick = 0;
    }
    if (ammo === 2 || ammo === 1) {
        gGameLights.lightAtIndex(2).setColor(vec4.fromValues(1, 0, 0, 1));
        gGameLights.lightAtIndex(2).setZPos(-30 * Math.cos(this.mLightTick));
        this.mLightTick += 0.02;
    }

    // Set the text for the score
    this.mScoreMsg.setText("Score: " + this.mGameScore);

    if (gEngine.Input.isKeyReleased(gEngine.Input.keys.Q)) {
        gEngine.GameLoop.stop();
    }
    if (gEngine.Input.isKeyReleased(gEngine.Input.keys.L)) {
        gGameLights.toggleAllLights();
    }

    // This code handles the light effect with explosions
    if (gEngine.Input.isKeyReleased(gEngine.Input.keys.K)) {
        gGameLights.lightAtIndex(3).setZPos(20);
        this.mExplosion = new Interpolate(gGameLights.lightAtIndex(3).getPosition()[2], 120, 0.3);
        this.mExplosion.setFinalValue(-20);
    }

    if (this.mExplosion) {
        this.mExplosion.updateInterpolation();
        gGameLights.lightAtIndex(3).setZPos(this.mExplosion.getValue());
    }

    // toggle scan mode
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.E)) {
        this.mScanModeActivated = !this.mScanModeActivated;
    }

    // cycle through rocket list to check against each asteroid for collision
    // updates "hasCollided" on each object on collision
    this.mRocketList.checkAsteroidCollision(this.mAsteroidList);
    this.mShip.checkFieldObjectCollision(this.mAsteroidList);
    this.mHeadLight.setXPos(this.mShip.getXform().getXPos());

    if (this.mShip.getCurrentShields() === 0) {
        this.mGameState = GameScene.eGameSceneStates.eGameOverStage1;
        this.mCamera.shake(-2, -2, 20, 30);
        this.mTick = 0;
    }
};

GameScene.prototype.updateGameOverStage1 = function () {
    this.mTick++;
    
    this.mCamera.update();
    if (this.mTick > 120) {
        this.mTick = 0;
        this.mGameState = GameScene.eGameSceneStates.eGameOverStage2;
    }
};

GameScene.prototype.updateGameOverStage2 = function () {
    this.mTick++;
    
    this.mCamera.update();
    if (this.mTick > 120)
        gEngine.GameLoop.stop();
};