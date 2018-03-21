/* File: 		SpaceStation.js
 * Author:      	Michael Voght
 * Last Date Modified: 	12/15/2015
 * Description:		Creates and initializes the SpaceStation Game object,
 *                      and its necessary logic. */
"use strict";

function SpaceStation(spriteTexture, normalMap, enemySet) {
    this.mSpaceStation = new IllumRenderable(spriteTexture, normalMap);
    this.mSpaceStation.setColor([1, 1, 1, 0]);
    this.mSpaceStation.setElementPixelPositions(0, 512, 0, 512);
    this.mSpaceStation.getXform().setPosition(500 + Math.random() * 1548, 2048 + Math.random() * 1548);
    this.mSpaceStation.getXform().setSize(700, 700);
    
    this.mSpaceStationMiniMap = new Renderable();
    this.mSpaceStationMiniMap.setColor([0.97, 0.44, 0.01, 1]); // Orange
    this.mSpaceStationMiniMap.getXform().setPosition(this.mSpaceStation.getXform().getXPos(), this.mSpaceStation.getXform().getYPos());
    this.mSpaceStationMiniMap.getXform().setSize(500, 500);
    
    this.kLargeExplosionSFX = "assets/Audio/SFX/BigExplosion_SFX.wav";
    this.kSpawnEnemy = "assets/Enemy/strip_saucer_solid.png";
    this.kPowerUp_HealthSprite = "assets/PowerUp_Health.png";
    this.kTurret = "assets/Enemy/turret.png";
    this.kSpawnCounter = 300; // every 5 seconds, spawn a saucer enemy
    this.kSpawnTotal = 100;   // keep spawning until 100 total saucer enemies
    this.kStartArmySize = 50; // start with 50 saucer enemies on screen
    
    this.mSpawnTicks = 0;
    this.mEnemiesSpawned = this.kStartArmySize;
    this.mAllEnemies = enemySet;
    this.mExpired = false;
    
    this.mTurrets = new GameObjectSet();
    this.mTurrets.addToSet(new Enemy_Turret(this.kTurret, [this.mSpaceStation.getXform().getXPos(), this.mSpaceStation.getXform().getYPos() + 50]));
    this.mTurrets.addToSet(new Enemy_Turret(this.kTurret, [this.mSpaceStation.getXform().getXPos() - 35, this.mSpaceStation.getXform().getYPos() - 35]));
    this.mTurrets.addToSet(new Enemy_Turret(this.kTurret, [this.mSpaceStation.getXform().getXPos() + 35, this.mSpaceStation.getXform().getYPos() - 35]));
    
    enemySet.addToSet(this);
    this._startingArmy();
    
    GameObject.call(this, this.mSpaceStation);
    this.mHealthBar = new Renderable();
    this.mHealthBar.setColor([1.0, 0.5, 0.0, 1.0]);
    this.mHealthBar.getXform().setSize(300, 10);
}
gEngine.Core.inheritPrototype(SpaceStation, GameObject);

SpaceStation.prototype.update = function(powerUps, starfighter, aCamera, particles) {
    for( var i = 1; i < this.mAllEnemies.size(); i++ ) {
        var obj = this.mAllEnemies.getObjectAt(i);
        if(obj.hasExpired()) {
            if (Math.random() < 0.15) {
                if (Math.random() * 3 < 1) {
                    powerUps.add(new PowerUp_HealthFull(this.kPowerUp_HealthSprite,
                        obj.getXform().getXPos(), obj.getXform().getYPos()));
                }
                else if (Math.random() * 3 < 2) {
                    powerUps.add(new PowerUp_WeaponTriple(this.kPowerUp_HealthSprite,
                        obj.getXform().getXPos(), obj.getXform().getYPos()));
                }
                else {
                    powerUps.add(new PowerUp_ShieldAdd(this.kPowerUp_HealthSprite,
                        obj.getXform().getXPos(), obj.getXform().getYPos()));
                }
            }
            this.mAllEnemies.removeFromSet(obj);
        }
    }
    
    if(!this.mExpired) {
        GameObject.prototype.update.call(this);
        this.mSpaceStation.getXform().incRotationByDegree(0.2);

        this.mSpawnTicks++;
        if(this.mSpawnTicks > this.kSpawnCounter && this.mEnemiesSpawned < this.kSpawnTotal) {
            this._spawnEnemy();
            this.mEnemiesSpawned++;
            this.mSpawnTicks = 0;
        }
        this.mHealthBar.getXform().setPosition(this.getXform().getXPos(),
        this.getXform().getYPos() - (this.getXform().getHeight() / 2));
    }
    
    var i;
    for (i = 0; i < this.mTurrets.size(); i++){
        this.mTurrets.getObjectAt(i).update(starfighter, aCamera, particles);
    }
};

SpaceStation.prototype.draw = function(aCamera) {
    if(!this.mExpired){
        GameObject.prototype.draw.call(this, aCamera);
    }
    this.mTurrets.draw(aCamera);
};

SpaceStation.prototype.drawRenderable = function(aCamera) {
    if(!this.hasExpired()){
        this.mSpaceStationMiniMap.draw(aCamera);
    }
};

SpaceStation.prototype._getRandPos = function() {
    var randX = 200 + Math.round(Math.random() * 3700);
    var randY;
    if( randX > 2700 ){
        randY = 1200 + Math.round(Math.random() * 2700);
    }else{
        randY = 200 + Math.round(Math.random() * 3700);
    }
    return vec2.fromValues(randX, randY);
};

SpaceStation.prototype._startingArmy = function() {
    for( var i = 0; i < this.kStartArmySize; i++ ) {
        var dstPos = this._getRandPos();
        var m = new Enemy_SaucerSolid(this.kSpawnEnemy, dstPos, dstPos);
        this.mAllEnemies.addToSet(m);
    }
};

SpaceStation.prototype._spawnEnemy = function() {
    var startPos = this.mSpaceStation.getXform().getPosition();
    var dstPos = this._getRandPos();
    var m = new Enemy_SaucerSolid(this.kSpawnEnemy, startPos, dstPos);
    this.mAllEnemies.addToSet(m);
};

SpaceStation.prototype.hitOnce = function(aCamera, particles) {
    if( this.mHealthBar.getXform().getWidth() > 0 ){
        this.mHealthBar.getXform().incWidthBy(-5);
    }
    if( this.mHealthBar.getXform().getWidth() <= 0 ){
        var originalPos = vec2.clone(this.getXform().getPosition());
        gEngine.AudioClips.playACue(this.kLargeExplosionSFX);
        particles.addEmitterAt(originalPos, 1000, createParticleBoss, this);
        aCamera.shake(40, 40, 40, 60);
        score += 1000;
        this.getXform().setPosition(-5000, -5000);
        var i;
        for (i = 0; i < this.mTurrets.size(); i++){
            this.mTurrets.getObjectAt(i).getXform().setPosition(-5000, -5000);
        }
        this.mExpired = true;
    }
};

SpaceStation.prototype.hasExpired = function() { return this.mExpired; };