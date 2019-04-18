/*
 * File:        MainGame.js
 * Programmers: Kyla            March 13, 2019
 *              Emily           March 2, 2019
 *
 */

/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectSet, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject, Storm, StormSet, Rock, RockSet, Light, LightSet */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MainGame(mode) {
    this.mAmbientLight = null;
    this.mGlobalLightSet = null;
    
    this.kMaxBrightness = 3;
    this.kMinBrightness = 1.25;

    this.kDarkestTime =  3 * 60 * 60; // 3 minutes 
    if (mode === "easy")
        this.kDarkestTime = 10 * 60 * 60; // 10 minutes
    else if (mode === "hard")
        this.kDarkestTime = 10 * 60; // 10 seconds
    
    this.kSpawnRate = 240;
    if (mode === "easy")
        this.kSpawnRate = 480;
    else if (mode === "hard")
        this.kSpawnRate = 120;
    
    this.kRegenRate = 10;
    if (mode === "easy")
        this.kRegenRate = 20;
    else if (mode === "hard")
        this.kRegenRate = 0;
    
    this.kCharybdisSpawnChance = 100000;
    if (mode === "easy")
        this.kCharybdisSpawnChance = 1000000;
    else if (mode === "hard")
        this.kCharybdisSpawnChance = 50000;
    
    this.kBGMusic = "assets/Sounds/GameBackground.mp3";
    if (mode === "hard")
        this.kBGMusic = "assets/Sounds/HardMode.mp3";
    
    this.kCharybdisMusic = "assets/Sounds/Charybdis.mp3";
    this.kTreasureSFX = "assets/Sounds/TreasurePickUp.mp3";
    
    this.kPlaceHolder = "assets/PlaceHolder.png";
    this.kShipTex = "assets/Ships.png";
    this.kShipLowResTex = "assets/Ships128.png";
    this.kWakeTex = "assets/Wake.png";
    this.kChickenTex = "assets/ChickenFromAbove.png";
    this.kCharybdisTex = "assets/Charybdis.png";
    this.kAngryAnim = "assets/AngrySkullSpriteSheet.png";
    this.kOceanNormal = "assets/OceanNormal.png";
    this.kOcean = "assets/Ocean.png";
    this.kWaterfallTex = "assets/Waterfall.png";
    this.kSpaceTex = "assets/Space.png";
    this.kHealthBar = "assets/UI/healthbar.png";
    this.kHealthBarBorder = "assets/HealthBarBorder.png";
    
    this.kStormTex = "assets/Storm.png";
    this.kRocksTex = "assets/Rocks.png";
    this.kGemTex = "assets/Gems.png";
    this.kMiniMapBG = "assets/Minimap_Bg.png";
    this.kMiniMapMarker = "assets/MiniMapMarker.png";
    this.kMiniMapTreasure = "assets/MiniMapTreasure.png";
    this.kMiniMapStorm = "assets/MiniMapStorm.png";
    this.kMiniMapBoss = "assets/MiniMapCharybdis.png";
    this.kUIBG = "assets/UI_BG.png";
    this.kTreasureTex = "assets/Diamond.png";
    
    this.kSpawnPosFile = "assets/JSON/SpawnPositions.json";
    
    this.kDeathMessage = "Your ship has exploded";
    this.mDMX = -25;
    
    // The camera to view the scene
    this.mCamera = null;
    this.mMiniMap = null;
    this.mUIBG = null;
    this.mMiniMapBG = null;
    this.mMiniMapXOffset = 74.375;
    this.mMiniMapYOffset = 55.625;
    
    this.mWorldBounds = [-300, 300, -300, 300];
    this.mWorldWCxRange = this.mWorldBounds[1]-this.mWorldBounds[0];
    this.mWorldWCyRange = this.mWorldBounds[3]-this.mWorldBounds[2];
    
    this.mBG = null;
    this.mWaterfallSet = null;
    this.mSpaceBG = null;
    this.mHero = null;
    this.mPirateSet = null;
    this.mCharybdis = null;
    
    this.mSpawnPosSet = [];
    this.mTreasureSet = null;
    
    this.mRockSet = null;
    this.mStormSet = null;
    
    this.mHealthBar = null;
    this.mHealthBarBorder = null;
    this.mTreasureUI = null;
    
    this.mGameState = null;
    
    this.mElapsedTime = 0;
}
gEngine.Core.inheritPrototype(MainGame, Scene);

MainGame.prototype.loadScene = function ()
{
    gEngine.Textures.loadTexture(this.kPlaceHolder);
    gEngine.Textures.loadTexture(this.kShipTex);
    gEngine.Textures.loadTexture(this.kShipLowResTex);
    gEngine.Textures.loadTexture(this.kWakeTex);
    gEngine.Textures.loadTexture(this.kChickenTex);
    gEngine.Textures.loadTexture(this.kCharybdisTex);
    gEngine.Textures.loadTexture(this.kAngryAnim);
    gEngine.Textures.loadTexture(this.kOcean);
    gEngine.Textures.loadTexture(this.kWaterfallTex);
    gEngine.Textures.loadTexture(this.kOceanNormal);
    gEngine.Textures.loadTexture(this.kSpaceTex);
    gEngine.Textures.loadTexture(this.kHealthBar);
    gEngine.Textures.loadTexture(this.kHealthBarBorder);
    
    gEngine.Textures.loadTexture(this.kStormTex);
    gEngine.Textures.loadTexture(this.kRocksTex);
    gEngine.Textures.loadTexture(this.kGemTex);
    gEngine.Textures.loadTexture(this.kMiniMapBG);
    gEngine.Textures.loadTexture(this.kMiniMapMarker);
    gEngine.Textures.loadTexture(this.kMiniMapTreasure);
    gEngine.Textures.loadTexture(this.kMiniMapStorm);
    gEngine.Textures.loadTexture(this.kMiniMapBoss);
    gEngine.Textures.loadTexture(this.kUIBG);
    gEngine.Textures.loadTexture(this.kTreasureTex);
    
    gEngine.AudioClips.loadAudio(this.kBGMusic);
    gEngine.AudioClips.loadAudio(this.kCharybdisMusic);
    gEngine.AudioClips.loadAudio(this.kTreasureSFX);
    
    gEngine.TextFileLoader.loadTextFile(this.kSpawnPosFile, gEngine.TextFileLoader.eTextFileType.eJSONFile);
};

MainGame.prototype.unloadScene = function ()
{
    gEngine.Textures.unloadTexture(this.kPlaceHolder);
    gEngine.Textures.unloadTexture(this.kShipTex);
    gEngine.Textures.unloadTexture(this.kShipLowResTex);
    gEngine.Textures.unloadTexture(this.kWakeTex);
    gEngine.Textures.unloadTexture(this.kChickenTex);
    gEngine.Textures.unloadTexture(this.kCharybdisTex);
    gEngine.Textures.unloadTexture(this.kAngryAnim);
    gEngine.Textures.unloadTexture(this.kOcean);
    gEngine.Textures.unloadTexture(this.kWaterfallTex);
    gEngine.Textures.unloadTexture(this.kOceanNormal);
    gEngine.Textures.unloadTexture(this.kSpaceTex);
    gEngine.Textures.unloadTexture(this.kHealthBar);
    gEngine.Textures.unloadTexture(this.kHealthBarBorder);
    
    gEngine.Textures.unloadTexture(this.kStormTex);
    gEngine.Textures.unloadTexture(this.kRocksTex);
    gEngine.Textures.unloadTexture(this.kGemTex);
    gEngine.Textures.unloadTexture(this.kMiniMapBG);
    gEngine.Textures.unloadTexture(this.kMiniMapMarker);
    gEngine.Textures.unloadTexture(this.kMiniMapTreasure);
    gEngine.Textures.unloadTexture(this.kMiniMapStorm);
    gEngine.Textures.unloadTexture(this.kMiniMapBoss);
    gEngine.Textures.unloadTexture(this.kUIBG);
    gEngine.Textures.unloadTexture(this.kTreasureTex);
    
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.kBGMusic);
    gEngine.AudioClips.unloadAudio(this.kCharybdisMusic);
    gEngine.AudioClips.unloadAudio(this.kTreasureSFX);
    
    gEngine.ResourceMap.unloadAsset(this.kSpawnPosFile);

    //Check whether the player won or lost the game
    var nextLevel = null;
    if(this.mGameState.isGameWin()) 
    {
        nextLevel = new WinScreen();
    } else {
        nextLevel = new GameOver(this.kDeathMessage, this.mDMX);
    }
    gEngine.Core.startScene(nextLevel);
};

MainGame.prototype.initialize = function ()
{
    gEngine.AudioClips.playBackgroundAudio(this.kBGMusic);
    //gEngine.DefaultResources.setGlobalAmbientIntensity(this.kMaxBrightness);
    
    var jsonParser = new JSONParser(this.kSpawnPosFile);
    jsonParser.parsePosition(this.mSpawnPosSet);
    
    this.mHero = new PlayerShip(this.kShipTex, this.kMiniMapMarker, this.kShipLowResTex, this.kWakeTex, this.kAngryAnim);
    this.mPirateSet = new PirateShipSet(this.mWorldBounds, [this.kShipTex, this.kMiniMapMarker, this.kShipLowResTex, this.kWakeTex, this.kChickenTex, this.kAngryAnim]);
    this.mPirateSet.setSpawnRate(this.kSpawnRate);
    
    this._initializeLights();
    
    // Set up the main camera
    this.mCamera = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        100,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0, 0.79, 1, 1]);
    this.mCamera.configInterpolation(0, 1);
    
    // Create the minimap
    this.mMiniMap = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        200,                     // width of camera
        [605, 452.5, 180, 135]         // viewport (orgX, orgY, width, height)
    );
    this.mMiniMap.setBackgroundColor([0.8, 0.8, 0.8, 1.0]);
    this.mMiniMap.configInterpolation(0, 1);
    this.mMiniMap.setBGDraw(false);
    
    var uvs = [(207/2048), (1855/2048), 0, 1];
    this.mMiniMapBG = new UISprite(this.kMiniMapBG, [695, 520], [200, 150], uvs);
    uvs = [(6/2048), (2026/2048), 0, 1];
    this.mUIBG = new UISprite(this.kUIBG, [130, 550], [250, 100], uvs);
    
    // Create the ocean background
    this.mBG = new IllumRenderable(this.kOcean, this.kOceanNormal);
    this.mBG.setElementPixelPositions(0, 4096, 0, 4096);
    this.mBG.getXform().setPosition(0, 0);
    this.mBG.getXform().setSize(this.mWorldWCxRange, this.mWorldWCyRange);

    for (var i = 0; i < this.mGlobalLightSet.numLights(); i++) {
        this.mBG.addLight(this.mGlobalLightSet.getLightAt(i));   // all the lights
    }
    
    this.mWaterfallSet = new WaterfallSet(this.kWaterfallTex);
    this.mWaterfallSet.createWaterfalls();
    
    this.mSpaceBG = new SpriteRenderable(this.kSpaceTex);
    this.mSpaceBG.setElementPixelPositions(0, 2048, 0, 2048);
    this.mSpaceBG.getXform().setPosition(0, 0);
    this.mSpaceBG.getXform().setSize(100, 100);
    
    this.mStormSet = new StormSet(this.kStormTex, this.kMiniMapMarker, this.mWorldWCxRange, this.mWorldWCyRange,
                                                    this.mHero);

    this.mCharybdis = new Charybdis(this.kCharybdisTex, this.kMiniMapBoss, 0, 75);
    this.mStormSet.addToSet(this.mCharybdis);

    // Spawn the rocks
    this.mRockSet = new RockSet(this.kRocksTex, this.kMiniMapMarker, this.mSpawnPosSet);
    this.mGameState = new GameState(this.mHero);
    
    // Spawn the treasure
    this.mTreasureSet = new SunkenTreasureSet(this.kTreasureTex, this.kMiniMapTreasure, this.mSpawnPosSet);
    
    this.mHealthBarBorder = new UISprite(this.kHealthBarBorder, [125, 575], [205, 25], [0, 1, 0, 1]);
    this.mHealthBar = new UIHealthBar(this.kHealthBar, [125, 575], [200, 20], 0);
    
    this.mTreasureUI = new UIItemSlotSet([30, 535]);
    for(var i = 0; i < this.mTreasureSet.size(); i++)
    {
        this.mTreasureUI.addToSet(this.kGemTex, [30, 30], [0, 0.5, 0, 1], [0.5, 1, 0, 1]);
    }
    
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MainGame.prototype.draw = function ()
{
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    //Draw for the main camera
    this.mCamera.setupViewProjection();
    this.mSpaceBG.draw(this.mCamera);
    this.mBG.draw(this.mCamera);
    this.mWaterfallSet.draw(this.mCamera);
    this.mPirateSet.draw(this.mCamera);
    this.mTreasureSet.draw(this.mCamera);
    this.mHero.draw(this.mCamera);
    
    this.mRockSet.draw(this.mCamera);
    
    this.mCharybdis.draw(this.mCamera);
    this.mStormSet.draw(this.mCamera);
    
    this.mUIBG.draw(this.mCamera);
    this.mHealthBarBorder.draw(this.mCamera);
    this.mHealthBar.draw(this.mCamera);
    this.mTreasureUI.draw(this.mCamera);
    this.mMiniMapBG.draw(this.mCamera);
    
    //Draw for the minimap
    this.mMiniMap.setupViewProjection();
    
    this.mPirateSet.drawForMap(this.mMiniMap);
    this.mTreasureSet.drawForMap(this.mMiniMap);
    this.mHero.drawForMap(this.mMiniMap);
    this.mRockSet.drawForMap(this.mMiniMap);
    this.mStormSet.drawForMap(this.mMiniMap);
    
};

