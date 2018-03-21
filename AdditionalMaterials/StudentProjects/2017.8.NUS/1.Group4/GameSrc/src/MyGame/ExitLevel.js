/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, GameObjectSet: false, Camera: false, vec2: false,
  FontRenderable: false, DyePack: false, Hero: false, Minion: false, Brain: false,
  GameObject: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function ExitLevel(continueLevelID) {
    this.mCamera = null;
    this.curOptionID = 0;
    this.mBgRenderable = null;
    this.nextLevel = null;
    this.continueLevelID = continueLevelID;
}
gEngine.Core.inheritPrototype(ExitLevel, Scene);

ExitLevel.prototype.loadScene = function () {
    this.mTexts = new GameObjectSet();
    
    this.kBackground = "assets/ExitBg.png";
    this.kFontCon72 = "assets/fonts/Consolas-72";
    gEngine.Textures.loadTexture(this.kBackground);
    gEngine.Fonts.loadFont(this.kFontCon72);
};

ExitLevel.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kBackground);
    gEngine.Fonts.unloadFont(this.kFontCon72);
    gEngine.Core.startScene(this.nextLevel);
};

ExitLevel.prototype.initialize = function () {
    this.setCamera();
    this.setImage();
    this.setTexts();
};
ExitLevel.prototype.setCamera = function() {
    this.mCamera = new Camera(
        vec2.fromValues(51, 37.5),   // position of the camera
        100,                       // width of camera
        [10, 10, 1260, 700]           // viewport (orgX, orgY, width, height)
    );
    
    this.mCamera.setBackgroundColor([0.9, 0.9, 0.9, 1]);
};
ExitLevel.prototype.setImage = function() {
    this.mBgRenderable = new TextureRenderable(this.kBackground);
    this.mBgRenderable.setColor([1, 1, 1, 0]);
    this.mBgRenderable.getXform().setPosition(51, 38);
    this.mBgRenderable.getXform().setSize(100, 56);
};
ExitLevel.prototype.setTexts = function () {
    var option_0 = new FontRenderable("Continue");
    option_0.setFont(this.kFontCon72);
    this.setText(option_0, 12, 40, [0.0, 0.0, 0.0, 1.0], 3);
    
    var option_1 = new FontRenderable("Select Level");
    option_1.setFont(this.kFontCon72);
    this.setText(option_1, 9, 30, [0.0, 0.0, 0.0, 1.0], 3);
    
    this.mTexts.addToSet(option_0);
    this.mTexts.addToSet(option_1);
};
ExitLevel.prototype.setText = function (font, posX, posY, color, textH) {
    font.setColor(color);
    font.getXform().setPosition(posX, posY);
    font.setTextHeight(textH);
};

ExitLevel.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    this.mCamera.setupViewProjection();
    
    this.mBgRenderable.draw(this.mCamera);
    this.mTexts.draw(this.mCamera);
};

ExitLevel.prototype.update = function () {
    this.optionSelect();
};

ExitLevel.prototype.optionSelect = function() {
    if((gEngine.Input.isKeyClicked(gEngine.Input.keys.Up) || gEngine.Input.isKeyClicked(gEngine.Input.keys.W) )&& this.curOptionID === 1) {
        this.curOptionID = 0;
    } else if ((gEngine.Input.isKeyClicked(gEngine.Input.keys.Down) || gEngine.Input.isKeyClicked(gEngine.Input.keys.D)) && this.curOptionID === 0) {
        this.curOptionID = 1;
    }
    
    if(this.curOptionID === 1) {
        this.mTexts.getObjectAt(1).setTextHeight(4);
        this.mTexts.getObjectAt(1).getXform().setPosition(9 - 4, 30);
        
        this.mTexts.getObjectAt(0).setTextHeight(3);
        this.mTexts.getObjectAt(0).getXform().setPosition(12, 40);
    } else if (this.curOptionID === 0) {
         this.mTexts.getObjectAt(1).setTextHeight(3);
        this.mTexts.getObjectAt(1).getXform().setPosition(9, 30);
        
        this.mTexts.getObjectAt(0).setTextHeight(4);
        this.mTexts.getObjectAt(0).getXform().setPosition(12 - 4, 40);
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter) || gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        if(this.curOptionID === 0) {
            this.setNextLevel();
        } else if (this.curOptionID === 1) {
            this.nextLevel = new SelectLevel();
        }
        gEngine.GameLoop.stop();
    }
};
ExitLevel.prototype.setNextLevel = function() {
    switch(this.continueLevelID) {
        case 0:
            this.nextLevel = new MyGame();
            break;
        case 1:
            this.nextLevel = new Level01();
            break;
        case 2:
            this.nextLevel = new Level02();
            break;
        case 3:
            this.nextLevel = new Level03();
            break;
        case 4:
            this.nextLevel = new Level04();
            break;
        case 5:
            this.nextLevel = new Level05();
            break;
        case 6:
            this.nextLevel = new Level06();
            break;
        case 7:
            this.nextLevel = new Level07();
            break;
        case 8:
            this.nextLevel = new Level08();
            break;
    }

};