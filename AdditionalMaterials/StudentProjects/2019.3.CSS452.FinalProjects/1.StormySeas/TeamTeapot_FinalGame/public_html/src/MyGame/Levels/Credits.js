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

function Credits() {
    this.kUIButton = "assets/UI/button.png";
    this.kCredits = "assets/Credits.png";
    this.kCreditsBG = "assets/CreditsBG.png";
    this.kBack = "assets/Back.png";
    
    this.kBG = "assets/NightOcean2.png";
    
    // The camera to view the scene
    this.mCamera = null;
    
    this.mCredits = null;
    this.mCreditsBG = null;
    
    this.mBackButton = null;
    
    this.LevelSelect = null;
}
gEngine.Core.inheritPrototype(Credits, Scene);


Credits.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kUIButton);
    gEngine.Textures.loadTexture(this.kCredits);
    gEngine.Textures.loadTexture(this.kCreditsBG);
    gEngine.Textures.loadTexture(this.kBack);
    gEngine.Textures.loadTexture(this.kBG);
};

Credits.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kUIButton);
    gEngine.Textures.unloadTexture(this.kCredits);
    gEngine.Textures.unloadTexture(this.kCreditsBG);
    gEngine.Textures.unloadTexture(this.kBack);
    gEngine.Textures.unloadTexture(this.kBG);
    
    gEngine.Core.startScene(new StartMenu());
};

Credits.prototype.initialize = function () {
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
    
    this.mCredits = new UISprite(this.kCredits, [400, 295], [590, 590], [0, 1, 0, 1]);
    this.mCredits.getRenderable().setColor([1,1,1,1]);
    this.mCreditsBG = new UISprite(this.kCreditsBG, [400, 300], [805, 605], [0, 1, 0, 1]);
    
    this.mBackButton = new UIButton(this.kBack,this.backSelect,this,[50,25],[100,50],"",0,[1,1,1,1],[0,0,0,1]);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
Credits.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    this.mBG.draw(this.mCamera);
    this.mCreditsBG.draw(this.mCamera);
    this.mCredits.draw(this.mCamera);
    this.mBackButton.draw(this.mCamera);
};

Credits.prototype.update = function () {
    this.mBackButton.update();
};

Credits.prototype.backSelect = function(){
    gEngine.GameLoop.stop();
};