/*
 * File: LandLevel.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, Hero, Camera, SceneFileParser, FontRenderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function LandLevel(level) {
    //sounds
    this.kBgClip = "assets/sounds/bg.wav";
    this.kPlaneShoot = "assets/sounds/planeshoot.wav";
    this.kTurretShoot = "assets/sounds/turretshoot.wav";
    this.kHeroSprite = "assets/hero_sprite.png";
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kPlane = "assets/plane.png";
    this.kBullet = "assets/bullet.png";
    this.kCarrierSprite = "assets/carrier.png";
    this.kCarrierNormal = "assets/carriernormal.png";
    this.kPlatform = "assets/platform.png";
    this.kPlatformNormal = "assets/platform_normal.png";
    this.kWall = "assets/wall.png";
    this.kWallNormal = "assets/wall_normal.png";
    this.kParticle = "assets/EMPPulse.png";
    this.kSmoke = "assets/smoke_sprite.png";
    this.kDoorTop = "assets/DoorInterior_Top.png";
    this.kDoorBot = "assets/DoorInterior_Bottom.png";
    this.kDoorSleeve = "assets/DoorFrame_AnimSheet.png";
    this.kButton = "assets/DoorFrame_Button_180x100.png";
    this.kProjectileTexture = "assets/EMPPulse.png";
    this.kTurret = "assets/turret_sprite.png";
    this.kFlash = "assets/shot.png";
    this.kWayPoint = "assets/waypoint.png";
    this.kCrossHair = "assets/crosshair.png";
    this.mEPlane = null;
    this.mSpawnCounter = null;
    // specifics to the level
    this.mEnemyList = null;
    this.mPlaneList = null;
    this.kRadar = "assets/radar.png";
    this.kLevelFile = "assets/" + level + "/" + level + ".xml";  // e.g., assets/Level1/Level1.xml
    this.kBg = "assets/" + level + "/bg.png";
    this.kLandBg = "assets/" + level + "/landbg.png";
    this.kBgNormal = "assets/" + level + "/bg_normal.png";
    this.kBgLayer = "assets/" + level + "/bgLayer.png";
    this.kBgLayerNormal = "assets/" + level + "/bgLayer_normal.png";
    this.mBg = null;
    this.mLandBg = null;
    this.mRadar = null;
    this.waypoint = null;
    this.mMsg = null;
    this.kLevelFinishedPosition = 65;

    this.flashTimer = null;

    // The camera to view the scene
    this.mCamera = null;
    this.mPeekCam = null;
    this.mShowPeek = false;

    this.mMsg = null;
    this.mMatMsg = null;

    // the hero and the support objects
    this.mHero = null;
    this.mIllumHero = null;

    this.mCarrier = null;

    this.mTurret1 = null;
    this.mTurret2 = null;
    this.mTurret3 = null;
    this.mTurret4 = null;
    this.mTurret5 = null;
    this.mTurret6 = null;
    this.mTurret7 = null;
    this.mTurret8 = null;


    this.mWayActive = null;
    this.mPlane = null;

    this.mSmoke = null;
    this.mBullet = null;

    this.mGlobalLightSet = null;

    this.mThisLevel = level;
    this.mNextLevel = null;
    this.mRestart = false;

    this.mLgtIndex = 2;
    this.mLgtRotateTheta = 0;

    this.mPointLight = null;
    //this.mSpotLight1 = null;
    //this.mSpotLight2 = null;

    this.mAllWalls = new GameObjectSet();
    this.mAllPlatforms = new GameObjectSet();
    this.mAllButtons = new GameObjectSet();
    this.mAllDoors = new GameObjectSet();
    this.mAllMinions = new GameObjectSet();
    this.mAllParticles = new ParticleGameObjectSet();
}
gEngine.Core.inheritPrototype(LandLevel, Scene);

LandLevel.prototype.loadScene = function () {

    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.AudioClips.loadAudio(this.kPlaneShoot);
    gEngine.AudioClips.loadAudio(this.kTurretShoot);

    gEngine.TextFileLoader.loadTextFile(this.kLevelFile, gEngine.TextFileLoader.eTextFileType.eXMLFile);
    gEngine.Textures.loadTexture(this.kWayPoint);
    gEngine.Textures.loadTexture(this.kCrossHair);
    gEngine.Textures.loadTexture(this.kBullet);
    gEngine.Textures.loadTexture(this.kCarrierSprite);
    gEngine.Textures.loadTexture(this.kCarrierNormal);
    gEngine.Textures.loadTexture(this.kFlash);
    gEngine.Textures.loadTexture(this.kSmoke);
    gEngine.Textures.loadTexture(this.kTurret);
    gEngine.Textures.loadTexture(this.kPlane);
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kLandBg);
    gEngine.Textures.loadTexture(this.kRadar);
    //gEngine.Textures.loadTexture(this.mBg);

};
LandLevel.prototype.unloadScene = function () {
    gEngine.AudioClips.stopBackgroundAudio();

    gEngine.LayerManager.cleanUp();
    gEngine.TextFileLoader.unloadTextFile(this.kLevelFile);
    gEngine.Textures.unloadTexture(this.kWayPoint);
    gEngine.Textures.unloadTexture(this.kCrossHair);
    gEngine.Textures.unloadTexture(this.kBullet);
    gEngine.Textures.unloadTexture(this.kCarrierSprite);
    gEngine.Textures.unloadTexture(this.kCarrierNormal);
    gEngine.Textures.unloadTexture(this.kFlash);
    gEngine.Textures.unloadTexture(this.kSmoke);
    gEngine.Textures.unloadTexture(this.kTurret);
    gEngine.Textures.unloadTexture(this.kPlane);
    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kLandBg);
    gEngine.Textures.unloadTexture(this.kRadar);
    //var nextLevel = new GameOver();  // next level to be loaded
    gEngine.Core.startScene(this.mNextLevel);

};

LandLevel.prototype.initialize = function () {
    gEngine.AudioClips.playBackgroundAudio(this.kBgClip);

    this.mSpawnCounter = 0;
    // set ambient lighting
    //gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1]);
    // gEngine.DefaultResources.setGlobalAmbientIntensity(0.2);
    this.waypoint = [];
    this.mEnemyList = [];
    // parse the entire scene
    var parser = new SceneFileParser(this.kLevelFile);
    //this.mCamera = parser.parseCamera();
    this.mCamera = new Camera(
            [22.5, 12],
            30,
            [0, 0, 720, 512]
            );
    //this.mCamera.setWCWidth(10); 
    this.mGlobalLightSet = parser.parseLights();

    this.flashTimer = .01;

    this.mCarrier = new Carrier(this.kCarrierSprite, 10, 14, this.mGlobalLightSet, this.kCarrierNormal);

    this.mPointLight = new Light();
    // this.mTheLight.setRadius(8);
    this.mPointLight.setIntensity(0.5);
    this.mPointLight.setColor([1, 1, 1, 1]);

    /*
     this.mSpotLight1 = new Light();
     this.mSpotLight1.setIntensity(0.5);
     this.mSpotLight1.setLightType(2);
     this.mSpotLight1.setDirection([-5, 1, -1]);
     this.mSpotLight1.setColor([1, 1, 1, 1]);
     
     
     this.mSpotLight2 = new Light();
     this.mSpotLight2.setIntensity(0.5);
     this.mSpotLight2.setLightType(2);
     this.mSpotLight2.setDirection([-5, 1, -1]);
     this.mSpotLight2.setColor([1, 1, 1, 1]);
     */

    this.mDirectionLight = new Light();
    this.mDirectionLight.setLightType(1);
    this.mDirectionLight.setIntensity(0.15);
    this.mDirectionLight.setColor([1, 1, 1, 1]);


    this.mGlobalLightSet.addToSet(this.mPointLight);
    //this.mGlobalLightSet.addToSet(this.mSpotLight1);
    //this.mGlobalLightSet.addToSet(this.mSpotLight2);
    //this.mGlobalLightSet.
    //UNCOMMENT LATER!!!
    this.mCarrier.getRenderable().addLight(this.mPointLight);



    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    var bgR = new LightRenderable(this.kBg);
    bgR.getXform().setSize(36.56, 26);
    bgR.getXform().setPosition(20, 12);
    bgR.addLight(this.mPointLight);
    bgR.addLight(this.mDirectionLight);


    var bgL = new LightRenderable(this.kLandBg);
    bgL.getXform().setSize(18, 22);
    bgL.getXform().setPosition(29, 12);
    bgL.addLight(this.mPointLight);
    bgL.addLight(this.mDirectionLight);
    this.mLandBg = new GameObject(bgL);


    var randomX = Math.random() * (21.5 - 7) + 7;
    var randomY = Math.random() * (21 - 1) + 1;
    //document.write(randomNum.toPrecision(1));
    //this.mSmoke = new Smoke(this.kSmoke, randomX, randomY); 



    this.mAce = new Plane(this.kPlane, this.mCarrier.getXform().getXPos(), this.mCarrier.getXform().getYPos() + 4,
            this.mGlobalLightSet, this.mCarrier.getXform(), this.mEnemyList, this.waypoint);

    this.mPlane1 = new Plane(this.kPlane, this.mCarrier.getXform().getXPos() + 4, this.mCarrier.getXform().getYPos(),
            this.mGlobalLightSet, this.mCarrier.getXform(), this.mEnemyList, this.waypoint);

    this.mPlane2 = new Plane(this.kPlane, this.mCarrier.getXform().getXPos() - 4, this.mCarrier.getXform().getYPos(),
            this.mGlobalLightSet, this.mCarrier.getXform(), this.mEnemyList, this.waypoint);

    this.mPlane3 = new Plane(this.kPlane, this.mCarrier.getXform().getXPos(), this.mCarrier.getXform().getYPos() - 4,
            this.mGlobalLightSet, this.mCarrier.getXform(), this.mEnemyList, this.waypoint);
    this.mPlaneList = [];
    this.mPlaneList.push(this.mAce);
    this.mPlaneList.push(this.mCarrier);
    this.mPlaneList.push(this.mPlane1);
    this.mPlaneList.push(this.mPlane2);
    this.mPlaneList.push(this.mPlane3);

    for (var i = 0; i < this.mPlaneList.length; i++) {
        this.mPlaneList[i].getRenderable().addLight(this.mPointLight);
    }

    // this.mEnemy = new Plane(this.kPlane, this.mCarrier.getXform().getXPos(), this.mCarrier.getXform().getYPos() + 4, 
    //   this.mGlobalLightSet, null, this.mPlaneList, this.waypoint); 



    this.mNextLevel = parser.parseNextLevel();
    this.mTurret1 = new Turret(this.kTurret, 25, 15, this.mGlobalLightSet, this.mPlaneList, bgR, bgL, this.mCarrier.getRenderable());
    this.mTurret2 = new Turret(this.kTurret, 25, 10, this.mGlobalLightSet, this.mPlaneList, bgR, bgL, this.mCarrier.getRenderable());
    this.mTurret3 = new Turret(this.kTurret, 25, 5, this.mGlobalLightSet, this.mPlaneList, bgR, bgL, this.mCarrier.getRenderable());
    this.mTurret4 = new Turret(this.kTurret, 25, 20, this.mGlobalLightSet, this.mPlaneList, bgR, bgL, this.mCarrier.getRenderable());
    this.mTurret5 = new Turret(this.kTurret, 33, 20, this.mGlobalLightSet, this.mPlaneList, bgR, bgL, this.mCarrier.getRenderable());
    this.mTurret6 = new Turret(this.kTurret, 33, 18, this.mGlobalLightSet, this.mPlaneList, bgR, bgL, this.mCarrier.getRenderable());
    this.mTurret7 = new Turret(this.kTurret, 33, 5, this.mGlobalLightSet, this.mPlaneList, bgR, bgL, this.mCarrier.getRenderable());
    this.mTurret8 = new Turret(this.kTurret, 33, 7, this.mGlobalLightSet, this.mPlaneList, bgR, bgL, this.mCarrier.getRenderable());

    this.mBg = new GameObject(bgR);
    this.mEnemyList.push(this.mTurret1);
    this.mEnemyList.push(this.mTurret2);
    this.mEnemyList.push(this.mTurret3);
    this.mEnemyList.push(this.mTurret4);
    this.mEnemyList.push(this.mTurret5);
    this.mEnemyList.push(this.mTurret6);
    this.mEnemyList.push(this.mTurret7);
    this.mEnemyList.push(this.mTurret8);



    //  this.mEnemyList.push(this.mEnemy);


    this.mWayPoint = new WayPoint(this.kCrossHair, 0, 0);

    // Add hero into the layer manager and as shadow caster
    // Hero should be added into Actor layer last
    // Hero can only be added as shadow caster after background is created

    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mCarrier);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mTurret1);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mTurret2);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mTurret3);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mTurret4);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mTurret5);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mTurret6);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mTurret7);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mTurret8);



    // gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mSmoke);

    //gEngine.LayerManager.addAsShadowCaster(this.mCarrier);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.miniMap, this.mCarrier.mMiniMapRenderable);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.miniMap, this.mTurret1.mMiniMapRenderable);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.miniMap, this.mTurret2.mMiniMapRenderable);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.miniMap, this.mTurret3.mMiniMapRenderable);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.miniMap, this.mTurret4.mMiniMapRenderable);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.miniMap, this.mTurret5.mMiniMapRenderable);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.miniMap, this.mTurret6.mMiniMapRenderable);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.miniMap, this.mTurret7.mMiniMapRenderable);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.miniMap, this.mTurret8.mMiniMapRenderable);


    gEngine.LayerManager.addToLayer(gEngine.eLayer.miniMap, this.mAce.mMiniMapRenderable);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.miniMap, this.mPlane1.mMiniMapRenderable);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.miniMap, this.mPlane2.mMiniMapRenderable);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.miniMap, this.mPlane3.mMiniMapRenderable);
    //  gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mEnemy);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mAce);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mPlane1);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mPlane2);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mPlane3);
    this.mPeekCam = new Camera(
            vec2.fromValues(22.5, 12),
            64,
            [0, 0, 320, 180],
            2
            );

    this.mShowPeek = false;

    this.mMsg = new FontRenderable("");
    this.mMsg.setColor([1, 1, 1, 1]);

};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
LandLevel.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    this.mBg.draw(this.mCamera);
    this.mLandBg.draw(this.mCamera);
    gEngine.LayerManager.drawAllLayers(this.mCamera);
    // setTimeout(this.mSmoke.draw(this.mCamera), 5000); 
    //this.mSmoke.draw(this.mCamera); 

    // this.mCarrier.draw(this.mCamera); 

    this.mAllParticles.draw(this.mCamera);

    // this.mMsg.draw(this.mCamera);   // only draw status in the main camera

    this.mPeekCam.setBackgroundColor([0, 0, 0, 1]);

    if (this.mShowPeek) {
        this.mPeekCam.setupViewProjection();
        var miniMapBg = new SpriteRenderable(this.kRadar);
        miniMapBg.getXform().setSize(85, 76);
        miniMapBg.getXform().setPosition(22, 12);
        this.mRadar = new GameObject(miniMapBg);
        this.mRadar.draw(this.mPeekCam);
        gEngine.LayerManager.drawLayer(gEngine.eLayer.miniMap, this.mPeekCam);
    }
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
LandLevel.prototype.update = function () {
    this.mSpawnCounter++;

    if (this.mSpawnCounter % 400 === 0 && this.mPlaneList.length < 10) {
        //this.mSpawnCounter = 0;
        this.mNewPlane = new Plane(this.kPlane, this.mCarrier.getXform().getXPos() + 4, this.mCarrier.getXform().getYPos(),
                this.mGlobalLightSet, this.mCarrier.getXform(), this.mEnemyList, this.waypoint);
        gEngine.LayerManager.addToLayer(gEngine.eLayer.miniMap, this.mNewPlane.mMiniMapRenderable);
        gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mNewPlane);
        this.mPlaneList.push(this.mNewPlane);
        this.mNewPlane.getRenderable().addLight(this.mPointLight);

    }
    /*
     if (this.mSpawnCounter % 1500 === 0) {
     for (var i = 0; i < 4; i++) {
     
     this.mEnemy = new Plane(this.kPlane, this.mBg.getXform().getXPos() + .5 * this.mBg.getXform().getWidth(), this.mBg.getXform().getYPos() + .5 * this.mBg.getXform().getHeight() + i,
     this.mGlobalLightSet, null, this.mPlaneList, this.waypoint);
     gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mEnemy);
     this.mEnemyList.push(this.mEnemy);
     //this.flashTimer = .01;
     this.mDirectionLight.setColor([1, .01, .01, 1]);
     //this.flash();
     }
     }
     
     else if (this.mSpawnCounter % 1200 == 0) {
     this.mDirectionLight.setColor([1, 1, 1, 1]);
     
     } */
    this.mCamera.update();  // to ensure proper interpolated movement effects
    //var randomX = Math.random() * (21.5 - 7) + 7; 
    //var randomY = Math.random() * (21 - 1) + 1; 
    //this.mSmoke.getXform().setPosition(randomX, randomY); 
    //window.setTimeout(this.mSmoke.update(), 300000); 
    gEngine.LayerManager.updateAllLayers();

    var xf = this.mCarrier.getXform();
    //awthis.mCamera.setWCCenter(xf.getXPos(), 8);
    var p = vec2.clone(xf.getPosition());
    //p[0] -= 8;
    //this.mGlobalLightSet.getLightAt(this.mLgtIndex).set2DPosition(p);

    // this.mPointLight.setZPos(20);
    this.mPointLight.setXPos(this.mCarrier.getXform().getXPos());
    this.mPointLight.setYPos(this.mCarrier.getXform().getYPos());
    //this.mPointLight.setOuter(0.01);
    //this.mPointLight.setInner(0.01);
    this.mPointLight.setNear(2);
    this.mPointLight.setFar(7);

    if (this.mShowPeek) {
        this.mPeekCam.setWCCenter(p[0], p[1]);
        this.mPeekCam.update();
    }

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.P)) {
        this.mShowPeek = !this.mShowPeek;
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        for (var i = 0; i < this.mPlaneList.length; i++) {
            if (this.mPlaneList[i].isPlane()) {
                this.mPlaneList[i].prepDestruction();
                while (this.mPlaneList[i].getWaypoint().length > 0) {
                    gEngine.LayerManager.removeFromLayer(gEngine.eLayer.eActors, this.mPlaneList[i].getWaypoint().pop());
                    // this.mPlaneList[i].getWaypoint().shift(); 
                    //this.waypoint.shift();
                }
            }
        }
    }

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.C)) {
        //this.mPlane.panTo(this.mPlane.getXform().getXPos(), this.mPlane.getXform().getYPos());
    }


    //var CarrierHealth = this.mCarrier.getHealth();
    if (this.mCarrier.getHealth().getXform().getWidth() < 0) {
        this.mNextLevel = new GameOver();
        gEngine.GameLoop.stop();
    }

    for (var i = 0; i < this.mPlaneList.length; i++) {
        if (this.mPlaneList[i].didShoot()) {
            gEngine.AudioClips.playACue(this.kPlaneShoot);
        }
        if (this.mPlaneList[i].getHealth() < 0) {
            this.mPlaneList[i].prepDestruction();
            gEngine.LayerManager.removeFromLayer(gEngine.eLayer.eActors, this.mPlaneList[i]);
            gEngine.LayerManager.removeFromLayer(gEngine.eLayer.miniMap, this.mPlaneList[i].getMiniMapRenderable());
            this.mPlaneList.splice(i, 1);
        }
    }

    if (this.mPlaneList.length == 1) {
        this.mNextLevel = new GameOver();
        gEngine.GameLoop.stop();
    }


    for (var i = 0; i < this.mEnemyList.length; i++) {

        if (this.mEnemyList[i].didShoot()) {
            gEngine.AudioClips.playACue(this.kTurretShoot);
        }
        if (this.mEnemyList[i].getHealth() < 0) {
            this.mEnemyList[i].prepDestruction();
            this.mEnemyList[i].getLight().setIntensity(0);
            gEngine.LayerManager.removeFromLayer(gEngine.eLayer.eActors, this.mEnemyList[i]);
            gEngine.LayerManager.removeFromLayer(gEngine.eLayer.miniMap, this.mEnemyList[i].getMiniMapRenderable());
            this.mEnemyList.splice(i, 1);
        }
    }

    if (this.mEnemyList.length == 0) {
        this.mNextLevel = new Win();
        gEngine.GameLoop.stop();
    }

    //check collision with carrier and land
    var h = [];
    if (this.mCarrier.getBBox().intersectsBound(this.mLandBg.getBBox())) {
        if (this.mCarrier.pixelTouches(this.mLandBg, h)) {
            this.mCarrier.getXform().incXPosBy(-0.1);

        }
    }

    // //make sure zone for clampatboundary for hero is more than panWith
    //if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {

    //this.mCamera.panTo(this.mCarrier.getXform().getXPos(), this.mCarrier.getXform().getYPos());
    //}
    this.mCamera.clampAtBoundary(this.mCarrier.getXform(), 0.99);
    //this.mCamera.panTo(this.mPlaneList[0].getXform(), 0.9);

    var msg = " ";

    //msg += "Plane Position: " + this.mPlaneList[0].getXform().getXPos().toPrecision(3) + " " + this.mPlaneList[0].getXform().getYPos().toPrecision(3) + "   "; 
    var camX = this.mCamera.getWCCenter()[0];
    var camY = this.mCamera.getWCCenter()[1];
    var camW = this.mCamera.getWCWidth();
    var camH = this.mCamera.getWCHeight();
    var minX = camX - camW / 2;
    var minY = camY - camH / 2;
    var curX = gEngine.Input.getMousePosX();
    var curY = gEngine.Input.getMousePosY();
    var xRatio = gEngine.Input.getMousePosX() / 720;
    var yRatio = gEngine.Input.getMousePosY() / 512;
    var mouseX = xRatio * camW + minX;
    var mouseY = yRatio * camH + minY;
    if (gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)) {
        //var way = new WayPoint(this.kWayPoint, mouseX, mouseY)
        //this.waypoint.push(way);
        //gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, way);
        var way = new WayPoint(this.kWayPoint, mouseX, mouseY);
        for (var i = 0; i < this.mPlaneList.length; i++) {
            if (this.mPlaneList[i].isPlane()) {
                this.mPlaneList[i].pushWaypoint(way);
                gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, way);
            }
        }

    }
    //this.mCamera.zoomBy(1);
    //msg += "Camera: " + this.mCamera.getWCCenter()[0] + " " + this.mCamera.getWCCenter()[1] + "   "; 
    //msg += "Carrier Position: " + this.mCarrier.getXform().getXPos().toPrecision(3) + " " + this.mCarrier.getXform().getYPos().toPrecision(3);
    //msg += "Mouse Position:" + gEngine.Input.getMousePosX() + " " + gEngine.Input.getMousePosY() + " " + xRatio + " " + yRatio;
    //msg += "Mouse Position:" + mouseX.toPrecision(3) + " " + mouseY.toPrecision(3);
    // this.mCarrier.getXform().setSize(10,10); 
    msg += "Planelist length:" + this.mPlaneList.length; 
    this.mMsg.setText(msg);
    //this.mMsg.getXform().setSize(.5,.25);

    this.mMsg.getXform().setPosition(this.mCamera.getWCCenter()[0] - this.mCamera.getWCWidth() / 2 + this.mCamera.getWCHeight() * 0.04,
            this.mCamera.getWCCenter()[1] - this.mCamera.getWCHeight() / 2 + this.mCamera.getWCHeight() * 0.04 + 2);

    var WCwidth = this.mCamera.getWCWidth();
    var WCheight = this.mCamera.getWCHeight();
    this.mMsg.setTextHeight(WCheight * 0.02);
};

LandLevel.prototype.flash = function () {
    var color = this.mDirectionLight.getColor();
    if (this.flashTimer < 0) {
        if (color[2] > 0) {
            this.mDirectionLight.setColor(color[0], color[1] + this.flashTimer, color[2] + this.flashTimer, 1);
        }
        else {
            this.flashTimer = 0;
            this.mDirectionLight.setColor(1, 1, 1, 1);
        }
    }
    else if (this.flashTimer > 0) {
        if (color[2] < .7) {
            this.mDirectionLight.setColor(color[0], color[1] + this.flashTimer, color[2] + this.flashTimer, 1);
        }
        else {
            this.flashTimer * -1;
        }
    }
}

