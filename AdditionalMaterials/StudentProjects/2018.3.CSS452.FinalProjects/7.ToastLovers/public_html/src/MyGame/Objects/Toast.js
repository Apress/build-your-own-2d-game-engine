"use strict";

function Toast(pf, pos) {
	Tower.call(this, pf, "assets/toast.png", pos);
	this.imageIndex = 0;
	this.obj.mTexRight = 0.125;
	this.obj._setTexInfo();
	this.mName = "Toast";
	this.mCost = 0;
	this.mHealth = 100;
	this.baseHealth = 100;
	this.mHealthThreshold = 87.5;
}
gEngine.Core.inheritPrototype(Toast, Tower);

Toast.prototype.update = function(dt) {
	Tower.prototype.update.call(this, dt);
	this.updateImage();
}

Toast.prototype.updateImage = function(dt) {
	if(this.mHealth < this.mHealthThreshold && this.imageIndex <= 7){
		++(this.imageIndex);
		this.obj.mTexRight = 0.125 * (this.imageIndex + 1);
		this.obj.mTexLeft = 0.125 * this.imageIndex;
		this.obj._setTexInfo();
		this.mHealthThreshold -= 12.5
	}
}
