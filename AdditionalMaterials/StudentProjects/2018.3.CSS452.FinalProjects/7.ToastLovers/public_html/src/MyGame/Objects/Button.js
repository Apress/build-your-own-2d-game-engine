"use strict";

function Button(pf, center, w, h, renderable, hotkey, outlined = true) {  
	Node.call(this, pf, center, w, h);
	this.drawOutline = outlined;
	this.image = renderable;
	this.image.getXform().setPosition(center[0], center[1]);
	this.image.getXform().setSize(w, h);

	this.buttonHotkey = hotkey;
}
gEngine.Core.inheritPrototype(Button, Node);

Button.prototype.checkButton = function(mouseWCX, mouseWCY) {
	if(mouseWCX !== null && gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left))
		if(mouseWCX >= this.minX() && mouseWCX <= this.maxX() && mouseWCY >= this.minY() && mouseWCY <= this.maxY())
			return true;

	if(gEngine.Input.isKeyClicked(this.buttonHotkey))
		return true;
};

Button.prototype.draw = function(cam) {
	Node.prototype.draw.call(this, cam);
	this.image.draw(cam);
};
