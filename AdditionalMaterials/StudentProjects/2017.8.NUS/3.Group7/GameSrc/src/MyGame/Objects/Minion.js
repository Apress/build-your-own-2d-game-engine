/* File: Minion.js 
 *
 * Creates and initializes a Minion object
 * overrides the update function of GameObject to define
 * simple sprite animation behavior behavior
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteAnimateRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

'use strict'  // Operate in Strict mode such that variables must be declared before used!

var kMinionWidth = 6*0.5
var kMinionHeight = 4.8*0.5
var kMinionRandomSize = 5

function Minion(spriteTexture, atX, atY, createCircle) {
        
    var w = kMinionWidth + Math.random() * kMinionRandomSize
    var h = kMinionHeight + Math.random() * kMinionRandomSize
    
    this.mMinion = new SpriteAnimateRenderable(spriteTexture)
    this.mMinion.setColor([1, 1, 1, 0])
    this.mMinion.getXform().setPosition(atX, atY)
    this.mMinion.getXform().setSize(w, h)
    this.mMinion.setSpriteSequence(512, 0,      // first element pixel position: top-left 512 is top of image, 0 is left of image
        204, 164,   // widthxheight in pixels
        5,          // number of elements in this sequence
        0)         // horizontal padding in between
    this.mMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing)
    this.mMinion.setAnimationSpeed(30)
    // show each element for mAnimSpeed updates

    GameObject.call(this, this.mMinion)
    
    var r
    if (createCircle)
        r = new RigidCircle(this.getXform(), 0.35*Math.sqrt(w*w + h*h)) 
    else
        r = new RigidRectangle(this.getXform(), w, h)
    var vx = (Math.random() - 0.5)
    var vy = (Math.random() - 0.5)
    var speed = 20 + Math.random() * 10
    r.setVelocity(vx * speed, vy * speed)
    this.setRigidBody(r)
    this.toggleDrawRenderable()
}
//gEngine.Core.inheritPrototype(Minion, WASDObj)
gEngine.Core.inheritPrototype(Minion,DirectionKeyObj)

Minion.prototype.update = function (aCamera) {
    GameObject.prototype.update.call(this)
    // remember to update this.mMinion's animation
    this.mMinion.updateAnimation()
}