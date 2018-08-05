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

function End() {
    this.globalcolor=0;
    this.kBgClip2 = "assets/sounds/end.mp3";
    this.kBgClip3 = "assets/sounds/cue1.mp3";  
    this.kCue="assets/sounds/cue2.mp3";
    this.kBallon="assets/ballon.png";
    this.kRoad="assets/Road.png";
    this.kHeroSprite="assets/hero_sprite.png";
    this.kBg="assets/backgroud.png";   
    this.kSquare="assets/box.png";
    this.kCloud="assets/cloud.png";
    this.kCloud1="assets/cloud1.png";
    this.kStair="assets/stair.png";
    this.kStone="assets/stone.png";
    this.kSign="assets/endsign.png";
    this.kHeroSprite="assets/hero_sprite.png";
    this.kGold="assets/gold.png";
    
    this.kEndpic = "assets/Endpic.png";
    this.kEndpic2 = "assets/Endpic2.png";
    this.final1=0;
    


    this.mBallon=null;
    this.mRoadend=null;
    this.music=0;
    this.music2=0;
    this.mHeroend = null;
    this.mBg=null;
    this.mHerof=null;
    this.mSquare=null;
    this.mCloud=null;
    this.mCloud1=null;
    this.mRoad1=null;
    this.mRoad2=null;
    this.mStone=null;
    this.mStair=null;
    this.mSign=null;
    this.mGold=null;
    
    
    this.mTheLight=null;    
    
    this.Light=null;
    this.lighthelp=0;
    this.mAllObjs = null;
    this.mNonRigid=null;    
    this.mCamera = null;
    this.state=0;
    
    this.isok=0;
    this.time1=0;
    this.time2=201;
    this.time= new Date();
    
}
gEngine.Core.inheritPrototype(End, Scene);


End.prototype.loadScene = function () {

    gEngine.Textures.loadTexture(this.kBallon);
    gEngine.Textures.loadTexture(this.kHeroSprite);
    gEngine.Textures.loadTexture(this.kRoad);
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kSquare);
    gEngine.Textures.loadTexture(this.kCloud);
    gEngine.Textures.loadTexture(this.kCloud1);
    gEngine.Textures.loadTexture(this.kBallon);
    gEngine.Textures.loadTexture(this.kStair);
    gEngine.Textures.loadTexture(this.kStone);
    gEngine.Textures.loadTexture(this.kSign);
    gEngine.Textures.loadTexture(this.kEndpic);
    gEngine.Textures.loadTexture(this.kEndpic2);
    gEngine.Textures.loadTexture(this.kGold);
            
    gEngine.AudioClips.loadAudio(this.kBgClip2);
    gEngine.AudioClips.loadAudio(this.kBgClip3);
    gEngine.AudioClips.loadAudio(this.kCue);
};

End.prototype.unloadScene = function () {

    gEngine.Textures.unloadTexture(this.kBallon);
    gEngine.Textures.unloadTexture(this.kHeroSprite);
    gEngine.Textures.unloadTexture(this.kRoad);
    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kSquare);
    gEngine.Textures.unloadTexture(this.kCloud);
    gEngine.Textures.unloadTexture(this.kCloud1);
    gEngine.Textures.unloadTexture(this.kBallon);
    gEngine.Textures.unloadTexture(this.kStair);
    gEngine.Textures.unloadTexture(this.kStone);
    gEngine.Textures.unloadTexture(this.kSign);
    gEngine.Textures.unloadTexture(this.kGold);

    gEngine.AudioClips.unloadAudio(this.kBgClip2);
    gEngine.AudioClips.unloadAudio(this.kCue);
    
    var nextlevel=new Endpage();
    
    gEngine.Core.startScene(nextlevel);
    
    
};

End.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 20), // position of the camera
        100,                     // width of camera
        [0, 0, 1500, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    gEngine.DefaultResources.setGlobalAmbientIntensity(0);
    
    this.mAllObjs = new GameObjectSet();
    this.mNonRigid = new GameObjectSet();
     
 
    
    
    this.mCloud=new Cloud(this.kCloud,65+150,55.5-120,16,9.14);
    this.mCloud1=new Cloud_1(this.kCloud1,35+150,44-120,10,6.25);
    this.mSquare=new Square(this.kSquare,45+150,37-120,5,5);
    
    this.mSquare1=new Square(this.kSquare,55+150,47-120,5,5);
    this.mSign=new Sign(this.kSign,15+150,55-120,24,8);
    this.mStair=new Stair(this.kStair,94+150,33-120,10,13);
    this.mStone=new Stone(this.kStone,72+150,35-120,17,17);
    this.mRoad1=new Road(this.kRoad,12+150,14-120,28,26);
    this.mRoad2=new Road(this.kRoad,70+150,14-120,65,26);
    

    this.mBallon=new Ballon(this.kBallon,10,35,5,10);
    this.mHeroend=new Hero_end(this.kHeroSprite);
    this.mHerof=new Hero_fake(this.kHeroSprite);
    this.mGold= new Gold(this.kGold,60,30,5,5);
    this.mRoadend=new Road(this.kRoad,0,0,200,20);
    

    this.mSquare.isfinal=0;
    this.mSquare1.isfinal=0;
    this.mSquare.setSpeed(0);
    this.mSquare1.setSpeed(0);
    
    this.mBallon.setVisibility(0);

    
    this.mTheLight = new Light();
    this.mTheLight.setNear(3);
    this.mTheLight.setFar(10);
    this.mTheLight.setZPos(2);
    this.mTheLight.setXPos(50);
    this.mTheLight.setYPos(20);  
    this.mTheLight.setColor([1, 1, 1, 1]);
    
    this.Light = new Light();
    this.Light.setNear(3);
    this.Light.setFar(5);
    this.Light.setZPos(2);
    this.Light.setXPos(60);
    this.Light.setYPos(30);  
    this.Light.setColor([1, 1, 1, 1]);
    
    
    
    var bgR = new LightRenderable(this.kBg);
    bgR.getXform().setSize(600, 4000);
    bgR.getXform().setPosition(0, 20);
    bgR.addLight(this.mTheLight);
    bgR.addLight(this.Light);
    this.mBg = new GameObject(bgR);
    
    
    
    this.mHeroend.getRenderable().addLight(this.mTheLight);
    this.mBallon.getRenderable().addLight(this.mTheLight);
    this.mGold.getRenderable().addLight(this.Light);
        
    
    this.mAllObjs.addToSet(this.mRoadend);
    this.mAllObjs.addToSet(this.mHeroend);
    this.mAllObjs.addToSet(this.mStone);
    this.mAllObjs.addToSet(this.mSquare);
    this.mAllObjs.addToSet(this.mSquare1);
    this.mAllObjs.addToSet(this.mRoad1);
    this.mAllObjs.addToSet(this.mRoad2);
    
    
    
    
    this.mNonRigid.addToSet(this.mBallon);
    this.mNonRigid.addToSet(this.mSign);
    this.mNonRigid.addToSet(this.mCloud1);
    this.mNonRigid.addToSet(this.mCloud);
    this.mNonRigid.addToSet(this.mStair);
    this.mNonRigid.addToSet(this.mGold);
    
    
    
    gEngine.AudioClips.playBackgroundAudio(this.kBgClip2);

};


End.prototype.draw = function () {
    // Step A: clear the canvas

    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    
    this.mBg.draw(this.mCamera);
    this.mNonRigid.draw(this.mCamera);
    this.mAllObjs.draw(this.mCamera);
    //this.mMsg.draw(this.mCamera);
};



End.prototype.update = function () {
    
    this.lighthelp+=0.05;
    this.mCamera.update();  

    this.mCamera.update();
    
    var xpos=this.mHeroend.getXform().getXPos();
    var ypos=this.mHeroend.getXform().getYPos();
    
    if(xpos<-20)
        this.mHeroend.getXform().setXPos(-20);
        
    this.mHerof.getXform().setXPos(xpos+50);
    this.mHerof.getXform().setYPos(ypos+10);
        
    
    
    this.mCamera.panWith(this.mHerof.getXform(), 0.99);
        
    this.mCamera.update(); 
      
    this.mTheLight.set2DPosition(this.mHeroend.getXform().getPosition());
    
    this.Light.set2DPosition(this.mGold.getXform().getPosition());
    
    this.mAllObjs.update(this.mCamera);    
    gEngine.Physics.processCollision(this.mAllObjs, []);
    this.mNonRigid.update(this.mCamera);   
    
    
    
    if(xpos>89.6 && xpos<105)
    {
        this.mRoadend.getRigidBody().setFriction(0);
        this.mHeroend.getRigidBody().setFriction(0);
        
    }
    
    
    if(ypos<10 && !this.music2)
    {
        gEngine.AudioClips.stopBackgroundAudio();
        this.mTheLight.setLightTo(0);
        gEngine.AudioClips.playACue(this.kCue);       
        this.music2=1;
    }
      
    
    if(ypos<-140)
    {       
        this.mHeroend.mode=11;
        this.state=1;    
    }
    
    
    if(this.state && !this.music)
    {
        this.music=1;
        gEngine.AudioClips.playACue(this.kBgClip3);
    }
    
    
    
    
    
    
    
    if(this.state && !this.final1)
    {
        
        //this.mHerof.getXform().setXPos(xpos+50);
        this.mTheLight.set2DPosition([xpos+1.2,ypos+1.5]);
        this.mTheLight.setLightTo(1);
        this.mHeroend.mode=11;
        this.mHeroend.getRigidBody().setMass(0);
        this.mHeroend.rotateObjPointTo([175,-125],1,5);
        this.mHeroend.setSpeed(0.05);
        this.mBallon.setVisibility(1);
        this.mBallon.getXform().setSize(this.mHeroend.getXform().getSize()[0]*0.8,this.mHeroend.getXform().getSize()[1]*0.8);
        this.mBallon.getXform().setXPos(xpos+2.5);
        this.mBallon.getXform().setYPos(ypos+4.2); 
        
    }
    
    if(xpos>178.9 )
        this.final1=1;
    
    if(this.final1)
    {
        this.globalcolor+=0.005;
        //this.mHerof.getXform().setXPos(xpos+50);
        gEngine.DefaultResources.setGlobalAmbientIntensity(this.globalcolor);
        this.mHeroend.mode=11;
        this.mTheLight.setLightTo(1);
        this.mHeroend.rotateObjPointTo([179,-72],1,0);
        this.mHeroend.setSpeed(0.05);
        this.mBallon.getXform().setSize(this.mHeroend.getXform().getSize()[0]*0.8,this.mHeroend.getXform().getSize()[1]*0.8);
        this.mBallon.getXform().setXPos(xpos+2.5);
        this.mBallon.getXform().setYPos(ypos+4.2); 
        this.mTheLight.setIntensity(1-this.globalcolor/3);
    }

    
    if(this.globalcolor>3)
        
        this.globalcolor=3;
    
    if(this.state && ypos>-72.1 && ypos<-71.9 &&!this.isok)
    {
        this.isok=1;
        this.time1=this.time.getMilliseconds();
        this.time2=this.time1;        
    }
    
    
    if(this.isok)
        this.time2+=1;
    
    if(this.time2-this.time1===275)
     {
      gEngine.GameLoop.stop();
   }
   
    
};
