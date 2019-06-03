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
    this.kTargetTexture = "assets/Smoke/target.png";
    // The camera to view the scene
    this.mCamera = null;
    this.LevelSelect = null;
    
    this.mAllObjs = null;
    this.mPlatforms = null;
    this.mCurrentObj = 0;
    
    this.mAllDust = null;    
    this.mDust1 = null;
    this.mDust2 = null;
    this.mDust3 = null;
    
    this.mXParticles = null;
    
    this.mTarget = null;
    this.backButton = null;
    this.MainMenuButton = null;
    
    this.mHolder = [25,25];
    this.mAngle = 0;
    this.mTimer = 90;
    this.mDrawRigidShape = true;
    this.r = null;
    
}
gEngine.Core.inheritPrototype(DustDemo, Scene);

DustDemo.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kUIButton);
    gEngine.Textures.loadTexture(this.kTargetTexture);
    document.getElementById("dust").style.display="block";
};

DustDemo.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kUIButton);
    gEngine.Textures.unloadTexture(this.kTargetTexture);
    document.getElementById("dust").style.display="none";
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
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    this.mFirstObject = 0;
    this.mCurrentObj = this.mFirstObject;
    
    this.mAllDust = new GameObjectSet();
    
    var dustParams = new DustParams(50,40,50,-.5,300,0,0,1,1,0,1,40);
    this.mDust1 = new Dust(dustParams);
    this.mAllDust.addToSet(this.mDust1);
    
    dustParams = new DustParams(1,1,50,5,150,0,0,1,4,5,1,10);
    this.mDust2 = new Dust(dustParams);
    this.mAllDust.addToSet(this.mDust2);
    
    this.mXParticles = new ParticleGameObjectSet();  
    
    var r = new TextureRenderable(this.kTargetTexture);
    this.mTarget = new GameObject(r);
    var xf = r.getXform();
    xf.setZPos(2);
    xf.setSize(3, 3);
    this.backButton = new UIButton(this.backSelect,this,[80,580],[160,40],"Go Back",4);
    this.MainMenuButton = new UIButton(this.mainSelect,this,[700,580],[200,40],"Main Menu",4);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
DustDemo.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0, 0, 0, 1.0]); // clear to med gray
    this.mCamera.setupViewProjection();
       
    this.mAllDust.draw(this.mCamera);
    this.mXParticles.draw(this.mCamera);
    this.mTarget.draw(this.mCamera);
    this.MainMenuButton.draw(this.mCamera);
    this.backButton.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
DustDemo.prototype.update = function () {
    gEngine.ParticleSystem.update(this.mAllDust);
    gEngine.ParticleSystem.update(this.mXParticles);
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Left)) {
        this.mCurrentObj -= 1;
        if (this.mCurrentObj < this.mFirstObject)
            this.mCurrentObj = this.mAllDust.size() - 1;
    }            
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Right)) {
        this.mCurrentObj += 1;
        if (this.mCurrentObj >= this.mAllDust.size())
            this.mCurrentObj = this.mFirstObject;
    }

    var obj = this.mAllDust.getObjectAt(this.mCurrentObj);
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
        obj.incWidth(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.W)) {
        obj.incWidth(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.A)) {
        obj.incyAcceleration(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.S)) {
        obj.incyAcceleration(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Z)) {
        obj.incLife(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.X)) {
        obj.incLife(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.E)) {
        obj.incxVelocity(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
        obj.incxVelocity(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.D)) {
        obj.incyVelocity(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.F)) {
        obj.incyVelocity(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.C)) {
        obj.incFlicker(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.V)) {
        obj.incFlicker(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.T)) {
        obj.incIntensity(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Y)) {
        obj.incIntensity(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.G)) {
        obj.incxAcceleration(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.H)) {
        obj.incxAcceleration(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.B)) {
        obj.incParticleSize(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.N)) {
        obj.incParticleSize(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.U)) {
        obj.incyOffset(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.I)) {
        obj.incyOffset(-1);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.M)){
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Q)) {
            obj.incWidth(1);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
            obj.incWidth(-1);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
            obj.incyAcceleration(1);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
            obj.incyAcceleration(-1);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Z)) {
            obj.incLife(1);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.X)) {
            obj.incLife(-1);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.E)) {
            obj.incxVelocity(1);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.R)) {
            obj.incxVelocity(-1);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
            obj.incyVelocity(1);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.F)) {
            obj.incyVelocity(-1);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.C)) {
            obj.incFlicker(1);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.V)) {
            obj.incFlicker(-1);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.T)) {
            obj.incIntensity(1);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Y)) {
            obj.incIntensity(-1);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.G)) {
            obj.incxAcceleration(1);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.H)) {
            obj.incxAcceleration(-1);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.B)) {
            obj.incParticleSize(1);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.N)) {
            obj.incParticleSize(-1);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.U)) {
            obj.incyOffset(1);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.I)) {
            obj.incyOffset(-1);
        }
    }
    var p = obj.getPos();
    p[0] += 25;
    p[1] += 20;
    this.mTarget.getXform().setPosition(p[0], p[1]);
    this.updateValue(obj);
    this.MainMenuButton.update();
    this.backButton.update();
    this.updateHolder();
    this.updateClickEffect();
    this.killDust();
};


DustDemo.prototype.killDust = function(){
    var pSet = this.mDust1.getSet().mSet;
    var setLength = pSet.length;    
    for (var i = 0; i < setLength; i++){
        var pPos = pSet[i].getParticle().getPosition();
        if(pPos[0] > 100 || pPos[0] < 50){
            pSet[i].mCyclesToLive = 0;
        }
        if(pPos[1] > 80 || pPos[1] < 41){
            pSet[i].mCyclesToLive = 0;
        }
    }
    var pSet = this.mDust2.getSet().mSet;
    var setLength = pSet.length;    
    for (var i = 0; i < setLength; i++){
        var pPos = pSet[i].getParticle().getPosition();
        if(pPos[0] > 50 || pPos[0] < 0){
            pSet[i].mCyclesToLive = 0;
        }
        if(pPos[1] > 39 || pPos[1] < 0){
            pSet[i].mCyclesToLive = 0;
        }
    }
};

DustDemo.prototype.updateHolder = function(){
    this.mHolder[0] = 25 + 10*Math.cos(this.mAngle);
    this.mHolder[1] = 60 + 10*Math.sin(this.mAngle);
    this.mAngle += .05;
    if(this.mAngle > 360){
        this.mAngle = 0;
    }
    this.createDParticle(this.mHolder[0],this.mHolder[1]);
};

DustDemo.prototype.updateClickEffect = function(){
    if(this.mTimer === 0){
        this.createXParticle(75,20);
        this.createDParticle(75,20);
        this.mTimer = 90;
    }else{
        this.mTimer--;
    }
};

DustDemo.prototype.createDParticle = function(atX, atY){
    if(Math.floor(Math.random()*2)){
        var pTexture = "assets/ParticleSystem/dust.png";
    }else{
        var pTexture = "assets/ParticleSystem/dust2.png";
    }      
    var p = new ParticleGameObject(pTexture,atX,atY,90);
    p.getRenderable().setColor([1,1,1,1]);
    p.setFinalColor([0, 0, 0, 1]);
    var r = 10 + Math.random() * 2.5;
    p.getXform().setSize(r, r);    
    p.getXform().incRotationByDegree(Math.random()*360);

    p.getParticle().setVelocity([1, 1]);
    p.getParticle().setAcceleration([0,0]);
    
    p.setSizeDelta(1.0+Math.random()*0.01);
    this.mXParticles.addToSet(p);
            
};

DustDemo.prototype.createXParticle = function(atX, atY){
    var p = new ParticleGameObject("assets/ParticleSystem/shock.png", atX, atY, 12);
    p.getRenderable().setColor([1, 1, 1, .1]);
    
    // size of the particle
    var r = 5 + Math.random() * 2.5;
    p.getXform().setSize(r, r);
    p.getXform().incRotationByDegree(Math.random()*360);        
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
};

DustDemo.prototype.updateValue = function(obj){
    document.getElementById("dvalue1").innerHTML = obj.getWidth();
    document.getElementById("dvalue2").innerHTML = obj.getyAcceleration();
    document.getElementById("dvalue3").innerHTML = obj.getLife();
    document.getElementById("dvalue4").innerHTML = obj.getxVelocity();
    document.getElementById("dvalue5").innerHTML = obj.getyVelocity();
    document.getElementById("dvalue6").innerHTML = obj.getFlicker();
    document.getElementById("dvalue7").innerHTML = obj.getIntensity();
    document.getElementById("dvalue8").innerHTML = obj.getxAcceleration();
    document.getElementById("dvalue9").innerHTML = obj.getParticleSize();
    document.getElementById("dvalue10").innerHTML = obj.getyOffset();
};

DustDemo.prototype.backSelect = function(){
    this.LevelSelect="Back";
    gEngine.GameLoop.stop();
};

DustDemo.prototype.mainSelect = function(){
    this.LevelSelect="Main";
    gEngine.GameLoop.stop();
};