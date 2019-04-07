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

function FireDemo() {
    this.kPlatformTexture = "assets/Fire/platform.png";
    this.kTargetTexture = "assets/Fire/target.png";
    this.kTorch = "assets/Fire/torch3.png";
    this.kBush = "assets/Fire/bush.png";
    this.kPillar = "assets/Fire/pillar.png";
    this.kForest = "assets/Fire/forest.png";
    this.kUIButton = "assets/UI/button.png";
    
    // The camera to view the scene
    this.mCamera = null;

    this.mPlatforms = null;
    this.mAllFire = null;
    
    this.mCurrentObj = 0;
    this.mTarget = null;
    this.mTorch = null;
    this.mBush = null;
    this.mPillar = null;
    this.mForest = null;
    this.backButton = null;
    this.MainMenuButton = null;
    this.LevelSelect = null;
}
gEngine.Core.inheritPrototype(FireDemo, Scene);


FireDemo.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kPlatformTexture);
    gEngine.Textures.loadTexture(this.kTargetTexture);
    gEngine.Textures.loadTexture(this.kTorch);
    gEngine.Textures.loadTexture(this.kBush);
    gEngine.Textures.loadTexture(this.kPillar);
    gEngine.Textures.loadTexture(this.kForest);
    gEngine.Textures.loadTexture(this.kUIButton);
    document.getElementById("particle").style.display="block";
};

FireDemo.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kPlatformTexture);
    gEngine.Textures.unloadTexture(this.kTargetTexture);
    gEngine.Textures.unloadTexture(this.kTorch);
    gEngine.Textures.unloadTexture(this.kBush);
    gEngine.Textures.unloadTexture(this.kPillar);
    gEngine.Textures.unloadTexture(this.kForest);
    gEngine.Textures.unloadTexture(this.kUIButton);
    document.getElementById("particle").style.display="none";
    if(this.LevelSelect==="Back")
        gEngine.Core.startScene(new ParticleLevel());
    else if(this.LevelSelect==="Main")
        gEngine.Core.startScene(new MyGame());
};

FireDemo.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        100,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    this.mPlatforms = new GameObjectSet();
    this.mAllFire = new GameObjectSet();
    
    this.createBounds();
    this.mFirstObject = 0;
    this.mCurrentObj = this.mFirstObject;
    var m;
    m=new Fire(20,14,0,0,20,0,20,32,1,0,2.5,0);
    this.mAllFire.addToSet(m);
    m=new Fire(35,13,3,36,8,0,0,2,15,0,2.5,1);
    this.mAllFire.addToSet(m);
    m=new Fire(68,7,23,11,20,0,12,4,23,8,3.5,0);
    this.mAllFire.addToSet(m);
    m=new Fire(10,7,3,2,20,0,20,4,1,0,2.5,0);
    this.mAllFire.addToSet(m);
    var r = new TextureRenderable(this.kTargetTexture);
    this.mTarget = new GameObject(r);
    var xf = r.getXform();
    xf.setSize(3, 3);
    this.mTorch = new TextureRenderable(this.kTorch);
    this.mTorch.getXform().setPosition(20,10);
    this.mTorch.setColor([0, 0, 0, 0]);  // No tinting
    this.mTorch.getXform().setSize(4,8);
    this.mBush = new TextureRenderable(this.kBush);
    this.mBush.getXform().setPosition(10,8);
    this.mBush.setColor([0, 0, 0, 0]);  // No tinting
    this.mBush.getXform().setSize(6,6);
    this.mPillar = new TextureRenderable(this.kPillar);
    this.mPillar.getXform().setPosition(35,8);
    this.mPillar.setColor([0, 0, 0, 0]);  // No tinting
    this.mPillar.getXform().setSize(7,7);
    this.mForest = new TextureRenderable(this.kForest);
    this.mForest.getXform().setPosition(70,9);
    this.mForest.setColor([0, 0, 0, 0]);  // No tinting
    this.mForest.getXform().setSize(48,12);
    this.backButton = new UIButton(this.kUIButton,this.backSelect,this,[80,580],[160,40],"Go Back",4,[1,1,1,1],[1,1,1,1]);
    this.MainMenuButton = new UIButton(this.kUIButton,this.mainSelect,this,[700,580],[200,40],"Main Menu",4,[1,1,1,1],[1,1,1,1]);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
FireDemo.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    
    this.mTorch.draw(this.mCamera);
    this.mBush.draw(this.mCamera);
    this.mPillar.draw(this.mCamera);
    this.mForest.draw(this.mCamera);
    this.mTarget.draw(this.mCamera);
    this.mAllFire.draw(this.mCamera);
    this.mPlatforms.draw(this.mCamera);
    this.backButton.draw(this.mCamera);
    this.MainMenuButton.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
FireDemo.kBoundDelta = 0.1;
FireDemo.prototype.update = function () {
    gEngine.ParticleSystem.update(this.mAllFire);
    
    // create particles
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Left)) {
        this.mCurrentObj -= 1;
        if (this.mCurrentObj < this.mFirstObject)
            this.mCurrentObj = this.mAllFire.size() - 1;
    }            
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Right)) {
        this.mCurrentObj += 1;
        if (this.mCurrentObj >= this.mAllFire.size())
            this.mCurrentObj = this.mFirstObject;
    }

    var obj = this.mAllFire.getObjectAt(this.mCurrentObj);
    
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
    

    var p = obj.getPos();
    this.mTarget.getXform().setPosition(p[0], p[1]);
    this.updateValue(obj);
    this.backButton.update();
    this.MainMenuButton.update();
};

FireDemo.prototype.updateValue = function(obj){
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

FireDemo.prototype.createBounds = function() {
    var x = 15, w = 30, y = 4;
    for (x = 15; x < 120; x+=30) 
        this.platformAt(x, y, w, 0);
};

FireDemo.prototype.platformAt = function (x, y, w, rot) {
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

FireDemo.prototype.backSelect = function(){
    this.LevelSelect="Back";
    gEngine.GameLoop.stop();
};

FireDemo.prototype.mainSelect = function(){
    this.LevelSelect="Main";
    gEngine.GameLoop.stop();
};