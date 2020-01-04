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

function PlayGame3() {    
    // The camera to view the scene
    this.logo1 = "assets/Map3Clues/black.png"
    this.heroLogo = "assets/Map3Clues/play3.png"
    this.logo_item = "assets/Msize.png"
    this.logo_clue = "assets/Map3Clues/clue-red.png"
    this.kBg = "assets/bg.png";
    
    this.bgmusic = "assets/bgm/NO3-start-5.mp3";
    this.bgmusic2 = "assets/bgm/NO3-6-end.mp3";
    this.soundbook = "assets/sound/book.mp3"
    this.door = "assets/door.png";

    this.kBgNormal = "assets/bg_normal.png";
    this.kCaption1 = "assets/Map3Clues/openWords.png";
    this.kCaption2 = "assets/Map3Clues/clue1.png";
    this.kCaption3 = "assets/Map3Clues/clue2.png";
    this.kCaption4 = "assets/Map3Clues/clue3.png";
    this.kCaption5 = "assets/Map3Clues/clue4.png";
    this.kCaption6 = "assets/Map3Clues/clue5.png";
    this.kCaption7 = "assets/Map3Clues/clue6.png";
    this.kCaption8 = "assets/Map3Clues/clue7.png";
    this.kCaption9 = "assets/Map3Clues/clue8.png";
    this.kCaption10 = "assets/Map3Clues/clue9.png";
    this.kCaption11 = "assets/Map3Clues/endWords.png";
    
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
    this.msquare40 = null;
    this.msquare41 = null;
    this.msquare42 = null;
    this.msquare43 = null;
    this.msquare44 = null;
    this.msquare45 = null;
    this.msquare46 = null;
    this.msquare47 = null;
    this.msquare48 = null;
    this.msquare49 = null;
    this.msquare50 = null;
    this.msquare51 = null;
    this.msquare52 = null;
    this.msquare53 = null;
    this.msquare54 = null;
    this.msquare55 = null;
    this.msquare56 = null;
    this.msquare57 = null;
    this.msquare58 = null;
    this.msquare59 = null;
    this.msquare60 = null;
    this.msquare61 = null;
    
        
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
    this.mItem13 = null;
    this.mItem14 = null; 
    this.mItem15 = null;
    this.mItem16 = null; 
    this.mItem17 = null;
    this.mItem18 = null;
    this.mItem19 = null;
    this.mItem20 = null;
    
    this.itemPoint1 = null;
    this.itemPoint2 = null;
    this.itemPoint3 = null;
    this.itemPoint4 = null;
    this.itemPoint5 = null;
    this.itemPoint6 = null;
    this.itemPoint7 = null;
    this.itemPoint8 = null;
    
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
    this.mItem13BBox = null;
    this.mItem14BBox = null;
    this.mItem15BBox = null;
    this.mItem16BBox = null;
    this.mItem17BBox = null;
    this.mItem18BBox = null;
    this.mItem19BBox = null;
    this.mItem20BBox = null;

     
    this.heroLight = null;
    this.heroCamera = null;
    this.mGlobalLightSet = null;
    this.mBg = null;
    
    this.kDelta = 0.18;
    this.deltaV = 0.1;
    
    
    this.mMsg = null;
    this.mPositionMsg = null;
    this.mClueMsg = null;
    this.mEverywhereMsg;
    this.mClueNum = 9;
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
    this.mCaptionH = null;    
    this.mCaptionI = null;
    this.mIsFollow = true;
    this.IsMove = true;
    this.nextScene = "";
    this.timer = 0;
    this.sDelta = 0.05;
    
    this.mBlackScene = null;
    this.mHeroPoint = null;
    this.mEverywhere = null;
    this.foundEntrance = false;
    
    this.switch_music = 0;
}

gEngine.Core.inheritPrototype(PlayGame3, Scene);


PlayGame3.prototype.loadScene = function () {
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
    gEngine.Textures.loadTexture(this.kCaption10);
    gEngine.Textures.loadTexture(this.kCaption11);
    gEngine.Textures.loadTexture(this.door);
    gEngine.Textures.loadTexture(this.trans1);
    gEngine.Textures.loadTexture(this.trans2);
    gEngine.Textures.loadTexture(this.trans3);
    gEngine.Textures.loadTexture(this.trans4);
    gEngine.Textures.loadTexture(this.trans5);
    gEngine.Textures.loadTexture(this.trans6);
    gEngine.Textures.loadTexture(this.trans7);

    
    gEngine.AudioClips.loadAudio(this.bgmusic);    
    gEngine.AudioClips.loadAudio(this.bgmusic2);
    gEngine.AudioClips.loadAudio(this.soundbook);

//    gEngine.Textures.loadTexture(this.Caption1);
};

PlayGame3.prototype.unloadScene = function () {
    gEngine.AudioClips.stopBackgroundAudio();
//    gEngine.Textures.unloadTexture(this.logo1);
//    gEngine.Textures.unloadTexture(this.kBg);
//    gEngine.Textures.unloadTexture(this.kBgNormal);
//    gEngine.Textures.unloadTexture(this.Caption1);

    //    gEngine.Textures.unloadTexture(this.kLogo);
    if (this.nextScene === "Map4") {
        gEngine.Core.startScene(new PlayGame4());
    } else if (this.nextScene === "Myself") {
        gEngine.Core.startScene(new PlayGame3());
    } else {
        gEngine.Core.startScene(new StartUI());
    }

};

PlayGame3.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 50), // position of the camera
        25,                     // width of camera
        [0, 0, 630, 630]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([1,0.98,0.85,1]);   
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
   
    gEngine.AudioClips.playBackgroundAudio(this.bgmusic);
  
    
    this.msquare1 = new Item(this.logo1);
    this.msquare1.getXform().setPosition(2.5, 50);
    this.msquare1.getXform().setSize(5, 100); 
    
    this.msquare2 = new Item(this.logo1);
    this.msquare2.getXform().setPosition(30, 97.5);
    this.msquare2.getXform().setSize(50, 5);

    this.msquare3 = new Item(this.logo1);
    this.msquare3.getXform().setPosition(46.26, 90);
    this.msquare3.getXform().setSize(17.5, 10);

    this.msquare4 = new Item(this.logo1);       
    this.msquare4.getXform().setPosition(22.5, 83.75);
    this.msquare4.getXform().setSize(5, 12.5);

    this.msquare5 = new Item(this.logo1);
    this.msquare5.getXform().setPosition(12.5, 78.75);
    this.msquare5.getXform().setSize(15, 2.5);
 
    this.msquare6 = new Item(this.logo1);
    this.msquare6.getXform().setPosition(35, 78.75);
    this.msquare6.getXform().setSize(20, 2.5);

    this.msquare7 = new Item(this.logo1);
    this.msquare7.getXform().setPosition(43.75, 62.5);
    this.msquare7.getXform().setSize(2.5, 30);
    
    this.msquare8 = new Item(this.logo1);
    this.msquare8.getXform().setPosition(22.5, 71.25);
    this.msquare8.getXform().setSize(10, 2.5);
    
    this.msquare9 = new Item(this.logo1);
    this.msquare9.getXform().setPosition(10, 63.75);
    this.msquare9.getXform().setSize(5, 7.5);
    
    this.msquare10 = new Item(this.logo1);
    this.msquare10.getXform().setPosition(22.5, 63.75);
    this.msquare10.getXform().setSize(15, 7.5);
    
    this.msquare11 = new Item(this.logo1);
    this.msquare11.getXform().setPosition(35, 63.75);
    this.msquare11.getXform().setSize(5, 7.5);
    
    this.msquare12 = new Item(this.logo1);
    this.msquare12.getXform().setPosition(22.5, 55);
    this.msquare12.getXform().setSize(15, 5);
    
    this.msquare13 = new Item(this.logo1);
    this.msquare13.getXform().setPosition(33.75, 48.75);
    this.msquare13.getXform().setSize(17.5, 2.5);
    
    this.msquare14 = new Item(this.logo1);
    this.msquare14.getXform().setPosition(47.5, 48.75);
    this.msquare14.getXform().setSize(5, 2.5);
    
    this.msquare15 = new Item(this.logo1);
    this.msquare15.getXform().setPosition(52.5, 61.25);
    this.msquare15.getXform().setSize(5, 47.5);
    
    this.msquare16 = new Item(this.logo1);
    this.msquare16.getXform().setPosition(13.75, 43.75);
    this.msquare16.getXform().setSize(17.5, 12.5);
    
    this.msquare17 = new Item(this.logo1);
    this.msquare17.getXform().setPosition(25, 32.5);
    this.msquare17.getXform().setSize(5, 20);
    
    this.msquare18 = new Item(this.logo1);
    this.msquare18.getXform().setPosition(38.75, 40);
    this.msquare18.getXform().setSize(22.5, 5);
    
    this.msquare19 = new Item(this.logo1);
    this.msquare19.getXform().setPosition(30, 23.75);
    this.msquare19.getXform().setSize(5, 2.5);
    
    this.msquare20 = new Item(this.logo1);
    this.msquare20.getXform().setPosition(31.25, 30);
    this.msquare20.getXform().setSize(2.5, 10);
    
    this.msquare21 = new Item(this.logo1);
    this.msquare21.getXform().setPosition(40, 33.75);
    this.msquare21.getXform().setSize(15, 2.5);
    
    this.msquare22 = new Item(this.logo1);
    this.msquare22.getXform().setPosition(48.75, 21.25);
    this.msquare22.getXform().setSize(2.5, 27.5);
    
    this.msquare23 = new Item(this.logo1);
    this.msquare23.getXform().setPosition(40, 28.75);
    this.msquare23.getXform().setSize(10, 2.5);
    
    this.msquare24 = new Item(this.logo1);
    this.msquare24.getXform().setPosition(37.5, 21.25);
    this.msquare24.getXform().setSize(5, 2.5);
    
    this.msquare25 = new Item(this.logo1);
    this.msquare25.getXform().setPosition(42.5, 22.5);
    this.msquare25.getXform().setSize(5, 5);
    
    this.msquare26 = new Item(this.logo1);
    this.msquare26.getXform().setPosition(43.75, 12.5);
    this.msquare26.getXform().setSize(2.5, 15);
    
    this.msquare27 = new Item(this.logo1);
    this.msquare27.getXform().setPosition(31.25, 15);
    this.msquare27.getXform().setSize(2.5, 15);
    
    this.msquare28 = new Item(this.logo1);
    this.msquare28.getXform().setPosition(33.75, 16.25);
    this.msquare28.getXform().setSize(2.5, 2.5);
    
    this.msquare29 = new Item(this.logo1);
    this.msquare29.getXform().setPosition(37.5, 15);
    this.msquare29.getXform().setSize(5, 5);
    
    this.msquare30 = new Item(this.logo1);
    this.msquare30.getXform().setPosition(36.25, 8.75);
    this.msquare30.getXform().setSize(7.5, 2.5);
    
    this.msquare31 = new Item(this.logo1);
    this.msquare31.getXform().setPosition(25, 12.5);
    this.msquare31.getXform().setSize(5, 15);
    
    this.msquare32 = new Item(this.logo1);
    this.msquare32.getXform().setPosition(12.5, 31.25);
    this.msquare32.getXform().setSize(10, 2.5);
    
    this.msquare33 = new Item(this.logo1);
    this.msquare33.getXform().setPosition(16.25, 27.5);
    this.msquare33.getXform().setSize(2.5, 5);
    
    this.msquare34 = new Item(this.logo1);
    this.msquare34.getXform().setPosition(13.75, 26.25);
    this.msquare34.getXform().setSize(2.5, 2.5);
    
    this.msquare35 = new Item(this.logo1);
    this.msquare35.getXform().setPosition(8.75, 21.25);
    this.msquare35.getXform().setSize(2.5, 17.5);
    
    this.msquare36 = new Item(this.logo1);
    this.msquare36.getXform().setPosition(15, 18.75);
    this.msquare36.getXform().setSize(5, 7.5);
    
    this.msquare37 = new Item(this.logo1);
    this.msquare37.getXform().setPosition(16.25, 13.75);
    this.msquare37.getXform().setSize(2.5, 2.5);
    
    this.msquare38 = new Item(this.logo1);
    this.msquare38.getXform().setPosition(12.5, 10);
    this.msquare38.getXform().setSize(10, 5);
    
    this.msquare39 = new Item(this.logo1);
    this.msquare39.getXform().setPosition(50, 2.5);
    this.msquare39.getXform().setSize(90, 5);
    
    this.msquare40 = new Item(this.logo1);
    this.msquare40.getXform().setPosition(60, 23.75);
    this.msquare40.getXform().setSize(10, 37.5);
    
    this.msquare41 = new Item(this.logo1);
    this.msquare41.getXform().setPosition(75, 6.25);
    this.msquare41.getXform().setSize(10, 2.5);
    
    this.msquare42 = new Item(this.logo1);
    this.msquare42.getXform().setPosition(82.5, 10);
    this.msquare42.getXform().setSize(5, 10);
    
    this.msquare43 = new Item(this.logo1);
    this.msquare43.getXform().setPosition(86.25, 12.5);
    this.msquare43.getXform().setSize(2.5, 5);
    
    this.msquare44 = new Item(this.logo1);
    this.msquare44.getXform().setPosition(72.5, 16.25);
    this.msquare44.getXform().setSize(5, 7.5);
    
    this.msquare45 = new Item(this.logo1);
    this.msquare45.getXform().setPosition(67.5, 21.25);
    this.msquare45.getXform().setSize(5, 2.5);
    
    this.msquare46 = new Item(this.logo1);
    this.msquare46.getXform().setPosition(75, 31.25);
    this.msquare46.getXform().setSize(10, 22.5);
    
    this.msquare47 = new Item(this.logo1);
    this.msquare47.getXform().setPosition(85, 40);
    this.msquare47.getXform().setSize(10, 5);
    
    this.msquare48 = new Item(this.logo1);
    this.msquare48.getXform().setPosition(85, 30);
    this.msquare48.getXform().setSize(10, 5);
    
    this.msquare49 = new Item(this.logo1);
    this.msquare49.getXform().setPosition(87.5, 21.25);
    this.msquare49.getXform().setSize(15, 2.5);
    
    this.msquare50 = new Item(this.logo1);
    this.msquare50.getXform().setPosition(97.5, 26.25);
    this.msquare50.getXform().setSize(5, 52.5);
    
    this.msquare51 = new Item(this.logo1);
    this.msquare51.getXform().setPosition(62.5, 45);
    this.msquare51.getXform().setSize(5, 5);
    
    this.msquare52 = new Item(this.logo1);
    this.msquare52.getXform().setPosition(77.5, 50);
    this.msquare52.getXform().setSize(35, 5);
    
    this.msquare53 = new Item(this.logo1);
    this.msquare53.getXform().setPosition(77.5, 58.75);
    this.msquare53.getXform().setSize(35, 2.5);
    
    this.msquare54 = new Item(this.logo1);
    this.msquare54.getXform().setPosition(97.5, 76.25);
    this.msquare54.getXform().setSize(5, 37.5);
    
    this.msquare55 = new Item(this.logo1);
    this.msquare55.getXform().setPosition(80, 67.5);
    this.msquare55.getXform().setSize(30, 5);
    
    this.msquare56 = new Item(this.logo1);
    this.msquare56.getXform().setPosition(62.5, 80);
    this.msquare56.getXform().setSize(5, 30);
    
    this.msquare57 = new Item(this.logo1);
    this.msquare57.getXform().setPosition(80, 86.25);
    this.msquare57.getXform().setSize(20, 7.5);
    
    this.msquare58 = new Item(this.logo1);
    this.msquare58.getXform().setPosition(82.5, 80);
    this.msquare58.getXform().setSize(5, 5);
    
    this.msquare59 = new Item(this.logo1);
    this.msquare59.getXform().setPosition(82.5, 76.25);
    this.msquare59.getXform().setSize(20, 2.5);
    
    this.msquare60 = new Item(this.logo1);
    this.msquare60.getXform().setPosition(80, 97.5);
    this.msquare60.getXform().setSize(40, 5);
    
    this.msquare61 = new Item(this.logo1);
    this.msquare61.getXform().setPosition(36.25, 25);
    this.msquare61.getXform().setSize(2.5, 5);
    
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
    this.mHero.getXform().setPosition(57.5, 97.5);
    
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
    this.sq40Bbox = this.msquare40.getBBox();
    this.sq41Bbox = this.msquare41.getBBox();
    this.sq42Bbox = this.msquare42.getBBox();
    this.sq43Bbox = this.msquare43.getBBox();
    this.sq44Bbox = this.msquare44.getBBox();
    this.sq45Bbox = this.msquare45.getBBox();
    this.sq46Bbox = this.msquare46.getBBox();
    this.sq47Bbox = this.msquare47.getBBox();
    this.sq48Bbox = this.msquare48.getBBox();
    this.sq49Bbox = this.msquare49.getBBox();
    this.sq50Bbox = this.msquare50.getBBox();
    this.sq51Bbox = this.msquare51.getBBox();
    this.sq52Bbox = this.msquare52.getBBox();
    this.sq53Bbox = this.msquare53.getBBox();
    this.sq54Bbox = this.msquare54.getBBox();
    this.sq55Bbox = this.msquare55.getBBox();
    this.sq56Bbox = this.msquare56.getBBox();
    this.sq57Bbox = this.msquare57.getBBox();
    this.sq58Bbox = this.msquare58.getBBox();
    this.sq59Bbox = this.msquare59.getBBox();
    this.sq60Bbox = this.msquare60.getBBox();
    this.sq61Bbox = this.msquare61.getBBox();
    
    //道具1
    this.mItem1 = new Item(this.logo_clue);
    this.mItem1.getXform().setXPos(68.75);
    this.mItem1.getXform().setYPos(23.75);
    
    this.mItem2 = new Item(this.logo_clue);
    this.mItem2.getXform().setXPos(13.75);
    this.mItem2.getXform().setYPos(28.75);
    
    this.mItem3 = new Item(this.logo_clue);
    this.mItem3.getXform().setXPos(13.75);
    this.mItem3.getXform().setYPos(13.75);
    
    this.mItem4 = new Item(this.logo_clue);
    this.mItem4.getXform().setXPos(48.75);
    this.mItem4.getXform().setYPos(51.25);
    
    this.mItem5 = new Item(this.logo_clue);
    this.mItem5.getXform().setXPos(33.75);
    this.mItem5.getXform().setYPos(73.75);
    
    this.mItem6 = new Item(this.logo_clue);
    this.mItem6.getXform().setXPos(88.75);
    this.mItem6.getXform().setYPos(81.25);
    
    this.mItem7 = new Item(this.logo_clue);
    this.mItem7.getXform().setXPos(66.25);
    this.mItem7.getXform().setYPos(18.75);
    
    this.mItem8 = new Item(this.logo_clue);
    this.mItem8.getXform().setXPos(86.25);
    this.mItem8.getXform().setYPos(6.25);
    
    this.mItem9 = new Item(this.trans1);
//    this.mItem9.getXform().setXPos(12.5);
//    this.mItem9.getXform().setYPos(85);
    this.mItem9.getXform().setXPos(-100);
    this.mItem9.getXform().setYPos(-100);
    this.mItem9.getXform().setSize(5,5);
    
    this.mItem10 = new Item(this.logo_item);
    this.mItem10.getXform().setXPos(11.25);
    this.mItem10.getXform().setYPos(71.25);
    
    this.mItem11 = new Item(this.trans2);
//    this.mItem11.getXform().setXPos(20);
//    this.mItem11.getXform().setYPos(7.5);
    this.mItem11.getXform().setXPos(-100);
    this.mItem11.getXform().setYPos(-100);
    this.mItem11.getXform().setSize(5,5);
    
    this.mItem12 = new Item(this.trans3);
//    this.mItem12.getXform().setXPos(47.5);
//    this.mItem12.getXform().setYPos(45);
    this.mItem12.getXform().setXPos(-100);
    this.mItem12.getXform().setYPos(-100);
    this.mItem12.getXform().setSize(5,5);
    
    this.mItem13 = new Item(this.logo_item);
    this.mItem13.getXform().setXPos(53.75);
    this.mItem13.getXform().setYPos(36.25);
    
    this.mItem14 = new Item(this.trans4);
    this.mItem14.getXform().setXPos(57.5);
    this.mItem14.getXform().setYPos(45);
    this.mItem14.getXform().setSize(5,5);

    
    this.mItem15 = new Item(this.trans5);
//    this.mItem15.getXform().setXPos(92.5);
//    this.mItem15.getXform().setYPos(17.5);
    this.mItem15.getXform().setXPos(-100);
    this.mItem15.getXform().setYPos(-100);
    this.mItem15.getXform().setSize(5,5);
    
    this.mItem16 = new Item(this.trans6);
//    this.mItem16.getXform().setXPos(82.5);
//    this.mItem16.getXform().setYPos(35);
    this.mItem16.getXform().setXPos(-100);
    this.mItem16.getXform().setYPos(-100);
    this.mItem16.getXform().setSize(5,5);
    
    this.mItem17 = new Item(this.trans7);
//    this.mItem17.getXform().setXPos(77.5);
//    this.mItem17.getXform().setYPos(80);
    this.mItem17.getXform().setXPos(-100);
    this.mItem17.getXform().setYPos(-100);
    this.mItem17.getXform().setSize(5,5);
    
    this.mItem18 = new Item(this.logo_item);
    this.mItem18.getXform().setXPos(50);
    this.mItem18.getXform().setYPos(2.5);
    
    this.mItem19 = new Item(this.logo_item);
    this.mItem19.getXform().setXPos(50);
    this.mItem19.getXform().setYPos(2.5);
    
    // mItem20 是出口
    this.mItem20 = new Item(this.door);
    this.mItem20.getXform().setXPos(97.5);
    this.mItem20.getXform().setYPos(55);
    this.mItem20.getXform().setSize(5,5);
    
    this.mMsg = new FontRenderable("");
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.getXform().setPosition(50, 2);
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
     this.mItem13BBox = this.mItem13.getBBox();
     this.mItem14BBox = this.mItem14.getBBox();
     this.mItem15BBox = this.mItem15.getBBox();
     this.mItem16BBox = this.mItem16.getBBox();
     this.mItem17BBox = this.mItem17.getBBox();
     this.mItem18BBox = this.mItem18.getBBox();
     this.mItem19BBox = this.mItem19.getBBox();
     this.mItem20BBox = this.mItem20.getBBox();
     
     this.mStartCaption = new Caption(this.kCaption1);
     
     this.mCaptionA = new Caption(this.kCaption2); //入口线索 自动
     this.mCaptionB = new Caption(this.kCaption3);
     this.mCaptionC = new Caption(this.kCaption4);
     this.mCaptionD = new Caption(this.kCaption5);
     this.mCaptionE = new Caption(this.kCaption6);
     this.mCaptionF = new Caption(this.kCaption7);
     this.mCaptionG = new Caption(this.kCaption8);
     this.mCaptionH = new Caption(this.kCaption9);
     this.mCaptionI = new Caption(this.kCaption10); // B-I 拾取线索 
     
     this.mEndCaption = new Caption(this.kCaption11);
 
     var c = [1, 0.7, 0.73, 1];
     this.itemPoint1 = new ItemPoint(68.75, 23.75);
     this.itemPoint2 = new ItemPoint(13.75, 28.75);
     this.itemPoint3 = new ItemPoint(13.75, 13.75);
     this.itemPoint4 = new ItemPoint(48.75, 51.25);
     this.itemPoint5 = new ItemPoint(33.75, 73.75);
     this.itemPoint6 = new ItemPoint(88.75, 81.25);
     this.itemPoint7 = new ItemPoint(66.25, 18.75);
     this.itemPoint8 = new ItemPoint(86.25, 6.25);

     this.itemPoint1.item.setColor(c);
     this.itemPoint2.item.setColor(c);
     this.itemPoint3.item.setColor(c);
     this.itemPoint4.item.setColor(c);
     this.itemPoint5.item.setColor(c);
     this.itemPoint6.item.setColor(c);
     this.itemPoint7.item.setColor(c);
     this.itemPoint8.item.setColor(c);

     
     // For the function of key "v"
     this.mBlackScene = new Renderable();
     this.mBlackScene.setColor([0,0,0,1]);
     this.mBlackScene.getXform().setPosition(50, 50);
     this.mBlackScene.getXform().setSize(0,0);
     
     this.mHeroPoint = new Renderable();
     this.mHeroPoint.setColor([1, 0.94, 0.97, 1]);
     this.mHeroPoint.getXform().setPosition(50, 50);
     this.mHeroPoint.getXform().setRotationInRad(0.78); // In Radians
     this.mHeroPoint.getXform().setSize(0,0);
     
     this.mEverywhere = new Renderable();
     this.mEverywhere.setColor([0.86, 0.34, 0.12, 1]);
     this.mEverywhere.getXform().setPosition(97.5, 55);
     this.mEverywhere.getXform().setRotationInRad(0); // In Radians
     this.mEverywhere.getXform().setSize(0,0);
};

PlayGame3.prototype._createALight = function (type, pos, dir, color, n, f, inner, outer, intensity, dropOff) {
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

PlayGame3.prototype._initializeLights = function (posHero) {
    this.mGlobalLightSet = new LightSet();

    var l = this._createALight(Light.eLightType.ePointLight,
            [posHero[0], posHero[1], 5],         // position
            [0, 0, -1],          // Direction 
            [3.7, 2.2, 2.55, 1.6],  // some color
            8, 10,               // near and far distances
            0.1, 0.2,            // inner and outer cones
            3,                   // intensity
            0.1                 // drop off
            );
    this.mGlobalLightSet.addToSet(l);
    
    var p = this._createALight(Light.eLightType.ePointLight,
            [posHero[0], posHero[1], 5],         // position
            [0, 0, -1],          // Direction 
            [-0.3, -0.3, -1, -0.2],  // some color
            8, 20,               // near and far distances
            0.1, 0.2,            // inner and outer cones
            5,                   // intensity
            0.1                 // drop off
            );
    this.mGlobalLightSet.addToSet(p);
};


PlayGame3.prototype._modify = function (xpos, ypos){
    this.mGlobalLightSet[0].setXPos(xpos);
    this.mGlobalLightSet[0].setYPos(ypos);
};


PlayGame3.prototype.draw = function () {
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
    this.msquare40.draw(this.mCamera);
    this.msquare41.draw(this.mCamera);
    this.msquare42.draw(this.mCamera);
    this.msquare43.draw(this.mCamera);
    this.msquare44.draw(this.mCamera);
    this.msquare45.draw(this.mCamera);
    this.msquare46.draw(this.mCamera);
    this.msquare47.draw(this.mCamera);
    this.msquare48.draw(this.mCamera);
    this.msquare49.draw(this.mCamera);
    this.msquare50.draw(this.mCamera);
    this.msquare51.draw(this.mCamera);
    this.msquare52.draw(this.mCamera);
    this.msquare53.draw(this.mCamera);
    this.msquare54.draw(this.mCamera);
    this.msquare55.draw(this.mCamera);
    this.msquare56.draw(this.mCamera);
    this.msquare57.draw(this.mCamera);
    this.msquare58.draw(this.mCamera);
    this.msquare59.draw(this.mCamera);
    this.msquare60.draw(this.mCamera);
    this.msquare61.draw(this.mCamera);
    
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
    this.mItem13.draw(this.mCamera);
    this.mItem14.draw(this.mCamera);
    this.mItem15.draw(this.mCamera);
    this.mItem16.draw(this.mCamera);
    this.mItem17.draw(this.mCamera);


    this.mItem20.draw(this.mCamera);
    
    this.mHero.draw(this.mCamera);
    
    this.mEverywhere.draw(this.mCamera);
    
    this.mStartCaption.draw(this.mCamera);
    this.mCaptionA.draw(this.mCamera);
    this.mCaptionB.draw(this.mCamera);
    this.mCaptionC.draw(this.mCamera);
    this.mCaptionD.draw(this.mCamera);
    this.mCaptionE.draw(this.mCamera);
    this.mCaptionF.draw(this.mCamera);
    this.mCaptionG.draw(this.mCamera);
    this.mCaptionH.draw(this.mCamera);
    this.mCaptionI.draw(this.mCamera);
    this.mEndCaption.draw(this.mCamera);    
    this.mBlackScene.draw(this.mCamera);
    this.mHeroPoint.draw(this.mCamera);
   
    this.itemPoint1.item.draw(this.mCamera);
    this.itemPoint2.item.draw(this.mCamera);
    this.itemPoint3.item.draw(this.mCamera);
    this.itemPoint4.item.draw(this.mCamera);
    this.itemPoint5.item.draw(this.mCamera);
    this.itemPoint6.item.draw(this.mCamera);
    this.itemPoint7.item.draw(this.mCamera);
    this.itemPoint8.item.draw(this.mCamera);
    
    this.mMsg.draw(this.mCamera);
    this.mPositionMsg.draw(this.mCamera);
    this.mClueMsg.draw(this.mCamera);
    this.mEverywhereMsg.draw(this.mCamera);

    
};

// This function will judge if the hero is the indicated circle
PlayGame3.prototype.judgeArea = function(posX, posY, radius) {
    var heroX = this.mHero.getXform().getXPos();
    var heroY = this.mHero.getXform().getYPos();
    
    var distance = (heroX-posX)*(heroX-posX) + (heroY-posY)*(heroY-posY);   
    if (radius*radius > distance) {
        return 1;
    }
}

PlayGame3.prototype.switchCamera = function(toBig) {
    
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

PlayGame3.prototype.showItemPoint= function() {
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
    if (this.itemPoint8.isFound == true) {
        this.itemPoint8.item.getXform().setSize(2, 2);
    } 

}


PlayGame3.prototype.closeItemPoint= function() {
    
    this.itemPoint1.item.getXform().setSize(0, 0);
    this.itemPoint2.item.getXform().setSize(0, 0);
    this.itemPoint3.item.getXform().setSize(0, 0);
    this.itemPoint4.item.getXform().setSize(0, 0);
    this.itemPoint5.item.getXform().setSize(0, 0);
    this.itemPoint6.item.getXform().setSize(0, 0);
    this.itemPoint7.item.getXform().setSize(0, 0);
    this.itemPoint8.item.getXform().setSize(0, 0);

}


PlayGame3.prototype.addColor = function() {
    var c = this.mHeroPoint.getColor();
    c[1] -= 0.03;
    c[2] -= 0.03
    this.mHeroPoint.setColor(c);
}

PlayGame3.prototype.update = function () {
    this.mCamera.update();
    this.mHero.update();
    //this.mBg.update();
    
    
    if(this.mCaptionB.isRead){
        this.mItem16.getXform().setXPos(82.5);
        this.mItem16.getXform().setYPos(35);
    }
    
    if(this.mCaptionC.isRead && this.mCaptionD.isRead){
        this.mItem11.getXform().setXPos(20);
        this.mItem11.getXform().setYPos(7.5);
    }
    
    if(this.mCaptionE.isRead){
        this.mItem9.getXform().setXPos(12.5);
        this.mItem9.getXform().setYPos(85);
    }
    
    if(this.mCaptionF.isRead){
        this.mItem12.getXform().setXPos(47.5);
        this.mItem12.getXform().setYPos(45);
    }
    
    if(this.mCaptionG.isRead){
        this.mItem17.getXform().setXPos(77.5);
        this.mItem17.getXform().setYPos(80);
    }
    
    if(this.mCaptionH.isRead && this.mCaptionI.isRead){
        this.mItem15.getXform().setXPos(92.5);
        this.mItem15.getXform().setYPos(17.5);
    }
    
    
    
    

    var v = this.mGlobalLightSet.getLightAt(0).getColor();
    var v1 = this.mGlobalLightSet.getLightAt(1).getColor();
    
    
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
                    hBbox.intersectsBound(this.sq40Bbox) ||
                    hBbox.intersectsBound(this.sq41Bbox) ||
                    hBbox.intersectsBound(this.sq42Bbox) ||
                    hBbox.intersectsBound(this.sq43Bbox) ||
                    hBbox.intersectsBound(this.sq44Bbox) ||
                    hBbox.intersectsBound(this.sq45Bbox) ||
                    hBbox.intersectsBound(this.sq46Bbox) ||
                    hBbox.intersectsBound(this.sq47Bbox) ||
                    hBbox.intersectsBound(this.sq48Bbox) ||
                    hBbox.intersectsBound(this.sq49Bbox) ||
                    hBbox.intersectsBound(this.sq50Bbox) ||
                    hBbox.intersectsBound(this.sq51Bbox) ||
                    hBbox.intersectsBound(this.sq52Bbox) ||
                    hBbox.intersectsBound(this.sq53Bbox) ||
                    hBbox.intersectsBound(this.sq54Bbox) ||
                    hBbox.intersectsBound(this.sq55Bbox) ||
                    hBbox.intersectsBound(this.sq56Bbox) ||
                    hBbox.intersectsBound(this.sq57Bbox) ||
                    hBbox.intersectsBound(this.sq58Bbox) ||
                    hBbox.intersectsBound(this.sq59Bbox) ||
                    hBbox.intersectsBound(this.sq60Bbox) ||
                    hBbox.intersectsBound(this.sq61Bbox) ||
                    hBbox.intersectsBound(this.mItem20BBox)
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
                    hBbox.intersectsBound(this.sq40Bbox) ||
                    hBbox.intersectsBound(this.sq41Bbox) ||
                    hBbox.intersectsBound(this.sq42Bbox) ||
                    hBbox.intersectsBound(this.sq43Bbox) ||
                    hBbox.intersectsBound(this.sq44Bbox) ||
                    hBbox.intersectsBound(this.sq45Bbox) ||
                    hBbox.intersectsBound(this.sq46Bbox) ||
                    hBbox.intersectsBound(this.sq47Bbox) ||
                    hBbox.intersectsBound(this.sq48Bbox) ||
                    hBbox.intersectsBound(this.sq49Bbox) ||
                    hBbox.intersectsBound(this.sq50Bbox) ||
                    hBbox.intersectsBound(this.sq51Bbox) ||
                    hBbox.intersectsBound(this.sq52Bbox) ||
                    hBbox.intersectsBound(this.sq53Bbox) ||
                    hBbox.intersectsBound(this.sq54Bbox) ||
                    hBbox.intersectsBound(this.sq55Bbox) ||
                    hBbox.intersectsBound(this.sq56Bbox) ||
                    hBbox.intersectsBound(this.sq57Bbox) ||
                    hBbox.intersectsBound(this.sq58Bbox) ||
                    hBbox.intersectsBound(this.sq59Bbox) ||
                    hBbox.intersectsBound(this.sq60Bbox) ||
                    hBbox.intersectsBound(this.sq61Bbox) ||
                    hBbox.intersectsBound(this.mItem20BBox)
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
                    hBbox.intersectsBound(this.sq40Bbox) ||
                    hBbox.intersectsBound(this.sq41Bbox) ||
                    hBbox.intersectsBound(this.sq42Bbox) ||
                    hBbox.intersectsBound(this.sq43Bbox) ||
                    hBbox.intersectsBound(this.sq44Bbox) ||
                    hBbox.intersectsBound(this.sq45Bbox) ||
                    hBbox.intersectsBound(this.sq46Bbox) ||
                    hBbox.intersectsBound(this.sq47Bbox) ||
                    hBbox.intersectsBound(this.sq48Bbox) ||
                    hBbox.intersectsBound(this.sq49Bbox) ||
                    hBbox.intersectsBound(this.sq50Bbox) ||
                    hBbox.intersectsBound(this.sq51Bbox) ||
                    hBbox.intersectsBound(this.sq52Bbox) ||
                    hBbox.intersectsBound(this.sq53Bbox) ||
                    hBbox.intersectsBound(this.sq54Bbox) ||
                    hBbox.intersectsBound(this.sq55Bbox) ||
                    hBbox.intersectsBound(this.sq56Bbox) ||
                    hBbox.intersectsBound(this.sq57Bbox) ||
                    hBbox.intersectsBound(this.sq58Bbox) ||
                    hBbox.intersectsBound(this.sq59Bbox) ||
                    hBbox.intersectsBound(this.sq60Bbox) ||
                    hBbox.intersectsBound(this.sq61Bbox) ||
                    hBbox.intersectsBound(this.mItem20BBox)              
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
                    hBbox.intersectsBound(this.sq40Bbox) ||
                    hBbox.intersectsBound(this.sq41Bbox) ||
                    hBbox.intersectsBound(this.sq42Bbox) ||
                    hBbox.intersectsBound(this.sq43Bbox) ||
                    hBbox.intersectsBound(this.sq44Bbox) ||
                    hBbox.intersectsBound(this.sq45Bbox) ||
                    hBbox.intersectsBound(this.sq46Bbox) ||
                    hBbox.intersectsBound(this.sq47Bbox) ||
                    hBbox.intersectsBound(this.sq48Bbox) ||
                    hBbox.intersectsBound(this.sq49Bbox) ||
                    hBbox.intersectsBound(this.sq50Bbox) ||
                    hBbox.intersectsBound(this.sq51Bbox) ||
                    hBbox.intersectsBound(this.sq52Bbox) ||
                    hBbox.intersectsBound(this.sq53Bbox) ||
                    hBbox.intersectsBound(this.sq54Bbox) ||
                    hBbox.intersectsBound(this.sq55Bbox) ||
                    hBbox.intersectsBound(this.sq56Bbox) ||
                    hBbox.intersectsBound(this.sq57Bbox) ||
                    hBbox.intersectsBound(this.sq58Bbox) ||
                    hBbox.intersectsBound(this.sq59Bbox) ||
                    hBbox.intersectsBound(this.sq60Bbox) ||
                    hBbox.intersectsBound(this.sq61Bbox) ||
                    hBbox.intersectsBound(this.mItem20BBox)
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
        this.mItem3.getXform().setXPos(-100);
        this.mItem3.getXform().setYPos(-100);
        this.mItem3BBox = this.mItem3.getBBox();
    }
    
    if(hBbox.intersectsBound(this.mItem4BBox)){
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
    
    if(hBbox.intersectsBound(this.mItem8BBox)){     
        this.mItem8.getXform().setXPos(-100);
        this.mItem8.getXform().setYPos(-100);
        this.mItem8BBox = this.mItem8.getBBox();
    }
    
//    if(hBbox.intersectsBound(this.mItem9BBox)){ 
//        this.mHero.getXform().setSize(3, 3);
//        this.mHero.getXform().setPosition(35, 55);
//    }
    // 9 瞬移
    
    var size = this.mHero.getXform().getSize();
    
    if (this.judgeArea(12.5, 85, 1.2) && this.mCaptionE.isRead === true) {
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
        }else if(this.judgeArea(12.5, 85, 1.2) && (size[0] < 0.10)){
            //this.IsMove = true;
            this.timer = 0;
            this.mHero.getXform().setXPos(35);
            this.mHero.getXform().setYPos(55);            
        }
    }
    
    if(this.judgeArea(35, 55, 2) && size[0] < 2.95 && this.IsMove === false){
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
    }else if(this.judgeArea(35, 55, 2) && !(size[0] < 2.95)){
        this.IsMove = true;
    }
     
    
//    if(hBbox.intersectsBound(this.mItem10BBox)){ 
//        this.mHero.getXform().setSize(1.5, 1.5);        
//    }
    
    //var size = this.mHero.getXform().getSize();
    // 10 变小
    if (this.judgeArea(11.25, 71.25, 1.2) && size[0] > 1.55) {
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
    }else if(this.judgeArea(11.25, 71.25, 1.2) && !(size[0] > 1.55)){
        this.IsMove = true;
        this.timer = 0;
    }
    
//    if(hBbox.intersectsBound(this.mItem11BBox)){    
//        this.mHero.getXform().setSize(3, 3);
//        this.mHero.getXform().setPosition(47.5, 57.5);
//    }
    
    // 11 shunyi
    if (this.judgeArea(20, 7.5, 1.2) && this.mCaptionC.isRead === true && this.mCaptionD.isRead === true) {
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
        }else if(this.judgeArea(20, 7.5, 1.2) && (size[0] < 0.10)){
            //this.IsMove = true;
            this.timer = 0;
            this.mHero.getXform().setXPos(47.5);
            this.mHero.getXform().setYPos(57.5);            
        }
    }
    
    if(this.judgeArea(47.5, 57.5, 2) && size[0] < 2.95 && this.IsMove === false){
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
    }else if(this.judgeArea(47.5, 57.5, 2) && !(size[0] < 2.95)){
        this.IsMove = true;
    }
    
//    if(hBbox.intersectsBound(this.mItem12BBox)){
//        this.mHero.getXform().setSize(3, 3);
//        this.mHero.getXform().setPosition(87.5, 72.5);
//    }
    
    // 12 shunyi
    
    if (this.judgeArea(47.5, 45, 1.2) && this.mCaptionE.isRead === true && this.mCaptionF.isRead === true) {
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
        }else if(this.judgeArea(47.5, 45, 1.2) && (size[0] < 0.10)){
            //this.IsMove = true;
            this.timer = 0;
            this.mHero.getXform().setXPos(87.5);
            this.mHero.getXform().setYPos(72.5);            
        }
    }
    
    if(this.judgeArea(87.5, 72.5, 2) && size[0] < 2.95 && this.IsMove === false){
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
    }else if(this.judgeArea(87.5, 72.5, 2) && !(size[0] < 2.95)){
        this.IsMove = true;
    }
    
//    if(hBbox.intersectsBound(this.mItem13BBox)){
//        this.mHero.getXform().setSize(1.5, 1.5);
//        
////        this.mItem13.getXform().setXPos(-1);
////        this.mItem13.getXform().setYPos(-1);
////        this.mItem13BBox = this.mItem13.getBBox();
//    }
    
    // 13 变小
    if (this.judgeArea(53.75, 36.25, 1.2) && size[0] > 1.55) {
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
    }else if(this.judgeArea(53.75, 36.25, 1.2) && !(size[0] > 1.55)){
        this.IsMove = true;
        this.timer = 0;
    }
    
    
    
//    if(hBbox.intersectsBound(this.mItem14BBox)){
//        this.mHero.getXform().setSize(3, 3);
//        this.mHero.getXform().setPosition(82.5, 25);
//    }
    
    // 14 shunyi
    if (this.judgeArea(57.5, 45, 1.2)) {
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
        }else if(this.judgeArea(57.5, 45, 1.2) && (size[0] < 0.10)){
            //this.IsMove = true;
            this.timer = 0;
            this.mHero.getXform().setXPos(82.5);
            this.mHero.getXform().setYPos(25);            
        }
    }
    
    if(this.judgeArea(82.5, 25, 2) && size[0] < 2.95 && this.IsMove === false){
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
    }else if(this.judgeArea(82.5, 25, 2) && !(size[0] < 2.95)){
        this.IsMove = true;
    }
    
//    if(hBbox.intersectsBound(this.mItem15BBox)){
//        this.mHero.getXform().setSize(3, 3);
//        this.mHero.getXform().setPosition(57.5, 77.5);
//    }

    // 15 shunyi
    if (this.judgeArea(92.5, 17.5, 1.2) && this.mCaptionH.isRead === true && this.mCaptionI.isRead === true) {
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
        }else if(this.judgeArea(92.5, 17.5, 1.2) && (size[0] < 0.10)){
            //this.IsMove = true;
            this.timer = 0;
            this.mHero.getXform().setXPos(57.5);
            this.mHero.getXform().setYPos(77.5);            
        }
    }
    
    if(this.judgeArea(57.5, 77.5, 2) && size[0] < 2.95 && this.IsMove === false){
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
    }else if(this.judgeArea(57.5, 77.5, 2) && !(size[0] < 2.95)){
        this.IsMove = true;
    }
   
    
//    if(hBbox.intersectsBound(this.mItem16BBox)){
//        this.mHero.getXform().setSize(3, 3);
//        this.mHero.getXform().setPosition(52.5, 20);
//    }

    // 16 shunyi 2
    
    if (this.judgeArea(82.5, 35, 1.2) && this.mCaptionB.isRead === true) {
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
        }else if(this.judgeArea(82.5, 35, 1.2) && (size[0] < 0.10)){
            //this.IsMove = true;
            this.timer = 0;
            this.mHero.getXform().setXPos(52.5);
            this.mHero.getXform().setYPos(20);            
        }
    }
    
    if(this.judgeArea(52.5, 20, 2) && size[0] < 2.95 && this.IsMove === false){
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
    }else if(this.judgeArea(52.5, 20, 2) && !(size[0] < 2.95)){
        this.IsMove = true;
    }

  
//    if(hBbox.intersectsBound(this.mItem17BBox)){
//        this.mHero.getXform().setSize(3, 3);
//        this.mHero.getXform().setPosition(77.5, 12.5);
//    }
 
 
    // 17 shunyi
    
    if (this.judgeArea(77.5, 80, 1.2) && this.mCaptionG.isRead === true) {
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
        }else if(this.judgeArea(77.5, 80, 1.2) && (size[0] < 0.10)){
            //this.IsMove = true;
            this.timer = 0;
            this.mHero.getXform().setXPos(77.5);
            this.mHero.getXform().setYPos(12.5);            
        }
    }
    
    if(this.judgeArea(77.5, 12.5, 2) && size[0] < 2.95 && this.IsMove === false){
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
    }else if(this.judgeArea(77.5, 12.5, 2) && !(size[0] < 2.95)){
        this.IsMove = true;
    }
    

    if(hBbox.intersectsBound(this.mItem18BBox)){
        this.mItem18.getXform().setXPos(-1);
        this.mItem18.getXform().setYPos(-1);
        this.mItem18BBox = this.mItem18.getBBox();
    }
    
    if(hBbox.intersectsBound(this.mItem19BBox)){
        this.mItem19.getXform().setXPos(-1);
        this.mItem19.getXform().setYPos(-1);
        this.mItem19BBox = this.mItem19.getBBox();
    }
    
    

    if (gEngine.Input.isButtonPressed(gEngine.Input.mouseButton.Middle)) {
        gEngine.GameLoop.stop();   
    }
    
    // press V to follow
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.V)) { 
        //if (this.mCamera.getWCWidth() == 100) {
            this.switchCamera(false); 
            this.mBlackScene.getXform().setSize(0,0);
            this.mHeroPoint.getXform().setSize(0,0);
            this.mEverywhere.getXform().setSize(0,0);
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
            this.mHeroPoint.getXform().setSize(5,5);
            this.mMsg.setText("- Click V to close - ");
            this.mMsg.setTextHeight(2);
            this.mMsg.getXform().setPosition(75,2);
            this.mPositionMsg.getXform().setPosition(this.mHero.getXform().getXPos()-5, this.mHero.getXform().getYPos()+0.8);
            this.mPositionMsg.setText("- You -");
            this.mPositionMsg.setTextHeight(2.7);
            this.mClueMsg.setText("- Lost memories:" + this.mClueNum + " -");
            this.mClueMsg.setTextHeight(2.2);
            this.mClueMsg.getXform().setPosition(4, 98);
            
            // For everywhere
            if (this.foundEntrance) {
                this.mEverywhereMsg.setText("Exit");
                this.mEverywhereMsg.getXform().setPosition(94.5, 55);
                this.mEverywhereMsg.setTextHeight(2);
                this.mEverywhere.getXform().setPosition(96.5, 55);
                this.mEverywhere.getXform().setSize(3,3);
            }
            
            this.showItemPoint();
            this.IsMove = false;
        }
    }
    
    
   
    
    // follow the camera or not 
    if (this.mIsFollow == true) {
        this.mCamera.setWCCenter(this.mHero.getXform().getXPos(), this.mHero.getXform().getYPos());
    }
    
    // For the Start Caption
    //if (this.judgeArea(57.5, 97.5, 3) && (this.mStartCaption.isRead == false)) {
    if ((this.mStartCaption.isRead == false)) {
        this.mStartCaption.mCaption1.getXform().setSize(100,100);
        this.switchCamera(true);
        this.IsMove = false;
        this.mStartCaption.isRead = true;
    }
    
    if ((this.mStartTimer > 0) && (this.mStartCaption.isRead == true)) {
        this.mStartTimer --;
        if (this.mStartTimer === 0) {
            this.mStartCaption.mCaption1.getXform().setSize(0, 0);     
            this.switchCamera(false); 
            this.IsMove = true; 
            this.mStartTimer = -100;
        }
    }
    
    //开场自动线索
    if (this.judgeArea(57.5, 90.5, 1.8) && (this.mCaptionA.isRead == false)) {
        this.mCaptionA.mCaption1.getXform().setSize(100,100);
        this.switchCamera(true);    
        this.IsMove = false;
        this.mCaptionA.isRead = true;
        this.mMsg.setText("- Click Enter to close - ");
        this.mMsg.setTextHeight(2);
        this.mMsg.getXform().setPosition(72,2);
        this.mClueNum --;
        this.addColor();
    }
        

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter) && (this.mCaptionA.isRead == true)) {
        this.mCaptionA.mCaption1.getXform().setSize(0, 0);     
        this.switchCamera(false); 
        this.IsMove = true; 
        this.mMsg.setText("");
    }
    
    
    
     //For the Caption B
 
    if (this.judgeArea(68.75, 23.75, 1.5) && (this.mCaptionB.isRead == false)) {
        this.mCaptionB.mCaption1.getXform().setSize(100,100);
        this.switchCamera(true);    
        this.IsMove = false;
        this.mCaptionB.isRead = true;
        this.mMsg.setText("- Click Enter to close - ");
        this.mMsg.setTextHeight(2);
        this.mMsg.getXform().setPosition(72,2);
        this.mClueNum --;
        this.addColor();
        this.itemPoint1.isFound = true;
        gEngine.AudioClips.playACue(this.soundbook);
    }
        

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter) && (this.mCaptionB.isRead == true)) {
        this.mCaptionB.mCaption1.getXform().setSize(0, 0);     
        this.switchCamera(false); 
        this.IsMove = true; 
        this.mMsg.setText("");
    }
    
    // For the Caption C
    if (this.judgeArea(13.75, 28.75, 1.8) && (this.mCaptionC.isRead == false)) {
        this.mCaptionC.mCaption1.getXform().setSize(100,100);
        this.switchCamera(true);    
        this.IsMove = false;
        this.mCaptionC.isRead = true;
        this.mMsg.setText("- Click Enter to close - ");
        this.mMsg.setTextHeight(2);
        this.mMsg.getXform().setPosition(72,2);
        this.mClueNum --;
        this.addColor();
        this.itemPoint2.isFound = true;
        gEngine.AudioClips.playACue(this.soundbook);
    }
        
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter) && (this.mCaptionC.isRead == true)) {
        this.mCaptionC.mCaption1.getXform().setSize(0, 0);     
        this.switchCamera(false); 
        this.IsMove = true; 
        this.mMsg.setText("");
    }
    
    
    // For the Caption D
    if (this.judgeArea(13.75, 13.75, 1.8) && (this.mCaptionD.isRead == false)) {
        this.mCaptionD.mCaption1.getXform().setSize(120,120);
        this.switchCamera(true);    
        this.IsMove = false;
        this.mCaptionD.isRead = true;
        this.mMsg.setText("- Click Enter to close - ");
        this.mMsg.setTextHeight(2);
        this.mMsg.getXform().setPosition(72,2);
        this.mClueNum --;
        this.addColor();
        this.itemPoint3.isFound = true;
        gEngine.AudioClips.playACue(this.soundbook);
    }
        
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter) && (this.mCaptionD.isRead == true)) {
        this.mCaptionD.mCaption1.getXform().setSize(0, 0);     
        this.switchCamera(false); 
        this.IsMove = true;
        this.mMsg.setText("");
    }
   
    // For the Caption E
    if (this.judgeArea(48.75, 51.25, 1.8) && (this.mCaptionE.isRead == false)) {
        this.mCaptionE.mCaption1.getXform().setSize(100,100);
        this.switchCamera(true);    
        this.IsMove = false;
        this.mCaptionE.isRead = true;
        this.mMsg.setText("- Click Enter to close - ");
        this.mMsg.setTextHeight(2);
        this.mMsg.getXform().setPosition(72,2);
        this.mClueNum --;
        this.addColor();
        this.itemPoint4.isFound = true;
        gEngine.AudioClips.playACue(this.soundbook);

    }
        
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter) && (this.mCaptionE.isRead == true)) {
        this.mCaptionE.mCaption1.getXform().setSize(0, 0);     
        this.switchCamera(false); 
        this.IsMove = true; 
        this.mMsg.setText("");
    }
    
    // For the Caption F
    if (this.judgeArea(33.75, 73.75, 1.8) && (this.mCaptionF.isRead == false)) {
        this.mCaptionF.mCaption1.getXform().setSize(100,100);
        this.switchCamera(true);    
        this.IsMove = false;
        this.mCaptionF.isRead = true;
        this.mMsg.setText("- Click Enter to close - ");
        this.mMsg.setTextHeight(2);
        this.mMsg.getXform().setPosition(72,2);
        this.mClueNum --;
        this.addColor();
        this.itemPoint5.isFound = true;
        gEngine.AudioClips.playACue(this.soundbook);

    }
        
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter) && (this.mCaptionF.isRead == true)) {
        this.mCaptionF.mCaption1.getXform().setSize(0, 0);     
        this.switchCamera(false); 
        this.IsMove = true; 
        this.mMsg.setText("");
    }
    
    // For the Caption G
    if (this.judgeArea(88.75, 81.25, 1.8) && (this.mCaptionG.isRead == false)) {
        this.mCaptionG.mCaption1.getXform().setSize(100,100);
        this.switchCamera(true);    
        this.IsMove = false;
        this.mCaptionG.isRead = true;

        this.mMsg.setText("- Click Enter to close - ");
        this.mMsg.setTextHeight(2);
        this.mMsg.getXform().setPosition(72,2);
        this.mClueNum --;
        this.addColor();
        this.itemPoint6.isFound = true;
        gEngine.AudioClips.playACue(this.soundbook);
    }
        
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter) && (this.mCaptionG.isRead == true)) {
        this.mCaptionG.mCaption1.getXform().setSize(0, 0);     
        this.switchCamera(false); 
        this.IsMove = true;
        this.mMsg.setText("");
    }
  
    // For the Caption H
    if (this.judgeArea(66.25, 18.75, 1.8) && (this.mCaptionH.isRead == false)) {
        this.mCaptionH.mCaption1.getXform().setSize(100,100);
        this.switchCamera(true);    
        this.IsMove = false;
        this.mCaptionH.isRead = true;
        this.mMsg.setText("- Click Enter to close - ");
        this.mMsg.setTextHeight(2);
        this.mMsg.getXform().setPosition(72,2);
        this.mClueNum --;
        this.addColor();
        this.itemPoint7.isFound = true;
        gEngine.AudioClips.playACue(this.soundbook);
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter) && (this.mCaptionH.isRead == true)) {
        this.mCaptionH.mCaption1.getXform().setSize(0, 0);     
        this.switchCamera(false); 
        this.IsMove = true;
        this.mMsg.setText("");
    }
    
    // For the Caption I
    if (this.judgeArea(86.25, 6.25, 1.8) && (this.mCaptionI.isRead == false)) {
        this.mCaptionI.mCaption1.getXform().setSize(100,100);
        this.switchCamera(true);    
        this.IsMove = false;
        this.mCaptionI.isRead = true;
        this.mMsg.setText("- Click Enter to close - ");
        this.mMsg.setTextHeight(2);
        this.mMsg.getXform().setPosition(72,2);
        this.mClueNum --;
        this.addColor();
        this.itemPoint8.isFound = true;
        gEngine.AudioClips.playACue(this.soundbook);
    }
        
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter) && (this.mCaptionI.isRead == true)) {
        this.mCaptionI.mCaption1.getXform().setSize(0, 0);     
        this.switchCamera(false); 
        this.IsMove = true; 
        this.mMsg.setText("");
    }
  

    
    
    // if meet the entrance
    if (this.judgeArea(97.5, 55, 6) && (this.mEndCaption.isRead == false)) {
        this.foundEntrance = true;
        if ((this.mCaptionA.isRead) && (this.mCaptionB.isRead) && (this.mCaptionC.isRead) && (this.mCaptionD.isRead) && (this.mCaptionE.isRead)
                && (this.mCaptionF.isRead) && (this.mCaptionG.isRead) && (this.mCaptionH.isRead)) {
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
       this.nextScene = "Map4";
       gEngine.GameLoop.stop();
   }

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
        this.nextScene = "Myself";
        gEngine.GameLoop.stop();
    }
    
    if (this.mClueNum == 4 && this.switch_music == 0) {
        gEngine.AudioClips.stopBackgroundAudio();
        gEngine.AudioClips.playBackgroundAudio(this.bgmusic2);
        this.switch_music = 1;   
    }
   
//   // This is used to show the current mouse position.
    //var msg = " X=" + gEngine.Input.getMousePosX()/6.3 + " Y=" + gEngine.Input.getMousePosY()/6.3;
//        var msg = " " + this.mHero.getXform().getPosition();
//
//        this.mMsg.setText(msg); 
//        this.mMsg.getXform().setPosition(50,2);
        
};
