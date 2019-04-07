/* File: Gate.js 
 *
 * Creates and initializes a Gate object
 * overrides the update function of GameObject to define
 * simple sprite animation behavior behavior
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, TextureRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var kGateWidth = 6.0;
var kGateHeight = 6.0;

function Gate(texture, atX, atY, direction) {
        
    var w = kGateWidth;
    var h = kGateHeight;
    
    this.mLocked = true;
    this.mOpen = false;
    
    this.mGate = new SpriteRenderable(texture);
    this.mGate.setColor([1,1,1,0]);
    this.mGate.getXform().setPosition(atX, atY);
    this.mGate.getXform().setSize(w, h);
    this.mGate.setElementPixelPositions(0, 256, 0, 256);
    this.mGate.getXform().setRotationInRad(Math.PI / 2 * direction);

    GameObject.call(this, this.mGate);
    
    var r = new RigidRectangle(this.getXform(), w, h / 8); 
    r.setVelocity(0, 0);
    this.setRigidBody(r);
    r.setRestitution(0);
    r.setFriction(100);
    r.setMass(100);
}
gEngine.Core.inheritPrototype(Gate, GameObject);

Gate.prototype.unlock = function () {
    this.mLocked = false;
};

Gate.prototype.open = function () {
    if (!this.mLocked && !this.mOpen) {
        this.mOpen = true;
        this.mGate.setElementPixelPositions(256, 512, 0, 256); // set sprite to open state
        this.getRigidBody().boundTest = function(other) { return false; }; // disable collisions
        return true;
    }
    return false;
};

Gate.prototype.update = function (aCamera) {
    
};