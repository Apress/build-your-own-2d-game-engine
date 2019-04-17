/*
 * File:        StartMenu.js
 * Programmers: Kyla            March 9, 2019
 *
 * This is the first scene that the player should encounter
 */

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function StartMenu() {
    this.kUIButton = "assets/UI/button.png";
    this.kGameTitle = "assets/StormySeas_Title.png";
    this.kPlay = "assets/Play.png";
    this.kControls = "assets/ControlsButton.png";
    this.kCredits = "assets/CreditsButton.png";
    
    this.kBG = "assets/NightOcean2.png";
    
    // The camera to view the scene
    this.mCamera = null;
    
    this.mBG = null;
    
    this.UIText = null;
    this.mGameTitle = null;
    
    this.mPlayButton = null;
    
    this.mControlsButton = null;
    this.mCreditsButton = null;
    
    this.LevelSelect = null;
}
gEngine.Core.inheritPrototype(StartMenu, Scene);


StartMenu.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kUIButton);
    gEngine.Textures.loadTexture(this.kBG);
    gEngine.Textures.loadTexture(this.kGameTitle);
    gEngine.Textures.loadTexture(this.kPlay);
    gEngine.Textures.loadTexture(this.kControls);
    gEngine.Textures.loadTexture(this.kCredits);
};

StartMenu.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kUIButton);
    gEngine.Textures.unloadTexture(this.kBG);
    gEngine.Textures.unloadTexture(this.kGameTitle);
    gEngine.Textures.unloadTexture(this.kPlay);
    gEngine.Textures.unloadTexture(this.kControls);
    gEngine.Textures.unloadTexture(this.kCredits);
    
    if(this.LevelSelect==="Play"){
        gEngine.Core.startScene(new PlayMenu());
    }
    else if(this.LevelSelect==="Controls"){
        gEngine.Core.startScene(new Controls());
    }
    else if(this.LevelSelect==="Credits"){
        gEngine.Core.startScene(new Credits());
    }
};

StartMenu.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        100,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray
       
    var uvs = [0, 2048, 0, 2048];
    this.mBG = new UISprite(this.kBG, [400, 300], [802, 602], [0, 1, 0, 1]);
    
    var uvs = [(15/1024), (995/1024), (330/1024), (690/1024)];
    this.mGameTitle = new UISprite(this.kGameTitle, [400, 500], [525, 193], uvs);
    
    this.mPlayButton = new UIButton(this.kPlay,this.playSelect,this,[400,325],[250,125],"",0,[1,1,1,1],[0,0,0,1]);
    this.mControlsButton = new UIButton(this.kControls,this.controlsSelect,this,[400,200],[250,125],"",0,[1,1,1,1],[0,0,0,1]);
    this.mCreditsButton =  new UIButton(this.kCredits,this.creditsSelect,this,[400,75],[250,125],"",0,[1,1,1,1],[0,0,0,1]);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
StartMenu.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    this.mBG.draw(this.mCamera);
    this.mGameTitle.draw(this.mCamera);
    this.mPlayButton.draw(this.mCamera);
    this.mControlsButton.draw(this.mCamera);
    this.mCreditsButton.draw(this.mCamera);
};

StartMenu.prototype.update = function () {
    this.mPlayButton.update();
    this.mControlsButton.update();
    this.mCreditsButton.update();
};

StartMenu.prototype.playSelect = function(){
    this.LevelSelect="Play";
    gEngine.GameLoop.stop();
};

StartMenu.prototype.controlsSelect = function(){
    this.LevelSelect="Controls";
    gEngine.GameLoop.stop();
};

StartMenu.prototype.creditsSelect= function(){
    this.LevelSelect="Credits";
    gEngine.GameLoop.stop();
};