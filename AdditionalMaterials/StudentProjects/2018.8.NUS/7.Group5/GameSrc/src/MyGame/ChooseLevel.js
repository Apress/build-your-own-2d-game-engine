/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


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

function ChooseLevel() {
       
    this.kPlatformTexture = "assets/platform.png";
    this.kSquare="assets/box.png";
    this.kSign="assets/sign.png";
    this.kRoad="assets/Road.png";
    this.kHeroSprite="assets/hero_sprite.png";
    this.kBg="assets/background.png";
    this.kPlayagain="assets/tips.png";
    
    
    this.k1="assets/box_1.png";
    this.k2="assets/box_2.png";
    this.k3="assets/box_3.png";
    this.k4="assets/box_4.png";
    this.k5="assets/box_5.png";
    this.k6="assets/box_6.png";
    this.k7="assets/box_7.png";
    this.k8="assets/box_8.png";
    
    this.kSs1="assets/chooselevel.png";
    //this.kSs2="assets/ss2.png";
    //this.kSs2r="assets/ss2r.png";
    
    this.mState=null;
    this.isdead=0;
    this.time1=0;
    this.time2=201;
    this.time= new Date();
    this.flag=false;
    
    this.mSquare=null;
    this.mSquare1=null;
    this.mSquare2=null;
    this.mSquare3=null;
    this.mSquare4=null;
    this.mSquare5=null;
    this.mSquare6=null;
    this.mSquare7=null;
    
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
    
    
    this.mCamera = null;
    
}
gEngine.Core.inheritPrototype(ChooseLevel, Scene);


ChooseLevel.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kPlatformTexture);
    gEngine.Textures.loadTexture(this.kSquare);
    gEngine.Textures.loadTexture(this.kSign);
    gEngine.Textures.loadTexture(this.kHeroSprite);
    gEngine.Textures.loadTexture(this.kRoad);
    gEngine.Textures.loadTexture(this.kPlayagain);
    gEngine.Textures.loadTexture(this.k1);
    gEngine.Textures.loadTexture(this.k2);
    gEngine.Textures.loadTexture(this.k3);
    gEngine.Textures.loadTexture(this.k4);
    gEngine.Textures.loadTexture(this.k5);
    gEngine.Textures.loadTexture(this.k6);
    gEngine.Textures.loadTexture(this.k7);
    gEngine.Textures.loadTexture(this.k8);
    gEngine.Textures.loadTexture(this.kSs1);
    //gEngine.Textures.loadTexture(this.kSs2);
    //gEngine.Textures.loadTexture(this.kSs2r);
    
    
            
};

ChooseLevel.prototype.unloadScene = function () {
    
    gEngine.Textures.unloadTexture(this.kPlatformTexture);
    gEngine.Textures.unloadTexture(this.kSquare);
    gEngine.Textures.unloadTexture(this.kSign);
    gEngine.Textures.unloadTexture(this.kHeroSprite);
    gEngine.Textures.unloadTexture(this.kRoad);
    gEngine.Textures.unloadTexture(this.kPlayagain);
    gEngine.Textures.unloadTexture(this.k1);
    gEngine.Textures.unloadTexture(this.k2);
    gEngine.Textures.unloadTexture(this.k3);
    gEngine.Textures.unloadTexture(this.k4);
    gEngine.Textures.unloadTexture(this.k5);
    gEngine.Textures.unloadTexture(this.k6);
    gEngine.Textures.unloadTexture(this.k7);
    gEngine.Textures.unloadTexture(this.k8);
    gEngine.Textures.unloadTexture(this.kSs1);
    //gEngine.Textures.unloadTexture(this.kSs2);
    //gEngine.Textures.unloadTexture(this.kSs2r);
    
    var nextlevel=null;

    if(this.mState===1)
        {nextlevel=new Level1();}
    if(this.mState===2)
        {nextlevel=new Level6();}
    if(this.mState===3)
        {nextlevel=new Level2();}
    if(this.mState===4)
        {nextlevel=new Levelx();}    
    if(this.mState===5)
        {nextlevel=new Level3();}
    if(this.mState===6)
        {nextlevel=new Level5();}
    if(this.mState===7)
        {nextlevel=new Level4();}
    if(this.mState===8)
        {nextlevel=new Level7();}
    gEngine.Core.startScene(nextlevel);
    
    
};

ChooseLevel.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        100,                     // width of camera
        [0, 0, 1500, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
      
    this.mAllObjs = new GameObjectSet();
    this.mNonRigid = new GameObjectSet();
        

    this.mSquare=new Square(this.k1,15,37,5,5);
    this.mSquare1=new Square(this.k2,25,37,5,5);
    this.mSquare2=new Square(this.k3,35,37,5,5);
    this.mSquare3=new Square(this.k4,45,37,5,5);
    this.mSquare4=new Square(this.k5,55,37,5,5);
    this.mSquare5=new Square(this.k6,65,37,5,5);
    this.mSquare6=new Square(this.k7,75,37,5,5);
    this.mSquare7=new Square(this.k8,85,37,5,5);
    
    this.mSquare.isfinal=0;
    this.mSquare.setSpeed(0);
    
    this.mSquare1.isfinal=0;
    this.mSquare1.setSpeed(0);
    
    this.mSquare2.isfinal=0;
    this.mSquare2.setSpeed(0);    
    
    this.mSquare3.isfinal=0;
    this.mSquare3.setSpeed(0);
    
    this.mSquare4.isfinal=0;
    this.mSquare4.setSpeed(0);
    
    this.mSquare5.isfinal=0;
    this.mSquare5.setSpeed(0);
    
    this.mSquare6.isfinal=0;
    this.mSquare6.setSpeed(0);    
    
    this.mSquare7.isfinal=0;
    this.mSquare7.setSpeed(0);
    
    this.mSign=new Sign(this.kSs1,17,50,40,25);
    //this.mSign2=new Sign(this.kSs2,77,50,40,25);
    //this.mSign3=new Sign(this.kSs2r,77,50,40,25);
    
    
    
    this.mSign.getRenderable().setElementUVCoordinate(0, 1,0,1);
    //this.mSign2.getRenderable().setElementUVCoordinate(0, 1,0,1);
    //this.mSign3.getRenderable().setElementUVCoordinate(0, 1,0,1);
    
    //this.mSign3.setVisibility(0);
    
    this.mHero=new Hero(this.kHeroSprite);
    this.mRoad1=new Road(this.kRoad,12,14,300,26);
    this.mRoad2=new Road(this.kRoad,70,14,65,26);

    this.mPlayagain = new Playagain(this.kPlayagain,50,40,40,20);
    
    this.mPlayagain.setVisibility(0);
    
    


    this.mAllObjs.addToSet(this.mSquare);
    this.mAllObjs.addToSet(this.mSquare1);
    this.mAllObjs.addToSet(this.mSquare2);
    this.mAllObjs.addToSet(this.mSquare3);
    this.mAllObjs.addToSet(this.mSquare4);
    this.mAllObjs.addToSet(this.mSquare5);
    this.mAllObjs.addToSet(this.mSquare6);
    this.mAllObjs.addToSet(this.mSquare7);

    this.mAllObjs.addToSet(this.mRoad1);
    //this.mAllObjs.addToSet(this.mRoad2);
    this.mAllObjs.addToSet(this.mHero);
    

    
    this.mNonRigid.addToSet(this.mSign);
    //this.mNonRigid.addToSet(this.mSign2);
    //this.mNonRigid.addToSet(this.mSign3);
           
   

};


ChooseLevel.prototype.draw = function () {
    // Step A: clear the canvas

    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    
    
    this.mNonRigid.draw(this.mCamera);
    this.mAllObjs.draw(this.mCamera);
    this.mPlayagain.draw(this.mCamera);

    
};


ChooseLevel.prototype.update = function () {

    this.mAllObjs.update(this.mCamera);    
    gEngine.Physics.processCollision(this.mAllObjs, []);
    this.mNonRigid.update(this.mCamera);   
    
    var xform = this.mHero.getXform();
    var xpos = xform.getXPos();
    var ypos = xform.getYPos();
    
    
    
    if(xpos> 11 && xpos<19 && ypos>31.24 && ypos<31.26 && !this.isdead)
    {
        this.mState = 1;
        gEngine.GameLoop.stop();
    }
    if(xpos> 21 && xpos<29 && ypos>31.24 && ypos<31.26 && !this.isdead)
    {
        this.mState = 2;
        gEngine.GameLoop.stop();
    }
    if(xpos> 31 && xpos<39 && ypos>31.24 && ypos<31.26 && !this.isdead)
    {
        this.mState = 3;
        gEngine.GameLoop.stop();
    }
    if(xpos> 41 && xpos<49 && ypos>31.24 && ypos<31.26 && !this.isdead)
    {
        this.mState = 4;
        gEngine.GameLoop.stop();
    }
    if(xpos> 51 && xpos<59 && ypos>31.24 && ypos<31.26 && !this.isdead)
    {
        this.mState = 5;
        gEngine.GameLoop.stop();
    }
    if(xpos> 61 && xpos<69 && ypos>31.24 && ypos<31.26 && !this.isdead)
    {
        this.mState = 6;
        gEngine.GameLoop.stop();
    }
    if(xpos> 71 && xpos<79 && ypos>31.24 && ypos<31.26 && !this.isdead)
    {
        this.mState = 7;
        gEngine.GameLoop.stop();
    }
    if(xpos> 81 && xpos<89 && ypos>31.24 && ypos<31.26 && !this.isdead)
    {
        this.mState = 8;
        gEngine.GameLoop.stop();
    }
    
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