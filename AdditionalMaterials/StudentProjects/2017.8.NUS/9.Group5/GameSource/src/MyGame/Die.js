/*
 * File: GameOver.js 
 * The game over screen
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, Camera: false, vec2: false, FontRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function GameOver() {
    this.kBg = "assets/gameover.png";
    // The camera to view the scene
    this.mCamera = null;
    this.mBg = null;
}

gEngine.Core.inheritPrototype(GameOver, Scene);

GameOver.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBg);
};

GameOver.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kBg);
};

GameOver.prototype.initialize = function () {
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

    var bgR = new SpriteRenderable(this.kBg);
    bgR.setElementPixelPositions(0, 1024, 0, 512);
    bgR.getXform().setSize(100, 50);
    bgR.getXform().setPosition(0, 0);
    this.mBg = new GameObject(bgR);


};

GameOver.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([1, 1, 1, 1.0]); // clear to bright green

    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();

    // Step  C: Draw everything
    this.mBg.draw(this.mCamera);

    
};


GameOver.prototype.update = function () {
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter)) {
        var nextLevel = new MyGame();  // load the next level
        gEngine.Core.startScene(nextLevel);
    }
};

