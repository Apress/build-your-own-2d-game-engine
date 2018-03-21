/* File: Platform.js
 *
 * Creates and initializes a ploatform object
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, TextureRenderable, RigidRectangle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Goal(atX, atY,inColor,type) {
    this.goal = "assets/Goal.png";
    this.mPlatform = new SpriteRenderable(this.goal);

    this.mPlatform.setColor(inColor);
    this.mPlatform.getXform().setPosition(atX, atY);
    this.mPlatform.getXform().setZPos(5);
    this.mPlatform.getXform().setSize(30, 3.75);
    this.mFlag = type;
                                // show each element for mAnimSpeed updates
    GameObject.call(this, this.mPlatform);

}
gEngine.Core.inheritPrototype(Goal, GameObject);

Goal.prototype.getFlag = function(){
  return this.mFlag;
}

Goal.prototype.update = function (){

};
