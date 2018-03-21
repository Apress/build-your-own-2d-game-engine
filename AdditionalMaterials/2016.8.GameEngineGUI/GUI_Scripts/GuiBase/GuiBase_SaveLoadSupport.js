/*-----------------------------------------------------------------------------
//	Save/load support
//	Saves editor and game state, controls running of the game
//	Author: Jason Herold, Jonathan Earl, Dexter Hu
-----------------------------------------------------------------------------*/

var gGuiBase = gGuiBase || { }; //Create the singleton if it hasn't already been created

gGuiBase.SaveLoadSupport = (function() {
    
	$('#menuFileOpenInput').hide();
	
	$('#menuFileNew').click(function(event) { // Reset everything
		gGuiBase.Core.cleanUpGameCore();
		
		gGuiBase.SceneSupport.gCurrentScene = new ClientScene(0);
		gGuiBase.SceneSupport.getSceneList().push(gGuiBase.SceneSupport.gCurrentScene);
		gEngine.GameLoop.stop();
		gEngine.View.startScene(gGuiBase.SceneSupport.gCurrentScene);
		
		gGuiBase.View.refreshAllTabContent();
		gGuiBase.Core.reinitializeTabs();
		gGuiBase.DirectManipulationSupport.resetInteraction();
	});
	
	$('#menuFileOpen').click(function(event) {
		event.preventDefault();
		$('#menuFileOpenInput').trigger('click');
	});
		
	$('#menuFileSave').click(function() { // File save menu
		gGuiBase.SaveLoadSupport.fileSave();
	});
	
	$('#menuRun').click(function() { // Run menu button
		gGuiBase.Core.gRunning = !gGuiBase.Core.gRunning;
		if (gGuiBase.Core.gRunning) {
			//Back up game state
			fileSave(true);
			
			$('#menuRun').css('background-color', 'grey');
			gGuiBase.Core.emptyDetailsTab();
			gGuiBase.Core.selectedGameObject = null;
			gGuiBase.DirectManipulationSupport.setPreventInteraction(true); // Don't allow direct editing while game is running
		} else {
			//Load the backed-up game state
			gGuiBase.LightSupport.removeLightReferences(); // Clear any light references from instances of LightRenderable/IllumRenderable
			gGuiBase.SaveLoadSupport.fileOpen(true);

			$('#menuRun').css('background-color', 'white');
			gGuiBase.DirectManipulationSupport.resetInteraction();
		}
		
		
	});
		
	var fileOpen = function(backup) {
		// Here is the JSZip API for reference (recommended to understand the 4 loading methods):
		// https://stuk.github.io/jszip/documentation/api_jszip.html
		// Also, here is the FileReader API:
		// https://developer.mozilla.org/en-US/docs/Web/API/FileReader
		var input;
		if (backup) {
			input = gGuiBase.Core.gBackup;
		} else {
			input = document.getElementById("menuFileOpenInput").files[0];
		}
		
		if (input) {
			// Only accept .zip
			if (!backup && input.name.endsWith(".zip")) { // Make sure it is in a .js format
				// Read the .zip file with FileReader
				var reader = new FileReader();
				reader.readAsArrayBuffer(input); // Read as ArrayBuffer for this particular file type
				var files;
				
				// Loads files into a JSZip object to be processed
				reader.onload = function(event) {
					files = new JSZip();
					files.loadAsync(event.target.result);
				};
				
				// You can only work with the files once the asynchronous loading finishes
				// Thus, we need reader.onloadend()
				reader.onloadend = function() {
					if (!confirm("Loading a file will erase current work.  Load anyways?")) {
						return;
					}

					try {
						// Clears everything to an empty state
						gGuiBase.Core.cleanUpGameCore();
						// Load everything from the file
						gRunning = false;
						$('#menuRun').css('background-color', 'white');
						loadMaterials(files, gGuiBase.MaterialSupport.setMaterial);
						loadMisc(files, function() {
							loadTextures(files, function() {
								loadObjects(files, function() {
									loadScenes(files, function () {});
								});
							});
						});
						
					} catch (error) {
						alert("FileOpen(file): There were issues with loading your file.\n\nErrors:\n" + error);
						gGuiBase.Core.cleanUpGameCore();
					}
				};
			} else if (backup) {
				// This is for backing up the game
				try {
					// Clears everything to an empty state
					gGuiBase.Core.cleanUpGameCore();
					// Load everything from the file
					gGuiBase.Core.gRunning = false;
					$('#menuRun').css('background-color', 'white');
					loadMaterials(gGuiBase.Core.gBackup, gGuiBase.MaterialSupport.setMaterial);
					loadMisc(gGuiBase.Core.gBackup, function() {
						loadTextures(gGuiBase.Core.gBackup, function() {
							loadObjects(gGuiBase.Core.gBackup, function() {
								loadScenes(gGuiBase.Core.gBackup, function(){});
							});
						});
					});
				} catch (error) {
					alert("FileOpen(backup): There were issues with loading your file.\n\nErrors:\n" + error);
					gGuiBase.Core.cleanUpGameCore();
				}
			} else {
				alert("Your file was not a project file.");
			}
		}
		// Clears the current file by replacing itself with a fresh file input component (e.g. a clone)
		// This allows for same-file loading, where "onchange" would normally not activate on the same file
		$("#menuFileOpenInput").replaceWith($("#menuFileOpenInput").val('').clone(true));

	};
	
	var fileSave = function(backup) {
		var files = new JSZip();
		
		// Folders
		var misc = files.folder("Misc");
		var objects = files.folder("Objects");
		var scenes = files.folder("Scenes");
		var textures = files.folder("Textures");
		var materials = files.folder("Materials");		
		// JSON files not in folders
		var globalVars;
		
		// Global vars
		var globalVarData = {};
		globalVarData[0] = gGuiBase.ObjectSupport.mNextObjID;
		globalVarData[1] = gGuiBase.InstanceSupport.mNextInstID;
		globalVarData[2] = gGuiBase.SceneSupport.mNextSceneID;
		globalVars = JSON.stringify(globalVarData);
		misc.file("vars.json", globalVars);
		
		// Objects
		var i;
		var objectList = gGuiBase.ObjectSupport.getObjectList();
		for (i = 0; i < objectList.length; i++) {
			var objectData = {};
			var obj = objectList[i];
			var objCode = gGuiBase.ObjectSupport.getGameObjectCodeByID(obj.mName);
			var xf = obj.getXform();
			var rend = obj.getRenderable();
			var texture = rend.mTexture;
			
			objectData[0] = obj.mID;
			objectData[1] = objCode; //Code
			if(texture) {				//save texture data
				objectData[2] = texture;
			} else {
				objectData[2] = "None";
			}
			objectData[3] = xf.getXPos();
			objectData[4] = xf.getYPos();
			objectData[5] = xf.getWidth();
			objectData[6] = xf.getHeight();
			objectData[7] = xf.getRotationInDegree();
			objectData[8] = obj.getRenderable().getColor();
			
			//Is it a lightrenderable
			if (rend instanceof IllumRenderable) {
				objectData[9] = rend.getMaterial().mID;
				objectData[10] = rend.mNormalMap;
			}
			else {
				objectData[9] = false;
				objectData[10] = false;
			}
			objects.file(obj.mName + ".json", JSON.stringify(objectData));
		}

		// Scenes
		var sceneList = gGuiBase.SceneSupport.getSceneList();
		for (i = 0; i < sceneList.length; i++) {
			// For each scene...
			var scene = sceneList[i];
			
			// Give it a folder
			var sceneFolder = scenes.folder(scene.mName);
			
			// Make a JSON file with that scene's vars
			var sceneData = {};
			sceneData[0] = scene.mID;
			sceneData[1] = scene.mNextCameraID;
			sceneFolder.file(scene.mName + ".json", JSON.stringify(sceneData));
			
			// Now do it for each camera of each scene (all cameras in one JSON file)
			var j;
			var camList = scene.getCameraList();
			var cameraData = {};
			
			var sceneViewCamera = scene.getSceneCamera();
			cameraData[0] = sceneViewCamera.mName;
			cameraData[1] = sceneViewCamera.mID;
			cameraData[2] = sceneViewCamera.getWCCenter();  // [x, y]
			cameraData[3] = sceneViewCamera.getWCWidth();
			cameraData[4] = sceneViewCamera.getViewport();  // [x, y, w, h]
			cameraData[5] = sceneViewCamera.getBackgroundColor();
			
			for (j = 0; j < camList.length; j++) {
				var cam = camList[j];
				cameraData[0 + ((j+1) * 8)] = cam.mName;
				cameraData[1 + ((j+1) * 8)] = cam.mID;
				cameraData[2 + ((j+1) * 8)] = cam.getWCCenter();  // [x, y]
				cameraData[3 + ((j+1) * 8)] = cam.getWCWidth();
				cameraData[4 + ((j+1) * 8)] = cam.getViewport();  // [x, y, w, h]
				cameraData[5 + ((j+1) * 8)] = cam.getBackgroundColor();
				cameraData[6 + ((j+1) * 8)] = gGuiBase.CameraSupport.getCameraCodeByName(cam.mName);
				cameraData[7 + ((j+1) * 8)] = cam.mLayer;
			}

			sceneFolder.file("cameras.json", JSON.stringify(cameraData));
			
			// Finally, do it for the instances (all instances in one JSON file)
			var instanceList = scene.getInstanceList();
			var instanceData = {};
			for (j = 0; j < instanceList.length; j++) {
				var inst = instanceList[j];
				
				instanceData[0 + (j * 9)] = inst.mName;
				instanceData[1 + (j * 9)] = inst.mID;
				if (inst instanceof GameObject) {
					// If it's a GO, get the relevant data
					var xf = inst.getXform();
					instanceData[2 + (j * 9)] = xf.getXPos();
					instanceData[3 + (j * 9)] = xf.getYPos();
					instanceData[4 + (j * 9)] = xf.getWidth();
					instanceData[5 + (j * 9)] = xf.getHeight();
					instanceData[6 + (j * 9)] = xf.getRotationInDegree();
					instanceData[7 + (j * 9)] = inst.getRenderable().getColor();
					instanceData[8 + (j * 9)] = inst.mOrderInLayer;
				} else {
					// Blank placeholders
					instanceData[2 + (j * 9)] = 0;
					instanceData[3 + (j * 9)] = 0;
					instanceData[4 + (j * 9)] = 0;
					instanceData[5 + (j * 9)] = 0;
					instanceData[6 + (j * 9)] = 0;
					instanceData[7 + (j * 9)] = 0;
					instanceData[8 + (j * 9)] = 0;
					
				}
			}
			sceneFolder.file("instances.json", JSON.stringify(instanceData));
			
			// save lights
			var lightSet = scene.mLightSet;
			var lightData = {};
			for (var j = 0; j < lightSet.numLights(); j++) {
				var light = lightSet.getLightAt(j);
				if (light instanceof Light) {
					lightData[0 + (j * 13)] = light.mID;
					lightData[1 + (j * 13)] = light.getColor();
					lightData[2 + (j * 13)] = light.mPosition;
					lightData[3 + (j * 13)] = light.mDirection;
					lightData[4 + (j * 13)] = light.mNear;
					lightData[5 + (j * 13)] = light.mFar;
					lightData[6 + (j * 13)] = light.mInner;
					lightData[7 + (j * 13)] = light.mOuter;
					lightData[8 + (j * 13)] = light.mIntensity;
					lightData[9 + (j * 13)] = light.mDropOff;
					lightData[10 + (j * 13)] = light.mLightType;
					lightData[11 + (j * 13)] = light.mIsOn;
					lightData[12 + (j * 13)] = light.mCastShadow;
				} else {
					lightData[0 + (j * 13)] = 0;
					lightData[1 + (j * 13)] = 0;
					lightData[2 + (j * 13)] = 0;
					lightData[3 + (j * 13)] = 0;
					lightData[4 + (j * 13)] = 0;
					lightData[5 + (j * 13)] = 0;
					lightData[6 + (j * 13)] = 0;
					lightData[7 + (j * 13)] = 0;
					lightData[8 + (j * 13)] = 0;
					lightData[9 + (j * 13)] = 0;
					lightData[10 + (j * 13)] = 0;
					lightData[11 + (j * 13)] = 0;
					lightData[12 + (j * 13)] = 0;
				}
			}
			sceneFolder.file("lights.json", JSON.stringify(lightData));
		}
		// Textures
		saveTextures(textures);
		// Normal maps
		saveNormals(textures);
		// Materials
		saveMaterials(materials);
		
		if (backup) {
			gGuiBase.Core.gBackup = files;
			return;   // Ends the function here, so it doesn't download anything when we just want to backup
		}
		
		// Download it
		files.generateAsync({type:"blob"}).then(function(blob) {
			// Use FileSaver to download it to the user's computer
			saveAs(blob, "my_project.zip");
		});
	};

	var saveMaterials = function(fileFolder) {
		var materialsList = gGuiBase.MaterialSupport.getMaterialList();
		var i;
		for (i in materialsList) {
			var materialData = {};
			var ambient = materialsList[i].getAmbient();
			var diffuse = materialsList[i].getDiffuse();
			var specular = materialsList[i].getSpecular();
			var j = 0;
			materialData[j++] = materialsList[i].mID;
			materialData[j++] = materialsList[i].getShininess();
			// this is hardcoded in load
			var k;
			for (k in ambient) {
				materialData[j] = ambient[k];
				j++;
			}
			for (k in diffuse) {
				materialData[j] = diffuse[k];
				j++;
			}
			for (k in specular) {
				materialData[j] = specular[k];
				j++;
			}
			fileFolder.file(materialsList[i].mID + ".json", JSON.stringify(materialData));
		}
	};
	
	var saveTextures = function (fileFolder) {
		var textureList = gGuiBase.TextureSupport.getTexList();
		var i;
		for (i = 0; i < textureList.length; i++) {
			var textureData = {};
			var textureName = textureList[i];
			var textureInfo = gEngine.ResourceMap.retrieveAsset(textureName);
			var textureImage = gGuiBase.TextureSupport.getImage(textureName);

			textureData[0] = textureInfo.mName;
			textureData[1] = textureImage.naturalWidth;
			textureData[2] = textureImage.naturalHeight;
			textureData[3] = textureImage.src;
			textureData[4] = false;	// is normal
			fileFolder.file(textureInfo.mName + ".json", JSON.stringify(textureData));
		}
	};
	
	var saveNormals = function (fileFolder) {
		var i;
		var normalNames = gGuiBase.LightSupport.getNormalNameList();
		for (i = 0; i < normalNames.length; i++) {
			var normalData = {};
			var normalName = normalNames[i];
			var normalImage = gGuiBase.LightSupport.getNormal(normalName);

			normalData[0] = normalName;
			normalData[1] = normalImage.naturalWidth;
			normalData[2] = normalImage.naturalHeight;
			normalData[3] = normalImage.src;
			normalData[4] = true; // is normal
			fileFolder.file(normalName + ".json", JSON.stringify(normalData));
		}
	};
	

	var loadMisc = function(files, callback) {
		// Global vars
		files.folder("Misc").forEach(function(relativePath, file) {
			// Read the ZipObject item as a JSON file, and then store the information where it belongs
			files.file(file.name).async("string").then(function success(content) {
				var data = JSON.parse(content);
				gGuiBase.ObjectSupport.mNextObjID = data[0];
				gGuiBase.InstanceSupport.mNextInstID = data[1];
				gGuiBase.SceneSupport.mNextSceneID = data[2];
			}, function error(error) {
				throw "LoadMisc: There were issues with loading your file.\n\nErrors:\n" + error;
			});
		});
		callback();
	};

	var loadMaterials = function (files, callback) {
		files.folder("Materials").forEach(function(relativePath, file) {
			// Read the ZipObject item as a JSON file, and then store the information where it belongs
			files.file(file.name).async("string").then(function success(content) {
				var data = JSON.parse(content);
				var materialName = data[0];
				var shinniness = data[1];
				var ambient = [data[2], data[3], data[4], data[5]];
				var diffuse = [data[6], data[7], data[8], data[9]];
				var specular = [data[10], data[11], data[12], data[13]];
				var material = new Material();
				material.mID = materialName;
				material.setShininess(shinniness);
				material.setAmbient(ambient);
				material.setDiffuse(diffuse);
				material.setSpecular(specular);
				callback(materialName, material);
			}, function error(error) {
				throw "loadMaterials: There were issues with loading your file.\n\nErrors:\n" + error;
			});
		});
	};

	var loadTextures = function(files, callback) {
		//Get the number of files we need to load
		var numOutstandingLoads = 0;
		files.folder("Textures").forEach(function(relativePath, file) {
			numOutstandingLoads++;
		});
		//If there are no files, load the scenes
		if (numOutstandingLoads === 0) {
			callback();
		}
		files.folder("Textures").forEach(function(relativePath, file) {

			// Read the ZipObject item as a JSON file, and then store the information where it belongs
			files.file(file.name).async("string").then(function success(content) {
				
				var data = JSON.parse(content);
				var textureName = data[0];
				var imageSrc = data[3];
				if(!data[4]) // is normalmap
					gEngine.Textures.loadTextureFromImageSrc(textureName, imageSrc, gGuiBase.TextureSupport.addTexture);
				else
					gEngine.Textures.loadTextureFromImageSrc(textureName, imageSrc, gGuiBase.LightSupport.addNormal);
			
				//Are all the loads done? If so, callback.
				while (true) {
					if (gEngine.ResourceMap.isAssetLoaded(textureName)) {
						numOutstandingLoads--;
						if (numOutstandingLoads === 0) callback();
						break;
					}
				}
			}, function error(error) {
				throw "LoadTextures: There were issues with loading your file.\n\nErrors:\n" + error;
			});
		});
	};


	var loadObjects = function(files, callback) {
		files.folder("Objects").forEach(function(relativePath, file) {

			// Read the ZipObject item as a JSON file, and then store the information where it belongs
			files.file(file.name).async("string").then(function success(content) {
				
				var data = JSON.parse(content);
				var obj;
				// Put code in system so it can recognize it before making objects
				var code = data[1];
				eval(code);
				var className = relativePath.substring(0, relativePath.lastIndexOf(".")); // Just get rid of .json
				var texture = data[2];
				if (texture == "None") {	// no texture, must be a renderable
					eval("obj = new " + className + "(new Renderable());");
				} else {
					//gGuiBase.TextureSupport.addTexture(texture);
					var materialName = data[9];	// already loaded in previously
					if (materialName) { //If materialname is set then it must be illumrenderable
						var normalMap = data[10];
						eval('obj = new ' + className + '(new IllumRenderable("' + texture + '","' + normalMap + '"));');
						var mat = gGuiBase.MaterialSupport.getMaterialByID(materialName);
						obj.getRenderable().setMaterial(mat);
					} else {	// else it is a texture renderable
						eval('obj = new ' + className + '(new TextureRenderable("' + texture + '"));');
					}
					
				}
				obj.mID = data[0];
				obj.mName = className;
				var xf = obj.getXform();
				xf.setXPos(data[3]);
				xf.setYPos(data[4]);
				xf.setWidth(data[5]);
				xf.setHeight(data[6]);
				xf.setRotationInDegree(data[7]);
				obj.getRenderable().setColor(data[8]);

				gGuiBase.ObjectSupport.setGameObjectByID(obj.mName, obj);
				gGuiBase.ObjectSupport.setGameObjectCodeByID(obj.mName, data[1]);
				
				gGuiBase.Core.updateObjectSelectList();
			}, function error(error) {
				throw "LoadObjects: There were issues with loading your file.\n\nErrors:\n" + error;
			});
		});
		callback();
	};

	var loadScenes = function(files, callback) {
		// Scenes (scenes, cameras, and instances)
		files.folder("Scenes").forEach(function(relativePath, file) {

			var currentScene;
			if (relativePath.endsWith("/")) {
				// Process each folder (technically iterates through everything but we will only do stuff if it's a folder)
				var sceneName = relativePath.substring(0, relativePath.indexOf("/"));

				// Use gCurrentScene to hold current scene info
				currentScene = new ClientScene(-1); // Number is temporary
				currentScene.initialize();
				currentScene.mName = sceneName;
				currentScene.mID = "unset";
				currentScene.mAllObject = [];
				currentScene.lightSet = new LightSet();
				currentScene.clearCameras();
				var sceneList = gGuiBase.SceneSupport.getSceneList();
				sceneList.push(currentScene);
				gGuiBase.SceneSupport.selectScene(sceneList.length - 1); // This starts the scene
				gGuiBase.Core.reinitializeSceneTab();
			} else {
				//files.folder("Scenes").folder(sceneName).forEach(function(relativePath2, file2) {
				files.file(file.name).async("string").then(function success(content) {
					var data = JSON.parse(content);
					var sceneName = relativePath.substring(0, relativePath.indexOf("/"));

					if (relativePath.endsWith("cameras.json")) {
						
						// This file contains (unless the user modified it) the data for every camera in the scene
						var i = 0;
						
						// Cameras auto-add themselves to gCurrentScene once created, so we need the scene selected first
						
						var idx = gGuiBase.SceneSupport.getSceneIndex(sceneName);
						gGuiBase.SceneSupport.selectScene(idx);
						gGuiBase.SceneSupport.gCurrentScene.mAllCamera = [];
						gGuiBase.SceneSupport.gCurrentScene.cameraObjects = [];

						while (typeof(data[i]) !== "undefined") {
							// add sceneCam to scene

							if (data[i+1] === "SceneViewCamera") {
								var name = data[i];
								var cam = new Camera(
									vec2.fromValues(data[i + 2][0], data[i + 2][1]),    // position of the camera
									data[i + 3],                                        // width of camera
									data[i + 4]                                         // viewport (orgX, orgY, width, height));
								);
								cam.setBackgroundColor(data[i + 5]);
								cam.mName = name;
								cam.mID = data[i + 1];
								gGuiBase.SceneSupport.gCurrentScene.setSceneCamera(cam);
							}
							// add camera to scene
							else {
								var name = data[i];
								var wcCenter = vec2.fromValues(data[i + 2][0], data[i + 2][1]);
								var wcWidth = data[i + 3];
								var viewportArray = data[i + 4];
								var bound = undefined;
								// add to window
								window[name] = function(wcCenter, wcWidth, viewportArray, bound) {
									Camera.call(this, wcCenter, wcWidth, viewportArray, bound);
								};
								gEngine.View.inheritPrototype(window[name], window["Camera"]);
								var code = data[i + 6];
								// set to window to code
								eval(code);
								// create cam
								var cam;
								eval('cam = new ' + name + '(wcCenter, wcWidth, viewportArray, bound);');
								cam.setBackgroundColor(data[i + 5]);
								cam.mName = name;
								cam.mID = data[i + 1];
								cam.mLayer = data[i + 7];

								var cameraObject = new CameraObject(cam);
								gGuiBase.SceneSupport.gCurrentScene.cameraObjects.push(cameraObject);
								gGuiBase.SceneSupport.gCurrentScene.addCamera(cam);
								gGuiBase.CameraSupport.setCameraCodeByName(name, code);
								gGuiBase.CameraSupport.setCameraByName(name, cam);
							}
							i += 8;
						}
						// Select the first scene when this process is done
						// gGuiBase.SceneSupport.selectScene(0);
					} else if (relativePath.endsWith("instances.json")) {
						// This file contains (unless the user modified it) the data for every instance in the scene
						var i = 0;
						while (typeof(data[i]) !== "undefined") {
							var inst;
							if (window[data[0]].prototype instanceof GameObject) {
								var gameObject = gGuiBase.ObjectSupport.getGameObjectByID(data[i + 0]);
								inst = gGuiBase.ObjectSupport.cloneGO(gameObject);
								// set xf
								var xf = inst.getXform();
								xf.setXPos(data[i + 2]);
								xf.setYPos(data[i + 3]);
								xf.setWidth(data[i + 4]);
								xf.setHeight(data[i + 5]);
								xf.setRotationInDegree(data[i + 6]);
								var rend = inst.getRenderable();
								rend.setColor(data[i + 7]);
								inst.mOrderInLayer = data[i + 8];
							} else {
								eval("inst = new " + data[i + 0] + "()");
							}
							inst.mName = data[i + 0];
							inst.mID = data[i + 1];
							
							// Add it to the scene
							var scene = gGuiBase.SceneSupport.getSceneByName(sceneName);
							gGuiBase.InstanceSupport.addInstance(inst, scene);
							i += 9;
						}
						// should be done adding instances refresh instances!
						gGuiBase.Core.updateInstanceSelectList();
						var instancesTab = gGuiBase.View.findTabByID("#Instances");
						instancesTab.refreshContent();
					} else if (relativePath.endsWith("lights.json")) {
						var idx = gGuiBase.SceneSupport.getSceneIndex(sceneName);
						gGuiBase.SceneSupport.selectScene(idx);
						var i = 0;
						while (typeof(data[i]) !== "undefined") {
							var light = new Light();
							light.mID = data[i + 0];
							light.setColor(data[i + 1]);
							light.mPosition = data[i + 2];
							light.mDirection = data[i + 3]
							light.mNear = data[i + 4];
							light.mFar = data[i + 5];
							light.mInner = data[i + 6];
							light.mOuter = data[i + 7];
							light.mIntensity = data[i + 8];
							light.mDropOff = data[i + 9];
							light.mLightType = data[i + 10];
							light.mIsOn = data[i + 11];
							light.mCastShadow = data[i + 12];
							
							
							gGuiBase.LightSupport.addLight(light);
							var lightObject = new LightObject(light);
							gGuiBase.SceneSupport.gCurrentScene.lightObjects.push(lightObject);
							i += 13;
						}
						
						gGuiBase.Core.reinitializeLightsTab();
						
						var lightsTab = gGuiBase.View.findTabByID("#Lights");
						lightsTab.refreshContent();
						
					} else if (relativePath.endsWith(".json")) {
						// Unless the user inserted a .json, this is the scene file
						var theScene = gGuiBase.SceneSupport.getSceneByName(sceneName);
						theScene.mName = relativePath.substring(0, relativePath.lastIndexOf("/"));
						theScene.mID = data[0];
						theScene.mNextCameraID = data[1];
						
					}
				}, function error(error) {
					throw "LoadScenes: There were issues with loading your file.\n\nErrors:\n" + error;
				});
			}        
		});
		callback();
	};

	var refreshView = function() {
		gGuiBase.Core.reinitializeTabs();
		gGuiBase.View.refreshAllTabContent();
	};
	
    var mPublic = {
        fileOpen: fileOpen,
		fileSave: fileSave,
		refreshView: refreshView
    };
    return mPublic;
}());