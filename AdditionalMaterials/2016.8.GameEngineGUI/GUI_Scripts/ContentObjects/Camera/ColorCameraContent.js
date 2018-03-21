
function ColorCameraContent(tabContentID, style, title) {
	this.colorText = null;
	this.colorField = null;
	
	GuiTabContent.call(this, tabContentID, style, title);
}

gGuiBase.View.inheritPrototype(ColorCameraContent, GuiTabContent);

ColorCameraContent.prototype.initialize = function () {
	
	var textStyle = 'margin-left: 5%; margin-top: 4px';
	var textFieldStyle = 'width: 90%; margin-left: 10px';
	
	this.colorText = new Text("colorText", textStyle, "Color");
	this.colorField = new TextField("colorTextField", textFieldStyle, "...");
	
	this.widgetList.push(this.colorText);
	this.widgetList.push(this.colorField);
};

ColorCameraContent.prototype.initializeEventHandling = function () {
	
	$('#colorTextField').colorpicker({format:'rgba'});
	this.colorField.setOnFocusOut(this.onFocusOut);
	
	var camera = gGuiBase.Core.selectedCamera;
	var oldColor = camera.getBackgroundColor();
	var newColor = [oldColor[0] * 255, oldColor[1] * 255, oldColor[2] * 255, oldColor[3]];
	$(this.colorField.getID()).val("rgba(" + newColor + ")");
	
};

ColorCameraContent.prototype.onFocusOut = function(textField) {
	var camera = gGuiBase.Core.selectedCamera;
	var value = textField.val();
	
	var enteredColor = gGuiBase.View.colorStringToRGBA(value);
	camera.setBackgroundColor(enteredColor);
};




