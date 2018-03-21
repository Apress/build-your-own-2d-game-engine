/*-----------------------------------------------------------------------------
//	Direct manipulation support
//	Supports translation, scaling, and rotation of objects within the scene
//	Author: Jason Herold/Thoof
-----------------------------------------------------------------------------*/

var gGuiBase = gGuiBase || { }; //Create the singleton if it hasn't already been created

gGuiBase.DirectManipulationSupport = (function() {
	
	var camera = null; //Camera that we're using to manipulate the instances
	var mouseX = 0;
	var mouseY = 0;
	
	var InteractionState = Object.freeze({
		NONE: 0,
		OBJECT_DRAG: 1,
		CAMERA_DRAG: 2,
		OBJECT_DRAG_CORNER: 3,
		CAMERA_DRAG_CORNER: 4,
		SCENECAMERA_DRAG: 5,
		OBJECT_DRAG_ROTATE: 6,
		LIGHT_DRAG: 7,
		LIGHT_DRAG_OUTER: 8,
		LIGHT_DRAG_INNER: 9,
		LIGHT_DRAG_FAR: 10,
		LIGHT_DRAG_NEAR: 11
	});
	
	var state = InteractionState.NONE;
	var selected = null; //The selected gameobject or camera
	
	//Keep track of some variables so we know if we're dragging
	var prevMouseDownState = false;
	var prevX = 0;
	var prevY = 0;
	var prevXPixel = 0;
	var prevYPixel = 0;

	var preventInteraction = false;

	// Drag booleans for an instance
	var draggingTop = false; 
	var draggingLeft = false;

	var draggingTopCamera = false;
	var draggingBotCamera = false;
	var draggingLeftCamera = false;
	var draggingRightCamera = false;

	var getSelected = function () {
		return selected;
	};
	
	
	var handleMouseInput = function() {
		if (!preventInteraction) {
			//Get the camera
			camera = gGuiBase.SceneSupport.gCurrentScene.getSceneCamera();
			if (camera === undefined || camera === null) return;
			
			//Get mouse position in world space
			mouseX = camera.mouseWCX();
			mouseY = camera.mouseWCY();
			
			//Mouse released, so clear the interaction state
			if (!gEngine.Input.isButtonPressed(gEngine.Input.mouseButton.Left) && prevMouseDownState) {
				state = InteractionState.NONE;
				//Reset some bools as well
				draggingTopCamera = false;
				draggingBotCamera = false;
				draggingLeftCamera = false;
				draggingRightCamera = false;
				
				draggingTop = false;
				draggingLeft = false;
			}
			
			//Set state based on where the user has pressed
			if (gEngine.Input.isButtonPressed(gEngine.Input.mouseButton.Left) && state === InteractionState.NONE) {
				//Gameobject is selected, so check for interactions
				if (gGuiBase.Core.selectedGameObject !== null && selected !== null && selected instanceof GameObject) {
					var xform = gGuiBase.Core.selectedGameObject.getXform();
					var selectObject = gGuiBase.SceneSupport.gCurrentScene.getSelectObject();
					if (mousePosOnRotationSquare(xform, mouseX, mouseY)) {
						state = InteractionState.OBJECT_DRAG_ROTATE;
					
					} else if (selectObject.mousePosOnTopLeftCorner(xform, mouseX, mouseY)) {
						state = InteractionState.OBJECT_DRAG_CORNER;
						draggingLeft = true;
						draggingTop = true;
					} else if (selectObject.mousePosOnTopRightCorner(xform, mouseX, mouseY)) {
						state = InteractionState.OBJECT_DRAG_CORNER;
						draggingTop = true;
						draggingLeft = false;
					} else if (selectObject.mousePosOnBottomLeftCorner(xform, mouseX, mouseY)) {
						state = InteractionState.OBJECT_DRAG_CORNER;
						draggingTop = false;
						draggingLeft = true;
					} else if (selectObject.mousePosOnBottomRightCorner(xform, mouseX, mouseY)) {
						state = InteractionState.OBJECT_DRAG_CORNER;
						draggingTop = false;
						draggingLeft = false;
					} else if (mousePosInTransform(xform, mouseX, mouseY)) { //Otherwise, drag without resizing
						state = InteractionState.OBJECT_DRAG;
					} else { //Not working with the current selected object -- select new object
						trySelect();
						if (selected === null) { //No object, so drag the scene camera
							state = InteractionState.SCENECAMERA_DRAG;
						}
					}
				//Camera is selected, so check for interactions
				} else if (selected !== null && selected instanceof CameraObject) {
					if (selected.mouseOnTopBox(mouseX, mouseY)) {
						state = InteractionState.CAMERA_DRAG_CORNER;
						draggingTopCamera = true;
					} else if (selected.mouseOnBotBox(mouseX, mouseY)) {
						state = InteractionState.CAMERA_DRAG_CORNER;
						draggingBotCamera = true;
					} else if (selected.mouseOnLeftBox(mouseX, mouseY)) {
						state = InteractionState.CAMERA_DRAG_CORNER;
						draggingLeftCamera = true;
					} else if (selected.mouseOnRightBox(mouseX, mouseY)) {
						state = InteractionState.CAMERA_DRAG_CORNER;
						draggingRightCamera = true;
					} else if (mouseInCameraObject(selected, mouseX, mouseY)){
						state = InteractionState.CAMERA_DRAG;
					} else { //Not working with the current selected object -- select new object
						trySelect();
						if (selected === null) { //No object, so drag the scene camera
							state = InteractionState.SCENECAMERA_DRAG;
						}
					}
				} else if (selected !== null && selected instanceof LightObject) {
					if (selected.mouseInOuterSquare(mouseX, mouseY)) {
						state = InteractionState.LIGHT_DRAG_OUTER;
					} else if (selected.mouseInInnerSquare(mouseX, mouseY)) {
						state = InteractionState.LIGHT_DRAG_INNER;
					} else if (selected.mouseInFarSquare(mouseX, mouseY)) {
						state = InteractionState.LIGHT_DRAG_FAR;
					} else if (selected.mouseInNearSquare(mouseX, mouseY)) {
						state = InteractionState.LIGHT_DRAG_NEAR;
					} else if (selected.mouseInIcon(mouseX, mouseY)) {
						state = InteractionState.LIGHT_DRAG;
					} else {
						trySelect();
						if (selected === null) {
							state = InteractionState.SCENECAMERA_DRAG;
						}
					}
				} else { //Nothing selected -- try to select
					//Only try to select on initial click
					if (prevMouseDownState === false) {
						trySelect();
						if (selected === null) { //No object, so drag the scene camera
							state = InteractionState.SCENECAMERA_DRAG;
						}
					}	
				}
			}

			//Handle state
			if (state === InteractionState.OBJECT_DRAG) {
				dragObject();
			} else if (state === InteractionState.OBJECT_DRAG_CORNER) {
				dragObjectCorner();
			} else if (state === InteractionState.OBJECT_DRAG_ROTATE) {
				dragObjectRotate();
			} else if (state === InteractionState.CAMERA_DRAG) {
				dragCamera();
			} else if (state === InteractionState.CAMERA_DRAG_CORNER) {
				dragCameraEdge();
			} else if (state === InteractionState.SCENECAMERA_DRAG) {
				dragSceneCamera();
			} else if (state === InteractionState.LIGHT_DRAG) {
				dragLight();
			} else if (state === InteractionState.LIGHT_DRAG_OUTER) {
				resizeLightOuter();
			} else if (state === InteractionState.LIGHT_DRAG_INNER) {
				resizeLightInner();
			} else if (state === InteractionState.LIGHT_DRAG_FAR) {
				resizeLightFar();
			} else if (state === InteractionState.LIGHT_DRAG_NEAR) {
				resizeLightNear();
			}
			
			//Record the current state of the mouse before the next call of this function
			prevMouseDownState = gEngine.Input.isButtonPressed(gEngine.Input.mouseButton.Left);
			prevX = mouseX;
			prevY = mouseY;
			prevXPixel = gEngine.Input.getMousePosX();
			prevYPixel = gEngine.Input.getMousePosY();
		}
	};
	
	//Handle zooming in and out using up and down arrows
	var handleKeyboardInput = function() {
		var camera = gGuiBase.SceneSupport.gCurrentScene.getSceneCamera();
		if (camera === undefined || camera === null) return;
		
		if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)) {
			camera.zoomBy(0.9);
		} else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
			camera.zoomBy(1.1);
		}
	};
	
	//Call keyboard input every 10ms
	setInterval(handleKeyboardInput, 10);
	
	//Call the above function when mouse events happen
	window.addEventListener('mousedown', handleMouseInput);
    window.addEventListener('mouseup', handleMouseInput);
    window.addEventListener('mousemove', handleMouseInput);
	
	//Handle object drag state
	var dragObject = function() {
		var xform = gGuiBase.Core.selectedGameObject.getXform();
		var selectObject = gGuiBase.SceneSupport.gCurrentScene.getSelectObject();
		xform.setXPos(mouseX);
		xform.setYPos(mouseY);
		refreshGameObjectTransform();	
	};
	
	//Handle camera drag state
	var dragCamera = function() {
		var currentInterpolation = selected.cameraRef.mCameraState.mCenter.getConfig();
		selected.cameraRef.configInterpolation(1, 1);
		selected.cameraRef.setWCCenter(mouseX, mouseY);
		refreshCameraTransform();
		Camera.prototype.update.call(selected.cameraRef);
		selected.cameraRef.configInterpolation(currentInterpolation[0], currentInterpolation[1]);
		
	};
	
	//Handle object corner drag state (resizing)
	var dragObjectCorner = function() {
		var xform = gGuiBase.Core.selectedGameObject.getXform();
		var selectObject = gGuiBase.SceneSupport.gCurrentScene.getSelectObject();
		
		var x = xform.getXPos();
		var y = xform.getYPos();
		var w = xform.getWidth();
		var h = xform.getHeight();
		var r = xform.getRotationInRad();
		
		var mousePos = vec2.fromValues(mouseX, mouseY);
		
		//Apply inverse rotation to fit the object & mouse position to the x/y axis
		mousePos = rotatePoint(x, y, -r, mousePos);
		
		var dx = mousePos[0] - x;
		var dy = mousePos[1] - y;
		
		var width = dx * 2;
		var height = dy * 2;
		
		if (draggingLeft) width = -width;
		if (!draggingTop) height = -height;
		
		if (width < 0.25) width = 0.25;
		if (height < 0.25) height = 0.25;
		
		xform.setWidth(width);
		xform.setHeight(height);
		
		refreshGameObjectTransform();
	};
	
	//Handle camera edge drag (resizing)
	var dragCameraEdge = function() {
		var cameraCenter = selected.cameraRef.getWCCenter();
		var dx = mouseX - cameraCenter[0];
		var dy = mouseY - cameraCenter[1];
		
		var width = dx * 2;
		
		if (draggingTopCamera || draggingBotCamera) {
			width = dy * (selected.cameraRef.getWCWidth() / selected.cameraRef.getWCHeight()) * 2;
		}
		
		if (draggingLeftCamera || draggingBotCamera) width = -width;
		
		if (width < 0) width = 0;
		
		var currentInterpolation = selected.cameraRef.mCameraState.mWidth.getConfig();
		selected.cameraRef.configInterpolation(1, 0.01);
		selected.cameraRef.setWCWidth(width);
		refreshCameraTransform();
		Camera.prototype.update.call(selected.cameraRef);
		selected.cameraRef.configInterpolation(currentInterpolation[0], currentInterpolation[1]);
	};
	
	//Handle object rotate
	var dragObjectRotate = function() {
		var xform = gGuiBase.Core.selectedGameObject.getXform();
		var dx = mouseX - xform.getXPos();
		var dy = mouseY - xform.getYPos();
		
		var angle = Math.atan2(dy, dx);
		var angleInDegree = angle * 180 / Math.PI;
	
		if (angleInDegree < 0) { //Don't use negative degree because the slider is 0-360
			angleInDegree += 360;
		}
		xform.setRotationInDegree(angleInDegree);
		
		refreshGameObjectTransform();
	};
	
	// Moves the scene camera around
	var dragSceneCamera = function() {
		var cameraCenter = camera.getWCCenter();
		//var dx = (mouseX - prevX) + cameraCenter[0];
		//var dy = (mouseY - prevY) + cameraCenter[1];
		
		var mouseXPixel = gEngine.Input.getMousePosX();
		var mouseYPixel = gEngine.Input.getMousePosY();
		
		var cameraPositionPixel = vec3.fromValues(cameraCenter[0], cameraCenter[1], 0);
		cameraPositionPixel = camera.wcPosToPixel(cameraPositionPixel);
		
		var dx = (mouseXPixel - prevXPixel) * 3 + cameraPositionPixel[0];
		var dy = (mouseYPixel - prevYPixel) * 3 + cameraPositionPixel[1];
		
		dx = camera.positionWCX(dx);
		dy = camera.positionWCY(dy);
		
		camera.setWCCenter(dx, dy);
	};
	
	// Handle dragging a light icon
	var dragLight = function() {
		var light = selected.lightRef;
		light.mPosition = vec3.fromValues(mouseX, mouseY, light.mPosition[2]);
		refreshLightTransform();
	};

	var resizeLightInner = function () {
		if (mouseY > selected.lightRef.mPosition[1]) {
			selected.lightRef.mInner = 0.01;
			return;
		}
		var radius = Math.abs(mouseY - selected.lightRef.mPosition[1]);
		if (radius > selected.lightRef.mOuter) {
			radius = selected.lightRef.mOuter;
		}
		else if (radius < 0.01) {
			radius = 0.01
		}
		selected.lightRef.mInner = radius;
		refreshLightTransform();
	};

	var resizeLightOuter = function () {
		if (mouseY < selected.lightRef.mPosition[1])
			return; // do not go past middle
		var radius = Math.abs(mouseY - selected.lightRef.mPosition[1]);
		// error check
		if (radius < selected.lightRef.mInner)
			radius = selected.lightRef.mInner;
		selected.lightRef.mOuter = radius;
		refreshLightTransform();
	};

	var resizeLightNear = function () {
		if (mouseX > selected.lightRef.mPosition[0]) return;
		var radius = Math.abs(mouseX - selected.lightRef.mPosition[0]);
		if (radius > selected.lightRef.mFar) {
			radius = selected.lightRef.mFar;
		} else if (radius < 0.01) {
			radius = 0.01
		}
		selected.lightRef.mNear = radius;
		refreshLightTransform();
	};
	
	var resizeLightFar = function () {
		if (mouseX < selected.lightRef.mPosition[0]) return; // do not go past middle
		var radius = Math.abs(mouseX - selected.lightRef.mPosition[0]);
		// error check
		if (radius < selected.lightRef.mNear)
			radius = selected.lightRef.mNear;
		selected.lightRef.mFar = radius;
		refreshLightTransform();
	};
	
	//Selects gameobject or camera
	var trySelect = function() {
		//Try to find an instance
		var instances = gGuiBase.SceneSupport.gCurrentScene.getInstanceList();
		var selectedGameObject = gGuiBase.Core.selectedGameObject;
		var mouseInXform = false;
		var i = instances.length-1;
		for (i = instances.length-1; i >= 0; i--) { //Loop backwards since the last drawn object should be the first selected
			var xform = instances[i].getXform();
			mouseInXform = mousePosInTransform(xform, mouseX, mouseY);
			if (mouseInXform) break;

			if (selected instanceof GameObject && selected === instances[i]) {
				mouseInXform = mousePosOnRotationSquare(xform, mouseX, mouseY);
				if (mouseInXform) break;
				gGuiBase.Core.selectedGameObject = instances[i]; //Workaround
				var selectObject = new SelectionObject(xform.getXPos(), xform.getYPos(), xform.getWidth(), xform.getHeight());
				selectObject.update();
				mouseInXform = selectObject.mousePosOnTopLeftCorner(xform, mouseX, mouseY);
				if (mouseInXform) break;
				mouseInXform = selectObject.mousePosOnTopRightCorner(xform, mouseX, mouseY);
				if (mouseInXform) break;
				mouseInXform = selectObject.mousePosOnBottomLeftCorner(xform, mouseX, mouseY);
				if (mouseInXform) break;
				mouseInXform = selectObject.mousePosOnBottomRightCorner(xform, mouseX, mouseY);
				if (mouseInXform) break;
			}
			
		}
		gGuiBase.Core.selectedGameObject = selectedGameObject; //Workaround
		
		//Try to find a camera
		var mouseInCameraIcon = false;
		var cameras = gGuiBase.SceneSupport.gCurrentScene.getCameraObjectList();
		var j = 0;
		for (j = 0; j < cameras.length; j++) {
			mouseInCameraIcon = mouseInCameraObject(cameras[j], mouseX, mouseY);
			if (mouseInCameraIcon) break;
			
			if (selected instanceof CameraObject && cameras[j] === selected) {
				mouseInCameraIcon = cameras[j].mouseOnTopBox(mouseX, mouseY);
				if (mouseInCameraIcon) break;
				mouseInCameraIcon = cameras[j].mouseOnBotBox(mouseX, mouseY);
				if (mouseInCameraIcon) break;
				mouseInCameraIcon = cameras[j].mouseOnLeftBox(mouseX, mouseY);
				if (mouseInCameraIcon) break;
				mouseInCameraIcon = cameras[j].mouseOnRightBox(mouseX, mouseY);
				if (mouseInCameraIcon) break;
			}
		}
		
		//Try to find a light
		var mouseInLightIcon = false;
		var lights = gGuiBase.SceneSupport.gCurrentScene.lightObjects;
		var k = 0;
		for (k = 0; k < lights.length; k++) {
			mouseInLightIcon = lights[k].mouseInIcon(mouseX, mouseY);
			if (mouseInLightIcon) break;
			
			if (selected instanceof LightObject && lights[k] === selected) {
				mouseInLightIcon = lights[k].mouseInOuterSquare(mouseX, mouseY);
				if (mouseInLightIcon) break;
			}
		}
	
		//If a camera was found
		if (mouseInCameraIcon) {
			//If we previously had a gameobject selected, deselect it
			if (selected instanceof GameObject) {
				gGuiBase.SceneSupport.gCurrentScene.setSelectObject(null);
				gGuiBase.SceneSupport.gCurrentScene.setRotationObject(null);
			}
			//If we previously had a camera/light, stop drawing things that only display while selected
			if (selected instanceof CameraObject || selected instanceof LightObject) {
				selected.toggleDrawBorder(false);
			}

			gGuiBase.Core.selectDetailsCamera(cameras[j].cameraRef.mName);
			selected = cameras[j];
			
			cameras[j].toggleDrawBorder(true);
		//If a light was found
		} else if (mouseInLightIcon) {
			// If we previously had a gameobject selected, deselect
			if (selected instanceof GameObject) {
				gGuiBase.SceneSupport.gCurrentScene.setSelectObject(null);
				gGuiBase.SceneSupport.gCurrentScene.setRotationObject(null);
			}
			
			if (selected instanceof CameraObject || selected instanceof LightObject) {
				selected.toggleDrawBorder(false);
			}
			
			gGuiBase.Core.selectDetailsLight(lights[k].lightRef.mID);
			selected = lights[k];
			lights[k].toggleDrawBorder(true);
		//If a gameobject was found
		} else if (mouseInXform) {
		
			if (selected instanceof CameraObject || selected instanceof LightObject) {
				selected.toggleDrawBorder(false);
			}
			
			gGuiBase.Core.selectInstanceDetails(instances[i].mID);
			selected = instances[i];
			
			//Make a new selection object and rotation object
			var selectObject = gGuiBase.SceneSupport.gCurrentScene.getSelectObject();
			var xform = gGuiBase.Core.selectedGameObject.getXform();
			selectObject = new SelectionObject(xform.getXPos(), xform.getYPos(), xform.getWidth(), xform.getHeight());
			
			gGuiBase.SceneSupport.gCurrentScene.setSelectObject(selectObject);
			
			var rotationObject = gGuiBase.SceneSupport.gCurrentScene.getRotationObject();
			rotationObject = new RotationObject(xform.getXPos(), xform.getYPos(), xform.getWidth(), xform.getHeight(), xform.getRotationInRad());
			
			gGuiBase.SceneSupport.gCurrentScene.setRotationObject(rotationObject);
		
		//If nothing was found, clear
		} else { //Clicked on empty
			if (selected instanceof CameraObject || selected instanceof LightObject) {
				selected.toggleDrawBorder(false);
			}
			gGuiBase.Core.selectedGameObject = null;
			gGuiBase.Core.selectedCamera = null;
			selected = null;
			gGuiBase.Core.emptyDetailsTab();
		}
	};
	
	//Update the details TransformContent. Only call this when a GameObject is selected
	var refreshGameObjectTransform = function() {
		var detailsTab = gGuiBase.View.findTabByID("#Details");
		var detailsTransform = detailsTab.getContentObject("#TransformContent");
		detailsTransform.updateFields(gGuiBase.Core.selectedGameObject);
		detailsTab.refreshSpecificContent("#TransformContent");
	};
	
	//Update the details CameraTransformContent. Only call this when a Camera is selected
	var refreshCameraTransform = function() {
		var detailsTab = gGuiBase.View.findTabByID("#Details");
		var detailsTransform = detailsTab.getContentObject("#CameraTransformContent");
		detailsTransform.updateFields(selected.cameraRef);
		detailsTab.refreshSpecificContent("#CameraTransformContent");
	};
	
	//Update the details LightTransformContent. Only call this when a Light is selected
	var refreshLightTransform = function() {
		var detailsTab = gGuiBase.View.findTabByID("#Details");
		var detailsTransform = detailsTab.getContentObject("#LightTransformContent");
		detailsTransform.updateFields(selected.lightRef);
		detailsTab.refreshSpecificContent("#LightTransformContent");
	};
	
	//Checks if the mouse position is within the object transform
	var mousePosInTransform = function(xform, mouseX, mouseY) {
		//Since it's not selected, have to calculate the positions here instead of in SelectionObject
		var x = xform.getXPos();
		var y = xform.getYPos();
		var w = xform.getWidth();
		var h = xform.getHeight();
		var r = xform.getRotationInRad();
		var radius = Math.sqrt((w/2)*(w/2) + (h/2)*(h/2)); //Get the radius of the containing circle for this gameobject
		
		//Get the angle to each of the four corners of the gameobject
		var angleToTopRight = Math.atan2(h/2, w/2);
		var angleToTopLeft = Math.PI - angleToTopRight;
		var angleToBotLeft = Math.PI + angleToTopRight;
		var angleToBotRight = -angleToTopRight;
		
		// Get the location of the four corners of the gameobject
		var topLeftX = Math.cos(r + (angleToTopLeft)) * radius + x;
		var topLeftY = Math.sin(r + (angleToTopLeft)) * radius + y;
		
		var topRightX = Math.cos(r + angleToTopRight) * radius + x;
		var topRightY = Math.sin(r + angleToTopRight) * radius + y;
		
		var botLeftX = Math.cos(r + (angleToBotLeft)) * radius + x;
		var botLeftY = Math.sin(r + (angleToBotLeft)) * radius + y;
		
		var botRightX = Math.cos(r + (angleToBotRight)) * radius + x;
		var botRightY = Math.sin(r + (angleToBotRight)) * radius + y;
		
		var topLeft = vec2.fromValues(topLeftX, topLeftY);
		var topRight = vec2.fromValues(topRightX, topRightY);
		var botLeft = vec2.fromValues(botLeftX, botLeftY);
		var botRight = vec2.fromValues(botRightX, botRightY);
		var mousePos = vec2.fromValues(mouseX, mouseY);
		
		//Apply inverse rotation to fit the object & mouse position to the x/y axis
		mousePos = rotatePoint(x, y, -r, mousePos);
		topLeft = rotatePoint(x, y, -r, topLeft);
		topRight = rotatePoint(x, y, -r, topRight);
		botLeft = rotatePoint(x, y, -r, botLeft);
		botRight = rotatePoint(x, y, -r, botRight);

		if ((mousePos[0] > topLeft[0]) && (mousePos[0] < topRight[0]) &&
			(mousePos[1] > botLeft[1]) && (mousePos[1] < topLeft[1])) {
			return true;
		}

		return false;
	};
	
	//Checks if the mouse is within the rotation square of the currently selected object
	var mousePosOnRotationSquare = function(transform, mouseX, mouseY) {
		var camera = gGuiBase.SceneSupport.gCurrentScene.getSceneCamera();
		var camW = camera.getWCWidth();
		var boxSize = camW / 50 * 0.75;
		
		var x = transform.getXPos();
		var y = transform.getYPos();
		var w = transform.getWidth();
		var h = transform.getHeight();
		var r = transform.getRotationInRad();
	
		var radius = Math.sqrt((w*w) + (h*h)) / 2;
		var endPointX = Math.cos(r) * radius + x;
		var endPointY = Math.sin(r) * radius + y;
		
		var distance = Math.sqrt(Math.pow((mouseX - endPointX), 2) + Math.pow((mouseY - endPointY), 2));
		if (distance < boxSize) return true;
		return false;
		
	};
	
	//Checks if the mouse is within a camera icon (For selection)
	var mouseInCameraObject = function(cameraObject, mouseX, mouseY) {
		var camera = cameraObject.cameraRef;
		
		var x = camera.getWCCenter()[0];
		var y = camera.getWCCenter()[1];
		var width = cameraObject.CAMERA_ICON_WIDTH;

		return mouseInBound(mouseX, mouseY, x, y, width);
	};
	
	//General function for checking if mouse is within a bound and not rotated
	var mouseInBound = function (mouseX, mouseY, x, y, width) {
		if ((mouseX > (x - width / 2)) && (mouseX < (x + width / 2)) &&
			(mouseY < (y + width / 2)) && (mouseY > (y - width / 2))) {
			return true;
		}
		return false;
	};
	
	//Rotates a point around a given origin and angle
	var rotatePoint = function (originX, originY, angle, point) {
		var s = Math.sin(angle);
		var c = Math.cos(angle);
		
		point[0] -= originX;
		point[1] -= originY;
		
		var xnew = point[0] * c - point[1] * s;
		var ynew = point[0] * s + point[1] * c;
		
		point[0] = xnew + originX;
		point[1] = ynew + originY;
		
		return point;
	};
	
	var setPreventInteraction = function(prevent) {
		preventInteraction = prevent;
	};
	
	var resetInteraction = function() {
		preventInteraction = false;
		selected = null;
		draggingTopCamera = false;
		draggingBotCamera = false;
		draggingLeftCamera = false;
		draggingRightCamera = false;
		
		draggingTop = false;
		draggingLeft = false;
		
		state = InteractionState.NONE;
	};
	
	var clearForSceneSwap = function() {
		preventInteraction = false;
		selected = null;
		draggingTopCamera = false;
		draggingBotCamera = false;
		draggingLeftCamera = false;
		draggingRightCamera = false;
		draggingTop = false;
		draggingLeft = false;
		state = InteractionState.NONE;
		gGuiBase.Core.selectedGameObject = null;
	};
	
    var mPublic = {
		getSelected: getSelected,
       	mouseInBound: mouseInBound,
	   	rotatePoint: rotatePoint,
	   	//currentCameraObject: currentCameraObject,
	   	setPreventInteraction: setPreventInteraction,
	   	resetInteraction: resetInteraction,
	   	clearForSceneSwap: clearForSceneSwap
    };
    return mPublic;
}());