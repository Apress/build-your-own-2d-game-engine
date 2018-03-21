
var gGuiBase = gGuiBase || { }; //Create the singleton if it hasn't already been created

gGuiBase.LightSupport = (function() {
	var gNormalMap = {};

	var getNormalList = function() {
		var normalList = [];
		for (var normalName in gNormalMap) {
			normalList.push(gNormalMap[normalName].src);
		}
		return normalList;
	};
	
	var getNormalNameList = function() {
		var normalNameList = [];
		for (var normalName in gNormalMap) {
			normalNameList.push(normalName);
		}
		return normalNameList;
	};

	var addNormal = function ( normalName, img ) {
		//todo check if done in resourcemap
		// if added already return
		if(gNormalMap[normalName] || normalName == "") {
			alert('improper name', normalName);
			return;
		}
		gGuiBase.Core.emptyDetailsTab();
		// set this to a reference of img? or get it from engine?
		gNormalMap[normalName] = img;
		// refresh texturelist in view
		var imageList = getNormalList();
		gGuiBase.View.findWidgetByID("#MaterialSelectList").rebuildWithArray( imageList );
		gGuiBase.View.refreshAllTabContent();  // refresh panel
	};
	
	var getNormal = function ( normalName ) {
		return gNormalMap[normalName];
	};

	var createDefaultLight = function() {
		var light = new Light();
		light.mID = findUniqueID();
		light.setXPos(20);
		light.setYPos(60);
		gGuiBase.SceneSupport.gCurrentScene.mLightSet.addToSet(light);
		this.addLightsToInstances();
		
		var lightObject = new LightObject(light);
		gGuiBase.SceneSupport.gCurrentScene.lightObjects.push(lightObject);
		
		return light;
	};
	
	var addLight = function(light) {
		gGuiBase.SceneSupport.gCurrentScene.mLightSet.addToSet(light);
		this.addLightsToInstances();
		gGuiBase.View.findWidgetByID("#lightSelectList").rebuildWithArray(gGuiBase.LightSupport.getLightIDList());
	};
	
	var removeLight = function(lightID) {
		var light = getLightByID(lightID);
		removeRefToLight(light);
		gGuiBase.SceneSupport.gCurrentScene.mLightSet.removeLight(light);
		gGuiBase.SceneSupport.gCurrentScene.removeLightObject(light.mID);
		
		gGuiBase.Core.reinitializeLightsTab();
	};
	
	var checkForNameConflict = function(name) {
		var lightSet = gGuiBase.SceneSupport.gCurrentScene.mLightSet;
        var result = false;
		var i;
		for (i = 0; i < lightSet.numLights(); i++) {
			if (lightSet.getLightAt(i).mID === name) {
				result = true;
				i = lightSet.numLights(); // Break
			}
		}
		return result;
    };
	
	var findUniqueID = function() {
		var id = 0;
		var name = "Light0";
		while (checkForNameConflict("Light" + id)) {
			id++; 
			name = "Light" + id;
		}
		return name;
	};
	
	var getLightByID = function(id) {
		var lightSet = gGuiBase.SceneSupport.gCurrentScene.mLightSet;
		for (var i = 0; i < lightSet.numLights(); i++) {
			if (lightSet.getLightAt(i).mID === id) {
				return lightSet.getLightAt(i);
			}
		}
		return null;
	};
	
	var getLightIDList = function() {
		var list = [];
		var lightSet = gGuiBase.SceneSupport.gCurrentScene.mLightSet;
		for (var i = 0; i < lightSet.numLights(); i++) {
			list.push(lightSet.getLightAt(i).mID);
		}
		return list;
	};
	
	//Don't call on an object with a non texture renderable
	var addLightingToGameObject = function(gameObjectName, textureName) {
		var gameObject = gGuiBase.ObjectSupport.getGameObjectByID(gameObjectName);
		
		var newRenderable = new LightRenderable(textureName);
		
		gGuiBase.TextureSupport.setRenderableForGameObject(gameObject, newRenderable);
		this.setLightRenderableForAllInstancesOfObject(gameObjectName, textureName);

	};
	
	var addIlluminationToGameObject = function (gameObjectName, textureName, normalMapName) {
		var gameObject = gGuiBase.ObjectSupport.getGameObjectByID(gameObjectName);
		var newRenderable = new IllumRenderable(textureName, normalMapName);
		newRenderable.setMaterial(gGuiBase.MaterialSupport.getMaterialByID("Default"));
		gGuiBase.TextureSupport.setRenderableForGameObject(gameObject, newRenderable);
		this.setIllumRenderableForAllInstances(gameObjectName, textureName, normalMapName);
	};
	
	var setIllumRenderableForAllInstances = function(gameObjectName, textureName, normalMapName) {
		var instanceNames = gGuiBase.InstanceSupport.getInstanceList();
		for (var i in instanceNames) {
			var instanceName = instanceNames[i];
			// get the instance so you can manipulate it
			var inst = gGuiBase.InstanceSupport.getInstanceByID(instanceName);
			if (inst.mName === gameObjectName) {
				// assign appropriate renderable
				var rend = new IllumRenderable(textureName, normalMapName);
				rend.setMaterial(gGuiBase.MaterialSupport.getMaterialByID("Default"));
				gGuiBase.TextureSupport.setRenderableForGameObject(inst, rend);
			}
		}
	};
	
	var setLightRenderableForAllInstancesOfObject = function(gameObjectName, textureName) {
		var instanceNames = gGuiBase.InstanceSupport.getInstanceList();
		for (var i in instanceNames) {
			var instanceName = instanceNames[i];
			// get the instance so you can manipulate it
			var inst = gGuiBase.InstanceSupport.getInstanceByID(instanceName);
			if (inst.mName === gameObjectName) {
				// assign appropriate renderable
				var rend = new LightRenderable(textureName);
				gGuiBase.TextureSupport.setRenderableForGameObject(inst, rend);
			}
		}
	};
	
	var addLightsToInstances = function() {
		var sceneList = gGuiBase.SceneSupport.getSceneList();
		
		for (var j = 0; j < sceneList.length; j++) {
			// First update all instances with the new name and class
			var instances = sceneList[j].getInstanceList();
			for (i = 0; i < instances.length; i++) {
				var renderable = instances[i].getRenderable();
				if (renderable instanceof LightRenderable) {
					
					renderable.deleteAllLights();
					var lightSet = sceneList[j].mLightSet;
					for (var k = 0; k < lightSet.numLights(); k++) {
						renderable.addLight(lightSet.getLightAt(k));
					}
				}
			}
		}
	};
	
	var removeRefToLight = function(light) {
		var sceneList = gGuiBase.SceneSupport.getSceneList();
		for (var j = 0; j < sceneList.length; j++) {
			// First update all instances with the new name and class
			var instances = sceneList[j].getInstanceList();
			for (i = 0; i < instances.length; i++) {
				var renderable = instances[i].getRenderable();
				if (renderable instanceof LightRenderable) {
					renderable.removeLight(light);
				}
			}
		}
	};
	
	var removeLightReferences = function() {
		var sceneList = gGuiBase.SceneSupport.getSceneList();
		for (var j = 0; j < sceneList.length; j++) {
			// First update all instances with the new name and class
			var instances = sceneList[j].getInstanceList();
			for (i = 0; i < instances.length; i++) {
				var renderable = instances[i].getRenderable();
				if (renderable instanceof LightRenderable) {
					renderable.deleteAllLights();
				}
			}
		}
	};

    var mPublic = {
		addNormal: addNormal,
		getNormal: getNormal,
		getMaterialNameList: getNormalList,
		getNormalNameList: getNormalNameList,
		createDefaultLight: createDefaultLight,
		checkForNameConflict: checkForNameConflict,
		getLightByID: getLightByID,
		getLightIDList: getLightIDList,
		addLightingToGameObject: addLightingToGameObject,
		setLightRenderableForAllInstancesOfObject: setLightRenderableForAllInstancesOfObject,
		addIlluminationToGameObject: addIlluminationToGameObject,
		setIllumRenderableForAllInstances: setIllumRenderableForAllInstances,
		addLightsToInstances: addLightsToInstances,
		addLight: addLight,
		removeLightReferences: removeLightReferences,
		removeLight: removeLight,
    };
    return mPublic;
}());