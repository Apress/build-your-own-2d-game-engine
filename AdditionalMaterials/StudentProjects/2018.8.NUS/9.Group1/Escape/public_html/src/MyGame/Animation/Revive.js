"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Revive(nowMission) {
    // The camera to view the scene
    this.kRevive = "assets/Revive.png";
    this.kBack = "assets/back.png";
    this.mCamera = null;
    this.mMsg = null;
    this.mRevive = null;
    this.mRevive1 = null;
    this.mRevive2 = null;
    this.mBack = null;
    this.kLight = null;
    
    this.isTime = true;

    this.Mission = nowMission;
    
    this.mRestart = false;
}
gEngine.Core.inheritPrototype(Revive, Scene);

Revive.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 50), // position of the camera
        400,                        // width of camera
        [0, 0, 1280, 720],         // viewport (orgX, orgY, width, height)
        2
    );
    this.mCamera.setBackgroundColor([0,0,0,0.5]);

    this.kLight = this._createALight(
        0,          //type
        [-5,10,0],  //position
        [0,0,0],    //direction
        [1,1,1,1],  //color
        30,         //far
        5,          //near
        5,          //inner
        30,          //outer
        2,          //intensity
        1,
    );
    this.kLight.mFar = 300;

    this.mRevive = new LightRenderable(this.kRevive);
    this.mRevive.setColor([1, 1, 1, 0]);
    this.mRevive.getXform().setPosition(5, 20);
    this.mRevive.getXform().setSize(96, 120);
    this.mRevive.setSpriteSequence(1024,0,409,512,5,0);
    this.mRevive.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mRevive.setAnimationSpeed(10);
    this.mRevive.addLight(this.kLight);
    gEngine.DefaultResources.setGlobalAmbientIntensity(1);
    
    GameObject.call(this, this.mRevive);

};
// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
Revive.prototype.draw = function () {
    // Step A: clear the canvas
    this.mCamera.setupViewProjection();
   
    this.mRevive.draw(this.mCamera);

};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
Revive.prototype.update = function () {
    // select which character to work with
//    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){
//        var myGame = new MyGame();
//        gEngine.Core.initializeEngineCore('GLCanvas', myGame);
//    };
     GameObject.prototype.update.call(this);
    // remember to update this.mMinion's animation
    this.mRevive.updateAnimation();

    if(this.isTime){
        this.isTime = false;
        var that = this;
        setTimeout(function(){ timeup(that)}, 500);
        
    };
};

Revive.prototype.unloadScene = function() {
    gEngine.Textures.unloadTexture(this.kRevive);
    gEngine.Textures.unloadTexture(this.kBack);
    
    if(this.mRestart){
        var mygame = new Revive1(this.Mission);
        gEngine.Core.startScene(mygame,true);
    }
};

Revive.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kRevive);
    gEngine.Textures.loadTexture(this.kBack);
};

Revive.prototype._createALight = function (type, pos, dir, color, n, f, inner, outer, intensity, dropOff) {
    var light = new Light();
    light.setLightType(type);
    light.setColor(color);
    light.setXPos(pos[0]);
    light.setYPos(pos[1]);
    light.setZPos(pos[2]);
    light.setDirection(dir);
    light.setNear(n);
    light.setFar(f);
    light.setInner(inner);
    light.setOuter(outer);
    light.setIntensity(intensity);
    light.setDropOff(dropOff);
    light.setLightCastShadowTo(true);

    return light;
};