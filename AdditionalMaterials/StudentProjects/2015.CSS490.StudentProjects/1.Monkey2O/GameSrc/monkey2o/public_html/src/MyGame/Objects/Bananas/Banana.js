/* File: Banana.js 
 *
 * Creates and initializes a Minion object
 * overrides the update function of GameObject to define
 * simple sprite animation behavior behavior
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable, SpriteAnimateRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Banana(options) {
  this.mTexture = options.texture;
  this.mNormalMap = options.normalMap;
  this.mPosition = options.position;
  this.mBanana = null;

  if(this.mNormalMap === null) {
    this.mBanana = new LightRenderable(this.mTexture);
  } else {
    this.mBanana = new IllumRenderable(this.mTexture, this.mNormalMap);
  }

  this.mBanana.setColor([1.0, 1.0, 1.0, 0]);
  this.mBanana.getXform().setPosition(this.mPosition.x, this.mPosition.y);
  this.mBanana.getXform().setSize(Banana.dimensions.width, Banana.dimensions.height);
  this.mBanana.getXform().setZPos(0);
  this.mBanana.setSpriteSequence(64, 0,      // first element pixel position: top-left 512 is top of image, 0 is left of image
                                 32, 64,    // widthxheight in pixels
                                 10,           // number of elements in this sequence
                                 0);          // horizontal padding in between
  this.mBanana.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
  this.mBanana.setAnimationSpeed(5);
                              // show each element for mAnimSpeed updates

  GameObject.call(this, this.mBanana);
}

//------------------------------------------------------------------------------
gEngine.Core.inheritPrototype(Banana, GameObject);

//------------------------------------------------------------------------------
Banana.dimensions = Object.freeze({
  width: 2,
  height: 4
});

//------------------------------------------------------------------------------
Banana.prototype.update = function() {
    // remember to update this.mMinion's animation
    this.mBanana.updateAnimation();
};
