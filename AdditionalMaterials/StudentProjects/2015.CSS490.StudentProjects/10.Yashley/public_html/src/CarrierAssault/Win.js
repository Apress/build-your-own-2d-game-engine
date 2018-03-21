
/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, MyGame:false, SceneFileParser: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Win() {
    this.kBg = "assets/win.png";
    this.kBgClip = "assets/sounds/win.wav";
    this.mMsg = null;
    // The camera to view the scene
    this.mCamera = null;
    this.mBg = null;
}
gEngine.Core.inheritPrototype(Win, Scene);

Win.prototype.loadScene = function () {
    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.Textures.loadTexture(this.kBg);
};

Win.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kBg);

};

Win.prototype.initialize = function () {
    gEngine.AudioClips.playACue(this.kBgClip);

    this.mCamera = new Camera(
            vec2.fromValues(6, 12), // position of the camera
            45, // width of camera
            [0, 0, 1280, 720]         // viewport (orgX, orgY, width, height)
            );
    gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1]);

    var bgR = new LightRenderable(this.kBg);
    bgR.getXform().setSize(26, 26);
    bgR.getXform().setPosition(-4, 9);
    this.mBg = new GameObject(bgR);
    /*
     var sceneParser = new SceneFileParser(this.kSceneFile);
     
     // Step A: Read in the camera
     this.mCamera = sceneParser.parseCamera();
     */

    this.mMsg = new FontRenderable("");
    this.mMsg.setColor([1, 1, 1, 1]);

};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
Win.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.8, 0.8, 0.8, 1.0]); // clear to light gray
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();

    this.mBg.draw(this.mCamera);


    //this.mMsg.draw(this.mCamera);

    // Step  C: Draw all the squares
    /*
     var i;
     for (i = 0; i < this.mSqSet.length; i++) {
     this.mSqSet[i].draw(this.mCamera.getVPMatrix());
     }
     */

    var msg = "YOU WIN!!!";
    this.mMsg.setText(msg);
    this.mMsg.getXform().setPosition(-10, 10);
    this.mMsg.getXform().setSize(15, 10);

};

// The update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
Win.prototype.update = function () {
    // For this very simple game, let's move the first square

};