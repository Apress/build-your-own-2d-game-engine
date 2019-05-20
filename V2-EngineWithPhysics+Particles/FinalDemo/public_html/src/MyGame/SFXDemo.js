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

function SFXDemo() {
    this.kUIButton = "assets/UI/button.png";
    this.kTargetTexture = "assets/fire/target.png";
    // The camera to view the scene
    this.mCamera = null;
    this.LevelSelect = null;
    this.mAllObjs = null;
    this.mPlatforms = null;
    this.mTiny1 = null;
    this.mTiny2 = null;
    this.mTiny3 = null;
    this.mTiny4 = null;
    this.mXParticles = null;
    this.mTarget = null;
    this.backButton = null;
    this.MainMenuButton = null;
    this.mDrawRigidShape = true;
    this.r = null;
}
gEngine.Core.inheritPrototype(SFXDemo, Scene);


SFXDemo.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kUIButton);
    gEngine.Textures.loadTexture(this.kTargetTexture);
    document.getElementById("particle").style.display="block";
};

SFXDemo.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kUIButton);
    gEngine.Textures.unloadTexture(this.kTargetTexture);
    document.getElementById("particle").style.display="none";
    if(this.LevelSelect==="Back")
        gEngine.Core.startScene(new ParticleLevel());
    else if(this.LevelSelect==="Main")
        gEngine.Core.startScene(new MyGame());
};

SFXDemo.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        100,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0, 0, 0, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    this.mTiny1=new ParticleSystem(this.kTargetTexture, 50,0,1,4,25,0,0,0,1,0,.1,0,[1,0,0,1], [0,0,1,1], 1);
    this.mTiny2=new ParticleSystem(this.kTargetTexture, 50,80,1,-4,25,0,0,0,1,0,.1,0,[1,0,0,1], [0,0,1,1], 1);
    this.mTiny4=new ParticleSystem(this.kTargetTexture, 0,30,0,0,40,0,0,0,2,10,.1,20,[1,0,0,1], [0,0,1,1], 1);
    this.mTiny3=new ParticleSystem(this.kTargetTexture, 100,30,0,0,40,0,0,0,2,-10,.1,20,[1,0,0,1], [0,0,1,1], 1);
    this.mXParticles = new ParticleGameObjectSet();
    
    this.mTarget = new GameObject(new SpriteRenderable(this.kTargetTexture));
    this.mTarget.getXform().setSize(0.1,0.1);
    var r = new RigidCircle(this.mTarget.getXform(), 7);
    this.mTarget.setRigidBody(r);
    
    this.mAllObjs = new GameObjectSet();
    this.mAllObjs.addToSet(this.mTarget);
    
    this.backButton = new UIButton(this.kUIButton,this.backSelect,this,[80,580],[160,40],"Go Back",4,[1,1,1,1],[1,1,1,1]);
    this.MainMenuButton = new UIButton(this.kUIButton,this.mainSelect,this,[700,580],[200,40],"Main Menu",4,[1,1,1,1],[1,1,1,1]);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
SFXDemo.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0, 0, 0, 1.0]); // clear to med gray

    this.mCamera.setupViewProjection();
    
    // for now draw these ...
    /*for (var i = 0; i<this.mCollisionInfos.length; i++) 
        this.mCollisionInfos[i].draw(this.mCamera); */
    this.mCollisionInfos = []; 
    
    this.mTarget.draw(this.mCamera);
    this.mTiny1.draw(this.mCamera);
    this.mTiny2.draw(this.mCamera);
    this.mTiny3.draw(this.mCamera);
    this.mTiny4.draw(this.mCamera);
    this.mXParticles.draw(this.mCamera);
    this.MainMenuButton.draw(this.mCamera);
    this.backButton.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
//SnowDemo.kBoundDelta = 0.1;
SFXDemo.prototype.update = function () {
    gEngine.ParticleSystem.update(this.mTiny1);
    gEngine.ParticleSystem.update(this.mTiny2);
    gEngine.ParticleSystem.update(this.mTiny3);
    gEngine.ParticleSystem.update(this.mTiny4);
    gEngine.ParticleSystem.update(this.mXParticles);
    
    if (this.mCamera.isMouseInViewport()) {
        var xform = this.mTarget.getXform();
        xform.setXPos(this.mCamera.mouseWCX());
        xform.setYPos(this.mCamera.mouseWCY());       
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
        this.mTiny1.incWidth(1);
        this.mTiny2.incWidth(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.W)) {
        this.mTiny1.incWidth(-1);
        this.mTiny2.incWidth(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.A)) {
        this.mTiny1.incyAcceleration(1);
        this.mTiny2.incyAcceleration(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.S)) {
        this.mTiny1.incyAcceleration(-1);
        this.mTiny2.incyAcceleration(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Z)) {
        this.mTiny1.incLife(1);
        this.mTiny2.incLife(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.X)) {
        this.mTiny1.incLife(-1);
        this.mTiny2.incLife(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.E)) {
        this.mTiny1.incxVelocity(1);
        this.mTiny2.incxVelocity(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
        this.mTiny1.incxVelocity(-1);
        this.mTiny2.incxVelocity(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.D)) {
        this.mTiny1.incyVelocity(1);
        this.mTiny2.incyVelocity(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.F)) {
        this.mTiny1.incyVelocity(-1);
        this.mTiny2.incyVelocity(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.C)) {
        this.mTiny1.incFlicker(1);
        this.mTiny2.incFlicker(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.V)) {
        this.mTiny1.incFlicker(-1);
        this.mTiny2.incFlicker(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.T)) {
        this.mTiny1.incIntensity(1);
        this.mTiny2.incIntensity(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Y)) {
        this.mTiny1.incIntensity(-1);
        this.mTiny2.incIntensity(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.G)) {
        this.mTiny1.incxAcceleration(1);
        this.mTiny2.incxAcceleration(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.H)) {
        this.mTiny1.incxAcceleration(-1);
        this.mTiny2.incxAcceleration(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.B)) {
        this.mTiny1.incParticleSize(1);
        this.mTiny2.incParticleSize(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.N)) {
        this.mTiny1.incParticleSize(-1);
        this.mTiny2.incParticleSize(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.U)) {
        this.mTiny1.incyOffset(1);
        this.mTiny2.incyOffset(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.I)) {
        this.mTiny1.incyOffset(-1);
        this.mTiny2.incyOffset(-1);
    }
    if (gEngine.Input.isButtonPressed(0)){
        if (this.mCamera.isMouseInViewport()) {
            this.createXParticle(this.mCamera.mouseWCX(), this.mCamera.mouseWCY());
        }
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)) {            
        //var r = new RigidCircle(this.mTarget.getXform(), this.mTarget.getXform().getSize() + 10);            
        //this.r.getRadius();
        //this.mTarget.setRigidBody(r);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
        //var r = new RigidCircle(this.mTarget.getXform(), this.mTarget.getXform().getSize() - 10);
        //this.mTarget.setRigidBody(r);
    }
    this.updateValue();
    this.MainMenuButton.update();
    this.backButton.update();
    
    this.wrapParticles();
    gEngine.ParticleSystem.collideWithRigidSet(this.mAllObjs, this.mTiny1.getSet());
    gEngine.ParticleSystem.collideWithRigidSet(this.mAllObjs, this.mTiny2.getSet());
    gEngine.ParticleSystem.collideWithRigidSet(this.mAllObjs, this.mTiny3.getSet());
    gEngine.ParticleSystem.collideWithRigidSet(this.mAllObjs, this.mTiny4.getSet());   
};

SFXDemo.prototype.createXParticle = function(atX, atY){
    var v2t = new vec2.fromValues(atX-50,atY-40);
    var life = 450;
    var p = new ParticleGameObject(this.kTargetTexture, 50,40, life);        
    // size of the particle    
    p.getXform().setSize(0.5, 0.5);    
    p.getRenderable().setColor([0, 0, 1, 1]);
    p.setFinalColor([0, 1, 0, 1]);
    
    // velocity on the particle
    var scaledVec = new vec2.create;
    vec2.scale(scaledVec,v2t,2);
    p.getParticle().setVelocity(scaledVec);
    p.getParticle().setAcceleration(scaledVec);    
    // size delta
    p.setSizeDelta(1.001);    
    this.mXParticles.addToSet(p);
    var p2 = new ParticleGameObject(this.kTargetTexture, 50,40, life);
    p2.getXform().setSize(0.5, 0.5);    
    p2.getRenderable().setColor([0, 0, 1, 1]);
    p2.setFinalColor([0, 1, 0, 1]);
    
    // velocity on the particle
    var negVec = new vec2.create;
    vec2.negate(negVec,scaledVec);
    p2.getParticle().setVelocity(negVec);
    p2.getParticle().setAcceleration(negVec);    
    // size delta
    p2.setSizeDelta(1.001);
    this.mXParticles.addToSet(p2);
    
    var p = new ParticleGameObject(this.kTargetTexture, 50,40, 10);        
    // size of the particle    
    p.getXform().setSize(2.5, 2.5);    
    p.getRenderable().setColor([1, 1, 1, 1]);
    p.setFinalColor([0, 0, 0, 1]);
    
    // velocity on the particle    
    p.getParticle().setVelocity([0,0]);
    p.getParticle().setAcceleration([0,0]);    
    // size delta
    p.setSizeDelta(1.001);
    this.mXParticles.addToSet(p);
};

SFXDemo.prototype.wrapParticles = function(){    
    var pSet = this.mTiny1.getSet().mSet;
    var setLength = pSet.length;    
    for (var i = 0; i < setLength; i++){
        this.applyDrift(pSet[i]);
    }
    var pSet = this.mTiny2.getSet().mSet;
    var setLength = pSet.length;    
    for (var i = 0; i < setLength; i++){
        this.applyDrift(pSet[i]);
    }
    var pSet = this.mTiny3.getSet().mSet;
    var setLength = pSet.length;
    for (var i = 0; i < setLength; i++){
        this.applyTaper(pSet[i]);
    }
    var pSet = this.mTiny4.getSet().mSet;
    var setLength = pSet.length;
    for (var i = 0; i < setLength; i++){
        this.applyTaper(pSet[i]);
    }
};

SFXDemo.prototype.applyDrift = function(pGO){
    //console.log(p);
    var p = pGO.getParticle();
    var pPos = p.getPosition();
    var pOPos = p.getOriginalPosition();
    var pAccel = p.getAcceleration();
    var dist = Math.abs(pPos[0] - pOPos[0]);    
    if(dist % (Math.floor(Math.random()*5)) < 0.1){
        var test = Math.floor(Math.random()*2);
        if(test)
            p.mDriftDir = !p.mDriftDir;
    }    
    if(p.mDriftDir){
        p.setAcceleration([10,pAccel[1]]);
    }
    else{
        p.setAcceleration([-10,pAccel[1]]);
    }
    if(p.mParallaxDir){
        pGO.setSizeDelta(1.0005);
        pGO.getXform().incYPosBy(-.01);        
    }
    else{
        pGO.setSizeDelta(.999);
        pGO.getXform().incYPosBy(.01);        
    }
    if (pPos[0] > 100){
        pPos[0] = 0;
    }
    if (pPos[0] < 0){
        pPos[0] = 100;
    }
};

SFXDemo.prototype.applyTaper = function(pGO){
    var p = pGO.getParticle();    
    var pAccel = p.getAcceleration();
    var v2c = new vec2.fromValues(pAccel[0],(40-p.getYPos())*150);//40-p.getYPos())*50);        
    p.setAcceleration(v2c);   
};

SFXDemo.prototype.updateValue = function(){
    document.getElementById("value1").innerHTML = this.mTiny1.getWidth();
    document.getElementById("value2").innerHTML = this.mTiny1.getyAcceleration();
    document.getElementById("value3").innerHTML = this.mTiny1.getLife();
    document.getElementById("value4").innerHTML = this.mTiny1.getxVelocity();
    document.getElementById("value5").innerHTML = this.mTiny1.getyVelocity();
    document.getElementById("value6").innerHTML = this.mTiny1.getFlicker();
    document.getElementById("value7").innerHTML = this.mTiny1.getIntensity();
    document.getElementById("value8").innerHTML = this.mTiny1.getxAcceleration();
    document.getElementById("value9").innerHTML = this.mTiny1.getParticleSize();
    document.getElementById("value10").innerHTML = this.mTiny1.getyOffset();
};

SFXDemo.prototype.backSelect = function(){
    this.LevelSelect="Back";
    gEngine.GameLoop.stop();
};

SFXDemo.prototype.mainSelect = function(){
    this.LevelSelect="Main";
    gEngine.GameLoop.stop();
};