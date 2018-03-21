/*
 * File: Level17.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectSet, TextureObject, Camera, vec2,
  FontRenderable, ParticleGameObjectSet, ParticleEmitter
  GameObject, Hero, Minion, Dye, Platform, Wall, DyePack, Particle, MyGame */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Level17() {    
    this.sceneFile = "assets/Scenes/Level17.json";    
}
gEngine.Core.inheritPrototype(Level17, MyGame);

Level17.prototype.initialize0 = function () {
    this.thisLevel = new Level17();
    this.nextLevel = new Level17(); 
    this.mFlower2 = new Flower(this.kFlower, 155, 80, 8, 8);
    this.sceneParser = new SceneFileParser(this.sceneFile);    
};

Level17.prototype.showAnimationWin = function(){
    var delta =0.005;
    var color1 = this.mTexts.getObjectAt(1).getColor();
    
    this.mHeart.update(this.mCatherine.getXform());
    if (color1[3] > 0){
        color1[3] -= delta;
        this.mTexts.getObjectAt(1).setColor(color1);
    }
    else {
        return true;
    }
    
    return false;
};
Level17.prototype.gameResultDetecting = function () {
    if(this.mAllHumans.getHumanChaseResult() 
            || this.mCatherine.getCatchHeroResult()
            || (this.mCatherine.getXform().getYPos()<-40)
            || (this.mHero.getXform().getYPos()<-40)
            || this.getTrapTouchResult()) {
        this.mGameStatus = 1;
    }
    if (this.mFlower.getTouchingResult(this.mCatherine.getXform().getPosition())) {
        this.mGameStatus = 2;
    }
};

Level17.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    //this.mPrisoners.draw(this.mCamera);
    
    this.mAllPlatforms.draw(this.mCamera);
    this.mAllWalls.draw(this.mCamera);
    this.mAllHumans.draw(this.mCamera);
    this.mTexts.draw(this.mCamera);
    
    this.mAllTraps.draw(this.mCamera);

    this.mAllMovingPlats.draw(this.mCamera); 
    
    this.mHero.draw(this.mCamera);
    this.mCatherine.draw(this.mCamera);
    this.mFlower.draw(this.mCamera);
    this.mHeart.draw(this.mCamera);
    this.mHeartBreak.draw(this.mCamera);
    this.mFlower2.draw(this.mCamera);
};