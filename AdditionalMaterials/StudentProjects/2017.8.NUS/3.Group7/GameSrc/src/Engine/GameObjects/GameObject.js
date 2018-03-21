/* File: GameObject.js 
 *
 * Abstracts a game object's behavior and apparance
 */

/*jslint node: true, vars: true */
/*global vec2, vec3, BoundingBox */
/* find out more about jslint: http://www.jslint.com/help.html */

'use strict'  // Operate in Strict mode such that variables must be declared before used!

function GameObject(renderableObj) {
    this.mRenderComponent = renderableObj
    this.mVisible = true
    this.mCurrentFrontDir = vec2.fromValues(0, 1)  // this is the current front direction of the object
    this.mRigidBody = null
    this.mDrawRenderable = true
}
GameObject.prototype.getXform = function () { return this.mRenderComponent.getXform() }
GameObject.prototype.getBBox = function () {
    var xform = this.getXform()
    var b = new BoundingBox(xform.getPosition(), xform.getWidth(), xform.getHeight())
    return b
}
GameObject.prototype.setVisibility = function (f) { this.mVisible = f }
GameObject.prototype.isVisible = function () { return this.mVisible }

GameObject.prototype.setCurrentFrontDir = function (f) { vec2.normalize(this.mCurrentFrontDir, f) }
GameObject.prototype.getCurrentFrontDir = function () { return this.mCurrentFrontDir }

GameObject.prototype.getRenderable = function () { return this.mRenderComponent }

GameObject.prototype.setRigidBody = function (r) {
    this.mRigidBody = r
}
GameObject.prototype.getRigidBody = function () { return this.mRigidBody }
GameObject.prototype.toggleDrawRenderable = function() { 
    this.mDrawRenderable = !this.mDrawRenderable }

GameObject.prototype.update = function () {
    // simple default behavior
    if (this.mRigidBody !== null)
        this.mRigidBody.update()
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.T)) {
        this.toggleDrawRenderable()
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.B)) {
        if (this.mRigidBody !== null)
            this.mRigidBody.toggleDrawBound()
    }
}

GameObject.prototype.draw = function (aCamera) {
    if (this.isVisible()) {
        //if (this.mDrawRenderable)
        this.mRenderComponent.draw(aCamera)
        if (this.mRigidBody !== null)
            this.mRigidBody.draw(aCamera)
    }
}