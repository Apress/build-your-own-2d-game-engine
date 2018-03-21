/* File: Missle.js 
 *
 * Creates and initializes a simple Brain object
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false, vec2, gCue3, gCue4, SpriteAnimateRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
rebirth.kTexture = null;
//SuperSkill.kBgTexture = null;
var gCamera = gCamera;
function rebirth(atX, atY){
    this.calculator = 0;
//    this.mBgRend = new SpriteRenderable(SuperSkill.kBgTexture);
//    this.mBgRend.setColor([1, 1, 1, 0]);
//    this.mBgRend.getXform().setPosition(50, 60);
    this.mAniRend= new SpriteAnimateRenderable(rebirth.kTexture);
    this.mAniRend.setColor([1, 1, 1, 0]);
    this.mAniRend.getXform().setPosition(atX, atY);
    this.mAniRend.getXform().setSize(45, 45);
   
    this.mAniRend.setSpriteSequence(256, 0,     // first element pixel position: top-left 512 is top of image, 0 is left of image
                                    256, 256,       // widthxheight in pixels
                                    7,              // number of elements in this sequence
                                    0);             // horizontal padding in between
    
   
    
    this.mAniRend.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.mAniRend.setAnimationSpeed(5);
    GameObject.call(this,this.mAniRend);    
    
    this.mExpired = false;

//    this.setCurrentFrontDir([0, 1]);
//    this.setSpeed(0.5);

}
gEngine.Core.inheritPrototype(rebirth, GameObject);

rebirth.prototype.setExpired = function() {
    this.mExpired = true;
};
rebirth.prototype.hasExpired = function() {
    return this.mExpired;
};
rebirth.prototype.update = function(){
    GameObject.prototype.update.call(this);
    this.mAniRend.updateAnimation();
    this.calculator += 1;
    
    if(this.calculator === 35){
        
        this.setExpired();
        this.calculator = 0;
    }
};

