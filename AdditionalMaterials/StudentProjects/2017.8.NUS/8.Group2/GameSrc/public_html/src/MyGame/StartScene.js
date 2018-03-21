/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,Projectile, Missle,
  Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
  GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light, Shield */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
var nextScene = null;
var NextScene = {
    SELECTSCENE:0,
    HOWTOPLAY:1
};
var gBGClip = null;
function Startscene() {
    this.kBackgroundTexture = "assets/startGame.jpg";
    this.kSelectTexture = "assets/Axe.png";
//    this.kHeroTexture1 = "assets/hero1_sprite.png";
//    this.kHeroTexture2 = "assets/hero2_sprite.png";
    this.mCamera = null;
    this.mSelect = null;
    this.mBackground = null;
    this.mHero_pic1 = null;
    this.mHero_pic2 = null;
    
    gBGClip = "assets/sounds/start.mp3";
}
gEngine.Core.inheritPrototype(Startscene, Scene);

Startscene.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBackgroundTexture);
    gEngine.Textures.loadTexture(this.kSelectTexture);
    gEngine.AudioClips.loadAudio(gBGClip);
};

Startscene.prototype.unloadScene = function () {    
    gEngine.Textures.unloadTexture(this.kBackgroundTexture);
    gEngine.Textures.unloadTexture(this.kSelectTexture);
    var nextLevel = null;
    if(nextScene===NextScene.HOWTOPLAY){
        nextLevel = new SelectScene(); 
    }else{
        nextLevel = new RuleScene(); 
    }
    gEngine.Core.startScene(nextLevel);
};

Startscene.prototype.initialize = function () {
    this.mCamera = new Camera(
        vec2.fromValues(50, 60),  // position of the camera
        100,                      // width of camera
        [400, 0, 600, 720],        // viewport (orgX, orgY, width, height)
        2
    );
    this.mCamera.setBackgroundColor([1, 1, 1, 0]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(3.6);
    this.mBackground = new TextureRenderable(this.kBackgroundTexture);
    this.mBackground.getXform().setPosition(50,60);
    this.mBackground.getXform().setSize(100,120);
    
    this.mSelect = new TextureRenderable(this.kSelectTexture);
    this.mSelect.getXform().setPosition(5,51);
    this.mSelect.getXform().setSize(8,8);
    this.mSelect.getXform().incRotationByDegree(-23);
    
    gEngine.AudioClips.playBackgroundAudio(gBGClip);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
Startscene.prototype.draw = function () {
    gEngine.Core.clearCanvas([0, 0, 0, 1]); // clear to light gray
    this.mCamera.setupViewProjection();
    this.mBackground.draw(this.mCamera);
    this.mSelect.draw(this.mCamera);
    //this.mHero_pic1.draw(this.mCamera);
    //this.mHero_pic2.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
Startscene.prototype.update = function () {
    this.mCamera.update();
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.S||gEngine.Input.keys.Down)){
        this.mSelect.getXform().setPosition(5,28);
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.W||gEngine.Input.keys.Up)){
        this.mSelect.getXform().setPosition(5,51);
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter||gEngine.Input.keys.Space)){
        var selectPos = this.mSelect.getXform().getYPos();
        if(selectPos===28){
            nextScene = NextScene.SELECTSCENE;
        }else{
            nextScene = NextScene.HOWTOPLAY;
        }
        gEngine.GameLoop.stop();
    }
};
