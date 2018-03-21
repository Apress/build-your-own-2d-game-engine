/*
 * File: ClientScene.js 
 * This is a scene template. 
 * 
 * But what does each cam in this scene draw?  each instance?  does the user get any choice?
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, vec2, View, GameObject, Renderable */

/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function ClientScene(number) {
    Scene.call(this);
    this.mName = "Scene" + number;
    this.mID = "sceneListItem" + number;
    this.mNextCameraID = 0; // Due to the starting camera being 0

    this.MAX_CAMERA_LAYER = 5;
    this.MIN_CAMERA_LAYER = 0;
    this.mAllCamera = [];
    // for (var i = this.MIN_CAMERA_LAYER; i <= this.MAX_CAMERA_LAYER; i++) {
    //     this.mAllCamera.push([]);
    // }
    this.mInstanceList = [];
    this.mAllUpdateSet = new GameObjectSet();
    this.isInitialized = false;

	this.mLightSet = new LightSet();
	
	this.selectObject = null;
	this.rotationObject = null;
	this.sceneViewCamera = null;
	this.cameraObjects = [];
	this.lightObjects = [];

    this.mAmbientColor = [1, 1, 1, 1];
    this.mAmbientIntensity = 1;
}
gEngine.View.inheritPrototype(ClientScene, Scene);

ClientScene.prototype.loadScene = function() {
    gEngine.DefaultResources.setGlobalAmbientColor( this.mAmbientColor );
    gEngine.DefaultResources.setGlobalAmbientIntensity( this.mAmbientIntensity );
};

ClientScene.prototype.getAmbientColor = function () { return this.mAmbientColor; };

ClientScene.prototype.setAmbientColor = function ( ambientColor ) {
    this.mAmbientColor = ambientColor;
    gEngine.DefaultResources.setGlobalAmbientColor( ambientColor );
};

ClientScene.prototype.getAmbientIntensity = function () { return this.mAmbientIntensity; };

ClientScene.prototype.setAmbientIntensity = function ( ambientIntensity ) {
    this.mAmbientIntensity = ambientIntensity;
    gEngine.DefaultResources.setGlobalAmbientColor( ambientIntensity );
};

ClientScene.prototype.unloadScene = function() {
    // Step A: Game loop not running, unload all assets
    // stop the background audio
    //gEngine.AudioClips.stopBackgroundAudio();

    // unload the scene resources
    // gEngine.AudioClips.unloadAudio(this.kBgClip);
    //      You know this clip will be used elsewhere in the game
    //      So you decide to not unload this clip!!
    //gEngine.AudioClips.unloadAudio(this.kCue);

    // JUST CALL gEngine.GameLoop.stop(); SOMEWHERE IN ORDER TO REACH THIS METHOD (I.E. CAUSES THE SCENE CHANGE)
    // BELOW IS WHERE YOU DECIDE THE NEXT SCENE

    // Step B: starts the next level
    // starts the next level
    //var nextLevel = new BlueLevel();  // next level to be loaded
};

ClientScene.prototype.initialize = function() {
    // Do not under any circumstances initialize a scene more than once.  It deletes all the stuff in it.
    if (this.isInitialized) {
        return;
    }
    
    Scene.prototype.initialize.call(this);

    // Add scene view camera for editing
	this.sceneViewCamera = new Camera(
			vec2.fromValues(20,60), // position of the camera
			50,                     // width of camera
			[0,0,640,480]           // viewport (orgX, orgY, width, height)
			);
	this.sceneViewCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
	this.sceneViewCamera.mName = "SceneCam"; 
    this.sceneViewCamera.mID = "SceneViewCamera";
	this.sceneViewCamera.configInterpolation(1, 0.25);

    // scene view camera must be created prior to creating a camera object!
    var cam = gGuiBase.CameraSupport.createDefaultCamera();
	
    this.isInitialized = true;
    // Update view with new cameras and scenef
    gGuiBase.View.findWidgetByID("#sceneSelectList1").rebuildWithArray(gGuiBase.SceneSupport.getSceneListNames());
    // 
    gGuiBase.View.findWidgetByID("#cameraSelectList").rebuildWithArray(gGuiBase.CameraSupport.getCameraListNames());
    gGuiBase.View.refreshAllTabContent();
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
ClientScene.prototype.draw = function() {
	gEngine.View.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
	 
	if (!gGuiBase.Core.gRunning) {
		this.sceneViewCamera.setupViewProjection();
		for (var i = 0; i < this.mInstanceList.length; i++) {
            if (this.mInstanceList[i] instanceof GameObject) {
                this.mInstanceList[i].draw(this.sceneViewCamera);
            }
        }
		
		if (this.sceneViewCamera !== null && gGuiBase.Core.selectedGameObject !== null &&
			gGuiBase.Core.selectedGameObject.mID.includes('[')) { 
			if (this.selectObject !== null)
				this.selectObject.draw(this.sceneViewCamera);
			if (this.rotationObject !== null)
				this.rotationObject.draw(this.sceneViewCamera);
		}
		
		for(var i = 0; i < this.cameraObjects.length; i++) {
			this.cameraObjects[i].draw(this.sceneViewCamera);
		}
		
		for(var i = 0; i < this.lightObjects.length; i++) {
			if (this.lightObjects[i].lightRef.mLightType !== Light.eLightType.eDirectionalLight)
				this.lightObjects[i].draw(this.sceneViewCamera);
		}
		
	} else {
        for (var layerIndex = this.MAX_CAMERA_LAYER; layerIndex >= this.MIN_CAMERA_LAYER; layerIndex--) {
            if (this.mAllCamera[layerIndex]) {
                for (var cameraIndex = 0; cameraIndex < this.mAllCamera[layerIndex].length; cameraIndex++) {
                    var cam = this.mAllCamera[layerIndex][cameraIndex];
                    cam.setupViewProjection();
                    var instIndex;
                    for (instIndex = 0; instIndex < this.mInstanceList.length; instIndex++) {
                        if (this.mInstanceList[instIndex] instanceof GameObject) {
                            this.mInstanceList[instIndex].draw(cam);
                        }
                    }
                }
            }
        }
	}
};

// The update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
ClientScene.prototype.update = function() {
    if (gGuiBase.Core.gRunning) {
        // for (i = 0; i < this.mAllCamera.length; i++) {
        //     this.mAllCamera[i].update();
        // }
        var layerIndex;
        for (layerIndex = this.MIN_CAMERA_LAYER; layerIndex <= this.MAX_CAMERA_LAYER; layerIndex++) {
            if(this.mAllCamera[layerIndex]) {
                var cameraIndex;
                for (cameraIndex = 0; cameraIndex < this.mAllCamera[layerIndex].length; cameraIndex++) {
                    var cam = this.mAllCamera[layerIndex][cameraIndex];
                    cam.update();
                }
            }
        }
        var i;
        for (i = 0; i < this.mInstanceList.length; i++) {
            if (this.mInstanceList[i] instanceof GameObject) {
                if (this.mInstanceList[i].mDestroy) { // uses this variable to destroy from external pointer
                    this.mInstanceList.splice(i, 1);
                    i--;
                } else {
                    this.mInstanceList[i].update();
                }
            }
        }
    }
	
	if (this.selectObject !== null && gGuiBase.Core.selectedGameObject !== null) {
		this.selectObject.update()
	}
	if (this.rotationObject !== null && gGuiBase.Core.selectedGameObject !== null) {
		this.rotationObject.update()
	}

    for (i = 0; i < this.cameraObjects.length; i++) {
        this.cameraObjects[i].update();
    }
	 for (i = 0; i < this.lightObjects.length; i++) {
		if (this.lightObjects[i].lightRef.mLightType !== Light.eLightType.eDirectionalLight)
			this.lightObjects[i].update();
    }
    this.sceneViewCamera.update();
};

ClientScene.prototype.addInstance = function(inst) {
    this.mInstanceList.push(inst);
    return true;
};

ClientScene.prototype.removeInstance = function (inst) {
    var index = this.mInstanceList.indexOf(this);
    for(var i = 0; i < this.mInstanceList.length; i++) {
        if (this.mInstanceList[i].mID === inst.mID) {
            this.mInstanceList.splice(i, 1);
            return;
        }
    }
};

ClientScene.prototype.addCamera = function(cam) {
    if (!this.mAllCamera[cam.mLayer]) {
        this.mAllCamera[cam.mLayer] = [cam];
    } else {
        this.mAllCamera[cam.mLayer].push(cam);
    }
    return true;
};

ClientScene.prototype.removeCamera = function (cameraName) {
    var cam = gGuiBase.CameraSupport.getCameraByName(cameraName);
    var cameraList = this.mAllCamera[cam.mLayer];
    for (var i = 0; i < cameraList.length; i++) {
        if (cameraList[i].mName == cameraName) {
            this.mAllCamera[cam.mLayer].splice(i, 1);
            return true;
        }
    }
    return false;
};

ClientScene.prototype.removeCameraObject = function(cameraName) {
	for (var i = 0; i < this.cameraObjects.length; i++) {
		if (this.cameraObjects[i].cameraRef.mName === cameraName) {
			this.cameraObjects.splice(i, 1);
		}
	}
};

ClientScene.prototype.setCameraLayer = function ( camera, layer ) {
    this.removeCamera( camera.mName );
    camera.mLayer = layer;
    this.addCamera( camera );
};

ClientScene.prototype.getCameraList = function() {
    // return this.mAllCamera;
    var camList = [];
    for (var layerIndex = this.MIN_CAMERA_LAYER; layerIndex <= this.MAX_CAMERA_LAYER; layerIndex++) {
        if(this.mAllCamera[layerIndex]) {
            for (var cameraIndex = 0; cameraIndex < this.mAllCamera[layerIndex].length; cameraIndex++) {
                var cam = this.mAllCamera[layerIndex][cameraIndex];
                camList.push(cam);
            }
        }
    }
    return camList;
};

ClientScene.prototype.getCameraObjectList = function() {
	return this.cameraObjects;
};

ClientScene.prototype.removeLightObject = function(lightID) {
	for (var i = 0; i < this.lightObjects.length; i++) {
		if (lightID === this.lightObjects[i].lightRef.mID) {
			delete this.lightObjects[i];
			this.lightObjects.splice(i, 1);
		}
	}
};

ClientScene.prototype.clearCameras = function () {
    for (var layerIndex = this.MIN_CAMERA_LAYER; layerIndex <= this.MAX_CAMERA_LAYER; layerIndex++) {
        if (this.mAllCamera[layerIndex]) {
            this.mAllCamera[layerIndex].splice(0, this.mAllCamera[layerIndex].length);
        }
    }
    this.clearCameraObjectList();
};

ClientScene.prototype.clearCameraObjectList = function() {
	this.cameraObjects.splice(0,this.cameraObjects.length);
};

ClientScene.prototype.getSceneCamera = function() {
	//if (this.mAllCamera.length > 0) return this.mAllCamera[0];
	return this.sceneViewCamera;
	
};

ClientScene.prototype.setSceneCamera = function(camera) {
	this.sceneViewCamera = camera;
};

ClientScene.prototype.setInitialCameraObject = function() {
	if (this.cameraObjects.length === 0) {
		if (this.mAllCamera.length > 0) {
			var cameraObject = new CameraObject(this.mAllCamera[0]);
			this.cameraObjects.push(cameraObject);
		}
	}
};

ClientScene.prototype.getInstance = function ( instID ) {
    
};

ClientScene.prototype.getInstanceList = function() {
    return this.mInstanceList;
};

ClientScene.prototype.getInstanceNameList = function() {
    var instanceNames = [];
    var i;
    for (i=0; i < this.mInstanceList.length; i++) {
        if (this.mInstanceList[i] instanceof GameObject) { // i dont think this will be required
            instanceNames.push(this.mInstanceList[i].mID);
        }
    }
    return instanceNames;
};

ClientScene.prototype.sortInstanceListByOrder = function() {
	this.mInstanceList.sort(function(a, b) {
		if (a.mOrderInLayer < b.mOrderInLayer) 
			return -1;
		if (a.mOrderInLayer > b.mOrderInLayer) 
			return 1;
		return 0;
	});
};

ClientScene.prototype.getSelectObject = function() {
	return this.selectObject;
};

ClientScene.prototype.setSelectObject = function(selectObject) {
	this.selectObject = selectObject;
};

ClientScene.prototype.getRotationObject = function() {
	return this.rotationObject;
};

ClientScene.prototype.setRotationObject = function(rotationObject) {
	this.rotationObject = rotationObject;
};

ClientScene.prototype.collision = function() {
    if (!gGuiBase.Core.gRunning) {
        return;
    }
    
    var i;
    var j;
    for (i = 0; i < this.mInstanceList.length; i++) {
        var iGO = (this.mInstanceList[i] instanceof GameObject);
        for (j = 0; j < this.mInstanceList.length; j++) {
            var jGO = (this.mInstanceList[j] instanceof GameObject);
            
            if (i < j) {
                if (iGO && jGO && this.mInstanceList[i].mCollidableFlag) {
                    this.mInstanceList[i].collisionTest(this.mInstanceList[j]);
                }
            } else if (i > j) {
                if (iGO && jGO && this.mInstanceList[i].mCollidableFlag && !this.mInstanceList[j].mCollidableFlag) {
                    this.mInstanceList[i].collisionTest(this.mInstanceList[j]);
                }
            }
        }
        if (iGO && this.mInstanceList[i].mCollidableFlag) {
                this.mInstanceList[i].collisionExitTest();
        }
    }
};
