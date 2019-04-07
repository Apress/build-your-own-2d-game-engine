/*
 * File: LoseScreen.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function LoseScreen(levelName="Level1") {
    this.kUIButton = "assets/cloud.png";
    //this.kBackground = "assets/balloon_valhalla.png";
    this.kLevelName = levelName;
    
    // The camera to view the scene
    this.mCamera = null;
    this.PlayButton = null;
    this.QuitButton = null;
    //this.UIBackground = null;
    this.UIText = null;
    this.LevelSelect = null;
}
gEngine.Core.inheritPrototype(LoseScreen, Scene);


LoseScreen.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kUIButton);
    //gEngine.Textures.loadTexture(this.kBackground);
};

LoseScreen.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kUIButton);
    //gEngine.Textures.unloadTexture(this.kBackground);
    
    if(this.LevelSelect==="Play"){
        gEngine.Core.startScene(new MazeLevel(this.kLevelName));
    } else {
        gEngine.Core.startScene(new MyGame());
    }
};

LoseScreen.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        150,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0, 0, 0, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    this.PlayButton = new UIButton(this.kUIButton,this.playSelect,this,[400,400],[600,100],"Play Again",8,[0.6,0.5,0,1],[0,0,0,1]);
    
    this.QuitButton = new UIButton(this.kUIButton,this.quitSelect,this,[400,200],[600,100],"Quit",8,[0.6,0.5,0,1],[0,0,0,1]);
    
    /*this.UIBackground = new TextureRenderable(this.kBackground);
    this.UIBackground.getXform().setXPos(this.mCamera.getWCCenter()[0]);
    this.UIBackground.getXform().setYPos(this.mCamera.getWCCenter()[1]);
    this.UIBackground.getXform().setWidth(this.mCamera.getWCHeight() * 2);
    this.UIBackground.getXform().setHeight(this.mCamera.getWCHeight());*/
    
    this.UIText = new UIText("You lose",[400,600],8,1,0,[1,1,1,1]);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
LoseScreen.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    //this.UIBackground.draw(this.mCamera);
    this.PlayButton.draw(this.mCamera);
    this.QuitButton.draw(this.mCamera);
    this.UIText.draw(this.mCamera);
};

LoseScreen.prototype.update = function () {
    this.PlayButton.update();
    this.QuitButton.update();
};

LoseScreen.prototype.playSelect = function(){
    this.LevelSelect="Play";
    gEngine.GameLoop.stop();
};

LoseScreen.prototype.quitSelect = function(){
    this.LevelSelect="Quit";
    gEngine.GameLoop.stop();
};
