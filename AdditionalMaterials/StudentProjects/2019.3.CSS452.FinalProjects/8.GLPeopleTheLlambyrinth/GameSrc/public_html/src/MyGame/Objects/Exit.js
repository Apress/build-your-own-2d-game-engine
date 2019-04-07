/* File: Exit.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, SpriteAnimateRenderable, vec2,NonPhysicsGameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
//+128 px
function Exit(spriteTexture,normalTexture, x,y) {
    
    this.mExit = new IllumRenderable(spriteTexture, normalTexture);
    this.mExit.setColor([1, 1, 1, 0]);
    this.mExit.getXform().setPosition(x, y);
    this.mExit.getXform().setSize(5, 5);
    this.mExit.setElementPixelPositions(1239, 1330, 718, 809);   //move to  (384, 512, 256, 512)
  
    GameObject.call(this, this.mExit);   
}
gEngine.Core.inheritPrototype(Exit, GameObject);


Exit.prototype.update = function() {
    //check collision with hero, if collide end game 

};


Exit.prototype.draw = function(aCamera) {
    this.mExit.draw(aCamera);
};


