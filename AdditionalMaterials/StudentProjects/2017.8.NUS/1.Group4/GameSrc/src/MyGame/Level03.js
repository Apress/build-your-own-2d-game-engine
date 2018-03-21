/*
 * File: Level4.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectSet, TextureObject, Camera, vec2,
  FontRenderable, ParticleGameObjectSet, ParticleEmitter
  GameObject, Hero, Minion, Dye, Platform, Wall, DyePack, Particle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Level03() {    
    this.sceneFile = "assets/Scenes/Level03.json";    
}
gEngine.Core.inheritPrototype(Level03, MyGame);

Level03.prototype.initialize0 = function () {
    this.thisLevel = new Level03();
    this.nextLevel = new Level04(); 
    this.sceneParser = new SceneFileParser(this.sceneFile);   
    this.setPrison();
    this.thisLevelID = 3;
};

Level03.prototype.setPrison = function() {
    var prisoner = new Prisoner(this.kCage, 100, 11, 16, 16);
    this.mPrisoners.addToSet(prisoner);
    
    var beenShooter = new Prisoner(this.kHeroSprite, 5, 4.7, 3, 7.5);
    beenShooter.getXform().setRotationInDegree(90);
    this.mPrisoners.addToSet(beenShooter);
    var beingShooter = new Prisoner(this.kHeroSprite, 8.8, 7.7, 3, 7.5);
    this.mPrisoners.addToSet(beingShooter);
    
    var shooter = new Prisoner(this.kShootingHuman, 20, 7, 5, 6);
    this.mPrisoners.addToSet(shooter);
    var bullets = new Prisoner(this.kBullets, 12, 6.5, 10, 5);
    this.mPrisoners.addToSet(bullets);
    
    var performance = new Prisoner(this.kPerformance, 175, 18, 30, 12);
    this.mPrisoners.addToSet(performance);
};

Level03.prototype.showAnimationWin = function(){
    var delta =0.005;
    var color1 = this.mTexts.getObjectAt(1).getColor();
    
    this.mHeart.update(this.mCatherine.getXform());
    if (color1[3] > -0.5){
        color1[3] -= delta;
        this.mTexts.getObjectAt(1).setColor(color1);
    }
    else {
        return true;
    }
    
    return false;
};

Level03.prototype.update0 = function(){
    if(this.mHero.getXform().getYPos() <= 10) {
        this.humanWakeup();
    }
};
