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

function SelectLevel() {
    this.mCamera = null;
    this.mAllTexts = new GameObjectSet();
    this.mChoosingID = 0;
}
gEngine.Core.inheritPrototype(SelectLevel, Scene);

SelectLevel.prototype.loadScene = function () {
};

SelectLevel.prototype.unloadScene = function () {
    gEngine.Core.startScene(this.nextLevel);
};

SelectLevel.prototype.initialize = function () {
    this.mCamera = new Camera(
        vec2.fromValues(51, 37.5),   // position of the camera
        100,                       // width of camera
        [10, 10, 1260, 700]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([1, 1, 1, 1]);
    this.setTexts();
};

SelectLevel.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    this.mCamera.setupViewProjection();
    this.mAllTexts.draw(this.mCamera);
};

SelectLevel.prototype.update = function () {
    this.selectInput();
    this.selectReponse();
};

SelectLevel.prototype.setTexts = function() {
    for(var i = 0;  i < 4; i++) {
        var j=i+1;
        var levelText = new FontRenderable("Level" + j);
        
        levelText.setColor([0.8, 0.8, 0.8, 1]);
        levelText.getXform().setPosition(40, 60 - i * 10);
        levelText.setTextHeight(3);
        this.mAllTexts.addToSet(levelText);
    }
    for(var i = 4;  i < 8; i++) {
        var j=i+1;
        var levelText = new FontRenderable("Level" + j);
        
        levelText.setColor([0.8, 0.8, 0.8, 1]);
        levelText.getXform().setPosition(60, 60 - (i-4) * 10);
        levelText.setTextHeight(3);
        this.mAllTexts.addToSet(levelText);
    }
};
SelectLevel.prototype.selectInput = function() {
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Up) || gEngine.Input.isKeyClicked(gEngine.Input.keys.W)) {
        if(this.mChoosingID > 0) {
            this.mChoosingID--;
        }
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Down) || gEngine.Input.isKeyClicked(gEngine.Input.keys.S)) {
        if (this.mChoosingID < this.mAllTexts.size() - 1) {
            this.mChoosingID++;
        }
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Right) || gEngine.Input.isKeyClicked(gEngine.Input.keys.D)) {
        if (this.mChoosingID < 4) {            
            this.mChoosingID += 4;
        }
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Left) || gEngine.Input.isKeyClicked(gEngine.Input.keys.A)) {
        if (this.mChoosingID >= 4) {
            this.mChoosingID -= 4;
        }
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter) || gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        var selectingLevelID = this.mChoosingID;
        switch(selectingLevelID) {
            case 0:
                this.nextLevel = new Level01();
                break;
            case 1:
                this.nextLevel = new Level02();
                break;
            case 2:
                this.nextLevel = new Level03();
                break;
            case 3:
                this.nextLevel = new Level04();
                break;
            case 4:
                this.nextLevel = new Level05();
                break;
            case 5:
                this.nextLevel = new Level06();
                break;
            case 6:
                this.nextLevel = new Level07();
                break;
            case 7:
                this.nextLevel = new Level08();
                break;
        }
        gEngine.GameLoop.stop();
    }
};
SelectLevel.prototype.selectReponse = function() {
    for (var i = 0; i < this.mAllTexts.size(); i++) {
        if(this.mChoosingID === i) {
            this.mAllTexts.getObjectAt(i).setTextHeight(4);
            this.mAllTexts.getObjectAt(i).setColor([0, 0, 0, 1]);
        } else {
            this.mAllTexts.getObjectAt(i).setTextHeight(3);
            this.mAllTexts.getObjectAt(i).setColor([0.8, 0.8, 0.8, 1]);
        }
    }
};