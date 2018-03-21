/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
  GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Level2() {
    // The camera to view the scene

    this.kCube =  "assets/cube.png" ;
    this.kGround = "assets/black.png" ;
    this.kPrincess =  "assets/princess.png" ;
    this.mCamera = null;
    this.mCubeCam = null;
    this.mMsg = null;
    this.mNext = 1;
    
    this.mAllPlatforms = new GameObjectSet();
    
    this.mGround1 = null;
    this.mGround2 = null;
    this.mLadders = [];
    this.mWalls = [];
    this.mPrincess = null;
    this.mSuperCube = null;
}
gEngine.Core.inheritPrototype(Level2, Scene);

Level2.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kCube);
    gEngine.Textures.loadTexture(this.kGround);
    gEngine.Textures.loadTexture(this.kPrincess);
};

Level2.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kCube);
    gEngine.Textures.unloadTexture(this.kGround);
    gEngine.Textures.unloadTexture(this.kPrincess);

    // 改变关卡
    var nextLevel = null;
    if(this.mNext === 1){
        nextLevel = new GameOver;  // next level to be loaded
        nextLevel.setLevel(3);
        gEngine.Core.startScene(nextLevel);
    }
    else if(this.mNext === 0){
        nextLevel = new Level3;  // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    }
    else if(this.mNext === 2){
        nextLevel = new LevelSelect;  // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    }

};

Level2.prototype.initialize = function () {
      gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1]);
        // Step A: set up the cameras
      this.mCamera = new Camera(
        vec2.fromValues(80, 20), // position of the camera
        115,                        // width of camera
        [0, 380, 320, 100],         // viewport (orgX, orgY, width, height)
        2
    );
    this.mCamera.setBackgroundColor([1, 1, 1, 1]);
    
    this.mCubeCam = new Camera(
        vec2.fromValues(20, 30),    // will be updated at each cycle to point to hero
        70,
        [0, 0, 960, 540],
        10                         // viewport bounds
    );
    this.mCubeCam.setBackgroundColor([1, 1, 1, 1]);

    
    this.mSuperCube = new SuperCube(10, 20);
    var wall = null;
    wall = new SimpleWall(0, 0, 5, 250);
    this.mWalls.push(wall);
    wall = new SimpleWall(179.5, 0, 5, 250);
    this.mWalls.push(wall);

    this.mGround1 = new Ground(0.5);
    this.mGround2 = new Ground(250.5);
    var ladder = null;
    ladder = new Ladder(30, 10, 10, 4);
    this.mLadders.push(ladder);
    ladder = new Ladder(50, 20, 15, 4);
    this.mLadders.push(ladder);
    ladder = new Ladder(70, 32, 10, 4);
    this.mLadders.push(ladder);
    ladder = new Ladder(90, 44, 15, 4);
    this.mLadders.push(ladder);
    ladder = new Ladder(110, 56, 10, 4);
    this.mLadders.push(ladder);
    ladder = new Ladder(130, 68, 15, 4);
    this.mLadders.push(ladder);
    ladder = new Ladder(110, 80, 10, 4);
    this.mLadders.push(ladder);

    ladder = new Ladder(90, 90, 15, 4);
    this.mLadders.push(ladder);

    ladder = new Ladder(70, 100, 10, 4);
    this.mLadders.push(ladder);

    ladder = new Ladder(50, 110, 10, 4);
    this.mLadders.push(ladder);

    ladder = new Ladder(70, 120, 10, 4);
    this.mLadders.push(ladder);

    ladder = new Ladder(50, 130, 10, 4);
    this.mLadders.push(ladder);

    ladder = new Ladder(70, 140, 10, 4);
    this.mLadders.push(ladder);

    ladder = new Ladder(50, 150, 10, 4);
    this.mLadders.push(ladder);


    ladder = new Ladder(70, 160, 10, 4);
    this.mLadders.push(ladder);

    ladder = new Ladder(50, 170, 10, 4);
    this.mLadders.push(ladder);



    this.mPrincess = new Princess();
    this.mPrincess.setPosition(50, 175);

    for(var i = 0; i < this.mWalls.length; i++){
        this.mAllPlatforms.addToSet(this.mWalls[i]);
    }
    for(var i = 0; i < this.mLadders.length; i++){
        this.mAllPlatforms.addToSet(this.mLadders[i]);
    }
    this.mAllPlatforms.addToSet(this.mGround1);
    this.mAllPlatforms.addToSet(this.mGround2);

};
Level2.prototype.drawCamera = function (camera){
    camera.setupViewProjection();
    this.mSuperCube.draw(camera);
    this.mGround1.draw(camera);
    this.mGround2.draw(camera);
    for(var i = 0; i < this.mWalls.length; i++){
        this.mWalls[i].draw(camera);
    }

    for(var i = 0; i < this.mLadders.length; i++){
        this.mLadders[i].draw(camera);
    }
    this.mPrincess.draw(camera);
};
Level2.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    this.drawCamera(this.mCubeCam);
    this.drawCamera(this.mCamera);  // only draw status in the main camera
};

Level2.prototype.update = function () {
    
    this.mCamera.update();
    this.mCubeCam.update();
    var Cx = this.mSuperCube.getBBox();
    var Px = this.mPrincess.getBBox();
    
    this.mCubeCam.panTo(this.mSuperCube.getXform().getXPos(), this.mSuperCube.getXform().getYPos()+10);
    this.mCamera.panTo(this.mSuperCube.getXform().getXPos(), this.mSuperCube.getXform().getYPos()+6);
    if (Cx.boundCollideStatus(Px)){
        this.mNext = 0;
        gEngine.GameLoop.stop();

    }
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)){
        this.mNext = 2;
        gEngine.GameLoop.stop();
    }

    this.mSuperCube.update(this.mAllPlatforms, this.mCamera);
    
    this._physicsSimulation();
};

Level2.prototype._physicsSimulation = function() {
    
    gEngine.Physics.processObjSet(this.mSuperCube, this.mAllPlatforms);

};
