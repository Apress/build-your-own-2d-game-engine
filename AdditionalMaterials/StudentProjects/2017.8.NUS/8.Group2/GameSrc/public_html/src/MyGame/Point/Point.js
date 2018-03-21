/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */
 
"use strict";  // Operate in Strict mode such that variables must be declared before used!
function Point(spriteTexture,XPos,YPos){
    this.kDelta = 0.2*Math.random()+0.1;
    //this.kRefWidth = 80;
    //this.kRefHeight = 130;
    this.angle = 180*Math.random();
    this.mPoint = new SpriteRenderable(spriteTexture);
    this.mPoint.setColor([1, 1, 1, 0]);
    this.mPoint.getXform().setPosition(XPos, YPos);
    this.mPoint.getXform().setSize(8, 8);
    this.mPoint.setElementPixelPositions(0,128, 0, 128);
    this.mExpired = false;
    GameObject.call(this, this.mPoint);
}
gEngine.Core.inheritPrototype(Point, GameObject);

Point.prototype.setExpired = function() {
    this.mExpired = true;
};
Point.prototype.hasExpired = function() {
    return this.mExpired;
};
