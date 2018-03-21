/*
 * File: Level04.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectSet, TextureObject, Camera, vec2,
  FontRenderable, ParticleGameObjectSet, ParticleEmitter
  GameObject, Hero, Minion, Dye, Platform, Wall, DyePack, Particle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

//  I'm angry with people who get in my way
//  Unlike them, I won't hurt anyone

function Level04() {    
    this.sceneFile = "assets/Scenes/Level04.json";    
}
gEngine.Core.inheritPrototype(Level04, MyGame);

Level04.prototype.initialize0 = function () {
    this.thisLevel = new Level04();
    this.nextLevel = new Level05(); 
    this.sceneParser = new SceneFileParser(this.sceneFile);    
    this.thisLevelID = 4;
};

Level04.prototype.showAnimationWin = function(){
    var delta =0.005;
    var color1 = this.mTexts.getObjectAt(1).getColor();
    var mWidth = this.mCamera.getWCWidth();
    
    this.mHeart.update(this.mCatherine.getXform());
    
    if (color1[3] > -0.5){
        mWidth += 3;
        this.mCamera.setWCWidth(mWidth);
    }
    
    if (color1[3] > -1){
        color1[3] -= delta;
        this.mTexts.getObjectAt(1).setColor(color1);
    }
    else {
        return true;
    }
    
    return false;
};
