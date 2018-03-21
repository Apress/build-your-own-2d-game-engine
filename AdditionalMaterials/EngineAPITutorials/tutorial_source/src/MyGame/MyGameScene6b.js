/*
 * File: MyGameScene.js 
 * This is the logic of our game. 
 */

"use strict"; 

function MyGameScene() {
    this.mCamera = null;
    
    this.kLayer1 = "assets/layer_01.png";
    this.kLayer2 = "assets/layer_02.png";
    this.kLayer3 = "assets/layer_03.png";
    this.kLayer4 = "assets/layer_04.png";
    this.kLayer5 = "assets/layer_05.png";
    this.kLayer6 = "assets/layer_06.png";
    this.kLayer7 = "assets/layer_07.png";
    this.kLayer8 = "assets/layer_08.png";
}
gEngine.Core.inheritPrototype(MyGameScene, Scene);

MyGameScene.prototype.loadScene = function () {
	gEngine.Textures.loadTexture(this.kLayer1);
	gEngine.Textures.loadTexture(this.kLayer2);
	gEngine.Textures.loadTexture(this.kLayer3);
	gEngine.Textures.loadTexture(this.kLayer4);
	gEngine.Textures.loadTexture(this.kLayer5);
	gEngine.Textures.loadTexture(this.kLayer6);
	gEngine.Textures.loadTexture(this.kLayer7);
	gEngine.Textures.loadTexture(this.kLayer8);
};


MyGameScene.prototype.unloadScene = function () {
	gEngine.Textures.unloadTexture(this.kLayer1);
	gEngine.Textures.unloadTexture(this.kLayer2);
	gEngine.Textures.unloadTexture(this.kLayer3);
	gEngine.Textures.unloadTexture(this.kLayer4);
	gEngine.Textures.unloadTexture(this.kLayer5);
	gEngine.Textures.unloadTexture(this.kLayer6);
	gEngine.Textures.unloadTexture(this.kLayer7);
	gEngine.Textures.unloadTexture(this.kLayer8);
};

MyGameScene.prototype.initialize  = function () {
    this.mCamera = new Camera(
        vec2.fromValues(50, 40),		// position of the camera
        100,							// width of camera
        [0, 0, 500, 400]				// viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    var bg = new LightRenderable(this.kLayer1);
    bg.getXform().setSize(200, 100);
    bg.getXform().setPosition(50, 40);
    bg.getXform().setZPos(0); 
    this.mBgL1 = new ParallaxGameObject(bg, 1, this.mCamera);
    this.mBgL1.setCurrentFrontDir([-1, 0, 0]);
    this.mBgL1.setSpeed(0.06);
    
    bg = new LightRenderable(this.kLayer2);
    bg.getXform().setSize(200, 100);
    bg.getXform().setPosition(50, 40);
    bg.getXform().setZPos(0); 
    this.mBgL2 = new ParallaxGameObject(bg, 1, this.mCamera);
    this.mBgL2.setCurrentFrontDir([-1, 0, 0]);
    this.mBgL2.setSpeed(0.06);
    
    bg = new LightRenderable(this.kLayer3);
    bg.getXform().setSize(200, 100);
    bg.getXform().setPosition(50, 40);
    bg.getXform().setZPos(0); 
    this.mBgL3 = new ParallaxGameObject(bg, 3, this.mCamera);
    this.mBgL3.setCurrentFrontDir([-1, 0, 0]);
    this.mBgL3.setSpeed(0.06);
    
    bg = new LightRenderable(this.kLayer4);
    bg.getXform().setSize(200, 100);
    bg.getXform().setPosition(50, 40);
    bg.getXform().setZPos(0); 
    this.mBgL4 = new ParallaxGameObject(bg, 4, this.mCamera);
    this.mBgL4.setCurrentFrontDir([-1, 0, 0]);
    this.mBgL4.setSpeed(0.06);
    
    bg = new LightRenderable(this.kLayer5);
    bg.getXform().setSize(200, 100);
    bg.getXform().setPosition(50, 40);
    bg.getXform().setZPos(0); 
    this.mBgL5 = new ParallaxGameObject(bg, 5, this.mCamera);
    this.mBgL5.setCurrentFrontDir([-1, 0, 0]);
    this.mBgL5.setSpeed(0.06);
    
    bg = new LightRenderable(this.kLayer6);
    bg.getXform().setSize(200, 100);
    bg.getXform().setPosition(50, 40);
    bg.getXform().setZPos(0); 
    this.mBgL6 = new ParallaxGameObject(bg, 6, this.mCamera);
    this.mBgL6.setCurrentFrontDir([-1, 0, 0]);
    this.mBgL6.setSpeed(0.06);
    
    bg = new LightRenderable(this.kLayer7);
    bg.getXform().setSize(175, 100);
    bg.getXform().setPosition(100, 40);
    bg.getXform().setZPos(0); 
    this.mBgL7 = new ParallaxGameObject(bg, 7, this.mCamera);
    this.mBgL7.setCurrentFrontDir([-1, 0, 0]);
    this.mBgL7.setSpeed(0.06);
    
    bg = new LightRenderable(this.kLayer8);
    bg.getXform().setSize(200, 100);
    bg.getXform().setPosition(50, 40);
    bg.getXform().setZPos(0); 
    this.mBgL8 = new ParallaxGameObject(bg, 8, this.mCamera);
    this.mBgL8.setCurrentFrontDir([-1, 0, 0]);
    
    
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
	this.mBgL8.draw(this.mCamera);
	this.mBgL7.draw(this.mCamera);
	this.mBgL6.draw(this.mCamera);
	this.mBgL5.draw(this.mCamera);
	this.mBgL4.draw(this.mCamera);
	this.mBgL3.draw(this.mCamera);
	this.mBgL2.draw(this.mCamera);
	this.mBgL1.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGameScene.prototype.update = function () {
    this.mBgL1.update();
    this.mBgL2.update();
    this.mBgL3.update();
    this.mBgL4.update();
    this.mBgL5.update();
    this.mBgL6.update();
    this.mBgL7.update();
    this.mBgL8.update();
};
