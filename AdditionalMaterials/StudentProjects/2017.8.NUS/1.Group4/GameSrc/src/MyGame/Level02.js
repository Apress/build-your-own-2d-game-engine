/*
 * File: Level02.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectSet, TextureObject, Camera, vec2,
  FontRenderable, ParticleGameObjectSet, ParticleEmitter
  GameObject, Hero, Minion, Dye, Platform, Wall, DyePack, Particle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Level02() {    
    this.sceneFile = "assets/Scenes/Level02.json";    
}
gEngine.Core.inheritPrototype(Level02, MyGame);

Level02.prototype.initialize0 = function () {
    this.thisLevel = new Level02();
    this.nextLevel = new Level03(); 
    this.sceneParser = new SceneFileParser(this.sceneFile); 
    this.thisLevelID = 2;
};

Level02.prototype.showAnimationWin = function(){
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
