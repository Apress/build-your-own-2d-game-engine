/*jslint node: true, vars: true */
/*global WASDObj, gEngine: false, GameObject: false, SpriteAnimateRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict"; 

function Star(spriteTexture, atX, atY, w, h) {
    
    this.mStar = new SpriteAnimateRenderable(spriteTexture);
    this.mStar.setColor([1, 1, 1, 0]);
    this.mStar.getXform().setPosition(atX, atY);
    this.mStar.getXform().setSize(w, h);
    this.mStar.setSpriteSequence(726,0,150,150,2,0);
    this.mStar.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.mStar.setAnimationSpeed(30);
    this.setBoundRadius(w/2);
    
    GameObject.call(this,this.mStar);
}

gEngine.Core.inheritPrototype(Star, GameObject);

Star.prototype.update = function () {
    GameObject.prototype.update.call(this);
    this.mStar.updateAnimation();
};