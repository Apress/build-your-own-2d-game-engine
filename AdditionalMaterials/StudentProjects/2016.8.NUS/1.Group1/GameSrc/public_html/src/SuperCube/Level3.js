/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,GameLevel
  Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
  GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Level3() {
    
    this.kCube =  "assets/cube.png" ;
    this.kPrincess =  "assets/princess.png" ;
    this.kThorn = "assets/Level1/gear3.png" ;
    this.kWall = "assets/Level1/gear1.png" ;
    this.kBrake = "assets/Level1/gear4.png" ;
    this.kGear = "assets/Level1/gear2.png" ;
    this.kGround = "assets/black.png" ;

    
    this.mCamera = null;
    this.mCubeCam = null;
    this.mMsg = null;
    this.mNext = 1;
    
    this.mAllPlatforms = new GameObjectSet();
    
    
    this.mGround1 = null;
    this.mGround2 = null;
    this.mWall1 = null;
    this.mWall2 = null;
    this.mThorn1 = null;
    this.mThorn2 = null;
    this.mThorn3 = null;
    this.mThorn4 = null;
    this.mBrake1 = null;
    this.mBrake2 = null;
    this.mBrake3 = null;
    this.mBrake4 = null;
    this.mBrake5 = null;
    this.mGear1 = null;
    this.mGear2 = null;
    this.mGear3 = null;
    this.mGear4 = null;
    this.mGear5 = null;
    //this.mGear = null;
    this.mPrincess = null;
    
    this.mSuperCube = null;
}
gEngine.Core.inheritPrototype(Level3, Scene);

Level3.prototype.loadScene = function () {
    
    gEngine.Textures.loadTexture(this.kThorn);
    gEngine.Textures.loadTexture(this.kWall);
    gEngine.Textures.loadTexture(this.kBrake);
    gEngine.Textures.loadTexture(this.kGear);
    gEngine.Textures.loadTexture(this.kGround);
    gEngine.Textures.loadTexture(this.kCube);
    gEngine.Textures.loadTexture(this.kPrincess);
    
};
Level3.prototype.unloadScene = function () {
    
    gEngine.Textures.unloadTexture(this.kThorn);
    gEngine.Textures.unloadTexture(this.kWall);
    gEngine.Textures.unloadTexture(this.kBrake);
    gEngine.Textures.unloadTexture(this.kGear);
    gEngine.Textures.unloadTexture(this.kGround);
    gEngine.Textures.unloadTexture(this.kCube);
    gEngine.Textures.unloadTexture(this.kPrincess);
    
    
    var nextLevel = null;
    if(this.mNext === 1){
        nextLevel = new GameOver;  // next level to be loaded
        nextLevel.setLevel(4);
        gEngine.Core.startScene(nextLevel);
    }
    else if(this.mNext === 0){
        nextLevel = new Level4;  // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    }
    else if(this.mNext === 2){
        nextLevel = new LevelSelect;  // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    }
};
Level3.prototype.initialize = function () {
      gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1]);
        // Step A: set up the cameras
      this.mCamera = new Camera(
        vec2.fromValues(80, 20), // position of the camera
        100,                        // width of camera
        [20, 420, 320, 100],         // viewport (orgX, orgY, width, height)
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
    
    
     
    
    this.mGround1 = new Ground(3.5);
    this.mGround2 = new Ground(28.5);
    this.mWall1 = new Wall(-10,16,20,20);
    this.mWall2 = new Wall(188,16,20,20);
    this.mThorn1 = new Thorn(30, 5.5, 2, 2, 0.2, 4);
    this.mThorn2 = new Thorn(30, 8, 2, 2, 0.23, 4);
    this.mThorn3 = new Thorn(50, 6.5, 4, 4, 0.2, 2);
    this.mThorn4 = new Thorn(70, 6.5, 4, 4, 0.15, 2);
    this.mBrake1 = new Brake(95, 4, 4, 28, 4, 0.25, 3);
    this.mBrake2 = new Brake(105, 4, 4, 28, 4, 0.3, 3);
    this.mBrake3 = new Brake(115, 4, 4, 28, 4, 0.35, 3);
    this.mBrake4 = new Brake(120, 4, 4, 28, 4, 0.35, 3);
    this.mBrake5 = new Brake(130, 6, 6, 20, 4, 0.3, 2);
    this.mGear1 = new Gear(143, 6.5, 5, 5, 2);
    this.mGear2 = new Gear(157, 6.5, 5, 5, 2);
    this.mGear3 = new Gear(171, 6.5, 5, 5, 2);
    this.mGear4 = new Gear(151, 20, 5, 5, 2);
    this.mGear5 = new Gear(163, 20, 5, 5, 2);
    
    
    this.mPrincess = new Princess();
    this.mSuperCube = new SuperCube(10, 20);  
    
    this.mAllPlatforms.addToSet(this.mGround1);
    this.mAllPlatforms.addToSet(this.mGround2);
    this.mAllPlatforms.addToSet(this.mWall1);
    this.mAllPlatforms.addToSet(this.mWall2);
    
    
    
};
Level3.prototype.drawCamera = function (camera){
    camera.setupViewProjection();
    
    this.mGround1.draw(camera);
    this.mGround2.draw(camera);
    this.mWall1.draw(camera);
    this.mWall2.draw(camera);
    this.mThorn1.draw(camera);
    this.mThorn2.draw(camera);
    this.mThorn3.draw(camera);
    this.mThorn4.draw(camera);
    this.mBrake1.draw(camera);
    this.mBrake2.draw(camera);
    this.mBrake3.draw(camera);
    this.mBrake4.draw(camera);
    this.mBrake5.draw(camera);
    this.mGear1.draw(camera);
    this.mGear2.draw(camera);
    this.mGear3.draw(camera);
    this.mGear4.draw(camera);
    this.mGear5.draw(camera);
    this.mPrincess.draw(camera);
    this.mSuperCube.draw(camera);
    
};
Level3.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    this.drawCamera(this.mCubeCam);
    this.drawCamera(this.mCamera);  // only draw status in the main camera
    
};

Level3.prototype.update = function () {
    
    this.mCamera.update();
    this.mCubeCam.update();
    this.mThorn1.update();
    this.mThorn2.update();
    this.mThorn3.update();
    this.mThorn4.update();
    this.mBrake1.update();
    this.mBrake2.update();
    this.mBrake3.update();
    this.mBrake4.update();
    this.mBrake5.update();
    this.mGear1.update();
    this.mGear2.update();
    this.mGear3.update();
    this.mGear4.update();
    this.mGear5.update();
    
    
    var Cx = this.mSuperCube.getBBox();
    var T1x = this.mThorn1.getBBox();
    var T2x = this.mThorn2.getBBox();
    var T3x = this.mThorn3.getBBox();
    var T4x = this.mThorn4.getBBox();
    var B1x = this.mBrake1.getBBox();
    var B2x = this.mBrake2.getBBox();
    var B3x = this.mBrake3.getBBox();
    var B4x = this.mBrake4.getBBox();
    var B5x = this.mBrake5.getBBox();
    var G1x = this.mGear1.getBBox();
    var G2x = this.mGear2.getBBox();
    var G3x = this.mGear3.getBBox();
    var G4x = this.mGear4.getBBox();
    var G5x = this.mGear5.getBBox();
    var Px = this.mPrincess.getBBox();
    
    this.mCubeCam.panTo(this.mSuperCube.getXform().getXPos(), this.mSuperCube.getXform().getYPos()+10);
    this.mCamera.panTo(this.mSuperCube.getXform().getXPos(), this.mSuperCube.getXform().getYPos()+6);
    
    if (Cx.boundCollideStatus(T1x)){
        this.mNext = 1;
        gEngine.GameLoop.stop();
        
    }
    
    if (Cx.boundCollideStatus(T2x)){
        this.mNext = 1;
        gEngine.GameLoop.stop();
        
    }
    
    if (Cx.boundCollideStatus(T3x)){
        this.mNext = 1;
        gEngine.GameLoop.stop();
        
    }
    
    if (Cx.boundCollideStatus(T4x)){
        this.mNext = 1;
        gEngine.GameLoop.stop();
        
    }
    
    if (Cx.boundCollideStatus(B1x)){
        this.mNext = 1;
        gEngine.GameLoop.stop();
        
    }
    
    if (Cx.boundCollideStatus(B2x)){
        this.mNext = 1;
        gEngine.GameLoop.stop();
        
    }
    
    if (Cx.boundCollideStatus(B3x)){
        this.mNext = 1;
        gEngine.GameLoop.stop();
        
    }
    
    if (Cx.boundCollideStatus(B4x)){
        this.mNext = 1;
        gEngine.GameLoop.stop();
        
    }
    
    if (Cx.boundCollideStatus(B5x)){
        this.mNext = 1;
        gEngine.GameLoop.stop();
        
    }
    
    if (Cx.boundCollideStatus(G1x)){
        this.mNext = 1;
        gEngine.GameLoop.stop();
        
    }
    
    if (Cx.boundCollideStatus(G2x)){
        this.mNext = 1;
        gEngine.GameLoop.stop();
        
    }
    
    if (Cx.boundCollideStatus(G3x)){
        this.mNext = 1;
        gEngine.GameLoop.stop();
        
    }
    
    if (Cx.boundCollideStatus(G4x)){
        this.mNext = 1;
        gEngine.GameLoop.stop();
        
    }
    
    if (Cx.boundCollideStatus(G5x)){
        this.mNext = 1;
        gEngine.GameLoop.stop();
        
    }
    
    if (Cx.boundCollideStatus(Px)){
        this.mNext = 0;
        gEngine.GameLoop.stop();
        
    }
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)){
        this.mNext = 2;
        gEngine.GameLoop.stop();
    }

    
    this.mSuperCube.update(this.mAllPlatforms);
    
    this._physicsSimulation();
};

Level3.prototype._physicsSimulation = function() {
    
    gEngine.Physics.processObjSet(this.mSuperCube, this.mAllPlatforms);
//    gEngine.Physics.processObjObj(this.mSuperCube, this.mGround2);
    
};
