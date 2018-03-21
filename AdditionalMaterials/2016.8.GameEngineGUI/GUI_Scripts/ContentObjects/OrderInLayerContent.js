
function OrderInLayerContent(tabContentID, style, title) {
	this.layerText = null;
	this.layerField = null;
	this.moveToFrontButton = null;

	GuiTabContent.call(this, tabContentID, style, title);
}

gGuiBase.View.inheritPrototype(OrderInLayerContent, GuiTabContent);

OrderInLayerContent.prototype.initialize = function () {
	var gameObject = gGuiBase.Core.selectedGameObject;
	var textStyle = 'margin-left: 5%; margin-top: 4px';
	var textFieldStyle = 'width: 90%; margin-left: 10px';
	
	this.layerText = new Text("layerText", textStyle, "Position in layer");
	this.layerField = new TextField("layerTextField", textFieldStyle, gameObject.mOrderInLayer);
	
	this.moveToFrontButton = new Button("frontButton", GuiTabContent.NO_STYLE, "Move to front");
	this.widgetList.push(this.layerText);
	this.widgetList.push(this.layerField);

	this.widgetList.push(this.moveToFrontButton);
};

OrderInLayerContent.prototype.initializeEventHandling = function () {
	
	this.layerField.setOnFocusOut(this.onFocusOut);
	this.moveToFrontButton.setOnClick(this.onButtonClick);
	
};

OrderInLayerContent.prototype.onFocusOut = function(textField) {
	var gameObject = gGuiBase.Core.selectedGameObject;
	var value = textField.val();
	
	//If string is a positive number
	if (value >>> 0 === parseFloat(value)) {
		gameObject.mOrderInLayer = value;
		gGuiBase.SceneSupport.gCurrentScene.sortInstanceListByOrder();
		
		//Refresh instances
		gGuiBase.Core.updateInstanceSelectList();
		var instancesTab = gGuiBase.View.findTabByID("#Instances");
		instancesTab.refreshContent();
		
	} else {
		//Reset
		textField.val(gameObject.mOrderInLayer);
	}
};

OrderInLayerContent.prototype.onButtonClick = function() {
	var gameObject = gGuiBase.Core.selectedGameObject;
	gameObject.mOrderInLayer = 0;
	$("#layerTextField").val(0);
	gGuiBase.SceneSupport.gCurrentScene.sortInstanceListByOrder();
	
	gGuiBase.Core.updateInstanceSelectList();
	var instancesTab = gGuiBase.View.findTabByID("#Instances");
	instancesTab.refreshContent();
};

