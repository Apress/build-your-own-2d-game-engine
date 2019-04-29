/*
 * File: SmokeDemo.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function SmokeDemo() {
    this.kPlatformTexture = "assets/Smoke/platform.png";
    this.kTargetTexture = "assets/Smoke/target.png";
    this.kTeacup = "assets/Smoke/teapot.png";
    this.kBush = "assets/Smoke/bush.png";
    this.kForest = "assets/Smoke/forest.png";
    this.kUIButton = "assets/UI/button.png";
    
    // The camera to view the scene
    this.mCamera = null;

    
    this.LevelSelect = null;

    this.mPlatforms = null;
    this.mAllSmoke = null;
    
    this.mCurrentObj = 0;
    this.mTarget = null;
    this.fire = null;
    this.mBush = null;
    this.mTeacup = null;
    this.mForest = null;
    this.backButton = null;
    this.MainMenuButton = null;
}
gEngine.Core.inheritPrototype(SmokeDemo, Scene);


SmokeDemo.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kPlatformTexture);
    gEngine.Textures.loadTexture(this.kTargetTexture);
    gEngine.Textures.loadTexture(this.kTeacup);
    gEngine.Textures.loadTexture(this.kBush);
    gEngine.Textures.loadTexture(this.kForest);
    gEngine.Textures.loadTexture(this.kUIButton);
    document.getElementById("particle").style.display="block";
};

SmokeDemo.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kPlatformTexture);
    gEngine.Textures.unloadTexture(this.kTargetTexture);
    gEngine.Textures.unloadTexture(this.kTeacup);
    gEngine.Textures.unloadTexture(this.kBush);
    gEngine.Textures.unloadTexture(this.kForest);
    gEngine.Textures.unloadTexture(this.kUIButton);
    document.getElementById("particle").style.display="none";
    if(this.LevelSelect==="Back")
        gEngine.Core.startScene(new ParticleLevel());
    else if(this.LevelSelect==="Main")
        gEngine.Core.startScene(new MyGame());
};

SmokeDemo.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        100,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.2, 0.2, 0.2, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    this.mPlatforms = new GameObjectSet();
    this.mAllSmoke = new GameObjectSet();
    
    this.createBounds();
    this.mFirstObject = 0;
    this.mCurrentObj = this.mFirstObject;
    var m;
    //m=new Smoke(10,10,3,2,60,0,20,1,1,0,2.5,0);
    //this.mAllSmoke.addToSet(m);
    this.fire=new Fire(10,7,3,2,20,0,20,4,1,0,2.5,0);
    m=new Smoke(25,7,20,2,60,0,5,1,9,0,2.5,7);
    this.mAllSmoke.addToSet(m);
    m=new Smoke(75,7,20,2,60,0,5,1,9,0,2.5,7);
    this.mAllSmoke.addToSet(m);
    var r = new TextureRenderable(this.kTargetTexture);
    this.mTarget = new GameObject(r);
    var xf = r.getXform();
    xf.setSize(3, 3);
    this.mBush = new TextureRenderable(this.kBush);
    this.mBush.getXform().setPosition(10,8);
    this.mBush.setColor([0, 0, 0, 0]);  // No tinting
    this.mBush.getXform().setSize(6,6);
    this.mTeacup = new TextureRenderable(this.kForest);
    this.mTeacup.getXform().setPosition(25,9);
    this.mTeacup.setColor([0, 0, 0, 0]);  // No tinting
    this.mTeacup.getXform().setSize(48,12);
    this.mForest = new TextureRenderable(this.kForest);
    this.mForest.getXform().setPosition(75,9);
    this.mForest.setColor([0, 0, 0, 0]);  // No tinting
    this.mForest.getXform().setSize(48,12);
    this.backButton = new UIButton(this.kUIButton,this.backSelect,this,[80,580],[160,40],"Go Back",4,[1,1,1,1],[1,1,1,1]);
    this.MainMenuButton = new UIButton(this.kUIButton,this.mainSelect,this,[700,580],[200,40],"Main Menu",4,[1,1,1,1],[1,1,1,1]);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
SmokeDemo.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.2, 0.2, 0.2, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    
    //this.mBush.draw(this.mCamera);
    this.mTeacup.draw(this.mCamera);
    this.mForest.draw(this.mCamera);
    //this.mTarget.draw(this.mCamera);
    this.mAllSmoke.draw(this.mCamera);
    //this.fire.draw(this.mCamera);
    this.mPlatforms.draw(this.mCamera);
    this.MainMenuButton.draw(this.mCamera);
    this.backButton.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
SmokeDemo.kBoundDelta = 0.1;
SmokeDemo.prototype.update = function () {
    gEngine.ParticleSystem.update(this.mAllSmoke);
    gEngine.ParticleSystem.update(this.fire);
    // create particles
    this.applyEmbers();
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Left)) {
        this.mCurrentObj -= 1;
        if (this.mCurrentObj < this.mFirstObject)
            this.mCurrentObj = this.mAllSmoke.size() - 1;
    }            
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Right)) {
        this.mCurrentObj += 1;
        if (this.mCurrentObj >= this.mAllSmoke.size())
            this.mCurrentObj = this.mFirstObject;
    }

    var obj = this.mAllSmoke.getObjectAt(0);
    var obj1 = this.mAllSmoke.getObjectAt(1);
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
        obj.incWidth(1);
        obj1.incWidth(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.W)) {
        obj.incWidth(-1);
        obj1.incWidth(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.A)) {
        obj.incyAcceleration(1);
        obj1.incyAcceleration(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.S)) {
        obj.incyAcceleration(-1);
        obj1.incyAcceleration(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Z)) {
        obj.incLife(1);
        obj1.incLife(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.X)) {
        obj.incLife(-1);
        obj1.incLife(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.E)) {
        obj.incxVelocity(1);
        obj1.incxVelocity(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
        obj.incxVelocity(-1);
        obj1.incxVelocity(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.D)) {
        obj.incyVelocity(1);
        obj1.incyVelocity(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.F)) {
        obj.incyVelocity(-1);
        obj1.incyVelocity(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.C)) {
        obj.incFlicker(1);
        obj1.incFlicker(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.V)) {
        obj.incFlicker(-1);
        obj1.incFlicker(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.T)) {
        obj.incIntensity(1);
        obj1.incIntensity(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Y)) {
        obj.incIntensity(-1);
        obj1.incIntensity(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.G)) {
        obj.incxAcceleration(1);
        obj1.incxAcceleration(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.H)) {
        obj.incxAcceleration(-1);
        obj1.incxAcceleration(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.B)) {
        obj.incParticleSize(1);
        obj1.incParticleSize(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.N)) {
        obj.incParticleSize(-1);
        obj1.incParticleSize(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.U)) {
        obj.incyOffset(1);
        obj1.incyOffset(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.I)) {
        obj.incyOffset(-1);
        obj1.incyOffset(-1);
    }

    var p = obj.getPos();
    this.mTarget.getXform().setPosition(p[0], p[1]);
    this.updateValue(obj);
    this.MainMenuButton.update();
    this.backButton.update();
};
SmokeDemo.prototype.applyEmbers = function(){
    var sPSet = this.mAllSmoke.getObjectAt(1);
    var pSet = sPSet.getSet().mSet;
    var setLength = pSet.length;
    for (var i = 0; i < setLength; i++){    
        if(pSet[i].getParticle().mParallaxDir && pSet[i].getParticle().mDriftDir){
            this.applyDrift(pSet[i]);            
        }
        if(pSet[i].getParticle().mParallaxDir && !pSet[i].getParticle().mDriftDir){
            this.applyColor(pSet[i]);
        }
        if(!pSet[i].getParticle().mParallaxDir && !pSet[i].getParticle().mDriftDir){
            this.applySizeDelta(pSet[i]);
            this.applyColor(pSet[i]);
        }
    }
};
SmokeDemo.prototype.applyDrift = function(pGO){
    var p = pGO.getParticle();
    var pPos = p.getPosition();
    //var xform = pGO.getXform();    
    pGO.setSizeDelta(.95);
    if(Math.floor(Math.random()*2) === 0){
        pPos[0] += 1;
    }
    else{
        pPos[0] -= 1;
    }
};

SmokeDemo.prototype.applySizeDelta = function(pGO){
    if(Math.floor(Math.random()*2) === 0){
        pGO.setSizeDelta(1.0125);        
    }
    else{
        pGO.setSizeDelta(.99); 
    }    
};

SmokeDemo.prototype.applyColor = function(pGO){
    var p = pGO.getParticle();
    if(Math.floor(Math.random()*2) === 0){
        pGO.setFinalColor([0,0,0,1]);
        p.setVelocity([-3.5,p.getVelocity()[1]+.1]);
    }
    else{
        pGO.setFinalColor([.1,.1,.1,1]);
        p.setVelocity([3.5,p.getVelocity()[1]+.1]);
    }       
};

SmokeDemo.prototype.updateValue = function(obj){
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

SmokeDemo.prototype.createBounds = function() {
    var x = 15, w = 30, y = 4;
    for (x = 15; x < 120; x+=30) 
        this.platformAt(x, y, w, 0);
};

SmokeDemo.prototype.platformAt = function (x, y, w, rot) {
    var h = w / 8;
    var p = new TextureRenderable(this.kPlatformTexture);
    var xf = p.getXform();
    
    var g = new GameObject(p);
    var r = new RigidRectangle(xf, w, h);
    g.setRigidBody(r);
    
    r.setMass(0);
    xf.setSize(w, h);
    xf.setPosition(x, y);
    xf.setRotationInDegree(rot);
    this.mPlatforms.addToSet(g);
};

SmokeDemo.prototype.backSelect = function(){
    this.LevelSelect="Back";
    gEngine.GameLoop.stop();
};

SmokeDemo.prototype.mainSelect = function(){
    this.LevelSelect="Main";
    gEngine.GameLoop.stop();
};