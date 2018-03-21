/*
 * File: MyGameScene.js 
 * This is the logic of our game. 
 */

"use strict";

function MyGameScene() {
    this.mCamera = null;
    this.mLight = null;
    
    this.kTexture = "assets/minion_spritesheet.png"
    this.kBgTexture = "assets/bg.png"
    this.kBgTextureNormal = "assets/bg_normal.png"
    this.kBg2Texture = "assets/bgLayer.png"
    this.kBg2TextureNormal = "assets/bgLayer_normal.png"
}
gEngine.Core.inheritPrototype(MyGameScene, Scene);

MyGameScene.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kTexture);
    gEngine.Textures.loadTexture(this.kBgTexture);
    gEngine.Textures.loadTexture(this.kBgTextureNormal);
    gEngine.Textures.loadTexture(this.kBg2Texture);
    gEngine.Textures.loadTexture(this.kBg2TextureNormal);
};


MyGameScene.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kTexture);
    gEngine.Textures.unloadTexture(this.kBgTexture);
    gEngine.Textures.unloadTexture(this.kBgTextureNormal);
    gEngine.Textures.unloadTexture(this.kBg2Texture);
    gEngine.Textures.unloadTexture(this.kBg2TextureNormal);
};

MyGameScene.prototype.initialize = function () {
    this.mCamera = new Camera(
            vec2.fromValues(50, 40), // position of the camera
            100, // width of camera
            [0, 0, 500, 400]				// viewport (orgX, orgY, width, height)
            );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    
    this.mLight = new Light();
    this.mLight.setLightType(Light.eLightType.eDirectionalLight);
    this.mLight.setColor([1.0, 1.0, 1.0, 1]);
    this.mLight.setDirection([0.3, 0, -1]);
    this.mLight.setIntensity(1);
    
    // we now use a sprite renderable object
    this.mRenderable = new LightRenderable(this.kTexture);
    this.mRenderable.setElementPixelPositions(130, 310, 0, 180);
    this.mRenderable.addLight(this.mLight);
    
    // create a new game object with the new renderable
    this.mGameObject = new GameObject(this.mRenderable);
    this.mGameObject.getXform().setSize(16, 16);
    this.mGameObject.getXform().setPosition(30, 50);

    var bg = new IllumRenderable(this.kBgTexture,this.kBgTextureNormal);
    bg.getXform().setSize(100, 100);
    bg.getXform().setPosition(50, 40);
    bg.getXform().setZPos(0);
    this.mBgL1 = new ParallaxGameObject(bg, 2, this.mCamera);
    bg.addLight(this.mLight);
    
    bg = new IllumRenderable(this.kBg2Texture,this.kBg2TextureNormal);
    bg.getXform().setSize(100, 100);
    bg.getXform().setPosition(50, 40);
    bg.getXform().setZPos(0);
    this.mBgL2 = new ParallaxGameObject(bg, 1, this.mCamera);
    bg.addLight(this.mLight);
    
    
    gEngine.DefaultResources.setGlobalAmbientIntensity(0);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGameScene.prototype.draw = function () {
    // Clear the screen
    gEngine.Core.clearCanvas([0.8, 0.8, 0.8, 1.0]);

    // Activate our camera
    this.mCamera.setupViewProjection();

    // Draw our objects
    this.mBgL1.draw(this.mCamera);
    this.mBgL2.draw(this.mCamera);

    this.mGameObject.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGameScene.prototype.update = function () {
    
    this.mBgL1.update();
    this.mBgL2.update();

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        this.mRenderable.setElementPixelPositions(130, 310, 0, 180);
        this.mGameObject.getXform().incXPosBy(-0.5);
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        this.mRenderable.setElementPixelPositions(720, 900, 0, 180);
        this.mGameObject.getXform().incXPosBy(0.5);
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
        this.mGameObject.getXform().incYPosBy(-0.5);
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
        this.mGameObject.getXform().incYPosBy(0.5);
    }
    
    this.mGameObject.update();
    this.mCamera.panWith(this.mGameObject.getXform(), 0.9);
    this.mCamera.update();
};
