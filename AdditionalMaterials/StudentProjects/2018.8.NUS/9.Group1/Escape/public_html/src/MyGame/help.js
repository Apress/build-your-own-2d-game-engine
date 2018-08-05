/*
 * File: Help.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
  GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Help() {
    // The camera to view the scene
    this.kBack = "assets/help.png";
    this.kChest = "assets/chest.png";
    this.kGun = "assets/gun.png";
    this.kNet = "assets/net.png";
    this.kKey = "assets/key.png";
    this.kLight = "assets/LargeSight.png";
    this.kTrap = "assets/trap.png";

    this.mCamera = null;

    //back and items
    this.mBack = null;
    this.mChest = null;
    this.mGun = null;
    this.mNet = null;
    this.mKey = null;
    this.mLight = null;
    this.mTrap = null;
    
    //introduction
    this.msg0 = null;
    this.msg1 = null;
    this.msg2 = null;
    this.msg3 = null;
    this.msg4 = null;
    this.msg5 = null;
    this.msg6 = null;
    this.msg7 = null;
    this.msg8 = null;
    this.msg9 = null;
    this.msg10 = null;
    this.msg11 = null;
    this.msg12 = null;
    
    this.mRestart = false;
}
gEngine.Core.inheritPrototype(Help, Scene);

Help.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        1024,                        // width of camera
        [0, 0, 1024, 484],         // viewport (orgX, orgY, width, height)
        0
    );
    
    this.Light = createALight(
        0,          //type
        [-5,10,0],  //position
        [0,0,0],    //direction
        [1,1,1,0.5],  //color
        1500,         //far
        1500,          //near
        5,          //inner
        30,          //outer
        1,          //intensity
        0.5,
    );
    
    this.mBack = new LightRenderable(this.kBack);
    this.mBack.setColor([1, 1, 1, 0]);  // No tinting
    this.mBack.getXform().setPosition(0, 0);
    this.mBack.getXform().setSize(1024, 484);
    this.mBack.addLight(this.Light);
    
    this.initialAll();
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
Help.prototype.draw = function () {
    // Step A: clear the canvas
    //gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    
    this.mBack.draw(this.mCamera);
    this.mChest.draw(this.mCamera);
    this.mNet.draw(this.mCamera);
    this.mGun.draw(this.mCamera);
    this.mKey.draw(this.mCamera);
    this.mLight.draw(this.mCamera);
    this.mTrap.draw(this.mCamera);
    
    this.msg0.draw(this.mCamera);
    this.msg1.draw(this.mCamera);
    this.msg2.draw(this.mCamera);
    this.msg3.draw(this.mCamera);
    this.msg4.draw(this.mCamera);
    this.msg5.draw(this.mCamera);
    this.msg6.draw(this.mCamera);
    this.msg7.draw(this.mCamera);
    this.msg8.draw(this.mCamera);
    this.msg9.draw(this.mCamera);
    this.msg10.draw(this.mCamera);
    this.msg11.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
Help.prototype.update = function () {
    // select which character to work with
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){
        this.mRestart = true;
        gEngine.GameLoop.stop();
    }
};

Help.prototype.unloadScene = function() {
    gEngine.Textures.unloadTexture(this.kBack);
    gEngine.Textures.unloadTexture(this.kChest);
    gEngine.Textures.unloadTexture(this.kGun);
    gEngine.Textures.unloadTexture(this.kNet);
    gEngine.Textures.unloadTexture(this.kKey);    
    gEngine.Textures.unloadTexture(this.kLight); 
    gEngine.Textures.unloadTexture(this.kTrap);

    if(this.mRestart){
        var mygame = new EvilComing();
        gEngine.Core.startScene(mygame,true);
    }
};

Help.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBack);
    gEngine.Textures.loadTexture(this.kChest);
    gEngine.Textures.loadTexture(this.kGun);
    gEngine.Textures.loadTexture(this.kNet);
    gEngine.Textures.loadTexture(this.kKey);
    gEngine.Textures.loadTexture(this.kLight);  
    gEngine.Textures.loadTexture(this.kTrap);   
};

Help.prototype.initialItem = function( texture, x, y, width, height){

    var m = new LightRenderable(texture);
    m.setColor([1, 1, 1, 0]);  // No tinting
    m.getXform().setPosition( x, y);
    m.getXform().setSize( width, height);
    m.addLight(this.Light);
    
    return m;
};

Help.prototype.initialAll = function(){
    this.mChest = this.initialItem( this.kChest, -400, 180, 80, 80);
    this.mNet = this.initialItem( this.kNet, -400, 0, 80, 80);
    this.mGun = this.initialItem( this.kGun, -400, -180, 80, 80);
    this.mKey = this.initialItem( this.kKey, 80, 180, 80, 80);
    this.mLight = this.initialItem( this.kLight, 80, 0, 80, 80);
    this.mTrap = this.initialItem( this.kTrap, 80, -180, 80, 80);
    
    this.msg0 = this.wordInitial("You can find different", -300, 180);
    this.msg1 = this.wordInitial("skills in a chest.", -300, 156);  
    
    this.msg2 = this.wordInitial("You can press 'K' to", -300, 0);
    this.msg3 = this.wordInitial("trap a zombine to death.", -300, -24);   
    
    this.msg4 = this.wordInitial("You can press 'L' to", -300, -170);
    this.msg5 = this.wordInitial("shoot at a zombine to death.", -300, -194);  
    
    this.msg6 = this.wordInitial("You need to find a key to", 180, 180);
    this.msg7 = this.wordInitial("pass this level.", 180, 156);   
    
    this.msg8 = this.wordInitial("It will enlarge your ", 180, 0);
    this.msg9 = this.wordInitial("Viewable range", 180, -24);   
    
    this.msg10 = this.wordInitial("Warning! You will be killed", 180, -170);
    this.msg11 = this.wordInitial("by the thron on the ground.", 180, -194);   
};

Help.prototype.wordInitial = function( words, x, y){
    var m = new FontRenderable(words);
    m.setColor([0, 0, 0, 1]);
    m.getXform().setPosition( x, y);
    m.setTextHeight(20);
    
    return m;
};

var createALight = function (type, pos, dir, color, n, f, inner, outer, intensity, dropOff) {
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