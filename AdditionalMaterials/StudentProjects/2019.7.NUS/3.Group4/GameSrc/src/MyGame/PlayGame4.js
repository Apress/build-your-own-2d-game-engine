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

function PlayGame4() {    
    // The camera to view the scene
    this.logo1 = "assets/Map3Clues/black.png"
    this.heroLogo = "assets/Map4Clues/player4.png"
    this.logo_item = "assets/Map4Clues/item-green.png"
    this.logo_clue = "assets/Map4Clues/clue-green.png"
    this.kBg = "assets/bg.png";
    this.door = "assets/door.png";
    
    this.bgmusic = "assets/bgm/NO4-start-end.mp3";

    this.kBgNormal = "assets/bg_normal.png";
    this.kCaption1 = "assets/Map4Clues/openWords.png";
    this.kCaption2 = "assets/Map4Clues/clue1.png";
    this.kCaption3 = "assets/Map4Clues/clue2-1.png";
    this.kCaption4 = "assets/Map4Clues/clue2-2.png";
    this.kCaption5 = "assets/Map4Clues/clue3-1.png";
    this.kCaption6 = "assets/Map4Clues/clue3-2.png";
    this.kCaption7 = "assets/Map4Clues/clue3-3.png";
    this.kCaption8 = "assets/Map4Clues/clue4-1.png";
    this.kCaption9 = "assets/Map4Clues/clue4-2.png";
    this.kCaption10 = "assets/Map4Clues/clue4-3.png";
    this.kCaption11 = "assets/Map4Clues/clue5.png";
    this.kCaption12 = "assets/Map4Clues/endWords.png";
    
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

    this.itemPoint1 = null;
    this.itemPoint2 = null;
    this.itemPoint3 = null;
    this.itemPoint4 = null;
    this.itemPoint5 = null;
    
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
     
    this.heroLight = null;
    this.heroCamera = null;
    this.mGlobalLightSet = null;
    this.mBg = null;
    
    this.kDelta = 0.18;
    this.deltaV = 0.1;
    
    
    this.mMsg = null;
    this.mPositionMsg = null;
    this.mEverywhereMsg;
    this.mClueMsg = null;
    this.mStartCaption = null;
    this.mEndCaption = null;
    this.mStartTimer = 120;
    this.mCaptionA = null;
    this.mCaptionB1 = null;
    this.mCaptionB2 = null;
    this.mCaptionC1 = null;
    this.mCaptionC2 = null;    
    this.mCaptionC3 = null;
    this.mCaptionD1 = null;
    this.mCaptionD2 = null;    
    this.mCaptionD3 = null;
    this.mCaptionE1 = null;
    this.mIsFollow = true;
    this.IsMove = true;
    this.nextScene = "";
    

    this.mClueNum = 5;
    this.mEverywhere = null;
    this.foundEntrance = false;
    this.mBlackScene = null;
    this.mHeroPoint = null;
    
    
    
    
}

gEngine.Core.inheritPrototype(PlayGame4, Scene);


PlayGame4.prototype.loadScene = function () {
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
    gEngine.Textures.loadTexture(this.kCaption12);
    gEngine.Textures.loadTexture(this.door);


    
    gEngine.AudioClips.loadAudio(this.bgmusic);
//    gEngine.Textures.loadTexture(this.Caption1);
};

PlayGame4.prototype.unloadScene = function () {
    gEngine.AudioClips.stopBackgroundAudio();
//    gEngine.Textures.unloadTexture(this.logo1);
//    gEngine.Textures.unloadTexture(this.kBg);
//    gEngine.Textures.unloadTexture(this.kBgNormal);
//    gEngine.Textures.unloadTexture(this.Caption1);

    //    gEngine.Textures.unloadTexture(this.kLogo);
    if (this.nextScene === "Map5") {
        gEngine.Core.startScene(new PlayGame5());
    } else if (this.nextScene === "Myself") {
        gEngine.Core.startScene(new PlayGame4());
    } 

};

PlayGame4.prototype.initialize = function () {
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
    this.msquare1.getXform().setPosition(22.5, 97.5);
    this.msquare1.getXform().setSize(45, 5); 
    
    this.msquare2 = new Item(this.logo1);
    this.msquare2.getXform().setPosition(2.5, 50);
    this.msquare2.getXform().setSize(5, 90);

    this.msquare3 = new Item(this.logo1);
    this.msquare3.getXform().setPosition(50, 2.5);
    this.msquare3.getXform().setSize(100, 5);

    this.msquare4 = new Item(this.logo1);       
    this.msquare4.getXform().setPosition(97.5, 50);
    this.msquare4.getXform().setSize(5, 90);

    this.msquare5 = new Item(this.logo1);
    this.msquare5.getXform().setPosition(10, 87.5);
    this.msquare5.getXform().setSize(10, 5);
 
    this.msquare6 = new Item(this.logo1);
    this.msquare6.getXform().setPosition(22.5, 90);
    this.msquare6.getXform().setSize(5, 10);

    this.msquare7 = new Item(this.logo1);
    this.msquare7.getXform().setPosition(42.5, 90);
    this.msquare7.getXform().setSize(5, 10);
    
    this.msquare8 = new Item(this.logo1);
    this.msquare8.getXform().setPosition(32.5, 85);
    this.msquare8.getXform().setSize(5, 10);
    
    this.msquare9 = new Item(this.logo1);
    this.msquare9.getXform().setPosition(52.5, 85);
    this.msquare9.getXform().setSize(5, 10);
    
    this.msquare10 = new Item(this.logo1);
    this.msquare10.getXform().setPosition(32.5, 77.5);
    this.msquare10.getXform().setSize(45, 5);
    
    this.msquare11 = new Item(this.logo1);
    this.msquare11.getXform().setPosition(12.5, 70);
    this.msquare11.getXform().setSize(5, 10);
    
    this.msquare12 = new Item(this.logo1);
    this.msquare12.getXform().setPosition(32.5, 60);
    this.msquare12.getXform().setSize(5, 30);
    
    this.msquare13 = new Item(this.logo1);
    this.msquare13.getXform().setPosition(42.5, 52.5);
    this.msquare13.getXform().setSize(15, 5);
    
    this.msquare14 = new Item(this.logo1);
    this.msquare14.getXform().setPosition(52.5, 55);
    this.msquare14.getXform().setSize(5, 30);
    
    this.msquare15 = new Item(this.logo1);
    this.msquare15.getXform().setPosition(45, 62.5);
    this.msquare15.getXform().setSize(10, 5);
    
    this.msquare16 = new Item(this.logo1);
    this.msquare16.getXform().setPosition(42.5, 67.5);
    this.msquare16.getXform().setSize(5, 5);
    
    this.msquare17 = new Item(this.logo1);
    this.msquare17.getXform().setPosition(67.5, 62.5);
    this.msquare17.getXform().setSize(25, 5);
    
    this.msquare18 = new Item(this.logo1);
    this.msquare18.getXform().setPosition(62.5, 80);
    this.msquare18.getXform().setSize(5, 30);
    
    this.msquare19 = new Item(this.logo1);
    this.msquare19.getXform().setPosition(77.5, 97.5);
    this.msquare19.getXform().setSize(45, 5);
    
    this.msquare20 = new Item(this.logo1);
    this.msquare20.getXform().setPosition(90, 62.5);
    this.msquare20.getXform().setSize(10, 5);
    
    this.msquare21 = new Item(this.logo1);
    this.msquare21.getXform().setPosition(92.5, 55);
    this.msquare21.getXform().setSize(5, 10);
    
    this.msquare22 = new Item(this.logo1);
    this.msquare22.getXform().setPosition(72.5, 52.5);
    this.msquare22.getXform().setSize(25, 5);
    
    this.msquare23 = new Item(this.logo1);
    this.msquare23.getXform().setPosition(82.5, 40);
    this.msquare23.getXform().setSize(5, 20);
    
    this.msquare24 = new Item(this.logo1);
    this.msquare24.getXform().setPosition(87.5, 42.5);
    this.msquare24.getXform().setSize(5, 5);
    
    this.msquare25 = new Item(this.logo1);
    this.msquare25.getXform().setPosition(70, 42.5);
    this.msquare25.getXform().setSize(20, 5);
    
    this.msquare26 = new Item(this.logo1);
    this.msquare26.getXform().setPosition(62.5, 35);
    this.msquare26.getXform().setSize(5, 10);
    
    this.msquare27 = new Item(this.logo1);
    this.msquare27.getXform().setPosition(50, 32.5);
    this.msquare27.getXform().setSize(20, 5);
    
    this.msquare28 = new Item(this.logo1);
    this.msquare28.getXform().setPosition(42.5, 40);
    this.msquare28.getXform().setSize(5, 10);
    
    this.msquare29 = new Item(this.logo1);
    this.msquare29.getXform().setPosition(32.5, 30);
    this.msquare29.getXform().setSize(5, 10);
    
    this.msquare30 = new Item(this.logo1);
    this.msquare30.getXform().setPosition(22.5, 37.5);
    this.msquare30.getXform().setSize(25, 5);
    
    this.msquare31 = new Item(this.logo1);
    this.msquare31.getXform().setPosition(22.5, 55);
    this.msquare31.getXform().setSize(5, 30);
    
    this.msquare32 = new Item(this.logo1);
    this.msquare32.getXform().setPosition(10, 57.5);
    this.msquare32.getXform().setSize(10, 5);
    
    this.msquare33 = new Item(this.logo1);
    this.msquare33.getXform().setPosition(15, 47.5);
    this.msquare33.getXform().setSize(10, 5);
    
    this.msquare34 = new Item(this.logo1);
    this.msquare34.getXform().setPosition(10, 32.5);
    this.msquare34.getXform().setSize(10, 5);
    
    this.msquare35 = new Item(this.logo1);
    this.msquare35.getXform().setPosition(12.5, 17.5);
    this.msquare35.getXform().setSize(5, 15);
    
    this.msquare36 = new Item(this.logo1);
    this.msquare36.getXform().setPosition(15, 7.5);
    this.msquare36.getXform().setSize(10, 5);
    
    this.msquare37 = new Item(this.logo1);
    this.msquare37.getXform().setPosition(22.5, 22.5);
    this.msquare37.getXform().setSize(5, 15);
    
    this.msquare38 = new Item(this.logo1);
    this.msquare38.getXform().setPosition(30, 7.5);
    this.msquare38.getXform().setSize(10, 5);
    
    this.msquare39 = new Item(this.logo1);
    this.msquare39.getXform().setPosition(42.5, 10);
    this.msquare39.getXform().setSize(5, 10);
    
    this.msquare40 = new Item(this.logo1);
    this.msquare40.getXform().setPosition(52.5, 10);
    this.msquare40.getXform().setSize(5, 10);
    
    this.msquare41 = new Item(this.logo1);
    this.msquare41.getXform().setPosition(65, 12.5);
    this.msquare41.getXform().setSize(20, 5);
    
    this.msquare42 = new Item(this.logo1);
    this.msquare42.getXform().setPosition(62.5, 20);
    this.msquare42.getXform().setSize(5, 10);
    
    this.msquare43 = new Item(this.logo1);
    this.msquare43.getXform().setPosition(55, 22.5);
    this.msquare43.getXform().setSize(10, 5);
    
    this.msquare44 = new Item(this.logo1);
    this.msquare44.getXform().setPosition(72.5, 25);
    this.msquare44.getXform().setSize(5, 20);
    
    this.msquare45 = new Item(this.logo1);
    this.msquare45.getXform().setPosition(82.5, 22.25);
    this.msquare45.getXform().setSize(15, 5);
    
    this.msquare46 = new Item(this.logo1);
    this.msquare46.getXform().setPosition(85, 10);
    this.msquare46.getXform().setSize(10, 10);
    
    this.msquare47 = new Item(this.logo1);
    this.msquare47.getXform().setPosition(92.5, 32.5);
    this.msquare47.getXform().setSize(5, 5);
    
    this.msquare48 = new Item(this.logo1);
    this.msquare48.getXform().setPosition(73.74, 88.75);
    this.msquare48.getXform().setSize(2.5, 2.5);
    
    this.msquare49 = new Item(this.logo1);
    this.msquare49.getXform().setPosition(71.25, 85);
    this.msquare49.getXform().setSize(2.5, 10);
    
    this.msquare50 = new Item(this.logo1);
    this.msquare50.getXform().setPosition(85, 88.75);
    this.msquare50.getXform().setSize(10, 2.5);
    
    this.msquare51 = new Item(this.logo1);
    this.msquare51.getXform().setPosition(88.75,86.25);
    this.msquare51.getXform().setSize(2.5, 2.5);
    
    this.msquare52 = new Item(this.logo1);
    this.msquare52.getXform().setPosition(88.75, 75);
    this.msquare52.getXform().setSize(2.5, 10);
    
    this.msquare53 = new Item(this.logo1);
    this.msquare53.getXform().setPosition(86.25, 71.25);
    this.msquare53.getXform().setSize(2.5, 2.5);
    
    this.msquare54 = new Item(this.logo1);
    this.msquare54.getXform().setPosition(75, 71.25);
    this.msquare54.getXform().setSize(10, 2.5);
    
    this.msquare55 = new Item(this.logo1);
    this.msquare55.getXform().setPosition(71.25, 73,75);
    this.msquare55.getXform().setSize(2.5, 2.5);
    
    this.msquare56 = new Item(this.logo1);
    this.msquare56.getXform().setPosition(80, 80);
    this.msquare56.getXform().setSize(3.5, 3.5);
    
    this.msquare57 = new Item(this.logo1);
    this.msquare57.getXform().setPosition(72.5, 57.5);
    this.msquare57.getXform().setSize(5, 5);
    
    this.msquare58 = new Item(this.logo1);
    this.msquare58.getXform().setPosition(32.5, 15);
    this.msquare58.getXform().setSize(5, 10);

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
    this.mHero.getXform().setPosition(52.5, 97.5);
    
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

    
    //道具1
    this.mItem1 = new Item(this.logo_clue);
    this.mItem1.getXform().setXPos(17.5);
    this.mItem1.getXform().setYPos(42.5);
    
    this.mItem2 = new Item(this.logo_clue);
    this.mItem2.getXform().setXPos(7.5);
    this.mItem2.getXform().setYPos(7.5);
    
    this.mItem3 = new Item(this.logo_clue);
    this.mItem3.getXform().setXPos(65);
    this.mItem3.getXform().setYPos(7.5);
    
    this.mItem4 = new Item(this.door);
    this.mItem4.getXform().setXPos(80);
    this.mItem4.getXform().setYPos(80);
    
    this.mItem5 = new Item(this.logo_clue);
    this.mItem5.getXform().setXPos(92.5);
    this.mItem5.getXform().setYPos(42.5);
    
    this.mItem6 = new Item(this.logo_clue);
    this.mItem6.getXform().setXPos(67.5);
    this.mItem6.getXform().setYPos(92.5);
    
    this.mItem7 = new Item(this.logo_clue);
    this.mItem7.getXform().setXPos(67.5);
    this.mItem7.getXform().setYPos(18);
    
    this.mItem8 = new Item(this.logo_clue);
    this.mItem8.getXform().setXPos(87);
    this.mItem8.getXform().setYPos(7);
    
    this.mItem9 = new Item(this.logo_item);
    this.mItem9.getXform().setXPos(13);
    this.mItem9.getXform().setYPos(84);
    
    this.mItem10 = new Item(this.logo_item);
    this.mItem10.getXform().setXPos(9);
    this.mItem10.getXform().setYPos(73);
    
    this.mItem11 = new Item(this.logo_item);
    this.mItem11.getXform().setXPos(21);
    this.mItem11.getXform().setYPos(7);
    
    this.mItem12 = new Item(this.logo_item);
    this.mItem12.getXform().setXPos(48);
    this.mItem12.getXform().setYPos(45);
    
    this.mItem13 = new Item(this.logo_item);
    this.mItem13.getXform().setXPos(53);
    this.mItem13.getXform().setYPos(35);
    
    this.mItem14 = new Item(this.logo_item);
    this.mItem14.getXform().setXPos(57);
    this.mItem14.getXform().setYPos(46.5);
    
    this.mItem15 = new Item(this.logo_item);
    this.mItem15.getXform().setXPos(93);
    this.mItem15.getXform().setYPos(17.5);
    
    this.mItem16 = new Item(this.logo_item);
    this.mItem16.getXform().setXPos(82.5);
    this.mItem16.getXform().setYPos(34.2);
    
    this.mItem17 = new Item(this.logo_item);
    this.mItem17.getXform().setXPos(77);
    this.mItem17.getXform().setYPos(80);
    
    this.mItem18 = new Item(this.logo_item);
    this.mItem18.getXform().setXPos(50);
    this.mItem18.getXform().setYPos(2.5);
    
    this.mItem19 = new Item(this.logo_item);
    this.mItem19.getXform().setXPos(50);
    this.mItem19.getXform().setYPos(2.5);
    
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
     
     this.mStartCaption = new Caption(this.kCaption1);
     this.mCaptionA = new Caption(this.kCaption2);
     this.mCaptionB1 = new Caption(this.kCaption3);
     this.mCaptionB2 = new Caption(this.kCaption4);
     this.mCaptionC1 = new Caption(this.kCaption5);
     this.mCaptionC2 = new Caption(this.kCaption6);
     this.mCaptionC3 = new Caption(this.kCaption7);
     this.mCaptionD1 = new Caption(this.kCaption8);
     this.mCaptionD2 = new Caption(this.kCaption9);
     this.mCaptionD3 = new Caption(this.kCaption10);
     this.mCaptionE1 = new Caption(this.kCaption11);
     this.mEndCaption = new Caption(this.kCaption12);
     
     var c = [0.78, 0.93, 0.8, 1];
     this.itemPoint1 = new ItemPoint(17.5, 42.5);
     this.itemPoint2 = new ItemPoint(7.5, 7.5);
     this.itemPoint3 = new ItemPoint(65, 7.5);
     this.itemPoint4 = new ItemPoint(92.5, 42.5);
     this.itemPoint5 = new ItemPoint(67.5,92.5);

     this.itemPoint1.item.setColor(c);
     this.itemPoint2.item.setColor(c);
     this.itemPoint3.item.setColor(c);
     this.itemPoint4.item.setColor(c);
     this.itemPoint5.item.setColor(c);
     
     
     // For the function of key "v"
     this.mBlackScene = new Renderable();
     this.mBlackScene.setColor([0,0,0,1]);
     this.mBlackScene.getXform().setPosition(50, 50);
     this.mBlackScene.getXform().setSize(0,0);
     
     this.mHeroPoint = new Renderable();
     this.mHeroPoint.setColor([0.98, 0.93, 0.90, 1]);
     this.mHeroPoint.getXform().setPosition(50, 50);
     this.mHeroPoint.getXform().setRotationInRad(0.78); // In Radians
     this.mHeroPoint.getXform().setSize(0,0);

     this.mEverywhere = new Renderable();
     this.mEverywhere.setColor([0.22, 0.07, 0.2, 1]);
     this.mEverywhere.getXform().setPosition(80, 80);
     this.mEverywhere.getXform().setRotationInRad(0); // In Radians
     this.mEverywhere.getXform().setSize(0,0);

};

PlayGame4.prototype._createALight = function (type, pos, dir, color, n, f, inner, outer, intensity, dropOff) {
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

PlayGame4.prototype._initializeLights = function (posHero) {
    this.mGlobalLightSet = new LightSet();

    var l = this._createALight(Light.eLightType.ePointLight,
            [posHero[0], posHero[1], 5],         // position
            [0, 0, -1],          // Direction 
            [1.8, 2.7, 1.2, 1.6],  // some color
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


PlayGame4.prototype._modify = function (xpos, ypos){
    this.mGlobalLightSet[0].setXPos(xpos);
    this.mGlobalLightSet[0].setYPos(ypos);
};


PlayGame4.prototype.draw = function () {
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

    this.mBsquare1.draw(this.mCamera);
    this.mBsquare2.draw(this.mCamera);
    this.mBsquare3.draw(this.mCamera);
    this.mBsquare4.draw(this.mCamera);
    
    this.mHero.draw(this.mCamera);
    this.mItem1.draw(this.mCamera);
    this.mItem2.draw(this.mCamera); 
    this.mItem3.draw(this.mCamera);
    this.mItem4.draw(this.mCamera);
    this.mItem5.draw(this.mCamera);
    this.mItem6.draw(this.mCamera);
//    this.mItem7.draw(this.mCamera); 
//    this.mItem8.draw(this.mCamera);
//    this.mItem9.draw(this.mCamera);
//    this.mItem10.draw(this.mCamera);
//    this.mItem11.draw(this.mCamera);
//    this.mItem12.draw(this.mCamera);
//    this.mItem13.draw(this.mCamera);
//    this.mItem14.draw(this.mCamera);
//    this.mItem15.draw(this.mCamera);
//    this.mItem16.draw(this.mCamera);
//    this.mItem17.draw(this.mCamera);
//    this.mItem18.draw(this.mCamera);
//    this.mItem19.draw(this.mCamera);


    
    this.mStartCaption.draw(this.mCamera);
    this.mCaptionA.draw(this.mCamera);
    this.mCaptionB1.draw(this.mCamera);
    this.mCaptionB2.draw(this.mCamera);
    this.mCaptionC1.draw(this.mCamera);
    this.mCaptionC2.draw(this.mCamera);
    this.mCaptionC3.draw(this.mCamera);
    this.mCaptionD1.draw(this.mCamera);
    this.mCaptionD2.draw(this.mCamera);
    this.mCaptionD3.draw(this.mCamera);
    this.mCaptionE1.draw(this.mCamera);
    this.mEndCaption.draw(this.mCamera);    
    this.mBlackScene.draw(this.mCamera);
    this.mHeroPoint.draw(this.mCamera);
    
    this.mEverywhere.draw(this.mCamera);
    this.itemPoint1.item.draw(this.mCamera);
    this.itemPoint2.item.draw(this.mCamera);
    this.itemPoint3.item.draw(this.mCamera);
    this.itemPoint4.item.draw(this.mCamera);
    this.itemPoint5.item.draw(this.mCamera);
    
    this.mMsg.draw(this.mCamera);
    this.mPositionMsg.draw(this.mCamera);
    this.mClueMsg.draw(this.mCamera);
    this.mEverywhereMsg.draw(this.mCamera);   
    
};

// This function will judge if the hero is the indicated circle
PlayGame4.prototype.judgeArea = function(posX, posY, radius) {
    var heroX = this.mHero.getXform().getXPos();
    var heroY = this.mHero.getXform().getYPos();
    
    var distance = (heroX-posX)*(heroX-posX) + (heroY-posY)*(heroY-posY);   
    if (radius*radius > distance) {
        return 1;
    }
}

PlayGame4.prototype.switchCamera = function(toBig) {
    
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


PlayGame4.prototype.showItemPoint= function() {
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
}


PlayGame4.prototype.closeItemPoint= function() {
    
    this.itemPoint1.item.getXform().setSize(0, 0);
    this.itemPoint2.item.getXform().setSize(0, 0);
    this.itemPoint3.item.getXform().setSize(0, 0);
    this.itemPoint4.item.getXform().setSize(0, 0);
    this.itemPoint5.item.getXform().setSize(0, 0);

}


PlayGame4.prototype.addColor = function() {
    var c = this.mHeroPoint.getColor();
    c[0] -= 0.04;
    c[2] -= 0.02;
    this.mHeroPoint.setColor(c);
}


PlayGame4.prototype.update = function () {
    this.mCamera.update();
    this.mHero.update();
    //this.mBg.update();
    
    
//    this.mMsg.setText(this.kDelta);

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
                    hBbox.intersectsBound(this.sq58Bbox) 
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
                    hBbox.intersectsBound(this.sq58Bbox) 
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
                    hBbox.intersectsBound(this.sq58Bbox)            
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
                    hBbox.intersectsBound(this.sq58Bbox) 
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
//        this.mGlobalLightSet.getLightAt(0).setIntensity(3);
//        this.mGlobalLightSet.getLightAt(0).setNear(3)
//        this.mGlobalLightSet.getLightAt(0).setFar(8);
        this.mItem5.getXform().setXPos(-100);
        this.mItem5.getXform().setYPos(-100);
        this.mItem5BBox = this.mItem5.getBBox();
    }


    
    if(hBbox.intersectsBound(this.mItem6BBox)){
//        this.mGlobalLightSet.getLightAt(0).setIntensity(3);
//        this.mGlobalLightSet.getLightAt(0).setNear(3)
//        this.mGlobalLightSet.getLightAt(0).setFar(8);
        this.mItem6.getXform().setXPos(-100);
        this.mItem6.getXform().setYPos(-100);
        this.mItem6BBox = this.mItem6.getBBox();
    }


    

    


    if (gEngine.Input.isButtonPressed(gEngine.Input.mouseButton.Middle)) {
        gEngine.GameLoop.stop();   
    }
    
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
            this.mClueMsg.setText("Lost memories:" + this.mClueNum);
            this.mClueMsg.setTextHeight(2.5);
            this.mClueMsg.getXform().setPosition(3, 98);

            // For everywhere
            if (this.foundEntrance) {
                this.mEverywhereMsg.setText("Exit");
                this.mEverywhereMsg.getXform().setPosition(78, 78);
                this.mEverywhereMsg.setTextHeight(2);
                this.mEverywhere.getXform().setPosition(80,80);
                this.mEverywhere.getXform().setSize(2,2);
            }
            
            this.IsMove = false;
            this.showItemPoint();
        }
    }
    
    // follow the camera or not 
    if (this.mIsFollow == true) {
        this.mCamera.setWCCenter(this.mHero.getXform().getXPos(), this.mHero.getXform().getYPos());
    }
    
    // For the Start Caption
    if (this.judgeArea(50, 97.5, 3) && (this.mStartCaption.isRead == false)) {
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
    if (this.judgeArea(17.5, 42.5, 2) && (this.mCaptionA.isRead == false)) {
        this.mCaptionA.mCaption1.getXform().setSize(100,100);
        this.switchCamera(true);
        this.IsMove = false;
        this.mCaptionA.isRead = true;
        this.mMsg.setText("- Click Enter to close - ");
        this.mMsg.setTextHeight(2);
        this.mMsg.getXform().setPosition(72,2);
        this.mClueNum--;
        this.itemPoint1.isFound = true;
        this.addColor();

    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter) && (this.mCaptionA.isRead == true)) {
        this.mCaptionA.mCaption1.getXform().setSize(0, 0);     
        this.switchCamera(false); 
        this.IsMove = true; 
        this.mMsg.setText("");
    }
    


    // For the Caption B1, B2
    if (this.judgeArea(7.5, 6.5, 2) && (this.mCaptionB1.isRead === false) ) {
        this.mCaptionB1.mCaption1.getXform().setSize(100,100);
        this.switchCamera(true);    
        this.IsMove = false;
        this.mCaptionB1.isRead = true;
        this.mMsg.setText("- Click Enter to close - ");
        this.mMsg.setTextHeight(2);
        this.mMsg.getXform().setPosition(72,2); 
        this.mClueNum--;
        this.itemPoint2.isFound = true;
        this.addColor();
    }
    
        
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter) && (this.mCaptionB1.isRead == true)) {
        this.mCaptionB1.mCaption1.getXform().setSize(0, 0);     
        this.switchCamera(false); 
        this.IsMove = true; 
        this.mMsg.setText("");
    }
    
    // B2
    if (this.judgeArea(7.5, 26.5, 2) && (this.mCaptionB2.isRead == false) && (this.mCaptionB1.isRead == true)) {
        this.mCaptionB2.mCaption1.getXform().setSize(100,100);
        this.switchCamera(true);    
        this.IsMove = false;
        this.mCaptionB2.isRead = true;
        this.mMsg.setText("- Click Enter to close - ");
        this.mMsg.setTextHeight(2);
        this.mMsg.getXform().setPosition(72,2);
     
    }
          
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter) && (this.mCaptionB2.isRead == true)) {
        this.mCaptionB2.mCaption1.getXform().setSize(0, 0);     
        this.switchCamera(false); 
        this.IsMove = true; 
        this.mMsg.setText("");
    }
    
    
    // For the Caption C1, C2 and C3
    if (this.judgeArea(65, 7.5, 2.5) && (this.mCaptionC1.isRead == false)) {
        this.mCaptionC1.mCaption1.getXform().setSize(100,100);
        this.switchCamera(true);    
        this.IsMove = false;    
        this.mCaptionC1.isRead = true;
        this.mMsg.setText("- Click Enter to close - ");
        this.mMsg.setTextHeight(2);
        this.mMsg.getXform().setPosition(72,2);
        this.mClueNum--;
        this.itemPoint3.isFound = true;
        this.addColor();
    }
        
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter) && (this.mCaptionC1.isRead == true)) {
        this.mCaptionC1.mCaption1.getXform().setSize(0, 0);     
        this.switchCamera(false); 
        this.IsMove = true;
        this.mMsg.setText("");
    }
   
    // For the Caption C2
    if (this.judgeArea(77.5, 7.5, 2.5) && (this.mCaptionC2.isRead == false)  && (this.mCaptionC1.isRead == true)) {
        this.mCaptionC2.mCaption1.getXform().setSize(100,100);
        this.switchCamera(true);    
        this.IsMove = false;
        this.mCaptionC2.isRead = true;
        this.mMsg.setText("- Click Enter to close - ");
        this.mMsg.setTextHeight(2);
        this.mMsg.getXform().setPosition(72,2);

    }
        
   
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter) && (this.mCaptionC2.isRead == true)) {
        this.mCaptionC2 .mCaption1.getXform().setSize(0, 0);     
        this.switchCamera(false); 
        this.IsMove = true; 
        this.mMsg.setText("");
    }
    
    
    // For the Caption C3
    if (this.judgeArea(87.5, 17.5, 2.5) && (this.mCaptionC3.isRead == false)  && (this.mCaptionC1.isRead == true)) {
        this.mCaptionC3.mCaption1.getXform().setSize(100,100);
        this.switchCamera(true);    
        this.IsMove = false;
        this.mCaptionC3.isRead = true;
        this.mMsg.setText("- Click Enter to close - ");
        this.mMsg.setTextHeight(2);
        this.mMsg.getXform().setPosition(72,2);

    }
        
  
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter) && (this.mCaptionC3.isRead == true)) {
        this.mCaptionC3.mCaption1.getXform().setSize(0, 0);     
        this.switchCamera(false); 
        this.IsMove = true; 
        this.mMsg.setText("");
    }
    
     // For the Caption D1, D2, D3
    if (this.judgeArea(92.5, 42.5, 2.5) && (this.mCaptionD1.isRead == false)) {
        this.mCaptionD1.mCaption1.getXform().setSize(100,100);
        this.switchCamera(true);    
        this.IsMove = false;
        this.mCaptionD1.isRead = true;
        this.mMsg.setText("- Click Enter to close - ");
        this.mMsg.setTextHeight(2);
        this.mMsg.getXform().setPosition(72,2);
        this.mClueNum--;
        this.itemPoint4.isFound = true;
        this.addColor();
    }
        
   
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter) && (this.mCaptionD1.isRead == true)) {
        this.mCaptionD1.mCaption1.getXform().setSize(0, 0);     
        this.switchCamera(false); 
        this.IsMove = true; 
        this.mMsg.setText("");
    }
    
    // For the Caption D2
    if (this.judgeArea(82.5, 57.5, 2.5) && (this.mCaptionD2.isRead == false)  && (this.mCaptionD1.isRead == true)) {
        this.mCaptionD2.mCaption1.getXform().setSize(100,100);
        this.switchCamera(true);    
        this.IsMove = false;
        this.mCaptionD2.isRead = true;
        this.mMsg.setText("- Click Enter to close - ");
        this.mMsg.setTextHeight(2);
        this.mMsg.getXform().setPosition(72,2);

    }
        
   
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter) && (this.mCaptionD2.isRead == true)) {
        this.mCaptionD2 .mCaption1.getXform().setSize(0, 0);     
        this.switchCamera(false); 
        this.IsMove = true; 
        this.mMsg.setText("");
    }
    
    // The D3
    // For the Caption C3
    if (this.judgeArea(82.5, 67.5, 2.5) && (this.mCaptionD3.isRead == false)  && (this.mCaptionD1.isRead == true)) {
        this.mCaptionD3.mCaption1.getXform().setSize(100,100);
        this.switchCamera(true);    
        this.IsMove = false;
        this.mCaptionD3.isRead = true;
        this.mMsg.setText("- Click Enter to close - ");
        this.mMsg.setTextHeight(2);
        this.mMsg.getXform().setPosition(72,2);

    }
        
//  
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter) && (this.mCaptionD3.isRead == true)) {
        this.mCaptionD3.mCaption1.getXform().setSize(0, 0);     
        this.switchCamera(false); 
        this.IsMove = true; 
        this.mMsg.setText("");
    }
    
    // For the E1
    if (this.judgeArea(67.5, 92.5, 2.5) && (this.mCaptionE1.isRead == false)) {
        this.mCaptionE1.mCaption1.getXform().setSize(100,100);
        this.switchCamera(true);    
        this.IsMove = false;
        this.mCaptionE1.isRead = true;
        this.mMsg.setText("- Click Enter to close - ");
        this.mMsg.setTextHeight(2);
        this.mMsg.getXform().setPosition(72,2);
        this.mClueNum --;
        this.itemPoint5.isFound = true;
        this.addColor();
    }
        
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter) && (this.mCaptionE1.isRead == true)) {
        this.mCaptionE1.mCaption1.getXform().setSize(0, 0);     
        this.switchCamera(false); 
        this.IsMove = true; 
        this.mMsg.setText("");
    }
    
    
    
    // The end words
    if (this.judgeArea(80, 80, 5) && this.mClueNum == 0) {
        this.foundEntrance = true;
        this.mEndCaption.mCaption1.getXform().setSize(100,100);
        this.switchCamera(true);    
        this.IsMove = false;
        this.mEndCaption.isRead = true;
        this.mMsg.setText("- Enter - ");
        this.mMsg.setTextHeight(3);
        this.mMsg.getXform().setPosition(78,3);
    }

//  
//  
//
//    
//    
//    // if meet the entrance
//    if (this.judgeArea(37.5, 52.5, 3) && (this.mEndCaption.isRead == false)) {
//        if ((this.mCaptionA.isRead) && (this.mCaptionB.isRead) && (this.mCaptionC.isRead) && (this.mCaptionD.isRead) && (this.mCaptionE.isRead)
//                && (this.mCaptionF.isRead) && (this.mCaptionG.isRead)) {
//            this.mEndCaption.mCaption1.getXform().setSize(100,100);
//            this.switchCamera(true);    
//            this.IsMove = false;
//            this.mEndCaption.isRead = true;
//        // if haven't collected all of clues
//        } else {
//            this.mMsg.getXform().setPosition(this.mHero.getXform().getXPos()-10, this.mHero.getXform().getYPos());
//            this.mMsg.setText("I forget something"); 
//            this.mMsg.setTextHeight(1.2);
//        }    
//    }
   
   
   // When this level is finished
   if (this.mEndCaption.isRead && gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter)) {
       this.nextScene = "Map5";
       gEngine.GameLoop.stop();
   }
   

   if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
        this.nextScene = "Myself";
        gEngine.GameLoop.stop();
   }
//   // This is used to show the current mouse position.
//    var msg = " X=" + gEngine.Input.getMousePosX()/6.3 + " Y=" + gEngine.Input.getMousePosY()/6.3;
//        this.mMsg.setText(msg); 
//        this.mMsg.getXform().setPosition(50,2);
//        
};
