/* File: Smoke.js 
 *
 * Creates and initializes the Smoke (Dye)
 * overrides the update funciton of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Smoke(spriteTexture, atX, atY) {
    this.kDelta = 0.1;
    this.kWidth = 1.5;
    this.kHeight = .75;
        
    //this.mSmoke = new LightRenderable(spriteTexture);
    this.mSmoke = new SpriteAnimateRenderable(spriteTexture);
    this.mSmoke.setSpriteSequence(64, 0,      // first element pixel position: top-left 64 is top of image, 0 is left of image
                                    64, 64,   // widthxheight in pixels
                                    4,          // number of elements in this sequence
                                    0);         // horizontal padding in between
    this.mSmoke.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mSmoke.setAnimationSpeed(12);
    this.mSmoke.setColor([1, 1, 1, 0]);
    this.mSmoke.getXform().setPosition(atX, atY);
    //this.mSmoke.getXform().setZPos(1);
    this.mSmoke.getXform().setSize(this.kWidth, this.kHeight);
    this.lifeSpan = 100;
  
   
    var transform = new Transform();
    transform.setPosition(this.mSmoke.getXform().getXPos(), this.mSmoke.getXform().getYPos() - this.kHeight / 2);
    
    GameObject.call(this, this.mSmoke);
    var front = this.getCurrentFrontDir();
    front[0] = -1;
    front[1] = 0;
 
    //this.mFlash1 = new TextureRenderable(shotTexture); 
    
   // this.mFlash2 = new TextureRenderable(shotTexture); 
    
    this.mIsVisible = true; 
    
   //Plane
    //this.mMiniMapRenderable = new Renderable();
    //this.mMiniMapRenderable.setColor([0,1,0,1]);
      
}
gEngine.Core.inheritPrototype(Smoke, GameObject);

Smoke.prototype.destroy = function(){
    return this.lifeSpan > 0;
}

Smoke.eSmokeState = Object.freeze({
    eFaceRight: 0,
    eFaceLeft: 1,
    eRunRight: 2,
    eRunLeft: 3,
    eJumpRight: 4,
    eJumpLeft: 5
});


Smoke.prototype.update = function () {
  //  this.mSmoke.getXform().cloneTo(this.mMiniMapRenderable.getXform());
    var kDelta = 0.15;
    GameObject.prototype.update.call(this);
    var pos = this.getXform().getPosition();
   // vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), .05)
    var dir = this.getCurrentFrontDir();
    
     this.mSmoke.updateAnimation();
     this.lifeSpan--;
};

Smoke.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
};
