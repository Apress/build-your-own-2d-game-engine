/* 
 * The template for a scene.
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Transform: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

// Constructor
function Scene() {}

//<editor-fold desc="functions subclass should override">

// Begin Scene: must load all the scene contents
// when done 
//  => start the GameLoop
// The game loop will call initialize and then Update/draw
Scene.prototype.loadScene = function () {
    // override to load scene specific contents
};

// Performs all initialization functions
//   => Should call gEngine.GameLoop.start(this)!
Scene.prototype.initialize = function () {
    // initialize the level (called from GameLoop)
};

// Update function to be called form EngineCore.GameLoop
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
//</editor-fold>