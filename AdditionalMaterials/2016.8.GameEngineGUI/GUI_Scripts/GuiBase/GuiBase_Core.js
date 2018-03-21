/*-----------------------------------------------------------------------------
//	GUIBase.Core
//	Controls addition and selection of gameObjects, cameras, instances, lights,
/ 	and materials
//	Author: Jonathan Earl & Jason Herold
-----------------------------------------------------------------------------*/
var gGuiBase = gGuiBase || { }; //Create the singleton if it hasn't already been created

gGuiBase.Core = (function() {
	var selectedGameObject = null;
	var selectedCamera = null;
	var selectedLight = null;
	var selectedMaterial = null;
	var gRunning = false;    
	var gBackup = null;
	
	// ************* OBJECT SUPPORT ****************
	// Adds a default gameObject to the Object Tab and updates detail tab with this object
    var addDefaultObject = function () {
        var newObjID = gGuiBase.ObjectSupport.createDefaultObject();                    // create new gameObj
        //todo: abstract this to a content function call
        this.selectDetailsObject( newObjID );                                           // select this object in details
		updateObjectSelectList();
        gGuiBase.View.refreshAllTabContent();  // refresh panel
    };
	
	// gets a list of names of all the objects
	var getObjectList = function() {
		return gGuiBase.ObjectSupport.getObjectList();
	};
	
	//Updates the object select list (The Objects tab)
	var updateObjectSelectList = function() {
		var objectInstances = gGuiBase.ObjectSupport.getObjectNameList();
		gGuiBase.View.findWidgetByID("#objectSelectList1").rebuildWithArray( objectInstances );
		gGuiBase.View.findWidgetByID("#instanceDropdown").rebuildWithArray( objectInstances );
	};
	
	var addDefaultScene = function() {
		var newScene = gGuiBase.SceneSupport.createDefaultScene();
		gGuiBase.View.findWidgetByID("#sceneSelectList1").rebuildWithArray(gGuiBase.SceneSupport.getSceneListNames());
		this.selectDetailsScene(newScene.mName);
		gGuiBase.View.refreshAllTabContent();
	};

	var addDefaultCamera = function() {
		var newCamera = gGuiBase.CameraSupport.createDefaultCamera();
		gGuiBase.View.findWidgetByID("#cameraSelectList").rebuildWithArray(gGuiBase.CameraSupport.getCameraListNames());
		this.selectDetailsCamera(newCamera.mName);
		gGuiBase.View.refreshAllTabContent();
	};
	
	var addDefaultLight = function() {
		var light = gGuiBase.LightSupport.createDefaultLight();
		gGuiBase.View.findWidgetByID("#lightSelectList").rebuildWithArray(gGuiBase.LightSupport.getLightIDList());
		this.selectDetailsLight(light.mID);
		gGuiBase.View.refreshAllTabContent();
	};
	
	// Rebuilds the details tab to contain LightTransformContent/ColorLightContent
	var selectDetailsLight = function(id) {
		var detailsTab = gGuiBase.View.findTabByID("#Details");
		emptyDetailsTab();

		var light = gGuiBase.LightSupport.getLightByID( id ); //Get the light
		gGuiBase.Core.selectedLight = light; // Select light
	
		// Create the content
		var detailsTransform = new LightTransformContent("LightTransformContent", gGuiBase.View.CONTENT_STYLE, "Transform");
		var color = new ColorLightContent("ColorLightContent", gGuiBase.View.CONTENT_STYLE, "Color");
		
		detailsTransform.updateFields(light); // Using the light object, update the details content
		detailsTab.addContent(detailsTransform);
		detailsTab.addContent(color);
		
		gGuiBase.DirectManipulationSupport.resetInteraction(); // Reset 

		gGuiBase.View.refreshAllTabContent(); // Refresh
		detailsTransform.setTypeDropdown();
		
	};
	
	// Rebuilds the details tab to contain MaterialInfoContent 
	var selectDetailsMaterial = function(id) {
		var detailsTab = gGuiBase.View.findTabByID("#Details");
		emptyDetailsTab();
		var materialContent = new MaterialInfoContent("MaterialInfoContent", gGuiBase.View.CONTENT_STYLE, "Material");
		
		var material = gGuiBase.MaterialSupport.getMaterialByID( id ); // Get the material
		gGuiBase.Core.selectedMaterial = material;
		materialContent.updateFields(material);
		
		detailsTab.addContent(materialContent);
		
		gGuiBase.DirectManipulationSupport.resetInteraction();

		gGuiBase.View.refreshAllTabContent();                                           // refresh panel
	};

    // Rebuilds the details tab for a GameObject (Not an instance)
    var selectDetailsObject = function ( objName ) {
        var detailsTab = gGuiBase.View.findTabByID("#Details");
		emptyDetailsTab();
		var detailsTransform = new TransformContent("TransformContent", gGuiBase.View.CONTENT_STYLE, "Transform");
		var detailsColorTexture = new ColorTextureContent("ColorTextureContent", gGuiBase.View.CONTENT_STYLE, "Color");

		var gameObject = gGuiBase.ObjectSupport.getGameObjectByID( objName );           // get gameObj
		gGuiBase.Core.selectedGameObject = gameObject;
		detailsTransform.updateFields(gameObject);
		
		detailsTab.addContent(detailsTransform);
		detailsTab.addContent(detailsColorTexture);

		gGuiBase.View.refreshAllTabContent();                                           // refresh panel
		gGuiBase.View.findTabContentByID('#ColorTextureContent').setDropdownToSelectedGO();
	};

	// ************* SCENE SUPPORT ****************

	// Rebuilds the details tab for Scene content
	var selectDetailsScene = function (sceneName) {
		var scene = gGuiBase.SceneSupport.getSceneByName(sceneName);
		gGuiBase.SceneSupport.selectSceneByName(sceneName);

		var detailsTab = gGuiBase.View.findTabByID("#Details");
		emptyDetailsTab();
		var detailsTransform = new SceneInfo("SceneTransformContent", gGuiBase.View.CONTENT_STYLE, "Scene");
		
		detailsTransform.updateFields(scene);
		
		detailsTab.addContent(detailsTransform);
		this.updateInstanceSelectList();
		this.reinitializeLightsTab();
		gGuiBase.View.refreshAllTabContent();
	};

	// ************* CAMERA SUPPORT ****************
	var selectDetailsCamera = function (cameraName) {
		// Rebuilds the details tab for Camera content
		var detailsTab = gGuiBase.View.findTabByID("#Details");
		emptyDetailsTab();
		var detailsTransform = new CameraTransformContent("CameraTransformContent", gGuiBase.View.CONTENT_STYLE, "Transform");
		var detailsColor = new ColorCameraContent("ColorCameraContent", gGuiBase.View.CONTENT_STYLE, "Draw Color");
		var interpolateContent = new CameraInterpolateContent("CameraInterpolateContent", gGuiBase.View.CONTENT_STYLE, "Interpolate");
		var shakeContent = new CameraShakeContent("CameraShakeContent", gGuiBase.View.CONTENT_STYLE, "Shake");

		var camera = gGuiBase.CameraSupport.getCameraByName(cameraName);
		detailsTransform.updateFields(camera);
		gGuiBase.Core.selectedCamera = camera;

		detailsTab.addContent(detailsTransform);
		detailsTab.addContent(detailsColor);
		detailsTab.addContent(interpolateContent);
		detailsTab.addContent(shakeContent);
		gGuiBase.View.refreshAllTabContent();
		detailsTransform.setLayerDropDown(gGuiBase.Core.selectedCamera);
		interpolateContent.updateFields(camera);
		shakeContent.updateFields(camera);
	};
	
	// To be called on scene change
	var reinitializeCameraTab = function() {
		gGuiBase.View.findWidgetByID("#cameraSelectList").rebuildWithArray(gGuiBase.CameraSupport.getCameraListNames());
		gGuiBase.View.refreshAllTabContent();
		
	};
	
	var reinitializeSceneTab = function() {
		gGuiBase.View.findWidgetByID("#sceneSelectList1").rebuildWithArray(gGuiBase.SceneSupport.getSceneListNames());
	};
	
	var reinitializeLightsTab = function() {
		gGuiBase.View.findWidgetByID("#lightSelectList").rebuildWithArray(gGuiBase.LightSupport.getLightIDList());
		gGuiBase.View.refreshAllTabContent();
	};
	
	var reinitializeMaterialsTab = function() {
		gGuiBase.View.findWidgetByID("#materialSelectList1").rebuildWithArray(gGuiBase.MaterialSupport.getMaterialNameList());
		gGuiBase.View.refreshAllTabContent();
	};
	
	var emptyDetailsTab = function () {
		gGuiBase.DirectManipulationSupport.resetInteraction();
		var detailsTab = gGuiBase.View.findTabByID("#Details");
		detailsTab.clearContent();
	};

	// ************* INSTANCE SUPPORT ****************
	var addInstance = function () {
		var objName = gGuiBase.View.findTabContentByID("#InstancesContent").getDropdownObjectName();	// get object selected by dropdown
		if (objName == "") return;																		// dont add if no object selected
		var instName = gGuiBase.InstanceSupport.createInstanceOfObj( objName );							// create an instance of the object
		var inst = gGuiBase.InstanceSupport.getInstanceByID( instName );								// add instance to current scene
		this.updateInstanceSelectList();
		gGuiBase.Core.selectInstanceDetails( instName );												// set details panel with instance info
		gGuiBase.View.refreshAllTabContent();
		gGuiBase.View.findTabContentByID('#InstancesContent').setDropdownToSelectedGO();
	};
	
	var addInstanceWithName = function(objName) {
		var instName = gGuiBase.InstanceSupport.createInstanceOfObj( objName );							// create an instance of the object
		var inst = gGuiBase.InstanceSupport.getInstanceByID( instName );								// add instance to current scene
		this.updateInstanceSelectList();
		gGuiBase.Core.selectInstanceDetails( instName );												// set details panel with instance info
		gGuiBase.View.refreshAllTabContent();
		gGuiBase.View.findTabContentByID('#InstancesContent').setDropdownToSelectedGO();
	};

	// updates instanceSelectList
	var updateInstanceSelectList = function () {
		var sceneInstances = gGuiBase.SceneSupport.gCurrentScene.getInstanceNameList();			// add instance to instance content
		gGuiBase.View.findWidgetByID("#instanceSelectList").rebuildWithArray( sceneInstances );
	};

	var selectInstanceDetails = function ( instanceID ) {
		var detailsTab = gGuiBase.View.findTabByID("#Details");
		emptyDetailsTab();
		var detailsTransform = new TransformContent("TransformContent", gGuiBase.View.CONTENT_STYLE, "Transform");
		var detailsColorTexture = new ColorTextureContent("ColorTextureContent", gGuiBase.View.CONTENT_STYLE, "Texture");
		
		var inst = gGuiBase.InstanceSupport.getInstanceByID( instanceID );				// get instance
		
		gGuiBase.Core.selectedGameObject = inst;										// set to selected so it can update from panel
		detailsTransform.updateFields( inst );											// give details instance data
		var detailsOrder = new OrderInLayerContent("OrderInLayerContent", gGuiBase.View.CONTENT_STYLE, "Order in layer");
		
		detailsTab.addContent(detailsTransform);
		detailsTab.addContent(detailsColorTexture);
		detailsTab.addContent(detailsOrder);
		
		
		gGuiBase.View.refreshAllTabContent();                                           // refresh panel
		gGuiBase.View.findTabContentByID('#ColorTextureContent').setDropdownToSelectedGO();
	};
	
	var replaceObjectNameInCode = function(code, oldName, newName) {
		return code.replaceAll(oldName, newName);
	};
	
	String.prototype.replaceAll = function(search, replace) {
		if (replace === undefined) {
			return this.toString();
		}
		return this.split(search).join(replace);
	};
	
    var inheritPrototype = function (subClass, superClass) {
        var prototype = Object.create(superClass.prototype);
        prototype.constructor = subClass;
        subClass.prototype = prototype;
    };
	
	var cleanUpGameCore = function() {
		// Close (delete) all code editor windows that are open
		for (var i in gGuiBase.EditorSupport.gEditorMap) {
			$('#' + gGuiBase.EditorSupport.gEditorMap[i]).remove();
			delete gGuiBase.EditorSupport.gEditorMap[i];
		}
		
		// Rest the vars (for loading)
		gGuiBase.ObjectSupport.clearObjects();
		gGuiBase.InstanceSupport.clearInstances();
		gGuiBase.CameraSupport.clearCameras();
		var sceneList = gGuiBase.SceneSupport.getSceneList();
		for (var i = 0; i < sceneList.length; i++) {
			sceneList[i].clearCameraObjectList();
		}
		sceneList.splice(0, sceneList.length);
		
		var selectedGameObject = null;
		var selectedCamera = null;
		
		gGuiBase.DirectManipulationSupport.currentCameraObject = null;
		
		gEngine.GameLoop.stop();
		gGuiBase.SceneSupport.runBlankScene();
		
		//gNextObjectID = 0;          // For making unique IDs
		gGuiBase.InstanceSupport.mNextInstID = 0;
		gGuiBase.SceneSupport.mNextSceneID = 0;
		gGuiBase.ObjectSupport.mNextObjID = 0;  
		gGuiBase.Core.gRunning = false;           // If true, the update function will be called each game loop

		gGuiBase.View.refreshAllTabContent();
		reinitializeTabs();
	};
	
	var reinitializeTabs = function() {
		reinitializeSceneTab();
		reinitializeCameraTab();
		reinitializeLightsTab();
		updateObjectSelectList();
		updateInstanceSelectList();
		emptyDetailsTab();
	};

    var mPublic = {
        addDefaultObject: addDefaultObject,
        selectDetailsObject: selectDetailsObject,
		getObjectList: getObjectList,
		updateObjectSelectList: updateObjectSelectList,

		addDefaultScene: addDefaultScene,
		selectDetailsScene: selectDetailsScene,

		addDefaultCamera: addDefaultCamera,
		selectDetailsCamera: selectDetailsCamera,
		reinitializeCameraTab: reinitializeCameraTab,
		reinitializeSceneTab: reinitializeSceneTab,
		reinitializeTabs: reinitializeTabs,
		reinitializeLightsTab: reinitializeLightsTab,
		reinitializeMaterialsTab: reinitializeMaterialsTab,
		
		addInstance: addInstance,
		addInstanceWithName: addInstanceWithName,
		updateInstanceSelectList: updateInstanceSelectList,
		selectInstanceDetails: selectInstanceDetails,
		
		addDefaultLight: addDefaultLight,
		selectDetailsLight: selectDetailsLight,
		
		selectDetailsMaterial: selectDetailsMaterial,
		
		emptyDetailsTab: emptyDetailsTab,
		
        inheritPrototype: inheritPrototype,
		cleanUpGameCore: cleanUpGameCore,
		replaceObjectNameInCode: replaceObjectNameInCode,
		
		selectedGameObject: selectedGameObject,
		selectedCamera: selectedCamera,
		gRunning: gRunning,
		gBackup: gBackup
    };
    return mPublic;

}());