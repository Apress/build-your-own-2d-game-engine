/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global vec2, gEngine, Scene */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Win() {

    this.kwin= "assets/win.png";
    // The camera to view the scene
    this.mCamera = null;
    this.mBg = null;


}
gEngine.Core.inheritPrototype(Win, Scene);

Win.prototype.loadScene = function () {

    gEngine.Textures.loadTexture(this.kwin);
};

Win.prototype.unloadScene = function () {

    gEngine.Textures.loadTexture(this.kwin);
};

Win.prototype.initialize = function () {
    // Step A: set up the cameras
     var v = gEngine.DefaultResources.getGlobalAmbientColor();
    v[0]=1;
    v[1]=1;
    v[2]=1;
    this.mCamera = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        100,                       // width of camera
        [0, 0, 1024, 512]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

    var bgR = new SpriteRenderable(this.kwin);
    bgR.setElementPixelPositions(0, 512, 0, 256);
    bgR.getXform().setSize(100, 50);
    bgR.getXform().setPosition(0, 0);
    this.mBg = new GameObject(bgR);


};

Win.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([1, 1, 1, 1.0]); // clear to bright green

    // Step  B: Activate the drawing Camera
     if(this.mCamera!== undefined && this.mCamera!==null)
    this.mCamera.setupViewProjection();

    // Step  C: Draw everything
    this.mBg.draw(this.mCamera);

    
};


Win.prototype.update = function () {
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter)) {
        var nextLevel = new StartGame();  // load the next level
        gEngine.Core.startScene(nextLevel);
    }
};

