/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectSet, TextureObject, Camera, vec2,
  FontRenderable, ParticleGameObjectSet, ParticleEmitter
  GameObject, Hero, Minion, Dye, Platform, Wall, DyePack, Particle, coins, score, life, x, deltaX,shipnumber */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Buy() {
    this.kBuy = "assets/shop.png";
    this.kShip1 = "assets/particle.png";
    this.kShip2 = "assets/wall.png";
    this.kShip3 = "assets/bg1.png";
    this.kSelect="assets/button.png";
    this.kOwn="assets/own.png";
    
    this.kBgm ="assets/sounds/sea.mp3";
    this.kCs ="assets/sounds/udchoose.mp3";
    this.kPs="assets/sounds/purchase.mp3";
    
    // The camera to view the scene
    this.mCamera = null;
}
gEngine.Core.inheritPrototype(Buy, Scene);
var shipnumber=0;
Buy.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBuy);
    gEngine.Textures.loadTexture(this.kShip1);
    gEngine.Textures.loadTexture(this.kShip2);
    gEngine.Textures.loadTexture(this.kShip3);
    gEngine.Textures.loadTexture(this.kSelect);
    gEngine.Textures.loadTexture(this.kOwn);
    
    gEngine.AudioClips.loadAudio(this.kBgm);
    gEngine.AudioClips.loadAudio(this.kCs);
    gEngine.AudioClips.loadAudio(this.kPs);
};

Buy.prototype.unloadScene = function () {    
    gEngine.Textures.unloadTexture(this.kBuy);
    gEngine.Textures.unloadTexture(this.kShip1);
    gEngine.Textures.unloadTexture(this.kShip2);
    gEngine.Textures.unloadTexture(this.kShip3);
    gEngine.Textures.unloadTexture(this.kSelect); 
    gEngine.Textures.unloadTexture(this.kOwn);
    
    //gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.kCs);
    gEngine.AudioClips.unloadAudio(this.kPs);
    
    var nextLevel=new MyGame();
    gEngine.Core.startScene(nextLevel);
    choice=1;
    back=1;
};


Buy.prototype.draw = function () {
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
Buy.prototype._initText = function (font, posX, posY, color, textH) {
    font.setColor(color);
    font.getXform().setPosition(posX, posY);
    font.setTextHeight(textH);
};

Buy.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 60), // position of the camera
        200,                         // width of camera
        [0, 0, 1280, 720]            // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.7, 0.7, 0.7, 1]);
    // sets the background to gray

    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    var buy = new SpriteRenderable(this.kBuy);
    buy.setElementPixelPositions(0,1024, 0, 512);
    buy.getXform().setSize(200, 120);
    buy.getXform().setPosition(50,60);
    this.mB = new GameObject(buy);
    
    var ship1 = new SpriteRenderable(this.kOwn);
    ship1.setElementPixelPositions(0,128, 0, 128);
    ship1.getXform().setSize(20, 20);
    ship1.getXform().setPosition(-15,60);
    this.mS1 = new GameObject(ship1);
    
    var ship2 = new SpriteRenderable(this.kOwn);
    ship2.setElementPixelPositions(0,128, 0, 128);
    ship2.getXform().setSize(20, 20);
    ship2.getXform().setPosition(-42+94,60);
    this.mS2 = new GameObject(ship2);
    
    var ship3 = new SpriteRenderable(this.kOwn);
    ship3.setElementPixelPositions(0,128, 0, 128);
    ship3.getXform().setSize(20, 20);
    ship3.getXform().setPosition(-42+94+64,60);
    this.mS3 = new GameObject(ship3);
    
    
    var sel = new SpriteRenderable(this.kSelect);
    sel.setElementPixelPositions(0,64, 0, 64);
    sel.getXform().setSize(13, 13);
    sel.getXform().setPosition(-42,18);
    this.mS = new GameObject(sel);
    
    this.mTextSysFont0= new FontRenderable("In level3, click [Space] to shoot.");
    this.mTextSysFont = new FontRenderable("Click [Space] to buy your ship.");
     this.mTextSysFont1 = new FontRenderable("Click [Q] to exit.");
    this.mTextSysFont2= new FontRenderable("You don't have enough gold!You can't buy it!");
    this.mTextSysFont3= new FontRenderable("Buy success!");
    this.mTextSysFont4= new FontRenderable(" ");
   
    this._initText(this.mTextSysFont0,80,110, [0.9, 0.9, 0.2, 1], 3.5);
    this._initText(this.mTextSysFont,80,100, [1, 1, 1, 1], 3.5);
    this._initText(this.mTextSysFont1,80,105, [1, 1, 1, 1], 3.5);
    this._initText(this.mTextSysFont2,40,60, [1, 1, 1, 1], 6);
    this._initText(this.mTextSysFont3,40,60, [1, 0, 0, 1], 6);
    this._initText(this.mTextSysFont4,5,110, [1, 0, 0, 1], 8); 
    
   /* var bgR = new SpriteRenderable(this.kBg);
    bgR.setElementPixelPositions(0, 1024, 0, 512);
    bgR.getXform().setSize(220, 120);
    bgR.getXform().setPosition(50,60);
    this.mBg = new GameObject(bgR);
    
    this.mSelect=new Renderable();   //控制选择
    this.mSelect.setColor([1,1,1,1]);
    this.mSelect.mXform.setSize(5,5);
    this.mSelect.getXform().setPosition(18,83);*/
    
//    gEngine.AudioClips.playBackgroundAudio(this.kBgm);
};
var select=1;

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
Buy.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    
    this.mB.draw(this.mCamera);
    this.mS.draw(this.mCamera);
    this.mTextSysFont0.draw(this.mCamera);
    this.mTextSysFont.draw(this.mCamera);
     this.mTextSysFont1.draw(this.mCamera);
    this.mTextSysFont4.draw(this.mCamera);
    if(own[0]==1)
    {
        this.mS1.draw(this.mCamera);
    }
    if(own[1]===1)
    {
        this.mS2.draw(this.mCamera);
    }
    if(own[2]===1)
    {
        this.mS3.draw(this.mCamera);
    }
    //this.mSelect.draw(this.mCamera);
};
// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
var value=[300,700,1300];
var own=[0,0,0];
Buy.prototype.update = function () {
     var index=64;
     this.mCamera.update();
    this._initText(this.mTextSysFont4,-30,108, [1, 1, 1, 1], 6);
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) 
    {       
        //gEngine.AudioClips.playACue(this.kCue);
        if(coins>=value[select-1]&&own[select-1]===0)
        {
        gEngine.AudioClips.playACue(this.kPs);
        coins=coins-value[select-1];
        shipnumber=select;
        own[select-1]=1;
        noship=0;
        }
        else if(own[select-1]===1)
        {
        shipnumber=select;    
        }
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Right)) {
       // this.mCamera.shake(-5, -5, 5, 20);      
       gEngine.AudioClips.playACue(this.kCs);
        if(this.mS.getBBox().mLL[0]>=43)
        {
        this.mS.mRenderComponent.mXform.incXPosBy(-2*index);
        select=select-2;
        }
        else
        {
        this.mS.mRenderComponent.mXform.incXPosBy(index);
        select=select+1; 
        }
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Left)) {
        gEngine.AudioClips.playACue(this.kCs);
        if(this.mS.getBBox().mLL[0]<=-42)
        {
        this.mS.mRenderComponent.mXform.incXPosBy(2*index);
        select=select+2;
        }
        else
        {
        this.mS.mRenderComponent.mXform.incXPosBy(-index);
        select=select-1;
        }
       
    }  
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q))
    {
        gEngine.AudioClips.playACue(this.kCs);
        gEngine.GameLoop.stop(); 
        select=1;
     }
     this.mTextSysFont4.setText(" "+coins);
};
