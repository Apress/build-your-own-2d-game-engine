/* File: Trap.js
 *
 * Creates and initializes a simple Trap object
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false, vec2: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Trap(spriteTexture, position, top) {

    //TODO get another texture
    this.mTrap = new SpriteRenderable(spriteTexture);
    this.mTrap.setColor([1, 1, 1, 0]);
    if (position !== undefined) {
        this.mTrap.getXform().setPosition(position[0], position[1]);

    } else {

        this.mTrap.getXform().setPosition(80, 20);
    }
    this.mTrap.getXform().setSize(8, 5);
    // this.mTrap.setElementPixelPositions(130, 310, 0, 180);
    if (top === undefined || top) {
        this.mTrap.setElementPixelPositions(2159, 2371, 2800, 2845);

    } else {
        this.mTrap.setElementPixelPositions(2371, 2159, 2845, 2800);

    }
    // this.mTrap.setElementPixelPositions(0, 120, 0, 180);


    GameObject.call(this, this.mTrap);


}

gEngine.Core.inheritPrototype(Trap, GameObject);

Trap.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);  // default moving forward

};

Trap.prototype.update = function () {
    // GameObject.prototype.update.call(this);  // default moving forward


};