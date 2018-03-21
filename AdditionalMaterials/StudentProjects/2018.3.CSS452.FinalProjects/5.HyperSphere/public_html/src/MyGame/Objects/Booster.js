/*
* Booster.js
* 
*/

"use strict";

function Booster(spriteTexture, pos) {
	
	this.mBooster = new TextureRenderable(spriteTexture);
	this.mBooster.setColor([1, 1, 1, 0]);
	this.mBooster.getXform().setPosition(pos[0], pos[1]);
	this.mBooster.getXform().setSize(4, 2);

	GameObject.call(this, this.mBooster);

	this.kLifespan = 360; // number of update cycles before the booster disapears, 2 secs at 60 Hz

	this.kDead = false; // bool to check if the Booster's Lifespan has expired

	this.kInInventory = false; // bool to indicate that a Car has picked up the Booster

	this.mRigidBody = null;

}
gEngine.Core.inheritPrototype(Booster, GameObject);

Booster.prototype.update = function() {
	if (!this.kInInventory) {
		this.kLifespan--;
		this.kDead = this.kLifespan <= 0;
	}
};

Booster.prototype.pickUp = function() {
	this.kInInventory = true;
};

Booster.prototype.use = function() {
	this.kDead = true;
	this.kInInventory = false;
}

Booster.prototype.isDead = function() {
	return this.kDead;
}

// Booster.prototype.draw = function() { // implement this };