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

function Endpage() {
       
    this.kEndpic = "assets/Endpic.png";
    this.kEndpic2 = "assets/Endpic2.png";
    this.kEndpic3 = "assets/credit.png";
    this.kCue = "assets/sounds/cue1.mp3"; 
    
    this.mState=2;
    this.flag=false;
    this.count=0;
   
    this.mAllObjs = null;
    this.mNonRigid=null;
    
    this.mCamera = null;
    
    this.mMsg = null;
    this.mShapeMsg = null;
    
    this.mEndpic = null;////////////////////////
    this.mEndpic2 = null;
    //this.mEndpic3 = null;
    
}
gEngine.Core.inheritPrototype(Endpage, Scene);

Endpage.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kEndpic3);
};

Endpage.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kEndpic);
    gEngine.Textures.unloadTexture(this.kEndpic2);
    
    gEngine.AudioClips.unloadAudio(this.kCue);
 
    
    var nextlevel= new Egg();
    gEngine.Core.startScene(nextlevel);
    
};

Endpage.prototype.initialize = function () {
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
    
    this.mEndpic = new Endpic(this.kEndpic,50,40,100,50);//////////
    
    this.mEndpic2 = new Endpic(this.kEndpic2,50,40,100,50);

    
    this.mEndpic.setVisibility(1);
    this.mEndpic2.setVisibility(0);
    
    

};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
Endpage.prototype.draw = function () {
    // Step A: clear the canvas

    gEngine.Core.clearCanvas([1, 1, 1, 1.0]); // clear to white

    this.mCamera.setupViewProjection();
    
    // for now draw these ...
    /*for (var i = 0; i<this.mCollisionInfos.length; i++) 
        this.mCollisionInfos[i].draw(this.mCamera); */
    //this.mCollisionInfos = []; 
    
    //this.mNonRigid.draw(this.mCamera);
    this.mEndpic.draw(this.mCamera);
    this.mEndpic2.draw(this.mCamera);
    
    //this.mMsg.draw(this.mCamera);
    
    
    //this.mMsg.draw(this.mCamera);   // only draw status in the main camera
    
};


Endpage.prototype.update = function () {
    this.count+=1;
    
    if(this.count===750){
       this.mEndpic.setVisibility(0);
       this.mEndpic2.setVisibility(1);
    }
    
    
    if(this.count===849){
        gEngine.AudioClips.stopBackgroundAudio();
    }
    
    if(this.count===850){
        gEngine.GameLoop.stop();
    }
};
