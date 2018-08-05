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

function Gold(spriteTexture, atX, atY, size1,size2) {
        
    
    this.mSign = new LightRenderable(spriteTexture);
    this.mSign.setColor([1, 1, 1, 0]);
    this.mSign.getXform().setPosition(atX, atY);
    this.mSign.getXform().setSize(size1, size2);
    

    GameObject.call(this, this.mSign);
    this.setCurrentFrontDir([1,0]);
    this.setSpeed(0.15);
    
}

gEngine.Core.inheritPrototype(Gold, GameObject);


Gold.prototype.update = function () {
    
GameObject.prototype.update.call(this);
};
