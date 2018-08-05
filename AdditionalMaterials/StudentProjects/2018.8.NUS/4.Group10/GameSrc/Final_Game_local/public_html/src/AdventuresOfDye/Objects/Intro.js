/*
 * File: Intro.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
  GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Intro(){
    this.kBg="assets/IntroBg.png";
    
    this.mBg = null;
}
gEngine.Core.inheritPrototype(Intro, Scene);

Intro.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBg);
};

Intro.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(512, 256), // position of the camera
        1024,                        // width of camera
        [0, 0, 1024, 512]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([1, 1, 1, 1]);
    gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(1.0);
    
    var bgR = new SpriteRenderable(this.kBg);
    bgR.setElementPixelPositions(0, 1024, 0, 512);
    bgR.getXform().setSize(1024, 512);
    bgR.getXform().setPosition(512, 256);
    this.mBg = new GameObject(bgR);
};

Intro.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([1, 1, 1, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    
    this.mBg.draw(this.mCamera);
};

Intro.prototype.update = function(){
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Esc)){
        gEngine.GameLoop.stop();
    }
};

Intro.prototype.unloadScene = function() {
    gEngine.Textures.unloadTexture(this.kBg);
    // Step B: starts the next level
    // starts the next level
    var nextLevel = new TheCollisionOfBlackAndWhite();
    gEngine.Core.startScene(nextLevel);
};