/*
 * 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2, Reticle,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObj, mGlobalSpeed ect */
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict"

Level2.prototype.SpawnWorld1 = function () {
    this.Spawn1Init();

    //1 = regular wall
    //r = right slanted wall
    //t = left slanted wall
    //2 = destructable wall
    //3 = small closing door  
    //4 = large closing door   
    //5 = lazers! or falling rocks, TBD
    //6 = FallingRockSpawner
                        //Start                                //450 units     
    var Row0 = "S111111111111111111111111111111111111111111111E";
    var Row1 = "S000000000000000000000000000000000000000000000E";
    var Row2 = "S000000000000000000000000000000000000000000000E";
    var Row3 = "S000000000000000000000000000000000000000000000E";
    var Row4 = "S000000000000000000000000000000000000000000000E";
    var Row5 = "S000000444444444444444440004444444444444444400E";
    var Row6 = "S000000000000000000000000000000000000000000000E";
    var Row7 = "S000000000000000000000000000000000000000000000E";
    var Row8 = "S000000000000000000000000000000000000000000000E";
    var Row9 = "S000000000000000000000000000000000000000000000E";
    var Ro10 = "S111111111111111111111111111111111111111111111E"; 
    this.mWorldArray[0] = Row0.split("");
    this.mWorldArray[1] = Row1.split("");
    this.mWorldArray[2] = Row2.split("");
    this.mWorldArray[3] = Row3.split("");
    this.mWorldArray[4] = Row4.split("");
    this.mWorldArray[5] = Row5.split("");
    this.mWorldArray[6] = Row6.split("");
    this.mWorldArray[7] = Row7.split("");
    this.mWorldArray[8] = Row8.split("");
    this.mWorldArray[9] = Row9.split("");
    this.mWorldArray[10] = Ro10.split("");
    //
    this.SpawnWorldFromArray();   
    this.SetLights();
};

Level2.prototype.SetLights = function () {
      for (var i = 0; i < 4; i++) {
        this.mHero.getRenderable().addLight(this.mGlobalLightSet.getLightAt(i));
        this.mBg.getRenderable().addLight(this.mGlobalLightSet.getLightAt(i));
        for (var j = 0; j < this.mWorldObjects.size(); j++){
            var obj = this.mWorldObjects.getObjectAt(j);
            obj.getRenderable().addLight(this.mGlobalLightSet.getLightAt(i));
        }
        for (var j = 0; j < this.mBreakableSet.size(); j++){
            var obj = this.mBreakableSet.getObjectAt(j);
            obj.getRenderable().addLight(this.mGlobalLightSet.getLightAt(i));
        }
        //for (var j = 0; j < this.mDoorObjects.size(); j++){
        //    var obj = this.mDoorObjects.getObjectAt(j);
        //    obj.getRenderable().addLight(this.mGlobalLightSet.getLightAt(i));
        //}
    }  
};

Level2.prototype.Spawn1Init = function () {
  this.mCamera = new Camera(
        vec2.fromValues(30, 50), // position of the camera
        200,                     // width of camera
        [0, 0, mScreenX, mScreenY]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
        
    //Background
    var bgR = new IllumRenderable(this.kBG, this.kBGNormal);
    bgR.setElementPixelPositions(0, 1024, 0, 1024);
    bgR.getXform().setSize(200,180);
    bgR.getXform().setPosition(30,20);
    bgR.getMaterial().setSpecular([1,0,0,1]);
    var i;
    for (i = 0; i < 4; i++) {
        bgR.addLight(this.mGlobalLightSet.getLightAt(i));   // all the lights
    }
    this.mBg = new GameObject(bgR);
    
    this.mHero = new Hero(this.kShipSprite);
    this.mReticle = new Reticle(this.kReticleSprite);  
    this.mWorldObjects = new GameObjectSet();
    this.mDoorObjects = new GameObjectSet();
    this.mMissileSet = new GameObjectSet();
    this.mTargetSet = new GameObjectSet();
    this.mBreakableSet = new GameObjectSet();  
       this.mAllFire = new GameObjectSet();
       this.mStartEndLine = new GameObjectSet();
};