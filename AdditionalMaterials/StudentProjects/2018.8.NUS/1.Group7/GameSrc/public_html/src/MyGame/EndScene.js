/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
"use strict";  

function EndScene(){
    this.mCamera = null;
    this.mAllObjs = null;
    this.mMsg=null;
    this.mMsg1=null;
    this.mCui=null;
    this.kHero = "assets/animation.png";
    this.kStar = "assets/yellow.png";
     this.kbg="assets/sky.png";
     this.kclick= "assets/click.png";
      this.khead= "assets/starforyou.png";
      this.kname="assets/copyright.png";
    this.kLastBGM= "assets/Lopu.mp3";  
    this.kBGM = "assets/TheRightPath.mp3";
      
    this.meet=0;
    this.starchange=0;
    this.createstar=0;
    this.time=0;
    this.font=0;
}
gEngine.Core.inheritPrototype(EndScene, Scene);
EndScene.prototype.loadScene=function(){
   gEngine.Textures.loadTexture(this.kHero);
   gEngine.Textures.loadTexture(this.kStar);
     gEngine.Textures.loadTexture(this.kbg);
     gEngine.Textures.loadTexture(this.kclick);
     gEngine.Textures.loadTexture(this.khead);
    gEngine.Textures.loadTexture(this.kname);
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.kLastBGM);
    gEngine.AudioClips.loadAudio(this.kBGM);
    
};
EndScene.prototype.unloadScene=function(){
    gEngine.Textures.unloadTexture(this.kHero);
    gEngine.Textures.unloadTexture(this.kStar);
      gEngine.Textures.unloadTexture(this.kbg);
      gEngine.Textures.unloadTexture(this.kclick);
       gEngine.Textures.unloadTexture(this.khead);
        gEngine.Textures.loadTexture(this.kname);
     gEngine.AudioClips.unloadAudio(this.kBGM);
     
     var nextLevel =new StartScene();
     gEngine.Core.startScene(nextLevel);
};
EndScene.prototype.initialize=function(){
    gEngine.AudioClips.playBackgroundAudio(this.kBGM);
    this.mCamera = new Camera(
        vec2.fromValues(400, 300), // position of the camera
        800,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
        
    this.mbg = new TextureRenderable(this.kbg);
    this.mbg.getXform().setPosition(400,300);
    this.mbg.getXform().setSize(800,800);
    

    this.mMsg = new TextureRenderable(this.kclick);
    this.mMsg.getXform().setPosition(400,440);
    this.mMsg.getXform().setSize(50,25);
    
    this.mMsg1 = new TextureRenderable(this.khead);
    this.mMsg1.getXform().setPosition(400,450);
    this.mMsg1.getXform().setSize(320,80);
    
    this.mMsg2 = new TextureRenderable(this.kname);
    this.mMsg2.getXform().setPosition(400,50);
    this.mMsg2.getXform().setSize(420,105);
    

    this.mPlatformset = new GameObjectSet();
    this.mHero = new Hero(this.kHero,30,195,60,60,1024);
    this.mHero.getRigidBody().setMass(0);
    this.mPlatformset.addToSet(this.mHero);
    this.mHeroine = new Hero(this.kHero,770,195,60,60,874);
    this.mPlatformset.addToSet(this.mHeroine);
    this.mHeroine.getRigidBody().setMass(0);
    this.platform1=new MapObject(400,150,0,800,15,null);
   
    
    this.mStar = new TextureRenderable(this.kStar);
    this.mStar.setColor([1,1,1,0]);
    this.mStar.getXform().setPosition(400,210);
    this.mStar.getXform().setSize(20,20);
    
    this.particleset = new ParticleGameObjectSet();
    
};
EndScene.prototype.draw=function(){
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);
      
    this.mCamera.setupViewProjection();
    this.platform1.draw(this.mCamera);
    this.mbg.draw(this.mCamera);
    
    //this.mMsg.draw(this.mCamera); //mcamera->canvus? 
    //this.mMsg1.draw(this.mCamera);
    
    this.mPlatformset.draw(this.mCamera);
    if(this.meet===1&&this.starchange===0||this.meet===1&&this.createstar===0)
    {
        this.mStar.draw(this.mCamera);
    }
    if(this.starchange===1&&this.createstar===0)
    {
        this.mMsg.draw(this.mCamera);
        //this.mMsg1.draw(this.mCamera);
    }
    if(this.createstar===1)
    {
        this.particleset.draw(this.mCamera);
    }
    if(this.font===1)
    {
        this.mMsg1.draw(this.mCamera);
        this.mMsg2.draw(this.mCamera);
    }
};
EndScene.prototype.update=function(){
    if(this.mHero.getXform().getXPos()<360){
        this.mHero.getXform().incXPosBy(2);
        this.mHero.mHero.updateAnimation();
    }
    if(this.mHeroine.getXform().getXPos()>440){
        this.mHeroine.getXform().incXPosBy(-2);
        this.mHeroine.mHero.updateAnimation();
    }
    else{
        this.meet=1;
    }
    
    if(this.meet===1&&this.starchange===0)
    {
        if(this.mStar.getXform().getYPos()<350)
        {
            this.mStar.getXform().incYPosBy(1);
            this.mStar.getXform().incSizeBy(1);
        }
        else{
            this.starchange=1;
            //console.log(this.mStar.getXform().getYPos());
        }
    }
    var x,y,xf;
    
    if(this.starchange===1&&this.createstar===0)
    {
        x=gEngine.Input.getMousePosX();
        y=gEngine.Input.getMousePosY();
        xf=this.mStar.getXform();
        if(x<xf.getXPos()+xf.getWidth()/2&&x>xf.getXPos()-xf.getWidth()/2
                &&y<xf.getYPos()+xf.getHeight()/2&&y>xf.getYPos()-xf.getHeight()/2)
        {
            this.mStar.getXform().setYPos(345);
            if(gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left))
            {
                this.createstar=1;
            }
        }
        else{
            this.mStar.getXform().setYPos(350);
        }
    }
    
    if(this.createstar===1)
    {
        var p=this.createParticle(400,350);
        this.particleset.addToSet(p);
        this.time++;
        if(this.time===120)
        {
            this.font=1;
        }
    }
    //this.mCollisionInfos = []; 
    //gEngine.Physics.processCollision(this.mPlatformset, this.mCollisionInfos);
    gEngine.ParticleSystem.update(this.particleset);
    //gEngine.ParticleSystem.collideWithRigidSet(this.mPlatformset, this.particleset);
    this.mPlatformset.update();   
    this.particleset.update();
    
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter)) 
    {
        gEngine.GameLoop.stop();
    }
};


EndScene.prototype.createParticle = function(atX, atY) {
    var life = 300 + Math.random() * 200;
    var p = new ParticleGameObject(this.kStar, atX, atY, life);
    
    
    // size of the particle
    var r = 30+ 30* Math.random();
    p.getXform().setSize(r, r);
    
    // final color
    var a = 0.6 + 0.4*Math.random();
    //var fg = 0.4 + 0.1 * Math.random();
    //var fb = 0.3 + 0.1 * Math.random();
    //p.setFinalColor([1, 1, 0, a]);
    //p.getRenderable().setColor([217/255, 205/255, 144/255, a]);
   // p.getRenderable().setColor([217/255, 205/255, 189/255, a]);
    // velocity on the particle
    var fx = 800 * (Math.random() *2-1);
    var fy = 700 * Math.random() - 1400 * Math.random();;
    p.getParticle().setVelocity([fx, fy]);
    p.getParticle().setAcceleration([0,0]);
    // size delta
    p.setSizeDelta(0.98);
    
    return p;
};