/*
 * File: MyGameScene.js 
 * This is the logic of our game. 
 */

"use strict"; 

function MyGameScene() {
    this.mCamera = null;
	this.mBg = null;
    this.mMinionRenderable = null;
    this.mMinionObject = null;
    this.mRockRenderable = null;
    this.mRockObject = null;
	this.mLight = null;
	
    this.kBG = "assets/bg.png";
	this.kMinionTexture = "assets/minion_spritesheet.png";
	this.kRockTexture = "assets/asteroids.png";
	this.kRockNormalTexture = "assets/asteroidsNormal.png";
}
gEngine.Core.inheritPrototype(MyGameScene, Scene);

MyGameScene.prototype.loadScene = function () {
	gEngine.Textures.loadTexture(this.kBG);
	gEngine.Textures.loadTexture(this.kMinionTexture);
	gEngine.Textures.loadTexture(this.kRockTexture);
	gEngine.Textures.loadTexture(this.kRockNormalTexture);
};


MyGameScene.prototype.unloadScene = function () {
	gEngine.Textures.unloadTexture(this.kBG);
	gEngine.Textures.unloadTexture(this.kMinionTexture);
	gEngine.Textures.unloadTexture(this.kRockTexture);
	gEngine.Textures.unloadTexture(this.kRockNormalTexture);
};

MyGameScene.prototype.initialize  = function () {
    this.mCamera = new Camera(
        vec2.fromValues(50, 40),		// position of the camera
        100,							// width of camera
        [0, 0, 500, 400]				// viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    // create a background for the scene
	this.mBg = new LightRenderable(this.kBG);
	this.mBg.getXform().setSize(100, 80);
	this.mBg.getXform().setPosition(50, 40);
	
    // we use an object type that knows how to render with lights
	this.mMinionRenderable = new LightRenderable(this.kMinionTexture);
	this.mMinionRenderable.setElementPixelPositions(130, 310, 0, 180);
	
    // we use a new object type that render with normal maps
	this.mRockRenderable = new IllumRenderable(this.kRockTexture,this.kRockNormalTexture);
	this.mRockRenderable.setSpriteSequence(64, 0, 61, 64, 59, 2);
	this.mRockRenderable.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
	this.mRockRenderable.setAnimationSpeed(2);
    
	// create the light and setup the parameters we need
	this.mLight = new Light();
	this.mLight.setLightType(Light.eLightType.eSpotLight);
	this.mLight.setColor([1.0, 1.0, 1.0, 1]);
	this.mLight.setDirection([0.2,  0, -1]);
	this.mLight.setXPos(10);
	this.mLight.setYPos(50);
	this.mLight.setZPos(10);
    this.mLight.setOuter(1.6);
    this.mLight.setInner(1.5);
	this.mLight.setNear(20);
	this.mLight.setFar(50);
	this.mLight.setIntensity(1);
        
	// associate the light with the renderables
	this.mBg.addLight(this.mLight);
	this.mMinionRenderable.addLight(this.mLight);
	this.mRockRenderable.addLight(this.mLight);
        
	// create a game object with the minion renderable
	this.mMinionObject = new GameObject(this.mMinionRenderable);
	this.mMinionObject.getXform().setSize(16, 16);
	this.mMinionObject.getXform().setPosition(30, 50);
	
	// create a game object with the rock animated renderable
	this.mRockObject = new GameObject(this.mRockRenderable);
	this.mRockObject.getXform().setSize(16, 16);
	this.mRockObject.getXform().setPosition(60, 50);
    
	// We could create a GameObject for the background but since
	// it will not be interacting with any other object, we 
	// can leave it as a pure renderable
    
	// we set the ambient light low to emphasize light affect
	gEngine.DefaultResources.setGlobalAmbientIntensity(0.4);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGameScene.prototype.draw = function () {
    // Clear the screen
	gEngine.Core.clearCanvas([0.8, 0.8, 0.8, 1.0]);
    
	// Activate our camera
	this.mCamera.setupViewProjection();
    
	// Draw our objects
	this.mBg.draw(this.mCamera);
	this.mMinionObject.draw(this.mCamera);
	this.mRockObject.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGameScene.prototype.update = function () {
   	if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
		var x = this.mLight.getPosition()[0];
		this.mLight.setXPos(x - 0.5);
	}
        
	if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
		var x = this.mLight.getPosition()[0];
		this.mLight.setXPos(x + 0.5);
	}
	if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
		var y = this.mLight.getPosition()[1];
		this.mLight.setYPos(y + 0.5);
	}
        
	if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
		var y = this.mLight.getPosition()[1];
		this.mLight.setYPos(y - 0.5);
	}
	
	// update the animation for the rock
	this.mRockRenderable.updateAnimation();
};
