/*
 * File: SnowDemo.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function DustDemo() {
    this.kUIButton = "assets/UI/button.png";

    // The camera to view the scene
    this.mCamera = null;
    this.LevelSelect = null;
    
    this.mAllObjs = null;
    this.mPlatforms = null;
    
    this.mAllDust = null;    
    this.mDust1 = null;
    this.mDust2 = null;
    this.mDust3 = null;
    
    this.mXParticles = null;
    
    this.backButton = null;
    this.MainMenuButton = null;
    this.mDrawRigidShape = true;
    this.r = null;
}
gEngine.Core.inheritPrototype(DustDemo, Scene);


DustDemo.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kUIButton);

    document.getElementById("particle").style.display="block";
};

DustDemo.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kUIButton);

    document.getElementById("particle").style.display="none";
    if(this.LevelSelect==="Back")
        gEngine.Core.startScene(new ParticleLevel());
    else if(this.LevelSelect==="Main")
        gEngine.Core.startScene(new MyGame());
};

DustDemo.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        100,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0, 0, 0, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    this.mAllDust = new GameObjectSet();
    this.mDust1 = new Dust(50,0,50,-.5,100,0,0,1,1,0,1,80);
    this.mAllDust.addToSet(this.mDust1);    
    this.mXParticles = new ParticleGameObjectSet();  
    
    this.backButton = new UIButton(this.kUIButton,this.backSelect,this,[80,580],[160,40],"Go Back",4,[1,1,1,1],[1,1,1,1]);
    this.MainMenuButton = new UIButton(this.kUIButton,this.mainSelect,this,[700,580],[200,40],"Main Menu",4,[1,1,1,1],[1,1,1,1]);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
DustDemo.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0, 0, 0, 1.0]); // clear to med gray

    this.mCamera.setupViewProjection();
    
    // for now draw these ...
    /*for (var i = 0; i<this.mCollisionInfos.length; i++) 
        this.mCollisionInfos[i].draw(this.mCamera); */
    this.mCollisionInfos = [];    
    
    this.mAllDust.draw(this.mCamera);
    this.mXParticles.draw(this.mCamera);
    
    this.MainMenuButton.draw(this.mCamera);
    this.backButton.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
DustDemo.prototype.update = function () {
    gEngine.ParticleSystem.update(this.mAllDust);
    gEngine.ParticleSystem.update(this.mXParticles);
    
    if (this.mCamera.isMouseInViewport()) {
      
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
        this.mDust1.incWidth(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.W)) {
        this.mDust1.incWidth(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.A)) {
        this.mDust1.incyAcceleration(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.S)) {
        this.mDust1.incyAcceleration(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Z)) {
        this.mDust1.incLife(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.X)) {
        this.mDust1.incLife(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.E)) {
        this.mDust1.incxVelocity(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
        this.mDust1.incxVelocity(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.D)) {
        this.mDust1.incyVelocity(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.F)) {
        this.mDust1.incyVelocity(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.C)) {
        this.mDust1.incFlicker(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.V)) {
        this.mDust1.incFlicker(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.T)) {
        this.mDust1.incIntensity(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Y)) {
        this.mDust1.incIntensity(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.G)) {
        this.mDust1.incxAcceleration(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.H)) {
        this.mDust1.incxAcceleration(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.B)) {
        this.mDust1.incParticleSize(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.N)) {
        this.mDust1.incParticleSize(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.U)) {
        this.mDust1.incyOffset(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.I)) {
        this.mDust1.incyOffset(-1);
    }
    if (gEngine.Input.isButtonClicked(0)){
        if (this.mCamera.isMouseInViewport()) {
            this.createXParticle(this.mCamera.mouseWCX(), this.mCamera.mouseWCY());            
        }
    }

    this.updateValue(this.mDust1);
    this.MainMenuButton.update();
    this.backButton.update();
    
    //this.wrapParticles();
    //gEngine.ParticleSystem.collideWithRigidSet(this.mAllObjs, this.mDust1.getSet());
};

DustDemo.prototype.createXParticle = function(atX, atY){
    var XYPos = new vec2.fromValues(atX,atY);
    if(Math.floor(Math.random()*2)){
        var pTexture = "assets/ParticleSystem/dust.png";
    }else{
        var pTexture = "assets/ParticleSystem/dust2.png";
    }
//    var radius = 4;
//    var angle = i*18;//Math.PI*2;
//    var rXDist = Math.cos(angle)*radius;
//    var rYDist = Math.sin(angle)*radius;        
    var p = new ParticleGameObject(pTexture,atX,atY,90);
    p.getRenderable().setColor([1,1,1,1]);
    p.setFinalColor([0, 0, 0, 1]);
    var r = 10 + Math.random() * 2.5;
    p.getXform().setSize(r, r);    
    p.getXform().incRotationByDegree(Math.random()*360);
    //p.getParticle().setVelocity([rXDist,rYDist]);
    //p.getParticle().setAcceleration([0,0]);

    p.getParticle().setVelocity([1, 1]);
    p.getParticle().setAcceleration([0,0]);
    
    p.setSizeDelta(1.0+Math.random()*0.01);
    this.mXParticles.addToSet(p);
    
    
    var p = new ParticleGameObject("assets/ParticleSystem/shock.png", atX, atY, 12);
    p.getRenderable().setColor([1, 1, 1, .1]);
    
    // size of the particle
    var r = 5 + Math.random() * 2.5;
    p.getXform().setSize(r, r);
    p.getXform().incRotationByDegree(Math.random()*360);
    // final color
    //p.setFinalColor([fr, fg, fb, 0.6]);    

    p.getParticle().setVelocity([0, 0]);
    p.getParticle().setAcceleration([0,0]);
    // size delta
    p.setSizeDelta(1.1);
    
    this.mXParticles.addToSet(p);
        
    var p = new ParticleGameObject("assets/ParticleSystem/shock2.png", atX, atY, 10);
    p.getRenderable().setColor([1, 1, 1, 1]);
    
    // size of the particle
    var r = 9 + Math.random() * 2.5;
    p.getXform().setSize(r, r);
    

    p.getParticle().setVelocity([0, 0]);
    p.getParticle().setAcceleration([0,0]);
    // size delta
    p.setSizeDelta(.99);
    this.mXParticles.addToSet(p);
    
    var pSet = this.mDust1.getSet().mSet;
    var setLength = pSet.length;
    
    for(var i = 0; i < setLength; i++){
        var particle = pSet[i].getParticle();
        var pPos = pSet[i].getParticle().getPosition();        
        var pVec = new vec2.fromValues(pPos[0]-XYPos[0],pPos[1]-XYPos[1]);                
        particle.setVelocity([pVec[0]*2,pVec[1]*2]);      
    }
};

DustDemo.prototype.updateValue = function(obj){
    document.getElementById("value1").innerHTML = obj.getWidth();
    document.getElementById("value2").innerHTML = obj.getyAcceleration();
    document.getElementById("value3").innerHTML = obj.getLife();
    document.getElementById("value4").innerHTML = obj.getxVelocity();
    document.getElementById("value5").innerHTML = obj.getyVelocity();
    document.getElementById("value6").innerHTML = obj.getFlicker();
    document.getElementById("value7").innerHTML = obj.getIntensity();
    document.getElementById("value8").innerHTML = obj.getxAcceleration();
    document.getElementById("value9").innerHTML = obj.getParticleSize();
    document.getElementById("value10").innerHTML = obj.getyOffset();
};

DustDemo.prototype.backSelect = function(){
    this.LevelSelect="Back";
    gEngine.GameLoop.stop();
};

DustDemo.prototype.mainSelect = function(){
    this.LevelSelect="Main";
    gEngine.GameLoop.stop();
};