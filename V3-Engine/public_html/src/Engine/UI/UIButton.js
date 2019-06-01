/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";
/**
 * Creates a button for UI
 * @param {function} callback The function to call when the clicked button is released
 * @param {object} context Who the callback function belongs to
 * @param {Array[]} position The base position for the UIButton
 * @param {Array[]} size The size for the UIButton
 * @param {String} text The text for the UIButton
 * @param {int} textSize The text size for the UIButton
 * @class UIButton
 * @returns {UIButton}
 */
function UIButton(callback, context, position, size, text, textSize) {
    // default BG colors = varying gray hues
    this.mBgColor = [0.75,0.75,0.75,1];
    this.mBgHoverColor = [0.5,0.5,0.5,1];
    this.mBgClickColor = [0.25,0.2,0.25,1];
    
    this.mBg = new UIRenderable(this.mBgColor, position, size);
    
    this.mStencil = new UITexture("assets/UI/ButtonStencil.png", position, size);
    
    // default Text colors = black or white depending on state
    this.mTextColor = [0,0,0,1];
    this.mHoverTextColor = this.mTextColor;
    this.mClickTextColor = [1,1,1,1];
    
    this.mText = new UIText(text, 
                            position, 
                            textSize, 
                            UIText.eHAlignment.eCenter, 
                            UIText.eVAlignment.eCenter,
                            this.mTextColor);
    
    //callback management
    this.mCallBack = callback;
    this.mContext = context;
    
    this.mHover = false;
    this.mClick = false;
    
    UIElement.call(this, position, size);
}
gEngine.Core.inheritPrototype(UIButton, UIElement);

/**
 * Returns the UIText on the UIButton
 * @memberOf UIButton
 * @returns {UIText}
 */
UIButton.prototype.getText = function() {
    return this.mText;
};

/**
 * Draws the UIButton on a camera
 * @param {Camera} aCamera The camera it will be drawn on
 * @memberOf UIButton
 */
UIButton.prototype.draw = function (aCamera) {
    if(this.mVisible)
    {
        gEngine.Stencil.beginDrawToStencilBuffer();
        gEngine.Stencil.clearStencilBuffer();
        this.mStencil.draw(aCamera);
        gEngine.Stencil.endDrawToStencilBuffer();
        
        gEngine.Stencil.beginStencilCulling();
        this.mBg.draw(aCamera);
        gEngine.Stencil.endStencilCulling();
        
        if(this.mText !== null)
            this.mText.draw(aCamera);
    }
};

/**
 * Updates the UIButton
 * @memberOf UIButton
 */
UIButton.prototype.update = function () {
    UIElement.prototype.update.call(this);
    var uiXform = this.getUIXform();
   
    //make sure the button text stays on the button
    this.mText.getUIXform().setPosition(uiXform.getXPos(), uiXform.getYPos());
    
    //get the mouse position, and if its over the button
    var mousePos = vec2.fromValues(gEngine.Input.getMousePosX(),
                                gEngine.Input.getMousePosY());
    this.mHover = this.getUIBBox().containsPoint(mousePos[0], mousePos[1]);

    //start simple, just do callback when clicked
    if(gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)){
        if(this.mHover){
            this.mClick = true;
        }
    }
    
    if(gEngine.Input.isButtonReleased(gEngine.Input.mouseButton.Left)){
        if(this.mClick) {
            this.mClick = false;
            
            if(this.mHover){
                if(this.mCallBack !== null)
                    this.mCallBack.call(this.mContext);
            }
        }
    }
    
    this._setBG();
    this._setTextColor();
};

/**
 * Set the text of the UIButton
 * @param {String} text The new text
 * @memberOf UIButton
 */
UIButton.prototype.setTextString = function(text) {
    this.mText.setText(text);
};

/**
 * Sets the color of the text
 * @param {Array[]} color the new color of the text
 * @memberOf UIButton
 */
UIButton.prototype.setTextColor = function(color) {
    this.mTextColor = color;
    this.mText.setColor(color);
};

/**
 * Sets the color of the text when button is hovered
 * @param {Array[]} color the new color of the text when button is hovered over
 * @memberOf UIButton
 */
UIButton.prototype.setHoverTextColor = function(color){
    this.mClickTextColor = color;
};

/**
 * Sets the color of the text when clicked
 * @param {Array[]} color the new color of the text when clicked
 * @memberOf UIButton
 */
UIButton.prototype.setClickTextColor = function(color){
    this.mClickTextColor = color;
};

/**
 * Set the height of the text
 * @param {float} height The new height for the text
 * @memberOf UIButton
 */
UIButton.prototype.setTextHeight = function(height) {
    this.mText.setTextHeight(height);
};

/**
 * Sets the background's color
 * @param {float[]} color The desired Color for the background
 * @memberOf UIButton
 */
UIButton.prototype.setBGColor = function(color) {
    this.mBgColor = color;
    this.mBg.setColor(color);
};

/**
 * Sets the background's hover color
 * @param {float[]} color The desired Color for when the background is hovered over
 * @memberOf UIButton
 */
UIButton.prototype.setBGHoverColor = function(color) {
    this.mBgHoverColor = color;
};

/**
 * Sets the background's click color
 * @param {float[]} color The desired Color for when the background is clicked
 * @memberOf UIButton
 */
UIButton.prototype.setBGClickColor = function(color) {
    this.mBgClickColor = color;
};

/**
 * Sets the sprite to be used for the Stencil
 * @param {String} stencilSprite Location of the Sprite to be used for Stenciling
 * @memberOf UIButton
 */
UIButton.prototype.setStencil = function(stencilSprite) {
    this.mStencil.setTexture(stencilSprite);
};

/**
 * Private function that sets the button background based on current button state
 * @memberOf UIButton
 */
UIButton.prototype._setBG = function() {
    if(this.mClick) {
        this.mBg.setColor(this.mBgClickColor);
    }
    else if(this.mHover) {
        this.mBg.setColor(this.mBgHoverColor);
    }
    else {
        this.mBg.setColor(this.mBgColor);
    }
};

/**
 * Private function that sets the text color based on current button state
 * @memberOf UIButton
 */
UIButton.prototype._setTextColor = function() {
    if(this.mClick) {
        this.mText.setColor(this.mClickTextColor);
    }
    else if(this.mHover) {
        this.mText.setColor(this.mHoverTextColor);
    }
    else {
        this.mText.setColor(this.mTextColor);
    }
};
