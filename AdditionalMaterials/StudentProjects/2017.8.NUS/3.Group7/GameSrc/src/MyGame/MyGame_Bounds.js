/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

'use strict'  // Operate in Strict mode such that variables must be declared before used!
var kSpeed = 40
MyGame.prototype.radomizeVelocity = function()
{
    var i = 0
    for (i = this.mFirstObject; i<this.mAllObjs.size(); i++) {
        var obj = this.mAllObjs.getObjectAt(i)
        var rigidShape = obj.getRigidBody()
        var x = (Math.random() - 0.5) * kSpeed
        var y = Math.random() * kSpeed * 0.5
        rigidShape.setVelocity(x, y)
    }
}

MyGame.prototype.createBounds = function() {
    var x = 15, w = 30, y = 4
    for (x = 15; x < 120; x+=30) 
        this.platformAt(x, y, w, 0)
    y = 76
    for (x = 15; x < 120; x+=30) 
        this.platformAt(x, y, w, 180)
    
    this.platformAt(40, 40, 20, -30)
    this.platformAt(60, 30, 20, 0)
    this.platformAt(20, 20, 20, 0)
    this.platformAt(70, 50, 20, 0)
    
    x = 2
    w = 3
    for (y = 8; y < 90; y+=12) 
        this.wallAt(x, y, w)
    x = 98
    for (y = 8; y < 90; y+=12) 
        this.wallAt(x, y, w)
    
    var r = new TextureRenderable(this.kTargetTexture)
    this.mTarget = new GameObject(r)
    var xf = r.getXform()
    xf.setSize(3, 3)   //设置图标大小
}

MyGame.prototype.wallAt = function (x, y, w) {
    var h = w * 4
    var p = new TextureRenderable(this.kWallTexture)
    var xf = p.getXform()
    
    var g = new GameObject(p)
    var r = new RigidRectangle(xf, w, h)
    g.setRigidBody(r)
    g.toggleDrawRenderable()
    
    r.setMass(0)
    xf.setSize(w, h)
    xf.setPosition(x, y)
    this.mNewBounds.addToSet(g)
   // this.mAllObjs.addToSet(g)
}

MyGame.prototype.platformAt = function (x, y, w, rot) {
    var h = w / 8
    var p = new TextureRenderable(this.kPlatformTexture)
    var xf = p.getXform()
    
    var g = new GameObject(p)
    var r = new RigidRectangle(xf, w, h)
    g.setRigidBody(r)
    g.toggleDrawRenderable()
    
    r.setMass(0)
    xf.setSize(w, h)
    xf.setPosition(x, y)
    xf.setRotationInDegree(rot)
    this.mNewBounds.addToSet(g)
    //this.mAllObjs.addToSet(g)
}


    