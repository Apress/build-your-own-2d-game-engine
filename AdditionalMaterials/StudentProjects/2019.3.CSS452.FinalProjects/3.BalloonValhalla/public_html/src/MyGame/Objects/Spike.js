/* File: Spike.js 
 *
 * Creates and initializes a Spike object
 * overrides the update function of GameObject to define
 * simple sprite animation behavior behavior
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, TextureRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var kSpikeWidth = 3.0;
var kSpikeHeight = 3.0;

function Spike(texture, atX, atY, direction) {
        
    var w = kSpikeWidth;
    var h = kSpikeHeight;
    
    this.mSpike = new SpriteRenderable(texture);
    this.mSpike.setColor([1,1,1,0]);
    this.mSpike.getXform().setPosition(atX, atY);
    this.mSpike.getXform().setSize(w, h);
    //this.mSpike.setElementPixelPositions(420, 640, 1024, 784);
    this.mSpike.getXform().setRotationInRad(Math.PI / 2 * direction);

    GameObject.call(this, this.mSpike);
}
gEngine.Core.inheritPrototype(Spike, GameObject);

Spike.prototype.update = function (aCamera) {
    GameObject.prototype.update.call(this);
};