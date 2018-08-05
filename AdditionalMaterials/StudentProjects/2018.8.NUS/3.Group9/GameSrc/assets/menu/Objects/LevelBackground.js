/*
* LevelBackground.js
* 
*/

"use strict";

function LevelBackground(spriteTexture) {
	
	this.mBackg = new LightRenderable(spriteTexture);
	// this.mGrass.setColor([1, 1, 1, 1]);
    this.mBackg.getXform().setPosition(0, 0);
    this.mBackg.getXform().setSize(200, 100);
    // this.mGrass.setElementPixelPositions(0, 200, 0, 200);

    GameObjectSet.call(this);

    this.addToSet(this.mBackg);

}
gEngine.Core.inheritPrototype(LevelBackground, GameObjectSet);

LevelBackground.prototype.getBackground = function() {
	return this.mBackg;
}