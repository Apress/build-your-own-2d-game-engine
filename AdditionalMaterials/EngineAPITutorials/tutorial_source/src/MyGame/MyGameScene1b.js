/*
 * File: MyGameScene.js 
 * This is the logic of our game. 
 */

"use strict"; 

function MyGameScene() {
    this.mCamera = null;
    this.mRenderable = null;
    this.mGameObject = null;
}
gEngine.Core.inheritPrototype(MyGameScene, Scene);

MyGameScene.prototype.loadScene = function () { };

MyGameScene.prototype.unloadScene = function () { };

MyGameScene.prototype.initialize = function () {
    this.mCamera = new Camera(
        vec2.fromValues(50, 40),	// position of the camera
        100,						// width of camera
        [0, 0, 500, 400]			// viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);    // sets the background to gray
    
    this.mRenderable = new Renderable();
    this.mRenderable.setColor([1.0, 0.0, 0.0, 1.0]);
    
    this.mGameObject = new GameObject(this.mRenderable);
    this.mGameObject.getXform().setSize(16, 16);
    this.mGameObject.getXform().setPosition(30, 50);
	this.mGameObject.setCurrentFrontDir(vec2.fromValues(1, 0));
	this.mGameObject.setSpeed(0.5);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGameScene.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
	
    this.mCamera.setupViewProjection();
    
    this.mGameObject.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGameScene.prototype.update = function () {
    // Check status of our objects and update them
	if(this.mGameObject.getXform().getPosition()[0] > 92) {
		this.mGameObject.setCurrentFrontDir(vec2.fromValues(-1, 0));
	}
	if(this.mGameObject.getXform().getPosition()[0] < 8) {
		this.mGameObject.setCurrentFrontDir(vec2.fromValues(1, 0));
	}
        
	this.mGameObject.update();
};
