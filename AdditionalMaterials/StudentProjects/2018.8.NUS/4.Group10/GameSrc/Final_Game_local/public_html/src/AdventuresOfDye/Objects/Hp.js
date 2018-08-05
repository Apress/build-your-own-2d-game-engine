/* File: BlackHero.js
 *
 * Creates and initializes the BlackHero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function HP(spriteTexture) {

    var renderableObj = new SpriteRenderable(spriteTexture);
    renderableObj.setElementPixelPositions(0,256,224,256);
    GameObject.call(this, renderableObj);
    this.getXform().setSize(48, 10);
    this.getXform().setPosition(2048, 1532);    

}
gEngine.Core.inheritPrototype(HP, GameObject);





