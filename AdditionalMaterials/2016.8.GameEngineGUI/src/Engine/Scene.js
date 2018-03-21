/* 
 * The template for a scene.
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Transform: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
var gCurrentScene;
// Constructor
function Scene() {
    this.mCamera = null;
    this.mAllCamera = null;
    this.mAllObject = null;
    this.mAllParticle = null;

}

//<editor-fold desc="functions subclass should override">
/**
 * Begin Scene: must load all the scene contents when done <p>
 *   => start the GameLoop<p>
 * The game loop will call initialize and then update/draw
 * @memberOf Scene
 * @returns {void}
 */
Scene.prototype.loadScene = function () {
    // override to load scene specific contents
};

/**
 * Performs all initialization functions.<p>
 *   => Should call gEngine.GameLoop.start(this)!
 *   @memberOf Scene
 * @returns {void}
 */
Scene.prototype.initialize = function () {
    // initialize the level (called from GameLoop)
    this.mAllObject = [];
    this.mAllCamera = [];
    this.mAllParticle = new ParticleGameObjectSet();
}
/**
 * update function to be called from EngineCore.GameLoop.
 * @memberOf Scene
 * @returns {void}
 */
Scene.prototype.update = function () {
    // when done with this level should call:
    // GameLoop.stop() ==> which will call this.unloadScene();
    var func = function (x, y) {
        this.createParticle.call(this, x, y);
    };
    var i;
    for (i = 0; i < this.mAllCamera.length; i++) {
        if(this.mAllCamera[i].mEnable)
            this.mAllCamera[i].update();
    }
    gEngine.LayerManager.updateAllLayers();
    this._physicsSimulation();

    // create dye pack and remove the expired ones ...

};

// draw function to be called from EngineCore.GameLoop
Scene.prototype.draw = function () {
    var i;
    var j;
    for (i = 0; i < this.mAllCamera.length; i++) {
        if(this.mAllCamera[i].mEnable){
            this.mAllCamera[i].setupViewProjection();
            gEngine.LayerManager.drawAllLayers(this.mAllCamera[i]);
        }      
    }
};


/**
 * Must unload all resources.
 * @memberOf Scene
 * @returns {void}
 */
Scene.prototype.unloadScene = function () {
    // .. unload all resources
};
//</editor-fold>


Scene.prototype.collision = function () {

    var i;
    var j;
    for (i = 0; i < this.mAllObject.length; i++) {
        for (j = 0; j < this.mAllObject.length; j++) {
            if (i < j) {
                if (this.mAllObject[i].mCollidableFlag) {
                    this.mAllObject[i].collisionTest(this.mAllObject[j]);
                }
            }
            else if (i > j) {
                if (this.mAllObject[i].mCollidableFlag && !this.mAllObject[j].mCollidableFlag) {
                    this.mAllObject[i].collisionTest(this.mAllObject[j]);
                }
            }
        }
        if (this.mAllObject[i].mCollidableFlag) {
            this.mAllObject[i].collisionExitTest();
        }
    }
};

Scene.prototype._physicsSimulation = function () {

};