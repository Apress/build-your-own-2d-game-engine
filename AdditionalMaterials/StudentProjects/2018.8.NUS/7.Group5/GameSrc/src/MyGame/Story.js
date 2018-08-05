/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * File: Startpage.js 
 * It will provide the interface to start the game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Story() {
       
    this.kBgClip1 = "assets/sounds/story.mp3";
    this.kstartpic = "assets/story.png";
    this.kHeroSprite="assets/hero_sprite.png";
    this.kBallon="assets/ballon.png";
    this.count=0;
    this.mCamera = null;
    
    this.mstartpic = null;
    
}
gEngine.Core.inheritPrototype(Story, Scene);

Story.prototype.loadScene = function () {
    
    gEngine.Textures.loadTexture(this.kstartpic);
    gEngine.Textures.loadTexture(this.kHeroSprite);
    gEngine.Textures.loadTexture(this.kBallon);

};

Story.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kstartpic);
    gEngine.Textures.unloadTexture(this.kHeroSprite);
    gEngine.Textures.unloadTexture(this.kBallon);
    gEngine.AudioClips.unloadAudio(this.kBgClip1);

    
    var nextlevel=new MyGame();            
    gEngine.Core.startScene(nextlevel);
    
};


Story.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        100,                     // width of camera
        [0, 0, 1500, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([1, 1, 1, 1]);
            // sets the background to gray

    this.mHero=new Hero(this.kHeroSprite);
    this.mHero.getXform().setPosition(85,40);
    this.mHero.getXform().setSize(3.8*2, 6.5*2);
    this.mBallon=new Ballon(this.kBallon,15,40,10,20);
    
    this.mstartpic = new startpic(this.kstartpic,50,40,100,50);
    

};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
Story.prototype.draw = function () {
    // Step A: clear the canvas

    gEngine.Core.clearCanvas([1, 1, 1, 1.0]); // clear to white

    this.mCamera.setupViewProjection();


    this.mstartpic.draw(this.mCamera);
    this.mHero.draw(this.mCamera);
    this.mBallon.draw(this.mCamera);

};


Story.prototype.update = function () {
    
    this.count+=1;
    if(this.count===500)
    {    
        gEngine.GameLoop.stop();
    }
           
    
};
