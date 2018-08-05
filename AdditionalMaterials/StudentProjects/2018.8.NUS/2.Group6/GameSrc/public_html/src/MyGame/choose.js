/*
 * File: GameEndThis is the logic of our game.
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
  GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function choose() {
    // The camera to view the scene
    this.mCamera = null;
    this.mRestart = false;
    this.kBackground = "assets/pictures/menu.png";

    this.kButton = "assets/pictures/ball.png";

    this.kBgClip = "assets/sounds/BGClip.mp3";
    this.kCue = "assets/sounds/cue.wav";
    this.kEat = "assets/sounds/eat.wav";

    this.tag = 0;
}
gEngine.Core.inheritPrototype(choose, Scene);

choose.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBackground);

    gEngine.Textures.loadTexture(this.kButton);

    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.AudioClips.loadAudio(this.kEat);
    gEngine.AudioClips.loadAudio(this.kCue);
};

choose.prototype.unloadScene = function () {
    gEngine.LayerManager.cleanUp();

    gEngine.Textures.unloadTexture(this.kBackground);

    gEngine.Textures.unloadTexture(this.kButton);

    gEngine.AudioClips.unloadAudio(this.kBgClip);
    gEngine.AudioClips.unloadAudio(this.kEat);
    gEngine.AudioClips.unloadAudio(this.kCue);

    if (this.mRestart === true){
        var nextLevel;  // next level to be loaded
        switch(this.tag)
        {
            case 1:
                nextLevel = new Level1();
                break;
            case 2:
                nextLevel = new Level2();
                break;
            case 3:
                nextLevel = new Level3();
                break;
            case 4:
                nextLevel = new Level4();
                break;
            case 5:
                nextLevel = new Begin();
                break;
        }
        gEngine.Core.startScene(nextLevel);
    }
};


choose.prototype.initialize = function () {
    document.getElementById('info').innerText = "";
    this.width = 800;
    this.height = 600;

    this.mCamera = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        1024,                     // width of camera
        [0, 0, this.width, this.height]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([1, 1, 1, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    this.mBackground = new Fail(this.kBackground);

    this.mTextConB = new FontRenderable("Baby");
    this._initText(this.mTextConB, -50, 50, [0.5, 0.5, 0.5, 0.5], 50);

    this.mTextConT = new FontRenderable("Teen");
    this._initText(this.mTextConT, -50, -20, [0.5, 0.5, 0.5, 1], 50);

    this.mTextConA = new FontRenderable("Adult");
    this._initText(this.mTextConA, -50, -90, [0.5, 0.5, 0.5, 1], 50);

    this.mTextConC = new FontRenderable("Extra");
    this._initText(this.mTextConC, -50, -160, [0.5, 0.5, 0.5, 1], 50);

    var sel = new SpriteRenderable(this.kButton);
    sel.setElementPixelPositions(0,64, 0, 64);
    sel.getXform().setSize(64, 64);
    sel.getXform().setPosition(-120, 50);
    this.mS = new GameObject(sel);

};

choose.prototype._initText = function (font, posX, posY, color, textH) {
    font.setColor(color);
    font.getXform().setPosition(posX, posY);
    font.setTextHeight(textH);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
choose.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([1, 1, 1, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    this.mBackground.draw(this.mCamera);
    this.mTextConB.draw(this.mCamera);
    this.mTextConT.draw(this.mCamera);
    this.mTextConA.draw(this.mCamera);
    this.mTextConC.draw(this.mCamera);
    // this.mTextConC.draw(this.mCamera);
    this.mS.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
choose.prototype.update = function () {
    if(this.mS.getXform().getYPos()===this.mTextConB.getXform().getYPos())
    {
        this.mTextConB.setColor([0, 0, 0, 1]);

        if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Down))
        {   this.mS.getXform().setYPos(this.mTextConT.getXform().getYPos());
            this.mTextConB.setColor([0.5, 0.5, 0.5, 1]);
            this.mTextConT.setColor([0, 0, 0, 1]);
            this.mTextConA.setColor([0.5, 0.5, 0.5, 1]);
            this.mTextConC.setColor([0.5, 0.5, 0.5, 1]);
        }
        //start
        else if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Backspace)){
            this.mRestart = true;
            this.tag = 1;
            gEngine.GameLoop.stop();
        }
    }

    else if(this.mS.getXform().getYPos()===this.mTextConT.getXform().getYPos())
    {


        if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)){
            this.mS.getXform().setYPos(this.mTextConB.getXform().getYPos());
            this.mTextConB.setColor([0, 0, 0, 1]);
            this.mTextConT.setColor([0.5, 0.5, 0.5, 1]);
            this.mTextConA.setColor([0.5, 0.5, 0.5, 1]);
            this.mTextConC.setColor([0.5, 0.5, 0.5, 1]);
        }
        else if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Down))
        {
            this.mS.getXform().setYPos(this.mTextConA.getXform().getYPos());
            this.mTextConB.setColor([0.5, 0.5, 0.5, 1]);
            this.mTextConT.setColor([0.5, 0.5, 0.5, 1]);
            this.mTextConA.setColor([0, 0, 0, 1]);
            this.mTextConC.setColor([0.5, 0.5, 0.5, 1]);
        }
        else if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Backspace)){
            this.mRestart = true;
            this.tag = 2;
            gEngine.GameLoop.stop();
        }
    }

    else if(this.mS.getXform().getYPos()===this.mTextConA.getXform().getYPos())
    {


        if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)){
            this.mS.getXform().setYPos(this.mTextConT.getXform().getYPos());
            this.mTextConB.setColor([0.5, 0.5, 0.5, 1]);
            this.mTextConT.setColor([0, 0, 0, 1]);
            this.mTextConA.setColor([0.5, 0.5, 0.5, 1]);
            this.mTextConC.setColor([0.5, 0.5, 0.5, 1]);
        }
        else if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Down))
        {
            this.mS.getXform().setYPos(this.mTextConC.getXform().getYPos());
            this.mTextConB.setColor([0.5, 0.5, 0.5, 1]);
            this.mTextConT.setColor([0.5, 0.5, 0.5, 1]);
            this.mTextConA.setColor([0.5, 0.5, 0.5, 1]);
            this.mTextConC.setColor([0, 0, 0, 1]);
        }
        else if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Backspace)){
            this.mRestart = true;
            this.tag = 3;
            gEngine.GameLoop.stop();
        }
    }

    else if(this.mS.getXform().getYPos()===this.mTextConC.getXform().getYPos())
    {


        if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)){
            this.mS.getXform().setYPos(this.mTextConA.getXform().getYPos());
            this.mTextConB.setColor([0.5, 0.5, 0.5, 1]);
            this.mTextConT.setColor([0.5, 0.5, 0.5, 1]);
            this.mTextConA.setColor([0, 0, 0, 1]);
            this.mTextConC.setColor([0.5, 0.5, 0.5, 1]);
        }
        else if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Backspace)){
            this.mRestart = true;
            this.tag = 4;
            gEngine.GameLoop.stop();
        }
    }

    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Q) || gEngine.Input.isKeyClicked(gEngine.Input.keys.R))
    {
        this.mRestart = true;
        this.tag = 5;
        gEngine.GameLoop.stop();
    }
};