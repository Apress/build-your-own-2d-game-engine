/* File: Spring.js
 *
 * Creates and initializes a ploatform object
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, TextureRenderable, RigidRectangle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Spring(atX, atY,inColor,type) {
    this.mpic = "assets/spring.png";
    this.mSpring = new SpriteRenderable(this.mpic);
    this.mSpring.setColor(inColor);
    this.mSpring.getXform().setPosition(atX, atY);
    this.mSpring.getXform().setZPos(5);
    this.mSpring.getXform().setSize(30, 3.75);
                                // show each element for mAnimSpeed updates
    GameObject.call(this, this.mSpring);
    this.mFlag = type;

}
gEngine.Core.inheritPrototype(Spring, GameObject);

Spring.prototype.getFlag = function(){
  return this.mFlag;
}
