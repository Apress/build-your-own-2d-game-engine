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

function level() {
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kWallTexture = "assets/wall.png";
    this.kParticleTexture = "assets/particle.png";
    this.kPrompt = "RigidBody Physics!";
    this.kBg1 = "assets/bg2.png";
    this.kBg2 = "assets/bg2'.png";
    this.kmAllcoins = "assets/minion_sprite1.png";
    this.kMonster = "assets/monster.png";
    this.kTreasure ="assets/treasure.png";
    this.kRoad="assets/road.png";
    this.kProjectileTexture="assets/dye_pack.png";
    this.kmonster1= "assets/monster1.png";
    this.kBgm ="assets/sounds/story.mp3";
    this.kcollision = "assets/sounds/collision2.mp3";
    this.kmoney ="assets/sounds/jewel.mp3";
    this.kmonster ="assets/sounds/monster.mp3";
  
    
    
    // The camera to view the scene
    this.mCamera = null;


    // the hero and the support objects
    this.mHero = null;
    this.mMonster_shoot=new GameObjectSet();
    this.mCollidedObj = null;
    this.mFloor = null;
    this.mAllPlatforms = new GameObjectSet();
    this.mAllMinions = new GameObjectSet();
    this.mAllcoins = new GameObjectSet();
    this.mAllDyePacks = new GameObjectSet();
    this.mAllParticles = new ParticleGameObjectSet();
    
    this.mProjectile = new GameObjectSet();
    Projectile.kTexture = this.kProjectileTexture;
    //Projectile.mHero=this.mHero;
}
gEngine.Core.inheritPrototype(level, Scene);

level.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kmAllcoins);
    gEngine.Textures.loadTexture(this.kWallTexture);
    gEngine.Textures.loadTexture(this.kParticleTexture);
    gEngine.Textures.loadTexture(this.kProjectileTexture);
    gEngine.Textures.loadTexture(this.kBg1);
    gEngine.Textures.loadTexture(this.kBg2);
    gEngine.Textures.loadTexture(this.kMonster);
    gEngine.Textures.loadTexture(this.kTreasure);
    gEngine.Textures.loadTexture(this.kRoad);
    gEngine.Textures.loadTexture(this.kmonster1);
    
     gEngine.AudioClips.loadAudio(this.kBgm);
     gEngine.AudioClips.loadAudio(this.kcollision);
      gEngine.AudioClips.loadAudio(this.kmoney);
      gEngine.AudioClips.loadAudio(this.kmonster);
   // gEngine.Textures.loadTexture(this.kMonster_shoot);
};

level.prototype.unloadScene = function () {    
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kmAllcoins);
    gEngine.Textures.unloadTexture(this.kWallTexture);
    gEngine.Textures.unloadTexture(this.kParticleTexture);
    gEngine.Textures.unloadTexture(this.kProjectileTexture);
    gEngine.Textures.unloadTexture(this.kBg1);
    gEngine.Textures.unloadTexture(this.kBg2);
    gEngine.Textures.unloadTexture(this.kMonster);
    gEngine.Textures.unloadTexture(this.kTreasure);
    gEngine.Textures.unloadTexture(this.kRoad);
    gEngine.Textures.unloadTexture(this.kmonster1);
    
     gEngine.AudioClips.stopBackgroundAudio();
     gEngine.AudioClips.unloadAudio(this.kcollision);
     gEngine.AudioClips.unloadAudio(this.kmoney);
     //gEngine.AudioClips.unloadAudio(this.k);
  //  gEngine.Textures.unloadTexture(this.kMonster_shoot);
    var nextLevel = new Loading(); 
    gEngine.Core.startScene(nextLevel);
};


level.prototype.draw = function () {
    // Step A: Game loop not running, unload all assets
    // stop the background audio
    gEngine.AudioClips.stopBackgroundAudio();

    gEngine.AudioClips.unloadAudio(this.kCue);

};


level.prototype.initialize = function () {
    //bg
    var bgR = new SpriteRenderable(this.kBg1);
    bgR.setElementPixelPositions(0,2048, 0, 512);
    bgR.getXform().setSize(800, 200);
    bgR.getXform().setPosition(250,60);
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
    this.mCamera.setBackgroundColor([0.7, 0.7, 0.7, 0]);
    // sets the background to gray
    
    
    this.nCamera = new Camera(
        vec2.fromValues(levellength/2, 60), // position of the camera
        levellength,                         // width of camera
        [1280-350,720-70, 350, 70]            // viewport (orgX, orgY, width, height)
    );
    this.nCamera.setBackgroundColor([0.18, 0.33, 0.74, 0.5]);
    
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    this.mFloor = new Platform(this.kRoad,-100,3.5*2-0.2);
    // the important objects
    this.mMonster= new Monster(this.kMonster,-180,29-11.25);
    this.mMonster_shoot=new Monstershoot(this.kmonster1,50,60);
    
    this.mTreasure= new Treasure(this.kTreasure,levellength-70,50);
    //this.mSkull=new Treasure(this.kSkull,0,90);
    this.mHero = new Hero(this.kMinionSprite,-150, 3.75+6);   
    //this.mHero = new Hero(this.kMinionSprite,-30, 80);   
    // create a few objects ...
    var i,j,obj,k;
    var rx=[],ry=[],dx=[],dy=[];
    rx[-1]=50;
    dx[-1]=50;
    for (i = 0; i<10; i++) 
    {
        ry[i] = 10+Math.random()*(maxheight-15);
        rx[i] = 50+Math.random() *50+rx[i-1];
        obj = new Minion(this.kMinionSprite, rx[i], ry[i]);
        this.mAllMinions.addToSet(obj);   
    }
    for (i = 0;i<10; i++) 
    {
        dy[i] = 10+Math.random()*(maxheight-15);
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
    this.mTextSysFont = new FontRenderable("Life:5 Money:0 Score:0");
    this.mTextSysFont2= new FontRenderable("Invincible State");
    this.mTextSysFont3= new FontRenderable("Game Over: Your score:");
    this.mTextSysFont4= new FontRenderable("Congratulation: Your score:");
    this.mTextSysFont5= new FontRenderable("Press SPACE to next level");
    this.mTextSysFont6= new FontRenderable("Press SPACE to start again");
    this._initText(this.mTextSysFont,x-90,110, [1, 1, 1, 1], 3);
    this._initText(this.mTextSysFont2,x-70,110, [1, 1, 1, 1], 3);
    this._initText(this.mTextSysFont3,x,60, [1, 0, 0, 1], 6);
    this._initText(this.mTextSysFont4,x,60, [1, 0, , 1], 6);
    this._initText(this.mTextSysFont5,x,50, [1, 0, 0, 1], 6);
    this._initText(this.mTextSysFont6,x,50, [1, 0, 0, 1], 6);
    
    gEngine.AudioClips.playBackgroundAudio(this.kBgm);
};

level.prototype._initText = function (font, posX, posY, color, textH) {
    font.setColor(color);
    font.getXform().setPosition(posX, posY);
    font.setTextHeight(textH);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
level.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1]); // clear to light gray
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
    if(pass===1)
    {
        this.mTextSysFont4.draw(this.mCamera);
        this.mTextSysFont5.draw(this.mCamera);
        this.mTreasure.draw(this.mCamera);
    }
    this.mAllMinions.draw(this.mCamera);
    this.mAllcoins.draw(this.mCamera);
    //this.mAllDyePacks.draw(this.mCamera);
    this.mTreasure.draw(this.mCamera); 
    this.mHero.draw(this.mCamera);
    if(pass===0&&start===1){
    this.mMonster_shoot.draw(this.mCamera);}
    this.mMonster_shoot.mProjectiles.draw(this.mCamera);
    
    this.mAllParticles.draw(this.mCamera);
    this.mTextSysFont.draw(this.mCamera);
    if(invincible>0)
    {
        this.mTextSysFont2.draw(this.mCamera);
    }    
    if(start===0)
    {
        this.mTextSysFont3.draw(this.mCamera);
        this.mTextSysFont6.draw(this.mCamera);
    }
    
    this.nCamera.setupViewProjection();
    this.mAllMinions.draw(this.nCamera);
    this.mAllDyePacks.draw(this.nCamera);
    this.mHero.draw(this.nCamera);
    this.mAllcoins.draw(this.nCamera);
    this.mAllParticles.draw(this.nCamera);
    }
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
var getpositiontime=0;
var positiontime=60;
var chasex;
var chasehero;
level.prototype.update = function () {   
    var func = function(x, y) { this.createParticle.call(this, x, y); };
    this.mCamera.update();  // to ensure proper interpolated movement effects
    this.mAllPlatforms.update();
    this.mAllMinions.update();
    this.mAllcoins.update();
    this.mHero.update();
    this.mMonster.update();

    getpositiontime++;
    if(getpositiontime===0||getpositiontime<positiontime)
    {
        chasex=this.mHero.getXform().getPosition();
        chasehero=this.mHero;
        Projectile.mHeroposition=[chasex[0],chasex[1]];
        getpositiontime=1;
    }
    this.mMonster_shoot.update(chasehero,this.mAllParticles,func,chasex,this.mAllMinions,this.mCamera);
   // this.mMonster_shoot.update(this.mHero.getXform(),this.mAllMinions,this.mCamera);
   // this.mAllDyePacks.rotateObjPointTo(this.mHero.getXform().getPosition(), rate);
   // GameObject.prototype.update.call(this.mMonster_shoot);
    
    this._initText(this.mTextSysFont2,x-70,80, [1, 1, 1, 1], 3);   
    this.mTextSysFont3.setText("Game Over: Your score:"+score);
    this._initText(this.mTextSysFont3,x-20,60, [0, 0, 0, 1], 6);
    this._initText(this.mTextSysFont6,x-20,50, [0, 0, 0, 1], 6);
    //this.mSkull.getXform().setPosition(x+20,90);
    this.mTextSysFont4.setText("Congratulation: Your score:"+score);
    this._initText(this.mTextSysFont4,x-20,60, [0, 0, 0, 1], 6);
    this._initText(this.mTextSysFont5,x-20,50, [0, 0, 0, 1], 6);
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
    for (i = 0; i<this.mAllMinions.size(); i++) {
        obj = this.mAllMinions.getObjectAt(i);
        var bBbox=obj.getBBox();
        if (hBbox.intersectsBound(bBbox)&&invincible===0) 
        {
            if(pass!=1){
            this.mHero.die();
            if(pass!=1&&life>0){
                gEngine.AudioClips.playACue(this.kcollision);
            }
            }
        }    
    }
    for (i = 0; i<this.mAllcoins.size(); i++) { //get a coin
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
        choice=0;
        if(pass===0){
        coins=coins-get*100;}
        this.mHero.clear();      
        gEngine.GameLoop.stop();
    }
    if(pass===1&&gEngine.Input.isKeyClicked(gEngine.Input.keys.Space))
    {
        choice=2;
        this.mHero.clear(); 
        gEngine.GameLoop.stop();
    }
    if(start===0&&gEngine.Input.isKeyClicked(gEngine.Input.keys.Space))
    {
        choice=1;
        coins=coins-get*100;
        this.mHero.clear(); 
        gEngine.GameLoop.stop();
    }
    
};

level.prototype.createParticle = function(atX, atY) {
    var life = 30 + Math.random() * 200;
    var p = new ParticleGameObject("assets/particle.png", atX, atY, life);
    p.getRenderable().setColor([1, 0, 0, 1]);
    
    // size of the particle
    var r = 3.5 + Math.random() * 2.5;
    p.getXform().setSize(r, r);
    
    // final color
    var fr = 3.5 + Math.random();
    var fg = 0.4 + 0.1 * Math.random();
    var fb = 0.3 + 0.1 * Math.random();
    p.setFinalColor([fr, fg, fb, 0.6]);
    
    // velocity on the particle
    var fx = 10 * Math.random() - 20 * Math.random();
    var fy = 10 * Math.random();
    p.getPhysicsComponent().setVelocity([fx, fy]);
    
    // size delta
    p.setSizeDelta(0.98);
    
    return p;
};

level.prototype.near = function(x1,y1,x2,y2)
{
    if(Math.abs(x1-x2)<20&&Math.abs(y1-y2)<20)
        return 1;
    else return 0;
};



