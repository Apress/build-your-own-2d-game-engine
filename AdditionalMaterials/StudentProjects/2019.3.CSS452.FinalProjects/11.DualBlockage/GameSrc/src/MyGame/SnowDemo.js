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

function SnowDemo() {
    this.kPlatformTexture = "assets/Snow/platform.png";
    this.kUIButton = "assets/UI/button.png";
    
    // The camera to view the scene
    this.mCamera = null;
    this.LevelSelect = null;

    this.mPlatforms = null;
    this.mSnow = null;
    
    this.backButton = null;
    this.MainMenuButton = null;
}
gEngine.Core.inheritPrototype(SnowDemo, Scene);


SnowDemo.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kPlatformTexture);
    gEngine.Textures.loadTexture(this.kUIButton);
    document.getElementById("particle").style.display="block";
};

SnowDemo.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kPlatformTexture);
    gEngine.Textures.unloadTexture(this.kUIButton);
    document.getElementById("particle").style.display="none";
    if(this.LevelSelect==="Back")
        gEngine.Core.startScene(new ParticleLevel());
    else if(this.LevelSelect==="Main")
        gEngine.Core.startScene(new MyGame());
};

SnowDemo.prototype.initialize = function () {
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
    
    this.createBounds();
    this.mSnow=new Snow(50,80,50,5,200,0,0,0,1,0,0.5,0);
    
    this.backButton = new UIButton(this.kUIButton,this.backSelect,this,[80,580],[160,40],"Go Back",4,[1,1,1,1],[1,1,1,1]);
    this.MainMenuButton = new UIButton(this.kUIButton,this.mainSelect,this,[700,580],[200,40],"Main Menu",4,[1,1,1,1],[1,1,1,1]);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
SnowDemo.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    
    // for now draw these ...
    /*for (var i = 0; i<this.mCollisionInfos.length; i++) 
        this.mCollisionInfos[i].draw(this.mCamera); */
    this.mCollisionInfos = []; 
    
    this.mSnow.draw(this.mCamera);
    this.mPlatforms.draw(this.mCamera);
    this.MainMenuButton.draw(this.mCamera);
    this.backButton.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
//SnowDemo.kBoundDelta = 0.1;
SnowDemo.prototype.update = function () {
    gEngine.ParticleSystem.update(this.mSnow);
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
        this.mSnow.incWidth(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.W)) {
        this.mSnow.incWidth(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.A)) {
        this.mSnow.incyAcceleration(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.S)) {
        this.mSnow.incyAcceleration(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Z)) {
        this.mSnow.incLife(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.X)) {
        this.mSnow.incLife(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.E)) {
        this.mSnow.incxVelocity(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
        this.mSnow.incxVelocity(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.D)) {
        this.mSnow.incyVelocity(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.F)) {
        this.mSnow.incyVelocity(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.C)) {
        this.mSnow.incFlicker(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.V)) {
        this.mSnow.incFlicker(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.T)) {
        this.mSnow.incIntensity(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Y)) {
        this.mSnow.incIntensity(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.G)) {
        this.mSnow.incxAcceleration(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.H)) {
        this.mSnow.incxAcceleration(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.B)) {
        this.mSnow.incParticleSize(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.N)) {
        this.mSnow.incParticleSize(-1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.U)) {
        this.mSnow.incyOffset(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.I)) {
        this.mSnow.incyOffset(-1);
    }
    
    this.updateValue();
    this.MainMenuButton.update();
    this.backButton.update();
};

SnowDemo.prototype.updateValue = function(){
    document.getElementById("value1").innerHTML = this.mSnow.getWidth();
    document.getElementById("value2").innerHTML = this.mSnow.getyAcceleration();
    document.getElementById("value3").innerHTML = this.mSnow.getLife();
    document.getElementById("value4").innerHTML = this.mSnow.getxVelocity();
    document.getElementById("value5").innerHTML = this.mSnow.getyVelocity();
    document.getElementById("value6").innerHTML = this.mSnow.getFlicker();
    document.getElementById("value7").innerHTML = this.mSnow.getIntensity();
    document.getElementById("value8").innerHTML = this.mSnow.getxAcceleration();
    document.getElementById("value9").innerHTML = this.mSnow.getParticleSize();
    document.getElementById("value10").innerHTML = this.mSnow.getyOffset();
};

SnowDemo.prototype.createBounds = function() {
    var x = 15, w = 30, y = 4;
    for (x = 15; x < 120; x+=30) 
        this.platformAt(x, y, w, 0);
};

SnowDemo.prototype.platformAt = function (x, y, w, rot) {
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

SnowDemo.prototype.backSelect = function(){
    this.LevelSelect="Back";
    gEngine.GameLoop.stop();
};

SnowDemo.prototype.mainSelect = function(){
    this.LevelSelect="Main";
    gEngine.GameLoop.stop();
};