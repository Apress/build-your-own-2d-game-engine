function CameraObject(camera) {
	this.CAMERA_ICON_WIDTH = camera.getWCWidth() / 20;
	
	this.drawSelection = false;
	this.iconLoaded = false;
	this.cameraRef = camera;
	this.leftX = this.cameraRef.getWCCenter()[0] - this.cameraRef.getWCWidth() / 2;
	this.rightX = this.cameraRef.getWCCenter()[0] + this.cameraRef.getWCWidth() / 2;
	
	this.topY = this.cameraRef.getWCCenter()[1] + this.cameraRef.getWCHeight() / 2;
	this.botY = this.cameraRef.getWCCenter()[1] - this.cameraRef.getWCHeight() / 2;
	
	this.mTopLine = new LineRenderable(this.leftX, this.topY, this.rightX, this.topY);
	this.mTopLine.setColor([1, 1, 1, 1]);
	this.mLeftLine = new LineRenderable(this.leftX, this.topY, this.leftX, this.botY);
	this.mLeftLine.setColor([1,1,1,1]);
	this.mRightLine = new LineRenderable(this.rightX, this.topY, this.rightX, this.botY);
	this.mRightLine.setColor([1,1,1,1]);
	this.mBotLine = new LineRenderable(this.leftX, this.botY, this.rightX, this.botY);
	this.mBotLine.setColor([1, 1, 1, 1]);
	
	this.cameraIcon = null;
	
	var x = this.cameraRef.getWCCenter()[0];
	var y = this.cameraRef.getWCCenter()[1];
	
	var camera = gGuiBase.SceneSupport.gCurrentScene.getSceneCamera();
	var camW = camera.getWCWidth();
	this.boxSize = camW / 50 * 0.5;
	
	this.mTopBox = new Renderable();
	this.mTopBox.setColor([1, 1, 1, 1]);
	var xform = this.mTopBox.getXform();
	xform.setXPos(x);
	xform.setYPos(this.topY + this.boxSize/2);
	xform.setWidth(this.boxSize);
	xform.setHeight(this.boxSize);
	
	this.mBotBox = new Renderable();
	this.mBotBox.setColor([1, 1, 1, 1]);
	var xform = this.mBotBox.getXform();
	xform.setXPos(x);
	xform.setYPos(this.botY - this.boxSize/2);
	xform.setWidth(this.boxSize);
	xform.setHeight(this.boxSize);
	
	this.mLeftBox = new Renderable();
	this.mLeftBox.setColor([1, 1, 1, 1]);
	var xform = this.mLeftBox.getXform();
	xform.setXPos(this.leftX - this.boxSize/2);
	xform.setYPos(y);
	xform.setWidth(this.boxSize);
	xform.setHeight(this.boxSize);
	
	this.mRightBox = new Renderable();
	this.mRightBox.setColor([1, 1, 1, 1]);
	var xform = this.mRightBox.getXform();
	xform.setXPos(this.rightX - this.boxSize/2);
	xform.setYPos(y);
	xform.setWidth(this.boxSize);
	xform.setHeight(this.boxSize);
}

CameraObject.prototype.initializeIconRenderable = function() {
	this.cameraIcon = new TextureRenderable("assets/cameraicon.png");
	var xform = this.cameraIcon.getXform();
	xform.setXPos(this.cameraRef.getWCCenter()[0]);
	xform.setYPos(this.cameraRef.getWCCenter()[1]);
	xform.setWidth(5);
	xform.setHeight(5);
};

CameraObject.prototype.toggleDrawBorder = function(drawBorder) {
	this.drawSelection = drawBorder;
};


CameraObject.prototype.draw = function(aCamera) {
	if (this.drawSelection) {
		this.mTopBox.draw(aCamera);
		this.mBotBox.draw(aCamera);
		this.mRightBox.draw(aCamera);
		this.mLeftBox.draw(aCamera);
	}
	
	this.mTopLine.draw(aCamera);
	this.mBotLine.draw(aCamera);
	this.mLeftLine.draw(aCamera);
	this.mRightLine.draw(aCamera);
	
	if (this.cameraIcon !== null) {
		this.cameraIcon.draw(aCamera);
	}
};

CameraObject.prototype.mouseOnTopBox = function(mouseX, mouseY) {
	var xform = this.mTopBox.getXform();
	var x = xform.getXPos();
	var y = xform.getYPos();
	var width = this.boxSize;
	return gGuiBase.DirectManipulationSupport.mouseInBound(mouseX, mouseY, x, y, width);
};

CameraObject.prototype.mouseOnBotBox = function(mouseX, mouseY) {
	var xform = this.mBotBox.getXform();
	var x = xform.getXPos();
	var y = xform.getYPos();
	var width = this.boxSize;
	return gGuiBase.DirectManipulationSupport.mouseInBound(mouseX, mouseY, x, y, width);
};


CameraObject.prototype.mouseOnLeftBox = function(mouseX, mouseY) {
	var xform = this.mLeftBox.getXform();
	var x = xform.getXPos();
	var y = xform.getYPos();
	var width = this.boxSize;
	return gGuiBase.DirectManipulationSupport.mouseInBound(mouseX, mouseY, x, y, width);
};


CameraObject.prototype.mouseOnRightBox = function(mouseX, mouseY) {
	var xform = this.mRightBox.getXform();
	var x = xform.getXPos();
	var y = xform.getYPos();
	var width = this.boxSize;
	return gGuiBase.DirectManipulationSupport.mouseInBound(mouseX, mouseY, x, y, width);
};

CameraObject.prototype.update = function() {
	//For the initial camera drawing, the icon won't be loaded yet so load here
	if (!this.iconLoaded && gEngine.ResourceMap.isAssetLoaded("assets/cameraicon.png")) {
		this.initializeIconRenderable();
		this.iconLoaded = true;
	}
	
	this.leftX = this.cameraRef.getWCCenter()[0] - this.cameraRef.getWCWidth() / 2;
	this.rightX = this.cameraRef.getWCCenter()[0] + this.cameraRef.getWCWidth() / 2;
	
	this.topY = this.cameraRef.getWCCenter()[1] + this.cameraRef.getWCHeight() / 2;
	this.botY = this.cameraRef.getWCCenter()[1] - this.cameraRef.getWCHeight() / 2;
	
	if (this.mTopLine.mShader === null) {
		//Workaround to make sure we remake the object with the loaded shader
		this.mTopLine = new LineRenderable(this.leftX, this.topY, this.rightX, this.topY);
		this.mTopLine.setColor([1, 1, 1, 1]);
		this.mLeftLine = new LineRenderable(this.leftX, this.topY, this.leftX, this.botY);
		this.mLeftLine.setColor([1,1,1,1]);
		this.mRightLine = new LineRenderable(this.rightX, this.topY, this.rightX, this.botY);
		this.mRightLine.setColor([1,1,1,1]);
		this.mBotLine = new LineRenderable(this.leftX, this.botY, this.rightX, this.botY);
		this.mBotLine.setColor([1, 1, 1, 1]);
		
		var camera = gGuiBase.SceneSupport.gCurrentScene.getSceneCamera();
		var camW = camera.getWCWidth();
		this.boxSize = camW / 50 * 0.5;
		
		var x = this.cameraRef.getWCCenter()[0];
		var y = this.cameraRef.getWCCenter()[1];
		
		this.mTopBox = new Renderable();
		this.mTopBox.setColor([1, 1, 1, 1]);
		var xform = this.mTopBox.getXform();
		xform.setXPos(x);
		xform.setYPos(this.topY + this.boxSize/2);
		xform.setWidth(this.boxSize);
		xform.setHeight(this.boxSize);
		
		this.mBotBox = new Renderable();
		this.mBotBox.setColor([1, 1, 1, 1]);
		var xform = this.mBotBox.getXform();
		xform.setXPos(x);
		xform.setYPos(this.botY - this.boxSize/2);
		xform.setWidth(this.boxSize);
		xform.setHeight(this.boxSize);
		
		this.mLeftBox = new Renderable();
		this.mLeftBox.setColor([1, 1, 1, 1]);
		var xform = this.mLeftBox.getXform();
		xform.setXPos(this.leftX - this.boxSize/2);
		xform.setYPos(y);
		xform.setWidth(this.boxSize);
		xform.setHeight(this.boxSize);
		
		this.mRightBox = new Renderable();
		this.mRightBox.setColor([1, 1, 1, 1]);
		var xform = this.mRightBox.getXform();
		xform.setXPos(this.rightX - this.boxSize/2);
		xform.setYPos(y);
		xform.setWidth(this.boxSize);
		xform.setHeight(this.boxSize);
		
		
	} else {
		//Don't remake the object, just change the values (Shader is loaded)
		this.mTopLine.setFirstVertex(this.leftX, this.topY);
		this.mTopLine.setSecondVertex(this.rightX, this.topY);

		this.mLeftLine.setFirstVertex(this.leftX, this.topY);
		this.mLeftLine.setSecondVertex(this.leftX, this.botY);
		
		this.mRightLine.setFirstVertex(this.rightX, this.topY);
		this.mRightLine.setSecondVertex(this.rightX, this.botY);
		
		this.mBotLine.setFirstVertex(this.leftX, this.botY);
		this.mBotLine.setSecondVertex(this.rightX, this.botY);
		
		var camera = gGuiBase.SceneSupport.gCurrentScene.getSceneCamera();
		var camW = camera.getWCWidth();
		this.boxSize = camW / 50 * 0.5;

		var x = this.cameraRef.getWCCenter()[0];
		var y = this.cameraRef.getWCCenter()[1];
		
		var xform = this.mTopBox.getXform();
		xform.setXPos(x);
		xform.setYPos(this.topY - this.boxSize/2);
		xform.setWidth(this.boxSize);
		xform.setHeight(this.boxSize);

		var xform = this.mBotBox.getXform();
		xform.setXPos(x);
		xform.setYPos(this.botY + this.boxSize/2);
		xform.setWidth(this.boxSize);
		xform.setHeight(this.boxSize);

		var xform = this.mLeftBox.getXform();
		xform.setXPos(this.leftX + this.boxSize/2);
		xform.setYPos(y);
		xform.setWidth(this.boxSize);
		xform.setHeight(this.boxSize);
	
		var xform = this.mRightBox.getXform();
		xform.setXPos(this.rightX - this.boxSize/2);
		xform.setYPos(y);
		xform.setWidth(this.boxSize);
		xform.setHeight(this.boxSize);
	}
	
	if (this.iconLoaded) {
		this.CAMERA_ICON_WIDTH = this.cameraRef.getWCWidth() / 20;
		var xform = this.cameraIcon.getXform();
		xform.setXPos(this.cameraRef.getWCCenter()[0]);
		xform.setYPos(this.cameraRef.getWCCenter()[1]);
		xform.setWidth(this.CAMERA_ICON_WIDTH);
		xform.setHeight(this.CAMERA_ICON_WIDTH);
	}
};