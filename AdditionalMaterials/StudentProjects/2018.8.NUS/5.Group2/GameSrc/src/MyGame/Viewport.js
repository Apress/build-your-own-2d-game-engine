/*
 * File: MyGame.js
 * This is the logic of our game.
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

/*
   ! A TEST FILE !
*/

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Viewport() {
    // scene textures
    this.kSceneTexture = "assets/map/map-1-bkg.png";
    this.kBarTexture = "assets/hero/status.png";
    //this.kSideBar = "assets/hero/side_bar.png";

    // The camera to view the scenes
    this.mSceneCamera = null;
    this.mBarCamera = null;
    //this.mSideBarCamera = null;

    this.mScene = null;
    this.mBar = null;
    //this.mSideBar = null;
}
gEngine.Core.inheritPrototype(Viewport, Scene);

Viewport.prototype.loadScene = function () {
    // load the scene file
    gEngine.Textures.loadTexture(this.kSceneTexture);
    gEngine.Textures.loadTexture(this.kBarTexture);
    //gEngine.Textures.loadTexture(this.kSideBar);
};

Viewport.prototype.unloadScene = function () {
};

Viewport.prototype.initialize = function () {
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);

    // Set the cameras
    this.mSceneCamera = new Camera(
        vec2.fromValues(0, 0),   // position of the camera
        1000,                        // width of camera
        [0, 120, 970, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mBarCamera = new Camera(
        vec2.fromValues(0, 2015),   // position of the camera
        1024,                        // width of camera
        [0, 0, 970, 120]        // viewport (orgX, orgY, width, height)
    );
    /*
    this.mSideBarCamera = new Camera(
        vec2.fromValues(1960, 30),   // position of the camera
        160,                        // width of camera
        [20, 230, 40, 160]        // viewport (orgX, orgY, width, height)
    );
    */

    // Sets the background color
    this.mSceneCamera.setBackgroundColor([1, 0, 0, 0]);
    this.mBarCamera.setBackgroundColor([1, 0, 0, 0]);
    //this.mSideBarCamera.setBackgroundColor([0, 0, 0, 0.5]);

    // Create the game objects
    this.mScene = new TextureRenderable(this.kSceneTexture);
    this.mScene.setColor([0, 0, 1, 0]);
    this.mScene.getXform().setPosition(0, 0);
    this.mScene.getXform().setSize(1024, 1024);

    this.mBar = new TextureRenderable(this.kBarTexture);
    this.mBar.setColor([0, 0, 1, 0]);  // tints red
    this.mBar.getXform().setPosition(0, 2000);
    this.mBar.getXform().setSize(1024, 256);

    /*this.mSideBar = new TextureRenderable(this.kSideBar);
    this.mSideBar.setColor([0, 0, 1, 0]);  // tints red
    this.mSideBar.getXform().setPosition(2000, 0);
    this.mSideBar.getXform().setSize(256, 512);*/
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
Viewport.prototype.draw = function () {
    // Clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    /*
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Z) && this.mSceneCamera.mWCWidth < 1024) {
        this.mSceneCamera.mWCWidth += 1;
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.X) && this.mSceneCamera.mWCWidth > 1) {
        this.mSceneCamera.mWCWidth -= 1;
    }
    */

    // Draw
    // 注意接口和以前参数不一样了 orz
    this.mSceneCamera.setupViewProjection();
    this.mScene.draw(this.mSceneCamera);
    this.mBarCamera.setupViewProjection();
    this.mBar.draw(this.mBarCamera);
    /*this.mSideBarCamera.setupViewProjection();
    this.mSideBar.draw(this.mSideBarCamera);*/
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
Viewport.prototype.update = function () {
};
