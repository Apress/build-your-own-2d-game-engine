/* File: Minion.js 
 *
 * Creates and initializes a Minion object
 * overrides the update function of GameObject to define
 * simple sprite animation behavior behavior
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteAnimateRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var kMinionWidth = 6;
var kMinionHeight = 4.8;

function SphereMinion(spriteTexture, atX, atY) {
        
    var w = kMinionWidth;
    var h = kMinionHeight;
    
    this.mSpeed = .18;
    this.mHealth = 1;
    
    this.mIsBouncingBack = false;
    // Last time Sphere hit Hobbes
    this.mLastHit = 0;
    // Interval of time within which to bounce back
    this.mBounceLength = 250;
    
    this.mMinion = new SpriteRenderable(spriteTexture);
    this.mMinion.setColor([1, 1, 1, 0]);
    this.mMinion.getXform().setPosition(atX, atY);
    this.mMinion.getXform().setSize(w, h);
    

   this.mMinion.setElementPixelPositions(0, 512, 0, 512);
    GameObject.call(this, this.mMinion);
    
    var r;
    r = new RigidCircle(this.getXform(), 0.35*Math.sqrt(w*w + h*h)); 
    var vx = (0);
    var vy = (0);
    var speed = 0;
    r.setVelocity(vx * speed, vy * speed);
    r.setMass(0);
    
    this.addRigidBody(r);
    
    this.mBoundBox = new BoundingBox(
        vec2.fromValues(atX, atY),
        w/2,
        h/2
    );
}
gEngine.Core.inheritPrototype(SphereMinion, GameObject);

SphereMinion.prototype.rotateObjPointTo = function (p, rate) {
    // Step A: determine if reach the destination position p
    var dir = [];
    vec2.sub(dir, p, this.getXform().getPosition());
    var len = vec2.length(dir);
    if (len < Number.MIN_VALUE) {
        return; // we are there.
    }
    vec2.scale(dir, dir, 1 / len);

    // Step B: compute the angle to rotate
    var fdir = this.getCurrentFrontDir();
    var cosTheta = vec2.dot(dir, fdir);

    if (cosTheta > 0.999999) { // almost exactly the same direction
        return;
    }

    // Step C: clamp the cosTheda to -1 to 1 
    // in a perfect world, this would never happen! BUT ...
    if (cosTheta > 1) {
        cosTheta = 1;
    } else {
        if (cosTheta < -1) {
            cosTheta = -1;
        }
    }

    // Step D: compute whether to rotate clockwise, or counterclockwise
    var dir3d = vec3.fromValues(dir[0], dir[1], 0);
    var f3d = vec3.fromValues(fdir[0], fdir[1], 0);
    var r3d = [];
    vec3.cross(r3d, f3d, dir3d);

    var rad = Math.acos(cosTheta);  // radian to roate
    if (r3d[2] < 0) {
        rad = -rad;
    }

    // Step E: rotate the facing direction with the angle and rate
    rad *= rate;  // actual angle need to rotate from Obj's front
    vec2.rotate(this.getCurrentFrontDir(), this.getCurrentFrontDir(), rad);
    this.getXform().incRotationByRad(rad);
};

SphereMinion.prototype.bounceBack = function () {
    this.mIsBouncingBack = true;
    this.mSpeed = -1;
    this.mLastHit = Date.now();
};

SphereMinion.prototype.update = function (camera, hobbes) {
    
    this.rotateObjPointTo(hobbes.getXform().getPosition(), .3);

    var pos = this.getXform().getPosition();
    vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.mSpeed);

    // Determine if bounce back should stop
    if (this.mIsBouncingBack) {
        var currentTime = Date.now();
        if (currentTime - this.mLastHit > this.mBounceLength) {
            this.mIsBouncingBack = false;
            this.mSpeed = .1;
        }
    }

    GameObject.prototype.update.call(this);
};

SphereMinion.prototype.registerDamage = function () { this.mHealth--;};

SphereMinion.prototype.hasExpired = function () { return this.mHealth <= 0;};