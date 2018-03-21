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

function Hero(spriteTexture) {
    this.kDelta = 0.6;

 //   this.mHero = new Renderable();
    this.mHero = new SpriteRenderable(spriteTexture);
    this.mHero.setColor([0, 0, 0, 0]);
    this.mHero.getXform().setPosition(-40, 30);
    this.mHero.getXform().setSize(10, 20);
    this.mHero.setElementPixelPositions(0, 256, 0, 512);
    GameObject.call(this, this.mHero);
}
gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.prototype.update = function () {
    // control by WASD
    var xform = this.getXform();
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
        if(xform.getYPos() < 56){
            xform.incYPosBy(this.kDelta);   
        }
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
        if(xform.getYPos() > 6){
            xform.incYPosBy(-this.kDelta);  
        }
    }
     if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        if(xform.getXPos() > -40){
            xform.incXPosBy(-this.kDelta);   
        }
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        if(xform.getXPos() < 120){
            xform.incXPosBy(this.kDelta);  
        }
    }
};