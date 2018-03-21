/* File: 		MyGame.js
 * Author:      	Ryu Muthui, Chad Dugie, Michael Voght
 * Last Date Modified: 	12/15/2015
 * Description:		This is the logic of the game */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
    // Audio clips: supports both mp3 and wav formats
    this.kGamePlayBGM= "assets/Audio/Music/GamePlay_BGM.mp3";
    this.kLaserFireSFX = "assets/Audio/SFX/Laser_Fire04.wav";
    this.kTurretFireSFX = "assets/Audio/SFX/Laser_Fire03.wav";
    this.kPowerUpPickUpSFX = "assets/Audio/SFX/PowerUp_PickUp04.wav";
    this.kStarFighter_HitSFX = "assets/Audio/SFX/Collide_Hit01.wav";
    this.kStarFighter_LaunchSFX = "assets/Audio/SFX/SFX_FighterLaunch.wav";
    this.kEnemy_CollisionSFX = "assets/Audio/SFX/SmallExplosion_SFX.mp3";
    this.kTeleportedSFX = "assets/Audio/SFX/Teleported_SFX.wav";
    this.kLargeExplosionSFX = "assets/Audio/SFX/BigExplosion_SFX.wav";
    
    // Sprite assets
    this.kBg = "assets/LargeBG.png";
    this.kOutOfBoundsBG = "assets/OutOfBoundsBG_Transparent75.png";
    this.kEnemy_SaucerSolidSprite = "assets/Enemy/strip_saucer_solid.png";
    this.kStarFighterSprite = "assets/Player_StarFighter.png";
    this.kProjectileTexture= "assets/particle.png";
    this.kSpaceStationSprite = "assets/SpaceStation.png";
    this.kSpaceStationNormalMap = "assets/SpaceStation_NormalMap.png";
    this.kPowerUp_HealthSprite = "assets/PowerUp_Health.png";
    this.kTurretSprite = "assets/Enemy/turret.png";
    this.kArrow = "assets/Arrow.png";
    this.kHealthBar = "assets/Left_bar.png";
    this.kShieldBar = "assets/Right_bar.png";
    this.kShield = "assets/Shield_Effect.png";
    this.kCurrentScreen = MyGame;

    // The camera to view the scene
    this.mBg = null;
    this.mMiniMapBg = null;
    this.mMsg = null;
    this.mCamera = null;
    this.mCameraMiniMap = null;
    this.mCameraStats = null;
    this.mNextScreen = null;
    this.mAllEnemies = null;
    this.mHeroSet = null;

    // the Starfighter and the support objects
    this.mTurret1 = null;
    this.mTurret2 = null;
    this.mTurret3 = null;
    this.mPowerUps = null;
    this.mPowerUpHealthFull = null;
    this.mPowerUpWeaponTriple = null;
    this.mParticles = null;
    this.mLights = null;
    this.mScore = null;
    
    this.mStatsHealthTube = null;
    this.mStatsHealthBar = null;
    this.mStatsHealthText = null;
    this.mStatsShieldTube = null;
    this.mStatsShieldBar = null;
    this.mStatsShieldText = null;
    this.mStatsEnemies = null;
    this.mStatsScore = null;
    this.mStatsWeaponTriple = null;
    
    // Added a variable to define camera bound, xMin, xMax, yMax, yMin.
    this.cameraBound = vec4.fromValues(-1024, 5120, 5120, -1024);
    this.mEnemyPointer = null;
    // Projectile.js has already been read in ...
    Projectile.kTexture = this.kProjectileTexture;
    
    this.mExpired = null;
    this.mTransitionCounter = null;
    
    this.mFPS = null;
    this.mFPSRefresh = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kOutOfBoundsBG);
    gEngine.Textures.loadTexture(this.kStarFighterSprite);
    gEngine.Textures.loadTexture(this.kProjectileTexture);
    gEngine.Textures.loadTexture(this.kEnemy_SaucerSolidSprite);
    gEngine.Textures.loadTexture(this.kSpaceStationSprite);
    gEngine.Textures.loadTexture(this.kPowerUp_HealthSprite);
    gEngine.Textures.loadTexture(this.kTurretSprite);
    gEngine.Textures.loadTexture(this.kSpaceStationNormalMap);
    gEngine.Textures.loadTexture(this.kArrow);
    gEngine.Textures.loadTexture(this.kShield);
    gEngine.Textures.loadTexture(this.kHealthBar);
    gEngine.Textures.loadTexture(this.kShieldBar);
    
    gEngine.AudioClips.loadAudio(this.kGamePlayBGM);
    gEngine.AudioClips.loadAudio(this.kLaserFireSFX);
    gEngine.AudioClips.loadAudio(this.kTurretFireSFX);
    gEngine.AudioClips.loadAudio(this.kPowerUpPickUpSFX);
    gEngine.AudioClips.loadAudio(this.kStarFighter_HitSFX);
    gEngine.AudioClips.loadAudio(this.kEnemy_CollisionSFX);
    gEngine.AudioClips.loadAudio(this.kStarFighter_LaunchSFX);
    gEngine.AudioClips.loadAudio(this.kTeleportedSFX);
    gEngine.AudioClips.loadAudio(this.kLargeExplosionSFX);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kOutOfBoundsBG);
    gEngine.Textures.unloadTexture(this.kStarFighterSprite);
    gEngine.Textures.unloadTexture(this.kProjectileTexture);
    gEngine.Textures.unloadTexture(this.kEnemy_SaucerSolidSprite);
    gEngine.Textures.unloadTexture(this.kSpaceStationSprite);
    gEngine.Textures.unloadTexture(this.kPowerUp_HealthSprite);
    gEngine.Textures.unloadTexture(this.kTurretSprite);
    gEngine.Textures.unloadTexture(this.kSpaceStationNormalMap);
    gEngine.Textures.unloadTexture(this.kArrow);
    gEngine.Textures.unloadTexture(this.kShield);
    gEngine.Textures.unloadTexture(this.kHealthBar);
    gEngine.Textures.unloadTexture(this.kShieldBar);
    
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.kGamePlayBGM);
    gEngine.AudioClips.unloadAudio(this.kLaserFireSFX);
    gEngine.AudioClips.unloadAudio(this.kTurretFireSFX);
    gEngine.AudioClips.unloadAudio(this.kPowerUpPickUpSFX);
    gEngine.AudioClips.unloadAudio(this.kStarFighter_HitSFX);
    gEngine.AudioClips.unloadAudio(this.kStarFighter_LaunchSFX);
    gEngine.AudioClips.unloadAudio(this.kEnemy_CollisionSFX);
    gEngine.AudioClips.unloadAudio(this.kTeleportedSFX);
    gEngine.AudioClips.unloadAudio(this.kLargeExplosionSFX);
    gEngine.Core.startScene(this.mNextScreen);
};

MyGame.prototype.initialize = function () {
    // sets the lighting intensity/lvl of the gameworld
    gEngine.DefaultResources.setGlobalAmbientIntensity(3); 
    this._initializeLights();

    this.mAllEnemies = new GameObjectSet();
    new SpaceStation(this.kSpaceStationSprite, this.kSpaceStationNormalMap, this.mAllEnemies);
    this.mAllEnemies.getObjectAt(0).getRenderable().addLight(this.mLights.getLightAt(1));

    this.mHeroSet = new GameObjectSet();
    new StarFighter(this.kStarFighterSprite, this.mHeroSet);

    this.mPowerUps = new PowerUpSet();
    
    // Main Camera View
    this.mCamera = new Camera(                                    // Set up the camera
        this.mHeroSet.getObjectAt(0).getXform().getPosition(),    // position of the camera
        1000,                                                     // width of camera
        [0, 0, 800, 600],                                         // viewport (orgX, orgY, width, height)
        3                                                         // boarder thickness
    );   
    this.mCamera.setBackgroundColor([0.2, 0.2, 0.2, 1]);    // sets the background to gray
    
    // MiniMap Camera View
    this.mCameraMiniMap = new Camera(                             // Set up the camera
        this.mHeroSet.getObjectAt(0).getXform().getPosition(),    // position of the camera
        1500,                                                     // width of camera
        [800, 450, 200, 150],                                     // viewport (orgX, orgY, width, height)
        2                                                         // boarder thickness
    );   
    this.mCameraMiniMap.setBackgroundColor([0.2, 0.2, 0.2, 1]); // sets the background to gray
    this.mMiniMapBg = new Renderable();
    this.mMiniMapBg.setColor([0, 0, 0, 1]);
    this.mMiniMapBg.getXform().setSize(1600, 1200);
    
    // Stats Camera View
    this.mCameraStats = new Camera(                               // Set up the camera
        [-2000, -2000],                                           // position of the camera
        1000,                                                     // width of camera
        [800, 0, 200, 450],                                       // viewport (orgX, orgY, width, height)
        2                                                         // boarder thickness
    );   
    this.mCameraStats.setBackgroundColor([0.0, 0.0, 0.0, 1.0]); // sets the background to black
         
    // Set up the background image, which is just a sprite renderable obj
    var bgR = new LightRenderable(this.kBg);
    bgR.getXform().setSize(4096,4096);
    bgR.getXform().setPosition(2048, 2048);
    this.mBg = new GameObject(bgR);
    this.mBg.getRenderable().addLight(this.mLights.getLightAt(0));
    
    //<editor-fold desc="Initialize out-of-bounds BG" defaultstate="collapsed">
    this.mOutOfBoundsBGs = [];
    bgR = new LightRenderable(this.kOutOfBoundsBG);
    bgR.getXform().setSize(1024,1024);
    bgR.getXform().setPosition(-512, -512);
    this.mOutOfBoundsBGs.push(new GameObject(bgR));
    bgR = new LightRenderable(this.kOutOfBoundsBG);
    bgR.getXform().setSize(1024,1024);
    bgR.getXform().setPosition(-512, 512);
    this.mOutOfBoundsBGs.push(new GameObject(bgR));
    bgR = new LightRenderable(this.kOutOfBoundsBG);
    bgR.getXform().setSize(1024,1024);
    bgR.getXform().setPosition(-512, 1536);
    this.mOutOfBoundsBGs.push(new GameObject(bgR));
    bgR = new LightRenderable(this.kOutOfBoundsBG);
    bgR.getXform().setSize(1024,1024);
    bgR.getXform().setPosition(-512, 2560);
    this.mOutOfBoundsBGs.push(new GameObject(bgR));
    bgR = new LightRenderable(this.kOutOfBoundsBG);
    bgR.getXform().setSize(1024,1024);
    bgR.getXform().setPosition(-512, 3584);
    this.mOutOfBoundsBGs.push(new GameObject(bgR));
    bgR = new LightRenderable(this.kOutOfBoundsBG);
    bgR.getXform().setSize(1024,1024);
    bgR.getXform().setPosition(-512, 4608);
    this.mOutOfBoundsBGs.push(new GameObject(bgR));
    bgR = new LightRenderable(this.kOutOfBoundsBG);
    bgR.getXform().setSize(1024,1024);
    bgR.getXform().setPosition(4608, -512);
    this.mOutOfBoundsBGs.push(new GameObject(bgR));
    bgR = new LightRenderable(this.kOutOfBoundsBG);
    bgR.getXform().setSize(1024,1024);
    bgR.getXform().setPosition(4608, 512);
    this.mOutOfBoundsBGs.push(new GameObject(bgR));
    bgR = new LightRenderable(this.kOutOfBoundsBG);
    bgR.getXform().setSize(1024,1024);
    bgR.getXform().setPosition(4608, 1536);
    this.mOutOfBoundsBGs.push(new GameObject(bgR));
    bgR = new LightRenderable(this.kOutOfBoundsBG);
    bgR.getXform().setSize(1024,1024);
    bgR.getXform().setPosition(4608, 2560);
    this.mOutOfBoundsBGs.push(new GameObject(bgR));
    bgR = new LightRenderable(this.kOutOfBoundsBG);
    bgR.getXform().setSize(1024,1024);
    bgR.getXform().setPosition(4608, 3584);
    this.mOutOfBoundsBGs.push(new GameObject(bgR));
    bgR = new LightRenderable(this.kOutOfBoundsBG);
    bgR.getXform().setSize(1024,1024);
    bgR.getXform().setPosition(4608, 4608);
    this.mOutOfBoundsBGs.push(new GameObject(bgR));
    bgR = new LightRenderable(this.kOutOfBoundsBG);
    bgR.getXform().setSize(1024,1024);
    bgR.getXform().setPosition(512, -512);
    this.mOutOfBoundsBGs.push(new GameObject(bgR));
    bgR = new LightRenderable(this.kOutOfBoundsBG);
    bgR.getXform().setSize(1024,1024);
    bgR.getXform().setPosition(1536, -512);
    this.mOutOfBoundsBGs.push(new GameObject(bgR));
    bgR = new LightRenderable(this.kOutOfBoundsBG);
    bgR.getXform().setSize(1024,1024);
    bgR.getXform().setPosition(2560, -512);
    this.mOutOfBoundsBGs.push(new GameObject(bgR));
    bgR = new LightRenderable(this.kOutOfBoundsBG);
    bgR.getXform().setSize(1024,1024);
    bgR.getXform().setPosition(3584, -512);
    this.mOutOfBoundsBGs.push(new GameObject(bgR));
    bgR = new LightRenderable(this.kOutOfBoundsBG);
    bgR.getXform().setSize(1024,1024);
    bgR.getXform().setPosition(512, 4608);
    this.mOutOfBoundsBGs.push(new GameObject(bgR));
    bgR = new LightRenderable(this.kOutOfBoundsBG);
    bgR.getXform().setSize(1024,1024);
    bgR.getXform().setPosition(1536, 4608);
    this.mOutOfBoundsBGs.push(new GameObject(bgR));
    bgR = new LightRenderable(this.kOutOfBoundsBG);
    bgR.getXform().setSize(1024,1024);
    bgR.getXform().setPosition(2560, 4608);
    this.mOutOfBoundsBGs.push(new GameObject(bgR));
    bgR = new LightRenderable(this.kOutOfBoundsBG);
    bgR.getXform().setSize(1024,1024);
    bgR.getXform().setPosition(3584, 4608);
    this.mOutOfBoundsBGs.push(new GameObject(bgR));
    var i;
    for (i = 0; i < this.mOutOfBoundsBGs.length; i++)
        this.mOutOfBoundsBGs[i].getRenderable().addLight(this.mLights.getLightAt(0));
    //</editor-fold>
    
    // message setup // remove before final game
    this.mMsg = new FontRenderable("");
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.getXform().setPosition(1, 14);
    this.mMsg.setTextHeight(2);
    
    // play BGM
    gEngine.AudioClips.playBackgroundAudio(this.kGamePlayBGM);
    gEngine.AudioClips.playACue(this.kStarFighter_LaunchSFX);
    
    this.mParticles = new ParticleGameObjectSet();
    var enemyPointer = new TextureRenderable(this.kArrow);
    enemyPointer.getXform().setSize(100, 100);
    this.mEnemyPointer = new GameObject(enemyPointer);
    
    this.mStatsHealthTube = new TextureRenderable(this.kHealthBar);
    this.mStatsHealthTube.getXform().setSize(350, 1400);
    this.mStatsHealthTube.getXform().setPosition(this.mCameraStats.getWCCenter()[0] - (this.mStatsHealthTube.getXform().getWidth() / 2), this.mCameraStats.getWCCenter()[1] - (this.mCameraStats.getWCHeight() / 2) + (this.mStatsHealthTube.getXform().getHeight() / 2));
    
    this.mStatsHealthBar = new Renderable();
    this.mStatsHealthBar.setColor([1, 0, 0, 1]);
    this.mStatsHealthBar.getXform().setSize(200, 1000);
    this.mStatsHealthBar.getXform().setPosition(this.mCameraStats.getWCCenter()[0] - (this.mStatsHealthTube.getXform().getWidth() / 2), this.mCameraStats.getWCCenter()[1] - (this.mCameraStats.getWCHeight() / 2) + (this.mStatsHealthBar.getXform().getHeight() / 2) + 200);
    
    this.mStatsHealthText = new FontRenderable("");
    this.mStatsHealthText.setColor([1.0, 1.0, 1.0, 1]);
    this.mStatsHealthText.setTextHeight(120);
    this.mStatsHealthText.getXform().setPosition(this.mCameraStats.getWCCenter()[0] - (this.mStatsHealthTube.getXform().getWidth() / 2) - 90, this.mCameraStats.getWCCenter()[1] - (this.mCameraStats.getWCHeight() / 2) + this.mStatsHealthText.getXform().getHeight());
    
    this.mStatsShieldTube = new TextureRenderable(this.kShieldBar);
    this.mStatsShieldTube.getXform().setSize(350, 1400);
    this.mStatsShieldTube.getXform().setPosition(this.mCameraStats.getWCCenter()[0] + (this.mStatsShieldTube.getXform().getWidth() / 2), this.mCameraStats.getWCCenter()[1] - (this.mCameraStats.getWCHeight() / 2) + (this.mStatsShieldTube.getXform().getHeight() / 2));
    
    this.mStatsShieldBar = new Renderable();
    this.mStatsShieldBar.setColor([0, 0, 1, 1]);
    this.mStatsShieldBar.getXform().setSize(200, 1000);
    this.mStatsShieldBar.getXform().setPosition(this.mCameraStats.getWCCenter()[0] + (this.mStatsShieldTube.getXform().getWidth() / 2), this.mCameraStats.getWCCenter()[1] - (this.mCameraStats.getWCHeight() / 2) + (this.mStatsShieldBar.getXform().getHeight() / 2) + 200);
    
    this.mStatsShieldText = new FontRenderable("");
    this.mStatsShieldText.setColor([1.0, 1.0, 1.0, 1]);
    this.mStatsShieldText.setTextHeight(120);
    this.mStatsShieldText.getXform().setPosition(this.mCameraStats.getWCCenter()[0] + (this.mStatsShieldTube.getXform().getWidth() / 2) - 90, this.mCameraStats.getWCCenter()[1] - (this.mCameraStats.getWCHeight() / 2) + this.mStatsShieldText.getXform().getHeight());
    
    this.mStatsEnemies = new FontRenderable("");
    this.mStatsEnemies.setColor([1.0, 1.0, 1.0, 1]);
    this.mStatsEnemies.setTextHeight(120);
    this.mStatsEnemies.getXform().setPosition(-2360, this.mCameraStats.getWCCenter()[1] + (this.mCameraStats.getWCHeight() / 2) - this.mStatsEnemies.getXform().getHeight());
    
    this.mStatsScore = new FontRenderable("");
    this.mStatsScore.setColor([1.0, 1.0, 1.0, 1]);
    this.mStatsScore.setTextHeight(120);
    this.mStatsScore.getXform().setPosition(-2360, this.mCameraStats.getWCCenter()[1] + (this.mCameraStats.getWCHeight() / 2) - this.mStatsScore.getXform().getHeight() - 200);
    
    this.mStatsWeaponTriple = new FontRenderable("Triple weapon");
    this.mStatsWeaponTriple.setColor([1.0, 0.0, 0.0, 1]);
    this.mStatsWeaponTriple.setTextHeight(100);
    this.mStatsWeaponTriple.getXform().setPosition(-2360, this.mCameraStats.getWCCenter()[1] + (this.mCameraStats.getWCHeight() / 2) - this.mStatsScore.getXform().getHeight() - 400);
    
    this.mExpired = false;
    this.mTransitionCounter = 0;
    
    this.mFPS = false;
    this.mFPSRefresh = 0;
};

MyGame.prototype.drawCamera = function (camera) {
    camera.setupViewProjection();
    var i;
    this.mBg.draw(camera);
    for (i = 0; i < this.mOutOfBoundsBGs.length; i++)
        this.mOutOfBoundsBGs[i].draw(camera);
    this.mMsg.setColor([1, 1, 1, 1]);

    // Note that order matters 
    for( i = 0; i < this.mAllEnemies.size(); i++ ) {
        this.mAllEnemies.getObjectAt(i).draw(camera);
    }
    for( i = 0; i < this.mHeroSet.size(); i++ ) {
        this.mHeroSet.getObjectAt(i).draw(camera);
    }
    
    this.mPowerUps.draw(camera);
    this.mHeroSet.getObjectAt(0).getProjectileSet().draw(camera);
    this.mParticles.draw(camera);
    if (this.mAllEnemies.size() <= 6){
        this.mEnemyPointer.getRenderable().draw(camera);
    }
    
    this.mStatsHealthBar.draw(camera);
    this.mStatsHealthTube.draw(camera);
    this.mStatsHealthText.draw(camera);
    this.mStatsShieldBar.draw(camera);
    this.mStatsShieldTube.draw(camera);
    this.mStatsShieldText.draw(camera);
    this.mStatsEnemies.draw(camera);
    this.mStatsScore.draw(camera);
    this.mStatsWeaponTriple.draw(camera);
};

MyGame.prototype.drawRenderable = function(camera){
    camera.setupViewProjection();
    var i;
    
    this.mMiniMapBg.getXform().setPosition(this.mHeroSet.getObjectAt(0).getXform().getXPos(), this.mHeroSet.getObjectAt(0).getXform().getYPos());
    this.mMiniMapBg.draw(camera);
    for( i = 0; i < this.mAllEnemies.size(); i++ ) {
        this.mAllEnemies.getObjectAt(i).drawRenderable(camera);
    }
    /*for( i = 0; i < this.mHeroSet.size(); i++ ) {
        this.mHeroSet.getObjectAt(i).drawRenderable(camera);
    }*/
    this.mHeroSet.getObjectAt(0).drawRenderable(camera);
    for( i = 0; i < this.mPowerUps.getLength(); i++ ) {
        this.mPowerUps.getObjectAt(i).drawRenderable(camera);
    }
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    //clear the canvas
    gEngine.Core.clearCanvas([0.1, 0.1, 0.1, 1.0]); // clear to black

    // Draw with all three cameras
    this.drawCamera(this.mCamera);
    this.mMsg.draw(this.mCamera);   // remove this before final game
    this.drawRenderable(this.mCameraMiniMap);
    this.drawCamera(this.mCameraStats);
};

// The Update function, updates the application state. 
// Make sure to _NOT_ drawanything from this function!
MyGame.prototype.update = function () {
    var station = null;
    var i;
    for (i = 0; i < this.mAllEnemies.size(); i++) {
        if (this.mAllEnemies.getObjectAt(i) instanceof SpaceStation) {
            station = this.mAllEnemies.getObjectAt(i);
            break;
        }
    }
   
    if(this.mHeroSet.getObjectAt(0).getHealth() <= 0){
        this.mNextScreen = new GameOverScreen(this.kCurrentScreen);
    }
    
    if(this.mAllEnemies.size() <= 1 && this.mAllEnemies.getObjectAt(0).hasExpired()) {
        this.mExpired = true;
    }
    
    if (this.mExpired) {
        if (this.mTransitionCounter >= 240) {
            gEngine.AudioClips.playACue(this.kTeleportedSFX);
            this.mNextScreen = new BossScreen("BossScreen");
        }
        this.mTransitionCounter++;
    }

    if(this.mNextScreen !== null) {
        gEngine.GameLoop.stop();
    }
    
    var sfXform = this.mHeroSet.getObjectAt(0).getXform();
    var bgXform = this.mBg.getXform();
    var SFBBox = this.mHeroSet.getObjectAt(0).getBBox();
    var BGBBox = this.mBg.getBBox();
    var status = BGBBox.boundCollideStatus(SFBBox);
    if (status === 16) {
        this.mHeroSet.getObjectAt(0).update(
                this.mAllEnemies,
                gEngine.Input.keys.Space,
                gEngine.Input.keys.W,
                gEngine.Input.keys.S,
                gEngine.Input.keys.A,
                gEngine.Input.keys.D,
                gEngine.Input.keys.Q,
                gEngine.Input.keys.E,
                this.mCamera,
                this.mParticles,
                gEngine.Input.keys.Left,
                gEngine.Input.keys.Up,
                gEngine.Input.keys.Right,
                gEngine.Input.keys.Down
        );
    }
    else {
        this.mHeroSet.getObjectAt(0).update(
                this.mAllEnemies,
                gEngine.Input.keys.Space,
                null,
                null,
                null,
                null,
                null,
                null,
                this.mCamera,
                this.mParticles
        );

        if (status === 1 || status === 5 || status === 9)
            sfXform.incXPosBy(this.mHeroSet.getObjectAt(0).getSpeed());
        if (status === 2 || status === 6 || status === 10)
            sfXform.incXPosBy(-this.mHeroSet.getObjectAt(0).getSpeed());
        if (status === 4 || status === 5 || status === 6)
            sfXform.incYPosBy(-this.mHeroSet.getObjectAt(0).getSpeed());
        if (status === 8 || status === 9 || status === 10)
            sfXform.incYPosBy(this.mHeroSet.getObjectAt(0).getSpeed());
    }
    for (var i = 1; i < this.mHeroSet.size(); i++) {
        this.mHeroSet.getObjectAt(i).update(this.mHeroSet.getObjectAt(0));
    }

    // Added for camera bounding
    this.mCamera.update(this.cameraBound);     

    for( var i = 0; i < this.mAllEnemies.size(); i++ ) {
        if (this.mAllEnemies.getObjectAt(i) instanceof SpaceStation) {
            this.mAllEnemies.getObjectAt(i).update(this.mPowerUps, this.mHeroSet,
                this.mCamera, this.mParticles);
        }
        else {
            this.mAllEnemies.getObjectAt(i).update(
                this.mHeroSet.getObjectAt(0),
                this.mParticles, this.mCamera);
        }
    }
    
    // interaction with the WC bound
    this.mCamera.clampAtBoundary(this.mHeroSet.getObjectAt(0).getXform(), 0.9);
    this.mCamera.panWith(this.mHeroSet.getObjectAt(0).getXform(), 0.3);
    
    // Mini map.
    this.mCameraMiniMap.setWCCurrentCenter(this.mHeroSet.getObjectAt(0).getXform().getXPos(), 
        this.mHeroSet.getObjectAt(0).getXform().getYPos());
        
    this.mPowerUps.update(this.mHeroSet.getObjectAt(0));
    this.mParticles.update();
    
    // Exit_Game Support
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Escape)){
        var exit = confirm("Are you sure you want to exit the game?");
        if (exit){ this.mNextScreen= new TitleScreen("TitleScreen");} 
    }
    
    if (station !== null) {
        var stationLightVec = [];
        vec2.subtract(stationLightVec, this.mLights.getLightAt(1).getPosition(), station.getXform().getPosition());
        vec2.rotate(stationLightVec, stationLightVec, -0.0035);
        vec2.add(stationLightVec, station.getXform().getPosition(), stationLightVec);
        this.mLights.getLightAt(1).set2DPosition(stationLightVec);
        var dirToStation = [];
        vec2.subtract(dirToStation, station.getXform().getPosition(), this.mLights.getLightAt(1).getPosition());
        this.mLights.getLightAt(1).setDirection([dirToStation[0], dirToStation[1], 0]);
        this._lightControl();
    }
    
    this.mEnemyPointer.getXform().setPosition(this.mHeroSet.getObjectAt(0).getXform().getXPos(), this.mHeroSet.getObjectAt(0).getXform().getYPos());
    var nearestEnemy = 0;
    var nearestEnemyDistance = vec2.distance(this.mHeroSet.getObjectAt(0).getXform().getPosition(), this.mAllEnemies.getObjectAt(0).getXform().getPosition());
    for (i = 1; i < this.mAllEnemies.size(); i++) {
        var temp = vec2.distance(this.mHeroSet.getObjectAt(0).getXform().getPosition(), this.mAllEnemies.getObjectAt(i).getXform().getPosition());
        if (temp < nearestEnemyDistance) {
            nearestEnemy = i;
            nearestEnemyDistance = temp;
        }
    }
    this.mEnemyPointer.rotateObjPointTo(this.mAllEnemies.getObjectAt(nearestEnemy).getXform().getPosition(), 1);
    
    this.mStatsHealthBar.getXform().setHeight(this.mHeroSet.getObjectAt(0).getHealth() * 10);
    this.mStatsHealthBar.getXform().setYPos(this.mCameraStats.getWCCenter()[1] - (this.mCameraStats.getWCHeight() / 2) + (this.mStatsHealthBar.getXform().getHeight() / 2) + 200);
    if (this.mStatsHealthBar.getXform().getHeight() === 1000)
        this.mStatsHealthText.setText((this.mStatsHealthBar.getXform().getHeight() / 1000 * 100).toPrecision(3) + "%");
    else if (this.mStatsHealthBar.getXform().getHeight() < 100)
        this.mStatsHealthText.setText((this.mStatsHealthBar.getXform().getHeight() / 1000 * 100).toPrecision(1) + "%");
    else
        this.mStatsHealthText.setText((this.mStatsHealthBar.getXform().getHeight() / 1000 * 100).toPrecision(2) + "%");
    
    this.mStatsShieldBar.getXform().setHeight((this.mHeroSet.size() - 1) * 200);
    this.mStatsShieldBar.getXform().setYPos(this.mCameraStats.getWCCenter()[1] - (this.mCameraStats.getWCHeight() / 2) + (this.mStatsShieldBar.getXform().getHeight() / 2) + 200);
    if (this.mStatsShieldBar.getXform().getHeight() === 1000)
        this.mStatsShieldText.setText((this.mStatsShieldBar.getXform().getHeight() / 1000 * 100).toPrecision(3) + "%");
    else if (this.mStatsShieldBar.getXform().getHeight() < 100)
        this.mStatsShieldText.setText((this.mStatsShieldBar.getXform().getHeight() / 1000 * 100).toPrecision(1) + "%");
    else
        this.mStatsShieldText.setText((this.mStatsShieldBar.getXform().getHeight() / 1000 * 100).toPrecision(2) + "%");
    
    if (this.mAllEnemies.getObjectAt(0).hasExpired())
        this.mStatsEnemies.setText("Enemies: " + (this.mAllEnemies.size() - 1));
    else
        this.mStatsEnemies.setText("Enemies: " + this.mAllEnemies.size());
    
    this.mStatsScore.setText("Score: " + score);
    
    this.mStatsWeaponTriple.setColor([1.0, 0.0, 0.0, 1.0]);
    for (i = 0; i < this.mHeroSet.getObjectAt(0).getPowerUps().size(); i++) {
        if (this.mHeroSet.getObjectAt(0).getPowerUps().getObjectAt(i) instanceof PowerUp_WeaponTriple) {
            this.mStatsWeaponTriple.setColor([0.0, 1.0, 0.0, 1.0]);
            break;
        }     
    }
    
    //this.mHeroSet.getObjectAt(1).getXform().setPosition(this.mHeroSet.getObjectAt(0).getXform().getXPos(), this.mHeroSet.getObjectAt(0).getXform().getYPos());
    //this.mHeroSet.getObjectAt(1).update();
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.F)) {
        this.mFPS = !this.mFPS;
	this.mFPSRefresh = 60;
    }
    
    // Added debug message for cordinates of selected object positionj // remove before final game
    var textHeightPerCamera = this.mCamera.getWCHeight() * 0.035;
    var msgXPos = (this.mCamera.getWCCenter()[0]) - this.mCamera.getWCWidth() / 2 + textHeightPerCamera; 
    var msgYPos = (this.mCamera.getWCCenter()[1]) - this.mCamera.getWCHeight() / 2 + textHeightPerCamera;
    this.mMsg.getXform().setPosition(msgXPos, msgYPos);
    this.mMsg.setTextHeight(textHeightPerCamera);
    
    if (this.mFPS) {
	this.mFPSRefresh++;
	if (this.mFPSRefresh >= 10) {
	    this.mMsg.setText(gEngine.GameLoop.fps());
	    this.mFPSRefresh = 0;
	}
    }
    else {
        this.mMsg.setText("");
    }
};
