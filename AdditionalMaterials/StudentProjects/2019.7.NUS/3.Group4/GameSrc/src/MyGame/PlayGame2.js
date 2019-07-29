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

function PlayGame2() {    
    // The camera to view the scene
    this.logo1 = "assets//Map2Clues/black.png"
    this.heroLogo = "assets/Map2Clues/player2.png"
    this.logo_item = "assets/Msize.png"
    this.logo_clue = "assets/Map2Clues/clue-yellow.png"
    this.kBg = "assets/bg.png";
    
    this.door = "assets/door.png";
    
    this.bgmusic2 = "assets/bgm/NO2-start-2.mp3";
    this.bgmusic3 = "assets/bgm/NO2-3-end.mp3";
    this.switch_music = 0;

    this.kBgNormal = "assets/bg_normal.png";
    this.kCaption1 = "assets/Map2Clues/openWords.png";
    this.kCaption2 = "assets/Map2Clues/clue1.png";
    this.kCaption3 = "assets/Map2Clues/clue2.png";
    this.kCaption4 = "assets/Map2Clues/clue3.png";
    this.kCaption5 = "assets/Map2Clues/clue4.png";
    this.kCaption6 = "assets/Map2Clues/clue5.png";
    this.kCaption7 = "assets/Map2Clues/clue6.png";
    this.kCaption8 = "assets/Map2Clues/clue7.png";
    this.kCaption9 = "assets/Map2Clues/endWords.png";
    
    this.soundbook = "assets/sound/book.mp3"
    
    
    this.trans1 = "assets/trans-blue.png";
    this.trans2 = "assets/trans-green.png";
    this.trans3 = "assets/trans-grey.png";
    this.trans4 = "assets/trans-orange.png";
    this.trans5 = "assets/trans-purple.png";
    this.trans6 = "assets/trans-red.png";
    this.trans7 = "assets/trans-yellow.png";
    
    
    this.mCamera = null;
    this.msquare1 = null;
    this.msquare2 = null;
    this.msquare3 = null;
    this.msquare4 = null;
    this.msquare5 = null;
    this.msquare6 = null;
    this.msquare7 = null;
    this.msquare8 = null;
    this.msquare9 = null;
    this.msquare10 = null;
    this.msquare11 = null;
    this.msquare12 = null;
    this.msquare13 = null;
    this.msquare14 = null;
    this.msquare15 = null;
    this.msquare16 = null;
    this.msquare17 = null;
    this.msquare18 = null;
    this.msquare19 = null;
    this.msquare20 = null;
    this.msquare21 = null;
    this.msquare22 = null;
    this.msquare23 = null;
    this.msquare24 = null;
    this.msquare25 = null;
    this.msquare26 = null;
    this.msquare27 = null;
    this.msquare28 = null;
    this.msquare29 = null;
    this.msquare30 = null;
    this.msquare31 = null;
    this.msquare32 = null;
    this.msquare33 = null;
    this.msquare34 = null;
    this.msquare35 = null;
    this.msquare36 = null;
    this.msquare37 = null;
    this.msquare38 = null;
    this.msquare39 = null;  
    
        
    this.mBsquare1 = null;
    this.mBsquare2 = null;
    this.mBsquare3 = null;
    this.mBsquare4 = null;

    this.mHero = null;
    this.mItem1 = null; 
    this.mItem2 = null; 
    this.mItem3 = null; 
    this.mItem4 = null;
    this.mItem5 = null; 
    this.mItem6 = null; 
    this.mItem7 = null; 
    this.mItem8 = null; 
    this.mItem9 = null;
    this.mItem10 = null; 
    this.mItem11 = null;
    this.mItem12 = null;
    
    this.mItem1BBox = null;
    this.mItem2BBox = null;
    this.mItem3BBox = null;
    this.mItem4BBox = null;
    this.mItem5BBox = null;
    this.mItem6BBox = null;
    this.mItem7BBox = null;
    this.mItem8BBox = null;
    this.mItem9BBox = null;
    this.mItem10BBox = null;
    this.mItem11BBox = null;
    this.mItem12BBox = null;
    
    this.itemPoint1 = null;
    this.itemPoint2 = null;
    this.itemPoint3 = null;
    this.itemPoint4 = null;
    this.itemPoint5 = null;
    this.itemPoint6 = null;
    this.itemPoint7 = null;

    this.heroLight = null;
    this.heroCamera = null;
    this.mGlobalLightSet = null;
    this.mBg = null;
    
    this.kDelta = 0.18;
    this.deltaV = 0.1;
    this.sDelta = 0.05;
    this.timer = 0;
    
    
    this.mMsg = null;
    this.mPositionMsg = null;
    this.mEverywhereMsg;
    this.mClueMsg = null;
    this.mClueNum = 7;
    this.mStartCaption = null;
    this.mEndCaption = null;
    this.mStartTimer = 120;
    this.mCaptionA = null;
    this.mCaptionB = null;
    this.mCaptionC = null;
    this.mCaptionD = null;
    this.mCaptionE = null;    
    this.mCaptionF = null;
    this.mCaptionG = null;
    
    this.mIsFollow = true;
    this.IsMove = true;
    this.nextScene = "";
    
    this.mBlackScene = null;
    this.mHeroPoint = null;
    this.mEverywhere = null;
    this.foundEntrance = false;
    
    
}

gEngine.Core.inheritPrototype(PlayGame2, Scene);


PlayGame2.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.logo1);
    gEngine.Textures.loadTexture(this.heroLogo);
    gEngine.Textures.loadTexture(this.logo_item);
    gEngine.Textures.loadTexture(this.logo_clue);
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kBgNormal);
    gEngine.Textures.loadTexture(this.kCaption1);
    gEngine.Textures.loadTexture(this.kCaption2);
    gEngine.Textures.loadTexture(this.kCaption3);
    gEngine.Textures.loadTexture(this.kCaption4);
    gEngine.Textures.loadTexture(this.kCaption5);
    gEngine.Textures.loadTexture(this.kCaption6);
    gEngine.Textures.loadTexture(this.kCaption7);
    gEngine.Textures.loadTexture(this.kCaption8);
    gEngine.Textures.loadTexture(this.kCaption9);
    
    gEngine.Textures.loadTexture(this.trans1);    
    gEngine.Textures.loadTexture(this.trans2);   
    gEngine.Textures.loadTexture(this.trans3);
    gEngine.Textures.loadTexture(this.trans4);
    gEngine.Textures.loadTexture(this.trans5);
    gEngine.Textures.loadTexture(this.trans6);
    gEngine.Textures.loadTexture(this.trans7);
    
    gEngine.AudioClips.loadAudio(this.bgmusic2);
    gEngine.AudioClips.loadAudio(this.bgmusic3);
    gEngine.AudioClips.loadAudio(this.soundbook);
    gEngine.Textures.loadTexture(this.door);
//    gEngine.Textures.loadTexture(this.Caption1);
};

PlayGame2.prototype.unloadScene = function () {
    gEngine.AudioClips.stopBackgroundAudio();
//    gEngine.Textures.unloadTexture(this.logo1);
//    gEngine.Textures.unloadTexture(this.kBg);
//    gEngine.Textures.unloadTexture(this.kBgNormal);
//    gEngine.Textures.unloadTexture(this.Caption1);

    //    gEngine.Textures.unloadTexture(this.kLogo);
    if (this.nextScene === "Map3") {
        gEngine.Core.startScene(new PlayGame3());
    } else if (this.nextScene === "Myself") {
        gEngine.Core.startScene(new PlayGame2());
    } else {
        gEngine.Core.startScene(new StartUI());
    }

};

PlayGame2.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 50), // position of the camera
        23,                     // width of camera
        [0, 0, 630, 630]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([1,0.98,0.85,1]);   
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
   
    gEngine.AudioClips.playBackgroundAudio(this.bgmusic2);

    this.msquare1 = new Item(this.logo1);
    this.msquare1.getXform().setPosition(7.5, 5);
    this.msquare1.getXform().setSize(5, 10); 
    
    this.msquare2 = new Item(this.logo1);
    this.msquare2.getXform().setPosition(17.5, 5);
    this.msquare2.getXform().setSize(5, 10);

    this.msquare3 = new Item(this.logo1);
    this.msquare3.getXform().setPosition(28.75, 7.5);
    this.msquare3.getXform().setSize(2.5, 15);

    this.msquare4 = new Item(this.logo1);       
    this.msquare4.getXform().setPosition(37.5, 5);
    this.msquare4.getXform().setSize(5, 10);

    this.msquare5 = new Item(this.logo1);
    this.msquare5.getXform().setPosition(50, 10);
    this.msquare5.getXform().setSize(10, 10);
 
    this.msquare6 = new Item(this.logo1);
    this.msquare6.getXform().setPosition(62.6, 5);
    this.msquare6.getXform().setSize(5, 10);

    this.msquare7 = new Item(this.logo1);
    this.msquare7.getXform().setPosition(72.5, 10);
    this.msquare7.getXform().setSize(5, 10);
    
    this.msquare8 = new Item(this.logo1);
    this.msquare8.getXform().setPosition(82.5, 5);
    this.msquare8.getXform().setSize(5, 10);
    
    this.msquare9 = new Item(this.logo1);
    this.msquare9.getXform().setPosition(92.5, 5);
    this.msquare9.getXform().setSize(5, 10);
    
    this.msquare10 = new Item(this.logo1);
    this.msquare10.getXform().setPosition(38.75, 17.5);
    this.msquare10.getXform().setSize(57.5, 5);
    
    this.msquare11 = new Item(this.logo1);
    this.msquare11.getXform().setPosition(80, 17.5);
    this.msquare11.getXform().setSize(20, 5);
    
    this.msquare12 = new Item(this.logo1);
    this.msquare12.getXform().setPosition(12.5, 30);
    this.msquare12.getXform().setSize(15, 10);
    
    this.msquare13 = new Item(this.logo1);
    this.msquare13.getXform().setPosition(37.5, 30);
    this.msquare13.getXform().setSize(15, 10);
    
    this.msquare14 = new Item(this.logo1);
    this.msquare14.getXform().setPosition(66.25, 30);
    this.msquare14.getXform().setSize(22.5, 15);
    
    this.msquare15 = new Item(this.logo1);
    this.msquare15.getXform().setPosition(85, 60);
    this.msquare15.getXform().setSize(10, 80);
    
    this.msquare16 = new Item(this.logo1);
    this.msquare16.getXform().setPosition(7.5, 52.5);
    this.msquare16.getXform().setSize(5, 15);
    
    this.msquare17 = new Item(this.logo1);
    this.msquare17.getXform().setPosition(17.5, 52.5);
    this.msquare17.getXform().setSize(5, 25);
    
    this.msquare18 = new Item(this.logo1);
    this.msquare18.getXform().setPosition(30, 47.5);
    this.msquare18.getXform().setSize(10, 5);
    
    this.msquare19 = new Item(this.logo1);
    this.msquare19.getXform().setPosition(32.5, 42.5);
    this.msquare19.getXform().setSize(5, 5);
    
    this.msquare20 = new Item(this.logo1);
    this.msquare20.getXform().setPosition(45, 47.5);
    this.msquare20.getXform().setSize(10, 5);
    
    this.msquare21 = new Item(this.logo1);
    this.msquare21.getXform().setPosition(42.5, 42.5);
    this.msquare21.getXform().setSize(5, 5);
    
    this.msquare22 = new Item(this.logo1);
    this.msquare22.getXform().setPosition(32.5, 62.5);
    this.msquare22.getXform().setSize(5, 5);
    
    this.msquare23 = new Item(this.logo1);
    this.msquare23.getXform().setPosition(30, 57.5);
    this.msquare23.getXform().setSize(10, 5);
    
    this.msquare24 = new Item(this.logo1);
    this.msquare24.getXform().setPosition(42.5, 62.5);
    this.msquare24.getXform().setSize(5, 5);
    
    this.msquare25 = new Item(this.logo1);
    this.msquare25.getXform().setPosition(45, 57.5);
    this.msquare25.getXform().setSize(10, 5);
    
    this.msquare26 = new Item(this.logo1);
    this.msquare26.getXform().setPosition(66.25, 41.25);
    this.msquare26.getXform().setSize(22.5, 2.5);
    
    this.msquare27 = new Item(this.logo1);
    this.msquare27.getXform().setPosition(66.25, 88.75);
    this.msquare27.getXform().setSize(22.5, 2.5);
    
    this.msquare28 = new Item(this.logo1);
    this.msquare28.getXform().setPosition(56.25, 65);
    this.msquare28.getXform().setSize(2.5, 45);
    
    this.msquare29 = new Item(this.logo1);
    this.msquare29.getXform().setPosition(76.25, 65);
    this.msquare29.getXform().setSize(2.5, 45);
    
    this.msquare30 = new Item(this.logo1);
    this.msquare30.getXform().setPosition(63.75, 83.75);
    this.msquare30.getXform().setSize(12.5, 7.5);
    
    this.msquare31 = new Item(this.logo1);
    this.msquare31.getXform().setPosition(66.25, 67.5);
    this.msquare31.getXform().setSize(7.5, 15);
    
    this.msquare32 = new Item(this.logo1);
    this.msquare32.getXform().setPosition(68.75, 52.5);
    this.msquare32.getXform().setSize(12.5, 5);
    
    this.msquare33 = new Item(this.logo1);
    this.msquare33.getXform().setPosition(10, 87.5);
    this.msquare33.getXform().setSize(10, 15);
    
    this.msquare34 = new Item(this.logo1);
    this.msquare34.getXform().setPosition(17.5, 85);
    this.msquare34.getXform().setSize(5, 10);
    
    this.msquare35 = new Item(this.logo1);
    this.msquare35.getXform().setPosition(12.5, 72.5);
    this.msquare35.getXform().setSize(15, 5);
    
    this.msquare36 = new Item(this.logo1);
    this.msquare36.getXform().setPosition(35, 90);
    this.msquare36.getXform().setSize(20, 10);
    
    this.msquare37 = new Item(this.logo1);
    this.msquare37.getXform().setPosition(47.5, 97.5);
    this.msquare37.getXform().setSize(45, 5);
    
    this.msquare38 = new Item(this.logo1);
    this.msquare38.getXform().setPosition(37.5, 72.5);
    this.msquare38.getXform().setSize(15, 5);
    
    this.msquare39 = new Item(this.logo1);
    this.msquare39.getXform().setPosition(65, 45);
    this.msquare39.getXform().setSize(5, 5);
    
    this.mBsquare1 = new Renderable();
    this.mBsquare1.getXform().setPosition(-100, 50);
    this.mBsquare1.getXform().setSize(200, 200);
    this.mBsquare1.setColor([0, 0, 0, 1]);
    
    this.mBsquare2 = new Renderable();
    this.mBsquare2.getXform().setPosition(200, 50);
    this.mBsquare2.getXform().setSize(200, 200);
    this.mBsquare2.setColor([0, 0, 0, 1]);
    
    this.mBsquare3 = new Renderable();
    this.mBsquare3.getXform().setPosition(50, 125);
    this.mBsquare3.getXform().setSize(100, 50);
    this.mBsquare3.setColor([0, 0, 0, 1]);
    
    this.mBsquare4 = new Renderable();
    this.mBsquare4.getXform().setPosition(50, -25);
    this.mBsquare4.getXform().setSize(100, 50);
    this.mBsquare4.setColor([0, 0, 0, 1]);
    
    

    this.mHero = new Hero(this.heroLogo);
    this.mHero.getXform().setPosition(95, 95);
    
    this.sq1Bbox = this.msquare1.getBBox();
    this.sq2Bbox = this.msquare2.getBBox();
    this.sq3Bbox = this.msquare3.getBBox();
    this.sq4Bbox = this.msquare4.getBBox();
    this.sq5Bbox = this.msquare5.getBBox();
    this.sq6Bbox = this.msquare6.getBBox();
    this.sq7Bbox = this.msquare7.getBBox();
    this.sq8Bbox = this.msquare8.getBBox();
    this.sq9Bbox = this.msquare9.getBBox();
    this.sq10Bbox = this.msquare10.getBBox();
    this.sq11Bbox = this.msquare11.getBBox();
    this.sq12Bbox = this.msquare12.getBBox();
    this.sq13Bbox = this.msquare13.getBBox();
    this.sq14Bbox = this.msquare14.getBBox();
    this.sq15Bbox = this.msquare15.getBBox();
    this.sq16Bbox = this.msquare16.getBBox();
    this.sq17Bbox = this.msquare17.getBBox();
    this.sq18Bbox = this.msquare18.getBBox();
    this.sq19Bbox = this.msquare19.getBBox();
    this.sq20Bbox = this.msquare20.getBBox();
    this.sq21Bbox = this.msquare21.getBBox();
    this.sq22Bbox = this.msquare22.getBBox();
    this.sq23Bbox = this.msquare23.getBBox();
    this.sq24Bbox = this.msquare24.getBBox();
    this.sq25Bbox = this.msquare25.getBBox();
    this.sq26Bbox = this.msquare26.getBBox();
    this.sq27Bbox = this.msquare27.getBBox();
    this.sq28Bbox = this.msquare28.getBBox();
    this.sq29Bbox = this.msquare29.getBBox();
    this.sq30Bbox = this.msquare30.getBBox();
    this.sq31Bbox = this.msquare31.getBBox();
    this.sq32Bbox = this.msquare32.getBBox();
    this.sq33Bbox = this.msquare33.getBBox();
    this.sq34Bbox = this.msquare34.getBBox();
    this.sq35Bbox = this.msquare35.getBBox();
    this.sq36Bbox = this.msquare36.getBBox();
    this.sq37Bbox = this.msquare37.getBBox();
    this.sq38Bbox = this.msquare38.getBBox();
    this.sq39Bbox = this.msquare39.getBBox();
    
    //道具1
    this.mItem1 = new Item(this.logo_clue);
    this.mItem1.getXform().setXPos(87.5);
    this.mItem1.getXform().setYPos(5);
    
    this.mItem2 = new Item(this.logo_clue);
    this.mItem2.getXform().setXPos(50);
    this.mItem2.getXform().setYPos(2.5);
    
    this.mItem3 = new Item(this.logo_clue);
    this.mItem3.getXform().setXPos(50);
    this.mItem3.getXform().setYPos(52.5);
    
    this.mItem4 = new Item(this.logo_clue);
    this.mItem4.getXform().setXPos(2.5);
    this.mItem4.getXform().setYPos(95);
    
    this.mItem5 = new Item(this.logo_clue);
    this.mItem5.getXform().setXPos(12.5);
    this.mItem5.getXform().setYPos(52.5);
    
    this.mItem6 = new Item(this.logo_clue);
    this.mItem6.getXform().setXPos(17.5);
    this.mItem6.getXform().setYPos(12.5);
    
    this.mItem7 = new Item(this.logo_clue);
    this.mItem7.getXform().setXPos(65);
    this.mItem7.getXform().setYPos(48.75);
    
    this.mItem8 = new Item(this.door);
    this.mItem8.getXform().setXPos(37.5);
    this.mItem8.getXform().setYPos(52.5);
    this.mItem8.getXform().setSize(5,5);
   
    
    this.mItem9 = new Item(this.logo_item);
    this.mItem9.getXform().setXPos(32.5);
    this.mItem9.getXform().setYPos(2.5);
    
    this.mItem10 = new Item(this.logo_item);
    this.mItem10.getXform().setXPos(72.5);
    this.mItem10.getXform().setYPos(85);
    
    this.mItem11 = new Item(this.trans1);
    this.mItem11.getXform().setXPos(23.75);
    this.mItem11.getXform().setYPos(3.75);
    //this.mItem11.getXform().setSize(3.75,3.75);
    this.mItem11.getXform().setSize(7,7);
    
    this.mItem12 = new Item(this.trans2);
    this.mItem12.getXform().setXPos(72.5);
    this.mItem12.getXform().setYPos(46.25);
    //this.mItem12.getXform().setSize(3.75, 3.75);
    this.mItem12.getXform().setSize(7,7);
    
    
    this.mMsg = new FontRenderable("");
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.getXform().setPosition(75, 2);
    this.mMsg.setTextHeight(2);
    
    this.mPositionMsg = new FontRenderable("");
    this.mPositionMsg.setColor([1, 1, 1, 1]);
    this.mPositionMsg.getXform().setPosition(0, 0);
    this.mPositionMsg.setTextHeight(4);
    
    this.mClueMsg = new FontRenderable("");
    this.mClueMsg.setColor([0.97, 0.952, 0.8196, 1]);
    this.mClueMsg.getXform().setPosition(75, 75);
    this.mClueMsg.setTextHeight(3);
    
    this.mEverywhereMsg = new FontRenderable("");
    this.mEverywhereMsg.setColor([1, 1, 1, 1]);
    this.mEverywhereMsg.getXform().setPosition(0, 0);
    this.mEverywhereMsg.setTextHeight(4);
     
    // 光效
    this._initializeLights(this.mHero.getXform().getPosition());
 
    var bgR = new IllumRenderable(this.kBg, this.kBgNormal);
    bgR.setElementPixelPositions(0, 1024, 0, 1024);
    bgR.getXform().setSize(100, 100);
    bgR.getXform().setPosition(50, 50);
    //bgR.getMaterial().setSpecular([1, 0, 0, 1]);
    var i;
    for (i = 0; i < 2; i++) {
        bgR.addLight(this.mGlobalLightSet.getLightAt(i));   // all the lights
    }
    this.mBg = new GameObject(bgR);  

     this.mItem1BBox = this.mItem1.getBBox();
     this.mItem2BBox = this.mItem2.getBBox();
     this.mItem3BBox = this.mItem3.getBBox();
     this.mItem4BBox = this.mItem4.getBBox();
     this.mItem5BBox = this.mItem5.getBBox();
     this.mItem6BBox = this.mItem6.getBBox();
     this.mItem7BBox = this.mItem7.getBBox();
     this.mItem8BBox = this.mItem8.getBBox();
     this.mItem9BBox = this.mItem9.getBBox();
     this.mItem10BBox = this.mItem10.getBBox();
     this.mItem11BBox = this.mItem11.getBBox();
     this.mItem12BBox = this.mItem12.getBBox();
     
     this.mStartCaption = new Caption(this.kCaption1);
     this.mCaptionA = new Caption(this.kCaption2);
     this.mCaptionB = new Caption(this.kCaption3);
     this.mCaptionC = new Caption(this.kCaption4);
     this.mCaptionD = new Caption(this.kCaption5);
     this.mCaptionE = new Caption(this.kCaption6);
     this.mCaptionF = new Caption(this.kCaption7);
     this.mCaptionG = new Caption(this.kCaption8);
     this.mEndCaption = new Caption(this.kCaption9);

     var c = [0.95, 0.92, 0.18, 1];
     this.itemPoint1 = new ItemPoint(87.5, 5);
     this.itemPoint2 = new ItemPoint(50, 2.5);
     this.itemPoint3 = new ItemPoint(50, 52.5);
     this.itemPoint4 = new ItemPoint(2.5, 95);
     this.itemPoint5 = new ItemPoint(12.5, 52.5);
     this.itemPoint6 = new ItemPoint(25.5, 8.5);
     this.itemPoint7 = new ItemPoint(70, 45);
     this.itemPoint1.item.setColor(c);
     this.itemPoint2.item.setColor(c);
     this.itemPoint3.item.setColor(c);
     this.itemPoint4.item.setColor(c);
     this.itemPoint5.item.setColor(c);
     this.itemPoint6.item.setColor(c);
     this.itemPoint7.item.setColor(c);

     
     // For the function of key "v"
     this.mBlackScene = new Renderable();
     this.mBlackScene.setColor([0,0,,1]);
     this.mBlackScene.getXform().setPosition(50, 50);
     this.mBlackScene.getXform().setSize(0,0);
     
     this.mHeroPoint = new Renderable();
     this.mHeroPoint.setColor([0.95, 0.92, 0.97, 1]);
     this.mHeroPoint.getXform().setPosition(50, 50);
     this.mHeroPoint.getXform().setRotationInRad(0.78); // In Radians
     this.mHeroPoint.getXform().setSize(0,0);
     
     
     this.mEverywhere = new Renderable();
     this.mEverywhere.setColor([0.86, 0.34, 0.12, 1]);
     this.mEverywhere.getXform().setPosition(37.5, 52.5);
     this.mEverywhere.getXform().setRotationInRad(0); // In Radians
     this.mEverywhere.getXform().setSize(0,0);
     
};

PlayGame2.prototype._createALight = function (type, pos, dir, color, n, f, inner, outer, intensity, dropOff) {
    var light = new Light();
    light.setLightType(type);
    light.setColor(color);
    light.setXPos(this.mHero.getXform().getXPos());
    light.setYPos(this.mHero.getXform().getYPos());      
    light.setZPos(pos[2]);
    light.setDirection(dir);
    light.setNear(n);
    light.setFar(f);
    light.setInner(inner);
    light.setOuter(outer);
    light.setIntensity(intensity);
    light.setDropOff(dropOff);
    return light;
};

PlayGame2.prototype._initializeLights = function (posHero) {
    this.mGlobalLightSet = new LightSet();

    var l = this._createALight(Light.eLightType.ePointLight,
            [posHero[0], posHero[1], 5],         // position
            [0, 0, -1],          // Direction 
            [1.5, 1.5, 1.5, 1.6],  // some color
            8, 10,               // near and far distances
            0.1, 0.2,            // inner and outer cones
            5,                   // intensity
            0.1                 // drop off
            );
    this.mGlobalLightSet.addToSet(l);
    
    var p = this._createALight(Light.eLightType.ePointLight,
            [posHero[0], posHero[1], 5],         // position
            [0, 0, -1],          // Direction 
            [-0.3, -0.3, -1, -0.2],  // some color
            10, 20,               // near and far distances
            0.1, 0.2,            // inner and outer cones
            8,                   // intensity
            0.1                 // drop off
            );
    this.mGlobalLightSet.addToSet(p);
};


PlayGame2.prototype._modify = function (xpos, ypos){
    this.mGlobalLightSet[0].setXPos(xpos);
    this.mGlobalLightSet[0].setYPos(ypos);
};


PlayGame2.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    
    this.mCamera.setupViewProjection();
    this.mBg.draw(this.mCamera);
    this.msquare1.draw(this.mCamera);
    this.msquare2.draw(this.mCamera);
    this.msquare3.draw(this.mCamera);
    this.msquare4.draw(this.mCamera);
    this.msquare5.draw(this.mCamera);
    this.msquare6.draw(this.mCamera);
    this.msquare7.draw(this.mCamera);
    this.msquare8.draw(this.mCamera);    
    this.msquare9.draw(this.mCamera);
    this.msquare10.draw(this.mCamera);
    this.msquare11.draw(this.mCamera);
    this.msquare12.draw(this.mCamera);
    this.msquare13.draw(this.mCamera);
    this.msquare14.draw(this.mCamera);
    this.msquare15.draw(this.mCamera);
    this.msquare16.draw(this.mCamera);
    this.msquare17.draw(this.mCamera);
    this.msquare18.draw(this.mCamera);
    this.msquare19.draw(this.mCamera);
    this.msquare20.draw(this.mCamera);
    this.msquare21.draw(this.mCamera);
    this.msquare22.draw(this.mCamera);
    this.msquare23.draw(this.mCamera);
    this.msquare24.draw(this.mCamera);
    this.msquare25.draw(this.mCamera);
    this.msquare26.draw(this.mCamera);
    this.msquare27.draw(this.mCamera);
    this.msquare28.draw(this.mCamera);
    this.msquare29.draw(this.mCamera);
    this.msquare30.draw(this.mCamera);
    this.msquare31.draw(this.mCamera);
    this.msquare32.draw(this.mCamera);
    this.msquare33.draw(this.mCamera);
    this.msquare34.draw(this.mCamera);
    this.msquare35.draw(this.mCamera);
    this.msquare36.draw(this.mCamera);
    this.msquare37.draw(this.mCamera);
    this.msquare38.draw(this.mCamera);
    this.msquare39.draw(this.mCamera);
    
    this.mBsquare1.draw(this.mCamera);
    this.mBsquare2.draw(this.mCamera);
    this.mBsquare3.draw(this.mCamera);
    this.mBsquare4.draw(this.mCamera);
    
    
    this.mItem1.draw(this.mCamera);
    this.mItem2.draw(this.mCamera); 
    this.mItem3.draw(this.mCamera);
    this.mItem4.draw(this.mCamera);
    this.mItem5.draw(this.mCamera);
    this.mItem6.draw(this.mCamera);
    this.mItem7.draw(this.mCamera); 
    this.mItem8.draw(this.mCamera);
    this.mItem9.draw(this.mCamera);
    this.mItem10.draw(this.mCamera);
    this.mItem11.draw(this.mCamera);
    this.mItem12.draw(this.mCamera);
   
    this.mHero.draw(this.mCamera);
    
    this.mStartCaption.draw(this.mCamera);
    this.mCaptionA.draw(this.mCamera);
    this.mCaptionB.draw(this.mCamera);
    this.mCaptionC.draw(this.mCamera);
    this.mCaptionD.draw(this.mCamera);
    this.mCaptionE.draw(this.mCamera);
    this.mCaptionF.draw(this.mCamera);
    this.mCaptionG.draw(this.mCamera);

    this.mEndCaption.draw(this.mCamera);    
    this.mBlackScene.draw(this.mCamera);
    this.mHeroPoint.draw(this.mCamera);
    this.mEverywhere.draw(this.mCamera);

    this.itemPoint1.item.draw(this.mCamera);
    this.itemPoint2.item.draw(this.mCamera);
    this.itemPoint3.item.draw(this.mCamera);
    this.itemPoint4.item.draw(this.mCamera);
    this.itemPoint5.item.draw(this.mCamera);
    this.itemPoint6.item.draw(this.mCamera);
    this.itemPoint7.item.draw(this.mCamera);
    this.mEverywhere.draw(this.mCamera);
    
    this.mMsg.draw(this.mCamera);
    this.mPositionMsg.draw(this.mCamera);
    this.mClueMsg.draw(this.mCamera);
    this.mEverywhereMsg.draw(this.mCamera);
    
};

// This function will judge if the hero is the indicated circle
PlayGame2.prototype.judgeArea = function(posX, posY, radius) {
    var heroX = this.mHero.getXform().getXPos();
    var heroY = this.mHero.getXform().getYPos();
    
    var distance = (heroX-posX)*(heroX-posX) + (heroY-posY)*(heroY-posY);   
    if (radius*radius > distance) {
        return 1;
    }
}

PlayGame2.prototype.switchCamera = function(toBig) {
    
    // from small to big
    if ((toBig == true) && (this.mCamera.getWCWidth() < 40)) {
        // camera don't follow the hero
        this.mIsFollow = false;
        this.mCamera.setWCCenter(50,50);
        if (this.mCamera.getWCWidth() <= 90) {
           this.mCamera.setWCWidth(100);
        }
    // from big to small
    } else if ((toBig == false) && (this.mCamera.getWCWidth() > 80)) {
        this.mCamera.setWCCenter(this.mHero.getXform().getXPos(), this.mHero.getXform().getYPos()); 
        this.mCamera.setWCWidth(25);
        // camera start following the hero
        this.mIsFollow = true;
    }
}

PlayGame2.prototype.showItemPoint= function() {
    if (this.itemPoint1.isFound) {
        this.itemPoint1.item.getXform().setSize(2, 2);
    }
    if (this.itemPoint2.isFound) {
        this.itemPoint2.item.getXform().setSize(2, 2);
    }
    if (this.itemPoint3.isFound) {
        this.itemPoint3.item.getXform().setSize(2, 2);
    }
    if (this.itemPoint4.isFound) {
        this.itemPoint4.item.getXform().setSize(2, 2);
    }
    if (this.itemPoint5.isFound == true) {
        this.itemPoint5.item.getXform().setSize(2, 2);
    }
    if (this.itemPoint6.isFound == true) {
        this.itemPoint6.item.getXform().setSize(2, 2);
    }
    if (this.itemPoint7.isFound == true) {
        this.itemPoint7.item.getXform().setSize(2, 2);
    }    

}


PlayGame2.prototype.closeItemPoint= function() {
    
    this.itemPoint1.item.getXform().setSize(0, 0);
    this.itemPoint2.item.getXform().setSize(0, 0);
    this.itemPoint3.item.getXform().setSize(0, 0);
    this.itemPoint4.item.getXform().setSize(0, 0);
    this.itemPoint5.item.getXform().setSize(0, 0);
    this.itemPoint6.item.getXform().setSize(0, 0);
    this.itemPoint7.item.getXform().setSize(0, 0);
    
}


PlayGame2.prototype.addColor = function() {
    var c = this.mHeroPoint.getColor();
    c[2] -= 0.12;
    this.mHeroPoint.setColor(c);
}

PlayGame2.prototype.update = function () {
    this.mCamera.update();
    this.mHero.update();
    //this.mBg.update();
    
    
    // 如果到了第四个线索，那么切换背景音乐
    if(this.mClueNum === 4 && this.switch_music === 0){
        gEngine.AudioClips.stopBackgroundAudio();
        gEngine.AudioClips.playBackgroundAudio(this.bgmusic3);
        this.switch_music = 1;
    }
    
    
    var xform = this.mHero.getXform();
    if (this.IsMove == true) {
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W) && this.mHero.getXform().getYPos() <= 98) {
            xform.incYPosBy(this.kDelta);
            var hBbox = this.mHero.getBBox();

            if(hBbox.intersectsBound(this.sq1Bbox) ||
                    hBbox.intersectsBound(this.sq2Bbox) ||
                    hBbox.intersectsBound(this.sq3Bbox) ||
                    hBbox.intersectsBound(this.sq4Bbox) ||
                    hBbox.intersectsBound(this.sq5Bbox) ||
                    hBbox.intersectsBound(this.sq6Bbox) ||
                    hBbox.intersectsBound(this.sq7Bbox) ||
                    hBbox.intersectsBound(this.sq8Bbox) ||
                    hBbox.intersectsBound(this.sq9Bbox) ||
                    hBbox.intersectsBound(this.sq10Bbox) ||
                    hBbox.intersectsBound(this.sq11Bbox) ||
                    hBbox.intersectsBound(this.sq12Bbox) ||
                    hBbox.intersectsBound(this.sq13Bbox) ||
                    hBbox.intersectsBound(this.sq14Bbox) ||
                    hBbox.intersectsBound(this.sq15Bbox) ||
                    hBbox.intersectsBound(this.sq16Bbox) ||
                    hBbox.intersectsBound(this.sq17Bbox) ||
                    hBbox.intersectsBound(this.sq18Bbox) ||
                    hBbox.intersectsBound(this.sq19Bbox) ||
                    hBbox.intersectsBound(this.sq20Bbox) ||
                    hBbox.intersectsBound(this.sq21Bbox) ||
                    hBbox.intersectsBound(this.sq22Bbox) ||
                    hBbox.intersectsBound(this.sq23Bbox) ||
                    hBbox.intersectsBound(this.sq24Bbox) ||
                    hBbox.intersectsBound(this.sq25Bbox) ||
                    hBbox.intersectsBound(this.sq26Bbox) ||
                    hBbox.intersectsBound(this.sq27Bbox) ||
                    hBbox.intersectsBound(this.sq28Bbox) ||
                    hBbox.intersectsBound(this.sq29Bbox) ||
                    hBbox.intersectsBound(this.sq30Bbox) ||
                    hBbox.intersectsBound(this.sq31Bbox) ||
                    hBbox.intersectsBound(this.sq32Bbox) ||
                    hBbox.intersectsBound(this.sq33Bbox) ||
                    hBbox.intersectsBound(this.sq34Bbox) ||
                    hBbox.intersectsBound(this.sq35Bbox) ||
                    hBbox.intersectsBound(this.sq36Bbox) ||
                    hBbox.intersectsBound(this.sq37Bbox) ||
                    hBbox.intersectsBound(this.sq38Bbox) ||
                    hBbox.intersectsBound(this.sq39Bbox) ||
                    hBbox.intersectsBound(this.mItem8BBox)
                    ){
                xform.incYPosBy(-this.kDelta);      
            }
            this.mGlobalLightSet.getLightAt(0).setXPos(this.mHero.getXform().getXPos());
            this.mGlobalLightSet.getLightAt(0).setYPos(this.mHero.getXform().getYPos());
            this.mGlobalLightSet.getLightAt(1).setXPos(this.mHero.getXform().getXPos());
            this.mGlobalLightSet.getLightAt(1).setYPos(this.mHero.getXform().getYPos());

        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S) && this.mHero.getXform().getYPos() >= 2) {
            xform.incYPosBy(-this.kDelta);

            var hBbox = this.mHero.getBBox();

            if(hBbox.intersectsBound(this.sq1Bbox) ||
                    hBbox.intersectsBound(this.sq2Bbox) ||
                    hBbox.intersectsBound(this.sq3Bbox) ||
                    hBbox.intersectsBound(this.sq4Bbox) ||
                    hBbox.intersectsBound(this.sq5Bbox) ||
                    hBbox.intersectsBound(this.sq6Bbox) ||
                    hBbox.intersectsBound(this.sq7Bbox) ||
                    hBbox.intersectsBound(this.sq8Bbox) ||
                    hBbox.intersectsBound(this.sq9Bbox) ||
                    hBbox.intersectsBound(this.sq10Bbox) ||
                    hBbox.intersectsBound(this.sq11Bbox) ||
                    hBbox.intersectsBound(this.sq12Bbox) ||
                    hBbox.intersectsBound(this.sq13Bbox) ||
                    hBbox.intersectsBound(this.sq14Bbox) ||
                    hBbox.intersectsBound(this.sq15Bbox) ||
                    hBbox.intersectsBound(this.sq16Bbox) ||
                    hBbox.intersectsBound(this.sq17Bbox) ||
                    hBbox.intersectsBound(this.sq18Bbox) ||
                    hBbox.intersectsBound(this.sq19Bbox) ||
                    hBbox.intersectsBound(this.sq20Bbox) ||
                    hBbox.intersectsBound(this.sq21Bbox) ||
                    hBbox.intersectsBound(this.sq22Bbox) ||
                    hBbox.intersectsBound(this.sq23Bbox) ||
                    hBbox.intersectsBound(this.sq24Bbox) ||
                    hBbox.intersectsBound(this.sq25Bbox) ||
                    hBbox.intersectsBound(this.sq26Bbox) ||
                    hBbox.intersectsBound(this.sq27Bbox) ||
                    hBbox.intersectsBound(this.sq28Bbox) ||
                    hBbox.intersectsBound(this.sq29Bbox) ||
                    hBbox.intersectsBound(this.sq30Bbox) ||
                    hBbox.intersectsBound(this.sq31Bbox) ||
                    hBbox.intersectsBound(this.sq32Bbox) ||
                    hBbox.intersectsBound(this.sq33Bbox) ||
                    hBbox.intersectsBound(this.sq34Bbox) ||
                    hBbox.intersectsBound(this.sq35Bbox) ||
                    hBbox.intersectsBound(this.sq36Bbox) ||
                    hBbox.intersectsBound(this.sq37Bbox) ||
                    hBbox.intersectsBound(this.sq38Bbox) ||
                    hBbox.intersectsBound(this.sq39Bbox) ||
                    hBbox.intersectsBound(this.mItem8BBox)
                    ){
                xform.incYPosBy(this.kDelta);      
            }
            this.mGlobalLightSet.getLightAt(0).setXPos(this.mHero.getXform().getXPos());
            this.mGlobalLightSet.getLightAt(0).setYPos(this.mHero.getXform().getYPos());
            this.mGlobalLightSet.getLightAt(1).setXPos(this.mHero.getXform().getXPos());
            this.mGlobalLightSet.getLightAt(1).setYPos(this.mHero.getXform().getYPos());

        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A) && this.mHero.getXform().getXPos() >= 2) {
            xform.incXPosBy(-this.kDelta);

            var hBbox = this.mHero.getBBox();

            if(hBbox.intersectsBound(this.sq1Bbox) ||
                    hBbox.intersectsBound(this.sq2Bbox) ||
                    hBbox.intersectsBound(this.sq3Bbox) ||
                    hBbox.intersectsBound(this.sq4Bbox) ||
                    hBbox.intersectsBound(this.sq5Bbox) ||
                    hBbox.intersectsBound(this.sq6Bbox) ||
                    hBbox.intersectsBound(this.sq7Bbox) ||
                    hBbox.intersectsBound(this.sq8Bbox) ||
                    hBbox.intersectsBound(this.sq9Bbox) ||
                    hBbox.intersectsBound(this.sq10Bbox) ||
                    hBbox.intersectsBound(this.sq11Bbox) ||
                    hBbox.intersectsBound(this.sq12Bbox) ||
                    hBbox.intersectsBound(this.sq13Bbox) ||
                    hBbox.intersectsBound(this.sq14Bbox) ||
                    hBbox.intersectsBound(this.sq15Bbox) ||
                    hBbox.intersectsBound(this.sq16Bbox) ||
                    hBbox.intersectsBound(this.sq17Bbox) ||
                    hBbox.intersectsBound(this.sq18Bbox) ||
                    hBbox.intersectsBound(this.sq19Bbox) ||
                    hBbox.intersectsBound(this.sq20Bbox) ||
                    hBbox.intersectsBound(this.sq21Bbox) ||
                    hBbox.intersectsBound(this.sq22Bbox) ||
                    hBbox.intersectsBound(this.sq23Bbox) ||
                    hBbox.intersectsBound(this.sq24Bbox) ||
                    hBbox.intersectsBound(this.sq25Bbox) ||
                    hBbox.intersectsBound(this.sq26Bbox) ||
                    hBbox.intersectsBound(this.sq27Bbox) ||
                    hBbox.intersectsBound(this.sq28Bbox) ||
                    hBbox.intersectsBound(this.sq29Bbox) ||
                    hBbox.intersectsBound(this.sq30Bbox) ||
                    hBbox.intersectsBound(this.sq31Bbox) ||
                    hBbox.intersectsBound(this.sq32Bbox) ||
                    hBbox.intersectsBound(this.sq33Bbox) ||
                    hBbox.intersectsBound(this.sq34Bbox) ||
                    hBbox.intersectsBound(this.sq35Bbox) ||
                    hBbox.intersectsBound(this.sq36Bbox) ||
                    hBbox.intersectsBound(this.sq37Bbox) ||
                    hBbox.intersectsBound(this.sq38Bbox) ||
                    hBbox.intersectsBound(this.sq39Bbox) ||
                    hBbox.intersectsBound(this.mItem8BBox)                 
                    ){
                xform.incXPosBy(this.kDelta);      
            }
            this.mGlobalLightSet.getLightAt(0).setXPos(this.mHero.getXform().getXPos());
            this.mGlobalLightSet.getLightAt(0).setYPos(this.mHero.getXform().getYPos());
            this.mGlobalLightSet.getLightAt(1).setXPos(this.mHero.getXform().getXPos());
            this.mGlobalLightSet.getLightAt(1).setYPos(this.mHero.getXform().getYPos());
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D) && this.mHero.getXform().getXPos() <= 98) {
            xform.incXPosBy(this.kDelta);

            var hBbox = this.mHero.getBBox();
            if(hBbox.intersectsBound(this.sq1Bbox) ||
                    hBbox.intersectsBound(this.sq2Bbox) ||
                    hBbox.intersectsBound(this.sq3Bbox) ||
                    hBbox.intersectsBound(this.sq4Bbox) ||
                    hBbox.intersectsBound(this.sq5Bbox) ||
                    hBbox.intersectsBound(this.sq6Bbox) ||
                    hBbox.intersectsBound(this.sq7Bbox) ||
                    hBbox.intersectsBound(this.sq8Bbox) ||
                    hBbox.intersectsBound(this.sq9Bbox) ||
                    hBbox.intersectsBound(this.sq10Bbox) ||
                    hBbox.intersectsBound(this.sq11Bbox) ||
                    hBbox.intersectsBound(this.sq12Bbox) ||
                    hBbox.intersectsBound(this.sq13Bbox) ||
                    hBbox.intersectsBound(this.sq14Bbox) ||
                    hBbox.intersectsBound(this.sq15Bbox) ||
                    hBbox.intersectsBound(this.sq16Bbox) ||
                    hBbox.intersectsBound(this.sq17Bbox) ||
                    hBbox.intersectsBound(this.sq18Bbox) ||
                    hBbox.intersectsBound(this.sq19Bbox) ||
                    hBbox.intersectsBound(this.sq20Bbox) ||
                    hBbox.intersectsBound(this.sq21Bbox) ||
                    hBbox.intersectsBound(this.sq22Bbox) ||
                    hBbox.intersectsBound(this.sq23Bbox) ||
                    hBbox.intersectsBound(this.sq24Bbox) ||
                    hBbox.intersectsBound(this.sq25Bbox) ||
                    hBbox.intersectsBound(this.sq26Bbox) ||
                    hBbox.intersectsBound(this.sq27Bbox) ||
                    hBbox.intersectsBound(this.sq28Bbox) ||
                    hBbox.intersectsBound(this.sq29Bbox) ||
                    hBbox.intersectsBound(this.sq30Bbox) ||
                    hBbox.intersectsBound(this.sq31Bbox) ||
                    hBbox.intersectsBound(this.sq32Bbox) ||
                    hBbox.intersectsBound(this.sq33Bbox) ||
                    hBbox.intersectsBound(this.sq34Bbox) ||
                    hBbox.intersectsBound(this.sq35Bbox) ||
                    hBbox.intersectsBound(this.sq36Bbox) ||
                    hBbox.intersectsBound(this.sq37Bbox) ||
                    hBbox.intersectsBound(this.sq38Bbox) ||
                    hBbox.intersectsBound(this.sq39Bbox) ||
                    hBbox.intersectsBound(this.mItem8BBox)
                    ){
                xform.incXPosBy(-this.kDelta);      
            }
            this.mGlobalLightSet.getLightAt(0).setXPos(this.mHero.getXform().getXPos());
            this.mGlobalLightSet.getLightAt(0).setYPos(this.mHero.getXform().getYPos());
            this.mGlobalLightSet.getLightAt(1).setXPos(this.mHero.getXform().getXPos());
            this.mGlobalLightSet.getLightAt(1).setYPos(this.mHero.getXform().getYPos());
        }
    }
    
    
    

    var hBbox = this.mHero.getBBox();
    if(hBbox.intersectsBound(this.mItem1BBox)){
        this.mItem1.getXform().setXPos(-100);
        this.mItem1.getXform().setYPos(-100);
        this.mItem1BBox = this.mItem1.getBBox();
    }
 
    if(hBbox.intersectsBound(this.mItem2BBox)){
        this.mItem2.getXform().setXPos(-100);
        this.mItem2.getXform().setYPos(-100);
        this.mItem2BBox = this.mItem2.getBBox();
    }
    
    if(hBbox.intersectsBound(this.mItem3BBox)){
//        this.mGlobalLightSet.getLightAt(0).setIntensity(7);
//        this.mGlobalLightSet.getLightAt(0).setFar(15);
        this.mItem3.getXform().setXPos(-100);
        this.mItem3.getXform().setYPos(-100);
        this.mItem3BBox = this.mItem3.getBBox();
    }
    
    if(hBbox.intersectsBound(this.mItem4BBox)){
//        this.mGlobalLightSet.getLightAt(0).setIntensity(3);
//        this.mGlobalLightSet.getLightAt(0).setNear(3)
//        this.mGlobalLightSet.getLightAt(0).setFar(8);
        this.mItem4.getXform().setXPos(-100);
        this.mItem4.getXform().setYPos(-100);
        this.mItem4BBox = this.mItem4.getBBox();
    }
   
    if(hBbox.intersectsBound(this.mItem5BBox)){     
        this.mItem5.getXform().setXPos(-100);
        this.mItem5.getXform().setYPos(-100);
        this.mItem5BBox = this.mItem5.getBBox();
    }
    
    if(hBbox.intersectsBound(this.mItem6BBox)){     
        this.mItem6.getXform().setXPos(-100);
        this.mItem6.getXform().setYPos(-100);
        this.mItem6BBox = this.mItem6.getBBox();
    }
    
    if(hBbox.intersectsBound(this.mItem7BBox)){     
        this.mItem7.getXform().setXPos(-100);
        this.mItem7.getXform().setYPos(-100);
        this.mItem7BBox = this.mItem7.getBBox();
    }
    
//    if(hBbox.intersectsBound(this.mItem8BBox)){     
//        this.mItem8.getXform().setXPos(-100);
//        this.mItem8.getXform().setYPos(-100);
//        this.mItem8BBox = this.mItem8.getBBox();
//    }
   
    // 9 10 11 12 是道具，应该重复使用
    
    // 99999999999999999999999999999999  变小
    var size = this.mHero.getXform().getSize();
    
    if (this.judgeArea(32.5, 2.5, 1.2) && size[0] > 1.55) {
        this.IsMove = false;
        this.timer += 1;
        if(this.timer <= 30){
            var size = this.mHero.getXform().getSize();
            var orix = size[0];
            var oriy = size[1];
            orix -= this.sDelta;
            oriy -= this.sDelta;
            if(orix >= 1.5 && oriy >= 1.5){
                this.mHero.getXform().setSize(orix, oriy);
                this.mHeroBBox = this.mHero.getBBox();
            }
        }else{
            this.IsMove = true;
            this.timer = 0;
        }
    }else if(this.judgeArea(32.5, 2.5, 1.2) && !(size[0] > 1.55)){
        this.IsMove = true;
        this.timer = 0;
    }
    
    // 1010101010101010101010101010101010101010 变小
    if (this.judgeArea(72.5, 85, 1.2) && size[0] > 1.55) {
        this.IsMove = false;
        this.timer += 1;
        if(this.timer <= 30){
            var size = this.mHero.getXform().getSize();
            var orix = size[0];
            var oriy = size[1];
            orix -= this.sDelta;
            oriy -= this.sDelta;
            if(orix >= 1.5 && oriy >= 1.5){
                this.mHero.getXform().setSize(orix, oriy);
                this.mHeroBBox = this.mHero.getBBox();
            }
        }else{
            this.IsMove = true;
            this.timer = 0;
        }
    }else if(this.judgeArea(72.5, 85, 1.2) && !(size[0] > 1.55)){
        this.IsMove = true;
        this.timer = 0;
    }

    
//    if(hBbox.intersectsBound(this.mItem11BBox)){  
//        this.mHero.getXform().setSize(3, 3);
//        this.mHero.getXform().setXPos(60);
//        this.mHero.getXform().setYPos(45);
////        this.mItem11.getXform().setXPos(-100);
////        this.mItem11.getXform().setYPos(-100);
//        this.mItem11BBox = this.mItem11.getBBox();
//    }
   
    // 1111111111111111111111111111111111111111111 顺移
    
    if (this.judgeArea(23.75, 3.75, 1.2)) {
        this.IsMove = false;
        this.timer += 1;
        if(size[0] >= 0.1){
            var size = this.mHero.getXform().getSize();
            var orix = size[0];
            var oriy = size[1];        
            orix -= this.sDelta;
            oriy -= this.sDelta;
                        
            if(orix >= 0.05 && oriy >= 0.05){
                this.mHero.getXform().setSize(orix, oriy);
                this.mHeroBBox = this.mHero.getBBox();
            }          
        }else if(this.judgeArea(23.75, 3.75, 1.2) && (size[0] < 0.10)){
            //this.IsMove = true;
            this.timer = 0;
            this.mHero.getXform().setXPos(60);
            this.mHero.getXform().setYPos(45);            
        }
    }
    
    if(this.judgeArea(60, 45, 2) && size[0] < 2.95 && this.IsMove === false){
        this.timer += 1;
        if(this.timer <= 30){
            var size = this.mHero.getXform().getSize();
            var orix = size[0];
            var oriy = size[1];   
            orix += 2 * this.sDelta;
            oriy += 2 * this.sDelta;
            
            if(orix <= 3.0 && oriy <= 3.0){
                this.mHero.getXform().setSize(orix, oriy);
                this.mHeroBBox = this.mHero.getBBox();
            }          
        }
    }else if(this.judgeArea(60, 45, 2) && !(size[0] < 2.95)){
        this.IsMove = true;
    }
     
    
//    if(hBbox.intersectsBound(this.mItem12BBox)){
//        this.mHero.getXform().setSize(3, 3);
//        this.mHero.getXform().setXPos(50);
//        this.mHero.getXform().setYPos(30);
////        this.mItem12.getXform().setXPos(-100);
////        this.mItem12.getXform().setYPos(-100);
//        this.mItem12BBox = this.mItem12.getBBox();
//    }
    //1212121212121212212121212121212121212 瞬移
//    if (this.judgeArea(73.5, 45, 1.2)) {
//        this.IsMove = false;
//        this.timer += 1;
//        if(this.timer <= 30){
//            var size = this.mHero.getXform().getSize();
//            var orix = size[0];
//            var oriy = size[1];
//            orix -= this.sDelta;
//            oriy -= this.sDelta;
//            if(orix >= 0.05 && oriy >= 0.05){
//                this.mHero.getXform().setSize(orix, oriy);
//                this.mHeroBBox = this.mHero.getBBox();
//            }          
//        }else if(this.judgeArea(73.5, 45, 1.2) && (size[0] < 0.10)){
//            this.IsMove = true;
//            this.timer = 0;
//            this.mHero.getXform().setXPos(50);
//            this.mHero.getXform().setYPos(30);
//            
//        }
//    }
//    
//    if(this.judgeArea(50, 30, 4) && size[0] < 2.95){
//        this.timer += 1;
//        if(this.timer <= 30){
//            var size = this.mHero.getXform().getSize();
//            var orix = size[0];
//            var oriy = size[1];
//            orix += this.sDelta;
//            oriy += this.sDelta;
//            orix += this.sDelta;
//            oriy += this.sDelta;
//            if(orix <= 3.0 && oriy <= 3.0){
//                this.mHero.getXform().setSize(orix, oriy);
//                this.mHeroBBox = this.mHero.getBBox();
//            }          
//        }
//    }
    
    if (this.judgeArea(72.5, 46.25, 1.2)) {
        this.IsMove = false;
        this.timer += 1;
        if(size[0] >= 0.1){
            var size = this.mHero.getXform().getSize();
            var orix = size[0];
            var oriy = size[1];        
            orix -= this.sDelta;
            oriy -= this.sDelta;
                        
            if(orix >= 0.05 && oriy >= 0.05){
                this.mHero.getXform().setSize(orix, oriy);
                this.mHeroBBox = this.mHero.getBBox();
            }          
        }else if(this.judgeArea(72.5, 46.25, 1.2) && (size[0] < 0.10)){
            //this.IsMove = true;
            this.timer = 0;
            this.mHero.getXform().setXPos(50);
            this.mHero.getXform().setYPos(30);            
        }
    }
    
    if(this.judgeArea(50, 30, 2) && size[0] < 2.95 && this.IsMove === false){
        this.timer += 1;
        if(this.timer <= 30){
            var size = this.mHero.getXform().getSize();
            var orix = size[0];
            var oriy = size[1];   
            orix += 2 * this.sDelta;
            oriy += 2 * this.sDelta;
            
            if(orix <= 3.0 && oriy <= 3.0){
                this.mHero.getXform().setSize(orix, oriy);
                this.mHeroBBox = this.mHero.getBBox();
            }          
        }
    }else if(this.judgeArea(50, 30, 2) && !(size[0] < 2.95)){
        this.IsMove = true;
    }
     
    

    if (gEngine.Input.isButtonPressed(gEngine.Input.mouseButton.Middle)) {
        gEngine.GameLoop.stop();   
    }
    
    // press V to follow
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.V)) { 
        //if (this.mCamera.getWCWidth() == 100) {
            this.switchCamera(false); 
            this.mBlackScene.getXform().setSize(0,0);
            this.mEverywhere.getXform().setSize(0,0);
            this.mHeroPoint.getXform().setSize(0,0);
            this.IsMove = true;
            this.mClueMsg.setText("");
            this.mMsg.setText("");
            this.mPositionMsg.setText("");
            this.mEverywhereMsg.setText("");
            
            this.closeItemPoint();

        //}
    }
    
    // press V to pause
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.V)) {
        if (this.mCamera.getWCWidth() < 90 ) {
            this.switchCamera(true); 
            this.mBlackScene.getXform().setSize(100,100);
            this.mHeroPoint.getXform().setPosition(this.mHero.getXform().getXPos(), this.mHero.getXform().getYPos());   
            this.mHeroPoint.getXform().setSize(4,4);
            this.mMsg.setText("- Click V to close - ");
            this.mMsg.setTextHeight(2);
            this.mMsg.getXform().setPosition(75,2);
            this.mPositionMsg.getXform().setPosition(this.mHero.getXform().getXPos()-3.5, this.mHero.getXform().getYPos()+0.6);
            this.mPositionMsg.setText("- You -");
            this.mPositionMsg.setTextHeight(2);
            this.mClueMsg.setText("- Lost memories:" + this.mClueNum + " -");
            this.mClueMsg.setTextHeight(2.2);
            this.mClueMsg.getXform().setPosition(4, 2);
         
            // For everywhere
            if (this.foundEntrance) {
                this.mEverywhereMsg.setText("Exit");
                this.mEverywhereMsg.getXform().setPosition(36.5, 52.5);
                this.mEverywhereMsg.setTextHeight(2);
                this.mEverywhere.getXform().setPosition(37.5,52.5);
                this.mEverywhere.getXform().setSize(3,3);
            }
            
            this.IsMove = false;
            this.showItemPoint();
        }
    }
//    
    // follow the camera or not 
    if (this.mIsFollow == true) {
        this.mCamera.setWCCenter(this.mHero.getXform().getXPos(), this.mHero.getXform().getYPos());
    }
    
    // For the Start Caption
    if (this.judgeArea(95, 95, 3) && (this.mStartCaption.isRead == false)) {
        this.mStartCaption.mCaption1.getXform().setSize(100,100);
        this.switchCamera(true);
        this.IsMove = false;
        this.mStartCaption.isRead = true;
    }
    
    if ((this.mStartTimer > 0) && (this.mStartCaption.isRead == true)) {
        this.mStartTimer --;
        if (this.mStartTimer == 0) {
            this.mStartCaption.mCaption1.getXform().setSize(0, 0);     
            this.switchCamera(false); 
            this.IsMove = true; 
        }
    }
    
    // For the Caption A
    if (this.judgeArea(87.5, 5, 1.8) && (this.mCaptionA.isRead == false)) {
        this.mCaptionA.mCaption1.getXform().setSize(100,100);
        this.switchCamera(true);
        this.IsMove = false;
        this.mCaptionA.isRead = true;
        this.mMsg.setText("- Click Enter to close - ");
        this.mMsg.setTextHeight(2);
        this.mMsg.getXform().setPosition(70,2);
        
        this.mClueNum --;
        this.addColor();
        this.itemPoint1.isFound = true;
        gEngine.AudioClips.playACue(this.soundbook);
    }
 
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter) && (this.mCaptionA.isRead == true)) {
        this.mCaptionA.mCaption1.getXform().setSize(0, 0);     
        this.switchCamera(false); 
        this.IsMove = true; 
        this.mMsg.setText("");
    }
    
    // For the Caption B
    if (this.judgeArea(50, 2.5, 1.8) && (this.mCaptionB.isRead == false)) {
        this.mCaptionB.mCaption1.getXform().setSize(100,100);
        this.switchCamera(true);    
        this.IsMove = false;
        this.mCaptionB.isRead = true;
        this.mMsg.setText("- Click Enter to close - ");
        this.mMsg.setTextHeight(2);
        this.mMsg.getXform().setPosition(70,2);
        this.mClueNum --;
        this.addColor();
        this.itemPoint2.isFound = true;
        gEngine.AudioClips.playACue(this.soundbook);
        
    }
        
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter) && (this.mCaptionB.isRead == true)) {
        this.mCaptionB.mCaption1.getXform().setSize(0, 0);     
        this.switchCamera(false); 
        this.IsMove = true; 
        this.mMsg.setText("");
    }
    
    
    // For the Caption C
    if (this.judgeArea(50, 52.5, 1.8) && (this.mCaptionC.isRead == false)) {
        this.mCaptionC.mCaption1.getXform().setSize(120,120);
        this.switchCamera(true);    
        this.IsMove = false;
        this.mCaptionC.isRead = true;
        this.mMsg.setText("- Click Enter to close - ");
        this.mMsg.setTextHeight(2);
        this.mMsg.getXform().setPosition(70,2);
        this.mClueNum --;
        this.addColor();
        this.itemPoint3.isFound = true;
        gEngine.AudioClips.playACue(this.soundbook);
    }
        
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter) && (this.mCaptionC.isRead == true)) {
        this.mCaptionC.mCaption1.getXform().setSize(0, 0);     
        this.switchCamera(false); 
        this.IsMove = true;
        this.mMsg.setText("");
    }
   
    // For the Caption D
    if (this.judgeArea(2.5, 95, 1.8) && (this.mCaptionD.isRead == false)) {
        this.mCaptionD.mCaption1.getXform().setSize(100,100);
        this.switchCamera(true);    
        this.IsMove = false;
        this.mCaptionD.isRead = true;
        this.mMsg.setText("- Click Enter to close - ");
        this.mMsg.setTextHeight(2);
        this.mMsg.getXform().setPosition(70,2);
        this.mClueNum --;
        this.addColor();        
        this.itemPoint4.isFound = true;
        gEngine.AudioClips.playACue(this.soundbook);


    }
        
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter) && (this.mCaptionD.isRead == true)) {
        this.mCaptionD.mCaption1.getXform().setSize(0, 0);     
        this.switchCamera(false); 
        this.IsMove = true; 
        this.mMsg.setText("");
    }
    
    // For the Caption E 6
    if (this.judgeArea(12.5, 52.5, 1.8) && (this.mCaptionE.isRead == false)) {
        this.mCaptionE.mCaption1.getXform().setSize(100,100);
        this.switchCamera(true);    
        this.IsMove = false;
        this.mCaptionE.isRead = true;
        this.mMsg.setText("- Click Enter to close - ");
        this.mMsg.setTextHeight(2);
        this.mMsg.getXform().setPosition(70,2);
        this.mClueNum --;
        this.addColor();
        this.itemPoint5.isFound = true;

        gEngine.AudioClips.playACue(this.soundbook);
    }
        
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter) && (this.mCaptionE.isRead == true)) {
        this.mCaptionE.mCaption1.getXform().setSize(0, 0);     
        this.switchCamera(false); 
        this.IsMove = true; 
        this.mMsg.setText("");
    }
    
    // For the Caption F
    if (this.judgeArea(17.5, 12.5, 1.8) && (this.mCaptionF.isRead == false)) {
        this.mCaptionF.mCaption1.getXform().setSize(100,100);
        this.switchCamera(true);    
        this.IsMove = false;
        this.mCaptionF.isRead = true;

        this.mMsg.setText("- Click Enter to close - ");
        this.mMsg.setTextHeight(2);
        this.mMsg.getXform().setPosition(70,2);
        this.mClueNum --;
        this.addColor();
        this.itemPoint6.isFound = true;
        gEngine.AudioClips.playACue(this.soundbook);
    }
        
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter) && (this.mCaptionF.isRead == true)) {
        this.mCaptionF.mCaption1.getXform().setSize(0, 0);     
        this.switchCamera(false); 
        this.IsMove = true;
        this.mMsg.setText("");
    }
  
    // For the Caption G
    if (this.judgeArea(65, 48.75, 1.8) && (this.mCaptionG.isRead == false)) {
        this.mCaptionG.mCaption1.getXform().setSize(100,100);
        this.switchCamera(true);    
        this.IsMove = false;
        this.mCaptionG.isRead = true;
        this.mMsg.setText("- Click Enter to close - ");
        this.mMsg.setTextHeight(2);
        this.mMsg.getXform().setPosition(70,2);
        this.mClueNum --;
        this.addColor();
        this.itemPoint7.isFound = true;
        gEngine.AudioClips.playACue(this.soundbook);
    }
        
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter) && (this.mCaptionG.isRead == true)) {
        this.mCaptionG.mCaption1.getXform().setSize(0, 0);     
        this.switchCamera(false); 
        this.IsMove = true; 
        this.mMsg.setText("");
    }
  

    
    
    // if meet the entrance
    if (this.judgeArea(37.5, 52.5, 5) && (this.mEndCaption.isRead == false)) {
        this.foundEntrance = true;
        if ((this.mCaptionA.isRead) && (this.mCaptionB.isRead) && (this.mCaptionC.isRead) && (this.mCaptionD.isRead) && (this.mCaptionE.isRead)
                && (this.mCaptionF.isRead) && (this.mCaptionG.isRead)) {
            this.mEndCaption.mCaption1.getXform().setSize(100,100);
            this.switchCamera(true);    
            this.IsMove = false;
            this.mEndCaption.isRead = true;
        // if haven't collected all of clues
        } else {
            this.mMsg.getXform().setPosition(this.mHero.getXform().getXPos()-10, this.mHero.getXform().getYPos());
            this.mMsg.setText("I forget something"); 
            this.mMsg.setTextHeight(1.2);
        }    
    }
   
   
   // When this level is finished
   if (this.mEndCaption.isRead && gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter)) {
       this.nextScene = "Map3";
       gEngine.GameLoop.stop();
   }
   

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
        this.nextScene = "Myself";
        gEngine.GameLoop.stop();
    }
   
   // This is used to show the current mouse position.
    //var msg = " X=" + gEngine.Input.getMousePosX()/6.3 + " Y=" + gEngine.Input.getMousePosY()/6.3;
//    var color = this.mHero.getRenderable().getColor();
//    var msg = "nmsl" + color[0] + "nmsl" + color[1] + "nmsl" + color[2] + "nmsl" + color[3];
//        this.mMsg.setText(msg); 
//        this.mMsg.getXform().setPosition(50,2);        
};
