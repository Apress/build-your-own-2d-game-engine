/* File: 		Enemy_Turret.js
 * Author:      	Ryu Muthui
 * Last Date Modified: 	12/15/2015
 * Description:		Creates and initializes an enemy turret object. */
"use strict"; 

function Enemy_Turret(spriteTexture, pos) {
    this.kTurretFireSFX = "assets/Audio/SFX/Laser_Fire03.wav";
    this.mTurret = new SpriteRenderable(spriteTexture);
    this.mTurret.setElementPixelPositions(0, 64, 0, 64);
    this.mTurret.getXform().setPosition(pos[0], pos[1]);
    this.mTurret.getXform().setSize(40, 40);
    GameObject.call(this, this.mTurret);
 
    // Projectiles that the Turret can fire
    this.mProjectiles = new ProjectileSet(this);
    
    this.mTurnRate = 0.2;
    
    // adjust this variable to set turret fire speed
    this.mFireRate = 2; 
    this.mFireRateCounter = 0;
    this.mFireMax = 0;
    this.mFireCounter = 0;
    this.mFirePause = false;
    this.mFirePauseDuration = 0;
    this.mFirePauseCounter = 0;
}
gEngine.Core.inheritPrototype(Enemy_Turret, GameObject);

Enemy_SaucerSolid.prototype.setExpired = function() { this.mExpired = true; };
Enemy_SaucerSolid.prototype.hasExpired = function() { return this.mExpired; };

Enemy_Turret.prototype.update = function(starFighter, aCamera, particles){
    this.mProjectiles.update(starFighter, aCamera, particles);
    var starFighterPos = starFighter.getObjectAt(0).getXform().getPosition();
    var turretPos = this.getXform().getPosition();
    this.rotateObjPointTo(starFighterPos, this.mTurnRate);
    
    // if starFighter to turret pos is less than 800 
    // and counter is grater than fire rate/frame fire at starFighter
    if (vec2.distance(starFighterPos, turretPos) < 800 && this.mFireRateCounter >= (1 / this.mFireRate) * 60 && !this.mFirePause) {
        this.mProjectiles.newAt([this.getXform().getXPos() + (this.getCurrentFrontDir()[0] * 25), this.getXform().getYPos() + (this.getCurrentFrontDir()[1] * 25)]);
        this.mFireRateCounter = 0;
        this.mFireCounter++;
        gEngine.AudioClips.playACue(this.kTurretFireSFX);
    }
    if (this.mFireCounter >= this.mFireMax) {
        this.mFirePause = true;
        this.mFireCounter = 0;
    }
    if (this.mFirePause) {
        this.mFirePauseCounter++;
    }
    if (this.mFirePauseCounter >= this.mFirePauseDuration) {
        this.mFirePause = false;
        this.mFirePauseCounter = 0;
    }
    
    this.mFireRateCounter++;
};

Enemy_Turret.prototype.draw = function(aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mProjectiles.draw(aCamera);
};

Enemy_Turret.prototype.getProjectileSet = function() { return this.mProjectiles; };

Enemy_Turret.prototype.setTurnRate = function(turnRate) { this.mTurnRate = turnRate; };
Enemy_Turret.prototype.setFireRate = function(fireRate) { this.mFireRate = fireRate; };
Enemy_Turret.prototype.setFireMax = function(fireMax) { this.mFireMax = fireMax; };
Enemy_Turret.prototype.setFirePauseDuration = function(firePauseDuration) { this.mFirePauseDuration = firePauseDuration; };
