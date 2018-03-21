/*-----------------------------------------------------------------------------
//	GUIBase.CameraSupport
//  Provides functions for adding/deleting cameras
//	Author: Jonathan Earl
-----------------------------------------------------------------------------*/
var gGuiBase = gGuiBase || { }; //Create the singleton if it hasn't already been created

gGuiBase.CameraSupport = (function() {
	var mSelectedCamera = null;
	var mCamera = {}; 				// a reference to all cameras 		Key: cameraName Value: Camera
	var mCameraCode = {};			// a reference to all cameras code	Key: cameraName Value: Code (string)
	
	// remove a camera from GUI and Game, via its name
	var deleteCamera = function(cameraName) {
		// clean up details panel if it contains deleted camera
		var camera = getCameraByName(cameraName);
		if (this.mSelectedCamera === camera) {
			gGuiBase.Core.emptyDetailsTab();
			this.mSelectedCamera = null;
		}
		// remove camera from scene
		gGuiBase.SceneSupport.gCurrentScene.removeCamera(cameraName);
		gGuiBase.SceneSupport.gCurrentScene.removeCameraObject(cameraName);
		// remove camera from CameraSupport
		delete mCamera[cameraName];
		delete mCameraCode[cameraName];
		delete window[cameraName];
		// refresh tabs to reflect deleted camera
		gGuiBase.Core.reinitializeCameraTab();
		gGuiBase.View.refreshAllTabContent();
	};

	//Get camera index from camera list
	var getCameraIndex = function(cameraName) {
		var list = getCameraList();
		for (var i = 0; i < list.length; i++) {
			if (list[i].mName === cameraName)
				return i;
		}
		return -1;
	};

	// returns a list of all cameras in the current scene
	// MODIFYING THIS LIST WILL NOT DELETE CAMERAS FROM THE SCENE
	var getCameraList = function() {
		return gGuiBase.SceneSupport.gCurrentScene.getCameraList();
	};

	// clears all cameras and camera objects and camera Code from scenes and cameraSupport
	var clearCameras = function() {
		// clear cameras and cameraObjects from the scenes
		var sceneList = gGuiBase.SceneSupport.getSceneList();
		for (var i = 0; i < sceneList.length; i++) {
			sceneList[i].clearCameras();
		}
		// clear cameras and camera code from cameraSupport
		mCamera = {};
		mCameraCode = {};
	};

	// returns a list of names of all the current cameras in the scene
	var getCameraListNames = function() {
		var cameraList = getCameraList();
		var nameArray = [];
		var i;
		for (i = 0; i < cameraList.length; i++) {
			nameArray.push(cameraList[i].mName);
		}
		return nameArray;
	};

	// returns true if name conflict, else false
	var checkForNameConflict = function(cameraName) {
		// checks if name is taken by a camera or gameObject
		return cameraName in mCamera || gGuiBase.ObjectSupport.checkForCameraConflict(cameraName);
	};
	
	var checkForObjectConflict = function( objectName ) {
		return objectName in mCamera;
	};

	// returns default code used to create and edit a camera
	var getDefaultCodeCam = function( name ) {
		return 'window["' + name + '"] = function(wcCenter, wcWidth, viewportArray) {\n' +
		'	Camera.call(this, wcCenter, wcWidth, viewportArray)\n' +
		'};\n' +
		'gEngine.View.inheritPrototype(window["' + name + '"], window["Camera"]);\n\n' +
		name + '.prototype.update = function () {\n' +
		'	Camera.prototype.update.call(this);\n' +
		'};\n';
	};

	// creates a default camera and adds it to the scene
	var createDefaultCamera = function() {
		// default camera values
		var wcCenter = vec2.fromValues(20,60);   // position of the camera
		var wcWidth = 50;                        // width of camera
		var viewportArray = [0,0,640,480];       // viewport (orgX, orgY, width, height)
		var bound = undefined;

		// create new default name
		var name = "Camera" + gGuiBase.SceneSupport.gCurrentScene.mNextCameraID;
		while (checkForNameConflict(name)) {
			gGuiBase.SceneSupport.gCurrentScene.mNextCameraID++;
			name = "Camera" + gGuiBase.SceneSupport.gCurrentScene.mNextCameraID;
		}

		// will be overwritten probably not needed
		window[name] = function(wcCenter, wcWidth, viewportArray, bound) {
			Camera.call(this, wcCenter, wcWidth, viewportArray, bound);
		};
		gEngine.View.inheritPrototype(window[name], window["Camera"]);

		// get code and add it to the window
		var code = this.getDefaultCodeCam(name);
		eval(code);

		// create a instance of this Camera
		var cam;
		eval('cam = new ' + name + '(wcCenter, wcWidth, viewportArray, bound);');
		// set the cameras ID and Name
		cam.mID = "cameraListItem" + gGuiBase.SceneSupport.gCurrentScene.mNextCameraID;
		cam.mName = name;
		cam.setBackgroundColor([0.8, 0.8, 0.8, 1.0]);

		// create cameraObject for directly modifying through mouse
		var cameraObject = new CameraObject(cam);
		// add cameras to the scene
		gGuiBase.SceneSupport.gCurrentScene.cameraObjects.push(cameraObject);
		gGuiBase.SceneSupport.gCurrentScene.addCamera(cam);
		// add cameras to camera support
		mCamera[cam.mName] = cam;
		mCameraCode[cam.mName] = code;
		return cam;
	};

	// returns camera whose name is className
	var getCameraByName = function ( className ) {
		return mCamera[className];
	};

	// returns camera code whose cameras name is className
	var getCameraCodeByName = function ( className ) {
		return mCameraCode[className];
	};

	// code is a string representation of the class className
	// class name is the mName of the camera
	var setCameraCodeByName = function ( className, code ) {
		mCameraCode[className] = code;
	};

	// sets cameraSupports camera whose name is className to cam
	var setCameraByName = function (className, cam) {
		mCamera[className] = cam;
	};

    var mPublic = {
		getCameraList: getCameraList,
		checkForNameConflict: checkForNameConflict,
		checkForObjectConflict: checkForObjectConflict,
		getCameraListNames: getCameraListNames,
		deleteCamera: deleteCamera,
		clearCameras: clearCameras,

		createDefaultCamera: createDefaultCamera,
		getDefaultCodeCam: getDefaultCodeCam,
		getCameraByName: getCameraByName,
		getCameraCodeByName: getCameraCodeByName,
		setCameraCodeByName: setCameraCodeByName,
		setCameraByName: setCameraByName
    };
    return mPublic;
}());