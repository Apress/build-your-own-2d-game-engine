/* File: Hero.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Item(spriteTexture) {
    this.kDelta = 0.3;
    this.type = null;
    this.item = new SpriteRenderable(spriteTexture);
    //this.mDye.setColor([1, 1, 1, 0]);
    this.item.getXform().setPosition(35, 35);
    this.item.getXform().setSize(2.3, 2.3);
    //this.mDye.setElementPixelPositions(0, 120, 0, 180);
    GameObject.call(this, this.item);
}
gEngine.Core.inheritPrototype(Item, GameObject);

Item.prototype.update = function () {
    
};