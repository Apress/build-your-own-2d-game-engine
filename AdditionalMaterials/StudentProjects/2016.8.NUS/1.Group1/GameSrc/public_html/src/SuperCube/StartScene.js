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

StartScene.eRowStatus = Object.freeze(
    [
        {  width:40, 
           height:52 },
        {  width:40, 
           height:46 },
       {  width:40, 
           height:40 },
       {  width:40, 
           height:34 }
    ]
);

StartScene.eMessage = Object.freeze(
    [
        "Start",
        "Level select",
        "Control",
        "About us"
    ]
);

StartScene.eSelectStatus = Object.freeze({
    eStart:0,
    eControl:2,
    eLevel:1,
    eAbout:3
});


function StartScene() {
    // The camera to view the scene
    this.kSuperCube = "assets/cube.png" ;
    
    this.mCamera = null;
    this.mMsg = null;
    
    this.mCube = null;
    
    this.mSelectCube = null;
    this.mSelectState = StartScene.eSelectStatus.eStart;
    
}
gEngine.Core.inheritPrototype(StartScene, Scene);

StartScene.prototype.initialize = function () {
    gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1]);
    gEngine.ResourceMap.store("Save", [0,0,0,0]);
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 50), // position of the camera
        100,                        // width of camera
        [0, 0, 1000, 500],         // viewport (orgX, orgY, width, height)
        2
    );
    this.mCamera.setBackgroundColor([0.9, 0.9, 0.9, 1]);

    this.mMsg = new FontRenderable("SUPER          CUBE");
    this.mMsg.setColor([0.1, 0.1, 0.8, 1]);
    this.mMsg.getXform().setPosition(15, 80);
    this.mMsg.setTextHeight(5);
    
    this.mCube = new TextureRenderable(this.kSuperCube);
    this.mCube.setColor([0, 0, 0, 0]);
    this.mCube.getXform().setPosition(50, 68);
    this.mCube.getXform().setSize(12, 10);
    
    this.mSelectCube = new TextureRenderable(this.kSuperCube);
    this.mSelectCube.setColor([0, 0, 0, 0]);
    this.mSelectCube.getXform().setPosition(StartScene.eRowStatus[this.mSelectState].width-6, StartScene.eRowStatus[this.mSelectState].height-0.5);
    this.mSelectCube.getXform().setSize(3, 2.5);
    
    
};

StartScene.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    
    
    
    for(var i = 0; i < 4; i++){
        this.mMsg.setText(StartScene.eMessage[i]);
        this.mMsg.getXform().setPosition(StartScene.eRowStatus[i].width, StartScene.eRowStatus[i].height);
        this.mMsg.setTextHeight(3);
        this.mMsg.draw(this.mCamera);
    }
    
    
    
   
    
    
    
    
    this.mMsg.setText("SUPER       CUBE");
    this.mMsg.getXform().setPosition(26, 68);
    this.mMsg.setTextHeight(5);
    this.mMsg.draw(this.mCamera);
    
    this.mCube.draw(this.mCamera);
    
    this.mSelectCube.getXform().setPosition(StartScene.eRowStatus[this.mSelectState].width-6, StartScene.eRowStatus[this.mSelectState].height-0.5);
    this.mSelectCube.draw(this.mCamera);
   
};
StartScene.prototype.update = function () {
    
    // select which character to work with
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space))
        gEngine.GameLoop.stop();
    
    
    
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)){
        this.mSelectState = (this.mSelectState-1+4)%4;
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Down)){
        this.mSelectState = (this.mSelectState+1)%4;
    }
    
    
    
};

StartScene.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kSuperCube);
};

StartScene.prototype.unloadScene = function() {
    // Step B: starts the next level
    // starts the next level
    gEngine.Textures.unloadTexture(this.kSuperCube);
    
    var next;
    if(this.mSelectState === StartScene.eSelectStatus.eStart)
        next = new Level0;  // next level to be loaded
    if(this.mSelectState === StartScene.eSelectStatus.eLevel)
        next = new LevelSelect;  // next level to be loaded
    if(this.mSelectState === StartScene.eSelectStatus.eAbout)
        next = new About;  // next level to be loaded
    if(this.mSelectState === StartScene.eSelectStatus.eControl)
        next = new Control;  // next level to be loaded
    
    gEngine.Core.startScene(next);
};