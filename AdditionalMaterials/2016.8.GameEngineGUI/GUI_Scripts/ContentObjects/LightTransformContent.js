
function LightTransformContent(tabContentID, style, title) {
	this.lightNameText = null;
	this.lightName = null;
	this.lightXYZ = null;
	this.lightX = null;
	this.lightY = null;
	this.lightZ = null;
	this.lightDirectionText = null;
	this.lightDirX = null;
	this.lightDirY = null;
	this.lightDirZ = null;
	
	this.lightFarText = null;
	this.lightFar = null;
	this.lightNearText = null;
	this.lightNear = null;
	
	this.lightInnerText = null;
	this.lightOuterText = null;
	this.lightInner = null;
	this.lightOuter = null;
	
	this.lightIntensityText = null;
	this.lightIntensity = null;
	
	this.lightDropoffText = null;
	this.lightDropoff = null;
	
	this.lightTypeText = null;
	this.lightType = null;
	
	this.lightOnText = null;
	this.lightOn = null;
	
	this.lightCastShadowText = null;
	this.lightCastShadow = null;
	
	GuiTabContent.call(this, tabContentID, style, title);
}

gGuiBase.View.inheritPrototype(LightTransformContent, GuiTabContent);

LightTransformContent.prototype.initialize = function () {
	
	var textStyle = 'margin-left: 10px; margin-top: 4px';
	var textFieldStyle = 'width: 90%; margin-left: 10px';
	
	this.lightNameText = new Text("lightNameText", textStyle, "Name");
	this.lightName = new TextField("lightNameField", textFieldStyle, "Light0");
	this.lightXYZ = new Text("lightXYText", textStyle, "X / Y / Z");
	this.lightX = new TextField("lightXField", textFieldStyle, "20");
	this.lightY = new TextField("lightYField", textFieldStyle, "60");
	this.lightZ = new TextField("lightZField", textFieldStyle, "5");
	
	this.lightTypeText = new Text("lightTypeText", textStyle, "Type");
	var types = ["Point", "Directional", "Spotlight"];
	this.lightType = new DropdownList("lightTypeDropdown", textFieldStyle, types);
	
	this.lightIntensityText = new Text("lightIntensityText", textStyle, "Intensity");
	this.lightIntensity = new TextField("lightIntensityField", textFieldStyle, "1");
	
	this.lightDirectionText = new Text("lightDirText", textStyle, "Direction X / Y / Z");
	this.lightDirX = new TextField("lightXDirField", textFieldStyle, "20");
	this.lightDirY = new TextField("lightYDirField", textFieldStyle, "60");
	this.lightDirZ = new TextField("lightZDirField", textFieldStyle, "5");
	
	this.lightFarText = new Text("lightFarText", textStyle, "Far");
	this.lightFar = new TextField("lightFarField", textFieldStyle, "10");
	this.lightNearText = new Text("lightNearText", textStyle, "Near");
	this.lightNear = new TextField("lightNearField", textFieldStyle, "5");
	
	this.lightInnerText = new Text("lightInnerText", textStyle, "Inner");
	this.lightInner = new TextField("lightInnerField", textFieldStyle, "0.1");
	this.lightOuterText = new Text("lightOuterText", textStyle, "Outer");
	this.lightOuter = new TextField("lightOuterField", textFieldStyle, "0.3");
	
	this.lightDropoffText = new Text("lightDropoffText", textStyle, "Dropoff");
	this.lightDropoff = new TextField("lightDropoffField", textFieldStyle, "1");
	
	
	
	this.lightOnText = new Text("lightOnText", textStyle, "Light on/off");
	this.lightOn = new Checkbox("lightOn", textStyle);
	
	this.lightCastShadowText = new Text("lightCastShadowText", textStyle, "Cast shadow");
	this.lightCastShadow = new Checkbox("lightCastShadow", textStyle);
	
	this.addSharedWidgets();
	
	var type = this.setTypeDropdown();

	switch(type) {
		case "Point": this.addPointLightWidgets(); break;
		case "Directional": this.addDirectionalLightWidgets(); break;
		case "Spotlight": this.addSpotLightWidgets(); break;
	}
	

};

LightTransformContent.prototype.addSharedWidgets = function() {
	this.widgetList.push(this.lightNameText);
	this.widgetList.push(this.lightName);
	this.widgetList.push(this.lightXYZ);
	this.widgetList.push(this.lightX);
	this.widgetList.push(this.lightY);
	this.widgetList.push(this.lightZ);
	this.widgetList.push(this.lightIntensityText);
	this.widgetList.push(this.lightIntensity);
	this.widgetList.push(this.lightOnText);
	this.widgetList.push(this.lightOn);
	this.widgetList.push(this.lightCastShadowText);
	this.widgetList.push(this.lightCastShadow);
	this.widgetList.push(this.lightTypeText);
	this.widgetList.push(this.lightType);

};

LightTransformContent.prototype.addPointLightWidgets = function() {
	this.widgetList.push(this.lightFarText);
	this.widgetList.push(this.lightFar);
	this.widgetList.push(this.lightNearText);
	this.widgetList.push(this.lightNear);
};

LightTransformContent.prototype.addDirectionalLightWidgets = function() {
	this.widgetList.push(this.lightDirectionText);
	this.widgetList.push(this.lightDirX);
	this.widgetList.push(this.lightDirY);
	this.widgetList.push(this.lightDirZ);
};

LightTransformContent.prototype.addSpotLightWidgets = function() {
	this.widgetList.push(this.lightDirectionText);
	this.widgetList.push(this.lightDirX);
	this.widgetList.push(this.lightDirY);
	this.widgetList.push(this.lightDirZ);
	this.widgetList.push(this.lightFarText);
	this.widgetList.push(this.lightFar);
	this.widgetList.push(this.lightNearText);
	this.widgetList.push(this.lightNear);
	this.widgetList.push(this.lightInnerText);
	this.widgetList.push(this.lightInner);
	this.widgetList.push(this.lightOuterText);
	this.widgetList.push(this.lightOuter);
	this.widgetList.push(this.lightDropoffText);
	this.widgetList.push(this.lightDropoff);
};

LightTransformContent.prototype.initializeEventHandling = function () {
	this.lightName.setOnFocusOut(this.onTextFieldFocusOut);
	this.lightX.setOnFocusOut(this.onTextFieldFocusOut);
	this.lightY.setOnFocusOut(this.onTextFieldFocusOut);
	this.lightZ.setOnFocusOut(this.onTextFieldFocusOut);
	this.lightDirX.setOnFocusOut(this.onTextFieldFocusOut);
	this.lightDirY.setOnFocusOut(this.onTextFieldFocusOut);
	this.lightDirZ.setOnFocusOut(this.onTextFieldFocusOut);
	this.lightFar.setOnFocusOut(this.onTextFieldFocusOut);
	this.lightNear.setOnFocusOut(this.onTextFieldFocusOut);
	this.lightInner.setOnFocusOut(this.onTextFieldFocusOut);
	this.lightOuter.setOnFocusOut(this.onTextFieldFocusOut);
	this.lightIntensity.setOnFocusOut(this.onTextFieldFocusOut);
	this.lightDropoff.setOnFocusOut(this.onTextFieldFocusOut);
	
	this.lightOn.setOnChecked(this.lightOnCheck);
	this.lightCastShadow.setOnChecked(this.lightCastShadowOnCheck);
	
	this.lightType.setOnSelect(this.onListSelect);
	this.setTypeDropdown();
	/*this.widgetList = [];
	this.addSharedWidgets();
	
	
	
	$(this.getID()).empty();
	$(this.getID()).append(this.getWidgetHTMLContent());
	*/
	var light = gGuiBase.Core.selectedLight;
	if (light.mIsOn) 
		$(this.lightOn.getID()).prop('checked', true);
	
	
};

LightTransformContent.prototype.onTextFieldFocusOut = function(textField) {

	var light = gGuiBase.Core.selectedLight;
	var value = textField.val();
	
	switch(textField.attr("id")) {
		case "lightNameField":
			light.mID = value;
			break;
		case "lightXField":
			light.mPosition[0] = value;
			break;
		case "lightYField":
			light.mPosition[1] = value;
			break;
		case "lightZField":
			light.mPosition[2] = value;
			break;
		case "lightXDirField":
			light.mDirection[0] = value;
			break;
		case "lightYDirField":
			light.mDirection[1] = value;
			break;
		case "lightZDirField":
			light.mDirection[2] = value;
			break;
		case "lightFarField":
			light.mFar = value;
			break;
		case "lightNearField":
			light.mNear = value;
			break;
		case "lightInnerField":
			light.mInner = value;
			break;
		case "lightOuterField":
			light.mOuter = value;
			break;
		case "lightIntensityField":
			light.mIntensity = value;
			break;
		case "lightDropoffField":
			light.mDropOff = value;
			break;
		default:
			break;
	}
};

LightTransformContent.prototype.updateFields = function( light ) {
	//update these widgets...
	// set name field
	/*this.objectName.setText( gameObject.mID );
	
	// set x form
	var xf = gameObject.getXform();
	this.objectX.setText( xf.getXPos().toFixed(2) );
	this.objectY.setText( xf.getYPos().toFixed(2) );
	// set width and height
	this.objectW.setText( xf.getWidth().toFixed(2) );
	this.objectH.setText( xf.getHeight().toFixed(2) );
	
	this.rotationField.setText(xf.getRotationInDegree().toFixed(2));
	$("#gameObjectRotationSlider").slider("value", xf.getRotationInDegree().toFixed(2));*/

	this.lightName.setText(light.mID);
	this.lightX.setText(light.mPosition[0]);
	this.lightY.setText(light.mPosition[1]);
	this.lightZ.setText(light.mPosition[2]);

	this.lightDirX.setText(light.mDirection[0]);
	this.lightDirY.setText(light.mDirection[1]);
	this.lightDirZ.setText(light.mDirection[2]);
	
	this.lightFar.setText(light.mFar);
	this.lightNear.setText(light.mNear);
	
	this.lightInner.setText(light.mInner);
	this.lightOuter.setText(light.mOuter);

	this.lightIntensity.setText(light.mIntensity);

	this.lightDropoff.setText(light.mDropOff);
	
	

	//this.lightType = null;

};

LightTransformContent.prototype.setTypeDropdown = function() {
	var light = gGuiBase.Core.selectedLight;
	var type;
	switch (light.mLightType) {
		case Light.eLightType.ePointLight: 
			type = "Point"; 
			break;
		case Light.eLightType.eDirectionalLight: 
			type = "Directional"; 
			break;
		case Light.eLightType.eSpotLight:
			type = "Spotlight";
			break;
		default: console.log("Invalid light type");
	}

	$('#lightTypeDropdown').val(type);
	return type;
};

LightTransformContent.prototype.onListSelect = function(value) {
	var light = gGuiBase.Core.selectedLight;
	var content = gGuiBase.View.findTabContentByID("#LightTransformContent");
	var type = content.getDropdownTexName();

	switch(type) {
		case "Point": 
			light.mLightType = Light.eLightType.ePointLight;
			content.widgetList = [];
			content.addSharedWidgets();
			content.addPointLightWidgets();
			break;
		case "Directional": 
			light.mLightType = Light.eLightType.eDirectionalLight; 
			content.widgetList = [];
			content.addSharedWidgets();
			content.addDirectionalLightWidgets();
			break;
		case "Spotlight": 
			light.mLightType = Light.eLightType.eSpotLight; 
			content.widgetList = [];
			content.addSharedWidgets();
			content.addSpotLightWidgets();
			break;
	}
	$(content.getID()).empty();
	$(content.getID()).append(content.getWidgetHTMLContent());
	content.initializeEventHandling();
};

LightTransformContent.prototype.getDropdownTexName = function() {
	return this.lightType.getSelectedListItem();
};

LightTransformContent.prototype.lightOnCheck = function(checked) {
	var light = gGuiBase.Core.selectedLight;
	light.mIsOn = checked;
};

LightTransformContent.prototype.lightCastShadowOnCheck = function(checked) {
	var light = gGuiBase.Core.selectedLight;
	light.mCastShadow = checked;
};



