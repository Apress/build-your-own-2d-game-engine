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

MyGame.prototype.createBounds = function() {
    var x = 15, w = 30, y = 4;
    //Lower Bounds(floor)
    for (x = 15; x < 120; x+=30) 
        this.platformAt(x, y, w, 0);
    //Upper Bounds(sky)
    y = 76;
    for (x = 15; x < 120; x+=30) 
        this.platformAt(x, y, w, 180);
    
    //Four in the sky
    this.platformAt(50, 40, 15, -30);
    this.platformAt(70, 40, 15, 0);
    this.platformAt(30, 40, 15, 0);
//    this.platformAt(70, 40, 15, 0);
    
    x = 2;
    w = 3;
    //Left Bounds(Left Wall)
    for (y = 8; y < 90; y+=12) 
        this.wallAt(x, y, w);
    //Right Bounds(Right Wall)
    x = 98;
    for (y = 8; y < 90; y+=12) 
        this.wallAt(x, y, w);
    
    this.blockAt(91.5, 40, 10, 0);
    this.blockAt(8.5, 40, 10, 0);
    
    var r = new TextureRenderable(this.kTargetTexture);
    this.mTarget = new GameObject(r);    //Why this line?
    var xf = r.getXform();
    xf.setSize(3, 3);
};

MyGame.prototype.wallAt = function (x, y, w) {
    var h = w * 4;
    var p = new TextureRenderable(this.kWallTexture);
    var xf = p.getXform();
    
    var g = new GameObject(p);
    var r = new RigidRectangle(xf, w, h);
    g.setRigidBody(r);
    //Draw the texture
    g.toggleDrawRenderable();
    g.toggleDrawRigidShape();
    
    r.setMass(0);
    xf.setSize(w, h);
    xf.setPosition(x, y);
    //They are all objects
    //this.mAllObjs.addToSet(g);//右边的墙
};

MyGame.prototype.platformAt = function (x, y, w, rot) {
    var h = w / 8;
    var p = new TextureRenderable(this.kPlatformTexture);
    var xf = p.getXform();
    
    var g = new GameObject(p);
    var r = new RigidRectangle(xf, w, h);
    g.setRigidBody(r);
    //Draw the texture
    g.toggleDrawRenderable();
    g.toggleDrawRigidShape();
    
    r.setMass(0);
    xf.setSize(w, h);
    xf.setPosition(x, y);
    xf.setRotationInDegree(rot);
    //They are all objects
    //this.mAllObjs.addToSet(g);//上下的墙
};

MyGame.prototype.blockAt = function (x, y, w, rot) {
    var h = w / 8;
    var p = new TextureRenderable(this.kBlockTexture);
    var xf = p.getXform();
    
    var g = new GameObject(p);
    var r = new RigidRectangle(xf, w, w);
    g.setRigidBody(r);
    //Draw the texture
    g.toggleDrawRenderable();
    g.toggleDrawRigidShape();
    
    r.setMass(0);
    xf.setSize(w, w);
    xf.setPosition(x, y);
    xf.setRotationInDegree(rot);
    //They are all objects
    this.mAllObjs.addToSet(g);//男女主站着的墙
};


    