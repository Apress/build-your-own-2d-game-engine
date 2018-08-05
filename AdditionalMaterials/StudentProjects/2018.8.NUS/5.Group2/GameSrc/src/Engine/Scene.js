/*
 * The template for a scene.
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Transform: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

/**
 * Default Constructor
 * @memberOf Scene
 * @returns {Scene}
 */
function Scene() {

}

Scene.prototype.message = function () {
    if (document.mMsgQueue.length > 0) {
        document.getElementById('infoBox').style.display = "block";
        if (document.mMsgQueue[0][0] === "")
            document.getElementById('info_face').src = "assets/blank.png";
        else
            document.getElementById('info_face').src = "assets/face/" + document.mMsgQueue[0][0] + ".png";
        document.getElementById('info_text').innerHTML = document.mMsgQueue[0][1];
        document.mShowMsgBox = true;

        if (gEngine.Input.isKeyReleased(gEngine.Input.keys.K)) {
            document.getElementById('infoBox').style.display = "none";
            document.getElementById('info_face').src = "assets/blank.png";
            document.getElementById('info_text').innerText = null;
            document.mShowMsgBox = false;
            document.mMsgQueue.shift();
        }
    } else {
        document.mEventMutex = false;
    }
};

Scene.prototype.showMsg = function (msg) {
    document.getElementById('info_prompt').style.display = "none";
    document.getElementById('infoBox').style.display = "block";
    document.getElementById('info_face').src = "assets/blank.png";
    document.getElementById('info_text').innerText = msg;
};

Scene.prototype.appendMsg = function (msg) {
    document.getElementById('info_prompt').style.display = "none";
    document.getElementById('infoBox').style.display = "block";
    document.getElementById('info_face').src = "assets/blank.png";
    document.getElementById('info_text').innerText += msg;
};

Scene.prototype.closeMsg = function () {
    document.getElementById('infoBox').style.display = "none";
    document.getElementById('info_face').src = "assets/blank.png";
    document.getElementById('info_text').innerText = "";
    document.getElementById('info_prompt').style.display = "block";
};

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
};

/**
 * update function to be called from EngineCore.GameLoop.
 * @memberOf Scene
 * @returns {void}
 */
Scene.prototype.update = function () {
    // when done with this level should call:
    // GameLoop.stop() ==> which will call this.unloadScene();
};

/**
 * draw function to be called from EngineCore.GameLoop.
 * @memberOf Scene
 * @returns {void}
 */
Scene.prototype.draw = function () {
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
