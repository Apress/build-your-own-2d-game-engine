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

function MyGame(carColor) {

    this.mCarColor = carColor;

    /* Textures */
    // find better car art
    // make the cars into a sprite sheet
    this.kRedCar = "assets/RedCar.png";
    this.kGreenCar = "assets/GreenCar.png";
    this.kPlatformTexture = "assets/platform.png";
    this.kWallTexture = "assets/wall.png";
    this.kTargetTexture = "assets/target.png";
    this.kGrass = "assets/Grass.png";
    this.kBall = "assets/Ball.png";
    this.kStands = "assets/stands.png"
    this.kSpectator = "assets/spectator.png"
    this.kBooster = "assets/Booster.png";
    this.kObstacle = "assets/platform.png";
    this.kThinWall = "assets/thinWall.png";
    this.kThinWallNorm = "assets/ThinWallNorm.png";

    /* Audio */
    this.kSong = "assets/In-House.wav";
    this.kPlayerGoal = "assets/PlayerGoal.wav";
    this.kEnemyGoal = "assets/EnemyGoal.wav";



    /* GameObjects */
    // HeroCar
    this.mHeroCar = null;

    // EnemyCar
    this.mEnemyCar = null;

    // Boosters on the field
    this.mBoosters = null;

    // Ball
    this.mBall = null;

    // Goal
    this.mGoals = [];

    // Obstacles
    this.mObstacles = null;

    // Field Boundaries
    this.mFieldBounds = [];

    // (Spectators)

    /* Cameras */
    // Main camera
    this.mCamera = null;
    this.mZoomCam = null;
    this.mMinimapCam = null;
    this.kViewType = null;

    // AllObjects Array for Physics Collisions
    this.mAllObjs = null;

    /* UI Components and FontRenderables */
    // Score
    this.mMsg = null;

    // Background (Field + Stands?)
    this.mBG = null;

    // Coordinate Systems
    this.kWCWidth = 200;
    this.kViewportWidth = 1200;
    this.kViewportHeight = 600;
    this.kWCHeight = this.kViewportHeight * (this.kWCWidth / this.kViewportWidth);

    this.kMaxScore = 7;

    // Timer
    this.t0 = 0;
    this.end = 0;
    // FontRenderable that displays how long the match has been running

    // Lighting (if we use more than 4, have to change the engine lighting files)
    // spotlight on the ball
    this.mBallLight = null;

    // headlights on the car
    this.mHeroHeadlights = null;
    this.mEnemyHeadlights = null;

    // directional light
    this.mDirectionalLight = null;

}
gEngine.Core.inheritPrototype(MyGame, Scene);


MyGame.prototype.loadScene = function (sceneParams) {
    // load the scene file
    // need to create this.kSceneFile; choose between JSON and XML
    // gEngine.TextFileLoader.loadTextFile(this.kSceneFile, gEngine.TextFileLoader.eTextFileType.eTextFile); // if textFile

    // Load Textures
    gEngine.Textures.loadTexture(this.kRedCar);
    gEngine.Textures.loadTexture(this.kGreenCar);
    gEngine.Textures.loadTexture(this.kPlatformTexture);
    gEngine.Textures.loadTexture(this.kWallTexture);
    gEngine.Textures.loadTexture(this.kTargetTexture);
    gEngine.Textures.loadTexture(this.kGrass);
    gEngine.Textures.loadTexture(this.kBall);
    gEngine.Textures.loadTexture(this.kObstacle);
    gEngine.Textures.loadTexture(this.kSpectator);
    gEngine.Textures.loadTexture(this.kStands);
    gEngine.Textures.loadTexture(this.kBooster);
    gEngine.Textures.loadTexture(this.kThinWall);
    gEngine.Textures.loadTexture(this.kThinWallNorm);

    // Load Audio
    gEngine.AudioClips.loadAudio(this.kSong);
    gEngine.AudioClips.loadAudio(this.kPlayerGoal);
    gEngine.AudioClips.loadAudio(this.kEnemyGoal);
};

MyGame.prototype.unloadScene = function () {
    // unload the Scene File
    // same this.kSceneFile as in loadScene
    // gEngine.TextFileLoader.unloadTextFile(this.kSceneFile);

    // Unload Textures
    gEngine.Textures.unloadTexture(this.kRedCar);
    gEngine.Textures.unloadTexture(this.kGreenCar);
    gEngine.Textures.unloadTexture(this.kPlatformTexture);
    gEngine.Textures.unloadTexture(this.kWallTexture);
    gEngine.Textures.unloadTexture(this.kTargetTexture);
    gEngine.Textures.unloadTexture(this.kGrass);
    gEngine.Textures.unloadTexture(this.kBall);
    gEngine.Textures.unloadTexture(this.kObstacle);
    gEngine.Textures.unloadTexture(this.kSpectator);
    gEngine.Textures.unloadTexture(this.kStands);
    gEngine.Textures.unloadTexture(this.kBooster);
    gEngine.Textures.unloadTexture(this.kThinWall);
    gEngine.Textures.unloadTexture(this.kThinWallNorm);

    // Stop Audio
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.kSong);
    gEngine.AudioClips.unloadAudio(this.kPlayerGoal);
    gEngine.AudioClips.unloadAudio(this.kEnemyGoal);

    var nextLevel = new WinLoss(this.mHeroCar.getScore(), this.mEnemyCar.getScore(), this.mHeroCar, this.mEnemyCar); // load next level, pass the score parameters here
    gEngine.Core.startScene(nextLevel);

};

MyGame.prototype.initialize = function () {

    this.mCamera = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        this.kWCWidth * 1.5,                     // width of camera
        [0, 0, this.kViewportWidth, this.kViewportHeight] // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

    // Zoomed camera with minimap setup
    this.mZoomCam = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        this.kWCWidth / 2,                     // width of camera
        [0, 0, this.kViewportWidth, this.kViewportHeight] // viewport (orgX, orgY, width, height)
    );
    this.mZoomCam.setBackgroundColor([0.8, 0.8, 0.8, 1]);

    this.mMinimapCam = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        this.kWCWidth,                     // width of camera
        [this.kViewportWidth / 3, 0, this.kViewportWidth / 3, this.kViewportHeight / 3] // viewport (orgX, orgY, width, height)
    );
    this.mMinimapCam.setBackgroundColor([1, 0, 1, 0]);

    this.kViewType = false;

            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);

    // Hero Car
    this.mHeroCar = new HeroCar(this.kRedCar);
    // Enemy Car
    this.mEnemyCar = new EnemyCar(this.kGreenCar);

    // Ball
    this.mBall = new Ball(this.kBall);

    // Goals
    this.mGoals[0] = new Goal(this.kRedCar, true); // left side of viewport // find a texture for this
    this.mGoals[1] = new Goal(this.kRedCar, false); // right side of viewport // find a texture for this

    // Obstacles
    this.mObstacles = new Obstacles(this.kObstacle, this.kWCWidth, this.kWCHeight);

    // Boosters
    this.mBoosters = new Boosters(this.kBooster, this.kWCWidth, this.kWCHeight);

    // AllObjs Array for Physics Collisions
    this.mAllObjs = new GameObjectSet();
    this.mAllObjs.addToSet(this.mHeroCar);
    this.mAllObjs.addToSet(this.mEnemyCar);
    this.mAllObjs.addToSet(this.mBall);

    this.mPlayerSpectators = new Spectators(this.kStands, this.kSpectator, [0,-65]);
    this.mPlayerSpectators.fillStands(30);

    this.mAISpectators = new Spectators(this.kStands, this.kSpectator, [0,65]);
    this.mAISpectators.fillStands(30);

    // define Lights before Bounds to add them to the Walls in this.createBounds();
    // Lights
    this.mBallLight = new BallLight();

    this.mHeroHeadlights = new Headlight();
    this.mEnemyHeadlights = new Headlight();

    this.mDirectionalLight = new BallLight();
    this.mDirectionalLight.getLight().setLightType(Light.eLightType.eDirectionalLight);
    this.mDirectionalLight.getLight().setIntensity(0.2);
    this.mDirectionalLight.getLight().setDirection([-0.5, -0.5, -1]);

    this.createBounds(); // needs the textures this.kThinWall, this.kThinWallNorm

    // Score Reporting Font Renderable
    this.mMsg = new FontRenderable("Score 0 - 0");
    this.mMsg.setColor([0, 0, 0, 1]);
    let textXForm = this.mMsg.getXform();
    this.mMsg.setTextHeight(3);
    textXForm.setPosition(0 - textXForm.getWidth()/2, 45);

    this.mBG = new LevelBackground(this.kGrass);

    // Add lights to Background
    this.mBG.getGrass().addLight(this.mBallLight.getLight());
    this.mBG.getGrass().addLight(this.mHeroHeadlights.getLight());
    this.mBG.getGrass().addLight(this.mEnemyHeadlights.getLight());
    this.mBG.getGrass().addLight(this.mDirectionalLight.getLight());

    // Add lights to Hero Car
    this.mHeroCar.getRenderable().addLight(this.mBallLight.getLight());
    this.mHeroCar.getRenderable().addLight(this.mEnemyHeadlights.getLight());

    // Add lights to Enemy Car
    this.mEnemyCar.getRenderable().addLight(this.mBallLight.getLight());
    this.mEnemyCar.getRenderable().addLight(this.mHeroHeadlights.getLight());


    // Start the background audio.
    gEngine.AudioClips.playBackgroundAudio(this.kSong);
};

MyGame.prototype._resetField = function () {
  this.mBall.getXform().setPosition(0, 0);
  this.mBall.getRigidBody().setVelocity(0, 0);
  this.mAllObjs.getObjectAt(1).getXform().setPosition(50, 0);
  this.mAllObjs.getObjectAt(1).getRigidBody().setVelocity(0, 0);
  this.mAllObjs.getObjectAt(0).getXform().setPosition(-50, 0);
  this.mAllObjs.getObjectAt(0).getRigidBody().setVelocity(0, 0);
}

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    let camToRender = this.kViewType ? this.mCamera : this.mZoomCam;

    camToRender.setupViewProjection(1);

    this.mBG.draw(camToRender); // draw Background first so everything else will be displayed over it
    this.mGoals[0].draw(camToRender);
    this.mGoals[1].draw(camToRender);
    this.mObstacles.draw(camToRender);
    this.mAllObjs.draw(camToRender);
    this.mMsg.draw(camToRender);
    this.mAISpectators.draw(camToRender);
    this.mPlayerSpectators.draw(camToRender);
    this.mBoosters.draw(camToRender);
    this.mHeroCar.drawBoosterInventory(camToRender);

    if (!this.kViewType) {
      this.mMinimapCam.setupViewProjection(0); // 0 makes it so the canvas is not cleared for the minimap portion
      this.mGoals[0].draw(this.mMinimapCam);
      this.mGoals[1].draw(this.mMinimapCam);
      this.mObstacles.draw(this.mMinimapCam);
      this.mAllObjs.draw(this.mMinimapCam);
      this.mBoosters.draw(this.mMinimapCam);
    }

};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {

    // update the car headlights
    this.mHeroHeadlights.update(this.mHeroCar.getXform());
    this.mEnemyHeadlights.update(this.mEnemyCar.getXform());

    // update the ball spotlight
    this.mBallLight.update(this.mBall.getXform());

    // Starting the timer.
    if (this.t0 === 0)
    {
        this.t0 = new Date();
    }

    if (this.mHeroCar.getScore() >= this.kMaxScore) {
        this.mEnemyCar.toggleDrawRigidShape();
        gEngine.GameLoop.stop();
    }

    if (this.mEnemyCar.getScore() >= this.kMaxScore) {
        this.mEnemyCar.toggleDrawRigidShape();
        gEngine.GameLoop.stop();
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.N)) {
        this.mEnemyCar.toggleDrawRigidShape();
        // test code for switching to win/loss scene
        gEngine.GameLoop.stop();
    }

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        this.mHeroCar.useBooster();
    }

    let shownCam = this.kViewType ? this.mCamera : this.mZoomCam;
    var mouseX = shownCam.mouseWCX();
    var mouseY = shownCam.mouseWCY();

    // Enemy car lunges towards the ball every second.
    if (this.millisecondsElapsed > 1000)
    {
        let ballXForm = this.mBall.getXform();
        // If the enemy car is near the ball, it uses more force.
        if (Math.abs(this.mAllObjs.getObjectAt(1).getXform().getXPos()- ballXForm.getXPos() < 20) &&
            Math.abs(this.mAllObjs.getObjectAt(1).getXform().getYPos()- ballXForm.getYPos() < 20))
        {
            this.movePlayer(ballXForm.getXPos(), ballXForm.getYPos(), 4, this.mAllObjs.getObjectAt(1));
        }
        else
        {
            this.movePlayer(ballXForm.getXPos(), ballXForm.getYPos(), 1, this.mAllObjs.getObjectAt(1));
        }
        // Resetting timer.
        this.millisecondsElapsed = 0;
        this.t0 = new Date();
        this.end  = 0;
    }

    // Left click to move player
    if (gEngine.Input.isButtonClicked(0)) {
        this.movePlayer(mouseX, mouseY, 2, this.mAllObjs.getObjectAt(0));
    }

    // Press P to test enemy movement
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.E)) {
        this.movePlayer(mouseX, mouseY, 4, this.mAllObjs.getObjectAt(1));
    }

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.V)) {
        this.kViewType = !this.kViewType;
    }

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.C)) {
      this.mPlayerSpectators.celebrate();
    }

    if (this.mBall.getBBox().intersectsBound(this.mGoals[0].getBBox())) {
        this.mEnemyCar.score();
        gEngine.AudioClips.playACue(this.kEnemyGoal);
        this._resetField();
        this.mAISpectators.celebrate();
    }

    if (this.mBall.getBBox().intersectsBound(this.mGoals[1].getBBox())) {
        this.mHeroCar.score();
        gEngine.AudioClips.playACue(this.kPlayerGoal);
        this._resetField();
        this.mPlayerSpectators.celebrate();
    }


    this.mObstacles.update(this.mHeroCar, this.mEnemyCar, this.mBall);

    this.mAllObjs.update(this.mCamera); // very important line!! Don't remove this

    this.mPlayerSpectators.update();
    this.mAISpectators.update();

    this.mHeroCar.boosterPos(shownCam); // moves Booster position to the correct position

    // Pixel_Collision is a requirement for the Game
    // so either change Obstacle collsion back to pixel_collision
    // or do pixel collision somewhere else
    this.mObstacles.collide(this.mBall);
    this.mObstacles.collide(this.mHeroCar);
    this.mObstacles.collide(this.mEnemyCar);

    this.mBoosters.update();

    this.mBoosters.collide(this.mHeroCar);
    this.mBoosters.collide(this.mEnemyCar);
    this.mBoosters.collideBall(this.mBall);

    // use this physics function for collisions
    gEngine.Physics.processCollision(this.mAllObjs, this.mCollisionInfos);

    // Update Scoring
    var msg = "Score " + this.mHeroCar.getScore() + " - " + this.mEnemyCar.getScore();
    this.mMsg.setText(msg);
    let center = shownCam.getWCCenter();
    this.mMsg.getXform().setPosition(center[0] - this.mMsg.getXform().getWidth()/2, center[1] + shownCam.getWCHeight() * 2 / 5);


    this.mZoomCam.panTo(this.mHeroCar.getXform().getXPos(), this.mHeroCar.getXform().getYPos());
    this.mZoomCam.update();

    // For the timer.
    this.end = new Date();
    this.millisecondsElapsed = this.end - this.t0;
    
    gUpdateObject();
};
