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

var hd;

function MyGame() {
    
    hd = 0;
    
    this.kBg = "assets/start.png";
     this.kmusic = "assets/Yumeji'sTheme.mp3";   
     this.kOpening = "assets/Opening.png";
    // The camera to view the scene
    this.mCamera = null;
    this.mBg=null;
    this.mMsg = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.AudioClips.loadAudio(this.kmusic);
    gEngine.Textures.loadTexture(this.kOpening);
};

MyGame.prototype.unloadScene = function () {
    gEngine.LayerManager.cleanUp();
    
    gEngine.Textures.unloadTexture(this.kBg);
   // gEngine.AudioClips.unloadAudio(this.kmusic);        
    gEngine.Textures.unloadTexture(this.kOpening);  
    
    var nextLevel = new Level1();  // next level to be loaded
    gEngine.Core.startScene(nextLevel);
};

MyGame.prototype.initialize = function () {
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
    
    var mOpen = new IllumRenderable(this.kOpening,this.kBg);
        mOpen.getXform().setSize(100, 100);
        mOpen.getXform().setPosition(50, 40);        
    this.mOpen = new GameObject(mOpen);
    
    //Message Information
    this.mMsg = new FontRenderable("");
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.getXform().setPosition(18, 65);
    this.mMsg.setTextHeight(3);
    
    this.mMsg3 = new FontRenderable("");
    this.mMsg3.setColor([0, 1, 1, 1]);
    this.mMsg3.getXform().setPosition(18,55);
    this.mMsg3.setTextHeight(3);
    
    this.mMsg5 = new FontRenderable("");
    this.mMsg5.setColor([1, 1, 1, 1]);
    this.mMsg5.getXform().setPosition(18, 45);
    this.mMsg5.setTextHeight(3);
    
    this.mInfo = new FontRenderable("");
    this.mInfo.setColor([0, 1, 0, 1]);
    this.mInfo.getXform().setPosition(18, 57);
    this.mInfo.setTextHeight(3);
    
    this.mInfo2 = new FontRenderable("");
    this.mInfo2.setColor([0, 1, 0, 1]);
    this.mInfo2.getXform().setPosition(18, 52);
    this.mInfo2.setTextHeight(3);
    
    this.mInfoe = new FontRenderable("");
    this.mInfoe.setColor([0, 1, 0, 1]);
    this.mInfoe.getXform().setPosition(63, 36);
    this.mInfoe.setTextHeight(3);
    gEngine.AudioClips.playBackgroundAudio(this.kmusic); 
};
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    
    this.mBg.draw(this.mCamera);
    this.mOpen.draw(this.mCamera);
    this.mOpen.setVisibility(false);
    this.mMsg.draw(this.mCamera);
    this.mMsg3.draw(this.mCamera);
    this.mMsg5.draw(this.mCamera);
    this.mInfo.draw(this.mCamera);
    this.mInfo2.draw(this.mCamera);
    this.mInfoe.draw(this.mCamera);
    
};

MyGame.prototype.update = function () {
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.H)) {hd+=1;}
    if(hd>0){this.mOpen.setVisibility(true);this.mInfoe.setText("Next: Press H");}
    switch(hd)
    {
        case 1:       
            this.mInfo.setText("In this game, you can always");
            this.mInfo2.setText("press H to let the story go on");
            break;
        case 2:
            this.mInfo.setTextHeight(0);
            this.mInfo2.setTextHeight(0);
            this.mMsg.setText("Nice to meet you, Lady");
            //this.mMsg1.setText("你好，我最后的玩家");
            this.mMsg3.setText("Wow! Who is talking?");
            this.mMsg5.setText("A Hero, from a computer game.");
            break;
        case 3:
            this.mMsg.setText("I have a Story to tell you");
            this.mMsg5.setText("About you and myself...");
            this.mMsg3.setTextHeight(0);
            break;
        case 4:
            gEngine.GameLoop.stop();
    }
};
