"use strict";

function Minimap(playfieldCamRef) {
	this.pf = playfieldCamRef;
	
	this.cam = new Camera(
		this.pf.getWCCenter(),
		this.pf.getWCWidth(),
		[0, 0, 266, 200]);
	this.cam.setBackgroundColor([1, 0.8, 0.8, 1]);
};
