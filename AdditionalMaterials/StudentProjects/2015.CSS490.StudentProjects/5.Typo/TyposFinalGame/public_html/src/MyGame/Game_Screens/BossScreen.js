/* File: 		BossScreen.js
 * Author:      	Michael Voght, Ryu Muthui
 * Last Date Modified: 	12/15/2015
 * Description:		Creates and initializes the Boss Screen and its logic */
"use strict";

function BossScreen() {
    // audio clips: supports both mp3 and wav formats
    this.kBossScreenBGM = "assets/Audio/Music/BossScreen_BGM.mp3";
    this.kLaserFire = "assets/Audio/SFX/Laser_Fire04.wav";
    this.kStarFighter_HitSFX = "assets/Audio/SFX/SmallExplosion_SFX.mp3";
    this.kLargeExplosionSFX = "assets/Audio/SFX/BigExplosion_SFX.wav";
    this.kTurretFireSFX = "assets/Audio/SFX/Laser_Fire03.wav";
    this.kBg = "assets/BossBG.png";
    this.kStarfighterSprite = "assets/Player_StarFighter.png";
    this.kEnemyBlade = "assets/Enemy/strip_saucer_blades.png";
    this.kProjectileTexture = "assets/particle.png";
    this.kBossTexture = "assets/Enemy_Boss.png";
    this.kBossNormalMap = "assets/Enemy_Boss_NormalMap.png";
    this.kHealthBar = "assets/BossHP_bar.png";
    this.kTurretSprite = "assets/Enemy/turret.png";
    this.kShield = "assets/Shield_Effect.png";
    this.kCurrentScreen = BossScreen;
    
    // The camera to view the scene
    this.mBg = null;
    this.mCamera = null;
    this.mNextScreen = null;
    this.mParticles = null;
    this.mLights = null;

    // the Starfighter and the support objects
    this.mStarFighter = null;
    this.mBoss = null;
    this.mBossHealthTube = null;
    
    // Projectile.js has already been read in ...
    Projectile.kTexture = this.kProjectileTexture;
    
    this.mExpired = null;
    this.mTransitionCounter = null;
}
gEngine.Core.inheritPrototype(BossScreen, Scene);

BossScreen.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kEnemyBlade);
    gEngine.Textures.loadTexture(this.kBossTexture);
    gEngine.Textures.loadTexture(this.kStarfighterSprite);
    gEngine.Textures.loadTexture(this.kBossNormalMap);
    gEngine.Textures.loadTexture(this.kProjectileTexture);
    gEngine.Textures.loadTexture(this.kHealthBar);
    gEngine.Textures.loadTexture(this.kTurretSprite);
    gEngine.Textures.loadTexture(this.kShield);
    gEngine.AudioClips.loadAudio(this.kBossScreenBGM);
    gEngine.AudioClips.loadAudio(this.kLaserFire);
    gEngine.AudioClips.loadAudio(this.kStarFighter_HitSFX);
    gEngine.AudioClips.loadAudio(this.kLargeExplosionSFX);
    gEngine.AudioClips.loadAudio(this.kTurretFireSFX);
};

BossScreen.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kEnemyBlade);
    gEngine.Textures.unloadTexture(this.kBossTexture);
    gEngine.Textures.unloadTexture(this.kStarfighterSprite);
    gEngine.Textures.unloadTexture(this.kBossNormalMap);
    gEngine.Textures.unloadTexture(this.kProjectileTexture);
    gEngine.Textures.unloadTexture(this.kHealthBar);
    gEngine.Textures.unloadTexture(this.kTurretSprite);
    gEngine.Textures.unloadTexture(this.kShield);
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.kBossScreenBGM);
    gEngine.AudioClips.unloadAudio(this.kLaserFire);
    gEngine.AudioClips.unloadAudio(this.kStarFighter_HitSFX);
    gEngine.AudioClips.unloadAudio(this.kLargeExplosionSFX);
    gEngine.AudioClips.unloadAudio(this.kTurretFireSFX);
    gEngine.Core.startScene(this.mNextScreen);
};

BossScreen.prototype.initialize = function() {
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);

    this._initializeLights();
    this.mBoss = new GameObjectSet();
    new Boss(this.kBossTexture, this.kBossNormalMap, this.mBoss, this.mLights);
    this.mBoss.getObjectAt(0).getRenderable().addLight(this.mLights.getLightAt(1));
    
    this.mStarFighter = new GameObjectSet();
    new StarFighter(this.kStarfighterSprite, this.mStarFighter);
    this.mStarFighter.getObjectAt(0).getXform().setPosition(0, 0);
    
    this.mCamera = new Camera(   
            vec2.fromValues(this.mStarFighter.getObjectAt(0).getXform().getXPos(), 
                this.mStarFighter.getObjectAt(0).getXform().getYPos() + 240),
            1200,
            [0, 0, 1000, 600]
    );
    
    this.mBossHealthTube = new TextureRenderable(this.kHealthBar);
    this.mBossHealthTube.getXform().setSize(1040, 33);
    this.mBossHealthTube.getXform().setPosition(this.mCamera.getWCCenter()[0],
        this.mCamera.getWCCenter()[1] + (this.mCamera.getWCHeight() / 2) -
        (this.mBossHealthTube.getXform().getHeight() / 2));
    
    var bgR = new LightRenderable(this.kBg);
    bgR.getXform().setSize(1440, 720);
    bgR.getXform().setPosition(0, 240);
    this.mBg = new GameObject(bgR);
    this.mBg.getRenderable().addLight(this.mLights.getLightAt(2));
    this.mBg.getRenderable().addLight(this.mLights.getLightAt(3));
    
    this.mParticles = new ParticleGameObjectSet();

    this.mExpired = false;
    this.mTransitionCounter = 0;
    gEngine.AudioClips.playBackgroundAudio(this.kBossScreenBGM);
};

BossScreen.prototype.drawCamera = function(camera) {
    camera.setupViewProjection();
    var i;
    this.mBg.draw(camera);
    for( i = 0; i < this.mBoss.size(); i++ ) {
        this.mBoss.getObjectAt(i).draw(camera);
    }
    this.mBossHealthTube.draw(camera);
    this.mBoss.getObjectAt(0).getProjectileLeftSet().draw(camera);
    this.mBoss.getObjectAt(0).getProjectileRightSet().draw(camera);
    
    for( i = 0; i < this.mStarFighter.size(); i++ ) {
        this.mStarFighter.getObjectAt(0).draw(camera);
    }
    this.mStarFighter.getObjectAt(0).getProjectileSet().draw(camera);
    this.mParticles.draw(camera);
};

BossScreen.prototype.draw = function() {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1]);
    this.drawCamera(this.mCamera);
};

BossScreen.prototype.update = function() {
    if(this.mStarFighter.getObjectAt(0).getHealth() <= 0) {
        gEngine.AudioClips.playACue(this.kStarFighter_HitSFX);
        this.mNextScreen = new GameOverScreen(this.kCurrentScreen);
    }

    if(this.mBoss.size() <= 2 && this.mBoss.getObjectAt(0).hasExpired()) {
        this.mExpired = true;
    }
    
    if (this.mExpired) {
        if (this.mTransitionCounter >= 240) {
            this.mNextScreen = new VictoryScreen("VictoryScreen");
        }
        this.mTransitionCounter++;
    }

    if(this.mNextScreen !== null) {
        gEngine.GameLoop.stop();
    }
    
    this.mStarFighter.getObjectAt(0).update(
            this.mBoss,
            gEngine.Input.keys.Space,
            0, 0, 0, 0, 
            gEngine.Input.keys.A,
            gEngine.Input.keys.D,
            this.mCamera,
            this.mParticles
    );
    
    this.mCamera.clampAtBoundary(this.mStarFighter.getObjectAt(0).getXform(), 0.9);

    if (this.mBoss.getObjectAt(0) !== undefined) {
        this.mBoss.getObjectAt(0).update(this.mStarFighter, this.mCamera, this.mParticles);
    }
    for( var i = 1; i < this.mBoss.size(); i++ ) {
        if (this.mBoss.getObjectAt(i) instanceof Enemy_Turret)
            this.mBoss.getObjectAt(i).update(this.mStarFighter, this.mCamera, this.mParticles);
        else
            this.mBoss.getObjectAt(i).update(this.mStarFighter.getObjectAt(0), this.mParticles, this.mCamera);
    }
    this.mParticles.update();
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Escape)){
        var exit = confirm("Are you sure you want to exit the game?");
        if (exit){ 
            this.mNextScreen = new TitleScreen("TitleScreen");
        } 
    }
};
