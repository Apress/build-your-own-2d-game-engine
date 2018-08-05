/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject, MyGame */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
var kSpeed = 40;
MyGame.prototype.radomizeVelocity = function()
{
    var i = 0;
    for (i = this.mFirstObject; i<this.mAllObjs.size(); i++) {
        var obj = this.mAllObjs.getObjectAt(i);
        var rigidShape = obj.getRigidBody();
        var x = (Math.random() - 0.5) * kSpeed;
        var y = Math.random() * kSpeed * 0.5;
        rigidShape.setVelocity(x, y);
    }
};

MyGame.prototype.wallAt = function (x, y, w) {
    var h = w * 4;
    var p = new LightRenderable(this.kWallTexture);
    var xf = p.getXform();
    p.addLight(this.kLight);
    var g = new GameObject(p);
    var r = new RigidRectangle(xf, w, h);
    g.setRigidBody(r);
    g.toggleDrawRenderable();
    g.toggleDrawRigidShape();
    
    r.setMass(0);
    xf.setSize(w, h);
    xf.setPosition(x, y);
    this.mAllObjs.addToSet(g);
};

MyGame.prototype.platformAt = function (x, y, w, rot, h, texture) {
    //var h = w / 8;
    if(h == null) h = w / 8;
    if(texture ==null){
        var p = new LightRenderable(this.kPlatformTexture);
    }else{
         var p = new LightRenderable(texture);
    }  
    var xf = p.getXform();
    p.addLight(this.kLight);
    
    var g = new GameObject(p);
    var r = new RigidRectangle(xf, w, h);
    g.setRigidBody(r);
    g.toggleDrawRenderable();
    g.toggleDrawRigidShape();
    
    r.setMass(0);
    xf.setSize(w, h);
    xf.setPosition(x, y);
    xf.setRotationInDegree(rot);
    this.mAllObjs.addToSet(g);
};

MyGame.prototype.createBounds2 = function() {
    //remote walls
    var x = 15, w = 20, y = -0.6;
    for (x = -40; x < 160; x+=20) 
        this.platformAt(x, y, w, 0, 3.5);
//    for (x = -50; x < 240; x+=30) 
//        this.platformAt(x, -0.6, w, 0);
    y = 80;
    for (x = -40; x < 160; x+=20) 
        this.platformAt(x, y, w, 180, 3.5);
    var i = 0;
    //first floor
    this.platformAt(140, 20,20, 0);
    this.platformAt(120, 20,20, 0);
    this.platformAt(70, 20,20, 0, 3.5);
    for(i=-2;i<3;i++){
        this.platformAt(20*i, 20, 20, 0, 3.5);
    };
    //second floor
    this.platformAt(-40, 40, 20, 0, 3.5);
    this.platformAt(-30,40,20,0,3.5);
    for(i=0;i<6;i++){
        this.platformAt(20*i, 40, 20, 0, 3.5);
        //this.platformAt(20*i, 40, 20, 0, 3.5)
    };
    this.platformAt(140, 40, 20, 0, 3.5);
    //third floor
    this.platformAt(140, 60, 20, 0, 3.5);
    this.platformAt(120, 60, 20, 0, 3.5);
    this.platformAt(100, 60, 20, 0, 3.5);
    this.platformAt(89, 60, 20, 0, 3.5);
    for(i=-2;i<4;i++){
        this.platformAt(20*i, 60, 20, 0, 3.5);
    };
    
    x = -48;
    w = 3;
    for (y = 0; y < 90; y+=12) 
        this.wallAt(x, y, w);
    
    x = 148;
    for (y = 0; y < 90; y+=12) 
        this.wallAt(x, y, w);
    
    var r = new LightRenderable(this.kTargetTexture);
    this.mTarget = new GameObject(r);
    r.addLight(this.kLight);
    var xf = r.getXform();
    xf.setSize(3, 3);
    
    
};

MyGame.prototype.elevatorAt = function (x, y, w, rot, h) {
    //var h = w / 8;
    if(h == null) h = w / 8;
    var p = new LightRenderable(this.kelevator);
    var xf = p.getXform();
    p.addLight(this.kLight);

    var g = new GameObject(p);
    var r = new RigidRectangle(xf, w, h);
    g.setRigidBody(r);
    g.toggleDrawRenderable();
    g.toggleDrawRigidShape();

    r.setMass(0);
    xf.setSize(w, h);
    xf.setPosition(x, y);
    xf.setRotationInDegree(rot);
    this.mAllObjs.addToSet(g);
    this.mElevator.push(g);
};


MyGame.prototype.createElevator = function(){
    this.elevatorAt(55 , 2, 9, 0, 1);
    this.elevatorAt(-15, 22, 9, 0, 1);
    this.elevatorAt(115, 22, 9, 0, 1);
    this.elevatorAt(75, 42, 9, 0, 1);
};

MyGame.prototype.createSide = function(){
    this.platformAt(-90,50,80,0,120, this.kSide);
    this.platformAt(162,50,26,0,100, this.kSide);
    this.platformAt(50,-52,400,0,100, this.kSide);
};
    