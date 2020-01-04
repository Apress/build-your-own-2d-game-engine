/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */

"use strict";

function Menu(select = 0){
    this.kMenu = "assets/Menu.png";
    this.kUIButton = "assets/UI/SimpleButton.png";
    this.kHelp = "assets/Help.png";
    this.kTitle = "assets/LevelSelect.png";
    this.kCredit = "assets/Credit.png";
//    this.kWrong = "assets/Wrong.png";

    this.mCamera = null;
    this.StartButton = null;
    this.LevelButton = null;
    this.HelpButton = null;
    this.CreditButton = null;
    this.LevelSelect = null;
    this.mBackground = null;
    this.mHelpBG = null;
    this.mCreditBG = null;
    this.BackButton = null;

    this.Level1 = null;
    this.Level2 = null;
    this.Level3 = null;
    this.Level4 = null;
    this.Level5 = null;
    this.Level6 = null;
    this.Level7 = null;
    this.mBG = null;
    this.mTitle = null;

    this.mPage = select;
}
gEngine.Core.inheritPrototype(Menu, Scene);

Menu.prototype.loadScene = function(){
    gEngine.Textures.loadTexture(this.kMenu);
    gEngine.Textures.loadTexture(this.kHelp);
    gEngine.Textures.loadTexture(this.kTitle);
    gEngine.Textures.loadTexture(this.kCredit);
//    gEngine.Textures.loadTexture(this.kWrong);
//    gEngine.Textures.loadTexture(this.kUIButton);
};

Menu.prototype.unloadScene = function(){
    gEngine.Textures.unloadTexture(this.kMenu);
    gEngine.Textures.unloadTexture(this.kHelp);
    gEngine.Textures.unloadTexture(this.kTitle);
    gEngine.Textures.unloadTexture(this.kCredit);
//    gEngine.Textures.unloadTexture(this.kWrong);
//    gEngine.Textures.unloadTexture(this.kUIButton);
    if(this.LevelSelect === "Start"){
        gEngine.Core.startScene(new MyGame(1));
    }
    else
        gEngine.Core.startScene(new MyGame(this.LevelSelect));
};

Menu.prototype.initialize = function(){
    this.mCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        100,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.92, 0.92, 0.952, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    this.mBackground = new TextureRenderable(this.kMenu);
    this.mBackground.getXform().setPosition(50, 40);
    this.mBackground.getXform().setSize(128, 128);
    this.mBackground.setColor([1,1,1,0]);

    this.StartButton = new UIButton(this.StartSelect, this, [400, 300], [300, 60], "Start", 6);
    this.LevelButton = new UIButton(this.LevelSelected, this, [400, 220], [300, 60], "Level", 6);
    this.HelpButton = new UIButton(this.HelpSelect, this, [400, 140], [300, 60], "Help", 6);
    this.CreditButton = new UIButton(this.CreditSelect, this, [400, 60], [300, 60], "Credit", 6);

    this.mHelpBG = new TextureRenderable(this.kHelp);
    this.mHelpBG.getXform().setPosition(50, 40);
    this.mHelpBG.getXform().setSize(128, 128);
    this.mHelpBG.setColor([1,1,1,0]);

    this.mCreditBG = new TextureRenderable(this.kCredit);
    this.mCreditBG.getXform().setPosition(50, 40);
    this.mCreditBG.getXform().setSize(128, 128);
    this.mCreditBG.setColor([1,1,1,0]);

    this.BackButton = new UIButton(this.BackSelect, this, [700, 50], [100, 40], "Back", 4);

    this.mBG = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.mBG.setColor([0.92, 0.92, 0.952, 1]);//152, 234, 251
    this.mBG.getXform().setPosition(100, 75);
    this.mBG.getXform().setSize(200, 175);

    this.mTitle = new SpriteRenderable(this.kTitle);
    this.mTitle.setElementPixelPositions(212, 812, 28, 228);
    this.mTitle.getXform().setPosition(50, 65);
    this.mTitle.getXform().setSize(60, 20);
    this.mTitle.setColor([1,1,1,0]);

    this.Level1 = new UIButton(this.Level1Select, this, [250, 400], [80, 80], "1", 6);
    this.Level2 = new UIButton(this.Level2Select, this, [350, 400], [80, 80], "2", 6);
    this.Level3 = new UIButton(this.Level3Select, this, [450, 400], [80, 80], "3", 6);
    this.Level4 = new UIButton(this.Level4Select, this, [550, 400], [80, 80], "4", 6);
    this.Level5 = new UIButton(this.Level5Select, this, [250, 300], [80, 80], "5", 6);
    this.Level6 = new UIButton(this.Level6Select, this, [350, 300], [80, 80], "6", 6);
    this.Level7 = new UIButton(this.Level7Select, this, [450, 300], [80, 80], "7", 6);

};

Menu.prototype.draw = function(){
    gEngine.Core.clearCanvas([0.92, 0.92, 0.952, 1]);
    this.mCamera.setupViewProjection();
    switch(this.mPage){
        case 0:
            this.mBackground.draw(this.mCamera);
            this.StartButton.draw(this.mCamera);
            this.LevelButton.draw(this.mCamera);
            this.HelpButton.draw(this.mCamera);
            this.CreditButton.draw(this.mCamera);
            break;
        case 1:
            this.mHelpBG.draw(this.mCamera);
            this.BackButton.draw(this.mCamera);
            break;
        case 2:
            this.Level1.draw(this.mCamera);
            this.Level2.draw(this.mCamera);
            this.Level3.draw(this.mCamera);
            this.Level4.draw(this.mCamera);
            this.Level5.draw(this.mCamera);
            this.Level6.draw(this.mCamera);
            this.Level7.draw(this.mCamera);
            this.mTitle.draw(this.mCamera);
            this.BackButton.draw(this.mCamera);
            break;
        case 3:
            this.mCreditBG.draw(this.mCamera);
            this.BackButton.draw(this.mCamera);
    }

};

Menu.prototype.update = function(){
    switch(this.mPage){
        case 0:
            this.StartButton.update();
            this.LevelButton.update();
            this.HelpButton.update();
            this.CreditButton.update();
            break;
        case 1:
            this.BackButton.update();
            break;
        case 2:
            this.Level1.update();
            this.Level2.update();
            this.Level3.update();
            this.Level4.update();
            this.Level5.update();
            this.Level6.update();
            this.Level7.update();
            this.BackButton.update();
            break;
        case 3:
            this.BackButton.update();
    }

};

Menu.prototype.StartSelect = function(){
    this.LevelSelect = "Start";
    gEngine.GameLoop.stop();
};

Menu.prototype.LevelSelected = function(){
    this.mPage = 2;
};

Menu.prototype.HelpSelect = function(){
    this.mPage = 1;
};

Menu.prototype.CreditSelect = function(){
    this.mPage = 3;
};

Menu.prototype.Level1Select = function(){
    this.LevelSelect = 1;
    gEngine.GameLoop.stop();
};

Menu.prototype.Level2Select = function(){
    this.LevelSelect = 2;
    gEngine.GameLoop.stop();
};

Menu.prototype.Level3Select = function(){
    this.LevelSelect = 3;
    gEngine.GameLoop.stop();
};

Menu.prototype.Level4Select = function(){
    this.LevelSelect = 4;
    gEngine.GameLoop.stop();
};

Menu.prototype.Level5Select = function(){
    this.LevelSelect = 5;
    gEngine.GameLoop.stop();
};

Menu.prototype.Level6Select = function(){
    this.LevelSelect = 6;
    gEngine.GameLoop.stop();
};

Menu.prototype.Level7Select = function(){
    this.LevelSelect = 7;
    gEngine.GameLoop.stop();
};

Menu.prototype.BackSelect = function(){
    this.mPage = 0;
};
