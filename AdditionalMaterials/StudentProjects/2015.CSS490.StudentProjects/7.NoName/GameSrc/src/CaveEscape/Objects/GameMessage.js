/* File: Hero.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update funciton of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

GameMessage.eState = Object.freeze({
    eStage1: 0,
    eStage2: 2,
    eStage3: 3,
    eEndStage: 4
});

function GameMessage(spriteTexture, camera) {
    
    this.mCamera = camera;
    this.mCyclesRemaining = 0;
    
    this.mRenderable = new SpriteAnimateRenderable(spriteTexture);
    this.mRenderable.setColor([1, 1, 1, 1]);
    this.mRenderable.getXform().setZPos(1);
    this.mRenderable.getXform().setSize(20, 5);
    
    this.update();
}

GameMessage.prototype.isActive = function () { return (this.mCyclesRemaining > 0); };

GameMessage.prototype.activate = function (state) {
    
    switch(state) {
        
        case GameMessage.eState.eStage1:
            this.mRenderable.setSpriteSequence(501, 5, 170, 35, 1, 0);
            break;
        
        case GameMessage.eState.eStage2:
            this.mRenderable.setSpriteSequence(451, 5, 170, 35, 1, 0);
            break;

        case GameMessage.eState.eStage3:
            this.mRenderable.setSpriteSequence(399, 5, 170, 35, 1, 0);
            break;

        default:
            this.mRenderable.setSpriteSequence(348, 5, 282, 35, 1, 0);
            break;
    }
    
    this.mCyclesRemaining = 280;    
};

GameMessage.prototype.draw = function (camera) {
    this.mRenderable.draw(camera);
};

GameMessage.prototype.update = function () {

    // If there are no cycles remaining then there is nothing to do here
    if(this.mCyclesRemaining <= 0) { return; }
    
    // Decrement the counter
    this.mCyclesRemaining--;

    // Update the position of the game message
    var centerPos = this.mCamera.getWCCenter();
    this.mRenderable.getXform().setPosition(centerPos[0], centerPos[1]);
};