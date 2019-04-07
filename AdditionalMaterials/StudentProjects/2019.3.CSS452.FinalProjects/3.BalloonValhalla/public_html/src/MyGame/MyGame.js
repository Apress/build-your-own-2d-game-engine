/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
    this.kUIButton = "assets/cloud.png";
    this.kBackground = "assets/balloon_valhalla.png";
    
    // The camera to view the scene
    this.mCamera = null;
    this.PlayButton = null;
    this.UIBackground = null;
    this.UIText = null;
    this.LevelSelect = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);


MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kUIButton);
    gEngine.Textures.loadTexture(this.kBackground);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kUIButton);
    gEngine.Textures.unloadTexture(this.kBackground);
    
    if(this.LevelSelect==="Play"){
        gEngine.Core.startScene(new LevelSelect());
    } else {
        gEngine.Core.startScene(new MyGame());
    }
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        100,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    this.PlayButton = new UIButton(this.kUIButton,this.particleSelect,this,[500,80],[600,100],"Play",8,[0.6,0.5,0,1],[0,0,0,1]);
    
    this.UIBackground = new TextureRenderable(this.kBackground);
    this.UIBackground.getXform().setXPos(this.mCamera.getWCCenter()[0]);
    this.UIBackground.getXform().setYPos(this.mCamera.getWCCenter()[1]);
    this.UIBackground.getXform().setWidth(this.mCamera.getWCHeight() * 2);
    this.UIBackground.getXform().setHeight(this.mCamera.getWCHeight());
    
    this.UIText = new UIText("Balloon Valhalla",[400,600],8,1,0,[0,0,0,1]);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    this.UIBackground.draw(this.mCamera);
    this.PlayButton.draw(this.mCamera);
    this.UIText.draw(this.mCamera);
};

MyGame.prototype.update = function () {
    this.PlayButton.update();
};

MyGame.prototype.particleSelect = function(){
    this.LevelSelect="Play";
    gEngine.GameLoop.stop();
};
