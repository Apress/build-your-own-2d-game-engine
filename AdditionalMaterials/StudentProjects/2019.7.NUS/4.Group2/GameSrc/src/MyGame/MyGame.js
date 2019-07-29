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

function MyGame(levelID) {
    //Load Texture
    this.kTexture = "assets/kTexture.png";
//    this.kWood = "assets/RigidShape/Wood.png";
    this.kWood = "assets/brick.png";
    this.kRole = "assets/Role.png";
    this.kWin = "assets/WinPage.png";
    this.kLose = "assets/LosePage.png";
    this.kEnergyBar = "assets/EnergyBar.png";
    this.kButton = "assets/Button.png";
    this.kBG = "assets/Background.png";
    this.kTrap = "assets/trap.png";
    //Load Music and sound
    this.kGameBGM = "assets/AudioTest/PlayBGM.mp3";
    this.kArrowfast = "assets/AudioTest/Arrowfast.mp3";
    this.kArrowslow = "assets/AudioTest/Arrowslow.mp3";
    this.kFail = "assets/AudioTest/Fail.mp3";
    this.kHurray = "assets/AudioTest/Hurray.mp3";
    this.kHit = "assets/AudioTest/Hit.mp3";
    this.kFallinlove = "assets/AudioTest/Fallinlove.mp3";
    this.kWinSound = "assets/AudioTest/Win.mp3";
    this.mButtonSelect = null;
    this.mBackButton = null;
    this.mRestartButton = null;
    this.mWinButton = null;
    // The camera to view the scene
    this.mCamera = null;
    this.mWinPage = null;
    this.mCurrentLevel = levelID;
    this.mBackground = null;
    this.mWin = null;
    this.mTrapSet = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);


MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kRole);
    gEngine.Textures.loadTexture(this.kTexture);
    gEngine.Textures.loadTexture(this.kWood);
    gEngine.Textures.loadTexture(this.kWin);
    gEngine.Textures.loadTexture(this.kLose);
    gEngine.Textures.loadTexture(this.kEnergyBar);
    gEngine.Textures.loadTexture(this.kButton);
    gEngine.Textures.loadTexture(this.kBG);
    gEngine.Textures.loadTexture(this.kTrap);
    gEngine.AudioClips.loadAudio(this.kGameBGM);
    gEngine.AudioClips.loadAudio(this.kArrowfast);
    gEngine.AudioClips.loadAudio(this.kArrowslow);
    gEngine.AudioClips.loadAudio(this.kFail);
    gEngine.AudioClips.loadAudio(this.kFallinlove);
    gEngine.AudioClips.loadAudio(this.kHurray);
    gEngine.AudioClips.loadAudio(this.kHit);
    gEngine.AudioClips.loadAudio(this.kWinSound);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kTexture);
    gEngine.Textures.unloadTexture(this.kWood);
    gEngine.Textures.unloadTexture(this.kRole);
    gEngine.Textures.unloadTexture(this.kWin);
    gEngine.Textures.unloadTexture(this.kLose);
    gEngine.Textures.unloadTexture(this.kEnergyBar);
    gEngine.Textures.unloadTexture(this.kButton);
    gEngine.Textures.unloadTexture(this.kBG);
    gEngine.Textures.unloadTexture(this.kTrap);
    gEngine.AudioClips.unloadAudio(this.kGameBGM);
    gEngine.AudioClips.unloadAudio(this.kArrowfast);
    gEngine.AudioClips.unloadAudio(this.kArrowslow);
    gEngine.AudioClips.unloadAudio(this.kFail);
    gEngine.AudioClips.unloadAudio(this.kFallinlove);
    gEngine.AudioClips.unloadAudio(this.kHurray);
    gEngine.AudioClips.unloadAudio(this.kHit);
    gEngine.AudioClips.unloadAudio(this.kWinSound);
    if(this.mButtonSelect === "Back")
        gEngine.Core.startScene(new Menu());
    else if(this.mButtonSelect === "Next")
        gEngine.Core.startScene(new MyGame(this.mCurrentLevel+1));
    else if(this.mButtonSelect === "Restart")
        gEngine.Core.startScene(new MyGame(this.mCurrentLevel));
    else if(this.mButtonSelect === "Level")
        gEngine.Core.startScene(new Menu(2));
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(100, 75), // position of the camera
        200,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.92, 0.92, 0.952, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);

    //Set up the Cupid and platforms and roles according to levelID
    this.mPlatformSet = new PlatformSet();
    this.mButtonSet = new ButtonSet();
    this.mTrapSet = new TrapSet();
    //Build the level
    if (this.mCurrentLevel === 1) {
        this.mPlatformSet.addToSet(new Platform(this.kWood, 100, 20, 200, 5));
        this.mPlatformSet.addToSet(new Platform(this.kWood, 100, 100, 40, 5));
        this.mCupid = new Cupid(this.kTexture,this.mCamera,20,50,this.mPlatformSet);
        //Set up the boy and the girl
        this.mBoy = new Role(this.kRole, 175, 50, 0);
        this.mGirl = new Role(this.kRole, 100, 120, 1);
    }
    if (this.mCurrentLevel === 2) {
        this.mPlatformSet.addToSet(new Platform(this.kWood, 100, 20, 200, 5));
        this.mPlatformSet.addToSet(new Platform(this.kWood, 40, 90, 90, 5));
        this.mPlatformSet.addToSet(new Platform(this.kWood, 130, 50, 40, 5,false,50,100,0.6,0));
        this.mPlatformSet.addToSet(new Platform(this.kWood, 65, 120, 40, 5));
        this.mPlatformSet.addToSet(new Platform(this.kWood, 85, 105, 5, 35));
        // this.mPlatformSet.addToSet(new Platform(this.kWood, 110, 55, 5, 25));
        this.mButtonSet.addToSet(new Button(this.kButton,60,85,180,2));
        this.mTrapSet.addToSet(new Trap(this.kTrap, 100, 25));
        this.mTrapSet.addToSet(new Trap(this.kTrap, 105, 25));
        this.mCupid = new Cupid(this.kTexture,this.mCamera,60,50,this.mPlatformSet);
        //Set up the boy and the girl
        this.mBoy = new Role(this.kRole, 25, 50, 0);
        this.mGirl = new Role(this.kRole, 70, 120, 1);
    }
    if (this.mCurrentLevel === 3) {
        this.mPlatformSet.addToSet(new Platform(this.kWood, 150, 20, 100, 5));
        this.mPlatformSet.addToSet(new Platform(this.kWood, 20, 10, 30, 5,true,10,110,0.2,0));
        this.mPlatformSet.addToSet(new Platform(this.kWood, 100, 10, 5, 25));
        this.mPlatformSet.addToSet(new Platform(this.kWood, 90, 105, 100, 5));
        this.mPlatformSet.addToSet(new Platform(this.kWood, 100, 70, 5, 65));
        this.mPlatformSet.addToSet(new Platform(this.kWood, 42.5, 140, 5, 40));
        this.mCupid = new Cupid(this.kTexture,this.mCamera,20,50,this.mPlatformSet);
        //Set up the boy and the girl
        this.mBoy = new Role(this.kRole, 130, 50, 0);
        this.mGirl = new Role(this.kRole, 100, 130, 1);
    }
    if (this.mCurrentLevel === 4) {
        this.mPlatformSet.addToSet(new Platform(this.kWood, 50, 20, 100, 5));
        this.mPlatformSet.addToSet(new Platform(this.kWood, 50, 90, 100, 5));
        //this.mPlatformSet.addToSet(new Platform(this.kWood, 60, 115, 5, 40));
        this.mPlatformSet.addToSet(new Platform(this.kWood, 150, 40, 5, 50, true, 40, 100, 0.2,0));
        this.mCupid = new Cupid(this.kTexture,this.mCamera,60,50,this.mPlatformSet);
        //Set up the boy and the girl
        this.mBoy = new Role(this.kRole, 25, 50, 0);
        this.mGirl = new Role(this.kRole, 25, 120, 1);
    }
    if(this.mCurrentLevel === 5){
        this.mCupid = new Cupid(this.kTexture,this.mCamera,60,40);
        this.mPlatformSet.addToSet(new Platform(this.kWood, 50, 20, 100, 10));
        this.mPlatformSet.addToSet(new Platform(this.kWood, 60, 110, 80, 10));
        this.mPlatformSet.addToSet(new Platform(this.kWood, 40, 130, 10, 40));
        this.mPlatformSet.addToSet(new Platform(this.kWood, 0, 110, 10, 40));
        this.mPlatformSet.addToSet(new Platform(this.kWood, 150, 80, 50, 10, false, 20, 100, 0.5));
        this.mButtonSet.addToSet(new Button(this.kButton,3,80,-90,4));
        //Set up the boy and the girl
        this.mBoy = new Role(this.kRole, 55, 120, 0);
        this.mGirl = new Role(this.kRole, 25, 120, 1);
    }
    if(this.mCurrentLevel === 6){
        this.mCupid = new Cupid(this.kTexture,this.mCamera,125,45);
        this.mPlatformSet.addToSet(new Platform(this.kWood, 50, 10, 100, 5));
        this.mPlatformSet.addToSet(new Platform(this.kWood, 80, 110, 160, 5));
        this.mPlatformSet.addToSet(new Platform(this.kWood, 20, 130, 40, 5));
        this.mPlatformSet.addToSet(new Platform(this.kWood, 80, 150, 5, 20));
        this.mPlatformSet.addToSet(new Platform(this.kWood, 125, 35, 30, 5));
        this.mPlatformSet.addToSet(new Platform(this.kWood, 155, 60, 30, 5));
        this.mPlatformSet.addToSet(new Platform(this.kWood, 185, 85, 30, 5));
        this.mPlatformSet.addToSet(new Platform(this.kWood, 30, 85, 5, 50));
        this.mPlatformSet.addToSet(new Platform(this.kWood, 65, 40, 5, 60));
        this.mPlatformSet.addToSet(new Platform(this.kWood, 80, 80, 5, 20, true, 60, 95, 0.4));
        this.mTrapSet.addToSet(new Trap(this.kTrap, 80, 114));
        this.mBoy = new Role(this.kRole, 10, 30, 0);
        this.mGirl = new Role(this.kRole, 25, 140, 1);
    }
    if(this.mCurrentLevel === 7){
        this.mCupid = new Cupid(this.kTexture,this.mCamera,100,30);
        this.mBoy = new Role(this.kRole, 10, 30, 0);
        this.mGirl = new Role(this.kRole, 100, 75, 1);
        this.mPlatformSet.addToSet(new Platform(this.kWood, 60, 10, 120, 5));
        this.mPlatformSet.addToSet(new Platform(this.kWood, 87.5, 40, 70, 5));
        this.mPlatformSet.addToSet(new Platform(this.kWood, 50, 87.5, 5, 100));
        this.mPlatformSet.addToSet(new Platform(this.kWood, 100, 137.5, 105, 5));
        this.mPlatformSet.addToSet(new Platform(this.kWood, 150, 87.5, 5, 100));
        this.mPlatformSet.addToSet(new Platform(this.kWood, 120, 70, 5, 60));
        this.mPlatformSet.addToSet(new Platform(this.kWood, 100, 100, 45, 5));
        this.mPlatformSet.addToSet(new Platform(this.kWood, 135, 10, 25, 5, true, 10, 75, 0.4));
    }
    this.mWorld = new World(this.mCurrentLevel,this.mCupid,this.mPlatformSet,this.mButtonSet, this.mBoy,this.mGirl);

    this.mBackButton = new UIButton(this.BackSelect, this, [700, 50], [100, 40], "Back", 6);
    this.mRestartButton = new UIButton(this.RestartSelect, this, [700, 100], [120, 40], "Restart", 6);
    this.mWinPage = new WinPage(this.kWin, this.mWorld, this.mCurrentLevel);
    this.mLosePage = new LosePage(this.kLose);
    
    this.mBackground = new TextureRenderable(this.kBG);
    this.mBackground.getXform().setSize(200, 200);
    this.mBackground.getXform().setPosition(100, 75);
    this.mBackground.setColor([1,1,1,0]);
    
    gEngine.AudioClips.playBackgroundAudio(this.kGameBGM);
    gEngine.AudioClips.setBackgroundVolume(5);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.92, 0.92, 0.952, 1]); // clear to light gray
    this.mCamera.setupViewProjection();
    this.mBackground.draw(this.mCamera);
    this.mWorld.draw(this.mCamera);
    this.mCupid.draw(this.mCamera);
    this.mTrapSet.draw(this.mCamera);
    this.mBackButton.draw(this.mCamera);
    this.mRestartButton.draw(this.mCamera);
    if (this.mWin){
        this.mWinPage.draw(this.mCamera);
    }
    else if (this.mWorld.mIsLose){
        this.mLosePage.draw(this.mCamera);
    }
};

MyGame.prototype.update = function () {
    if(this.mTrapSet.update(this.mCupid.getXform().getXPos(), this.mCupid.getXform().getYPos()))
        this.mWorld.mIsLose = true;
    //Update all the things in the scene
    if (!this.mWorld.mIsWin && !this.mWorld.mIsLose) {
        this.mWorld.update();
        this.mBackButton.update();
        this.mRestartButton.update();
    }
    if(this.mWorld.mIsWin){
        this.mBoy.mHeart.getXform().setPosition(0.95 * this.mBoy.mHeart.getXform().getXPos() + 5, 0.95 * this.mBoy.mHeart.getXform().getYPos() + 3.75);
        this.mGirl.mHeart.getXform().setPosition(0.95 * this.mGirl.mHeart.getXform().getXPos() + 5, 0.95 * this.mGirl.mHeart.getXform().getYPos() + 3.75);
        if(Math.abs(this.mBoy.mHeart.getXform().getXPos() - this.mGirl.mHeart.getXform().getXPos()) < 5 && Math.abs(this.mBoy.mHeart.getXform().getYPos() - Math.abs(this.mGirl.mHeart.getXform().getYPos())) < 5  )
            this.mWin = true;
    }
    if (this.mWin){
        this.mWinPage.setGrade(this.mWorld.mGrade);
        this.mWinPage.update();
        this.mButtonSelect = this.mWinPage.mStatus;
        if(this.mButtonSelect !== null)
            gEngine.GameLoop.stop();
    }else if (this.mWorld.mIsLose)
    {
        this.mLosePage.update();
        this.mButtonSelect = this.mLosePage.mStatus;
        if (this.mButtonSelect !== null)
            gEngine.GameLoop.stop();
    }
};

MyGame.prototype.BackSelect = function(){
    this.mButtonSelect = "Back";
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.GameLoop.stop();
};
MyGame.prototype.RestartSelect = function(){
    this.mButtonSelect = "Restart";
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.GameLoop.stop();
};