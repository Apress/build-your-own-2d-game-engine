
function ColorTextureContent(tabContentID, style, title) {
	this.colorText = null;
	this.colorField = null;
	this.textureText = null;
	this.textureDropDown = null;
	this.textureButton = null;
	this.textureSelectDialog = null;
	
	this.applyLightText = null;
	this.applyLightCheckbox = null;
	
	this.normalMapText = null;
	this.normalMapDropdown = null;
	
	this.materialText = null;
	this.materialDropdown = null;

	GuiTabContent.call(this, tabContentID, style, title);
}

gGuiBase.View.inheritPrototype(ColorTextureContent, GuiTabContent);

ColorTextureContent.prototype.initialize = function () {
	
	var textStyle = 'margin-left: 5%; margin-top: 4px';
	var textFieldStyle = 'width: 90%; margin-left: 10px';
	
	this.colorText = new Text("colorText", textStyle, "Color");
	this.colorField = new TextField("colorTextField", textFieldStyle, "...");
	this.textureText = new Text("textureText", textStyle, "Texture");
	
	var textureNames = gGuiBase.TextureSupport.getTexList();
	textureNames.unshift("None");
	this.textureDropDown = new DropdownList("textureDropDown", textFieldStyle, textureNames);
	
	this.textureButton = new Button("textureButton", GuiTabContent.NO_STYLE, "Select texture");
	
	this.applyLightText = new Text("applyLightText", textStyle, "Apply lighting");
	this.applyLightCheckbox = new Checkbox("applyLightCheckbox", textStyle);
	
	this.normalMapText = new Text("textureText", textStyle, "Normal Map");
	
	var normalMaps = gGuiBase.LightSupport.getNormalNameList();
	normalMaps.unshift("None");
	this.normalMapDropdown = new DropdownList("normalMapDropDown", textFieldStyle, normalMaps);
	
	this.materialText = new Text("materialText", textStyle, "Material");
	var materials = gGuiBase.MaterialSupport.getMaterialNameList();
	this.materialDropdown = new DropdownList("matDropDown", textFieldStyle, materials);
	
	this.widgetList.push(this.colorText);
	this.widgetList.push(this.colorField);
	this.widgetList.push(this.textureText);
	this.widgetList.push(this.textureDropDown);
	this.widgetList.push(this.textureButton);
	this.widgetList.push(this.applyLightText);
	this.widgetList.push(this.applyLightCheckbox);
	this.widgetList.push(this.normalMapText);
	this.widgetList.push(this.normalMapDropdown);
	this.widgetList.push(this.materialText);
	this.widgetList.push(this.materialDropdown);
};

ColorTextureContent.prototype.initializeEventHandling = function () {
	this.textureDropDown.setOnSelect(this.onListSelect);
	this.normalMapDropdown.setOnSelect(this.onNormalMapSelect);
	this.materialDropdown.setOnSelect(this.onMaterialSelect);
	//this.normalMapDropdown.setOnSelect(this.onNormalMapSelect);
	
	var texName = this.getDropdownTexName();
	this.applyLightCheckbox.setOnChecked(this.applyLightChecked);
	
	var gameObject = gGuiBase.Core.selectedGameObject;
	var oldColor = gameObject.getRenderable().getColor();
	var newColor = [oldColor[0] * 255, oldColor[1] * 255, oldColor[2] * 255, oldColor[3]];
	$(this.colorField.getID()).val("rgba(" + newColor + ")");
	

	if (gameObject.getRenderable() instanceof LightRenderable) 
		$(this.applyLightCheckbox.getID()).prop('checked', true);
	
	if (this.applyLightCheckbox.isChecked()) {
		$('#normalMapDropDown').prop('disabled', false);
		//If we have a normal map (And therefore the renderable is an illumrenderable) allow material change
		if (this.normalMapDropdown.getSelectedListItem() !== "None") {
			$('#matDropdown').prop('disabled', false);
		} else {
			$('#matDropdown').prop('disabled', true);
		}
	} else {
		$('#normalMapDropDown').prop('disabled', true);
		$('#matDropDown').prop('disabled', true);
	}
	 
	
	
	$('#colorTextField').colorpicker({format:'rgba'});
	this.colorField.setOnFocusOut(this.onFocusOut);
	
	this.setDropdownToSelectedGO();
	this.setNormalMapDropdown();
	this.setMaterialDropdown();

	this.textureButton.setOnClick(this.onButtonClick);

};

ColorTextureContent.prototype.onFocusOut = function(textField) {
	var gameObject = gGuiBase.Core.selectedGameObject;
	var value = textField.val();
	
	var enteredColor = gGuiBase.View.colorStringToRGBA(value);
	var renderable = gameObject.getRenderable();
	renderable.setColor(enteredColor);
};

ColorTextureContent.prototype.onButtonClick = function() {
	var textureSelectDialog = new TextureSelectDialog("TextureSelectDialog", GuiTabContent.NO_STYLE);
	gGuiBase.View.findTabContentByID("#ColorTextureContent").widgetList.push(textureSelectDialog);

	gGuiBase.View.refreshAllTabContent();
	
	textureSelectDialog.initializeEventHandling();
	
	textureSelectDialog.setOnClose(gGuiBase.View.findTabContentByID("#ColorTextureContent").onDialogClose);
};

ColorTextureContent.prototype.onListSelect = function(value) {
	var gameObjectName = gGuiBase.Core.selectedGameObject.mName;
	var colorTextureContent = gGuiBase.View.findTabContentByID("#ColorTextureContent");
	var textureName = colorTextureContent.getDropdownTexName();
	if (textureName == "None") {
		gGuiBase.TextureSupport.removeTextureFromGameObject(gameObjectName);
	} else {
		gGuiBase.TextureSupport.addTextureToGameObject(gameObjectName, textureName);
	}
};

ColorTextureContent.prototype.onNormalMapSelect = function(value) {
	var gameObject = gGuiBase.Core.selectedGameObject;
	var colorTextureContent = gGuiBase.View.findTabContentByID("#ColorTextureContent");
	var textureName = colorTextureContent.getDropdownTexName();
	if (value == "None") {
		//gGuiBase.TextureSupport.removeTextureFromGameObject(gameObjectName);
		gGuiBase.LightSupport.addLightingToGameObject(gameObject.mName, textureName);
		gGuiBase.LightSupport.addLightsToInstances();
		$('#matDropDown').prop('disabled', true);
	} else {
		//gGuiBase.TextureSupport.addTextureToGameObject(gameObjectName, textureName);
		gGuiBase.LightSupport.addIlluminationToGameObject(gameObject.mName, textureName, value);
		gGuiBase.LightSupport.addLightsToInstances();
		$('#matDropDown').prop('disabled', false);
	}
};

ColorTextureContent.prototype.onMaterialSelect = function(value) {
	var gameObject = gGuiBase.Core.selectedGameObject; 
	//todo need to make sure default value's name cannot be changed
	gGuiBase.MaterialSupport.setMaterial(gameObject.mName, gGuiBase.MaterialSupport.getMaterialByID(value));
};

ColorTextureContent.prototype.onDialogClose = function() {
	
	var widgetList = gGuiBase.View.findTabContentByID("#ColorTextureContent").widgetList;
	var index;
	//Remove the dialog
	for (index = 0; index < widgetList.length; index++) {
		if (widgetList[index].widgetID === "TextureSelectDialog")
			break;
	}
	
	widgetList.splice(index, 1);

	gGuiBase.View.refreshAllTabContent();
	$(this).dialog('destroy').remove();
	gGuiBase.DirectManipulationSupport.setPreventInteraction(false);
	
	
};

ColorTextureContent.prototype.getDropdownTexName = function() {
	return this.textureDropDown.getSelectedListItem();
};

ColorTextureContent.prototype.setDropdownToSelectedGO = function() {
	var renderable = gGuiBase.Core.selectedGameObject.getRenderable();
	if (renderable instanceof TextureRenderable || renderable instanceof LightRenderable) {
		var texName = renderable.getTexture();
		$('#textureDropDown').val(texName);
	} else {
		$('#textureDropDown').val("None");
	}
};

ColorTextureContent.prototype.setNormalMapDropdown = function() {
	var renderable = gGuiBase.Core.selectedGameObject.getRenderable();
	if (renderable instanceof IllumRenderable) {
		$('#normalMapDropDown').val(renderable.mNormalMap);
		$('#matDropDown').prop('disabled', false);
	} else {
		$('#normalMapDropDown').val("None");
		$('#matDropDown').prop('disabled', true);
	}
};

ColorTextureContent.prototype.setMaterialDropdown = function() {
	var renderable = gGuiBase.Core.selectedGameObject.getRenderable();
	if (renderable instanceof IllumRenderable) {
		$('#matDropDown').val(renderable.mMaterial.mID);
	} else {
		$('#matDropDown').val("None");
	}
};

ColorTextureContent.prototype.applyLightChecked = function(checked) {
	var gameObject = gGuiBase.Core.selectedGameObject;
	var colorTextureContent = gGuiBase.View.findTabContentByID("#ColorTextureContent");
	var textureName = colorTextureContent.getDropdownTexName();
	if (checked) {
		if (textureName === "None") {
			$('#normalMapDropDown').prop('disabled', true);
			$('#matDropDown').prop('disabled', true);
			return; //Can't apply light
		}
		gGuiBase.LightSupport.addLightingToGameObject(gameObject.mName, textureName);
		gGuiBase.LightSupport.addLightsToInstances();
		
		$('#normalMapDropDown').prop('disabled', false);

	} else {
		if (textureName === "None") return;
		gGuiBase.TextureSupport.addTextureToGameObject(gameObject.mName, textureName);
		$('#normalMapDropDown').prop('disabled', true);
		$('#matDropDown').prop('disabled', true);
	}
	
};
