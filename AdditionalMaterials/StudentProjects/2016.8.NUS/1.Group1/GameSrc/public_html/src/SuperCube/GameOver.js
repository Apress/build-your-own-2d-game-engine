/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,GameLevel
  Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
  GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function GameOver() {
    // The camera to view the scene
    this.kDie = "assets/SuperCube_die.png" ;
    
    this.mDie = null;
    this.mCamera = null;
    this.mMsg = null;
    this.mLevel = null;
    //this.mLevel4Save = 
}
gEngine.Core.inheritPrototype(GameOver, Scene);

GameOver.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kDie);
    
    
};

GameOver.prototype.initialize = function () {
    gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1]);
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 50), // position of the camera
        100,                        // width of camera
        [0, 0, 960, 540],         // viewport (orgX, orgY, width, height)
        2
    );
    this.mCamera.setBackgroundColor([0.9, 0.9, 0.9, 1]);

    this.mMsg = new FontRenderable("GameOver");
    this.mMsg.setColor([0.8, 0, 0.8, 1]);
    this.mMsg.getXform().setPosition(10, 50);
    this.mMsg.setTextHeight(5);
    
    this.mDie = new TextureRenderable(this.kDie);
    this.mDie.setColor([0, 0, 0, 0]);
    this.mDie.getXform().setPosition(45, 50);
    this.mDie.getXform().setSize(10,23);
    
};

GameOver.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.8, 0, 0.8, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    this.mMsg.setText("PRESS <SPACE BAR> TO RESTART");
    this.mMsg.getXform().setPosition(10, 30);
    this.mMsg.draw(this.mCamera);
    this.mMsg.setText("GAME       OVER");
    this.mMsg.getXform().setPosition(26, 70);
    this.mMsg.draw(this.mCamera);
    
    this.mDie.draw(this.mCamera);
   
};
GameOver.prototype.update = function () {
    
    // select which character to work with
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space))
        gEngine.GameLoop.stop();
};


GameOver.prototype.unloadScene = function() {
    gEngine.Textures.unloadTexture(this.kDie);
    // Step B: starts the next level
    // starts the next level
    var nextLevel;
    if(this.mLevel === 1)
    nextLevel = new Level0;  // next level to be loaded

    if(this.mLevel === 2)
    nextLevel = new Level1;  // next level to be loaded

    if(this.mLevel === 3)
    nextLevel = new Level2;  // next level to be loaded
    
    if(this.mLevel === 4)
    nextLevel = new Level3;  // next level to be loaded

    if(this.mLevel === 5)
    nextLevel = new Level4;  // next level to be loaded

    if(this.mLevel === 6)
    nextLevel = new Level5;  // next level to be loaded
    gEngine.Core.startScene(nextLevel);
};

GameOver.prototype.setLevel = function(level) { this.mLevel = level;};
