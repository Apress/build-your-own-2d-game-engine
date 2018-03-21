/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectSet, TextureObject, Camera, vec2,
  FontRenderable, ParticleGameObjectSet, ParticleEmitter
  GameObject, Hero, Minion, Dye, Platform, Wall, DyePack, Particle, coins, score, life, x, deltaX, y */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function level2() {
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kWallTexture = "assets/wall.png";
    this.kParticleTexture = "assets/particle.png";
    this.kPrompt = "RigidBody Physics!";
    this.kBg1 = "assets/bg3.png";
    this.kBg2 = "assets/bg3.png";
    this.kmAllcoins = "assets/minion_sprite1.png";
    this.kMonster = "assets/monster.png";
    this.kTreasure ="assets/treasure.png";
    this.kSkull="assets/skull.png";
    this.kRoad="assets/road.png";
    
    this.kBgm ="assets/sounds/story.mp3";
    this.kmoney ="assets/sounds/jewel.mp3";
     this.kcollision ="assets/sounds/collision2.mp3";
     this.kmonster ="assets/sounds/monster.mp3";


    // The camera to view the scene
    this.mCamera = null;

    // the hero and the support objects
    this.mHero = null;
    this.mCollidedObj = null;
    this.mFloor = null;
    this.mAllPlatforms = new GameObjectSet();
    this.mAllMinions = new GameObjectSet();
    this.mAllcoins = new GameObjectSet();
    this.mAllDyePacks = new GameObjectSet();
    this.mAllParticles = new ParticleGameObjectSet();
}
gEngine.Core.inheritPrototype(level2, Scene);

level2.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kmAllcoins);
    gEngine.Textures.loadTexture(this.kWallTexture);
    gEngine.Textures.loadTexture(this.kParticleTexture);
    gEngine.Textures.loadTexture(this.kBg1);
    gEngine.Textures.loadTexture(this.kBg2);
    gEngine.Textures.loadTexture(this.kMonster);
    gEngine.Textures.loadTexture(this.kTreasure);
    gEngine.Textures.loadTexture(this.kRoad);
    
    gEngine.AudioClips.loadAudio(this.kBgm);
    gEngine.AudioClips.loadAudio(this.kmoney);
    gEngine.AudioClips.loadAudio(this.kcollision);
    gEngine.AudioClips.loadAudio(this.kmonster);
};

level2.prototype.unloadScene = function () {    
   gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kmAllcoins);
    gEngine.Textures.unloadTexture(this.kWallTexture);
    gEngine.Textures.unloadTexture(this.kParticleTexture);
    gEngine.Textures.unloadTexture(this.kBg1);
    gEngine.Textures.unloadTexture(this.kBg2);
    gEngine.Textures.unloadTexture(this.kMonster);
    gEngine.Textures.unloadTexture(this.kTreasure);
    gEngine.Textures.unloadTexture(this.kRoad);
    
     gEngine.AudioClips.stopBackgroundAudio();
      gEngine.AudioClips.unloadAudio(this.kmoney);
      gEngine.AudioClips.unloadAudio(this.kcollision);
      gEngine.AudioClips.unloadAudio(this.kmonster);
    if(buy===1)
    {
        var nextLevel = new Buy();      
    }
    else if(quit===1)
    {
        var nextLevel = new MyGame();
    }
    else if(choice===2)
    {
        var nextLevel = new level2();
    }
    
    gEngine.Core.startScene(nextLevel);
    choice=1;
};


level2.prototype.draw = function () {
    // Step A: Game loop not running, unload all assets
    // stop the background audio
    gEngine.AudioClips.stopBackgroundAudio();

    gEngine.AudioClips.unloadAudio(this.kCue);

};


level2.prototype.initialize = function () {
    
    this.mTheLight = new Light();
    this.mTheLight.setNear(8);
    this.mTheLight.setFar(25);
    this.mTheLight.setZPos(8);
    this.mTheLight.setXPos(x);
    this.mTheLight.setYPos(y);  // Position above LMinion
    this.mTheLight.setColor([0.9, 0.9,0.9 ,0.2]);
    
    //bg
    var bgR = new LightRenderable(this.kBg1);
    bgR.setElementPixelPositions(0,2048, 0, 512);
    bgR.getXform().setSize(800, 200);
    bgR.getXform().setPosition(250,60);
    bgR.addLight(this.mTheLight);
    this.mBg = new GameObject(bgR);
    
    
    var bgR2 = new SpriteRenderable(this.kBg2);
    bgR2.setElementPixelPositions(0,1024, 0, 512);
    bgR2.getXform().setSize(240, 120);
    bgR2.getXform().setPosition(-70,60);
    this.mBg2 = new GameObject(bgR2);

    
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 60), // position of the camera
        200,                         // width of camera
        [0, 0, 1280, 720]            // viewport (orgX, orgY, width, height)   ratio=0.5625
    );
    this.mCamera.setBackgroundColor([0.7, 0.7, 0.7, 1]);
    // sets the background to gray
    
    
    this.nCamera = new Camera(
        vec2.fromValues(levellength/2-15, 60), // position of the camera
        levellength,                         // width of camera
        [1280-350,720-70, 350, 70]            // viewport (orgX, orgY, width, height)
    );
    this.nCamera.setBackgroundColor([0.18, 0.33, 0.74, 0.5]);
    
    
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    this.mFloor = new Platform(this.kRoad,-100,3.5*2-0.2);
    // the important objects
    this.mMonster= new Monster(this.kMonster,-180,29-11.25);
    
    this.mTreasure= new Treasure(this.kTreasure,levellength-70,50);
    this.mTreasure.getRenderable().addLight(this.mTheLight);
    
    this.mHero = new Hero1(this.kMinionSprite,-150, 3.75+6);   
     this.mHero.getRenderable().addLight(this.mTheLight);
    //this.mHero = new Hero(this.kMinionSprite,-30, 80);   
    // create a few objects ...
    
    
    var i,j,obj1,obj2,obj3;
    var rx,ry,dx;
    rx=0;
    dx=30;
    for (i = 0; i<10; i++) 
    {
        rx = rx+dx;
        ry = Math.random()*15-Math.random()*15;
        obj1 = new Column(this.kWallTexture, rx, ry);
        this.mAllMinions.addToSet(obj1); 
        obj1.getRenderable().addLight(this.mTheLight);
        obj2 = new Column(this.kWallTexture, rx, ry+100+30);
        this.mAllMinions.addToSet(obj2); 
        obj2.getRenderable().addLight(this.mTheLight);
        if(Math.random()*2<1)
        {
            obj3 = new Minion(this.kmAllcoins, rx+25, ry+20+Math.random()*90);
            this.mAllcoins.addToSet(obj3);
            if(Math.random()*2<1)
            {
            obj3 = new Minion(this.kmAllcoins, rx+40, ry+20+Math.random()*90);
            this.mAllcoins.addToSet(obj3);
            rx=rx+10;
            }
            rx=rx+25;
        }
    }
  
    this.mTextSysFont = new FontRenderable("Life:5 Money:0 Score:0");
    this.mTextSysFont2= new FontRenderable("Invincible State");
    this.mTextSysFont3= new FontRenderable("Game Over: Your score:");
    this.mTextSysFont4= new FontRenderable("Congratulation: Your score:");
    this.mTextSysFont5=new FontRenderable("[B]: Buy your Pirate Ship");
    this.mTextSysFont6=new FontRenderable("[Q]:Return to main menu");
    this.mTextSysFont7=new FontRenderable("Press SPACE to start again");
    this._initText(this.mTextSysFont,x-90,110, [1, 1, 1, 1], 3);
    this._initText(this.mTextSysFont2,x-70,110, [1, 1, 1, 1], 3);
    this._initText(this.mTextSysFont3,x,60, [1, 0, 0, 1], 6);
    this._initText(this.mTextSysFont4,x,60, [1, 0, 0, 1], 6);
    this._initText(this.mTextSysFont5,x,40, [0, 0, 0, 1], 6);
    this._initText(this.mTextSysFont6,x,20, [0, 0, 0, 1], 6);
    this._initText(this.mTextSysFont7,x,50, [0, 0, 0, 1], 6);
    
    gEngine.AudioClips.playBackgroundAudio(this.kBgm);
};

level2.prototype._initText = function (font, posX, posY, color, textH) {
    font.setColor(color);
    font.getXform().setPosition(posX, posY);
    font.setTextHeight(textH);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
level2.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    if(countdown>1)
    {
    this.mCamera = new Camera(
        vec2.fromValues(x-120,60),   // position of the camera
        200,                        // width of camera
        [0, 0, 1280, 720]         // viewport (orgX, orgY, width, height)
        //[0, 0, 800,600]  
        );
    this.mCamera.setupViewProjection();  
    this.mBg2.draw(this.mCamera);
    this.mFloor.draw(this.mCamera);
    this.mHero.draw(this.mCamera);
     this.mMonster.draw(this.mCamera);
    }
    else if(countdown<1)
    {
    //game starts
    this.mCamera = new Camera(
        vec2.fromValues(x+deltaX,60),   // position of the camera
        200,                        // width of camera
        [0, 0, 1280, 720]         // viewport (orgX, orgY, width, height)
        //[0, 0, 800,600]  
        );
    this.mCamera.setupViewProjection();
    this.mBg.draw(this.mCamera);
    //this.mAllPlatforms.draw(this.mCamera);
    this.mAllMinions.draw(this.mCamera);
    this.mAllcoins.draw(this.mCamera);
    //this.mAllDyePacks.draw(this.mCamera);
    this.mTreasure.draw(this.mCamera); 
    this.mHero.draw(this.mCamera);
    
    this.mTextSysFont.draw(this.mCamera);
    if(invincible>0)
    {
        this.mTextSysFont2.draw(this.mCamera);
    }    
    if(start===0)
    {
        this.mTextSysFont3.draw(this.mCamera);
        this.mTextSysFont7.draw(this.mCamera);
    }
    if(pass===1)
    {
        this.mCamera.setupViewProjection();
        this.mBg.draw(this.mCamera); 
        this.mAllMinions.draw(this.mCamera);
        this.mTreasure.draw(this.mCamera); 
        this.mHero.draw(this.mCamera);
       
        this.mAllcoins.draw(this.mCamera);

        
        this.mTextSysFont4.draw(this.mCamera);
        this.mTextSysFont5.draw(this.mCamera);
        this.mTextSysFont6.draw(this.mCamera);
    }
    this.nCamera.setupViewProjection();
    this.mAllMinions.draw(this.nCamera);
    this.mHero.draw(this.nCamera);
    this.mAllcoins.draw(this.nCamera);

    }
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
level2.prototype.update = function () {   
    var func = function(x, y) { this.createParticle.call(this, x, y); };
    this.mCamera.update();  // to ensure proper interpolated movement effects
    this.mHero.update();
    //var lightx=this.mHero.getXPos();
    //var lighty=this.mHero.getYPos();
     this.mTheLight.setXPos(x-80);
      this.mTheLight.setYPos(y+20);  
 
       
    
    this.mMonster.update();
    this.mAllcoins.update();

    this._initText(this.mTextSysFont2,x-70,80, [1, 1, 1, 1], 3);   
    this.mTextSysFont3.setText("Game Over: Your score:"+score);
    this._initText(this.mTextSysFont3,x-20,60, [0, 0, 0, 1], 6);
    this._initText(this.mTextSysFont7,x-20,50, [0, 0, 0, 1], 6);
    this.mTextSysFont4.setText("Congratulation: Your score:"+score);
    this._initText(this.mTextSysFont4,x-20,60, [1, 0, 0, 1], 6);
    this.mTextSysFont5.setText("[B]: Buy your Pirate Ship");
    this._initText(this.mTextSysFont5,x-20,40, [1, 0, 0, 1], 6);
    this.mTextSysFont6.setText("[Q]: Return to main menu");
    this._initText(this.mTextSysFont6,x-20,20, [1, 0, 0, 1], 6);
    var hBbox = this.mHero.getBBox();
    //var bBbox = this.mBrain.getBBox();
    //this.mCamera.zoomBy(1.1);
    
     if(countdown>170){
        gEngine.AudioClips.playACue(this.kmonster);
    }
    if(countdown>145&&countdown<155){
          gEngine.AudioClips.playACue(this.kmonster);
    }
    
    var i,obj;
    for (i = 0; i<this.mAllMinions.size(); i++) 
    {
        obj = this.mAllMinions.getObjectAt(i);
        var bBbox=obj.getBBox();
        if (hBbox.intersectsBound(bBbox)&&invincible===0) 
        {
            if(pass!==1){
            this.mHero.die();  
            }
            if(pass!==1&&life>0){
             gEngine.AudioClips.playACue(this.kcollision);
            }
      
            
        }    
    }
    for (var i = 0; i<this.mAllcoins.size(); i++) { //get a coin
        obj = this.mAllcoins.getObjectAt(i);
        var bBbox=obj.getBBox();
        if (hBbox.intersectsBound(bBbox))
        {   
        get++;
        coins=coins+100;          
        this.mAllcoins.removeFromSet(obj);   //remove the coin      
        score=score+100*deltaX*10;   
        gEngine.AudioClips.playACue(this.kmoney);
        }    
    }
    

    this.mTextSysFont.setText("Life:"+life+" "+"Money:"+coins+" "+"Score:"+score);
 
     //physics simulation
//    this._physicsSimulation();
    this.mTextSysFont.getXform().setPosition(x-90,110);
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q))
    {
        quit=1;buy=0;
        coins=coins-get*100;
        gEngine.GameLoop.stop();
        this.mHero.clear();
    }
    if(pass===1){
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.B))
    {
       buy=1;quit=0;
       gEngine.GameLoop.stop();
       this.mHero.clear();
    }}
    if(start===0&&gEngine.Input.isKeyClicked(gEngine.Input.keys.Space))
    {
        choice=2;     
        quit=0;
        coins=coins-get*100;
        gEngine.GameLoop.stop();
        this.mHero.clear(); 
    }
    };




