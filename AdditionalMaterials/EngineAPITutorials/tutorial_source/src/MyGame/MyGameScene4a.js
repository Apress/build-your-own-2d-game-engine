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
    this.mPlatformRenderable = null;
    this.mPlatformObject = null;
    this.mShowBounds = false;
	
    this.kBG = "assets/bg.png";
    this.kTexture = "assets/minion_spritesheet.png";
    this.kPlatform = "assets/platform.png";
}
gEngine.Core.inheritPrototype(MyGameScene, Scene);

MyGameScene.prototype.loadScene = function () {
	gEngine.Textures.loadTexture(this.kBG);
	gEngine.Textures.loadTexture(this.kPlatform);
	gEngine.Textures.loadTexture(this.kTexture);
};

MyGameScene.prototype.unloadScene = function () {
	gEngine.Textures.unloadTexture(this.kBG);
	gEngine.Textures.unloadTexture(this.kPlatform);
	gEngine.Textures.unloadTexture(this.kTexture);
};

MyGameScene.prototype.initialize = function () {
    this.mCamera = new Camera(
        vec2.fromValues(50, 40),	// position of the camera
        100,						// width of camera
        [0, 0, 500, 400]			// viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);    // sets the background to gray
    
	// create a renderable for our background
	this.mBg = new SpriteAnimateRenderable(this.kBG);
    this.mBg.setElementPixelPositions(0, 1024, 0, 1024);
    this.mBg.getXform().setSize(100, 80);
    this.mBg.getXform().setPosition(50, 40);

    // create a renderable for our minion texture
    this.mMinionRenderable = new SpriteAnimateRenderable(this.kTexture);
    this.mMinionRenderable.setElementPixelPositions(130, 310, 0, 180);

    // embed the minion renderable in a GameObject
    this.mMinionObject = new GameObject(this.mMinionRenderable);
    this.mMinionObject.getXform().setSize(16, 16);
    this.mMinionObject.getXform().setPosition(30, 50);

	// create a physics component for this minion
    var r = new RigidRectangle(this.mMinionObject.getXform(), 11, 15);
    r.setColor([0, 1, 0, 1]);			// set a bounding rectangle color
    r.setDrawBounds(this.mShowBounds);
    this.mMinionObject.setPhysicsComponent(r);

	// create a renderable for our platform texture
    this.mPlatformRenderable = new TextureRenderable(this.kPlatform);

    // embed the platform renderable in a GameObject
    this.mPlatformObject = new GameObject(this.mPlatformRenderable);
    this.mPlatformObject.getXform().setSize(30, 3.75);
    this.mPlatformObject.getXform().setPosition(50, 20);

	// create a physics component for the platform
    r = new RigidRectangle(this.mPlatformObject.getXform(), 30, 3);
    r.setMass(0);  						// ensures no movements!
    r.setColor([1, 0.2, 0.2, 1]);		// set a bounding rectangle color
    r.setDrawBounds(this.mShowBounds);
    this.mPlatformObject.setPhysicsComponent(r);

    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGameScene.prototype.draw = function () {
    // Clear the screen
    gEngine.Core.clearCanvas([0.8, 0.8, 0.8, 1.0]);
	
    this.mCamera.setupViewProjection();
    
    this.mBg.draw(this.mCamera);
    this.mPlatformObject.draw(this.mCamera);
    this.mMinionObject.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGameScene.prototype.update = function () {
	// minion control WASD
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        this.mMinionObject.getXform().incXPosBy(-0.5);
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        this.mMinionObject.getXform().incXPosBy(0.5);
    }
	
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
        this.mMinionObject.getXform().incYPosBy(0.5);
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
        this.mMinionObject.getXform().incYPosBy(-0.5);
    }
	
	// toggle the drawing of the bounding regions
	if (gEngine.Input.isKeyClicked(gEngine.Input.keys.C)) {
        if (this.mShowBounds) {
           this.mMinionObject.getPhysicsComponent().setDrawBounds(false);
           this.mPlatformObject.getPhysicsComponent().setDrawBounds(false);
        }
        else {
            this.mMinionObject.getPhysicsComponent().setDrawBounds(true);
            this.mPlatformObject.getPhysicsComponent().setDrawBounds(true);
        }
        this.mShowBounds = !this.mShowBounds;
    }
	
	// resolve collisions between our two GameObjects
    gEngine.Physics.processObjObj(this.mPlatformObject, this.mMinionObject);
};
