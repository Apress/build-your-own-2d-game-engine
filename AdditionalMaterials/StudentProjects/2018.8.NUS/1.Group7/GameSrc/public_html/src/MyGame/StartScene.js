/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function StartScene() {
    
    this.kSprite = "assets/animation.png";
    this.kStar = "assets/yellow.png";
    this.kbg ="assets/bg1.png";
    this.kBGM = "assets/Lopu.mp3";
    // The camera to view the scene
    this.mCamera = null;
    this.mAllObjs = null;
    this.mCurrentObj = 0;
    this.mHero = null;
    this.mStar = null;
    this.mMsg = null;
    this.mTip= null;
    this.mBar= null;
    this.time= 0;
    this.LastSpaceTime=0;
    this.SpaceCount=0;
    

}

gEngine.Core.inheritPrototype(StartScene, Scene);


StartScene.prototype.loadScene = function () {
     
    gEngine.Textures.loadTexture(this.kSprite);
     gEngine.Textures.loadTexture(this.kbg);
    gEngine.Textures.loadTexture(this.kStar);
    gEngine.AudioClips.loadAudio(this.kBGM);
    gEngine.AudioClips.stopBackgroundAudio();
    

};

StartScene.prototype.unloadScene = function () {
    
    gEngine.Textures.unloadTexture(this.kSprite);
 gEngine.Textures.unloadTexture(this.kbg);

    gEngine.Textures.unloadTexture(this.kStar);
   //  var nextLevel =new MyGame();
   // var nextLevel =new Level1();
    var nextLevel =new AllLevel(0);
    gEngine.Core.startScene(nextLevel);
};

StartScene.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(400, 300), // position of the camera
        800,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    gEngine.AudioClips.playBackgroundAudio(this.kBGM);


            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    
    
    this.mbg = new TextureRenderable(this.kbg);
    this.mbg.getXform().setPosition(400,300);
    this.mbg.getXform().setSize(800,600);
    
    this.mAllObjs = new GameObjectSet(); 
    
    this.mHero = new Hero(this.kSprite, 290,240,50,50);
    this.mHero.getRigidBody().setMass(0);
    this.mAllObjs.addToSet(this.mHero);
    
    this.mMsg = new FontRenderable("Star For You");
    this.mMsg.setColor([1,1,1, 1]);
    this.mMsg.getXform().setPosition(310,350);
    this.mMsg.setTextHeight(30);
    this.mAllObjs.addToSet(this.mMsg);
    
    this.mStar = new TextureRenderable(this.kStar);
    this.mStar.setColor([1,1,1,0]);
    this.mStar.getXform().setPosition(520,370);
    this.mStar.getXform().setSize(40,40);
    this.mAllObjs.addToSet(this.mStar);
    
    
    this.mTip = new FontRenderable("Hold [SPACE] to start");
    this.mTip.setColor([1,1,1, 1]);
    this.mTip.getXform().setPosition(305,100);
    this.mTip.setTextHeight(16);
    this.mAllObjs.addToSet(this.mTip);
    
    this.mBar =new Renderable();
    this.mBar.setColor([1,1,1,  1]);
    this.mBar.getXform().setPosition(400,80);
    this.mBar.getXform().setSize(200,3);
    this.mAllObjs.addToSet(this.mBar);
  
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
StartScene.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    this.mbg.draw(this.mCamera);
    this.mAllObjs.draw(this.mCamera);
    
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
StartScene.prototype.update = function () {
    this.time++;
    var flag =0;
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Space)) 
    {
        if(this.LastSpaceTime=== this.time-1){
            this.SpaceCount++;
        }
        else{
            this.SpaceCount=1;
        }
        var newwidth = 200 -5*this.SpaceCount;
        this.mBar.getXform().setSize(newwidth,3);
        if(newwidth<=0)
        {
            gEngine.GameLoop.stop();
        }
        this.LastSpaceTime=this.time;
        flag =1;  // accept space 
    }
    
    if(flag===0)
    {
        this.mBar.getXform().setSize(200,3);
        this.SpaceCount=0;
    }
    
    
    this.mHero.StartSceneautomove();
    this.mAllObjs.update(this.mCamera);
    
    
};
