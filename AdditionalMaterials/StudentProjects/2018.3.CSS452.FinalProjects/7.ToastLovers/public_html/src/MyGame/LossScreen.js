/* global gEngine, Scene, vec2 */
"use strict";

function LossScreen() {
	this.mCam = null;
	this.mRenderable = null;
}
gEngine.Core.inheritPrototype(LossScreen, Scene);

LossScreen.prototype.initialize = function() {
	this.mCam = new Camera(
		vec2.fromValues(400, -400),
		800,
		[0, 0, 800, 800]
	);
	this.mCam.setBackgroundColor([0.8, 0.8, 0.8, 1]);

	var c = gEngine.DefaultResources.getGlobalAmbientColor();
	c[0] = 1.0;
	c[1] = 1.0;
	c[2] = 1.0;
	c[3] = 1.0;
	this.mRenderable = new TextureRenderable("assets/GameOverScreen.png");
	this.mRenderable.getXform().setPosition(400, -400);
	this.mRenderable.getXform().setSize(800, 800);
};

LossScreen.prototype.update = function(dt) {
	if(gEngine.Input.isKeyClicked(gEngine.Input.keys.R))
		gEngine.GameLoop.stop();
};

LossScreen.prototype.draw = function() {
	this.mCam.setupViewProjection();
	this.mRenderable.draw(this.mCam);
};

LossScreen.prototype.loadScene = function() {
	gEngine.Textures.loadTexture("assets/GameOverScreen.png");
};

LossScreen.prototype.unloadScene = function() {
	gEngine.Textures.unloadTexture("assets/GameOverScreen.png");
	var nextLevel = new MenuScene();
	gEngine.Core.startScene(nextLevel);
};
