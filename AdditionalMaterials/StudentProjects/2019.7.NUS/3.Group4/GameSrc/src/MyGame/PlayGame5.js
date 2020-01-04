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

function PlayGame5() {    
    // The camera to view the scene
    this.logo1 = "assets/Map1Clues/empty-color.png"
    this.kBg = "assets/end/end-1.png";
    this.kBg2 = "assets/end/end-2.png";
    this.kBg3 = "assets/end/end-3.png";
    this.kBg4 = "assets/end/end-4.png";
    this.letter = "assets/letter.png";


    this.logo_clue = "assets/Map1Clues/clue-blue.png";
    this.logo_item = "assets/Map1Clues/item-blue.png";
    this.heroLogo = "assets/Map5Clues/player5.png"
    
    this.bgmusic = "assets/bgm/NO5.mp3";
    this.bgmusic2 = "assets/bgm/NO5-end.mp3";
    this.bgmusic3 = "assets/bgm/ForPlayers.mp3";

    
    this.soundbook = "assets/sound/book.mp3"
    this.soundbook_played = 0;
    this.timer = 0;

    this.door = "assets/door.png";
    
    this.kBgNormal = "assets/bg_normal.png";
    this.kCaption1 = "assets/Map5Clues/end-clue-1.png";
    this.kCaption2 = "assets/Map5Clues/end-clue-2.png";
    this.kCaption3 = "assets/Map5Clues/end-clue-3.png";
    this.kCaption4 = "assets/Map5Clues/end-clue-4.png";
    
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
    
    this.mBsquare1 = null;
    this.mBsquare2 = null;
    this.mBsquare3 = null;
    this.mBsquare4 = null;
    
    this.mHero = null;
    this.mItem1 = null; //加速道具
    this.mItem2 = null; //减速道具
    this.mItem3 = null; //放大灯道具
    this.mItem4 = null;
    this.mItem5 = null; //瞬   
    this.mItem6 = null;
    this.mItem7 = null;
    this.mItem8 = null;
    
    this.itemPoint1 = null;
    this.itemPoint2 = null;
    this.itemPoint3 = null;
    
    this.mdoor = null;
    
    
    this.BboxSet = null;
    
    this.mItem1BBox = null;
    this.mItem2BBox = null;
    this.mItem3BBox = null;
    this.mItem4BBox = null;
    this.mItem5BBox = null;
    this.mItem6BBox = null;
    this.mItem7BBox = null;
    this.mItem8BBox = null;
    
    this.heroLight = null;
    this.heroCamera = null;
    this.mGlobalLightSet = null;
    this.mBg = null;
    this.mBg2 = null;
    this.mBg3 = null;
    this.mBg4 = null;

    
    this.kDelta = 0.18;
    this.deltaV = 0.1;
    
    
    this.mMsg = null;
    this.mPositionMsg = null;
    this.mEverywhereMsg;
    this.mClueMsg = null;
    this.mClueNum = 4;
    this.mStartCaption = null;
    this.mEndCaption = null;
    this.mStartTimer = 120;
    this.mCaptionA = null;
    this.mCaptionB = null;
    this.mCaptionC = null;
    this.mCaptionD = null;
    this.mIsFollow = true;
    this.IsMove = true;
    this.nextScene = "";
    this.mBlackScene = null;
    this.mHeroPoint = null;
    this.mEverywhere = null;
    this.foundEntrance = false;
    this.mLetter = null;
    this.readLetter = false;

    
    
}

gEngine.Core.inheritPrototype(PlayGame5, Scene);


PlayGame5.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.logo1);
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kBg2);
    gEngine.Textures.loadTexture(this.kBg3);
    gEngine.Textures.loadTexture(this.kBg4);
    gEngine.Textures.loadTexture(this.logo_clue);
    gEngine.Textures.loadTexture(this.logo_item);
    gEngine.Textures.loadTexture(this.kBgNormal);
    gEngine.Textures.loadTexture(this.kCaption1);
    gEngine.Textures.loadTexture(this.kCaption2);
    gEngine.Textures.loadTexture(this.kCaption3);
    gEngine.Textures.loadTexture(this.kCaption4);
    gEngine.Textures.loadTexture(this.heroLogo);
    gEngine.Textures.loadTexture(this.letter);

    
    gEngine.Textures.loadTexture(this.door);
    gEngine.AudioClips.loadAudio(this.bgmusic);
    gEngine.AudioClips.loadAudio(this.bgmusic2);    
    gEngine.AudioClips.loadAudio(this.bgmusic3);
    gEngine.AudioClips.loadAudio(this.soundbook);

//    gEngine.Textures.loadTexture(this.Caption1);
};

PlayGame5.prototype.unloadScene = function () {
//    gEngine.Textures.unloadTexture(this.logo1);
//    gEngine.Textures.unloadTexture(this.kBg);
//    gEngine.Textures.unloadTexture(this.kBgNormal);
//    gEngine.Textures.unloadTexture(this.Caption1);
    gEngine.AudioClips.stopBackgroundAudio();
    
    //    gEngine.Textures.unloadTexture(this.kLogo);
    if (this.nextScene === "Myself") {
        gEngine.Core.startScene(new PlayGame5());
    } else {
        gEngine.Core.startScene(new StartUI());
    }

};

PlayGame5.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 50), // position of the camera
        100,                     // width of camera
        [0, 0, 630, 630]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([1,0.98,0.85,1]);   
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    gEngine.AudioClips.playBackgroundAudio(this.bgmusic);

    
    var r1 = new Renderable();
    r1.setColor([0, 0, 0, 1]);
    this.msquare1 = new GameObject(r1);
    this.msquare1.getXform().setPosition(10, 70);
    this.msquare1.getXform().setSize(20, 60); 
    
    var r2 = new Renderable();
    r2.setColor([0, 0, 0, 1]);
    this.msquare2 = new GameObject(r2);
    this.msquare2.getXform().setPosition(60, 95);
    this.msquare2.getXform().setSize(80, 10);
    
    var r3 = new Renderable();
    r3.setColor([0, 0, 0, 1]);
    this.msquare3 = new GameObject(r3);
    this.msquare3.getXform().setPosition(55, 75);
    this.msquare3.getXform().setSize(50, 10);
    
    var r4 = new Renderable();
    r4.setColor([0, 0, 0, 1]);
    this.msquare4 = new GameObject(r4);
    this.msquare4.getXform().setPosition(40, 50);
    this.msquare4.getXform().setSize(20, 40);

    var r5 = new Renderable();
    r5.setColor([0, 0, 0, 1]);
    this.msquare5 = new GameObject(r5);
    this.msquare5.getXform().setPosition(70, 55);
    this.msquare5.getXform().setSize(20, 30);
 
    var r6 = new Renderable();
    r6.setColor([0, 0, 0, 1]);
    this.msquare6 = new GameObject(r6);
    this.msquare6.getXform().setPosition(55, 15);
    this.msquare6.getXform().setSize(90, 30);
    
    var r7 = new Renderable();
    r7.setColor([0, 0, 0, 1]);
    this.msquare7 = new GameObject(r7);
    this.msquare7.getXform().setPosition(95, 60);
    this.msquare7.getXform().setSize(10, 60);
    
    var r8 = new Renderable();
    r8.setColor([0, 0, 0, 1]);
    this.msquare8 = new GameObject(r8);
    this.msquare8.getXform().setPosition(95, 70);
    this.msquare8.getXform().setSize(0, 0);
    
    this.msquare9 = new Renderable();
    this.msquare9.getXform().setPosition(5, 95);
    this.msquare9.getXform().setSize(10, 10);
    this.msquare9.setColor([1, 0, 0, 1]);
    
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
    this.mHero.getXform().setPosition(55, 65)
    
    //道具1
    this.mItem1 = new Item(this.logo_item);
    this.mItem1.getXform().setXPos(35);
    this.mItem1.getXform().setYPos(35);
    
    this.mItem2 = new Item(this.logo_item);
    this.mItem2.getXform().setXPos(45);
    this.mItem2.getXform().setYPos(35);
    
    this.mItem3 = new Item(this.logo_item);
    this.mItem3.getXform().setXPos(55);
    this.mItem3.getXform().setYPos(35);
    
    this.mItem4 = new Item(this.logo_item);
    this.mItem4.getXform().setXPos(65);
    this.mItem4.getXform().setYPos(35);
    
    this.mItem5 = new Item(this.logo_item);
    this.mItem5.getXform().setXPos(75);
    this.mItem5.getXform().setYPos(35);
    
    this.mItem6 = new Item(this.logo_clue);
    this.mItem6.getXform().setXPos(55);
    this.mItem6.getXform().setYPos(65);
    
    this.mItem7 = new Item(this.logo_clue);
    this.mItem7.getXform().setXPos(55);
    this.mItem7.getXform().setYPos(95);
    
    this.mItem8 = new Item(this.logo_clue);
    this.mItem8.getXform().setXPos(85);
    this.mItem8.getXform().setYPos(95);
 
    this.itemPoint1 = new ItemPoint(55, 65);
    this.itemPoint1.item.setColor([0.14, 0.66, 0.88, 1]);

    this.itemPoint2 = new ItemPoint(55, 95);
    this.itemPoint2.item.setColor([0.14, 0.66, 0.88, 1]);

    this.itemPoint3 = new ItemPoint(85, 95);
    this.itemPoint3.item.setColor([0.14, 0.66, 0.88, 1]);

    
    this.mdoor = new Item(this.door);
    this.mdoor.getXform().setXPos(5);
    this.mdoor.getXform().setYPos(10);
    this.mdoor.getXform().setSize(5,5);
    
    var sq1Bbox = this.msquare1.getBBox();
    var sq2Bbox = this.msquare2.getBBox();
    var sq3Bbox = this.msquare3.getBBox();
    var sq4Bbox = this.msquare4.getBBox();
    var sq5Bbox = this.msquare5.getBBox();
    var sq6Bbox = this.msquare6.getBBox();
    var sq7Bbox = this.msquare7.getBBox();
    var sq8Bbox = this.msquare8.getBBox();
    
    this.BboxSet = new GameObjectSet();
    this.BboxSet.addToSet(sq1Bbox);
    this.BboxSet.addToSet(sq2Bbox);
    this.BboxSet.addToSet(sq3Bbox);
    this.BboxSet.addToSet(sq4Bbox);
    this.BboxSet.addToSet(sq5Bbox);   
    this.BboxSet.addToSet(sq6Bbox);
    this.BboxSet.addToSet(sq7Bbox);
    this.BboxSet.addToSet(sq8Bbox);
    
    this.mMsg = new FontRenderable("");
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.getXform().setPosition(75, 2);
    this.mMsg.setTextHeight(2);
    
    this.mPositionMsg = new FontRenderable("");
    this.mPositionMsg.setColor([1, 1, 1, 1]);
    this.mPositionMsg.getXform().setPosition(0, 0);
    this.mPositionMsg.setTextHeight(4);
    
    this.mEverywhereMsg = new FontRenderable("");
    this.mEverywhereMsg.setColor([1, 1, 1, 1]);
    this.mEverywhereMsg.getXform().setPosition(0, 0);
    this.mEverywhereMsg.setTextHeight(4);

    this.mClueMsg = new FontRenderable("");
    this.mClueMsg.setColor([0.97, 0.952, 0.98, 1]);
    this.mClueMsg.getXform().setPosition(75, 75);
    this.mClueMsg.setTextHeight(3);
     
    this._initializeLights(this.mHero.getXform().getPosition());
 
    // 
    var bgR = new IllumRenderable(this.kBg, this.kBgNormal);
    bgR.setElementPixelPositions(0, 2048, 0, 2048);
    bgR.getXform().setSize(100, 100);
    bgR.getXform().setPosition(50, 50);
    this.mBg = new GameObject(bgR);  
    
    var bgR2 = new IllumRenderable(this.kBg2, this.kBgNormal);
    bgR2.setElementPixelPositions(0, 2048, 0, 2048);
    bgR2.getXform().setSize(0, 0);
    bgR2.getXform().setPosition(50, 50);
    this.mBg2 = new GameObject(bgR2);  
    
    var bgR3 = new IllumRenderable(this.kBg3, this.kBgNormal);
    bgR3.setElementPixelPositions(0, 2048, 0, 2048);
    bgR3.getXform().setSize(0, 0);
    bgR3.getXform().setPosition(50, 50);
    this.mBg3 = new GameObject(bgR3);  
    
    var bgR4 = new IllumRenderable(this.kBg4, this.kBgNormal);
    bgR4.setElementPixelPositions(0, 2048, 0, 2048);
    bgR4.getXform().setSize(0, 0);
    bgR4.getXform().setPosition(50, 50);
    this.mBg4 = new GameObject(bgR4);  
    
    
//    var herolight = new Light();
//    herolight.setLightType(Light.eLightType.ePointLight);
//    herolight.setColor([1, 1, 0, 1]);
//    herolight.setXPos(this.mHero.getXform().getXPos());
//    herolight.setYPos(this.mHero.getXform().getYPos());      
//    herolight.setZPos(5);
//    herolight.setDirection([0, 0, -1]);
//    herolight.setNear(8);
//    herolight.setFar(20);
//    herolight.setInner(0.1);
//    herolight.setOuter(0.2);
//    herolight.setIntensity(5); 
     this.mItem1BBox = this.mItem1.getBBox();
     this.mItem2BBox = this.mItem2.getBBox();
     this.mItem3BBox = this.mItem3.getBBox();
     this.mItem4BBox = this.mItem4.getBBox();
     this.mItem5BBox = this.mItem5.getBBox();
     this.mItem6BBox = this.mItem6.getBBox();
     this.mItem7BBox = this.mItem7.getBBox();
     this.mItem8BBox = this.mItem8.getBBox();
     
//     this.mdoorBBox = this.mdoor.getBBox();
     
     this.mStartCaption = new Caption(this.kCaption1);
     this.mCaptionA = new Caption(this.kCaption1);
     this.mCaptionB = new Caption(this.kCaption2);
     this.mCaptionC = new Caption(this.kCaption3);
     this.mCaptionD = new Caption(this.kCaption4);
     this.mEndCaption = new Caption(this.letter);
     
     // For the function of key "v"
     this.mBlackScene = new Renderable();
     this.mBlackScene.setColor([0,0,,1]);
     this.mBlackScene.getXform().setPosition(50, 50);
     this.mBlackScene.getXform().setSize(0,0);
     

    this.mMsg = new FontRenderable("");
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.getXform().setPosition(50, 2);
    this.mMsg.setTextHeight(2);
    
     this.mEverywhere = new Renderable();
     this.mEverywhere.setColor([0.86, 0.34, 0.12, 1]);
     this.mEverywhere.getXform().setPosition(50, 50);
     this.mEverywhere.getXform().setRotationInRad(0); // In Radians
     this.mEverywhere.getXform().setSize(0,0);
     
     this.mLetter = new Item(this.letter);
     this.mLetter.getXform().setXPos(50);
     this.mLetter.getXform().setYPos(50);
     this.mLetter.getXform().setSize(0,0);

     

};

PlayGame5.prototype._createALight = function (type, pos, dir, color, n, f, inner, outer, intensity, dropOff) {
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

PlayGame5.prototype._initializeLights = function (posHero) {
    this.mGlobalLightSet = new LightSet();

    var l = this._createALight(Light.eLightType.ePointLight,
            [posHero[0], posHero[1], 5],         // position
            [0, 0, -1],          // Direction 
            [1, 2, 3, 1],  // some color
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

//    l = this._createALight(Light.eLightType.eDirectionalLight,
//            [posHero[0], posHero[1], 4],           // position (not used by directional)
//            [-0.2, -0.2, -1],      // Pointing direction upwards
//            [0.7, 0.7, 0.0, 1],    // color
//            500, 500,              // near anf far distances: essentially switch this off
//            0.1, 0.2,              // inner and outer cones
//            2,                     // intensity
//            1.0                    // drop off
//            );
//    this.mGlobalLightSet.addToSet(l);

//    l = this._createALight(Light.eLightType.eSpotLight,
//            [posHero[0], posHero[1], 10],            // Right minion position
//            [-0.07,  0, -1],     // direction
//            [0.5, 0.5, 0.5, 1],     // color
//            100, 100,                  // near and far distances
//            1.65, 1.7,               // inner outter angles (in radius)
//            5,                     // intensity
//            1.2                     // drop off
//            );
//    this.mGlobalLightSet.addToSet(l);
//
//    l = this._createALight(Light.eLightType.eSpotLight,
//            [posHero[0], posHero[1], 10],            // Center of camera 
//            [0.0, 0.03, -1],
//            [0.8, 0.8, 0.2, 1],      //  color
//            100, 100,                   // near and far distances
//            1.9, 2.0,                // inner and outer cones
//            2,                       // intensity
//            1                      // drop off
//            );
//    this.mGlobalLightSet.addToSet(l);
};


//PlayGame5.prototype._modify = function (xpos, ypos){
//    this.mGlobalLightSet[0].setXPos(xpos);
//    this.mGlobalLightSet[0].setYPos(ypos);
//};

PlayGame5.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    
    this.mCamera.setupViewProjection();
    this.msquare1.draw(this.mCamera);
    this.msquare2.draw(this.mCamera);
    this.msquare3.draw(this.mCamera);
    this.msquare4.draw(this.mCamera);
    this.msquare5.draw(this.mCamera);
    this.msquare6.draw(this.mCamera);
    this.msquare7.draw(this.mCamera);
    this.msquare8.draw(this.mCamera);
    
    this.mBsquare1.draw(this.mCamera);
    this.mBsquare2.draw(this.mCamera);
    this.mBsquare3.draw(this.mCamera);
    this.mBsquare4.draw(this.mCamera);
    
//    this.mItem1.draw(this.mCamera);
//    this.mItem2.draw(this.mCamera); 
//    this.mItem3.draw(this.mCamera);
//    this.mItem4.draw(this.mCamera);
//    this.mItem5.draw(this.mCamera);
//    this.mItem6.draw(this.mCamera);
//    this.mItem7.draw(this.mCamera);
//    this.mItem8.draw(this.mCamera);
    
    this.mdoor.draw(this.mCamera);
    this.mBg.draw(this.mCamera);
    this.mBg2.draw(this.mCamera);
    this.mBg3.draw(this.mCamera);
    this.mBg4.draw(this.mCamera);

    this.mHero.draw(this.mCamera);
    this.mStartCaption.draw(this.mCamera);
    this.mCaptionA.draw(this.mCamera);
    this.mCaptionB.draw(this.mCamera);
    this.mCaptionC.draw(this.mCamera);
    this.mCaptionD.draw(this.mCamera);
    this.mEndCaption.draw(this.mCamera);    
    this.mBlackScene.draw(this.mCamera);
    this.mHeroPoint.draw(this.mCamera);
    this.mLetter.item.draw(this.mCamera);


//    this.mEverywhere.draw(this.mCamera);
    
//    this.itemPoint1.item.draw(this.mCamera);
//    this.itemPoint2.item.draw(this.mCamera);
//    this.itemPoint3.item.draw(this.mCamera);
//
//    this.mEverywhereMsg.draw(this.mCamera);
    this.mMsg.draw(this.mCamera);
//    this.mPositionMsg.draw(this.mCamera);
//    this.mClueMsg.draw(this.mCamera);

    
};

// This function will judge if the hero is the indicated circle
PlayGame5.prototype.judgeArea = function(posX, posY, radius) {
    var heroX = this.mHero.getXform().getXPos();
    var heroY = this.mHero.getXform().getYPos();
    
    var distance = (heroX-posX)*(heroX-posX) + (heroY-posY)*(heroY-posY);   
    if (radius*radius > distance) {
        return 1;
    }
}

PlayGame5.prototype.switchCamera = function(toBig) {
    
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

PlayGame5.prototype.showItemPoint= function() {
    if (this.itemPoint1.isFound == true) {
        this.itemPoint1.item.getXform().setSize(2, 2);
    }
    if (this.itemPoint2.isFound == true) {
        this.itemPoint2.item.getXform().setSize(2, 2);
    }
    if (this.itemPoint3.isFound == true) {
        this.itemPoint3.item.getXform().setSize(2, 2);
    }
}


PlayGame5.prototype.closeItemPoint= function() {
    this.itemPoint1.item.getXform().setSize(0, 0);
    this.itemPoint2.item.getXform().setSize(0, 0);
    this.itemPoint3.item.getXform().setSize(0, 0);
}

PlayGame5.prototype.addColor = function() {
    var c = this.mHeroPoint.getColor();
    c[0] -= 0.21;
    c[1] -= 0.1;
    c[2] -= 0.03;
    this.mHeroPoint.setColor(c);
}


PlayGame5.prototype.update = function () {
    this.mCamera.update();
    this.mHero.update();
    //this.mBg.update();
    this.timer += 1;
    
//    this.mMsg.setText(this.kDelta);

//    var v = this.mGlobalLightSet.getLightAt(0).getColor();
    
    
    var xform = this.mHero.getXform();
    if (this.IsMove == true) {
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W) && this.mHero.getXform().getYPos() <= 98) {
            xform.incYPosBy(this.kDelta);
            var hBbox = this.mHero.getBBox();
            var sq1Bbox = this.msquare1.getBBox();
            var sq2Bbox = this.msquare2.getBBox();
            var sq3Bbox = this.msquare3.getBBox();
            var sq4Bbox = this.msquare4.getBBox();
            var sq5Bbox = this.msquare5.getBBox();
            var sq6Bbox = this.msquare6.getBBox();
            var sq7Bbox = this.msquare7.getBBox();
            var sq8Bbox = this.msquare8.getBBox();
            if(hBbox.intersectsBound(sq1Bbox) ||
                    hBbox.intersectsBound(sq2Bbox) ||
                    hBbox.intersectsBound(sq3Bbox) ||
                    hBbox.intersectsBound(sq4Bbox) ||
                    hBbox.intersectsBound(sq5Bbox) ||
                    hBbox.intersectsBound(sq6Bbox) ||
                    hBbox.intersectsBound(sq7Bbox) ||
                    hBbox.intersectsBound(sq8Bbox) 
                    ){
                xform.incYPosBy(-this.kDelta);      
            }
//            this.mGlobalLightSet.getLightAt(0).setXPos(this.mHero.getXform().getXPos());
//            this.mGlobalLightSet.getLightAt(0).setYPos(this.mHero.getXform().getYPos());
//            this.mGlobalLightSet.getLightAt(1).setXPos(this.mHero.getXform().getXPos());
//            this.mGlobalLightSet.getLightAt(1).setYPos(this.mHero.getXform().getYPos());

        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S) && this.mHero.getXform().getYPos() >= 2) {
            xform.incYPosBy(-this.kDelta);
    //        var hBbox = this.mHero.getBBox();
    //        var sq1Bbox = this.msquare1.getBBox();
    //        if(hBbox.intersectsBound(sq1Bbox)){
    //            xform.incYPosBy(this.kDelta);
    //        }
            var hBbox = this.mHero.getBBox();
            var sq1Bbox = this.msquare1.getBBox();
            var sq2Bbox = this.msquare2.getBBox();
            var sq3Bbox = this.msquare3.getBBox();
            var sq4Bbox = this.msquare4.getBBox();
            var sq5Bbox = this.msquare5.getBBox();
            var sq6Bbox = this.msquare6.getBBox();
            var sq7Bbox = this.msquare7.getBBox();
            var sq8Bbox = this.msquare8.getBBox();
            if(hBbox.intersectsBound(sq1Bbox) ||
                    hBbox.intersectsBound(sq2Bbox) ||
                    hBbox.intersectsBound(sq3Bbox) ||
                    hBbox.intersectsBound(sq4Bbox) ||
                    hBbox.intersectsBound(sq5Bbox) ||
                    hBbox.intersectsBound(sq6Bbox) ||
                    hBbox.intersectsBound(sq7Bbox) ||
                    hBbox.intersectsBound(sq8Bbox) 
                    ){
                xform.incYPosBy(this.kDelta);     
            }
//            this.mGlobalLightSet.getLightAt(0).setXPos(this.mHero.getXform().getXPos());
//            this.mGlobalLightSet.getLightAt(0).setYPos(this.mHero.getXform().getYPos());
//            this.mGlobalLightSet.getLightAt(1).setXPos(this.mHero.getXform().getXPos());
//            this.mGlobalLightSet.getLightAt(1).setYPos(this.mHero.getXform().getYPos());

        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A) && this.mHero.getXform().getXPos() >= 2) {
            xform.incXPosBy(-this.kDelta);
    //        var hBbox = this.mHero.getBBox();
    //        var sq1Bbox = this.msquare1.getBBox();
    //        if(hBbox.intersectsBound(sq1Bbox)){
    //            xform.incXPosBy(this.kDelta);
    //        }
            var hBbox = this.mHero.getBBox();
            var sq1Bbox = this.msquare1.getBBox();
            var sq2Bbox = this.msquare2.getBBox();
            var sq3Bbox = this.msquare3.getBBox();
            var sq4Bbox = this.msquare4.getBBox();
            var sq5Bbox = this.msquare5.getBBox();
            var sq6Bbox = this.msquare6.getBBox();
            var sq7Bbox = this.msquare7.getBBox();
            var sq8Bbox = this.msquare8.getBBox();
            if(hBbox.intersectsBound(sq1Bbox) ||
                    hBbox.intersectsBound(sq2Bbox) ||
                    hBbox.intersectsBound(sq3Bbox) ||
                    hBbox.intersectsBound(sq4Bbox) ||
                    hBbox.intersectsBound(sq5Bbox) ||
                    hBbox.intersectsBound(sq6Bbox) ||
                    hBbox.intersectsBound(sq7Bbox) ||
                    hBbox.intersectsBound(sq8Bbox)                 
                    ){
                xform.incXPosBy(this.kDelta);     
            }
//            this.mGlobalLightSet.getLightAt(0).setXPos(this.mHero.getXform().getXPos());
//            this.mGlobalLightSet.getLightAt(0).setYPos(this.mHero.getXform().getYPos());
//            this.mGlobalLightSet.getLightAt(1).setXPos(this.mHero.getXform().getXPos());
//            this.mGlobalLightSet.getLightAt(1).setYPos(this.mHero.getXform().getYPos());
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D) && this.mHero.getXform().getXPos() <= 98) {
            xform.incXPosBy(this.kDelta);
    //        var hBbox = this.mHero.getBBox();
    //        var sq1Bbox = this.msquare1.getBBox();
    //        if(hBbox.intersectsBound(sq1Bbox)){
    //            xform.incXPosBy(-this.kDelta);
    //        }
            var hBbox = this.mHero.getBBox();
            var sq1Bbox = this.msquare1.getBBox();
            var sq2Bbox = this.msquare2.getBBox();
            var sq3Bbox = this.msquare3.getBBox();
            var sq4Bbox = this.msquare4.getBBox();
            var sq5Bbox = this.msquare5.getBBox();
            var sq6Bbox = this.msquare6.getBBox();
            var sq7Bbox = this.msquare7.getBBox();
            var sq8Bbox = this.msquare8.getBBox();
            if(hBbox.intersectsBound(sq1Bbox) ||
                    hBbox.intersectsBound(sq2Bbox) ||
                    hBbox.intersectsBound(sq3Bbox) ||
                    hBbox.intersectsBound(sq4Bbox) ||
                    hBbox.intersectsBound(sq5Bbox) ||
                    hBbox.intersectsBound(sq6Bbox) ||
                    hBbox.intersectsBound(sq7Bbox) ||
                    hBbox.intersectsBound(sq8Bbox) 
                    ){
                xform.incXPosBy(-this.kDelta);     
            }
//            this.mGlobalLightSet.getLightAt(0).setXPos(this.mHero.getXform().getXPos());
//            this.mGlobalLightSet.getLightAt(0).setYPos(this.mHero.getXform().getYPos());
//            this.mGlobalLightSet.getLightAt(1).setXPos(this.mHero.getXform().getXPos());
//            this.mGlobalLightSet.getLightAt(1).setYPos(this.mHero.getXform().getYPos());
        }
    }
    
    
    

    var hBbox = this.mHero.getBBox();
    
//    if(hBbox.intersectsBound(this.mItem1BBox) || gEngine.Input.isKeyPressed(gEngine.Input.keys.U)){
//        gEngine.AudioClips.stopBackgroundAudio();
//        gEngine.AudioClips.playBackgroundAudio(this.bgmusic2);
//        this.kDelta = 0.5;
//        this.mItem1.getXform().setXPos(-100);
//        this.mItem1.getXform().setYPos(-100);
//        this.mItem1BBox = this.mItem1.getBBox();
//    }
    
//    if(this.timer > 15){
//        this.timer = 0
//        if(hBbox.intersectsBound(this.mItem2BBox) || gEngine.Input.isKeyPressed(gEngine.Input.keys.I)){
//            this.mItem2.getXform().setXPos(-100);
//            this.mItem2.getXform().setYPos(-100);
//            this.mItem2BBox = this.mItem2.getBBox(); 
//            gEngine.AudioClips.playACue(this.soundbook);
//            this.kDelta = 0.1;           
//        }
//    }
    
//    if(hBbox.intersectsBound(this.mItem2BBox) || gEngine.Input.isKeyPressed(gEngine.Input.keys.I)){
//        gEngine.AudioClips.playACue(this.soundbook);
//        this.kDelta = 0.1;
//        this.mItem2.getXform().setXPos(-100);
//        this.mItem2.getXform().setYPos(-100);
//        this.mItem2BBox = this.mItem2.getBBox();
//    }
//    
//    if(hBbox.intersectsBound(this.mItem3BBox) || gEngine.Input.isKeyPressed(gEngine.Input.keys.O)){
//        this.mGlobalLightSet.getLightAt(0).setIntensity(7);
//        this.mGlobalLightSet.getLightAt(0).setFar(15);
//        this.mItem3.getXform().setXPos(-100);
//        this.mItem3.getXform().setYPos(-100);
//        this.mItem3BBox = this.mItem3.getBBox();
//    }
//    
//    if(hBbox.intersectsBound(this.mItem4BBox) || gEngine.Input.isKeyPressed(gEngine.Input.keys.P)){
//        this.mGlobalLightSet.getLightAt(0).setIntensity(3);
//        this.mGlobalLightSet.getLightAt(0).setNear(3)
//        this.mGlobalLightSet.getLightAt(0).setFar(8);
//        this.mItem4.getXform().setXPos(-100);
//        this.mItem4.getXform().setYPos(-1000);
//        this.mItem4BBox = this.mItem4.getBBox();
//    }
//    
//    if(hBbox.intersectsBound(this.mItem5BBox) || gEngine.Input.isKeyPressed(gEngine.Input.keys.L)){
//        
//        var random = Math.random();
//        if(random < 0.33){
//            this.mHero.getXform().setXPos(52);
//            this.mHero.getXform().setYPos(55);
//        }else if(random < 0.667 && random > 0.33){
//            this.mHero.getXform().setXPos(25);
//            this.mHero.getXform().setYPos(85);
//        }else{
//            this.mHero.getXform().setXPos(85);
//            this.mHero.getXform().setYPos(85);
//        }
//        
//        this.mItem5.getXform().setXPos(-100);
//        this.mItem5.getXform().setYPos(-100);
//        this.mItem5BBox = this.mItem5.getBBox();
//    }
    var y = this.mEndCaption.mCaption1.getXform().getYPos();
    var x = this.mEndCaption.mCaption1.getXform().getXPos();
    if (this.readLetter && y < 130 ) {
        y = y + 0.07;
        this.mEndCaption.mCaption1.getXform().setPosition(x, y);
        
    }



    if (gEngine.Input.isButtonPressed(gEngine.Input.mouseButton.Middle)) {
        gEngine.GameLoop.stop();   
    }
    
    
    
//    // press V to follow
//    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.V)) { 
//        //if (this.mCamera.getWCWidth() == 100) {
//            this.switchCamera(false); 
//            this.mBlackScene.getXform().setSize(0,0);
//            this.mHeroPoint.getXform().setSize(0,0);
//            this.mEverywhere.getXform().setSize(0,0);
//            this.IsMove = true;
//            this.mClueMsg.setText("");
//            this.mMsg.setText("");
//            this.mPositionMsg.setText("");
//            this.mEverywhereMsg.setText("");
//            
//            this.closeItemPoint();
//        //}
//        
//    }
//    
//    // press V to pause
//    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.V)) {
//        if (this.mCamera.getWCWidth() < 90 ) {
//            this.switchCamera(true); 
//            this.mBlackScene.getXform().setSize(100,100);
//            this.mHeroPoint.getXform().setPosition(this.mHero.getXform().getXPos(), this.mHero.getXform().getYPos());   
//            this.mHeroPoint.getXform().setSize(4,4);
//            this.mMsg.setText("- Click V to close - ");
//            this.mMsg.setTextHeight(2);
//            this.mMsg.getXform().setPosition(75,2);
//            this.mPositionMsg.getXform().setPosition(this.mHero.getXform().getXPos()-3.5, this.mHero.getXform().getYPos()+0.6);
//            this.mPositionMsg.setText("- You -");
//            this.mPositionMsg.setTextHeight(2);
//            this.mClueMsg.setText("- Lost memories:" + this.mClueNum + " -");
//            this.mClueMsg.setTextHeight(2.2);
//            this.mClueMsg.getXform().setPosition(4, 2);
//            
//            // For everywhere
//            if (this.foundEntrance) {
//                this.mEverywhereMsg.setText("Entrance");
//                this.mEverywhereMsg.getXform().setPosition(36.5, 51);
//                this.mEverywhereMsg.setTextHeight(2);
//                this.mEverywhere.getXform().setPosition(37.5,52.5);
//                this.mEverywhere.getXform().setSize(3,3);
//            }
//            
//            // show the item that has been found on the big map
//            this.showItemPoint();
//            
//            this.IsMove = false;
//        }
//    }
    
//    // follow the camera or not 
//    if (this.mIsFollow == true) {
//        this.mCamera.setWCCenter(this.mHero.getXform().getXPos(), this.mHero.getXform().getYPos());
//    }
    
    // For the first change
    if (this.judgeArea(55, 35, 5) && (this.mStartCaption.isRead == false)) {
        this.mBg.getXform().setSize(0,0);
        this.mBg2.getXform().setSize(100,100);
    }

    // For the second change
    if (this.judgeArea(85, 65, 5) && (this.mStartCaption.isRead == false)) {
        this.mBg2.getXform().setSize(0,0);
        this.mBg3.getXform().setSize(100,100);
    }
    
    // For the third change
    if (this.judgeArea(25, 85, 5) && (this.mStartCaption.isRead == false)) {
        this.mBg3.getXform().setSize(0,0);
        this.mBg4.getXform().setSize(100,100);
    }
    
    // For the Caption A
    if (this.judgeArea(55, 65, 4) && (this.mCaptionA.isRead == false)) {
        this.mCaptionA.mCaption1.getXform().setSize(100,100);   
        this.mCaptionA.isRead = true;
        this.mMsg.getXform().setPosition(75, 2);
        this.mMsg.setText("- Click Enter to close - ");
        this.mMsg.setTextHeight(2);
    }
 
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter) && (this.mCaptionA.isRead == true)) {
        this.mCaptionA.mCaption1.getXform().setSize(0, 0);     
    }
    
    // For the Caption B
    if (this.judgeArea(55, 35, 5) && (this.mCaptionB.isRead == false)) {
        this.mCaptionB.mCaption1.getXform().setSize(100,100);   
        this.mCaptionB.isRead = true;
        this.mMsg.getXform().setPosition(75, 2);
        this.mMsg.setText("- Click Enter to close - ");
        this.mMsg.setTextHeight(2);
    }
        
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter) && (this.mCaptionB.isRead == true)) {
        this.mCaptionB.mCaption1.getXform().setSize(0, 0);     

    }
//    
    // For the Caption C
    if (this.judgeArea(85, 65, 5) && (this.mCaptionC.isRead == false)) {
        this.mCaptionC.mCaption1.getXform().setSize(100,100);   
        this.mCaptionC.isRead = true;
        this.mMsg.getXform().setPosition(75, 2);
        this.mMsg.setText("- Click Enter to close - ");
        this.mMsg.setTextHeight(2);
    }
        
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter) && (this.mCaptionC.isRead == true)) {
        this.mCaptionC.mCaption1.getXform().setSize(0, 0);     
    }

    
    // For the Caption D
    if (this.judgeArea(25, 85, 5) && (this.mCaptionD.isRead == false)) {
        this.mCaptionD.mCaption1.getXform().setSize(100,100);   
        this.mCaptionD.isRead = true;
        this.mMsg.getXform().setPosition(75, 2);
        this.mMsg.setText("- Click Enter to close - ");
        this.mMsg.setTextHeight(2);

    }
        
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter) && (this.mCaptionD.isRead == true)) {
        this.mCaptionD.mCaption1.getXform().setSize(0, 0);     

    }
//    
//    
    // if meet the entrance
    if (this.judgeArea(5, 5, 5) &&  this.mEndCaption.isRead == false) {
        this.mEndCaption.mCaption1.getXform().setPosition(50,-200);
        this.mEndCaption.mCaption1.getXform().setSize(100,400);
        this.mEndCaption.isRead = true;
        this.readLetter = true;
        this.IsMove = false;
        gEngine.AudioClips.stopBackgroundAudio();
        gEngine.AudioClips.playBackgroundAudio(this.bgmusic3);
    }
   
   
   // When this level is finished
   if (this.mEndCaption.isRead && gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter)) {
       this.nextScene = "Map2";
       gEngine.GameLoop.stop();
   }
   
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
        this.nextScene = "Myself";
        gEngine.GameLoop.stop();
    }
    
//   
//   // This is used to show the current mouse position.
//    var msg = " X=" + gEngine.Input.getMousePosX()/6.3 + " Y=" + gEngine.Input.getMousePosY()/6.3;
//    this.mMsg.getXform().setPosition(50,3);    
//    this.mMsg.setText(msg); 
        
};
