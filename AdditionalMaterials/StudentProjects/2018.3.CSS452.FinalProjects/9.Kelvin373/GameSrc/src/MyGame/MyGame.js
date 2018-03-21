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
    // Assets
    this.kProjectileTexture = "assets/particle.png";
    this.kSphereMinion = "assets/sphere_enemy.png";
    this.kHobbesSpriteSheet = "assets/hobbes.png";
    this.kPlatformTexture = "assets/platform.png";
    this.kSquirtGunShotSprite = "assets/squirtgunshot.png";
    this.kFloaterBossSprite = "assets/spacebot-violet.png";
    this.kFloaterBossSprite2 = "assets/spacebot-teal.png";
    this.kWaterBalloonSprite = "assets/Balloon.png";
    this.kBackground = "assets/background_circuits.png";
    this.kBackgroundNormal = "assets/background_circuits_normal.png";
    this.kBGM = "assets/sounds/kelvin_373_main_theme.ogg";
    this.kZapSFX = "assets/sounds/zap.ogg";
    this.kHurtSFX = "assets/sounds/hurt.ogg";
    // World Bounds
    this.mWorldBounds = null;

    // tile sprites
    this.kTile128 = "assets/tile128x128.png";
    this.kTile256 = "assets/tile256x256.png";
    this.kTile256x128 = "assets/tile256x128.png";
    
    // camera
    this.mCamera = null;
    this.requiredCam = null;
    this.requiredTimer = 1000;
    // Background
    this.mBG = null;

    this.mLevel = null;
    this.mGlobalLightSet = null;


    // objects
    this.mObjects = null;
    this.mMinions = null;
    this.mSquirtGunShots = null;
    this.mParticleSet = null;
    this.mHobbes = null;
    this.mHobbesHealthBar = null;
    this.mBoss = null;
    this.mBoss2 = null;
    this.mBossHealthBar = null;
    this.mBoss2HealthBar = null;

    // Next Scene to go to
    this.mNextScene = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function() {
    gEngine.Textures.loadTexture(this.kProjectileTexture);
    gEngine.Textures.loadTexture(this.kSphereMinion);
    gEngine.Textures.loadTexture(this.kHobbesSpriteSheet);
    gEngine.Textures.loadTexture(this.kPlatformTexture);
    gEngine.Textures.loadTexture(this.kSquirtGunShotSprite);
    gEngine.Textures.loadTexture(this.kWaterBalloonSprite);
    gEngine.Textures.loadTexture(this.kBackground);
    gEngine.Textures.loadTexture(this.kFloaterBossSprite);
    gEngine.Textures.loadTexture(this.kFloaterBossSprite2);
    gEngine.Textures.loadTexture(this.kBackgroundNormal);
    gEngine.Textures.loadTexture(this.kTile128);
    gEngine.Textures.loadTexture(this.kTile256);
    gEngine.Textures.loadTexture(this.kTile256x128);
    
    gEngine.AudioClips.loadAudio(this.kZapSFX);
    gEngine.AudioClips.loadAudio(this.kHurtSFX);
    gEngine.AudioClips.loadAudio(this.kBGM);
};

MyGame.prototype.unloadScene = function() {
    gEngine.Textures.unloadTexture(this.kProjectileTexture);
    gEngine.Textures.unloadTexture(this.kSphereMinion);
    gEngine.Textures.unloadTexture(this.kHobbesSpriteSheet);
    gEngine.Textures.unloadTexture(this.kPlatformTexture);
    gEngine.Textures.unloadTexture(this.kSquirtGunShotSprite);
    gEngine.Textures.unloadTexture(this.kWaterBalloonSprite);
    gEngine.Textures.unloadTexture(this.kBackground);
    gEngine.Textures.unloadTexture(this.kFloaterBossSprite);
    gEngine.Textures.unloadTexture(this.kFloaterBossSprite2);
    gEngine.Textures.unloadTexture(this.kBackgroundNormal);
    gEngine.Textures.unloadTexture(this.kTile128);
    gEngine.Textures.unloadTexture(this.kTile256);
    gEngine.Textures.unloadTexture(this.kTile256x128);
    
    gEngine.AudioClips.unloadAudio(this.kZapSFX);
    gEngine.AudioClips.unloadAudio(this.kHurtSFX);
    gEngine.AudioClips.unloadAudio(this.kBGM);
    gEngine.AudioClips.stopBackgroundAudio();
    
    gEngine.Core.startScene(this.mNextScene);
};

MyGame.prototype.initialize = function ()
{
    // BGM
    gEngine.AudioClips.playBackgroundAudio(this.kBGM);
    // Level
    this.mLevel = new BossLevel();

    this.mGlobalLightSet = this.mLevel.mLightSet;

    // World Bounds
    var centerPos = vec2.fromValues(this.mLevel.mCameraCenter[0], this.mLevel.mCameraCenter[1]);
    var width = 300;
    var height = 210;

    
    //this.requiredCam.setBackgroundColor([0, 0, 0, 1]);
    
    // camera
    this.mCamera = new Camera(
        centerPos, // position of the camera
        width,                     // width of camera
        [0, 0, 1000, 700]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0, 0, 0, 1]);

    this.mLevel.setActiveCamera(this.mCamera);

    // Hobbes
    this.mHobbes = new Hobbes(this.kHobbesSpriteSheet, this.mLevel.mPlayerSpawn[0], this.mLevel.mPlayerSpawn[1]);
    // Hobbes' health bar
    this.mHobbesHealthBar = new HealthBar(
        vec2.fromValues(-135, 60),
        2,
        20,
        "vertical",
        this.mHobbes
    );

    // Object set
    this.mObjects = new GameObjectSet();
    this.mParticleSet =  new GameObjectSet();

    // add all objects of the boss level to objects
    this.mObjects.appendSet(this.mLevel.mPlatforms);
    
    //initialize particle emitter set
    this.mParticleSet = new GameObjectSet();
    this.mObjects.addToSet(this.mHobbes);

    //Set to store enemies
    this.mMinions = new GameObjectSet();
    
    // Squirt gun shot set
    this.mSquirtGunShots = new GameObjectSet();
    
    //Initialize enemies
    var y = 70;
    var x = 10;
    
    //Initialize boss
    this.mBoss = new FloaterBoss(this.kFloaterBossSprite, 150, 135, 1);
    this.mBoss2 = new FloaterBoss(this.kFloaterBossSprite2, 135, 135, 3);
    this.mMinions.addToSet(this.mBoss);
    this.mMinions.addToSet(this.mBoss2);
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    // Boss health bars
    this.mBossHealthBar = new HealthBar(
        vec2.fromValues(0, 100),
        280,
        5,
        "horizontal",
        this.mBoss
    );
    this.mBoss2HealthBar = new HealthBar(
        vec2.fromValues(0, 90),
        280,
        5,
        "horizontal",
        this.mBoss2
    );
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    
    this.drawAll(this.mCamera);
    
    if(this.requiredTimer < 120){
        this.requiredCam.setupViewProjection();
        this.drawAll(this.requiredCam);
    }
};


MyGame.prototype.drawAll = function (camera){
    this.mLevel.mBackgroundRenderable.draw(camera);
    
    this.mObjects.draw(camera);
    this.mMinions.draw(camera);
    this.mSquirtGunShots.draw(camera);
    this.mParticleSet.draw(this.mCamera);
    // Health bars
    this.mHobbesHealthBar.draw(camera);
    this.mBossHealthBar.draw(camera);
    this.mBoss2HealthBar.draw(camera);
};

MyGame.prototype.update = function () {

    this.requiredTimer++;
    if(this.requiredTimer < 120){
        this.requiredCam.panTo(this.mHobbes.getXform().getXPos(), this.mHobbes.getXform().getYPos());
        //this.requiredCam.update();
    }
    
    this.mCamera.update();  // to ensure proper interpolated movement effects
    this.mLevel.update(this.mHobbes.mRen);
    

    
    if (this.mHobbes.update(
        this.mLevel.mPlatforms, this.mMinions, this.mSquirtGunShots,
        this.kSquirtGunShotSprite, this.kWaterBalloonSprite, this.kHurtSFX)) {
        this.mNextScene = new GameOver();
        gEngine.GameLoop.stop();   
    }

    this.mLevel.mTrackedLight.set2DPosition(this.mHobbes.getXform().getPosition());
    
    this.mMinions.update(this.mMinions,
        this.mCamera,
        this.mHobbes,
        this.kSphereMinion);
    
    
    this.mSquirtGunShots.update(this.mCamera);

    gEngine.Physics.processCollision(this.mObjects, []);
    
    // Destroy Spheres if hit by a shot
    for (var i = 0; i < this.mSquirtGunShots.size(); ++i) {
        var shot = this.mSquirtGunShots.getObjectAt(i);
        for (var j = 0; j < this.mMinions.size(); ++j) {
            var minion = this.mMinions.getObjectAt(j);
            if (shot.pixelTouches(minion, [])) {
                this.mSquirtGunShots.getObjectAt(i).processHit(this.mParticleSet,this.mMinions);

                // if hit the boss

                // Play sound effect
                gEngine.AudioClips.playACue(this.kZapSFX);

                if(minion instanceof FloaterBoss)
                {
                    // remove some HP
                    minion.registerDamage(3);
                    // if dead, then remove it from the set
                    if(minion.isDead()) {
                        this.bossCameraShake(minion);
                        this.requiredTimer = 0;                     
                        this.mMinions.removeFromSet(minion);
                        
                    }
                }
                else if(minion instanceof SphereMinion)
                {
                    this.mMinions.removeFromSet(minion);
                }
                this.mSquirtGunShots.removeFromSet(shot);
            }
        }
        // or if they collide with the bounding boxes of the world
        for(var j = 0; j < this.mLevel.mPlatforms.size(); j++)
        {
            var platform = this.mLevel.mPlatforms.getObjectAt(j);
            // check for a hit and remove the squirt gun shot if it was hit
            if(shot.pixelTouches(platform, []))
            {
                this.mSquirtGunShots.getObjectAt(i).processHit(this.mParticleSet,this.mMinions);
                this.mSquirtGunShots.removeFromSet(shot);
            }
        }
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Y))
    {
        this.mMinions = new GameObjectSet();
    }
    // Process
    if(this.mMinions.size() <= 0) {
        //this.mNextScene = new WinScreen();
        this.mNextScene = new Level2();
        gEngine.GameLoop.stop();
    }
    // If Hobbes goes out of the world bounds, game over
    if (this.mLevel.mWorldBounds.outsideBounds(this.mHobbes)) {
        this.mNextScene = new GameOver();
        gEngine.GameLoop.stop();
    }
        
    this.mParticleSet.update(this.mCamera);

    // Health bars
    this.mHobbesHealthBar.update(this.mCamera);
    this.mBossHealthBar.update(this.mCamera);
    this.mBoss2HealthBar.update(this.mCamera);
    if(this.requiredTimer < 120) {
        this.bossCameraShake(this.mHobbes);
    }
};

MyGame.prototype.bossCameraShake = function (minion) {
    var randX = Math.random() * 10;
    var randY = Math.random() * 10
    var lol = [0,0]
    var xf = minion.getXform();
    lol[0] += randX + xf.getXPos();
    lol[1] += randY + xf.getYPos();
    this.requiredCam = new Camera(
        lol, // position of the camera
        50,                     // width of camera
        [0, 0, 100, 70]         // viewport (orgX, orgY, width, height)
    );    
};
