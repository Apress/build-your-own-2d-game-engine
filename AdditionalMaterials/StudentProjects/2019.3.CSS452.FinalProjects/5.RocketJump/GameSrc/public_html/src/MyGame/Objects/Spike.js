/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Spike(x, y, rot) {
    this.mSpike = new TextureRenderable("assets/RigidShape/Spike.png");
    this.mSpike.setColor([1, 1, 1, 0]);
    this.mSpike.getXform().setPosition(x, y);
    this.mSpike.getXform().incRotationByDegree(rot);
    this.mSpike.getXform().setSize(10, 8);
    
    GameObject.call(this, this.mSpike);
   
    
}
gEngine.Core.inheritPrototype(Spike, GameObject);

Spike.prototype.update = function () {
   
};

