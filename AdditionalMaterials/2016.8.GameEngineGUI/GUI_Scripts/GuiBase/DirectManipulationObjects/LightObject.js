function LightObject(light) {
	this.lightRef = light;
	this.mSelector = new DragSelector("assets/lighticon.png", light);
	this.drawSelection = false;
	
	var xPos = this.lightRef.mPosition[0];
	var yPos = this.lightRef.mPosition[1];

	this.isVerticle = true;
	this.mNearControl = new ControlArm(xPos, yPos, this.lightRef.mNear);
	this.mNearControl.setSquareColor([0,1,0,1]);

	this.mFarControl = new ControlArm(xPos, yPos, -this.lightRef.mFar); // otherside so wont collide with outer controls
	this.mFarControl.setSquareColor([1,0,1,1]);

	this.mOuterControl = new ControlArm(xPos, yPos, this.lightRef.mOuter, this.isVerticle);
	this.mInnerControl = new ControlArm(xPos, yPos, -this.lightRef.mInner, this.isVerticle); // otherside so wont collide with outer controls
	this.mInnerControl.setSquareColor([0,0,1,1]);
}

LightObject.prototype.mouseInIcon = function(mouseX, mouseY) {
	if (this.lightRef.mLightType === Light.eLightType.eDirectionalLight) return false;
	return this.mSelector.mouseInIcon(mouseX, mouseY);
};

LightObject.prototype.mouseInOuterSquare = function(mouseX, mouseY) {
	if (this.lightRef.mLightType !== Light.eLightType.eSpotLight) return false;
	return this.mOuterControl.mouseInControl(mouseX, mouseY);
};

LightObject.prototype.mouseInInnerSquare = function(mouseX, mouseY) {
	if (this.lightRef.mLightType !== Light.eLightType.eSpotLight) return false;
	console.log(this.mInnerControl.mouseInControl(mouseX, mouseY));
	return this.mInnerControl.mouseInControl(mouseX, mouseY);
};


LightObject.prototype.mouseInNearSquare = function(mouseX, mouseY) {
	if (this.lightRef.mLightType === Light.eLightType.eDirectionalLight) return false;
	return this.mNearControl.mouseInControl(mouseX, mouseY);
};

LightObject.prototype.mouseInFarSquare = function(mouseX, mouseY) {
	if (this.lightRef.mLightType === Light.eLightType.eDirectionalLight) return false;
	return this.mFarControl.mouseInControl(mouseX, mouseY);
};

LightObject.prototype.toggleDrawBorder = function(toggle) {
	this.drawSelection = toggle;
};

LightObject.prototype.draw = function(aCamera) {
	this.mSelector.draw(aCamera);
	var selectedObj = gGuiBase.DirectManipulationSupport.getSelected();
	if ( selectedObj == this) {
		var xPos = this.lightRef.mPosition[0];
		var yPos = this.lightRef.mPosition[1];
			// draw near control
			this.mNearControl.draw(aCamera);
			var outerLineBox = new LineBox(xPos, yPos, this.lightRef.mNear*2, this.lightRef.mNear*2);
			outerLineBox.draw(aCamera);
			// draw far control
			this.mFarControl.draw(aCamera);
			var innerLineBox = new LineBox(xPos, yPos, this.lightRef.mFar*2, this.lightRef.mFar*2);
			innerLineBox.draw(aCamera);
		if (this.lightRef.mLightType === Light.eLightType.eSpotLight) {
			// draw inner and outer controller
			this.mOuterControl.draw(aCamera);
			this.mInnerControl.draw(aCamera);
		}
	}
};

LightObject.prototype.update = function() {
	//For the initial camera drawing, the icon won't be loaded yet so load here
	var xPos = this.lightRef.mPosition[0];
	var yPos = this.lightRef.mPosition[1];

	if (this.drawSelection) {
		this.mFarControl.update(xPos, yPos, this.lightRef.mFar);
		this.mNearControl.update(xPos, yPos, -this.lightRef.mNear);
		this.mOuterControl.update(xPos, yPos, this.lightRef.mOuter);
		this.mInnerControl.update(xPos, yPos, -this.lightRef.mInner);
	}
	this.mSelector.update();
};