"use strict";

MyMenu.eAssets = Object.freeze({
    MenuBackgroundTexture: "assets/menu/MenuBackground.png",
    MenuTitleTexture: "assets/menu/title.png",
    MenuHelpTexture: "assets/menu/help.png",
    MenuAboutTexture: "assets/menu/about.png",
    MenuButton1Texture: "assets/menu/button1.png",
    MenuButton2Texture: "assets/menu/button2.png",
    MenuButton3Texture: "assets/menu/button3.png",
    MenuMarkTexture: "assets/menu/opArrow.png"
});

function MyMenu(game) {
    this.mGame = game;

    this.mTitle = null;
    this.mButton1 = null;
    this.mButton2 = null;
    this.mButton3 = null;
    this.mMark = null;
    this.mhelp = null;
    this.mAbout = null;

    this.option = 0;
    this.mLevelBackground = null;
    this.mCamera = null;
    
    this.msPosX;
    this.msPosY;

    this.kBgm = "assets/sounds/bgm_1.mp3";

    // Coordinate Systems (Copied from MyGame for simplicity, can change this)
    this.kWCWidth = 200;
    this.kViewportWidth = 1600;
    this.kViewportHeight = 800;
    this.kWCHeight = this.kViewportHeight * (this.kWCWidth / this.kViewportWidth);

}
gEngine.Core.inheritPrototype(MyMenu, Scene);

MyMenu.prototype.loadScene = function(sceneParams) {
    // load Textures
    gEngine.Textures.loadTexture(MyMenu.eAssets.MenuBackgroundTexture);
    gEngine.Textures.loadTexture(MyMenu.eAssets.MenuTitleTexture);
    gEngine.Textures.loadTexture(MyMenu.eAssets.MenuHelpTexture);
    gEngine.Textures.loadTexture(MyMenu.eAssets.MenuAboutTexture);
    gEngine.Textures.loadTexture(MyMenu.eAssets.MenuButton1Texture);
    gEngine.Textures.loadTexture(MyMenu.eAssets.MenuButton2Texture);
    gEngine.Textures.loadTexture(MyMenu.eAssets.MenuButton3Texture);
    gEngine.Textures.loadTexture(MyMenu.eAssets.MenuMarkTexture);

    gEngine.AudioClips.loadAudio(this.kBgm);
};

MyMenu.prototype.unloadScene = function() {
    // unload Textures
    gEngine.Textures.unloadTexture(MyMenu.eAssets.MenuBackgroundTexture);
    gEngine.Textures.unloadTexture(MyMenu.eAssets.MenuTitleTexture);
    gEngine.Textures.unloadTexture(MyMenu.eAssets.MenuHelpTexture);
    gEngine.Textures.unloadTexture(MyMenu.eAssets.MenuAboutTexture);
    gEngine.Textures.unloadTexture(MyMenu.eAssets.MenuButton1Texture);
    gEngine.Textures.unloadTexture(MyMenu.eAssets.MenuButton2Texture);
    gEngine.Textures.unloadTexture(MyMenu.eAssets.MenuButton3Texture);
    gEngine.Textures.unloadTexture(MyMenu.eAssets.MenuMarkTexture);

    gEngine.AudioClips.unloadAudio(this.kBgm);
    gEngine.AudioClips.stopBackgroundAudio();

    var skyRandom = Game.random(0, 2.99);
    var placeRandom = Game.random(0, 2.99);
    var bgmRandom = Game.random(0, 5.99);

    var nextLevel = new SceneA(this.mGame, placeRandom, skyRandom, bgmRandom);
    gEngine.Core.startScene(nextLevel);
    this.mGame.mCurrentScene = nextLevel;
};

MyMenu.prototype.initialize = function() {
    this.mLevelBackground = new LevelBackground(MyMenu.eAssets.MenuBackgroundTexture); // with parameter for the background Texture

    this.mCamera = new Camera( // camera setup copied from MyGame.js for simplicity, can change this
        [0, 0],		 // position of the camera
        this.kWCWidth,		// width of camera
        [0, 0, this.kViewportWidth, this.kViewportHeight] 	// viewport (orgX, orgY, width, height)
    );

    this.mTitle = new TextureRenderable(MyMenu.eAssets.MenuTitleTexture);
    this.mTitle.setColorArray([1, 1, 1, 1]);
    this.mTitle.getXform().setPosition(0, 20);
    this.mTitle.getXform().setSize(120, 30);

    this.mButton1 = new TextureRenderable(MyMenu.eAssets.MenuButton1Texture);
    this.mButton1.setColorArray([1, 1, 1, 0]);
    this.mButton1.getXform().setPosition(0, 0);
    this.mButton1.getXform().setSize(80, 20);

    this.mButton2 = new TextureRenderable(MyMenu.eAssets.MenuButton2Texture);
    this.mButton2.setColorArray([1, 1, 1, 0]);
    this.mButton2.getXform().setPosition(0, -20);
    this.mButton2.getXform().setSize(80, 20);
    
    this.mButton3 = new TextureRenderable(MyMenu.eAssets.MenuButton3Texture);
    this.mButton3.setColorArray([1, 1, 1, 0]);
    this.mButton3.getXform().setPosition(0, -40);
    this.mButton3.getXform().setSize(80, 20);

    this.mMark = new TextureRenderable(MyMenu.eAssets.MenuMarkTexture);
    this.mMark.setColorArray([0, 0, 0, 1]);
    this.mMark.getXform().setPosition(-40, 0);
    this.mMark.getXform().setSize(8, 2);

    this.mhelp = new TextureRenderable(MyMenu.eAssets.MenuHelpTexture);
    this.mhelp.getXform().setPosition(0, 100);
    this.mhelp.getXform().setSize(80, 80);
    
    this.mAbout = new TextureRenderable(MyMenu.eAssets.MenuAboutTexture);
    this.mAbout.getXform().setPosition(0, 100);
    this.mAbout.getXform().setSize(80, 80);

    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
};

MyMenu.prototype.update = function() {
    if (gEngine.AudioClips.isBackgroundAudioPlaying() === false)
        gEngine.AudioClips.playBackgroundAudio(this.kBgm);

    this.keyControl();

    var delta = -3;
    switch (this.option) {
        case 0: {
            this.mButton2.getXform().setSize(80, 20);
            this.mButton1.getXform().setSize(120, 30);
            this.mButton3.getXform().setSize(80, 20);
            this.mMark.getXform().setPosition(-40, 1);
            break;
        }
        case 1: {
            this.mButton1.getXform().setSize(80, 20);
            this.mButton2.getXform().setSize(120, 30);
            this.mButton3.getXform().setSize(80, 20);
            this.mMark.getXform().setPosition(-20, -19);
            break;
        }
        case 2: {
            this.mButton1.getXform().setSize(80, 20);
            this.mButton2.getXform().setSize(80, 20);
            this.mButton3.getXform().setSize(120, 30);
            this.mMark.getXform().setPosition(-20, -39);
            break;    
        }
        case 3: {
            this.mButton1.getXform().setSize(80, 20);
            this.mButton2.getXform().setSize(80, 20);
            this.mButton2.getXform().setSize(80, 20);
            if (this.mhelp.getXform().getYPos() > 0) {
                this.mhelp.getXform().incYPosBy(delta);
            }
            break;    
        }
        default: {
            this.mButton1.getXform().setSize(80, 20);
            this.mButton2.getXform().setSize(80, 20);
            this.mButton2.getXform().setSize(80, 20);
            if (this.mAbout.getXform().getYPos() > 0) {
                this.mAbout.getXform().incYPosBy(delta);
            }
            break;
        }
    }
};

MyMenu.prototype.keyControl = function () {
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
        // test code for scene switching
        if (this.option === 3) {
            this.option = 1;
            this.mhelp.getXform().setPosition(0, 100);
        }
        else if(this.option === 4)
        {
            this.option = 2;
            this.mAbout.getXform().setPosition(0, 100);
        }
    }
    
    if (this.mCamera.isMouseInViewport()) {
        this.msPosX = this.mCamera.mouseWCX();
        this.msPosY = this.mCamera.mouseWCY();
        if (gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)){
            if (this.option === 3) {
                this.option = 1;
                this.mhelp.getXform().setPosition(0, 100);
            }
            else if(this.option === 4)
            {
                this.option = 2;
                this.mAbout.getXform().setPosition(0, 100);
            }
            else if (this.option === 1) {
                this.option = 3;
            }
            else if (this.option === 2) {
                this.option = 4;
            }
            else if (this.option === 0) {
                gEngine.GameLoop.stop();
            }
        }
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.W) || gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)) {
        if(this.option === 1)
            this.option = 0;
        else if(this.option === 2)
            this.option = 1;
    }
    else if(this.option !== 3 && this.option !== 4 && this.mCamera.isMouseInViewport() && this.msPosX >= -40 && this.msPosX <= 40
            && this.msPosY >= -10 && this.msPosY <= 10){
        this.option = 0;
    }
    else if (gEngine.Input.isKeyClicked(gEngine.Input.keys.S) || gEngine.Input.isKeyClicked(gEngine.Input.keys.Down)) {
        if(this.option === 0)
            this.option = 1;
        else if(this.option === 1)
            this.option = 2;
    }
    else if(this.option !== 3 && this.option !== 4 && this.mCamera.isMouseInViewport() && this.msPosX >= -40 && this.msPosX <= 40
            && this.msPosY >= -35 && this.msPosY <= -15){
        this.option = 1;
    }
    else if(this.option !== 3 && this.option !== 4 && this.mCamera.isMouseInViewport() && this.msPosX >= -40 && this.msPosX <= 40
            && this.msPosY >= -60 && this.msPosY <= -40){
        this.option = 2;
    }
    else if ((gEngine.Input.isKeyClicked(gEngine.Input.keys.Space) || gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter)) && this.option === 1) {
        this.option = 3;
    }
        
    if((gEngine.Input.isKeyPressed(gEngine.Input.keys.Space) || gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter))&& this.option === 2) {
        this.option = 4;
    }
    if ((gEngine.Input.isKeyPressed(gEngine.Input.keys.Space) || gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter))&& this.option === 0) {
        gEngine.GameLoop.stop();
    }
};

MyMenu.prototype.draw = function() {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    this.mCamera.setupViewProjection(); // activate drawing camera

    // draw all SplashScreen GameObjects
    // draw LevelBackground
    this.mLevelBackground.draw(this.mCamera);
    this.mTitle.draw(this.mCamera);
    this.mButton1.draw(this.mCamera);
    this.mButton2.draw(this.mCamera);
    this.mButton3.draw(this.mCamera);
    this.mTitle.draw(this.mCamera);
    this.mMark.draw(this.mCamera);
    this.mhelp.draw(this.mCamera);
    this.mAbout.draw(this.mCamera);
};
