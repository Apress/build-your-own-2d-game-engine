/* File: 		Boss.js
 * Author:      	Michael Voght, Ryu Muthui
 * Last Date Modified: 	12/15/2015
 * Description:		Creates and initializes the Boss and its logic */
"use strict";

Boss.eBossState = Object.freeze( {
    eStrafeLeft:  0,
    eStrafeRight: 1
});

Boss.eBossStage = Object.freeze( {
    eStageOne: 0,
    eStageTwo: 1,
    eStageThree: 2
});

function Boss(spriteTexture, normalMap, enemySet, lightSet) {
    this.mBoss = new IllumRenderable(spriteTexture, normalMap);
    this.mBoss.setColor([1, 1, 1, 0]);
    this.mBoss.setElementPixelPositions(0, 512, 0, 256);
    this.mBoss.getXform().setPosition(0, 450);
    this.mBoss.getXform().setSize(500, 200);
    this.kLargeExplosionSFX = "assets/Audio/SFX/BigExplosion_SFX.wav";
    this.kEnemySpawn = "assets/Enemy/strip_saucer_blades.png";
    this.kTurretSprite = "assets/Enemy/turret.png";
    this.kSpawnCounterStageTwo = 150;
    this.kSpawnCounterStageThree = 75;
    this.kRateOfFireStageOne = 3;
    this.kRateOfFireStageTwo = 2;
    this.kRateOfFireStageThree = 1;
    this.kBulletTotalStageOne = 30;
    this.kBulletTotalStageTwo = 45;
    this.kBulletTotalStageThree = 60;
    this.kDelta = 2;
    
    this.mSpawnTicks = 0;
    this.mFireTicks = 0;
    this.mBullets = 0;
    this.mAllEnemies = enemySet;
    this.mExpired = false;
    this.mCurrentState = Boss.eBossState.eStrafeLeft;
    this.mCurrentStage = Boss.eBossStage.eStageOne;
    
    this.mLeftCannon = new ProjectileSet(this);
    this.mRightCannon = new ProjectileSet(this);

    GameObject.call(this, this.mBoss);
    this.setCurrentFrontDir(vec2.fromValues(0, -1));
    
    this.mAllEnemies.addToSet(this);
    this.mAllEnemies.addToSet(new Enemy_Turret(this.kTurretSprite, this.getXform().getPosition()));
    this.mAllEnemies.getObjectAt(1).setTurnRate(0.1);
    this.mAllEnemies.getObjectAt(1).setFireRate(10);
    this.mAllEnemies.getObjectAt(1).setFireMax(10);
    this.mAllEnemies.getObjectAt(1).setFirePauseDuration(180);
    
    // Health bar effects   
    this.mHealthBar = new Renderable();
    this.mHealthBar.setColor([1.0, 1.0, 0.0, 1.0]); // yellow
    this.mHealthBar.getXform().setSize(1000, 18);
    this.mHealthBar.getXform().setPosition(0, 583);
    
    this.mLeftSpotlight = lightSet.getLightAt(2);
    this.mRightSpotlight = lightSet.getLightAt(3);
    this.kLeftRotateBound = -45;
    this.kRightRotateBound = 45;
    this.mRotate = 0;
    this.mRotateLeft = false;
}
gEngine.Core.inheritPrototype(Boss, GameObject);

Boss.prototype.update = function(hero, aCamera, particles) {    
    for( var i = 2; i < this.mAllEnemies.size(); i++ ) {
        var obj = this.mAllEnemies.getObjectAt(i);
        if(obj.hasExpired())
            this.mAllEnemies.removeFromSet(obj);
    }
    this._positionLights();
    switch(this.mCurrentState) {
        case Boss.eBossState.eStrafeLeft:
            this._serviceStrafeLeft();
            break;
        case Boss.eBossState.eStrafeRight:
            this._serviceStrafeRight();
            break;
    }

    switch(this.mCurrentStage) {
        case Boss.eBossStage.eStageOne:
            this._serviceStageOne(hero, aCamera, particles);
            break;
        case Boss.eBossStage.eStageTwo:
            this.mHealthBar.setColor([1.0, 0.5, 0.0, 1.0]); // orange
            this._serviceStageTwo(hero, aCamera, particles);
            this.mAllEnemies.getObjectAt(1).setTurnRate(0.2);
            this.mAllEnemies.getObjectAt(1).setFireRate(50);
            this.mAllEnemies.getObjectAt(1).setFireMax(20);
            this.mAllEnemies.getObjectAt(1).setFirePauseDuration(120);
            break;
        case Boss.eBossStage.eStageThree:
            this.mHealthBar.setColor([1.0, 0.0, 0.0, 1.0]); // red
            this._serviceStageThree(hero, aCamera, particles);
            this.mAllEnemies.getObjectAt(1).setTurnRate(0.3);
            this.mAllEnemies.getObjectAt(1).setFireRate(50);
            this.mAllEnemies.getObjectAt(1).setFireMax(15);
            this.mAllEnemies.getObjectAt(1).setFirePauseDuration(60);
            break;
    }
    
    this.mAllEnemies.getObjectAt(1).getXform().setXPos(this.getXform().getXPos());
};

Boss.prototype.draw = function(aCamera) {
    if(!this.mExpired){
        GameObject.prototype.draw.call(this, aCamera);
    }
};

Boss.prototype.hitOnce = function(aCamera, particles) {
    if( this.mHealthBar.getXform().getWidth() > 0 ) {
        this.mHealthBar.getXform().incWidthBy(-5);
        this.mHealthBar.getXform().incXPosBy(-2.5);
    }
    
    if( this.mHealthBar.getXform().getWidth() <= 0 ){
        var originalPos = vec2.clone(this.getXform().getPosition());
        gEngine.AudioClips.playACue(this.kLargeExplosionSFX);
        particles.addEmitterAt(originalPos, 1000, createParticleBoss, this);
        aCamera.shake(40, 40, 40, 60);
        score += 1000;
        this.getXform().setPosition(-1000, -1000);
        this.mAllEnemies.getObjectAt(1).getXform().setYPos(-1000);
        var i;
        for (i = 2; i < this.mAllEnemies.size(); i++) {
            this.mAllEnemies.getObjectAt(i).setExpired();
        }
	this.mLeftSpotlight.setLightTo(false);
	this.mRightSpotlight.setLightTo(false);
        this.mExpired = true;
    }
};

Boss.prototype._spawnEnemy = function() {
    var startPos = this.mBoss.getXform().getPosition();
    var m = new Enemy_SaucerBlades(this.kEnemySpawn, 
        vec2.fromValues(startPos[0], startPos[1] - 100));
    this.mAllEnemies.addToSet(m);
};

Boss.prototype._serviceStrafeLeft = function() {
    if(this.getXform().getXPos() > -300) {
        this.getXform().incXPosBy(-this.kDelta);
    } else {
        this.mCurrentState = Boss.eBossState.eStrafeRight;
    }
};

Boss.prototype._serviceStrafeRight = function() {
    if(this.getXform().getXPos() < 300) {
        this.getXform().incXPosBy(this.kDelta);
    } else {
        this.mCurrentState = Boss.eBossState.eStrafeLeft;
    }
};

Boss.prototype._serviceStageOne = function(hero, aCamera, particles) {
    if(this.mHealthBar.getXform().getWidth() > 1000 * 0.70) {
        this.mFireTicks++;
        if((this.mFireTicks > this.kRateOfFireStageOne) && (this.mBullets < this.kBulletTotalStageOne)) {
            this.mLeftCannon.newAt(vec2.subtract(vec2.fromValues(0, 0), this.getXform().getPosition(), vec2.fromValues(140, 65)));
            this.mRightCannon.newAt(vec2.add(vec2.fromValues(0, 0), this.getXform().getPosition(), vec2.fromValues(140, -65)));
            this.mFireTicks = 0;
        }

        this.mBullets += 2;
        if(this.mBullets > 90){
            this.mBullets = 0;
        }
        if(this.mLeftCannon.getLength() > 0){
            this.mLeftCannon.update(hero, aCamera, particles);
        }
        if(this.mRightCannon.getLength() > 0){
            this.mRightCannon.update(hero, aCamera, particles);
        }
    } else {
        this.mCurrentStage = Boss.eBossStage.eStageTwo;
    }
};

Boss.prototype._serviceStageTwo = function(hero, aCamera, particles) {
    if(this.mHealthBar.getXform().getWidth() > 1000 * 0.30) {
        this.mFireTicks++;
        if((this.mFireTicks > this.kRateOfFireStageTwo) && (this.mBullets < this.kBulletTotalStageTwo)) {
            this.mLeftCannon.newAt(vec2.subtract(vec2.fromValues(0, 0), this.getXform().getPosition(), vec2.fromValues(140, 65)));
            this.mRightCannon.newAt(vec2.add(vec2.fromValues(0, 0), this.getXform().getPosition(), vec2.fromValues(140, -65)));
            this.mFireTicks = 0;
        }

        this.mBullets += 2;
        if(this.mBullets > 90){ this.mBullets = 0;}

        if(this.mLeftCannon.getLength() > 0){
            this.mLeftCannon.update(hero, aCamera, particles);
        }
        if(this.mRightCannon.getLength() > 0){
            this.mRightCannon.update(hero, aCamera, particles);
        }

        this.mSpawnTicks++;
        if(this.mSpawnTicks > this.kSpawnCounterStageTwo && !this.mExpired) {
            this._spawnEnemy();
            this.mSpawnTicks = 0;
        }
    } else {
        this.mCurrentStage = Boss.eBossStage.eStageThree;
    }
};

Boss.prototype._serviceStageThree = function(hero, aCamera, particles) {
    this.mFireTicks++;
    if((this.mFireTicks > this.kRateOfFireStageThree) && (this.mBullets < this.kBulletTotalStageThree)) {
            this.mLeftCannon.newAt(vec2.subtract(vec2.fromValues(0, 0), this.getXform().getPosition(), vec2.fromValues(140, 65)));
            this.mRightCannon.newAt(vec2.add(vec2.fromValues(0, 0), this.getXform().getPosition(), vec2.fromValues(140, -65)));
        this.mFireTicks = 0;
    }

    this.mBullets += 2;
    if(this.mBullets > 90){
        this.mBullets = 0;
    }

    if(this.mLeftCannon.getLength() > 0){
        this.mLeftCannon.update(hero, aCamera, particles);
    }
    if(this.mRightCannon.getLength() > 0){
        this.mRightCannon.update(hero, aCamera, particles);
    }

    this.mSpawnTicks++;
    if((this.mSpawnTicks > this.kSpawnCounterStageThree) && !this.mExpired) {
        this._spawnEnemy();
        this.mSpawnTicks = 0;
    }  
};

Boss.prototype._positionLights = function() {
    var leftLight = [0, 0];
    var rightLight = [0, 0];
        
    rightLight[0] = this.getXform().getXPos() + 217;
    leftLight[0] = this.getXform().getXPos() - 217;
    leftLight[1] = rightLight[1] = this.getXform().getYPos() - 25;
    
    if(this.mRotateLeft) {
        if(this.mRotate > this.kLeftRotateBound) {
            this.mRotate -= 0.5;
        } else {
            this.mRotateLeft = false;
        }
    } else {
        if(this.mRotate < this.kRightRotateBound) {
            this.mRotate += 0.5;
        } else {
            this.mRotateLeft = true;
        }
    }
    this.mLeftSpotlight.set2DPosition(leftLight);
    this.mLeftSpotlight.setDirection([this.mRotate, -400, -1]);
    this.mRightSpotlight.set2DPosition(rightLight);
    this.mRightSpotlight.setDirection([this.mRotate, -400, -1]);
};

Boss.prototype.getProjectileLeftSet = function() { return this.mLeftCannon; };
Boss.prototype.getProjectileRightSet = function() { return this.mRightCannon; };
Boss.prototype.hasExpired = function() { return this.mExpired; };
Boss.prototype.getHealth = function() { return this.mHealthBar.getXform().getWidth(); };
