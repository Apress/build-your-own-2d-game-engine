/*
 * File: Level2.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectSet, TextureObject, Camera, vec2,
  FontRenderable, ParticleGameObjectSet, ParticleEmitter
  GameObject, Hero, Minion, Dye, Platform, Wall, DyePack, Particle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function LevelSadEnding2() {    
    this.sceneFile = "assets/Scenes/LevelSadEnding2.json";    
}
gEngine.Core.inheritPrototype(LevelSadEnding2, MyGame);

LevelSadEnding2.prototype.initialize0 = function () {
    this.thisLevel = new LevelSadEnding2();
    this.nextLevel = new Credits(); 
    this.sceneParser = new SceneFileParser(this.sceneFile);  
    this.kHeroSprite = "assets/Catherine.png";
};

LevelSadEnding2.prototype.showAnimationWin = function(){
    this.mHeartBreak.update(this.mHero.getXform());
    return this.mHeartBreak.getUpdateResult();
};

LevelSadEnding2.prototype.gameResultDetecting = function () {
    if(this.mAllHumans.getHumanChaseResult() 
            || this.mCatherine.getCatchHeroResult()
            || this.mHero.getFallingResult()
            || this.getTrapTouchResult()) {
        this.mGameStatus = 1;
    }
    if (this.mFlower.getTouchingResult(this.mHero.getXform().getPosition())) {
        this.mGameStatus = 2;
    }
};