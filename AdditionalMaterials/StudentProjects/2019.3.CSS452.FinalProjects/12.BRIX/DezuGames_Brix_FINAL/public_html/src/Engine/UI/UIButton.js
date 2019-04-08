/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";
/**
 * Creats a button for UI
 * @param {Texture} buttonSprite The texture to base the button off of
 * @param {function} callback The function to call when the clicked button is released
 * @param {object} context Who the callback function belongs to
 * @param {Array[]} position The base position for the UIButton
 * @param {Array[]} size The size for the UIButton
 * @param {String} text The text for the UIButton
 * @param {int} textSize The text size for the UIButton
 * @param {Array[]} textColor The text color for the UIButton
 * @param {Array[]} clickTextColor The text color when the button is clicked
 * @class UIButton
 * @returns {UIButton}
 */
function UIButton(buttonSprite, callback, context, position, size, text, textSize, textColor, clickTextColor) {
    this.mBack = new SpriteRenderable(buttonSprite);
    this.mBack.setElementUVCoordinate(0.0, 1.0, 0.5, 1.0);
    UIElement.call(this, this.mBack, position, size);
    
    this.mText = new UIText(text, 
                            position, 
                            textSize, 
                            UIText.eHAlignment.eCenter, 
                            UIText.eVAlignment.eCenter,
                            textColor);
    
    //callback management
    this.mCallBack = callback;
    this.mContext = context;
    
    
    this.mHover = false;
    this.mClick = false;
    this.textColor = textColor;
    this.clickTextColor = clickTextColor;
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
    UIElement.prototype.draw.call(this, aCamera);
    if(this.mText !== null)
        this.mText.draw(aCamera);
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
    var mouseOver = this.getUIBBox().containsPoint(mousePos[0], mousePos[1]);
    

    //start simple, just do callback when clicked
    if(gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)){
        if(mouseOver){
            this.mClick = true;
            this.mBack.setElementUVCoordinate(0.0, 1.0, 0.0, 0.5);
            this.setTextColor(this.clickTextColor);
        }
    }
    
    if(gEngine.Input.isButtonReleased(gEngine.Input.mouseButton.Left)){
        if(this.mClick) {
            this.mBack.setElementUVCoordinate(0.0, 1.0, 0.5, 1.0);
            this.mClick = false;
            this.setTextColor(this.textColor);
            
            if(mouseOver){
                if(this.mCallBack !== null)
                    this.mCallBack.call(this.mContext);
            }
        }

    }
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
    this.mText.setColor(color);
};

/**
 * Sets the color of the text when clicked
 * @param {Array[]} color the new color of the text when clicked
 * @memberOf UIButton
 */
UIButton.prototype.setClickTextColor = function(color){
    this.clickTextColor = color;
};

/**
 * Set the height of the text
 * @param {float} height The new height for the text
 * @memberOf UIButton
 */
UIButton.prototype.setTextHeight = function(height) {
    this.mText.setTextHeight(height);
};
