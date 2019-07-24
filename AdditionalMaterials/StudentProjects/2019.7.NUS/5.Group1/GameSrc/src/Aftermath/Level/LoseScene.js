/*
 * File: LoseScene.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function LoseScene(previousWork) {
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

    this.LevelSelect = null;

    this.bg = null;

    if (previousWork !== undefined) {
        this.stateWord = previousWork;
    } else {
        this.stateWord = "";

    }

    this.BackButton = null;
    this.back = false;

    this.ButtonWidth = 100;
    this.ButtonHeight = 50;
    this.ButtonSize = [this.ButtonWidth, this.ButtonHeight];
    this.ButtonFontSize = 6;
    this.ButtonPosition = [600, 100];

}

gEngine.Core.inheritPrototype(LoseScene, Scene);


LoseScene.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kUIButton);
    gEngine.AudioClips.loadAudio(this.kCue);
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kWawa);
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kHeroBullet);


};

LoseScene.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kUIButton);
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kWawa);
    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kHeroBullet);

    if (this.back) {
        gEngine.Core.startScene(new HomePage());
        return;
    }
    if (this.LevelSelect === "Game") {

        startNextLevel();
        // switch (CURRENT_LEVEL) {
        //     case SELECT.L_1_1:
        //         gEngine.Core.startScene(new Level_1_1());
        //         break;
        //     case SELECT.L_1_2:
        //         gEngine.Core.startScene(new Level_1_2());
        //         break;
        //     case SELECT.L_1_3:
        //         gEngine.Core.startScene(new Level_1_3());
        //         break;
        //     case SELECT.L_2_1:
        //         gEngine.Core.startScene(new Level_2_1());
        //         break;
        //     case SELECT.L_2_2:
        //         gEngine.Core.startScene(new Level_2_2());
        //         break;
        //     case SELECT.L_2_3:
        //         gEngine.Core.startScene(new Level_2_3());
        //         break;
        //
        //
        //
        //
        //
        // }
    }
    // else if(this.LevelSelect==="Physics"){
    //     gEngine.Core.startScene(new RigidShapeDemo());
    // }
    // else if(this.LevelSelect==="UI"){
    //     gEngine.Core.startScene(new UIDemo());
    // }
    // gEngine.AudioClips.unloadAudio(this.kCue);
};

LoseScene.prototype.initialize = function () {
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
    this.UIText = new UIText("Press \"R\" to Play", [600, 300], 8, 1, 0, [0, 0, 0, 1]);
    this.mMsg2 = new UIText(this.stateWord, [600, 400], 8, 1, 0, [1, 0, 0, 1]);
    this.mBarrageSet = [];

    this.bg = new TextureRenderable(this.kBg);
    this.bg.getXform().setSize(200, 112.5);
    this.bg.getXform().setPosition(100, 56.25);


    this.mMsg = new FontRenderable("Status Message");
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.getXform().setPosition(5, 5);
    this.mMsg.setTextHeight(3);

    this.BackButton = new UIButton(this.goBack, this, this.ButtonPosition, this.ButtonSize, "Home", this.ButtonFontSize);

    // this.mWing = new Wing(this.kMinionSprite,50,20,0);
    // this.mHero = new Hero(this.kWawa, this.kHeroBullet);
    // this.mHero.getRigidBody().setMass(0);

};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
LoseScene.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray


    this.mCamera.setupViewProjection();
    // this.ParticleButton.draw(this.mCamera);
    // this.PhysicsButton.draw(this.mCamera);
    // this.UIButton.draw(this.mCamera);
    this.UIText.draw(this.mCamera);
    this.mMsg2.draw(this.mCamera);

    this.bg.draw(this.mCamera);

    this.BackButton.draw(this.mCamera);

    //
    // for (let i = 0; i < this.mBarrageSet.length; i++) {
    //     this.mBarrageSet[i].draw(this.mCamera);
    // }

    // this.mHero.draw(this.mCamera);

};

LoseScene.prototype.update = function () {
    // this.ParticleButton.update();
    // this.PhysicsButton.update();
    // this.UIButton.update();

    // var num = 0;
    // for (let i = 0; i < this.mBarrageSet.length; i++) {
    //     // this.mBarrageSet[i].update(this.mCamera, this.mHero);
    //     // FIXME debug thing
    //     num += this.mBarrageSet[i].size();
    // }
    //

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
    this.BackButton.update();

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.R)) {
        this.gameSceneSelect();
    }


};

LoseScene.prototype.goBack = function () {
    this.back = true;
    gEngine.GameLoop.stop();
};

LoseScene.prototype.gameSceneSelect = function () {
    this.LevelSelect = "Game";
    gEngine.GameLoop.stop();
};
