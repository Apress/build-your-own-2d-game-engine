/* File: Platform.js
 *
 * Creates and initializes a ploatform object
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, TextureRenderable, RigidRectangle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Nail(atX, atY,inColor,type) {
    this.mUDNail = "assets/UDNail.png";
    this.mPlatform = new SpriteRenderable(this.mUDNail);

    this.mPlatform.setColor(inColor);
    this.mPlatform.getXform().setPosition(atX, atY);
    this.mPlatform.getXform().setZPos(5);
    this.mPlatform.getXform().setSize(1, 1);
    this.mFlag = type;
                                // show each element for mAnimSpeed updates
    GameObject.call(this, this.mPlatform);

}
gEngine.Core.inheritPrototype(Nail, GameObject);

Nail.prototype.getFlag = function(){
  return this.mFlag;
}
