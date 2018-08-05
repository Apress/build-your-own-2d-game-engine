"use strict";  // Operate in Strict mode such that variables must be declared before used!

function EvilComing( nowMission) {
    // The camera to view the scene
    this.kEvil = "assets/EvilComing.png";
    this.kBack = "assets/back.png";
    this.mCamera = null;
    this.mMsg = null;
    this.mEvil = null;
    this.mEvil1 = null;
    this.mEvil2 = null;
    this.mBack = null;
    this.kLight = null;
    
    this.isTime = true;
    
    this.nowMission = nowMission;

    this.mRestart = false;
}
gEngine.Core.inheritPrototype(EvilComing, Scene);

EvilComing.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 50), // position of the camera
        400,                        // width of camera
        [0, 0, 1280, 720],         // viewport (orgX, orgY, width, height)
        2
    );
    this.mCamera.setBackgroundColor([0,0,0,1]);

    this.kLight = this._createALight(
        0,          //type
        [-5,10,0],  //position
        [0,0,0],    //direction
        [0,0,0,1],  //color
        30,         //far
        5,          //near
        5,          //inner
        30,          //outer
        2,          //intensity
        1,
    );
    this.kLight.mFar = 300;

    this.mEvil = new LightRenderable(this.kEvil);
    this.mEvil.setColor([1, 1, 1, 0]);  
    this.mEvil.getXform().setPosition(5, 20);
    this.mEvil.getXform().setSize(190, 157);
    this.mEvil.setSpriteSequence(1024,0,409,341,4,0);
    this.mEvil.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mEvil.setAnimationSpeed(10);
    this.mEvil.addLight(this.kLight);
    gEngine.DefaultResources.setGlobalAmbientIntensity(4);
    
    GameObject.call(this, this.mEvil);
};
// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
EvilComing.prototype.draw = function () {
    // Step A: clear the canvas
    this.mCamera.setupViewProjection();
   
    this.mEvil.draw(this.mCamera);

};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
EvilComing.prototype.update = function () {
    // select which character to work with
//    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){
//        var myGame = new MyGame();
//        gEngine.Core.initializeEngineCore('GLCanvas', myGame);
//    };
     GameObject.prototype.update.call(this);
    // remember to update this.mMinion's animation
    this.mEvil.updateAnimation();

    if(this.isTime){
        console.log(new Date().getTime());
        this.isTime = false;
        var that =  this;
        setTimeout(function(){timeup(that)} , 500);
    };
};

EvilComing.prototype.unloadScene = function() {
    gEngine.Textures.unloadTexture(this.kEvil);
    gEngine.Textures.unloadTexture(this.kBack);
    if(this.mRestart){
        var myGame = new EvilComing1();
        gEngine.Core.startScene(myGame,true); 
    }
};

EvilComing.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kEvil);
    gEngine.Textures.loadTexture(this.kBack);
};

EvilComing.prototype._createALight = function (type, pos, dir, color, n, f, inner, outer, intensity, dropOff) {
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

var timeup = function(that){
    that.mRestart = true;
    gEngine.GameLoop.stop();
}