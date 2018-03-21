/*
* BallLight.js
* 
*/

"use strict";

function BallLight() {
	this.mBallLight = new Light();
    this.mBallLight.setLightType(Light.eLightType.ePointLight);
    this.mBallLight.setXPos(0); // x
    this.mBallLight.setYPos(0); // y
    this.mBallLight.setZPos(5); // z
    this.mBallLight.setNear(5); // near
    this.mBallLight.setFar(10); // far
    this.mBallLight.setIntensity(2.8); // intensity

}

BallLight.prototype.getLight = function() {
	return this.mBallLight;
}

BallLight.prototype.update = function(ballXform) {
	var pos = ballXform.getPosition();

	this.mBallLight.setXPos(pos[0]);
	this.mBallLight.setYPos(pos[1]);
}