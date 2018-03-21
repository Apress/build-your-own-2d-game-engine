/* File: GameObject.js 
 *
 * Abstracts a game object's behavior and apparance
 */

/*jslint node: true, vars: true */
/*global gEngine, vec2, vec3, BoundingBox */
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
    this.mRigidBody = null;
    this.mDrawRenderable = true;
    this.mDrawRigidShape = false; 
    this.mDrawDepth = 0.0;
    this.mIsDeleted = false;
    this.collisionInfo = new CollisionInfo();
}

/**
 * Return the GameObject's Transform
 * @returns {Transform} Gameobject Transform
 * @memberOf GameObject
 */
GameObject.prototype.getTransform = function () { return this.mRenderComponent.getTransform(); };

/**
 * Return the GameObject's Bounding Box
 * @returns {BoundingBox} of this GameObject
 * @memberOf GameObject
 */
GameObject.prototype.getBBox = function () {
    var xform = this.getTransform();
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
GameObject.prototype.getRenderable = function () {
    return this.mRenderComponent; 
};

GameObject.prototype.getRigidBody = function () { 
    return this.mRigidBody; 
};

GameObject.prototype.setRigidBody = function (r) {
    this.mRigidBody = r;
};

GameObject.prototype.getCollisionInfo = function () {
    
    return this.collisionInfo;
};

/**
 * Sets how far an object is from the camera depth-wise.
 * 
 * @param depth  The level at which to draw the object. Higher = further away
 */
GameObject.prototype.setDrawDepth = function (depth) {
    this.mDrawDepth = depth;
};

GameObject.prototype.getDrawDepth = function () {
    return this.mDrawDepth;
};

GameObject.prototype.setDrawRenderable = function(isDrawn) { 
    this.mDrawRenderable = isDrawn; 
};

GameObject.prototype.toggleDrawRenderable = function() { 
    this.mDrawRenderable = !this.mDrawRenderable; 
};

GameObject.prototype.toggleDrawRigidShape = function() { 
    this.mDrawRigidShape = !this.mDrawRigidShape; 
};

GameObject.prototype.setDrawRigidShape = function(isDrawn) { 
    this.mDrawRigidShape = isDrawn; 
};

GameObject.prototype.update = function () {
    // simple default behavior
    if (this.mRigidBody !== null)
            this.mRigidBody.update();
    
    //Debug toggles
    /*
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.T)) {
        this.toggleDrawRenderable();
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
        this.toggleDrawRigidShape();
    }
     */
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.B)) {
        if (this.mRigidBody !== null)
            this.mRigidBody.toggleDrawBound();
    }
};

GameObject.prototype.draw = function (aCamera) {
    
    if (this.isVisible()) {
        if (this.mDrawRenderable)
            this.mRenderComponent.draw(aCamera);
        if ((this.mRigidBody !== null) && (this.mDrawRigidShape))
            this.mRigidBody.draw(aCamera);
    }
};

GameObject.prototype.delete = function () {
    
    this.mIsDeleted = true;
};

GameObject.prototype.getIsDeleted = function () {
    
    return this.mIsDeleted;
};