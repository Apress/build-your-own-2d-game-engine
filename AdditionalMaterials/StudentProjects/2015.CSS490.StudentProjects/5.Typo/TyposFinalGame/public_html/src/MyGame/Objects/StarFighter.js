/* File: 		StarFighter.js
 * Author:      	Ryu Muthui, Michael Voght, Chad Dugie
 * Last Date Modified: 	12/15/2015
 * Description:		Creates and initializes the StarFighter (Player), and its
 *                      necessary logic. */
"use strict";

function StarFighter(spriteTexture, starfighterSet, groupTransform) {
    this.kDelta = 4;
    this.kLaserFireSFX = "assets/Audio/SFX/Laser_Fire04.wav";
    this.kStarFighter_HitSFX = "assets/Audio/SFX/Collide_Hit01.wav";
    this.kShield = "assets/Shield_Effect.png";
    this.mStarFighter = new LightRenderable(spriteTexture);
    this.mStarFighter.setColor([1, 1, 1, 0]);
    this.mStarFighter.setElementPixelPositions(0, 64, 0, 64);
    this.mStarFighter.getXform().setPosition(3600, 500);
    this.mStarFighter.getXform().setSize(40, 40);
    
    this.mStarFighterMiniMap = new Renderable();
    this.mStarFighterMiniMap.setColor([0, 1, 0, 1]); // green
    this.mStarFighterMiniMap.getXform().setSize(40, 40);
    
    // adjust this variable to set fire rate
    this.mFireRate = 6; 
    this.mFireRateCounter = 0;
    
    // Projectiles that the StarFighter can fire
    this.mProjectiles = new ProjectileSet(this);
    
    GameObject.call(this, this.mStarFighter, groupTransform);
    
    this.mHealthBar = new Renderable();
    this.mHealthBar.setColor([1.0, 0.0, 0.0, 1.0]);
    this.mHealthBar.getXform().setSize(100, 3);
    this.mPowerUps = new PowerUpSet(this);
    
    this.mStarFighterSet = starfighterSet;
    starfighterSet.addToSet(this);
    var i;
    for (i = 0; i < 5; i++)
        starfighterSet.addToSet(new Shield(this.kShield));
    this.setupShields();
    
    this.mFlash = createALight(Light.eLightType.ePointLight,
            [this.getXform().getXPos(), this.getXform().getYPos(), 5],         // position
            [0, 0, -1],          // Direction 
            [1.0, 1.0, 1.0, 1],  // some color
            0, 20,               // near and far distances
            0.1, 0.2,            // inner and outer cones
            2,                   // intensity
            0.1);                // drop off
    this.getRenderable().addLight(this.mFlash);
    this.mFlashDuration = 5;
    this.mFlashCounter = 0;
}
gEngine.Core.inheritPrototype(StarFighter, GameObject);

StarFighter.prototype.update = function(enemyColide, fire, up, down, left, right, strafeL, strafeR, aCamera, particles, lArrow, uArrow, rArrow, dArrow){
    this.mStarFighterMiniMap.getXform().setPosition(this.mStarFighter.getXform().getXPos(), 
        this.mStarFighter.getXform().getYPos());
    
    var projDir = vec2.clone(this.getCurrentFrontDir());
    if (gEngine.Input.isKeyPressed(fire) && (this.mFireRateCounter >= (1 / this.mFireRate) * 60)) {
        this.mProjectiles.newAt([this.getXform().getXPos() + (projDir[0] * 25), 
            this.getXform().getYPos() + (projDir[1] * 25)]);
	if (this.mPowerUps.hasWeaponTriple()) {// if triple shot power-up is picked up
	    vec2.rotate(projDir, projDir, Math.PI / 16); // left
	    this.mProjectiles.newAt([this.getXform().getXPos() + (projDir[0] * 25), 
                this.getXform().getYPos() + (projDir[1] * 25)], Math.PI / 16);
        
	    vec2.rotate(projDir, projDir, -Math.PI / 16); // right
	    this.mProjectiles.newAt([this.getXform().getXPos() + (projDir[0] * 25), 
                this.getXform().getYPos() + (projDir[1] * 25)], -Math.PI / 16);
	}
        this.mFireRateCounter = 0;
        this.mFlashCounter = 0;
        score -= 1;
        gEngine.AudioClips.playACue(this.kLaserFireSFX);
    }
    this.mFlash.set2DPosition([this.getXform().getXPos() + projDir[0] * 20, 
            this.getXform().getYPos() + projDir[1] * 20]);
    this.mFireRateCounter++;
    if (this.mFlashCounter < this.mFlashDuration && !this.mFlash.isLightOn()){
        this.mFlash.setLightTo(true);
    }
    if (this.mFlashCounter >= this.mFlashDuration && this.mFlash.isLightOn()){
        this.mFlash.setLightTo(false);
    }
    this.mFlashCounter++;
    this.mProjectiles.update(enemyColide, aCamera, particles);
    this.mHealthBar.getXform().setPosition(this.getXform().getXPos(), 
        this.getXform().getYPos() - (this.getXform().getHeight() / 2));
    
    var xform = this.getXform();
    
    ///CONTROLS 1: 8 Directional///
    if (document.getElementById("controls1").checked) {
	if ((gEngine.Input.isKeyPressed(up) && !gEngine.Input.isKeyPressed(down)) && 
            (!gEngine.Input.isKeyPressed(left) && gEngine.Input.isKeyPressed(right))) {
	    this.setCurrentFrontDir([1, 1]);
	    xform.setRotationInRad(-Math.PI / 4);
	    var pos = xform.getPosition();
	    vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.kDelta);
	}
	else if ((!gEngine.Input.isKeyPressed(up) && gEngine.Input.isKeyPressed(down)) && 
                (!gEngine.Input.isKeyPressed(left) && gEngine.Input.isKeyPressed(right))) {
	    this.setCurrentFrontDir([1, -1]);
	    xform.setRotationInRad(-3 * Math.PI / 4);
	    var pos = xform.getPosition();
	    vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.kDelta);
	}
	else if ((!gEngine.Input.isKeyPressed(up) && gEngine.Input.isKeyPressed(down)) &&
                (gEngine.Input.isKeyPressed(left) && !gEngine.Input.isKeyPressed(right))) {
	    this.setCurrentFrontDir([-1, -1]);
	    xform.setRotationInRad(3 * Math.PI / 4);
	    var pos = xform.getPosition();
	    vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.kDelta);
	}
	else if ((gEngine.Input.isKeyPressed(up) && !gEngine.Input.isKeyPressed(down)) &&
                (gEngine.Input.isKeyPressed(left) && !gEngine.Input.isKeyPressed(right))) {
	    this.setCurrentFrontDir([-1, 1]);
	    xform.setRotationInRad(Math.PI / 4);
	    var pos = xform.getPosition();
	    vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.kDelta);
	}
	else if ((gEngine.Input.isKeyPressed(up) && !gEngine.Input.isKeyPressed(down)) &&
                (!gEngine.Input.isKeyPressed(left) && !gEngine.Input.isKeyPressed(right))) { 
	    this.setCurrentFrontDir([0, 1]);
	    xform.setRotationInRad(0);
	    var pos = xform.getPosition();
	    vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.kDelta);
	}
	else if ((!gEngine.Input.isKeyPressed(up) && gEngine.Input.isKeyPressed(down)) &&
                (!gEngine.Input.isKeyPressed(left) && !gEngine.Input.isKeyPressed(right))) { 
	    this.setCurrentFrontDir([0, -1]);
	    xform.setRotationInRad(Math.PI);
	    var pos = xform.getPosition();
	    vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.kDelta);
	}
	else if ((!gEngine.Input.isKeyPressed(up) && !gEngine.Input.isKeyPressed(down)) &&
                (gEngine.Input.isKeyPressed(left) && !gEngine.Input.isKeyPressed(right))) { 
	    this.setCurrentFrontDir([-1, 0]);
	    xform.setRotationInRad(Math.PI / 2);
	    var pos = xform.getPosition();
	    vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.kDelta);
	}
	else if ((!gEngine.Input.isKeyPressed(up) && !gEngine.Input.isKeyPressed(down)) && 
                (!gEngine.Input.isKeyPressed(left) && gEngine.Input.isKeyPressed(right))) {
	    this.setCurrentFrontDir([1, 0]);
	    xform.setRotationInRad(-Math.PI / 2);
	    var pos = xform.getPosition();
	    vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.kDelta);
	}
    }
    
    ///CONTROLS 2///
    if (document.getElementById("controls2").checked) {
	if (gEngine.Input.isKeyPressed(up) && !gEngine.Input.isKeyPressed(down)) {
	    var pos = xform.getPosition();
	    vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.kDelta);
	}
	if (!gEngine.Input.isKeyPressed(up) && gEngine.Input.isKeyPressed(down)) {
	    var pos = xform.getPosition();
	    vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), -this.kDelta);
	}
	if (gEngine.Input.isKeyPressed(left) && !gEngine.Input.isKeyPressed(right)) {
	    var pos = xform.getPosition();
	    xform.incRotationByRad(0.05);
	    vec2.rotate(this.getCurrentFrontDir(), this.getCurrentFrontDir(), 0.05);
	}
	if (!gEngine.Input.isKeyPressed(left) && gEngine.Input.isKeyPressed(right)) {
	    var pos = xform.getPosition();
	    xform.incRotationByRad(-0.05);
	    vec2.rotate(this.getCurrentFrontDir(), this.getCurrentFrontDir(), -0.05);
	}
    }
    
    if(document.getElementById("controls3").checked) {
	if (gEngine.Input.isKeyPressed(up) && !gEngine.Input.isKeyPressed(down)) {
            this.mStarFighter.getXform().incYPosBy(this.kDelta);
        }
      	if (!gEngine.Input.isKeyPressed(up) && gEngine.Input.isKeyPressed(down)) {
            this.mStarFighter.getXform().incYPosBy(-this.kDelta);
        }
	if (gEngine.Input.isKeyPressed(left) && !gEngine.Input.isKeyPressed(right)) {
            this.mStarFighter.getXform().incXPosBy(-this.kDelta);
        }
	if (!gEngine.Input.isKeyPressed(left) && gEngine.Input.isKeyPressed(right)) {
            this.mStarFighter.getXform().incXPosBy(this.kDelta);
        }
        
	if ((gEngine.Input.isKeyPressed(uArrow) && !gEngine.Input.isKeyPressed(dArrow)) && 
            (!gEngine.Input.isKeyPressed(lArrow) && gEngine.Input.isKeyPressed(rArrow))) {
	    this.setCurrentFrontDir([1, 1]);
	    xform.setRotationInRad(-Math.PI / 4);
	    var pos = xform.getPosition();
//	    vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.kDelta);
	}
	else if ((!gEngine.Input.isKeyPressed(uArrow) && gEngine.Input.isKeyPressed(dArrow)) && 
                (!gEngine.Input.isKeyPressed(lArrow) && gEngine.Input.isKeyPressed(rArrow))) {
	    this.setCurrentFrontDir([1, -1]);
	    xform.setRotationInRad(-3 * Math.PI / 4);
	    var pos = xform.getPosition();
//	    vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.kDelta);
	}
	else if ((!gEngine.Input.isKeyPressed(uArrow) && gEngine.Input.isKeyPressed(dArrow)) &&
                (gEngine.Input.isKeyPressed(lArrow) && !gEngine.Input.isKeyPressed(rArrow))) {
	    this.setCurrentFrontDir([-1, -1]);
	    xform.setRotationInRad(3 * Math.PI / 4);
	    var pos = xform.getPosition();
//	    vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.kDelta);
	}
	else if ((gEngine.Input.isKeyPressed(uArrow) && !gEngine.Input.isKeyPressed(dArrow)) &&
                (gEngine.Input.isKeyPressed(lArrow) && !gEngine.Input.isKeyPressed(rArrow))) {
	    this.setCurrentFrontDir([-1, 1]);
	    xform.setRotationInRad(Math.PI / 4);
	    var pos = xform.getPosition();
//	    vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.kDelta);
	}
	else if ((gEngine.Input.isKeyPressed(uArrow) && !gEngine.Input.isKeyPressed(dArrow)) &&
                (!gEngine.Input.isKeyPressed(lArrow) && !gEngine.Input.isKeyPressed(rArrow))) { 
	    this.setCurrentFrontDir([0, 1]);
	    xform.setRotationInRad(0);
	    var pos = xform.getPosition();
//	    vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.kDelta);
	}
	else if ((!gEngine.Input.isKeyPressed(uArrow) && gEngine.Input.isKeyPressed(dArrow)) &&
                (!gEngine.Input.isKeyPressed(lArrow) && !gEngine.Input.isKeyPressed(rArrow))) { 
	    this.setCurrentFrontDir([0, -1]);
	    xform.setRotationInRad(Math.PI);
	    var pos = xform.getPosition();
//	    vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.kDelta);
	}
	else if ((!gEngine.Input.isKeyPressed(uArrow) && !gEngine.Input.isKeyPressed(dArrow)) &&
                (gEngine.Input.isKeyPressed(lArrow) && !gEngine.Input.isKeyPressed(rArrow))) { 
	    this.setCurrentFrontDir([-1, 0]);
	    xform.setRotationInRad(Math.PI / 2);
	    var pos = xform.getPosition();
//	    vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.kDelta);
	}
	else if ((!gEngine.Input.isKeyPressed(uArrow) && !gEngine.Input.isKeyPressed(dArrow)) && 
                (!gEngine.Input.isKeyPressed(lArrow) && gEngine.Input.isKeyPressed(rArrow))) {
	    this.setCurrentFrontDir([1, 0]);
	    xform.setRotationInRad(-Math.PI / 2);
	    var pos = xform.getPosition();
//	    vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.kDelta);
	}
    }
    
    if (gEngine.Input.isKeyPressed(strafeL) && !gEngine.Input.isKeyPressed(strafeR)) {
        var pos = xform.getPosition();
        var currentLeftDir = vec2.fromValues(-this.getCurrentFrontDir()[1], this.getCurrentFrontDir()[0]);
        vec2.scaleAndAdd(pos, pos, currentLeftDir, this.kDelta);
    }
    if (!gEngine.Input.isKeyPressed(strafeL) && gEngine.Input.isKeyPressed(strafeR)) {
        var pos = xform.getPosition();
        var currentRightDir = vec2.fromValues(this.getCurrentFrontDir()[1], -this.getCurrentFrontDir()[0]);
        vec2.scaleAndAdd(pos, pos, currentRightDir, this.kDelta);
    }
    this.mPowerUps.update();
    var i;
    for(i = 1; i < this.mStarFighterSet.size(); i++) {
        var obj = this.mStarFighterSet.getObjectAt(i);
        if(obj.hasExpired()) {
            this.mStarFighterSet.removeFromSet(obj);
            this.setupShields();
        }
    }
};

StarFighter.prototype.draw = function(aCamera) { GameObject.prototype.draw.call(this, aCamera); };
StarFighter.prototype.drawRenderable = function(aCamera) { this.mStarFighterMiniMap.draw(aCamera);};
StarFighter.prototype.getProjectileSet = function() { return this.mProjectiles; };
StarFighter.prototype.getHealth = function() { return this.mHealthBar.getXform().getWidth(); };
StarFighter.prototype.getSpeed = function() { return this.kDelta; };
StarFighter.prototype.getPowerUps = function() { return this.mPowerUps; };

StarFighter.prototype.hitOnce = function() {
    if (this.mStarFighterSet.size() > 1) {
        this.mStarFighterSet.getObjectAt(this.mStarFighterSet.size() - 1).setExpired();
        score -= 50;
    }
    else if ( this.mHealthBar.getXform().getWidth() > 0 ){
        this.mHealthBar.getXform().incWidthBy(-10);
        score -= 100;
    }
};

StarFighter.prototype.WallMove = function() {
    var forwardBase = vec2.create();
    vec2.scaleAndAdd(forwardBase, forwardBase, this.getCurrentFrontDir(), this.kDelta);
    var forwardToWall = vec.fromValues()
};

StarFighter.prototype.addPowerUp = function(powerUp) {
    this.mPowerUps.add(powerUp);
    powerUp.setStarted();
};

StarFighter.prototype.setupShields = function() {
    var shieldInterval = 2 * Math.PI / (this.mStarFighterSet.size() - 1);
    var i;
    for (i = 1; i < this.mStarFighterSet.size(); i++) {
        this.mStarFighterSet.getObjectAt(i).setCurrentFrontDir([0, 1]);
        this.mStarFighterSet.getObjectAt(i).getXform().setRotationInRad(0);
        this.mStarFighterSet.getObjectAt(i).getXform().incRotationByRad(shieldInterval * (i - 1));
        vec2.rotate(this.mStarFighterSet.getObjectAt(i).getCurrentFrontDir(), this.mStarFighterSet.getObjectAt(i).getCurrentFrontDir(), shieldInterval * (i - 1));
    }
};

StarFighter.prototype.addShield = function() {
    if (this.mStarFighterSet.size() < 6) {
        this.mStarFighterSet.addToSet(new Shield(this.kShield));
        this.setupShields();
    }
};