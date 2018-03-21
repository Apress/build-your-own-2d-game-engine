/*
* Headlight.js
* 
*/

"use strict";

function Headlight() {
	this.mHeadlight = new Light();
    this.mHeadlight.setLightType(Light.eLightType.eSpotLight);
    this.mHeadlight.setXPos(0);
    this.mHeadlight.setYPos(10);
    this.mHeadlight.setZPos(5);
    this.mHeadlight.setDirection([-0.7, -1, -1]);
    this.mHeadlight.setNear(5);
    this.mHeadlight.setFar(20);
    this.mHeadlight.setInner(1.7);
    this.mHeadlight.setOuter(1.8);
    this.mHeadlight.setIntensity(2);
    this.mHeadlight.setDropOff(1.2);
}

Headlight.prototype.getLight = function() {
	return this.mHeadlight;
}

Headlight.prototype.update = function(carXform) {

	var pos = carXform.getPosition();

	this.mHeadlight.setXPos(pos[0]);
	this.mHeadlight.setYPos(pos[1]);

	var rotation = carXform.getRotationInRad();

	var xDir = Math.cos(rotation - (Math.PI / 2)); // 9th grade math finally has it's uses
	var yDir = Math.sin(rotation - (Math.PI / 2));
	this.mHeadlight.setDirection([xDir, yDir, -1]); // -1 z points into the screen

}