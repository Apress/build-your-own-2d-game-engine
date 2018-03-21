/*
 * File: Continue.js
 * This is the logic of our game.
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
  GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var gHp = 3;
var gState = 0;

function Continue() {
  this.kContinue = "assets/continue.png";
  this.mBackground = null;
  this.animate = null;
  this.mCamera = null;
}
gEngine.Core.inheritPrototype(Continue, Scene);

Continue.prototype.loadScene = function () {

};

Continue.prototype.unloadScene = function () {
  gEngine.TextFileLoader.unloadTextFile(this.kContinue);
  var nextLevel = new MyGame();
  gEngine.Core.startScene(nextLevel);
};

Continue.prototype.initialize = function () {
    this.mBackground = new SpriteRenderable(this.kContinue);
    this.mBackground.setColor([1,1,1,0]);
    this.mBackground.getXform().setPosition(0,0);
    this.mBackground.getXform().setSize(10,10);
    this.mCamera = new Camera(
      [0,2],
      10,
      [0,0,1280,720]
    )
    this.mCamera.setBackgroundColor([0.9 , 0.9, 0.9 , 0]);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
Continue.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9 , 0.9 , 0.9, 1]);
    this.mCamera.setupViewProjection();
    this.mBackground.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
Continue.prototype.update = function () {
  if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
      gState = 0;
  gEngine.GameLoop.stop();
  }
};
