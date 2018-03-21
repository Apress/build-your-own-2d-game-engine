/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,GameOver
  Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
  GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light, GameOver */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Level4() {
    
    this.kStar = "assets/Level4/star.png" ;
    this.kPrincess =  "assets/princess.png" ;
    this.kCube =  "assets/cube.png" ;
    this.kBackground = "assets/Level4/background.png" ;
    this.kSun = "assets/Level4/sun.png" ;
    this.kGround = "assets/Level4/ground.jpg" ;
    this.kPlanet1 = "assets/Level4/planet2.png" ;
    this.kPlanet2 = "assets/Level4/planet3.png" ;
    this.kPlanet3 = "assets/Level4/planet6.png" ;
    this.kPlanet4 = "assets/Level4/planet5.png" ;
    this.kPlanet5 = "assets/Level4/planet4.png" ;
    this.kPlanet6 = "assets/Level4/planet7.png" ;
    this.kStone1 = "assets/Level4/meteorBrown1.png" ; 
    this.kStone2 = "assets/Level4/meteorBrown2.png" ; 
    this.kStone3 = "assets/Level4/meteorBrown3.png" ; 
    this.kStone4 = "assets/Level4/meteorBrown4.png" ; 
    this.kStone5 = "assets/Level4/meteorGrey1.png" ; 
    this.kStone6 = "assets/Level4/meteorGrey2.png" ; 
    this.kStone7 = "assets/Level4/meteorGrey3.png" ; 
    this.kStone8 = "assets/Level4/meteorGrey4.png" ; 
    this.kShip1 = "assets/Level4/playerShip1.png" ; 
    this.kShip2 = "assets/Level4/playerShip2.png" ; 
    this.kShip3 = "assets/Level4/enemyGreen4.png" ; 
    this.kShip4 = "assets/Level4/playerShip3.png" ;
    this.kShip5 = "assets/Level4/enemyBlack1.png" ;
    this.kShip6 = "assets/Level4/enemyRed3.png" ;
    this.kBullet1 = "assets/Level4/newbullet.png";
    this.kBullet2 = "assets/Level4/laserRed.png";
    this.kUfo1 = "assets/Level4/ufoGreen.png";
    this.kUfo2 = "assets/Level4/ufoYellow.png";
    
    
    this.mCamera = null;
    this.mCubeCam = null;
    this.mNext = 1;
    this.mSave = [0, 0, 0, 0];
    
    this.mAllPlatforms = new GameObjectSet();
    
    this.mStar1 = null;
    this.mStar2 = null;
    this.mStar3 = null;
    this.mStar4 = null;
    this.mBackground = null;
    this.mCube = null;
    this.mSuperCube = null;
    this.mPrincess = null;
    this.mSun = null;
    this.mPlatform = null;
    this.mGround = null;
    this.mPlanet1 = null;
    this.mPlanet2 = null;
    this.mPlanet3 = null;
    this.mPlanet4 = null;
    this.mPlanet5 = null;
    this.mPlanet6 = null;
    this.mStone1 = null;
    this.mStone2 = null;
    this.mStone3 = null;
    this.mStone4 = null;
    this.mStone5 = null;
    this.mStone6 = null;
    this.mStone7 = null;
    this.mStone8 = null;
    this.mStone9 = null;
    this.mStone10 = null;
    this.mStone11 = null;
    this.mStone12 = null;
    this.mStone13 = null;
    this.mStone14 = null;
    this.mStone15 = null;
    this.mStone16 = null;
    this.mStone17 = null;
    this.mStone18 = null;
    this.mStone19 = null;
    this.mStone20 = null;
    this.mStone21 = null;
    this.mStone22 = null;
    this.mShip1 = null;
    this.mShip2 = null;
    this.mShip3 = null;
    this.mShip4 = null;
    this.mShip5 = null;
    this.mShip6 = null;
    this.mShip7 = null;
    this.mBullet1 = null;
    this.mBullet2 = null;
    this.mMeteor = null;
    this.mSatellite1 = null;
    this.mSatellite2 = null;
    this.mUfo1 = null;
    this.mUfo2 = null;
    
    
}
gEngine.Core.inheritPrototype(Level4, Scene);

Level4.prototype.loadScene = function () {
    
    gEngine.Textures.loadTexture(this.kStar);
    gEngine.Textures.loadTexture(this.kPrincess);
    gEngine.Textures.loadTexture(this.kCube);
    gEngine.Textures.loadTexture(this.kBackground);
    gEngine.Textures.loadTexture(this.kSun);
    gEngine.Textures.loadTexture(this.kGround);
    gEngine.Textures.loadTexture(this.kPlanet1);
    gEngine.Textures.loadTexture(this.kPlanet2);
    gEngine.Textures.loadTexture(this.kPlanet3);
    gEngine.Textures.loadTexture(this.kPlanet4);
    gEngine.Textures.loadTexture(this.kPlanet5);
    gEngine.Textures.loadTexture(this.kPlanet6);
    gEngine.Textures.loadTexture(this.kStone1);
    gEngine.Textures.loadTexture(this.kStone2);
    gEngine.Textures.loadTexture(this.kStone3);
    gEngine.Textures.loadTexture(this.kStone4);
    gEngine.Textures.loadTexture(this.kStone5);
    gEngine.Textures.loadTexture(this.kStone6);
    gEngine.Textures.loadTexture(this.kStone7);
    gEngine.Textures.loadTexture(this.kStone8);
    gEngine.Textures.loadTexture(this.kShip1);
    gEngine.Textures.loadTexture(this.kShip2);
    gEngine.Textures.loadTexture(this.kShip3);
    gEngine.Textures.loadTexture(this.kShip4);
    gEngine.Textures.loadTexture(this.kShip5);
    gEngine.Textures.loadTexture(this.kShip6);
    gEngine.Textures.loadTexture(this.kBullet1);
    gEngine.Textures.loadTexture(this.kBullet2);
    gEngine.Textures.loadTexture(this.kUfo1);
    gEngine.Textures.loadTexture(this.kUfo2);
    
};

Level4.prototype.unloadScene = function () {
    
    gEngine.Textures.unloadTexture(this.kStar);
    gEngine.Textures.unloadTexture(this.kPrincess);
    gEngine.Textures.unloadTexture(this.kCube);
    gEngine.Textures.unloadTexture(this.kBackground);
    gEngine.Textures.unloadTexture(this.kSun);
    gEngine.Textures.unloadTexture(this.kGround);
    gEngine.Textures.unloadTexture(this.kPlanet1);
    gEngine.Textures.unloadTexture(this.kPlanet2);
    gEngine.Textures.unloadTexture(this.kPlanet3);
    gEngine.Textures.unloadTexture(this.kPlanet4);
    gEngine.Textures.unloadTexture(this.kPlanet5);
    gEngine.Textures.unloadTexture(this.kPlanet6);
    gEngine.Textures.unloadTexture(this.kStone1);
    gEngine.Textures.unloadTexture(this.kStone2);
    gEngine.Textures.unloadTexture(this.kStone3);
    gEngine.Textures.unloadTexture(this.kStone4);
    gEngine.Textures.unloadTexture(this.kStone5);
    gEngine.Textures.unloadTexture(this.kStone6);
    gEngine.Textures.unloadTexture(this.kStone7);
    gEngine.Textures.unloadTexture(this.kStone8);
    gEngine.Textures.unloadTexture(this.kShip1);
    gEngine.Textures.unloadTexture(this.kShip2);
    gEngine.Textures.unloadTexture(this.kShip3);
    gEngine.Textures.unloadTexture(this.kShip4);
    gEngine.Textures.unloadTexture(this.kShip5);
    gEngine.Textures.unloadTexture(this.kShip6);
    gEngine.Textures.unloadTexture(this.kBullet1);
    gEngine.Textures.unloadTexture(this.kBullet2);
    gEngine.Textures.unloadTexture(this.kUfo1);
    gEngine.Textures.unloadTexture(this.kUfo2);
    
    var nextLevel = null;
    if(this.mNext === 1){
        nextLevel = new GameOver;  // next level to be loaded
        nextLevel.setLevel(5);
        gEngine.Core.startScene(nextLevel);
    }
    else if(this.mNext === 0){
        nextLevel = new Victory;  // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    }
    else if(this.mNext === 2){
        nextLevel = new LevelSelect;  // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    }
};

Level4.prototype.initialize = function () {
    
    gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1]);
    this.mCamera = new Camera(
        vec2.fromValues(80, 20), // position of the camera
        100,                        // width of camera
        [20, 400, 120, 120],         // viewport (orgX, orgY, width, height)
        2
    );
    this.mCamera.setBackgroundColor([1, 1, 1, 1]); 
    
    this.mCubeCam = new Camera(
        vec2.fromValues(20, 30),    // will be updated at each cycle to point to hero
        80,
        [0, 0, 960, 540],
        10                         // viewport bounds
    );
    this.mCubeCam.setBackgroundColor([1, 1, 1, 1]);
    
    this.mStar1 = new Star(157,152);
    this.mStar2 = new Star(260,167);
    this.mStar3 = new Star(233,321);
    this.mStar4 = new Star(25,227);
    this.mBackground = new Starrysky();
    this.mSun = new Sun(150,30,150,150, this.kSun);
    this.mPlatform = new Stone(100, 285,120,10,this.kStone1);
    this.mGround = new Sun(100, 330, 120, 120, this.kGround);
    
    this.mPlanet1 = new Planet(50, 125, 40, 40, this.kPlanet1);
    this.mPlanet2 = new Planet(157, 135, 35, 35, this.kPlanet2);
    this.mPlanet3 = new Planet(260, 150, 35, 35, this.kPlanet3);
    this.mPlanet4 = new Planet(235, 305, 35, 35, this.kPlanet4);
    this.mPlanet5 = new Planet(25, 210, 35, 35, this.kPlanet5);
    this.mPlanet6 = new Planet(147, 195, 35, 35, this.kPlanet6);
    this.mStone1 = new Stone(73, 140, 10, 10, this.kStone1);
    this.mStone2 = new Stone(95, 135, 5, 5, this.kStone5);
    this.mStone3 = new Stone(109,130 , 10, 4,this.kStone2);
    this.mStone4 = new Stone(123,130 ,6 ,8 ,this.kStone6);
    this.mStone4.setDelta(0.4);
    this.mStone5 = new Stone(139,150 ,7 ,7 ,this.kStone8);
    this.mStone6 = new Stone(171, 152, 6, 6, this.kStone7);
    this.mStone7 = new Stone(172, 145, 6, 8, this.kStone7);
    this.mStone8 = new Stone(167, 148, 4, 3, this.kStone3);
    this.mStone9 = new Stone(271, 175, 10, 10, this.kStone3);
    this.mStone10 = new Stone(260, 190, 10, 10, this.kStone7);
    this.mStone11 = new Stone(249, 205, 10, 10, this.kStone4);
    this.mStone12 = new Stone(272, 220, 10, 10, this.kStone5);
    this.mStone13 = new Stone(236, 233, 70, 3, this.kStone1);
    this.mStone14 = new Stone(211, 318, 10, 10, this.kStone7);
    this.mStone15 = new Stone(185, 307, 10, 10, this.kStone7);
    this.mStone16 = new Stone(259, 318, 10, 10, this.kStone2);
    this.mStone17 = new Stone(49, 223, 10, 10, this.kStone2);
    this.mStone18 = new Stone(123, 208, 10, 10, this.kStone5);
    this.mStone19 = new Stone(66, 216, 8, 8, this.kStone6);
    this.mStone20 = new Stone(77, 204, 5, 5, this.kStone7);
    this.mStone21 = new Stone(88, 198, 5, 5, this.kStone7);
    this.mStone22 = new Stone(102, 210, 10, 10, this.kStone4);
    this.mSatellite1 = new Satellite(147, 215, 5, 5, this.kStone3);
    this.mSatellite2 = new Satellite(147, 175, 5, 5, this.kStone3);
    this.mSatellite2.setDegree(270);
    this.mUfo1 = new UFO (74, 245, 6, 6, this.kUfo1);
    this.mUfo2 = new UFO (72, 186, 6, 6, this.kUfo2);
    
    
    this.mShip1 = new Ship(200,135 ,10 ,5 ,this.kShip1,178,200, 1 );
    this.mShip1.setDelta(0.15);
    this.mShip2 = new Ship(220,144 ,8 ,6 ,this.kShip2 ,192,214, 1 );
    this.mShip3 = new Ship(240,155 ,10 ,10 ,this.kShip3 ,208,232, 1 );
    this.mShip3.setDelta(0.25);
    this.mShip4 = new Ship(207,220 ,10 ,10 ,this.kShip4 ,0,0 );
    this.mShip5 = new Ship(295,236 ,10 ,10 ,this.kShip5 ,0,0 );
    this.mShip6 = new Ship(210,240 ,16 ,6 ,this.kShip6 ,240,307 ,2 );
    this.mShip6.setDelta(0.25);
    this.mShip7 = new Ship(24,285 ,10 ,5 ,this.kShip6 ,235,288 ,3 );
    this.mShip7.setDelta(0.25);
    this.mBullet1 = new Bullet(210,220,2,2,this.kBullet1,210,263, 0.8,1);
    this.mBullet2 = new GameObjectSet();
    var i = 0, aBullet;
    // create 5 minions at random Y values
    for (i = 0; i <  5; i++) {
        aBullet = new Bullet(290-3*i, 236,2,1,this.kBullet2,200,290,0.7, 2);
        this.mBullet2.addToSet(aBullet);
    }
    
    this.mMeteor = new GameObjectSet();
    var j = 0, aMeteor;
    for (j = 0; j <  8; j++) {
        aMeteor = new Meteor(27+53*Math.random(), 380,3+8*Math.random(),j,380,288,0.3+0.5*Math.random(),0.15+0.22*Math.random());
        this.mMeteor.addToSet(aMeteor);
    }
    
    
    this.mPrincess = new Princess();
    this.mPrincess.setPosition(147,212);
    //this.mCube = new Cube(49,230);
    
    this.mSave = gEngine.ResourceMap.retrieveAsset("Save");
    if(!this.mSave[0])
        this.mSuperCube = new SuperCube(50, 150);
    if(this.mSave[0])
        this.mSuperCube = new SuperCube(157, 155);
    if(this.mSave[1])
        this.mSuperCube = new SuperCube(260, 170);
    if(this.mSave[2])
        this.mSuperCube = new SuperCube(233, 325);
    if(this.mSave[3])
        this.mSuperCube = new SuperCube(25, 232);
    
    
    this.mAllPlatforms.addToSet(this.mPlatform);
    this.mAllPlatforms.addToSet(this.mPlanet1);
    this.mAllPlatforms.addToSet(this.mPlanet2);
    this.mAllPlatforms.addToSet(this.mPlanet3);
    this.mAllPlatforms.addToSet(this.mPlanet4);
    this.mAllPlatforms.addToSet(this.mPlanet5);
    this.mAllPlatforms.addToSet(this.mPlanet6);
    this.mAllPlatforms.addToSet(this.mStone1);
    this.mAllPlatforms.addToSet(this.mStone2);
    this.mAllPlatforms.addToSet(this.mStone3);
    this.mAllPlatforms.addToSet(this.mStone4);
    this.mAllPlatforms.addToSet(this.mStone5);
    this.mAllPlatforms.addToSet(this.mStone6);
    this.mAllPlatforms.addToSet(this.mStone7);
    this.mAllPlatforms.addToSet(this.mStone8);
    this.mAllPlatforms.addToSet(this.mStone9);
    this.mAllPlatforms.addToSet(this.mStone10);
    this.mAllPlatforms.addToSet(this.mStone11);
    this.mAllPlatforms.addToSet(this.mStone12);
    this.mAllPlatforms.addToSet(this.mStone13);
    this.mAllPlatforms.addToSet(this.mStone14);
    this.mAllPlatforms.addToSet(this.mStone15);
    this.mAllPlatforms.addToSet(this.mStone16);
    this.mAllPlatforms.addToSet(this.mStone17);
    this.mAllPlatforms.addToSet(this.mStone18);
    this.mAllPlatforms.addToSet(this.mStone19);
    this.mAllPlatforms.addToSet(this.mStone20);
    this.mAllPlatforms.addToSet(this.mStone21);
    this.mAllPlatforms.addToSet(this.mStone22);
    this.mAllPlatforms.addToSet(this.mShip1);
    this.mAllPlatforms.addToSet(this.mShip2);
    this.mAllPlatforms.addToSet(this.mShip3);
    this.mAllPlatforms.addToSet(this.mShip4);
    this.mAllPlatforms.addToSet(this.mShip5);
    this.mAllPlatforms.addToSet(this.mShip6);
    this.mAllPlatforms.addToSet(this.mShip7);
    
};

Level4.prototype.drawCamera = function (camera){
    camera.setupViewProjection();
    this.mBackground.draw(camera);
    //this.mCube.draw(camera);
    
    this.mSun.draw(camera);
    this.mPlatform.draw(camera);
    this.mGround.draw(camera);
    this.mMeteor.draw(camera);
    
    this.mPlanet1.draw(camera);
    this.mPlanet2.draw(camera);
    this.mPlanet3.draw(camera);
    this.mPlanet4.draw(camera);
    this.mPlanet5.draw(camera);
    this.mPlanet6.draw(camera);
    this.mStone1.draw(camera);
    this.mStone2.draw(camera);
    this.mStone3.draw(camera);
    this.mStone4.draw(camera);
    this.mStone5.draw(camera);
    this.mStone6.draw(camera);
    this.mStone7.draw(camera);
    this.mStone8.draw(camera);
    this.mStone9.draw(camera);
    this.mStone10.draw(camera);
    this.mStone11.draw(camera);
    this.mStone12.draw(camera);
    this.mStone13.draw(camera);
    this.mStone14.draw(camera);
    this.mStone15.draw(camera);
    this.mStone16.draw(camera);
    this.mStone17.draw(camera);
    this.mStone18.draw(camera);
    this.mStone19.draw(camera);
    this.mStone20.draw(camera);
    this.mStone21.draw(camera);
    this.mStone22.draw(camera);
    this.mShip1.draw(camera);
    this.mShip2.draw(camera);
    this.mShip3.draw(camera);
    this.mShip4.draw(camera);
    this.mShip5.draw(camera);
    this.mShip6.draw(camera);
    this.mShip7.draw(camera);
    this.mBullet1.draw(camera);
    this.mBullet2.draw(camera);
    this.mSatellite1.draw(camera);
    this.mSatellite2.draw(camera);
    this.mUfo1.draw(camera);
    this.mUfo2.draw(camera);
    
    this.mSave = gEngine.ResourceMap.retrieveAsset("Save");
    if(!this.mSave[0])
    this.mStar1.draw(camera);
    if(!this.mSave[1])
    this.mStar2.draw(camera);
    if(!this.mSave[2])
    this.mStar3.draw(camera);
    if(!this.mSave[3])
    this.mStar4.draw(camera);
    
    this.mPrincess.draw(camera);
    this.mSuperCube.draw(camera);
};

Level4.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    this.drawCamera(this.mCubeCam);
    this.drawCamera(this.mCamera);  // only draw status in the main camera
    
};

Level4.prototype.update = function () {
    this.mCamera.update();
    this.mCubeCam.update();
    //this.mCube.update();
    this.mStone3.update();
    this.mStone4.update();
    this.mShip1.update();
    this.mShip2.update();
    this.mShip3.update();
    this.mShip6.update();
    this.mShip7.update();
    this.mBullet1.update();
    this.mBullet2.update();
    this.mMeteor.update();
    this.mSatellite1.update();
    this.mSatellite2.update();
    this.mUfo1.rotateObjPointTo(this.mSuperCube.getXform().getPosition(), 1);
    this.mUfo1.update(this.mSuperCube.getXform().getPosition());
    this.mUfo2.rotateObjPointTo(this.mSuperCube.getXform().getPosition(), 1);
    this.mUfo2.update(this.mSuperCube.getXform().getPosition());
    
    
    
    var Cx = this.mSuperCube.getBBox();
    var Px = this.mPrincess.getBBox();
    var Star1 = this.mStar1.getBBox();
    var Star2 = this.mStar2.getBBox();
    var Star3 = this.mStar3.getBBox();
    var Star4 = this.mStar4.getBBox();
    var Sx1 = this.mSatellite1.getBBox();
    var Sx2 = this.mSatellite2.getBBox();
    var Ux1 = this.mUfo1.getBBox();
    var Ux2 = this.mUfo2.getBBox();
    var Bx1 = this.mBullet1.getBBox();
    var Bx21 = this.mBullet2.getObjectAt(0).getBBox();
    var Bx22 = this.mBullet2.getObjectAt(1).getBBox();
    var Bx23 = this.mBullet2.getObjectAt(2).getBBox();
    var Bx24 = this.mBullet2.getObjectAt(3).getBBox();
    var Bx25 = this.mBullet2.getObjectAt(4).getBBox();
    var Mx1 = this.mMeteor.getObjectAt(0).getBBox();
    var Mx2 = this.mMeteor.getObjectAt(1).getBBox();
    var Mx3 = this.mMeteor.getObjectAt(2).getBBox();
    var Mx4 = this.mMeteor.getObjectAt(3).getBBox();
    var Mx5 = this.mMeteor.getObjectAt(4).getBBox();
    var Mx6 = this.mMeteor.getObjectAt(5).getBBox();
    var Mx7 = this.mMeteor.getObjectAt(6).getBBox();
    var Mx8 = this.mMeteor.getObjectAt(7).getBBox();
    
    this.mCubeCam.panTo(this.mSuperCube.getXform().getXPos(), this.mSuperCube.getXform().getYPos());
    this.mCamera.panTo(this.mSuperCube.getXform().getXPos(), this.mSuperCube.getXform().getYPos());
    
     if (Cx.boundCollideStatus(Star1)){
        gEngine.ResourceMap.store("Save", [1,0,0,0]);
        
    }
    
    if (Cx.boundCollideStatus(Star2)){
        gEngine.ResourceMap.store("Save", [1,1,0,0]);
        
    }
    
    if (Cx.boundCollideStatus(Star3)){
        gEngine.ResourceMap.store("Save", [1,1,1,0]);
        
    }
    
    if (Cx.boundCollideStatus(Star4)){
        gEngine.ResourceMap.store("Save", [1,1,1,1]);
        
    }
    
    if (Cx.boundCollideStatus(Sx1)){
        this.mNext = 1;
        gEngine.GameLoop.stop();
        
    }
    
    if (Cx.boundCollideStatus(Sx2)){
        this.mNext = 1;
        gEngine.GameLoop.stop();
        
    }
    
    if (Cx.boundCollideStatus(Ux1)){
        this.mNext = 1;
        gEngine.GameLoop.stop();
        
    }
    
    if (Cx.boundCollideStatus(Ux2)){
        this.mNext = 1;
        gEngine.GameLoop.stop();
        
    }
    
    if (Cx.boundCollideStatus(Bx1)){
        this.mNext = 1;
        gEngine.GameLoop.stop();
        
    }
    
    if (Cx.boundCollideStatus(Bx21)){
        this.mNext = 1;
        gEngine.GameLoop.stop();
        
    }
    
    
    
    if (Cx.boundCollideStatus(Bx22)){
        this.mNext = 1;
        gEngine.GameLoop.stop();
        
    }
    
    if (Cx.boundCollideStatus(Bx23)){
        this.mNext = 1;
        gEngine.GameLoop.stop();
        
    }
    
    if (Cx.boundCollideStatus(Bx24)){
        this.mNext = 1;
        gEngine.GameLoop.stop();
        
    }
    
    if (Cx.boundCollideStatus(Bx25)){
        this.mNext = 1;
        gEngine.GameLoop.stop();
        
    }
    
    if (Cx.boundCollideStatus(Mx1)){
        this.mNext = 1;
        gEngine.GameLoop.stop();
        
    }
    
    if (Cx.boundCollideStatus(Mx2)){
        this.mNext = 1;
        gEngine.GameLoop.stop();
        
    }
    
    if (Cx.boundCollideStatus(Mx3)){
        this.mNext = 1;
        gEngine.GameLoop.stop();
        
    }
    
    if (Cx.boundCollideStatus(Mx4)){
        this.mNext = 1;
        gEngine.GameLoop.stop();
        
    }
    
    if (Cx.boundCollideStatus(Mx5)){
        this.mNext = 1;
        gEngine.GameLoop.stop();
        
    }
    
    if (Cx.boundCollideStatus(Mx6)){
        this.mNext = 1;
        gEngine.GameLoop.stop();
        
    }
    
    if (Cx.boundCollideStatus(Mx7)){
        this.mNext = 1;
        gEngine.GameLoop.stop();
        
    }
    
    if (Cx.boundCollideStatus(Mx8)){
        this.mNext = 1;
        gEngine.GameLoop.stop();
        
    }
    
    if (this.mSuperCube.getXform().getYPos()<95){
        this.mNext = 1;
        gEngine.GameLoop.stop();
        
    }
    
    if (Cx.boundCollideStatus(Px)){
        this.mNext = 0;
        gEngine.GameLoop.stop();
        
    }
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)){
        this.mNext = 2;
        gEngine.GameLoop.stop();
    }
    
    this.mSuperCube.update(this.mAllPlatforms);
    
    this._physicsSimulation();
};

Level4.prototype._physicsSimulation = function() {
    
    gEngine.Physics.processObjSet(this.mSuperCube, this.mAllPlatforms);
    
    
};

    
