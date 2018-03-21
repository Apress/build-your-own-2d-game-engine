/*
* StartButton.js
* 
*/

"use strict";

function StartButton(spriteTexture) {

	Button.call(this, spriteTexture);

	this.mStartText = new FontRenderable("Start");
	this.mStartText.setColor([0, 0, 0, 1]);
	this.mStartText.getXform().setPosition(25, -10);
	this.mStartText.setTextHeight(4);

};
gEngine.Core.inheritPrototype(StartButton, Button);

/*
StartButton.prototype.update = function() {

	// click on Start Button, gEngine.GameLoop.stop();
};
*/

StartButton.prototype.draw = function(camera) {


	Button.prototype.draw.call(this, camera);

	this.mStartText.draw(camera);
};
