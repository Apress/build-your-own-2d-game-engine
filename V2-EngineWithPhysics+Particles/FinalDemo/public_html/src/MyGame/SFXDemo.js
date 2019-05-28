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
    this.kTargetTexture = "assets/Fire/target.png";
    // The camera to view the scene
    this.mCamera = null;
    this.LevelSelect = null;
    this.mAllObjs = null;
    this.mPlatforms = null;
    this.mTiny1 = null;
    this.mTiny2 = null;
    this.mTiny3 = null;
    this.mTiny4 = null;
    this.mAllParticles = null;
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
    gEngine.Textures.loadTexture("assets/ParticleSystem/shock2.png");
    gEngine.Textures.loadTexture("assets/ParticleSystem/shock.png");
    gEngine.Textures.loadTexture("assets/ParticleSystem/particle.png");
    gEngine.Textures.loadTexture("assets/ParticleSystem/bubble.png");
    gEngine.Textures.loadTexture("assets/ParticleSystem/sparkle.png");
    document.getElementById("subemitter").style.display="block";
};

SFXDemo.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kUIButton);
    document.getElementById("subemitter").style.display="none";
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
    this.mAllParticles = new GameObjectSet();
    this.mTiny1=new SubEmitter("assets/ParticleSystem/particle.png", "assets/ParticleSystem/shock2.png", 95,0,0,-5,15,50,275,0,55,0,.1,0,[1,1,1,1], [1,0,1,1], [1,0,0,1], [1,0,1,1], true, 45, 1.05);
    this.mAllParticles.addToSet(this.mTiny1);
    this.mTiny2=new SubEmitter("assets/ParticleSystem/particle.png", "assets/ParticleSystem/sparkle.png", 5,0,0,-10,15,-40,275,0,55,0,.1,0,[1,1,1,1], [1,0,1,1], [1,0,0,1], [1,0,1,1], false, 30, 1.1);
    this.mAllParticles.addToSet(this.mTiny2);
    this.mTiny3=new SubEmitter("assets/ParticleSystem/bubble.png", "assets/ParticleSystem/shock.png", 50,0,10,4,50,0,20,0,40,0,1,0,[1,1,1,1], [1,.8,0,1], [1,0,0,0], [1,.8,0,1], false, 6, 1.125);
    this.mAllParticles.addToSet(this.mTiny3);    
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
    this.mCollisionInfos = []; 
    
    this.mTarget.draw(this.mCamera);
    this.mAllParticles.draw(this.mCamera);
    this.mXParticles.draw(this.mCamera);
    this.MainMenuButton.draw(this.mCamera);
    this.backButton.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
SFXDemo.prototype.update = function () {    
    gEngine.ParticleSystem.update(this.mAllParticles);    
    gEngine.ParticleSystem.update(this.mXParticles);
    
    if (this.mCamera.isMouseInViewport()) {
        var xform = this.mTarget.getXform();
        xform.setXPos(this.mCamera.mouseWCX());
        xform.setYPos(this.mCamera.mouseWCY());       
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
        this.mTiny1.incWidth(1);
        //this.mTiny2.incWidth(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.W)) {
        this.mTiny1.incWidth(-1);
        //this.mTiny2.incWidth(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.A)) {
        this.mTiny1.incyAcceleration(1);
        //this.mTiny2.incyAcceleration(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.S)) {
        this.mTiny1.incyAcceleration(-1);
        //this.mTiny2.incyAcceleration(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Z)) {
        this.mTiny1.incLife(1);
        //this.mTiny2.incLife(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.X)) {
        this.mTiny1.incLife(-1);
        //this.mTiny2.incLife(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.E)) {
        this.mTiny1.incxVelocity(1);
        //this.mTiny2.incxVelocity(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
        this.mTiny1.incxVelocity(-1);
        //this.mTiny2.incxVelocity(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.D)) {
        this.mTiny1.incyVelocity(1);
        //this.mTiny2.incyVelocity(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.F)) {
        this.mTiny1.incyVelocity(-1);
        //this.mTiny2.incyVelocity(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.C)) {
        this.mTiny1.incFlicker(1);
        //this.mTiny2.incFlicker(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.V)) {
        this.mTiny1.incFlicker(-1);
        //this.mTiny2.incFlicker(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.T)) {
        this.mTiny1.incIntensity(1);
        //this.mTiny2.incIntensity(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Y)) {
        this.mTiny1.incIntensity(-1);
        //this.mTiny2.incIntensity(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.G)) {
        this.mTiny1.incxAcceleration(1);
        //this.mTiny2.incxAcceleration(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.H)) {
        this.mTiny1.incxAcceleration(-1);
        //this.mTiny2.incxAcceleration(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.B)) {
        this.mTiny1.incParticleSize(1);
        //this.mTiny2.incParticleSize(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.N)) {
        this.mTiny1.incParticleSize(-1);
        //this.mTiny2.incParticleSize(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.U)) {
        this.mTiny1.incyOffset(1);
        //this.mTiny2.incyOffset(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.I)) {
        this.mTiny1.incyOffset(-1);
        //this.mTiny2.incyOffset(-1);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.M)){
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Q)) {
            this.mTiny1.incWidth(1);
            //this.mTiny2.incWidth(1);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
            this.mTiny1.incWidth(-1);
            //this.mTiny2.incWidth(-1);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
            this.mTiny1.incyAcceleration(1);
            //this.mTiny2.incyAcceleration(1);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
            this.mTiny1.incyAcceleration(-1);
            //this.mTiny2.incyAcceleration(-1);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Z)) {
            this.mTiny1.incLife(1);
            //this.mTiny2.incLife(1);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.X)) {
            this.mTiny1.incLife(-1);
            //this.mTiny2.incLife(-1);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.E)) {
            this.mTiny1.incxVelocity(1);
            //this.mTiny2.incxVelocity(1);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.R)) {
            this.mTiny1.incxVelocity(-1);
            //this.mTiny2.incxVelocity(-1);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
            this.mTiny1.incyVelocity(1);
            //this.mTiny2.incyVelocity(1);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.F)) {
            this.mTiny1.incyVelocity(-1);
            //this.mTiny2.incyVelocity(-1);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.C)) {
            this.mTiny1.incFlicker(1);
            //this.mTiny2.incFlicker(1);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.V)) {
            this.mTiny1.incFlicker(-1);
            //this.mTiny2.incFlicker(-1);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.T)) {
            this.mTiny1.incIntensity(1);
            //this.mTiny2.incIntensity(1);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Y)) {
            this.mTiny1.incIntensity(-1);
            //this.mTiny2.incIntensity(-1);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.G)) {
            this.mTiny1.incxAcceleration(1);
            //this.mTiny2.incxAcceleration(1);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.H)) {
            this.mTiny1.incxAcceleration(-1);
            //this.mTiny2.incxAcceleration(-1);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.B)) {
            this.mTiny1.incParticleSize(1);
            //this.mTiny2.incParticleSize(1);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.N)) {
            this.mTiny1.incParticleSize(-1);
            //this.mTiny2.incParticleSize(-1);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.U)) {
            this.mTiny1.incyOffset(1);
            //this.mTiny2.incyOffset(1);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.I)) {
            this.mTiny1.incyOffset(-1);
            //this.mTiny2.incyOffset(-1);
        }
    }
    if (gEngine.Input.isButtonPressed(0)){
        if (this.mCamera.isMouseInViewport()) {
            this.createXParticle(this.mCamera.mouseWCX(), this.mCamera.mouseWCY());
        }
    }    
    
    this.updateValue();
    this.MainMenuButton.update();
    this.backButton.update();
    
    this.driftParticles();    
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
    
    var p = new ParticleGameObject("assets/ParticleSystem/shock2.png", 50,40, 10);        
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

SFXDemo.prototype.driftParticles = function(){    
    var pSet = this.mTiny3.getSet().mSet;
    var setLength = pSet.length;    
    for (var i = 0; i < setLength; i++){
        var pGO = pSet[i];
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
    }
};

SFXDemo.prototype.updateValue = function(){
    document.getElementById("SEvalue1").innerHTML = this.mTiny1.getWidth();
    document.getElementById("SEvalue2").innerHTML = this.mTiny1.getyAcceleration();
    document.getElementById("SEvalue3").innerHTML = this.mTiny1.getLife();
    document.getElementById("SEvalue4").innerHTML = this.mTiny1.getxVelocity();
    document.getElementById("SEvalue5").innerHTML = this.mTiny1.getyVelocity();
    document.getElementById("SEvalue6").innerHTML = this.mTiny1.getFlicker();
    document.getElementById("SEvalue7").innerHTML = this.mTiny1.getIntensity();
    document.getElementById("SEvalue8").innerHTML = this.mTiny1.getxAcceleration();
    document.getElementById("SEvalue9").innerHTML = this.mTiny1.getParticleSize();
    document.getElementById("SEvalue10").innerHTML = this.mTiny1.getyOffset();
};

SFXDemo.prototype.backSelect = function(){
    this.LevelSelect="Back";
    gEngine.GameLoop.stop();
};

SFXDemo.prototype.mainSelect = function(){
    this.LevelSelect="Main";
    gEngine.GameLoop.stop();
};