/* 
 * The template for a scene.
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Transform: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

// Constructor
function Scene() {
  this.mCamera = null;
  this.mIsInitialized = false;
}

//<editor-fold desc="functions subclass should override">

// Begin Scene: must load all the scene contents
// when done 
//  => start the GameLoop
// The game loop will call initialize and then update/draw
Scene.prototype.loadScene = function () {
    // override to load scene specific contents
};

// Performs all initialization functions
//   => Should call gEngine.GameLoop.start(this)!
Scene.prototype.initialize = function () {
    // initialize the level (called from GameLoop)
    this.mIsInitialized = true;
    this.resize();
};

// update function to be called form EngineCore.GameLoop
Scene.prototype.update = function () {
    // when done with this level should call:
    // GameLoop.stop() ==> which will call this.unloadScene();
};

// draw function to be called from EngineCore.GameLoop
Scene.prototype.draw = function () {};

// Must unload all resources
Scene.prototype.unloadScene = function () {
    // .. unload all resources
};

Scene.prototype.isInitialized = function() {
  return this.mIsInitialized;
};

Scene.prototype.resize = function() {
  var gl = gEngine.Core.getGL();
  
  // Get the canvas object.
  var canvas = gl.canvas;
  
  // Calculate its current width and height as set by the CSS.
  var displayWidth = canvas.clientWidth;
  var displayHeight = canvas.clientHeight;

  // Make sure the internal canvas dimenions match the display dimensions.
  if(canvas.width !== displayWidth || canvas.height !== displayHeight) {
    canvas.width = displayWidth;
    canvas.height = displayHeight;
  }

  var targetAspectRatio = 1280 / 720;

  var width = 0;
  var height = 0;

  if(canvas.width / canvas.height < targetAspectRatio) {
    width = canvas.width;
    height = width / targetAspectRatio;
  } else {
    height = canvas.height;
    width = height * targetAspectRatio;
  }

  this.mCamera.setViewport([0, canvas.height - height, width, height]);
};
