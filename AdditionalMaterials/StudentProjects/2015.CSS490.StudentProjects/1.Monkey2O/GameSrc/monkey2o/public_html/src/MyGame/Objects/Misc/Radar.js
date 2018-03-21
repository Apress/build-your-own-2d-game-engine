/*jslint node: true, vars: true */
/*global gEngine, vec2, Enemy */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

//------------------------------------------------------------------------------
function Radar(options) {
  this.mCamera = null;
  this.mMainCamera = options.mainCamera;
  this.mPlayer = options.player;
  this.mBG = new Renderable();
  this.mBG.setColor([1, 1, 1, 0.3]);
  
  this.init();
}

//------------------------------------------------------------------------------
Radar.prototype.init = function() {
  var mainCameraCenter = this.mMainCamera.getWCCenter();

  this.mCamera = new Camera(
    vec2.fromValues(mainCameraCenter[0], mainCameraCenter[1]), // position of the camera
    120,                   // width of camera
    [0, 0, 1280, 720]      // viewport (orgX, orgY, width, height)
  );

  this.mCamera.setBackgroundColor([0, 0, 0, 0]);    // Special case for 0 that the camera will not draw the bg
  this.updateViewport();
};

//------------------------------------------------------------------------------
Radar.prototype.update = function() {
  this.mCamera.update();
  
  this.updateViewport();
  this.updateCenter();
};

//------------------------------------------------------------------------------
Radar.prototype.draw = function() {
  this.mCamera.setupViewProjection();
  
  this.mPlayer.drawRadarRepresentation(this.mCamera);
  this.mBG.draw(this.mCamera);
  
  var length = gEngine.LayerManager.layerSize(gEngine.eLayer.eActors);
  var i;
  for (i = 0; i < length; i++) {
      var obj = gEngine.LayerManager.get(gEngine.eLayer.eActors, i);
      if (obj instanceof Enemy) {
          obj.drawRadarRepresentation(this.mCamera);
      }
  }
};

//------------------------------------------------------------------------------
Radar.prototype.drawAsChild = function() {
  Radar.prototype.draw.call(this);
}

//------------------------------------------------------------------------------
Radar.prototype.updateViewport = function() {
  var mainCameraViewport = this.mMainCamera.getViewport();
  
  var cameraWidth = mainCameraViewport[2] * 0.2;
  var cameraHeight = mainCameraViewport[3] * 0.2;
  this.mBG.getXform().setSize(cameraWidth, cameraHeight);
  
  var cameraOriginX = mainCameraViewport[2] - cameraWidth;
  var cameraOriginY = mainCameraViewport[3] + mainCameraViewport[1] - cameraHeight;
  this.mBG.getXform().setXPos(this.mPlayer.getXform().getXPos());
  this.mBG.getXform().setYPos(this.mPlayer.getXform().getYPos());
  
  this.mCamera.setViewport([cameraOriginX, cameraOriginY, cameraWidth, cameraHeight]);
};

//------------------------------------------------------------------------------
Radar.prototype.updateCenter = function() {
  var mainCameraCenter = this.mMainCamera.getWCCenter();
  
  this.mCamera.setWCCenter(mainCameraCenter[0], mainCameraCenter[1]);
};
