
function TransformContent(tabContentID, style, title) {
	this.isGameObjectCheck = null;
	this.objectNameText = null;
	this.objectName = null;
	this.objectXY = null;
	this.objectX = null;
	this.objectY = null;
	this.objectWH = null;
	this.objectW = null;
	this.objectH = null;
	this.rotationText = null;
	this.rotationField = null;
	this.rotationSlider = null;
	
	GuiTabContent.call(this, tabContentID, style, title);
}

gGuiBase.View.inheritPrototype(TransformContent, GuiTabContent);

TransformContent.prototype.initialize = function () {
	
	var textStyle = 'margin-left: 10px; margin-top: 4px';
	var textFieldStyle = 'width: 90%; margin-left: 10px';
	var sliderStyle = 'width: 90%; margin-top: 10px; margin-bottom: 10px; margin-left: 10px';
	
	this.objectNameText = new Text("gameObjectNameText", textStyle, "Name");
	this.objectName = new TextField("gameObjectNameField", textFieldStyle, "GameObj0");
	this.objectXY = new Text("gameObjectXYText", textStyle, "X / Y");
	this.objectX = new TextField("gameObjectXField", textFieldStyle, "20");
	this.objectY = new TextField("gameObjectYField", textFieldStyle, "60");
	
	this.objectWH = new Text("gameObjectWHText", textStyle, "W / H");
	this.objectW = new TextField("gameObjectWField", textFieldStyle, "5");
	this.objectH = new TextField("gameObjectHField", textFieldStyle, "5");
	
	this.rotationText = new Text("gameObjectRotationText", textStyle, "Rotation");
	this.rotationField = new TextField("gameObjectRotationField", textFieldStyle, "0");
	this.rotationSlider = new Slider("gameObjectRotationSlider", sliderStyle, 360);
	
	this.widgetList.push(this.objectNameText);
	this.widgetList.push(this.objectName);
	this.widgetList.push(this.objectXY);
	this.widgetList.push(this.objectX);
	this.widgetList.push(this.objectY);
	this.widgetList.push(this.objectWH);
	this.widgetList.push(this.objectW);
	this.widgetList.push(this.objectH);
	this.widgetList.push(this.rotationText);
	this.widgetList.push(this.rotationField);
	this.widgetList.push(this.rotationSlider);
	
};

TransformContent.prototype.initializeEventHandling = function () {
	this.objectName.setOnFocusOut(this.onTextFieldFocusOut);
	this.objectX.setOnFocusOut(this.onTextFieldFocusOut);
	this.objectY.setOnFocusOut(this.onTextFieldFocusOut);
	this.objectW.setOnFocusOut(this.onTextFieldFocusOut);
	this.objectH.setOnFocusOut(this.onTextFieldFocusOut);
	this.rotationField.setOnFocusOut(this.onTextFieldFocusOut);
	this.rotationSlider.setOnSliderChange(this.onSliderChange);
	
	var gameObject = gGuiBase.Core.selectedGameObject;
	if (gameObject.mID.includes('[') && gameObject.mID.includes(']')) {
		$(this.objectName.getID()).prop('readonly', true);
		$(this.objectName.getID()).css('background-color', 'gray');
		
	}
};

TransformContent.prototype.onTextFieldFocusOut = function(textField) {
	//Can do all the handling for changing game object here
	
	var gameObject = gGuiBase.Core.selectedGameObject;
	var value = textField.val();
	var xform = gameObject.getXform();
	
	switch(textField.attr("id")) {
		case "gameObjectNameField":
			var gLastSetName = textField.val();
			
			if (gameObject.mID.includes('[') && gameObject.mID.includes(']')) {
				break;
			}
			if (gLastSetName !== gameObject.mName) { // If the name is new
                if (!gGuiBase.ObjectSupport.checkForNameConflict(gLastSetName)) {
                    // Create a new class with the new name
					//delete window[gameObject.mName];
					
					window[gLastSetName] = function(renderableObj) {
						GameObject.call(this, renderableObj);
					};
                    gEngine.View.inheritPrototype(window[gLastSetName], GameObject);
                    
                    // Re-eval any class code
                    var i;
					var code;
                    var objs = gGuiBase.ObjectSupport.getObjectList();
					var objCode = gGuiBase.ObjectSupport.getObjectCodeList();
                    for (i = 0; i < objs.length; i++) { //Find the old code
                        if (objs[i].mName === gameObject.mName) {
							code = objCode[i];
                        }
                    }
					
					code = gGuiBase.Core.replaceObjectNameInCode(code, gameObject.mName, gLastSetName);
					gGuiBase.ObjectSupport.setGameObjectCodeByID(gameObject.mName, code);
                    eval(code);
					
					var sceneList = gGuiBase.SceneSupport.getSceneList();
					for (var j = 0; j < sceneList.length; j++) {
						
						// First update all instances with the new name and class
						var instances = sceneList[j].getInstanceList();
						for (i = 0; i < instances.length; i++) {
							var name = instances[i].mName;
							if (name === gameObject.mName) {
								// Each instance needs to be re-created exactly as the old one, but as a new class
								// They also need their name value modified
								var rend = instances[i].getRenderable();
								var xf = instances[i].getXform();
								var newInstance;
								eval("newInstance = new " + gLastSetName + "(rend);");
								newInstance.mID = instances[i].mID;
								var newXf = newInstance.getXform();
								newXf = xf;
								instances[i] = newInstance;
								
								var newID = value + instances[i].mID.substring(instances[i].mID.indexOf('['), instances[i].mID.length);
								gGuiBase.InstanceSupport.replaceInMap(instances[i].mID, newID, value);
					
								instances[i].mName = value;
								instances[i].mID = newID;
								
								
							}
						}
					}
                    
                    // Now update the class itself, where the instances came from
					gGuiBase.ObjectSupport.replaceInMap(gameObject.mName, value);
                    //gameObject.mName = value;
					//gameObject.mID = value;
					
					gGuiBase.Core.updateInstanceSelectList();
					gGuiBase.Core.updateObjectSelectList();
					
					gGuiBase.Core.selectDetailsObject(value);
                    gGuiBase.View.refreshAllTabContent();

                    // The user NEEDS to update his/her own code to match the new name, then save it.
                    // That save will add it to the system.
                    alert("Remember to update all your code to match the new class name.");
                } else {
                    alert("Names must be unique.");

                }
            }
			break;
		case "gameObjectXField":
			xform.setXPos(value);
			break;
		case "gameObjectYField":
			xform.setYPos(value);
			break;
		case "gameObjectWField":
			xform.setWidth(value);
			break;
		case "gameObjectHField":
			xform.setHeight(value);
			break;
		case "gameObjectRotationField":
			xform.setRotationInDegree(value);
			$("#gameObjectRotationSlider").slider( "value", value);
			
			break;
		default:
			break;
	}
	
	
};

TransformContent.prototype.onSliderChange = function(sliderValue) {
	var gameObject = gGuiBase.Core.selectedGameObject;
	var xform = gameObject.getXform();
	
	xform.setRotationInDegree(sliderValue.toFixed(2));
	//var rotationField = gGuiBase.View.findWidgetByID("#gameObjectRotationField");
	$("#gameObjectRotationField").attr("value", sliderValue.toFixed(2));
	
};

TransformContent.prototype.updateFields = function( gameObject ) {
	//update these widgets...
	// set name field
	this.objectName.setText( gameObject.mID );
	
	// set x form
	var xf = gameObject.getXform();
	this.objectX.setText( xf.getXPos().toFixed(2) );
	this.objectY.setText( xf.getYPos().toFixed(2) );
	// set width and height
	this.objectW.setText( xf.getWidth().toFixed(2) );
	this.objectH.setText( xf.getHeight().toFixed(2) );
	
	this.rotationField.setText(xf.getRotationInDegree().toFixed(2));
	$("#gameObjectRotationSlider").slider("value", xf.getRotationInDegree().toFixed(2));
};



