/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */
 
"use strict";  // Operate in Strict mode such that variables must be declared before used!
function Show(spriteTexture,XPos, YPos){

    this.mShow = new SpriteRenderable(spriteTexture);
    this.mShow.setColor([1, 1, 1, 0]);
    this.mShow.getXform().setPosition(XPos, YPos);
    this.mShow.getXform().setSize(2.5, 2.5);
    this.mShow.setElementPixelPositions(0,64, 0, 64);
    GameObject.call(this, this.mShow);
}
gEngine.Core.inheritPrototype(Show, GameObject);
