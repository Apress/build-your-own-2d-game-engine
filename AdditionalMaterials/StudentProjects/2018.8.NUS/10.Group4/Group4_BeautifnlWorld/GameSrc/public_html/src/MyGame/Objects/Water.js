/* File: Hero.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, WASDObj */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Water(spriteTexture) {
    this.kDelta = 0.3;
    this.mDye = new SpriteRenderable(spriteTexture);
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(50, 45);
    this.mDye.getXform().setSize(60, 25);
    this.mDye.setElementPixelPositions(0, 1024, 100,400 );
    GameObject.call(this, this.mDye);
    
   /* var r = new RigidRectangle(this.getXform(), 50, 25);
    this.setRigidBody(r);
    this.toggleDrawRenderable();
    this.toggleDrawRigidShape();*/
}
gEngine.Core.inheritPrototype(Water, WASDObj);

Water.prototype.update = function () {
    GameObject.prototype.update.call(this);
    
    var xform = this.getXform().getXPos();
    var yform = this.getXform().getYPos();
    
    //this.getXform().incYPosBy(-0.0001);

};