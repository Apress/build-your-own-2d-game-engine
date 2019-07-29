/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame(previousWork) {
    //this.kUIButton = "assets/UI/button.png";
    this.kUIButton = "assets/UI/SimpleButton.png";
    this.kCue = "assets/AudioTest/BlueLevel_cue.wav";
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kWawa = "assets/Character/3.png";
    this.kBg = "assets/Background/snow-bg.png";
    this.kHeroBullet = "assets/Bullet/pink-bullet.png";


    // The camera to view the scene
    this.mCamera = null;
    // this.ParticleButton = null;
    // this.PhysicsButton = null;
    // this.UIButton = null;
    this.UIText = null;
    this.LevelSelect = null;
    this.mBarrage = null;
    this.mBarrageSet = null;

    this.mMsg = null;
    this.mMsg2 = null;

//    FIXME debug thing
    this.mHero = null;

    this.LevelSelect = null;

    this.bg = null;

    if (previousWork !== undefined) {
        this.stateWord = previousWork;
    } else {
        this.stateWord = "";

    }
}

gEngine.Core.inheritPrototype(MyGame, Scene);


MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kUIButton);
    gEngine.AudioClips.loadAudio(this.kCue);
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kWawa);
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kHeroBullet);


};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kUIButton);
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kWawa);
    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kHeroBullet);

    if (this.LevelSelect === "Game") {
        gEngine.Core.startScene(new GameScene());
    }
    // else if(this.LevelSelect==="Physics"){
    //     gEngine.Core.startScene(new RigidShapeDemo());
    // }
    // else if(this.LevelSelect==="UI"){
    //     gEngine.Core.startScene(new UIDemo());
    // }
    // gEngine.AudioClips.unloadAudio(this.kCue);
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    // this.mCamera = new Camera(
    //     vec2.fromValues(50, 40), // position of the camera
    //     100,                     // width of camera
    //     [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    // );
    this.mCamera = new Camera(
        vec2.fromValues(100, 56.25), // position of the camera
        200,                         // width of camera
        [0, 0, 1280, 720]            // viewport (orgX, orgY, width, height)
    );

    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);

    // this.ParticleButton = new UIButton(this.particleSelect,this,[400,400],[600,100],"Particle Demos",8);
    // this.PhysicsButton = new UIButton(this.physicsSelect,this,[400,300],[500,100],"Physics Demo",8);
    // this.UIButton =  new UIButton(this.uiSelect,this,[400,200],[320,100],"UI Demo",8);
    this.UIText = new UIText("Press \"S\" to Play", [600, 220], 8, 1, 0, [0, 0, 0, 1]);
    this.mMsg2 = new UIText(this.stateWord, [600, 400], 8, 1, 0, [1, 0, 0, 1]);
    this.mBarrageSet = [];

    this.bg = new TextureRenderable(this.kBg);
    this.bg.getXform().setSize(200, 112.5);
    this.bg.getXform().setPosition(100, 56.25);


    this.mMsg = new FontRenderable("Status Message");
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.getXform().setPosition(5, 5);
    this.mMsg.setTextHeight(3);


    // this.mWing = new Wing(this.kMinionSprite,50,20,0);
    this.mHero = new Hero(this.kWawa, this.kHeroBullet);
    this.mHero.getRigidBody().setMass(0);

};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray


    this.mCamera.setupViewProjection();
    // this.ParticleButton.draw(this.mCamera);
    // this.PhysicsButton.draw(this.mCamera);
    // this.UIButton.draw(this.mCamera);
    this.UIText.draw(this.mCamera);
    this.mMsg2.draw(this.mCamera);

    this.bg.draw(this.mCamera);
    //
    // for (let i = 0; i < this.mBarrageSet.length; i++) {
    //     this.mBarrageSet[i].draw(this.mCamera);
    // }


    // this.mMsg.draw(this.mCamera);

    this.mHero.draw(this.mCamera);

};

MyGame.prototype.update = function () {
    // this.ParticleButton.update();
    // this.PhysicsButton.update();
    // this.UIButton.update();

    var num = 0;
    for (let i = 0; i < this.mBarrageSet.length; i++) {
        // this.mBarrageSet[i].update(this.mCamera, this.mHero);
        // FIXME debug thing
        num += this.mBarrageSet[i].size();
    }


    // if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
    //     this.mBarrageSet.push(new Barrage(this.kMinionSprite, vec2.fromValues(50, 50), 0.8, BARRAGE_TYPE.CIRCLE, 30, 0));
    // }
    // if (gEngine.Input.isKeyClicked(gEngine.Input.keys.W)) {
    //     this.mBarrageSet.push(new Barrage(this.kMinionSprite, vec2.fromValues(50, 50), 0.8, BARRAGE_TYPE.D_SECTOR, 10, 0));
    // }
    // if (gEngine.Input.isKeyClicked(gEngine.Input.keys.E)) {
    //     this.mBarrageSet.push(new Barrage(this.kMinionSprite, vec2.fromValues(50, 50), 0.8, BARRAGE_TYPE.LINE, 30, 0));
    // }
    // if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
    //     this.mBarrageSet.push(new Barrage(this.kMinionSprite, vec2.fromValues(50, 50), 0.8, BARRAGE_TYPE.CROSS, 30, 0));
    // }
    // if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
    //     gEngine.AudioClips.playACue(this.kCue, 0.1);
    // }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
        this.gameSceneSelect();
    }

    this.mHero.update();
    this.mMsg.setText("Bullet Num: " + num);

};

MyGame.prototype.gameSceneSelect = function () {
    this.LevelSelect = "Game";
    gEngine.GameLoop.stop();
};
//
// MyGame.prototype.physicsSelect = function(){
//     this.LevelSelect="Physics";
//     gEngine.GameLoop.stop();
// };
//
// MyGame.prototype.uiSelect= function(){
//     this.LevelSelect="UI";
//     gEngine.GameLoop.stop();
// };