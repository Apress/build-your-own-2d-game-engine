/* File: Minion.js 
 *
 * Creates and initializes a Minion object
 * overrides the update function of GameObject to define
 * simple sprite animation behavior behavior
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, TextureRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var kMinionWidth = 6*0.5;
var kMinionHeight = 4.8*0.5;
var kMinionRandomSize = 5;

function Minion(spriteTexture, atX, atY, createCircle, size) {
        
    var w = kMinionWidth + size;
    var h = kMinionHeight + size;
    
    this.mMinion = new TextureRenderable(spriteTexture);
    this.mMinion.setColor([1, 1, 1, 0]);
    this.mMinion.getXform().setPosition(atX, atY);
    this.mMinion.getXform().setSize(w, h);
    if(createCircle===1){
       this.mMinion.getXform().setSize(h, h); 
    }

    GameObject.call(this, this.mMinion);
    
    var r;
    if (createCircle)
        r = new RigidCircle(this.getXform(), 0.35*Math.sqrt(w*w + h*h)); 
    else
        r = new RigidRectangle(this.getXform(), w, h);
    var vx = (Math.random() - 0.5);
    var vy = (Math.random() - 0.5);
    var speed = 20 + Math.random() * 10;
    r.setVelocity(vx * speed, vy * speed);
    this.setRigidBody(r);
    this.toggleDrawRenderable();
    this.toggleDrawRigidShape();
}
gEngine.Core.inheritPrototype(Minion, WASDObj);

Minion.prototype.update = function (aCamera) {
    GameObject.prototype.update.call(this);
};