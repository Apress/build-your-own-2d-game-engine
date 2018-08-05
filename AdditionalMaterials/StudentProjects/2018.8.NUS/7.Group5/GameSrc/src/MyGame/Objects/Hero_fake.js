/* File: Minion.js 
 *
 * Creates and initializes a Minion object
 * overrides the update function of GameObject to define
 * simple sprite animation behavior behavior
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteAnimateRenderable: false,vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Hero_fake(spriteTexture) {
        
    this.mode=1;  
    this.mHero = new LightRenderable(spriteTexture);
    this.mHero.setColor([0, 0, 0, 1]);
    this.mHero.getXform().setPosition(0, 20);
    this.mHero.getXform().setSize(2.6, 6.5);
    this.mHero.setElementUVCoordinate(0.7, 0.8, 0.762, 1.0);
    //this.setCurrentFrontDir(vec2.fromValues(1,0));
    
    GameObject.call(this, this.mHero);  
}



gEngine.Core.inheritPrototype(Hero_fake, GameObject);


Hero_fake.prototype.update = function () {
    
    
    GameObject.prototype.update.call(this);
    
    
};

Hero_fake.prototype.draw=function(aCamera){
  
};