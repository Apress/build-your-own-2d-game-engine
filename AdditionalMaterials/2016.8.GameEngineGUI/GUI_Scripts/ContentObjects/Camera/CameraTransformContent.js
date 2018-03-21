
function CameraTransformContent(tabContentID, style, title) {
	this.objectNameText = null;
	this.objectName = null;
	
	this.wcText = null;
	this.wcXYText = null;
	this.wcX = null;
	this.wcY = null;
	this.wcWText = null;
	this.wcW = null;
	
	this.viewportText = null;
	this.viewportXYText = null;
	this.viewportX = null;
	this.viewportY = null;
	this.viewportWHText = null;
	this.viewportW = null;
	this.viewportH = null;

	this.layerLabel = null;
	this.layerDropdown = null;
	//todo generate this from cameras support min max
	this.layerOptions = [0,1,2,3,4,5];
	
	GuiTabContent.call(this, tabContentID, style, title);
}
gGuiBase.View.inheritPrototype(CameraTransformContent, GuiTabContent);

// set initial values to default values of camera
CameraTransformContent.prototype.initialize = function () {
	//todo dont hard code these values
	var textStyle = 'margin-left: 10px; margin-top: 4px';
	var textFieldStyle = 'width: 90%; margin-left: 10px';
	
	this.objectNameText = new Text("cameraNameText", textStyle, "Name");
	this.objectName = new TextField("cameraNameField", textFieldStyle, "Camera0");
	
	this.wcText = new Text("cameraWCText", textStyle, "World coordinates");
	this.wcXYText = new Text("cameraWCXYText", textStyle, "X / Y");
	this.wcX = new TextField("wcx", textFieldStyle, "20");
	this.wcY = new TextField("wcy", textFieldStyle, "60");
	this.wcWText = new Text("cameraWCWText", textStyle, "W");
	this.wcW = new TextField("wcw", textFieldStyle, "50");
	
	this.viewportText = new Text("viewportText", textStyle, "Viewport");
	this.viewportXYText = new Text("viewportXYText", textStyle, "X / Y");
	this.viewportX = new TextField("viewportX", textFieldStyle, "0");
	this.viewportY = new TextField("viewportY", textFieldStyle, "0");
	this.viewportWHText = new Text("viewportWHText", textStyle, "W / H");
	this.viewportW = new TextField("viewportW", textFieldStyle, "640");
	this.viewportH = new TextField("viewportH", textFieldStyle, "480");

	this.viewportWHText = new Text("viewportWHText", textStyle, "W / H");

	this.layerLabel = new Text("layerLabel", textStyle, "Layer");
	this.layerDropdown = new DropdownList("layerDropDown", textStyle, this.layerOptions);
	
	this.widgetList.push(this.objectNameText);
	this.widgetList.push(this.objectName);
	this.widgetList.push(this.wcText);
	this.widgetList.push(this.wcXYText);
	this.widgetList.push(this.wcX);
	this.widgetList.push(this.wcY);
	this.widgetList.push(this.wcWText);
	this.widgetList.push(this.wcW);
	this.widgetList.push(this.viewportText);
	this.widgetList.push(this.viewportXYText);
	this.widgetList.push(this.viewportX);
	this.widgetList.push(this.viewportY);
	this.widgetList.push(this.viewportWHText);
	this.widgetList.push(this.viewportW);
	this.widgetList.push(this.viewportH);
	this.widgetList.push(this.layerLabel);
	this.widgetList.push(this.layerDropdown);
};

// initialize text fields
CameraTransformContent.prototype.initializeEventHandling = function () {
	this.objectName.setOnFocusOut(this.onTextFieldFocusOut);
	this.wcX.setOnFocusOut(this.onTextFieldFocusOut);
	this.wcY.setOnFocusOut(this.onTextFieldFocusOut);
	this.wcW.setOnFocusOut(this.onTextFieldFocusOut);
	this.viewportX.setOnFocusOut(this.onTextFieldFocusOut);
	this.viewportY.setOnFocusOut(this.onTextFieldFocusOut);
	this.viewportW.setOnFocusOut(this.onTextFieldFocusOut);
	this.viewportH.setOnFocusOut(this.onTextFieldFocusOut);
	this.layerDropdown.setOnSelect(this.onLayerSelect);
};

// set camera to settings on focus out
CameraTransformContent.prototype.onTextFieldFocusOut = function(textField) {
	var value = textField.val();
	var camera = gGuiBase.Core.selectedCamera;
	var center = camera.getWCCenter();
	var viewport = camera.getViewport();

	// Handle any changes to Camera
	switch(textField.attr("id")) {
		case "cameraNameField":
			if (value == camera.mName) break;
			var lastSetName = camera.mName;
			if (!gGuiBase.CameraSupport.checkForNameConflict(value)) {
				//todo make a function to copy values from camera use for save and load and here
				// get old values
				var wcCenter = camera.getWCCenter();   			// position of the camera
				var wcWidth = camera.getWCWidth();              // width of camera
				var viewportArray = camera.getViewport();       // viewport (orgX, orgY, width, height)
				var bound = undefined;
				var layer = camera.mLayer;
				var id = camera.mID;
				// add new cam to window
				window[value] = function(wcCenter, wcWidth, viewportArray, bound) {
					Camera.call(this, wcCenter, wcWidth, viewportArray, bound);
				};
				gEngine.View.inheritPrototype(window[value], window["Camera"]);
				// add code to window
				var code = gGuiBase.CameraSupport.getCameraCodeByName(lastSetName);
				code = gGuiBase.Core.replaceObjectNameInCode(code, lastSetName, value);
				eval(code);
				// create a new cam and set values
				var newCam;
				eval('newCam = new ' + value + '(wcCenter, wcWidth, viewportArray, bound);');
				newCam.mName = value;
				newCam.mLayer = layer;
				newCam.mID = id;
				// add cam to scene and gui
				var cameraObject = new CameraObject(newCam);
				gGuiBase.SceneSupport.gCurrentScene.cameraObjects.push(cameraObject);
				gGuiBase.SceneSupport.gCurrentScene.addCamera(newCam);
				gGuiBase.CameraSupport.setCameraByName(newCam.mName, newCam);
				gGuiBase.CameraSupport.setCameraCodeByName(newCam.mName, code);
				// remove from oldcamera from gui and scene
				gGuiBase.CameraSupport.deleteCamera(lastSetName);
				gGuiBase.Core.reinitializeCameraTab();
				gGuiBase.Core.selectDetailsCamera(newCam.mName);
			} else {
				$(this).val(lastSetName);
				alert("Names must be unique.");
			}
			break;
		case "wcx":
			camera.setWCCenter(value, center[1]);
			break;
		case "wcy":
			camera.setWCCenter(center[0], value);
			break;
		case "wcw":
			camera.setWCWidth(value);
			break;
		case "viewportX":
			var vp2 = [value, viewport[1], viewport[2], viewport[3]];
			camera.setViewport(vp2);
			camera.mViewport = vp2;
			break;
		case "viewportY":
			var vp2 = [viewport[0], value, viewport[2], viewport[3]];
			camera.setViewport(vp2);
			camera.mViewport = vp2;
			break;
		case "viewportW":
			var vp2 = [viewport[0], viewport[1], value, viewport[3]];
			camera.setViewport(vp2);
			camera.mViewport = vp2;
			break;
		case "viewportH":
			var vp2 = [viewport[0], viewport[1], viewport[2], value];
			camera.setViewport(vp2);
			camera.mViewport = vp2;
			break;
		default:
			break;
	}
};

// sets transforms fields to the selected cameras
CameraTransformContent.prototype.updateFields = function( camera ) {
	this.objectName.setText( camera.mName );
	var wc = camera.getWCCenter();
	var vp = camera.getViewport();
	
	this.wcX.setText(wc[0]);
	this.wcY.setText(wc[1]);
	this.wcW.setText(camera.getWCWidth());
	
	this.viewportX.setText(vp[0]);
	this.viewportY.setText(vp[1]);
	this.viewportW.setText(vp[2]);
	this.viewportH.setText(vp[3]);
};

// sets the selected camera's layer to this contents new layer setting
CameraTransformContent.prototype.onLayerSelect = function (layer) {
	layer = Number(layer);
	var cam = gGuiBase.Core.selectedCamera;
	gGuiBase.SceneSupport.gCurrentScene.setCameraLayer(cam, layer);
};

// updates the layer selector to the currently selected camera's layer
CameraTransformContent.prototype.setLayerDropDown = function ( cam ) {
	if (cam) {
		$('#layerDropDown').val(cam.mLayer);
	}
};