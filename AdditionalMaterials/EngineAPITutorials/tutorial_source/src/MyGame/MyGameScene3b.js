/*
 * File: MyGameScene.js 
 * This is the logic of our game. 
 */

"use strict"; 

function MyGameScene() {
    this.mCamera = null;
    this.mRenderable = null;
    this.mGameObject = null;
		
	this.kTexture = "assets/minion_spritesheet.png";
}
gEngine.Core.inheritPrototype(MyGameScene, Scene);

MyGameScene.prototype.loadScene = function () {
	gEngine.Textures.loadTexture(this.kTexture);
};
    
MyGameScene.prototype.unloadScene = function () {
	gEngine.Textures.unloadTexture(this.kTexture);
};

MyGameScene.prototype.initialize = function () {
    this.mCamera = new Camera(
        vec2.fromValues(50, 40),		// position of the camera
        100,                       // width of camera
        [0, 0, 500, 400]           // viewport (orgX, orgY, width, height)
    );    
	// set the background color of our view to medium grey
	this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
	// we now use a sprite renderable object
	this.mRenderable = new SpriteRenderable(this.kTexture);
	this.mRenderable.setElementPixelPositions(130, 310, 0, 180);
    
	// create a new game object with the new renderable
	this.mGameObject = new GameObject(this.mRenderable);
	this.mGameObject.getXform().setSize(16, 16);
	this.mGameObject.getXform().setPosition(30, 50);
	
	// we create a second renderable
	this.mAnimatedRenderable = new SpriteAnimateRenderable(this.kTexture);
	this.mAnimatedRenderable.setSpriteSequence(348, 0, 204, 164, 5,	0);
	this.mAnimatedRenderable.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
	this.mAnimatedRenderable.setAnimationSpeed(50);
    
	this.mAnimatedGameObject = new GameObject(this.mAnimatedRenderable);
	this.mAnimatedGameObject.getXform().setSize(16, 12.8);
	this.mAnimatedGameObject.getXform().setPosition(80, 50);
    
	gEngine.DefaultResources.setGlobalAmbientIntensity(3);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGameScene.prototype.draw = function () {
    // Clear the screen
	gEngine.Core.clearCanvas([0.8, 0.8, 0.8, 1.0]);
    
	// Activate our camera
	this.mCamera.setupViewProjection();
    
	// Draw our objects
	this.mGameObject.draw(this.mCamera);
	this.mAnimatedGameObject.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGameScene.prototype.update = function () {
	this.mCamera.update();
	
	// Check for user keyboard input to control GameObject
	if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
		this.mRenderable.setElementPixelPositions(130, 310, 0, 180);
		this.mGameObject.getXform().incXPosBy(-0.5);
	}
        
	if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
		this.mRenderable.setElementPixelPositions(720, 900, 0, 180);
		this.mGameObject.getXform().incXPosBy(0.5);
	}
	
	// set the location for this GameObject to the current mouse position
	this.mAnimatedGameObject.getXform().setXPos(this.mCamera.mouseWCX());
	this.mAnimatedGameObject.getXform().setYPos(this.mCamera.mouseWCY());
     
	if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
		gEngine.GameLoop.stop();
	}
	this.mGameObject.update();
	this.mAnimatedRenderable.updateAnimation();
};
