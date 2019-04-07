/*
 * File: LevelSelect.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var gLevelNames = [ "Level1", "Level2", "Level3" ];

function LevelSelect() {
    this.kUIButton = "assets/cloud.png";
    this.kBackground = "assets/sky.png";
    
    // The camera to view the scene
    this.mCamera = null;
    this.UIButtons = [];
    this.UIBackground = null;
    this.UIText = null;
    this.LevelSelect = null;
}
gEngine.Core.inheritPrototype(LevelSelect, Scene);


LevelSelect.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kUIButton);
    gEngine.Textures.loadTexture(this.kBackground);
};

LevelSelect.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kUIButton);
    gEngine.Textures.unloadTexture(this.kBackground);
    
    if(this.LevelSelect === null) {
        gEngine.Core.startScene(new MyGame());
    } else {
        gEngine.Core.startScene(new MazeLevel(this.LevelSelect));
    }
};

LevelSelect.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        100,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    console.log("Available levels: " + gLevelNames);
    var y = 370 + gLevelNames.length * 105 / 4;
    for (var i in gLevelNames) {
        var levelName = gLevelNames[i];
        this.UIButtons.push(new UIButton(this.kUIButton,this.getLevelSelectEvent(levelName),this,[400,y],[600,100],levelName,8,[0.6,0.5,0,1],[0,0,0,1]));
        y -= 105;
    }
    this.UIButtons.push(new UIButton(this.kUIButton,gEngine.GameLoop.stop,this,[160,60],[300,80],"Back",6,[0.6,0.5,0,1],[0,0,0,1]));
    
    this.UIBackground = new TextureRenderable(this.kBackground);
    this.UIBackground.getXform().setXPos(this.mCamera.getWCCenter()[0]);
    this.UIBackground.getXform().setYPos(this.mCamera.getWCCenter()[1]);
    this.UIBackground.getXform().setWidth(this.mCamera.getWCHeight() * 6);
    this.UIBackground.getXform().setHeight(this.mCamera.getWCHeight());
    
    this.UIText = new UIText("Balloon Valhalla",[400,600],8,1,0,[0,0,0,1]);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
LevelSelect.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    this.UIBackground.draw(this.mCamera);
    for (var i in this.UIButtons)
        this.UIButtons[i].draw(this.mCamera);
    //this.UIText.draw(this.mCamera);
};

LevelSelect.prototype.update = function () {
    for (var i in this.UIButtons)
        this.UIButtons[i].update();
};

LevelSelect.prototype.getLevelSelectEvent = function(levelName) {
    var scene = this;
    var func = function() {
        scene.LevelSelect = levelName;
        gEngine.GameLoop.stop();
    };
    return func;
};

LevelSelect.prototype.particleSelect = function(){
    this.LevelSelect="Play";
    gEngine.GameLoop.stop();
};
