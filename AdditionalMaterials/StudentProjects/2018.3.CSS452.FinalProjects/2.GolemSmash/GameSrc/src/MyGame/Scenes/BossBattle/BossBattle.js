/*
 * File: BossBattle.js 
 * This is the logic for the boss battle scene.
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectSet, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable, ResultsScreen
  GameObject, Hero, Arrow, TextureRenderable, RigidRectangle, Platform, Terrain,
  ArrowVector, Torch, Config, Golem, Boundary, LightRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

function BossBattle(hardMode) {
    this.mMainCamera = null;
    this.mGlobalLightSet = null;
    this.mUILight = null;
    this.mBgShadow = null;
    this.mPhysicsGameObjects = null;
    this.mNonPhysicsGameObjects = null;
    this.mHero = null;
    this.mBoss = null;
    this.mBgL0 = null;
    this.mBgL1 = null;
    this.boundary = null;
    this.mFg = null;
    this.kBgMusic = null;
    this.mCollisions = [];
    this.mVictory = false;
    this.mLgtIndex = 0;
    this.mLgtRotateTheta = 0;
    this.mHardMode = hardMode;
}
gEngine.Core.inheritPrototype(BossBattle, Scene);

BossBattle.prototype.loadScene = function () {
    for (var texture in Config.BossBattle.Textures) {
        gEngine.Textures.loadTexture(Config.BossBattle.Textures[texture]);
    }
    for(var texture in Config.UI.Textures) {
        gEngine.Textures.loadTexture(Config.UI.Textures[texture]);
    }
    gEngine.AudioClips.loadAudio("assets/audio/music/bossbattle.mp3");
    gEngine.AudioClips.loadAudio("assets/audio/sfx/shoot.mp3");

};

BossBattle.prototype.unloadScene = function () {
    gEngine.LayerManager.cleanUp();
    this._unloadUI();
   /* for (var texture in Config.BossBattle.Textures) {
        gEngine.Textures.unloadTexture(Config.BossBattle.Textures[texture]);
    }
    for(var texture in Config.UI.Textures) {
        gEngine.Textures.unloadTexture(Config.UI.Textures[texture]);
    }*/
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio("assets/audio/sfx/shoot.mp3");
    gEngine.Core.startScene(new ResultsScreen(this.mVictory));
};

BossBattle.prototype.initialize = function () {
    
    this.mMainCamera = new Camera(
        Config.BossBattle.Cameras.MainCameraStartingPosition,
        Config.BossBattle.Cameras.MainCameraWorldWidth,
        Config.BossBattle.Cameras.MainCameraViewport
    );
    this.mMainCamera.setBackgroundColor(Config.BossBattle.Cameras.MainCameraBackgroundColor);
    this.mMainCamera.configInterpolation(
        Config.BossBattle.Cameras.MainCameraInterpStiffness,
        Config.BossBattle.Cameras.MainCameraInterpDuration
    );
    
  
    gEngine.DefaultResources.setGlobalAmbientIntensity(Config.Engine.Misc.GlobalAmbientIntensity);
    gEngine.DefaultResources.setGlobalAmbientColor(Config.Engine.Misc.GlobalAmbientColor);
    
    this._initializeLights();
    
    var light = null;
    var lightSet = [];
    for (var i = 0; i < 16; i++) {
        light = new Light();
        lightSet.push(light);
        this.mGlobalLightSet.addToSet(light);
    }
    
    
    this.mNonPhysicsGameObjects = new GameObjectSet();
    this.mHero = new Hero(
        Config.BossBattle.Textures.HeroSheet,
        Config.BossBattle.Textures.HeroSheetNormal,
        this.mMainCamera,
        lightSet,
        this.mHardMode
    );
    
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors,this.mHero);
    gEngine.LayerManager.addAsShadowCaster(this.mHero);
    
    var golemBlastProjectileLight = new Light();
    var golemHomingProjectileLight = new Light();
    this.mBoss = new Golem(
        Config.BossBattle.Textures.BossSprite, 
        this.mHero, 
        this.mPhysicsGameObjects,
        this.mNonPhysicsGameObjects,
        golemBlastProjectileLight,
        golemHomingProjectileLight,
        this.mHardMode
    );
    this.mGlobalLightSet.addToSet(golemBlastProjectileLight);
    this.mGlobalLightSet.addToSet(golemHomingProjectileLight);
    
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mBoss);
    
    this.boundary = new Boundary(149,230,500,4);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.boundary);
    
    this.kBgMusic = "assets/audio/music/bossbattle.mp3";
    gEngine.AudioClips.playBackgroundAudio(this.kBgMusic, .08);
    
    this.buildLevel();
    
    
    this._initializeBackground();
    this._initializeUI();
    
    var actors = gEngine.LayerManager.getLayer(gEngine.eLayer.eActors);
    for (var i = 0; i < 25; i++) {
        if (!this.mGlobalLightSet.lightExists(i)) {
            continue;
        }
        for (var j = 0; j < actors.size(); j++) {
            if (actors.getObjectAt(j).getRenderable() instanceof LightRenderable){
                actors.getObjectAt(j).getRenderable().addLight(this.mGlobalLightSet.getLightAt(i));
            }
        }
    }
    
    
    this._setupShadow();
    
    // add to layer managers ...
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eBackground, this.mBgL0);
};

BossBattle.prototype._initializeBackground = function() {
    var farBG = new LightRenderable(Config.BossBattle.Textures.FarBackgroundTexture);
    farBG.setElementPixelPositions(0, 1024, 0, 512);
    farBG.getXform().setSize(400, 200);
    farBG.getXform().setPosition(0, 0);
    farBG.getXform().setZPos(-10);
    // Need a light
    farBG.addLight(this.mGlobalLightSet.getLightAt(0));   // only the directional light
    this.mBgL0 = new ParallaxGameObject(farBG, 5, this.mMainCamera);
    this.mBgL0.setCurrentFrontDir([-1, 0, 0]);
    this.mBgL0.setSpeed(.01);
    
    var midBG = new IllumRenderable(Config.BossBattle.Textures.MidBackgroundTexture, Config.BossBattle.Textures.MidBackgroundNormal);
    midBG.setElementPixelPositions(0, 1024, 0, 512);
    midBG.getXform().setSize(352, 176);
    midBG.getXform().setPosition(148, 81);
    midBG.getXform().setZPos(-10); 
    midBG.getMaterial().setSpecular([.2, .2, .2, .2]);
    midBG.getMaterial().setShininess(100);
  
    this.mBgL1 = new ParallaxGameObject(midBG , 1, this.mMainCamera);
    this.mBgL1.setCurrentFrontDir([0, -1, 0]);
    this.mBgL1.setIsTiled(false);
    
     for (var i = 0; i < 25; i++) {
         if (!this.mGlobalLightSet.lightExists(i)) {
            continue;
        }
        this.mBgL1.getRenderable().addLight(this.mGlobalLightSet.getLightAt(i));
        
    }

};

BossBattle.prototype.draw = function () {
    gEngine.Core.clearCanvas(Config.Engine.Misc.CanvasClearColor);
    this.mMainCamera.setupViewProjection();
    gEngine.LayerManager.drawAllLayers(this.mMainCamera);
    this.mCollisions = [];
};

BossBattle.prototype.update = function () {
   
    this.updateMainCamera();
    gEngine.LayerManager.updateAllLayers();

    this.mNonPhysicsGameObjects.update();
    gEngine.Physics.processCollision(
        gEngine.LayerManager.getLayer(gEngine.eLayer.eActors), 
        this.mCollisions
    );
    

    this._updateUI();
    if (this.mHero.getStatus() === false) {
        this.mVictory = false;
        gEngine.GameLoop.stop();
    } else if (this.mBoss.getCurrentState() === Config.Golem.States.Dead) {
        this.mVictory = true;
        gEngine.GameLoop.stop();
    }
};

// Updates the main camera to follow the hero
BossBattle.prototype.updateMainCamera = function () {
    var xform = this.mHero.getXform();
    this.mMainCamera.panTo(xform.getXPos(), xform.getYPos());
    this.mMainCamera.update();
};
