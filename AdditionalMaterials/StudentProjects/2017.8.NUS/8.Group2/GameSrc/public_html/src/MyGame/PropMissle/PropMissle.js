/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */
 
"use strict";  // Operate in Strict mode such that variables must be declared before used!
function PropMissle(spriteTexture,XPos,YPos){
    this.kDelta = 0.2*Math.random()+0.1;
    //this.kRefWidth = 80;
    //this.kRefHeight = 130;
    this.angle = 180*Math.random();
    this.mPropMissle = new SpriteRenderable(spriteTexture);
    this.mPropMissle.setColor([1, 1, 1, 0]);
    this.mPropMissle.getXform().setPosition(XPos, YPos);
    this.mPropMissle.getXform().setSize(9.6, 9.6);
    this.mPropMissle.setElementPixelPositions(0,64, 0, 64);
    this.mExpired = false;
    GameObject.call(this, this.mPropMissle);
}
gEngine.Core.inheritPrototype(PropMissle, GameObject);

PropMissle.prototype.setExpired = function() {
    this.mExpired = true;
};
PropMissle.prototype.hasExpired = function() {
    return this.mExpired;
};
