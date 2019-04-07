/*
 * File: MainMenu.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function WinScreen(time, deaths, level) {
    this.kUIButton = "assets/UI/button.png";
    // The camera to view the scene
    this.mCamera = null;
   // this.ParticleButton = null;
    this.Level1Button = null;
    this.UIText2 = null;
    this.UITextTime = null;
    this.UITextLevel= null;
    this.UITextDeath = null;
    this.time = time;
    this.deaths= deaths;
    this.levelname = level;
}
gEngine.Core.inheritPrototype(WinScreen, Scene);

WinScreen.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kUIButton);
};


WinScreen.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kUIButton);
        gEngine.Core.startScene(new MainMenu());
};

WinScreen.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(100, 75), // position of the camera
        200,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.2, 0.65, 0.8, 1]);
            // sets the background to gray
    //gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    
    this.UIText2 = new UIText("Victory!",[400,500],12,1,0,[0,0,0,1]);
    this.UITextLevel = new UIText(this.levelname, [400,250],12,1,0,[0,0,0,1]);
    this.UITextDeath = new UIText(this.deaths+ " Deaths", [400,100],12,1,0,[0,0,0,1]);
    this.UITextTime = new UIText("Time of: " + this.time + " Seconds",[400,175],12,1,0,[0,0,0,1]);
    this.Level1Button = new UIButton(this.kUIButton,this.MediumSelect,this,[400,300],[300,75],"Return to Menu",6,[1,1,1,1],[0,0,0,1]);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
WinScreen.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    this.Level1Button.draw(this.mCamera);
    this.UIText2.draw(this.mCamera);
    this.UITextTime.draw(this.mCamera);
    this.UITextDeath.draw(this.mCamera);
    this.UITextLevel.draw(this.mCamera);
};

WinScreen.prototype.update = function () {
    this.Level1Button.update();
};
WinScreen.prototype.MediumSelect = function(){
    gEngine.GameLoop.stop();
};

