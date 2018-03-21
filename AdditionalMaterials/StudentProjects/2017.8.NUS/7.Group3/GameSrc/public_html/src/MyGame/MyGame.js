/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectSet, TextureObject, Camera, vec2,
  FontRenderable, ParticleGameObjectSet, ParticleEmitter
  GameObject, Hero, Minion, Dye, Platform, Wall, DyePack, Particle, coins, score, life, x, deltaX */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kParticleTexture = "assets/particle.png";
    this.kPrompt = "RigidBody Physics!";
    this.kBg = "assets/bg1.png";
    this.kButton = "assets/button.png";
    this.kSelect="assets/button.png";
    
    this.kBgm ="assets/sounds/sea.mp3";
    this.kCue ="assets/sounds/udchoose.mp3";
    
    // The camera to view the scene
    this.mCamera = null;


    // the hero and the support objects
    this.mHero = null;
    
    this.mCollidedObj = null;
    this.mAllPlatforms = new GameObjectSet();
    this.mAllMinions = new GameObjectSet();
    this.mAllDyePacks = new GameObjectSet();
    this.mAllParticles = new ParticleGameObjectSet();
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    var choice=1;//select
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kParticleTexture);
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kButton);
    gEngine.Textures.loadTexture(this.kSelect);
    
    gEngine.AudioClips.loadAudio(this.kBgm);
    gEngine.AudioClips.loadAudio(this.kCue);
};

MyGame.prototype.unloadScene = function () {    
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kParticleTexture);
    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kButton);  
    gEngine.Textures.unloadTexture(this.kSelect);    
    
    //gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.kCue);
  //  gEngine.AudioClips.unloadAudio(this.kbgm);
    
//    if(choice===1)
//    var nextLevel = new level();  // next level to be loaded
//    if(choice===2)
//    var nextLevel = new level2(); 
//    if(choice===3)
//    var nextLevel = new level3();
    if(choice===4)
    var nextLevel = new Buy();
    else if(choice===5)
    var nextLevel = new Howtoplay();
    else if(choice===6)
    var nextLevel = new Aboutus(); 
    else {var nextLevel = new Loading(); }
    gEngine.Core.startScene(nextLevel);
};


MyGame.prototype.draw = function () {
    // Step A: Game loop not running, unload all assets
    // stop the background audio
    gEngine.AudioClips.stopBackgroundAudio();

    // unload the scene resources
    // gEngine.AudioClips.unloadAudio(this.kBgClip);
    //      The above line is commented out on purpose because
    //      you know this clip will be used elsewhere in the game
    //      So you decide to not unload this clip!!
    gEngine.AudioClips.unloadAudio(this.kCue);
};


MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 60), // position of the camera
        200,                         // width of camera
        [0, 0, 1280, 720]            // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.7, 0.7, 0.7, 1]);
    // sets the background to gray

    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    var bgR = new SpriteRenderable(this.kBg);
    bgR.setElementPixelPositions(0, 1024, 0, 512);
    bgR.getXform().setSize(220, 120);
    bgR.getXform().setPosition(50,60);
    this.mBg = new GameObject(bgR);
    
    this.mSelect=new Renderable();   //控制选择
    this.mSelect.setColor([1,1,1,1]);
    this.mSelect.mXform.setSize(5,5);
    this.mSelect.getXform().setPosition(18,83);
    
    var sel = new SpriteRenderable(this.kSelect);
    sel.setElementPixelPositions(0,64, 0, 64);
    sel.getXform().setSize(8,8);
    sel.getXform().setPosition(18,83);
    this.mS = new GameObject(sel);  
    if(back===0){
    gEngine.AudioClips.playBackgroundAudio(this.kBgm);}
    back=0;
};
var back=0;  

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    
    this.mBg.draw(this.mCamera);
    //this.mSelect.draw(this.mCamera);
    this.mS.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
     var index=13.8;
     this.mCamera.update();
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) 
    {
        gEngine.AudioClips.playACue(this.kCue);
        //gEngine.AudioClips.playACue(this.kCue);
        startloading=1;       
    }
    if(startloading===1)
    {
        loading--;
        gEngine.DefaultResources.setGlobalAmbientIntensity(loading/27+0.8);
        if(loading===0){
            
        gEngine.GameLoop.stop();
        loading=60;
        startloading=0;
        }
    }
    else {
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)) {
       // this.mCamera.shake(-5, -5, 5, 20);      
       gEngine.AudioClips.playACue(this.kCue);
        if(this.mSelect.mXform.getYPos()>=83)
        {
        this.mSelect.mXform.incYPosBy(-5*index);
        this.mS.mRenderComponent.mXform.incYPosBy(-5*index);
        choice=choice+5;
        }
        else
        {
        this.mSelect.mXform.incYPosBy(index);
        this.mS.mRenderComponent.mXform.incYPosBy(index);
        choice=choice-1;
    }
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Down)) {
        gEngine.AudioClips.playACue(this.kCue);
        if(this.mSelect.mXform.getYPos()<=23)
        {
        this.mSelect.mXform.incYPosBy(5*index);
        this.mS.mRenderComponent.mXform.incYPosBy(5*index);
        choice=choice-5;
        }
        else
        {
        this.mSelect.mXform.incYPosBy(-index);
        this.mS.mRenderComponent.mXform.incYPosBy(-index);
        choice=choice+1;
        }
       // this.mCamera.shake(10, 10, 5, 20);
    }  }
};
