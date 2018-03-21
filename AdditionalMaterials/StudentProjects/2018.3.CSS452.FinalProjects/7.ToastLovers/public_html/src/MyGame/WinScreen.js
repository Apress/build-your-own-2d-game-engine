/* global gEngine, Scene, vec2 */
"use strict";

function WinScreen() {
	this.mCam = null;
	this.mRenderable = null;
}
gEngine.Core.inheritPrototype(WinScreen, Scene);

WinScreen.prototype.initialize = function () {
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
	this.mRenderable = new TextureRenderable("assets/WinScreen.png");
	this.mRenderable.getXform().setPosition(400, -400);
	this.mRenderable.getXform().setSize(800, 800);
};

WinScreen.prototype.update = function (dt) {
	if(gEngine.Input.isKeyClicked(gEngine.Input.keys.R))
		gEngine.GameLoop.stop();
};

WinScreen.prototype.draw = function () {
	this.mCam.setupViewProjection();
	this.mRenderable.draw(this.mCam);
};

WinScreen.prototype.loadScene = function () {
	gEngine.Textures.loadTexture("assets/WinScreen.png");
};

WinScreen.prototype.unloadScene = function () {
	gEngine.Textures.unloadTexture("assets/WinScreen.png");
	var nextLevel = new MenuScene();
	gEngine.Core.startScene(nextLevel);
};
