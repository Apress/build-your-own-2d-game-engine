/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */
 
"use strict";  // Operate in Strict mode such that variables must be declared before used!
function PropShield(spriteTexture,XPos,YPos){
    this.kDelta = 0.5*Math.random()+0.2;
    this.mPropShield = new SpriteRenderable(spriteTexture);
    this.mPropShield.setColor([1, 1, 1, 0]);
    this.mPropShield.getXform().setPosition(XPos, YPos);
    this.mPropShield.getXform().setSize(9.6, 9.6);
    this.mPropShield.setElementPixelPositions(0,64,0,64);
    this.mExpired = false;
    GameObject.call(this, this.mPropShield);
}
gEngine.Core.inheritPrototype(PropShield, GameObject);

PropShield.prototype.setExpired = function() {
    this.mExpired = true;
};
PropShield.prototype.hasExpired = function() {
    return this.mExpired;
};
