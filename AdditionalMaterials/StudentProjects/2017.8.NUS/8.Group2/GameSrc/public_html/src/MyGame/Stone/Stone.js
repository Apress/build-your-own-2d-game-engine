/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */
 
"use strict";  // Operate in Strict mode such that variables must be declared before used!
function Stone(spriteTexture,XPos,YPos, K){
    this.kDelta = 0.5*(1-K)+0.2;
    //this.kRefWidth = 80;
    //this.kRefHeight = 130;
    this.angle = 180*Math.random();
    this.mStone = new SpriteRenderable(spriteTexture);
    this.mPower = 4*K+1;
    this.mStone.setColor([1, 1, 1, 0]);
    this.mStone.getXform().setPosition(XPos, YPos);
  //  var K = Math.random();
    this.mStone.getXform().setSize(10*K+4, 10*K+4);
    this.mStone.setElementPixelPositions(0,64, 0, 64);
    this.mExpired = false;
    this.mHP = 2;
    GameObject.call(this, this.mStone);
}
gEngine.Core.inheritPrototype(Stone, GameObject);

Stone.prototype.setExpired = function() {
    this.mExpired = true;
};
Stone.prototype.hasExpired = function() {
    return this.mExpired;
};
Stone.prototype.decreaseHP = function(num) {
    this.mHP = this.mHP - num;
};

