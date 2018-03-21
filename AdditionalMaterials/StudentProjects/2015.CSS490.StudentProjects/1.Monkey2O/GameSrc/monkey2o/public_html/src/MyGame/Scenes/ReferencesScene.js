/* File: ReferencesScene.js 
 * Date: 12/08/2015
 * Author(s): Dexter Hu
 * 
 * The References scene.
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, vec2*/
/* find out more about jslint: http://www.jslint.com/help.html */

'use strict';  // Operate in Strict mode such that variables must be declared before used!

function ReferencesScene() {
    Scene.call(this);

    this.kImage = 'assets/sprites/title_refs.png';
    
    this.mLogo = null;
    this.mCamera = null;
}

//------------------------------------------------------------------------------
gEngine.Core.inheritPrototype(ReferencesScene, Scene);

//------------------------------------------------------------------------------
ReferencesScene.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kImage);
};

//------------------------------------------------------------------------------
ReferencesScene.prototype.unloadScene = function() {
    gEngine.LayerManager.cleanUp();
    gEngine.Textures.unloadTexture(this.kImage);
    gEngine.Core.startScene(new StartScene());
};

//------------------------------------------------------------------------------
ReferencesScene.prototype.initialize = function() {
    this.initCamera();
    this.mLogo = new LightRenderable(this.kImage);
    this.mLogo.getXform().setSize(50, 50);
    var l = new Light();
    l.getIntensity(1);
    l.setNear(100);
    l.setFar(100);
    this.mLogo.addLight(l);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mLogo);
    Scene.prototype.initialize.call(this);
};

//------------------------------------------------------------------------------
ReferencesScene.prototype.draw = function() {
    // Clear the canvas.
    gEngine.Core.clearCanvas([0.2, 0.2, 0.2, 1]);
    
    // Set up the camera projection.
    this.mCamera.setupViewProjection();
    
    // Draw all layers.
    gEngine.LayerManager.drawAllLayers(this.mCamera);
};

//------------------------------------------------------------------------------
ReferencesScene.prototype.update = function() {  
    gEngine.LayerManager.updateAllLayers();
  
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.M)) {
        gEngine.GameLoop.stop();
    }
};

//------------------------------------------------------------------------------
ReferencesScene.prototype.initCamera = function() {  
  this.mCamera = new Camera(
    vec2.fromValues(0, 0), // position of the camera
    100,                   // width of camera
    [0, 0, 1280, 720]      // viewport (orgX, orgY, width, height)
  );

  this.mCamera.setBackgroundColor([0.1, 0.1, 0.1, 1]);
};
