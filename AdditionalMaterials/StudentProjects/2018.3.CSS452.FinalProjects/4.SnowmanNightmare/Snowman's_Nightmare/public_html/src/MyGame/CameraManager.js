/* File: CameraManager.js 
 *
 */

/*jslint node: true, vars: true, evil: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false, vec2: false, HelperFunctions */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var CameraManager = CameraManager || { };

CameraManager.Core = (function () {

    var numOfCams = null;
    var VPSize = null;
    var zoomCams = null;
    var zoomCamsCheckedOut = null;
    var mainCamera = null;
    var BGWidth = null;
    var CameraCanvasWidth = null;
    var CameraCenter = null;
    var CanvasWidth = null;
    var CanvasHeight = null;

    var initCameraManager = function (numCams, zoomCamsSize) {

        BGWidth = 1024;
        CameraCanvasWidth = HelperFunctions.Core.getCameraWidth();
        CameraCenter = HelperFunctions.Core.getCameraCenter();
        CanvasWidth = HelperFunctions.Core.getCanvasWidth();
        CanvasHeight = HelperFunctions.Core.getCanvasHeight();

        numOfCams = numCams;
        VPSize = zoomCamsSize;

        zoomCams = _createZoomCams([960, 0], 64);
        zoomCamsCheckedOut = new Array(numOfCams);
        zoomCamsCheckedOut.fill(false);

        mainCamera = new Camera(
        vec2.fromValues(CameraCenter, CameraCenter),  // position of the camera
        CameraCanvasWidth,                                 // width of camera
        [0, 0, CanvasWidth, CanvasWidth]              // viewport (orgX, orgY, width, height)
        );
        mainCamera.setBackgroundColor([1, 1, 1, 1]);

    };

    var checkoutCamera = function () {

        for(var i = 0; i < numOfCams; i++){
            if(!zoomCamsCheckedOut[i]){
                zoomCamsCheckedOut[i] = true;
                return zoomCams.getObjectAt(i);
            }
        }
        
        return null;
    };
    
    var checkoutIthCamera = function (i) {

        if(!zoomCamsCheckedOut[i]){
            zoomCamsCheckedOut[i] = true;
            return zoomCams.getObjectAt(i);
        }
        
        return null;
    };
    
    var returnIthCamera = function (i) {
        
        if(zoomCamsCheckedOut[i]){
            zoomCamsCheckedOut[i] = false;
        }
        
    };
    
    var returnCamera = function () {
        
        for(var i = 0; i < numOfCams; i++){
            if(zoomCamsCheckedOut[i]){
                zoomCamsCheckedOut[i] = false;
            }
        }
        
    };

    var draw = function () {

        _drawCamera(mainCamera);

        for(var i = 0; i < numOfCams; i++){
            if(zoomCamsCheckedOut[i])
                _drawCamera(zoomCams.getObjectAt(i));
        }

    };
    
    var update = function () {

        mainCamera.update();
        
        for(var i = 0; i < numOfCams; i++){
            if(zoomCamsCheckedOut[i])
                zoomCams.getObjectAt(i).update();
        }

    };
    
    var getMouseLocation = function () {

        if(mainCamera === null)
            return [0, 0];
        else
            return [mainCamera.mouseWCX(), mainCamera.mouseWCY()];

    };
    
    var clampAtBoundary = function (xForm, zone) {
        
        mainCamera.clampAtBoundary(xForm, zone);
        
    };
    
    var getMainCamera = function () {
      
        return mainCamera;
        
    };
    
    var shakeMainCam = function (xDelta, yDelta, shakeFrequency, duration) {
        
        mainCamera.shake(xDelta, yDelta, shakeFrequency, duration);
        
    };

    var _drawCamera = function (camera) {

        //setup the view projection
        camera.setupViewProjection();
        
        gEngine.LayerManager.drawAllLayers(camera);

    };
    
    var _createZoomCams = function (startingPoint, size) {

        var cams = new GameObjectSet();

        for(var i = 0; i < numOfCams; i++) {
            // * (i + 1)
            cams.addToSet(_createZoomCam([startingPoint[0], startingPoint[1] + (VPSize * i)], size));
        }

        return cams;

    };

    var _createZoomCam = function (point, WCSize) {

        // set up the cameras
        var cam = new Camera(
            vec2.fromValues(0, 0),   // position of the camera
            WCSize+100,                       // width of camera
            [point[0], point[1], VPSize, VPSize]           // viewport (orgX, orgY, width, height)
        );
        cam.setBackgroundColor([1, 1, 1, 1]);
        cam.configInterpolation(1, 0.001);

        return cam;

    };
    
    var mPublic = {
        initCameraManager: initCameraManager,
        checkoutCamera: checkoutCamera,
        returnCamera: returnCamera,
        checkoutIthCamera: checkoutIthCamera,
        returnIthCamera: returnIthCamera,
        shakeMainCam: shakeMainCam,
        draw: draw,
        update: update,
        getMouseLocation: getMouseLocation,
        clampAtBoundary: clampAtBoundary,
        getMainCamera: getMainCamera
    };

    return mPublic;
}());

     