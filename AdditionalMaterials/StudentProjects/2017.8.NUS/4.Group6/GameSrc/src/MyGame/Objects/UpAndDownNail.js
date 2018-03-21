/* File: Nail.js
 *
 * Creates and initializes a ploatform object
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, TextureRenderable, RigidRectangle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function UpAndDownNail(atX, atY,inColor,high,type,dir) {
  this.mUDNail = "assets/UDNail.png";
  this.mNail = new SpriteRenderable(this.mUDNail);

    this.mNail.setColor(inColor);
    this.mNail.getXform().setPosition(atX, atY);
    this.mNail.getXform().setZPos(5);
    this.mNail.getXform().setSize(30, 3.75);
    if (dir){
      this.uperBound = atY+high;
      this.lowerBound = atY;
    } else {
      this.uperBound = atY;
      this.lowerBound = atY-high;
    }

    this.dir = dir;
    this.mFlag = type;

                                // show each element for mAnimSpeed updates
    GameObject.call(this, this.mNail);

}
gEngine.Core.inheritPrototype(UpAndDownNail, GameObject);

UpAndDownNail.prototype.getFlag = function(){
  return this.mFlag;
};

// UpAndDownNail.prototype.getSpeed = function(){
//   return this.mSpeed;
// };

UpAndDownNail.prototype.update = function (){
  var xf = this.mNail.getXform();
  var speed = 0.2;
  if (this.dir){
    speed = 0.2;
  } else {
    speed = -0.2;
  }
  xf.incYPosBy(speed);
  if (xf.getYPos() >= this.uperBound ){
    this.dir = false;
  }
  if(xf.getYPos() <= this.lowerBound ){
    this.dir = true;
  }
  var rigidShape = new RigidRectangle(xf,xf.getWidth() ,xf.getHeight());
  rigidShape.setMass(0);  // ensures no movements!
  rigidShape.setDrawBounds(true);
  rigidShape.setColor([1, 1, 1, 0]);
  this.setPhysicsComponent(rigidShape);
};
