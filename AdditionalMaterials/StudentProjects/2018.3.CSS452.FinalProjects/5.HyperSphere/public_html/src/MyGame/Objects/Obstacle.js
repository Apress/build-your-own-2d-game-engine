/*
* Obstacle.js
* 
*/

"use strict";

function Obstacle(spriteTexture, pos) {

	this.mObstacle = new TextureRenderable(spriteTexture);
	this.mObstacle.setColor([1, 1, 1, 0]);
	this.mObstacle.getXform().setPosition(pos[0], pos[1]);
	this.mObstacle.getXform().setSize(5, 5);

	// Random Rotation
	var degrees = 360 * Math.random();
	this.mObstacle.getXform().setRotationInDegree(degrees);

	GameObject.call(this, this.mObstacle);

	this.kLifespan = 360; // number of update cycles before the obstacle disapears, 2 secs at 60 Hz

	this.kDead = false; // bool to check if the Obstacle's Lifespan has expired
}
gEngine.Core.inheritPrototype(Obstacle, GameObject);

Obstacle.prototype.update = function() {
	this.kLifespan--;
	this.kDead = this.kLifespan <= 0;
};

Obstacle.prototype.isDead = function() {
	return this.kDead;
}

// Obstacle.prototype.draw = function() { // implement this };