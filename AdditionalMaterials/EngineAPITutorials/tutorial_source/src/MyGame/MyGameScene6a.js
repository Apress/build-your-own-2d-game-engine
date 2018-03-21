/*
 * File: MyGameScene.js 
 * This is the logic of our game. 
 */

"use strict";

function MyGameScene() {
    this.mCamera = null;
    this.mRenderable = null;
    this.mBgObject = null;
    this.mGameObject = null;
    this.mLight = null;
    this.mShadow = null;

    this.kBG = "assets/bg.png";
    this.kBGNormal = "assets/bg_normal.png";
    this.kTexture = "assets/minion_spritesheet.png";
}
gEngine.Core.inheritPrototype(MyGameScene, Scene);

MyGameScene.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBG);
    gEngine.Textures.loadTexture(this.kBGNormal);
    gEngine.Textures.loadTexture(this.kTexture);
};


MyGameScene.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kBG);
    gEngine.Textures.unloadTexture(this.kBGNormal);
    gEngine.Textures.unloadTexture(this.kTextureN);
};

MyGameScene.prototype.initialize = function () {
    this.mCamera = new Camera(
            vec2.fromValues(50, 40), // position of the camera
            100, // width of camera
            [0, 0, 500, 400]				// viewport (orgX, orgY, width, height)
            );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);    // sets the background to gray

    // create a background for the scene
    var background;
    background = new IllumRenderable(this.kBG, this.kBGNormal);
    background.getXform().setSize(100, 80);
    background.getXform().setPosition(50, 40);
    this.mBgObject = new GameObject(background);

    // we use a new object type that knows how to render with lights
    this.mRenderable = new LightRenderable(this.kTexture);
    this.mRenderable.setElementPixelPositions(130, 310, 0, 180);

    // create the light and setup the parameters we need
    this.mLight = new Light();
    this.mLight.setLightType(Light.eLightType.ePointLight);
    this.mLight.setColor([1.0, 1.0, 1.0, 1]);
    this.mLight.setXPos(35);
    this.mLight.setYPos(50);
    this.mLight.setZPos(10);
    this.mLight.setNear(18);
    this.mLight.setFar(20);
    this.mLight.setIntensity(2);
    this.mLight.setLightCastShadowTo(true);

    // associate the light with the renderables
    background.addLight(this.mLight);
    this.mRenderable.addLight(this.mLight);

    // create a new game object with the new renderable
    this.mGameObject = new GameObject(this.mRenderable);
    this.mGameObject.getXform().setSize(16, 16);
    this.mGameObject.getXform().setPosition(30, 50);
    this.mGameObject.getXform().setZPos(3);

    this.mShadow = new ShadowReceiver(this.mBgObject);
    this.mShadow.addShadowCaster(this.mGameObject);

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
    this.mShadow.draw(this.mCamera);
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
