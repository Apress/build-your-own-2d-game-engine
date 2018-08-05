/*
 * File: Intro.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
  GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Select(){
    var flag=0;
    this.kBg="assets/Select.png";
    this.kArrow="assets/Arrow2.png";
    this.mBg = null;
    this.mArrow = null;
}
gEngine.Core.inheritPrototype(Select, Scene);

Select.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kArrow);
};

Select.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(512, 256), // position of the camera
        1024,                        // width of camera
        [0, 0, 1024, 512]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([1, 1, 1, 1]);
    gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(1.0);
    
    this.mArrow = new TextureRenderable(this.kArrow);
    this.mArrow.setColor([0, 0, 0, 1]);
    this.mArrow.getXform().setPosition(162, 276);
    this.mArrow.getXform().setSize(32, 64);
    
    var bgR = new SpriteRenderable(this.kBg);
    bgR.setElementPixelPositions(0, 1024, 0, 512);
    bgR.getXform().setSize(1024, 512);
    bgR.getXform().setPosition(512, 256);
    this.mBg = new GameObject(bgR);
};

Select.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([1, 1, 1, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    
    this.mBg.draw(this.mCamera);
    this.mArrow.draw(this.mCamera);
};

Select.prototype.update = function(){
    if((gEngine.Input.isKeyClicked(gEngine.Input.keys.A)||gEngine.Input.isKeyClicked(gEngine.Input.keys.Left)) && this.mArrow.getXform().getXPos()!==162){
        this.mArrow.getXform().setXPos(this.mArrow.getXform().getXPos()-350);
    }
    if((gEngine.Input.isKeyClicked(gEngine.Input.keys.D)||gEngine.Input.isKeyClicked(gEngine.Input.keys.Right)) && this.mArrow.getXform().getXPos()!==862){
        this.mArrow.getXform().setXPos(this.mArrow.getXform().getXPos()+350);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Return)){
        if(this.mArrow.getXform().getXPos()===162){
            this.flag=-1;
            gEngine.GameLoop.stop();
        }
        if(this.mArrow.getXform().getXPos()===512){
            this.flag=0;
            gEngine.GameLoop.stop();
        }
        if(this.mArrow.getXform().getXPos()===862){
            this.flag=1;
            gEngine.GameLoop.stop();
        }
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Esc)){
        this.flag=2
        gEngine.GameLoop.stop();
    }



};

Select.prototype.unloadScene = function() {
    gEngine.Textures.unloadTexture(this.kBg);
    // Step B: starts the next level
    // starts the next level
    if(this.flag===-1){
        var nextLevel = new GameLevel_01("myLevel1",1,1);
        gEngine.Core.startScene(nextLevel);
    }
    if(this.flag===0){
        var nextLevel = new GameLevel_01("myLevel2",0,0);
        gEngine.Core.startScene(nextLevel);
    }
    if(this.flag===1){
        var nextLevel = new GameLevel_01("myLevel3",0,0);
        gEngine.Core.startScene(nextLevel);
    }
    if(this.flag===2){
        var nextLevel = new TheCollisionOfBlackAndWhite();
        gEngine.Core.startScene(nextLevel);
    }
};