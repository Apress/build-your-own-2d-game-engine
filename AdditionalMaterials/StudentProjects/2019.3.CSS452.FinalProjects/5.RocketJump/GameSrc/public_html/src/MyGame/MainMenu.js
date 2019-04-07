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

function MainMenu() {
    this.kUIButton = "assets/UI/button.png";
    this.kLogo = "assets/RigidShape/Logo.png";
    // The camera to view the scene
    this.mCamera = null;
   // this.ParticleButton = null;
    this.Level1Button = null;
    this.Level2Button = null;
    this.Level3Button = null;
    this.Level4Button = null;
    this.Level5Button = null;
    this.Level6Button = null;
   // this.UIButton = null;
    this.UILogo = null;
    this.UIText2 = null;
    this.LevelSelect = null;
}
gEngine.Core.inheritPrototype(MainMenu, Scene);


MainMenu.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kUIButton);
    gEngine.Textures.loadTexture(this.kLogo);
};

MainMenu.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kUIButton);
    gEngine.Textures.unloadTexture(this.kLogo);
    if(this.LevelSelect==="Easy"){
        gEngine.Core.startScene(new Easy());
    }
    if(this.LevelSelect==="Medium"){
        gEngine.Core.startScene(new Medium());
    }
    if(this.LevelSelect==="Hard"){
        gEngine.Core.startScene(new Hard());
    }
    if(this.LevelSelect==="LongJump"){
        gEngine.Core.startScene(new LongJump());
    }
    if(this.LevelSelect==="VeryHard"){
        gEngine.Core.startScene(new VeryHard());
    }
    if(this.LevelSelect==="SlowMissiles"){
        gEngine.Core.startScene(new SlowMissiles());
    }
};

MainMenu.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(100, 75), // position of the camera
        200,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.2, 0.65, 0.8, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    this.UILogo = new TextureRenderable(this.kLogo);
    this.UILogo.setColor([1, 1, 1, 0]);
    this.UILogo.getXform().setPosition(100, 130);
    this.UILogo.getXform().setSize(100, 50);
    
    this.UIText2 = new UIText("Bonus Levels:",[600,400],8,1,0,[0,0,0,1]);
    
    this.Level1Button = new UIButton(this.kUIButton,this.MediumSelect,this,[200,300],[300,75],"Medium Level",6,[1,1,1,1],[0,0,0,1]);
    this.Level2Button = new UIButton(this.kUIButton,this.HardSelect,this,[200,200],[300,75],"Hard Level",6,[1,1,1,1],[0,0,0,1]);
    this.Level3Button = new UIButton(this.kUIButton,this.EasySelect,this,[200,400],[300,75],"Easy Level",6,[1,1,1,1],[0,0,0,1]);
    this.Level4Button = new UIButton(this.kUIButton,this.LongJumpSelect,this,[600,300],[300,75],"Long Jump",6,[1,1,1,1],[0,0,0,1]);
    this.Level5Button = new UIButton(this.kUIButton,this.SlowMissilesSelect,this,[600,200],[300,75],"Slow Missiles",6,[1,1,1,1],[0,0,0,1]);
    this.Level6Button = new UIButton(this.kUIButton,this.VeryHardSelect,this,[200,100],[300,75],"EXTREME Level",6,[1,1,1,1],[0,0,0,1]);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MainMenu.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    this.Level1Button.draw(this.mCamera);
    this.Level2Button.draw(this.mCamera);
    this.Level3Button.draw(this.mCamera);
    this.Level4Button.draw(this.mCamera);
    this.Level5Button.draw(this.mCamera);
    this.Level6Button.draw(this.mCamera);
    this.UILogo.draw(this.mCamera);
    this.UIText2.draw(this.mCamera);
};

MainMenu.prototype.update = function () {
    this.Level1Button.update();
    this.Level2Button.update();
    this.Level3Button.update();
    this.Level4Button.update();
    this.Level5Button.update();
    this.Level6Button.update();
};

MainMenu.prototype.EasySelect = function(){
    this.LevelSelect="Easy";
    gEngine.GameLoop.stop();
};

MainMenu.prototype.MediumSelect = function(){
    this.LevelSelect="Medium";
    gEngine.GameLoop.stop();
};

MainMenu.prototype.HardSelect = function(){
    this.LevelSelect="Hard";
    gEngine.GameLoop.stop();
};

MainMenu.prototype.LongJumpSelect = function(){
    this.LevelSelect="LongJump";
    gEngine.GameLoop.stop();
};

MainMenu.prototype.VeryHardSelect = function(){
    this.LevelSelect="VeryHard";
    gEngine.GameLoop.stop();
};

MainMenu.prototype.SlowMissilesSelect = function(){
    this.LevelSelect="SlowMissiles";
    gEngine.GameLoop.stop();
};