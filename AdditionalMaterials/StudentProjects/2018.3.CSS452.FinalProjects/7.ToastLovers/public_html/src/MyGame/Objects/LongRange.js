"use strict";

function LongRange(pf, pos) {
	Tower.call(this, pf, "assets/long_range.png", pos);

	this.obj.mTexRight = 0.25;
	this.obj._setTexInfo();
	this.obj.setTextureMode(gEngine.Textures.textureModes.Nearest);

	this.bg = new LightRenderable("assets/long_range.png");
	this.bg.mTexRight = 0.25;
	this.bg._setTexInfo();
	this.bg.getXform().mPosition = this.obj.getXform().mPosition;
	this.bg.getXform().mScale = this.obj.getXform().mScale;
	this.bg.mColor = this.obj.mColor;
	this.mRange = 40;
	this.mCost = 3;
	this.mDamage = 10;
	this.mProjectileSpeed = 50;
	this.mIndicator.getXform().setSize(this.mRange * 2, this.mRange * 2);
	this.mMaxLevel = 5;
	this.upgradeCosts = [5, 10, 20, 40, 80];

	this.mProjectiles = new Set();
	this.mName = "Long Range";
	this.changeAnimationNoShoot();

	for(var i = 0; i < pf.mLights.length; ++i)
		this.bg.addLight(pf.mLights[i]);
}
gEngine.Core.inheritPrototype(LongRange, Tower);

LongRange.prototype.draw = function(cam) {
	this.bg.draw(cam);
	Tower.prototype.draw.call(this, cam);
	this.mProjectiles.forEach(p => { p.draw(cam); });
};

LongRange.prototype.update = function(dt) {
	Tower.prototype.update.call(this, dt);
	if(!this.mPhysicsEnabled) {
		if(this.mFiringEnabled)
			this.obj.getXform().incRotationByRad(dt);

		this.mProjectiles.forEach(p => { p.update(dt); });
	}
};

LongRange.prototype.checkMinionsInRange = function(minionSet) {
	Tower.prototype.checkMinionsInRange.call(this, minionSet);

	if(this.mFiringEnabled) {
		var target = this.getBestMinion(minionSet);
		var direction = this.getDirectionFromMinion(target);
		this.obj.getXform().setRotationInRad(direction);
	}
}

LongRange.prototype.spawnProjectile = function() {
	gEngine.AudioClips.playACue("assets/audio/click.ogg");
	var d = this.obj.getXform().getRotationInRad() + Math.PI / 2;
	var x = this.obj.getXform().getXPos(), y = this.obj.getXform().getYPos();
	var s = this.obj.getXform().getWidth() / 2;
	x += Math.cos(d) * (s + this.mProjectileSpeed * this.mAccumulator);
	y += Math.sin(d) * (s + this.mProjectileSpeed * this.mAccumulator);
	new Projectile(this.pf, x, y, d, this.mRange, this.mProjectileSpeed, this.mDamage);
};

LongRange.prototype.changeAnimationShoot = function() {
	this.obj.mTexLeft = 0.5;
	this.obj.mTexRight = 0.75;
	this.obj._setTexInfo();
};

LongRange.prototype.changeAnimationNoShoot = function() {
	this.obj.mTexLeft = 0.2535;
	this.obj.mTexRight = 0.5;
	this.obj._setTexInfo();
};

LongRange.prototype.upgrade = function() {
	if(this.mLevel >= this.maxLevel)
		return;

	switch(++this.mLevel) {
	case 1:
		this.mRange = 50;
		this.mProjectileSpeed = 55;
		this.mDamage = 12;
		break;

	case 2:
		this.mRange = 60;
		this.mProjectileSpeed = 60;
		this.mDamage = 15;
		break;

	case 3:
		this.mRange = 70;
		this.mProjectileSpeed = 65;
		this.mDamage = 18;
		this.mFireRate = 2.5;
		break;

	case 4:
		this.mRange = 75;
		this.mProjectileSpeed = 70;
		this.mDamage = 22;
		this.mFireRate = 3;
		break;

	case 5:
		this.mRange = 80;
		this.mProjectileSpeed = 75;
		this.mDamage = 30;
		this.mFireRate = 3.5;
		break;
	}
	this.mIndicator.getXform().setSize(this.mRange * 2, this.mRange * 2);
}
