/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";
/**
 * Creates a button for UI that can use a sprite
 * @param {Texture} buttonSprite The texture to base the button off of
 * @param {function} callback The function to call when the clicked button is released
 * @param {object} context Who the callback function belongs to
 * @param {Array[]} position The base position for the UIButton
 * @param {Array[]} size The size for the UIButton
 * @param {String} text The text for the UIButton
 * @param {int} textSize The text size for the UIButton
 * @class UISpriteButton
 * @returns {UISpriteButton}
 */
function UISpriteButton(buttonSprite, callback, context, position, size, text, textSize) {
    UIButton.call(this, callback, context, position, size, text, textSize);
    
    this.mBGNormalUVs = [0.0, 1.0, 0.75, 1.0];
    this.mBGHoverUVs = [0.0, 1.0, 0.5, 0.75];
    this.mBGClickUVs = [0.0, 1.0, 0.25, 0.5];
    
    // note: the default is using a sprite that is split in four horizontal sections
    this.mBg = new UISprite(buttonSprite, position, size, this.mBGNormalUVs);
}
gEngine.Core.inheritPrototype(UISpriteButton, UIButton);

/**
 * Draws the UISpriteButton on a camera
 * @param {Camera} aCamera The camera it will be drawn on
 * @memberOf UISpriteButton
 */
UISpriteButton.prototype.draw = function (aCamera) {
    if(this.mVisible)
    {
        this.mBg.draw(aCamera);
        if(this.mText !== null)
            this.mText.draw(aCamera);
    }
};

/**
 * Sets the UVs for when Button is not being interacted with
 * @param {type} left
 * @param {type} right
 * @param {type} bottom
 * @param {type} top
 * @memberOf UISpriteButton
 */
UISpriteButton.prototype.setBGNormalUVs = function(left, right, bottom, top) {
    this.mBGNormalUVs = [left, right, bottom, top];
};

/**
 * Sets the UVs for when Button is being hovered over
 * @param {type} left
 * @param {type} right
 * @param {type} bottom
 * @param {type} top
 * @memberOf UISpriteButton
 */
UISpriteButton.prototype.setBGHoverUVs = function(left, right, bottom, top) {
    this.mBGHoverUVs = [left, right, bottom, top];
};

/**
 * Sets the UVs for when Button is being clicked
 * @param {type} left
 * @param {type} right
 * @param {type} bottom
 * @param {type} top
 * @memberOf UISpriteButton
 */
UISpriteButton.prototype.setBGClickUVs = function(left, right, bottom, top) {
    this.mBGClickUVs = [left, right, bottom, top];
};

/**
 * Private function that sets the button background based on current button state
 * @memberOf UISpriteButton
 */
UISpriteButton.prototype._setBG = function() {
    if(this.mClick) {
        this.mBg.setElementUVCoordinate(this.mBGClickUVs[0],this.mBGClickUVs[1],this.mBGClickUVs[2],this.mBGClickUVs[3]);
    }
    else if(this.mHover) {
        this.mBg.setElementUVCoordinate(this.mBGHoverUVs[0],this.mBGHoverUVs[1],this.mBGHoverUVs[2],this.mBGHoverUVs[3]);
    }
    else {
        this.mBg.setElementUVCoordinate(this.mBGNormalUVs[0],this.mBGNormalUVs[1],this.mBGNormalUVs[2],this.mBGNormalUVs[3]);
    }
};
