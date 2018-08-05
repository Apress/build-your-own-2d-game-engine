/*
 * File: Level2.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject, MyGame */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
var kSpeed = 40;
Level2.prototype.radomizeVelocity = function()
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

Level2.prototype.createBounds = function() {
    var x = 15, w = 30, y = 4;
    //Lower Bounds(floor)
    for (x = 15; x < 120; x+=30) 
        this.platformAt(x, y, w, 0);
    //Upper Bounds(sky)
    y = 76;
    for (x = 15; x < 120; x+=30) 
        this.platformAt(x, y, w, 180);
    
    x = 2;
    w = 3;
    //Left Bounds(Left Wall)
    for (y = 8; y < 90; y+=12) 
        this.wallAt(x, y, w);
    //Right Bounds(Right Wall)
    x = 98;
    for (y = 8; y < 90; y+=12) 
        this.wallAt(x, y, w);
    
    //Draw the building
//    x = 6.2;
//    for(y = 42.5; y < 65; y+=5)
//        this.blockAt(x,y,5,0);
//    
//    x = 11.2;
//    for(y = 42.5; y < 60; y+=5)
//        this.blockAt(x,y,5,0);
    
//    x = 16.2;
//    for(y = 42.5; y < 57; y+=5)
//        this.blockAt(x,y,5,0);
    
    this.blockAt(16.2, 42.5, 5, 0);
    
    x = 21.2;
    for(y = 42.5; y < 58; y+=5)
        this.blockAt(x,y,5,0);
    
    x = 26.2;
    for(y = 42.5; y < 52; y+=5)
        this.blockAt(x,y,5,0);
    
    x = 31.2;
    for(y = 42.5; y < 58; y+=5)
        this.blockAt(x,y,5,0);
    
    x = 36.2;
    for(y = 42.5; y < 63; y+=5)
        this.blockAt(x,y,5,0);
    
    x = 41.2;
    for(y = 42.5; y < 63; y+=5)
        this.blockAt(x,y,5,0);
    
    x = 46.2;
    for(y = 42.5; y < 58; y+=5)
        this.blockAt(x,y,5,0);
    
    x = 51.2;
    for(y = 42.5; y < 63; y+=5)
        this.blockAt(x,y,5,0);
    
    x = 56.2;
    for(y = 42.5; y < 58; y+=5)
        this.blockAt(x,y,5,0);
    
    x = 66.2;
    for(y = 42.5; y < 53; y+=5)
        this.blockAt(x,y,5,0);
    
//    this.blockAt(66.2, 42.5, 5, 0);
    
//    x = 71.2;
//    for(y = 42.5; y < 60; y+=5)
//        this.blockAt(x,y,5,0);
    
    this.blockAt(76.2, 42.5, 5, 0);
    
//    x = 76.2;
//    for(y = 42.5; y < 60; y+=5)
//        this.blockAt(x,y,5,0);
//    
//    x = 81.2;
//    for(y = 42.5; y < 70; y+=5)
//        this.blockAt(x,y,5,0);
//    
//    this.blockAt(86.2, 42.5, 5, 0);
//    this.blockAt(91.2, 42.5, 5, 0);
    
//    x = 96.2;
//    for(y = 42.5; y < 57; y+=5)
//        this.blockAt(x,y,5,0);
    
    var r = new TextureRenderable(this.kTargetTexture);
    this.mTarget = new GameObject(r);    //Why this line?
    var xf = r.getXform();
    xf.setSize(3, 3);
};

Level2.prototype.wallAt = function (x, y, w) {
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
//    this.mAllObjs.addToSet(g);
};

Level2.prototype.platformAt = function (x, y, w, rot) {
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
//    this.mAllObjs.addToSet(g);
};

Level2.prototype.blockAt = function (x, y, w, rot) {
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
    this.mAllObjs.addToSet(g);
};


    