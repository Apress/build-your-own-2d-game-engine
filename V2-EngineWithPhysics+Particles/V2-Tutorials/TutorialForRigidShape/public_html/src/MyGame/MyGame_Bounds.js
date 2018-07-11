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
        var y = .6 * kSpeed * 0.5 + 2;
        rigidShape.setVelocity(x, y);
    }
};

MyGame.prototype.createBounds = function() {
    var x = 15, w = 30, y = 4;
    this.platformAt(25,76,50,0,.9,.8);
    this.platformAt(75,76,50,0,.3,.5);
    this.platformAt(25,39.5,50,0,.9,.8);
    this.platformAt(75,39.5,50,0,.3,.5);
    this.platformAt(25,36.5,50,0,.6,.01);
    this.platformAt(75,36.5,50,0,0,.4);
    this.platformAt(25,4,50,0,.6,.01);
    this.platformAt(75,4,50,0,0,.4);
    
    
    x = 2;
    w = 3;
    this.wallAt(x,18,w,.6,.01);
    this.wallAt(x,58,w,.9,.8);
    
    x = 48.5;
    this.wallAt(x,18,w,.6,.01);
    this.wallAt(x,58,w,.9,.8);
    x = 51.5;
    this.wallAt(x,18,w,0,.4);
    this.wallAt(x,58,w,.3,.5);
    x = 98;
    this.wallAt(x,18,w,0,.4);
    this.wallAt(x,58,w,.3,.5);
    
    var r = new TextureRenderable(this.kTargetTexture);
    this.mTarget = new GameObject(r);
    var xf = r.getXform();
    xf.setSize(3, 3);
};

MyGame.prototype.wallAt = function (x, y, w, res, frct) {
    var h = 40;
    var p = new TextureRenderable(this.kWallTexture);
    var xf = p.getXform();
    
    var g = new GameObject(p);
    var r = new RigidRectangle(xf, w, h);
    g.setRigidBody(r);
    g.toggleDrawRenderable();
    g.toggleDrawRigidShape();
    
    r.setMass(0);
    r.setRestitution(res);
    r.setFriction(frct);
    xf.setSize(w, h);
    xf.setPosition(x, y);
    this.mAllObjs.addToSet(g);
};

MyGame.prototype.platformAt = function (x, y, w, rot,res,frct) {
    var h = 3;
    var p = new TextureRenderable(this.kPlatformTexture);
    var xf = p.getXform();
    
    var g = new GameObject(p);
    var r = new RigidRectangle(xf, w, h);
    g.setRigidBody(r);
    g.toggleDrawRenderable();
    g.toggleDrawRigidShape();
    
    r.setMass(0);
    r.setRestitution(res);
    r.setFriction(frct);
    xf.setSize(w, h);
    xf.setPosition(x, y);
    xf.setRotationInDegree(rot);
    this.mAllObjs.addToSet(g);
};