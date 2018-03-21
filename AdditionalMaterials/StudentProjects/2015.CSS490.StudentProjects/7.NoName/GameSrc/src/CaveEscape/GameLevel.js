/*
 * File: GameLevel.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, Hero, Camera, SceneFileParser, FontRenderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var globalLightSet = null;

GameLevel.eState = Object.freeze({
    eStage1: 0,
    eStage2: 2,
    eStage3: 3,
    eEndStage: 4
});

function GameLevel(level) {
    
    this.hideMinimap = 0;
    this.mState = null;
    
    // Hero sprites came from: http://millionthvector.blogspot.com/p/free-sprites.html
    // Missile sprite came from: 
    // Projectile sprites came from: 
    this.kHeroSprite = "assets/topdownfighter.png";
    this.kHeroSpriteNormal = "assets/topdownfighternormal.png";
    this.kPowerupTexture = "assets/powerups.png";
    this.kParticleTexture = "assets/particle.png";
    this.kTerrainTexture = "assets/terrain.png";
    this.kTerrainNormal = "assets/terrain_normal.png";
    this.kTurret1Sprite = "assets/turret1.png";
    this.kTurret2Sprite = "assets/turret2.png";
    this.kTurret3Sprite = "assets/turret3.png";
    this.kTurret1SpriteNormal = "assets/turret1_normal.png";
    this.kTurret2SpriteNormal = "assets/turret2_normal.png";
    this.kTurret3SpriteNormal = "assets/turret3_normal.png";
    this.kGameMessagesTexture = "assets/Messages.png";
    this.kMissileTexture = "assets/missile.png";
    this.kProjectileTextures = "assets/projectiles.png";

    this.kHealthBar = "assets/healthbar.png";
    this.kEnergyBar = "assets/energybar.png";
    
     // audio clips: supports both mp3 and wav formats
    this.kBgClip = "assets/audio/music.mp3";
    this.kCueHeroFire = "assets/audio/Laser_Shoot5.wav";
    this.kCueTurretFire = "assets/audio/Laser_Shoot4.wav";
    this.kCueExplosionArray = [
        "assets/audio/Explosion6.wav",
        "assets/audio/Explosion.wav",
        "assets/audio/Explosion12.wav",
        "assets/audio/Explosion7.wav",
        "assets/audio/Explosion10.wav"
    ];
    this.kCuePowerUpArray = [
        "assets/audio/Powerup.wav",
        "assets/audio/Powerup4.wav",
        "assets/audio/Powerup7.wav",
        "assets/audio/Randomize.wav",
        "assets/audio/Powerup8.wav"
    ];

    // specifics to the level
    this.kLevelFile = "assets/" + level + "/" + level + ".xml";  // e.g., assets/Level1/Level1.xml
    this.kBg = "assets/" + level + "/bg2.png";
    this.kBgNormal = "assets/" + level + "/bg2_normal.png";
    this.kBgLayer = "assets/" + level + "/bg2Layer.png";
    this.kBgLayerNormal = "assets/" + level + "/bg2Layer_normal.png";
    
    // The camera to view the scene
    this.mCamera = null;
    this.mMiniCamera = null;
    this.mCameraSpeed = 0.4;
    
    this.mFocusPowerUp = null;
    
    // the hero and the support objects
    this.mHero = null;
    this.mIllumHero = null;
    this.mDistance = 0;
    this.mHealthBar = null;
    this.mEnergyBar = null;

    this.mMsg = null;
    this.mMsg2 = null;

    this.mThisLevel = level;
    this.mNextLevel = null;
    this.mRestart = false;

    this.mLgtIndex = 2;
    this.mLgtRotateTheta = 0;

    Projectile.kMissileTexture = this.kMissileTexture;
    Projectile.kProjectileTextures = this.kProjectileTextures;
    PowerUp.kTexture = this.kPowerupTexture;

    this.mTurretSet = null;
    this.mPowerUpSet = null;
    this.mAllParticles = new ParticleGameObjectSet(); 
    this.mExplosionSet = null;
    this.mEnemyProjectileSet = null;
    this.mFriendlyProjectileSet = null;
    this.mTerrainSetBottom = null;
    this.mTerrainSetTop = null;
    
    this.mGameMessage = null;
    
    this.mEndDistance = 600;
}
gEngine.Core.inheritPrototype(GameLevel, Scene);

GameLevel.prototype.loadScene = function () {
    gEngine.TextFileLoader.loadTextFile(this.kLevelFile, gEngine.TextFileLoader.eTextFileType.eXMLFile);
    gEngine.Textures.loadTexture(this.kHeroSprite);
    gEngine.Textures.loadTexture(this.kHeroSpriteNormal);
    gEngine.Textures.loadTexture(this.kPowerupTexture);    
    gEngine.Textures.loadTexture(this.kParticleTexture);
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kBgNormal);
    gEngine.Textures.loadTexture(this.kBgLayer);
    gEngine.Textures.loadTexture(this.kBgLayerNormal);
    gEngine.Textures.loadTexture(this.kTerrainTexture);
    gEngine.Textures.loadTexture(this.kTerrainNormal);
    gEngine.Textures.loadTexture(this.kTurret1Sprite);
    gEngine.Textures.loadTexture(this.kTurret2Sprite);
    gEngine.Textures.loadTexture(this.kTurret3Sprite);
    gEngine.Textures.loadTexture(this.kTurret1SpriteNormal);
    gEngine.Textures.loadTexture(this.kTurret2SpriteNormal);
    gEngine.Textures.loadTexture(this.kTurret3SpriteNormal);
    gEngine.Textures.loadTexture(this.kGameMessagesTexture);
    gEngine.Textures.loadTexture(this.kMissileTexture);
    gEngine.Textures.loadTexture(this.kProjectileTextures);
    
    gEngine.Textures.loadTexture(this.kHealthBar);
    gEngine.Textures.loadTexture(this.kEnergyBar);
    
    
   // loads the audios
    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.AudioClips.loadAudio(this.kCueHeroFire);
    gEngine.AudioClips.loadAudio(this.kCueTurretFire);
    
    var i;
    for(i = 0; i < this.kCueExplosionArray.length; i++) {
        gEngine.AudioClips.loadAudio(this.kCueExplosionArray[i]);
    }
    for(i = 0; i < this.kCuePowerUpArray.length; i++) {
        gEngine.AudioClips.loadAudio(this.kCuePowerUpArray[i]);
    }    
};

GameLevel.prototype.unloadScene = function () {
    gEngine.LayerManager.cleanUp();

    gEngine.TextFileLoader.unloadTextFile(this.kLevelFile);
    gEngine.Textures.unloadTexture(this.kHeroSprite);
    gEngine.Textures.unloadTexture(this.kHeroSpriteNormal);
    gEngine.Textures.unloadTexture(this.kPowerupTexture);    
    gEngine.Textures.unloadTexture(this.kParticleTexture);
    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kBgNormal);
    gEngine.Textures.unloadTexture(this.kBgLayer);
    gEngine.Textures.unloadTexture(this.kBgLayerNormal);
    gEngine.Textures.unloadTexture(this.kTerrainTexture);
    gEngine.Textures.unloadTexture(this.kTerrainNormal);
    gEngine.Textures.unloadTexture(this.kTurret1Sprite);
    gEngine.Textures.unloadTexture(this.kTurret2Sprite);
    gEngine.Textures.unloadTexture(this.kTurret3Sprite);
    gEngine.Textures.unloadTexture(this.kTurret1SpriteNormal);
    gEngine.Textures.unloadTexture(this.kTurret2SpriteNormal);
    gEngine.Textures.unloadTexture(this.kTurret3SpriteNormal);
    gEngine.Textures.unloadTexture(this.kGameMessagesTexture);
    gEngine.Textures.unloadTexture(this.kMissileTexture);
    gEngine.Textures.unloadTexture(this.kProjectileTextures);
    
    gEngine.Textures.unloadTexture(this.kHealthBar);
    gEngine.Textures.unloadTexture(this.kEnergyBar);

    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.kCueHeroFire);
    gEngine.AudioClips.unloadAudio(this.kCueTurretFire);

    var i;
    for(i = 0; i < this.kCueExplosionArray.length; i++) {
        gEngine.AudioClips.loadAudio(this.kCueExplosionArray[i]);
    }    
    for(i = 0; i < this.kCuePowerUpArray.length; i++) {
        gEngine.AudioClips.unloadAudio(this.kCuePowerUpArray[i]);
    }

    if (this.mRestart === true)
    {
        gEngine.Core.startScene(this.mNextLevel);
    }
};

GameLevel.prototype.initialize = function () {
    // set ambient lighting
    gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(0.2);

    // parse the entire scene
    var parser = new SceneFileParser(this.kLevelFile);
    this.mCamera = parser.parseCamera();
    this.mMiniCamera = new Camera(
        vec2.fromValues(6, 8), // position of the camera
        5,                        // width of camera
        [5, 5, 200, 113]         // viewport (orgX, orgY, width, height)
      
    );
    globalLightSet = parser.parseLights();

    // parse background, needs the camera as a reference for parallax
    parser.parseBackground(this.mThisLevel, this.mCamera, globalLightSet);

    this.mExplosionSet = new ExplosionSet(this.kParticleTexture, this.mAllParticles, this.kCueExplosionArray);
    this.mEnemyProjectileSet = new ProjectileSet(this.mExplosionSet, true);
    this.mFriendlyProjectileSet = new ProjectileSet(this.mExplosionSet, false);
    
    // parsing of actors can only begin after background has been parsed
    // to ensure proper support shadow
    // for now here is the hero
    this.mIllumHero = new Hero(this.kHeroSprite, this.kHeroSpriteNormal, 2, 6, globalLightSet, this.mFriendlyProjectileSet, this.mExplosionSet, this.mCamera, this.kCueHeroFire);
    
    this.mHealthBar = new LightRenderable(this.kHealthBar);
    this.mEnergyBar = new LightRenderable(this.kHealthBar);
    
    this.mHealthBar.getXform().setPosition(this.mIllumHero.getXform().getXPos(), this.mIllumHero.getXform().getYPos() + this.mIllumHero.getXform().getHeight());
    this.mHealthBar.getXform().setWidth(this.mIllumHero.getHullIntegrity() / 6);
    this.mHealthBar.getXform().setHeight(0.2);
    this.mHealthBar.setColor([1, 0.1, 0.1, 1]);
    
    this.mEnergyBar.getXform().setPosition(this.mIllumHero.getXform().getXPos(), this.mIllumHero.getXform().getYPos() + this.mIllumHero.getXform().getHeight() - this.mEnergyBar.getXform().getHeight());
    this.mEnergyBar.getXform().setWidth(this.mIllumHero.getHullIntegrity() / 6);
    this.mEnergyBar.getXform().setHeight(0.2);
    this.mEnergyBar.setColor([0.5, 0.5, 1, 1]);

    this.mTerrainSetBottom = new TerrainSet(0, this.mCamera);
    this.mTerrainSetTop = new TerrainSet(1, this.mCamera);
    this.mTurretSet = new TurretSet(this.mCamera, this.mEnemyProjectileSet, globalLightSet, this.mExplosionSet, this.mIllumHero, this.mTerrainSetTop, this.mTerrainSetBottom, this.kCueTurretFire);
    this.mPowerUpSet = new PowerUpSet(globalLightSet, this.kCuePowerUpArray);
    
    // Add hero into the layer manager and as shadow caster
    // Hero should be added into Actor layer last
    // Hero can only be added as shadow caster after background is created
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mIllumHero);
    gEngine.LayerManager.addAsShadowCaster(this.mIllumHero);
    
    this.mGameMessage = new GameMessage(this.kGameMessagesTexture, this.mCamera);
    
    this.mMsg = new FontRenderable("");
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.setTextHeight(0.75);    
    
    this.mMsg2 = new FontRenderable("");
    this.mMsg2.setColor([1, 1, 1, 1]);
    this.mMsg2.setTextHeight(0.4);    
    
    // Set the game state
    this._setState(GameLevel.eState.eStage1);
    
    // now start the bg music ...
    gEngine.AudioClips.playBackgroundAudio(this.kBgClip);    
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
GameLevel.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    gEngine.LayerManager.drawAllLayers(this.mCamera);

    this.mAllParticles.draw(this.mCamera);
    
    this.mHealthBar.draw(this.mCamera);
    this.mEnergyBar.draw(this.mCamera);
    gEngine.DefaultResources.setGlobalAmbientIntensity(1);
    this.mMsg.draw(this.mCamera);
    gEngine.DefaultResources.setGlobalAmbientIntensity(0.2);
    
    // If the game message is active then draw it now
    if(this.mGameMessage.isActive() === true) { this.mGameMessage.draw(this.mCamera); }

    if (this.hideMinimap === 0) {
        this.mMiniCamera.setupViewProjection();
        gEngine.LayerManager.drawLayer(gEngine.eLayer.eBackground, this.mMiniCamera);
        gEngine.LayerManager.drawLayer(gEngine.eLayer.eShadowReceiver, this.mMiniCamera);
        gEngine.LayerManager.drawLayer(gEngine.eLayer.ePowerupLayer, this.mMiniCamera);
        gEngine.DefaultResources.setGlobalAmbientIntensity(1);
        this.mMsg2.draw(this.mMiniCamera);
        gEngine.DefaultResources.setGlobalAmbientIntensity(0.2);
    }
};

GameLevel.prototype._setState = function(state) {

    if(this.mState === state) { return; }

    // Set the new state
    this.mState = state;
    
    // Update the gamemessage
    switch(state) {
        
        case GameLevel.eState.eStage1:
            this.mGameMessage.activate(GameMessage.eState.eStage1);
            break;
        
        case GameLevel.eState.eStage2:
            this.mGameMessage.activate(GameMessage.eState.eStage2);
            break;
        
        case GameLevel.eState.eStage3:
            this.mGameMessage.activate(GameMessage.eState.eStage3);
            break;
        
        default:
            this.mGameMessage.activate(GameMessage.eState.eEndStage);
            break;
    }
};