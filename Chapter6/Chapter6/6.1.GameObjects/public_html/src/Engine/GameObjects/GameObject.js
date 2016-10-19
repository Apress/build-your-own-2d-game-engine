/* File: GameObject.js 
 *
 * Abstracts a game object's behavior and apparance
 */

/*jslint node: true, vars: true */
/*global  */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function GameObject(renderableObj) {
    this.mRenderComponent = renderableObj;
}

GameObject.prototype.getXform = function () { return this.mRenderComponent.getXform(); };

GameObject.prototype.update = function () {};

GameObject.prototype.getRenderable = function () { return this.mRenderComponent; };

GameObject.prototype.draw = function (aCamera) {
    this.mRenderComponent.draw(aCamera);
};
