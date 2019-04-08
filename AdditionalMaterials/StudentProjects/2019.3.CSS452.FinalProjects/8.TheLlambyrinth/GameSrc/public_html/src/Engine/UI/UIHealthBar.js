/* UIHealthBar.js
 * 
 */

"use strict";

/**
 * A health bar to can be used for UI's
 * @param {texture} sprite Texture for the UIHealthBar
 * @param {Array[]} position Base position for the UIHealthBar
 * @param {Array[]} size The size for the UIHealthBar
 * @param {int} buffer Size different between background and foreground
 * @class UIHealthBar
 * @returns {UIHealthBar}
 */
function UIHealthBar(sprite, position, size, buffer) {
    this.mBack = new SpriteRenderable(sprite);
    this.mBack.setElementUVCoordinate(0.0, 1.0, 0.5, 1.0);
    UIElement.call(this, this.mBack, position, size);
    
    this.mBuffer = buffer;
    
    this.mMaxHP = 100;
    this.mCurHP = this.mMaxHP;
    
    
    this.mHPElem = new UISprite(sprite, position, size, [0.0, 1.0, 0.0, 0.5]);
};
gEngine.Core.inheritPrototype(UIHealthBar, UIElement);
/**
 * Draws the UIHealthBar 
 * @param {Camera} aCamera The camera to draw it on
 * @memberOf UIHealthBar
 */
UIHealthBar.prototype.draw = function(aCamera) {
  UIElement.prototype.draw.call(this, aCamera);
  this.mHPElem.draw(aCamera);
};

/**
 * Update the UIHealthBar
 * @memberOf UIHealthBar
 */
UIHealthBar.prototype.update = function() {
    UIElement.prototype.update.call(this);
    
    var s = this.getUIXform().getSize();
    var p = this.getUIXform().getPosition();
    this.mHPElem.getUIXform().setSize((s[0] - 2*this.mBuffer) * (this.mCurHP / this.mMaxHP), s[1] - 2*this.mBuffer);
    
    //left align
    this.mHPElem.getUIXform().setPosition(p[0] - s[0]/2 + this.mBuffer + (this.mHPElem.getUIXform().getSize()[0]/2), p[1]);
    this.mHPElem.update();
};

/**
 * Set the Max HP
 * @param {int} hp What to set the Max HP to
 * @memberOf UIHealthBar
 */
UIHealthBar.prototype.setMaxHP = function(hp) {
    if(hp > 0)
        this.mMaxHP = hp;  
};

/**
 * Set the Current HP
 * @param {type} hp what to set the Current HP
 * @memberOf UIHealthBar
 */
UIHealthBar.prototype.setCurrentHP = function(hp) {
    if(hp < 0)
        this.mCurHP = 0;
    else
        this.mCurHP = hp;
};

/**
 * Get the Max HP
 * @returns {int} The Max HP
 * @memberOf UIHealthBar
 */
UIHealthBar.prototype.getMaxHP = function() {
    return this.mMaxHP;
};

/**
 * Get the Current HP
 * @returns {int} The Current HP
 * @memberOf UIHealthBar
 */
UIHealthBar.prototype.getCurrentHP = function() {
    return this.mCurHP;
};

/**
 * Increment the HP by the passed amount
 * @param {type} hp The amount to increment by
 * @memberOf UIHealthBar
 */
UIHealthBar.prototype.incCurrentHP = function(hp) {
    if(this.mCurHP + hp > this.mMaxHP)
        this.mCurHP = this.mMaxHP; 
    else if(this.mCurHP + hp < 0)
        this.mCurHP = 0;
    else
        this.mCurHP = this.mCurHP + hp;
};