/*
 * File:        MainGame_Update.js
 * Programmers: Kyla            March 13, 2019
 *
 */

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MainGame.prototype.update = function ()
{
    this.mElapsedTime++;
    this.updateAmbientLighting();
    
    this.mWaterfallSet.update();
    
    this.mHero.update();
    if (!this.mHero.getWithinBounds(this.mWorldBounds))
    {
        this.kDeathMessage = "You fell off the edge of the world";
        this.mDMX = -33;
        this.mGameState.setGameOver(true);
    }
    
    this.updatePirateLight();
    this.mPirateSet.update(this.mMiniMap, this.mHero.getPosition());
    this.mCharybdis.update();
    if (this.mCharybdis.checkIfCanSpawn(this.kCharybdisSpawnChance))
    {
        gEngine.AudioClips.playBackgroundAudio(this.kCharybdisMusic);
        console.log(this.mStormSet.size());
        this.mCharybdis.spawn(this.mHero);
    }
    else if (this.mCharybdis.mJustFinished)
    {
        gEngine.AudioClips.playBackgroundAudio(this.kBGMusic);
        this.mCharybdis.mJustFinished = false;
    }
         
    
    this.mGameState.update();
    
    var heroPos = this.mHero.getPosition();
    this.mCamera.setWCCenter(heroPos[0], heroPos[1]);
    this.mMiniMap.setWCCenter(heroPos[0], heroPos[1]);
    
    if(this.mTreasureSet.collectAt(heroPos[0], heroPos[1]))
    {
        this.mHero.addTreasure();
        gEngine.AudioClips.playACue(this.kTreasureSFX);
        this.mHero.regenHealth(this.kRegenRate);
        this.mHealthBar.setCurrentHP(this.mHero.getHealth());
        this.mHealthBar.update();
        this.mGameState.addTreasure();
        this.mTreasureUI.fillSlot();
        this.mPirateSet.incSpawnRateBy(-this.kSpawnRate / 2 / 6);
        console.log("Decrementing Spawn RAte: " + this.mPirateSet.mSpawnRate);
    }
    
    this.mTreasureSet.update();
    this.mCamera.update();
    this.mMiniMap.update();
    
    this.mStormSet.update(this.mMiniMap);
    
    // Spawn the storms
    if(this.mAutoSpawnTimer <= 0)
    {
        this.mAutoSpawnTimer = Math.random() * 60 + 120;
        this.mStormSet.createStorm(this.kStormTex);
    }
    
    this.checkRockCollisions();
    
    this.checkCannonballCollision();
    
    // Hero previously collided
    // check whether or not to shake camera
    if (this.mHero.mInvincible === true) 
    {
        var camShake = this.mCamera.getCameraShake();
        if (camShake !== null && !camShake.shakeDone())
            camShake.updateShakeState();
    }
    
    this.checkCharybdisCollision();
    this.checkAllStormShipCollisions();
    this.checkPirateCollisionsWithPlayer();
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.M))
    {
        if(gEngine.AudioClips.isBackgroundAudioPlaying())
        {
            gEngine.AudioClips.stopBackgroundAudio();
        } else {
            gEngine.AudioClips.playBackgroundAudio(this.kBGMusic);
        }
    }
    
    this.mSpaceBG.getXform().setPosition(this.mHero.getXform().getPosition()[0], this.mHero.getXform().getPosition()[1]);
};



MainGame.prototype.checkCharybdisCollision = function()
{
    var OnScreenShips = this.mPirateSet.getShipsOnCamera(this.mCamera);
    OnScreenShips.unshift(this.mHero);
    
   for (var i = 0; i < OnScreenShips.length; i++)
   {
       var ship = OnScreenShips[i];
       
    var maxDistance = this.mCharybdis.getXform().getHeight();
    var distance = vec2.distance(ship.getPosition(), this.mCharybdis.getPosition());
    
    var distanceRatio = (maxDistance - distance) / maxDistance;
    
    //console.log(distanceRatio);
    
    // kill player if too close
    if (distanceRatio > .75 && distanceRatio < 1)
    {
        ship.setHealth(0);
        result = false;
    }
   }
};

MainGame.prototype.checkAllStormShipCollisions = function()
{
    this.checkStormShipCollision(this.mHero);
    
    var OnScreenShips = this.mPirateSet.getShipsOnCamera(this.mCamera);
    for (var i = 0; i < OnScreenShips.length; i++)
    {
        var pShip = OnScreenShips[i];
        this.checkStormShipCollision(pShip);
    }
    
};

MainGame.prototype.checkStormShipCollision = function(ship)
{
    for (var i = 0; i < this.mStormSet.size(); i++)
    {
        var storm = this.mStormSet.getObjectAt(i);
        
        var maxDistance = storm.getXform().getHeight() * 2;
        var distance = vec2.distance(ship.getPosition(), storm.getXform().getPosition());
        var distanceRatio = (maxDistance - distance) / maxDistance; 
        
        if (distanceRatio > 0 && distanceRatio <= 1)
        {   
            var speedRatio = storm.getRotSpeed() / 10 + .25;
            var sizeRatio = storm.getSize() / 15 + .25;

            ship.moveTowards(storm.getXform().getPosition(), ship.getTurningDelta() * distanceRatio * speedRatio * sizeRatio);
            ship.incSpeedBy(ship.getSpeedDelta() + ship.getSpeedDelta() * distanceRatio * speedRatio * sizeRatio);
        }    
    }
};

MainGame.prototype.checkRockCollisions = function()
{
        // cycle through all rocks
    for (var i = 0; i < this.mRockSet.size(); i++) 
    {
        var rock = this.mRockSet.mSet[i];

        // Check Collision with all rocks in Rock set 
        var isHit = this.mHero.checkHit(rock);

        // if touching rock, then hit
        if (isHit)
        {
            // camera shake
            var displacement = 2;           // move camera by 2 units
            var frequency = 5;              // shake 5 times a second
            var duration = 30;              // half a second

            this.mCamera.setCameraShake(displacement, displacement, frequency, duration);

            this.mHealthBar.setCurrentHP(this.mHero.getHealth());
            this.mHealthBar.update();
        }

        var onScreenShips = this.mPirateSet.getShipsOnCamera(this.mCamera);
        
        for (var j = 0; j < onScreenShips.length; j++)
        {
            var pShip = onScreenShips[j];
            pShip.checkHit(rock);
        }
    }
};

MainGame.prototype.checkCannonballCollision = function()
{
    var onScreenShips = this.mPirateSet.getShipsOnCamera(this.mCamera);
    
    for (var i = 0; i < onScreenShips.length; i++)
    {
        var pShip = onScreenShips[i];
        // check cannonball collision
        if (pShip.isChasingPlayer())
        {
            var cannonballs = pShip.getCannonballSet();
            if (cannonballs.size() > 0)
            {
                var cannonball = cannonballs.getObjectAt(0);
                if (cannonball.getBBox().intersectsBound(this.mHero.getBBox()))
                {
                    this.mHero.hit(cannonball);
                    cannonball.kill();

                                    // camera shake
                    var displacement = 2;           // move camera by 2 units
                    var frequency = 5;              // shake 5 times a second
                    var duration = 30;              // half a second

                    this.mCamera.setCameraShake(displacement, displacement, frequency, duration);

                    this.mHealthBar.setCurrentHP(this.mHero.getHealth());
                    this.mHealthBar.update();
                }
            }
        }
    }
};

MainGame.prototype.checkPirateCollisionsWithPlayer = function()
{
    var onScreenShips = this.mPirateSet.getShipsOnCamera(this.mCamera);
    
    for (var i = 0; i < onScreenShips.length; i++)
    {    
        var pShip = onScreenShips[i];
        
        var c = new CollisionInfo();
        if (this.mHero.getRigidBody().collisionTest(pShip.getRigidBody(), c))
        {
            gEngine.Physics.resolveCollision(this.mHero.getRigidBody(), pShip.getRigidBody(), c);
            this.mHero.getRigidBody().setAngularVelocity(0);
            pShip.getRigidBody().setAngularVelocity(0);

        }
    }
};
