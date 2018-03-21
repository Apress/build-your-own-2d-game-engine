function RotationObject(x, y, w, h, r) {
	var radius = Math.sqrt((w*w) + (h*h)) / 2;
	var endPointX = Math.cos(r) * radius;
	var endPointY = Math.sin(r) * radius;
	this.mRotationLine = new LineRenderable(x, y, endPointX, endPointY);
	this.mRotationLine.setColor([1, 1, 1, 1]);
	
	var camera = gGuiBase.SceneSupport.gCurrentScene.getSceneCamera();
	var camW = camera.getWCWidth();
	var boxSize = camW / 50 * 0.75;
	
	this.mRotationSquare = new Renderable();
	var xform = this.mRotationSquare.getXform();
	xform.setXPos(endPointX + x);
	xform.setYPos(endPointY + y);
	xform.setWidth(boxSize);
	xform.setHeight(boxSize);
	this.mRotationSquare.setColor([1, 0, 0, 1]);
}

RotationObject.prototype.draw = function(aCamera) {
	this.mRotationLine.draw(aCamera);
	this.mRotationSquare.draw(aCamera);
};

RotationObject.prototype.update = function() {
	var xform = gGuiBase.Core.selectedGameObject.getXform();
	var x = xform.getXPos();
	var y = xform.getYPos();
	var w = xform.getWidth();
	var h = xform.getHeight();
	var r = xform.getRotationInRad();
	
	var camera = gGuiBase.SceneSupport.gCurrentScene.getSceneCamera();
	var camW = camera.getWCWidth();
	var boxSize = camW / 50 * 0.75;
	
	var radius = Math.sqrt((w*w) + (h*h)) / 2;
	var endPointX = Math.cos(r) * radius;
	var endPointY = Math.sin(r) * radius;
	
	this.mRotationLine.setFirstVertex(x, y);
	this.mRotationLine.setSecondVertex(x + endPointX, y + endPointY);
	
	var xform = this.mRotationSquare.getXform();
	xform.setXPos(endPointX + x);
	xform.setYPos(endPointY + y);
	xform.setWidth(boxSize);
	xform.setHeight(boxSize);
};