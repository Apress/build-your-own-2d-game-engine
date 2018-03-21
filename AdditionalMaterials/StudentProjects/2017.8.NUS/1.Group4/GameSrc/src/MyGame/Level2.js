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

function Level2() {    
    this.sceneFile = "assets/Scenes/Level2.json";    
}
gEngine.Core.inheritPrototype(Level2, MyGame);

Level2.prototype.initialize0 = function () {
    this.thisLevel = new Level2();
    this.nextLevel = new Level3(); 
    this.sceneParser = new SceneFileParser(this.sceneFile);    
};

Level2.prototype.showAnimationWin = function(){
    this.mHeart.update(this.mCatherine.getXform());
    return this.mHeart.getUpdateResult();
};
