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

function Level1() {
    // The camera to view the scene
    
    this.kCube =  "assets/cube.png" ;
    this.kPrincess =  "assets/princess.png" ;
    
    this.kThorn = "assets/Level1/gear3.png" ;
    this.kWall = "assets/Level1/gear1.png" ;
    this.kBrake = "assets/Level1/gear4.png" ;

    
    this.mCamera = null;
    this.mCubeCam = null;
    this.mMsg = null;
    this.mNext = 1;
    
    this.mAllPlatforms = new GameObjectSet();
    
  
    this.mWalls = [];

    

    //this.mGear = null;
    this.mPrincess = null;
    
    this.mSuperCube = null;
}
gEngine.Core.inheritPrototype(Level1, Scene);

Level1.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kThorn);
    gEngine.Textures.loadTexture(this.kWall);
    gEngine.Textures.loadTexture(this.kBrake);
    gEngine.Textures.loadTexture(this.kCube);
    gEngine.Textures.loadTexture(this.kPrincess);
    
};
Level1.prototype.unloadScene = function () {
    
    gEngine.Textures.unloadTexture(this.kThorn);
    gEngine.Textures.unloadTexture(this.kWall);
    gEngine.Textures.unloadTexture(this.kBrake);
    gEngine.Textures.unloadTexture(this.kCube);
    gEngine.Textures.unloadTexture(this.kPrincess);
    
    
    var nextLevel = null;
    if(this.mNext === 1){
        nextLevel = new GameOver;  // next level to be loaded
        nextLevel.setLevel(2);
        gEngine.Core.startScene(nextLevel);
    }
    else if(this.mNext === 0){
        nextLevel = new Level2;  // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    }
    else if(this.mNext === 2){
        nextLevel = new LevelSelect;  // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    }
};
Level1.prototype.initialize = function () {
      gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1]);
        // Step A: set up the cameras
      this.mCamera = new Camera(
        vec2.fromValues(80, 45), // position of the camera
        100,                        // width of camera
        [0, 350, 150, 150],         // viewport (orgX, orgY, width, height)
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
    
    
    
    
    var wall = null;
    
    var scale = 0.5;
    
    wall = new SimpleWall(0,0,150*scale,20*scale);
    this.mWalls.push(wall);
    wall = new SimpleWall(110*scale,20*scale,70*scale,80*scale);
    this.mWalls.push(wall);
    wall = new SimpleWall(0,20*scale,20*scale,20*scale);
    this.mWalls.push(wall);
    wall = new SimpleWall(0*scale,40*scale,95*scale,20*scale);
    this.mWalls.push(wall);
    wall = new SimpleWall(75*scale,60*scale,20*scale,20*scale);
    this.mWalls.push(wall);
    wall = new SimpleWall(-20*scale,0*scale,20*scale,320*scale);
    this.mWalls.push(wall);
    
    //7
    wall = new SimpleWall(15*scale,80*scale,20*scale,20*scale);
    this.mWalls.push(wall);
    wall = new SimpleWall(15*scale,100*scale,155*scale,20*scale);
    this.mWalls.push(wall);
    
    
    //9
    wall = new SimpleWall(110*scale,120*scale,50*scale,200*scale);
    this.mWalls.push(wall);
    
    wall = new SimpleWall(50*scale,130*scale,20*scale,100*scale);
    this.mWalls.push(wall);
    
    wall = new SimpleWall(0*scale,140*scale,35*scale,80*scale);
    this.mWalls.push(wall);
    
    wall = new SimpleWall(85*scale,140*scale,10*scale,80*scale);
    this.mWalls.push(wall);
    
    wall = new SimpleWall(30*scale,240*scale,60*scale,10*scale);
    this.mWalls.push(wall);
    
    wall = new SimpleWall(0*scale,280*scale,110*scale,40*scale);
    this.mWalls.push(wall);
    
    
    this.mPrincess = new Princess();
    this.mPrincess.setPosition(62*scale, 253*scale);
    //this.mGear = new Gear(2);
    
    this.mSuperCube = new SuperCube(15, 15);   
    
    
    for(var i = 0; i < this.mWalls.length; i++){
        this.mAllPlatforms.addToSet(this.mWalls[i]);
    }
    
    
    
    
};
Level1.prototype.drawCamera = function (camera){
    camera.setupViewProjection();
    
    
    for(var i = 0; i < this.mWalls.length; i++){
        this.mWalls[i].draw(camera);
    }
    

    this.mPrincess.draw(camera);
    this.mSuperCube.draw(camera);
};
Level1.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
     
    this.drawCamera(this.mCubeCam);
    this.drawCamera(this.mCamera); 
};

Level1.prototype.update = function () {
    
    this.mCubeCam.update();
    this.mCamera.update(); 

    
    
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

Level1.prototype._physicsSimulation = function() {
    
    gEngine.Physics.processObjSet(this.mSuperCube, this.mAllPlatforms);
//    gEngine.Physics.processObjObj(this.mSuperCube, this.mGround2);
    
};
