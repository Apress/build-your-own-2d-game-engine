/* File: GameObject.js 
 *
 * Abstracts a game object's behavior and apparance
 */

/*jslint node: true, vars: true */
/*global gEngine, vec2, vec3, BoundingBox, IllumRenderable, LightRenderable,Hero */
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
    this.mPhysicsComponent = null;
    this.mRigidBody = null;
    this.mDrawRenderable = true;
    this.mDrawRigidShape = false;
    //custom additions - SS    
    this.mSpeed = 0;
    //shake variables
    var xf = this.getXform();
    this.mGameObjectState = new GameObjectState(xf.getPosition(), xf.getWidth());
    this.mGameObjectShake = null;
}

GameObject.prototype.addLight = function (light) {
    if (this.mRenderComponent instanceof LightRenderable)
    {
        this.mRenderComponent.addLight(light);
    }
};

/**
 * Return the GameObject's Transform
 * @returns {Transform} Gameobject Transform
 * @memberOf GameObject
 */
GameObject.prototype.getXform = function () {
    return this.mRenderComponent.getXform();
};

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
GameObject.prototype.setVisibility = function (f) {
    this.mVisible = f;
};

/**
 * Returs the visibility state of the GameObject
 * @returns {Boolean} returns true if this GameObject is visible
 * @memberOf GameObject
 */
GameObject.prototype.isVisible = function () {
    return this.mVisible;
};

/* - SS
 * set speed of object
 * @param {int} s
 */
GameObject.prototype.setSpeed = function (s) {
    this.mSpeed = s;
};
/* -SS
 * get current speed
 * @returns {Number}
 */
GameObject.prototype.getSpeed = function () {
    return this.mSpeed;
};
/* -SS
 * change speed by delta
 * @param {number} delta
 */
GameObject.prototype.incSpeedBy = function (delta) {
    this.mSpeed += delta;
};

GameObject.prototype.setCurrentFrontDir = function (f) {
    vec2.normalize(this.mCurrentFrontDir, f);
};


/**
 * Return the front vector of the GameObject
 * @returns {vec2} GameObject's front vector
 * @memberOf GameObject
 */
GameObject.prototype.getCurrentFrontDir = function () {
    return this.mCurrentFrontDir;
};

/**
 * Return the GameObject Renderable Object
 * @returns {Renderable} current Renderable of the GameObject
 * @memberOf GameObject
 */
GameObject.prototype.getRenderable = function () {
    return this.mRenderComponent;
};
/**
 * Set the Physics Component for the GameObject
 * @param {RigidShape} p new Physics Compenent of the GameObject
 * @returns {void}
 * @memberOf GameObject
 */
GameObject.prototype.setPhysicsComponent = function (p) {
    this.mPhysicsComponent = p;
};

/**
 * Return the Physics Component for the GameObject
 * @returns {RigidShape} Physics Compenent of the GameObject
 * @memberOf GameObject
 */
GameObject.prototype.getPhysicsComponent = function () {
    return this.mPhysicsComponent;
};

/**
 * Set Physics Component to null for the GameObject
 * @memberOf GameObject
 */
GameObject.prototype.removePhysicsComponent = function () {
    this.mPhysicsComponent = null;
};


GameObject.prototype.setRigidBody = function (r) {
    this.mRigidBody = r;
};
GameObject.prototype.getRigidBody = function () {
    return this.mRigidBody;
};
GameObject.prototype.toggleDrawRenderable = function () {
    this.mDrawRenderable = !this.mDrawRenderable;
};
GameObject.prototype.toggleDrawRigidShape = function () {
    this.mDrawRigidShape = !this.mDrawRigidShape;
};

GameObject.prototype.isCollidingWith = function (o) {
    var h = [];
    return this.pixelTouches(o, h);
};

GameObject.prototype.update = function () {

    if (this.mPhysicsComponent !== null) {
        this.mPhysicsComponent.update();
    }

    // simple default behavior
    if (this.mRigidBody !== null)
        this.mRigidBody.update();
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.T)) {
        this.toggleDrawRenderable();
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.B)) {
        if (this.mRigidBody !== null)
            this.mRigidBody.toggleDrawBound();
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
        this.toggleDrawRigidShape();
    }

    //object shake - SS
    //needed for interpolate as well
    if (this.mGameObjectShake !== null) {
        var tempPos = vec2.fromValues(this.mGameObjectShake.getCenter()[0], this.mGameObjectShake.getCenter()[1]);
        this.getXform().setXPos(tempPos[0]);
        this.getXform().setYPos(tempPos[1]);
        if (this.mGameObjectShake.shakeDone()) {
            this.mGameObjectShake = null;
            this.die = true;
        } else {
            this.mGameObjectShake.setRefCenter(this.getXform().getPosition());
            this.mGameObjectShake.updateShakeState();
        }
    }

    this.mGameObjectState.updateGameObjectState();
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


// Orientate the entire object to point towards point p
// will rotate Xform() accordingly
/*
 * rotate object towards (p) at the rate of(rate)
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

GameObject.prototype.shake = function (xDelta, yDelta, shakeFrequency, duration) {
    this.mGameObjectShake = new GameObjectShake(this.mGameObjectState, xDelta, yDelta, shakeFrequency, duration);
};

GameObject.prototype.interpolateBy = function (dx, dy) {
    var newC = vec2.clone(this.getXform().getPosition());
    newC[0] += dx;
    newC[1] += dy;
    this.mGameObjectState.setCenter(newC);
};
GameObject.prototype.panTo = function (cx, cy) {
    this.mGameObjectState.setCenter([cx, cy]);
};
