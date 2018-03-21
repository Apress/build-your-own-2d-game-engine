/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */
 
"use strict";  // Operate in Strict mode such that variables must be declared before used!
function PropSupply(spriteTexture,XPos,YPos){
    this.kDelta = 0.5*Math.random()+0.2;
    this.mPropSupply = new SpriteRenderable(spriteTexture);
    this.mPropSupply.setColor([1, 1, 1, 0]);
    this.mPropSupply.getXform().setPosition(XPos, YPos);
    this.mPropSupply.getXform().setSize(9.6, 9.6);
    this.mPropSupply.setElementPixelPositions(0,64,0,64);
    this.mExpired = false;
    GameObject.call(this, this.mPropSupply);
}
gEngine.Core.inheritPrototype(PropSupply, GameObject);

PropSupply.prototype.setExpired = function() {
    this.mExpired = true;
};
PropSupply.prototype.hasExpired = function() {
    return this.mExpired;
};
