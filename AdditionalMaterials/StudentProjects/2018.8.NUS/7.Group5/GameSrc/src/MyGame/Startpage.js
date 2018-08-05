/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * File: Startpage.js 
 * It will provide the interface to start the game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Startpage() {
       
    this.kBgClip = "assets/sounds/BGClip.mp3";
    this.kBgClip1 = "assets/sounds/story.mp3";
    
    
    this.kPlatformTexture = "assets/platform.png";
    this.kWallTexture = "assets/wall.png";
    this.kTargetTexture = "assets/target.png";
    this.kSquare="assets/box.png";
    this.kCloud="assets/cloud.png";
    this.kCloud1="assets/cloud1.png";
    this.kBallon="assets/ballon.png";
    this.kStair="assets/stair.png";
    this.kStone="assets/stone.png";
    this.kSign="assets/sign.png";
    this.kRoad="assets/Road.png";
    this.kCloud_t="assets/cloud_t.png";
    this.kSquare_t="assets/square_t.png";
    this.kHeroSprite="assets/hero_sprite.png";
    this.kBg="assets/background.png";
    this.kstartpic = "assets/startpic.png";/////////////////
    
    this.mState=2;
    this.flag=false;
    
    this.mSquare=null;
    this.mCloud=null;
    this.mCloud1=null;
    this.mBallon=null;
    this.mRoad1=null;
    this.mRoad2=null;
    this.mStone=null;
    this.mStair=null;
    this.mSign=null;
    this.mHero = null;
    this.mBg=null;
    this.mCloudt=null;
    this.mSquaret=null;
    
    this.mAllObjs = null;
    this.mNonRigid=null;
    
    this.mCamera = null;
    
    this.mMsg = null;
    this.mShapeMsg = null;
    
    this.mstartpic = null;////////////////////////
    
}
gEngine.Core.inheritPrototype(Startpage, Scene);

Startpage.prototype.loadScene = function () {
    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.AudioClips.loadAudio(this.kBgClip1);
    
    gEngine.Textures.loadTexture(this.kstartpic);
    

            
};

Startpage.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kstartpic);

    
    var nextlevel=null;
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.S))
    {    
        nextlevel=new Story();
    }
            
    gEngine.Core.startScene(nextlevel);
    
};

Startpage.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        100,                     // width of camera
        [0, 0, 1500, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([1, 1, 1, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
      
    //this.mAllObjs = new GameObjectSet();
    //this.mNonRigid = new GameObjectSet();
    
    this.mstartpic = new startpic(this.kstartpic,50,40,100,50);
    
    gEngine.AudioClips.playBackgroundAudio(this.kBgClip1);
    
    
    
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
Startpage.prototype.draw = function () {
    // Step A: clear the canvas

    gEngine.Core.clearCanvas([1, 1, 1, 1.0]); // clear to white

    this.mCamera.setupViewProjection();

    // for now draw these ...
    /*for (var i = 0; i<this.mCollisionInfos.length; i++) 
        this.mCollisionInfos[i].draw(this.mCamera); */
    //this.mCollisionInfos = []; 
    
    //this.mNonRigid.draw(this.mCamera);
    this.mstartpic.draw(this.mCamera);
    
    //this.mMsg.draw(this.mCamera);
    
    if(this.flag)
    {
        setTimeout(function() {
            console.log('Woke up!!');
}, 10000);
        
    }
    
    //this.mMsg.draw(this.mCamera);   // only draw status in the main camera
    
};


Startpage.prototype.update = function () {
    this.mstartpic.update(this.mCamera);
    var nextlevel = null;
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.S))
    {    
        gEngine.GameLoop.stop();
    }
            
    /*
    this.mAllObjs.update(this.mCamera);    
    gEngine.Physics.processCollision(this.mAllObjs, []);
    this.mNonRigid.update(this.mCamera);   
    
    var xform = this.mHero.getXform();
    var xpos = xform.getXPos();
    var ypos = xform.getYPos();
    if(xpos<=65 && xpos>=57 && ypos>47) {
        this.flag=true;
        this.mHero.sta=2;
        this.mCloudt.setVisibility(1);
        //      
        
    }
    
  //this.mBallon.setSpeed(0.1);
  this.mBallon.rotateObjPointTo(this.mHero.getXform().getPosition(), 1);
  
  //GameObject.prototype.update.call(this.mBallon);
    */
    
};
