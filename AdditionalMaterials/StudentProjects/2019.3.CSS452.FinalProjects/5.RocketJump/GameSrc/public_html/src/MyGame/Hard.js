/*
 * File: Level1.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Hard() {
    this.kSceneFile = "assets/levels/hard.json";
    
    this.kWood = "assets/RigidShape/Wood.png";
    this.kUIButton = "assets/UI/button.png";   
    this.kRocket = "assets/RigidShape/rocket.png";
    this.kPerson = "assets/RigidShape/person6.png";
    this.kLauncher = "assets/RigidShape/launcher.png";
    this.kExplosion = "assets/RigidShape/explosion.png";
    this.kFlag = "assets/RigidShape/Flag.png";
    this.kSpike = "assets/RigidShape/Spike.png";
    
    this.kBg = "assets/RigidShape/woodbg.jpg";
    this.kBgNormal = "assets/RigidShape/woodbg_normal.png";
    this.kPersonNormal = "assets/RigidShape/person6_normal.png";
    this.kExplosionNormal = "assets/RigidShape/explosion_normal.png";
    this.kRocketNormal = "assets/RigidShape/rocket_normal.png";

    // The camera to view the scene
    this.mCamera = null;
    this.mArenaStatus = null;
    this.world = null;
    this.backButton = null;
    this.mCurrentObj = 0;
    
    this.shakeEnabled = null;
    this.menuEnabled = null;
    
    this.deaths = 0;
    this.timeCompleted = null;
}
gEngine.Core.inheritPrototype(Hard, Scene);


Hard.prototype.loadScene = function () {
    gEngine.TextFileLoader.loadTextFile(this.kSceneFile, gEngine.TextFileLoader.eTextFileType.eTextFile);
    
    gEngine.Textures.loadTexture(this.kExplosion);
    gEngine.Textures.loadTexture(this.kWood);
    gEngine.Textures.loadTexture(this.kPerson);
    gEngine.Textures.loadTexture(this.kRocket);
    gEngine.Textures.loadTexture(this.kLauncher);
    gEngine.Textures.loadTexture(this.kUIButton);
    gEngine.Textures.loadTexture(this.kFlag);
    gEngine.Textures.loadTexture(this.kSpike);
    
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kBgNormal);
    gEngine.Textures.loadTexture(this.kPersonNormal);
    gEngine.Textures.loadTexture(this.kExplosionNormal);
    gEngine.Textures.loadTexture(this.kRocketNormal);
    //document.getElementById("physics").style.display="block";
};

Hard.prototype.unloadScene = function () {
    gEngine.TextFileLoader.unloadTextFile(this.kSceneFile);
    
    gEngine.Textures.unloadTexture(this.kExplosion);
    gEngine.Textures.unloadTexture(this.kWood);
    gEngine.Textures.unloadTexture(this.kLauncher);
    gEngine.Textures.unloadTexture(this.kRocket);
    gEngine.Textures.unloadTexture(this.kPerson);
    gEngine.Textures.unloadTexture(this.kUIButton);
    gEngine.Textures.unloadTexture(this.kFlag);
    gEngine.Textures.unloadTexture(this.kSpike);
    
    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kBgNormal);
    gEngine.Textures.unloadTexture(this.kPersonNormal);
    gEngine.Textures.unloadTexture(this.kExplosionNormal);
    gEngine.Textures.unloadTexture(this.kRocketNormal);
    //document.getElementById("physics").style.display="none";
    if(this.LevelSelect==="Win"){
        gEngine.Core.startScene(new WinScreen(this.timeCompleted/1000, this.deaths, "Hard Level"));
        //to precision
    }else{
        gEngine.Core.startScene(new MainMenu());
    }
};

Hard.prototype.initialize = function () {
    var jsonString = gEngine.ResourceMap.retrieveAsset(this.kSceneFile);
    var sceneInfo = JSON.parse(jsonString);
    var level = new ParseJSON(sceneInfo, this.kWood);
    this.shakeEnabled = true;
    this.menuEnabled = false;
    this.mCamera = level.camera();

    gEngine.DefaultResources.setGlobalAmbientIntensity(2.5);
    this.world = new GameObjectSet();
    var m;
    m = level.arena();
    this.world.addToSet(m);
   
    this.mArenaStatus = new FontRenderable("");
    this.mArenaStatus.setColor([0, 0, 0, 1]);
    this.mArenaStatus.getXform().setPosition(5, 42);
    this.mArenaStatus.setTextHeight(2.5);
    
    this.backButton = new UIButton(this.kUIButton,this.backSelect,this,[400,400],[160*1.5,40*1.5],"Return to Menu",6,[1,1,1,1],[1,1,1,1]);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
Hard.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();

    this.world.draw(this.mCamera);
    if(this.menuEnabled){
        this.backButton.draw(this.mCamera);
    }
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
Hard.kBoundDelta = 0.1;
Hard.prototype.update = function () {
    var area = this.world.getObjectAt(this.mCurrentObj);
    this.mCamera.update();
    this.world.getObjectAt(this.mCurrentObj).lightOn();
    this.world.update();
    var obj = area.getObject();
    area.physicsReport();
    obj.keyControl();

    this.backButton.update();
    this.mArenaStatus.setText(area.getCurrentState());
    
    // Objective flag
    if(this.world.getObjectAt(this.mCurrentObj).isGoalReached()){
        this.LevelSelect="Win";
        this.deaths = this.world.getObjectAt(this.mCurrentObj).totalDeaths();
        this.timeCompleted = this.world.getObjectAt(this.mCurrentObj).timeCompletion();
        gEngine.GameLoop.stop();
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Esc)) {
        if(this.menuEnabled ){
            this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1.0]);
            this.menuEnabled = false;
        }else{
            this.mCamera.setBackgroundColor([1,1,1,1]);
            this.menuEnabled = true;
        }
    }
    
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        this.world.getObjectAt(this.mCurrentObj).fireRocket();
    }
    if(this.world.getObjectAt(this.mCurrentObj).isCamShake() && this.shakeEnabled){
        this.mCamera.shake(-.5, -.5, 20, 15);
        this.world.getObjectAt(this.mCurrentObj).shakeComplete();
    }
    
};

Hard.prototype.backSelect = function(){
    if(this.menuEnabled){
        gEngine.GameLoop.stop();
    }
};