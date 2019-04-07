 /*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict";

function Level(sceneFile, bgClip, cue) {
    // scene file name
    this.kSceneFile = sceneFile;
    // audio clips: supports both mp3 and wav formats
    this.kBgClip = bgClip;
    this.kCue = cue;
    this.mBg = null;
    this.kBg = "assets/bg.png";
    this.kPlatformTexture = "assets/RigidShape/Wood.png";
    this.kSpikeTexture = "assets/spike.png";
    this.kPickupSound = "assets/sounds/PickupSound.wav";
    
    this.kLevelOneSceneFile = "assets/levels/one.xml";
    this.kLevelTwoSceneFile = "assets/levels/two.xml";
    this.kLevelThreeSceneFile = "assets/levels/three.xml";
    this.currScene = null;
    if(sceneFile === this.kLevelOneSceneFile) {
        this.currScene = 1;
    }else if(sceneFile === this.kLevelTwoSceneFile) {
        this.currScene = 2;
    }else {
        this.currScene = 3;
    }
    this.mSpikes = [];
    this.mLevelPlatform = null;
    this.mPlayer = 0;//index in the object set of the player object
    this.mGhost = null;
    this.kWCWidth = 100;
    this.kWCCenterX = 50;
    this.kWCCenterY = 37.5;
    this.kViewportWidth = 1000;
    this.kViewportHeight = 750;
    this.mMouse = null;
    this.mCamera = null;   
    
    this.kMiniCamRatio = 0.25;
    
    this.kEndMarkerIndex = 2;
    
    this.r = 0.0;
    this.g = 0.0;
    this.b = 0.0;
    this.mMap = false;
    this.mMinCam = null;
}
gEngine.Core.inheritPrototype(Level, Scene);

Level.prototype.loadScene = function () {
    // load the scene file
    gEngine.TextFileLoader.loadTextFile(this.kSceneFile, 
        gEngine.TextFileLoader.eTextFileType.eXMLFile);
        
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kPlatformTexture);
    gEngine.Textures.loadTexture(this.kSpikeTexture);
    
    // loads the audios
    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.AudioClips.loadAudio(this.kCue);
    gEngine.AudioClips.loadAudio(this.kPickupSound);
};

Level.prototype.unloadScene = function () {
    // stop the background audio
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kPlatformTexture);
    gEngine.Textures.unloadTexture(this.kSpikeTexture);
    
    // unload the scene flie and loaded resources
    gEngine.TextFileLoader.unloadTextFile(this.kSceneFile);
    gEngine.AudioClips.unloadAudio(this.kBgClip);
    gEngine.AudioClips.unloadAudio(this.kCue);
    gEngine.AudioClips.unloadAudio(this.kPickupSound);
    
    var success = this.mLevelPlatform.getObjectAt(this.mPlayer).getSuccess();
    var nextLevel = null;
    if(!success){
        nextLevel = new GameOver(this.kSceneFile);
        gEngine.Core.startScene(nextLevel);
    }else{
        if(this.currScene === 1) {
            nextLevel = new Level(this.kLevelTwoSceneFile, this.kBgClip,this.kCue);
        }else if(this.currScene === 2) {
            nextLevel = new Level(this.kLevelThreeSceneFile, this.kBgClip,this.kCue);
        }else {
            nextLevel = new Win();
        }

        gEngine.Core.startScene(nextLevel);
    }
};

Level.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(this.kWCCenterX, this.kWCCenterY), // position of the camera
        this.kWCWidth,                       // width of camera
        [0, 0, this.kViewportWidth, this.kViewportHeight]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.5, 0.5, 1, 1]);
    this._initializeLights();   // defined in Level_Lights.js
    
    
    // Step B: set up player and platform
    this.mLevelPlatform = new LevelPlatform();
    var pl = new Player();
    this.mLevelPlatform.addToSet(pl);
    this.mLevelPlatform.setCamera(this.mCamera);
    
    var levelParser = new LevelFileParser(this.kSceneFile);
    var pickArr = [];
    levelParser.parseLevel(this.mLevelPlatform,this.mSpikes,pickArr, this.kSpikeTexture, this.kPlatformTexture);
    var playerStartPos = this.mLevelPlatform.getPlayerStart();
    pl.getXform().setPosition(playerStartPos[0], playerStartPos[1]);
    
    if(this.mLevelPlatform.isGhostEnabled())
        this.mGhost = new Ghost();
    
    this.mMouse = new MousePlatforms(this.mLevelPlatform,this.mCamera);
    var i;
    for(i=0;i<pickArr.length;i++){
        this.mMouse.addPickup(pickArr[i]);
    }
    
    // Step C: set up mini cam
    this.mMiniCam = new Camera(
            vec2.fromValues(55,this.kWCCenterY), this.kWCWidth * (this.kMiniCamRatio + 1),
            [this.kViewportWidth*0.1,300,this.kViewportWidth*this.kMiniCamRatio,this.kViewportHeight*this.kMiniCamRatio]);
    this.mMiniCam.setBackgroundColor([0.5,0.5,0.5,1]);
    this.mLevelPlatform.setMiniCamera(this.mMiniCam);
    
    // Ste D: set up background
    var bgR = new LightRenderable(this.kBg);
    bgR.setElementPixelPositions(0, 1024, 0, 1024);
    bgR.getXform().setSize(100, 100);
    bgR.getXform().setPosition(50, 40);
    //bgR.getMaterial().setSpecular([1, 0, 0, 1]);
    if(this.mLevelPlatform.isLightEnabled()) {
        var i;
        for (i = 0; i < 4; i++) {
            bgR.addLight(this.mGlobalLightSet.getLightAt(i));   // all the lights
        }
        var endMarkerPos = this.mLevelPlatform.getEndMarkerPosition();
        this.mGlobalLightSet.getLightAt(2).setXPos(endMarkerPos[0]);
        this.mGlobalLightSet.getLightAt(2).setYPos(10);
         var set = this.mLevelPlatform.getRenderableSet();
        for(i = 1; i < set.length; i++) {
            set[i].getRenderable().addLight(this.mGlobalLightSet.getLightAt(0));
            set[i].getRenderable().addLight(this.mGlobalLightSet.getLightAt(1));
            set[i].getRenderable().addLight(this.mGlobalLightSet.getLightAt(2));
            set[i].getRenderable().addLight(this.mGlobalLightSet.getLightAt(3));
        }
        for(i = 0; i < this.mSpikes.length; i++) {
            this.mSpikes[i].addLight(this.mGlobalLightSet.getLightAt(0));
            this.mSpikes[i].addLight(this.mGlobalLightSet.getLightAt(1));
            this.mSpikes[i].addLight(this.mGlobalLightSet.getLightAt(2));
            this.mSpikes[i].addLight(this.mGlobalLightSet.getLightAt(3));
        }
    }
    this.mBg = new GameObject(bgR);
    
    // Step E: play music
    gEngine.AudioClips.playBackgroundAudio(this.kBgClip);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
Level.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0, 0, 1, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    this.mBg.draw(this.mCamera);
    this.mLevelPlatform.draw();
    var i;
    for(i=0;i<this.mSpikes.length;i++){
        this.mSpikes[i].draw(this.mCamera);
    }
    if(this.mLevelPlatform.isGhostEnabled())
        this.mGhost.draw(this.mCamera);
    this.mMouse.draw();
    if(this.mMap){
        this.mMiniCam.setupViewProjection();
        this.mLevelPlatform.drawAll(this.mMiniCam);
        for(i=0;i<this.mSpikes.length;i++){
            this.mSpikes[i].draw(this.mMiniCam);
        }
        if(this.mLevelPlatform.isGhostEnabled())
            this.mGhost.draw(this.mMiniCam);
    }
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
Level.prototype.update = function () {
   this.mLevelPlatform.update();
   
   gEngine.Physics.processCollision(this.mLevelPlatform,[]);

   var pl = this.mLevelPlatform.getObjectAt(this.mPlayer);
   var plX = pl.getXform();
   var wx,wy,wc,w,h;
   w = this.mCamera.getWCWidth();
   h = this.mCamera.getWCHeight();
   wc = this.mCamera.getWCCenter();
   wx = wc[0]-(w/2);
   wy = wc[1]-(h/2);
   this.mBg.getXform().setPosition(wc[0], wc[1]);
   
   if(this.mLevelPlatform.isLightEnabled()) {
        this.mGlobalLightSet.getLightAt(0).setXPos(plX.getXPos());
        this.mGlobalLightSet.getLightAt(0).setYPos(plX.getYPos());
        this.mGlobalLightSet.getLightAt(2).setXPos(this.mLevelPlatform.getWorldEnd());
        //this.mGlobalLightSet.getLightAt(2).setYPos(plX.getYPos());

        this.r++;
        this.b++;
        this.g++;
        this.mGlobalLightSet.getLightAt(this.kEndMarkerIndex).setColor([this.r,this.g,this.b,1]);
        if(this.r > 9) {
            this.r = 0;
        }
           if(this.g > 9) {
            this.g = 0;
        }
           if(this.b > 9) {
            this.b = 0;
        }

        this.mGlobalLightSet.getLightAt(3).setXPos(wc[0] - (w/2) + 3);
        this.mGlobalLightSet.getLightAt(3).setYPos(wc[1] + (h/2) - 10);
   }
   
   if(this.mLevelPlatform.isGhostEnabled()) {
        this.mGhost.rotateObjPointTo(pl.getXform().getPosition(),0.5);
        this.mGhost.update();
   }
   var stop = pl.isAlive(this.mSpikes,wx,wy,this.mLevelPlatform.getWorldEnd(),this.mGhost, this.mLevelPlatform.isGhostEnabled());
   if(stop){
       this.mLevelPlatform.stopScroll();
   }
   var change = pl.shakeOver();
   if(change||pl.getSuccess()){
       gEngine.GameLoop.stop();
   }
   this.mMouse.update(pl);
   if(gEngine.Input.isKeyPressed(gEngine.Input.keys.M)){
       this.mMap = true;
   }else{
       this.mMap = false;
   }
   /*if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Q)) {
        gEngine.GameLoop.stop();
   }*/
};
