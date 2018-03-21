/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
  GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
    this.kPlatformGreenSprite = "assets/PlatformSprite_Green.png";
    this.kBgBlueLandBG = "assets/blue_land.png";
    this.kBgGreenLandBG = "assets/green_land.png";
    this.kspritesheet_tiles = "assets/spritesheet_tiles.png";
    this.kspritesheet_hud = "assets/spritesheet_hud.png";
    this.kspritesheet_hero = "assets/HeroAnimation.png";
    this.kspritesheet_torch = "assets/Torch.png";
    this.kspritesheet_castleBG = "assets/bg_castle.png";
    this.kSpriteSheetEnemy = "assets/EnemyAnimation.png";
    this.kAudioSource = "assets/Audio/happy_adveture.mp3";
    
    this.kLayerPos = [];
    
    // The camera to view the scene
    this.mCamera = null;
    this.mMiniMap = null;
    this.mBg = null;
    this.mMiniMapBg = null;
    
    
    this.mAllPlatforms = null;
    this.mHUDManager = null;
    this.mBats = null;
    this.mBlobs = null;
    this.mTextures = null;
    this.mBackGrouds = null;

    
    this.mPlatformFactory = null;
    this.mHero = null;
    
    this.mHeroHasKey = false;
    this.mKey = null;
    

    this.kGameWorldWidth = 1600;
    
    this.mItemLight = null;
    
    this.mTorchSet = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kPlatformGreenSprite);
    gEngine.Textures.loadTexture(this.kBgBlueLandBG);
    gEngine.Textures.loadTexture(this.kBgGreenLandBG);
    gEngine.Textures.loadTexture(this.kspritesheet_tiles);
    gEngine.Textures.loadTexture(this.kspritesheet_hud);
    gEngine.Textures.loadTexture(this.kspritesheet_hero);
    gEngine.Textures.loadTexture(this.kspritesheet_torch);
    gEngine.Textures.loadTexture(this.kspritesheet_castleBG);
    gEngine.Textures.loadTexture(this.kSpriteSheetEnemy);
    gEngine.AudioClips.loadAudio(this.kAudioSource);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kPlatformGreenSprite);
    gEngine.Textures.unloadTexture(this.kBgBlueLandBG);
    gEngine.Textures.unloadTexture(this.kBgGreenLandBG);
    gEngine.Textures.unloadTexture(this.kspritesheet_tiles);
    gEngine.Textures.unloadTexture(this.kspritesheet_hud);
    gEngine.Textures.unloadTexture(this.kspritesheet_hero);
    gEngine.Textures.unloadTexture(this.kspritesheet_torch);
    gEngine.Textures.unloadTexture(this.kspritesheet_castleBG); 
    gEngine.Textures.unloadTexture(this.kSpriteSheetEnemy); 
    gEngine.AudioClips.stopBackgroundAudio();
    
    this.mAllPlatforms.removeAll();
    this.mBats.removeAll();
    this.mBlobs.removeAll();
    this.mTextures.removeAll();
    this.mBackGrouds.removeAll();
    this.mTorchSet.removeAll();
    
     if(this.mHUDManager.getLifeCounter().getNumber() <= 0){
        this.GameLost();

    }
    
    if(this.mHero.getXform().getXPos() < 20 && this.mHeroHasKey){
        this.GameWon();

    }    
};

MyGame.prototype.initialize = function () { 
    

     gEngine.AudioClips.playBackgroundAudio(this.kAudioSource);
     
    //create game object sets
    this.mAllPlatforms = new GameObjectSet();
    this.mTextures = new GameObjectSet();
    this.mBackGrouds = new GameObjectSet();
    this.mBats = new GameObjectSet();
    this.mBlobs = new GameObjectSet();
    
    this.mItemLight = this._createALight(Light.eLightType.eDirectionalLight,
            [0, 0, 0],     // position
            [0, -1, 0],    // Direction 
            [1, 1, 1, 1],  // some color
            0, 1200,       // near and far distances
            0, 0,          // inner and outer cones
            .5,            // intensity
            1              // drop off
            );
 
//Define SpriteSheets-----------------------------------------------------------
    var assetMap = {};
    var key;
    
    key = 'greenPlatforms';
    assetMap[key] = this.kPlatformGreenSprite;    
    
    key = 'objects';
    assetMap[key] = this.kspritesheet_tiles;
    
 // CreateManagers--------------------------------------------------------------   
    
    this.mPlatformFactory = new PlatformFactory(assetMap,this.mAllPlatforms,
                                                this.mTextures, this.mItemLight);
    this.mHUDManager = new HUDManager(this.kspritesheet_hud,this.kspritesheet_tiles, this.mItemLight);

//  Create Cameras--------------------------------------------------------------
    var mainCamH = 600;
    var mainCamW = 800;
    this.mCamera = new Camera(
        vec2.fromValues(80, 60), 
        160,                       
        [0, 0, mainCamW, mainCamH]           
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    var miniMapH = mainCamH/2;
    var miniMapW = mainCamW;
    
    var LLX = 0;
    var LLY = mainCamH/2 - miniMapH/2;
            
    this.mMiniMap = new Camera(
        vec2.fromValues(80, 60), 
        this.kGameWorldWidth,                     
        [LLX, LLY, miniMapW, miniMapH]   
    );
    var col = 51/255;
    this.mCamera.setBackgroundColor([col, col, col, 1]);
    
    this.mMiniMapBg = new Renderable();
    this.mMiniMapBg.setColor([0,0,0,1]);
    var mapXform = this.mMiniMapBg.getXform();
    mapXform.setPosition(80,60);
    mapXform.setSize(this.mCamera.getWCWidth(),this.mCamera.getWCHeight()/2 + 1);
    
 
 //set up Lights----------------------------------------------------------------
    gEngine.DefaultResources.setGlobalAmbientIntensity(1);

 //initialize game world--------------------------------------------------------

    this.mBg = new LightRenderable(this.kBgGreenLandBG);
    var BgXform = this.mBg.getXform();
    BgXform.setPosition(80,60);
    BgXform.setSize(160,120);
    
    this.mHero = new Hero(this.kspritesheet_hero, this.mItemLight);
    this.mHero.setLifeCounter(this.mHUDManager.getLifeCounter());
    this.mHero.setPowerCounter(this.mHUDManager.getPowerCounter());
    this.mHero.registerhasKey(false);
    this.mTorchSet = new GameObjectSet();
    
    var offset = 0;
    this.LevelBlock1(offset);//begining this one must be first
    offset += 160;
    this.LevelBlock2(offset); //large amount of spikes
    offset += 160;
    this.LevelBlock3(offset); //randomized box placement
    offset += 160; 
    this.LevelBlock3(offset); //randomized box placement
    offset += 160; 
    this.LevelBlock2(offset); //large amount of spikes
    offset += 160;
    this.LevelBlock3(offset); //randomized box placement
    offset += 160;         
    this.LevelBlock4(offset); //little bit of a maze
    
    //directional light
    // light just the outdoors
    var l2 = this._createALight(Light.eLightType.eDirectionalLight,
            [1140, 60, 0],         // position
            [-1, 0, 0],          // Direction 
            [1, 1, 1, 1],  // some color
            0, 1200,               // near and far distances
            0, 0,            // inner and outer cones
                    .5,                   // intensity
                            1                  // drop off
            );
    
    var i = 0;
    for(i = 0; i < this.mBackGrouds.size(); i++){
        this.mBackGrouds.getObjectAt(i).addLight(l2);
    }
    
    this.mHero.getRenderable().addLight(l2);
    this.mBlobs.addLight(l2);
    this.mBats.addLight(l2);
    this.mAllPlatforms.addLight(l2);
    this.mTextures.addLight(l2);
    
    offset += 160; 
    this.LevelBlock10(offset); //entrace to castle
    offset += 160;
    this.LevelBlock8(offset); //empty except for spike platform in the middle
    offset += 160;
    this.LevelBlock7(offset); //empty with L platform
    offset += 160;
    this.LevelBlock8(offset); //empty except for spike platform in the middle
    offset += 160;    
    this.LevelBlock9(offset); //final level block with key
   
    this.initAllTorches();
    
    
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    this._drawGameWorld(this.mCamera);
    this.mHUDManager.draw(this.mCamera);
    //draw the minimap if the user pressed M 
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.M)) {
        
        var mapXform = this.mMiniMapBg.getXform();
        mapXform.setPosition(this.mCamera.getWCCenter()[0],this.mCamera.getWCCenter()[1]);
        this.mMiniMapBg.draw(this.mCamera);
        this.mMiniMap.setupViewProjection();
        this._drawGameWorld(this.mMiniMap);
    }
};

MyGame.prototype._drawGameWorld = function (aCamera) {
    this.mBackGrouds.draw(aCamera);
    
    this.mAllPlatforms.draw(aCamera);
    this.mTextures.draw(aCamera);
    this.mBats.draw(aCamera);
    this.mBlobs.draw(aCamera);
    this.mHero.draw(aCamera);
   
    this.mTorchSet.draw(aCamera);
    if(this.mKey !== null) {this.mKey.draw(aCamera);}
};

MyGame.prototype.GameLost = function () {
        gEngine.GameLoop.stop();
        var deathScreen = new DeathScreen();       
        gEngine.Core.startScene(deathScreen);
};

MyGame.prototype.GameWon = function () {
        gEngine.GameLoop.stop();
        var winScreen = new WinScreen(); 
        gEngine.Core.startScene(winScreen);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    
    if(this.mKey !== null){
        var heroBB = this.mHero.getBBox();
        var keyBB = this.mKey.getBBox();
    
        if(heroBB.intersectsBound(keyBB)){

            var h =[];
            if(this.mKey.pixelTouches(this.mHero,h)){

                this.mHeroHasKey = true;
                this.mHUDManager.heroHasKey();
                this.mKey.hide(); 
                this.mHero.registerhasKey(true);
                //this.onKeyGetEvent();
            }

        }
    }
    
    
    this.mAllPlatforms.updateWithREF(this.mHero);
    this.mHero.update(this.mAllPlatforms,this.mBlobs, this.mBats);
    this.mHUDManager.update(this.mCamera,0,0);
    this.mBats.update();
    this.mBlobs.update();
    this.mTorchSet.update();
    

    
     if(this.mHUDManager.getLifeCounter().getNumber() <= 0){
        gEngine.GameLoop.stop();

    }
    
    if(this.mHero.getXform().getXPos() < 20 && this.mHeroHasKey){
        gEngine.GameLoop.stop();

    }   
    //var x = this.mHero.getPhysicsComponent().getXform().getXPos();
    
    if(this.mHero.getXform().getYPos() < 0){
        this.mHero.handleEnemyCollision();
    }
    
    var x = this.mHero.getXform().getXPos();
    this.mCamera.panTo(x,60);  
    this.mCamera.update();
    
    
    this._physicsSimulation();
    
     
    //this.mCamera.clampAtBoundary(this.mHero.getPhysicsComponent().getXform(), 1);
    
    //this.mCamera.panWith(this.mHero.getPhysicsComponent().getXform(), 0.3 );
    //var y = this.mHero.getPhysicsComponent().getXform().getYPos();
//
//     if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Right)) {
//        this.mHero.getXform().setPosition(1800, this.mHero.getXform().getYPos());
//    }
//    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Left)) {
//        this.mHero.getXform().setPosition(this.mHero.getXform().getXPos() - 100, this.mHero.getXform().getYPos());
//    }
//    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)) {
//        this.mHero.getXform().setPosition(this.mHero.getXform().getXPos(), this.mHero.getXform().getYPos()+50);
//    }
};

MyGame.prototype.onKeyGetEvent = function() {
   // reset all the enemies
   var i = 0;
   for(i = 0; i < this.mBlobs.size(); i++) {
       this.mBlobs.getObjectAt(i).reset();
   }
   
   var j = 0;
   for(j = 0; j < this.mBats.size(); j++ ){
       this.mBats.getObjectAt(j).reset();
   }
};