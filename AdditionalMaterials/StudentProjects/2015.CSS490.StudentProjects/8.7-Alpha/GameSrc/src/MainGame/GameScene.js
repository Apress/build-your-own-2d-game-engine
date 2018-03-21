/*
 * Team 7-Alpha
 * CSS 490C
 * 2D Game Engine Design
 * File: GameScene.js 
 * 
 * This is the main logic of our game. 
 * 
 */

"use strict";

// We create a global variables to store our particles
// The particles need to live past the lifetime of the projectiles
var gAllParticles;

GameScene.eGameSceneStates = Object.freeze({
    eGameInProgress: 0,
    eGameOverStage1: 1,
    eGameOverStage2: 2
});

GameScene.eGameDifficultyStates = Object.freeze({
    eGameLevel0: 0,
    eGameLevel1: 1,
    eGameLevel2: 2,
    eGameLevel3: 3
});

function GameScene(highScoreList) {
    this.kBg = "assets/stars.png";

    this.kRocketSound1 = "assets/sounds/politeRocket1.wav";
    this.kRocketSound2 = "assets/sounds/politeRocket2.wav";
    this.kRocketSound3 = "assets/sounds/politeRocket3.wav";
    this.kExplosionSound = "assets/sounds/explosion.wav";
    this.kAsteroidDeath = "assets/sounds/asteroidDeath.wav";
    this.kAsteroidHit = "assets/sounds/asteroidHit.wav";
    this.kPowerUpSound = "assets/sounds/powerup.wav";
    this.kGameOver = "assets/sounds/gameOver.wav";
    this.kShipHurt = "assets/sounds/shipHurt.wav";
    this.kScanMode = "assets/sounds/scanMode.wav";
    this.kCollectOre = "assets/sounds/collectOre.wav";
    this.kInterfaceGraphics = "assets/interfaceGraphics1.png";
    this.kExplosionImage = "assets/explosion.png";
    this.kHomingRocket = "assets/homingRocket.png";
    this.kHomingNormal = "assets/homingNormal.png";
    this.kExplosiveRocket = "assets/explosiveRocket.png";
    this.kExplosiveNormal = "assets/explosiveNormal.png";
    this.kNormalRocket = "assets/normalRocket.png";
    this.kNormalNormal = "assets/normalNormal.png";
    this.kAsteroid = "assets/asteroidsSmall2.png";
    this.kAsteroidNormal = "assets/asteroidsSmall2Normal.png";
    this.kShip = "assets/ship.png";
    this.kShipNormal = "assets/shipNormal.png";
    this.kOre = "assets/ore.png";
    this.kOreNormal = "assets/oreNormal.png";
    this.kGameSong = "assets/sounds/gameSong.mp3";
    this.kAttackCooldown = 20;
    this.mCooldownTick = 0;
    this.kTicksPerSecond = 60;
    this.kEnergyLostPerSecondInScanMode = 20;
    this.kEnergyRegen = 10;
    this.mGameState = GameScene.eGameSceneStates.eGameInProgress;
    this.mDifficultyState = GameScene.eGameDifficultyStates.eGameLevel0;
    
    // number to store the current score
    this.mTimeScore = null;
    this.mOreScore = null;
    this.mGameScore = null;
    this.mHighScoreList = [];
    if (highScoreList !== null) {
        this.mHighScoreList = highScoreList;
    }
    
    // boolean scan mode toggle
    this.mScanModeActivated = false;
    
    this.mTick = null;
    this.mLightTick = 0;
    
    // The camera to view the scene
    this.mCamera = null;
    this.mStatusCamera = null;
    
    // Game objects
    this.mShip = null;
    this.mAsteroidList = null;  // list of all the "field objects" in the scene
    this.mRocketList = null;    // list of all the projectiles fired from the ship
    
    // Status screen objects
    this.mShieldBar = null;
    this.mEnergyBar = null;
    this.mPowerUpStatus = null;
    this.mStatusBg = null;
    this.mBg = null;
    
    // The lights
    this.mGlobalLightSet = null; 
    this.mLightStatus = true;
    this.mHeadLight = null;
    
    this.mMsg = null;
    this.mScoreMsg = null;
    
    this.mExplosion = null;
    
    // Create a new particle set that does not survive past
    // scene changes
    gAllParticles = new ParticleGameObjectSet()
}
gEngine.Core.inheritPrototype(GameScene, Scene);

GameScene.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kInterfaceGraphics);
    gEngine.Textures.loadTexture(this.kExplosionImage);
    gEngine.Textures.loadTexture(this.kNormalRocket);
    gEngine.Textures.loadTexture(this.kNormalNormal);
    gEngine.Textures.loadTexture(this.kExplosiveRocket);
    gEngine.Textures.loadTexture(this.kExplosiveNormal);
    gEngine.Textures.loadTexture(this.kHomingRocket);
    gEngine.Textures.loadTexture(this.kHomingNormal);
    gEngine.Textures.loadTexture(this.kShip);
    gEngine.Textures.loadTexture(this.kShipNormal);
    gEngine.Textures.loadTexture(this.kAsteroid);
    gEngine.Textures.loadTexture(this.kAsteroidNormal);
    gEngine.Textures.loadTexture(this.kOre);
    gEngine.Textures.loadTexture(this.kOreNormal);

    gEngine.AudioClips.loadAudio(this.kExplosionSound);
    gEngine.AudioClips.loadAudio(this.kRocketSound1);
    gEngine.AudioClips.loadAudio(this.kRocketSound2);
    gEngine.AudioClips.loadAudio(this.kRocketSound3);
    gEngine.AudioClips.loadAudio(this.kAsteroidDeath);
    gEngine.AudioClips.loadAudio(this.kAsteroidHit);
    gEngine.AudioClips.loadAudio(this.kPowerUpSound);
    gEngine.AudioClips.loadAudio(this.kGameOver);
    gEngine.AudioClips.loadAudio(this.kShipHurt);
    gEngine.AudioClips.loadAudio(this.kScanMode);
    gEngine.AudioClips.loadAudio(this.kCollectOre);
    gEngine.AudioClips.loadAudio(this.kGameSong);
};

GameScene.prototype.unloadScene = function () {
    gEngine.AudioClips.playACue(this.kGameOver);
    
    gEngine.LayerManager.cleanUp();
    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kInterfaceGraphics);
    gEngine.Textures.unloadTexture(this.kExplosionImage);
    gEngine.Textures.unloadTexture(this.kNormalRocket);
    gEngine.Textures.unloadTexture(this.kExplosiveRocket);
    gEngine.Textures.unloadTexture(this.kHomingRocket);
    gEngine.Textures.unloadTexture(this.kShip);
    gEngine.Textures.unloadTexture(this.kShipNormal);
    gEngine.Textures.unloadTexture(this.kNormalNormal);
    gEngine.Textures.unloadTexture(this.kExplosiveNormal);
    gEngine.Textures.unloadTexture(this.kHomingNormal);
    gEngine.Textures.unloadTexture(this.kAsteroid);
    gEngine.Textures.unloadTexture(this.kAsteroidNormal);
    gEngine.Textures.unloadTexture(this.kOre);
    gEngine.Textures.unloadTexture(this.kOreNormal);
    
    gEngine.AudioClips.unloadAudio(this.kExplosionSound);
    gEngine.AudioClips.unloadAudio(this.kRocketSound1);
    gEngine.AudioClips.unloadAudio(this.kRocketSound2);
    gEngine.AudioClips.unloadAudio(this.kRocketSound3);
    gEngine.AudioClips.unloadAudio(this.kAsteroidDeath);
    gEngine.AudioClips.unloadAudio(this.kAsteroidHit);
    gEngine.AudioClips.unloadAudio(this.kPowerUpSound);
    gEngine.AudioClips.unloadAudio(this.kGameOver);
    gEngine.AudioClips.unloadAudio(this.kShipHurt);
    gEngine.AudioClips.unloadAudio(this.kScanMode);
    gEngine.AudioClips.unloadAudio(this.kCollectOre);
    gEngine.AudioClips.unloadAudio(this.kGameSong);
    
    
    
    var nextLevel = new ClosingScene(this.mGameScore, this.mHighScoreList);  // the next level
    gEngine.Core.startScene(nextLevel);
};

GameScene.prototype.initialize = function () {
    
    this.mCamera = new Camera(
        vec2.fromValues(50, 50),    // position of the camera
        100,                        // width of camera
        [0, 0, 720, 720]            // viewport (orgX, orgY, width, height)
    );
    
    this.mStatusCamera = new Camera(
        vec2.fromValues(50, 120),    // position of the camera
        100,                         // width of camera
        [720, 0, 300, 720]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.0, 0.0, 0.0, 1]);
    this.mStatusCamera.setBackgroundColor([0, 0, 0, 1]);
    
    // Step A: the music
    gEngine.AudioClips.playBackgroundAudio(this.kGameSong);
    
    // Step B: the lights
    gGameLights.initialize();
    this.mHeadLight = gGameLights.getHeadLight();
    
    // Step C: the far Background
    var bgR = new LightRenderable(this.kBg);
    bgR.setElementPixelPositions(0, 1024, 0, 1024);
    bgR.getXform().setSize(30, 30);
    bgR.getXform().setPosition(0, 0);
    bgR.getXform().setZPos(-10);
    bgR.addLight(gGameLights.lightAtIndex(3));   // add the point light
    bgR.addLight(gGameLights.getDirectionalLight());   // add the directional light
    bgR.addLight(this.mHeadLight);   // add the spot light
    this.mBg = new ParallaxGameObject(bgR, 5, this.mCamera);
    this.mBg.setCurrentFrontDir([0, -1, 0]);
    this.mBg.setSpeed(0.1);
    
    
    // initialize game objects
    this.mShip = new MiningShip(50, 10);
    this.mAsteroidList = new FieldObjectList();
    this.mRocketList = new ProjectileList(this.mShip);
    
    // initialize status objects
    this.mShieldBar = new ShieldBar(this.mShip);
    this.mEnergyBar = new EnergyBar(this.mShip);
    this.mPowerUpStatus = new PowerUpStatus(this.mShip);
    // status background
    this.mStatusBg = new SpriteRenderable(this.kInterfaceGraphics);
    this.mStatusBg.setElementPixelPositions(1715, 2048, (1024-820), (1024-24));
    this.mStatusBg.setColor([0, 0, 0, 0]);
    this.mStatusBg.getXform().setPosition(50, 120);
    this.mStatusBg.getXform().setSize(100, 240);
    
    this.mMsg = new FontRenderable("Status Message");
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.getXform().setPosition(6, 10);
    this.mMsg.setTextHeight(6);
    
    this.mScoreMsg = new FontRenderable("Score");
    this.mScoreMsg.setColor([1, 1, 1, 1]);
    this.mScoreMsg.getXform().setPosition(6, 20);
    this.mScoreMsg.setTextHeight(6);
    
    
    this.mGameScore = 0;
    this.tick = 0;
};

GameScene.prototype.draw = function () {
    // Step A: clear the canvas
    // This controls the ambient lighting for the entire system
    gEngine.DefaultResources.setGlobalAmbientIntensity(1);
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    // main game camera
    this.mCamera.setupViewProjection();
    this.mBg.draw(this.mCamera);
    gAllParticles.draw(this.mCamera);
    this.mAsteroidList.draw(this.mCamera);
    this.mRocketList.draw(this.mCamera);
    this.mShip.draw(this.mCamera);
    
    // status camera
    gEngine.DefaultResources.setGlobalAmbientIntensity(2);
    this.mStatusCamera.setupViewProjection();
    this.mStatusBg.draw(this.mStatusCamera);
    this.mShieldBar.draw(this.mStatusCamera);
    this.mEnergyBar.draw(this.mStatusCamera);
    this.mScoreMsg.draw(this.mStatusCamera);
    this.mMsg.draw(this.mStatusCamera);
    gEngine.DefaultResources.setGlobalAmbientIntensity(0);
    this.mPowerUpStatus.draw(this.mStatusCamera);
};

GameScene.prototype.update = function () {

    switch(this.mGameState) {
        case GameScene.eGameSceneStates.eGameInProgress:
            this.updateInProgress();
            break
        case GameScene.eGameSceneStates.eGameOverStage1:
            this.updateGameOverStage1();
            break
        case GameScene.eGameSceneStates.eGameOverStage2:
            this.updateGameOverStage2();
            break
    }
};
