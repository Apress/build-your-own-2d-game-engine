/*
 * File: CaveEscape.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
  GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function CaveEscape() {
    var level = "Level1";
    this.mLgtIndex = 2;
    this.mThisLevel = level;
    this.kTerrainTexture = "assets/terrain.png";
    this.kTerrainNormal = "assets/terrain_normal.png";
    
    this.kLevelFile = "assets/" + level + "/" + level + ".xml";  // e.g., assets/Level1/Level1.xml
    this.kBg = "assets/" + level + "/bg2.png";
    this.kBgNormal = "assets/" + level + "/bg2_normal.png";
    this.kBgLayer = "assets/" + level + "/bg2Layer.png";
    this.kBgLayerNormal = "assets/" + level + "/bg2Layer_normal.png";
    
    // The camera to view the scene
    this.mCamera = null;
    this.mMsg = null;
    this.mMsg2 = null;
    
    this.mCameraSpeed = 0.4;
    
    this.mTerrainSetBottom = null;
    this.mTerrainSetTop = null;
}
gEngine.Core.inheritPrototype(CaveEscape, Scene);

CaveEscape.prototype.initialize = function () {
    // set ambient lighting
    gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(0.2);

    // parse the entire scene
    var parser = new SceneFileParser(this.kLevelFile);
    this.mCamera = parser.parseCamera();
    
    globalLightSet = parser.parseLights();
    parser.parseBackground(this.mThisLevel, this.mCamera, globalLightSet);

    this.mTerrainSetBottom = new TerrainSet(0, this.mCamera);
    this.mTerrainSetTop = new TerrainSet(1, this.mCamera);

    this.mMsg = new FontRenderable("Cave Escape");
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.setTextHeight(3);
    this.mMsg.getXform().setPosition(6 - this.mMsg.getXform().getWidth() / 2, 8);
  
    
    this.mMsg2 = new FontRenderable("Press space to start");
    this.mMsg2.setColor([1, 1, 1, 1]);
    this.mMsg2.setTextHeight(2);
    this.mMsg2.getXform().setPosition(6 - this.mMsg.getXform().getWidth() / 2, 5);
    
    //Move the global hero light out of the scene
    globalLightSet.getLightAt(this.mLgtIndex).set2DPosition(vec2.fromValues(50, 50));
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
CaveEscape.prototype.draw = function () {
    
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    gEngine.LayerManager.drawAllLayers(this.mCamera);
    gEngine.DefaultResources.setGlobalAmbientIntensity(1);
    this.mMsg.draw(this.mCamera);
    this.mMsg2.draw(this.mCamera);
    gEngine.DefaultResources.setGlobalAmbientIntensity(0.2);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
CaveEscape.prototype.update = function () {
    this.mCamera.update();
    gEngine.LayerManager.updateAllLayers(this.mCamera);
    
    var curPos = this.mCamera.getWCCenter();
    this.mCamera.setWCCenterNow(curPos[0] + this.mCameraSpeed, 8);
    
    this.mMsg.getXform().setPosition(curPos[0] - 8, curPos[1] + this.mMsg.getXform().getHeight());
    this.mMsg2.getXform().setPosition(curPos[0] - 11, curPos[1] - this.mMsg.getXform().getHeight());
    
    this.mTerrainSetBottom.update(this.mCamera);
    this.mTerrainSetTop.update(this.mCamera);
    // select which character to work with
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space))
        gEngine.GameLoop.stop();
};

CaveEscape.prototype.loadScene = function () {
    gEngine.TextFileLoader.loadTextFile(this.kLevelFile, gEngine.TextFileLoader.eTextFileType.eXMLFile);
   
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kBgNormal);
    gEngine.Textures.loadTexture(this.kBgLayer);
    gEngine.Textures.loadTexture(this.kBgLayerNormal);
    gEngine.Textures.loadTexture(this.kTerrainTexture);
    gEngine.Textures.loadTexture(this.kTerrainNormal);
};

CaveEscape.prototype.unloadScene = function() {
    gEngine.LayerManager.cleanUp();

    gEngine.TextFileLoader.unloadTextFile(this.kLevelFile);
    
    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kBgNormal);
    gEngine.Textures.unloadTexture(this.kBgLayer);
    gEngine.Textures.unloadTexture(this.kBgLayerNormal);
    gEngine.Textures.unloadTexture(this.kTerrainTexture);
    gEngine.Textures.unloadTexture(this.kTerrainNormal);
    
    var nextLevel = new GameLevel("Level1");  // next level to be loaded
    gEngine.Core.startScene(nextLevel);
};