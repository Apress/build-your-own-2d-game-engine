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

GameObject.prototype.setRigidBody = function (r) {
    this.mRigidBody = r;
};
GameObject.prototype.getRigidBody = function () { return this.mRigidBody; };
GameObject.prototype.toggleDrawRenderable = function() { 
    this.mDrawRenderable = !this.mDrawRenderable; };
GameObject.prototype.toggleDrawRigidShape = function() { 
    this.mDrawRigidShape = !this.mDrawRigidShape; };

GameObject.prototype.update = function () {
    // simple default behavior
    if (this.mRigidBody !== null)
            this.mRigidBody.update();
};

GameObject.prototype.draw = function (aCamera) {
    if (this.isVisible()) {
        if (this.mDrawRenderable)
            this.mRenderComponent.draw(aCamera);
        if ((this.mRigidBody !== null) && (this.mDrawRigidShape))
            this.mRigidBody.draw(aCamera);
    }
};