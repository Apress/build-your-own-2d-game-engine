/* File: Bubble.js 
 *
 * Creates and initializes a Minion object
 * overrides the update function of GameObject to define
 * simple sprite animation behavior behavior
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable, SpriteAnimateRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Bubble(options) {
  this.mTexture = options.texture;
  this.mNormalMap = options.normalMap;
  this.mPosition = options.position;
  this.mBubble = null;

  if(this.mNormalMap === null) {
    this.mBubble = new LightRenderable(this.mTexture);
  } else {
    this.mBubble = new IllumRenderable(this.mTexture, this.mNormalMap);
  }

  this.mBubble.setColor([1.0, 1.0, 1.0, 0]);
  this.mBubble.getXform().setPosition(this.mPosition.x, this.mPosition.y);
  this.mBubble.getXform().setSize(Bubble.constants.dimensions.width, Bubble.constants.dimensions.height);
  this.mBubble.getXform().setZPos(0);
  this.mBubble.setSpriteSequence(256, 0,      // first element pixel position: top-left 512 is top of image, 0 is left of image
                                 128, 128,    // widthxheight in pixels
                                 2,           // number of elements in this sequence
                                 0);          // horizontal padding in between
  this.mBubble.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
  this.mBubble.setAnimationSpeed(20);
                              // show each element for mAnimSpeed updates
  GameObject.call(this, this.mBubble);
}

//------------------------------------------------------------------------------
gEngine.Core.inheritPrototype(Bubble, GameObject);

//------------------------------------------------------------------------------
Bubble.constants = Object.freeze({
  dimensions: Object.freeze({
    width: 2.5,
    height: 2.5
  }),
  delta: 0.01
});

//------------------------------------------------------------------------------
Bubble.prototype.update = function () {
    // remember to update this.mMinion's animation
    this.mBubble.updateAnimation();
};
