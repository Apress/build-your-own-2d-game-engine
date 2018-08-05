/*
* LevelBackground.js
* 
*/

"use strict";

function LevelBackground(spriteTexture) {
	
	this.mBackg = new LightRenderable(spriteTexture);
    this.mBackg.getXform().setPosition(0, 0);
    this.mBackg.getXform().setSize(200, 100);

    GameObjectSet.call(this);

    this.addToSet(this.mBackg);
}
gEngine.Core.inheritPrototype(LevelBackground, GameObjectSet);

LevelBackground.prototype.getBackground = function() {
	return this.mBackg;
};