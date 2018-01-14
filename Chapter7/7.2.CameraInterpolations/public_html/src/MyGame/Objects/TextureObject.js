/* File: TextureObject.js 
 *
 * Defines the behavior of an GameObject that references to a TextureRenderable
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, TextureRenderable*/
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function TextureObject(texture, x, y, w, h) {
    this.kDelta = 0.2;
    this.kRDelta = 0.1; // radian

    this.mRenderable = new TextureRenderable(texture);
    this.mRenderable.setColor([1, 1, 1, 0.1]);
    this.mRenderable.getXform().setPosition(x, y);
    this.mRenderable.getXform().setSize(w, h);
    GameObject.call(this, this.mRenderable);
}
gEngine.Core.inheritPrototype(TextureObject, GameObject);

TextureObject.prototype.update = function (up, down, left, right) {
    var xform = this.getXform();
    if (gEngine.Input.isKeyPressed(up)) {
        xform.incYPosBy(this.kDelta);
    }
    if (gEngine.Input.isKeyPressed(down)) {
        xform.incYPosBy(-this.kDelta);
    }
    if (gEngine.Input.isKeyPressed(left)) {
        xform.incXPosBy(-this.kDelta);
    }
    if (gEngine.Input.isKeyPressed(right)) {
        xform.incXPosBy(this.kDelta);
    }
};