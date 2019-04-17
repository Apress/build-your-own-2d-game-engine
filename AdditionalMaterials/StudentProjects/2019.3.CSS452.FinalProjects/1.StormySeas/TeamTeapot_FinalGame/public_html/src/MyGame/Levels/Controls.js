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

function Controls() {
    this.kUIButton = "assets/UI/button.png";
    this.kCreditsBG = "assets/CreditsBG.png";
    this.kW = "assets/W.png";
    this.kA = "assets/A.png";
    this.kS = "assets/S.png";
    this.kD = "assets/D.png";
    this.kUp = "assets/Up.png";
    this.kLeft = "assets/Left.png";
    this.kDown = "assets/Down.png";
    this.kRight = "assets/Right.png";
    this.kM = "assets/M.png";
    this.kMoveWith = "assets/MoveWith.png";
    this.kOr = "assets/or.png";
    this.kToMute = "assets/toMute_iny.png";
    this.kBack = "assets/Back.png";
    
    this.kBG = "assets/NightOcean2.png";
    
    // The camera to view the scene
    this.mCamera = null;
    
    this.mW = null;
    this.mA = null;
    this.mS = null;
    this.mD = null;
    this.mUp = null;
    this.mLeft = null;
    this.mDown = null;
    this.mRight = null;
    this.mM = null;
    this.mMoveWith = null;
    this.mOr = null;
    this.mToMute = null;
    
    this.mBG = null;
    this.mCreditsBG = null;
    
    this.mBackButton = null;
    
    this.LevelSelect = null;
}
gEngine.Core.inheritPrototype(Controls, Scene);


Controls.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kUIButton);
    gEngine.Textures.loadTexture(this.kW);
    gEngine.Textures.loadTexture(this.kA);
    gEngine.Textures.loadTexture(this.kS);
    gEngine.Textures.loadTexture(this.kD);
    gEngine.Textures.loadTexture(this.kUp);
    gEngine.Textures.loadTexture(this.kLeft);
    gEngine.Textures.loadTexture(this.kDown);
    gEngine.Textures.loadTexture(this.kRight);
    gEngine.Textures.loadTexture(this.kM);
    gEngine.Textures.loadTexture(this.kMoveWith);
    gEngine.Textures.loadTexture(this.kOr);
    gEngine.Textures.loadTexture(this.kToMute);
    gEngine.Textures.loadTexture(this.kBack);
    gEngine.Textures.loadTexture(this.kBG);
    gEngine.Textures.loadTexture(this.kCreditsBG);
};

Controls.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kUIButton);
    gEngine.Textures.unloadTexture(this.kW);
    gEngine.Textures.unloadTexture(this.kA);
    gEngine.Textures.unloadTexture(this.kS);
    gEngine.Textures.unloadTexture(this.kD);
    gEngine.Textures.unloadTexture(this.kUp);
    gEngine.Textures.unloadTexture(this.kLeft);
    gEngine.Textures.unloadTexture(this.kDown);
    gEngine.Textures.unloadTexture(this.kRight);
    gEngine.Textures.unloadTexture(this.kM);
    gEngine.Textures.unloadTexture(this.kMoveWith);
    gEngine.Textures.unloadTexture(this.kOr);
    gEngine.Textures.unloadTexture(this.kToMute);
    gEngine.Textures.unloadTexture(this.kBack);
    gEngine.Textures.unloadTexture(this.kBG);
     gEngine.Textures.unloadTexture(this.kCreditsBG);
    
    gEngine.Core.startScene(new StartMenu());
};

Controls.prototype.initialize = function () {
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
    this.mCreditsBG = new UISprite(this.kCreditsBG, [400, 300], [805, 605], [0, 1, 0, 1]);
    
    this.mW = new UISprite(this.kW, [200, 400], [75, 75], [0, 1, 0, 1]);
    this.mA = new UISprite(this.kA, [125, 325], [75, 75], [0, 1, 0, 1]);
    this.mS = new UISprite(this.kS, [200, 325], [75, 75], [0, 1, 0, 1]);
    this.mD = new UISprite(this.kD, [275, 325], [75, 75], [0, 1, 0, 1]);
    this.mUp = new UISprite(this.kUp, [600, 400], [75, 75], [0, 1, 0, 1]);
    this.mLeft = new UISprite(this.kLeft, [525, 325], [75, 75], [0, 1, 0, 1]);
    this.mDown = new UISprite(this.kDown, [600, 325], [75, 75], [0, 1, 0, 1]);
    this.mRight = new UISprite(this.kRight, [675, 325], [75, 75], [0, 1, 0, 1]);
    this.mM = new UISprite(this.kM, [225, 175], [75, 75], [0, 1, 0, 1]);
    this.mMoveWith = new UISprite(this.kMoveWith, [400, 475], [300, 300], [0, 1, 0, 1]);
    this.mMoveWith.getRenderable().setColor([1,1,1,1]);
    this.mOr = new UISprite(this.kOr, [400, 375], [150, 150], [0, 1, 0, 1]);
    this.mOr.getRenderable().setColor([1,1,1,1]);
    this.mToMute = new UISprite(this.kToMute, [450, 150], [375, 375], [0, 1, 0, 1]);
    this.mToMute.getRenderable().setColor([1,1,1,1]);
    
    this.mBackButton = new UIButton(this.kBack,this.backSelect,this,[50,25],[100,50],"",0,[1,1,1,1],[0,0,0,1]);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
Controls.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    this.mBG.draw(this.mCamera);
    this.mCreditsBG.draw(this.mCamera);
    this.mW.draw(this.mCamera);
    this.mA.draw(this.mCamera);
    this.mS.draw(this.mCamera);
    this.mD.draw(this.mCamera);
    this.mUp.draw(this.mCamera);
    this.mLeft.draw(this.mCamera);
    this.mDown.draw(this.mCamera);
    this.mRight.draw(this.mCamera);
    this.mM.draw(this.mCamera);
    this.mMoveWith.draw(this.mCamera);
    this.mOr.draw(this.mCamera);
    this.mToMute.draw(this.mCamera);
    this.mBackButton.draw(this.mCamera);
};

Controls.prototype.update = function () {
    this.mBackButton.update();
};

Controls.prototype.backSelect = function(){
    gEngine.GameLoop.stop();
};