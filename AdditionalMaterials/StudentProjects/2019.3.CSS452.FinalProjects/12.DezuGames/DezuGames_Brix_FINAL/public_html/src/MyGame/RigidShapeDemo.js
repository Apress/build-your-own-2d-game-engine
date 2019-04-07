/*
 * File: RigidShapeDemo.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function RigidShapeDemo() {
    this.kTargetTexture = "assets/RigidShape/target.png";
    this.kIce = "assets/RigidShape/Ice.png";
    this.kWood = "assets/RigidShape/Wood.png";
    this.kDirt = "assets/RigidShape/Dirt.png";
    this.kMud = "assets/RigidShape/Mud.png";
    this.kRock = "assets/RigidShape/Rock.png";
    this.kBouncy = "assets/RigidShape/Ball.png";
    this.kBall = "assets/RigidShape/SoccerBall.png";
    this.kWoodBall = "assets/RigidShape/WoodBall.png";
    this.kParticleTexture = "assets/RigidShape/DirtParticle.png";
    this.kBowlingBall = "assets/RigidShape/BowlingBall.png";
    this.kUIButton = "assets/UI/button.png";
    
    // The camera to view the scene
    this.mCamera = null;
    
    this.mArenaStatus = null;
    this.mLabels = null;
    
    this.world = null;
    this.backButton = null;
    
    this.mCurrentObj = 0;
    this.mTarget = null;
}
gEngine.Core.inheritPrototype(RigidShapeDemo, Scene);


RigidShapeDemo.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kTargetTexture);
    gEngine.Textures.loadTexture(this.kWood);
    gEngine.Textures.loadTexture(this.kDirt);
    gEngine.Textures.loadTexture(this.kIce);
    gEngine.Textures.loadTexture(this.kMud);
    gEngine.Textures.loadTexture(this.kRock);
    gEngine.Textures.loadTexture(this.kBouncy);
    gEngine.Textures.loadTexture(this.kBall);
    gEngine.Textures.loadTexture(this.kWoodBall);
    gEngine.Textures.loadTexture(this.kParticleTexture);
    gEngine.Textures.loadTexture(this.kBowlingBall);
    gEngine.Textures.loadTexture(this.kUIButton);
    document.getElementById("physics").style.display="block";
};

RigidShapeDemo.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kTargetTexture);
    gEngine.Textures.unloadTexture(this.kWood);
    gEngine.Textures.unloadTexture(this.kDirt);
    gEngine.Textures.unloadTexture(this.kIce);
    gEngine.Textures.unloadTexture(this.kMud);
    gEngine.Textures.unloadTexture(this.kRock);
    gEngine.Textures.unloadTexture(this.kBouncy);
    gEngine.Textures.unloadTexture(this.kBall);
    gEngine.Textures.unloadTexture(this.kWoodBall);
    gEngine.Textures.unloadTexture(this.kBowlingBall);
    gEngine.Textures.unloadTexture(this.kUIButton);
    document.getElementById("physics").style.display="none";
    gEngine.Core.startScene(new MyGame());
};

RigidShapeDemo.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        100,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    this.world = new GameObjectSet();
    var m;
    m = new Arena(-1.5,0,47,47*.75,.6,.01,1,2,this.kIce,false); 
    this.world.addToSet(m);
    m = new Arena(48.5,38.5,47,47*.75,.01,.1,0,5,this.kMud,true); 
    this.world.addToSet(m);
    m = new Arena(-1.5,38.5,47,47*.75,.8,.5,0,2,this.kWood,false); 
    this.world.addToSet(m);
    m = new Arena(48.5,0,47,47*.75,.3,.7,3,4,this.kDirt,false); 
    this.world.addToSet(m);
    
    //this.createBounds();
    var r = new TextureRenderable(this.kTargetTexture);
    this.mTarget = new GameObject(r);
    var xf = r.getXform();
    xf.setSize(3, 3);
    
    this.mFirstObject = 0;
    this.mCurrentObj = this.mFirstObject;
    
    this.mLabels=new GameObjectSet();
    var m;
    m = new FontRenderable("Ice");
    m.setColor([1, 1, 1, 1]);
    m.getXform().setPosition(20, 39);
    m.setTextHeight(2.5);
    this.mLabels.addToSet(m);
    
    m = new FontRenderable("Wood");
    m.setColor([1, 1, 1, 1]);
    m.getXform().setPosition(20, 77);
    m.setTextHeight(2.5);
    this.mLabels.addToSet(m);
    
    m = new FontRenderable("Dirt");
    m.setColor([1, 1, 1, 1]);
    m.getXform().setPosition(70, 39);
    m.setTextHeight(2.5);
    this.mLabels.addToSet(m);
    
    m = new FontRenderable("Mud");
    m.setColor([1, 1, 1, 1]);
    m.getXform().setPosition(70, 77);
    m.setTextHeight(2.5);
    this.mLabels.addToSet(m);
    
    this.mArenaStatus = new FontRenderable("");
    this.mArenaStatus.setColor([0, 0, 0, 1]);
    this.mArenaStatus.getXform().setPosition(5, 42);
    this.mArenaStatus.setTextHeight(2.5);
    
    this.backButton = new UIButton(this.kUIButton,this.backSelect,this,[400,580],[160,40],"Go Back",4,[1,1,1,1],[1,1,1,1]);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
RigidShapeDemo.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    
    //this.mAllObjs.draw(this.mCamera);
    
    // for now draw these ...
    /*for (var i = 0; i<this.mCollisionInfos.length; i++) 
        this.mCollisionInfos[i].draw(this.mCamera); */
    this.mCollisionInfos = []; 
    
    this.world.draw(this.mCamera);
    this.mTarget.draw(this.mCamera);
    this.mArenaStatus.draw(this.mCamera);
    this.mLabels.draw(this.mCamera);
    this.backButton.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
RigidShapeDemo.kBoundDelta = 0.1;
RigidShapeDemo.prototype.update = function () {
    var area = this.world.getObjectAt(this.mCurrentObj);
    var pos = area.getPos();
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Left)) {
        area.cycleFoward();
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Right)) {
        area.cycleBackward();
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.C)) {
        area.incRestitution(-.01);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.V)) {
        area.incRestitution(.01);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.B)) {
        area.incFriction(-.01);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.N)) {
        area.incFriction(.01);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.H)) {
        area.radomizeVelocity();
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.U)) {
        area.createBouncy(pos[0]+15,pos[1]+20,2);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.J)) {
        area.createBall(pos[0]+15,pos[1]+20,4);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.I)) {
        area.createRock(pos[0]+15,pos[1]+20,5);
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.K)) {
        area.createWood(pos[0]+15,pos[1]+20,4);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.O)) {
        area.createIce(pos[0]+15,pos[1]+20,5);
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.L)) {
        area.createBowlingBall(pos[0]+15,pos[1]+20,3);
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Z)) {
        area.lightOff();
        this.mCurrentObj -= 1;
        if (this.mCurrentObj < this.mFirstObject)
            this.mCurrentObj = this.world.size() - 1;
    }            
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.X)) {
        area.lightOff();
        this.mCurrentObj += 1;
        if (this.mCurrentObj >= this.world.size())
            this.mCurrentObj = this.mFirstObject;
    }
    this.world.getObjectAt(this.mCurrentObj).lightOn();
    this.world.update();
    var obj = area.getObject();
    area.physicsReport();
    obj.keyControl();

    var p = obj.getXform().getPosition();
    this.mTarget.getXform().setPosition(p[0], p[1]);
    this.backButton.update();
    this.mArenaStatus.setText(area.getCurrentState());
};

RigidShapeDemo.prototype.backSelect = function(){
    gEngine.GameLoop.stop();
};