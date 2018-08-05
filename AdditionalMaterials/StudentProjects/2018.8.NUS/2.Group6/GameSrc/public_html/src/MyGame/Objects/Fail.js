/* File: Hero.js
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, WASDObj */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Fail(spriteTexture) {
    this.mDye = new SpriteRenderable(spriteTexture);
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(0, 0);
    this.mDye.getXform().setSize(1024, 750);
    this.mDye.setElementPixelPositions(0, 1024, 0, 1024);
    GameObject.call(this, this.mDye);
}
gEngine.Core.inheritPrototype(Fail, GameObject);

Fail.prototype.update = function () {
   GameObject.prototype.update.call(this);
};