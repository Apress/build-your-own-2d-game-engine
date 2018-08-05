"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Win( nowMission) {
    // The camera to view the scene
    this.kBack = "assets/back.png";
    this.kWin = "assets/sounds/win.mp3";
    this.mCamera = null;
    this.mMsg = null;
    this.mBack = null;
    this.mMsg0 = null;
    this.mMsg1 = null;
    
    this.nowMission = nowMission;
}
gEngine.Core.inheritPrototype(Win, Scene);

Win.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        1024,                        // width of camera
        [0, 0, 1024, 484],         // viewport (orgX, orgY, width, height)
        0
    );

     gEngine.AudioClips.playBackgroundAudio(this.kWin);

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
    
    this.mMsg0 = new FontRenderable("Congratulations! You win! winner winner!");
    this.mMsg0.setColor([1, 0, 0, 1]);
    this.mMsg0.getXform().setPosition(-80, 80);
    this.mMsg0.setTextHeight(24);
    
    this.mMsg1 = new FontRenderable("Press Space to to back to the Start Scene");
    this.mMsg1.setColor([1, 0, 0, 1]);
    this.mMsg1.getXform().setPosition(-80, -40);
    this.mMsg1.setTextHeight(16);

    this.mBack = new LightRenderable(this.kBack);
    this.mBack.setColor([1, 1, 1, 0]);  // No tinting
    this.mBack.getXform().setPosition(0, 0);
    this.mBack.getXform().setSize(1024, 484);
    this.mBack.addLight(this.kLight);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
Win.prototype.draw = function () {
    // Step A: clear the canvas
    this.mCamera.setupViewProjection();
    this.mBack.draw(this.mCamera);
    this.mMsg0.draw(this.mCamera);
    this.mMsg1.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
Win.prototype.update = function () {
    // select which character to work with
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){
        gEngine.AudioClips.stopBackgroundAudio(this.kWin);
        gEngine.GameLoop.stop();
    }
};

Win.prototype.unloadScene = function() {
    gEngine.Textures.unloadTexture(this.kBack);
    gEngine.AudioClips.unloadAudio(this.kWin);

    var myGame = new Start();
    gEngine.Core.startScene(myGame);
};

Win.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBack);
    gEngine.AudioClips.loadAudio(this.kWin);
};

Win.prototype._createALight = function (type, pos, dir, color, n, f, inner, outer, intensity, dropOff) {
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