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

function PlayMenu() {
    this.kUIButton = "assets/UI/button.png";
    this.kCreditsBG = "assets/CreditsBG.png";
    this.kEasy = "assets/EasyMode.png";
    this.kNormal = "assets/NormalMode.png";
    this.kHard = "assets/HardMode.png";
    this.kEasyDesc = "assets/EasyDescription.png";
    this.kNormalDesc = "assets/NormalDescription.png";
    this.kHardDesc = "assets/HardDescription.png";
    this.kGoalDesc = "assets/Goal.png";
    
    this.kBG = "assets/NightOcean2.png";
    this.kGem = "assets/Gems.png";
    this.kBack = "assets/Back.png";
    
    // The camera to view the scene
    this.mCamera = null;
    
    this.mBG = null;
    this.mGem = null;
    this.mCreditsBG = null;
    
    this.mPlayButtonEasy = null;
    this.mPlayButtonNormal = null;
    this.mPlayButtonHard = null;
    this.mBackButton = null;
    
    this.mEasyDescription = null;
    this.mNormalDescription = null;
    this.mHardDescription = null;
    this.mGoalDescription = null;
    
    this.LevelSelect = null;
}
gEngine.Core.inheritPrototype(PlayMenu, Scene);


PlayMenu.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kUIButton);
    gEngine.Textures.loadTexture(this.kBG);
    gEngine.Textures.loadTexture(this.kGem);
    gEngine.Textures.loadTexture(this.kCreditsBG);
    gEngine.Textures.loadTexture(this.kEasy);
    gEngine.Textures.loadTexture(this.kEasyDesc);
    gEngine.Textures.loadTexture(this.kNormalDesc);
    gEngine.Textures.loadTexture(this.kHardDesc);
    gEngine.Textures.loadTexture(this.kGoalDesc);
    gEngine.Textures.loadTexture(this.kNormal);
    gEngine.Textures.loadTexture(this.kHard);
    gEngine.Textures.loadTexture(this.kBack);
};

PlayMenu.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kUIButton);
    gEngine.Textures.unloadTexture(this.kBG);
    gEngine.Textures.unloadTexture(this.kGem);
    gEngine.Textures.unloadTexture(this.kCreditsBG);
    gEngine.Textures.unloadTexture(this.kEasy);
    gEngine.Textures.unloadTexture(this.kEasyDesc);
    gEngine.Textures.unloadTexture(this.kNormalDesc);
    gEngine.Textures.unloadTexture(this.kHardDesc);
    gEngine.Textures.unloadTexture(this.kGoalDesc);
    gEngine.Textures.unloadTexture(this.kNormal);
    gEngine.Textures.unloadTexture(this.kHard);
    gEngine.Textures.unloadTexture(this.kBack);
    
    if(this.LevelSelect==="PlayEasy"){
        gEngine.Core.startScene(new MainGame("easy"));
    }
    else if(this.LevelSelect==="PlayNormal"){
        gEngine.Core.startScene(new MainGame("normal"));
    }
    else if(this.LevelSelect==="PlayHard"){
        gEngine.Core.startScene(new MainGame("hard"));
    }
    else if (this.LevelSelect==="Back"){
        gEngine.Core.startScene(new StartMenu());
    }
};

PlayMenu.prototype.initialize = function () {
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
    
    this.mGem = new UISprite(this.kGem, [400, 275], [75, 75], [0.5, 1, 0, 1]);
    
    this.mEasyDescription = new UISprite(this.kEasyDesc, [150, 350], [250, 125], [0, 1, 0, 1]);
    this.mEasyDescription.getRenderable().setColor([1,1,1,1]);
    this.mNormalDescription = new UISprite(this.kNormalDesc, [400, 350], [250, 125], [0, 1, 0, 1]);
    this.mNormalDescription.getRenderable().setColor([1,1,1,1]);
    this.mHardDescription = new UISprite(this.kHardDesc, [650, 350], [250, 125], [0, 1, 0, 1]);
    this.mHardDescription.getRenderable().setColor([1,1,1,1]);
    this.mGoalDescription = new UISprite(this.kGoalDesc, [400, 100], [600, 600], [0, 1, 0, 1]);
    this.mGoalDescription.getRenderable().setColor([1,1,1,1]);
    this.mCreditsBG = new UISprite(this.kCreditsBG, [400, 300], [805, 605], [0, 1, 0, 1]);
    
    this.mPlayButtonEasy = new UIButton(this.kEasy,this.playSelectEasy,this,[150,450],[250,125],"",0,[1,1,1,1],[0,0,0,1]);
    this.mPlayButtonNormal = new UIButton(this.kNormal,this.playSelectNormal,this,[400,450],[250,125],"",0,[1,1,1,1],[0,0,0,1]);
    this.mPlayButtonHard = new UIButton(this.kHard,this.playSelectHard,this,[650,450],[250,125],"",0,[1,1,1,1],[0,0,0,1]);
    
    this.mBackButton = new UIButton(this.kBack,this.backSelect,this,[50,25],[100,50],"",0,[1,1,1,1],[0,0,0,1]);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
PlayMenu.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    this.mBG.draw(this.mCamera);
    this.mCreditsBG.draw(this.mCamera);
    this.mGem.draw(this.mCamera);
    this.mEasyDescription.draw(this.mCamera);
    this.mNormalDescription.draw(this.mCamera);
    this.mHardDescription.draw(this.mCamera);
    this.mGoalDescription.draw(this.mCamera);
    
    this.mPlayButtonEasy.draw(this.mCamera);
    this.mPlayButtonNormal.draw(this.mCamera);
    this.mPlayButtonHard.draw(this.mCamera);
    
    this.mBackButton.draw(this.mCamera);
};

PlayMenu.prototype.update = function () {
    this.mPlayButtonEasy.update();
    this.mPlayButtonNormal.update();
    this.mPlayButtonHard.update();
    this.mBackButton.update();
};

PlayMenu.prototype.playSelectEasy = function(){
    this.LevelSelect="PlayEasy";
    gEngine.GameLoop.stop();
};

PlayMenu.prototype.playSelectNormal = function(){
    this.LevelSelect="PlayNormal";
    gEngine.GameLoop.stop();
};

PlayMenu.prototype.playSelectHard = function(){
    this.LevelSelect="PlayHard";
    gEngine.GameLoop.stop();
};

PlayMenu.prototype.backSelect = function(){
    this.LevelSelect="Back";
    gEngine.GameLoop.stop();
};
