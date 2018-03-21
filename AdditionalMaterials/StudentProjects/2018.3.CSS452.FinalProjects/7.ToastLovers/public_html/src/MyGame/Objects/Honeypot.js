"use strict";

function Honeypot(pf, pos) {
	Tower.call(this, pf, "assets/honeypot.png", pos);
	this.mName = "Honeypot";
	this.mHealth = 20;
	this.baseHealth = 20;
	this.mCost = 2;
	this.obj.mElmWidth = 0.25;
	this.obj.mNumElems = 4;
	this.obj._initAnimation();
}
gEngine.Core.inheritPrototype(Honeypot, Tower);

Honeypot.prototype.update = function(dt) {
	if(!this.mPhysicsEnabled)
		this.obj.updateAnimation(dt);

	Tower.prototype.update.call(this, dt);
};
