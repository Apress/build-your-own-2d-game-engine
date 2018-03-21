/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
  GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Victory() {
    this.kWin = "assets/victory.png" ;
    // The camera to view the scene
    this.mWin = null;
    this.mCamera = null;
    this.mMsg = null;
    this.mNext = null;
}
gEngine.Core.inheritPrototype(Victory, Scene);

Victory.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kWin);
    
    
};

Victory.prototype.initialize = function () {
    gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1]);
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 50), // position of the camera
        100,                        // width of camera
        [0, 0, 960, 540],         // viewport (orgX, orgY, width, height)
        2
    );
    this.mCamera.setBackgroundColor([1, 1, 1, 1]);

    this.mMsg = new FontRenderable("Victory");
    this.mMsg.setColor([0.8, 0, 0.8, 1]);
    this.mMsg.getXform().setPosition(10, 50);
    this.mMsg.setTextHeight(3);
    
    this.mWin = new TextureRenderable(this.kWin);
    this.mWin.setColor([0, 0, 0, 0]);
    this.mWin.getXform().setPosition(50, 50);
    this.mWin.getXform().setSize(35,35);
};

Victory.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.8, 0, 0.8, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    this.mMsg.setText("PRESS <SPACE BAR> TO RESTART");
    this.mMsg.getXform().setPosition(24, 30);
    this.mMsg.draw(this.mCamera);
    this.mMsg.setText("PRESS 'Q' TO QUIT");
    this.mMsg.getXform().setPosition(35, 25);
    this.mMsg.draw(this.mCamera);
    this.mMsg.setText("YOU HAVE SAVED THE PRINCESS!");
    this.mMsg.getXform().setPosition(24, 70);
    this.mMsg.draw(this.mCamera); 
    this.mMsg.setText("VICTORY    !!!");
    this.mMsg.getXform().setPosition(35, 75);
    this.mMsg.draw(this.mCamera);
   
    this.mWin.draw(this.mCamera);
};
Victory.prototype.update = function () {
    
    // select which character to work with
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){
        this.mNext = 0;
        gEngine.GameLoop.stop();
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)){
        this.mNext = 1;
        gEngine.GameLoop.stop();
    }
        
};


Victory.prototype.unloadScene = function() {
    gEngine.Textures.unloadTexture(this.kWin);
    // Step B: starts the next level
    // starts the next level
    var nextLevel = null;
    if(this.mNext){
         nextLevel = new StartScene(); 
    }
    else{
         nextLevel = new Level0(); 
    }
      // next level to be loaded
    gEngine.Core.startScene(nextLevel);
};

