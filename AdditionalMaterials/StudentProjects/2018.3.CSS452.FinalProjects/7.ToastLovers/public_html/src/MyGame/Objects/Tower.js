"use strict";

function Tower(playfield, texture, pos) {
	this.pf = playfield;
	this.mGridPos = pos;
	this.mWeight = 10;    
	this.mSize = [1, 1];
	this.mHitPoints = 100;
	this.mAccumulator = 0;
	this.mFireRate = 2;
	this.mProjectileSpeed = 15;
	this.mFiringEnabled = false;
	this.mAnimationTime = 0.3;
	this.mAnimationIsShooting = false;
	this.mDamage = 0;
	this.mRange = 20;
	this.mCost = 1;
	this.mLevel = 0;
	this.mMaxLevel = 0;
	this.upgradeCosts = [];
	this.mName = "";
	this.obj = new LightRenderable(texture);  
	this.mProjectiles = null;
	this.mFiringPriority = Tower.firingPriority.targetClosest;
	this.mHealth = 1;
	this.baseHealth = 1;
	this.markedForDeletion = false;
	this.mIndicator = new LightRenderable("assets/indicator.png");
	this.showIndicator = false;

	GameObject.call(this, this.obj);
	this.getXform().setPosition(-100, 100);
	this.mIndicator.getXform().setPosition(-100, 100);
	this.mPhysicsEnabled = false;
	this.mRigid = new RigidRectangle(this.getXform(), 1, 1);

	for(var i = 0; i < playfield.mLights.length; ++i) {
		this.obj.addLight(playfield.mLights[i]);
		this.mIndicator.addLight(playfield.mLights[i]);
	}
}
gEngine.Core.inheritPrototype(Tower, GameObject);

Tower.firingPriority = Object.freeze({
	targetClosest: 0,   /* Close to _this_ tower */
	targetFurthest: 1,  /* Far from _this_ tower */
	targetWeakest: 2,   /* Has little health */
	targetStrongest: 3, /* Has a lot of health */
	targetMostAdv: 4,   /* Close to _its target_ tower */
	targetLeastAdv: 5   /* Far from _its target_ tower */
});

Tower.prototype.update = function(dt) {
    if(!this.mPhysicsEnabled){
	if(this.showIndicator)
		this.mIndicator.getXform().setPosition(this.getXform().getXPos(), this.getXform().getYPos());

	if (!this.mFiringEnabled) return;

	var haveAlreadyChanged = false;
	this.mAccumulator += dt;

	if (this.mAccumulator > this.mAnimationTime / this.mFireRate)
		this.changeAnimationNoShoot();

	while (this.mAccumulator > 1 / this.mFireRate) {
		this.mAccumulator -= 1 / this.mFireRate;
		this.spawnProjectile();

		if (!haveAlreadyChanged) {
			haveAlreadyChanged = true;
			this.changeAnimationShoot();
		}
	}
    }
    else{
	this.mRigid.update();
	if(this.obj.getXform().getYPos() < -300)
	    this.markedForDeletion = true;
    }
};

Tower.prototype.TryCollide = function(minionColliding) {
	var pos = [0, 0];

	if(!this.mCollided && this.pixelTouches(minionColliding, pos)) {
		this.mCollided = true;
		this.mEnabled = false;
		minionColliding.TakeDamage(this.mDamage);
	}
};

Tower.prototype.draw = function(cam) {
	GameObject.prototype.draw.call(this, cam);
	if(this.showIndicator) 
		this.mIndicator.draw(cam);
};

Tower.prototype.enablePhysics = function() {
	if(!this.mPhysicsEnabled){
	    this.mPhysicsEnabled = true;
	    this.setRigidBody(this.mRigid);
	    this.mRigid.setAngularVelocity((Math.random() - 0.5) * 10);
	    this.mRigid.setVelocity((Math.random() - 0.5) * 40, (Math.random() - 0.5) * 60);
	}
};

Tower.prototype.checkMinionsInRange = function(minionSet) {
	this.mFiringEnabled = false;

	if(!minionSet)
		return;

	for(var i = 0; i < minionSet.size(); ++i) {
		var otherSize = minionSet.mSet[i].getXform().getSize();
		var otherR = Math.sqrt(0.5*otherSize[0]*0.5*otherSize[0] + 0.5*otherSize[1]*0.5*otherSize[1]);
		var d = [];
		vec2.sub(d, this.getXform().getPosition(), minionSet.mSet[i].getXform().getPosition());

		if(vec2.length(d) < (this.mRange + otherR)) {
			this.mFiringEnabled = true;
			break;
		}
	}
};

Tower.prototype.getBestMinion = function(minionSet) {
	var bestMinion = null;

	if(!minionSet)
		return bestMinion;

	for(var i = 0; i < minionSet.size(); ++i) {
		var minion = minionSet.mSet[i];

		if(!bestMinion) {
			bestMinion = minion;
			continue;
		}

		var towerP = this.obj.getXform().getPosition();
		var minionP = minion.getXform().getPosition();
		var bMinionP = bestMinion.getXform().getPosition();

		switch(this.mFiringPriority) {
		case Tower.firingPriority.targetClosest:
			if (Math.pow(minionP[0]-towerP[0],2)+Math.pow(minionP[1]-towerP[1],2) <
				Math.pow(bMinionP[0]-towerP[0],2)+Math.pow(bMinionP[1]-towerP[1],2))
				bestMinion = minion;

			break;

		case Tower.firingPriority.targetFurthest:
			if (Math.pow(minionP[0]-towerP[0],2)+Math.pow(minionP[1]-towerP[1],2) >
				Math.pow(bMinionP[0]-towerP[0],2)+Math.pow(bMinionP[1]-towerP[1],2))
				bestMinion = minion;

			break;

		case Tower.firingPriority.targetWeakest:
			if (minion.mHealth < bestMinion.mHealth)
				bestMinion = minion;

			break;

		case Tower.firingPriority.targetStrongest:
			if (minion.mHealth > bestMinion.mHealth)
				bestMinion = minion;

			break;

		case Tower.firingPriority.targetMostAdv:
			if (minion.path.length - minion.pathIndex < bestMinion.path.length - bestMinion.pathIndex)
				bestMinion = minion;

			break;
		case Tower.firingPriority.targetLeastAdv:
			if (minion.path.length - minion.pathIndex > bestMinion.path.length - bestMinion.pathIndex)
				bestMinion = minion;

			break;
		}
	}

	return bestMinion;
};

Tower.prototype.getDirectionFromMinion = function(minion) {
	var Mp = minion.getXform().getPosition();
	var Tp = this.obj.getXform().getPosition();
	var Md = [], Mv = [], D = [];
	vec2.sub(Mv, Mp, Tp);
	vec2.scale(Md, minion.getCurrentFrontDir(), vec2.len(Mv) * minion.mSpeed / this.mProjectileSpeed);
	vec2.add(D, Mv, Md);
	return Math.atan2(D[1], D[0]) - Math.PI/2;
};

Tower.prototype.CheckProjectileCollisions = function(collidingObject) {
	if(this.mProjectiles !== null)
		this.mProjectiles.forEach(p => { p.TryCollide(collidingObject); });
};

Tower.prototype.takeDamage = function(damageNumber) {
	this.mHealth -= damageNumber;
	if(this.mHealth <= 0){
	    this.mHealth = 0;
	    this.markedForDeletion = true;
	}
};

Tower.prototype.enableFiring = function() {
	this.mFiringEnabled = true;
};

Tower.prototype.disableFiring = function() {
	this.mFiringEnabled = false;
	this.mAccumulator = 0;
	this.changeAnimationNoShoot();
};

Tower.prototype.spawnProjectile = function() {};
Tower.prototype.changeAnimationNoShoot = function() {};
Tower.prototype.changeAnimationShoot = function() {};
Tower.prototype.onWaveComplete = function() {};
Tower.prototype.upgrade = function() { };
