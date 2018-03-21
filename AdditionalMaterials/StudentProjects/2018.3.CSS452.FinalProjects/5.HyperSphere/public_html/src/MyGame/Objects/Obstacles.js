/*
* Obstacles.js
*
* A Set of Obstacles
*/

"use strict";

function Obstacles(spriteTexture, wcWidth, wcHeight) {

	this.kSpawnRate = 240; // number of update calls before spawning

	this.mSpawnCounter = this.kSpawnRate; // initialize counter to the spawnRate

	this.kSpawning = true; // bool to turn Obstacle spawning on and off

	GameObjectSet.call(this);

	this.kTexture = spriteTexture;

	this.kWCWidth = wcWidth;
	this.kWCHeight = wcHeight;

}
gEngine.Core.inheritPrototype(Obstacles, GameObjectSet);

Obstacles.prototype.update = function(mCar, mEnemyCar, mBall) {

	this.mSpawnCounter--; // decrement Spawn Counter
	if (this.mSpawnCounter <= 0 && this.kSpawning) {
		this.spawnObstacle(mCar, mEnemyCar, mBall);
		this.mSpawnCounter = this.kSpawnRate;
	}

	for (var i = 0; i < this.mSet.length; i++) {
		this.mSet[i].update();
	}

	this.mSet = this.mSet.filter(obstacle => !obstacle.isDead());

};

// Obstacles.prototype.draw = function() { // implement this };

Obstacles.prototype.spawnObstacle = function(mCar, mEnemyCar, mBall) {
	var posX = (Math.random() - 0.5) * this.kWCWidth; // generate random number for WC x position
	var posY = (Math.random() - 0.5) * this.kWCHeight; // generate random number for WC y position
        
        // Making sure obstacles don't spawn on top of the player, enemy, or the car.
        if (Math.abs(mCar.getXform().getXPos() - posX) < 5 && Math.abs(mCar.getXform().getYPos() - posY) < 5)
        {
            return;
        }
        
        if (Math.abs(mEnemyCar.getXform().getXPos() - posX) < 5 && Math.abs(mEnemyCar.getXform().getYPos() - posY) < 5)
        {
            return;
        }
        
        if (Math.abs(mBall.getXform().getXPos() - posX) < 5 && Math.abs(mBall.getXform().getYPos() - posY) < 5)
        {
            return;
        }

	var obstacle = new Obstacle(this.kTexture, [posX, posY]);

	this.addToSet(obstacle); // create new Obstacle, add to set
}

Obstacles.prototype.incSpawnRate = function() {
	this.kSpawnRate += 60; // num update calls between spawns, increases time by 1 sec at 60 Hz
}

Obstacles.prototype.decSpawnRate = function() {
	this.kSpawnRate -= 60; // num update calls between spawns, decreases time by 1 sec at 60 Hz
}

Obstacles.prototype.toggleSpawning = function () {
	this.kSpawning = !this.kSpawning;
}


Obstacles.prototype.collide = function(obj) {
	for (var i = 0; i < this.mSet.length; i++) {
		if (obj.getBBox().intersectsBound(this.mSet[i].getBBox())) {
			obj.getRigidBody().flipVelocity();
			obj.update();
		}
	}
}
