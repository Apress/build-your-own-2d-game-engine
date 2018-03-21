/*
* Boosters.js
* 
* A Set of Booster
*/

"use strict";

function Boosters(spriteTexture, wcWidth, wcHeight) {
	
	this.kSpawnRate = 360; // number of update calls before spawning

	this.mSpawnCounter = this.kSpawnRate; // initialize counter to the spawnRate

	this.kSpawning = true; // bool to turn Booster spawning on and off

	GameObjectSet.call(this);

	this.kTexture = spriteTexture;

	this.kWCWidth = wcWidth;
	this.kWCHeight = wcHeight;

}
gEngine.Core.inheritPrototype(Boosters, GameObjectSet);

Boosters.prototype.update = function() {
	this.mSpawnCounter--; // decrement Spawn Counter
	if (this.mSpawnCounter <= 0 && this.kSpawning) {
		this.spawnBooster();
		this.mSpawnCounter = this.kSpawnRate;
	}

	for (var i = 0; i < this.mSet.length; i++) {
		this.mSet[i].update();
	}

	this.mSet = this.mSet.filter(booster => !booster.isDead());
};

Boosters.prototype.spawnBooster = function() {
	var posX = (Math.random() - 0.5) * this.kWCWidth; // generate random number for WC x position
	var posY = (Math.random() - 0.5) * this.kWCHeight; // generate random number for WC y position

	var booster = new Booster(this.kTexture, [posX, posY]);

	this.addToSet(booster); // create new Booster, add to set
}

Boosters.prototype.toggleSpawning = function() {
	this.kSpawning = !this.kSpawning;
};

Boosters.prototype.collide = function(obj) {
	for (var i = 0; i < this.mSet.length; i++) {
		if (obj.pixelTouches(this.mSet[i], [0, 0])) {
			obj.pickUpBooster(this.mSet[i]);
			this.mSet.splice(i - 1, 1); // remove Booster from set of randomly spawned boosters

			// inventory should be a part of HeroCar.js and EnemyCar.js; then update EnemyCar AI to use Boosters
			// add Booster to obj inventory
		}
	}
};

Boosters.prototype.collideBall = function(ball) {
	// kill the Booster when it collides with the Ball
	for (var i = 0; i < this.mSet.length; i++) {
		if (ball.getBBox().intersectsBound(this.mSet[i].getBBox())) {
			this.mSet[i].use(); // essentially kills the Booster
		}
	}
}