"use strict";

function Obstacle(pf, pos) {
	Tower.call(this, pf, "assets/boulder.png", pos);
	this.mName = "Obstacle";
	this.mWeight = 20;
	this.mCost = 0;
	this.mHealth = 100;
	this.baseHealth = 100;
}
gEngine.Core.inheritPrototype(Obstacle, Tower);
