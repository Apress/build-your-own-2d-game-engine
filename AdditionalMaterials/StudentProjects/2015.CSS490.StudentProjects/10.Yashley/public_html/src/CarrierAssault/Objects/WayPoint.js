/* File: Plane.js 
 *
 * Creates and initializes the Plane (Dye)
 * overrides the update funciton of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function WayPoint( spriteTexture, atX, atY) {
    this.kDelta = 0.1;
    this.kWidth = 1.5;
    this.kHeight = 1;
        
    this.mActive = false;
    this.mWayPoint = new LightRenderable(spriteTexture);
    //this.mWayPoint = new Renderable;
    this.mWayPoint.setColor([1, 1, 1, 0]);
    this.mWayPoint.getXform().setPosition(atX, atY);
    //this.mPlane.getXform().setZPos(1);
    this.mWayPoint.getXform().setSize(this.kWidth, this.kHeight);
    GameObject.call(this, this.mWayPoint);

    this.mMiniMapRenderable = new Renderable();
    this.mMiniMapRenderable.setColor([1,1,1,1]);
     
}
gEngine.Core.inheritPrototype(WayPoint, GameObject);

WayPoint.prototype.getXform = function() {
    return this.mWayPoint.getXform();
};

WayPoint.prototype.isActive = function() {
    return this.mActive;
}

WayPoint.prototype.activate = function() {
  
    this.mActive = true;
    
};

WayPoint.prototype.deactivate = function() {
  
    this.mActive = false;
    
};

WayPoint.prototype.update = function () {
    

};

WayPoint.prototype.draw = function (aCamera) {

    GameObject.prototype.draw.call(this, aCamera);

    
};
