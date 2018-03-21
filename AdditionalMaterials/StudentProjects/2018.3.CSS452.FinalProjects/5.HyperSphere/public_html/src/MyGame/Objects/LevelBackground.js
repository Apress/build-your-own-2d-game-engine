/*
* LevelBackground.js
* 
*/

"use strict";

function LevelBackground(spriteTexture) {
	
	this.mGrass = new LightRenderable(spriteTexture);
	// this.mGrass.setColor([1, 1, 1, 1]);
    this.mGrass.getXform().setPosition(0, 0);
    this.mGrass.getXform().setSize(200, 100);
    // this.mGrass.setElementPixelPositions(0, 200, 0, 200);

    GameObjectSet.call(this);

    this.addToSet(this.mGrass);

}
gEngine.Core.inheritPrototype(LevelBackground, GameObjectSet);

LevelBackground.prototype.getGrass = function() {
	return this.mGrass;
}