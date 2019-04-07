/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Flag(x, y) {
    this.mFlag = new TextureRenderable("assets/RigidShape/Flag.png");
    this.mFlag.setColor([1, 1, 1, 0]);
    this.mFlag.getXform().setPosition(x, y);
    this.mFlag.getXform().setSize(8, 12);
    
    GameObject.call(this, this.mFlag);
   
    
}
gEngine.Core.inheritPrototype(Flag, GameObject);

Flag.prototype.update = function () {
   
};

