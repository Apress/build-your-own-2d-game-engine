/* File: GameObject.js 
 *
 * Abstracts a game object's behavior and apparance
 */

/*jslint node: true, vars: true */
/*global vec2, vec3, BoundingBox */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

/**
 * Default Constructor<p>
 * Abstracts a game object's behavior and apparance
 * @class GameObject
 * @param {Renderable} renderableObj Renderable to assotiate to GameObject
 * @returns {GameObject} New instance of GameObject
 * @memberOf GameObject
 */
function GameObject(renderableObj) {
    this.mRenderComponent = renderableObj;
    this.mVisible = true;
    this.mCurrentFrontDir = vec2.fromValues(0, 1);  // this is the current front direction of the object
    this.mSpeed = 0;
    this.mPhysicsComponent = null;
}

/**
 * Return the GameObject's Transform
 * @returns {Transform} Gameobject Transform
 * @memberOf GameObject
 */
GameObject.prototype.getXform = function () { return this.mRenderComponent.getXform(); };

/**
 * Return the GameObject's Bounding Box
 * @returns {BoundingBox} of this GameObject
 * @memberOf GameObject
 */
GameObject.prototype.getBBox = function () {
    var xform = this.getXform();
    var b = new BoundingBox(xform.getPosition(), xform.getWidth(), xform.getHeight());
    return b;
};

/**
 * Set the visibility state of the GameObject
 * @param {Boolean} f new state of GameObject
 * @returns {void}
 * @memberOf GameObject
 */
GameObject.prototype.setVisibility = function (f) { this.mVisible = f; };

/**
 * Returs the visibility state of the GameObject
 * @returns {Boolean} returns true if this GameObject is visible
 * @memberOf GameObject
 */
GameObject.prototype.isVisible = function () { return this.mVisible; };

/**
 * Set the Speed of the GameObject
 * @param {Number} s new speed of GameObject
 * @returns {void}
 * @memberOf GameObject
 */
GameObject.prototype.setSpeed = function (s) { this.mSpeed = s; };

/**
 * Return the speed og the GameObject
 * @returns {Number} Speed of GameObject
 * @memberOf GameObject
 */
GameObject.prototype.getSpeed = function () { return this.mSpeed; };

/**
 * Increment the speed by delta
 * @param {Number} delta to increment the speed by
 * @returns {void}
 * @memberOf GameObject
 */
GameObject.prototype.incSpeedBy = function (delta) { this.mSpeed += delta; };

/**
 * Set the front vector of the GameObject
 * @param {vec2} f new front vector
 * @returns {void}
 * @memberOf GameObject
 */
GameObject.prototype.setCurrentFrontDir = function (f) { vec2.normalize(this.mCurrentFrontDir, f); };

/**
 * Return the front vector of the GameObject
 * @returns {vec2} GameObject's front vector
 * @memberOf GameObject
 */
GameObject.prototype.getCurrentFrontDir = function () { return this.mCurrentFrontDir; };

/**
 * Return the GameObject Renderable Object
 * @returns {Renderable} current Renderable of the GameObject
 * @memberOf GameObject
 */
GameObject.prototype.getRenderable = function () { return this.mRenderComponent; };

/**
 * Set the Physics Component for the GameObject
 * @param {RigidShape} p new Physics Compenent of the GameObject
 * @returns {void}
 * @memberOf GameObject
 */
GameObject.prototype.setPhysicsComponent = function (p) { this.mPhysicsComponent = p; console.log(p); };

/**
 * Return the Physics Component for the GameObject
 * @returns {RigidShape} Physics Compenent of the GameObject
 * @memberOf GameObject
 */
GameObject.prototype.getPhysicsComponent = function () { return this.mPhysicsComponent; };

/**
 * Orientate the entire object to point towards point p<p>
 * will rotate Xform() accordingly
 * @param {vec2} p position to rotate to
 * @param {Number} rate rate of turn towards point
 * @returns {void}
 * @memberOf GameObject
 */
GameObject.prototype.rotateObjPointTo = function (p, rate) {
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

/**
 * Update Function called by GameLoop
 * @returns {void}
 * @memberOf GameObject
 */
GameObject.prototype.update = function () {
    // simple default behavior
    var pos = this.getXform().getPosition();
    vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.getSpeed());

    if (this.mPhysicsComponent !== null) {
        this.mPhysicsComponent.update();
    }
};

/**
 * Draw function called by GameLoop
 * @param {Camera} aCamera Camera to draw too
 * @returns {void}
 * @memberOf GameObject
 */
GameObject.prototype.draw = function (aCamera) {
    if (this.isVisible()) {
        this.mRenderComponent.draw(aCamera);
    }
    if (this.mPhysicsComponent !== null) {
        this.mPhysicsComponent.draw(aCamera);
    }
};