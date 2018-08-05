"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Revive1(nowMission) {
    // The camera to view the scene
    this.kRevive1 = "assets/Revive.png";
    this.kBack = "assets/back.png";
    this.mCamera = null;
    this.mMsg = null;
    this.mRevive1 = null;
    this.mRevive1 = null;
    this.mRevive2 = null;
    this.mBack = null;
    this.kLight = null;

    this.isTime = true;

    this.Mission = nowMission;
    
    this.mRestart = false;
}
gEngine.Core.inheritPrototype(Revive1, Scene);

Revive1.prototype.initialize = function () {
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


    this.mRevive1 = new LightRenderable(this.kRevive1);
    this.mRevive1.setColor([1, 1, 1, 0]);
    this.mRevive1.getXform().setPosition(5, 20);
    this.mRevive1.getXform().setSize(96, 120);
    this.mRevive1.setSpriteSequence(512,0,409,512,5,0);
    this.mRevive1.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mRevive1.setAnimationSpeed(10);
    this.mRevive1.addLight(this.kLight);
    gEngine.DefaultResources.setGlobalAmbientIntensity(1);

    GameObject.call(this, this.mRevive1);

};
// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
Revive1.prototype.draw = function () {
    // Step A: clear the canvas
    this.mCamera.setupViewProjection();

    this.mRevive1.draw(this.mCamera);

};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
Revive1.prototype.update = function () {
    // select which character to work with
//    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){
//        var myGame = new MyGame();
//        gEngine.Core.initializeEngineCore('GLCanvas', myGame);
//    };
    GameObject.prototype.update.call(this);
    // remember to update this.mMinion's animation

    this.mRevive1.updateAnimation();

    if(this.isTime){
        this.isTime = false;
        var that = this;   
        setTimeout(function(){timeup(that)}, 500);

    };
};

Revive1.prototype.unloadScene = function() {
    gEngine.Textures.unloadTexture(this.kRevive1);
    gEngine.Textures.unloadTexture(this.kBack);
    
    if(this.mRestart){
        var that = this.Mission;
        if(that===1){
                var myGame = new MyGame(8);
                gEngine.Core.startScene(myGame,true);
            }else if(that===2){
                var myGame = new MyGame2();
                gEngine.Core.startScene(myGame,true);
            }else if(that===3){
                var myGame = new Boss();
                gEngine.Core.startScene(myGame,true);
            }
    }
};

Revive1.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kRevive1);
    gEngine.Textures.loadTexture(this.kBack);
};

Revive1.prototype._createALight = function (type, pos, dir, color, n, f, inner, outer, intensity, dropOff) {
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