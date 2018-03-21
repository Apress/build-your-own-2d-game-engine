/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectSet, TextureObject, Camera, vec2,
  FontRenderable, ParticleGameObjectSet, ParticleEmitter
  GameObject, Hero, Minion, Dye, Platform, Wall, DyePack, Particle, coins, score, life, x, deltaX */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function level3() {
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kBg1 = "assets/sea1.png";
    this.kmAllcoins = "assets/minion_sprite1.png";
    this.kObstacle = "assets/minion_sprite2.png";
    this.kMonster = "assets/monster.png";
    this.kTreasure ="assets/treasure.png";
    this.kProjectileTexture="assets/particle.png";
    this.boat1="assets/boat.png";
    this.boat2="assets/boat1.png";
    this.boat3="assets/boat2.png";
    this.hero1="assets/hero1.png";
    this.hero2="assets/hero2.png";
    this.hero3="assets/hero3.png";
    this.hero0="assets/hero0.png";
    
    
    this.kBgm ="assets/sounds/story.mp3";
    this.kmoney ="assets/sounds/jewel.mp3";
    this.kcollision ="assets/sounds/collision2.mp3";
    this.kshoot ="assets/sounds/flaunch.mp3";
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
    this.mProjectile = new GameObjectSet();
    this.mAllObstacle = new GameObjectSet();
    Projectile2.kTexture = this.kProjectileTexture;
}
gEngine.Core.inheritPrototype(level3, Scene);

level3.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kmAllcoins);
    gEngine.Textures.loadTexture(this.kBg1);
    gEngine.Textures.loadTexture(this.kMonster);
    gEngine.Textures.loadTexture(this.kTreasure);
    gEngine.Textures.loadTexture(this.kProjectileTexture);
    gEngine.Textures.loadTexture(this.boat1);
    gEngine.Textures.loadTexture(this.boat2);
    gEngine.Textures.loadTexture(this.boat3);
    gEngine.Textures.loadTexture(this.hero0);
    gEngine.Textures.loadTexture(this.hero1);
    gEngine.Textures.loadTexture(this.hero2);
    gEngine.Textures.loadTexture(this.hero3);
    gEngine.Textures.loadTexture(this.kObstacle);
    
         gEngine.AudioClips.loadAudio(this.kBgm);
    gEngine.AudioClips.loadAudio(this.kmoney);
    gEngine.AudioClips.loadAudio(this.kcollision);
    gEngine.AudioClips.loadAudio(this.kshoot);
};

level3.prototype.unloadScene = function () {    
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kmAllcoins);
    gEngine.Textures.unloadTexture(this.kBg1);
    gEngine.Textures.unloadTexture(this.kMonster);
    gEngine.Textures.unloadTexture(this.kTreasure);
    gEngine.Textures.unloadTexture(this.kProjectileTexture);
    gEngine.Textures.unloadTexture(this.boat1);
    gEngine.Textures.unloadTexture(this.boat2);
    gEngine.Textures.unloadTexture(this.boat3);
    gEngine.Textures.unloadTexture(this.hero0);
    gEngine.Textures.unloadTexture(this.hero1);
    gEngine.Textures.unloadTexture(this.hero2);
    gEngine.Textures.unloadTexture(this.hero3);
    gEngine.Textures.unloadTexture(this.kObstacle);
    
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.kmoney);
    gEngine.AudioClips.unloadAudio(this.kcollision);
    gEngine.AudioClips.unloadAudio(this.kshoot);
    if(quit===1)
    {
        var nextLevel = new MyGame();
        quit=0; 
    }
    else if(choice===3)
    {
        var nextLevel = new level3();
    }
    gEngine.Core.startScene(nextLevel);
    choice=1;
};


level3.prototype.draw = function () {
    // Step A: Game loop not running, unload all assets
    // stop the background audio
    gEngine.AudioClips.stopBackgroundAudio();

    gEngine.AudioClips.unloadAudio(this.kCue);

};


level3.prototype.initialize = function () {
    //bg
    var bgR = new SpriteRenderable(this.kBg1);
    bgR.setElementPixelPositions(0,4096, 0, 512);
    bgR.getXform().setSize(1200, 150);
    bgR.getXform().setPosition(500,60);
    this.mBg = new GameObject(bgR);
    var bgR2 = new SpriteRenderable(this.kBg1);
    bgR2.setElementPixelPositions(0,1024, 0, 512);
    bgR2.getXform().setSize(300, 150);
    bgR2.getXform().setPosition(-40,60);
    this.mBg2 = new GameObject(bgR2);
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 60), // position of the camera
        200,                         // width of camera
        [0, 0, 1280, 720]            // viewport (orgX, orgY, width, height)   ratio=0.5625
    );
    this.mCamera.setBackgroundColor([0.7, 0.7, 0.7, 0]);
    // sets the background to gray
    this.nCamera = new Camera(
        vec2.fromValues(levellength/2, 60), // position of the camera
        levellength,                         // width of camera
        [1280-350,720-70, 350, 70]            // viewport (orgX, orgY, width, height)
    );
    this.nCamera.setBackgroundColor([0.18, 0.33, 0.74, 0.5]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    this.mFloor = new Renderable();
    this.mFloor.setColor([0,0,1,0.05]);
    this.mFloor.mXform.setSize(140,32.5);
    this.mFloor.getXform().setPosition(-100,3.25-6);
    
    // the important objects
    //this.mMonster= new Monster(this.kMonster,-180,29);
    this.mTreasure= new Treasure(this.kTreasure,levellength3-70,50);
    this.mHero = new Heroinsea(this.hero0,-150,80); 
    if(shipnumber===1){
    this.mShip = new Ship(this.boat1,-52.5,26); }
    else if(shipnumber===2){
    this.mShip = new Ship(this.boat2,-52.5,26); }
    if(shipnumber===3){
    this.mShip = new Ship(this.boat3,-52.5,26); }
    else if(shipnumber===0){this.mShip=null;}
    //this.mHero = new Hero(this.kMinionSprite,-30, 80);   
    // create a few objects ...
    var i,j,obj,k;
    var rx=[],ry=[],dx=[],dy=[];
    rx[-1]=80;
    dx[-1]=60;
    for (i = 0; i<40; i++) 
    {
        ry[i] = 40+Math.random()*(maxheight-60);
        rx[i] = 50+Math.random() *50+rx[i-1];
        obj = new Minion(this.kMinionSprite, rx[i], ry[i]);
        this.mAllMinions.addToSet(obj);   
    }
    for (i = 0; i<15; i++) 
    {
        ry[i] = 18;
        rx[i] = 100+Math.random() *50+rx[i-1];
        obj = new Minion(this.kObstacle, rx[i], ry[i]);
        this.mAllObstacle.addToSet(obj);   
        while(Math.random()*10<5)
        {
        ry[i] = 18;
        rx[i] = rx[i-1]+10;
        obj = new Minion(this.kObstacle, rx[i], ry[i]);
        this.mAllObstacle.addToSet(obj);   
        }
    }
    for (i = 0;i<20; i++) 
    {
        dy[i] = 30+Math.random()*(maxheight-45);
        dx[i] = 25+Math.random() * 30+dx[i-1];
        for(j=0;j<10;j++)
        {
            if(this.near(dx[i],dy[i],rx[j],ry[j]))
            {
                if(dy[i]>36)
                {
                dy[i]=dy[i]-30;
                }
                else
                {
                dy[i]=dy[i]+30;  
                }
            }
        }
        obj = new Minion(this.kmAllcoins, dx[i], dy[i]);
        this.mAllcoins.addToSet(obj);
    }             
    // 
    this.mTextSysFont = new FontRenderable("Life:3 Money:0 Score:0");
    this.mTextSysFont2= new FontRenderable("Invincible State");
    this.mTextSysFont3= new FontRenderable("Game Over: Your score:");
    this.mTextSysFont4= new FontRenderable("Congratulation: Your score:");
    this.mTextSysFont5= new FontRenderable("Press SPACE to start again");
    this.mTextSysFont6= new FontRenderable("Buy your ship to start this level");
    this.mTextSysFont7= new FontRenderable("Press Q to go back");
    this._initText(this.mTextSysFont,x-90,110, [1, 1, 1, 1], 3);
    this._initText(this.mTextSysFont2,x-70,110, [1, 1, 1, 1], 3);
    this._initText(this.mTextSysFont3,x,60, [1, 0, 0, 1], 6);
    this._initText(this.mTextSysFont4,x,60, [1, 0, 0, 1], 6);
    this._initText(this.mTextSysFont5,x,50, [1, 0, 0, 1], 6);
    this._initText(this.mTextSysFont6,x-70,60, [1, 0, 0, 1], 6);
    this._initText(this.mTextSysFont7,x-70,50, [1, 0, 0, 1], 6); 
    
    gEngine.AudioClips.playBackgroundAudio(this.kBgm);
};

level3.prototype._initText = function (font, posX, posY, color, textH) {
    font.setColor(color);
    font.getXform().setPosition(posX, posY);
    font.setTextHeight(textH);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
level3.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1]); // clear to light gray
    if(countdown2>=1)
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
    this.mTreasure.draw(this.mCamera); 
    this.mHero.draw(this.mCamera);
    if(shipnumber!=0){
    this.mShip.draw(this.mCamera);}
    if(noship===1)
        {
            this.mTextSysFont7.draw(this.mCamera);
            this.mTextSysFont6.draw(this.mCamera);       
        }
    }
    else if(countdown2<1)
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
    this.mAllObstacle.draw(this.mCamera);
    //this.mAllDyePacks.draw(this.mCamera);
    this.mTreasure.draw(this.mCamera); 
    this.mHero.draw(this.mCamera);
    this.mHero.mProjectiles.draw(this.mCamera);
    this.mAllParticles.draw(this.mCamera);
    this.mTextSysFont.draw(this.mCamera);
    
    if(invincible>0)
    {
        this.mTextSysFont2.draw(this.mCamera);
    }    
    if(start===0)
    {
        this.mTextSysFont3.draw(this.mCamera);
        this.mTextSysFont5.draw(this.mCamera);
    }
    if(pass===1)
    {
        this.mTextSysFont4.draw(this.mCamera);
    }
    if(x>levellength3/2)
    {
        this.nCamera = new Camera(
        vec2.fromValues(levellength/2+levellength3/2, 60), // position of the camera
        levellength,                         // width of camera
        [1280-350,720-70, 350, 70]            // viewport (orgX, orgY, width, height)
          );
    this.nCamera.setBackgroundColor([0.18, 0.33, 0.74, 0.5]);
    }
    this.nCamera.setupViewProjection();
    this.mAllMinions.draw(this.nCamera);
    this.mAllObstacle.draw(this.nCamera);
    this.mAllDyePacks.draw(this.nCamera);
    this.mHero.draw(this.nCamera);
    this.mAllcoins.draw(this.nCamera);
    this.mAllParticles.draw(this.nCamera);
    }
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
level3.prototype.update = function () {   
    var func = function(x, y) { this.createParticle.call(this, x, y); };
    this.mCamera.update();  // to ensure proper interpolated movement effects
    this.mAllPlatforms.update();
    this.mAllMinions.update();
    this.mAllcoins.update();
  //  this.mHero.update(this.mAllMinions,this.mCamera);
    this._initText(this.mTextSysFont2,x-70,80, [1, 1, 1, 1], 3);   
    this.mTextSysFont3.setText("Game Over: Your score:"+score);
    this._initText(this.mTextSysFont5,x-20,50, [0, 0, 0, 1], 6);
    this._initText(this.mTextSysFont3,x-20,60, [0, 0, 0, 1], 6);
    this.mTextSysFont4.setText("Congratulation: Your score:"+score);
    this._initText(this.mTextSysFont4,x-20,60, [0, 0, 0, 1], 6);
    if(countdown2===1)
    {
        if(shipnumber===1){
        this.mHero = new Heroinsea(this.hero1,this.mHero.getXform().getXPos(),this.mHero.getXform().getYPos()); }
        if(shipnumber===2){
        this.mHero = new Heroinsea(this.hero2,this.mHero.getXform().getXPos(),this.mHero.getXform().getYPos()); }
        if(shipnumber===3){
        this.mHero = new Heroinsea(this.hero3,this.mHero.getXform().getXPos(),this.mHero.getXform().getYPos()); }
    }
    this.mHero.update(this.mAllMinions,this.mCamera);
   var hBbox = this.mHero.getBBox();
    //var bBbox = this.mBrain.getBBox();
    //this.mCamera.zoomBy(1.1);
    var i,obj,j;
    for (i = 0; i<this.mAllMinions.size(); i++) {
        obj = this.mAllMinions.getObjectAt(i);
        var bBbox=obj.getBBox();    
        if (hBbox.intersectsBound(bBbox)&&invincible===0) 
        {
            this.mHero.die();
        } 
    }
    for (i = 0; i<this.mAllObstacle.size(); i++) {
        obj = this.mAllObstacle.getObjectAt(i);
        var bBbox=obj.getBBox();    
        if (hBbox.intersectsBound(bBbox)&&invincible===0) 
        {
            this.mHero.die();

        } 
    }
    for (i = 0; i<this.mAllMinions.size(); i++) {
        obj = this.mAllMinions.getObjectAt(i);
        var bBbox=obj.getBBox();    
        if (hBbox.intersectsBound(bBbox)&&invincible===0) 
        {
            this.mHero.die();
          
        } 
    }
    for (i = 0; i<this.mAllcoins.size(); i++) { //get a coin
        obj = this.mAllcoins.getObjectAt(i);
        var bBbox=obj.getBBox();
        if (hBbox.intersectsBound(bBbox)) 
        {            
        coins=coins+100;   
        get++;
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
        choice=0;
        noship=0;
        quit=1;
        coins=coins-get*100;
        this.mHero.clear();      
        gEngine.GameLoop.stop();
    }
    if(noship===0&&start===0&&gEngine.Input.isKeyClicked(gEngine.Input.keys.Space))
    {
        choice=3;
        quit=0;
        coins=coins-get*100;
        this.mHero.clear(); 
        gEngine.GameLoop.stop();
    }    
};

level3.prototype.near = function(x1,y1,x2,y2)
{
    if(Math.abs(x1-x2)<20&&Math.abs(y1-y2)<20)
        return 1;
    else return 0;
};



