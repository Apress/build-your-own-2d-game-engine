/*
 * File: Levelfour.js
 * This is the logic of our game.
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
  GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Levelfour() {
    this.kBackGround = "assets/Map/Levelfour.json";
    this.kFontCon32 = "assets/fonts/Consolas-32";
    this.pHp = "assets/Hp.png";
    this.mHero = null;
    this.mCamera = null;
    this.mCameraAll = null;
    this.mBarriarSet = new GameObjectSet();
    this.mMainView = null;
    this.mHpf = null;
    this.mHp = null;
    this.jstate = 0;
}
gEngine.Core.inheritPrototype(Levelfour, Scene);

Levelfour.prototype.loadScene = function () {

};

Levelfour.prototype.unloadScene = function () {
  gEngine.TextFileLoader.unloadTextFile(this.kBackGround);
  if(gState === -1){
    var nextLevel = new GameOver();
  } else {
  var nextLevel = new Levelfive();
}
  gEngine.Core.startScene(nextLevel);
};

Levelfour.prototype.initialize = function () {
  var jsonString = gEngine.ResourceMap.retrieveAsset(this.kBackGround);
  // two way to change a json to js object
  var sceneInfo = JSON.parse(jsonString);
  this.mCamera = new Camera(
    [4,5],
    40,
    [100,0,1180,720]
  );

  this.mCameraAll = new Camera(
    [50,50],
    170,
    [1080,520,200,200]
  );

  this.mCamerafonts = new Camera(
    [0,0],
    10,
    [0,680,100,50]
  );
  this.mCamerafonts.setBackgroundColor([1,1,1,0]);

  this.mHero = new Hero(50,50,3,3);

  var i,obj;
  for (i = 0;i < sceneInfo.Square.length;i++){
    if(sceneInfo.Square[i].Tag === sceneInfo.Type.UDPlatform){
      obj = new UpAndDownPlatform(sceneInfo.Square[i].Pos[0],sceneInfo.Square[i].Pos[1],sceneInfo.Square[i].Color,sceneInfo.Square[i].High,sceneInfo.Square[i].Tag,sceneInfo.Square[i].Dir);
      obj.getXform().setSize(sceneInfo.Square[i].Width,sceneInfo.Square[i].Height);
      obj.getXform().setRotationInDegree(sceneInfo.Square[i].Rotation);
      var rigidShape = new RigidRectangle(obj.getXform(), sceneInfo.Square[i].Width, sceneInfo.Square[i].Height);
      rigidShape.setMass(0);  // ensures no movements!
      rigidShape.setDrawBounds(true);
      rigidShape.setColor([1, 1, 1, 0]);
      obj.setPhysicsComponent(rigidShape);
      this.mBarriarSet.addToSet(obj);
    } else if ( sceneInfo.Square[i].Tag === sceneInfo.Type.LRPlatform ){
      obj = new LeftAndRightPlatform(sceneInfo.Square[i].Pos[0],sceneInfo.Square[i].Pos[1],sceneInfo.Square[i].Color,sceneInfo.Square[i].wide,sceneInfo.Square[i].Tag,sceneInfo.Square[i].Dir);
      obj.getXform().setSize(sceneInfo.Square[i].Width,sceneInfo.Square[i].Height);
      obj.getXform().setRotationInDegree(sceneInfo.Square[i].Rotation);
      var rigidShape = new RigidRectangle(obj.getXform(), sceneInfo.Square[i].Width, sceneInfo.Square[i].Height);
      rigidShape.setMass(0);  // ensures no movements!
      rigidShape.setDrawBounds(true);
      rigidShape.setColor([1, 1, 1, 0]);
      obj.setPhysicsComponent(rigidShape);
      this.mBarriarSet.addToSet(obj);
    } else if ( sceneInfo.Square[i].Tag === sceneInfo.Type.Hp ){
      obj = new Hp(sceneInfo.Square[i].Pos[0],sceneInfo.Square[i].Pos[1],sceneInfo.Square[i].Color,sceneInfo.Square[i].Tag);
      obj.getXform().setSize(sceneInfo.Square[i].Width,sceneInfo.Square[i].Height);
      obj.getXform().setRotationInDegree(sceneInfo.Square[i].Rotation);
      var rigidShape = new RigidRectangle(obj.getXform(), sceneInfo.Square[i].Width, sceneInfo.Square[i].Height);
      rigidShape.setMass(0);  // ensures no movements!
      rigidShape.setDrawBounds(true);
      rigidShape.setColor([1, 1, 1, 0]);
      obj.setPhysicsComponent(rigidShape);
      this.mBarriarSet.addToSet(obj);
    } else if ( sceneInfo.Square[i].Tag === sceneInfo.Type.Goal ){
      obj = new Goal(sceneInfo.Square[i].Pos[0],sceneInfo.Square[i].Pos[1],sceneInfo.Square[i].Color,sceneInfo.Square[i].Tag);
      obj.getXform().setSize(sceneInfo.Square[i].Width,sceneInfo.Square[i].Height);
      obj.getXform().setRotationInDegree(sceneInfo.Square[i].Rotation);
      var rigidShape = new RigidRectangle(obj.getXform(), sceneInfo.Square[i].Width, sceneInfo.Square[i].Height);
      rigidShape.setMass(0);  // ensures no movements!
      rigidShape.setDrawBounds(true);
      rigidShape.setColor([1, 1, 1, 0]);
      obj.setPhysicsComponent(rigidShape);
      this.mBarriarSet.addToSet(obj);
    }
    else if ( sceneInfo.Square[i].Tag === sceneInfo.Type.UDNail ){
      obj = new UpAndDownNail(sceneInfo.Square[i].Pos[0],sceneInfo.Square[i].Pos[1],sceneInfo.Square[i].Color,sceneInfo.Square[i].High,sceneInfo.Square[i].Tag,sceneInfo.Square[i].Dir);
      obj.getXform().setSize(sceneInfo.Square[i].Width,sceneInfo.Square[i].Height);
      obj.getXform().setRotationInDegree(sceneInfo.Square[i].Rotation);
      var rigidShape = new RigidRectangle(obj.getXform(), sceneInfo.Square[i].Width, sceneInfo.Square[i].Height);
      rigidShape.setMass(0);  // ensures no movements!
      rigidShape.setDrawBounds(true);
      rigidShape.setColor([1, 1, 1, 0]);
      obj.setPhysicsComponent(rigidShape);
      this.mBarriarSet.addToSet(obj);
    }else if ( sceneInfo.Square[i].Tag === sceneInfo.Type.LRNail ){
      obj = new LeftAndRightNail(sceneInfo.Square[i].Pos[0],sceneInfo.Square[i].Pos[1],sceneInfo.Square[i].Color,sceneInfo.Square[i].Wide,sceneInfo.Square[i].Tag,sceneInfo.Square[i].Dir);
      obj.getXform().setSize(sceneInfo.Square[i].Width,sceneInfo.Square[i].Height);
      obj.getXform().setRotationInDegree(sceneInfo.Square[i].Rotation);
      var rigidShape = new RigidRectangle(obj.getXform(), sceneInfo.Square[i].Width, sceneInfo.Square[i].Height);
      rigidShape.setMass(0);  // ensures no movements!
      rigidShape.setDrawBounds(true);
      rigidShape.setColor([1, 1, 1, 0]);
      obj.setPhysicsComponent(rigidShape);
      this.mBarriarSet.addToSet(obj);
    }
     else {
      obj = new Platform(sceneInfo.Square[i].Pos[0],sceneInfo.Square[i].Pos[1],sceneInfo.Square[i].Color,sceneInfo.Square[i].Tag);
      obj.getXform().setSize(sceneInfo.Square[i].Width,sceneInfo.Square[i].Height);
      obj.getXform().setRotationInDegree(sceneInfo.Square[i].Rotation);
      var rigidShape = new RigidRectangle(obj.getXform(), sceneInfo.Square[i].Width, sceneInfo.Square[i].Height);
      rigidShape.setMass(0);  // ensures no movements!
      rigidShape.setDrawBounds(true);
      rigidShape.setColor([1, 1, 1, 0]);
      obj.setPhysicsComponent(rigidShape);
      this.mBarriarSet.addToSet(obj);
    }
  }
  var hpString = "HP :" + gHp.toPrecision();
  this.mHpf = new FontRenderable(hpString);
  this.mHpf.setFont(this.kFontCon32);
  this._initText(this.mHpf, -4,0, [0, 0, 0, 1], 2);
  this.mHp = new SpriteRenderable(this.pHp);
  this.mHp.setColor([1, 1, 1, 0]);
  this.mHp.getXform().setPosition(3, -0.5);
  this.mHp.getXform().setSize(2, 2);
};

Levelfour.prototype._initText = function (font, posX, posY, color, textH) {
    font.setColor(color);
    font.getXform().setPosition(posX, posY);
    font.setTextHeight(textH);
};


// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
Levelfour.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9 , 0.9 , 0.9, 1]);

    this.mCamera.setupViewProjection();
    this.mHero.draw(this.mCamera);
    this.mBarriarSet.draw(this.mCamera);

    this.mCamerafonts.setupViewProjection();
    this.mHpf.draw(this.mCamerafonts);
    this.mHp.draw(this.mCamerafonts);

    this.mCameraAll.setupViewProjection();
    this.mHero.draw(this.mCameraAll);
    this.mBarriarSet.draw(this.mCameraAll);

};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
Levelfour.prototype.update = function () {
    var deltaR = 1.2;
    this.mCamera.update();
    this.mHero.update(this.mBarriarSet);
    this.mBarriarSet.update();
    this.mCamera.panWith(this.mHero.getXform(), 0.3);

    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.S) && this.jstate === 0){
      this.jstate ++;
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.I) && this.jstate === 1){
      this.jstate ++;
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.X) && this.jstate === 2){
      this.jstate ++;
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.G) && this.jstate === 3){
      this.jstate ++;
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.O) && this.jstate === 4){
      this.jstate ++;
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.D) && this.jstate === 5){
      this.jstate ++;
    }
    if (this.jstate === 6){
      gState ++;
    }
    // var xform = this.mGoal.getXform();
    // xform.incRotationByDegree(deltaR);
    // var WC = this.mCamera.getWCCenter();
    // if ((this.mHero.getXform().getXPos() < (WC[0] - this.mCamera.getWCWidth()/2)) | (this.mHero.getXform().getXPos() > (WC[0] + this.mCamera.getWCWidth()/2))){
    //   this.mCamera.panTo(this.mHero.getXform().getXPos(),this.mHero.getXform().getYPos());
    // }
    // if ((this.mHero.getXform().getYPos() < (WC[1] - this.mCamera.getHeight()/2)) | (this.mHero.getXform().getYPos() > (WC[1] + this.mCamera.getWCHeight()/2))){
    //   this.mCamera.panTo(this.mHero.getXform().getXPos(),this.mHero.getXform().getYPos());
    // }
    var hpString = "HP :" + gHp.toPrecision();
    this.mHpf.setText(hpString);
    gEngine.Physics.processObjSet(this.mHero, this.mBarriarSet);
    if (gHp === 0){
      gState = -1;
        gEngine.GameLoop.stop();
    }
    if (gState === 5){
      gEngine.GameLoop.stop();
    }
};
