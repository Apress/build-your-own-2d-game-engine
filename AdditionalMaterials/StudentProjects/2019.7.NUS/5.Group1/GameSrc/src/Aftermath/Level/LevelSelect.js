/*
 * File: LevelSelect.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function LevelSelect() {
    this.kBg = "assets/Background/snow-bg.png";
    this.kControlGuide = "assets/UI/control-guide.png";
    this.kPlatformTexture = "assets/BlockUnit/snow-platform.png";
    this.kHero = "assets/Character/3.png";
    this.kHeroBullet = "assets/Bullet/pink-bullet.png";


    // The camera to view the scene
    this.mCamera = null;

    //
    this.BackButton = null;
    this.L_1_1Button = null;
    this.L_1_2Button = null;
    this.L_1_3Button = null;
    this.L_2_1Button = null;
    this.L_2_2Button = null;
    this.L_2_3Button = null;
    this.HiddenLButton = null;
    // this.ContinueButton = null;
    // this.PlayButton = null;
    // this.ControlButton = null;
    // this.TrophyButton = null;
    // this.AcknowledgeButton = null;

    // UI Setting
    this.ButtonWidth = 100;
    this.ButtonHeight = 50;
    this.ButtonSize = [this.ButtonWidth, this.ButtonHeight];
    this.ButtonFontSize = 5;
    this.ButtonPosition = [550, 450];
    this.buttonInter = 10;


    //next
    CURRENT_LEVEL = null;

}

var SELECT = {
    BACK: 0,
    L_1_1: 1,
    L_1_2: 2,
    L_1_3: 3,
    L_2_1: 4,
    L_2_2: 5,
    L_2_3: 6,
    HIDDEN: 1000,

};

var CURRENT_LEVEL = SELECT.L_1_1;


gEngine.Core.inheritPrototype(LevelSelect, Scene);


LevelSelect.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kControlGuide);
    gEngine.Textures.loadTexture(this.kPlatformTexture);
    gEngine.Textures.loadTexture(this.kHero);
    gEngine.Textures.loadTexture(this.kHeroBullet);

};

function startNextLevel() {
    switch (CURRENT_LEVEL) {
        case SELECT.BACK:
            gEngine.Core.startScene(new HomePage());
            break;
        case SELECT.HIDDEN:
            gEngine.Core.startScene(new HiddenLevel());
            break;

        case SELECT.L_1_1:
            gEngine.Core.startScene(new Level_1_1());
            break;
        case SELECT.L_1_2:
            gEngine.Core.startScene(new Level_1_2());
            break;
        case SELECT.L_1_3:
            gEngine.Core.startScene(new Level_1_3());
            break;
        case SELECT.L_2_1:
            gEngine.Core.startScene(new Level_2_1());
            break;
        case SELECT.L_2_2:
            gEngine.Core.startScene(new Level_2_2());
            break;
        case SELECT.L_2_3:
            gEngine.Core.startScene(new Level_2_3());
            break;



    }
}

LevelSelect.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kControlGuide);
    gEngine.Textures.unloadTexture(this.kPlatformTexture);
    gEngine.Textures.unloadTexture(this.kHero);
    gEngine.Textures.unloadTexture(this.kHeroBullet);
    startNextLevel();


};

LevelSelect.prototype.initialize = function () {
    // Step A: set up the cameras

    this.mCamera = new Camera(
        vec2.fromValues(100, 56.25), // position of the camera
        200,                         // width of camera
        [0, 0, 1280, 720]            // viewport (orgX, orgY, width, height)
    );

    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

    // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);

    this.initButton();


    this.bg = new TextureRenderable(this.kBg);
    this.bg.getXform().setSize(200, 112.5);
    this.bg.getXform().setPosition(100, 56.25);


};


LevelSelect.prototype.initButton = function () {
    this.L_1_1Button = new UIButton(this.select_1_1, this, this.ButtonPosition, this.ButtonSize, "1-1", this.ButtonFontSize);
    this.ButtonPosition[0] += (this.buttonInter + this.ButtonWidth);

    this.L_1_2Button = new UIButton(this.select_1_2, this, this.ButtonPosition, this.ButtonSize, "1-2", this.ButtonFontSize);
    this.ButtonPosition[0] += (this.buttonInter + this.ButtonWidth);

    this.L_1_3Button = new UIButton(this.select_1_3, this, this.ButtonPosition, this.ButtonSize, "1-3", this.ButtonFontSize);
    this.ButtonPosition[0] -= 2 * (this.buttonInter + this.ButtonWidth);
    this.ButtonPosition[1] -= (this.buttonInter + this.ButtonHeight);

    this.L_2_1Button = new UIButton(this.select_2_1, this, this.ButtonPosition, this.ButtonSize, "2-1", this.ButtonFontSize);
    this.ButtonPosition[0] += (this.buttonInter + this.ButtonWidth);

    this.L_2_2Button = new UIButton(this.select_2_2, this, this.ButtonPosition, this.ButtonSize, "2-2", this.ButtonFontSize);
    this.ButtonPosition[0] += (this.buttonInter + this.ButtonWidth);

    this.L_2_3Button = new UIButton(this.select_2_3, this, this.ButtonPosition, this.ButtonSize, "2-3", this.ButtonFontSize);
    this.ButtonPosition[0] -= (this.buttonInter + this.ButtonWidth);
    this.ButtonPosition[1] -= (this.buttonInter + this.ButtonHeight);

    this.HiddenLButton = new UIButton(this.hiddenLevel, this, this.ButtonPosition, this.ButtonSize, "???", this.ButtonFontSize);
    this.ButtonPosition[1] -= 2 * (this.buttonInter + this.ButtonHeight);

    this.BackButton = new UIButton(this.goBack, this, this.ButtonPosition, this.ButtonSize, "Back", this.ButtonFontSize);

    // this.ContinueButton = new UIButton(this.gameSceneSelect, this, this.ButtonPosition, this.ButtonSize, "Continue", this.ButtonFontSize);
    // this.ButtonPosition[1] -= (this.buttonInter + this.ButtonHeight);
    // this.PlayButton = new UIButton(this.gameSceneSelect, this, this.ButtonPosition, this.ButtonSize, "Play", this.ButtonFontSize);
    // this.ButtonPosition[1] -= (this.buttonInter + this.ButtonHeight);
    // this.ControlButton = new UIButton(this.controlInfo, this, this.ButtonPosition, this.ButtonSize, "Control", this.ButtonFontSize);
    // this.ButtonPosition[1] -= (this.buttonInter + this.ButtonHeight);
    // this.TrophyButton = new UIButton(this.trophyInfo, this, this.ButtonPosition, this.ButtonSize, "Trophy", this.ButtonFontSize);
    // this.ButtonPosition[1] -= (this.buttonInter + this.ButtonHeight);
    // this.AcknowledgeButton = new UIButton(this.acknowledgeInfo, this, this.ButtonPosition, this.ButtonSize, "Acknowledgement", this.ButtonFontSize);


};
// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.

LevelSelect.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();

    this.bg.draw(this.mCamera);
    this.drawButton();

};

LevelSelect.prototype.drawButton = function () {
    this.BackButton.draw(this.mCamera);
    this.L_1_1Button.draw(this.mCamera);
    this.L_1_2Button.draw(this.mCamera);
    this.L_1_3Button.draw(this.mCamera);
    this.L_2_1Button.draw(this.mCamera);
    this.L_2_2Button.draw(this.mCamera);
    this.L_2_3Button.draw(this.mCamera);
    this.HiddenLButton.draw(this.mCamera);

};


LevelSelect.prototype.update = function () {
    this.BackButton.update();
    this.L_1_1Button.update();
    this.L_1_2Button.update();
    this.L_1_3Button.update();
    this.L_2_1Button.update();
    this.L_2_2Button.update();
    this.L_2_3Button.update();
    this.HiddenLButton.update();

    // if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
    //     this.hiddenLevel();
    // }


};

// FIXME debug thing
LevelSelect.prototype.goBack = function () {
    CURRENT_LEVEL = SELECT.BACK;
    gEngine.GameLoop.stop();
};
LevelSelect.prototype.hiddenLevel = function () {
    // CURRENT_LEVEL = SELECT.HIDDEN;
    // gEngine.GameLoop.stop();
};

LevelSelect.prototype.select_1_1 = function () {
    CURRENT_LEVEL = SELECT.L_1_1;
    gEngine.GameLoop.stop();
};
LevelSelect.prototype.select_1_2 = function () {
    CURRENT_LEVEL = SELECT.L_1_2;
    gEngine.GameLoop.stop();
};
LevelSelect.prototype.select_1_3 = function () {
    CURRENT_LEVEL = SELECT.L_1_3;
    gEngine.GameLoop.stop();
};
LevelSelect.prototype.select_2_1 = function () {
    CURRENT_LEVEL = SELECT.L_2_1;
    gEngine.GameLoop.stop();
};
LevelSelect.prototype.select_2_2 = function () {
    CURRENT_LEVEL = SELECT.L_2_2;
    gEngine.GameLoop.stop();
};
LevelSelect.prototype.select_2_3 = function () {
    CURRENT_LEVEL = SELECT.L_2_3;
    gEngine.GameLoop.stop();
};

