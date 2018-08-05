/*
 * File: Level0.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var index;
var counttime;
var time;
var isLevel0Win;
var level0Time;

function Level0() {
    
    index = 0;
    counttime = 0;
    time = 30;
    isLevel0Win = true;
    level0Time = 3;
    
    this.kBg = "assets/Opening.png";
     //this.kmusic = "assets/Yumeji'sTheme.mp3";   
     this.kHero = "assets/Herofinal.png";
     
    // The camera to view the scene
    this.mCamera = null;
    this.mBg=null;
    this.mHero = null;
    this.mMsgtime = null;
    
}

gEngine.Core.inheritPrototype(Level0, Scene);

Level0.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBg);
    //gEngine.AudioClips.loadAudio(this.kmusic);
    gEngine.Textures.loadTexture(this.kHero);
};

Level0.prototype.unloadScene = function () {
    gEngine.LayerManager.cleanUp();
    
    gEngine.Textures.unloadTexture(this.kBg);
//    gEngine.AudioClips.unloadAudio(this.kmusic);        
    gEngine.Textures.unloadTexture(this.kHero);  
    
    if(isLevel0Win === true) {
        var nextLevel = new Level6();  // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    }else if(isLevel0Win === false) {
        var nextLevel = new LoseLevel(0);  // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    }
};

Level0.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        100,                     // width of camera
        [0, 0, 720, 720]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    var bgR = new IllumRenderable(this.kBg,this.kBg);
        bgR.getXform().setSize(100, 100);
        bgR.getXform().setPosition(50, 40);        
    this.mBg = new GameObject(bgR);
    
    this.mHero = new Flower(this.kHero);
    this.mHero.getXform().setPosition(50,50);
    
    this.mMsgtime = new FontRenderable("00:30");
    this.mMsgtime.setColor([1, 1, 1, 1]);
    this.mMsgtime.getXform().setPosition(65, 40);
    this.mMsgtime.setTextHeight(5);
    
    gEngine.Physics.toggleNoGrav();
    
    gEngine.AudioClips.playBackgroundAudio(this.kmusic); 
};
Level0.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    
    this.mBg.draw(this.mCamera);
    this.mHero.draw(this.mCamera);
    this.mMsgtime.draw(this.mCamera);
    
};

Level0.prototype.update = function () {
    
    counttime++;
    if(counttime%60 === 0){time=time-1;}; 
    
    if(time<0){
        isLevel0Win = true;
        gEngine.GameLoop.stop();
    }
    
    var pX = this.mHero.getXform().getXPos();
    if(pX < 12 || pX > 87) {
        isLevel0Win = false;
        gEngine.GameLoop.stop();
    }

    if(time<10){this.mMsgtime.setText("00:0"+time);}
    else{this.mMsgtime.setText("00:"+time);}
    
    index = (index + 1) % 720;
    
    
    if(index <= 360) {
        this.mHero.getXform().incXPosBy(0.5);
    }else if(index > 360 && index <= 720) {
        this.mHero.getXform().incXPosBy(-0.5);
    }
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.L)) {
        isLevel0Win = true;
        gEngine.GameLoop.stop();
    }
    
    this.mHero.update(this.mCamera); 
    this.mMsgtime.update(this.mCamera);
    

};
