
/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, SpriteAnimateRenderable, vec2,NonPhysicsGameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
//+128 px
function PushButton(spriteTexture,normalTexture, x, y, w, h,doorIndex) {
    
    this.mButton = new IllumRenderable(spriteTexture, normalTexture);
    this.mButton.setColor([1, 1, 1, 0]);
    this.mButton.getXform().setPosition(x, y);
    this.mButton.getXform().setSize(w, h);
    this.mButton.setElementPixelPositions(0, 513, 507, 1021);  
    this.posNoPush = [0, 513, 507, 1021];
    this.posPush = [513, 1027, 507, 1021];
    this.mDoor = doorIndex;
    this.mState = 0;
    
    GameObject.call(this, this.mButton);
    
}
gEngine.Core.inheritPrototype(PushButton, GameObject);

//mimick pushing button
PushButton.prototype.set = function() {
    this.mState = 1;
    this.mButton.setElementPixelPositions(513, 1027, 507, 1021);  
};

//mimick button not pushed 
PushButton.prototype.reset = function() {
    this.mButton.setElementPixelPositions(0, 513, 507, 1021);  
    this.mState = 0;
};

//test pushing button when clicking 2 or 3 
PushButton.prototype.update = function() {
 
};

PushButton.prototype.draw = function(aCamera) {
    this.mButton.draw(aCamera);
};

//set lever to rotate 0 degrees 
PushButton.prototype.setRot = function(rot) {
    this.mButton.getXform().incRotationByDegree(rot);
};
PushButton.prototype.getDoorIndex = function() { return this.mDoor;};
PushButton.prototype.getState = function() {return this.mState;};


