/*
 * File: LevelHappyEnding.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectSet, TextureObject, Camera, vec2,
  FontRenderable, ParticleGameObjectSet, ParticleEmitter
  GameObject, Hero, Minion, Dye, Platform, Wall, DyePack, Particle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function LevelHappyEnding() {    
    this.sceneFile = "assets/Scenes/LevelHappyEnding.json";    
}
gEngine.Core.inheritPrototype(LevelHappyEnding, MyGame);

LevelHappyEnding.prototype.initialize0 = function () {
    this.thisLevel = new LevelHappyEnding();
    this.nextLevel = new Credits(); 
    this.sceneParser = new SceneFileParser(this.sceneFile);  
    this.mHeart2 = new Heart(this.kHeart, -50, -50, 5, 5);
    this.mFlower2 = new Flower(this.kFlower, -50, -50, 8, 8);
    this.mFlower2.initColor();
    
    gEngine.AudioClips.stopBackgroundAudio();  
};

LevelHappyEnding.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    //this.mPrisoners.draw(this.mCamera);
    
    this.mAllPlatforms.draw(this.mCamera);
    this.mAllWalls.draw(this.mCamera);
    this.mTexts.draw(this.mCamera);
    
    this.mHero.draw(this.mCamera);
    this.mCatherine.draw(this.mCamera);
    this.mFlower.draw(this.mCamera);
    this.mHeart.draw(this.mCamera);
    this.mHeart2.draw(this.mCamera);
    this.mFlower2.draw(this.mCamera);    
};

LevelHappyEnding.prototype.update = function () { 
    this.mCamera.update();  // to ensure proper interpolated movement effects    
    this.mAllWalls.update();    
    this.mAllPlatforms.update();
    // physics simulation
    this.physicsSimulation();
    
    //playing
    //debug
    //this.showAnimationWin();
    //  debug
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)){
        gEngine.GameLoop.stop();
    } 
    
    if (this.mGameStatus === 0) {
        this.mHero.update(this.mAllPlatforms);
        this.mCatherine.update(); 
        //  Catherine Chasing
        this.mCatherine.chaseHero(this.mHero);     
        this.gameResultDetecting(); // win/lose/ 
        this.showFirstTxt();
    }        
    // win/lose
    if (this.mGameStatus === 1) {
        if (this.showAnimationLose())
        {
            this.nextLevel = this.thisLevel;
            gEngine.GameLoop.stop();
        }
    }
    if (this.mGameStatus === 2) {
        gEngine.AudioClips.playBackgroundAudio(this.kHBGM);
        if (!this.mFlower.update(0.01)){
            if (!this.mHero.isGrounded){
                this.mHero.update(this.mAllPlatforms);
            }
            this.mCatherine.setTriggerDis(800);
        }  
        else if (!this.mCatherine.getCatchHeroResult()) {
            //this.mHero.update(this.mAllPlatforms);
            this.mCatherine.update(); 
            //  Catherine Chasing
            this.mCatherine.chaseHeroWithFlower(this.mHero);
        }
        else if (this.showAnimationWin()){
            gEngine.GameLoop.stop();
        }
    }
};

LevelHappyEnding.prototype.showAnimationWin = function(){
    var mHeroX = this.mHero.getXform().getXPos();
    var mCatherineX = this.mCatherine.getXform().getXPos();
    var color1 = this.mTexts.getObjectAt(1).getColor();
    this.mFlower2.getXform().setPosition((mHeroX + mCatherineX) / 2, 8);
    
    if (!this.mFlower2.update(-0.01)){
        
    }
    else if (color1[3] >= 0) {
        var delta = 0.005;
        color1[3] -= delta;
        this.mTexts.getObjectAt(1).setColor(color1);
    }
    else {
        this.mHeart2.update(this.mCatherine.getXform());
        this.mHeart.update(this.mHero.getXform());
    }
    
    return this.mHeart.getUpdateResult();
};

LevelHappyEnding.prototype.gameResultDetecting = function () {
    if(this.mAllHumans.getHumanChaseResult() 
            || this.mCatherine.getCatchHeroResult()
            || this.mHero.getFallingResult()
            || this.getTrapTouchResult()) {
        this.mGameStatus = 1;
    }
    if (this.mFlower.getTouchingResult(this.mCatherine.getXform().getPosition())) {
        this.mGameStatus = 2;
    }
};