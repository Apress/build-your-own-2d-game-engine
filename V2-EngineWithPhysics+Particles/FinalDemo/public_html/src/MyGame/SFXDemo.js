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
    this.kTargetTexture = "assets/Snow/target.png";
    this.kTinyTexture = "assets/ParticleSystem/tiny.png";
    // The camera to view the scene
    this.mCamera = null;
    this.LevelSelect = null;
    this.mAllObjs = null;
    this.mPlatforms = null;
    this.mTiny = null;
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
    gEngine.Textures.loadTexture(this.kTinyTexture);
    document.getElementById("particle").style.display="block";
};

SFXDemo.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kUIButton);
    gEngine.Textures.unloadTexture(this.kTargetTexture);
    gEngine.Textures.unloadTexture(this.kTinyTexture);
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
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    this.mTiny=new ParticleSystem(this.kTinyTexture, 50,5,35,4,50,0,0,0,1,0,.1,0,[1,0,0,1], [0,0,1,1], 1);
    this.mXParticles = new ParticleGameObjectSet();
    this.mTarget = new GameObject(new SpriteRenderable(this.kTargetTexture));
    var r = new RigidCircle(this.mTarget.getXform(), 5);
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
    this.mTiny.draw(this.mCamera);
    this.mXParticles.draw(this.mCamera);
    this.MainMenuButton.draw(this.mCamera);
    this.backButton.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
//SnowDemo.kBoundDelta = 0.1;
SFXDemo.prototype.update = function () {
    gEngine.ParticleSystem.update(this.mTiny);
    gEngine.ParticleSystem.update(this.mXParticles);
    if (this.mCamera.isMouseInViewport()) {
        var xform = this.mTarget.getXform();
        xform.setXPos(this.mCamera.mouseWCX());
        xform.setYPos(this.mCamera.mouseWCY());       
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
        this.mTiny.incWidth(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.W)) {
        this.mTiny.incWidth(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.A)) {
        this.mTiny.incyAcceleration(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.S)) {
        this.mTiny.incyAcceleration(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Z)) {
        this.mTiny.incLife(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.X)) {
        this.mTiny.incLife(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.E)) {
        this.mTiny.incxVelocity(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
        this.mTiny.incxVelocity(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.D)) {
        this.mTiny.incyVelocity(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.F)) {
        this.mTiny.incyVelocity(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.C)) {
        this.mTiny.incFlicker(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.V)) {
        this.mTiny.incFlicker(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.T)) {
        this.mTiny.incIntensity(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Y)) {
        this.mTiny.incIntensity(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.G)) {
        this.mTiny.incxAcceleration(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.H)) {
        this.mTiny.incxAcceleration(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.B)) {
        this.mTiny.incParticleSize(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.N)) {
        this.mTiny.incParticleSize(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.U)) {
        this.mTiny.incyOffset(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.I)) {
        this.mTiny.incyOffset(-1);
    }
    if (gEngine.Input.isButtonClicked(0)){
        if (this.mCamera.isMouseInViewport()) {
            var p = this.createXParticle(this.mCamera.mouseWCX(), this.mCamera.mouseWCY());
            this.mXParticles.addToSet(p);
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
    gEngine.ParticleSystem.collideWithRigidSet(this.mAllObjs, this.mTiny.getSet());
    if(this.mXParticles.size > 0)
        gEngine.ParticleSystem.collideWithRigidSet(this.mXParticles, this.mTiny.getSet());
};

SFXDemo.prototype.createXParticle = function(atX, atY){
    var life = 130 + Math.random() * 10;
    var p = new ParticleGameObject(this.kTinyTexture, atX, atY, life);
    p.getRenderable().setColor([1, 1, 1, 1]);
    
    // size of the particle
    var r = 3.5 + Math.random() * 2.5;
    p.getXform().setSize(r, r);
    
    // final color
    //var fr = 3.5 + Math.random();
    //var fg = 0.4 + 0.1 * Math.random();
    //var fb = 0.3 + 0.1 * Math.random();
    //p.setFinalColor([fr, fg, fb, 0.6]);
    
    // velocity on the particle
    var fx = 10 * Math.random() - 20 * Math.random();
    var fy = 10 * Math.random();
    p.getParticle().setVelocity([fx, fy]);
    //var ax = 10 * Math.random() - 20 * Math.random();
    //var ay = 10 * Math.random();
    //p.getParticle().setAcceleration([ax,ay]);
    // size delta
    p.setSizeDelta(0.98);
    
    return p;
};

SFXDemo.prototype.wrapParticles = function(){    
    var pSet = this.mTiny.getSet().mSet;
    var setLength = pSet.length;    
    for (var i = 0; i < setLength; i++){
        this.applyDrift(pSet[i]);
    }
};

SFXDemo.prototype.applyDrift = function(pGO){
    //console.log(p);
    var p = pGO.getParticle();
    var pPos = p.getPosition();
    var pOPos = p.getOriginalPosition();
    var dist = Math.abs(pPos[0] - pOPos[0]);    
    if(dist % (Math.floor(Math.random()*5)) < 0.1){
        var test = Math.floor(Math.random()*2);
        if(test)
            p.mDriftDir = !p.mDriftDir;
    }    
    if(p.mDriftDir){
        pPos[0] += .05;
    }
    else{
        pPos[0] -= .05;
    }
    if(p.mParallaxDir){
        pGO.setSizeDelta(1.0005);
        pGO.getXform().incYPosBy(-.01);        
    }
    else{
        pGO.setSizeDelta(.999);
        pGO.getXform().incYPosBy(.01);        
    }
    //var g = gEngine.ParticleSystem.getSystemtAcceleration();
//    if (dist < 2){
        //p.mAcceleration = g;
//    }
//    if (dist > 2 && dist < 4){
//        var newG = [g[0],g[1] + 3];
//        p.setAcceleration(newG);
        //p.mAcceleration = g-[0,1];
//    }
//    if (dist > 4){
//        var newG = [g[0],g[1] + 6];
//        p.setAcceleration(newG);
        //p.mAcceleration = g-[0,2];
//    }
    if (pPos[0] > 100){
        pPos[0] = 0;
    }
    if (pPos[0] < 0){
        pPos[0] = 100;
    }
    var pXform = pGO.getXform();
    pXform.incRotationByDegree(p.mRotationVal*.05);
};

SFXDemo.prototype.updateValue = function(){
    document.getElementById("value1").innerHTML = this.mTiny.getWidth();
    document.getElementById("value2").innerHTML = this.mTiny.getyAcceleration();
    document.getElementById("value3").innerHTML = this.mTiny.getLife();
    document.getElementById("value4").innerHTML = this.mTiny.getxVelocity();
    document.getElementById("value5").innerHTML = this.mTiny.getyVelocity();
    document.getElementById("value6").innerHTML = this.mTiny.getFlicker();
    document.getElementById("value7").innerHTML = this.mTiny.getIntensity();
    document.getElementById("value8").innerHTML = this.mTiny.getxAcceleration();
    document.getElementById("value9").innerHTML = this.mTiny.getParticleSize();
    document.getElementById("value10").innerHTML = this.mTiny.getyOffset();
};

SFXDemo.prototype.backSelect = function(){
    this.LevelSelect="Back";
    gEngine.GameLoop.stop();
};

SFXDemo.prototype.mainSelect = function(){
    this.LevelSelect="Main";
    gEngine.GameLoop.stop();
};