/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
  GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function BossGame() {
    
    this.kBgBrick = "assets/bgBrick.png";
    this.kBullet = "assets/bullet.png";
    this.kBullet2 = "assets/bullet2.png";
    this.kHero = "assets/Hero.png";
    this.kBoss = "assets/BOSS.png";
    this.kFloor5 = "assets/Floor5.png";
    this.kGameBGSong = "assets/BGClip2.mp3";
    this.kGameCueSound = "assets/BlueLevel_cue.wav";
    // The camera to view the scene
    this.mCamera = null;
   
    this.mBgBrick = [];
    
    this.mFloor = null;
    this.mHero = null;
    
    this.mBoss = null;
    
    this.mBullet = [];
    
    this.mBossBullet = [];
    
    
    
    this.mGun = [];
    
    this.kDelta = 0.3;
    
    this.count = 0;
    
    this.HP = 100;
    
    this.BOSSHP = 500;
    
    this.mLevel = null;
    this.mHP = null;
    this.mGunName = null;
}
gEngine.Core.inheritPrototype(BossGame, Scene);

BossGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBgBrick);
    gEngine.Textures.loadTexture(this.kBullet);
    gEngine.Textures.loadTexture(this.kBullet2);
    gEngine.Textures.loadTexture(this.kFloor5);
    gEngine.Textures.loadTexture(this.kBoss);
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.loadAudio(this.kGameBGSong);
    gEngine.AudioClips.loadAudio(this.kGameCueSound);
};

BossGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kBgBrick);
    gEngine.Textures.unloadTexture(this.kBullet);
    gEngine.Textures.unloadTexture(this.kBullet2);
    gEngine.Textures.unloadTexture(this.kBoss);
     gEngine.Textures.unloadTexture(this.kFloor5);
    gEngine.AudioClips.unloadAudio(this.kGameBGSong);
    gEngine.AudioClips.unloadAudio(this.kGameCueSound);
};

BossGame.prototype.initialize = function () {    
    this.mCamera = new Camera(
        vec2.fromValues(50, 60),   // position of the camera
        200,                       // width of camera
        [0, 0, 700, 480]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

    this.mHero = new Hero(this.kHero);
   
    this.mBoss = new Boss(this.kBoss);
    
    for(var i=0;i<50;i++){ 
    var bgR = new SpriteRenderable(this.kBgBrick);
    this.mBgBrick[i] = new GameObject(bgR);
    bgR.setElementPixelPositions(0, 512, 0, 512);
    bgR.getXform().setSize(40, 40);
    bgR.getXform().setPosition(-41+40*(i-25), 75);
};
    var flr = new SpriteRenderable(this.kFloor5);
    flr.setElementPixelPositions(0, 4096, 0, 256);
    flr.getXform().setSize(2000, 128);
    flr.getXform().setPosition(200, -9);
    this.mFloor = new GameObject(flr);
    
    this.mLevel = new FontRenderable("BOSS");
    this.mLevel.setColor([0, 0, 0, 1]);
    this.mLevel.getXform().setPosition(-40, 120);
    this.mLevel.getXform().setSize(40,20);
    
    this.mHP = new FontRenderable("HP : " + this.HP);
    this.mHP.setColor([0, 0, 0, 1]);
    this.mHP.getXform().setPosition(50, 120);
    this.mHP.getXform().setSize(20,10);
    
    this.mGunName = new FontRenderable("BosHP :" + this.BOSSHP);
    this.mGunName.setColor([0, 0, 0, 1]);
    this.mGunName.getXform().setPosition(50, 105);
    this.mGunName.getXform().setSize(20,10);
    

    
    gEngine.AudioClips.playBackgroundAudio(this.kGameBGSong);
};

BossGame.prototype.drawCamera = function (camera) {
    camera.setupViewProjection();
    for(var i=0;i<50;i++){ 
    this.mBgBrick[i].draw(camera);
    };
    this.mFloor.draw(camera);
    this.mHero.draw(camera);
    
  
};
// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
BossGame.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    var i;
    
    this.mCamera.setupViewProjection();
    this.drawCamera(this.mCamera);
    
    this.mHero.draw(this.mCamera);
    for(i = 0; i < this.mBullet.length; i++){
        this.mBullet[i].draw(this.mCamera);
    }
    for(i = 0; i < this.mBossBullet.length; i++){
        this.mBossBullet[i].draw(this.mCamera);
    }
    
    this.mBoss.draw(this.mCamera);

    this.mLevel.draw(this.mCamera);
    this.mHP.draw(this.mCamera);
    this.mGunName.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
BossGame.prototype.update = function () {
    this.mHero.update();
    this.mBoss.update();
    this.mCamera.update();
    this.mGunName.setText("BossHP :" + this.BOSSHP); 
    this.mHP.setText("HP :" + this.HP);
    var i;
    for(i = 0; i < this.mBullet.length; i++){
        this.mBullet[i].update();
        if(this.mBullet[i].getXform().getXPos() > this.mBoss.getXform().getXPos() - 12.5 
                && this.mBullet[i].getXform().getXPos() < this.mBoss.getXform().getXPos() + 12.5
                && this.mBullet[i].getXform().getYPos() > this.mBoss.getXform().getYPos() - 12.5
                && this.mBullet[i].getXform().getYPos() < this.mBoss.getXform().getYPos() + 12.5){
                var t = this.mBullet[0];
                this.mBullet[0] = this.mBullet[i];
                this.mBullet[i] = t;
                this.mBullet.shift();
                this.BOSSHP -= 10;  
                this.mGunName.setText("BossHP :" + this.BOSSHP); 
        }
    }
    for(i = 0; i < this.mBossBullet.length; i++){
//        if(this.mBossBullet[i].getXform().getYPos() === 82){
//            this.mBossBullet[i].setVisibility(false);
//        }
        this.mBossBullet[i].update();
        if(this.mBossBullet[i].getXform().getXPos() > this.mHero.getXform().getXPos() - 9 
                && this.mBossBullet[i].getXform().getXPos() < this.mHero.getXform().getXPos() + 9
                && this.mBossBullet[i].getXform().getYPos() > this.mHero.getXform().getYPos() - 12
                && this.mBossBullet[i].getXform().getYPos() < this.mHero.getXform().getYPos() + 12){
                var t = this.mBossBullet[0];
                this.mBossBullet[0] = this.mBossBullet[i];
                this.mBossBullet[i] = t;
                this.mBossBullet.shift();
                this.HP -= 10;
                this.mHP.setText("HP :" + this.HP);            
        }
    }
    
    
    var xform = this.mHero.getXform();
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        if(xform.getXPos() > 6){
            xform.incXPosBy(-this.kDelta);   
        }
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        if(xform.getXPos() < 95){
            xform.incXPosBy(this.kDelta);  
        }
    }    
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.J)) {
        var heroBullet = new Bullet(this.kBullet, xform.getXPos(), xform.getYPos(), 0);
        this.mBullet.push(heroBullet);
         gEngine.AudioClips.playACue(this.kGameCueSound);
    }
    
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.H)) {
        var heroBullet = new Bullet(this.kBullet, xform.getXPos(), xform.getYPos(), 1);
        this.mBullet.push(heroBullet);
    }
    
    
    var v = Math.floor(Math.random()*24);
    if(v >= 6){
        this.count++;
        if(this.count === 35){
            this.count = 0;
            var bossBullet = new Bullet(this.kBullet2, this.mBoss.getXform().getXPos(), this.mBoss.getXform().getYPos(), 1);
            this.mBossBullet.push(bossBullet);
            bossBullet = new Bullet(this.kBullet2, this.mBoss.getXform().getXPos(), this.mBoss.getXform().getYPos(), 2);
            this.mBossBullet.push(bossBullet);
            bossBullet = new Bullet(this.kBullet2, this.mBoss.getXform().getXPos(), this.mBoss.getXform().getYPos(), 3);
            this.mBossBullet.push(bossBullet);
            bossBullet = new Bullet(this.kBullet2, this.mBoss.getXform().getXPos(), this.mBoss.getXform().getYPos(), 0);
            this.mBossBullet.push(bossBullet);
        }
    }
    
    if(this.HP <= 0){
        var nextLevel = new LoseGame();  // load the next level
        gEngine.Core.startScene(nextLevel);
        gEngine.AudioClips.stopBackgroundAudio();
    }
    
    if(this.BOSSHP <= 0){
        var nextLevel = new WinGame();  // load the next level
        gEngine.Core.startScene(nextLevel);       
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.M)) {
        var nextLevel = new MyGame();  // load the next level
        gEngine.Core.startScene(nextLevel);
    }   
     if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Z)) {
		if(gEngine.AudioClips.isBackgroundAudioPlaying())
			gEngine.AudioClips.stopBackgroundAudio();
		else
                        gEngine.AudioClips.playBackgroundAudio(this.kGameBGSong);
    }
};

    