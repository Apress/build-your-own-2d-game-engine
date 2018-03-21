/*
* PlayAgain.js
* 
*/

"use strict";

function PlayAgain(spriteTexture) {
	
	Button.call(this, spriteTexture);

	this.mPlayAgain = new FontRenderable("Play Again");
	this.mPlayAgain.setColor([0, 0, 0, 1]);
	this.mPlayAgain.getXform().setPosition(20, -10);
	this.mPlayAgain.setTextHeight(4);
}
gEngine.Core.inheritPrototype(PlayAgain, Button);

/*
PlayAgain.prototype.update = function() {

};
*/

PlayAgain.prototype.draw = function(camera) {
	Button.prototype.draw.call(this, camera);

	this.mPlayAgain.draw(camera);
};
