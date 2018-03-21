/*
* Button.js
* 
*/

"use strict";

function Button(spriteTexture) {

	this.kYPos = -10;
	this.kXPos = 30;

	this.kWidth = 40;
	this.kHeight = 20;

	this.kMaxWidth = 50;

	this.mButton = new TextureRenderable(spriteTexture);
	this.mButton.setColor([1, 1, 1, 0]);
    this.mButton.getXform().setPosition(this.kXPos, this.kYPos);
    this.mButton.getXform().setSize(this.kWidth, this.kHeight);

	GameObject.call(this, this.mButton);

	this.mIncSize = false;
};
gEngine.Core.inheritPrototype(Button, GameObject);

Button.prototype.update = function(mousePos) {

	// when mouse position is over Button, oscillate button size
	if (this.hovering(mousePos)) {
		// oscillate size while hovering on button
		if (this.mIncSize) {
			this.mButton.getXform().incWidthBy(0.5);
			this.mButton.getXform().incHeightBy(0.25);
		} else {
			this.mButton.getXform().incWidthBy(-0.5);
			this.mButton.getXform().incHeightBy(-0.25);
		}

		if (this.mButton.getXform().getWidth() > this.kMaxWidth) {
			this.mIncSize = false;
		}

		if (this.mButton.getXform().getWidth() < this.kWidth) {
			this.mIncSize = true;
		}

		// left click on Button
		if (gEngine.Input.isButtonPressed(0)) {
			gEngine.GameLoop.stop();
		}
	}
};

Button.prototype.hovering = function(mousePos) {
	var result = mousePos[0] <= (this.kXPos + (this.kWidth / 2)) && mousePos[0] >= (this.kXPos - (this.kWidth / 2));
	result = result && mousePos[1] <= (this.kYPos + (this.kHeight / 2)) && mousePos[1] >= (this.kYPos - (this.kHeight / 2));
	return result;
}

/*
Button.prototype.draw = function() {

};
*/