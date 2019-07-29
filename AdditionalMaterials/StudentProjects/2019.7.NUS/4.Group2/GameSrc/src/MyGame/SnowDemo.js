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
    this.kTree1Texture = "assets/Snow/tree1.png";
    this.kTree2Texture = "assets/Snow/tree2.png";
    this.kTree3Texture = "assets/Snow/tree3.png";
    this.kUIButton = "assets/UI/button.png";
    // The camera to view the scene
    this.mCamera = null;
    this.LevelSelect = null;
    this.mAllObjs = null;
    
    this.mPlatforms = null;
    this.mTrees = null;
    this.mSnow = null;
    this.backButton = null;
    this.MainMenuButton = null;
    this.mDrawRigidShape = true;

}
gEngine.Core.inheritPrototype(SnowDemo, Scene);


SnowDemo.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kPlatformTexture);
    gEngine.Textures.loadTexture(this.kTree1Texture);
    gEngine.Textures.loadTexture(this.kTree2Texture);
    gEngine.Textures.loadTexture(this.kTree3Texture);
    gEngine.Textures.loadTexture(this.kUIButton);

    document.getElementById("particle").style.display="block";
};

SnowDemo.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kPlatformTexture);
    gEngine.Textures.unloadTexture(this.kUIButton);
    gEngine.Textures.unloadTexture(this.kTree1Texture);
    gEngine.Textures.unloadTexture(this.kTree2Texture);
    gEngine.Textures.unloadTexture(this.kTree3Texture);
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
    this.mCamera.setBackgroundColor([0.2, 0.2, 0.2, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    this.mPlatforms = new GameObjectSet();
    this.mTrees = new GameObjectSet();
    this.createBounds();
    
    var tree = new TextureRenderable(this.kTree1Texture);
    var xf = tree.getXform(); 
    xf.setSize(20, 20);
    xf.setPosition(20, 15);
    xf.setZPos(0);
    this.mTrees.addToSet(tree);
    
    var tree2 = new TextureRenderable(this.kTree2Texture);
    var xf2 = tree2.getXform(); 
    xf2.setSize(30, 30);
    xf2.setPosition(50, 20);
    xf2.setZPos(2);
    this.mTrees.addToSet(tree2);
    
    var tree3 = new TextureRenderable(this.kTree3Texture);
    var xf3 = tree3.getXform(); 
    xf3.setSize(40, 40);
    xf3.setPosition(85, 25);
    xf3.setZPos(4);
    this.mTrees.addToSet(tree3);
        
    var snowParams = new SnowParams();
    this.mSnow = new Snow(snowParams);
    
    this.mAllObjs = new GameObjectSet();
    this.mAllObjs.addToSet(this.mTarget);
    this.backButton = new UIButton(this.backSelect,this,[80,580],[160,40],"Go Back",4);
    this.MainMenuButton = new UIButton(this.mainSelect,this,[700,580],[200,40],"Main Menu",4);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
SnowDemo.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.2, 0.2, 0.2, 1.0]); // clear to med gray

    this.mCamera.setupViewProjection();
    
    // for now draw these ...
    /*for (var i = 0; i<this.mCollisionInfos.length; i++) 
        this.mCollisionInfos[i].draw(this.mCamera); */
    this.mCollisionInfos = []; 
    
    this.mSnow.draw(this.mCamera);
    this.mPlatforms.draw(this.mCamera);
    this.mTrees.draw(this.mCamera);
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
    document.getElementById("pvalue1").innerHTML = this.mSnow.getWidth();
    document.getElementById("pvalue2").innerHTML = this.mSnow.getyAcceleration();
    document.getElementById("pvalue3").innerHTML = this.mSnow.getLife();
    document.getElementById("pvalue4").innerHTML = this.mSnow.getxVelocity();
    document.getElementById("pvalue5").innerHTML = this.mSnow.getyVelocity();
    document.getElementById("pvalue6").innerHTML = this.mSnow.getFlicker();
    document.getElementById("pvalue7").innerHTML = this.mSnow.getIntensity();
    document.getElementById("pvalue8").innerHTML = this.mSnow.getxAcceleration();
    document.getElementById("pvalue9").innerHTML = this.mSnow.getParticleSize();
    document.getElementById("pvalue10").innerHTML = this.mSnow.getyOffset();
};

SnowDemo.prototype.createBounds = function() {
    var x = 15, w = 30, y = 4;
    for (x = 15; x < 120; x+=30) 
        this.platformAt(x, y, w, 0);
};

SnowDemo.prototype.platformAt = function (x, y, w, rot) {
    var h = w / 8;
    var p = new TextureRenderable(this.kPlatformTexture);
    p.setColor([0,0,0,1]);
    var xf = p.getXform();

    var g = new GameObject(p);
    var r = new RigidRectangle(xf, w, h);
    g.setRigidBody(r);
    
    r.setMass(0);
    xf.setSize(w, h);
    xf.setPosition(x, y);
    xf.setZPos(2);
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