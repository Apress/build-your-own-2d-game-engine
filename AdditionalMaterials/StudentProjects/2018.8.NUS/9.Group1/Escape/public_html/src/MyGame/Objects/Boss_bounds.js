/*
 * File: Boss.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject, Boss */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
var kSpeed = 40;

Boss.prototype.wallAt = function (x, y, w, h) {

    var p = new TextureRenderable(this.kPlatform);
    var xf = p.getXform();

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

Boss.prototype.platformAt = function (x, y, w, rot, h, texture) {
    //var h = w / 8;
    if(h == null) h = w / 8;
    if(texture ==null){
        var p = new TextureRenderable(this.kPlatform);
    }else{
         var p = new LightRenderable(this.kPlatform);
    }  
    var xf = p.getXform();
    
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

Boss.prototype.createBounds = function() {
    //remote walls
    var x = 15, w = 20, y = -180;
    for (x = -512; x < 512; x+=20) 
        this.platformAt(x, y, w, 0, 12);

    y = -90;
    for (x = -300; x < -100; x+=20)
        this.platformAt(x, y, w, 0, 12);
    for (x = 100; x < 200; x+=20)
        this.platformAt(x, y, w, 0, 12);

    y = 240;
    for (x = -512; x < 512; x+=20) 
        this.platformAt(x, y, w, 0, 12);

    x = -500;
    for (y = -242; y < 242; y+=12) 
        this.wallAt(x, y, 30, 484);
    
    x = 500;
    for (y = -242; y < 242; y+=12) 
        this.wallAt(x, y, 30, 484);
    
    var r = new TextureRenderable(this.kPlatform);
    this.mTarget = new GameObject(r);
    var xf = r.getXform();
    xf.setSize(3, 3);
    
    
};

Boss.prototype.createElevator = function(){
    this.elevatorAt(55 , 2, 9, 0, 1);
    this.elevatorAt(-15, 22, 9, 0, 1);
    this.elevatorAt(115, 22, 9, 0, 1);
    this.elevatorAt(75, 42, 9, 0, 1);
};

Boss.prototype.createSide = function(){
    this.platformAt(-90,50,80,0,120, this.kSide);
    this.platformAt(162,50,26,0,100, this.kSide);
    this.platformAt(50,-52,400,0,100, this.kSide);
};
    