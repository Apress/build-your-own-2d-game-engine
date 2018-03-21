/*
 * File: MyGameScene.js 
 * This is the logic of our game. 
 */

"use strict"; 

function MyGameScene() {
    this.mCamera = null;
	this.mBg = null;
    this.mRenderable = null;
    this.mGameObject = null;
	this.mLight = null;
	
    this.kBG = "assets/bg.png";
	this.kTexture = "assets/minion_spritesheet.png";
}
gEngine.Core.inheritPrototype(MyGameScene, Scene);

MyGameScene.prototype.loadScene = function () {
	gEngine.Textures.loadTexture(this.kBG);
	gEngine.Textures.loadTexture(this.kTexture);
};


MyGameScene.prototype.unloadScene = function () {
	gEngine.Textures.unloadTexture(this.kBG);
	gEngine.Textures.unloadTexture(this.kTexture);
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
	
    // we use a new object type that knows how to render with lights
	this.mRenderable = new LightRenderable(this.kTexture);
	this.mRenderable.setElementPixelPositions(130, 310, 0, 180);
    
	// create the light and setup the parameters we need
	this.mLight = new Light();
	this.mLight.setLightType(Light.eLightType.ePointLight);
	this.mLight.setColor([1.0, 1.0, 1.0, 1]);
	this.mLight.setXPos(55);
	this.mLight.setYPos(61);
	this.mLight.setZPos(1);
	this.mLight.setNear(8);
	this.mLight.setFar(10);
	this.mLight.setIntensity(1);
        
	// associate the light with the renderables
	this.mBg.addLight(this.mLight);
	this.mRenderable.addLight(this.mLight);
        
	// create a new game object with the new renderable
	this.mGameObject = new GameObject(this.mRenderable);
	this.mGameObject.getXform().setSize(16, 16);
	this.mGameObject.getXform().setPosition(30, 50);
    
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
	this.mGameObject.draw(this.mCamera);
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
};
