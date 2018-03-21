/* 
 * File: 		GameObject.js 
 * Author:      	Ryu Muthui
 * Last Date Modified: 	11/19/2015
 * Description:		Abstracts a game object's behavior and apparance
 */

/*jslint node: true, vars: true */
/*global vec2, vec3, BoundingBox */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

// Added 2nd param groupTransform so that bounding box has access to group transform
function GameObject(renderableObj, group) {
    this.mRenderComponent = renderableObj;
    this.mVisible = true;
    this.mCurrentFrontDir = vec2.fromValues(0, 1);  // this is the current front direction of the object
    this.mSpeed = 0;
    this.mPhysicsComponent = null;
    // Added this member variable to hold group
    this.mGroup = group;
}

// Added accessor for groupXform
GameObject.prototype.getGroupXform = function (){ return this.mGroup.getXform(); };
GameObject.prototype.getGroup = function (){ return this.mGroup; };

// Added this function for collision detection for each individual element
// in a group object set with another group object set's element (inner BBoxes)
GameObject.prototype.intersectsBoundObjectObject = function (otherObj) {
    var bBox = this.getBBox();
    var bBoxOther = otherObj.getBBox();
    
    if (this.getGroup() === undefined && otherObj.getGroup() === undefined) {
        return ((bBox.minX() < 
             bBoxOther.maxX()) &&
            (bBox.maxX() > 
             bBoxOther.minX()) &&
            (bBox.minY()) < 
             bBoxOther.maxY()) &&
            (bBox.maxY() > 
             bBoxOther.minY());
    }
    else if (otherObj.getGroup() === undefined) {
        var xform = this.getGroup().getXform();
        return ((bBox.minX() * xform.getWidth() + xform.getXPos() < 
                 bBoxOther.maxX()) &&
                (bBox.maxX() * xform.getWidth() + xform.getXPos() > 
                 bBoxOther.minX()) &&
                (bBox.minY() * xform.getHeight() + xform.getYPos() < 
                 bBoxOther.maxY()) &&
                (bBox.maxY() * xform.getHeight() + xform.getYPos() > 
                 bBoxOther.minY()));
    }
    else if (this.getGroup() === undefined) {
        var otherXform = otherObj.getGroup().getXform();
        return ((bBox.minX() < 
                 bBoxOther.maxX() * otherXform.getWidth() + otherXform.getXPos()) &&
                (bBox.maxX() > 
                 bBoxOther.minX() * otherXform.getWidth() + otherXform.getXPos()) &&
                (bBox.minY() < 
                 bBoxOther.maxY() * otherXform.getHeight() + otherXform.getYPos()) &&
                (bBox.maxY() > 
                 bBoxOther.minY() * otherXform.getHeight() + otherXform.getYPos()));
    }
    else {
        var xform = this.getGroup().getXform();
        var otherXform = otherObj.getGroup().getXform();
        return ((bBox.minX() * xform.getWidth() + xform.getXPos() < 
                 bBoxOther.maxX() * otherXform.getWidth() + otherXform.getXPos()) &&
                (bBox.maxX() * xform.getWidth() + xform.getXPos() > 
                 bBoxOther.minX() * otherXform.getWidth() + otherXform.getXPos()) &&
                (bBox.minY() * xform.getHeight() + xform.getYPos() < 
                 bBoxOther.maxY() * otherXform.getHeight() + otherXform.getYPos()) &&
                (bBox.maxY() * xform.getHeight() + xform.getYPos() > 
                 bBoxOther.minY() * otherXform.getHeight() + otherXform.getYPos()));
    }
};

GameObject.prototype.intersectsBoundObjectGroup = function (otherGroup) {
    var bBox = this.getBBox();
    var bBoxOther = otherGroup.getBBox();
    
    if (this.getGroup() === undefined) {
        var otherXform = otherGroup.getXform();
        return ((bBox.minX() < 
                 bBoxOther.maxX() * otherXform.getWidth() + otherXform.getXPos()) &&
                (bBox.maxX() > 
                 bBoxOther.minX() * otherXform.getWidth() + otherXform.getXPos()) &&
                (bBox.minY() < 
                 bBoxOther.maxY() * otherXform.getHeight() + otherXform.getYPos()) &&
                (bBox.maxY() > 
                 bBoxOther.minY() * otherXform.getHeight() + otherXform.getYPos()));
    }
    else {
        var xform = this.getGroup().getXform();
        var otherXform = otherGroup.getXform();
        return ((bBox.minX() * xform.getWidth() + xform.getXPos() < 
                 bBoxOther.maxX() * otherXform.getWidth() + otherXform.getXPos()) &&
                (bBox.maxX() * xform.getWidth() + xform.getXPos() > 
                 bBoxOther.minX() * otherXform.getWidth() + otherXform.getXPos()) &&
                (bBox.minY() * xform.getHeight() + xform.getYPos() < 
                 bBoxOther.maxY() * otherXform.getHeight() + otherXform.getYPos()) &&
                (bBox.maxY() * xform.getHeight() + xform.getYPos() > 
                 bBoxOther.minY() * otherXform.getHeight() + otherXform.getYPos()));
    }
};

GameObject.prototype.getXform = function () { return this.mRenderComponent.getXform(); };

GameObject.prototype.getBBox = function () {
    var xform = this.getXform();
    return new BoundingBox(xform.getPosition(), xform.getWidth(), xform.getHeight());
};

GameObject.prototype.drawBBox = function(camera) {
    if (this.mGroup === undefined)
        this.getBBox().draw(camera);
    else
        this.getBBox().drawAsChild(camera, this.mGroup.getXform().getXform());
};

GameObject.prototype.setVisibility = function (f) { this.mVisible = f; };
GameObject.prototype.isVisible = function () { return this.mVisible; };

GameObject.prototype.setSpeed = function (s) { this.mSpeed = s; };
GameObject.prototype.getSpeed = function () { return this.mSpeed; };
GameObject.prototype.incSpeedBy = function (delta) { this.mSpeed += delta; };

GameObject.prototype.setCurrentFrontDir = function (f) { vec2.normalize(this.mCurrentFrontDir, f); };
GameObject.prototype.getCurrentFrontDir = function () { return this.mCurrentFrontDir; };

GameObject.prototype.getRenderable = function () { return this.mRenderComponent; };

GameObject.prototype.setPhysicsComponent = function (p) { this.mPhysicsComponent = p; };
GameObject.prototype.getPhysicsComponent = function () { return this.mPhysicsComponent; };

// Added: behavior code moved to brain object's update
// Re-add behavior code here to extend to any single sprite object
GameObject.prototype.update = function () {
    var pos = this.getXform().getPosition();
    vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.getSpeed());
    
    if (this.mPhysicsComponent !== null) {
        this.mPhysicsComponent.update();
    }
};

GameObject.prototype.draw = function (aCamera) {
    if (this.isVisible()) {
        this.mRenderComponent.draw(aCamera);
        if (this.mHealthBar !== undefined)
            this.mHealthBar.draw(aCamera);
    }
    
    if (this.mPhysicsComponent !== null) {
        this.mPhysicsComponent.draw(aCamera);
    }
};

// Added to support grouptranform
GameObject.prototype.drawAsChild = function (aCamera) {
    if (this.isVisible()) {
        this.mRenderComponent.drawAsChild(aCamera, this.mGroup.getXform().getXform());
        if (this.mHealthBar !== undefined) {
            this.mHealthBar.draw(aCamera);
        }
    }
};

// Orientate the entire object to point towards point p
// will rotate Xform() accordingly
GameObject.prototype.rotateObjPointTo = function (p, rate) {
    // Step A: determine if reach the destination position p
    var dir = [];
    vec2.sub(dir, p, this.getXform().getPosition());
    var len = vec2.length(dir);
    if (len < Number.MIN_VALUE) { return; } // we are there.
    vec2.scale(dir, dir, 1 / len);

    // Step B: compute the angle to rotate
    var fdir = this.getCurrentFrontDir();
    var cosTheta = vec2.dot(dir, fdir);

    if (cosTheta > 0.999999) { return;} // almost exactly the same direction 
   
    // Step C: clamp the cosTheda to -1 to 1 
    // in a perfect world, this would never happen! BUT ...
    if (cosTheta > 1) {cosTheta = 1;}
    else {
        if (cosTheta < -1) {cosTheta = -1;}
    }

    // Step D: compute whether to rotate clockwise, or counterclockwise
    var dir3d = vec3.fromValues(dir[0], dir[1], 0);
    var f3d = vec3.fromValues(fdir[0], fdir[1], 0);
    var r3d = [];
    vec3.cross(r3d, f3d, dir3d);

    var rad = Math.acos(cosTheta);  // radian to roate
    if (r3d[2] < 0) { rad = -rad;}

    // Step E: rotate the facing direction with the angle and rate
    rad *= rate;  // actual angle need to rotate from Obj's front
    vec2.rotate(this.getCurrentFrontDir(), this.getCurrentFrontDir(), rad);
    this.getXform().incRotationByRad(rad);
};

// Added to support an object to rotate away at 90 degrees or perpendicular to target obj 
GameObject.prototype.rotateObjPointAway = function (p, rate){
    // Step A: determine if reach the destination position p
    var dir = [];
    vec2.sub(dir, p, this.getXform().getPosition());
    var len = vec2.length(dir);
    if (len < Number.MIN_VALUE) { return; } // we are there.
    vec2.scale(dir, dir, 1 / len);
    
    // Added this line to set the direction perpendicular
    dir = vec2.fromValues(-dir[1], dir[0]);

    // Step B: compute the angle to rotate
    var fdir = this.getCurrentFrontDir();
    var cosTheta = vec2.dot(dir, fdir);

    if (cosTheta > 0.999999) { return;} // almost exactly the same direction 
   
    // Step C: clamp the cosTheda to -1 to 1 
    // in a perfect world, this would never happen! BUT ...
    if (cosTheta > 1) {cosTheta = 1;}
    else {
        if (cosTheta < -1) {cosTheta = -1;}
    }

    // Step D: compute whether to rotate clockwise, or counterclockwise
    var dir3d = vec3.fromValues(dir[0], dir[1], 0);
    var f3d = vec3.fromValues(fdir[0], fdir[1], 0);
    var r3d = [];
    vec3.cross(r3d, f3d, dir3d);

    var rad = Math.acos(cosTheta);  // radian to roate
    if (r3d[2] < 0) { rad = -rad; }

    // Step E: rotate the facing direction with the angle and rate
    rad *= rate;  // actual angle need to rotate from Obj's front
    vec2.rotate(this.getCurrentFrontDir(), this.getCurrentFrontDir(), rad);
    this.getXform().incRotationByRad(rad);
};

GameObject.prototype.setHealth = function(h) {
    if (this.mHealthBar !== undefined)
        this.mHealthBar.getXform().setWidth(h);
};
