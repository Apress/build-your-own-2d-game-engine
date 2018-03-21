/* 
 * File: MyGame_Initialize.js
 * By Steven Roberts and Tyler Green
 * 
 * Initializes the main game scene, where the bulk of the Cave Escape! Game takes place
 *  The Main camera holds the actual game.
 *  The Sensor camera is established far outside of game bounds to be used
 *      to display the next object being generated.
 */


//What to setup on game load
MainGameScene.prototype.initialize = function () {
   
    //It's a dark cave!
    gEngine.DefaultResources.setGlobalAmbientColor([0.2, 0.2, 0.2, 1]);
    
    //Establish the main Camera.
    //TODO: Change camera dimensions when we begin implementing other cameras
    this.mMainCamera = new Camera(
        vec2.fromValues(50, 50),    // position of the camera
        100,                        // width of camera
        [0, 0, 900, 600],          // viewport (orgX, orgY, width, height)
        2                           //bound
    );
    //If we see this, background load failed =(
    this.mMainCamera.setBackgroundColor([0.9, 0.9, 0.9, 1]);
    
    //Establish Sensor
    this.mSensorCamera = new Camera(
        vec2.fromValues(-100, 300),// position of the camera
        15,                        // width of camera
        [748, 447, 150, 150],       // viewport (orgX, orgY, width, height)
        2                           //bound
    );
    this.mSensorCamera.setBackgroundColor([0, 0, 0, 1]);
    this.mSensorCamera.configInterpolation(1, 1);   //make the camera snap.
    
    //Create reference objects for the Sensor Camera
    //Parameters: null target (second to last param)
    this.mBat = new Bat(this.kBatSprite, -120, 300, null, null);
    this.mBat.setSpeed(0);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mBat);
    
    this.mRock = new Rock(this.kRock, -140, 300, null, this.kRockNormalMap);
    this.mRock.setSpeed(0);
    this.mRock.setRate(0);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mRock);
    
    this.mFire = new Fire(this.kColumn, -160, 297.5, null, null, null);
    this.mFire.setSpeed(0);
    this.mFire.getXform().setHeight(10);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mFire);
    
    this.mDrone = new HealDrone(this.kDroneSprite, -180, 300, null, null, null);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mDrone);
    
    //Establish movement parameters for the camera
    this.mCamPanSpeed = this.kCamMaxSpeed;
    
    //Create Tiled Background, add to LayerManager for drawing
    //sloppy for now. TODO: Create js file for background?
    var bg = new IllumRenderable(this.kBg, this.kBgNormalMap);  
    this.mBg = new ParallaxGameObject(bg, 2, this.mMainCamera);
    this.mBg.getXform().setSize(80, 80);
    this.mBg.getXform().setYPos(-35);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eBackground, this.mBg);
    
    //Create Lifebar for use by hero
    this.mHealthBar = new HealthBar();    
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mHealthBar);
    
    //Create Objects, add them to LayerManager for drawing
    this.mHero = new Hero(this.kHeroSprite, this.mHealthBar, null, this.kGrunt); //null normal map    
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mHero);
    
    this.mEnemySet = new GameObjectSet(); //how does this get added to the layer manager?
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mEnemySet);
    
    //The lights!
    this.mLightCount = 0;
    this.mGlobalLightSet = new LightSet();
    this._initializeLights();
    
    //The player's score, based on distance traveled before dying    
    this.mGameScore = 0;
    
    //Initialize Generator-control variables
    this.mTimer = 0;
    this.mInterval = this.kInitInterval;
    this.mCountdown = this.kInitInterval;
    
    var center = this.mMainCamera.getWCCenter();
   
    //Changing FontRenderable that holds the actual Score number
    this.mScoreCountMsg = new FontRenderable();        
    this.mScoreCountMsg.setText("Score: " + this.mGameScore);
    this.mScoreCountMsg.setColor([1, 1, 1, 1]);    
    this.mScoreCountMsg.setTextHeight(3);    
    this.mScoreCountMsg.getXform().setPosition(center[0], center[1] + this.mMainCamera.getWCHeight()/2 - 2);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mScoreCountMsg);   
    //only for display, no special properties
    
    //start the bg audio
    gEngine.AudioClips.playBackgroundAudio(this.kBgMusic);
};