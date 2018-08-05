/* File: TextureObject.js 
 *
 * Defines the behavior of an GameObject that references to a TextureRenderable
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, TextureRenderable*/
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function LaserBeam(texture, x, y, w, h) {
    this.kDelta = 0.2;
    this.kRDelta = 0.1; // radian

    this.mRenderable = new SpriteRenderable(texture);
    this.mRenderable.setColor([1, 1, 1, 0.1]);
    this.mRenderable.getXform().setPosition(x, y);
    this.mRenderable.getXform().setSize(w, h);
    this.mRenderable.setElementPixelPositions(0, 256, 0,256);
    GameObject.call(this, this.mRenderable);
}
gEngine.Core.inheritPrototype(LaserBeam, GameObject);

LaserBeam.prototype.update = function () {
    if(this.getXform().getYPos() < heroY -8.7) {
        this.getXform().setPosition(-10,-10);
    }else {
        this.getXform().incYPosBy(-0.4);
    }
};