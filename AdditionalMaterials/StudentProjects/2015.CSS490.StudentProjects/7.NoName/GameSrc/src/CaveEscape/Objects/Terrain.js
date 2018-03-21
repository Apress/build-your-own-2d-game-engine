/* File: Terrain.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, Renderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

Terrain.kSpeed = 0.3;  
        // across the entire screen in 0.5 seconds
Terrain.kTexture = "assets/terrain.png";
Terrain.kNormal = "assets/terrain_normal.png";

function Terrain(x, y) {
    this.kRefWidth = 20;
    this.kRefHeight = 2;
            
    this.kDetectThreshold = 10;
    this.kChaseThreshold = 2 * this.kDetectThreshold;
    
    var r = new IllumRenderable(Terrain.kTexture, Terrain.kNormal), i;
    //r.setColor([0.2, .15, .075, 1]);
    r.getXform().setPosition(x, y);
    r.getXform().setSize(this.kRefWidth, this.kRefHeight);
    //for (i = 0; i < globalLightSet.numLights(); i++)
        //wr.addLight(globalLightSet.getLightAt(i));
    GameObject.call(this, r);

    
    // Expired to remove
    this.mExpired = false;
}
gEngine.Core.inheritPrototype(Terrain, GameObject);

Terrain.prototype.setExpired = function() {
    this.mExpired = true;
};
Terrain.prototype.hasExpired = function() {
    return this.mExpired;
};

Terrain.prototype.update = function(aCamera) {
   
   if(this.mExpired) { return; }
   
    GameObject.prototype.update.call(this);
    var hit = false;

   if (this.getXform().getXPos() < aCamera.getWCCenter()[0] - aCamera.getWCWidth() / 2 - 1) {
       this.setExpired();
   }
   
    return hit;
};