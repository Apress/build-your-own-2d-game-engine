
function SelectionObject(x, y, w, h) {
	var camera = gGuiBase.SceneSupport.gCurrentScene.getSceneCamera();
	var camW = camera.getWCWidth();
	this.boxSize = camW / 50 * 0.75;
	
	this.mTopLine = new LineRenderable((x-w/2), (y+h/2), (x+w/2), (y+h/2));
	this.mTopLine.setColor([1, 1, 1, 1]);
	this.mLeftLine = new LineRenderable((x-w/2), (y+h/2), (x-w/2), (y-h/2));
	this.mLeftLine.setColor([1,1,1,1]);
	this.mRightLine = new LineRenderable((x+w/2), (y+h/2), (x+w/2), (y-h/2));
	this.mRightLine.setColor([1,1,1,1]);
	this.mBotLine = new LineRenderable((x-w/2), (y-h/2), (x+w/2), (y-h/2));
	this.mBotLine.setColor([1, 1, 1, 1]);
	
	this.mTL = new Renderable();
	this.mTL.setColor([0, 0, 1, 1]);
	var xform = this.mTL.getXform();
	xform.setXPos((x-w/2) + this.boxSize/2);
	xform.setYPos((y+h/2) - this.boxSize/2);
	xform.setWidth(this.boxSize);
	xform.setHeight(this.boxSize);
	
	this.mBL = new Renderable();
	this.mBL.setColor([0, 0, 1, 1]);
	var xform = this.mBL.getXform();
	xform.setXPos((x-w/2) + this.boxSize/2);
	xform.setYPos((y-h/2) + this.boxSize/2);
	xform.setWidth(this.boxSize);
	xform.setHeight(this.boxSize);
	
	this.mTR = new Renderable();
	this.mTR.setColor([0, 0, 1, 1]);
	var xform = this.mTR.getXform();
	xform.setXPos((x+w/2) - this.boxSize/2);
	xform.setYPos((y+h/2) - this.boxSize/2);
	xform.setWidth(this.boxSize);
	xform.setHeight(this.boxSize);
	
	this.mBR = new Renderable();
	this.mBR.setColor([0, 0, 1, 1]);
	var xform = this.mBR.getXform();
	xform.setXPos((x+w/2) - this.boxSize/2);
	xform.setYPos((y-h/2) + this.boxSize/2);
	xform.setWidth(this.boxSize);
	xform.setHeight(this.boxSize);
	
	this.topLeftX = 0;
	this.topLeftY = 0;
	this.topRightX = 0;
	this.topRightY = 0;
	this.botLeftX = 0;
	this.botLeftY = 0;
	this.botRightX = 0;
	this.botRightY = 0;
	
	
}

SelectionObject.prototype.draw = function(aCamera) {
	this.mTopLine.draw(aCamera);
	this.mBotLine.draw(aCamera);
	this.mLeftLine.draw(aCamera);
	this.mRightLine.draw(aCamera);
	
	this.mTL.draw(aCamera);
	this.mBL.draw(aCamera);
	this.mTR.draw(aCamera);
	this.mBR.draw(aCamera);
};

SelectionObject.prototype.update = function() {
	var xform = gGuiBase.Core.selectedGameObject.getXform();
	var x = xform.getXPos();
	var y = xform.getYPos();
	var w = xform.getWidth();
	var h = xform.getHeight();
	var r = xform.getRotationInRad();
	
	var radius = Math.sqrt((w/2)*(w/2) + (h/2)*(h/2));

	var angleToTopRight = Math.atan2(h/2, w/2)
	var angleToTopLeft = Math.PI - angleToTopRight;
	var angleToBotLeft = Math.PI + angleToTopRight;
	var angleToBotRight = -angleToTopRight;

	
	var camera = gGuiBase.SceneSupport.gCurrentScene.getSceneCamera();
	var camW = camera.getWCWidth();
	this.boxSize = camW / 50 * 0.75;
	
	//Treating the square as a circle, find the four corner points
	this.topLeftX = Math.cos(r + (angleToTopLeft)) * radius + x;
	this.topLeftY = Math.sin(r + (angleToTopLeft)) * radius + y;
	
	this.topRightX = Math.cos(r + angleToTopRight) * radius + x;
	this.topRightY = Math.sin(r + angleToTopRight) * radius + y;
	
	this.botLeftX = Math.cos(r + (angleToBotLeft)) * radius + x;
	this.botLeftY = Math.sin(r + (angleToBotLeft)) * radius + y;
	
	this.botRightX = Math.cos(r + (angleToBotRight)) * radius + x;
	this.botRightY = Math.sin(r + (angleToBotRight)) * radius + y;
	
	this.mTopLine.setFirstVertex(this.topRightX, this.topRightY);
	this.mTopLine.setSecondVertex(this.topLeftX, this.topLeftY);

	this.mLeftLine.setFirstVertex(this.topLeftX, this.topLeftY);
	this.mLeftLine.setSecondVertex(this.botLeftX, this.botLeftY);
	
	this.mRightLine.setFirstVertex(this.topRightX, this.topRightY);
	this.mRightLine.setSecondVertex(this.botRightX, this.botRightY);
	
	this.mBotLine.setFirstVertex(this.botLeftX, this.botLeftY);
	this.mBotLine.setSecondVertex(this.botRightX, this.botRightY);
	
	var xform = this.mTL.getXform();
	xform.setXPos(this.topLeftX);
	xform.setYPos(this.topLeftY);
	xform.setWidth(this.boxSize);
	xform.setHeight(this.boxSize);
	
	var xform = this.mBL.getXform();
	xform.setXPos(this.botLeftX);
	xform.setYPos(this.botLeftY);
	xform.setWidth(this.boxSize);
	xform.setHeight(this.boxSize);
	
	var xform = this.mTR.getXform();
	xform.setXPos(this.topRightX);
	xform.setYPos(this.topRightY);
	xform.setWidth(this.boxSize);
	xform.setHeight(this.boxSize);

	var xform = this.mBR.getXform();
	xform.setXPos(this.botRightX);
	xform.setYPos(this.botRightY);
	xform.setWidth(this.boxSize);
	xform.setHeight(this.boxSize);

};

SelectionObject.prototype.mousePosOnBottomRightCorner = function(xform, mouseX, mouseY) {
	return this.mousePosOnCorner(this.botRightX, this.botRightY, xform, mouseX, mouseY);
};

SelectionObject.prototype.mousePosOnBottomLeftCorner = function(xform, mouseX, mouseY) {
	return this.mousePosOnCorner(this.botLeftX, this.botLeftY, xform, mouseX, mouseY);
};

SelectionObject.prototype.mousePosOnTopLeftCorner = function(xform, mouseX, mouseY) {
	return this.mousePosOnCorner(this.topLeftX, this.topLeftY, xform, mouseX, mouseY);
};

SelectionObject.prototype.mousePosOnTopRightCorner = function(xform, mouseX, mouseY) {
	return this.mousePosOnCorner(this.topRightX, this.topRightY, xform, mouseX, mouseY);
};

SelectionObject.prototype.mousePosOnCorner = function(selectObjectX, selectObjectY, xform, mouseX, mouseY) {

	var x = xform.getXPos();
	var y = xform.getYPos();
	var r = xform.getRotationInRad();

	var point = vec2.fromValues(selectObjectX, selectObjectY);
	var mousePos = vec2.fromValues(mouseX, mouseY);
	
	//Apply inverse rotation to fit the object & mouse position to the x/y axis
	mousePos = gGuiBase.DirectManipulationSupport.rotatePoint(x, y, -r, mousePos);
	point = gGuiBase.DirectManipulationSupport.rotatePoint(x, y, -r, point);
	var edge = vec2.fromValues(point[0] - this.boxSize, point[1] + this.boxSize);
	var edge2 = vec2.fromValues(point[0] + this.boxSize, point[1] - this.boxSize);

	
	if ((mousePos[0] > (edge[0])) && (mousePos[0] < (edge2[0])) &&
		(mousePos[1] < (edge[1])) && (mousePos[1] > (edge2[1]))) {
		return true;
	}
	return false;
};

