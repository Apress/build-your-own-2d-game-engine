/* File: Portal.js
 *
 * Creates and initializes a ploatform object
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, TextureRenderable, RigidRectangle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Portal(atX, atY,inColor,type,end) {
    this.portal = "assets/Portal.png";
    this.mPortal = new SpriteRenderable(this.portal);
    this.mPortal.setColor(inColor);
    this.mPortal.getXform().setPosition(atX, atY);
    this.mPortal.getXform().setZPos(5);
    this.mPortal.getXform().setSize(30, 3.75);
                                // show each element for mAnimSpeed updates
    GameObject.call(this, this.mPortal);
    this.mFlag = type;
    this.mPortEnd = end;
}
gEngine.Core.inheritPrototype(Portal, GameObject);

Portal.prototype.getFlag = function(){
  return this.mFlag;
}

Portal.prototype.getEnd = function(){
  return this.mPortEnd;
}
