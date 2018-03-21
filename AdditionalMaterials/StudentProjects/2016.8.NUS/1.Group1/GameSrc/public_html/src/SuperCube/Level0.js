/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


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


function Level0() {
    // The camera to view the scene
    
    this.kCube =  "assets/cube.png" ;
    this.kPrincess =  "assets/princess.png" ;
    
    this.kThorn = "assets/Level1/gear3.png" ;
    this.kWall = "assets/Level1/gear1.png" ;
    this.kBrake = "assets/Level1/gear4.png" ;
    this.kNormal = "assets/NormalCube.png" ;
    this.kBg = "assets/bg.png";
    this.kBgNormal = "assets/bg_normal.png";
    
    this.mCamera = null;
    this.mCubeCam = null;
    this.mMsg = null;
    this.mNext = 1;
    
    this.mAllPlatforms = new GameObjectSet();
    
    this.mBg = null;
    this.mWalls = [];

    
    this.mGlobalLightSet = null;
    //this.mGear = null;
    this.mPrincess = null;
    this.mBigPrincess = null;
    this.mSuperCube = null;
}
gEngine.Core.inheritPrototype(Level0, Scene);

Level0.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kBgNormal);
    gEngine.Textures.loadTexture(this.kThorn);
    gEngine.Textures.loadTexture(this.kWall);
    gEngine.Textures.loadTexture(this.kBrake);
    gEngine.Textures.loadTexture(this.kCube);
    gEngine.Textures.loadTexture(this.kPrincess);
    gEngine.Textures.loadTexture(this.kNormal);
    
};
Level0.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kBgNormal);
    gEngine.Textures.unloadTexture(this.kThorn);
    gEngine.Textures.unloadTexture(this.kWall);
    gEngine.Textures.unloadTexture(this.kBrake);
    gEngine.Textures.unloadTexture(this.kCube);
    gEngine.Textures.unloadTexture(this.kPrincess);
    gEngine.Textures.unloadTexture(this.kNormal);
    
    
    var nextLevel = null;
    if(this.mNext === 1){
        nextLevel = new GameOver;  // next level to be loaded
        nextLevel.setLevel(1);
        
        gEngine.Core.startScene(nextLevel);
    }
    else if(this.mNext === 0){
        nextLevel = new Level1;  // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    }
    else if(this.mNext === 2){
        nextLevel = new LevelSelect;  // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    }
        
};
Level0.prototype.initialize = function () {
    
      gEngine.DefaultResources.setGlobalAmbientColor([0.5, 0.5, 0.5, 1]);
      
//      this.mLightSet = new LightSet();
//      var light = new Light();
//      light.set2DPosition(20, 20);
//      light.setColor(1, 0, 1, 1);
//      this.mLightSet.addToSet(light);
      
      
        // Step A: set up the cameras
      this.mCamera = new Camera(
        vec2.fromValues(80, 45), // position of the camera
        100,                        // width of camera
        [20, 370, 150, 150],         // viewport (orgX, orgY, width, height)
        2
    );
   this.mCamera.setBackgroundColor([1, 1, 1, 1]);
    
    this.mCubeCam = new Camera(
        vec2.fromValues(20, 30),    // will be updated at each cycle to point to hero
        70,
        [0, 0, 960, 540],
        10                         // viewport bounds
    );
    this.mCubeCam.setBackgroundColor([0.5, 0.5, 0.5, 1]);
    
    
      
    
    var wall = null;
    wall = new SimpleWall(0,15,10,250);
    this.mWalls.push(wall);
    wall = new SimpleWall(100,15,10,250);
    this.mWalls.push(wall);
    wall = new SimpleWall(0,0,100,15);
    this.mWalls.push(wall);
    wall = new SimpleWall(82,18,20,8);
    this.mWalls.push(wall);
    wall = new SimpleWall(50,15,80,3);
    this.mWalls.push(wall);
    wall = new SimpleWall(0,265,50,4);
    this.mWalls.push(wall);
    wall = new SimpleWall(80,265,30,4);
    this.mWalls.push(wall);
    
    
    wall = new SimpleWall(45,30,25,4);
    this.mWalls.push(wall);
    
    this.mPrincess = new Princess();
    this.mPrincess.setPosition(57, 35.6);
    
    this.mBigPrincess = new Princess();
    this.mBigPrincess.setPosition(57, 200);
    this.mBigPrincess.setSize(50, 50);
    
    
    this.mSuperCube = new SuperCube(20, 40, this.kNormal); 
//    this.mSuperCube.getCube().addLight(light);

//    this.mGlobalLightSet = new LightSet();
//
//    var l = this._createALight(Light.eLightType.ePointLight,
//            [15, 20, 5],         // position
//            [0, 0, -1],          // Direction 
//            [0.6, 1.0, 0.0, 1],  // some color
//            8, 20,               // near and far distances
//            0.1, 0.2,            // inner and outer cones
//            5,                   // intensity
//            1.0                  // drop off
//            );
//    this.mGlobalLightSet.addToSet(l);
    
    
    this._initializeLights();
    
    var bgR = new IllumRenderable(this.kBg, this.kBgNormal);
    bgR.setElementPixelPositions(0, 1024, 0, 1024);
    bgR.getXform().setSize(100, 100);
    bgR.getXform().setPosition(50, 65);
    bgR.getMaterial().setSpecular([1, 0, 0, 1]);
    this.mBg = new GameObject(bgR);
    
    var i;
    for (i = 0; i < 3; i++) {
        bgR.addLight(this.mGlobalLightSet.getLightAt(i));   // all the lights
    }
    bgR.addLight(this.mGlobalLightSet.getLightAt(3));
    
    for (i = 0; i < 3; i++) {
        this.mSuperCube.getRenderable().addLight(this.mGlobalLightSet.getLightAt(i));
    }
    
    for(var i = 0; i < this.mWalls.length; i++){
        this.mAllPlatforms.addToSet(this.mWalls[i]);
    }
    
    
    
    
};
Level0.prototype.drawCamera = function (camera){
    camera.setupViewProjection();
    
    this.mBg.draw(camera);
    for(var i = 0; i < this.mWalls.length; i++){
        this.mWalls[i].draw(camera);
    }
    
    
    this.mPrincess.draw(camera);
    this.mBigPrincess.draw(camera);
    this.mSuperCube.draw(camera);
};
Level0.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    
    this.drawCamera(this.mCubeCam);
    this.drawCamera(this.mCamera);  // only draw status in the main camera
};

Level0.prototype.update = function () {
    
    this.mCubeCam.update();
    this.mCamera.update();

    
    
    var Cx = this.mSuperCube.getBBox();

    var Px = this.mPrincess.getBBox();
    var BPx = this.mBigPrincess.getBBox();
    
    
    this.mCubeCam.panTo(this.mSuperCube.getXform().getXPos(), this.mSuperCube.getXform().getYPos()+10);
    this.mCamera.panTo(this.mSuperCube.getXform().getXPos(), this.mSuperCube.getXform().getYPos()+6);
    

    
    
    if (Cx.boundCollideStatus(Px) || Cx.boundCollideStatus(BPx)){
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

Level0.prototype._physicsSimulation = function() {
    
    gEngine.Physics.processObjSet(this.mSuperCube, this.mAllPlatforms);
//    gEngine.Physics.processObjObj(this.mSuperCube, this.mGround2);
    
};
