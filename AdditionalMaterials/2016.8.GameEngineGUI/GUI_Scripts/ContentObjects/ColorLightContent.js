
function ColorLightContent(tabContentID, style, title) {
	this.colorText = null;
	this.colorField = null;
	
	GuiTabContent.call(this, tabContentID, style, title);
}

gGuiBase.View.inheritPrototype(ColorLightContent, GuiTabContent);

ColorLightContent.prototype.initialize = function () {
	
	var textStyle = 'margin-left: 5%; margin-top: 4px';
	var textFieldStyle = 'width: 90%; margin-left: 10px';
	
	this.colorText = new Text("colorText", textStyle, "Color");
	this.colorField = new TextField("colorTextField", textFieldStyle, "...");
	
	this.widgetList.push(this.colorText);
	this.widgetList.push(this.colorField);
};

ColorLightContent.prototype.initializeEventHandling = function () {
	
	$('#colorTextField').colorpicker({format:'rgba'});
	this.colorField.setOnFocusOut(this.onFocusOut);
	
	var light = gGuiBase.Core.selectedLight;
	var oldColor = light.mColor;
	var newColor = [oldColor[0] * 255, oldColor[1] * 255, oldColor[2] * 255, oldColor[3]];
	$(this.colorField.getID()).val("rgba(" + newColor + ")");
	
};

ColorLightContent.prototype.onFocusOut = function(textField) {
	var light = gGuiBase.Core.selectedLight;
	var value = textField.val();
	
	var enteredColor = gGuiBase.View.colorStringToRGBA(value);
	light.mColor = enteredColor;
};




