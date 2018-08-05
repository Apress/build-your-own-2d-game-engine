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

function Egg() {
       
    this.kPlatformTexture = "assets/platform.png";
    this.kSquare="assets/box.png";
    this.kSign="assets/sign.png";
    this.kRoad="assets/Road.png";
    this.kHeroSprite="assets/hero_sprite.png";
    this.kBg="assets/background.png";
    this.kPlayagain="assets/tips.png";
    this.kEndpic3 = "assets/credit.png";
    this.kBg="assets/sounds/egg.mp3";
    
    
    this.kA="assets/a.png";
    this.kB="assets/b.png";
    this.kC="assets/c.png";
    this.kD="assets/d.png";
    this.kSs1="assets/ss1.png";
    this.kSs2="assets/ss2.png";
    this.kSs2r="assets/ss2r.png";
    
    this.mState=2;
    this.isdead=0;
    this.time1=0;
    this.time2=201;
    this.time= new Date();
    this.flag=false;
    this.reallyfinal=0;
    this.count=0;
    
    this.mSquare=null;
    this.mSquare1=null;
    this.mSquare2=null;
    this.mSquare3=null;
    
    this.mRoad1=null;
    this.mRoad2=null;

    this.mSign=null;
    this.mSign2=null;
    this.mSign3=null;
    
    this.mHero = null;
    this.mBg=null;

    this.mPlayagain = null;
      
    this.mAllObjs = null;
    this.mNonRigid=null;
    this.mHelpMsg = null;
    
    this.mCamera = null;
    
}
gEngine.Core.inheritPrototype(Egg, Scene);


Egg.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kPlatformTexture);
    gEngine.Textures.loadTexture(this.kSquare);
    gEngine.Textures.loadTexture(this.kSign);
    gEngine.Textures.loadTexture(this.kHeroSprite);
    gEngine.Textures.loadTexture(this.kRoad);
    gEngine.Textures.loadTexture(this.kPlayagain);
    gEngine.Textures.loadTexture(this.kA);
    gEngine.Textures.loadTexture(this.kB);
    gEngine.Textures.loadTexture(this.kC);
    gEngine.Textures.loadTexture(this.kD);
    gEngine.Textures.loadTexture(this.kSs1);
    gEngine.Textures.loadTexture(this.kSs2);
    gEngine.Textures.loadTexture(this.kSs2r);
    
    gEngine.AudioClips.loadAudio(this.kBg);
    
            
};

Egg.prototype.unloadScene = function () {
    
    gEngine.Textures.unloadTexture(this.kPlatformTexture);
    gEngine.Textures.unloadTexture(this.kSquare);
    gEngine.Textures.unloadTexture(this.kSign);
    gEngine.Textures.unloadTexture(this.kHeroSprite);
    gEngine.Textures.unloadTexture(this.kRoad);
    gEngine.Textures.unloadTexture(this.kPlayagain);
    gEngine.Textures.unloadTexture(this.kA);
    gEngine.Textures.unloadTexture(this.kB);
    gEngine.Textures.unloadTexture(this.kC);
    gEngine.Textures.unloadTexture(this.kD);
    gEngine.Textures.unloadTexture(this.kSs1);
    gEngine.Textures.unloadTexture(this.kSs2);
    gEngine.Textures.unloadTexture(this.kSs2r);
    
    var nextlevel=new Egg();        
    gEngine.Core.startScene(nextlevel);
    
    
};

Egg.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        100,                     // width of camera
        [0, 0, 1500, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    gEngine.AudioClips.playBackgroundAudio(this.kBg);
      
    this.mAllObjs = new GameObjectSet();
    this.mNonRigid = new GameObjectSet();
        

    this.mSquare=new Squaret(this.kA,45,37,5,5);
    this.mSquare1=new Squaret(this.kB,55,37,5,5);
    this.mSquare2=new Squaret(this.kC,65,37,5,5);
    this.mSquare3=new Squaret(this.kD,75,37,5,5);
    
    this.mEndpic3 = new Endpic(this.kEndpic3,50,40,100,50);
    this.mEndpic3.setVisibility(0);
    
    this.mSquare.isfinal=0;
    this.mSquare.setSpeed(0);
    
    this.mSquare1.isfinal=0;
    this.mSquare1.setSpeed(0);
    
    this.mSquare2.isfinal=0;
    this.mSquare2.setSpeed(0);    
    
    this.mSquare3.isfinal=0;
    this.mSquare3.setSpeed(0);
    
    this.mSign=new Sign(this.kSs1,17,50,40,25);
    this.mSign2=new Sign(this.kSs2,77,50,40,25);
    this.mSign3=new Sign(this.kSs2r,77,50,40,25);
    
    
    
    this.mSign.getRenderable().setElementUVCoordinate(0, 1,0,1);
    this.mSign2.getRenderable().setElementUVCoordinate(0, 1,0,1);
    this.mSign3.getRenderable().setElementUVCoordinate(0, 1,0,1);
    
    this.mSign3.setVisibility(0);
    
    this.mHero=new Hero(this.kHeroSprite);
    this.mRoad1=new Road(this.kRoad,12,14,28,26);
    this.mRoad2=new Road(this.kRoad,70,14,65,26);
    
    this.mHero.isfake=1;

    this.mPlayagain = new Playagain(this.kPlayagain,50,40,40,20);
    
    this.mPlayagain.setVisibility(0);
    
    this.mHelpMsg = new FontRenderable("jump in front of the upper right board!");
    this.mHelpMsg.setColor([0, 0, 0, 1]);
    this.mHelpMsg.getXform().setPosition(50, -26);
    this.mHelpMsg.setTextHeight(2);


    this.mAllObjs.addToSet(this.mSquare);
    this.mAllObjs.addToSet(this.mSquare1);
    this.mAllObjs.addToSet(this.mSquare2);
    this.mAllObjs.addToSet(this.mSquare3);

    this.mAllObjs.addToSet(this.mRoad1);
    this.mAllObjs.addToSet(this.mRoad2);
    this.mAllObjs.addToSet(this.mHero);
    

    
    this.mNonRigid.addToSet(this.mSign);
    this.mNonRigid.addToSet(this.mSign2);
    this.mNonRigid.addToSet(this.mSign3);
           
   

};


Egg.prototype.draw = function () {
    // Step A: clear the canvas

    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    
    
    this.mNonRigid.draw(this.mCamera);
    this.mAllObjs.draw(this.mCamera);
    this.mPlayagain.draw(this.mCamera);
    this.mEndpic3.draw(this.mCamera);
    this.mHelpMsg.draw(this.mCamera);

    
};


Egg.prototype.update = function () {

    this.mAllObjs.update(this.mCamera);    
    gEngine.Physics.processCollision(this.mAllObjs, []);
    this.mNonRigid.update(this.mCamera);   
    
    var xform = this.mHero.getXform();
    var xpos = xform.getXPos();
    var ypos = xform.getYPos();
    var v=this.mHero.getRigidBody().getVelocity();
    console.log(xpos,ypos);
    if(ypos<20 &!this.isdead)
        this.isdead=1;
    
    if(this.reallyfinal)
        this.count+=1;
    
    if(xpos> 42 && xpos<48 && ypos>31.24 && ypos<31.26 && !this.isdead)
        this.isdead=1;
    if(xpos> 52 && xpos<58 && ypos>31.24 && ypos<31.26 && !this.isdead )
        this.isdead=1;
    if(xpos> 62 && xpos<68 && ypos>31.24 && ypos<31.26 && !this.isdead )
        this.isdead=1;
    if(xpos> 72 && xpos<78 && ypos>31.24 && ypos<31.26 && !this.isdead )
        this.isdead=1;
        
    if(xpos>99)
        this.mHero.getXform().setXPos(99);
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.H)) {
        this.mHelpMsg.getXform().setYPos(26);
        
    }
    
    if(!this.isdead && xpos>75 && xpos<80 && ypos>43 && ypos<45 && v[1]>0)
    {
        this.mSign3.setVisibility(1);
        this.reallyfinal=1;
    }
    
    if(this.count>120)
        this.mEndpic3.setVisibility(1);
    
     if(this.isdead)
    {
        this.mHero.setMode(10);
        this.mHero.getRigidBody().setMass(0);
        this.mPlayagain.setVisibility(1);
        
        if(gEngine.Input.isKeyClicked(gEngine.Input.keys.S)){
            gEngine.GameLoop.stop();
        }
        
    }

    
};