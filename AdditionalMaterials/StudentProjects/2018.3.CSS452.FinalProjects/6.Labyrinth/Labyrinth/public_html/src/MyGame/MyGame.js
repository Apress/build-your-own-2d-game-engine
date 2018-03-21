/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
    this.kParticleTexture = "assets/particle.png";
    this.kHeroSprite = "assets/Textures/LabyrinthSprites.png";
    this.kEnemySprite = "assets/Textures/LabyrinthSprites.png";
    this.kCollectibleSprite = "assets/Textures/TempCollectZ.png";
    this.kBackground = "assets/Textures/bgLabrynth.png";
    this.kForeground = "assets/Textures/TopBG.png";
    this.kSpriteNormal = "assets/Textures/LabyrinthSpritesNormal.png";
    this.kZHolder = "assets/Textures/TempCollectZHolder.png";
    this.kMiniMapBackground = "assets/Textures/bgLabrynth.png";
    this.kMiniHeroSprite = "assets/Textures/TempHeroHead.png";
    this.kBGAudio = "assets/audio/inGame.mp3";
    
    this.mPlayer = null;
    this.mHelpViewManager = null;
    this.mMiniMapManager = null;
    
    this.mCollectible = null;
    this.mCollectibleSet = null;
    
    this.mPassage1 = null;
    this.mPassage2 = null;
    
    this.mEnemies = null;
    this.mMainView = null;
    
    this.mMap = null;
    this.mBounds = null;
    
    this.mBackground = null;
    this.mForeground = null;
    this.mHeroAmbush = null;
    
    this.mBackgroundShadow = null;
    this.mDirectionalLight = null;

}
gEngine.Core.inheritPrototype(MyGame, Scene);


MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kParticleTexture);
    gEngine.Textures.loadTexture(this.kHeroSprite);
    gEngine.Textures.loadTexture(this.kCollectibleSprite);
    gEngine.Textures.loadTexture(this.kEnemySprite);
    gEngine.Textures.loadTexture(this.kSpriteNormal);
    gEngine.Textures.loadTexture(this.kBackground);
    gEngine.Textures.loadTexture(this.kForeground);
    gEngine.Textures.loadTexture(this.kZHolder);
    gEngine.Textures.loadTexture(this.kMiniMapBackground);
    gEngine.Textures.loadTexture(this.kMiniHeroSprite);
    
    gEngine.AudioClips.loadAudio(this.kBGAudio);      
};

MyGame.prototype.unloadScene = function () {
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.kBGAudio);
    
    var nextLevel;
    if (this.isGameWon()) {
        nextLevel = new WinScene();
    } else {
        nextLevel = new LoseScene();
    }
    
    gEngine.Textures.unloadTexture(this.kParticleTexture);
    gEngine.Textures.unloadTexture(this.kHeroSprite);
    gEngine.Textures.unloadTexture(this.kCollectibleSprite);
    gEngine.Textures.unloadTexture(this.kEnemySprite);
    gEngine.Textures.unloadTexture(this.kSpriteNormal);
    gEngine.Textures.unloadTexture(this.kBackground);
    gEngine.Textures.unloadTexture(this.kForeground);
    gEngine.Textures.unloadTexture(this.kZHolder);
    gEngine.Textures.unloadTexture(this.kMiniMapBackground);
    gEngine.Textures.unloadTexture(this.kMiniHeroSprite);
    
    gEngine.LayerManager.cleanUp();
    gEngine.Core.startScene(nextLevel);
};

MyGame.prototype.initialize = function () {
    var mapInt = new MapInteraction();
    this.mPlayer = new Player(vec2.fromValues(0,0), this.kHeroSprite, this.kSpriteNormal, mapInt);   
    this.mMainView = new MainView();    
    this.mMap = new RoomBoundingObj();
    this.mBounds = new BoundController(this.mPlayer, this.mMap.getRooms(), this.mMap.getHallways());
    this.mBackground = new Background(this.kBackground);
    this.mForeground = new Background(this.kForeground);
    this.mEnemies = new EnemySet(this.mMap.getRooms(), this.kEnemySprite, this.kSpriteNormal);
    this.mBackgroundShadow = new ShadowReceiver(this.mBackground);
    this.mCollectibleSet = new CollectibleSet(this.mMap.getRooms(), this.kCollectibleSprite, this.mBackgroundShadow);
    this.mHelpViewManager = new HelpViewManager(this.mCollectibleSet, this.kCollectibleSprite, this.kZHolder, this.mPlayer);
    this.mMiniMapManager = new MiniMapManager(this.mPlayer, this.mCollectibleSet, this.kMiniHeroSprite, this.kCollectibleSprite, this.kMiniMapBackground);
    this.mHeroAmbush = false;
    this.mPassage1 = new PassageController(this.mPlayer, [-159,75,-124,73],[8,86,12,76] );
    this.mPassage2 = new PassageController(this.mPlayer, [-160,44,-150,38], [-160,20,-150,17]);
    mapInt.init(this.mPlayer, this.mMap.getRooms());
    
    gEngine.AudioClips.playBackgroundAudio(this.kBGAudio);


    for(var i = 0; i < this.mCollectibleSet.size(); i++){
        this.mBackground.getRenderable().addLight(this.mCollectibleSet.mSet[i].mLight);
    }
    
    this.mDirectionalLight = new DirectionalLight();
    this.mBackground.getRenderable().addLight(this.mPlayer.mFlashLight.mLight);
    this.mBackground.getRenderable().addLight(this.mDirectionalLight.mLight);     
    this.mEnemies.addLight(this.mPlayer.mFlashLight.mLight);
       
    for(var i = 0; i < this.mEnemies.size(); i++){
        this.mEnemies.mSet[i].getRenderable().addLight(this.mDirectionalLight.mLight);
        this.mEnemies.mSet[i].getXform().setZPos(1);
        this.mBackgroundShadow.addShadowCaster(this.mEnemies.mSet[i]);
    }
    for(var i = 0; i < this.mCollectibleSet.size(); i++){
        this.mCollectibleSet.mSet[i].getRenderable().addLight(this.mPlayer.mFlashLight.mLight);
        this.mCollectibleSet.mSet[i].getXform().setZPos(1);
        this.mBackgroundShadow.addShadowCaster(this.mCollectibleSet.mSet[i]);
    }
    
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eBackground, this.mMap);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eShadowReceiver, this.mBackgroundShadow);

    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mCollectibleSet);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mPlayer);
    
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eFront, this.mForeground);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eFront, this.mEnemies);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mMainView.setup();
    
    gEngine.DefaultResources.setGlobalAmbientColor([.9, .9, .9, 1]);
    gEngine.LayerManager.drawAllLayers(this.mMainView.getCam());
    
    gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1]);
    this.mHelpViewManager.draw();
    this.mMiniMapManager.draw();
};


// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {    
    this.mCollectibleSet.collectibleTouches(this.mPlayer);
    this.mCollectibleSet.update();    

    this.mPlayer.update();
    this.mHelpViewManager.update();
    this.mMiniMapManager.update();

    this.mEnemies.update(this.mPlayer);
    this.mBounds.update();

    this.mMainView.update(this.mPlayer);
    
    this.mPassage1.update();
    this.mPassage2.update();

    //TODO remove later. For debugging purposes.
    if (this.isGameLost()) {
        gEngine.GameLoop.stop();
    } else if(this.isGameWon())
    {
        gEngine.GameLoop.stop();
    }
    this.isWithinBedroom();
    this.updateHeroAmbush();
    
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.Left))
    {
        console.log(this.mPlayer.getXform().getPosition());
    }

};

// Check if the player has met win conditions
MyGame.prototype.isGameWon = function () {
    
    
    
    if (this.mHelpViewManager.allItemsCollected() &&
        this.isWithinBedroom()) {
        
        return true;
    } else {
        return false;
    }
};

// Check if the player has met win conditions
MyGame.prototype.isGameLost = function () {
    
    
    
    if (!this.mHelpViewManager.isTimeLeft()) {
        
        return true;
    } else {
        return false;
    }
};

// Check if the player is in the correct room
MyGame.prototype.isWithinBedroom = function () {
    if (this.mPlayer.getBBox().intersectsBound(this.mMap.getBedBBox())) {// 504 , 278
        return true;
    } else {
        return false;
    }
};

MyGame.prototype.updateHeroAmbush = function () {
    var pos = this.mPlayer.getXform().getPosition();
    var playerNearby = this.mCollectibleSet.isPlayerNearby(pos);
    if(!this.mHeroAmbush && playerNearby)
    {
        this.mEnemies.transitionToChase(this.mPlayer, true);
        this.mHeroAmbush = true;
    }
    else if(this.mHeroAmbush && !playerNearby)
    {
        this.mEnemies.transitionToChase(this.mPlayer, false);
        this.mHeroAmbush = false;
    }
};